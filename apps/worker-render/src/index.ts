import { JobRepository, AssetRepository, WorkerRepository } from '@loopreel/db';
import { createWorker } from '@loopreel/queue';
import type { RenderPayload } from '@loopreel/schemas';
import type { FormatType, Platform } from '@loopreel/schemas';
import { uploadSlide } from '@loopreel/storage';
import { classifyError } from '@loopreel/errors';
import { getPlatform } from '@loopreel/design';
import pino from 'pino';
import { randomUUID } from 'node:crypto';
import { hostname } from 'node:os';
import { getPool } from './pool/browser-pool.js';
import { startMetricsServer } from './sidecar.js';

const logger = pino({
  level: process.env['LOG_LEVEL'] ?? 'info',
  formatters: {
    level: (label) => ({ level: label.toUpperCase() }),
  },
});

const RENDER_URL = process.env['RENDER_URL'] ?? 'http://localhost:5173';
const INSTANCE_ID = randomUUID();
const HOSTNAME = hostname();
let jobsProcessed = 0n;

const heartbeat = setInterval(() => {
  void WorkerRepository.upsertHeartbeat(INSTANCE_ID, 'render', HOSTNAME, 'render', jobsProcessed);
}, 10_000);
let pool: Awaited<ReturnType<typeof getPool>> | null = null;

async function ensurePool() {
  if (!pool) {
    pool = await getPool();
  }
  return pool;
}

startMetricsServer(() => pool?.getMetrics() ?? { poolSize: 0, inUse: 0, waiting: 0, totalUses: 0 });

const worker = createWorker<RenderPayload>('render', async (job) => {
  const { jobId } = job.data;
  const jobLogger = logger.child({ jobId, workerType: 'render' });

  const existing = await JobRepository.findById(jobId);
  if (!existing) {
    jobLogger.error('Job not found, skipping');
    return;
  }
  if (existing.status !== 'rendering') {
    jobLogger.info({ currentStatus: existing.status }, 'Job already advanced, skipping');
    return;
  }

  if (!existing.structured_json || !existing.slide_count) {
    await JobRepository.markFailed(jobId, 'Missing structured_json or slide_count');
    return;
  }

  // Get platform from job metadata (default to instagram-feed)
  const platform = (existing as unknown as { platform?: Platform }).platform ?? 'instagram-feed';
  const platformConfig = getPlatform(platform);

  jobLogger.info({ slideCount: existing.slide_count, platform }, 'Starting render');

  try {
    const currentPool = await ensurePool();
    const assets: Array<{
      jobId: string;
      formatType: FormatType;
      slideIndex?: number;
      storageUrl?: string;
      contentText?: string;
    }> = [];

    // Render slides for the specified platform
    for (let i = 0; i < existing.slide_count; i++) {
      const page = await currentPool.acquire();
      try {
        // Add platform class to URL for responsive rendering
        const platformParam = platform !== 'instagram-feed' ? `?platform=${platform}` : '';
        await page.goto(`${RENDER_URL}/render/${jobId}/${i}${platformParam}`, {
          waitUntil: 'networkidle',
          timeout: 30_000,
        });

        await page.waitForSelector('[data-render-complete="true"]', { timeout: 20_000 });

        // Set viewport size based on platform
        if (platformConfig) {
          await page.setViewportSize({
            width: platformConfig.width,
            height: platformConfig.height,
          });
        }

        const screenshot = await page.screenshot({ type: 'png' });
        const r2Key = await uploadSlide(jobId, i, screenshot);

        jobLogger.info({ slideIndex: i, r2Key, platform }, 'Slide rendered');

        assets.push({
          jobId,
          formatType: 'carousel_slide',
          slideIndex: i,
          storageUrl: r2Key,
        });
      } finally {
        currentPool.release(page);
      }
    }

    // Generate text-based assets (LinkedIn, Twitter)
    const structured = existing.structured_json as {
      hook: { title: string; subtitle?: string };
      valuePoints: Array<{ heading: string; body: string; bulletPoints?: string[] }>;
      callToAction: { message: string };
    };

    const formatValuePoint = (vp: { heading: string; body: string; bulletPoints?: string[] }) => {
      const lines = [`📌 ${vp.heading}`, vp.body];
      if (vp.bulletPoints?.length) {
        for (const bp of vp.bulletPoints) {
          lines.push(`  • ${bp}`);
        }
      }
      return lines.join('\n');
    };

    const linkedinText = [
      structured.hook.title,
      structured.hook.subtitle ? `\n${structured.hook.subtitle}` : '',
      '',
      ...structured.valuePoints.map(formatValuePoint),
      '',
      structured.callToAction.message,
    ].join('\n');

    const twitterThread = [
      structured.hook.title,
      '',
      ...structured.valuePoints.map((vp, i) => `${i + 1}/${structured.valuePoints.length} ${vp.heading}\n${vp.body}`),
      '',
      structured.callToAction.message,
    ].join('\n\n');

    assets.push({ jobId, formatType: 'linkedin_post', contentText: linkedinText });
    assets.push({ jobId, formatType: 'twitter_thread', contentText: twitterThread });

    await AssetRepository.insertBatch(assets);
    await JobRepository.updateStatus(jobId, 'complete');

    jobsProcessed++;
    jobLogger.info({ assetCount: assets.length, platform }, 'Job complete');
  } catch (err) {
    const classified = classifyError(err);
    jobLogger.error({ err, errorType: classified.type }, 'Render failed');

    if (classified.type === 'transient' && job.attemptsMade < 1) {
      throw classified;
    }

    await JobRepository.markFailed(jobId, classified.message);
  }
});

worker.on('failed', (job, err) => {
  logger.error({ jobId: job?.id, err }, 'Worker failed');
});

process.on('SIGTERM', () => {
  clearInterval(heartbeat);
  void pool?.close();
});

logger.info({ instanceId: INSTANCE_ID }, 'worker-render started');

import { JobRepository, AssetRepository } from '@loopreel/db';
import { createWorker } from '@loopreel/queue';
import type { RenderPayload } from '@loopreel/schemas';
import type { FormatType } from '@loopreel/schemas';
import { uploadSlide } from '@loopreel/storage';
import { classifyError } from '@loopreel/errors';
import { getPlatform } from '@loopreel/design';
import pino from 'pino';
import { getPool } from './pool/browser-pool.js';
import { startMetricsServer } from './sidecar.js';

const logger = pino({
  level: process.env['LOG_LEVEL'] ?? 'info',
  formatters: {
    level: (label) => ({ level: label.toUpperCase() }),
  },
});

const API_URL = process.env['API_URL'] ?? 'http://localhost:3000';
let pool: Awaited<ReturnType<typeof getPool>> | null = null;

async function ensurePool() {
  if (!pool) {
    pool = await getPool();
  }
  return pool;
}

startMetricsServer(() => pool?.getMetrics() ?? { poolSize: 0, inUse: 0, waiting: 0, totalUses: 0 });

/**
 * Fit all [data-smart-fit] elements to their containers (§5 of spec).
 * Uses real DOM measurement in Playwright, not character-count heuristics.
 */
async function fitTextToContainers(page: import('playwright').Page) {
  await page.evaluate(() => {
    const elements = document.querySelectorAll('[data-smart-fit]');
    elements.forEach((el) => {
      const htmlEl = el as HTMLElement;
      const parent = htmlEl.parentElement;
      if (!parent) return;
      let size = parseFloat(getComputedStyle(htmlEl).fontSize);
      while (htmlEl.scrollHeight > parent.clientHeight && size > 14) {
        size -= 1;
        htmlEl.style.fontSize = `${size}px`;
      }
    });
  });
}

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

  if (!existing.content_payload || !existing.slide_count) {
    await JobRepository.markFailed(jobId, {
      stage: 'rendering',
      reason: 'missing_payload',
      details: 'Missing content_payload or slide_count',
    });
    return;
  }

  const platform = existing.platform ?? 'instagram-feed';
  const platformConfig = getPlatform(platform);
  const width = platformConfig?.width ?? 1080;
  const height = platformConfig?.height ?? 1080;

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

    // Slide count = hook + content slides + CTA
    const payload = existing.content_payload as any;
    const totalSlides = 2 + (payload.slides?.length ?? 0);

    for (let i = 0; i < totalSlides; i++) {
      const page = await currentPool.acquire();
      try {
        await page.setViewportSize({ width, height });

        const response = await fetch(`${API_URL}/internal/render/${jobId}/${i}`);
        if (!response.ok) {
          throw new Error(`Render endpoint returned ${response.status}`);
        }
        const html = await response.text();

        await page.setContent(html, { waitUntil: 'domcontentloaded' });

        // §4 of spec: wait for fonts to load
        await page.evaluate(() => document.fonts.ready);

        // §5 of spec: measure-and-shrink for all variable-length text
        await fitTextToContainers(page);

        // §4 of spec: wait for render-complete signal
        await page.waitForFunction(
          () => document.body.getAttribute('data-render-complete') === 'true',
          { timeout: 5000 },
        );

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

    const slideTexts = payload.slides.map((s: any) => {
      if (s.type === 'list' && s.items?.length) {
        return [`Key points: ${s.heading ?? ''}`, ...s.items.map((item: string) => `  - ${item}`)].join('\n');
      }
      if (s.type === 'quote') return `"${s.quote}"`;
      if (s.type === 'stat') return `${s.value}${s.label ? ` ${s.label}` : ''}`;
      return [s.heading ?? '', s.body].filter(Boolean).join('\n');
    });

    const firstSlide = payload.hook;
    const lastSlide = payload.cta;

    const linkedinText = [
      firstSlide?.heading ?? '',
      '',
      ...slideTexts,
      '',
      lastSlide?.heading ?? '',
    ].join('\n');

    const twitterThread = [
      firstSlide?.heading ?? '',
      '',
      ...payload.slides.map((s: any, i: number) => {
        const text = [s.heading ?? s.value ?? '', s.body ?? s.label ?? ''].filter(Boolean).join(' — ');
        return `${i + 1}/${payload.slides.length} ${text}`;
      }),
      '',
      lastSlide?.heading ?? '',
    ].join('\n\n');

    assets.push({ jobId, formatType: 'linkedin_post', contentText: linkedinText });
    assets.push({ jobId, formatType: 'twitter_thread', contentText: twitterThread });

    await AssetRepository.insertBatch(assets);
    await JobRepository.updateStatus(jobId, 'complete');

    jobLogger.info({ assetCount: assets.length, platform }, 'Job complete');
  } catch (err) {
    const classified = classifyError(err);
    jobLogger.error({ err, errorType: classified.type }, 'Render failed');

    if (classified.type === 'transient' && job.attemptsMade < 1) {
      throw classified;
    }

    await JobRepository.markFailed(jobId, {
      stage: 'rendering',
      reason: classified.type,
      details: classified.message,
    });
  }
});

worker.on('failed', (job, err) => {
  logger.error({ jobId: job?.id, err }, 'Worker failed');
});

process.on('SIGTERM', () => {
  void pool?.close();
});

logger.info('worker-render started');

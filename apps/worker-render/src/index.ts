import { JobRepository, AssetRepository } from '@loopreel/db';
import { createWorker } from '@loopreel/queue';
import type { RenderPayload } from '@loopreel/schemas';
import type { FormatType } from '@loopreel/schemas';
import { getTemplate } from '@loopreel/loop-bridge';
import { uploadSlide } from '@loopreel/storage';
import { classifyError } from '@loopreel/errors';
import { getPlatform } from '@loopreel/design';
import pino from 'pino';
import { getPool } from './pool/browser-pool.js';
import { startMetricsServer } from './sidecar.js';
import { startStaticServer } from './serve-static.js';

const logger = pino({
  level: process.env['LOG_LEVEL'] ?? 'info',
  formatters: {
    level: (label) => ({ level: label.toUpperCase() }),
  },
});

const STATIC_PORT = 3001;
const VITE_SERVER_URL = process.env['VITE_SERVER_URL'] ?? `http://localhost:${STATIC_PORT}`;
let pool: Awaited<ReturnType<typeof getPool>> | null = null;

async function ensurePool() {
  if (!pool) {
    pool = await getPool();
  }
  return pool;
}

startStaticServer(STATIC_PORT);
startMetricsServer(() => pool?.getMetrics() ?? { poolSize: 0, inUse: 0, waiting: 0, totalUses: 0 });

const RENDER_CONCURRENCY = Number(process.env['PLAYWRIGHT_POOL_SIZE'] ?? '5');

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
  const templateId = existing.template_id;
  const platformConfig = getPlatform(platform);
  const width = platformConfig?.width ?? 1080;
  const height = platformConfig?.height ?? 1080;

  let template;
  try {
    template = getTemplate(templateId);
  } catch {
    await JobRepository.markFailed(jobId, {
      stage: 'rendering',
      reason: 'unknown_template',
      details: `Template "${templateId}" not found`,
    });
    return;
  }

  jobLogger.info({ slideCount: existing.slide_count, platform, template: templateId }, 'Starting render');

  try {
    const currentPool = await ensurePool();
    const assets: Array<{
      jobId: string;
      formatType: FormatType;
      slideIndex?: number;
      storageUrl?: string;
      contentText?: string;
    }> = [];

    const payload = existing.content_payload as { slides: Record<string, unknown>[]; meta?: Record<string, unknown> };
    const totalSlides = payload.slides.length;
    const poolSize = Number(process.env['PLAYWRIGHT_POOL_SIZE'] ?? '5');

    // Render slides in parallel — each tab loads the app fresh, then we inject slide data via evaluate
    for (let batchStart = 0; batchStart < totalSlides; batchStart += poolSize) {
      const batchEnd = Math.min(batchStart + poolSize, totalSlides);
      const batch = payload.slides.slice(batchStart, batchEnd);

      const pages = await Promise.all(
        Array.from({ length: batch.length }, () => currentPool.acquire()),
      );

      try {
        // Load the React app in all tabs in parallel
        await Promise.all(
          pages.map(async (page) => {
            await page.setViewportSize({ width, height });
            await page.goto(VITE_SERVER_URL, { waitUntil: 'networkidle', timeout: 30000 });
          }),
        );

        // Inject slide data, wait for render, and screenshot all tabs in parallel
        const screenshots = await Promise.all(
          pages.map(async (page, idx) => {
            const slide = batch[idx];
            const slideId = (slide as any).id;

            await page.evaluate(
              ({ slideData, schemeId, templateIdVal, renderSize, brandKitVal }) => {
                const w = window as any;
                w.__SLIDE_DATA = slideData;
                w.__SLIDE_SCHEME_ID = schemeId;
                w.__SLIDE_TEMPLATE_ID = templateIdVal;
                w.__SLIDE_SIZE = renderSize;
                if (brandKitVal) w.__BRAND_KIT = brandKitVal;
                w.dispatchEvent(new Event('slide-update'));
              },
              {
                slideData: slide,
                schemeId: template.schemeId,
                templateIdVal: templateId,
                renderSize: { width, height },
                brandKitVal: payload.meta?.brandKit as Record<string, string | undefined> | undefined,
              },
            );

            if (slideId) {
              await page.waitForSelector(`[data-slide-id="${slideId}"]`, { timeout: 5000 }).catch(() => {});
            }

            await page.evaluate(
              () => new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve))),
            );
            await page.evaluate(() => document.fonts.ready);
            const screenshot = await page.screenshot({ type: 'png' });
            return { screenshot, slideIndex: batchStart + idx };
          }),
        );

        // Upload screenshots serially (R2 is the bottleneck, not CPU)
        for (const { screenshot, slideIndex } of screenshots) {
          const r2Key = await uploadSlide(jobId, slideIndex, screenshot);
          jobLogger.info({ slideIndex, r2Key, platform }, 'Slide rendered');
          assets.push({
            jobId,
            formatType: 'carousel_slide',
            slideIndex,
            storageUrl: r2Key,
          });
        }
      } finally {
        await Promise.all(pages.map((p) => currentPool.release(p)));
      }
    }

    // Generate LinkedIn post text
    const linkedinText = payload.slides
      .map((s: Record<string, unknown>) => {
        const type = s['type'] as string;
        if (type === 'cover') return `${s['headline']}\n${s['subheadline'] ?? ''}`;
        if (type === 'quote') return `"${s['quote']}" — ${s['author'] ?? ''}`;
        if (type === 'sequence') {
          const items = (s['items'] as Array<Record<string, unknown>> ?? [])
            .map((item) => `${item['num']} ${item['title']}: ${item['desc']}`)
            .join('\n');
          return `${s['headline']}\n${items}`;
        }
        if (type === 'telemetry') {
          const stats = (s['stats'] as Array<Record<string, unknown>> ?? [])
            .map((stat) => `${stat['value']}${stat['unit'] ?? ''} ${stat['label']}`)
            .join('\n');
          return `${s['headline']}\n${stats}`;
        }
        if (type === 'cta') return `${s['headline']}\n${s['subtext'] ?? ''}`;
        return [s['headline'] ?? '', s['bodyText'] ?? ''].filter(Boolean).join('\n');
      })
      .join('\n\n');

    // Generate Twitter thread text
    const twitterThread = payload.slides
      .map((s: Record<string, unknown>, i: number) => {
        const type = s['type'] as string;
        let text = '';
        if (type === 'cover') text = `${s['headline']}`;
        else if (type === 'quote') text = `"${s['quote']}"`;
        else if (type === 'cta') text = `${s['headline']}`;
        else text = [s['headline'] ?? s['value'] ?? '', s['bodyText'] ?? s['label'] ?? ''].filter(Boolean).join(' — ');
        return `${i + 1}/${totalSlides} ${text}`;
      })
      .join('\n\n');

    assets.push({ jobId, formatType: 'linkedin_post', contentText: linkedinText });
    assets.push({ jobId, formatType: 'twitter_thread', contentText: twitterThread });

    await AssetRepository.insertBatch(assets);
    await JobRepository.updateStatus(jobId, 'complete');

    jobLogger.info({ assetCount: assets.length, platform, template: templateId }, 'Job complete');
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
}, { concurrency: RENDER_CONCURRENCY });

worker.on('failed', (job, err) => {
  logger.error({ jobId: job?.id, err }, 'Worker failed');
});

process.on('SIGTERM', () => {
  void pool?.close();
});

logger.info('worker-render started');

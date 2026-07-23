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

const logger = pino({
  level: process.env['LOG_LEVEL'] ?? 'info',
  formatters: {
    level: (label) => ({ level: label.toUpperCase() }),
  },
});

const VITE_SERVER_URL = process.env['VITE_SERVER_URL'] ?? 'http://localhost:5173';
let pool: Awaited<ReturnType<typeof getPool>> | null = null;

async function ensurePool() {
  if (!pool) {
    pool = await getPool();
  }
  return pool;
}

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

    const page = await currentPool.acquire();

    try {
      await page.setViewportSize({ width, height });

      if (totalSlides > 0) {
        await page.addInitScript({
          content: `
            window.__SLIDE_DATA = ${JSON.stringify(payload.slides[0])};
            window.__SLIDE_SCHEME_ID = ${JSON.stringify(template.schemeId)};
            window.__SLIDE_TEMPLATE_ID = ${JSON.stringify(templateId)};
            window.__SLIDE_SIZE = ${JSON.stringify({ width, height })};
            ${payload.meta?.brandKit ? `window.__BRAND_KIT = ${JSON.stringify(payload.meta.brandKit)};` : ''}
          `,
        });
      }

      await page.goto(VITE_SERVER_URL, { waitUntil: 'networkidle', timeout: 30000 });

      for (let i = 0; i < totalSlides; i++) {
        const slide = payload.slides[i];

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

        const slideId = (slide as any).id;
        if (slideId) {
          await page.waitForSelector(`[data-slide-id="${slideId}"]`, { timeout: 5000 }).catch(() => {});
        }

        await page.evaluate(
          () => new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve))),
        );

        await page.evaluate(() => document.fonts.ready);
        const screenshot = await page.screenshot({ type: 'png' });
        const r2Key = await uploadSlide(jobId, i, screenshot);

        jobLogger.info({ slideIndex: i, r2Key, platform }, 'Slide rendered');

        assets.push({
          jobId,
          formatType: 'carousel_slide',
          slideIndex: i,
          storageUrl: r2Key,
        });
      }
    } finally {
      currentPool.release(page);
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

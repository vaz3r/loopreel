import { JobRepository } from '@loopreel/db';
import { createWorker, createQueue } from '@loopreel/queue';
import type { StructurePayload } from '@loopreel/schemas';
import { TEMPLATES } from '@loopreel/templates';
import { createLLMClient, parseLlmXmlOutput } from '@loopreel/llm';
import { getRandomPhoto, getPhotoUrl, getPlaceholderUrl } from '@loopreel/backgrounds';
import { downloadImage, uploadImage, getPresignedUrl } from '@loopreel/storage';
import { classifyError } from '@loopreel/errors';
import pino from 'pino';

const logger = pino({
  level: process.env['LOG_LEVEL'] ?? 'info',
  formatters: {
    level: (label) => ({ level: label.toUpperCase() }),
  },
});

const llm = createLLMClient();
const renderQueue = createQueue('render');

function stripMarkdownFences(text: string): string {
  let cleaned = text.trim();
  if (cleaned.startsWith('```xml')) cleaned = cleaned.slice(6);
  else if (cleaned.startsWith('```')) cleaned = cleaned.slice(3);
  if (cleaned.endsWith('```')) cleaned = cleaned.slice(0, -3);
  return cleaned.trim();
}

function chunkArray<T>(arr: T[], size: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size));
  }
  return chunks;
}

function paginateSlides(slides: Record<string, unknown>[]): Record<string, unknown>[] {
  const result: Record<string, unknown>[] = [];

  for (const slide of slides) {
    const type = slide['type'] as string;

    if (type === 'sequence') {
      const items = slide['items'] as unknown[] | undefined;
      if (items && items.length > 4) {
        const chunks = chunkArray(items, 4);
        chunks.forEach((chunk, i) => {
          result.push({
            ...slide,
            items: chunk,
            tag: `${slide['tag']} [${i + 1}/${chunks.length}]`,
            footerRight: `${(slide['footerRight'] as string)} (${i + 1}/${chunks.length})`,
          });
        });
        continue;
      }
    }

    if (type === 'telemetry') {
      const stats = slide['stats'] as unknown[] | undefined;
      if (stats && stats.length > 4) {
        const chunks = chunkArray(stats, 4);
        chunks.forEach((chunk, i) => {
          result.push({
            ...slide,
            stats: chunk,
            tag: `${slide['tag']} [${i + 1}/${chunks.length}]`,
            footerRight: `${(slide['footerRight'] as string)} (${i + 1}/${chunks.length})`,
          });
        });
        continue;
      }
    }

    if (type === 'timeline') {
      const events = slide['events'] as unknown[] | undefined;
      if (events && events.length > 4) {
        const chunks = chunkArray(events, 4);
        chunks.forEach((chunk, i) => {
          result.push({
            ...slide,
            events: chunk,
            tag: `${slide['tag']} [${i + 1}/${chunks.length}]`,
            footerRight: `${(slide['footerRight'] as string)} (${i + 1}/${chunks.length})`,
          });
        });
        continue;
      }
    }

    if (type === 'table') {
      const rows = slide['rows'] as unknown[] | undefined;
      if (rows && rows.length > 5) {
        const chunks = chunkArray(rows, 5);
        chunks.forEach((chunk, i) => {
          result.push({
            ...slide,
            rows: chunk,
            tag: `${slide['tag']} [${i + 1}/${chunks.length}]`,
            footerRight: `${(slide['footerRight'] as string)} (${i + 1}/${chunks.length})`,
          });
        });
        continue;
      }
    }

    result.push(slide);
  }

  return result;
}

async function fetchImagesForSlides(
  slides: Record<string, unknown>[],
  jobId: string,
): Promise<Record<string, unknown>[]> {
  const results: Record<string, unknown>[] = [];

  for (const slide of slides) {
    const type = slide['type'] as string;
    if ((type === 'image-split' || type === 'image-cover') && slide['imageKeywords'] && !slide['imageUrl']) {
      try {
        const keywords = slide['imageKeywords'] as string;
        let imageUrl: string;

        try {
          const photo = await getRandomPhoto(keywords, { orientation: 'portrait' });
          const url = getPhotoUrl(photo, 'raw', 1080);
          const buffer = await downloadImage(url);
          const r2Key = await uploadImage(jobId, results.length, buffer);
          imageUrl = await getPresignedUrl(r2Key);
        } catch {
          imageUrl = getPlaceholderUrl(keywords);
        }

        results.push({ ...slide, imageUrl });
      } catch {
        results.push(slide);
      }
    } else {
      results.push(slide);
    }
  }

  return results;
}

const worker = createWorker<StructurePayload>('structure', async (job) => {
  const { jobId, rawText } = job.data;
  const jobLogger = logger.child({ jobId, workerType: 'structure' });

  const existing = await JobRepository.findById(jobId);
  if (!existing) {
    jobLogger.error('Job not found, skipping');
    return;
  }
  if (existing.status !== 'structuring') {
    jobLogger.info({ currentStatus: existing.status }, 'Job already advanced, skipping');
    return;
  }

  jobLogger.info('Starting structuring with template-driven pipeline');

  try {
    const template = TEMPLATES[existing.template_id as keyof typeof TEMPLATES];
    if (!template) {
      await JobRepository.markFailed(jobId, {
        stage: 'structuring',
        reason: 'unknown_template',
        details: `Template "${existing.template_id}" not found`,
      });
      return;
    }

    const prompt = template.getPrompt(rawText);
    const rawResponse = await llm.generateJSON(prompt, rawText);

    jobLogger.info({ rawSnippet: rawResponse.slice(0, 200) }, 'Raw LLM response');

    const cleaned = stripMarkdownFences(rawResponse);
    let parsed: unknown;
    try {
      const result = parseLlmXmlOutput(cleaned);
      parsed = result;
    } catch {
      throw new Error('Could not parse LLM response as XML');
    }

    const result = template.schema.safeParse(parsed);

    if (!result.success) {
      const errorMessages = result.error.issues
        .map((i) => `${i.path.join('.')}: ${i.message}`)
        .join(', ');

      jobLogger.error({ errors: result.error.issues }, 'Schema validation failed');

      await JobRepository.markFailed(jobId, {
        stage: 'structuring',
        reason: 'schema_validation_failed',
        details: errorMessages,
      });
      return;
    }

    const data = result.data as { slides: Record<string, unknown>[]; meta?: Record<string, unknown> };

    const paginated = paginateSlides(data.slides);

    const withImages = await fetchImagesForSlides(paginated, jobId);

    await JobRepository.updateStatus(jobId, 'rendering', {
      contentPayload: { ...data, slides: withImages },
      slideCount: withImages.length,
    });

    await renderQueue.add('render-slide', { jobId });

    jobLogger.info(
      { slideCount: withImages.length, template: existing.template_id },
      'Dispatched to render queue',
    );
  } catch (err) {
    const classified = classifyError(err);
    jobLogger.error({ err, errorType: classified.type }, 'Structuring failed');

    if (classified.type === 'transient' && job.attemptsMade < 3) {
      throw classified;
    }

    await JobRepository.markFailed(jobId, {
      stage: 'structuring',
      reason: classified.type,
      details: classified.message,
    });
  }
});

worker.on('failed', (job, err) => {
  logger.error({ jobId: job?.id, err }, 'Worker failed');
});

logger.info('worker-structure started');

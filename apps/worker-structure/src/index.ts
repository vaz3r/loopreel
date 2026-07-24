import { JobRepository } from '@loopreel/db';
import { createWorker, createQueue } from '@loopreel/queue';
import type { StructurePayload } from '@loopreel/schemas';
import { getTemplate, getPrompt, autoSelectTemplate, paginateContract } from '@loopreel/loop-bridge';
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

async function fetchImagesForSlides(
  slides: Record<string, unknown>[],
  jobId: string,
): Promise<Record<string, unknown>[]> {
  return Promise.all(
    slides.map(async (slide, idx) => {
      const type = slide['type'] as string;
      if ((type === 'image-split' || type === 'image-cover') && slide['imageKeywords'] && !slide['imageUrl']) {
        try {
          const keywords = slide['imageKeywords'] as string;
          let imageUrl: string;

          try {
            const photo = await getRandomPhoto(keywords, { orientation: 'portrait' });
            const url = getPhotoUrl(photo, 'raw', 1080);
            const buffer = await downloadImage(url);
            const r2Key = await uploadImage(jobId, idx, buffer);
            imageUrl = await getPresignedUrl(r2Key);
          } catch {
            imageUrl = getPlaceholderUrl(keywords);
          }

          return { ...slide, imageUrl };
        } catch {
          return slide;
        }
      }
      return slide;
    }),
  );
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

  jobLogger.info('Starting structuring with loop-bridge pipeline');

  try {
    let targetTemplateId = existing.template_id;

    if (!targetTemplateId || targetTemplateId === 'auto') {
      jobLogger.info('Auto-selecting optimal template via Dynamic LLM Classifier...');
      const classification = await autoSelectTemplate(rawText);
      targetTemplateId = classification.templateId;
      jobLogger.info({ autoSelected: targetTemplateId, rationale: classification.rationale }, 'Template auto-selected');

      await JobRepository.updateTemplate(jobId, targetTemplateId);
    }

    const template = getTemplate(targetTemplateId);
    const brandKit = (existing.brand_kit as Record<string, string | undefined>) ?? {};
    const prompt = await getPrompt(targetTemplateId, rawText, brandKit);
    const rawResponse = await llm.generateJSON(prompt, rawText);

    jobLogger.info({ rawSnippet: rawResponse.slice(0, 200) }, 'Raw LLM response');

    const cleaned = stripMarkdownFences(rawResponse);
    let parsed: unknown;

    // Try XML first (primary format), then JSON (fallback)
    try {
      const result = parseLlmXmlOutput(cleaned);
      parsed = result;
    } catch {
      try {
        parsed = JSON.parse(cleaned);
      } catch {
        throw new Error('Could not parse LLM response as XML or JSON');
      }
    }

    const result = template.schema.safeParse(parsed);

    if (!result.success) {
      const errorMessages = result.error.issues
        .map((i: { path: (string | number)[]; message: string }) => `${i.path.join('.')}: ${i.message}`)
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

    const { slides: paginated } = paginateContract({ slides: data.slides });

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
}, { concurrency: 5 });

worker.on('failed', (job, err) => {
  logger.error({ jobId: job?.id, err }, 'Worker failed');
});

logger.info('worker-structure started');

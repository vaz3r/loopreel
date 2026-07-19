import { JobRepository } from '@loopreel/db';
import { createWorker, createQueue } from '@loopreel/queue';
import type { StructurePayload, RenderPayload } from '@loopreel/schemas';
import { TEMPLATES } from '@loopreel/templates';
import { createLLMClient } from '@loopreel/llm';
import { classifyError } from '@loopreel/errors';
import pino from 'pino';

const logger = pino({
  level: process.env['LOG_LEVEL'] ?? 'info',
  formatters: {
    level: (label) => ({ level: label.toUpperCase() }),
  },
});

const llm = createLLMClient();
const renderQueue = createQueue<RenderPayload>('render');

function stripMarkdownFences(text: string): string {
  let cleaned = text.trim();
  if (cleaned.startsWith('```json')) cleaned = cleaned.slice(7);
  else if (cleaned.startsWith('```')) cleaned = cleaned.slice(3);
  if (cleaned.endsWith('```')) cleaned = cleaned.slice(0, -3);
  return cleaned.trim();
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
      parsed = JSON.parse(cleaned);
    } catch {
      const firstBrace = cleaned.indexOf('{');
      const lastBrace = cleaned.lastIndexOf('}');
      if (firstBrace !== -1 && lastBrace > firstBrace) {
        parsed = JSON.parse(cleaned.slice(firstBrace, lastBrace + 1));
      } else {
        throw new Error('Could not parse LLM response as JSON');
      }
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

    await JobRepository.updateStatus(jobId, 'rendering', {
      contentPayload: result.data,
      slideCount: result.data.slides.length,
    });

    await renderQueue.add('render-slide', { jobId });

    jobLogger.info(
      { slideCount: result.data.slides.length, template: existing.template_id },
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

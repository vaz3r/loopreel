import { JobRepository, WorkerRepository } from '@loopreel/db';
import { createWorker } from '@loopreel/queue';
import type { StructurePayload } from '@loopreel/schemas';
import { generateStructuredContent } from '@loopreel/llm';
import { getStructurePrompt } from '@loopreel/templates';
import { StructuredContentSchema } from '@loopreel/schemas';
import { classifyError } from '@loopreel/errors';
import pino from 'pino';
import { randomUUID } from 'node:crypto';
import { hostname } from 'node:os';

const logger = pino({
  level: process.env['LOG_LEVEL'] ?? 'info',
  formatters: {
    level: (label) => ({ level: label.toUpperCase() }),
  },
});

const INSTANCE_ID = randomUUID();
const HOSTNAME = hostname();
let jobsProcessed = 0n;

const heartbeat = setInterval(() => {
  void WorkerRepository.upsertHeartbeat(INSTANCE_ID, 'structure', HOSTNAME, 'structure', jobsProcessed);
}, 10_000);

const systemPrompt = await getStructurePrompt();

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

  jobLogger.info('Starting structuring');

  try {
    const response = await generateStructuredContent([
      { role: 'system', content: systemPrompt },
      { role: 'user', content: rawText },
    ], jobLogger);

    const parsed = JSON.parse(response.content) as unknown;
    const result = StructuredContentSchema.safeParse(parsed);

    if (!result.success) {
      jobLogger.error({ errors: result.error.issues }, 'LLM output failed Zod validation');
      await JobRepository.markFailed(jobId, `LLM schema validation failed: ${result.error.message}`);
      return;
    }

    const slideCount = result.data.valuePoints.length + 2;

    await JobRepository.updateStatusAndOutbox(
      jobId,
      'rendering',
      'render',
      { jobId },
      undefined,
    );

    await JobRepository.updateStatus(jobId, 'rendering', {
      structuredJson: result.data,
      slideCount,
    });

    jobsProcessed++;
    jobLogger.info({ slideCount }, 'Dispatched to render queue');
  } catch (err) {
    const classified = classifyError(err);
    jobLogger.error({ err, errorType: classified.type }, 'Structuring failed');

    if (classified.type === 'transient' && job.attemptsMade < 3) {
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
});

logger.info({ instanceId: INSTANCE_ID }, 'worker-structure started');

import { JobRepository, WorkerRepository } from '@loopreel/db';
import { createWorker } from '@loopreel/queue';
import type { IngestPayload } from '@loopreel/schemas';
import { handleError } from '@loopreel/errors';
import pino from 'pino';
import { randomUUID } from 'node:crypto';
import { hostname } from 'node:os';
import { handleYouTube } from './handlers/youtube.js';
import { handleBlog } from './handlers/blog.js';

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
  void WorkerRepository.upsertHeartbeat(INSTANCE_ID, 'ingest', HOSTNAME, 'ingest', jobsProcessed);
}, 10_000);

const worker = createWorker<IngestPayload>('ingest', async (job) => {
  const { jobId, sourceUrl, sourceType } = job.data;
  const jobLogger = logger.child({ jobId, workerType: 'ingest' });

  const existing = await JobRepository.findById(jobId);
  if (!existing) {
    jobLogger.error('Job not found, skipping');
    return;
  }
  if (existing.status !== 'queued' && existing.status !== 'ingesting') {
    jobLogger.info({ currentStatus: existing.status }, 'Job already advanced, skipping');
    return;
  }

  await JobRepository.updateStatus(jobId, 'ingesting');
  jobLogger.info({ sourceType, sourceUrl }, 'Starting ingest');

  try {
    if (sourceType === 'youtube') {
      await handleYouTube(jobId, sourceUrl, jobLogger);
    } else {
      await handleBlog(jobId, sourceUrl, jobLogger);
    }
    jobsProcessed++;
  } catch (err) {
    await handleError(jobId, err, jobLogger);
  }
});

worker.on('failed', (job, err) => {
  logger.error({ jobId: job?.id, err }, 'Worker failed');
});

worker.on('completed', (job) => {
  logger.info({ jobId: job.id }, 'Job completed');
});

process.on('SIGTERM', () => {
  clearInterval(heartbeat);
});

logger.info({ instanceId: INSTANCE_ID }, 'worker-ingest started');

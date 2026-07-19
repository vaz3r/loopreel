import { JobRepository } from '@loopreel/db';
import { createWorker, createQueue } from '@loopreel/queue';
import type { TranscribePayload } from '@loopreel/schemas';
import { classifyError } from '@loopreel/errors';
import pino from 'pino';
import { transcribeAudio } from './services/whisper.js';

const logger = pino({
  level: process.env['LOG_LEVEL'] ?? 'info',
  formatters: {
    level: (label) => ({ level: label.toUpperCase() }),
  },
});

const structureQueue = createQueue('structure');

const worker = createWorker<TranscribePayload>('transcribe', async (job) => {
  const { jobId, audioR2Key } = job.data;
  const jobLogger = logger.child({ jobId, workerType: 'transcribe' });

  const existing = await JobRepository.findById(jobId);
  if (!existing) {
    jobLogger.error('Job not found, skipping');
    return;
  }
  if (existing.status !== 'transcribing') {
    jobLogger.info({ currentStatus: existing.status }, 'Job already advanced, skipping');
    return;
  }

  jobLogger.info('Starting transcription');

  try {
    const transcript = await transcribeAudio(jobId, audioR2Key, jobLogger);

    await JobRepository.updateStatus(jobId, 'structuring');

    await structureQueue.add(`job-${jobId}`, {
      jobId,
      rawText: transcript,
    });

    jobLogger.info('Dispatched to structure queue');
  } catch (err) {
    const classified = classifyError(err);
    jobLogger.error({ err, errorType: classified.type }, 'Transcription failed');

    if (classified.type === 'transient' && job.attemptsMade < 2) {
      throw classified;
    }

    await JobRepository.markFailed(jobId, {
      stage: 'transcribing',
      reason: classified.type,
      details: classified.message,
    });
  }
});

worker.on('failed', (job, err) => {
  logger.error({ jobId: job?.id, err }, 'Worker failed');
});

logger.info('worker-transcribe started');

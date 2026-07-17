import { createWorker } from '@loopreel/queue';
import type { TranscribePayload } from '@loopreel/schemas';

const worker = createWorker<TranscribePayload>('transcribe', async (job) => {
  const { jobId } = job.data;
  console.log(`worker-transcribe: processing job ${jobId}`);

  // TODO: Download audio from R2, call Whisper, upload transcript
  // TODO: Update job status and write outbox event
});

worker.on('failed', (job, err) => {
  console.error(`worker-transcribe: job ${job?.id} failed`, err);
});

console.log('worker-transcribe started');

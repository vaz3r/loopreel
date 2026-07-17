import { createWorker } from '@loopreel/queue';
import type { IngestPayload } from '@loopreel/schemas';

const worker = createWorker<IngestPayload>('ingest', async (job) => {
  const { jobId } = job.data;
  console.log(`worker-ingest: processing job ${jobId}`);

  // TODO: Implement yt-dlp / cheerio logic
  // TODO: Update job status and write outbox event
});

worker.on('failed', (job, err) => {
  console.error(`worker-ingest: job ${job?.id} failed`, err);
});

console.log('worker-ingest started');

import { createWorker } from '@loopreel/queue';
import type { StructurePayload } from '@loopreel/schemas';

const worker = createWorker<StructurePayload>('structure', async (job) => {
  const { jobId } = job.data;
  console.log(`worker-structure: processing job ${jobId}`);

  // TODO: Call LLM with rawText, validate against StructuredContentSchema
  // TODO: Update job status and write outbox event
});

worker.on('failed', (job, err) => {
  console.error(`worker-structure: job ${job?.id} failed`, err);
});

console.log('worker-structure started');

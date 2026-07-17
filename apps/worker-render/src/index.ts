import { createWorker } from '@loopreel/queue';
import type { RenderPayload } from '@loopreel/schemas';

const worker = createWorker<RenderPayload>('render', async (job) => {
  const { jobId } = job.data;
  console.log(`worker-render: processing job ${jobId}`);

  // TODO: Fetch job from DB, use Playwright pool to screenshot slides
  // TODO: Upload PNGs to R2, insert generated_assets rows, mark job complete
});

worker.on('failed', (job, err) => {
  console.error(`worker-render: job ${job?.id} failed`, err);
});

console.log('worker-render started');

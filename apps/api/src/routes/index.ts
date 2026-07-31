import type { FastifyPluginAsync } from 'fastify';
import { slidesRoute } from './slides.js';
import { statsRoute } from './stats.js';
import { createJobRoute } from './jobs/create.js';
import { listJobsRoute } from './jobs/list.js';
import { jobDetailRoute } from './jobs/detail.js';
import { retryJobRoute } from './jobs/retry.js';
import { downloadJobRoute } from './jobs/download.js';

export const routes: FastifyPluginAsync = async (app) => {
  await app.register(slidesRoute);
  await app.register(statsRoute);
  await app.register(createJobRoute);
  await app.register(listJobsRoute);
  await app.register(jobDetailRoute);
  await app.register(retryJobRoute);
  await app.register(downloadJobRoute);
};

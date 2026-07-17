import Fastify from 'fastify';
import { jobsRoute } from './routes/jobs.js';
import { healthRoute } from './routes/health.js';
import { renderRoute } from './routes/render.js';

const app = Fastify({
  logger: {
    level: process.env['LOG_LEVEL'] ?? 'info',
    formatters: {
      level: (label) => ({ level: label.toUpperCase() }),
    },
  },
});

await app.register(jobsRoute);
await app.register(healthRoute);
await app.register(renderRoute);

const port = Number(process.env['API_PORT'] ?? 3000);

await app.listen({ port, host: '0.0.0.0' });

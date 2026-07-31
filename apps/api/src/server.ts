import Fastify from 'fastify';
import cors from '@fastify/cors';
import swagger from '@fastify/swagger';
import swaggerUi from '@fastify/swagger-ui';
import { routes } from './routes/index.js';
import { healthRoute } from './routes/health.js';
import { adminRoute } from './routes/admin.js';
import { startTtlSweeper } from './services/sweeper.js';

const app = Fastify({
  logger: {
    level: process.env['LOG_LEVEL'] ?? 'info',
    formatters: {
      level: (label) => ({ level: label.toUpperCase() }),
    },
  },
});

await app.register(cors);
await app.register(swagger, {
  openapi: {
    info: {
      title: 'Loopreel API',
      description: 'Content repurposing engine - transform URLs into multi-format carousels',
      version: '0.1.0',
    },
    servers: [
      { url: 'http://localhost:3000', description: 'Development' },
    ],
  },
});

await app.register(swaggerUi, {
  routePrefix: '/docs',
});

await app.register(routes);
await app.register(healthRoute);
await app.register(adminRoute);

startTtlSweeper();

const port = Number(process.env['API_PORT'] ?? 3000);

await app.listen({ port, host: '0.0.0.0' });

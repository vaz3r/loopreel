import Fastify from 'fastify';

const app = Fastify({ logger: true });

app.get('/api/health', async () => {
  return { status: 'ok' };
});

const port = Number(process.env['API_PORT'] ?? 3000);

await app.listen({ port, host: '0.0.0.0' });

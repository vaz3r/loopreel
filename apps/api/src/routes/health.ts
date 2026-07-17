import type { FastifyPluginAsync } from 'fastify';
import { pool, WorkerRepository } from '@loopreel/db';

export const healthRoute: FastifyPluginAsync = async (app) => {
  app.get('/api/health', async (_request, reply) => {
    const checks: Record<string, string> = {};

    try {
      await pool.query('SELECT 1');
      checks['db'] = 'connected';
    } catch {
      checks['db'] = 'disconnected';
    }

    const activeWorkers = await WorkerRepository.findActiveByType();

    return reply.send({
      status: checks['db'] === 'connected' ? 'ok' : 'degraded',
      db: checks['db'],
      activeWorkers,
    });
  });
};

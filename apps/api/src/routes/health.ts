import type { FastifyPluginAsync } from 'fastify';
import { pool } from '@loopreel/db';
import { connection } from '@loopreel/queue';

export const healthRoute: FastifyPluginAsync = async (app) => {
  app.get('/api/health', async (_request, reply) => {
    const checks: Record<string, string> = {};

    try {
      await pool.query('SELECT 1');
      checks['db'] = 'connected';
    } catch {
      checks['db'] = 'disconnected';
    }

    try {
      await connection.ping();
      checks['redis'] = 'connected';
    } catch {
      checks['redis'] = 'disconnected';
    }

    const allHealthy = checks['db'] === 'connected' && checks['redis'] === 'connected';

    return reply.send({
      status: allHealthy ? 'ok' : 'degraded',
      db: checks['db'],
      redis: checks['redis'],
    });
  });
};

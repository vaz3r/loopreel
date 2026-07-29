import type { FastifyPluginAsync } from 'fastify';
import { JobRepository, OutboxRepository } from '@loopreel/db';
import { createQueue } from '@loopreel/queue';

export const adminRoute: FastifyPluginAsync = async (app) => {
  app.delete('/api/admin/purge', async (_request, reply) => {
    const queues = ['ingest', 'transcribe', 'structure', 'render'] as const;

    const jobsDeleted = await JobRepository.purgeAll();
    const outboxDeleted = await OutboxRepository.purgeAll();

    let queuesCleared = 0;
    for (const queueName of queues) {
      try {
        const queue = createQueue(queueName);
        await queue.obliterate();
        queuesCleared++;
      } catch {
        // queue might not exist yet, ignore
      }
    }

    app.log.warn({ jobsDeleted, outboxDeleted, queuesCleared }, 'Database purged');

    return reply.send({
      jobsDeleted,
      outboxDeleted,
      queuesCleared,
    });
  });
};

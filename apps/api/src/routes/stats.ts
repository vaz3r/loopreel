import type { FastifyPluginAsync } from 'fastify';
import { JobRepository } from '@loopreel/db';

export const statsRoute: FastifyPluginAsync = async (app) => {
  app.get('/api/stats', async (_request, reply) => {
    const counts = await JobRepository.countByStatus();
    const costStats = await JobRepository.getCostStats();
    return reply.send({
      total: counts.total ?? 0,
      queued: counts.queued ?? 0,
      processing: (counts.ingesting ?? 0) + (counts.transcribing ?? 0) + (counts.structuring ?? 0) + (counts.rendering ?? 0),
      complete: counts.complete ?? 0,
      failed: counts.failed ?? 0,
      needsReview: counts.needs_review ?? 0,
      avgCost: costStats.avgCost,
      totalCost: costStats.totalCost,
      costJobs: costStats.totalJobs,
    });
  });
};

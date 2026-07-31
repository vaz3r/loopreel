import type { FastifyPluginAsync } from 'fastify';
import { JobRepository } from '@loopreel/db';

export const listJobsRoute: FastifyPluginAsync = async (app) => {
  app.get('/api/jobs', {
    schema: {
      querystring: {
        type: 'object',
        properties: {
          page: { type: 'integer', minimum: 1, default: 1 },
          limit: { type: 'integer', minimum: 1, maximum: 100, default: 20 },
          status: { type: 'string', enum: ['queued', 'ingesting', 'transcribing', 'structuring', 'rendering', 'complete', 'failed', 'needs_review'] },
          search: { type: 'string' },
        },
      },
    },
  }, async (request, reply) => {
    const { page, limit, status, search } = request.query as {
      page?: number;
      limit?: number;
      status?: string;
      search?: string;
    };

    const result = await JobRepository.findAll({ page, limit, status, search });

    return reply.send({
      jobs: result.jobs.map((j) => ({
        id: j.id,
        sourceUrl: j.source_url,
        sourceType: j.source_type,
        status: j.status,
        templateId: j.template_id,
        platform: j.platform,
        slideCount: j.slide_count,
        totalCostUsd: Number(j.total_cost_usd),
        createdAt: j.created_at,
        updatedAt: j.updated_at,
      })),
      total: result.total,
      page: page ?? 1,
      limit: limit ?? 20,
    });
  });
};

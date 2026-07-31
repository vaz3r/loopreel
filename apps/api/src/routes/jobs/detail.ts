import type { FastifyPluginAsync } from 'fastify';
import { JobRepository, AssetRepository } from '@loopreel/db';

export const jobDetailRoute: FastifyPluginAsync = async (app) => {
  app.get('/api/jobs/:id', {
    schema: {
      params: {
        type: 'object',
        required: ['id'],
        properties: {
          id: { type: 'string', format: 'uuid' },
        },
      },
    },
  }, async (request, reply) => {
    const { id } = request.params as { id: string };

    const job = await JobRepository.findById(id);
    if (!job) {
      return reply.status(404).send({ error: 'Job not found' });
    }

    const assets = await AssetRepository.findByJobId(id);
    const llmUsage = await JobRepository.getLlmUsage(id);

    return reply.send({
      id: job.id,
      sourceUrl: job.source_url,
      sourceType: job.source_type,
      status: job.status,
      templateId: job.template_id,
      platform: job.platform,
      errorPayload: job.error_payload,
      contentPayload: job.content_payload,
      slideCount: job.slide_count,
      totalPromptTokens: job.total_prompt_tokens,
      totalCompletionTokens: job.total_completion_tokens,
      totalCostUsd: Number(job.total_cost_usd),
      llmUsage,
      createdAt: job.created_at,
      updatedAt: job.updated_at,
      assets: assets.map((a) => ({
        id: a.id,
        formatType: a.format_type,
        slideIndex: a.slide_index,
        storageUrl: a.storage_url,
        contentText: a.content_text,
      })),
    });
  });
};

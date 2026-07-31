import type { FastifyPluginAsync } from 'fastify';
import { JobRepository, AssetRepository } from '@loopreel/db';
import { getPresignedUrl } from '@loopreel/storage';

export const downloadJobRoute: FastifyPluginAsync = async (app) => {
  app.get('/api/jobs/:id/download', {
    schema: {
      params: {
        type: 'object',
        required: ['id'],
        properties: {
          id: { type: 'string', format: 'uuid' },
        },
      },
      querystring: {
        type: 'object',
        properties: {
          format: { type: 'string', enum: ['slides', 'linkedin', 'twitter', 'all'], default: 'all' },
        },
      },
    },
  }, async (request, reply) => {
    const { id } = request.params as { id: string };
    const { format } = request.query as { format?: string };

    const job = await JobRepository.findById(id);
    if (!job) {
      return reply.status(404).send({ error: 'Job not found' });
    }

    if (job.status !== 'complete') {
      return reply.status(400).send({ error: 'Job not complete' });
    }

    const assets = await AssetRepository.findByJobId(id);
    const slideAssets = assets.filter((a) => a.format_type === 'carousel_slide');

    if (slideAssets.length === 0) {
      return reply.status(404).send({ error: 'No slides found' });
    }

    const slidesWithUrls = await Promise.all(
      slideAssets
        .filter((a) => a.storage_url)
        .map(async (a) => ({
          index: a.slide_index,
          url: await getPresignedUrl(a.storage_url!),
          storageKey: a.storage_url,
        }))
    );

    const response: Record<string, unknown> = {
      jobId: id,
      status: job.status,
      platform: job.platform,
      slideCount: slideAssets.length,
    };

    if (format === 'all' || format === 'slides') {
      response.slides = slidesWithUrls;
    }

    if (format === 'all' || format === 'linkedin') {
      response.linkedin = assets.find((a) => a.format_type === 'linkedin_post')?.content_text;
    }

    if (format === 'all' || format === 'twitter') {
      response.twitter = assets.find((a) => a.format_type === 'twitter_thread')?.content_text;
    }

    return reply.send(response);
  });
};

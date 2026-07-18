import type { FastifyPluginAsync } from 'fastify';
import { JobRepository, AssetRepository } from '@loopreel/db';
import { JobCreateSchema } from '@loopreel/schemas';

function determineSourceType(sourceUrl: string): 'youtube' | 'blog' | 'article' {
  const url = sourceUrl.toLowerCase();
  if (url.includes('youtube.com') || url.includes('youtu.be')) {
    return 'youtube';
  }
  if (url.includes('medium.com') || url.includes('substack.com') || url.includes('hashnode.dev')) {
    return 'article';
  }
  return 'blog';
}

export const jobsRoute: FastifyPluginAsync = async (app) => {
  app.post('/api/jobs', {
    schema: {
      body: {
        type: 'object',
        required: ['sourceUrl'],
        properties: {
          sourceUrl: { type: 'string', format: 'uri' },
          priority: { type: 'number', enum: [1, 5, 10], default: 5 },
          brandKit: { type: 'object' },
          templateId: { type: 'string', default: 'modern-dark' },
        },
      },
    },
  }, async (request, reply) => {
    const parse = JobCreateSchema.safeParse(request.body);
    if (!parse.success) {
      return reply.status(400).send({ error: parse.error.issues });
    }

    const { sourceUrl, priority, brandKit, templateId } = parse.data;
    const sourceType = determineSourceType(sourceUrl);

    const jobId = await JobRepository.create({
      sourceUrl,
      sourceType,
      priority,
      brandKit,
      templateId,
    });

    app.log.info({ jobId, sourceType }, 'Job created');
    return reply.status(201).send({ jobId, status: 'queued' });
  });

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

    return reply.send({
      id: job.id,
      status: job.status,
      errorMessage: job.error_message,
      structuredJson: job.structured_json,
      slideCount: job.slide_count,
      assets: assets.map((a) => ({
        id: a.id,
        formatType: a.format_type,
        slideIndex: a.slide_index,
        storageUrl: a.storage_url,
        contentText: a.content_text,
      })),
    });
  });

  app.get('/api/jobs/:id/download', {
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

    if (job.status !== 'complete') {
      return reply.status(400).send({ error: 'Job not complete' });
    }

    const assets = await AssetRepository.findByJobId(id);
    const slideAssets = assets.filter((a) => a.format_type === 'carousel_slide');

    if (slideAssets.length === 0) {
      return reply.status(404).send({ error: 'No slides found' });
    }

    return reply.send({
      jobId: id,
      slides: slideAssets.map((a) => ({
        index: a.slide_index,
        url: a.storage_url,
      })),
      linkedin: assets.find((a) => a.format_type === 'linkedin_post')?.content_text,
      twitter: assets.find((a) => a.format_type === 'twitter_thread')?.content_text,
    });
  });
};

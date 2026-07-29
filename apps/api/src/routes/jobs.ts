import type { FastifyPluginAsync } from 'fastify';
import { JobRepository, AssetRepository, OutboxRepository } from '@loopreel/db';
import { JobCreateSchema } from '@loopreel/schemas';
import { createQueue } from '@loopreel/queue';
import { getPresignedUrl } from '@loopreel/storage';

export const slidesRoute: FastifyPluginAsync = async (app) => {
  app.get('/api/slides/*', async (request, reply) => {
    const { '*': storageKey } = request.params as { '*': string };
    if (!storageKey) {
      return reply.status(400).send({ error: 'Missing storage key' });
    }
    const url = await getPresignedUrl(storageKey);
    return reply.redirect(url);
  });
};

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

const ingestQueue = createQueue('ingest');

export const jobsRoute: FastifyPluginAsync = async (app) => {
  app.post('/api/jobs', {
    schema: {
      body: {
        type: 'object',
        required: ['sourceUrl'],
        properties: {
          sourceUrl: { type: 'string', format: 'uri' },
          platform: { type: 'string', enum: ['instagram-feed', 'instagram-square', 'instagram-stories', 'linkedin', 'x', 'facebook'], default: 'instagram-feed' },
          templateId: { type: 'string', enum: ['auto', 'paper-of-record', 'the-globalist', 'the-terminal', 'the-curator', 'the-academic'], default: 'auto' },
          brandKit: {
            type: 'object',
            properties: {
              bg: { type: 'string' },
              text: { type: 'string' },
              accent: { type: 'string' },
              fontSerif: { type: 'string' },
              fontSans: { type: 'string' },
              logoUrl: { type: 'string' },
            },
          },
          generateText: { type: 'boolean', default: false },
        },
      },
    },
  }, async (request, reply) => {
    const parse = JobCreateSchema.safeParse(request.body);
    if (!parse.success) {
      return reply.status(400).send({ error: parse.error.issues });
    }

    const { sourceUrl, platform, templateId, brandKit, generateText } = parse.data;
    const sourceType = determineSourceType(sourceUrl);

    const jobId = await JobRepository.create({
      sourceUrl,
      sourceType,
      templateId: templateId ?? 'auto',
      platform: platform ?? 'instagram-feed',
      brandKit: brandKit ?? {},
      generateText: generateText ?? false,
    });

    const jobPayload = { jobId, sourceUrl, sourceType };

    await OutboxRepository.create({
      queueName: 'ingest',
      jobPayload,
    });

    await ingestQueue.add(`job-${jobId}`, jobPayload);

    app.log.info({ jobId, sourceType, platform }, 'Job created');
    return reply.status(201).send({ jobId, status: 'queued' });
  });

  app.get('/api/jobs', {
    schema: {
      querystring: {
        type: 'object',
        properties: {
          page: { type: 'integer', minimum: 1, default: 1 },
          limit: { type: 'integer', minimum: 1, maximum: 100, default: 20 },
          status: { type: 'string', enum: ['queued', 'ingesting', 'transcribing', 'structuring', 'rendering', 'complete', 'failed'] },
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
        createdAt: j.created_at,
        updatedAt: j.updated_at,
      })),
      total: result.total,
      page: page ?? 1,
      limit: limit ?? 20,
    });
  });

  app.get('/api/stats', async (_request, reply) => {
    const counts = await JobRepository.countByStatus();
    return reply.send({
      total: counts.total ?? 0,
      queued: counts.queued ?? 0,
      processing: (counts.ingesting ?? 0) + (counts.transcribing ?? 0) + (counts.structuring ?? 0) + (counts.rendering ?? 0),
      complete: counts.complete ?? 0,
      failed: counts.failed ?? 0,
    });
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
      sourceUrl: job.source_url,
      sourceType: job.source_type,
      status: job.status,
      templateId: job.template_id,
      platform: job.platform,
      errorPayload: job.error_payload,
      contentPayload: job.content_payload,
      slideCount: job.slide_count,
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

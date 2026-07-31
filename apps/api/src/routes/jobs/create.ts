import type { FastifyPluginAsync } from 'fastify';
import { JobRepository, OutboxRepository } from '@loopreel/db';
import { JobCreateSchema } from '@loopreel/schemas';
import { createQueue } from '@loopreel/queue';

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

export const createJobRoute: FastifyPluginAsync = async (app) => {
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
};

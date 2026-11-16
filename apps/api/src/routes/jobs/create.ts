import type { FastifyPluginAsync } from 'fastify';
import { JobRepository, OutboxRepository } from '@loopreel/db';
import { JobCreateSchema, getPlatformIds } from '@loopreel/schemas';
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
const structureQueue = createQueue('structure');

export const createJobRoute: FastifyPluginAsync = async (app) => {
  app.post('/api/jobs', {
    schema: {
      body: {
        type: 'object',
        properties: {
          sourceUrl: { type: 'string' },
          prompt: { type: 'string' },
          platform: { type: 'string', enum: getPlatformIds(), default: 'instagram-feed' },
          engine: { type: 'string', enum: ['bespoke', 'classic'], default: 'bespoke' },
          templateId: { type: 'string', default: 'bespoke' },
          narrativePreset: { type: 'string' },
          targetSlideCount: { type: 'integer', minimum: 4, maximum: 14, default: 7 },
          brandKit: {
            anyOf: [
              { type: 'string' },
              {
                type: 'object',
                properties: {
                  slug: { type: 'string' },
                  bg: { type: 'string' },
                  text: { type: 'string' },
                  accent: { type: 'string' },
                  surface: { type: 'string' },
                  fontSerif: { type: 'string' },
                  fontSans: { type: 'string' },
                  fontMono: { type: 'string' },
                  wordmark: { type: 'string' },
                  handle: { type: 'string' },
                  wordmarkStyle: { type: 'string' },
                  logoUrl: { type: 'string' },
                },
                additionalProperties: true,
              },
            ],
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

    const { sourceUrl, prompt, platform, engine, templateId, brandKit, narrativePreset, targetSlideCount, generateText } = parse.data;

    const isPromptMode = ((!sourceUrl || sourceUrl.trim().length === 0) && !!prompt && prompt.trim().length > 0) || (!!sourceUrl && sourceUrl.startsWith('prompt:'));
    const effectivePrompt = prompt?.trim() || (sourceUrl?.startsWith('prompt:') ? sourceUrl.replace(/^prompt:\s*/, '').trim() : undefined);
    const effectiveSourceUrl = isPromptMode ? `prompt:${effectivePrompt}` : sourceUrl!.trim();
    const sourceType = isPromptMode ? 'prompt' : determineSourceType(sourceUrl!);

    const targetTemplateId = engine === 'bespoke'
      ? (templateId === 'auto' ? 'bespoke' : templateId)
      : (templateId === 'bespoke' ? 'auto' : (templateId ?? 'auto'));

    const brandKitObj = typeof brandKit === 'string' ? { slug: brandKit } : (brandKit ?? {});
    const effectiveBrandKit = {
      ...brandKitObj,
      engine,
      editorialDirective: prompt?.trim() || undefined,
      narrativePreset: narrativePreset || (brandKitObj as any)?.narrativePreset || 'storytelling',
      targetSlideCount: targetSlideCount || (brandKitObj as any)?.targetSlideCount || 7,
    };

    const jobId = await JobRepository.create({
      sourceUrl: effectiveSourceUrl,
      sourceType,
      templateId: targetTemplateId,
      platform: platform ?? 'instagram-feed',
      brandKit: effectiveBrandKit,
      generateText: generateText ?? false,
    });

    if (isPromptMode) {
      // In prompt mode, skip ingest entirely and route straight to structure worker
      const structurePayload = { jobId, rawText: (effectivePrompt || prompt || '').trim(), engine };
      await OutboxRepository.create({
        queueName: 'structure',
        jobPayload: structurePayload,
      });
      await structureQueue.add(`job-${jobId}`, structurePayload);
      app.log.info({ jobId, sourceType: 'prompt' }, 'Prompt-based job created and enqueued directly to structure queue');
    } else {
      const jobPayload = { jobId, sourceUrl: effectiveSourceUrl, sourceType, engine };
      await OutboxRepository.create({
        queueName: 'ingest',
        jobPayload,
      });
      await ingestQueue.add(`job-${jobId}`, jobPayload);
      app.log.info({ jobId, sourceType, platform }, 'URL-based job created and enqueued to ingest queue');
    }

    return reply.status(201).send({ jobId, status: 'queued' });
  });
};

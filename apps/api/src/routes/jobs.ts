import type { FastifyPluginAsync } from 'fastify';
import { JobRepository, AssetRepository } from '@loopreel/db';
import { JobCreateSchema, type BrandKit } from '@loopreel/schemas';
import { getPresignedUrl } from '@loopreel/storage';

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

// Convert partial brand kit input to a basic BrandKit for storage
function toBrandKit(brandKit?: { name?: string; primaryColor?: string; secondaryColor?: string }): BrandKit {
  const name = brandKit?.name ?? 'Default Brand';
  const primaryColor = brandKit?.primaryColor ?? '#e94560';
  const secondaryColor = brandKit?.secondaryColor ?? '#4ECDC4';

  return {
    name,
    colors: {
      primary: primaryColor,
      secondary: secondaryColor,
      accent: '#45B7D1',
      background: '#1A1A2E',
      surface: '#232340',
      text: '#FFFFFF',
      muted: '#8888AA',
    },
    fonts: {
      heading: 'Inter',
      body: 'Inter',
      headingWeight: 800,
      bodyWeight: 400,
    },
    styleDirection: 'modern',
  };
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
          platform: { type: 'string', enum: ['instagram-feed', 'instagram-stories', 'linkedin', 'facebook'], default: 'instagram-feed' },
          brandKit: { type: 'object' },
          templateId: { type: 'string' },
        },
      },
    },
  }, async (request, reply) => {
    const parse = JobCreateSchema.safeParse(request.body);
    if (!parse.success) {
      return reply.status(400).send({ error: parse.error.issues });
    }

    const { sourceUrl, priority, platform, brandKit, templateId } = parse.data;
    const sourceType = determineSourceType(sourceUrl);

    const fullBrandKit = toBrandKit(brandKit);

    const jobId = await JobRepository.create({
      sourceUrl,
      sourceType,
      priority,
      brandKit: fullBrandKit,
      templateId: templateId ?? 'modern-bold',
    });

    app.log.info({ jobId, sourceType, platform }, 'Job created');
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

    // Generate presigned URLs for slide images
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
      platform: (job as unknown as { platform?: string }).platform ?? 'instagram-feed',
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

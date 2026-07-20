import React from 'react';
import type { FastifyPluginAsync } from 'fastify';
import { renderToStaticMarkup } from 'react-dom/server';
import { writeFileSync, mkdirSync } from 'fs';
import { join } from 'path';
import { JobRepository } from '@loopreel/db';
import { TEMPLATES } from '@loopreel/templates';

export const renderRoute: FastifyPluginAsync = async (app) => {
  app.get('/internal/render/:jobId/:slideIndex', {
    schema: {
      params: {
        type: 'object',
        required: ['jobId', 'slideIndex'],
        properties: {
          jobId: { type: 'string', format: 'uuid' },
          slideIndex: { type: 'string' },
        },
      },
    },
  }, async (request, reply) => {
    const ip = request.ip;
    const isLocal = ip === '127.0.0.1' || ip === '::1' || ip === '::ffff:127.0.0.1';

    if (!isLocal) {
      return reply.status(403).send({ error: 'Forbidden' });
    }

    const { jobId, slideIndex } = request.params as { jobId: string; slideIndex: string };
    const index = Number(slideIndex);

    if (Number.isNaN(index) || index < 0) {
      return reply.status(400).send({ error: 'Invalid slide index' });
    }

    const job = await JobRepository.findById(jobId);
    if (!job) {
      return reply.status(404).send({ error: 'Job not found' });
    }

    if (!job.content_payload) {
      return reply.status(400).send({ error: 'Job has no content payload' });
    }

    const template = TEMPLATES[job.template_id as keyof typeof TEMPLATES];
    if (!template) {
      return reply.status(400).send({ error: `Unknown template: ${job.template_id}` });
    }

    const payload = job.content_payload as { meta: Record<string, unknown>; slides: Array<Record<string, unknown>> };

    if (index >= payload.slides.length) {
      return reply.status(400).send({ error: 'Slide index out of range' });
    }

    const slide = payload.slides[index];
    const meta = payload.meta;

    const html = renderToStaticMarkup(
      React.createElement(template.Component as React.ComponentType<any>, {
        slide: slide as any,
        meta: meta as any,
        slideIndex: index,
        slideCount: job.slide_count ?? payload.slides.length,
      })
    );

    const fullHtml = `<!DOCTYPE html>
<html>
  <head>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Playfair+Display:ital,wght@0,400;0,700;1,400;1,700&family=JetBrains+Mono:wght@400;500&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,600&family=Manrope:wght@200;300;400;500;600;700&family=Space+Mono:wght@400;700&display=swap">
    <style>body { margin: 0; padding: 0; }</style>
  </head>
  <body>${html}</body>
</html>`;

    try {
      const debugDir = '/tmp/loopreel-slides';
      mkdirSync(debugDir, { recursive: true });
      writeFileSync(join(debugDir, `slide-${index}.html`), fullHtml);
    } catch { /* ignore */ }

    return reply.type('text/html').send(fullHtml);
  });
};

import type { FastifyPluginAsync } from 'fastify';
import { renderToStaticMarkup } from 'react-dom/server';
import { writeFileSync, mkdirSync } from 'fs';
import { join } from 'path';
import React from 'react';
import { JobRepository } from '@loopreel/db';
import { getTemplate } from '@loopreel/templates';

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

    const template = getTemplate(job.template_id);

    const payload = job.content_payload as any;

    if (index >= payload.slides.length + 2) {
      return reply.status(400).send({ error: 'Slide index out of range' });
    }

    const platform = job.platform ?? 'instagram-feed';
    const formatMap: Record<string, string> = {
      'instagram-feed': 'portrait',
      'instagram-stories': 'story',
      'linkedin': 'landscape',
      'facebook': 'landscape',
    };
    const format = formatMap[platform] ?? 'portrait';

    const html = renderToStaticMarkup(
      React.createElement(template.Component, {
        content: payload,
        slideIndex: index,
        format,
      })
    );

    const renderGateScript = `
<script>
  (function() {
    document.fonts.ready.then(function() {
      document.body.setAttribute('data-render-complete', 'true');
    });
  })();
</script>`;

    const fullHtml = `<!DOCTYPE html>
<html>
  <head>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,100..900;1,9..144,100..900&family=Archivo:wght@400;500;600;700&display=swap">
    <style>body { margin: 0; padding: 0; }</style>
  </head>
  <body>${html}</body>
  ${renderGateScript}
</html>`;

    try {
      const debugDir = '/tmp/loopreel-slides';
      mkdirSync(debugDir, { recursive: true });
      writeFileSync(join(debugDir, `slide-${index}.html`), fullHtml);
    } catch { /* ignore */ }

    return reply.type('text/html').send(fullHtml);
  });
};

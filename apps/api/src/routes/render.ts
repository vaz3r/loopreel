import type { FastifyPluginAsync } from 'fastify';

export const renderRoute: FastifyPluginAsync = async (app) => {
  app.get('/render/:jobId/:slideIndex', {
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

    // TODO: Fetch job data, render slide HTML
    return reply.send({
      jobId,
      slideIndex: index,
      renderComplete: true,
    });
  });
};

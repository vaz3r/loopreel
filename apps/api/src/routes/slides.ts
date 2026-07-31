import type { FastifyPluginAsync } from 'fastify';
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

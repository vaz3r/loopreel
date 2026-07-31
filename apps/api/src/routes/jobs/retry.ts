import type { FastifyPluginAsync } from 'fastify';
import { JobRepository, OutboxRepository } from '@loopreel/db';
import { createQueue } from '@loopreel/queue';

const ingestQueue = createQueue('ingest');

export const retryJobRoute: FastifyPluginAsync = async (app) => {
  app.post('/api/jobs/:id/retry', {
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

    if (job.status !== 'failed' && job.status !== 'needs_review') {
      return reply.status(400).send({ error: 'Only failed or needs_review jobs can be retried' });
    }

    // Clear error state and reset to queued
    await JobRepository.updateStatus(id, 'queued', {
      contentPayload: null,
      slideCount: 0,
    });

    // Clear error_payload directly
    const { pool } = await import('@loopreel/db');
    await pool.query(
      `UPDATE generation_jobs SET error_payload = NULL, updated_at = NOW() WHERE id = $1`,
      [id],
    );

    // Re-enqueue from ingest
    const jobPayload = { jobId: id, sourceUrl: job.source_url, sourceType: job.source_type };
    await OutboxRepository.create({ queueName: 'ingest', jobPayload });
    await ingestQueue.add(`job-${id}`, jobPayload);

    app.log.info({ jobId: id }, 'Job retried from ingest');
    return reply.send({ jobId: id, status: 'queued' });
  });
};

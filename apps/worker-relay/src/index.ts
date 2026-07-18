import { pool } from '@loopreel/db';
import { createQueue, QUEUE_RETRY_CONFIG } from '@loopreel/queue';
import pino from 'pino';

const logger = pino({
  level: process.env['LOG_LEVEL'] ?? 'info',
  formatters: {
    level: (label) => ({ level: label.toUpperCase() }),
  },
});

const QUEUES = ['ingest', 'transcribe', 'structure', 'render'] as const;
const queues = new Map(QUEUES.map((name) => [name, createQueue(name)]));

let polling = false;

async function pollOutbox(): Promise<void> {
  if (polling) return;
  polling = true;

  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    const { rows: events } = await client.query<{
      id: string;
      queue_name: string;
      job_payload: unknown;
      bullmq_opts: { priority?: number };
    }>(
      `SELECT id, queue_name, job_payload, bullmq_opts
       FROM outbox_events
       WHERE published = false
       ORDER BY created_at ASC
       LIMIT 50
       FOR UPDATE SKIP LOCKED`,
    );

    if (events.length === 0) {
      await client.query('ROLLBACK');
      return;
    }

    const publishedIds: string[] = [];

    for (const event of events) {
      const queueName = event.queue_name as (typeof QUEUES)[number];
      const queue = queues.get(queueName);
      if (!queue) {
        logger.warn({ queueName: event.queue_name }, 'Unknown queue, skipping');
        continue;
      }

      const payload = event.job_payload as Record<string, unknown>;
      const jobId = payload['jobId'] as string;
      const jobName = `job-${jobId}`;

      const retryConfig = QUEUE_RETRY_CONFIG[queueName] ?? { attempts: 1, backoff: { type: 'fixed' as const, delay: 5000 } };

      try {
        await queue.add(jobName, payload, {
          priority: event.bullmq_opts?.priority,
          attempts: retryConfig.attempts,
          backoff: retryConfig.backoff,
        });
        publishedIds.push(event.id);
        logger.info({ jobId, queue: event.queue_name }, 'Dispatched to BullMQ');
      } catch (err) {
        logger.error({ jobId, queue: event.queue_name, err }, 'Failed to dispatch to BullMQ');
      }
    }

    if (publishedIds.length > 0) {
      await client.query(
        `UPDATE outbox_events SET published = true WHERE id = ANY($1)`,
        [publishedIds],
      );
    }

    await client.query('COMMIT');
  } catch (err) {
    await client.query('ROLLBACK');
    logger.error({ err }, 'Outbox relay error');
  } finally {
    polling = false;
    client.release();
  }
}

logger.info('worker-relay started, polling every 500ms');

setInterval(() => {
  void pollOutbox();
}, 500);

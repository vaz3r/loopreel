import { pool } from '@loopreel/db';
import { createQueue } from '@loopreel/queue';

const QUEUES = ['ingest', 'transcribe', 'structure', 'render'] as const;
const queues = QUEUES.map((name) => ({ name, queue: createQueue(name) }));

async function pollOutbox(): Promise<void> {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    const { rows } = await client.query<{
      id: string;
      queue_name: string;
      job_payload: unknown;
      bullmq_opts: unknown;
    }>(
      `SELECT id, queue_name, job_payload, bullmq_opts
       FROM outbox_events
       WHERE published = false
       ORDER BY created_at ASC
       LIMIT 50
       FOR UPDATE SKIP LOCKED`,
    );

    for (const row of rows) {
      const target = queues.find((q) => q.name === row.queue_name);
      if (!target) continue;

      await target.queue.add(`job-${(row.job_payload as Record<string, unknown>)['jobId'] as string}`, row.job_payload, {
        priority: (row.bullmq_opts as Record<string, unknown>)['priority'] as number | undefined,
      });

      await client.query('UPDATE outbox_events SET published = true WHERE id = $1', [row.id]);
    }

    await client.query('COMMIT');
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('Outbox relay error:', err);
  } finally {
    client.release();
  }
}

console.log('worker-relay started, polling every 500ms');

setInterval(() => {
  void pollOutbox();
}, 500);

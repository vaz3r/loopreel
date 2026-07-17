import { pool } from '../pool.js';

export interface OutboxEventRow {
  id: string;
  queue_name: string;
  job_payload: unknown;
  bullmq_opts: { priority?: number };
  published: boolean;
  created_at: Date;
}

export class OutboxRepository {
  static async findUnpublished(limit = 50): Promise<OutboxEventRow[]> {
    const { rows } = await pool.query<OutboxEventRow>(
      `SELECT id, queue_name, job_payload, bullmq_opts, published, created_at
       FROM outbox_events
       WHERE published = false
       ORDER BY created_at ASC
       LIMIT $1
       FOR UPDATE SKIP LOCKED`,
      [limit],
    );
    return rows;
  }

  static async markPublished(ids: string[]): Promise<void> {
    if (ids.length === 0) return;
    await pool.query(
      `UPDATE outbox_events SET published = true WHERE id = ANY($1)`,
      [ids],
    );
  }
}

import { pool } from '../pool.js';

export interface OutboxEventRow {
  id: string;
  queue_name: 'ingest' | 'transcribe' | 'structure' | 'render';
  job_payload: unknown;
  bullmq_opts: unknown;
  published: boolean;
  created_at: Date;
}

export interface InsertOutboxParams {
  queueName: 'ingest' | 'transcribe' | 'structure' | 'render';
  jobPayload: Record<string, unknown>;
  bullmqOpts?: Record<string, unknown>;
}

export class OutboxRepository {
  static async create(params: InsertOutboxParams): Promise<string> {
    const { rows } = await pool.query<{ id: string }>(
      `INSERT INTO outbox_events (queue_name, job_payload, bullmq_opts)
       VALUES ($1, $2, $3)
       RETURNING id`,
      [params.queueName, JSON.stringify(params.jobPayload), JSON.stringify(params.bullmqOpts ?? {})],
    );
    return rows[0]!.id;
  }

  static async findUnpublished(limit = 50): Promise<OutboxEventRow[]> {
    const { rows } = await pool.query<OutboxEventRow>(
      `SELECT * FROM outbox_events
       WHERE published = false
       ORDER BY created_at ASC
       LIMIT $1`,
      [limit],
    );
    return rows;
  }

  static async markPublished(ids: string[]): Promise<void> {
    if (ids.length === 0) return;
    await pool.query(
      `UPDATE outbox_events
       SET published = true
       WHERE id = ANY($1::uuid[])`,
      [ids],
    );
  }
}

import type { JobStatus, SourceType, BrandKit } from '@loopreel/schemas';
import { pool } from '../pool.js';

export interface JobRow {
  id: string;
  source_url: string;
  source_type: SourceType;
  status: JobStatus;
  priority: number;
  brand_kit: BrandKit;
  template_id: string;
  audio_r2_key: string | null;
  structured_json: unknown;
  slide_count: number | null;
  error_message: string | null;
  retry_count: number;
  created_at: Date;
  updated_at: Date;
}

export interface CreateJobParams {
  sourceUrl: string;
  sourceType: SourceType;
  priority: number;
  brandKit: BrandKit;
  templateId: string;
}

export class JobRepository {
  static async create(params: CreateJobParams): Promise<string> {
    const client = await pool.connect();
    try {
      await client.query('BEGIN');

      const { rows } = await client.query<{ id: string }>(
        `INSERT INTO generation_jobs (source_url, source_type, priority, brand_kit, template_id)
         VALUES ($1, $2, $3, $4, $5)
         RETURNING id`,
        [params.sourceUrl, params.sourceType, params.priority, JSON.stringify(params.brandKit), params.templateId],
      );

      const jobId = rows[0]!.id;

      await client.query(
        `INSERT INTO outbox_events (queue_name, job_payload, bullmq_opts, published)
         VALUES ($1, $2, $3, false)`,
        [
          'ingest',
          JSON.stringify({ jobId, sourceUrl: params.sourceUrl, sourceType: params.sourceType }),
          JSON.stringify({ priority: params.priority }),
        ],
      );

      await client.query('COMMIT');
      return jobId;
    } catch (err) {
      await client.query('ROLLBACK');
      throw err;
    } finally {
      client.release();
    }
  }

  static async findById(id: string): Promise<JobRow | null> {
    const { rows } = await pool.query<JobRow>(
      `SELECT * FROM generation_jobs WHERE id = $1`,
      [id],
    );
    return rows[0] ?? null;
  }

  static async updateStatusAndOutbox(
    jobId: string,
    newStatus: JobStatus,
    nextQueue: string,
    outboxPayload: unknown,
    priority?: number,
  ): Promise<void> {
    const client = await pool.connect();
    try {
      await client.query('BEGIN');

      await client.query(
        `UPDATE generation_jobs SET status = $1, updated_at = NOW() WHERE id = $2`,
        [newStatus, jobId],
      );

      await client.query(
        `INSERT INTO outbox_events (queue_name, job_payload, bullmq_opts, published)
         VALUES ($1, $2, $3, false)`,
        [
          nextQueue,
          JSON.stringify(outboxPayload),
          JSON.stringify(priority !== undefined ? { priority } : {}),
        ],
      );

      await client.query('COMMIT');
    } catch (err) {
      await client.query('ROLLBACK');
      throw err;
    } finally {
      client.release();
    }
  }

  static async updateStatus(
    jobId: string,
    status: JobStatus,
    extra?: { errorMessage?: string; structuredJson?: unknown; slideCount?: number; audioR2Key?: string; retryCount?: number },
  ): Promise<void> {
    const sets: string[] = ['status = $1', 'updated_at = NOW()'];
    const values: unknown[] = [status];
    let idx = 2;

    if (extra?.errorMessage !== undefined) {
      sets.push(`error_message = $${idx++}`);
      values.push(extra.errorMessage);
    }
    if (extra?.structuredJson !== undefined) {
      sets.push(`structured_json = $${idx++}`);
      values.push(JSON.stringify(extra.structuredJson));
    }
    if (extra?.slideCount !== undefined) {
      sets.push(`slide_count = $${idx++}`);
      values.push(extra.slideCount);
    }
    if (extra?.audioR2Key !== undefined) {
      sets.push(`audio_r2_key = $${idx++}`);
      values.push(extra.audioR2Key);
    }
    if (extra?.retryCount !== undefined) {
      sets.push(`retry_count = $${idx++}`);
      values.push(extra.retryCount);
    }

    values.push(jobId);
    await pool.query(
      `UPDATE generation_jobs SET ${sets.join(', ')} WHERE id = $${idx}`,
      values,
    );
  }

  static async markFailed(jobId: string, errorMessage: string): Promise<void> {
    await pool.query(
      `UPDATE generation_jobs
       SET status = 'failed', error_message = $1, updated_at = NOW()
       WHERE id = $2`,
      [errorMessage, jobId],
    );
  }
}

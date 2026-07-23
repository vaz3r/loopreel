import type { JobStatus, SourceType } from '@loopreel/schemas';
import { pool } from '../pool.js';

export interface JobRow {
  id: string;
  source_url: string;
  source_type: SourceType;
  status: JobStatus;
  template_id: string;
  platform: string;
  brand_kit: Record<string, string> | null;
  audio_r2_key: string | null;
  content_payload: unknown;
  error_payload: unknown;
  slide_count: number | null;
  retry_count: number;
  created_at: Date;
  updated_at: Date;
}

export interface CreateJobParams {
  sourceUrl: string;
  sourceType: SourceType;
  templateId: string;
  platform: string;
  brandKit?: Record<string, string>;
}

export class JobRepository {
  static async create(params: CreateJobParams): Promise<string> {
    const { rows } = await pool.query<{ id: string }>(
      `INSERT INTO generation_jobs (source_url, source_type, template_id, platform, brand_kit)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING id`,
      [params.sourceUrl, params.sourceType, params.templateId, params.platform, JSON.stringify(params.brandKit ?? {})],
    );
    return rows[0]!.id;
  }

  static async findById(id: string): Promise<JobRow | null> {
    const { rows } = await pool.query<JobRow>(
      `SELECT * FROM generation_jobs WHERE id = $1`,
      [id],
    );
    return rows[0] ?? null;
  }

  static async updateStatus(
    jobId: string,
    status: JobStatus,
    extra?: {
      contentPayload?: unknown;
      slideCount?: number;
      audioR2Key?: string;
      retryCount?: number;
    },
  ): Promise<void> {
    const sets: string[] = ['status = $1', 'updated_at = NOW()'];
    const values: unknown[] = [status];
    let idx = 2;

    if (extra?.contentPayload !== undefined) {
      sets.push(`content_payload = $${idx++}`);
      values.push(JSON.stringify(extra.contentPayload));
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

  static async updateTemplate(jobId: string, templateId: string): Promise<void> {
    await pool.query(
      `UPDATE generation_jobs SET template_id = $1, updated_at = NOW() WHERE id = $2`,
      [templateId, jobId],
    );
  }

  static async markFailed(
    jobId: string,
    errorPayload: { stage: string; reason: string; details: string },
  ): Promise<void> {
    await pool.query(
      `UPDATE generation_jobs
       SET status = 'failed', error_payload = $1, updated_at = NOW()
       WHERE id = $2`,
      [JSON.stringify(errorPayload), jobId],
    );
  }
}

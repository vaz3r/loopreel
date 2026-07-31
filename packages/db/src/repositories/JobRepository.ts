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
  generate_text: boolean;
  audio_r2_key: string | null;
  content_payload: unknown;
  error_payload: unknown;
  slide_count: number | null;
  retry_count: number;
  checkpoint_phase: string | null;
  checkpoint_data: Record<string, unknown>;
  retries_used: Record<string, number>;
  domain_id: string | null;
  variety_seed: number | null;
  total_prompt_tokens: number;
  total_completion_tokens: number;
  total_cost_usd: number;
  created_at: Date;
  updated_at: Date;
}

export interface CreateJobParams {
  sourceUrl: string;
  sourceType: SourceType;
  templateId: string;
  platform: string;
  brandKit?: Record<string, string>;
  generateText?: boolean;
}

export interface JobListItem {
  id: string;
  source_url: string;
  source_type: SourceType;
  status: JobStatus;
  template_id: string;
  platform: string;
  slide_count: number | null;
  total_cost_usd: number;
  created_at: Date;
  updated_at: Date;
}

export class JobRepository {
  static async create(params: CreateJobParams): Promise<string> {
    const { rows } = await pool.query<{ id: string }>(
      `INSERT INTO generation_jobs (source_url, source_type, template_id, platform, brand_kit, generate_text)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING id`,
      [params.sourceUrl, params.sourceType, params.templateId, params.platform, JSON.stringify(params.brandKit ?? {}), params.generateText ?? false],
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

  static async findAll(params: {
    page?: number;
    limit?: number;
    status?: string;
    search?: string;
  } = {}): Promise<{ jobs: JobListItem[]; total: number }> {
    const page = params.page ?? 1;
    const limit = Math.min(params.limit ?? 20, 100);
    const offset = (page - 1) * limit;

    const conditions: string[] = [];
    const values: unknown[] = [];
    let idx = 1;

    if (params.status) {
      conditions.push(`status = $${idx++}`);
      values.push(params.status);
    }
    if (params.search) {
      conditions.push(`source_url ILIKE $${idx++}`);
      values.push(`%${params.search}%`);
    }

    const where = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';

    const countResult = await pool.query<{ count: string }>(
      `SELECT COUNT(*) FROM generation_jobs ${where}`,
      values,
    );
    const total = Number(countResult.rows[0]!.count);

    const dataResult = await pool.query(
      `SELECT id, source_url, source_type, status, template_id, platform, slide_count, total_cost_usd, created_at, updated_at
       FROM generation_jobs ${where}
       ORDER BY created_at DESC
       LIMIT $${idx++} OFFSET $${idx++}`,
      [...values, limit, offset],
    );

    return { jobs: dataResult.rows as JobListItem[], total };
  }

  static async countByStatus(): Promise<Record<string, number>> {
    const { rows } = await pool.query<{ status: string; count: string }>(
      `SELECT status, COUNT(*) as count FROM generation_jobs GROUP BY status`,
    );
    const counts: Record<string, number> = {};
    let total = 0;
    for (const row of rows) {
      counts[row.status] = Number(row.count);
      total += Number(row.count);
    }
    counts.total = total;
    return counts;
  }

  static async getCostStats(): Promise<{ avgCost: number; totalCost: number; totalJobs: number }> {
    const { rows } = await pool.query<{ avg: string; total: string; count: string }>(
      `SELECT 
        AVG(total_cost_usd) as avg,
        SUM(total_cost_usd) as total,
        COUNT(*) as count
       FROM generation_jobs 
       WHERE total_cost_usd > 0`,
    );
    return {
      avgCost: Number(rows[0]?.avg ?? 0),
      totalCost: Number(rows[0]?.total ?? 0),
      totalJobs: Number(rows[0]?.count ?? 0),
    };
  }

  static async purgeAll(): Promise<number> {
    const { rowCount } = await pool.query(`DELETE FROM generation_jobs`);
    return rowCount ?? 0;
  }

  static async checkpoint(
    jobId: string,
    phase: string,
    data: Record<string, unknown>,
  ): Promise<void> {
    await pool.query(
      `UPDATE generation_jobs
       SET checkpoint_phase = $1, checkpoint_data = $2, updated_at = NOW()
       WHERE id = $3`,
      [phase, JSON.stringify(data), jobId],
    );
  }

  static async getCheckpoint(jobId: string): Promise<{ phase: string; data: Record<string, unknown> } | null> {
    const { rows } = await pool.query<{ checkpoint_phase: string | null; checkpoint_data: Record<string, unknown> }>(
      `SELECT checkpoint_phase, checkpoint_data FROM generation_jobs WHERE id = $1`,
      [jobId],
    );
    const row = rows[0];
    if (!row?.checkpoint_phase) return null;
    return { phase: row.checkpoint_phase, data: row.checkpoint_data ?? {} };
  }

  static async incrementRetry(jobId: string, phase: string): Promise<number> {
    const { rows } = await pool.query<{ retries_used: Record<string, number> }>(
      `SELECT retries_used FROM generation_jobs WHERE id = $1`,
      [jobId],
    );
    const current = rows[0]?.retries_used ?? {};
    const updated = { ...current, [phase]: (current[phase] ?? 0) + 1 };
    await pool.query(
      `UPDATE generation_jobs SET retries_used = $1, updated_at = NOW() WHERE id = $2`,
      [JSON.stringify(updated), jobId],
    );
    return updated[phase] ?? 0;
  }

  static async getRetriesUsed(jobId: string): Promise<Record<string, number>> {
    const { rows } = await pool.query<{ retries_used: Record<string, number> }>(
      `SELECT retries_used FROM generation_jobs WHERE id = $1`,
      [jobId],
    );
    return rows[0]?.retries_used ?? {};
  }

  static async markNeedsReview(jobId: string, reason: string): Promise<void> {
    await pool.query(
      `UPDATE generation_jobs
       SET status = 'needs_review', error_payload = $1, updated_at = NOW()
       WHERE id = $2`,
      [JSON.stringify({ stage: 'label-detection', reason }), jobId],
    );
  }

  static async clearCheckpoint(jobId: string): Promise<void> {
    await pool.query(
      `UPDATE generation_jobs
       SET checkpoint_phase = NULL, checkpoint_data = '{}', updated_at = NOW()
       WHERE id = $1`,
      [jobId],
    );
  }

  static async insertSlideData(params: {
    jobId: string;
    phase: string;
    slideIndex: number;
    slideType: string;
    headline?: string;
    content: Record<string, unknown>;
    varietySeed?: number;
  }): Promise<void> {
    await pool.query(
      `INSERT INTO slide_data (job_id, phase, slide_index, slide_type, headline, content, variety_seed)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       ON CONFLICT (job_id, phase, slide_index) DO UPDATE SET
         slide_type = EXCLUDED.slide_type,
         headline = EXCLUDED.headline,
         content = EXCLUDED.content,
         variety_seed = EXCLUDED.variety_seed`,
      [
        params.jobId,
        params.phase,
        params.slideIndex,
        params.slideType,
        params.headline ?? null,
        JSON.stringify(params.content),
        params.varietySeed ?? null,
      ],
    );
  }

  static async insertLlmUsage(params: {
    jobId: string;
    phase: string;
    provider: string;
    model: string;
    promptTokens: number;
    completionTokens: number;
    latencyMs: number;
    estimatedCostUsd: number;
  }): Promise<void> {
    await pool.query(
      `INSERT INTO llm_usage (job_id, phase, provider, model, prompt_tokens, completion_tokens, latency_ms, estimated_cost_usd)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
      [
        params.jobId,
        params.phase,
        params.provider,
        params.model,
        params.promptTokens,
        params.completionTokens,
        params.latencyMs,
        params.estimatedCostUsd,
      ],
    );
  }

  static async updateCostColumns(
    jobId: string,
    params: {
      domainId?: string;
      varietySeed?: number;
      totalPromptTokens: number;
      totalCompletionTokens: number;
      totalCostUsd: number;
    },
  ): Promise<void> {
    const sets: string[] = [
      'total_prompt_tokens = $1',
      'total_completion_tokens = $2',
      'total_cost_usd = $3',
      'updated_at = NOW()',
    ];
    const values: unknown[] = [
      params.totalPromptTokens,
      params.totalCompletionTokens,
      params.totalCostUsd,
    ];
    let idx = 4;

    if (params.domainId !== undefined) {
      sets.push(`domain_id = $${idx++}`);
      values.push(params.domainId);
    }
    if (params.varietySeed !== undefined) {
      sets.push(`variety_seed = $${idx++}`);
      values.push(params.varietySeed);
    }

    values.push(jobId);
    await pool.query(
      `UPDATE generation_jobs SET ${sets.join(', ')} WHERE id = $${idx}`,
      values,
    );
  }

  static async getLlmUsage(jobId: string): Promise<Array<{
    phase: string;
    promptTokens: number;
    completionTokens: number;
    latencyMs: number;
    estimatedCostUsd: number;
  }>> {
    const { rows } = await pool.query<{
      phase: string;
      prompt_tokens: number;
      completion_tokens: number;
      latency_ms: number;
      estimated_cost_usd: number;
    }>(
      `SELECT phase, prompt_tokens, completion_tokens, latency_ms, estimated_cost_usd
       FROM llm_usage WHERE job_id = $1 ORDER BY created_at`,
      [jobId],
    );
    return rows.map(r => ({
      phase: r.phase,
      promptTokens: r.prompt_tokens,
      completionTokens: r.completion_tokens,
      latencyMs: r.latency_ms,
      estimatedCostUsd: Number(r.estimated_cost_usd),
    }));
  }
}

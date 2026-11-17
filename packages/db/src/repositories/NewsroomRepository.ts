import type { NewsroomStatus } from '@loopreel/schemas';
import { pool } from '../pool.js';

export interface NewsroomStoryRow {
  id: string;
  source_url: string;
  source_name: string;
  source_headline: string;
  source_snippet: string | null;
  source_published_at: Date | null;
  editorial_score: number | null;
  working_title: string | null;
  core_thesis: string | null;
  fine_print_receipt: string | null;
  narrative_preset: string;
  status: NewsroomStatus;
  job_id: string | null;
  buffer_post_id: string | null;
  buffer_channel_id: string | null;
  scheduled_at: Date | null;
  instagram_caption: string | null;
  metadata: Record<string, any>;
  created_at: Date;
  updated_at: Date;
}

export interface CreateDiscoveredParams {
  sourceUrl: string;
  sourceName: string;
  sourceHeadline: string;
  sourceSnippet?: string;
  sourcePublishedAt?: Date;
  metadata?: Record<string, any>;
}

export interface UpdatePitchParams {
  editorialScore: number;
  workingTitle: string;
  coreThesis: string;
  finePrintReceipt: string;
  narrativePreset?: string;
  status?: NewsroomStatus;
  metadata?: Record<string, any>;
}

export interface RecordScheduledParams {
  bufferPostId: string;
  bufferChannelId: string;
  scheduledAt?: Date;
  instagramCaption?: string;
  metadata?: Record<string, any>;
}

export class NewsroomRepository {
  static async isUrlSeen(sourceUrl: string): Promise<boolean> {
    const { rows } = await pool.query<{ exists: boolean }>(
      `SELECT EXISTS(SELECT 1 FROM newsroom_stories WHERE source_url = $1) AS exists`,
      [sourceUrl],
    );
    return rows[0]?.exists ?? false;
  }

  static async createDiscovered(params: CreateDiscoveredParams): Promise<NewsroomStoryRow> {
    const { rows } = await pool.query<NewsroomStoryRow>(
      `INSERT INTO newsroom_stories (
        source_url,
        source_name,
        source_headline,
        source_snippet,
        source_published_at,
        metadata
      )
      VALUES ($1, $2, $3, $4, $5, $6)
      ON CONFLICT (source_url) DO UPDATE
        SET source_snippet = EXCLUDED.source_snippet,
            updated_at = NOW()
      RETURNING *`,
      [
        params.sourceUrl,
        params.sourceName,
        params.sourceHeadline,
        params.sourceSnippet ?? null,
        params.sourcePublishedAt ?? null,
        JSON.stringify(params.metadata ?? {}),
      ],
    );
    return rows[0]!;
  }

  static async updatePitch(id: string, params: UpdatePitchParams): Promise<void> {
    await pool.query(
      `UPDATE newsroom_stories
       SET editorial_score = $2,
           working_title = $3,
           core_thesis = $4,
           fine_print_receipt = $5,
           narrative_preset = COALESCE($6, narrative_preset),
           status = COALESCE($7, 'pitched'::newsroom_status),
           metadata = metadata || $8::jsonb,
           updated_at = NOW()
       WHERE id = $1`,
      [
        id,
        params.editorialScore,
        params.workingTitle,
        params.coreThesis,
        params.finePrintReceipt,
        params.narrativePreset ?? null,
        params.status ?? 'pitched',
        JSON.stringify(params.metadata ?? {}),
      ],
    );
  }

  static async updateStatus(id: string, status: NewsroomStatus, metadata?: Record<string, any>): Promise<void> {
    await pool.query(
      `UPDATE newsroom_stories
       SET status = $2,
           metadata = CASE WHEN $3::jsonb IS NOT NULL THEN metadata || $3::jsonb ELSE metadata END,
           updated_at = NOW()
       WHERE id = $1`,
      [id, status, metadata ? JSON.stringify(metadata) : null],
    );
  }

  static async attachJob(id: string, jobId: string): Promise<void> {
    await pool.query(
      `UPDATE newsroom_stories
       SET job_id = $2,
           status = 'generating',
           updated_at = NOW()
       WHERE id = $1`,
      [id, jobId],
    );
  }

  static async claimForPublishing(id: string): Promise<NewsroomStoryRow | null> {
    const { rows } = await pool.query<NewsroomStoryRow>(
      `UPDATE newsroom_stories
       SET status = 'publishing',
           updated_at = NOW()
       WHERE id = $1 AND status = 'pending_review'
       RETURNING *`,
      [id],
    );
    return rows[0] ?? null;
  }

  static async revertPublishing(id: string, errorMessage?: string): Promise<void> {
    await pool.query(
      `UPDATE newsroom_stories
       SET status = 'pending_review',
           metadata = metadata || jsonb_build_object('lastPublishError', $2::text, 'publishFailedAt', NOW()::text),
           updated_at = NOW()
       WHERE id = $1 AND status = 'publishing'`,
      [id, errorMessage ?? 'Unknown publishing failure'],
    );
  }

  static async recordScheduled(id: string, params: RecordScheduledParams): Promise<void> {
    await pool.query(
      `UPDATE newsroom_stories
       SET buffer_post_id = $2,
           buffer_channel_id = $3,
           scheduled_at = $4,
           instagram_caption = $5,
           status = 'scheduled',
           metadata = metadata || $6::jsonb,
           updated_at = NOW()
       WHERE id = $1`,
      [
        id,
        params.bufferPostId,
        params.bufferChannelId,
        params.scheduledAt ?? null,
        params.instagramCaption ?? null,
        JSON.stringify(params.metadata ?? {}),
      ],
    );
  }

  static async findById(id: string): Promise<NewsroomStoryRow | null> {
    const { rows } = await pool.query<NewsroomStoryRow>(
      `SELECT * FROM newsroom_stories WHERE id = $1`,
      [id],
    );
    return rows[0] ?? null;
  }

  static async findByJobId(jobId: string): Promise<NewsroomStoryRow | null> {
    const { rows } = await pool.query<NewsroomStoryRow>(
      `SELECT * FROM newsroom_stories WHERE job_id = $1`,
      [jobId],
    );
    return rows[0] ?? null;
  }

  static async findPitched(minScore = 7.5, limit = 10): Promise<NewsroomStoryRow[]> {
    const { rows } = await pool.query<NewsroomStoryRow>(
      `SELECT * FROM newsroom_stories
       WHERE status = 'pitched' AND editorial_score >= $1
       ORDER BY editorial_score DESC, created_at DESC
       LIMIT $2`,
      [minScore, limit],
    );
    return rows;
  }

  static async findAll(options: { status?: NewsroomStatus; limit?: number; offset?: number } = {}): Promise<NewsroomStoryRow[]> {
    const conditions: string[] = [];
    const values: any[] = [];
    let idx = 1;

    if (options.status) {
      conditions.push(`status = $${idx++}`);
      values.push(options.status);
    }

    const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';
    const limit = options.limit ?? 50;
    const offset = options.offset ?? 0;
    values.push(limit, offset);

    const { rows } = await pool.query<NewsroomStoryRow>(
      `SELECT * FROM newsroom_stories
       ${whereClause}
       ORDER BY created_at DESC
       LIMIT $${idx++} OFFSET $${idx++}`,
      values,
    );
    return rows;
  }
}

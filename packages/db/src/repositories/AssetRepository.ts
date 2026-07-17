import type { FormatType } from '@loopreel/schemas';
import { pool } from '../pool.js';

export interface AssetRow {
  id: string;
  job_id: string;
  format_type: FormatType;
  slide_index: number | null;
  storage_url: string | null;
  content_text: string | null;
  created_at: Date;
}

export interface InsertAssetParams {
  jobId: string;
  formatType: FormatType;
  slideIndex?: number;
  storageUrl?: string;
  contentText?: string;
}

export class AssetRepository {
  static async findByJobId(jobId: string): Promise<AssetRow[]> {
    const { rows } = await pool.query<AssetRow>(
      `SELECT * FROM generated_assets
       WHERE job_id = $1
       ORDER BY slide_index ASC NULLS LAST`,
      [jobId],
    );
    return rows;
  }

  static async insert(params: InsertAssetParams): Promise<string> {
    const { rows } = await pool.query<{ id: string }>(
      `INSERT INTO generated_assets (job_id, format_type, slide_index, storage_url, content_text)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING id`,
      [
        params.jobId,
        params.formatType,
        params.slideIndex ?? null,
        params.storageUrl ?? null,
        params.contentText ?? null,
      ],
    );
    return rows[0]!.id;
  }

  static async insertBatch(assets: InsertAssetParams[]): Promise<void> {
    if (assets.length === 0) return;

    const client = await pool.connect();
    try {
      await client.query('BEGIN');
      for (const asset of assets) {
        await client.query(
          `INSERT INTO generated_assets (job_id, format_type, slide_index, storage_url, content_text)
           VALUES ($1, $2, $3, $4, $5)`,
          [
            asset.jobId,
            asset.formatType,
            asset.slideIndex ?? null,
            asset.storageUrl ?? null,
            asset.contentText ?? null,
          ],
        );
      }
      await client.query('COMMIT');
    } catch (err) {
      await client.query('ROLLBACK');
      throw err;
    } finally {
      client.release();
    }
  }
}

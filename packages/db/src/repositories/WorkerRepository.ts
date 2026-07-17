import { pool } from '../pool.js';

export interface WorkerInstanceRow {
  instance_id: string;
  worker_type: string;
  hostname: string;
  queue_name: string;
  started_at: Date;
  last_seen: Date;
  jobs_processed: bigint;
}

export class WorkerRepository {
  static async upsertHeartbeat(
    instanceId: string,
    workerType: string,
    hostname: string,
    queueName: string,
    jobsProcessed: bigint,
  ): Promise<void> {
    await pool.query(
      `INSERT INTO worker_instances (instance_id, worker_type, hostname, queue_name, started_at, last_seen, jobs_processed)
       VALUES ($1, $2, $3, $4, NOW(), NOW(), $5)
       ON CONFLICT (instance_id) DO UPDATE SET
         last_seen = NOW(),
         jobs_processed = EXCLUDED.jobs_processed`,
      [instanceId, workerType, hostname, queueName, jobsProcessed],
    );
  }

  static async findActive(): Promise<WorkerInstanceRow[]> {
    const { rows } = await pool.query<WorkerInstanceRow>(
      `SELECT * FROM worker_instances
       WHERE last_seen > NOW() - INTERVAL '30 seconds'
       ORDER BY worker_type, started_at DESC`,
    );
    return rows;
  }

  static async findActiveByType(): Promise<Record<string, number>> {
    const { rows } = await pool.query<{ worker_type: string; count: string }>(
      `SELECT worker_type, COUNT(*) as count
       FROM worker_instances
       WHERE last_seen > NOW() - INTERVAL '30 seconds'
       GROUP BY worker_type`,
    );

    const result: Record<string, number> = {};
    for (const row of rows) {
      result[row.worker_type] = Number(row.count);
    }
    return result;
  }
}

import { pool } from '@loopreel/db';
import pino from 'pino';

const logger = pino({
  level: process.env['LOG_LEVEL'] ?? 'info',
  formatters: {
    level: (label) => ({ level: label.toUpperCase() }),
  },
});

const SWEEP_INTERVAL = 5 * 60 * 1000; // 5 minutes
const TTL_MINUTES = 30;

async function sweepStuckJobs(): Promise<void> {
  try {
    const { rows } = await pool.query<{ id: string }>(
      `UPDATE generation_jobs
       SET status = 'failed',
           error_message = 'Job TTL expired: stuck for over 30 minutes',
           updated_at = NOW()
       WHERE status NOT IN ('complete', 'failed')
         AND updated_at < NOW() - INTERVAL '30 minutes'
       RETURNING id`,
    );

    if (rows.length > 0) {
      for (const row of rows) {
        logger.error({ event: 'ttl_timeout', jobId: row.id }, 'Force-failed stuck job');
      }
    }
  } catch (err) {
    logger.error({ err }, 'TTL sweeper error');
  }
}

export function startTtlSweeper(): void {
  logger.info({ intervalMs: SWEEP_INTERVAL, ttlMinutes: TTL_MINUTES }, 'TTL sweeper started');
  setInterval(() => {
    void sweepStuckJobs();
  }, SWEEP_INTERVAL);
}

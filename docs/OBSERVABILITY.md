# Observability (V1)

## Overview
Due to the distributed nature of the Loopreel workers, strong observability is required to debug stuck jobs, dead workers, and LLM failures. We do not use complex APM solutions in V1; instead, we rely on structured JSON logging (Pino), native PostgreSQL heartbeat tables, and Fastify health endpoints.

## Specification

### 1. Structured Logging (Pino)
All console output from the API and workers must be structured JSON to allow for easy log aggregation later. 

- **Logger Configuration**: Use `pino`.
- **Context Injection**: Every log emitted within a job context MUST include the `jobId`.

```typescript
// Shared logger initialization
import pino from 'pino';

export const logger = pino({
  level: process.env.LOG_LEVEL || 'info',
  formatters: {
    level: (label) => {
      return { level: label.toUpperCase() };
    },
  },
});

// Usage inside a worker
const jobLogger = logger.child({ jobId: job.id, workerType: 'structure' });
jobLogger.info('Starting LLM generation');
```

### 2. Worker Heartbeats
To detect when a worker (especially on a home server) silently dies or loses Tailscale connectivity, every worker process runs a background `setInterval`.

- **Interval:** Every 10 seconds.
- **Action:** Upsert a row in the `worker_instances` PostgreSQL table (via `WorkerRepository.upsertHeartbeat()`).
- **Data Captured:** `instance_id` (UUID generated on startup), `worker_type`, `hostname`, `last_seen` (NOW()), `jobs_processed` (counter).

### 3. API Health Endpoint (`GET /api/health`)
The Fastify server exposes an endpoint to check the overall health of the cluster.

**Checks Performed:**
1. **Database:** Execute `SELECT 1`.
2. **Redis:** Execute `PING`.
3. **Active Workers:** Query `worker_instances` where `last_seen > NOW() - INTERVAL '30 seconds'`, grouped by `worker_type`.

## Error Handling & Alerts

Since V1 lacks an external alerting system like PagerDuty, we rely on the API server to perform periodic self-checks and emit `FATAL` logs.

- **Dead Letter Queue Alerting:** The API server runs a 5-minute interval checking for jobs stuck in the `generation_jobs` table where `status NOT IN ('complete', 'failed') AND updated_at < NOW() - INTERVAL '30 minutes'`. It forcefully marks them `failed` and emits a `logger.error({ event: 'ttl_timeout', jobId })`.
- **Worker Starvation:** If the API health check detects 0 active instances for a critical queue (e.g., `structure`) for more than 5 minutes, it logs `logger.fatal('Queue starvation detected')`.

## Checklist for Implementation
- [ ] Configure `pino` in a shared utility file.
- [ ] Implement `WorkerRepository.upsertHeartbeat` using plain SQL `ON CONFLICT` logic.
- [ ] Add `setInterval` heartbeat loop to every worker bootstrap file.
- [ ] Implement `GET /api/health` endpoint in Fastify.
- [ ] Implement the 30-minute TTL sweeper in the API server background loop.

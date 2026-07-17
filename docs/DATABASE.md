# Loopreel V1 Database Schema

## Overview

PostgreSQL is the single source of truth for all state. Redis is transient. The schema is minimal in V1 but extensible for future features (auth, workspaces, billing).

**Key principles:**
- Single enum column for job status (no magic strings)
- Append-only credit ledger (no updates)
- Outbox pattern for exactly-once job enqueue semantics
- Foreign key constraints with cascade delete
- Strategic indexes for polling + queue stats queries

---

## Complete Schema Definition

### 1. generation_jobs (Core Job Entity)

```sql
CREATE TYPE job_status AS ENUM (
  'queued',
  'ingesting',
  'transcribing',
  'structuring',
  'rendering',
  'complete',
  'failed'
);

CREATE TYPE source_type AS ENUM (
  'youtube',
  'blog',
  'article'
);

CREATE TABLE generation_jobs (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  source_url      text NOT NULL,
  source_type     source_type NOT NULL,
  status          job_status NOT NULL DEFAULT 'queued',
  priority        integer NOT NULL DEFAULT 5 CHECK (priority IN (1, 5, 10)),
  brand_kit       jsonb NOT NULL DEFAULT '{}',
  template_id     text NOT NULL DEFAULT 'modern-dark',
  audio_r2_key    text,                              -- YouTube only
  structured_json jsonb,                             -- Set by worker-structure
  slide_count     integer,                           -- Computed by worker-structure
  error_message   text,                              -- Set on failure
  retry_count     integer NOT NULL DEFAULT 0,
  created_at      timestamptz NOT NULL DEFAULT now(),
  updated_at      timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_jobs_status ON generation_jobs(status);
CREATE INDEX idx_jobs_created_at ON generation_jobs(created_at DESC);
CREATE INDEX idx_jobs_updated_at ON generation_jobs(updated_at DESC);
```

**Column Rationale:**
- `status` — Single enum, no ambiguous states
- `priority` — BullMQ priority, inherited through pipeline
- `brand_kit` — JSONB for flexibility (colors, fonts, logo URL)
- `audio_r2_key` — Persisted for cleanup on job failure
- `structured_json` — Full LLM output, reused by render worker
- `slide_count` — Computed once, used by render worker for parallelism
- `retry_count` — Track attempts (for observability)
- `updated_at` — Used by TTL sweep to find stuck jobs

### 2. generated_assets (Rendered Output)

```sql
CREATE TYPE format_type AS ENUM (
  'carousel_slide',
  'linkedin_post',
  'twitter_thread'
);

CREATE TABLE generated_assets (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  job_id          uuid NOT NULL REFERENCES generation_jobs(id) ON DELETE CASCADE,
  format_type     format_type NOT NULL,
  slide_index     integer,                           -- NULL for post/thread; 0-based for slides
  storage_url     text,                              -- R2 public or presigned URL
  content_text    text,                              -- Plain text for LinkedIn post / Twitter thread
  created_at      timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_assets_job_id ON generated_assets(job_id);
CREATE INDEX idx_assets_format ON generated_assets(format_type);
```

**Column Rationale:**
- `slide_index` — NULL for text formats, 0-based index for carousel slides
- `storage_url` — Public R2 URL or presigned URL for downloads
- `content_text` — Raw text copied from structured_json (no re-generation)
- Cascade delete on job deletion cleans up assets automatically

### 3. outbox_events (Transactional Outbox)

```sql
CREATE TABLE outbox_events (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  queue_name      text NOT NULL CHECK (queue_name IN ('ingest', 'transcribe', 'structure', 'render')),
  job_payload     jsonb NOT NULL,
  bullmq_opts     jsonb NOT NULL DEFAULT '{}',     -- priority, delay, etc.
  published       boolean NOT NULL DEFAULT false,
  created_at      timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_outbox_unpublished ON outbox_events(published, created_at)
  WHERE published = false;
```

**Column Rationale:**
- `queue_name` — Which queue to publish to
- `job_payload` — BullMQ job data (jobId, sourceUrl, etc.)
- `bullmq_opts` — Options passed to BullMQ.add() (priority, delay)
- `published` — Toggled by outbox relay after BullMQ.add() succeeds
- Index uses `WHERE published = false` to avoid scanning completed rows

**Critical invariant:**
- Outbox row is written in same transaction as job status update
- If transaction aborts, job row and outbox row both rollback (no orphans)
- Relay only publishes unpublished rows, guaranteeing exactly-once semantics

### 4. worker_instances (Fleet Monitoring)

```sql
CREATE TABLE worker_instances (
  instance_id     text PRIMARY KEY,                 -- uuid generated at worker startup
  worker_type     text NOT NULL CHECK (worker_type IN ('ingest', 'transcribe', 'structure', 'render')),
  hostname        text NOT NULL,
  queue_name      text NOT NULL,
  started_at      timestamptz NOT NULL DEFAULT now(),
  last_seen       timestamptz NOT NULL DEFAULT now(),
  jobs_processed  bigint NOT NULL DEFAULT 0
);

CREATE INDEX idx_workers_type ON worker_instances(worker_type);
CREATE INDEX idx_workers_last_seen ON worker_instances(last_seen);
```

**Column Rationale:**
- `instance_id` — Unique per worker process (stable across restarts if needed)
- `worker_type` — Filter active workers by type
- `last_seen` — Heartbeat timestamp (upserted every 10s)
- `jobs_processed` — Counter incremented atomically (for observability)

**Heartbeat pattern:**
```sql
-- Worker upserts every 10 seconds
INSERT INTO worker_instances (instance_id, worker_type, hostname, queue_name, started_at, last_seen, jobs_processed)
VALUES ($1, $2, $3, $4, $5, $6, $7)
ON CONFLICT (instance_id) DO UPDATE SET
  last_seen = EXCLUDED.last_seen,
  jobs_processed = EXCLUDED.jobs_processed;

-- API queries live workers
SELECT * FROM worker_instances
  WHERE last_seen > now() - INTERVAL '30 seconds'
  ORDER BY worker_type, started_at DESC;
```

---

## Indexes Strategy

| Index | Table | Columns | Reason |
|-------|-------|---------|--------|
| `idx_jobs_status` | generation_jobs | status | Queue stats queries: `SELECT COUNT(*) GROUP BY status` |
| `idx_jobs_created_at` | generation_jobs | created_at DESC | Job list pagination + TTL sweep |
| `idx_jobs_updated_at` | generation_jobs | updated_at DESC | TTL sweep: find jobs stuck >30min |
| `idx_assets_job_id` | generated_assets | job_id | Fetch all assets for a job |
| `idx_assets_format` | generated_assets | format_type | Filter by format (slides vs posts) |
| `idx_outbox_unpublished` | outbox_events | published, created_at WHERE published=false | Relay poll: scan only unpublished rows |
| `idx_workers_type` | worker_instances | worker_type | Health check: list by worker type |
| `idx_workers_last_seen` | worker_instances | last_seen | Dead worker detection |

---

## Transactions & Consistency

### Pattern 1: Job Creation (API)

```typescript
await db.transaction(async (tx) => {
  // 1. Insert job
  const job = await tx
    .insertInto(generation_jobs)
    .values({
      id: jobId,
      source_url: sourceUrl,
      source_type: sourceType,
      status: 'queued',
      priority: priority,
      brand_kit: brandKit,
    })
    .returning('*')
    .executeTakeFirst()

  // 2. Insert outbox (same transaction)
  await tx
    .insertInto(outbox_events)
    .values({
      queue_name: 'ingest',
      job_payload: { jobId, sourceUrl, sourceType },
      bullmq_opts: { priority },
      published: false,
    })
    .execute()
  
  // Both or nothing
}, { isolationLevel: 'serializable' })
```

**Guarantee:** If either statement fails, entire transaction rolls back. No orphaned job or outbox rows.

### Pattern 2: Worker Status Update + Outbox

```typescript
await db.transaction(async (tx) => {
  // 1. Update current job status (idempotent)
  await tx
    .updateTable(generation_jobs)
    .set({ status: 'transcribing' })
    .where(sql`id = ${jobId}`)
    .execute()
  
  // 2. Write next job to outbox
  await tx
    .insertInto(outbox_events)
    .values({
      queue_name: 'structure',
      job_payload: { jobId, rawText },
      bullmq_opts: { priority },
      published: false,
    })
    .execute()
}, { isolationLevel: 'serializable' })
```

**Guarantee:** Even if worker crashes after this block, the next job is queued. Exactly-once semantics.

### Pattern 3: Job Failure + Credit Refund

```typescript
await db.transaction(async (tx) => {
  // 1. Mark job failed
  await tx
    .updateTable(generation_jobs)
    .set({
      status: 'failed',
      error_message: 'LLM validation failed',
      updated_at: new Date(),
    })
    .where(sql`id = ${jobId}`)
    .execute()
  
  // 2. Refund credit (V1.1: insert ledger row)
  // For now, no-op in V1
}, { isolationLevel: 'serializable' })
```

---

## Foreign Key Constraints

```sql
ALTER TABLE generated_assets
  ADD CONSTRAINT fk_assets_job_id
  FOREIGN KEY (job_id) REFERENCES generation_jobs(id)
  ON DELETE CASCADE;

-- When a job is deleted, all its assets are deleted automatically
```

---

## Migration Strategy

Migrations live in `packages/db/migrations/`:

```
migrations/
├── 001_initial_schema.sql       -- All tables from scratch
├── 002_add_worker_instances.sql -- Worker monitoring (if added later)
├── 003_add_indexes.sql          -- Performance optimization
└── ...
```

**Development:**
```bash
# Run all pending migrations
pnpm db:migrate

# Generate new migration
pnpm db:generate "add_worker_instances_table"
```

**Production:**
```bash
# Pre-deploy: test migrations on staging
# Deploy: migrations run before API startup
# Rollback: SQL script to drop added tables/columns (manual)
```

---

## Queries Used Throughout System

### Queue Stats (API /api/queue/stats)

```sql
SELECT
  status,
  COUNT(*) as count
FROM generation_jobs
WHERE created_at > now() - INTERVAL '24 hours'
GROUP BY status;
```

### Job Polling (Frontend)

```sql
SELECT
  id,
  status,
  error_message,
  structured_json,
  slide_count
FROM generation_jobs
WHERE id = $1;
```

### Assets for Job (Frontend)

```sql
SELECT
  id,
  format_type,
  slide_index,
  storage_url,
  content_text
FROM generated_assets
WHERE job_id = $1
ORDER BY slide_index ASC NULLS LAST;
```

### TTL Sweep (API)

```sql
SELECT
  id,
  status,
  error_message
FROM generation_jobs
WHERE status NOT IN ('complete', 'failed')
  AND updated_at < now() - INTERVAL '30 minutes'
  AND id NOT IN (
    SELECT DISTINCT queue_name FROM outbox_events WHERE published = false
  )
LIMIT 100;
```

### Worker Health Check (API)

```sql
SELECT
  worker_type,
  COUNT(*) as instance_count,
  MAX(last_seen) as newest_heartbeat
FROM worker_instances
WHERE last_seen > now() - INTERVAL '30 seconds'
GROUP BY worker_type;
```

### Outbox Relay Poll

```sql
SELECT
  id,
  queue_name,
  job_payload,
  bullmq_opts
FROM outbox_events
WHERE published = false
ORDER BY created_at ASC
LIMIT 50
FOR UPDATE SKIP LOCKED;
```

---

## Checklist for Implementation

- [ ] PostgreSQL 16+ running
- [ ] All enums created (job_status, source_type, format_type)
- [ ] All tables created with constraints
- [ ] All indexes created with rationale documented
- [ ] Foreign key constraints tested (cascade delete works)
- [ ] Serializable transaction isolation verified
- [ ] Migration tooling set up (Drizzle ORM or equivalent)
- [ ] Database seeding script for testing
- [ ] Backup strategy documented
- [ ] Connection pooling configured (min 10, max 50 connections)

-- Loopreel V1 Initial Schema
-- Based on DATABASE.md

-- Enums
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

CREATE TYPE format_type AS ENUM (
  'carousel_slide',
  'linkedin_post',
  'twitter_thread'
);

-- 1. generation_jobs (Core Job Entity)
CREATE TABLE generation_jobs (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  source_url      text NOT NULL,
  source_type     source_type NOT NULL,
  status          job_status NOT NULL DEFAULT 'queued',
  priority        integer NOT NULL DEFAULT 5 CHECK (priority IN (1, 5, 10)),
  brand_kit       jsonb NOT NULL DEFAULT '{}',
  template_id     text NOT NULL DEFAULT 'modern-dark',
  audio_r2_key    text,
  structured_json jsonb,
  slide_count     integer,
  error_message   text,
  retry_count     integer NOT NULL DEFAULT 0,
  created_at      timestamptz NOT NULL DEFAULT now(),
  updated_at      timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_jobs_status ON generation_jobs(status);
CREATE INDEX idx_jobs_created_at ON generation_jobs(created_at DESC);
CREATE INDEX idx_jobs_updated_at ON generation_jobs(updated_at DESC);

-- 2. generated_assets (Rendered Output)
CREATE TABLE generated_assets (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  job_id          uuid NOT NULL REFERENCES generation_jobs(id) ON DELETE CASCADE,
  format_type     format_type NOT NULL,
  slide_index     integer,
  storage_url     text,
  content_text    text,
  created_at      timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_assets_job_id ON generated_assets(job_id);
CREATE INDEX idx_assets_format ON generated_assets(format_type);

-- 3. outbox_events (Transactional Outbox)
CREATE TABLE outbox_events (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  queue_name      text NOT NULL CHECK (queue_name IN ('ingest', 'transcribe', 'structure', 'render')),
  job_payload     jsonb NOT NULL,
  bullmq_opts     jsonb NOT NULL DEFAULT '{}',
  published       boolean NOT NULL DEFAULT false,
  created_at      timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_outbox_unpublished ON outbox_events(published, created_at)
  WHERE published = false;

-- 4. worker_instances (Fleet Monitoring)
CREATE TABLE worker_instances (
  instance_id     text PRIMARY KEY,
  worker_type     text NOT NULL CHECK (worker_type IN ('ingest', 'transcribe', 'structure', 'render')),
  hostname        text NOT NULL,
  queue_name      text NOT NULL,
  started_at      timestamptz NOT NULL DEFAULT now(),
  last_seen       timestamptz NOT NULL DEFAULT now(),
  jobs_processed  bigint NOT NULL DEFAULT 0
);

CREATE INDEX idx_workers_type ON worker_instances(worker_type);
CREATE INDEX idx_workers_last_seen ON worker_instances(last_seen);

-- 003_outbox_pattern.sql
CREATE TABLE IF NOT EXISTS outbox_events (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  queue_name      text NOT NULL CHECK (queue_name IN ('ingest', 'transcribe', 'structure', 'render')),
  job_payload     jsonb NOT NULL,
  bullmq_opts     jsonb NOT NULL DEFAULT '{}',
  published       boolean NOT NULL DEFAULT false,
  created_at      timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_outbox_unpublished ON outbox_events(published, created_at)
  WHERE published = false;

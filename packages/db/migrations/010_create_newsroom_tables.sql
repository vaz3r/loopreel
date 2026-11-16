-- 010_create_newsroom_tables.sql
-- Add instagram_caption to format_type enum and create dedicated newsroom_stories table with jsonb metadata

-- 1. Ensure format_type supports instagram_caption
ALTER TYPE format_type ADD VALUE IF NOT EXISTS 'instagram_caption';

-- 2. Newsroom story status enum
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'newsroom_status') THEN
    CREATE TYPE newsroom_status AS ENUM (
      'discovered',
      'pitched',
      'approved',
      'generating',
      'completed',
      'scheduled',
      'published',
      'rejected',
      'failed'
    );
  END IF;
END$$;

-- 3. Dedicated newsroom_stories table
CREATE TABLE IF NOT EXISTS newsroom_stories (
  id                  uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  source_url          text NOT NULL UNIQUE,
  source_name         text NOT NULL,
  source_headline     text NOT NULL,
  source_snippet      text,
  source_published_at timestamptz,
  editorial_score     numeric(3, 1),
  working_title       text,
  core_thesis         text,
  fine_print_receipt  text,
  narrative_preset    text NOT NULL DEFAULT 'mythbuster',
  status              newsroom_status NOT NULL DEFAULT 'discovered',
  job_id              uuid REFERENCES generation_jobs(id) ON DELETE SET NULL,
  buffer_post_id      text,
  buffer_channel_id   text,
  scheduled_at        timestamptz,
  instagram_caption   text,
  metadata            jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at          timestamptz NOT NULL DEFAULT now(),
  updated_at          timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_newsroom_status ON newsroom_stories(status);
CREATE INDEX IF NOT EXISTS idx_newsroom_editorial_score ON newsroom_stories(editorial_score);
CREATE INDEX IF NOT EXISTS idx_newsroom_job_id ON newsroom_stories(job_id);
CREATE INDEX IF NOT EXISTS idx_newsroom_metadata_gin ON newsroom_stories USING gin (metadata);

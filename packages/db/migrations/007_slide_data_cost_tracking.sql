-- Migration 007: Slide data storage, LLM cost tracking, variety seed

-- 1. New table: slide_data (per-slide storage for querying/debugging)
CREATE TABLE IF NOT EXISTS slide_data (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  job_id      uuid NOT NULL REFERENCES generation_jobs(id) ON DELETE CASCADE,
  phase       text NOT NULL DEFAULT 'phase4',  -- 'phase4' or 'phase5' (creative director)
  slide_index integer NOT NULL,
  slide_type  text NOT NULL,
  headline    text,
  content     jsonb NOT NULL,
  variety_seed integer,
  created_at  timestamptz NOT NULL DEFAULT now(),
  UNIQUE(job_id, phase, slide_index)
);

CREATE INDEX IF NOT EXISTS idx_slide_data_job ON slide_data(job_id);
CREATE INDEX IF NOT EXISTS idx_slide_data_type ON slide_data(slide_type);

-- 2. New table: llm_usage (per-LLM-call token tracking + cost)
CREATE TABLE IF NOT EXISTS llm_usage (
  id                uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  job_id            uuid NOT NULL REFERENCES generation_jobs(id) ON DELETE CASCADE,
  phase             text NOT NULL,
  provider          text NOT NULL,
  model             text NOT NULL,
  prompt_tokens     integer NOT NULL DEFAULT 0,
  completion_tokens integer NOT NULL DEFAULT 0,
  latency_ms        integer NOT NULL DEFAULT 0,
  estimated_cost_usd numeric(10,6) NOT NULL DEFAULT 0,
  created_at        timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_usage_job ON llm_usage(job_id);
CREATE INDEX IF NOT EXISTS idx_usage_phase ON llm_usage(phase);

-- 3. New columns on generation_jobs
ALTER TABLE generation_jobs ADD COLUMN IF NOT EXISTS domain_id text;
ALTER TABLE generation_jobs ADD COLUMN IF NOT EXISTS variety_seed integer;
ALTER TABLE generation_jobs ADD COLUMN IF NOT EXISTS total_prompt_tokens integer NOT NULL DEFAULT 0;
ALTER TABLE generation_jobs ADD COLUMN IF NOT EXISTS total_completion_tokens integer NOT NULL DEFAULT 0;
ALTER TABLE generation_jobs ADD COLUMN IF NOT EXISTS total_cost_usd numeric(10,6) NOT NULL DEFAULT 0;

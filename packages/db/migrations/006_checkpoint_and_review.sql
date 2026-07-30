-- 006_checkpoint_and_review.sql

-- Add needs_review status to enum
ALTER TYPE job_status ADD VALUE IF NOT EXISTS 'needs_review' AFTER 'failed';

-- Add checkpoint columns for resumability
ALTER TABLE generation_jobs ADD COLUMN IF NOT EXISTS checkpoint_phase text DEFAULT NULL;
ALTER TABLE generation_jobs ADD COLUMN IF NOT EXISTS checkpoint_data jsonb DEFAULT '{}';
ALTER TABLE generation_jobs ADD COLUMN IF NOT EXISTS retries_used jsonb DEFAULT '{}';

-- Index for finding stuck jobs
CREATE INDEX IF NOT EXISTS idx_jobs_checkpoint_phase ON generation_jobs(checkpoint_phase) WHERE checkpoint_phase IS NOT NULL;

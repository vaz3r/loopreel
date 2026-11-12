-- Migration 008: Cleanup legacy tables, obsolete rows, and unused columns

-- 1. Purge legacy templates and obsolete failed runs, preserving the 13 active bespoke template jobs
DELETE FROM generation_jobs 
WHERE template_id IN (
  'paper-of-record', 'the-globalist', 'the-field-notes', 'the-signal', 
  'the-curator', 'the-academic', 'chameleon', 'the-terminal', 'auto'
) OR (template_id = 'bespoke' AND status = 'failed');

-- 2. Truncate outbox_events
TRUNCATE TABLE outbox_events;

-- 3. Drop dead tables (generated_assets is kept for tracking HTML and previews)
DROP TABLE IF EXISTS slide_data CASCADE;
DROP TABLE IF EXISTS llm_usage CASCADE;

-- 4. Clean unused columns on generation_jobs and set default template_id to 'bespoke'
ALTER TABLE generation_jobs ALTER COLUMN template_id SET DEFAULT 'bespoke';
DROP INDEX IF EXISTS idx_jobs_checkpoint_phase;
ALTER TABLE generation_jobs DROP COLUMN IF EXISTS checkpoint_phase;
ALTER TABLE generation_jobs DROP COLUMN IF EXISTS checkpoint_data;
ALTER TABLE generation_jobs DROP COLUMN IF EXISTS retries_used;
ALTER TABLE generation_jobs DROP COLUMN IF EXISTS domain_id;
ALTER TABLE generation_jobs DROP COLUMN IF EXISTS variety_seed;

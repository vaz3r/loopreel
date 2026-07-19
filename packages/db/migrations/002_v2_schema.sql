-- Loopreel V2 Schema Migration
-- Removes outbox pattern, simplifies job table, adds template-driven rendering

-- 1. generation_jobs: drop legacy columns, add new ones
ALTER TABLE generation_jobs DROP COLUMN brand_kit;
ALTER TABLE generation_jobs DROP COLUMN structured_json;
ALTER TABLE generation_jobs DROP COLUMN priority;
ALTER TABLE generation_jobs DROP COLUMN error_message;

ALTER TABLE generation_jobs ADD COLUMN content_payload jsonb;
ALTER TABLE generation_jobs ADD COLUMN error_payload jsonb;
ALTER TABLE generation_jobs ADD COLUMN platform text NOT NULL DEFAULT 'instagram-feed';

-- 2. Drop outbox and worker monitoring tables
DROP TABLE outbox_events;
DROP TABLE worker_instances;

-- Add brand_kit column to generation_jobs
-- Stores user's custom brand kit (colors, fonts, logo) as JSONB

ALTER TABLE generation_jobs ADD COLUMN brand_kit jsonb DEFAULT '{}';

UPDATE generation_jobs SET brand_kit = '{}' WHERE brand_kit IS NULL;

CREATE INDEX idx_jobs_brand_kit ON generation_jobs USING gin (brand_kit);

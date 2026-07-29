-- 005_add_generate_text.sql
ALTER TABLE generation_jobs ADD COLUMN generate_text boolean NOT NULL DEFAULT false;

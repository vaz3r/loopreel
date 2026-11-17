-- 011_add_review_and_publishing_statuses.sql
-- Add pending_review and publishing to newsroom_status enum for the editorial human review gate

ALTER TYPE newsroom_status ADD VALUE IF NOT EXISTS 'pending_review' AFTER 'generating';
ALTER TYPE newsroom_status ADD VALUE IF NOT EXISTS 'publishing' AFTER 'pending_review';

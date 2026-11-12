-- Migration 009: Add 'prompt' to source_type enum for dual-input generation
ALTER TYPE source_type ADD VALUE IF NOT EXISTS 'prompt';

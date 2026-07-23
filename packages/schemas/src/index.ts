import { z } from 'zod';

// Job Status enum (matches PostgreSQL job_status enum)
export const JobStatusEnum = z.enum([
  'queued',
  'ingesting',
  'transcribing',
  'structuring',
  'rendering',
  'complete',
  'failed',
]);
export type JobStatus = z.infer<typeof JobStatusEnum>;

// Source Type enum (matches PostgreSQL source_type enum)
export const SourceTypeEnum = z.enum(['youtube', 'blog', 'article']);
export type SourceType = z.infer<typeof SourceTypeEnum>;

// Format Type enum (matches PostgreSQL format_type enum)
export const FormatTypeEnum = z.enum([
  'carousel_slide',
  'linkedin_post',
  'twitter_thread',
]);
export type FormatType = z.infer<typeof FormatTypeEnum>;

// Platform enum
export const PlatformEnum = z.enum([
  'instagram-feed',
  'instagram-square',
  'instagram-stories',
  'linkedin',
  'x',
  'facebook',
]);
export type Platform = z.infer<typeof PlatformEnum>;

// BrandKit schema
export const BrandKitSchema = z.object({
  bg: z.string().optional(),
  text: z.string().optional(),
  accent: z.string().optional(),
  fontSerif: z.string().optional(),
  fontSans: z.string().optional(),
  logoUrl: z.string().optional(),
});
export type BrandKit = z.infer<typeof BrandKitSchema>;

// Job Creation Schema (API)
export const JobCreateSchema = z.object({
  sourceUrl: z.string().url(),
  platform: PlatformEnum.default('instagram-feed'),
  templateId: z.enum([
    'paper-of-record',
    'the-globalist',
    'the-terminal',
    'the-curator',
    'the-academic',
  ]).default('paper-of-record'),
  brandKit: BrandKitSchema.optional(),
});
export type JobCreateInput = z.infer<typeof JobCreateSchema>;

// Queue Payload Schemas
export const IngestPayloadSchema = z.object({
  jobId: z.string().uuid(),
  sourceUrl: z.string().url(),
  sourceType: SourceTypeEnum,
});
export type IngestPayload = z.infer<typeof IngestPayloadSchema>;

export const TranscribePayloadSchema = z.object({
  jobId: z.string().uuid(),
  audioR2Key: z.string(),
});
export type TranscribePayload = z.infer<typeof TranscribePayloadSchema>;

export const StructurePayloadSchema = z.object({
  jobId: z.string().uuid(),
  rawText: z.string().min(10),
});
export type StructurePayload = z.infer<typeof StructurePayloadSchema>;

export const RenderPayloadSchema = z.object({
  jobId: z.string().uuid(),
});
export type RenderPayload = z.infer<typeof RenderPayloadSchema>;

import { z } from 'zod';

export * from './errors.js';
export * from './platforms.js';

// Job Status enum (matches PostgreSQL job_status enum)
export const JobStatusEnum = z.enum([
  'queued',
  'ingesting',
  'transcribing',
  'structuring',
  'rendering',
  'complete',
  'failed',
  'needs_review',
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
  'pinterest',
]);
export type Platform = z.infer<typeof PlatformEnum>;

// BrandKit schema with typographic wordmark support
export const BrandKitSchema = z.object({
  bg: z.string().optional(),
  text: z.string().optional(),
  accent: z.string().optional(),
  surface: z.string().optional(),
  fontSerif: z.string().optional(),
  fontSans: z.string().optional(),
  fontMono: z.string().optional(),
  // Typographic brand identity (replaces clunky image logos)
  wordmark: z.string().optional(), // e.g. "THE DAILY DIGEST"
  handle: z.string().optional(),   // e.g. "@dailydigest"
  wordmarkStyle: z.enum(['serif', 'sans', 'mono', 'small-caps']).optional(),
  logoUrl: z.string().optional(), // Preserved for backwards compatibility
});
export type BrandKit = z.infer<typeof BrandKitSchema>;

export const TEMPLATE_KEYS = [
  'paper-of-record',
  'the-globalist',
  'the-curator',
  'the-academic',
  'the-signal',
  'the-field-notes',
] as const;
export type TemplateId = (typeof TEMPLATE_KEYS)[number];
export type ClassicTemplateId = TemplateId;

export const EngineEnum = z.enum(['bespoke', 'classic']);
export type Engine = z.infer<typeof EngineEnum>;

export const ALL_TEMPLATE_KEYS = ['auto', 'bespoke', ...TEMPLATE_KEYS] as const;
export type TemplateInputId = (typeof ALL_TEMPLATE_KEYS)[number];

// Job Creation Schema (API)
export const JobCreateSchema = z.object({
  sourceUrl: z.string().url(),
  platform: PlatformEnum.default('instagram-feed'),
  engine: EngineEnum.default('bespoke'),
  templateId: z.enum(ALL_TEMPLATE_KEYS).default('bespoke'),
  brandKit: BrandKitSchema.optional(),
  generateText: z.boolean().default(false),
});
export type JobCreateInput = z.infer<typeof JobCreateSchema>;

// Queue Payload Schemas
export const IngestPayloadSchema = z.object({
  jobId: z.string().uuid(),
  sourceUrl: z.string().url(),
  sourceType: SourceTypeEnum,
  engine: EngineEnum.optional(),
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
  engine: EngineEnum.optional(),
});
export type StructurePayload = z.infer<typeof StructurePayloadSchema>;

export const RenderPayloadSchema = z.object({
  jobId: z.string().uuid(),
});
export type RenderPayload = z.infer<typeof RenderPayloadSchema>;

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
export const SourceTypeEnum = z.enum(['youtube', 'blog', 'article', 'prompt']);
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

// BrandKit schema with typographic wordmark and bespoke brand token support
export const BrandKitSchema = z.object({
  name: z.string().optional(),
  slug: z.string().optional(),
  vibe: z.string().optional(),
  domain: z.string().optional(),
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
  palette: z.record(z.string()).optional(),
  typography: z.record(z.string()).optional(),
  texture: z.string().optional(),
  motif: z.string().optional(),
}).passthrough();
export type BrandKit = z.infer<typeof BrandKitSchema>;

export const TEMPLATE_KEYS = ['bespoke'] as const;
export type TemplateId = string;

export const EngineEnum = z.enum(['bespoke']);
export type Engine = z.infer<typeof EngineEnum>;

export const ALL_TEMPLATE_KEYS = ['bespoke'] as const;
export type TemplateInputId = string;

export const NarrativePresetEnum = z.enum([
  'storytelling',
  'news-reporting',
  'deep-dive',
  'financial-analysis',
  'case-study',
  'entertainment',
  'mythbuster',
  'playbook',
]);
export type NarrativePreset = z.infer<typeof NarrativePresetEnum>;

// Job Creation Schema (API)
export const JobCreateSchema = z.object({
  sourceUrl: z.string().optional(),
  prompt: z.string().min(5).max(5000).optional(),
  sourceType: SourceTypeEnum.optional(),
  platform: PlatformEnum.default('instagram-feed'),
  engine: EngineEnum.default('bespoke'),
  templateId: z.string().default('bespoke'),
  brandKit: BrandKitSchema.optional(),
  narrativePreset: NarrativePresetEnum.default('storytelling'),
  targetSlideCount: z.number().int().min(4).max(14).default(7),
  generateText: z.boolean().default(false),
}).refine((data) => (data.sourceUrl && data.sourceUrl.trim().length > 0) || (data.prompt && data.prompt.trim().length > 0), {
  message: 'Either sourceUrl or prompt must be provided',
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

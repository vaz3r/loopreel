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
export const FormatTypeEnum = z.enum(['carousel_slide', 'linkedin_post', 'twitter_thread']);
export type FormatType = z.infer<typeof FormatTypeEnum>;

// Brand Kit Schema
export const BrandKitSchema = z.object({
  logoUrl: z.string().url().optional(),
  primaryColor: z.string().regex(/^#([0-9A-F]{3}){1,2}$/i).optional(),
  secondaryColor: z.string().regex(/^#([0-9A-F]{3}){1,2}$/i).optional(),
  fontFamily: z.string().optional(),
});
export type BrandKit = z.infer<typeof BrandKitSchema>;

// Job Creation Schema (API)
export const JobCreateSchema = z.object({
  sourceUrl: z.string().url(),
  priority: z.union([z.literal(1), z.literal(5), z.literal(10)]).default(5),
  brandKit: BrandKitSchema.default({}),
  templateId: z.string().default('modern-dark'),
});
export type JobCreateInput = z.infer<typeof JobCreateSchema>;

// Structured Content Schema (LLM Output)
export const SlideContentSchema = z.object({
  heading: z.string().max(100),
  body: z.string().max(500),
  bulletPoints: z.array(z.string().max(100)).max(5).optional(),
});
export type SlideContent = z.infer<typeof SlideContentSchema>;

export const StructuredContentSchema = z.object({
  hook: z.object({
    title: z.string().max(100),
    subtitle: z.string().max(200).optional(),
  }),
  valuePoints: z.array(SlideContentSchema).min(1).max(10),
  callToAction: z.object({
    message: z.string().max(150),
    url: z.string().optional(),
  }),
});
export type StructuredContent = z.infer<typeof StructuredContentSchema>;

// Outbox Event Payload Schemas
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

// Slide Data (used by render pipeline)
export interface SlideData {
  type: 'hook' | 'value' | 'cta';
  index: number;
  heading: string;
  body?: string;
  bulletPoints?: string[];
  subtitle?: string;
  ctaUrl?: string;
}

export function buildSlides(content: StructuredContent): SlideData[] {
  const slides: SlideData[] = [];

  slides.push({
    type: 'hook',
    index: 0,
    heading: content.hook.title,
    subtitle: content.hook.subtitle,
  });

  content.valuePoints.forEach((vp, i) => {
    slides.push({
      type: 'value',
      index: i + 1,
      heading: vp.heading,
      body: vp.body,
      bulletPoints: vp.bulletPoints,
    });
  });

  slides.push({
    type: 'cta',
    index: content.valuePoints.length + 1,
    heading: content.callToAction.message,
    ctaUrl: content.callToAction.url,
  });

  return slides;
}

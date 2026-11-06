import { z } from 'zod';
import { ThemeSpecSchema } from '../theme/schema.js';

export const CoverSlideSchema = z.object({
  id: z.string(),
  type: z.literal('cover'),
  kicker: z.string().optional(),
  headline: z.string().min(3),
  subheadline: z.string().optional(),
  author: z.string().optional(),
  handle: z.string().optional(),
  date: z.string().optional(),
  tags: z.array(z.string()).optional(),
});

export const SplitSlideSchema = z.object({
  id: z.string(),
  type: z.union([z.literal('split'), z.literal('dichotomy'), z.literal('compare')]),
  kicker: z.string().optional(),
  headline: z.string().min(3),
  left: z.object({
    label: z.string(),
    title: z.string(),
    desc: z.string(),
    items: z.array(z.string()).optional(),
  }),
  right: z.object({
    label: z.string(),
    title: z.string(),
    desc: z.string(),
    items: z.array(z.string()).optional(),
  }),
});

export const MetricItemSchema = z.object({
  value: z.string(),
  unit: z.string().optional(),
  label: z.string(),
  subtext: z.string().optional(),
  trend: z.string().optional(),
});

export const MetricsSlideSchema = z.object({
  id: z.string(),
  type: z.union([z.literal('metrics'), z.literal('telemetry')]),
  kicker: z.string().optional(),
  headline: z.string().min(3),
  subheadline: z.string().optional(),
  metrics: z.array(MetricItemSchema).min(1).max(4),
  sourceNotes: z.string().optional(),
});

export const QuoteSlideSchema = z.object({
  id: z.string(),
  type: z.literal('quote'),
  kicker: z.string().optional(),
  quote: z.string().min(5),
  author: z.string().min(2),
  title: z.string().optional(),
  publication: z.string().optional(),
  context: z.string().optional(),
});

export const BreakdownItemSchema = z.object({
  num: z.string().optional(),
  title: z.string(),
  desc: z.string(),
  tag: z.string().optional(),
});

export const BreakdownSlideSchema = z.object({
  id: z.string(),
  type: z.union([z.literal('breakdown'), z.literal('sequence'), z.literal('list')]),
  kicker: z.string().optional(),
  headline: z.string().min(3),
  subheadline: z.string().optional(),
  items: z.array(BreakdownItemSchema).min(2).max(6),
});

export const MatrixRowSchema = z.object({
  label: z.string(),
  values: z.array(z.string()),
});

export const MatrixSlideSchema = z.object({
  id: z.string(),
  type: z.union([z.literal('matrix'), z.literal('table')]),
  kicker: z.string().optional(),
  headline: z.string().min(3),
  headers: z.array(z.string()).min(1).max(4),
  rows: z.array(MatrixRowSchema).min(1).max(6),
});

export const CtaSlideSchema = z.object({
  id: z.string(),
  type: z.literal('cta'),
  kicker: z.string().optional(),
  headline: z.string().min(3),
  takeaway: z.string().min(5),
  actionPrompt: z.string().optional(),
  handle: z.string().optional(),
  url: z.string().optional(),
});

export const ChameleonSlideUnion = z.discriminatedUnion('type', [
  CoverSlideSchema,
  SplitSlideSchema.extend({ type: z.literal('split') }),
  MetricsSlideSchema.extend({ type: z.literal('metrics') }),
  QuoteSlideSchema,
  BreakdownSlideSchema.extend({ type: z.literal('breakdown') }),
  MatrixSlideSchema.extend({ type: z.literal('matrix') }),
  CtaSlideSchema,
]);

export const ChameleonCarouselSchema = z.object({
  theme: ThemeSpecSchema.optional(),
  slides: z.array(z.record(z.unknown())).min(3).max(12),
});

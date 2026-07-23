import { z } from 'zod';

export const BaseFields = {
  id: z.string(),
};

export const FooterFields = {
  footerLeft: z.string().max(40).default(''),
  footerRight: z.string().max(40).default(''),
};

export const CoverSlideSchema = z.object({
  ...BaseFields, type: z.literal('cover'),
  tag: z.string().max(30),
  headline: z.string().min(3).max(60),
  subheadline: z.string().max(200),
  metadata: z.string().max(40).optional(),
  ...FooterFields,
});

export const DefinitionSlideSchema = z.object({
  ...BaseFields, type: z.literal('definition'),
  tag: z.string().max(30),
  term: z.string().max(40),
  phonetic: z.string().max(40),
  definition: z.string().min(10).max(500),
  example: z.string().max(200).optional(),
  ...FooterFields,
});

export const DichotomySideSchema = z.object({
  title: z.string().min(1).max(30),
  desc: z.string().max(200),
});

export const DichotomySlideSchema = z.object({
  ...BaseFields, type: z.literal('dichotomy'),
  tag: z.string().max(30),
  headline: z.string().min(3).max(60),
  left: DichotomySideSchema,
  right: DichotomySideSchema,
  ...FooterFields,
});

export const TimelineEventSchema = z.object({
  date: z.string().max(30),
  title: z.string().max(30),
  desc: z.string().max(150),
});

export const TimelineSlideSchema = z.object({
  ...BaseFields, type: z.literal('timeline'),
  tag: z.string().max(30),
  headline: z.string().min(3).max(60),
  events: z.array(TimelineEventSchema).min(1).max(12),
  ...FooterFields,
});

export const QuoteSlideSchema = z.object({
  ...BaseFields, type: z.literal('quote'),
  tag: z.string().max(30),
  quote: z.string().min(10).max(400),
  author: z.string().min(1).max(40),
  role: z.string().max(40),
  ...FooterFields,
});

export const SequenceItemSchema = z.object({
  num: z.string().min(1).max(4),
  title: z.string().max(30),
  desc: z.string().max(150),
});

export const SequenceSlideSchema = z.object({
  ...BaseFields, type: z.literal('sequence'),
  tag: z.string().max(30),
  headline: z.string().min(3).max(60),
  items: z.array(SequenceItemSchema).min(1).max(12),
  ...FooterFields,
});

export const StatSchema = z.object({
  value: z.string().min(1).max(20),
  label: z.string().min(1).max(40),
});

export const TelemetrySlideSchema = z.object({
  ...BaseFields, type: z.literal('telemetry'),
  tag: z.string().max(30),
  headline: z.string().min(3).max(60),
  stats: z.array(StatSchema).min(1).max(12),
  ...FooterFields,
});

export const TableSlideSchema = z.object({
  ...BaseFields, type: z.literal('table'),
  tag: z.string().max(30),
  headline: z.string().min(3).max(60),
  headers: z.array(z.string().min(1).max(30)).min(2).max(6),
  rows: z.array(z.array(z.string().min(1).max(50))).min(1).max(15),
  ...FooterFields,
});

export const ImageSplitSlideSchema = z.object({
  ...BaseFields, type: z.literal('image-split'),
  tag: z.string().max(30),
  headline: z.string().min(3).max(60),
  bodyText: z.string().max(200),
  imageUrl: z.string().url(),
  ...FooterFields,
});

export const ImageCoverSlideSchema = z.object({
  ...BaseFields, type: z.literal('image-cover'),
  tag: z.string().max(30),
  headline: z.string().min(3).max(60),
  subtext: z.string().max(200),
  imageUrl: z.string().url(),
  ...FooterFields,
});

export const CtaSlideSchema = z.object({
  ...BaseFields, type: z.literal('cta'),
  tag: z.string().max(30),
  headline: z.string().min(3).max(60),
  subtext: z.string().max(200),
  actionLabel: z.string().min(1).max(40),
  socialHandle: z.string().max(30),
  ...FooterFields,
});

export const SlideSchema = z.discriminatedUnion('type', [
  CoverSlideSchema, DefinitionSlideSchema, DichotomySlideSchema,
  TimelineSlideSchema, QuoteSlideSchema, SequenceSlideSchema,
  TelemetrySlideSchema, TableSlideSchema, ImageSplitSlideSchema,
  ImageCoverSlideSchema, CtaSlideSchema,
]);

export type Slide = z.infer<typeof SlideSchema>;
export type SlideType = Slide['type'];

export type CoverSlide = z.infer<typeof CoverSlideSchema>;
export type DefinitionSlide = z.infer<typeof DefinitionSlideSchema>;
export type DichotomySlide = z.infer<typeof DichotomySlideSchema>;
export type TimelineSlide = z.infer<typeof TimelineSlideSchema>;
export type QuoteSlide = z.infer<typeof QuoteSlideSchema>;
export type SequenceSlide = z.infer<typeof SequenceSlideSchema>;
export type TelemetrySlide = z.infer<typeof TelemetrySlideSchema>;
export type TableSlide = z.infer<typeof TableSlideSchema>;
export type ImageSplitSlide = z.infer<typeof ImageSplitSlideSchema>;
export type ImageCoverSlide = z.infer<typeof ImageCoverSlideSchema>;
export type CtaSlide = z.infer<typeof CtaSlideSchema>;

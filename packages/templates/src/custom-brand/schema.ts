import { z } from 'zod';

const baseSlideFields = {
  tag: z.string().min(1).max(30),
  footerLeft: z.string().min(1),
  footerRight: z.string().min(1),
};

const coverSchema = z.object({
  type: z.literal('cover'),
  ...baseSlideFields,
  headline: z.string().min(1).max(60),
  subheadline: z.string().max(120).default(''),
  metadata: z.string().max(100).default(''),
});

const definitionSchema = z.object({
  type: z.literal('definition'),
  ...baseSlideFields,
  term: z.string().min(1).max(40),
  phonetic: z.string().max(30).default(''),
  definition: z.string().min(1).max(200),
  example: z.string().max(150).default(''),
});

const dichotomySchema = z.object({
  type: z.literal('dichotomy'),
  ...baseSlideFields,
  headline: z.string().min(1).max(60),
  left: z.object({
    title: z.string().min(1).max(30),
    desc: z.string().min(1).max(120),
  }),
  right: z.object({
    title: z.string().min(1).max(30),
    desc: z.string().min(1).max(120),
  }),
});

const timelineEventSchema = z.object({
  date: z.string().min(1).max(20),
  title: z.string().min(1).max(40),
  desc: z.string().min(1).max(120),
});

const timelineSchema = z.object({
  type: z.literal('timeline'),
  ...baseSlideFields,
  headline: z.string().min(1).max(60),
  events: z.array(timelineEventSchema).min(1).max(8),
});

const quoteSchema = z.object({
  type: z.literal('quote'),
  ...baseSlideFields,
  quote: z.string().min(1).max(300),
  author: z.string().min(1).max(40),
  role: z.string().max(60).default(''),
});

const sequenceItemSchema = z.object({
  num: z.coerce.number().int().min(1),
  title: z.string().min(1).max(40),
  desc: z.string().min(1).max(120),
});

const sequenceSchema = z.object({
  type: z.literal('sequence'),
  ...baseSlideFields,
  headline: z.string().min(1).max(60),
  items: z.array(sequenceItemSchema).min(1).max(8),
});

const telemetryStatSchema = z.object({
  value: z.string().min(1).max(20),
  label: z.string().min(1).max(40),
});

const telemetrySchema = z.object({
  type: z.literal('telemetry'),
  ...baseSlideFields,
  headline: z.string().min(1).max(60),
  stats: z.array(telemetryStatSchema).min(1).max(8),
});

const tableSchema = z.object({
  type: z.literal('table'),
  ...baseSlideFields,
  headline: z.string().min(1).max(60),
  headers: z.array(z.string().max(30)).min(1).max(5),
  rows: z.array(z.array(z.string().max(40))).min(1).max(8),
});

const imageSplitSchema = z.object({
  type: z.literal('image-split'),
  ...baseSlideFields,
  headline: z.string().min(1).max(60),
  bodyText: z.string().min(1).max(200),
  imageUrl: z.string().url().optional(),
  imageKeywords: z.string().max(50).optional(),
});

const imageCoverSchema = z.object({
  type: z.literal('image-cover'),
  ...baseSlideFields,
  headline: z.string().min(1).max(60),
  subtext: z.string().min(1).max(200),
  imageUrl: z.string().url().optional(),
  imageKeywords: z.string().max(50).optional(),
});

const ctaSchema = z.object({
  type: z.literal('cta'),
  ...baseSlideFields,
  headline: z.string().min(1).max(60),
  subtext: z.string().max(150).default(''),
  actionLabel: z.string().min(1).max(30),
  socialHandle: z.string().max(40).default(''),
});

export const SlideSchema = z.discriminatedUnion('type', [
  coverSchema,
  definitionSchema,
  dichotomySchema,
  timelineSchema,
  quoteSchema,
  sequenceSchema,
  telemetrySchema,
  tableSchema,
  imageSplitSchema,
  imageCoverSchema,
  ctaSchema,
]);

export type Slide = z.infer<typeof SlideSchema>;

export const CustomBrandContractSchema = z.object({
  templateId: z.literal('custom-brand').optional(),
  brandKit: z.object({
    bg: z.string().optional(),
    text: z.string().optional(),
    accent: z.string().optional(),
    fontSerif: z.string().optional(),
    fontSans: z.string().optional(),
    logoUrl: z.string().url().optional(),
  }).optional(),
  slides: z.array(SlideSchema).min(1).max(12),
});

export type CustomBrandContract = z.infer<typeof CustomBrandContractSchema>;

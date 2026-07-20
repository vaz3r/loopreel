import { z } from 'zod';

const BaseFields = {
  tag: z.string().max(30),
  footerLeft: z.string().min(1),
  footerRight: z.string().min(1),
};

const coverSlide = z.object({
  type: z.literal('cover'),
  headline: z.string().max(60),
  subheadline: z.string().max(120),
  metadata: z.string().max(100),
  ...BaseFields,
});

const definitionSlide = z.object({
  type: z.literal('definition'),
  term: z.string().max(40),
  phonetic: z.string().max(30),
  definition: z.string().max(200),
  example: z.string().max(150),
  ...BaseFields,
});

const dichotomySlide = z.object({
  type: z.literal('dichotomy'),
  headline: z.string().max(60),
  left: z.object({
    title: z.string().max(30),
    desc: z.string().max(120),
  }),
  right: z.object({
    title: z.string().max(30),
    desc: z.string().max(120),
  }),
  ...BaseFields,
});

const timelineSlide = z.object({
  type: z.literal('timeline'),
  headline: z.string().max(60),
  events: z.array(z.object({
    date: z.string().max(20),
    title: z.string().max(40),
    desc: z.string().max(120),
  })).min(2).max(8),
  ...BaseFields,
});

const quoteSlide = z.object({
  type: z.literal('quote'),
  quote: z.string().max(300),
  author: z.string().max(40),
  role: z.string().max(60),
  ...BaseFields,
});

const sequenceSlide = z.object({
  type: z.literal('sequence'),
  headline: z.string().max(60),
  items: z.array(z.object({
    num: z.coerce.number(),
    title: z.string().max(40),
    desc: z.string().max(120),
  })).min(2).max(8),
  ...BaseFields,
});

const telemetrySlide = z.object({
  type: z.literal('telemetry'),
  headline: z.string().max(60),
  stats: z.array(z.object({
    value: z.string().max(20),
    label: z.string().max(40),
  })).min(2).max(8),
  ...BaseFields,
});

const tableSlide = z.object({
  type: z.literal('table'),
  headline: z.string().max(60),
  headers: z.array(z.string().max(30)).min(1).max(5),
  rows: z.array(z.array(z.string().max(40))).min(1).max(8),
  ...BaseFields,
});

const imageSplitSlide = z.object({
  type: z.literal('image-split'),
  headline: z.string().max(60),
  bodyText: z.string().max(200),
  imageUrl: z.string().optional(),
  imageKeywords: z.string().max(50).optional(),
  ...BaseFields,
});

const imageCoverSlide = z.object({
  type: z.literal('image-cover'),
  headline: z.string().max(60),
  subtext: z.string().max(200),
  imageUrl: z.string().optional(),
  imageKeywords: z.string().max(50).optional(),
  ...BaseFields,
});

const ctaSlide = z.object({
  type: z.literal('cta'),
  headline: z.string().max(60),
  subtext: z.string().max(150),
  actionLabel: z.string().max(30),
  socialHandle: z.string().max(40),
  ...BaseFields,
});

export const SlideSchema = z.discriminatedUnion('type', [
  coverSlide,
  definitionSlide,
  dichotomySlide,
  timelineSlide,
  quoteSlide,
  sequenceSlide,
  telemetrySlide,
  tableSlide,
  imageSplitSlide,
  imageCoverSlide,
  ctaSlide,
]);

export type Slide = z.infer<typeof SlideSchema>;

export const IndustrialBrutalMetaSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
});

export const IndustrialBrutalContractSchema = z.object({
  meta: IndustrialBrutalMetaSchema,
  slides: z.array(SlideSchema).min(4).max(10),
});

export type IndustrialBrutalContract = z.infer<typeof IndustrialBrutalContractSchema>;
export type IndustrialBrutalMeta = z.infer<typeof IndustrialBrutalMetaSchema>;

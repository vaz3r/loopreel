import { z } from 'zod';

const MAX = {
  tag: 30,
  headline: 60,
  body: 200,
  quote: 400,
  definition: 500,
  term: 40,
  itemTitle: 30,
  itemDesc: 150,
} as const;

const FooterFields = {
  footerLeft: z.string().max(40),
  footerRight: z.string().max(40),
};

export const CoverSlideSchema = z.object({
  id: z.string(),
  type: z.literal('cover'),
  tag: z.string().max(MAX.tag),
  headline: z.string().max(MAX.headline),
  subheadline: z.string().max(MAX.body),
  metadata: z.string().max(40),
  ...FooterFields,
});

export const DefinitionSlideSchema = z.object({
  id: z.string(),
  type: z.literal('definition'),
  tag: z.string().max(MAX.tag),
  term: z.string().max(MAX.term),
  phonetic: z.string().max(40),
  definition: z.string().max(MAX.definition),
  example: z.string().max(MAX.body).optional(),
  ...FooterFields,
});

export const DichotomySlideSchema = z.object({
  id: z.string(),
  type: z.literal('dichotomy'),
  tag: z.string().max(MAX.tag),
  headline: z.string().max(MAX.headline),
  left: z.object({
    title: z.string().max(MAX.itemTitle),
    desc: z.string().max(MAX.body),
  }),
  right: z.object({
    title: z.string().max(MAX.itemTitle),
    desc: z.string().max(MAX.body),
  }),
  ...FooterFields,
});

export const TimelineEventSchema = z.object({
  date: z.string().max(30),
  title: z.string().max(MAX.itemTitle),
  desc: z.string().max(MAX.itemDesc),
});

export const TimelineSlideSchema = z.object({
  id: z.string(),
  type: z.literal('timeline'),
  tag: z.string().max(MAX.tag),
  headline: z.string().max(MAX.headline),
  events: z.array(TimelineEventSchema).min(1).max(12),
  ...FooterFields,
});

export const QuoteSlideSchema = z.object({
  id: z.string(),
  type: z.literal('quote'),
  tag: z.string().max(MAX.tag),
  quote: z.string().max(MAX.quote),
  author: z.string().max(40),
  role: z.string().max(40),
  ...FooterFields,
});

export const SequenceItemSchema = z.object({
  num: z.string().max(4),
  title: z.string().max(MAX.itemTitle),
  desc: z.string().max(MAX.itemDesc),
});

export const SequenceSlideSchema = z.object({
  id: z.string(),
  type: z.literal('sequence'),
  tag: z.string().max(MAX.tag),
  headline: z.string().max(MAX.headline),
  items: z.array(SequenceItemSchema).min(1).max(12),
  ...FooterFields,
});

export const StatSchema = z.object({
  value: z.string().max(20),
  label: z.string().max(40),
});

export const TelemetrySlideSchema = z.object({
  id: z.string(),
  type: z.literal('telemetry'),
  tag: z.string().max(MAX.tag),
  headline: z.string().max(MAX.headline),
  stats: z.array(StatSchema).min(1).max(12),
  ...FooterFields,
});

export const TableSlideSchema = z.object({
  id: z.string(),
  type: z.literal('table'),
  tag: z.string().max(MAX.tag),
  headline: z.string().max(MAX.headline),
  headers: z.array(z.string().max(30)).min(2).max(6),
  rows: z.array(z.array(z.string().max(50))).min(1).max(15),
  ...FooterFields,
});

export const ImageSplitSlideSchema = z.object({
  id: z.string(),
  type: z.literal('image-split'),
  tag: z.string().max(MAX.tag),
  headline: z.string().max(MAX.headline),
  bodyText: z.string().max(MAX.body),
  imageUrl: z.string().url(),
  ...FooterFields,
});

export const ImageCoverSlideSchema = z.object({
  id: z.string(),
  type: z.literal('image-cover'),
  tag: z.string().max(MAX.tag),
  headline: z.string().max(MAX.headline),
  subtext: z.string().max(MAX.body),
  imageUrl: z.string().url(),
  ...FooterFields,
});

export const CtaSlideSchema = z.object({
  id: z.string(),
  type: z.literal('cta'),
  tag: z.string().max(MAX.tag),
  headline: z.string().max(MAX.headline),
  subtext: z.string().max(MAX.body),
  actionLabel: z.string().max(40),
  socialHandle: z.string().max(30),
  ...FooterFields,
});

export const SlideSchema = z.discriminatedUnion('type', [
  CoverSlideSchema,
  DefinitionSlideSchema,
  DichotomySlideSchema,
  TimelineSlideSchema,
  QuoteSlideSchema,
  SequenceSlideSchema,
  TelemetrySlideSchema,
  TableSlideSchema,
  ImageSplitSlideSchema,
  ImageCoverSlideSchema,
  CtaSlideSchema,
]);

export const VoidContractSchema = z.object({
  slides: z.array(SlideSchema).min(1),
});

export type Slide = z.infer<typeof SlideSchema>;
export type VoidContract = z.infer<typeof VoidContractSchema>;
export type SlideType = Slide['type'];

export const SLIDE_TYPES: SlideType[] = [
  'cover', 'definition', 'dichotomy', 'timeline', 'quote',
  'sequence', 'telemetry', 'table', 'image-split', 'image-cover', 'cta',
];

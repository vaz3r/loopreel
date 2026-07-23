import { z } from 'zod';

const FooterFields = {
  footerLeft: z.string().max(40).default(''),
  footerRight: z.string().max(40).default(''),
};

const CoverSlide = z.object({
  id: z.string(),
  type: z.literal('cover'),
  tag: z.string().max(30).optional(),
  headline: z.string().min(3).max(120),
  subheadline: z.string().max(200).optional(),
  authorName: z.string().max(40).optional(),
  authorRole: z.string().max(60).optional(),
  ...FooterFields,
});

const QuoteSlide = z.object({
  id: z.string(),
  type: z.literal('quote'),
  tag: z.string().max(30).optional(),
  quote: z.string().min(10).max(500),
  author: z.string().max(40),
  role: z.string().max(60).optional(),
  ...FooterFields,
});

const DefinitionSlide = z.object({
  id: z.string(),
  type: z.literal('definition'),
  tag: z.string().max(30).optional(),
  term: z.string().min(2).max(60),
  phonetic: z.string().max(60).optional(),
  definition: z.string().min(10).max(600),
  example: z.string().max(200).optional(),
  ...FooterFields,
});

const SequenceSlide = z.object({
  id: z.string(),
  type: z.literal('sequence'),
  tag: z.string().max(30).optional(),
  headline: z.string().min(3).max(80),
  items: z.array(z.object({
    num: z.string().max(4),
    title: z.string().max(60),
    desc: z.string().max(200),
  })).min(1).max(6),
  ...FooterFields,
});

const DichotomySlide = z.object({
  id: z.string(),
  type: z.literal('dichotomy'),
  tag: z.string().max(30).optional(),
  headline: z.string().min(3).max(80),
  left: z.object({ title: z.string().max(60), desc: z.string().max(400) }),
  right: z.object({ title: z.string().max(60), desc: z.string().max(400) }),
  leftLabel: z.string().max(40).optional(),
  rightLabel: z.string().max(40).optional(),
  ...FooterFields,
});

const TelemetrySlide = z.object({
  id: z.string(),
  type: z.literal('telemetry'),
  tag: z.string().max(30).optional(),
  headline: z.string().min(3).max(80),
  stats: z.array(z.object({
    value: z.string().max(20),
    unit: z.string().max(10).optional(),
    label: z.string().max(120),
  })).min(1).max(4),
  ...FooterFields,
});

const TimelineSlide = z.object({
  id: z.string(),
  type: z.literal('timeline'),
  tag: z.string().max(30).optional(),
  headline: z.string().min(3).max(80),
  events: z.array(z.object({
    date: z.string().max(20),
    title: z.string().max(60),
    desc: z.string().max(200),
    highlight: z.boolean().optional(),
  })).min(1).max(5),
  ...FooterFields,
});

const ImageSplitSlide = z.object({
  id: z.string(),
  type: z.literal('image-split'),
  tag: z.string().max(30).optional(),
  headline: z.string().min(3).max(80),
  bodyText: z.string().max(400).optional(),
  imageUrl: z.string().url(),
  credit: z.string().max(60).optional(),
  ...FooterFields,
});

const TableSlide = z.object({
  id: z.string(),
  type: z.literal('table'),
  tag: z.string().max(30).optional(),
  headline: z.string().min(3).max(80),
  headers: z.array(z.string().max(30)).min(2).max(6),
  rows: z.array(z.array(z.string().max(60))).min(1).max(10),
  highlightRow: z.number().optional(),
  ...FooterFields,
});

const AnalysisSlide = z.object({
  id: z.string(),
  type: z.literal('analysis'),
  tag: z.string().max(30).optional(),
  headline: z.string().min(3).max(80),
  bodyText: z.string().min(50).max(2000),
  ...FooterFields,
});

const ProfileSlide = z.object({
  id: z.string(),
  type: z.literal('profile'),
  tag: z.string().max(30).optional(),
  headline: z.string().min(3).max(80),
  portraitUrl: z.string().url(),
  personName: z.string().max(60),
  personRole: z.string().max(80),
  quote: z.string().min(10).max(600),
  ...FooterFields,
});

const CtaSlide = z.object({
  id: z.string(),
  type: z.literal('cta'),
  tag: z.string().max(30).optional(),
  headline: z.string().min(3).max(100),
  subtext: z.string().max(200).optional(),
  actionLabel: z.string().max(40).optional(),
  socialHandle: z.string().max(40).optional(),
  ...FooterFields,
});

const PaperOfRecordSlideSchema = z.discriminatedUnion('type', [
  CoverSlide, QuoteSlide, DefinitionSlide, SequenceSlide, DichotomySlide,
  TelemetrySlide, TimelineSlide, ImageSplitSlide, TableSlide,
  AnalysisSlide, ProfileSlide, CtaSlide,
]);

export const PaperOfRecordContract = z.object({
  slides: z.array(PaperOfRecordSlideSchema).min(1),
});

export type PaperOfRecordContract = z.infer<typeof PaperOfRecordContract>;

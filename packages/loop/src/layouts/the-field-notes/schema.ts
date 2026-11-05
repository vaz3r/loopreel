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
  subheadline: z.string().max(250).optional(),
  authorName: z.string().max(40).optional(),
  authorRole: z.string().max(60).optional(),
  ...FooterFields,
});

const SequenceSlide = z.object({
  id: z.string(),
  type: z.literal('sequence'),
  tag: z.string().max(30).optional(),
  headline: z.string().min(3).max(80),
  description: z.string().max(200).optional(),
  items: z.array(z.object({
    num: z.string().max(4),
    title: z.string().max(60),
    desc: z.string().max(250),
  })).min(1).max(6).optional(),
  steps: z.array(z.object({
    num: z.string().max(4),
    title: z.string().max(60),
    desc: z.string().max(250),
  })).min(1).max(6).optional(),
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
  })).min(1).max(6).optional(),
  metrics: z.array(z.object({
    value: z.string().max(20),
    unit: z.string().max(10).optional(),
    label: z.string().max(120),
  })).min(1).max(6).optional(),
  ...FooterFields,
});

const QuoteSlide = z.object({
  id: z.string(),
  type: z.literal('quote'),
  tag: z.string().max(30).optional(),
  quote: z.string().min(10).max(500),
  author: z.string().max(40).optional(),
  role: z.string().max(60).optional(),
  ...FooterFields,
});

const CtaSlide = z.object({
  id: z.string(),
  type: z.literal('cta'),
  tag: z.string().max(30).optional(),
  headline: z.string().min(3).max(80),
  subtext: z.string().max(250).optional(),
  actionLabel: z.string().max(40).optional(),
  socialHandle: z.string().max(40).optional(),
  ...FooterFields,
});

const TheFieldNotesSlideSchema = z.discriminatedUnion('type', [
  CoverSlide,
  SequenceSlide,
  TelemetrySlide,
  QuoteSlide,
  CtaSlide,
]);

export const TheFieldNotesContract = z.object({
  slides: z.array(TheFieldNotesSlideSchema).min(1),
});

export type TheFieldNotesContract = z.infer<typeof TheFieldNotesContract>;
export type TheFieldNotesSlide = z.infer<typeof TheFieldNotesSlideSchema>;

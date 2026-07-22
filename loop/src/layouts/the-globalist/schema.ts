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

const TelemetrySlide = z.object({
  id: z.string(),
  type: z.literal('telemetry'),
  tag: z.string().max(30).optional(),
  headline: z.string().min(3).max(80),
  stats: z.array(z.object({
    value: z.string().max(20),
    unit: z.string().max(10).optional(),
    label: z.string().max(200),
  })).min(1).max(4),
  ...FooterFields,
});

const InterviewSlide = z.object({
  id: z.string(),
  type: z.literal('interview'),
  tag: z.string().max(30).optional(),
  headline: z.string().min(3).max(80),
  question: z.string().min(10).max(500),
  answer: z.string().min(10).max(1000),
  respondentName: z.string().max(60),
  respondentRole: z.string().max(80),
  ...FooterFields,
});

const QuadrantSlide = z.object({
  id: z.string(),
  type: z.literal('quadrant'),
  tag: z.string().max(30).optional(),
  headline: z.string().min(3).max(80),
  topLeft: z.object({ title: z.string().max(60), desc: z.string().max(200) }),
  topRight: z.object({ title: z.string().max(60), desc: z.string().max(200) }),
  bottomLeft: z.object({ title: z.string().max(60), desc: z.string().max(200) }),
  bottomRight: z.object({ title: z.string().max(60), desc: z.string().max(200) }),
  topLabel: z.string().max(30).optional(),
  bottomLabel: z.string().max(30).optional(),
  leftLabel: z.string().max(30).optional(),
  rightLabel: z.string().max(30).optional(),
  highlight: z.enum(['topLeft', 'topRight', 'bottomLeft', 'bottomRight']).optional(),
  ...FooterFields,
});

const CaseStudySlide = z.object({
  id: z.string(),
  type: z.literal('case-study'),
  tag: z.string().max(30).optional(),
  headline: z.string().min(3).max(80),
  stages: z.array(z.object({
    label: z.string().max(30),
    title: z.string().max(60),
    desc: z.string().max(200),
    highlighted: z.boolean().optional(),
  })).min(2).max(4),
  ...FooterFields,
});

const MythFactSlide = z.object({
  id: z.string(),
  type: z.literal('myth-fact'),
  tag: z.string().max(30).optional(),
  headline: z.string().min(3).max(80),
  mythLabel: z.string().max(40).optional(),
  myth: z.string().min(10).max(500),
  factLabel: z.string().max(40).optional(),
  fact: z.string().min(10).max(500),
  ...FooterFields,
});

const ResourceGridSlide = z.object({
  id: z.string(),
  type: z.literal('resource-grid'),
  tag: z.string().max(30).optional(),
  headline: z.string().min(3).max(80),
  items: z.array(z.object({
    title: z.string().max(60),
    desc: z.string().max(200),
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

const QuoteSlide = z.object({
  id: z.string(),
  type: z.literal('quote'),
  tag: z.string().max(30).optional(),
  quote: z.string().min(10).max(600),
  author: z.string().max(40),
  role: z.string().max(80).optional(),
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

const TheGlobalistSlideSchema = z.discriminatedUnion('type', [
  CoverSlide, SequenceSlide, ImageSplitSlide, TelemetrySlide,
  InterviewSlide, QuadrantSlide, CaseStudySlide, MythFactSlide,
  ResourceGridSlide, TimelineSlide, QuoteSlide, CtaSlide,
]);

export const TheGlobalistContract = z.object({
  slides: z.array(TheGlobalistSlideSchema).min(1),
});

export type TheGlobalistContract = z.infer<typeof TheGlobalistContract>;

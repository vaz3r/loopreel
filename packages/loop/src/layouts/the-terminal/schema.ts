import { z } from 'zod';

const CoverSlideSchema = z.object({
  id: z.string(), type: z.literal('cover'),
  tag: z.string().optional(),
  reportId: z.string().optional(),
  headline: z.string().max(80),
  subheadline: z.string().max(200).optional(),
  authorName: z.string().optional(),
  authorRole: z.string().optional(),
  footerLeft: z.string().optional(), footerRight: z.string().optional(),
});

const SequenceSlideSchema = z.object({
  id: z.string(), type: z.literal('sequence'),
  tag: z.string().optional(),
  headline: z.string().max(60),
  items: z.array(z.object({
    num: z.string(), title: z.string().max(50), desc: z.string().max(200),
  })).min(1).max(20),
  footerLeft: z.string().optional(), footerRight: z.string().optional(),
});

const ImageSplitSlideSchema = z.object({
  id: z.string(), type: z.literal('image-split'),
  tag: z.string().optional(),
  headline: z.string().max(60),
  bodyText: z.string().max(400).optional(),
  imageUrl: z.string().url().optional(),
  credit: z.string().optional(),
  footerLeft: z.string().optional(), footerRight: z.string().optional(),
});

const TelemetrySlideSchema = z.object({
  id: z.string(), type: z.literal('telemetry'),
  tag: z.string().optional(),
  headline: z.string().max(60),
  stats: z.array(z.object({
    value: z.string(), unit: z.string().optional(),
    label: z.string().max(150),
    color: z.enum(['green', 'red', 'amber', 'blue']).optional(),
  })).min(1).max(4),
  footerLeft: z.string().optional(), footerRight: z.string().optional(),
});

const InterviewSlideSchema = z.object({
  id: z.string(), type: z.literal('interview'),
  tag: z.string().optional(),
  headline: z.string().max(60),
  question: z.string().max(200),
  answer: z.string().max(600),
  respondentName: z.string().optional(),
  respondentRole: z.string().optional(),
  footerLeft: z.string().optional(), footerRight: z.string().optional(),
});

const QuadrantSlideSchema = z.object({
  id: z.string(), type: z.literal('quadrant'),
  tag: z.string().optional(),
  headline: z.string().max(60),
  topLeft: z.object({ title: z.string().max(40), desc: z.string().max(150) }),
  topRight: z.object({ title: z.string().max(40), desc: z.string().max(150) }),
  bottomLeft: z.object({ title: z.string().max(40), desc: z.string().max(150) }),
  bottomRight: z.object({ title: z.string().max(40), desc: z.string().max(150) }),
  topLabel: z.string().optional(), bottomLabel: z.string().optional(),
  leftLabel: z.string().optional(), rightLabel: z.string().optional(),
  highlight: z.enum(['topLeft', 'topRight', 'bottomLeft', 'bottomRight']).optional(),
  footerLeft: z.string().optional(), footerRight: z.string().optional(),
});

const CaseStudySlideSchema = z.object({
  id: z.string(), type: z.literal('case-study'),
  tag: z.string().optional(),
  headline: z.string().max(60),
  stages: z.array(z.object({
    label: z.string(), title: z.string().max(50), desc: z.string().max(250),
    highlighted: z.boolean().optional(),
  })).min(1).max(5),
  footerLeft: z.string().optional(), footerRight: z.string().optional(),
});

const MythFactSlideSchema = z.object({
  id: z.string(), type: z.literal('myth-fact'),
  tag: z.string().optional(),
  headline: z.string().max(60),
  myth: z.string().max(300),
  fact: z.string().max(300),
  footerLeft: z.string().optional(), footerRight: z.string().optional(),
});

const ResourceGridSlideSchema = z.object({
  id: z.string(), type: z.literal('resource-grid'),
  tag: z.string().optional(),
  headline: z.string().max(60),
  items: z.array(z.object({
    title: z.string().max(40), desc: z.string().max(150),
  })).min(1).max(4),
  footerLeft: z.string().optional(), footerRight: z.string().optional(),
});

const TimelineSlideSchema = z.object({
  id: z.string(), type: z.literal('timeline'),
  tag: z.string().optional(),
  headline: z.string().max(60),
  events: z.array(z.object({
    date: z.string(), title: z.string().max(50), desc: z.string().max(200),
    highlight: z.boolean().optional(),
  })).min(1).max(5),
  footerLeft: z.string().optional(), footerRight: z.string().optional(),
});

const QuoteSlideSchema = z.object({
  id: z.string(), type: z.literal('quote'),
  tag: z.string().optional(),
  quote: z.string().max(500),
  author: z.string().optional(),
  role: z.string().optional(),
  footerLeft: z.string().optional(), footerRight: z.string().optional(),
});

const CtaSlideSchema = z.object({
  id: z.string(), type: z.literal('cta'),
  tag: z.string().optional(),
  headline: z.string().max(60),
  subtext: z.string().max(200).optional(),
  actionLabel: z.string().optional(),
  socialHandle: z.string().optional(),
  footerLeft: z.string().optional(), footerRight: z.string().optional(),
});

const TerminalSlideSchema = z.discriminatedUnion('type', [
  CoverSlideSchema, SequenceSlideSchema, ImageSplitSlideSchema, TelemetrySlideSchema,
  InterviewSlideSchema, QuadrantSlideSchema, CaseStudySlideSchema, MythFactSlideSchema,
  ResourceGridSlideSchema, TimelineSlideSchema, QuoteSlideSchema, CtaSlideSchema,
]);

export const TheTerminalContract = z.object({
  slides: z.array(TerminalSlideSchema).min(1),
});

export type TheTerminalContract = z.infer<typeof TheTerminalContract>;
export type TerminalSlide = z.infer<typeof TerminalSlideSchema>;

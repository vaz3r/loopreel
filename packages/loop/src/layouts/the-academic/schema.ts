import { z } from 'zod';
import { booleanFromString } from '../shared/types.js';

const CoverSlideSchema = z.object({
  id: z.string(), type: z.literal('cover'),
  tag: z.string().optional(),
  headline: z.string().max(80),
  subheadline: z.string().max(400).optional(),
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
    color: z.enum(['crimson', 'ink', 'graphite']).optional(),
  })).min(1).max(20),
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
  bottomRight: z.object({ title: z.string().max(40), desc: z.string().max(150), highlighted: booleanFromString }),
  topLabel: z.string().optional(), bottomLabel: z.string().optional(),
  leftLabel: z.string().optional(), rightLabel: z.string().optional(),
  footerLeft: z.string().optional(), footerRight: z.string().optional(),
});

const CaseStudySlideSchema = z.object({
  id: z.string(), type: z.literal('case-study'),
  tag: z.string().optional(),
  headline: z.string().max(60),
  stages: z.array(z.object({
    label: z.string(), title: z.string().max(50), desc: z.string().max(250),
    highlighted: booleanFromString,
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
    num: z.string().optional(), title: z.string().max(40), desc: z.string().max(150),
    color: z.enum(['crimson', 'ink']).optional(),
  })).min(1).max(4),
  footerLeft: z.string().optional(), footerRight: z.string().optional(),
});

const TimelineSlideSchema = z.object({
  id: z.string(), type: z.literal('timeline'),
  tag: z.string().optional(),
  headline: z.string().max(60),
  events: z.array(z.object({
    date: z.string(), title: z.string().max(50), desc: z.string().max(200),
    highlight: booleanFromString,
  })).min(1).max(20),
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

const HeroMetricSlideSchema = z.object({
  id: z.string(), type: z.literal('hero-metric'),
  tag: z.string().optional(),
  value: z.string(),
  unit: z.string().optional(),
  headline: z.string().max(60),
  bodyText: z.string().max(300).optional(),
  footerLeft: z.string().optional(), footerRight: z.string().optional(),
});

const MethodologySlideSchema = z.object({
  id: z.string(), type: z.literal('methodology'),
  tag: z.string().optional(),
  headline: z.string().max(60),
  steps: z.array(z.object({
    num: z.string(), title: z.string().max(40), desc: z.string().max(200),
    highlighted: booleanFromString,
  })).min(1).max(5),
  footerLeft: z.string().optional(), footerRight: z.string().optional(),
});

const JuxtapositionSlideSchema = z.object({
  id: z.string(), type: z.literal('juxtaposition'),
  tag: z.string().optional(),
  headline: z.string().max(60),
  donts: z.array(z.string().max(100)).min(1).max(5),
  dos: z.array(z.string().max(100)).min(1).max(5),
  footerLeft: z.string().optional(), footerRight: z.string().optional(),
});

const ChecklistSlideSchema = z.object({
  id: z.string(), type: z.literal('checklist'),
  tag: z.string().optional(),
  headline: z.string().max(60),
  items: z.array(z.object({
    text: z.string().max(150), checked: booleanFromString,
  })).min(1).max(6),
  footerLeft: z.string().optional(), footerRight: z.string().optional(),
});

const BreakdownSlideSchema = z.object({
  id: z.string(), type: z.literal('breakdown'),
  tag: z.string().optional(),
  headline: z.string().max(60),
  centerLabel: z.string().max(40),
  items: z.array(z.object({
    num: z.string(), title: z.string().max(40), desc: z.string().max(150),
  })).min(1).max(4),
  footerLeft: z.string().optional(), footerRight: z.string().optional(),
});

const AcademicSlideSchema = z.discriminatedUnion('type', [
  CoverSlideSchema, SequenceSlideSchema, ImageSplitSlideSchema, TelemetrySlideSchema,
  InterviewSlideSchema, QuadrantSlideSchema, CaseStudySlideSchema, MythFactSlideSchema,
  ResourceGridSlideSchema, TimelineSlideSchema, QuoteSlideSchema, CtaSlideSchema,
  HeroMetricSlideSchema, MethodologySlideSchema, JuxtapositionSlideSchema,
  ChecklistSlideSchema, BreakdownSlideSchema,
]);

export const TheAcademicContract = z.object({
  slides: z.array(AcademicSlideSchema).min(1),
});

export type TheAcademicContract = z.infer<typeof TheAcademicContract>;
export type AcademicSlide = z.infer<typeof AcademicSlideSchema>;

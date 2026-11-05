import { z } from 'zod';

const UniversalFields = {
  label: z.string().max(60).optional().describe('Custom header category label override (e.g. "Specimen", "Observations", "Survey")'),
  scribble: z.string().max(100).optional().describe('Handwritten margin note with curved directional arrow'),
  note: z.string().max(250).optional().describe('Footnote with asterisk at bottom of slide'),
  footerLeft: z.string().max(40).optional(),
  footerRight: z.string().max(40).optional(),
  tag: z.string().max(40).optional(),
};

/* 1. Cover */
export const CoverSlide = z.object({
  ...UniversalFields,
  id: z.string(),
  type: z.literal('cover'),
  kicker: z.string().max(120).optional().describe('Monospaced category kicker, e.g. "Entry 01 · User interviews"'),
  title: z.string().min(3).max(180).optional(),
  headline: z.string().min(3).max(180).optional(),
  subtitle: z.string().max(300).optional(),
  subheadline: z.string().max(300).optional(),
  meta: z.array(z.string().max(50)).max(5).optional().describe('Up to 4 chips/facts, e.g. ["12 participants", "5 days"]'),
  tape: z.boolean().optional().describe('Whether to display washi tape at top'),
  authorName: z.string().max(60).optional(),
  authorRole: z.string().max(80).optional(),
});

/* 2. Statement */
export const StatementSlide = z.object({
  ...UniversalFields,
  id: z.string(),
  type: z.literal('statement'),
  text: z.string().min(5).max(350).optional().describe('Oversized display statement'),
  headline: z.string().min(5).max(350).optional(),
});

/* 3. List */
export const ListSlide = z.object({
  ...UniversalFields,
  id: z.string(),
  type: z.literal('list'),
  title: z.string().min(3).max(120).optional(),
  headline: z.string().min(3).max(120).optional(),
  items: z.array(z.object({
    num: z.string().max(4).optional(),
    title: z.string().max(100),
    desc: z.string().max(300).optional(),
    text: z.string().max(300).optional(),
  })).min(1).max(6).optional(),
  steps: z.array(z.object({
    num: z.string().max(4).optional(),
    title: z.string().max(100),
    desc: z.string().max(300).optional(),
    text: z.string().max(300).optional(),
  })).min(1).max(6).optional(),
});

/* Sequence alias */
export const SequenceSlide = ListSlide.extend({
  type: z.literal('sequence'),
});

/* 4. Specimen */
export const SpecimenSlide = z.object({
  ...UniversalFields,
  id: z.string(),
  type: z.literal('specimen'),
  term: z.string().min(2).max(80).optional().describe('Term or concept being defined in italic serif'),
  title: z.string().min(2).max(80).optional(),
  pos: z.string().max(50).optional().describe('Part of speech, e.g. "noun · behavioural"'),
  pron: z.string().max(80).optional().describe('Phonetic pronunciation, e.g. "/ˈwɜːk.ə.raʊnd/"'),
  text: z.string().min(5).max(450).optional().describe('Definition lead text'),
  definition: z.string().min(5).max(450).optional(),
  found: z.string().max(120).optional().describe('Where it was found, rendered in handwriting'),
  specimenNo: z.union([z.number(), z.string()]).optional(),
});

/* 5. Measure */
export const MeasureSlide = z.object({
  ...UniversalFields,
  id: z.string(),
  type: z.literal('measure'),
  value: z.string().max(30).default('1').describe('Massive headline statistic value, e.g. "7" or "98%"'),
  unit: z.string().max(20).optional().describe('Handwritten rotated unit, e.g. "of 12" or "hours"'),
  label: z.string().max(80).optional().describe('Label above ruler, e.g. "Participants"'),
  title: z.string().max(140).optional(),
  headline: z.string().max(140).optional(),
  text: z.string().max(350).optional(),
  desc: z.string().max(350).optional(),
});

/* 6. Tally */
export const TallySlide = z.object({
  ...UniversalFields,
  id: z.string(),
  type: z.literal('tally'),
  title: z.string().min(3).max(120).optional(),
  headline: z.string().min(3).max(120).optional(),
  items: z.array(z.object({
    value: z.string().max(20),
    unit: z.string().max(10).optional(),
    label: z.string().max(80),
    text: z.string().max(200).optional(),
    desc: z.string().max(200).optional(),
  })).min(1).max(4).optional(),
  stats: z.array(z.object({
    value: z.string().max(20),
    unit: z.string().max(10).optional(),
    label: z.string().max(80),
    text: z.string().max(200).optional(),
    desc: z.string().max(200).optional(),
  })).min(1).max(4).optional(),
  metrics: z.array(z.object({
    value: z.string().max(20),
    unit: z.string().max(10).optional(),
    label: z.string().max(80),
    text: z.string().max(200).optional(),
    desc: z.string().max(200).optional(),
  })).min(1).max(4).optional(),
});

/* Telemetry alias */
export const TelemetrySlide = TallySlide.extend({
  type: z.literal('telemetry'),
});

/* 7. Route */
export const RouteSlide = z.object({
  ...UniversalFields,
  id: z.string(),
  type: z.literal('route'),
  title: z.string().min(3).max(120).optional(),
  headline: z.string().min(3).max(120).optional(),
  items: z.array(z.object({
    title: z.string().max(100),
    text: z.string().max(300).optional(),
    desc: z.string().max(300).optional(),
  })).min(2).max(6),
});

/* 8. Log */
export const LogSlide = z.object({
  ...UniversalFields,
  id: z.string(),
  type: z.literal('log'),
  title: z.string().min(3).max(120).optional(),
  headline: z.string().min(3).max(120).optional(),
  items: z.array(z.object({
    time: z.string().max(40).describe('Timestamp e.g. "09:10" or "Day 1"'),
    title: z.string().max(100),
    text: z.string().max(300).optional(),
    desc: z.string().max(300).optional(),
    now: z.boolean().optional().describe('Whether this entry has the "here" badge'),
  })).min(1).max(6),
});

/* 9. Compare */
export const CompareSlide = z.object({
  ...UniversalFields,
  id: z.string(),
  type: z.literal('compare'),
  title: z.string().min(3).max(120).optional(),
  headline: z.string().min(3).max(120).optional(),
  left: z.object({
    label: z.string().max(60).default('Before'),
    items: z.array(z.string().max(140)).min(1).max(6),
  }),
  right: z.object({
    label: z.string().max(60).default('After'),
    items: z.array(z.string().max(140)).min(1).max(6),
  }),
});

/* 10. Table */
export const TableSlide = z.object({
  ...UniversalFields,
  id: z.string(),
  type: z.literal('table'),
  title: z.string().min(3).max(120).optional(),
  headline: z.string().min(3).max(120).optional(),
  columns: z.array(z.string().max(50)).min(2).max(6),
  rows: z.array(z.array(z.union([z.string(), z.number()])).max(6)).min(1).max(8),
  total: z.boolean().optional().describe('Whether the last row is a highlighted total row'),
});

/* 11. Chart */
export const ChartSlide = z.object({
  ...UniversalFields,
  id: z.string(),
  type: z.literal('chart'),
  title: z.string().min(3).max(120).optional(),
  headline: z.string().min(3).max(120).optional(),
  unit: z.string().max(10).optional(),
  data: z.array(z.object({
    label: z.string().max(60),
    value: z.number().min(0),
  })).min(1).max(8),
  target: z.object({
    value: z.number(),
    label: z.string().max(40).optional(),
  }).optional(),
  highlight: z.number().optional().describe('Index of the highlighted bar'),
});

/* 12. Map */
export const MapSlideSchema = z.object({
  ...UniversalFields,
  id: z.string(),
  type: z.literal('map'),
  title: z.string().min(3).max(120).optional(),
  headline: z.string().min(3).max(120).optional(),
  points: z.array(z.object({
    name: z.string().max(60),
    note: z.string().max(80).optional(),
  })).min(2).max(6),
  scale: z.string().max(50).optional(),
});

/* 13. Quote */
export const QuoteSlide = z.object({
  ...UniversalFields,
  id: z.string(),
  type: z.literal('quote'),
  quote: z.string().min(5).max(450).optional(),
  text: z.string().min(5).max(450).optional(),
  author: z.string().max(60).optional(),
  by: z.string().max(60).optional(),
  role: z.string().max(80).optional(),
});

/* 14. Entry */
export const EntrySlide = z.object({
  ...UniversalFields,
  id: z.string(),
  type: z.literal('entry'),
  title: z.string().min(2).max(100).optional(),
  headline: z.string().min(2).max(100).optional(),
  date: z.string().max(60).optional().describe('Handwritten date note, e.g. "Day 3 · late evening"'),
  text: z.string().min(10).max(800).describe('Reflective journal text formatted with drop cap'),
});

/* 15. Qa */
export const QaSlide = z.object({
  ...UniversalFields,
  id: z.string(),
  type: z.literal('qa'),
  question: z.string().min(5).max(220).optional(),
  title: z.string().min(5).max(220).optional(),
  answer: z.string().min(5).max(550).optional(),
  text: z.string().min(5).max(550).optional(),
  by: z.string().max(60).optional(),
});

/* 16. Kit */
export const KitSlide = z.object({
  ...UniversalFields,
  id: z.string(),
  type: z.literal('kit'),
  title: z.string().min(3).max(120).optional(),
  headline: z.string().min(3).max(120).optional(),
  items: z.array(z.object({
    text: z.string().max(160).optional(),
    title: z.string().max(160).optional(),
    state: z.preprocess((val) => {
      const s = String(val || '').toLowerCase().trim();
      if (s === 'done' || s === 'checked' || s === 'complete' || s === 'completed' || s === 'true' || s === 'yes') return 'done';
      if (s === 'flag' || s === 'flagged' || s === 'warning' || s === 'alert') return 'flag';
      return 'open';
    }, z.enum(['done', 'open', 'flag'])).default('open'),
  })).min(1).max(8),
});

/* 17. Cta */
export const CtaSlide = z.object({
  ...UniversalFields,
  id: z.string(),
  type: z.literal('cta'),
  title: z.string().min(3).max(120).optional(),
  headline: z.string().min(3).max(120).optional(),
  text: z.string().max(300).optional(),
  subtext: z.string().max(300).optional(),
  button: z.string().max(60).optional(),
  actionLabel: z.string().max(60).optional(),
  sign: z.string().max(60).optional().describe('Handwritten sign-off, e.g. "see you in the field"'),
  socialHandle: z.string().max(60).optional(),
});

export const TheFieldNotesSlideSchema = z.discriminatedUnion('type', [
  CoverSlide,
  StatementSlide,
  ListSlide,
  SequenceSlide,
  SpecimenSlide,
  MeasureSlide,
  TallySlide,
  TelemetrySlide,
  RouteSlide,
  LogSlide,
  CompareSlide,
  TableSlide,
  ChartSlide,
  MapSlideSchema,
  QuoteSlide,
  EntrySlide,
  QaSlide,
  KitSlide,
  CtaSlide,
]);

export const TheFieldNotesContract = z.object({
  slides: z.array(TheFieldNotesSlideSchema).min(1),
});

export type TheFieldNotesContract = z.infer<typeof TheFieldNotesContract>;
export type TheFieldNotesSlide = z.infer<typeof TheFieldNotesSlideSchema>;

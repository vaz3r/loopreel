import { z } from "zod";

const maxLen = (n: number) => z.string().max(n);

const coverSlide = z.object({
  type: z.literal("cover"),
  tag: maxLen(30),
  footerLeft: z.string(),
  footerRight: z.string(),
  headline: maxLen(60),
  subheadline: maxLen(120),
  metadata: maxLen(100).optional(),
});

const definitionSlide = z.object({
  type: z.literal("definition"),
  tag: maxLen(30),
  footerLeft: z.string(),
  footerRight: z.string(),
  term: maxLen(40),
  phonetic: maxLen(30).optional(),
  definition: maxLen(200),
  example: maxLen(150).optional(),
});

const dichotomySlide = z.object({
  type: z.literal("dichotomy"),
  tag: maxLen(30),
  footerLeft: z.string(),
  footerRight: z.string(),
  headline: maxLen(60),
  left: z.object({
    title: maxLen(30),
    desc: maxLen(120),
  }),
  right: z.object({
    title: maxLen(30),
    desc: maxLen(120),
  }),
});

const timelineSlide = z.object({
  type: z.literal("timeline"),
  tag: maxLen(30),
  footerLeft: z.string(),
  footerRight: z.string(),
  headline: maxLen(60),
  events: z
    .array(
      z.object({
        date: maxLen(20),
        title: maxLen(40),
        desc: maxLen(120),
      })
    )
    .max(8),
});

const quoteSlide = z.object({
  type: z.literal("quote"),
  tag: maxLen(30),
  footerLeft: z.string(),
  footerRight: z.string(),
  quote: maxLen(300),
  author: maxLen(40),
  role: maxLen(60).optional(),
});

const sequenceSlide = z.object({
  type: z.literal("sequence"),
  tag: maxLen(30),
  footerLeft: z.string(),
  footerRight: z.string(),
  headline: maxLen(60),
  items: z
    .array(
      z.object({
        num: z.coerce.number(),
        title: maxLen(40),
        desc: maxLen(120),
      })
    )
    .max(8),
});

const telemetrySlide = z.object({
  type: z.literal("telemetry"),
  tag: maxLen(30),
  footerLeft: z.string(),
  footerRight: z.string(),
  headline: maxLen(60),
  stats: z
    .array(
      z.object({
        value: maxLen(20),
        label: maxLen(40),
      })
    )
    .max(8),
});

const tableSlide = z.object({
  type: z.literal("table"),
  tag: maxLen(30),
  footerLeft: z.string(),
  footerRight: z.string(),
  headline: maxLen(60),
  headers: z.array(maxLen(30)).max(5),
  rows: z.array(z.array(maxLen(40))).max(8),
});

const imageSplitSlide = z.object({
  type: z.literal("image-split"),
  tag: maxLen(30),
  footerLeft: z.string(),
  footerRight: z.string(),
  headline: maxLen(60),
  bodyText: maxLen(200),
  imageUrl: z.string().optional(),
  imageKeywords: maxLen(50).optional(),
});

const imageCoverSlide = z.object({
  type: z.literal("image-cover"),
  tag: maxLen(30),
  footerLeft: z.string(),
  footerRight: z.string(),
  headline: maxLen(60),
  subtext: maxLen(200),
  imageUrl: z.string().optional(),
  imageKeywords: maxLen(50).optional(),
});

const ctaSlide = z.object({
  type: z.literal("cta"),
  tag: maxLen(30),
  footerLeft: z.string(),
  footerRight: z.string(),
  headline: maxLen(60),
  subtext: maxLen(150),
  actionLabel: maxLen(30),
  socialHandle: maxLen(40).optional(),
});

export const SlideSchema = z.discriminatedUnion("type", [
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

export const ArchivePaperMetaSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
});

export const ArchivePaperContractSchema = z.object({
  meta: ArchivePaperMetaSchema,
  slides: z.array(SlideSchema).min(4).max(10),
});

export type ArchivePaperContract = z.infer<typeof ArchivePaperContractSchema>;
export type ArchivePaperMeta = z.infer<typeof ArchivePaperMetaSchema>;

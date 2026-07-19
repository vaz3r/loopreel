import { z } from 'zod';

// ── Theme Schema ──
const themeSchema = z.enum(['void', 'bone', 'steel']);

// ── Slide Type Schemas ──

// 1. Cover
const coverSchema = z.object({
  type: z.literal('cover'),
  theme: themeSchema,
  titleTop: z.string().max(15),
  titleBottom: z.string().max(15),
  ticker: z.string().max(120),
  headerLeft: z.string().max(20),
  headerRight: z.string().max(20),
  footerLeft: z.string().max(20),
  footerRight: z.string().max(20),
});

// 2. Context
const contextSchema = z.object({
  type: z.literal('context'),
  theme: themeSchema,
  title: z.string().max(20),
  text: z.string().max(200),
  headerLeft: z.string().max(20),
  headerRight: z.string().max(20),
  footerLeft: z.string().max(20),
  footerRight: z.string().max(20),
});

// 3. List
const listItemSchema = z.object({
  num: z.string().max(4),
  label: z.string().max(30),
  desc: z.string().max(60),
});

const listSchema = z.object({
  type: z.literal('list'),
  theme: themeSchema,
  title: z.string().max(20),
  items: z.array(listItemSchema).min(3).max(4),
  headerLeft: z.string().max(20),
  headerRight: z.string().max(20),
  footerLeft: z.string().max(20),
  footerRight: z.string().max(20),
});

// 4. Matrix
const quadrantSchema = z.object({
  title: z.string().max(20),
  text: z.string().max(40),
});

const matrixSchema = z.object({
  type: z.literal('matrix'),
  theme: themeSchema,
  title: z.string().max(20),
  quadrants: z.array(quadrantSchema).min(4).max(4),
  headerLeft: z.string().max(20),
  headerRight: z.string().max(20),
  footerLeft: z.string().max(20),
  footerRight: z.string().max(20),
});

// 5. Insight
const insightSchema = z.object({
  type: z.literal('insight'),
  theme: themeSchema,
  title: z.string().max(20),
  text: z.string().max(200),
  headerLeft: z.string().max(20),
  headerRight: z.string().max(20),
  footerLeft: z.string().max(20),
  footerRight: z.string().max(20),
});

// 6. Quote
const quoteSchema = z.object({
  type: z.literal('quote'),
  theme: themeSchema,
  quote: z.string().max(200),
  author: z.string().max(40),
  headerLeft: z.string().max(20),
  headerRight: z.string().max(20),
  footerLeft: z.string().max(20),
  footerRight: z.string().max(20),
});

// 7. Evidence
const statSchema = z.object({
  value: z.string().max(10),
  label: z.string().max(60),
});

const evidenceSchema = z.object({
  type: z.literal('evidence'),
  theme: themeSchema,
  title: z.string().max(20),
  stats: z.array(statSchema).min(2).max(4),
  headerLeft: z.string().max(20),
  headerRight: z.string().max(20),
  footerLeft: z.string().max(20),
  footerRight: z.string().max(20),
});

// 8. CTA
const ctaSchema = z.object({
  type: z.literal('cta'),
  theme: themeSchema,
  title: z.string().max(30),
  buttonText: z.string().max(20),
  headerLeft: z.string().max(20),
  headerRight: z.string().max(20),
  footerLeft: z.string().max(20),
  footerRight: z.string().max(20),
});

// ── Union Schema ──
export const ArchiveSlideSchema = z.discriminatedUnion('type', [
  coverSchema,
  contextSchema,
  listSchema,
  matrixSchema,
  insightSchema,
  quoteSchema,
  evidenceSchema,
  ctaSchema,
]);

// ── Contract Schema ──
export const ArchiveContractSchema = z.object({
  templateId: z.literal('archive'),
  slides: z.array(ArchiveSlideSchema).min(1).max(12),
});

// ── Types ──
export type ArchiveSlide = z.infer<typeof ArchiveSlideSchema>;
export type ArchiveContract = z.infer<typeof ArchiveContractSchema>;
export type ArchiveMeta = typeof import('./index.ts').default.meta;

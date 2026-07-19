import { z } from 'zod';

const LayoutOptions = z.enum([
  'centered-display',
  'left-aligned-text',
  'split-screen',
  'stat-focus',
  'quote-card',
  'cta-display',
]);

const PaletteOptions = z.enum([
  'midnight',
  'sunset',
  'forest',
  'monochrome',
  'lavender',
  'ocean',
  'warmMinimal',
  'charcoal',
  'roseGold',
  'nordic',
  'terracotta',
  'ink-paper',
  'high-contrast',
  'accent-flood',
  'inverted',
]);

const BaseDesign = {
  layout: LayoutOptions,
  palette: PaletteOptions.default('midnight'),
};

export const EditorialSlideSchema = z.discriminatedUnion('type', [
  z.object({
    type: z.literal('hook'),
    heading: z.string().min(5, 'Hook heading required'),
    subtitle: z.string().default(''),
    ...BaseDesign,
  }).extend({ layout: LayoutOptions.default('centered-display') }),

  z.object({
    type: z.literal('content'),
    heading: z.string(),
    body: z.string(),
    ...BaseDesign,
  }).extend({ layout: LayoutOptions.default('left-aligned-text') }),

  z.object({
    type: z.literal('list'),
    heading: z.string().default(''),
    items: z.array(z.string().min(1)).min(2).max(6),
    body: z.string().default(''),
    ...BaseDesign,
  }).extend({ layout: LayoutOptions.default('split-screen') }),

  z.object({
    type: z.literal('quote'),
    quote: z.string().min(10),
    attribution: z.string().default(''),
    ...BaseDesign,
  }).extend({ layout: LayoutOptions.default('quote-card') }),

  z.object({
    type: z.literal('stat'),
    value: z.string().min(1, 'Stat value is required'),
    label: z.string().default(''),
    body: z.string().default(''),
    ...BaseDesign,
  }).extend({ layout: LayoutOptions.default('stat-focus') }),

  z.object({
    type: z.literal('cta'),
    heading: z.string().min(5),
    buttonLabel: z.string().default('Learn more'),
    ...BaseDesign,
  }).extend({ layout: LayoutOptions.default('cta-display') }),
]);

export type EditorialSlide = z.infer<typeof EditorialSlideSchema>;

export const EditorialMetaSchema = z.object({
  seriesName: z.string().default('Loopreel Series'),
  authorName: z.string().default('Anonymous'),
  handle: z.string().default('@unknown'),
  category: z.string().default('Editorial'),
  date: z.string().default(new Date().toISOString()),
});

export type EditorialMeta = z.infer<typeof EditorialMetaSchema>;

export const EditorialContractSchema = z.object({
  meta: EditorialMetaSchema,
  slides: z.array(EditorialSlideSchema)
    .min(4, 'Must have at least hook, 2 content slides, and CTA')
    .max(10, 'Cannot exceed 10 slides'),
});

export type EditorialContract = z.infer<typeof EditorialContractSchema>;

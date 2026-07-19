import { z } from 'zod';

const ThemeOptions = z.enum(['void', 'bone', 'steel']);

export const ProtocolSlideSchema = z.discriminatedUnion('type', [
  z.object({
    type: z.literal('cover'),
    heading: z.string().min(2, 'Cover heading required').max(15, 'Max 15 chars for 440px font'),
    ticker: z.string().max(80).default('THE ARCHITECTURE OF VALUE'),
    headerLeft: z.string().default('Sys. 01'),
    headerRight: z.string().default('Archive'),
    footerLeft: z.string().default('Vol. I'),
    footerRight: z.string().default('Social Export'),
    theme: ThemeOptions.default('void'),
  }),

  z.object({
    type: z.literal('data-list'),
    heading: z.string().min(3).max(20, 'Max 20 chars for 110px font'),
    items: z.array(z.object({
      title: z.string().min(2).max(25),
      description: z.string().min(5).max(40, 'Max 40 chars — keep descriptions very short'),
    })).min(2).max(3),
    headerLeft: z.string().default('Data Set'),
    headerRight: z.string().default(''),
    footerLeft: z.string().default(''),
    footerRight: z.string().default(''),
    theme: ThemeOptions.default('bone'),
  }),

  z.object({
    type: z.literal('quote'),
    quote: z.string().min(10).max(200),
    attribution: z.string().max(40).default(''),
    headerLeft: z.string().default('Thesis'),
    headerRight: z.string().default(''),
    footerLeft: z.string().default('Op. Cit.'),
    footerRight: z.string().default('2026'),
    theme: ThemeOptions.default('steel'),
  }),

  z.object({
    type: z.literal('cta'),
    heading: z.string().min(3, 'CTA heading required').max(20, 'Max 20 chars for 140px font — split into 2 lines'),
    buttonLabel: z.string().max(15).default('Initialize'),
    handle: z.string().max(40).default('@loopreel'),
    headerLeft: z.string().default('Terminal'),
    headerRight: z.string().default(''),
    footerLeft: z.string().default(''),
    footerRight: z.string().default('End Protocol'),
    theme: ThemeOptions.default('void'),
  }),
]);

export type ProtocolSlide = z.infer<typeof ProtocolSlideSchema>;

export const ProtocolMetaSchema = z.object({
  seriesName: z.string().default('Protocol Series'),
  authorName: z.string().default('Loopreel'),
  handle: z.string().default('@loopreel'),
  category: z.string().default('Editorial'),
});

export type ProtocolMeta = z.infer<typeof ProtocolMetaSchema>;

export const ProtocolContractSchema = z.object({
  meta: ProtocolMetaSchema,
  slides: z.array(ProtocolSlideSchema)
    .min(4, 'Must have exactly 4 slides: cover, data-list, quote, cta')
    .max(6, 'Cannot exceed 6 slides'),
});

export type ProtocolContract = z.infer<typeof ProtocolContractSchema>;

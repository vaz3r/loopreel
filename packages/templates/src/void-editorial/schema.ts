import { z } from 'zod';

const tagField = z.string().max(30);
const footerLeftField = z.string().min(1);
const footerRightField = z.string().min(1);

export const VoidSlideSchema = z.discriminatedUnion('type', [
  z.object({
    type: z.literal('cover'),
    tag: tagField,
    headline: z.string().min(1).max(60),
    subheadline: z.string().max(120).default(''),
    metadata: z.string().max(100).default(''),
    footerLeft: footerLeftField,
    footerRight: footerRightField,
  }),

  z.object({
    type: z.literal('definition'),
    tag: tagField,
    term: z.string().min(1).max(40),
    phonetic: z.string().max(30).default(''),
    definition: z.string().min(1).max(200),
    example: z.string().max(150).default(''),
    footerLeft: footerLeftField,
    footerRight: footerRightField,
  }),

  z.object({
    type: z.literal('dichotomy'),
    tag: tagField,
    headline: z.string().min(1).max(60),
    left: z.object({
      title: z.string().min(1).max(30),
      desc: z.string().min(1).max(120),
    }),
    right: z.object({
      title: z.string().min(1).max(30),
      desc: z.string().min(1).max(120),
    }),
    footerLeft: footerLeftField,
    footerRight: footerRightField,
  }),

  z.object({
    type: z.literal('timeline'),
    tag: tagField,
    headline: z.string().min(1).max(60),
    events: z.array(z.object({
      date: z.string().min(1).max(20),
      title: z.string().min(1).max(40),
      desc: z.string().min(1).max(120),
    })).min(1).max(8),
    footerLeft: footerLeftField,
    footerRight: footerRightField,
  }),

  z.object({
    type: z.literal('quote'),
    tag: tagField,
    quote: z.string().min(1).max(300),
    author: z.string().min(1).max(40),
    role: z.string().max(60).default(''),
    footerLeft: footerLeftField,
    footerRight: footerRightField,
  }),

  z.object({
    type: z.literal('sequence'),
    tag: tagField,
    headline: z.string().min(1).max(60),
    items: z.array(z.object({
      num: z.coerce.number().int().min(1),
      title: z.string().min(1).max(40),
      desc: z.string().min(1).max(120),
    })).min(1).max(8),
    footerLeft: footerLeftField,
    footerRight: footerRightField,
  }),

  z.object({
    type: z.literal('telemetry'),
    tag: tagField,
    headline: z.string().min(1).max(60),
    stats: z.array(z.object({
      value: z.string().min(1).max(20),
      label: z.string().min(1).max(40),
    })).min(1).max(8),
    footerLeft: footerLeftField,
    footerRight: footerRightField,
  }),

  z.object({
    type: z.literal('table'),
    tag: tagField,
    headline: z.string().min(1).max(60),
    headers: z.array(z.string().max(30)).min(1).max(5),
    rows: z.array(z.array(z.string().max(40))).min(1).max(8),
    footerLeft: footerLeftField,
    footerRight: footerRightField,
  }),

  z.object({
    type: z.literal('image-split'),
    tag: tagField,
    headline: z.string().min(1).max(60),
    bodyText: z.string().min(1).max(200),
    imageUrl: z.string().optional(),
    imageKeywords: z.string().max(50).optional(),
    footerLeft: footerLeftField,
    footerRight: footerRightField,
  }),

  z.object({
    type: z.literal('image-cover'),
    tag: tagField,
    headline: z.string().min(1).max(60),
    subtext: z.string().min(1).max(200),
    imageUrl: z.string().optional(),
    imageKeywords: z.string().max(50).optional(),
    footerLeft: footerLeftField,
    footerRight: footerRightField,
  }),

  z.object({
    type: z.literal('cta'),
    tag: tagField,
    headline: z.string().min(1).max(60),
    subtext: z.string().max(150).default(''),
    actionLabel: z.string().min(1).max(30),
    socialHandle: z.string().max(40).default(''),
    footerLeft: footerLeftField,
    footerRight: footerRightField,
  }),
]);

export type VoidSlide = z.infer<typeof VoidSlideSchema>;

export const VoidMetaSchema = z.object({
  seriesName: z.string().default('Void Editorial'),
  authorName: z.string().default('Void'),
  handle: z.string().default('@void'),
  category: z.string().default('Editorial'),
});

export type VoidMeta = z.infer<typeof VoidMetaSchema>;

export const VoidContractSchema = z.object({
  meta: VoidMetaSchema,
  slides: z.array(VoidSlideSchema)
    .min(2, 'Must have at least 2 slides')
    .max(15, 'Cannot exceed 15 slides'),
});

export type VoidContract = z.infer<typeof VoidContractSchema>;

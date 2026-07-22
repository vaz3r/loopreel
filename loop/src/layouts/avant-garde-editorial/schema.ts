import { z } from 'zod';

const FooterFields = {
  footerLeft: z.string().max(40).default(''),
  footerRight: z.string().max(40).default(''),
};

const CoverSlide = z.object({
  id: z.string(),
  type: z.literal('cover'),
  metaIndex: z.string().max(4).optional(),
  headlineMain: z.string().min(3).max(60),
  headlineHighlight: z.string().max(60).optional(),
  subheadline: z.string().max(60).optional(),
  bodyColumn: z.string().max(200).optional(),
  websiteUrl: z.string().max(100).optional(),
  badgeLabel: z.string().max(40).optional(),
  mockupImage: z.string().url().optional(),
  ...FooterFields,
});

const QuoteSlide = z.object({
  id: z.string(),
  type: z.literal('quote'),
  metaIndex: z.string().max(4).optional(),
  headlineMain: z.string().min(3).max(60).optional(),
  headlineHighlight: z.string().max(60).optional(),
  quote: z.string().min(10).max(400).optional(),
  author: z.string().max(40).optional(),
  role: z.string().max(40).optional(),
  subheadline: z.string().max(60).optional(),
  websiteUrl: z.string().max(100).optional(),
  badgeLabel: z.string().max(40).optional(),
  ...FooterFields,
});

const DefinitionSlide = z.object({
  id: z.string(),
  type: z.literal('definition'),
  tag: z.string().max(30).optional(),
  term: z.string().max(40),
  phonetic: z.string().max(40).optional(),
  definition: z.string().min(10).max(500),
  example: z.string().max(200).optional(),
  ...FooterFields,
});

const EditorialCatalogSlide = z.object({
  id: z.string(),
  type: z.literal('editorial-catalog'),
  mainHeadline: z.string().min(3).max(60),
  productMockupUrl: z.string().url(),
  badgeText: z.string().max(40).optional(),
  ...FooterFields,
});

const CtaSlide = z.object({
  id: z.string(),
  type: z.literal('cta'),
  metaIndex: z.string().max(4).optional(),
  mainHeadline: z.string().min(3).max(60).optional(),
  headline: z.string().min(3).max(60).optional(),
  bodyColumn: z.string().max(200).optional(),
  subtext: z.string().max(200).optional(),
  ctaButtonText: z.string().max(40).optional(),
  actionLabel: z.string().max(40).optional(),
  websiteUrl: z.string().max(100).optional(),
  ...FooterFields,
});

const ImageSplitSlide = z.object({
  id: z.string(),
  type: z.literal('image-split'),
  tag: z.string().max(30).optional(),
  headline: z.string().min(3).max(60),
  bodyText: z.string().max(200).optional(),
  imageUrl: z.string().url(),
  ...FooterFields,
});

const AvantGardeSlideSchema = z.discriminatedUnion('type', [
  CoverSlide, QuoteSlide, DefinitionSlide, EditorialCatalogSlide, CtaSlide, ImageSplitSlide,
]);

export const AvantGardeEditorialContract = z.object({
  slides: z.array(AvantGardeSlideSchema).min(1),
});

export type AvantGardeEditorialContract = z.infer<typeof AvantGardeEditorialContract>;

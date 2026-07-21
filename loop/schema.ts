import { z } from 'zod';
import { SLIDE_META, FOOTER_META, SLIDE_TYPES } from './src/slide-meta';

function fieldMeta(type: keyof typeof SLIDE_META, name: string) {
  const f = (SLIDE_META[type].fields as any)[name];
  return { min: f?.min ?? 0, max: f?.max ?? 9999 };
}

function fFooter(name: string) {
  return { max: (FOOTER_META as any)[name].max };
}

const FooterFields = {
  footerLeft: z.string().max(fFooter('footerLeft').max).default(''),
  footerRight: z.string().max(fFooter('footerRight').max).default(''),
};

const BaseFields = {
  id: z.string(),
};

export const CoverSlideSchema = z.object({
  ...BaseFields, type: z.literal('cover'),
  tag: z.string().max(fieldMeta('cover', 'tag').max).describe(SLIDE_META.cover.fields.tag.desc),
  headline: z.string().min(fieldMeta('cover', 'headline').min).max(fieldMeta('cover', 'headline').max).describe(SLIDE_META.cover.fields.headline.desc),
  subheadline: z.string().max(fieldMeta('cover', 'subheadline').max).describe(SLIDE_META.cover.fields.subheadline.desc),
  metadata: z.string().max(fieldMeta('cover', 'metadata').max).optional().describe(SLIDE_META.cover.fields.metadata.desc),
  ...FooterFields,
});

export const DefinitionSlideSchema = z.object({
  ...BaseFields, type: z.literal('definition'),
  tag: z.string().max(fieldMeta('definition', 'tag').max).describe(SLIDE_META.definition.fields.tag.desc),
  term: z.string().max(fieldMeta('definition', 'term').max).describe(SLIDE_META.definition.fields.term.desc),
  phonetic: z.string().max(fieldMeta('definition', 'phonetic').max).describe(SLIDE_META.definition.fields.phonetic.desc),
  definition: z.string().min(fieldMeta('definition', 'definition').min).max(fieldMeta('definition', 'definition').max).describe(SLIDE_META.definition.fields.definition.desc),
  example: z.string().max(fieldMeta('definition', 'example').max).optional().describe(SLIDE_META.definition.fields.example.desc),
  ...FooterFields,
});

const DichotomySide = z.object({
  title: z.string().min(fieldMeta('dichotomy', 'left').min).max(fieldMeta('dichotomy', 'left').max).describe('Title for one side of the comparison.'),
  desc: z.string().max(fieldMeta('dichotomy', 'left').max).describe('Description for one side of the comparison.'),
});

export const DichotomySlideSchema = z.object({
  ...BaseFields, type: z.literal('dichotomy'),
  tag: z.string().max(fieldMeta('dichotomy', 'tag').max).describe(SLIDE_META.dichotomy.fields.tag.desc),
  headline: z.string().min(fieldMeta('dichotomy', 'headline').min).max(fieldMeta('dichotomy', 'headline').max).describe(SLIDE_META.dichotomy.fields.headline.desc),
  left: DichotomySide.describe(SLIDE_META.dichotomy.fields.left.desc),
  right: DichotomySide.describe(SLIDE_META.dichotomy.fields.right.desc),
  ...FooterFields,
});

const TimelineEvent = z.object({
  date: z.string().max(fieldMeta('timeline', 'events').max).describe('Date label for this event.'),
  title: z.string().max(fieldMeta('timeline', 'events').max).describe('Event title.'),
  desc: z.string().max(fieldMeta('timeline', 'events').max).describe('One-sentence event description.'),
});

export const TimelineSlideSchema = z.object({
  ...BaseFields, type: z.literal('timeline'),
  tag: z.string().max(fieldMeta('timeline', 'tag').max).describe(SLIDE_META.timeline.fields.tag.desc),
  headline: z.string().min(fieldMeta('timeline', 'headline').min).max(fieldMeta('timeline', 'headline').max).describe(SLIDE_META.timeline.fields.headline.desc),
  events: z.array(TimelineEvent).min(1).max(12).describe(SLIDE_META.timeline.fields.events.desc),
  ...FooterFields,
});

export const QuoteSlideSchema = z.object({
  ...BaseFields, type: z.literal('quote'),
  tag: z.string().max(fieldMeta('quote', 'tag').max).describe(SLIDE_META.quote.fields.tag.desc),
  quote: z.string().min(fieldMeta('quote', 'quote').min).max(fieldMeta('quote', 'quote').max).describe(SLIDE_META.quote.fields.quote.desc),
  author: z.string().min(fieldMeta('quote', 'author').min).max(fieldMeta('quote', 'author').max).describe(SLIDE_META.quote.fields.author.desc),
  role: z.string().max(fieldMeta('quote', 'role').max).describe(SLIDE_META.quote.fields.role.desc),
  ...FooterFields,
});

const SequenceItem = z.object({
  num: z.string().min(1).max(4).describe('Step number.'),
  title: z.string().max(fieldMeta('sequence', 'items').max).describe('Step title.'),
  desc: z.string().max(fieldMeta('sequence', 'items').max).describe('Step description.'),
});

export const SequenceSlideSchema = z.object({
  ...BaseFields, type: z.literal('sequence'),
  tag: z.string().max(fieldMeta('sequence', 'tag').max).describe(SLIDE_META.sequence.fields.tag.desc),
  headline: z.string().min(fieldMeta('sequence', 'headline').min).max(fieldMeta('sequence', 'headline').max).describe(SLIDE_META.sequence.fields.headline.desc),
  items: z.array(SequenceItem).min(1).max(12).describe(SLIDE_META.sequence.fields.items.desc),
  ...FooterFields,
});

const Stat = z.object({
  value: z.string().min(1).max(20).describe('Statistic value (e.g. "87%", "3.2x").'),
  label: z.string().min(1).max(40).describe('Label for the statistic.'),
});

export const TelemetrySlideSchema = z.object({
  ...BaseFields, type: z.literal('telemetry'),
  tag: z.string().max(fieldMeta('telemetry', 'tag').max).describe(SLIDE_META.telemetry.fields.tag.desc),
  headline: z.string().min(fieldMeta('telemetry', 'headline').min).max(fieldMeta('telemetry', 'headline').max).describe(SLIDE_META.telemetry.fields.headline.desc),
  stats: z.array(Stat).min(1).max(12).describe(SLIDE_META.telemetry.fields.stats.desc),
  ...FooterFields,
});

export const TableSlideSchema = z.object({
  ...BaseFields, type: z.literal('table'),
  tag: z.string().max(fieldMeta('table', 'tag').max).describe(SLIDE_META.table.fields.tag.desc),
  headline: z.string().min(fieldMeta('table', 'headline').min).max(fieldMeta('table', 'headline').max).describe(SLIDE_META.table.fields.headline.desc),
  headers: z.array(z.string().min(1).max(30)).min(2).max(6).describe(SLIDE_META.table.fields.headers.desc),
  rows: z.array(z.array(z.string().min(1).max(50))).min(1).max(15).describe(SLIDE_META.table.fields.rows.desc),
  ...FooterFields,
});

export const ImageSplitSlideSchema = z.object({
  ...BaseFields, type: z.literal('image-split'),
  tag: z.string().max(fieldMeta('image-split', 'tag').max).describe(SLIDE_META['image-split'].fields.tag.desc),
  headline: z.string().min(fieldMeta('image-split', 'headline').min).max(fieldMeta('image-split', 'headline').max).describe(SLIDE_META['image-split'].fields.headline.desc),
  bodyText: z.string().max(fieldMeta('image-split', 'bodyText').max).describe(SLIDE_META['image-split'].fields.bodyText.desc),
  imageUrl: z.string().url().describe(SLIDE_META['image-split'].fields.imageUrl.desc),
  ...FooterFields,
});

export const ImageCoverSlideSchema = z.object({
  ...BaseFields, type: z.literal('image-cover'),
  tag: z.string().max(fieldMeta('image-cover', 'tag').max).describe(SLIDE_META['image-cover'].fields.tag.desc),
  headline: z.string().min(fieldMeta('image-cover', 'headline').min).max(fieldMeta('image-cover', 'headline').max).describe(SLIDE_META['image-cover'].fields.headline.desc),
  subtext: z.string().max(fieldMeta('image-cover', 'subtext').max).describe(SLIDE_META['image-cover'].fields.subtext.desc),
  imageUrl: z.string().url().describe(SLIDE_META['image-cover'].fields.imageUrl.desc),
  ...FooterFields,
});

export const CtaSlideSchema = z.object({
  ...BaseFields, type: z.literal('cta'),
  tag: z.string().max(fieldMeta('cta', 'tag').max).describe(SLIDE_META.cta.fields.tag.desc),
  headline: z.string().min(fieldMeta('cta', 'headline').min).max(fieldMeta('cta', 'headline').max).describe(SLIDE_META.cta.fields.headline.desc),
  subtext: z.string().max(fieldMeta('cta', 'subtext').max).describe(SLIDE_META.cta.fields.subtext.desc),
  actionLabel: z.string().min(1).max(fieldMeta('cta', 'actionLabel').max).describe(SLIDE_META.cta.fields.actionLabel.desc),
  socialHandle: z.string().max(fieldMeta('cta', 'socialHandle').max).describe(SLIDE_META.cta.fields.socialHandle.desc),
  ...FooterFields,
});

export const SlideSchema = z.discriminatedUnion('type', [
  CoverSlideSchema, DefinitionSlideSchema, DichotomySlideSchema,
  TimelineSlideSchema, QuoteSlideSchema, SequenceSlideSchema,
  TelemetrySlideSchema, TableSlideSchema, ImageSplitSlideSchema,
  ImageCoverSlideSchema, CtaSlideSchema,
]);

export const VoidContractSchema = z.object({
  slides: z.array(SlideSchema).min(1),
});

export type Slide = z.infer<typeof SlideSchema>;
export type VoidContract = z.infer<typeof VoidContractSchema>;
export type SlideType = Slide['type'];

export type CoverSlide = z.infer<typeof CoverSlideSchema>;
export type DefinitionSlide = z.infer<typeof DefinitionSlideSchema>;
export type DichotomySlide = z.infer<typeof DichotomySlideSchema>;
export type TimelineSlide = z.infer<typeof TimelineSlideSchema>;
export type QuoteSlide = z.infer<typeof QuoteSlideSchema>;
export type SequenceSlide = z.infer<typeof SequenceSlideSchema>;
export type TelemetrySlide = z.infer<typeof TelemetrySlideSchema>;
export type TableSlide = z.infer<typeof TableSlideSchema>;
export type ImageSplitSlide = z.infer<typeof ImageSplitSlideSchema>;
export type ImageCoverSlide = z.infer<typeof ImageCoverSlideSchema>;
export type CtaSlide = z.infer<typeof CtaSlideSchema>;

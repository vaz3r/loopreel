import StarterFrame from './frame';
import {
  Cover,
  Sequence,
  Telemetry,
  Quote,
  Cta,
  Timeline,
  ImageSplit,
  MythFact,
  Quadrant,
  CaseStudy,
  Interview,
  ResourceGrid,
  HeroMetric,
} from './slides';

export const templateMeta = {
  id: 'the-signal',
  name: 'The Signal',
  schemeId: 'custom_brand',
  visualDescription: 'Clean modern digital aesthetic with bold typography, dark surfaces, and cyan accents.',
};

export { default as frame } from './frame';

export const slides: Record<string, any> = {
  cover: Cover,
  sequence: Sequence,
  telemetry: Telemetry,
  quote: Quote,
  cta: Cta,
  timeline: Timeline,
  'image-split': ImageSplit,
  'myth-fact': MythFact,
  quadrant: Quadrant,
  'case-study': CaseStudy,
  interview: Interview,
  'resource-grid': ResourceGrid,
  'hero-metric': HeroMetric,
};

export function getLayout(type: string) {
  return slides[type] ?? slides.cover;
}

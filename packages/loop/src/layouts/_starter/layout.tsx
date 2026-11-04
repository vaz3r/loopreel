import StarterFrame from './frame';
import { Cover, Sequence, Telemetry, Quote, Cta } from './slides';

export const templateMeta = {
  id: 'starter',
  name: 'Starter Template',
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
  // Graceful aliases for other slide types
  'myth-fact': Sequence,
  timeline: Sequence,
  'case-study': Sequence,
  'image-split': Cover,
};

export function getLayout(type: string) {
  return slides[type] ?? slides.cover;
}

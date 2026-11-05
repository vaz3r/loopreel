import StarterFrame from './frame';
import { Cover, Sequence, Telemetry, Quote, Cta } from './slides';

export const templateMeta = {
  id: 'the-field-notes',
  name: 'The Field Notes',
  schemeId: 'custom_brand',
  visualDescription: 'Researcher pocket-notebook aesthetic on dot-grid kraft paper with ruled margins, spiral binding holes, serif headlines, and handwriting annotations.',
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

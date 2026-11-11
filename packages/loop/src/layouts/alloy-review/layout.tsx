import Frame from './frame';
import sampleSlides from './sample-slides';

export const templateMeta = {
  id: 'alloy-review',
  name: 'The Alloy Review',
  schemeId: 'custom_brand',
  visualDescription: 'Brushed-aluminum precision meets skeptical editorial restraint: oversized headlines, crisp spec labels, and orange brackets framing what is missing.',
};

export { default as frame } from './frame';

// Map archetype slide renderers
export const slides: Record<string, any> = {};

export function getLayout(type: string) {
  return slides[type] ?? slides.cover;
}

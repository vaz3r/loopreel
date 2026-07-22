import Frame from './frame';
import Cover from './cover';
import Definition from './definition';
import Dichotomy from './dichotomy';
import Timeline from './timeline';
import Quote from './quote';
import Sequence from './sequence';
import Telemetry from './telemetry';
import Table from './table';
import ImageSplit from './image-split';
import ImageCover from './image-cover';
import Cta from './cta';

export const templateMeta = {
  id: 'premium-social',
  name: 'Premium Social',
  schemeId: 'premium_social',
  visualDescription: 'Modern dark-mode Instagram carousel. Charcoal card on matte dark canvas, rounded corners (24px), persistent footer with green profile badge and white CTA pill. Green/purple/amber accents on dark. Clean Inter sans-serif, bold headlines, muted grey body text. Card-within-card aesthetic for definitions and stats.',
};

export { default as frame } from './frame';

export const slides: Record<string, any> = {
  cover: Cover,
  definition: Definition,
  dichotomy: Dichotomy,
  timeline: Timeline,
  quote: Quote,
  sequence: Sequence,
  telemetry: Telemetry,
  table: Table,
  'image-split': ImageSplit,
  'image-cover': ImageCover,
  cta: Cta,
};

export function getLayout(type: string) {
  return slides[type] ?? slides.cover;
}

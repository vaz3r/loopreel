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
  visualDescription: 'Dark, bold, high-impact social media aesthetic. Gold accent, heavy sans-serif uppercase headlines. Best for viral-style content, opinion pieces, and high-engagement carousels.',
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

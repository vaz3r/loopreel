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
  id: 'void-editorial',
  name: 'Void Editorial',
  schemeId: 'void_editorial',
  visualDescription: 'Dark, dramatic, editorial aesthetic. Serif-dominant main headlines. Elegant grid patterns and accent-colored rules. Best for premium/luxury topics, thought leadership, and deep-dive content.',
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

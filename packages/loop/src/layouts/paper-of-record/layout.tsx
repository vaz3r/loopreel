import Frame from './frame';
import Cover from './cover';
import Quote from './quote';
import Definition from './definition';
import Sequence from './sequence';
import Dichotomy from './dichotomy';
import Telemetry from './telemetry';
import Timeline from './timeline';
import ImageSplit from './image-split';
import Table from './table';
import Analysis from './analysis';
import Profile from './profile';
import Cta from './cta';

export const templateMeta = {
  id: 'paper-of-record',
  name: 'The Paper of Record',
  schemeId: 'archive_paper',
  visualDescription: 'Classic newspaper editorial design. Off-white newsprint background with deep ink black. Playfair Display serif headlines, Source Serif 4 body, Inter UI. Thick 4px black section dividers, 1px steel hairlines. Masthead header with category tag and publication name, pagination footer with dot indicators. Crimson red accents for labels and highlights.',
};

export { default as frame } from './frame';

export const slides: Record<string, any> = {
  cover: Cover,
  quote: Quote,
  definition: Definition,
  sequence: Sequence,
  dichotomy: Dichotomy,
  telemetry: Telemetry,
  timeline: Timeline,
  'image-split': ImageSplit,
  table: Table,
  analysis: Analysis,
  profile: Profile,
  cta: Cta,
};

export function getLayout(type: string) {
  return slides[type] ?? slides.cover;
}

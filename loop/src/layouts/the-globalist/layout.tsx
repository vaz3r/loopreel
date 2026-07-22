import Cover from './cover';
import Sequence from './sequence';
import ImageSplit from './image-split';
import Telemetry from './telemetry';
import Interview from './interview';
import Quadrant from './quadrant';
import CaseStudy from './case-study';
import MythFact from './myth-fact';
import ResourceGrid from './resource-grid';
import Timeline from './timeline';
import Quote from './quote';
import Cta from './cta';

export const templateMeta = {
  id: 'the-globalist',
  name: 'The Globalist',
  schemeId: 'globalist_editorial',
  visualDescription: 'Newsprint editorial magazine. Off-white paper, true black ink, slate secondary. Crimson red accent. Crimson Pro serif, Oswald condensed, Inter UI. 8px red top rule, 4px black section dividers, 1px hairlines. Masthead header with volume/tag, footer with @handle and page number.',
};

export { default as frame } from './frame';

export const slides: Record<string, any> = {
  cover: Cover,
  sequence: Sequence,
  'image-split': ImageSplit,
  telemetry: Telemetry,
  interview: Interview,
  quadrant: Quadrant,
  'case-study': CaseStudy,
  'myth-fact': MythFact,
  'resource-grid': ResourceGrid,
  timeline: Timeline,
  quote: Quote,
  cta: Cta,
};

export function getLayout(type: string) {
  return slides[type] ?? slides.cover;
}

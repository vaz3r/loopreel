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
  id: 'the-terminal',
  name: 'The Terminal',
  schemeId: 'terminal_dark',
  visualDescription: 'Dark terminal aesthetic. Pitch black background with subtle grid pattern. JetBrains Mono for headers/data, Inter for body. Neon accents: amber (#FFB000), green (#00FF41), red (#FF003C), blue (#00E5FF). SYS.OP header, ticker footer, bordered panels.',
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

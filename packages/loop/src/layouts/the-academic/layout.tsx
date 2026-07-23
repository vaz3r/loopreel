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
import HeroMetric from './hero-metric';
import Methodology from './methodology';
import Juxtaposition from './juxtaposition';
import Checklist from './checklist';
import Breakdown from './breakdown';

export const templateMeta = {
  id: 'the-academic',
  name: 'The Academic',
  schemeId: 'academic_research',
  visualDescription: 'Research & whitepapers. Graph paper background, crimson accents, Merriweather serif headers, Source Sans 3 body, IBM Plex Mono data. Academic border, strict typographic hierarchy, peer-reviewed aesthetic.',
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
  'hero-metric': HeroMetric,
  methodology: Methodology,
  juxtaposition: Juxtaposition,
  checklist: Checklist,
  breakdown: Breakdown,
};

export function getLayout(type: string) {
  return slides[type] ?? slides.cover;
}

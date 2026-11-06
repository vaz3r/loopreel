import Frame from './frame';
import Cover from './cover';
import Quote from './quote';
import Definition from './definition';
import Sequence from './sequence';
import Dichotomy from './dichotomy';
import MythFact from './myth-fact';
import Telemetry from './telemetry';
import Timeline from './timeline';
import ImageSplit from './image-split';
import Table from './table';
import Analysis from './analysis';
import Profile from './profile';
import Cta from './cta';
import Quadrant from './quadrant';
import CaseStudy from './case-study';
import Interview from './interview';
import ResourceGrid from './resource-grid';
import HeroMetric from './hero-metric';
import Checklist from './checklist';
import Breakdown from './breakdown';
import Methodology from './methodology';

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
  'myth-fact': MythFact,
  telemetry: Telemetry,
  timeline: Timeline,
  'image-split': ImageSplit,
  table: Table,
  analysis: Analysis,
  profile: Profile,
  cta: Cta,
  quadrant: Quadrant,
  'case-study': CaseStudy,
  interview: Interview,
  'resource-grid': ResourceGrid,
  'hero-metric': HeroMetric,
  checklist: Checklist,
  breakdown: Breakdown,
  methodology: Methodology,
};

export function getLayout(type: string) {
  return slides[type] ?? slides.cover;
}

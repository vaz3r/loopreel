import Frame from './frame.js';
import Cover from './cover/index.js';
import Statement from './statement/index.js';
import List, { Sequence } from './list/index.js';
import Specimen from './specimen/index.js';
import Measure from './measure/index.js';
import Tally, { Telemetry } from './tally/index.js';
import Route from './route/index.js';
import Log from './log/index.js';
import Compare from './compare/index.js';
import Table from './table/index.js';
import Chart from './chart/index.js';
import MapSlide from './map/index.js';
import Quote from './quote/index.js';
import Entry from './entry/index.js';
import Qa from './qa/index.js';
import Kit from './kit/index.js';
import Cta from './cta/index.js';

export const templateMeta = {
  id: 'the-field-notes',
  name: 'The Field Notes',
  schemeId: 'custom_brand',
  visualDescription: 'Researcher pocket-notebook aesthetic on dot-grid kraft paper with ruled margins, spiral binding holes, serif headlines, and handwriting annotations.',
};

export { default as frame } from './frame.js';

export const slides: Record<string, any> = {
  cover: Cover,
  statement: Statement,
  list: List,
  specimen: Specimen,
  measure: Measure,
  tally: Tally,
  route: Route,
  log: Log,
  compare: Compare,
  table: Table,
  chart: Chart,
  map: MapSlide,
  quote: Quote,
  entry: Entry,
  qa: Qa,
  kit: Kit,
  cta: Cta,

  // Graceful aliases for standard pipeline contracts
  sequence: Sequence,
  telemetry: Telemetry,
  'myth-fact': Compare,
  timeline: Log,
  'case-study': Specimen,
  'image-split': Cover,
};

export function getLayout(type: string) {
  return slides[type] ?? slides.cover;
}

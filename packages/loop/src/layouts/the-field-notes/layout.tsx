import Frame from './frame.js';
import {
  Cover,
  Statement,
  List,
  Specimen,
  Measure,
  Tally,
  Route,
  Log,
  Compare,
  Table,
  Chart,
  MapSlide,
  Quote,
  Entry,
  Qa,
  Kit,
  Cta,
  Sequence,
  Telemetry,
} from './slides.js';

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

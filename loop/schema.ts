export {
  SlideSchema,
  CoverSlideSchema,
  DefinitionSlideSchema,
  DichotomySlideSchema,
  TimelineSlideSchema,
  QuoteSlideSchema,
  SequenceSlideSchema,
  TelemetrySlideSchema,
  TableSlideSchema,
  ImageSplitSlideSchema,
  ImageCoverSlideSchema,
  CtaSlideSchema,
  type Slide,
  type SlideType,
  type CoverSlide,
  type DefinitionSlide,
  type DichotomySlide,
  type TimelineSlide,
  type QuoteSlide,
  type SequenceSlide,
  type TelemetrySlide,
  type TableSlide,
  type ImageSplitSlide,
  type ImageCoverSlide,
  type CtaSlide,
} from './src/schemas/base';

export { PaperOfRecordContract, type PaperOfRecordContract as PaperOfRecordContractType } from './src/layouts/paper-of-record/schema';

export { TheTerminalContract, type TheTerminalContract as TheTerminalContractType } from './src/layouts/the-terminal/schema';

export { TheCuratorContract, type TheCuratorContract as TheCuratorContractType } from './src/layouts/the-curator/schema';

export { TheAcademicContract, type TheAcademicContract as TheAcademicContractType } from './src/layouts/the-academic/schema';

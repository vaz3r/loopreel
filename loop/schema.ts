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

import { z } from 'zod';
import { SlideSchema } from './src/schemas/base';

export const VoidContractSchema = z.object({
  slides: z.array(SlideSchema).min(1),
});

export type VoidContract = z.infer<typeof VoidContractSchema>;

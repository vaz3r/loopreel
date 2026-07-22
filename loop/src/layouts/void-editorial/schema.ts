import { z } from 'zod';
import { SlideSchema } from '../../schemas/base';

export const VoidEditorialContract = z.object({
  slides: z.array(SlideSchema).min(1),
});

export type VoidEditorialContract = z.infer<typeof VoidEditorialContract>;

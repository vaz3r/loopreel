import { z } from 'zod';
import { SlideSchema } from '../../schemas/base';

export const IndustrialBrutalContract = z.object({
  slides: z.array(SlideSchema).min(1),
});

export type IndustrialBrutalContract = z.infer<typeof IndustrialBrutalContract>;

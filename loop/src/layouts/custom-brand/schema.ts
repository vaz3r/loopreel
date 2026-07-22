import { z } from 'zod';
import { SlideSchema } from '../../schemas/base';

export const CustomBrandContract = z.object({
  slides: z.array(SlideSchema).min(1),
});

export type CustomBrandContract = z.infer<typeof CustomBrandContract>;

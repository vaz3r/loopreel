import { z } from 'zod';
import { SlideSchema } from '../../schemas/base';

export const ModernCleanContract = z.object({
  slides: z.array(SlideSchema).min(1),
});

export type ModernCleanContract = z.infer<typeof ModernCleanContract>;

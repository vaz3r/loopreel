import { z } from 'zod';
import { SlideSchema } from '../../schemas/base';

export const PremiumSocialContract = z.object({
  slides: z.array(SlideSchema).min(1),
});

export type PremiumSocialContract = z.infer<typeof PremiumSocialContract>;

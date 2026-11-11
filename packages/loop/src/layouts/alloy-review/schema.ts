import { z } from 'zod';

export const AlloyReviewSlideSchema = z.object({
  id: z.string(),
  type: z.string(),
  headline: z.string().optional(),
  title: z.string().optional(),
  subheadline: z.string().optional(),
  tag: z.string().optional(),
  metrics: z.array(z.any()).optional(),
  steps: z.array(z.any()).optional(),
  quote: z.string().optional(),
  attribution: z.string().optional(),
});

export const AlloyReviewContract = z.object({
  slides: z.array(AlloyReviewSlideSchema),
});

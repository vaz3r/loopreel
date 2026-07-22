import { z } from 'zod';
import { SlideSchema } from '../../schemas/base';

export const ArchivePaperContract = z.object({
  slides: z.array(SlideSchema).min(1),
});

export type ArchivePaperContract = z.infer<typeof ArchivePaperContract>;

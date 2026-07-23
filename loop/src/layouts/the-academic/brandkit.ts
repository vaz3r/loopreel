import { z } from 'zod';

export const TheAcademicBrandKit = z.object({
  bg: z.string().optional().describe('Paper background (e.g. #FFFFFF for clean white, #FEFCF3 for warm ivory)'),
  text: z.string().optional().describe('Primary text color (e.g. #0F172A for dark slate, #1E293B for medium slate)'),
});

export type TheAcademicBrandKit = z.infer<typeof TheAcademicBrandKit>;

export const THE_ACADEMIC_BRANDKIT_DESCRIPTION = {
  bg: 'Paper background. Clean white (#FFFFFF) is the default for academic papers. Warm ivory (#FEFCF3) for a more traditional feel. Light gray (#F8FAFC) for modern journals.',
  text: 'Primary text color for body, headings, and borders. Dark slate (#0F172A) is the default. Medium slate (#1E293B) is softer. The Academic uses crimson (#A31F34) as a hardcoded accent — it cannot be customized via brand kit.',
} as const;

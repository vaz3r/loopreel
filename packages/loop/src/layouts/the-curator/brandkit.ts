import { z } from 'zod';

export const TheCuratorBrandKit = z.object({
  bg: z.string().optional().describe('Gallery wall background (e.g. #FFFFFF for pure white, #FAFAFA for soft white)'),
  text: z.string().optional().describe('Ink color for all text and lines (e.g. #000000 for pure black, #1A1A1A for soft black)'),
});

export type TheCuratorBrandKit = z.infer<typeof TheCuratorBrandKit>;

export const THE_CURATOR_BRANDKIT_DESCRIPTION = {
  bg: 'Gallery wall background. Pure white (#FFFFFF) is the default for maximum contrast. Soft white (#FAFAFA) reduces glare. Light gray (#F0F0F0) for museum feel.',
  text: 'Ink color for all text and minimalist line elements. Pure black (#000000) is the signature. Dark gray (#1A1A1A) is softer. The Curator does not use accent colors — it relies on negative space and typography alone.',
} as const;

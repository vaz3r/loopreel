import { z } from 'zod';

export const TheGlobalistBrandKit = z.object({
  bg: z.string().optional().describe('Paper background color (e.g. #F5F5F1 for warm off-white)'),
  text: z.string().optional().describe('Primary ink color for headlines and body (e.g. #111111)'),
  accent: z.string().optional().describe('Red accent for top rule, tags, and highlights (e.g. #E3120B)'),
  fontSerif: z.string().optional().describe('Body serif font (e.g. "Crimson Pro")'),
  fontSans: z.string().optional().describe('Condensed sans-serif for headers and labels (e.g. "Oswald")'),
});

export type TheGlobalistBrandKit = z.infer<typeof TheGlobalistBrandKit>;

export const THE_GLOBALIST_BRANDKIT_DESCRIPTION = {
  bg: 'Paper background color. Warm off-white (#F5F5F1) is the Economist/Monocle style. Pure white (#FFFFFF) for cleaner look.',
  text: 'Primary ink for headlines and body text. Deep black (#111111) is traditional. Dark slate (#1A1A2E) for modern feel.',
  accent: 'Red accent color used for the top rule line, category tags, and highlights. Classic red (#E3120B) or burnt orange (#D4622B).',
  fontSerif: 'Body serif font used throughout content. "Crimson Pro" is the signature Globalist font. "Libre Baskerville" is an alternative.',
  fontSans: 'Condensed sans-serif for the masthead title, footer, and labels. "Oswald" is the classic choice. "Barlow Condensed" is an alternative.',
} as const;

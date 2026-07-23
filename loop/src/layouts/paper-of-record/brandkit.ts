import { z } from 'zod';

export const PaperOfRecordBrandKit = z.object({
  bg: z.string().optional().describe('Paper background color (e.g. #EBEAE5 for off-white newsprint, #F7F7F5 for bright white)'),
  text: z.string().optional().describe('Primary ink color for headlines, body text, and borders (e.g. #111111 for deep black, #333333 for charcoal)'),
  accent: z.string().optional().describe('Crimson section dividers, category labels, and highlights (e.g. #cc0000, #003049)'),
  fontSerif: z.string().optional().describe('Headline serif font name (e.g. "Playfair Display", "Cormorant Garamond")'),
  fontSans: z.string().optional().describe('Body and UI sans-serif font name (e.g. "Inter", "Manrope")'),
  logoUrl: z.string().optional().describe('Optional logo image URL displayed in the masthead'),
});

export type PaperOfRecordBrandKit = z.infer<typeof PaperOfRecordBrandKit>;

export const PAPER_OF_RECORD_BRANDKIT_DESCRIPTION = {
  bg: 'Paper background color. Classic newsprint is off-white (#EBEAE5). Bright modern is #F7F7F5.',
  text: 'Primary ink for headlines, body text, and all borders. Deep black (#111111) is traditional. Charcoal (#333333) is softer.',
  accent: 'Crimson color used for section dividers, category labels, and highlight accents. Classic red (#cc0000) or navy (#003049).',
  fontSerif: 'Headline serif font. "Playfair Display" is the classic newspaper choice. "Cormorant Garamond" is more elegant.',
  fontSans: 'Body and UI sans-serif font. "Inter" is clean and modern. "Manrope" is geometric.',
  logoUrl: 'Optional logo image URL. If provided, displayed in the masthead area.',
} as const;

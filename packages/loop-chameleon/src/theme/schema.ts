import { z } from 'zod';

export const PaletteSchema = z.object({
  bg: z.string().describe('Slide background color e.g. #0D1117 or #FAF8F5'),
  surface: z.string().describe('Card / container surface background e.g. #161B22 or #FFFFFF'),
  surfaceAlt: z.string().optional().describe('Alternate secondary surface color'),
  text: z.string().describe('Primary body and headline text color e.g. #F0F6FC or #111111'),
  muted: z.string().describe('Muted / secondary text color e.g. #8B949E or #666666'),
  accent: z.string().describe('Primary brand accent color e.g. #58A6FF or #E3120B'),
  highlight: z.string().optional().describe('Secondary accent or attention tag color'),
  border: z.string().describe('Card and divider border color e.g. rgba(255,255,255,0.12)'),
  tagBg: z.string().optional().describe('Badge / tag background color'),
  tagText: z.string().optional().describe('Badge / tag text color'),
});
export type Palette = z.infer<typeof PaletteSchema>;

export const TypographySchema = z.object({
  headlineFont: z.string().describe('Google Font name for headlines e.g. Newsreader, Syne, Space Grotesk, Cinzel, Inter, Playfair Display'),
  bodyFont: z.string().describe('Google Font name for body text e.g. Inter, Source Sans 3, Geist, Plus Jakarta Sans'),
  monoFont: z.string().default('JetBrains Mono').describe('Google Font for telemetry & code tags'),
  headlineWeight: z.union([z.number(), z.string()]).default(600),
  headlineStyle: z.enum(['normal', 'italic']).default('normal'),
  headlineTransform: z.enum(['none', 'uppercase', 'capitalize']).default('none'),
  letterSpacing: z.string().default('normal'),
});
export type Typography = z.infer<typeof TypographySchema>;

export const DecorationsSchema = z.object({
  cardStyle: z.enum(['flat', 'bordered', 'elevated', 'glass', 'minimal', 'brutalist']).default('bordered'),
  borderRadius: z.enum(['none', 'sm', 'md', 'lg', 'full']).default('md'),
  borderWidth: z.string().default('1px'),
  texture: z.enum(['clean', 'dotgrid', 'graph', 'ruled']).default('clean'),
  badgeStyle: z.enum(['pill', 'square', 'outline', 'solid', 'minimal']).default('pill'),
  dividerStyle: z.enum(['solid', 'dashed', 'dotted', 'accent-bar', 'none']).default('solid'),
});
export type Decorations = z.infer<typeof DecorationsSchema>;

export const ThemeSpecSchema = z.object({
  name: z.string().describe('Creative name for this synthesized theme'),
  rationale: z.string().optional().describe('Brief explanation of why this aesthetic fits the article'),
  palette: PaletteSchema,
  typography: TypographySchema,
  decorations: DecorationsSchema,
});
export type ThemeSpec = z.infer<typeof ThemeSpecSchema>;

export const DEFAULT_CHAMELEON_THEME: ThemeSpec = {
  name: 'Modern Obsidian',
  rationale: 'High-contrast modern editorial aesthetic with electric blue accents',
  palette: {
    bg: '#0A0D14',
    surface: '#121722',
    surfaceAlt: '#1A2130',
    text: '#F1F5F9',
    muted: '#94A3B8',
    accent: '#38BDF8',
    highlight: '#F43F5E',
    border: 'rgba(255, 255, 255, 0.12)',
    tagBg: 'rgba(56, 189, 248, 0.15)',
    tagText: '#38BDF8',
  },
  typography: {
    headlineFont: 'Space Grotesk',
    bodyFont: 'Inter',
    monoFont: 'JetBrains Mono',
    headlineWeight: 600,
    headlineStyle: 'normal',
    headlineTransform: 'none',
    letterSpacing: '-0.02em',
  },
  decorations: {
    cardStyle: 'bordered',
    borderRadius: 'md',
    borderWidth: '1px',
    texture: 'dotgrid',
    badgeStyle: 'pill',
    dividerStyle: 'solid',
  },
};

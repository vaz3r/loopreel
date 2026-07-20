import {
  getHeadlineFontSize as _getHeadlineFontSize,
  getBodyFontSize as _getBodyFontSize,
  getHeadlineLineHeight,
  getOverflowStyles,
  getImageFilter,
  getImageCoverStyles,
  getImageSplitStyles,
  CANVAS,
  getContentArea,
} from '../engine/index.js';

interface HeadlineStyle {
  fontSize: number;
  fontWeight: number;
  fontStyle: string;
  textTransform: string;
  lineHeight: number;
}

interface BodyStyle {
  fontSize: number;
  fontWeight: number;
  lineHeight?: number;
}

interface ThemeColors {
  bg: string;
  text: string;
  accent: string;
  border: string;
  gridBorder: string;
  fontSerif: string;
  fontSans: string;
  fontMono: string;
}

export interface BrandKit {
  bg?: string;
  text?: string;
  accent?: string;
  fontSerif?: string;
  fontSans?: string;
  logoUrl?: string;
}

export function getHeadlineStyle(text: string): HeadlineStyle {
  const fontSize = _getHeadlineFontSize(text, {
    fontWeight: 300,
    fontStyle: 'italic',
  });
  return {
    fontSize,
    fontWeight: 300,
    fontStyle: 'italic',
    textTransform: 'none',
    lineHeight: getHeadlineLineHeight(fontSize),
  };
}

export function getBodyStyle(text: string): BodyStyle {
  const { fontSize, lineHeight } = _getBodyFontSize(text);
  return { fontSize, fontWeight: 300, lineHeight };
}

export function getThemeColors(brandKit?: BrandKit): ThemeColors {
  const defaults: ThemeColors = {
    bg: '#FFFFFF',
    text: '#1A1A1A',
    accent: '#2563EB',
    border: 'rgba(26,26,26,0.20)',
    gridBorder: 'rgba(26,26,26,0.10)',
    fontSerif: '"Playfair Display", serif',
    fontSans: '"Manrope", sans-serif',
    fontMono: '"Space Mono", monospace',
  };

  if (!brandKit) return defaults;

  const bg = brandKit.bg ?? defaults.bg;
  const text = brandKit.text ?? defaults.text;

  const textRgba = hexToRgba(text, 0.20);
  const gridRgba = hexToRgba(text, 0.10);

  return {
    bg,
    text,
    accent: brandKit.accent ?? defaults.accent,
    border: textRgba,
    gridBorder: gridRgba,
    fontSerif: brandKit.fontSerif ?? defaults.fontSerif,
    fontSans: brandKit.fontSans ?? defaults.fontSans,
    fontMono: defaults.fontMono,
  };
}

function hexToRgba(hex: string, alpha: number): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}

export { CANVAS, getContentArea, getHeadlineLineHeight, getOverflowStyles, getImageFilter, getImageCoverStyles, getImageSplitStyles };

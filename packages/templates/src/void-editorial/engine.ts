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

export interface HeadlineStyle {
  fontSize: number;
  fontWeight: number;
  fontStyle: string;
  textTransform: string;
  lineHeight: number;
}

export interface BodyStyle {
  fontSize: number;
  fontWeight: number;
  lineHeight?: number;
}

export interface ThemeColors {
  bg: string;
  text: string;
  accent: string;
  border: string;
  gridBorder: string;
  fontSerif: string;
  fontSans: string;
  fontMono: string;
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

export function getThemeColors(): ThemeColors {
  return {
    bg: '#050505',
    text: '#F4F4F0',
    accent: '#E63946',
    border: 'rgba(244,244,240,0.15)',
    gridBorder: 'rgba(244,244,240,0.08)',
    fontSerif: "'Cormorant Garamond', serif",
    fontSans: "'Manrope', sans-serif",
    fontMono: "'Space Mono', monospace",
  };
}

export const REG_MARK_OPACITY = 0.15;
export const GRID_BORDER_OPACITY = 0.08;
export { CANVAS, getContentArea, getHeadlineLineHeight, getOverflowStyles, getImageFilter, getImageCoverStyles, getImageSplitStyles };

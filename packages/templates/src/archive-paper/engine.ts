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
    bg: '#EBEAE5',
    text: '#111111',
    accent: '#003049',
    border: 'rgba(17,17,17,0.20)',
    gridBorder: 'rgba(17,17,17,0.12)',
    fontSerif: '"Playfair Display", serif',
    fontSans: '"Manrope", sans-serif',
    fontMono: '"Space Mono", monospace',
  };
}

export { CANVAS, getContentArea, getHeadlineLineHeight, getOverflowStyles, getImageFilter, getImageCoverStyles, getImageSplitStyles };

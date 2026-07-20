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

const THEME = {
  bg: '#1A1A1A',
  text: '#E0E0E0',
  accent: '#F77F00',
  border: 'rgba(224,224,224,0.25)',
  gridBorder: 'rgba(224,224,224,0.15)',
  fontSans: '"Manrope", sans-serif',
  fontMono: '"Space Mono", monospace',
} as const;

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

export function getHeadlineStyle(text: string): HeadlineStyle {
  const fontSize = _getHeadlineFontSize(text, {
    fontWeight: 900,
    textTransform: 'uppercase',
  });
  return {
    fontSize,
    fontWeight: 900,
    fontStyle: 'normal',
    textTransform: 'uppercase',
    lineHeight: getHeadlineLineHeight(fontSize),
  };
}

export function getBodyStyle(
  text: string,
  isHighlight?: boolean,
): BodyStyle {
  const { fontSize, lineHeight } = _getBodyFontSize(text);
  return {
    fontSize,
    fontWeight: isHighlight ? 300 : 300,
    lineHeight,
  };
}

export function getThemeColors() {
  return { ...THEME };
}

export { CANVAS, getContentArea, getHeadlineLineHeight, getOverflowStyles, getImageFilter, getImageCoverStyles, getImageSplitStyles };

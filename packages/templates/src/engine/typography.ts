import type React from 'react';

const CONTENT_WIDTH = 920;
const MIN_HEADLINE_SIZE = 48;
const MAX_HEADLINE_SIZE = 130;

interface HeadlineOpts {
  maxWidth?: number;
  minSize?: number;
  maxSize?: number;
  textTransform?: string;
  fontWeight?: number;
  fontStyle?: string;
}

interface BodyResult {
  fontSize: number;
  lineHeight: number;
}

export function getHeadlineFontSize(text: string, opts?: HeadlineOpts): number {
  const maxWidth = opts?.maxWidth ?? CONTENT_WIDTH;
  const minSize = opts?.minSize ?? MIN_HEADLINE_SIZE;
  const maxSize = opts?.maxSize ?? MAX_HEADLINE_SIZE;

  if (!text || text.length === 0) return maxSize;

  const isUppercase = opts?.textTransform === 'uppercase';
  const isBold = (opts?.fontWeight ?? 400) >= 700;

  let charMultiplier = 1.0;
  if (isUppercase) charMultiplier *= 1.2;
  if (isBold) charMultiplier *= 1.1;

  const avgCharWidthAtMax = 75 * charMultiplier;
  const estimatedWidth = text.length * avgCharWidthAtMax;

  if (estimatedWidth <= maxWidth) return maxSize;

  const scale = maxWidth / estimatedWidth;
  return Math.max(minSize, Math.round(maxSize * scale));
}

export function getBodyFontSize(text: string): BodyResult {
  const len = text.length;
  if (len < 80) return { fontSize: 32, lineHeight: 1.5 };
  if (len < 150) return { fontSize: 28, lineHeight: 1.5 };
  if (len < 300) return { fontSize: 24, lineHeight: 1.5 };
  return { fontSize: 20, lineHeight: 1.6 };
}

export function getOverflowStyles(opts?: {
  maxLines?: number;
}): React.CSSProperties {
  const styles: React.CSSProperties = {
    wordBreak: 'break-word',
    overflowWrap: 'break-word',
    hyphens: 'auto',
  };

  if (opts?.maxLines && opts.maxLines > 0) {
    styles.display = '-webkit-box';
    styles.WebkitLineClamp = opts.maxLines;
    styles.WebkitBoxOrient = 'vertical';
    styles.overflow = 'hidden';
  }

  return styles;
}

export function getHeadlineLineHeight(fontSize: number): number {
  if (fontSize >= 100) return 0.95;
  if (fontSize >= 70) return 1.0;
  return 1.1;
}

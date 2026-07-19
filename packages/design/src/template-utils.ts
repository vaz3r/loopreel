/** Convert hex color to rgba string */
export function hexToRgba(hex: string, alpha: number): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}

/** Spacing tokens for consistent rhythm */
export const spacing = {
  xs: 8,
  sm: 16,
  md: 24,
  lg: 40,
  xl: 60,
  xxl: 80,
} as const;

/** Clamp font size based on content length — short text gets bigger, long text gets smaller */
export function clampFontSize(
  contentLength: number,
  { min, max, pivot = 40 }: { min: number; max: number; pivot?: number },
): number {
  if (contentLength <= pivot * 0.5) return max;
  if (contentLength >= pivot * 2) return min;
  const ratio = (contentLength - pivot * 0.5) / (pivot * 1.5);
  return Math.round(max - ratio * (max - min));
}

/** Compute inner padding that maximizes content area */
export function getCanvasPadding(slideType: 'hook' | 'value' | 'cta'): { padding: string; contentWidth: string } {
  switch (slideType) {
    case 'hook':
      return { padding: '48px 56px', contentWidth: '90%' };
    case 'value':
      return { padding: '44px 56px', contentWidth: '92%' };
    case 'cta':
      return { padding: '48px 56px', contentWidth: '88%' };
  }
}

/** Generate a mesh gradient CSS string from colors */
export function meshGradient(colors: string[], angle = 135): string {
  if (colors.length < 2) return colors[0] ?? '#000';
  return `
    radial-gradient(at 20% 80%, ${hexToRgba(colors[0], 0.8)} 0%, transparent 50%),
    radial-gradient(at 80% 20%, ${hexToRgba(colors[1], 0.6)} 0%, transparent 50%),
    radial-gradient(at 50% 50%, ${hexToRgba(colors[0], 0.3)} 0%, transparent 70%),
    linear-gradient(${angle}deg, ${colors[0]} 0%, ${colors[1]} 100%)
  `.trim();
}

/** Noise texture SVG as inline data URL */
export const noiseTexture = `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`;

/** Pattern CSS strings */
export const patterns = {
  diagonalStripes: (color: string, alpha = 0.04) =>
    `repeating-linear-gradient(45deg, ${hexToRgba(color, alpha)} 0px, ${hexToRgba(color, alpha)} 2px, transparent 2px, transparent 12px)`,
  dots: (color: string, alpha = 0.06) =>
    `radial-gradient(circle, ${hexToRgba(color, alpha)} 1px, transparent 1px)`,
  grid: (color: string, alpha = 0.04) =>
    `linear-gradient(${hexToRgba(color, alpha)} 1px, transparent 1px), linear-gradient(90deg, ${hexToRgba(color, alpha)} 1px, transparent 1px)`,
} as const;

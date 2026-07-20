interface HeadlineStyle {
  fontSize: string;
  fontWeight: string;
  fontStyle: string;
  textTransform: string;
}

interface BodyStyle {
  fontSize: string;
  fontWeight: string;
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
  const len = text.length;
  if (len < 18) {
    return {
      fontSize: '130px',
      fontWeight: '300',
      fontStyle: 'italic',
      textTransform: 'none',
    };
  }
  if (len <= 34) {
    return {
      fontSize: '95px',
      fontWeight: '300',
      fontStyle: 'italic',
      textTransform: 'none',
    };
  }
  if (len <= 64) {
    return {
      fontSize: '72px',
      fontWeight: '300',
      fontStyle: 'italic',
      textTransform: 'none',
    };
  }
  return {
    fontSize: '54px',
    fontWeight: '300',
    fontStyle: 'italic',
    textTransform: 'none',
  };
}

export function getBodyStyle(
  text: string,
): BodyStyle {
  const len = text.length;
  if (len < 120) {
    return { fontSize: '38px', fontWeight: '300' };
  }
  if (len < 250) {
    return { fontSize: '30px', fontWeight: '300' };
  }
  if (len < 400) {
    return { fontSize: '24px', fontWeight: '400' };
  }
  return { fontSize: '20px', fontWeight: '400' };
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

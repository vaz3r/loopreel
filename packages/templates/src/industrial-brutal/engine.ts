const THEME = {
  bg: '#1A1A1A',
  text: '#E0E0E0',
  accent: '#F77F00',
  border: 'rgba(224,224,224,0.25)',
  gridBorder: 'rgba(224,224,224,0.15)',
  fontSans: '"Manrope", sans-serif',
  fontMono: '"Space Mono", monospace',
} as const;

export function getHeadlineStyle(text: string): {
  fontSize: number;
  fontWeight: number;
  fontStyle: string;
  textTransform: string;
} {
  const len = text.length;
  let fontSize: number;
  if (len < 18) fontSize = 130;
  else if (len <= 34) fontSize = 95;
  else if (len <= 64) fontSize = 72;
  else fontSize = 54;

  return {
    fontSize,
    fontWeight: 900,
    fontStyle: 'normal',
    textTransform: 'uppercase',
  };
}

export function getBodyStyle(
  text: string,
  isHighlight?: boolean,
): { fontSize: number; fontWeight: number } {
  const len = text.length;
  if (isHighlight) {
    if (len < 120) return { fontSize: 38, fontWeight: 300 };
    if (len < 250) return { fontSize: 30, fontWeight: 300 };
    if (len < 400) return { fontSize: 24, fontWeight: 400 };
    return { fontSize: 20, fontWeight: 400 };
  }
  if (len < 120) return { fontSize: 38, fontWeight: 300 };
  if (len < 250) return { fontSize: 30, fontWeight: 300 };
  if (len < 400) return { fontSize: 24, fontWeight: 400 };
  return { fontSize: 20, fontWeight: 400 };
}

export function getThemeColors() {
  return { ...THEME };
}

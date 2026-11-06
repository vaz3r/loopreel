import { type ThemeSpec, DEFAULT_CHAMELEON_THEME } from './schema.js';

export function injectGoogleFonts(fonts: string[]) {
  const doc = typeof globalThis !== 'undefined' ? (globalThis as any).document : undefined;
  if (!doc) return;
  const uniqueFonts = [...new Set(fonts.filter(Boolean))];
  if (uniqueFonts.length === 0) return;

  const query = uniqueFonts
    .map((f) => `family=${f.replace(/\s+/g, '+')}:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400;1,600`)
    .join('&');

  const href = `https://fonts.googleapis.com/css2?${query}&display=swap`;
  let link = doc.getElementById('chameleon-google-fonts');
  if (!link) {
    link = doc.createElement('link');
    link.id = 'chameleon-google-fonts';
    link.rel = 'stylesheet';
    doc.head.appendChild(link);
  }

  if (link.href !== href) {
    link.href = href;
  }
}

export function getRadiusValue(radius: ThemeSpec['decorations']['borderRadius']): string {
  switch (radius) {
    case 'none': return '0px';
    case 'sm': return '6px';
    case 'md': return '12px';
    case 'lg': return '20px';
    case 'full': return '9999px';
    default: return '12px';
  }
}

export function computeThemeCssVariables(theme: ThemeSpec = DEFAULT_CHAMELEON_THEME): Record<string, string> {
  const p = theme.palette;
  const t = theme.typography;
  const d = theme.decorations;

  return {
    '--cham-bg': p.bg,
    '--cham-surface': p.surface,
    '--cham-surface-alt': p.surfaceAlt || p.surface,
    '--cham-text': p.text,
    '--cham-muted': p.muted,
    '--cham-accent': p.accent,
    '--cham-highlight': p.highlight || p.accent,
    '--cham-border': p.border,
    '--cham-tag-bg': p.tagBg || `${p.accent}20`,
    '--cham-tag-text': p.tagText || p.accent,

    '--cham-font-headline': `"${t.headlineFont}", sans-serif`,
    '--cham-font-body': `"${t.bodyFont}", sans-serif`,
    '--cham-font-mono': `"${t.monoFont || 'JetBrains Mono'}", monospace`,
    '--cham-headline-weight': String(t.headlineWeight),
    '--cham-headline-style': t.headlineStyle,
    '--cham-headline-transform': t.headlineTransform,
    '--cham-letter-spacing': t.letterSpacing,

    '--cham-radius': getRadiusValue(d.borderRadius),
    '--cham-border-width': d.borderWidth,
  };
}

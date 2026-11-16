export interface CuratedBrandPreset {
  name: string;
  slug: string;
  vibe: string;
  domain: string;
  palette: {
    paper: string;
    ink: string;
    accent: string;
    surface: string;
    border: string;
    subtle: string;
  };
  typography: {
    headlineFont: string;
    bodyFont: string;
    monoFont: string;
    googleFontsUrl: string;
  };
  wordmark: string;
  wordmarkStyle: string;
  handle: string;
  texture: string;
  motif: string;
}

export const CANONICAL_BRAND_PRESETS: Record<string, CuratedBrandPreset> = {
  'the-fine-print': {
    name: 'The Fine Print',
    slug: 'the-fine-print',
    vibe: 'Investigative Corporate Autopsies, Fine Print Tricks & Receipts',
    domain: 'thefineprint.pub',
    palette: {
      paper: '#0B0E14',
      ink: '#F8FAFC',
      accent: '#F43F5E',
      surface: '#141923',
      border: '#222B3D',
      subtle: '#94A3B8',
    },
    typography: {
      headlineFont: 'Playfair Display',
      bodyFont: 'Source Serif 4',
      monoFont: 'JetBrains Mono',
      googleFontsUrl:
        'https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,700;0,800;0,900;1,600;1,700&family=Source+Serif+4:ital,opsz,wght@0,8..60,400;0,8..60,600;1,8..60,400&family=JetBrains+Mono:wght@500;700&display=swap',
    },
    wordmark: 'THE FINE PRINT',
    wordmarkStyle: 'small-caps',
    handle: '@thefineprint.pub',
    texture: 'grid',
    motif: 'bracket',
  },
  'the-zurich-typographer': {
    name: 'The Zurich Typographer',
    slug: 'the-zurich-typographer',
    vibe: 'Swiss Precision, Grid Architecture & Brutalist Monospaces',
    domain: 'zurich.design',
    palette: {
      paper: '#FFFFFF',
      ink: '#0A0A0A',
      accent: '#E11D48',
      surface: '#F8FAFC',
      border: '#CBD5E1',
      subtle: '#475569',
    },
    typography: {
      headlineFont: 'Syne',
      bodyFont: 'Plus Jakarta Sans',
      monoFont: 'Space Mono',
      googleFontsUrl:
        'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&family=Space+Mono:wght@400;700&family=Syne:wght@600;700;800&display=swap',
    },
    wordmark: 'THE ZURICH TYPOGRAPHER',
    wordmarkStyle: 'sans',
    handle: '@zurichtypo',
    texture: 'grid',
    motif: 'crosshair',
  },
  'the-token-ledger': {
    name: 'The Token Ledger',
    slug: 'the-token-ledger',
    vibe: 'Autonomous AI, Cryptographic Compute & Financial Telemetry',
    domain: 'tokenledger.ai',
    palette: {
      paper: '#0C0E12',
      ink: '#F0F4F8',
      accent: '#38BDF8',
      surface: '#151921',
      border: '#263040',
      subtle: '#8A99AD',
    },
    typography: {
      headlineFont: 'Cinzel',
      bodyFont: 'Plus Jakarta Sans',
      monoFont: 'JetBrains Mono',
      googleFontsUrl:
        'https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;700&display=swap',
    },
    wordmark: 'THE TOKEN LEDGER',
    wordmarkStyle: 'small-caps',
    handle: '@tokenledger',
    texture: 'blueprint',
    motif: 'coord',
  },
};

export function resolveBrandPreset(input: any): CuratedBrandPreset | null {
  if (!input) return null;
  if (typeof input === 'string') {
    return CANONICAL_BRAND_PRESETS[input] || null;
  }
  if (typeof input === 'object' && input !== null) {
    const slug = input.slug as string;
    const canonical = slug ? CANONICAL_BRAND_PRESETS[slug] : undefined;
    if (canonical) {
      return {
        ...canonical,
        ...input,
        palette: {
          ...canonical.palette,
          ...(input.palette || {}),
        },
        typography: {
          ...canonical.typography,
          ...(input.typography || {}),
        },
      };
    }
  }
  return null;
}

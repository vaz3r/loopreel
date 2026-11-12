import type { BespokeBrand } from '@/api/client';

export const CURATED_BRAND_PRESETS: BespokeBrand[] = [
  {
    name: 'The Fine Print',
    slug: 'the-fine-print',
    vibe: 'Investigative Corporate Autopsies, Fine Print Tricks & Receipts',
    domain: 'thefineprint.co',
    palette: {
      paper: '#0A0A0C',
      ink: '#F5F5F7',
      accent: '#FF2A2A',
      surface: '#141418',
      border: '#26262E',
      subtle: '#858592',
    },
    typography: {
      headlineFont: 'Space Grotesk',
      bodyFont: 'Inter',
      monoFont: 'JetBrains Mono',
      googleFontsUrl:
        'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@700;800&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;700&display=swap',
    },
    wordmark: 'THE FINE PRINT',
    wordmarkStyle: 'small-caps',
    handle: '@thefineprint.co',
    texture: 'grid',
    motif: 'bracket',
  },
  {
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
  {
    name: 'The Threshold',
    slug: 'the-threshold',
    vibe: 'Frontier Hardware, Robotics, Drones & Autonomous Systems',
    domain: 'thethreshold.tech',
    palette: {
      paper: '#0D0E12',
      ink: '#F1F3F9',
      accent: '#FF4D00',
      surface: '#161820',
      border: '#2A2D3A',
      subtle: '#8E93A6',
    },
    typography: {
      headlineFont: 'Syne',
      bodyFont: 'Inter',
      monoFont: 'JetBrains Mono',
      googleFontsUrl:
        'https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;700&display=swap',
    },
    wordmark: 'THE THRESHOLD',
    wordmarkStyle: 'sans',
    handle: '@thethreshold',
    texture: 'grid',
    motif: 'crosshair',
  },
  {
    name: 'The Tokyo Review',
    slug: 'the-tokyo-review',
    vibe: 'Quiet Japanese Washi Editorial, Cultural Depth & Craft',
    domain: 'tokyoreview.jp',
    palette: {
      paper: '#F4EFE6',
      ink: '#1C1B18',
      accent: '#C83E2B',
      surface: '#EAE3D5',
      border: '#D4CBBC',
      subtle: '#6E695F',
    },
    typography: {
      headlineFont: 'Shippori Mincho',
      bodyFont: 'Noto Serif',
      monoFont: 'Space Mono',
      googleFontsUrl:
        'https://fonts.googleapis.com/css2?family=Shippori+Mincho:wght@600;700;800&family=Noto+Serif:wght@400;500;600&family=Space+Mono:wght@400;700&display=swap',
    },
    wordmark: 'THE TOKYO REVIEW',
    wordmarkStyle: 'serif',
    handle: '@tokyoreview',
    texture: 'washi',
    motif: 'seal',
  },
  {
    name: 'The Zurich Typographer',
    slug: 'the-zurich-typographer',
    vibe: 'Swiss International Style, Pure Grid Geometry & Clean Discipline',
    domain: 'zurichtypo.ch',
    palette: {
      paper: '#FFFFFF',
      ink: '#000000',
      accent: '#E60000',
      surface: '#F5F5F5',
      border: '#E5E5E5',
      subtle: '#666666',
    },
    typography: {
      headlineFont: 'Inter',
      bodyFont: 'Inter',
      monoFont: 'JetBrains Mono',
      googleFontsUrl:
        'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;800;900&family=JetBrains+Mono:wght@400;600&display=swap',
    },
    wordmark: 'ZÜRICH TYPO',
    wordmarkStyle: 'sans',
    handle: '@zurichtypo',
    texture: 'grid',
    motif: 'bracket',
  },
  {
    name: 'The Silicon Architect',
    slug: 'the-silicon-architect',
    vibe: 'Deep-Tech Semiconductor, Compute Accelerators & Systems Engineering',
    domain: 'siliconarchitect.dev',
    palette: {
      paper: '#08090C',
      ink: '#E2E8F0',
      accent: '#10B981',
      surface: '#111318',
      border: '#1F2430',
      subtle: '#7E8B9B',
    },
    typography: {
      headlineFont: 'Space Grotesk',
      bodyFont: 'Inter',
      monoFont: 'JetBrains Mono',
      googleFontsUrl:
        'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@600;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap',
    },
    wordmark: 'SILICON ARCHITECT',
    wordmarkStyle: 'mono',
    handle: '@siliconarch',
    texture: 'blueprint',
    motif: 'coord',
  },
];

const STORAGE_KEY = 'loopreel_brand_presets';

export function getBrandPresets(): { curated: BespokeBrand[]; custom: BespokeBrand[] } {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const custom: BespokeBrand[] = raw ? JSON.parse(raw) : [];
    const customMap = new Map(custom.map((c) => [c.slug, c]));
    const effectiveCurated = CURATED_BRAND_PRESETS.map((curated) => {
      return customMap.get(curated.slug) || curated;
    });
    const curatedSlugs = new Set(CURATED_BRAND_PRESETS.map((c) => c.slug));
    const strictlyCustom = custom.filter((c) => !curatedSlugs.has(c.slug));

    return {
      curated: effectiveCurated,
      custom: strictlyCustom,
    };
  } catch {
    return {
      curated: CURATED_BRAND_PRESETS,
      custom: [],
    };
  }
}

export function getAllBrandPresets(): BespokeBrand[] {
  const { curated, custom } = getBrandPresets();
  // Custom presets take precedence if matching slug
  const customSlugs = new Set(custom.map((c) => c.slug));
  const filteredCurated = curated.filter((c) => !customSlugs.has(c.slug));
  return [...custom, ...filteredCurated];
}

export function saveBrandPreset(brand: BespokeBrand): void {
  try {
    const { custom } = getBrandPresets();
    const existingIdx = custom.findIndex((c) => c.slug === brand.slug);
    if (existingIdx !== -1) {
      custom[existingIdx] = brand;
    } else {
      custom.unshift(brand);
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(custom));
  } catch (err) {
    console.error('Failed to save brand preset to localStorage:', err);
  }
}

export function deleteBrandPreset(slug: string): boolean {
  try {
    const { custom } = getBrandPresets();
    const updated = custom.filter((c) => c.slug !== slug);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return true;
  } catch (err) {
    console.error('Failed to delete brand preset:', err);
    return false;
  }
}

export function resetBrandPreset(slug: string): boolean {
  return deleteBrandPreset(slug);
}

export function isCuratedSlug(slug: string): boolean {
  return CURATED_BRAND_PRESETS.some((c) => c.slug === slug);
}

export function isPresetOverridden(slug: string): boolean {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const custom: BespokeBrand[] = raw ? JSON.parse(raw) : [];
    return custom.some((c) => c.slug === slug);
  } catch {
    return false;
  }
}

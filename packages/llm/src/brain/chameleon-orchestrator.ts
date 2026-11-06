import { parseXml } from '../xml-parser.js';
import type { LLMClient } from '../client.js';
import type { PhaseUsage } from './types.js';
import { createUsageTracker, withPhaseRetry } from './retry.js';
import { stripFences, unwrapChildWrappers, xmlToObjects } from './xml-helpers.js';
import { renderPrompt } from './prompts/loader.js';
import { validateInput } from './input-validator.js';

export interface ChameleonThemePalette {
  bg: string;
  surface: string;
  surfaceAlt?: string;
  text: string;
  muted: string;
  accent: string;
  highlight?: string;
  border: string;
  tagBg?: string;
  tagText?: string;
}

export interface ChameleonThemeTypography {
  headlineFont: string;
  bodyFont: string;
  monoFont: string;
  headlineWeight: number | string;
  headlineStyle: 'normal' | 'italic';
  headlineTransform: 'none' | 'uppercase' | 'capitalize';
  letterSpacing: string;
}

export interface ChameleonThemeDecorations {
  cardStyle: 'flat' | 'bordered' | 'elevated' | 'glass' | 'minimal' | 'brutalist';
  borderRadius: 'none' | 'sm' | 'md' | 'lg' | 'full';
  borderWidth: string;
  texture: 'clean' | 'dotgrid' | 'graph' | 'ruled';
  badgeStyle: 'pill' | 'square' | 'outline' | 'solid' | 'minimal';
  dividerStyle: 'solid' | 'dashed' | 'dotted' | 'accent-bar' | 'none';
}

export interface ChameleonThemeSpec {
  name: string;
  rationale?: string;
  palette: ChameleonThemePalette;
  typography: ChameleonThemeTypography;
  decorations: ChameleonThemeDecorations;
}

export interface ChameleonResult {
  theme: ChameleonThemeSpec;
  slides: Record<string, unknown>[];
  totalTokens: { input: number; output: number };
  phaseUsages: PhaseUsage[];
  totalLatencyMs: number;
}

export interface ChameleonOptions {
  llm: LLMClient;
  brandKit?: Record<string, string | undefined>;
  onProgress?: (phase: string, detail?: string) => void;
  onDebug?: (filename: string, content: string) => void;
  retriesUsed?: Record<string, number>;
}

export const FALLBACK_CHAMELEON_THEME: ChameleonThemeSpec = {
  name: 'Modern Obsidian',
  rationale: 'High-contrast modern editorial aesthetic with electric blue accents',
  palette: {
    bg: '#0A0D14',
    surface: '#121722',
    surfaceAlt: '#1A2130',
    text: '#F1F5F9',
    muted: '#94A3B8',
    accent: '#38BDF8',
    highlight: '#F43F5E',
    border: 'rgba(255, 255, 255, 0.12)',
    tagBg: 'rgba(56, 189, 248, 0.15)',
    tagText: '#38BDF8',
  },
  typography: {
    headlineFont: 'Space Grotesk',
    bodyFont: 'Inter',
    monoFont: 'JetBrains Mono',
    headlineWeight: 600,
    headlineStyle: 'normal',
    headlineTransform: 'none',
    letterSpacing: '-0.02em',
  },
  decorations: {
    cardStyle: 'bordered',
    borderRadius: 'md',
    borderWidth: '1px',
    texture: 'dotgrid',
    badgeStyle: 'pill',
    dividerStyle: 'solid',
  },
};

export async function generateChameleonSlides(
  rawText: string,
  options: ChameleonOptions,
): Promise<ChameleonResult> {
  const startTime = Date.now();
  const tracker = createUsageTracker();
  const retriesUsed = options.retriesUsed ?? {};

  // Validate input
  const inputCheck = validateInput(rawText);
  if (!inputCheck.valid) {
    throw new Error(`Input validation failed: ${inputCheck.reason} — ${inputCheck.details}`);
  }

  // Phase 1: Content Extraction
  options.onProgress?.('phase1_extraction', 'Extracting core briefing');
  const extractSystem = renderPrompt('extraction', {});
  const extractPrompt = `Extract the essential story, structure, and insights from this source:\n\n${rawText}`;

  const extractRaw = await withPhaseRetry(
    async () => {
      const raw = await tracker.callLLM(options.llm, 'extraction', extractSystem, extractPrompt, 0.2);
      return stripFences(raw);
    },
    'extraction',
    retriesUsed,
  );
  const briefXml = extractRaw;
  options.onDebug?.('chameleon-01-brief.xml', briefXml);

  // Phase 2: Chameleon Design Director (Theme Synthesis)
  options.onProgress?.('phase2_chameleon_theme', 'Synthesizing bespoke publication theme');
  const brandKitData = options.brandKit ? {
    bg: options.brandKit.bg ?? 'not set',
    text: options.brandKit.text ?? 'not set',
    accent: options.brandKit.accent ?? 'not set',
    font: options.brandKit.fontSerif ?? options.brandKit.fontSans ?? options.brandKit.fontMono ?? 'not set',
  } : null;

  const themeSystem = renderPrompt('chameleon-theme', {
    briefXml,
    brandKit: brandKitData,
  });

  const themeRaw = await withPhaseRetry(
    async () => {
      const raw = await tracker.callLLM(options.llm, 'classification', themeSystem, 'Synthesize the bespoke visual theme for this article.', 0.4);
      return stripFences(raw);
    },
    'classification',
    retriesUsed,
  );

  const themeXml = themeRaw;
  options.onDebug?.('chameleon-02-theme.xml', themeXml);

  let theme: ChameleonThemeSpec = FALLBACK_CHAMELEON_THEME;
  try {
    const parsedThemeDoc = xmlToObjects(parseXml(themeXml)) as Record<string, unknown>;
    const rootTheme = (parsedThemeDoc['chameleon_theme'] as Record<string, unknown>)?.[
      'theme'
    ] ?? parsedThemeDoc['theme'];

    if (rootTheme && typeof rootTheme === 'object') {
      const t = rootTheme as Record<string, any>;
      const p = t.palette || {};
      const ty = t.typography || {};
      const d = t.decorations || {};

      theme = {
        name: String(t.name || 'Bespoke Editorial'),
        rationale: String(t.rationale || ''),
        palette: {
          bg: p.bg || FALLBACK_CHAMELEON_THEME.palette.bg,
          surface: p.surface || FALLBACK_CHAMELEON_THEME.palette.surface,
          surfaceAlt: p.surfaceAlt || p.surface || FALLBACK_CHAMELEON_THEME.palette.surfaceAlt,
          text: p.text || FALLBACK_CHAMELEON_THEME.palette.text,
          muted: p.muted || FALLBACK_CHAMELEON_THEME.palette.muted,
          accent: p.accent || FALLBACK_CHAMELEON_THEME.palette.accent,
          highlight: p.highlight || p.accent || FALLBACK_CHAMELEON_THEME.palette.highlight,
          border: p.border || FALLBACK_CHAMELEON_THEME.palette.border,
          tagBg: p.tagBg || FALLBACK_CHAMELEON_THEME.palette.tagBg,
          tagText: p.tagText || p.accent || FALLBACK_CHAMELEON_THEME.palette.tagText,
        },
        typography: {
          headlineFont: ty.headlineFont || FALLBACK_CHAMELEON_THEME.typography.headlineFont,
          bodyFont: ty.bodyFont || FALLBACK_CHAMELEON_THEME.typography.bodyFont,
          monoFont: ty.monoFont || 'JetBrains Mono',
          headlineWeight: ty.headlineWeight || 600,
          headlineStyle: ty.headlineStyle === 'italic' ? 'italic' : 'normal',
          headlineTransform: ty.headlineTransform === 'uppercase' ? 'uppercase' : 'none',
          letterSpacing: ty.letterSpacing || '-0.02em',
        },
        decorations: {
          cardStyle: d.cardStyle || 'bordered',
          borderRadius: d.borderRadius || 'md',
          borderWidth: d.borderWidth || '1px',
          texture: d.texture || 'dotgrid',
          badgeStyle: d.badgeStyle || 'pill',
          dividerStyle: d.dividerStyle || 'solid',
        },
      };
    }
  } catch (err) {
    options.onDebug?.('chameleon-theme-error.txt', String(err));
  }

  // Phase 3: Slide Content Generation
  options.onProgress?.('phase3_chameleon_slides', 'Generating semantic slides');
  const slidesSystem = renderPrompt('chameleon-slides', {
    briefXml,
    themeName: theme.name,
    themeRationale: theme.rationale,
  });

  const slidesRaw = await withPhaseRetry(
    async () => {
      const raw = await tracker.callLLM(options.llm, 'generation', slidesSystem, 'Generate all slides for this carousel.', 0.3);
      return stripFences(raw);
    },
    'generation',
    retriesUsed,
  );

  const slidesXml = slidesRaw;
  options.onDebug?.('chameleon-03-slides.xml', slidesXml);

  const parsedDoc = xmlToObjects(parseXml(slidesXml)) as Record<string, unknown>;
  const carouselContainer = (parsedDoc['chameleon_carousel'] as Record<string, unknown>) ?? parsedDoc;
  const slideData = carouselContainer['slide'] ?? carouselContainer['slides'];

  const rawSlides: Record<string, unknown>[] = [];
  if (Array.isArray(slideData)) {
    for (const s of slideData) {
      if (s && typeof s === 'object') {
        rawSlides.push(unwrapChildWrappers(s as Record<string, unknown>));
      }
    }
  } else if (slideData && typeof slideData === 'object') {
    const innerSlides = (slideData as Record<string, unknown>)['slide'];
    if (Array.isArray(innerSlides)) {
      for (const s of innerSlides) {
        if (s && typeof s === 'object') {
          rawSlides.push(unwrapChildWrappers(s as Record<string, unknown>));
        }
      }
    } else {
      rawSlides.push(unwrapChildWrappers(slideData as Record<string, unknown>));
    }
  }

  // Normalize slide IDs and indices
  for (let i = 0; i < rawSlides.length; i++) {
    const s = rawSlides[i];
    if (s) {
      if (!s.id) s.id = `slide-${i + 1}`;
      s.index = i;
      s.totalSlides = rawSlides.length;
    }
  }

  return {
    theme,
    slides: rawSlides,
    totalTokens: tracker.getTotals(),
    phaseUsages: tracker.getPhaseUsages(),
    totalLatencyMs: Date.now() - startTime,
  };
}

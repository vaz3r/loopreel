/**
 * Universal Typographic & Spacing Token System for Loopreel slides.
 *
 * Provides mathematically calibrated scale factors and semantic CSS design tokens
 * based on viewport aspect ratio, content density, and structural layout requirements.
 */

export interface SlideMetrics {
  aspectRatio: number;
  viewportWidth: number;
  viewportHeight: number;
  itemCount: number;
  wordCount: number;
  headlineLength: number;
}

export interface ComputedTokens {
  /** Master scale factor (typically 0.70 - 1.15) */
  k: number;
  /** CSS Custom Properties dictionary to inject into container style */
  cssVariables: Record<string, string>;
}

/**
 * Computes the master scale factor k.
 *
 * Aspect Ratio Rules:
 * - Portrait 4:5 (baseline ~0.8): k = 1.0 (standard reference canvas)
 * - Square 1:1 (~1.0): safe vertical area loses ~26% height -> k = 0.82 - 0.86
 * - Story 9:16 (~0.56): vertical canvas has ~42% more height -> k = 1.05 - 1.12
 * - Landscape 16:9 (>1.3): vertical canvas is constrained -> k = 0.76 - 0.80
 *
 * Density Compression:
 * - 5+ items or >90 words: gentle compression (k * 0.92)
 * - 4 items or >65 words: subtle compression (k * 0.96)
 * - Very short content (<25 words): subtle expansion (k * 1.04)
 */
export function computeScaleFactor(metrics: SlideMetrics): number {
  let k = 1.0;

  // 1. Aspect ratio adaptation
  if (metrics.aspectRatio > 0.9 && metrics.aspectRatio <= 1.15) {
    // Square 1:1
    k *= 0.84;
  } else if (metrics.aspectRatio <= 0.65) {
    // Story 9:16
    k *= 1.08;
  } else if (metrics.aspectRatio > 1.15) {
    // Landscape
    k *= 0.78;
  }

  // 2. Content density adaptation
  if (metrics.itemCount >= 5 || metrics.wordCount > 90) {
    k *= 0.92;
  } else if (metrics.itemCount >= 4 || metrics.wordCount > 65) {
    k *= 0.96;
  } else if (metrics.wordCount < 25 && metrics.itemCount <= 2) {
    k *= 1.04;
  }

  // 3. Long headline compensation
  if (metrics.headlineLength > 50) {
    k *= 0.94;
  }

  // Bound to safe readable range
  return Math.max(0.68, Math.min(1.20, Number(k.toFixed(3))));
}

/**
 * Generates semantic CSS design tokens using the computed scale factor k.
 */
export function generateSemanticTokens(k: number): Record<string, string> {
  const kStr = k.toFixed(3);

  return {
    '--loop-k': kStr,
    '--loop-scale': kStr,

    // Typographic scale
    '--loop-font-hero': `calc(${kStr} * 110px)`,
    '--loop-font-display': `calc(${kStr} * 78px)`,
    '--loop-font-title': `calc(${kStr} * 58px)`,
    '--loop-font-h1': `calc(${kStr} * 52px)`,
    '--loop-font-h2': `calc(${kStr} * 38px)`,
    '--loop-font-h3': `calc(${kStr} * 28px)`,
    '--loop-font-lead': `calc(${kStr} * 30px)`,
    '--loop-font-body': `calc(${kStr} * 22px)`,
    '--loop-font-caption': `calc(${kStr} * 18px)`,
    '--loop-font-note': `calc(${kStr} * 17px)`,

    // Spacing & rhythm
    '--loop-gap-xl': `calc(${kStr} * 48px)`,
    '--loop-gap-lg': `calc(${kStr} * 36px)`,
    '--loop-gap-md': `calc(${kStr} * 24px)`,
    '--loop-gap-sm': `calc(${kStr} * 16px)`,
    '--loop-gap-xs': `calc(${kStr} * 10px)`,

    // Padding & margins
    '--loop-pad-card': `calc(${kStr} * 48px)`,
    '--loop-pad-item-v': `calc(${kStr} * 20px)`,
    '--loop-pad-item-h': `calc(${kStr} * 24px)`,
    '--loop-margin-section': `calc(${kStr} * 32px)`,
  };
}

export interface SlideMetrics {
  aspectRatio: number;
  viewportWidth: number;
  viewportHeight: number;
  itemCount: number;
  wordCount: number;
  headlineLength: number;
}

export interface ComputedTokens {
  k: number;
  cssVariables: Record<string, string>;
}

export function computeScaleFactor(metrics: SlideMetrics): number {
  let k = 1.0;

  if (metrics.aspectRatio > 0.9 && metrics.aspectRatio <= 1.15) {
    k *= 0.85; // Square 1:1
  } else if (metrics.aspectRatio <= 0.65) {
    k *= 1.08; // Story 9:16
  } else if (metrics.aspectRatio > 1.15) {
    k *= 0.78; // Landscape
  }

  if (metrics.itemCount >= 5 || metrics.wordCount > 90) {
    k *= 0.92;
  } else if (metrics.itemCount >= 4 || metrics.wordCount > 65) {
    k *= 0.96;
  } else if (metrics.wordCount < 25 && metrics.itemCount <= 2) {
    k *= 1.04;
  }

  return Number(Math.max(0.70, Math.min(1.20, k)).toFixed(3));
}

export function computeSlideMetrics(slide: Record<string, unknown>, viewport: { width: number; height: number }): SlideMetrics {
  const width = viewport.width || 1080;
  const height = viewport.height || 1350;
  const aspectRatio = width / height;

  let wordCount = 0;
  let itemCount = 0;
  let headlineLength = 0;

  for (const [key, val] of Object.entries(slide)) {
    if (typeof val === 'string') {
      const words = val.trim().split(/\s+/).filter(Boolean).length;
      wordCount += words;
      if (key === 'headline' || key === 'title') {
        headlineLength = val.length;
      }
    } else if (Array.isArray(val)) {
      itemCount = Math.max(itemCount, val.length);
      for (const item of val) {
        if (typeof item === 'string') {
          wordCount += item.trim().split(/\s+/).filter(Boolean).length;
        } else if (item && typeof item === 'object') {
          for (const subVal of Object.values(item)) {
            if (typeof subVal === 'string') {
              wordCount += subVal.trim().split(/\s+/).filter(Boolean).length;
            }
          }
        }
      }
    }
  }

  return { aspectRatio, viewportWidth: width, viewportHeight: height, itemCount, wordCount, headlineLength };
}

export function computeTokens(slide: Record<string, unknown>, viewport: { width: number; height: number }): ComputedTokens {
  const metrics = computeSlideMetrics(slide, viewport);
  const k = computeScaleFactor(metrics);

  return {
    k,
    cssVariables: {
      '--loop-k': String(k),
    },
  };
}

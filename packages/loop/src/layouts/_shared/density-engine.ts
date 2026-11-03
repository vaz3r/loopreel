export type DensityMode = 'spacious' | 'balanced' | 'compact';

export interface DensityProfile {
  mode: DensityMode;
  itemCount: number;
  wordCount: number;
  aspectRatio: number;
  isPortrait: boolean;
  isSquare: boolean;
  isStory: boolean;
  isLandscape: boolean;
  cssVariables: Record<string, string>;
  classes: string[];
}

function countWords(str: unknown): number {
  if (typeof str !== 'string' || !str.trim()) return 0;
  return str.trim().split(/\s+/).filter(Boolean).length;
}

export function extractSlideWordCount(slide: Record<string, any>): number {
  let count = 0;
  const visit = (val: any) => {
    if (typeof val === 'string') {
      count += countWords(val);
    } else if (Array.isArray(val)) {
      val.forEach(visit);
    } else if (val && typeof val === 'object') {
      Object.keys(val).forEach((key) => {
        if (key === 'id' || key === 'type' || key === 'footerLeft' || key === 'footerRight' || key === 'tag') {
          return;
        }
        visit(val[key]);
      });
    }
  };
  visit(slide);
  return count;
}

export function extractSlideItemCount(slide: Record<string, any>): number {
  if (Array.isArray(slide.items)) return slide.items.length;
  if (Array.isArray(slide.stats)) return slide.stats.length;
  if (Array.isArray(slide.events)) return slide.events.length;
  if (Array.isArray(slide.rows)) return slide.rows.length;
  if (slide.left && slide.right) return 2;
  return 1;
}

export function determineDensityMode(slide: Record<string, any>, itemCount: number, wordCount: number): DensityMode {
  const type = slide.type;

  if (type === 'sequence') {
    if (itemCount <= 2 || (itemCount === 3 && wordCount < 50)) return 'spacious';
    if (itemCount >= 5 || wordCount > 110) return 'compact';
    return 'balanced';
  }

  if (type === 'telemetry') {
    if (itemCount <= 2) return 'spacious';
    if (itemCount >= 5 || wordCount > 70) return 'compact';
    return 'balanced';
  }

  if (type === 'timeline') {
    if (itemCount <= 2 || (itemCount === 3 && wordCount < 50)) return 'spacious';
    if (itemCount >= 5 || wordCount > 90) return 'compact';
    return 'balanced';
  }

  if (type === 'quote') {
    if (wordCount < 22) return 'spacious';
    if (wordCount > 50) return 'compact';
    return 'balanced';
  }

  if (type === 'cover') {
    if (wordCount < 16) return 'spacious';
    if (wordCount > 35) return 'compact';
    return 'balanced';
  }

  if (type === 'dichotomy' || type === 'definition' || type === 'cta') {
    if (wordCount < 28) return 'spacious';
    if (wordCount > 65) return 'compact';
    return 'balanced';
  }

  if (wordCount < 25) return 'spacious';
  if (wordCount > 75) return 'compact';
  return 'balanced';
}

export function computeSlideDensity(
  slide: Record<string, any>,
  size: { width: number; height: number } = { width: 1080, height: 1350 }
): DensityProfile {
  const width = size.width || 1080;
  const height = size.height || 1350;
  const aspectRatio = width / height;

  const isStory = aspectRatio <= 0.65;
  const isPortrait = aspectRatio > 0.65 && aspectRatio <= 0.9;
  const isSquare = aspectRatio > 0.9 && aspectRatio <= 1.15;
  const isLandscape = aspectRatio > 1.15;

  const itemCount = extractSlideItemCount(slide);
  const wordCount = extractSlideWordCount(slide);
  const mode = determineDensityMode(slide, itemCount, wordCount);

  // Dynamic CSS custom variables
  const cssVariables: Record<string, string> = {};

  // 1. Spacing & Rhythm
  if (isStory) {
    cssVariables['--density-item-gap'] = mode === 'spacious' ? '56px' : mode === 'compact' ? '22px' : '36px';
    cssVariables['--density-item-padding'] = mode === 'spacious' ? '48px 0' : mode === 'compact' ? '18px 0' : '32px 0';
  } else if (isSquare) {
    cssVariables['--density-item-gap'] = mode === 'spacious' ? '36px' : mode === 'compact' ? '14px' : '24px';
    cssVariables['--density-item-padding'] = mode === 'spacious' ? '28px 0' : mode === 'compact' ? '12px 0' : '20px 0';
  } else if (isLandscape) {
    cssVariables['--density-item-gap'] = mode === 'spacious' ? '28px' : mode === 'compact' ? '12px' : '20px';
    cssVariables['--density-item-padding'] = mode === 'spacious' ? '20px 0' : mode === 'compact' ? '10px 0' : '14px 0';
  } else {
    // Standard Portrait (4:5, 1080x1350)
    cssVariables['--density-item-gap'] = mode === 'spacious' ? '48px' : mode === 'compact' ? '18px' : '32px';
    cssVariables['--density-item-padding'] = mode === 'spacious' ? '40px 0' : mode === 'compact' ? '16px 0' : '26px 0';
  }

  cssVariables['--density-vertical-align'] = mode === 'compact' ? 'flex-start' : 'space-between';
  cssVariables['--density-content-justify'] = mode === 'compact' ? 'flex-start' : 'space-between';
  cssVariables['--density-item-flex'] = mode === 'compact' ? '0 0 auto' : '1 1 0%';

  // 2. Typography
  cssVariables['--density-headline-size'] = mode === 'spacious' ? '72px' : mode === 'compact' ? '52px' : '64px';
  cssVariables['--density-body-size'] = mode === 'spacious' ? '26px' : mode === 'compact' ? '20px' : '23px';
  cssVariables['--density-line-height'] = mode === 'spacious' ? '1.5' : mode === 'compact' ? '1.3' : '1.4';

  // 3. Telemetry Stats
  if (itemCount <= 1) {
    cssVariables['--density-stat-value-size'] = '160px';
    cssVariables['--density-stat-unit-size'] = '75px';
    cssVariables['--density-stat-grid-cols'] = '1fr';
    cssVariables['--density-stat-grid-rows'] = '1fr';
  } else if (itemCount === 2) {
    cssVariables['--density-stat-value-size'] = isLandscape ? '110px' : '135px';
    cssVariables['--density-stat-unit-size'] = '65px';
    cssVariables['--density-stat-grid-cols'] = '1fr 1fr';
    cssVariables['--density-stat-grid-rows'] = '1fr';
  } else if (itemCount === 3) {
    cssVariables['--density-stat-value-size'] = '115px';
    cssVariables['--density-stat-unit-size'] = '50px';
    cssVariables['--density-stat-grid-cols'] = isLandscape ? 'repeat(3, 1fr)' : '1fr 1fr';
    cssVariables['--density-stat-grid-rows'] = isLandscape ? '1fr' : '1fr 1fr';
  } else if (itemCount === 4) {
    cssVariables['--density-stat-value-size'] = isLandscape ? '85px' : '95px';
    cssVariables['--density-stat-unit-size'] = '42px';
    cssVariables['--density-stat-grid-cols'] = isLandscape ? 'repeat(4, 1fr)' : '1fr 1fr';
    cssVariables['--density-stat-grid-rows'] = isLandscape ? '1fr' : '1fr 1fr';
  } else {
    cssVariables['--density-stat-value-size'] = '72px';
    cssVariables['--density-stat-unit-size'] = '32px';
    cssVariables['--density-stat-grid-cols'] = isLandscape ? 'repeat(3, 1fr)' : '1fr 1fr';
    cssVariables['--density-stat-grid-rows'] = 'repeat(3, 1fr)';
  }

  cssVariables['--density-stat-label-size'] = mode === 'spacious' ? '26px' : mode === 'compact' ? '19px' : '22px';
  cssVariables['--density-stat-gap'] = mode === 'spacious' ? '56px 48px' : mode === 'compact' ? '24px 24px' : '40px 36px';

  // 4. Cover Slide
  cssVariables['--density-cover-headline-size'] = mode === 'spacious' ? '110px' : mode === 'compact' ? '80px' : '96px';
  cssVariables['--density-cover-subheadline-size'] = mode === 'spacious' ? '38px' : mode === 'compact' ? '28px' : '34px';

  // 5. Quote Slide
  cssVariables['--density-quote-font-size'] = mode === 'spacious' ? '72px' : mode === 'compact' ? '46px' : '58px';
  cssVariables['--density-quote-mark-size'] = mode === 'spacious' ? '260px' : mode === 'compact' ? '150px' : '200px';

  const aspectClass = isStory ? 'loop-aspect-story' : isSquare ? 'loop-aspect-square' : isLandscape ? 'loop-aspect-landscape' : 'loop-aspect-portrait';
  const classes = ['loop-density-root', `loop-density-${mode}`, aspectClass];

  return {
    mode,
    itemCount,
    wordCount,
    aspectRatio,
    isPortrait,
    isSquare,
    isStory,
    isLandscape,
    cssVariables,
    classes,
  };
}

/**
 * Returns helper styles for items in odd grids (e.g. 3rd item in a 2-column grid)
 */
export function getStatItemStyle(idx: number, totalStats: number, isLandscape: boolean = false): Record<string, any> {
  if (totalStats === 3 && idx === 2 && !isLandscape) {
    return {
      gridColumn: '1 / -1',
      maxWidth: '75%',
      margin: '0 auto',
      width: '100%',
    };
  }
  return {};
}

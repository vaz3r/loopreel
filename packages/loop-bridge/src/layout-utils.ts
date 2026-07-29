import { createHash } from 'crypto';

// ─── Layout Types ────────────────────────────────────────────────────────────

export type LayoutType =
  | 'left'
  | 'center'
  | 'right'
  | 'asymmetric'
  | 'grid-2x2'
  | 'split-vertical'
  | 'split-horizontal'
  | 'overlay'
  | 'stacked'
  | 'diagonal'
  | 'full-bleed'
  | 'contained';

const ALL_LAYOUTS: LayoutType[] = [
  'left', 'center', 'right', 'asymmetric',
  'grid-2x2', 'split-vertical', 'split-horizontal',
  'overlay', 'stacked', 'diagonal', 'full-bleed', 'contained',
];

// ─── Deterministic Layout Generation ─────────────────────────────────────────

export interface UniqueLayouts {
  cover: LayoutType;
  sequence: LayoutType;
  mythFact: LayoutType;
  quote: LayoutType;
  cta: LayoutType;
  extra: LayoutType;
}

/**
 * Generate unique layouts based on article topic hash.
 * Each article gets different layout assignments.
 */
export function generateUniqueLayouts(seed: string): UniqueLayouts {
  const hash = createHash('md5').update(seed).digest('hex');
  const layouts: LayoutType[] = [];

  // Pick 6 unique layouts based on hash
  for (let i = 0; i < 6 && layouts.length < 6; i++) {
    const idx = parseInt(hash.slice(i * 2, i * 2 + 2), 16) % ALL_LAYOUTS.length;
    const layout = ALL_LAYOUTS[idx];
    if (layout && !layouts.includes(layout)) {
      layouts.push(layout);
    }
  }

  // Fill remaining if needed
  for (const layout of ALL_LAYOUTS) {
    if (layouts.length >= 6) break;
    if (!layouts.includes(layout)) {
      layouts.push(layout);
    }
  }

  return {
    cover: layouts[0]!,
    sequence: layouts[1]!,
    mythFact: layouts[2]!,
    quote: layouts[3]!,
    cta: layouts[4]!,
    extra: layouts[5]!,
  };
}

/**
 * Get a human-readable description of a layout type.
 */
export function describeLayout(layout: LayoutType): string {
  switch (layout) {
    case 'left': return 'Left-aligned text with generous right padding';
    case 'center': return 'Centered text with equal padding on all sides';
    case 'right': return 'Right-aligned text with generous left padding';
    case 'asymmetric': return 'Asymmetric grid with text on one side, visual element on other';
    case 'grid-2x2': return '2x2 grid layout for comparing 4 items';
    case 'split-vertical': return 'Vertical split with text on one side, visual on other';
    case 'split-horizontal': return 'Horizontal split with text on top, visual on bottom';
    case 'overlay': return 'Text overlaid on a full-bleed visual';
    case 'stacked': return 'Stacked elements with clear vertical hierarchy';
    case 'diagonal': return 'Diagonal split with dynamic energy';
    case 'full-bleed': return 'Full-bleed background with centered text';
    case 'contained': return 'Contained card-style with defined borders';
  }
}

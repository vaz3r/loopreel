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

/**
 * Generate unique layouts for a given set of slide types.
 * Each article gets different layout assignments based on a hash of the seed.
 */
export function generateUniqueLayouts(seed: string, slideTypes: string[]): Record<string, LayoutType> {
  const hash = createHash('md5').update(seed).digest('hex');
  const result: Record<string, LayoutType> = {};
  const used: LayoutType[] = [];

  for (let i = 0; i < slideTypes.length; i++) {
    const slideType = slideTypes[i]!;

    // Try to pick a unique layout from the hash
    let picked = false;
    for (let attempt = 0; attempt < ALL_LAYOUTS.length; attempt++) {
      const hashSlice = hash.slice(((i * ALL_LAYOUTS.length + attempt) * 2) % hash.length, ((i * ALL_LAYOUTS.length + attempt) * 2 + 2) % hash.length + 2);
      const idx = parseInt(hashSlice || '00', 16) % ALL_LAYOUTS.length;
      const layout = ALL_LAYOUTS[idx];
      if (layout && !used.includes(layout)) {
        result[slideType] = layout;
        used.push(layout);
        picked = true;
        break;
      }
    }

    // Fallback: cycle through unused layouts
    if (!picked) {
      for (const layout of ALL_LAYOUTS) {
        if (!used.includes(layout)) {
          result[slideType] = layout;
          used.push(layout);
          picked = true;
          break;
        }
      }
    }

    // Last resort: reuse layouts in order
    if (!picked) {
      result[slideType] = ALL_LAYOUTS[i % ALL_LAYOUTS.length]!;
    }
  }

  return result;
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

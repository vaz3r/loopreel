# Template Engine V2 — Implementation Plan

## Problem Statement

The current template system uses per-template React components (600-800 lines each) with hardcoded inline styles. This creates:
- Massive code duplication across 7 templates (~5000 lines of JSX)
- Manual pixel tweaking for spacing (`top: 28`, `marginBottom: 30`)
- No automatic layout adaptation for different content lengths or platforms
- Adding a new template requires writing 600+ lines of JSX
- Adding a new slide type requires editing every template

## Goal

Build a constraint-based layout engine with composable slide types, where:
- Templates are configuration files (colors, fonts, effects), not React components
- Slide types are defined once, not per-template
- Font sizing, spacing, and layout are automatic and content-aware
- Platform adaptation (Instagram, LinkedIn, Facebook) is built into the layout solver
- Adding a new template = creating a config file (50 lines, not 600)

## Progress

### Completed
- [x] Phase 1: Design system foundation (types, tokens, platforms)
- [x] Phase 2: Layout engine (solver, text-fitter, overflow)
- [x] Phase 3: Slide type library (all 11 types)
- [x] Phase 4: Renderer (React components, effects)
- [x] Phase 5: Template configs (all 7 templates)

### In Progress
- [ ] Phase 6: Integration with API render route
- [ ] Phase 7: Platform testing (all 4 platforms)

### Pending
- [ ] Phase 8: Remove old template code
- [ ] Phase 9: Performance optimization

---

## Architecture

### Package Structure

```
packages/
  design-system/              # Core design primitives
    src/
      types.ts                # All type definitions
      tokens.ts               # Spacing, color, typography scales
      platforms.ts            # Platform configs (dimensions, safe zones, font scale)
      index.ts

  layout-engine/              # Constraint-based layout solver
    src/
      types.ts                # Layout element types
      solver.ts               # Main layout solver
      text-fitter.ts          # Font size optimization (binary search)
      overflow.ts             # Overflow handling, shrink algorithm
      index.ts

  slide-types/                # Slide type definitions (once, not per-template)
    src/
      cover.ts
      definition.ts
      dichotomy.ts
      timeline.ts
      quote.ts
      sequence.ts
      telemetry.ts
      table.ts
      image-split.ts
      image-cover.ts
      cta.ts
      registry.ts             # Maps type names to configs
      index.ts

  templates/                  # Template configurations (data, not code)
    src/
      configs/
        void-editorial.ts
        archive-paper.ts
        industrial-brutal.ts
        custom-brand.ts
        editorial-runway.ts
        protocol-001.ts
        archive.ts
      registry.ts
      index.ts

  renderer/                   # Single React renderer for all templates
    src/
      renderer.ts             # Main render function
      components/
        SlideCanvas.tsx       # Canvas wrapper with background
        TextBlock.tsx         # Headline, body, label rendering
        TimelineBlock.tsx     # Timeline variants (dots, numbered, cards, minimal)
        GridBlock.tsx         # Telemetry grid
        TableBlock.tsx        # Table with rows
        ImageBlock.tsx        # Image split/cover
        ButtonBlock.tsx       # CTA button
        Effects.tsx           # Regmarks, bars, gradients, noise
        Frame.tsx             # Slide frame with safe zones
      typography.ts           # Font loading, measurement helpers
      images.ts               # Image filters, positioning
      index.ts
```

---

## Phase 1: Design System Foundation

### 1.1 Core Types (`packages/design-system/src/types.ts`)

```typescript
// ─── Color System ───

export interface ColorPalette {
  background: string;       // Slide background
  surface: string;          // Card/panel background
  text: string;             // Primary text
  textSecondary: string;    // Secondary/muted text
  accent: string;           // Brand accent color
  accentMuted: string;      // Accent with lower opacity
  border: string;           // Borders, dividers
  regMark: string;          // Registration mark color
}

// ─── Typography System ───

export interface TypographyConfig {
  fontSerif: string;        // Headline serif font
  fontSans: string;         // Body/UI sans font
  fontMono: string;         // Code/label mono font
  headlineWeight: number;
  headlineStyle: 'normal' | 'italic';
  bodyWeight: number;
  labelWeight: number;
  letterSpacing: {
    headline: string;
    body: string;
    label: string;
  };
}

// ─── Effects System ───

export interface EffectsConfig {
  regMarks?: {
    color: string;
    size: number;
    inset: number;
  };
  headerBar?: {
    height: number;
    color: string;
  };
  gradient?: {
    direction: string;
    stops: Array<{ color: string; offset: number }>;
  };
  noise?: {
    opacity: number;
    blend: string;
  };
  glass?: {
    blur: number;
    opacity: number;
    border: string;
  };
}

// ─── Slide Layout Config ───

export interface SlideLayoutConfig {
  variant?: string;         // Which visual variant to use
  arrangement?: 'stack' | 'split' | 'grid' | 'overlay';
  alignment?: 'left' | 'center' | 'right';
  spacing?: 'compact' | 'default' | 'relaxed' | 'airy';
  elements?: Record<string, Partial<ElementStyle>>;
  effects?: EffectsConfig;
}

// ─── Template Config ───

export interface TemplateConfig {
  id: string;
  name: string;
  theme: {
    colors: ColorPalette;
    typography: TypographyConfig;
    effects: EffectsConfig;
  };
  slideLayouts: Record<string, SlideLayoutConfig>;
  customRenderers?: Record<string, React.FC<any>>;
}

// ─── Platform Config ───

export interface PlatformConfig {
  id: string;
  name: string;
  width: number;
  height: number;
  safeZone: {
    top: number;
    bottom: number;
    left: number;
    right: number;
  };
  fontScale: number;
  maxElements: number;
  spacing: 'compact' | 'default' | 'relaxed';
}
```

### 1.2 Design Tokens (`packages/design-system/src/tokens.ts`)

```typescript
export const spacing = {
  xs: 8,
  sm: 12,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
  xxxl: 64,
  giant: 80,
  huge: 96,
} as const;

export const fontSizes = {
  // Headline breakpoints (by character count)
  headline: [
    { maxChars: 15, size: 120, lineHeight: 0.95 },
    { maxChars: 30, size: 96,  lineHeight: 1.0 },
    { maxChars: 50, size: 72,  lineHeight: 1.1 },
    { maxChars: 60, size: 60,  lineHeight: 1.15 },
  ],
  // Body breakpoints (by character count)
  body: [
    { maxChars: 80,  size: 28, lineHeight: 1.5 },
    { maxChars: 150, size: 24, lineHeight: 1.5 },
    { maxChars: 250, size: 20, lineHeight: 1.5 },
    { maxChars: 400, size: 18, lineHeight: 1.5 },
  ],
  // Label (fixed, always readable)
  label: 20,
  // Stat value breakpoints (by digit count)
  stat: [
    { maxDigits: 4, size: 64, lineHeight: 1.0 },
    { maxDigits: 6, size: 56, lineHeight: 1.0 },
    { maxDigits: 8, size: 48, lineHeight: 1.0 },
  ],
} as const;

export const breakpoints = {
  timeline: [
    { maxItems: 3, gap: 40, variant: 'spacious' },
    { maxItems: 5, gap: 24, variant: 'default' },
    { maxItems: 7, gap: 16, variant: 'compact' },
    { maxItems: 8, gap: 12, variant: 'minimal' },
  ],
  sequence: [
    { maxItems: 4, gap: 32, variant: 'spacious' },
    { maxItems: 6, gap: 20, variant: 'default' },
    { maxItems: 8, gap: 12, variant: 'compact' },
  ],
  telemetry: [
    { maxItems: 2, columns: 2, gap: 40 },
    { maxItems: 4, columns: 2, gap: 32 },
    { maxItems: 6, columns: 3, gap: 24 },
    { maxItems: 8, columns: 3, gap: 16 },
  ],
  table: [
    { maxRows: 3, gap: 20, fontSize: 22 },
    { maxRows: 5, gap: 16, fontSize: 20 },
    { maxRows: 8, gap: 12, fontSize: 18 },
  ],
} as const;
```

### 1.3 Platform Configs (`packages/design-system/src/platforms.ts`)

```typescript
export const platforms: Record<string, PlatformConfig> = {
  'instagram-feed': {
    id: 'instagram-feed',
    name: 'Instagram Feed',
    width: 1080,
    height: 1350,
    safeZone: { top: 110, bottom: 110, left: 80, right: 80 },
    fontScale: 1.0,
    maxElements: 8,
    spacing: 'default',
  },
  'instagram-stories': {
    id: 'instagram-stories',
    name: 'Instagram Stories',
    width: 1080,
    height: 1920,
    safeZone: { top: 120, bottom: 200, left: 40, right: 40 },
    fontScale: 1.1,
    maxElements: 10,
    spacing: 'default',
  },
  'linkedin': {
    id: 'linkedin',
    name: 'LinkedIn',
    width: 1200,
    height: 627,
    safeZone: { top: 30, bottom: 30, left: 30, right: 30 },
    fontScale: 0.85,
    maxElements: 4,
    spacing: 'compact',
  },
  'facebook': {
    id: 'facebook',
    name: 'Facebook',
    width: 1200,
    height: 630,
    safeZone: { top: 30, bottom: 30, left: 30, right: 30 },
    fontScale: 0.85,
    maxElements: 4,
    spacing: 'compact',
  },
};
```

---

## Phase 2: Layout Engine

### 2.1 Layout Element Types (`packages/layout-engine/src/types.ts`)

```typescript
export interface LayoutElement {
  id: string;
  role: 'headline' | 'subheadline' | 'body' | 'label' | 'stat-value'
      | 'stat-label' | 'event-title' | 'event-desc' | 'event-date'
      | 'quote-text' | 'quote-author' | 'button' | 'image' | 'grid'
      | 'timeline' | 'table' | 'cell';
  content: string | ReactNode;
  constraints: {
    width: { min: number; max: number | 'container' };
    height: { min: number; max: number | 'container' };
    alignment: 'left' | 'center' | 'right';
    grow: number;
    shrink: number;
  };
  style: {
    fontFamily: string;
    fontWeight: number;
    fontSize: number;
    lineHeight: number;
    color: string;
    letterSpacing?: string;
    textTransform?: string;
    fontStyle?: string;
  };
  measured?: {
    width: number;
    height: number;
  };
}

export interface PositionedElement extends LayoutElement {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface LayoutResult {
  elements: PositionedElement[];
  overflow: boolean;
  scaleFactor: number;
}

export interface Canvas {
  width: number;
  height: number;
}

export interface SafeZone {
  top: number;
  bottom: number;
  left: number;
  right: number;
}
```

### 2.2 Layout Solver (`packages/layout-engine/src/solver.ts`)

```typescript
export function solveLayout(
  elements: LayoutElement[],
  canvas: Canvas,
  safeZone: SafeZone,
  options?: {
    verticalAlignment?: 'top' | 'center' | 'bottom';
    gap?: number;
  }
): LayoutResult {
  const availableWidth = canvas.width - safeZone.left - safeZone.right;
  const availableHeight = canvas.height - safeZone.top - safeZone.bottom;
  const gap = options?.gap ?? 24;
  const verticalAlignment = options?.verticalAlignment ?? 'center';

  // Phase 1: Measure all elements
  const measured = measureElements(elements, availableWidth);

  // Phase 2: Calculate total height needed
  const totalContentHeight = measured.reduce((sum, el) => sum + el.measured!.height, 0);
  const totalGaps = (measured.length - 1) * gap;
  const totalNeeded = totalContentHeight + totalGaps;

  // Phase 3: Handle overflow
  if (totalNeeded > availableHeight) {
    const scaleFactor = findShrinkFactor(measured, availableHeight, gap);
    const scaled = measured.map(el => scaleElement(el, scaleFactor));
    return {
      elements: positionElements(scaled, availableWidth, availableHeight, safeZone, gap, verticalAlignment),
      overflow: true,
      scaleFactor,
    };
  }

  // Phase 4: Position with alignment
  return {
    elements: positionElements(measured, availableWidth, availableHeight, safeZone, gap, verticalAlignment),
    overflow: false,
    scaleFactor: 1.0,
  };
}

function findShrinkFactor(
  elements: LayoutElement[],
  availableHeight: number,
  gap: number
): number {
  let lo = 0.5;
  let hi = 1.0;

  for (let i = 0; i < 10; i++) {
    const mid = (lo + hi) / 2;
    const totalHeight = elements.reduce((sum, el) => {
      return sum + (el.measured!.height * mid);
    }, 0) + (elements.length - 1) * gap;

    if (totalHeight <= availableHeight) {
      lo = mid;
    } else {
      hi = mid;
    }
  }

  return lo;
}

function positionElements(
  elements: LayoutElement[],
  availableWidth: number,
  availableHeight: number,
  safeZone: SafeZone,
  gap: number,
  verticalAlignment: 'top' | 'center' | 'bottom'
): PositionedElement[] {
  const totalHeight = elements.reduce((sum, el) => sum + el.measured!.height, 0)
    + (elements.length - 1) * gap;

  let startY: number;
  switch (verticalAlignment) {
    case 'top':
      startY = 0;
      break;
    case 'bottom':
      startY = availableHeight - totalHeight;
      break;
    case 'center':
    default:
      startY = (availableHeight - totalHeight) / 2;
      break;
  }

  let currentY = startY;
  return elements.map(el => {
    const x = safeZone.left + getHorizontalAlignment(el, availableWidth, el.measured!.width);
    const positioned: PositionedElement = {
      ...el,
      x,
      y: safeZone.top + currentY,
      width: el.measured!.width,
      height: el.measured!.height,
    };
    currentY += el.measured!.height + gap;
    return positioned;
  });
}
```

### 2.3 Text Fitter (`packages/layout-engine/src/text-fitter.ts`)

```typescript
export function fitTextToContainer(
  text: string,
  constraints: {
    minFontSize: number;
    maxFontSize: number;
    maxWidth: number;
    maxLines?: number;
    fontFamily: string;
    fontWeight: number;
  }
): { fontSize: number; lineHeight: number; width: number; height: number } {
  let lo = constraints.minFontSize;
  let hi = constraints.maxFontSize;

  for (let i = 0; i < 10; i++) {
    const mid = Math.floor((lo + hi) / 2);
    const measurement = measureText(text, mid, constraints);

    if (measurement.fits) {
      lo = mid;
    } else {
      hi = mid;
    }
  }

  return measureText(text, lo, constraints);
}

function measureText(
  text: string,
  fontSize: number,
  constraints: { maxWidth: number; maxLines?: number; fontFamily: string; fontWeight: number }
): { fontSize: number; lineHeight: number; width: number; height: number; fits: boolean } {
  // Use canvas measurement (server-side, no browser needed)
  const canvas = { width: 0, height: 0 }; // placeholder
  const lineHeight = fontSize * 1.2;

  if (constraints.maxLines) {
    // Measure wrapped text
    const words = text.split(' ');
    const lines: string[] = [''];
    for (const word of words) {
      const test = lines[lines.length - 1] + (lines[lines.length - 1] ? ' ' : '') + word;
      // Approximate measurement: avg char width = fontSize * 0.6
      const approxWidth = test.length * fontSize * 0.6;
      if (approxWidth > constraints.maxWidth) {
        lines.push(word);
      } else {
        lines[lines.length - 1] = test;
      }
    }
    return {
      fontSize,
      lineHeight,
      width: Math.min(Math.max(...lines.map(l => l.length * fontSize * 0.6)), constraints.maxWidth),
      height: lines.length * lineHeight,
      fits: lines.length <= constraints.maxLines,
    };
  } else {
    // Single line
    const width = text.length * fontSize * 0.6;
    return {
      fontSize,
      lineHeight,
      width,
      height: lineHeight,
      fits: width <= constraints.maxWidth,
    };
  }
}
```

### 2.4 Overflow Handler (`packages/layout-engine/src/overflow.ts`)

```typescript
export interface ShrinkStrategy {
  elementPriority: string[];   // roles in shrink order
  minScale: Record<string, number>;
  shrinkGaps: boolean;
  minGapScale: number;
}

export const defaultShrinkStrategy: ShrinkStrategy = {
  elementPriority: [
    'body',
    'event-desc',
    'stat-label',
    'label',
    'event-title',
    'stat-value',
    'subheadline',
    'headline',
    'button',
  ],
  minScale: {
    body: 0.6,
    'event-desc': 0.7,
    headline: 0.8,
    button: 0.85,
  },
  shrinkGaps: true,
  minGapScale: 0.5,
};

export function applyOverflowStrategy(
  elements: LayoutElement[],
  availableHeight: number,
  gap: number,
  strategy: ShrinkStrategy = defaultShrinkStrategy
): { elements: LayoutElement[]; gap: number; scaleFactor: number } {
  const totalHeight = elements.reduce((sum, el) => sum + el.measured!.height, 0)
    + (elements.length - 1) * gap;

  if (totalHeight <= availableHeight) {
    return { elements, gap, scaleFactor: 1.0 };
  }

  const overflow = totalHeight - availableHeight;
  const totalElementHeight = elements.reduce((sum, el) => sum + el.measured!.height, 0);

  // Calculate shrink factor for elements
  let elementShrink = 1.0;
  if (strategy.shrinkGaps) {
    // Shrink gaps first (more aggressive)
    const newGap = Math.max(gap * strategy.minGapScale, gap - (overflow / elements.length));
    gap = newGap;
  }

  // Binary search for element shrink factor
  let lo = 0.5;
  let hi = 1.0;
  for (let i = 0; i < 10; i++) {
    const mid = (lo + hi) / 2;
    const total = elements.reduce((sum, el) => {
      const minScale = strategy.minScale[el.role] ?? 0.6;
      const scale = Math.max(minScale, mid);
      return sum + (el.measured!.height * scale);
    }, 0) + (elements.length - 1) * gap;

    if (total <= availableHeight) {
      lo = mid;
    } else {
      hi = mid;
    }
  }

  elementShrink = lo;

  // Apply shrink to elements
  const shrunkElements = elements.map(el => {
    const minScale = strategy.minScale[el.role] ?? 0.6;
    const scale = Math.max(minScale, elementShrink);
    return scaleElement(el, scale);
  });

  return { elements: shrunkElements, gap, scaleFactor: elementShrink };
}

function scaleElement(element: LayoutElement, scale: number): LayoutElement {
  return {
    ...element,
    style: {
      ...element.style,
      fontSize: Math.floor(element.style.fontSize * scale),
    },
    measured: element.measured ? {
      width: element.measured.width,
      height: element.measured.height * scale,
    } : undefined,
  };
}
```

---

## Phase 3: Slide Type Library

### 3.1 Slide Type Registry (`packages/slide-types/src/registry.ts`)

```typescript
export interface SlideTypeConfig {
  name: string;
  fields: FieldConfig[];
  layout: SlideTypeLayout;
  breakpoints?: BreakpointConfig[];
}

export interface FieldConfig {
  name: string;
  role: string;
  required: boolean;
  maxSize?: number;
  minItems?: number;
  maxItems?: number;
}

export interface SlideTypeLayout {
  arrangement: 'stack' | 'split' | 'grid' | 'overlay';
  alignment: 'left' | 'center' | 'right';
  verticalAlignment: 'top' | 'center' | 'bottom';
  spacing: 'compact' | 'default' | 'relaxed';
}

export interface BreakpointConfig {
  condition: (slide: any) => boolean;
  variant: string;
  overrides: Partial<SlideTypeLayout>;
}

export const slideTypes: Record<string, SlideTypeConfig> = {
  cover: {
    name: 'cover',
    fields: [
      { name: 'headline', role: 'headline', required: true, maxSize: 60 },
      { name: 'subheadline', role: 'subheadline', required: false, maxSize: 120 },
      { name: 'tag', role: 'label', required: true, maxSize: 30 },
    ],
    layout: {
      arrangement: 'stack',
      alignment: 'center',
      verticalAlignment: 'center',
      spacing: 'relaxed',
    },
  },

  timeline: {
    name: 'timeline',
    fields: [
      { name: 'headline', role: 'headline', required: true, maxSize: 60 },
      { name: 'events', role: 'timeline', required: true, minItems: 2, maxItems: 8 },
    ],
    layout: {
      arrangement: 'stack',
      alignment: 'left',
      verticalAlignment: 'center',
      spacing: 'default',
    },
    breakpoints: [
      {
        condition: (slide) => slide.events.length <= 3,
        variant: 'spacious',
        overrides: { spacing: 'relaxed' },
      },
      {
        condition: (slide) => slide.events.length <= 5,
        variant: 'default',
        overrides: { spacing: 'default' },
      },
      {
        condition: (slide) => slide.events.length <= 7,
        variant: 'compact',
        overrides: { spacing: 'compact' },
      },
      {
        condition: (slide) => slide.events.length >= 8,
        variant: 'minimal',
        overrides: { spacing: 'compact' },
      },
    ],
  },

  table: {
    name: 'table',
    fields: [
      { name: 'headline', role: 'headline', required: true, maxSize: 60 },
      { name: 'headers', role: 'table-header', required: true, maxItems: 5 },
      { name: 'rows', role: 'table-row', required: true, minItems: 1, maxItems: 8 },
    ],
    layout: {
      arrangement: 'stack',
      alignment: 'left',
      verticalAlignment: 'top',
      spacing: 'default',
    },
    breakpoints: [
      {
        condition: (slide) => slide.rows.length <= 3,
        variant: 'spacious',
        overrides: { spacing: 'relaxed' },
      },
      {
        condition: (slide) => slide.rows.length <= 5,
        variant: 'default',
        overrides: { spacing: 'default' },
      },
      {
        condition: (slide) => slide.rows.length >= 6,
        variant: 'compact',
        overrides: { spacing: 'compact' },
      },
    ],
  },

  // ... (definition, dichotomy, quote, sequence, telemetry, image-split, image-cover, cta)
};
```

### 3.2 Individual Slide Type Examples

**Timeline (`packages/slide-types/src/timeline.ts`)**

```typescript
import { LayoutElement } from '@loopreel/layout-engine';

export function buildTimelineElements(slide: TimelineSlideData, theme: ThemeConfig): LayoutElement[] {
  const elements: LayoutElement[] = [];

  // Headline
  elements.push({
    id: 'headline',
    role: 'headline',
    content: slide.headline,
    constraints: {
      width: { min: 400, max: 'container' },
      height: { min: 40, max: 120 },
      alignment: 'left',
      grow: 0,
      shrink: 0.8,
    },
    style: {
      fontFamily: theme.typography.fontSans,
      fontWeight: theme.typography.headlineWeight,
      fontSize: estimateHeadlineSize(slide.headline),
      lineHeight: 1.1,
      color: theme.colors.text,
      letterSpacing: theme.typography.letterSpacing.headline,
    },
  });

  // Events
  slide.events.forEach((event, i) => {
    // Date
    elements.push({
      id: `event-date-${i}`,
      role: 'event-date',
      content: event.date,
      constraints: {
        width: { min: 80, max: 200 },
        height: { min: 20, max: 30 },
        alignment: 'left',
        grow: 0,
        shrink: 0.7,
      },
      style: {
        fontFamily: theme.typography.fontMono,
        fontWeight: 500,
        fontSize: 18,
        lineHeight: 1.2,
        color: theme.colors.accent,
        letterSpacing: '0.1em',
      },
    });

    // Title
    elements.push({
      id: `event-title-${i}`,
      role: 'event-title',
      content: event.title,
      constraints: {
        width: { min: 200, max: 'container' },
        height: { min: 24, max: 40 },
        alignment: 'left',
        grow: 0,
        shrink: 0.75,
      },
      style: {
        fontFamily: theme.typography.fontSans,
        fontWeight: 600,
        fontSize: 22,
        lineHeight: 1.2,
        color: theme.colors.text,
      },
    });

    // Description
    if (event.desc) {
      elements.push({
        id: `event-desc-${i}`,
        role: 'event-desc',
        content: event.desc,
        constraints: {
          width: { min: 200, max: 'container' },
          height: { min: 20, max: 60 },
          alignment: 'left',
          grow: 0,
          shrink: 0.7,
        },
        style: {
          fontFamily: theme.typography.fontSans,
          fontWeight: 300,
          fontSize: 18,
          lineHeight: 1.4,
          color: theme.colors.textSecondary,
        },
      });
    }
  });

  return elements;
}
```

**Telemetry (`packages/slide-types/src/telemetry.ts`)**

```typescript
export function buildTelemetryElements(slide: TelemetrySlideData, theme: ThemeConfig): LayoutElement[] {
  const elements: LayoutElement[] = [];

  // Headline
  elements.push({
    id: 'headline',
    role: 'headline',
    content: slide.headline,
    constraints: {
      width: { min: 400, max: 'container' },
      height: { min: 40, max: 100 },
      alignment: 'center',
      grow: 0,
      shrink: 0.8,
    },
    style: {
      fontFamily: theme.typography.fontSans,
      fontWeight: theme.typography.headlineWeight,
      fontSize: estimateHeadlineSize(slide.headline),
      lineHeight: 1.1,
      color: theme.colors.text,
      letterSpacing: theme.typography.letterSpacing.headline,
    },
  });

  // Stats grid
  const statCount = slide.stats.length;
  const maxValueLength = Math.max(...slide.stats.map(s => s.value.length));
  const valueFontSize = maxValueLength > 6 ? 48 : maxValueLength > 4 ? 56 : 64;

  slide.stats.forEach((stat, i) => {
    elements.push({
      id: `stat-value-${i}`,
      role: 'stat-value',
      content: stat.value,
      constraints: {
        width: { min: 100, max: 'container' },
        height: { min: 40, max: 80 },
        alignment: 'center',
        grow: 1,
        shrink: 0.85,
      },
      style: {
        fontFamily: theme.typography.fontSans,
        fontWeight: theme.typography.headlineWeight,
        fontSize: valueFontSize,
        lineHeight: 1.0,
        color: theme.colors.accent,
      },
    });

    elements.push({
      id: `stat-label-${i}`,
      role: 'stat-label',
      content: stat.label,
      constraints: {
        width: { min: 100, max: 'container' },
        height: { min: 16, max: 24 },
        alignment: 'center',
        grow: 0,
        shrink: 0.6,
      },
      style: {
        fontFamily: theme.typography.fontSans,
        fontWeight: 400,
        fontSize: 18,
        lineHeight: 1.2,
        color: theme.colors.textSecondary,
        letterSpacing: '0.05em',
        textTransform: 'uppercase',
      },
    });
  });

  return elements;
}
```

---

## Phase 4: Renderer

### 4.1 Main Renderer (`packages/renderer/src/renderer.tsx`)

```typescript
import React from 'react';
import { solveLayout, LayoutElement } from '@loopreel/layout-engine';
import { TemplateConfig } from '@loopreel/design-system';
import { buildElementsForSlideType } from '@loopreel/slide-types';
import { SlideCanvas } from './components/SlideCanvas';
import { TextBlock } from './components/TextBlock';
import { TimelineBlock } from './components/TimelineBlock';
import { GridBlock } from './components/GridBlock';
import { TableBlock } from './components/TableBlock';
import { ImageBlock } from './components/ImageBlock';
import { ButtonBlock } from './components/ButtonBlock';
import { Effects } from './components/Effects';

interface RenderSlideOptions {
  slide: any;
  template: TemplateConfig;
  platform: PlatformConfig;
  slideIndex: number;
  slideCount: number;
}

export function renderSlide(options: RenderSlideOptions): React.ReactElement {
  const { slide, template, platform, slideIndex, slideCount } = options;

  // 1. Build layout elements from slide data
  const elements = buildElementsForSlideType(slide.type, slide, template.theme);

  // 2. Apply platform constraints
  const platformElements = applyPlatformConstraints(elements, platform);

  // 3. Solve layout
  const layoutConfig = template.slideLayouts[slide.type] ?? {};
  const result = solveLayout(platformElements, platform.canvas, platform.safeZone, {
    verticalAlignment: layoutConfig.alignment === 'center' ? 'center' : 'top',
    gap: getSpacingValue(layoutConfig.spacing ?? 'default'),
  });

  // 4. Check for custom renderer
  if (template.customRenderers?.[slide.type]) {
    const CustomRenderer = template.customRenderers[slide.type];
    return <CustomRenderer slide={slide} layout={result} theme={template.theme} />;
  }

  // 5. Render to React
  return (
    <SlideCanvas
      width={platform.width}
      height={platform.height}
      background={template.theme.colors.background}
    >
      <Effects config={template.theme.effects} />

      {/* Header bar if configured */}
      {template.theme.effects.headerBar && (
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: template.theme.effects.headerBar.height,
          background: template.theme.effects.headerBar.color,
        }} />
      )}

      {/* Render each positioned element */}
      {result.elements.map(el => renderElement(el, template.theme, slide.type))}

      {/* Registration marks */}
      {template.theme.effects.regMarks && (
        <Effects.RegMarks
          color={template.theme.effects.regMarks.color}
          size={template.theme.effects.regMarks.size}
          inset={template.theme.effects.regMarks.inset}
        />
      )}

      {/* Micro header */}
      {slide.tag && (
        <Effects.MicroHeader
          tag={slide.tag}
          theme={template.theme}
        />
      )}

      {/* Micro footer */}
      <Effects.MicroFooter
        left={slide.footerLeft}
        right={slide.footerRight}
        slideIndex={slideIndex}
        slideCount={slideCount}
        theme={template.theme}
      />
    </SlideCanvas>
  );
}

function renderElement(
  element: PositionedElement,
  theme: ThemeConfig,
  slideType: string
): React.ReactElement {
  switch (element.role) {
    case 'headline':
    case 'subheadline':
    case 'body':
    case 'label':
    case 'event-title':
    case 'event-desc':
    case 'event-date':
    case 'stat-value':
    case 'stat-label':
    case 'quote-text':
    case 'quote-author':
      return <TextBlock key={element.id} element={element} />;

    case 'button':
      return <ButtonBlock key={element.id} element={element} theme={theme} />;

    case 'timeline':
      return <TimelineBlock key={element.id} element={element} theme={theme} />;

    case 'grid':
      return <GridBlock key={element.id} element={element} theme={theme} />;

    case 'table':
      return <TableBlock key={element.id} element={element} theme={theme} />;

    case 'image':
      return <ImageBlock key={element.id} element={element} theme={theme} />;

    default:
      return <TextBlock key={element.id} element={element} />;
  }
}
```

### 4.2 Text Block Component (`packages/renderer/src/components/TextBlock.tsx`)

```typescript
import React from 'react';
import { PositionedElement } from '@loopreel/layout-engine';

export function TextBlock({ element }: { element: PositionedElement }) {
  const Tag = getTagForRole(element.role);

  return (
    <Tag
      style={{
        position: 'absolute',
        left: element.x,
        top: element.y,
        width: element.width,
        height: element.height,
        fontFamily: element.style.fontFamily,
        fontWeight: element.style.fontWeight,
        fontSize: element.style.fontSize,
        lineHeight: element.style.lineHeight,
        color: element.style.color,
        letterSpacing: element.style.letterSpacing,
        textTransform: element.style.textTransform as any,
        fontStyle: element.style.fontStyle,
        margin: 0,
        overflow: 'hidden',
        wordBreak: 'break-word',
      }}
    >
      {element.content}
    </Tag>
  );
}

function getTagForRole(role: string): keyof JSX.IntrinsicElements {
  switch (role) {
    case 'headline': return 'h1';
    case 'subheadline': return 'h2';
    case 'body': return 'p';
    case 'label': return 'span';
    case 'event-title': return 'h3';
    case 'event-desc': return 'p';
    case 'stat-value': return 'span';
    case 'stat-label': return 'span';
    default: return 'div';
  }
}
```

### 4.3 Timeline Block Component (`packages/renderer/src/components/TimelineBlock.tsx`)

```typescript
import React from 'react';
import { PositionedElement } from '@loopreel/layout-engine';
import { ThemeConfig } from '@loopreel/design-system';

interface TimelineProps {
  elements: PositionedElement[];
  theme: ThemeConfig;
  variant: 'dots' | 'numbered' | 'cards' | 'minimal';
}

export function TimelineBlock({ elements, theme, variant }: TimelineProps) {
  const headline = elements.find(el => el.role === 'headline');
  const events = groupEvents(elements);

  return (
    <>
      {/* Headline */}
      {headline && <TextBlock element={headline} />}

      {/* Timeline events */}
      <div style={{
        position: 'absolute',
        left: headline?.x ?? 80,
        top: (headline?.y ?? 0) + (headline?.height ?? 0) + 24,
        width: headline?.width ?? 920,
      }}>
        {events.map((event, i) => (
          <TimelineEvent
            key={i}
            event={event}
            index={i}
            variant={variant}
            theme={theme}
          />
        ))}
      </div>
    </>
  );
}

function TimelineEvent({
  event,
  index,
  variant,
  theme,
}: {
  event: TimelineEvent;
  index: number;
  variant: string;
  theme: ThemeConfig;
}) {
  switch (variant) {
    case 'dots':
      return (
        <div style={{ display: 'flex', gap: 16, marginBottom: 24 }}>
          <div style={{
            width: 12,
            height: 12,
            borderRadius: '50%',
            background: theme.colors.accent,
            marginTop: 6,
            flexShrink: 0,
          }} />
          <div>
            <div style={{
              fontFamily: theme.typography.fontMono,
              fontSize: 16,
              color: theme.colors.accent,
              marginBottom: 4,
            }}>
              {event.date}
            </div>
            <div style={{
              fontFamily: theme.typography.fontSans,
              fontSize: 22,
              fontWeight: 600,
              color: theme.colors.text,
              marginBottom: 4,
            }}>
              {event.title}
            </div>
            {event.desc && (
              <div style={{
                fontFamily: theme.typography.fontSans,
                fontSize: 18,
                fontWeight: 300,
                color: theme.colors.textSecondary,
                lineHeight: 1.4,
              }}>
                {event.desc}
              </div>
            )}
          </div>
        </div>
      );

    case 'numbered':
      return (
        <div style={{ display: 'flex', gap: 16, marginBottom: 20 }}>
          <div style={{
            fontFamily: theme.typography.fontSans,
            fontSize: 32,
            fontWeight: 900,
            color: theme.colors.accent,
            width: 48,
            textAlign: 'center',
          }}>
            {String(index + 1).padStart(2, '0')}
          </div>
          <div>
            <div style={{
              fontFamily: theme.typography.fontMono,
              fontSize: 14,
              color: theme.colors.textSecondary,
              marginBottom: 4,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
            }}>
              {event.date}
            </div>
            <div style={{
              fontFamily: theme.typography.fontSans,
              fontSize: 22,
              fontWeight: 700,
              color: theme.colors.text,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
            }}>
              {event.title}
            </div>
          </div>
        </div>
      );

    // ... (cards, minimal variants)
  }
}
```

---

## Phase 5: Template Configurations

### 5.1 Void Editorial (`packages/templates/src/configs/void-editorial.ts`)

```typescript
import { TemplateConfig } from '@loopreel/design-system';

export const voidEditorial: TemplateConfig = {
  id: 'void-editorial',
  name: 'Void Editorial',
  theme: {
    colors: {
      background: '#050505',
      surface: '#1A1A1A',
      text: '#F4F4F0',
      textSecondary: 'rgba(244,244,240,0.6)',
      accent: '#E63946',
      accentMuted: 'rgba(230,57,70,0.3)',
      border: 'rgba(244,244,240,0.15)',
      regMark: 'rgba(244,244,240,0.15)',
    },
    typography: {
      fontSerif: 'Cormorant Garamond',
      fontSans: 'Manrope',
      fontMono: 'Space Mono',
      headlineWeight: 300,
      headlineStyle: 'italic',
      bodyWeight: 300,
      labelWeight: 400,
      letterSpacing: {
        headline: '-0.02em',
        body: '0',
        label: '0.18em',
      },
    },
    effects: {
      regMarks: {
        color: 'rgba(244,244,240,0.15)',
        size: 24,
        inset: 20,
      },
    },
  },
  slideLayouts: {
    cover: {
      variant: 'hero',
      arrangement: 'stack',
      alignment: 'center',
      verticalAlignment: 'center',
      spacing: 'relaxed',
    },
    timeline: {
      variant: 'dots',
      arrangement: 'stack',
      alignment: 'left',
      verticalAlignment: 'center',
      spacing: 'default',
    },
    table: {
      variant: 'striped',
      arrangement: 'stack',
      alignment: 'left',
      verticalAlignment: 'top',
      spacing: 'default',
    },
    cta: {
      arrangement: 'stack',
      alignment: 'center',
      verticalAlignment: 'center',
      spacing: 'relaxed',
    },
  },
};
```

### 5.2 Industrial Brutal (`packages/templates/src/configs/industrial-brutal.ts`)

```typescript
import { TemplateConfig } from '@loopreel/design-system';

export const industrialBrutal: TemplateConfig = {
  id: 'industrial-brutal',
  name: 'Industrial Brutal',
  theme: {
    colors: {
      background: '#1A1A1A',
      surface: '#2A2A2A',
      text: '#E0E0E0',
      textSecondary: 'rgba(224,224,224,0.6)',
      accent: '#F77F00',
      accentMuted: 'rgba(247,127,0,0.3)',
      border: 'rgba(224,224,224,0.15)',
      regMark: 'rgba(224,224,224,0.25)',
    },
    typography: {
      fontSerif: 'Manrope',
      fontSans: 'Manrope',
      fontMono: 'Space Mono',
      headlineWeight: 900,
      headlineStyle: 'normal',
      bodyWeight: 300,
      labelWeight: 700,
      letterSpacing: {
        headline: '-0.02em',
        body: '0',
        label: '0.2em',
      },
    },
    effects: {
      headerBar: {
        height: 4,
        color: '#F77F00',
      },
      regMarks: {
        color: 'rgba(224,224,224,0.25)',
        size: 24,
        inset: 20,
      },
    },
  },
  slideLayouts: {
    cover: {
      variant: 'centered',
      arrangement: 'stack',
      alignment: 'center',
      verticalAlignment: 'center',
      spacing: 'default',
    },
    timeline: {
      variant: 'numbered',
      arrangement: 'stack',
      alignment: 'left',
      verticalAlignment: 'center',
      spacing: 'compact',
    },
    table: {
      variant: 'bordered',
      arrangement: 'stack',
      alignment: 'left',
      verticalAlignment: 'top',
      spacing: 'compact',
    },
    cta: {
      arrangement: 'stack',
      alignment: 'center',
      verticalAlignment: 'center',
      spacing: 'default',
    },
  },
};
```

---

## Phase 6: Migration

### 6.1 What Gets Deleted

| File | Lines | Replacement |
|------|-------|-------------|
| `packages/templates/src/void-editorial/index.tsx` | 824 | `packages/renderer/` |
| `packages/templates/src/archive-paper/index.tsx` | ~800 | `packages/renderer/` |
| `packages/templates/src/industrial-brutal/index.tsx` | 855 | `packages/renderer/` |
| `packages/templates/src/custom-brand/index.tsx` | ~800 | `packages/renderer/` |
| `packages/templates/src/editorial-runway/index.tsx` | ~600 | `packages/renderer/` |
| `packages/templates/src/protocol-001/index.tsx` | ~400 | `packages/renderer/` |
| `packages/templates/src/archive/index.tsx` | ~700 | `packages/renderer/` |
| `packages/templates/src/engine/smart-fit.js` | 444 | `packages/layout-engine/` |
| `packages/templates/src/engine/smart-components.tsx` | 374 | `packages/renderer/components/` |
| `packages/templates/src/engine/components.tsx` | 267 | `packages/renderer/components/` |
| `packages/templates/src/engine/typography.ts` | 75 | `packages/layout-engine/` |
| `packages/templates/src/engine/layout.ts` | 135 | `packages/design-system/` |
| **Total** | **~6,300** | |

### 6.2 What Gets Built

| File | Lines | Purpose |
|------|-------|---------|
| `packages/design-system/src/types.ts` | ~200 | Core type definitions |
| `packages/design-system/src/tokens.ts` | ~150 | Design tokens |
| `packages/design-system/src/platforms.ts` | ~80 | Platform configs |
| `packages/layout-engine/src/solver.ts` | ~300 | Layout solver |
| `packages/layout-engine/src/text-fitter.ts` | ~150 | Text fitting |
| `packages/layout-engine/src/overflow.ts` | ~200 | Overflow handling |
| `packages/slide-types/src/*.ts` (11 files) | ~400 | Slide type definitions |
| `packages/renderer/src/renderer.tsx` | ~300 | Main renderer |
| `packages/renderer/src/components/*.tsx` (8 files) | ~600 | Visual components |
| `packages/templates/src/configs/*.ts` (7 files) | ~350 | Template configs |
| **Total** | **~2,730** | |

### 6.3 Files That Stay (Modified)

| File | Change |
|------|--------|
| `apps/api/src/routes/render.ts` | Use new renderer instead of template registry |
| `apps/worker-render/src/index.ts` | Remove smart-fit wait, use server-side measurement |
| `apps/worker-structure/src/index.ts` | Update schema references |
| `packages/templates/src/registry.ts` | New registry pointing to configs + renderer |

---

## Phase 7: Implementation Order

### Week 1: Foundation
- [ ] Create `packages/design-system/` with types, tokens, platforms
- [ ] Create `packages/layout-engine/` with solver, text-fitter, overflow
- [ ] Write unit tests for layout engine

### Week 2: Slide Types + Renderer
- [ ] Create `packages/slide-types/` with all 11 types
- [ ] Create `packages/renderer/` with all components
- [ ] Write integration tests (slide data → PNG)

### Week 3: Templates + Migration
- [ ] Create template configs for all 7 templates
- [ ] Update API render route to use new renderer
- [ ] Update render worker to remove smart-fit dependency
- [ ] Verify all templates render correctly

### Week 4: Polish + Testing
- [ ] Test all templates × all platforms
- [ ] Performance optimization (render time)
- [ ] Update documentation
- [ ] Remove old template code

---

## Phase 8: Verification

### Test Matrix

| Template | Instagram Feed | Instagram Stories | LinkedIn | Facebook |
|----------|---------------|-------------------|----------|----------|
| void-editorial | ✓ | ✓ | ✓ | ✓ |
| archive-paper | ✓ | ✓ | ✓ | ✓ |
| industrial-brutal | ✓ | ✓ | ✓ | ✓ |
| custom-brand | ✓ | ✓ | ✓ | ✓ |
| editorial-runway | ✓ | ✓ | ✓ | ✓ |
| protocol-001 | ✓ | ✓ | ✓ | ✓ |
| archive | ✓ | ✓ | ✓ | ✓ |

### Content Variation Tests

- Short headline (5 chars) vs long headline (60 chars)
- 2 events vs 8 events (timeline)
- 2 stats vs 8 stats (telemetry)
- 1 row vs 8 rows (table)
- Short quote vs long quote
- No image vs with image (image-split, image-cover)

### Acceptance Criteria

1. All 7 templates render correctly on all 4 platforms
2. Text never overflows containers
3. Font sizes adapt to content length automatically
4. Layout adapts to element count (timeline, table, telemetry)
5. Adding a new template takes < 1 hour (config only, no JSX)
6. Render time < 5 seconds per slide (including Playwright)
7. No client-side JavaScript (smart-fit.js removed)

---

## Risk Mitigation

### Risk 1: Layout Engine Accuracy
- **Mitigation**: Two-pass approach (estimate + Playwright measure + refine)
- **Fallback**: Keep smart-fit.js as optional override for edge cases

### Risk 2: Template Uniqueness
- **Mitigation**: Rich variant system + composable effects
- **Escape hatch**: Custom renderers for templates that need unique layouts

### Risk 3: Migration Complexity
- **Mitigation**: Run old and new systems in parallel during transition
- **Rollback**: Keep old template code until new system is verified

### Risk 4: Performance
- **Mitigation**: Cache layout results for same slide type + template + platform
- **Fallback**: Reduce Playwright measurement passes if too slow

---

## Success Metrics

| Metric | Current | Target |
|--------|---------|--------|
| Lines of template code | ~6,300 | ~2,730 |
| Time to add new template | 2-3 days | 1 hour |
| Time to add new slide type | 1-2 days (edit all templates) | 2 hours (one definition) |
| Render time per slide | ~8 seconds | < 5 seconds |
| Platform support | 4 (manual adaptation) | 4 (automatic adaptation) |
| Template count | 7 | 7 (easy to add more) |

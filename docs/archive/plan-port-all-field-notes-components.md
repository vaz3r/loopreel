# Implementation Plan: Full Component Port of The Field Notes (17 Slide Types)

The initial implementation provided the core 5 layouts (`cover`, `sequence`, `telemetry`, `quote`, `cta`). However, the original reference [`packages/loop/design-references/The Field Notes.html`](../packages/loop/design-references/The%20Field%20Notes.html) defines a complete collection of **17 distinct slide types**, custom hand-drawn SVG primitives, and universal annotation mechanics (`scribble` with curved arrow, custom header `label`, tape headers, and bottom `note`).

This plan outlines the faithful, uncompromising port of **all 17 slide types** and design system elements into `the-field-notes` template.

---

## 1. Goal Description

Port all 17 slide types from `The Field Notes.html` with zero shortcuts, preserving exact typography, hand-drawn vector primitives, CSS variables, and layout aesthetics:
1. `cover`: Kicker, headline, subtitle, metadata tags, top washi-tape banner.
2. `statement`: Giant display statement with optional squiggle and note.
3. `list`: Numbered observation list with hand-drawn circled numbers and dashed dividers.
4. `specimen`: Field specimen definition card with washi tape, outline offset border, phonetic pronunciation, and handwritten "Found in" tag.
5. `measure`: Massive 400px headline statistic, handwritten rotated unit, custom tickmark ruler with label, title, and body.
6. `tally`: 2x2 grid or single-row metric cards with values, handwritten units, squiggles, and descriptions.
7. `route`: Process timeline with vertical dotted connector line, numbered waypoint nodes, and final red X-mark node.
8. `log`: Field session log with monospaced timestamp column, title, body, and handwritten `← here` indicator.
9. `compare`: Side-by-side contrast with hand-drawn wavy vertical divider SVG, strikethrough red items on the left, bold items on the right.
10. `table`: Field survey data table with monospaced headers, right-aligned numeric data, and double-underlined total row.
11. `chart`: Horizontal SVG bar chart with hand-drawn pencil/highlighter fills, value callouts, and dashed target benchmark line.
12. `map`: Visual journey map SVG with topographic contour loops, curved dashed bezier path, numbered nodes, compass rose, scale bar, and 2-column legend.
13. `quote`: Massive 260px opening quotation mark, italic serif text, handwritten author signature, and monospaced role.
14. `entry`: Field journal reflection with 4-line drop-cap first letter, handwritten date, and justified narrative prose.
15. `qa`: Q&A interview format with handwritten `Q.` and `A.` callouts and dashed separator.
16. `kit`: Checklist with hand-drawn checkable boxes (done checkmark, flag exclamation mark, open box, strikethrough text).
17. `cta`: Closing call-to-action with bookmark icon button, subtitle, and handwritten signature.

Universal mechanics supported on all slides:
- `scribble`: Handwritten margin note with curved directional arrow SVG.
- `label`: Header label override (e.g. "Specimen", "Survey", "Tally").
- `note`: Asterisk footnote at the bottom.

---

## 2. User Review Required

> [!NOTE]
> All 17 slide types will be directly supported by `TheFieldNotesContract` Zod schema and exported from `packages/loop/src/layouts/the-field-notes/`. Existing 5-type decks will remain 100% compatible.

> [!TIP]
> The automated visual audit suite will be expanded to render **all 17 slide types** to disk as high-resolution PNGs, giving you a complete visual gallery to inspect each slide layout.

---

## 3. Proposed Changes

```
packages/loop/src/layouts/the-field-notes/
├── brandkit.ts           (keep & maintain theme tokens: kraft, ledger, campfire)
├── frame.module.css      (add tape, ruler, specimen, compare, table, chart styles)
├── frame.tsx             (support top tape on cover, 9 punch holes, dynamic label override)
├── slides.tsx            (implement all 17 slide components + SVG primitives)
├── schema.ts             (Zod schemas for all 17 slide types in TheFieldNotesContract)
├── sample-slides.ts      (all 17 sample slides from The Field Notes.html)
├── layout.tsx            (register all 17 types in slides record)
└── index.ts              (clean exports)
```

---

### Component Implementation Details

#### [MODIFY] `packages/loop/src/layouts/the-field-notes/slides.tsx`
- Implement hand-drawn SVG primitives:
  - `Squiggle` (wavy divider)
  - `CircNumber` (handwritten circle badge)
  - `Arrow` (curved annotation arrow)
  - `XMark` (hand-drawn X end-node)
  - `Box` (hand-drawn checkbox with `done` and `flag` states)
  - `Compass` (nautical/field compass rose)
- Implement all 17 slide components:
  1. `Cover`
  2. `Statement`
  3. `List`
  4. `Specimen`
  5. `Measure`
  6. `Tally`
  7. `Route`
  8. `Log`
  9. `Compare`
  10. `Table`
  11. `Chart`
  12. `Map`
  13. `Quote`
  14. `Entry`
  15. `Qa`
  16. `Kit`
  17. `Cta`
- Wrap all slide outputs with common annotation container:
  - If `slide.scribble` is present, render `<div className={styles.scribble}><Arrow /><span>{slide.scribble}</span></div>`.
  - If `slide.note` is present, render `<p className={styles.note}>* {renderMarkedText(slide.note)}</p>`.

#### [MODIFY] `packages/loop/src/layouts/the-field-notes/frame.module.css`
- Add styles for:
  - `.tape`: Washi tape with repeating semi-transparent stripes and jagged masked edges.
  - `.specimen`: Card with outline-offset border and drop shadow.
  - `.ruler`: Repeating gradient tickmark ruler.
  - `.chart`: SVG chart styles and pencil pattern defs.
  - `.table`: Survey data table layout and double-underlined total row.
  - `.compare`: Side-by-side grid with wavy divider column.
  - `.entry`: First-letter drop cap styling (`::first-letter`).
  - `.kit`: Strikethrough and flag styling.
  - `.scribble`: Handwritten margin note rotated -3deg.

#### [MODIFY] `packages/loop/src/layouts/the-field-notes/frame.tsx`
- Ensure 9 punch holes (`<i></i>` × 9) matching the HTML design.
- Support cover tape banner.
- Display `slide.label || LABELS[slide.type]` in header.

#### [MODIFY] `packages/loop/src/layouts/the-field-notes/schema.ts`
- Define comprehensive Zod schemas for all 17 slide types:
  - `CoverSlide`, `StatementSlide`, `ListSlide`, `SpecimenSlide`, `MeasureSlide`, `TallySlide`, `RouteSlide`, `LogSlide`, `CompareSlide`, `TableSlide`, `ChartSlide`, `MapSlide`, `QuoteSlide`, `EntrySlide`, `QaSlide`, `KitSlide`, `CtaSlide`.
- Export discriminated union `TheFieldNotesSlideSchema` and `TheFieldNotesContract`.

#### [MODIFY] `packages/loop/src/layouts/the-field-notes/sample-slides.ts`
- Port the entire 17-slide deck from `The Field Notes.html` lines 48–96 so all 17 slide layouts are populated with real content.

#### [MODIFY] `packages/loop/src/layouts/the-field-notes/layout.tsx`
- Map all 17 components to their exact type keys in `slides: Record<string, any>`.

#### [MODIFY] `scripts/test-all-templates-visual.ts`
- Update the test suite so when auditing `the-field-notes`, it renders **all 17 slides** in addition to the standard 4 core types.

---

## 4. Verification Plan

### Automated Tests
1. **TypeScript & Monorepo Build**:
   ```bash
   pnpm turbo run build typecheck
   ```
   Must compile with 0 errors across all 12 projects.

2. **Visual Test Audit (All 17 Slides)**:
   ```bash
   pnpm tsx scripts/test-all-templates-visual.ts
   ```
   Will render:
   - 4 slides for `paper-of-record`
   - 4 slides for `the-globalist`
   - 4 slides for `the-curator`
   - 4 slides for `the-academic`
   - 4 slides for `the-signal`
   - **17 slides for `the-field-notes`** (covering `cover`, `statement`, `list`, `specimen`, `measure`, `tally`, `route`, `log`, `compare`, `table`, `chart`, `map`, `quote`, `entry`, `qa`, `kit`, `cta`).
   - Total: **37 rendered slides**.

3. **Image Verification**:
   - Verify all 17 PNG files exist under `output/template-audit/the-field-notes/`.
   - Copy to artifacts directory and generate a visual carousel in `docs/walkthrough.md`.

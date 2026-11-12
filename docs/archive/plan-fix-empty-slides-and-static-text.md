# Implementation Plan: Fix Empty Slides & Eliminate Hardcoded Static Text in The Field Notes

## Problem Analysis & Root Cause

During live end-to-end testing with a real Wikipedia article (`Design Research`) and Gemini LLM, the output exhibited severe defects:
1. **Empty Slides**: Slides 4 and 5 were almost completely blank kraft paper with only a headline and squiggle.
2. **Static Plastered Text**:
   - `~ FIELD NOTES` was statically rendered at the top right of almost every slide.
   - `@fieldnotes` was statically rendered at the bottom left of every single slide, ignoring the LLM's `@DesignJournal` and `THE DESIGN JOURNAL`.
   - `p. 01/05` and `№ 01` were rendered on **every single slide** because the page index regex `footerRight.match(/(\d+)\s*\/\s*(\d+)/)` returned `null` for standard LLM outputs like `PAGE 02`, and `slide.index` was not passed from `worker-render`. Total dots was hardcoded to 5 for a 7-slide carousel.
3. **Template Under-utilization**: None of the 15 unique Field Notes components (`statement`, `specimen`, `measure`, `tally`, `route`, `log`, `compare`, `table`, `chart`, `map`, `entry`, `qa`, `kit`) were preserved.

### The Underlying System Causes:
1. **`slide-sanitizer.ts` Forcible Down-conversion**:
   In `apps/worker-structure/src/slide-sanitizer.ts`, `VALID_SLIDE_TYPES` was hardcoded to legacy slide types. Because `compare`, `tally`, `specimen`, `statement`, `entry`, etc. were missing from this list, lines 33-36:
   ```ts
   if (!VALID_SLIDE_TYPES.includes(type)) {
     const mapped = TYPE_MAP[type.toLowerCase()];
     type = mapped ?? 'sequence';
   }
   ```
   forcibly downgraded planned `compare` and `tally` slides into `type: 'sequence'`. Because `compare` XML does not have `<items><item num="..."/></items>`, the converted slide had no items, leaving 85% of the slide blank!
2. **Missing `slide-types.yaml`**:
   `packages/loop/src/layouts/the-field-notes/` had no `slide-types.yaml`. `loadSlideTypesForTemplate('the-field-notes')` only returned the 8 shared slide types, so Phase 4 prompt generation provided zero rules, zero examples, and zero field limits for Field Notes types.
3. **Missing Registry Aesthetics**:
   `apps/worker-structure/src/index.ts` had a hardcoded `TEMPLATE_STYLES` dictionary lacking `the-field-notes`, so the LLM received empty aesthetic guidance.
4. **`frame.tsx` Hardcoded Fallbacks & Regex Bug**:
   - `headerRightText` defaulted to `wordmark` (`'FIELD NOTES'`), rendering `~ FIELD NOTES` on every slide.
   - Footer left rendered `{handle}` (`@fieldnotes`) and ignored `s.footerLeft` and `s.socialHandle`.
   - `curPage` failed to match `PAGE 01`, `PAGE 02`, defaulting to 1 on all slides.
   - `totalPages` defaulted to 5 instead of actual slide count.
5. **`worker-render` Missing Metadata**:
   `worker-render` did not inject `index` and `totalSlides` into `slideData`.

---

## User Review Required

> [!IMPORTANT]
> **Key Architectural Enhancements**:
> 1. All 17 slide types of `the-field-notes` will now be first-class citizens in the structuring engine via [`slide-types.yaml`](file:///home/core/projects/loopreel/packages/loop/src/layouts/the-field-notes/slide-types.yaml) and [`slide-sanitizer.ts`](file:///home/core/projects/loopreel/apps/worker-structure/src/slide-sanitizer.ts).
> 2. `frame.tsx` will dynamically reflect the article's actual publication name (`footerLeft`), author handle (`socialHandle`), category tag (`tag`), and slide index (`№ 01` - `№ 07` with `p. 01/07`), removing all hardcoded `"FIELD NOTES"` and `"@fieldnotes"` text.
> 3. `TheFieldNotesContract` will strictly require items on list/sequence slides (`.min(1)`), preventing the generation of empty slides.

---

## Proposed Changes

### 1. Worker Structure & LLM Brain

#### [NEW] `packages/loop/src/layouts/the-field-notes/slide-types.yaml`
- Inherits shared primitives (`cover`, `cta`, `sequence`, `telemetry`, `quote`).
- Declares all Field Notes slide types with field schemas, required flags, headline patterns, rules, and power words:
  - `statement`: oversized thought/claim (requires substantive `text` 15-40 words)
  - `list` / `sequence`: requires `items` array with `title` and `desc` (2-5 items)
  - `specimen`: term definition card (requires `term` and `definition`)
  - `measure`: hero metric (requires `value`, `unit`, `headline`, `desc`)
  - `tally`: quantitative survey grid (requires 2-4 `items` with `value`, `label`, `desc`)
  - `route`: milestone journey (requires 2-5 waypoints)
  - `log`: chronological field log (requires 2-5 entries with `time`, `title`, `desc`)
  - `compare`: contrast card (requires `left` and `right` sides)
  - `table`: structured tabular data (requires `columns` and `rows`)
  - `chart`: comparison bar chart (requires 2-5 `bars`)
  - `map`: spatial/coordinate points
  - `entry`: longform journal reflection with drop-cap (requires `text` 30-70 words)
  - `qa`: interview question and answer (requires `question` and `answer`)
  - `kit`: checklist / equipment list (requires 3-6 items with `state`)

#### [MODIFY] `apps/worker-structure/src/slide-sanitizer.ts`
- Add all Field Notes types to `VALID_SLIDE_TYPES`:
  `'statement'`, `'list'`, `'specimen'`, `'measure'`, `'tally'`, `'route'`, `'log'`, `'compare'`, `'table'`, `'chart'`, `'map'`, `'entry'`, `'qa'`, `'kit'`.
- Update `TYPE_MAP` to avoid corrupting custom slide types.
- Add field normalization for `compare`, `tally`, `specimen`, `statement`, and `entry` so that structured XML nodes are cleanly preserved.

#### [MODIFY] `apps/worker-structure/src/index.ts`
- Register `the-field-notes` in `TEMPLATE_STYLES`:
  ```ts
  'the-field-notes': {
    name: 'The Field Notes',
    aesthetics: 'Researcher pocket notebook on kraft paper with dot grid, ruled margins, hand-drawn annotations, specimen cards, and field observations. Never output empty slides.',
  },
  ```

---

### 2. Frontend Rendering & Frame Isolation

#### [MODIFY] `packages/loop/src/layouts/the-field-notes/frame.tsx`
- **Header Right**:
  Replace `(s['headerRight'] as string) || (s['authorRole'] as string) || wordmark` with:
  Only show `s['headerRight'] || s['authorRole'] || ''`. If none is provided, do NOT render `~ FIELD NOTES`.
- **Footer Left**:
  Replace `{handle}` with `s['socialHandle'] || s['footerLeft'] || brandKit?.handle || ''`. Cleanly renders publication name or handle instead of hardcoded `@fieldnotes`.
- **Page Number & Total Pages**:
  - `curPage`:
    Check `typeof s['index'] === 'number' ? s['index'] + 1 : null`, then fallback to regex matching `footerRight` (`/(?:PAGE\s*|№\s*|p\.\s*)?(\d+)/i`) or `s['id']` (`/slide-(\d+)/i`), defaulting to 1.
  - `totalPages`:
    Check `footerRight.match(/\/\s*(\d+)/)`, then `typeof s['totalSlides'] === 'number' ? s['totalSlides'] : null`, defaulting to `curPage > 5 ? curPage : 7`.
  - Dot progress bar dynamically renders `totalPages` dots (e.g. 7 dots for 7 slides), with exact dot active.
  - Page counter renders `p. {curPage}/{totalPages}` (e.g. `p. 04/07`).

#### [MODIFY] `packages/loop/src/layouts/the-field-notes/slides.tsx`
- In `List` / `Sequence`:
  If `items` is empty, do NOT render an empty void. Render a substantive card with `s.headline` and `s.subheadline` or `s.text`.
- In `Cta`:
  Make `signText` fallback to `s.author || ''` without hardcoded `"see you in the field"`.
- Remove any static string fallbacks that pollute LLM generation.

#### [MODIFY] `packages/loop/src/layouts/the-field-notes/schema.ts`
- Strengthen `ListSlide` and `SequenceSlide`:
  `items: z.array(...).min(1)` (enforce at least 1 item, recommended 2-5).
  Ensure all slide types require substantive content fields.

---

### 3. Headless Render Worker

#### [MODIFY] `apps/worker-render/src/index.ts`
- When mapping batch slides in Playwright evaluate:
  Inject `index: batchStart + idx` and `totalSlides` into `slideData` so every layout knows its exact 1-based page number and total deck size.

---

## Verification Plan

### Automated Tests
1. **Monorepo Build & Typecheck**:
   ```bash
   pnpm --filter @loopreel/loop build
   pnpm --filter @loopreel/worker-structure build
   pnpm --filter @loopreel/worker-render build
   pnpm turbo build
   ```
2. **Visual Static Audit**:
   ```bash
   pnpm tsx scripts/test-all-templates-visual.ts
   ```

### Live End-to-End Pipeline Verification
1. Restart PM2 microservices with fresh builds:
   ```bash
   pm2 delete all && pm2 start ecosystem.config.cjs
   ```
2. Submit a live article job via API for Wikipedia Design Research:
   ```bash
   pnpm tsx scripts/submit-api-job.ts https://en.wikipedia.org/wiki/Design_research the-field-notes
   ```
3. Poll job to completion and download all slide PNGs to `output/live-audit-the-field-notes/`.
4. Inspect the rendered slides:
   - Verify slides 4 and 5 are fully populated (no empty voids).
   - Verify page indicators (`№ 01` - `№ 07`, `p. 01/07` - `p. 07/07`, 7 progress dots).
   - Verify footer displays actual publication handle / category instead of `@fieldnotes`.
   - Verify header right displays clean metadata or whitespace instead of `~ FIELD NOTES`.
5. Update `docs/walkthrough.md` with visual comparison slides.

# Implementation Plan: Fix Blank White Slides (Missing Runtime Imports)

## Goal Description
During live rendering, all slide PNGs were being output as completely blank white screens of exactly 22 KB. 

### Root Cause Analysis
Browser inspection of `http://localhost:3001` via Playwright uncovered an unhandled runtime exception:
```
PAGE ERROR: Sequence is not defined ReferenceError: Sequence is not defined
    at http://localhost:3001/assets/index-iFyJe9TX.js:40:172849
ROOT INNER HTML length: 0
```
In [`packages/loop/src/layouts/the-field-notes/layout.tsx`](file:///home/core/projects/loopreel/packages/loop/src/layouts/the-field-notes/layout.tsx), lines 49-50 defined contract aliases:
```tsx
sequence: Sequence,
telemetry: Telemetry,
```
However, lines 4 and 7 only imported default exports:
```tsx
import List from './list/index.js';
import Tally from './tally/index.js';
```
Because `Sequence` and `Telemetry` were never imported in `layout.tsx`, the browser bundle threw a `ReferenceError` immediately when evaluating the module, crashing the entire React hydration tree and leaving `#root` at 0 bytes.

---

## User Review Required

> [!IMPORTANT]
> **Defect Scope**:
> This is a 2-line runtime import fix in [`packages/loop/src/layouts/the-field-notes/layout.tsx`](file:///home/core/projects/loopreel/packages/loop/src/layouts/the-field-notes/layout.tsx). Both `packages/loop/src/layouts/the-field-notes/list/index.tsx` and `packages/loop/src/layouts/the-field-notes/tally/index.tsx` already export `Sequence` and `Telemetry` properly. We simply need to import them into `layout.tsx`.

---

## Proposed Changes

### Template Layout Registry
#### [MODIFY] [`packages/loop/src/layouts/the-field-notes/layout.tsx`](file:///home/core/projects/loopreel/packages/loop/src/layouts/the-field-notes/layout.tsx)

```diff
-import List from './list/index.js';
+import List, { Sequence } from './list/index.js';
 import Specimen from './specimen/index.js';
 import Measure from './measure/index.js';
-import Tally from './tally/index.js';
+import Tally, { Telemetry } from './tally/index.js';
```

---

## Execution Workflow

1. **Apply Import Fix**: Update lines 4 and 7 in [`packages/loop/src/layouts/the-field-notes/layout.tsx`](file:///home/core/projects/loopreel/packages/loop/src/layouts/the-field-notes/layout.tsx).
2. **Rebuild Loop Engine Bundle**: Run `pnpm --filter @loopreel/loop build` to produce clean production assets in `packages/loop/dist/`.
3. **Restart Microservices**: Run `pm2 restart all` so the static render server on port 3001 serves the updated bundle.
4. **Browser Console Verification**: Run our scratch script `scratch/check-render.ts` to confirm `http://localhost:3001` renders `#root` with **0 console errors** and full DOM tree.
5. **Re-Run Visual Test Suite**: Run `pnpm tsx scripts/test-all-templates-visual.ts` to verify rendered PNGs across templates have full visual data (>100 KB, not 22 KB).
6. **Re-Execute Antikythera Pipeline Job**: Run `scripts/submit-api-job.ts` for the Antikythera mechanism to download genuine, fully-rendered slides.
7. **Update Walkthrough & Commit**: Copy newly rendered slides into the artifact directory, update `walkthrough.md`, and commit changes.

---

## Verification Plan

### Automated Tests
1. **Direct Browser DOM Validation**:
   ```bash
   pnpm tsx scratch/check-render.ts
   ```
   Must print: `PAGE ERROR: none`, `ROOT INNER HTML length: > 500`.

2. **Multi-Template Visual Suite**:
   ```bash
   pnpm tsx scripts/test-all-templates-visual.ts
   ```
   Must output non-empty files (100–250 KB per slide, not 22 KB).

3. **Live API Pipeline Test**:
   ```bash
   pnpm tsx scripts/submit-api-job.ts \
     --url "https://en.wikipedia.org/wiki/Antikythera_mechanism" \
     --template the-field-notes \
     --platform instagram-feed \
     --wordmark "ARCHAEO FIELD LOG" \
     --handle "@ArchaeoFieldNotes" \
     --outDir output/the-field-notes-antikythera
   ```

### Manual Verification
- View newly rendered slides in `output/the-field-notes-antikythera/` and the visual carousel in `walkthrough.md`.

# Walkthrough: Next-Generation Slide Rendering & Space Calculation Engine

## 1. Architectural Overview

We have upgraded the Loopreel rendering engine to use a **content-aware, fluid typographic and spacing system**:

```
┌────────────────────────────────────────────────────────────────────────┐
│                   4-STAGE SPACE CALCULATION PIPELINE                   │
├────────────────────────────────────────────────────────────────────────┤
│ 1. Content & Aspect Profile                                            │
│    (Measure word count, item count, aspect ratio, headline length)     │
│                               ▼                                        │
│ 2. Fluid Token Resolution (--k scale factor)                           │
│    (Compute dynamic typography, gap compression, and vertical rhythm)  │
│                               ▼                                        │
│ 3. Priority Compression                                                │
│    (Compress whitespace & item gaps FIRST -> Preserve font legibility) │
│                               ▼                                        │
│ 4. AutoFit Backstop Shield                                             │
│    (Final non-destructive transform for residual 1-4% variance)        │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Key Components Added & Upgraded

| Component | Role | What Changed |
|---|---|---|
| [`tokens.ts`](file:///home/core/projects/loopreel/packages/loop/src/layouts/shared/tokens.ts) | Master Scale Factor & Token Matrix | Computes $k$ based on viewport aspect ratio, item count, and word density; generates semantic CSS tokens (`--loop-k`, `--loop-font-hero`, `--loop-gap-lg`, etc.). |
| [`density-engine.ts`](file:///home/core/projects/loopreel/packages/loop/src/layouts/shared/density-engine.ts) | Real-time Slide Density | Injects token matrix into root slide styles; provides `density.k` to frames and layouts. |
| [`AutoFit.tsx`](file:///home/core/projects/loopreel/packages/loop/src/layouts/shared/AutoFit.tsx) | Zero-Overflow Shield & Telemetry | Added `data-layout-health` (`optimal`, `compressed`, `scaled`) telemetry and `24px` safe buffer. |
| **All 6 Template Frames** | Safe Area & Hierarchy | Normalized `contentTop` and `contentBottom` calculations across Portrait, Square, and Story viewports to maximize usable safe area. |
| [`worker-render`](file:///home/core/projects/loopreel/apps/worker-render/src/index.ts) | Headless Tab Pool | Added font readiness synchronization and per-slide layout health logging. |

---

## 3. Visual Verification Carousel

````carousel
![Field Notes Statement (Square 1:1, Scale 0.968, Optimal)](/home/core/.gemini/antigravity-cli/brain/da27b3cb-1b2b-4f17-868f-3f236e8a90bd/render-engine-upgrade/the-field-notes__field_notes_statement_square.png)
<!-- slide -->
![Field Notes Dense List (Square 1:1, Scale 0.968, 0px Overflow)](/home/core/.gemini/antigravity-cli/brain/da27b3cb-1b2b-4f17-868f-3f236e8a90bd/render-engine-upgrade/the-field-notes__field_notes_dense_list_square.png)
<!-- slide -->
![Paper of Record Telemetry (Square 1:1, Scale 0.974, Optimal)](/home/core/.gemini/antigravity-cli/brain/da27b3cb-1b2b-4f17-868f-3f236e8a90bd/render-engine-upgrade/paper-of-record__paper_of_record_telemetry_square.png)
<!-- slide -->
![The Signal Telemetry (Square 1:1, Scale 0.973, Optimal)](/home/core/.gemini/antigravity-cli/brain/da27b3cb-1b2b-4f17-868f-3f236e8a90bd/render-engine-upgrade/the-signal__the_signal_telemetry_square.png)
<!-- slide -->
![The Curator Telemetry (Square 1:1, Scale 0.972, Optimal)](/home/core/.gemini/antigravity-cli/brain/da27b3cb-1b2b-4f17-868f-3f236e8a90bd/render-engine-upgrade/the-curator__the_curator_telemetry_square.png)
<!-- slide -->
![The Academic Telemetry (Square 1:1, Scale 0.972, Optimal)](/home/core/.gemini/antigravity-cli/brain/da27b3cb-1b2b-4f17-868f-3f236e8a90bd/render-engine-upgrade/the-academic__the_academic_telemetry_square.png)
<!-- slide -->
![The Globalist Telemetry (Square 1:1, Scale 0.972, Optimal)](/home/core/.gemini/antigravity-cli/brain/da27b3cb-1b2b-4f17-868f-3f236e8a90bd/render-engine-upgrade/the-globalist__the_globalist_telemetry_square.png)
````

---

## 4. Test Results Across All 6 Templates

All tests executed via [`scripts/verify-render-engine.ts`](file:///home/core/projects/loopreel/scripts/verify-render-engine.ts):

| Test Case | Viewport | Scale Factor | Layout Health | Visual Clip | Result |
|---|---|---|---|---|---|
| **Field Notes Cover** | Portrait ($1080 \times 1350$) | `0.971` | `optimal` | `0.00px` | ✅ PASS |
| **Field Notes Statement** | Square ($1080 \times 1080$) | `0.968` | `optimal` | `0.00px` | ✅ PASS |
| **Field Notes Dense List** | Portrait ($1080 \times 1350$) | `0.971` | `optimal` | `0.00px` | ✅ PASS |
| **Field Notes Dense List** | Square ($1080 \times 1080$) | `0.968` | `optimal` | `0.00px` | ✅ PASS |
| **Paper of Record Telemetry** | Portrait ($1080 \times 1350$) | `0.974` | `optimal` | `0.00px` | ✅ PASS |
| **Paper of Record Telemetry** | Square ($1080 \times 1080$) | `0.974` | `optimal` | `0.00px` | ✅ PASS |
| **The Signal Telemetry** | Square ($1080 \times 1080$) | `0.973` | `optimal` | `0.00px` | ✅ PASS |
| **The Curator Telemetry** | Square ($1080 \times 1080$) | `0.972` | `optimal` | `0.00px` | ✅ PASS |
| **The Academic Telemetry** | Square ($1080 \times 1080$) | `0.972` | `optimal` | `0.00px` | ✅ PASS |
| **The Globalist Telemetry** | Square ($1080 \times 1080$) | `0.972` | `optimal` | `0.00px` | ✅ PASS |

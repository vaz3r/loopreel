# Implementation Plan: Ingest & Build "The Field Notes" Production Template

## Goal Description

You provided [`packages/loop/design-references/The Field Notes.html`](file:///home/core/projects/loopreel/packages/loop/design-references/The%20Field%20Notes.html) and asked:
> *"Can we turn it into a template?"*

### Assessment: **This is an exceptional, world-class aesthetic.**
"The Field Notes" introduces a completely unique, organic design language to our catalog:
- **Concept**: A researcher's pocket notebook.
- **Visual Texture**: Tactile warm kraft dot-grid paper (`#EEE5D0`), dual-line ruled margin rule, and spiral binding punch-hole impressions.
- **Typography Quartet**:
  - `Fraunces`: Expressive, high-character variable serif for headlines.
  - `Newsreader`: Literary serif for body text.
  - `DM Mono`: Clean monospace for issue numbers, metadata, and handles.
  - `Caveat`: Authentic handwriting font for margin notes, handwritten annotations, and signatures.
- **Accents**: Terracotta/rust ink stamps (`#B8432A`), amber highlighter markers (`<mark>`), and hand-drawn SVG squiggles.

We will use our official **`template-converter` skill** to build a 100% isolated production template **`the-field-notes`** in `packages/loop/src/layouts/the-field-notes/`.

---

## User Review Required

> [!IMPORTANT]
> **100% Isolated Architecture**: `the-field-notes` will be completely self-contained. It will own its own `brandkit.ts`, `frame.tsx`, `frame.module.css`, `slides.tsx`, `schema.ts`, `layout.tsx`, and `index.ts`. No shared styling or layout dependencies.
> 
> **Zero Manual Work for You**: I will handle the entire translation, SVG extraction, CSS modules, schema registration, and visual testing.

---

## Template Specification: `the-field-notes`

### 1. Design Tokens & BrandKit (`brandkit.ts`)
- **Google Fonts**: `Fraunces` (weights 400, 600, 700), `Newsreader` (weights 400, 500), `DM Mono` (weights 400, 500), `Caveat` (weights 600, 700).
- **Default Palette (`kraft`)**:
  - `paper`: `#EEE5D0` (warm kraft paper)
  - `paper2`: `#E6DBC2` (deeper kraft for cards)
  - `ink`: `#2B2219` (dark sepia charcoal)
  - `accent`: `#B8432A` (terracotta rust)
  - `highlighter`: `rgba(236, 182, 62, 0.55)` (amber marker)
  - `margin`: `rgba(184, 67, 42, 0.5)` (ruled margin lines)
  - `border`: `rgba(43, 34, 25, 0.42)`
- **Default Wordmark**: `"FIELD NOTES"`, style: `'mono'`.
- **Default Handle**: `"@fieldnotes"`.

### 2. Isolated Frame (`frame.tsx` + `frame.module.css`)
- **Background**: Kraft radial gradient with $40 \times 40\text{px}$ dot grid.
- **Notebook Elements**:
  - Bound-edge spiral punch holes on the left.
  - Vertical red margin rule inset at 104px.
- **Header**:
  - Left: Entry number + dynamic `TypographicWordmark` (`brandKit?.wordmark` or `"FIELD NOTES"`).
  - Right: Handwritten scribble annotation in `Caveat` (e.g. *"field notes"*).
- **Footer**:
  - Left: Social handle badge (`brandKit?.handle` or `"@fieldnotes"`).
  - Center/Right: Progress dots counter.

### 3. Slide Layouts (`slides.tsx`)
- **Cover Slide**:
  - Monospace category kicker tag.
  - Large display headline in `Fraunces` with highlighter markup support.
  - Hand-drawn SVG squiggle separator.
  - Literary subtitle in `Newsreader`.
  - Monospace metadata pill tags (e.g., `["12 participants", "5 days", "4 min read"]`).
- **Sequence Slide**:
  - Bold sequence headline with hand-drawn squiggle.
  - 3 to 4 sequential cards with hand-drawn circular step numbers (`circ`).
  - Step title + explanatory body text.
- **Telemetry Slide**:
  - Large metric numbers in `Fraunces` with unit tags.
  - Hand-drawn SVG squiggle.
  - Descriptive metric labels with comparative details.
- **Quote Slide**:
  - Massive editorial quotation mark in `Fraunces`.
  - Prominent quote body in `Newsreader`.
  - Author attribution in `Caveat` handwriting with monospace role title.
- **CTA Slide**:
  - High-impact takeaway headline.
  - Hand-drawn SVG squiggle.
  - Action button / badge in kraft paper styling.
  - Handwritten signature signoff in `Caveat` (*"see you in the field"*).

### 4. Isolated Schema (`schema.ts`)
- Defines `TheFieldNotesContract` with strict Zod types for `Cover`, `Sequence`, `Telemetry`, `Quote`, `Cta`.

---

## Deliverables & Next Steps

1. Scaffold and populate `packages/loop/src/layouts/the-field-notes/`.
2. Register across `@loopreel/schemas`, `@loopreel/loop/bridge`, and `apps/admin`.
3. Run `test-all-templates-visual.ts` and verify visual fidelity.

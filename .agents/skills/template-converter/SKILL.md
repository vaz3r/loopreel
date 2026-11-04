---
name: template-converter
description: >-
  Use this skill whenever the user asks to convert, ingest, or build a production
  isolated Loopreel carousel template from a single-file HTML design reference in
  packages/loop/design-references/, or asks to create or register a new template layout.
---

# Template Converter: HTML Design Reference → Production Isolated Template

This skill governs the end-to-end, zero-manual-effort conversion of single-file HTML design mocks (generated via ChatGPT, Claude 3.5 Sonnet, or Gemini) into 100% isolated production React templates for Loopreel.

The user acts as the **Creative Director** (providing the HTML reference). The AI agent acts as the **Autonomous Engineer**, executing 100% of the extraction, CSS translation, scaffolding, schema registration, and visual testing.

---

## The 6-Phase Conversion Protocol

When instructed by the user to convert a file (e.g. `packages/loop/design-references/The Example.html`):

### Phase 1: Token & Aesthetic Extraction
1. Read the target HTML file from `packages/loop/design-references/`.
2. Extract the typography:
   - Identify all Google Fonts `<link>` tags.
   - Note the font families used for headings, body text, and accents/labels (e.g., serif vs. sans vs. mono).
3. Extract the color palette:
   - `paper`: Main canvas background color (e.g., `#FBFBFA`, `#080808`, `#FFFFFF`).
   - `ink`: Primary body and heading text color.
   - `accent`: Primary highlight color (e.g., crimson, amber, emerald, cobalt).
   - `border`: Grid, separator, and frame border color.
   - `surface`: Nested cards, callout badges, or table backgrounds.
   - Any secondary semantic accents (e.g., positive green, negative red).

### Phase 2: Scaffold Isolated Template Directory
1. Determine a clean kebab-case ID and human title:
   - Example: `The Terminal.html` -> ID: `the-terminal`, Title: `The Terminal`.
2. Run the template scaffolding script from the workspace root:
   ```bash
   pnpm run create-template <template-id> "<Template Title>"
   ```
   This generates the isolated package directory:
   `packages/loop/src/layouts/<template-id>/`
   Containing:
   - `brandkit.ts`: Isolated palette, typography, and default presets.
   - `frame.tsx` & `frame.module.css`: Isolated layout frame.
   - `slides.tsx`: Isolated slide renderers.
   - `layout.tsx`: Layout composition component.
   - `index.ts`: Public template export.

### Phase 3: Frame & Typographic Wordmark Translation
1. In `packages/loop/src/layouts/<template-id>/brandkit.ts`:
   - Set `googleFonts` URLs.
   - Update `defaultPalette` with the extracted hex colors.
   - Set `typography` families (`headline`, `body`, `ui`).
   - Set the default `wordmark` text and `wordmarkStyle` (`'serif' | 'sans' | 'mono' | 'small-caps'`).
2. In `packages/loop/src/layouts/<template-id>/frame.tsx` & `frame.module.css`:
   - Translate the HTML header/masthead and footer into the template's isolated CSS module.
   - Import and use `TypographicWordmark` from `../shared/TypographicWordmark` for crisp, vector-grade mastheads and handles.
   - Support dynamic user overrides via `brandKit?.wordmark` and `brandKit?.handle`.
   - Ensure the canvas container maintains its flex column structure ($1080 \times 1350$).

### Phase 4: Slide Layouts Translation
1. In `packages/loop/src/layouts/<template-id>/slides.tsx`:
   - Translate each slide layer from the HTML mock into its corresponding component:
     - `CoverSlide`: Translates `#slide-cover` (or `id="slide-1"`).
     - `SequenceSlide`: Translates `#slide-sequence` (or sequence steps).
     - `TelemetrySlide`: Translates `#slide-telemetry` (metrics, stats, key performance data).
     - `QuoteSlide`: Translates `#slide-quote` (editorial pulls, citations).
     - `CtaSlide`: Translates `#slide-cta` (summary takeaway, action button, account badge).
     - Any template-specific custom slide types (e.g. `MatrixSlide`, `QnASlide`, `CodeSlide`).
2. Map dynamic slide data props:
   - Cover: `s.headline`, `s.kicker`, `s.takeaway`.
   - Sequence: `s.steps` (array of `{ index, label, body }`).
   - Telemetry: `s.metrics` (array of `{ value, label, change? }`).
   - Quote: `s.quote`, `s.attribution`.
   - CTA: `s.headline`, `s.action`, `s.kicker`.
3. Keep styling completely isolated in `frame.module.css` or scoped inline styles. Do NOT introduce dependencies on shared layout CSS.

### Phase 5: Auto-Registration & Schema Verification
Verify that the template is registered across the monorepo:
1. `packages/schemas/src/index.ts`:
   - In `ALL_TEMPLATE_KEYS`, e.g. `'the-terminal'`.
   - In `TEMPLATE_INFO` record with `name`, `description`, `mood`, `recommendedPacks`.
2. `packages/loop/src/bridge/registry.ts`:
   - Template exported in `TEMPLATES` map.
3. `packages/loop/src/bridge/classifier.ts`:
   - Added to `TEMPLATE_CHARACTERISTICS` with content suitability scores.
4. `apps/admin/src/lib/constants.ts`:
   - Added to `TEMPLATES` list for the Admin UI dropdown (`/create`).

### Phase 6: Visual Audit & Quality Verification
1. Run the visual test suite:
   ```bash
   pnpm tsx scripts/test-all-templates-visual.ts
   ```
   This generates $1080 \times 1350$ PNG screenshots for all slides under `output/template-audit/<template-id>/`.
2. Verify TypeScript integrity across the monorepo:
   ```bash
   pnpm turbo run build typecheck
   ```
3. Inspect the rendered PNGs to ensure 1:1 fidelity against the original HTML reference.
4. Present the rendered slide previews to the user.

---

## Reference Resources

- [Golden Prompt Recipe](./resources/prompt-recipe.md): The standard prompt template for external LLMs.
- [Conversion Checklist](./resources/conversion-checklist.md): Step-by-step verification checklist.

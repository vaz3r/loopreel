# Loop Engine — Documentation

## Overview

Loop Engine is a pipeline that takes structured slide data, validates it with Zod, renders each slide as a styled 1080x1350 canvas using React + Tailwind CSS, and exports pixel-perfect PNGs via Playwright.

The system is organized around **themes**. Each theme is a self-contained folder with its own slide data and config. The pipeline auto-discovers all themes and processes them in one run.

---

## File Structure

```
loop/
├── Engine.tsx                  ← Interactive editor (dev tool, shares SlideRenderer)
├── pipeline.ts                 ← Entry point: discovers themes, starts Vite, runs exporter
├── exporter.ts                 ← Playwright engine: takes screenshots of each slide
├── schema.ts                   ← Zod schemas for all 11 slide types + VoidContract
│
├── src/
│   ├── main.tsx                ← React mount point (imports Tailwind CSS)
│   ├── engine-utils.ts         ← Shared helpers: SCHEMES, injectFonts, getHeadlineStyle, etc.
│   ├── SlideRenderer.tsx       ← Pure presentational component (renders one slide at 1080x1350)
│   └── RenderSlide.tsx         ← Render route: receives slide data, renders via SlideRenderer
│
├── themes/
│   ├── void-editorial/         ← 8 slides (Business Strategy)
│   │   ├── manifest.json
│   │   └── slides.ts
│   ├── archive-paper/          ← 7 slides (Tech Innovation)
│   │   ├── manifest.json
│   │   └── slides.ts
│   ├── industrial-brutal/      ← 9 slides (Design Philosophy)
│   │   ├── manifest.json
│   │   └── slides.ts
│   └── custom-brand/           ← 8 slides (Science & Data)
│       ├── manifest.json
│       └── slides.ts
│
├── output/                     ← Generated PNGs (one folder per theme)
├── tailwind.config.js
├── postcss.config.js
├── vite.config.ts
├── index.html
├── package.json
└── tsconfig.json
```

---

## How It Works

```
   themes/<theme>/slides.ts     themes/<theme>/manifest.json
            │                            │
            ▼                            ▼
         pipeline.ts  ─── reads manifest, imports slides, validates with Zod
            │
            ├── starts Vite dev server (port 5173)
            │
            └── for each slide in each theme:
                     │
                     ├── exporter.ts launches headless Chromium
                     ├── injects slide data via page.addInitScript()
                     ├── navigates to http://localhost:5173
                     ├── RenderSlide.tsx reads injected data
                     ├── SlideRenderer.tsx renders at 1080x1350
                     ├── waits for fonts to load
                     └── screenshots → output/<theme>/slide_NN.png
```

**Key detail**: Slide data is injected into the page via `window.__SLIDE_DATA` using Playwright's `addInitScript`, not URL query params. This avoids encoding/truncation issues with special characters.

---

## Slide Types (11 total)

Every slide must have an `id`, `type`, `tag`, and the two footer fields.

| Type | Required Fields | Description |
|------|----------------|-------------|
| `cover` | headline, subheadline, metadata | Title slide with large headline and supporting text |
| `definition` | term, phonetic, definition, example? | Glossary-style term + phonetic + definition |
| `dichotomy` | headline, left{title,desc}, right{title,desc} | Two-column comparison (normal vs highlighted) |
| `timeline` | headline, events[{date,title,desc}] | Chronological timeline with dot markers |
| `quote` | quote, author, role | Pull quote with attribution |
| `sequence` | headline, items[{num,title,desc}] | Numbered list (auto-paginates at 4 items) |
| `telemetry` | headline, stats[{value,label}] | Data dashboard (auto-paginates at 4 stats) |
| `table` | headline, headers[], rows[][] | Data table (auto-paginates at 5 rows) |
| `image-split` | headline, bodyText, imageUrl | Half text, half image |
| `image-cover` | headline, subtext, imageUrl | Full-bleed image background with overlay |
| `cta` | headline, subtext, actionLabel, socialHandle | Terminal call-to-action slide |

**Auto-pagination**: The engine automatically splits long arrays into multiple virtual slides:
- Sequences >4 items → paginated in chunks of 4
- Telemetry >4 stats → paginated in chunks of 4
- Tables >5 rows → paginated in chunks of 5
- Timelines >4 events → paginated in chunks of 4

---

## Color Schemes (4 built-in)

Schemes are defined in `src/engine-utils.ts`. Each scheme controls background, text, accent, borders, and fonts.

| Scheme ID | Name | Vibe |
|-----------|------|-------|
| `void_editorial` | Void Editorial | Dark bg, cream text, red accent, serif headlines |
| `archive_paper` | Archive Paper | Light bg, dark text, blue accent, playfair serif |
| `industrial_brutal` | Industrial Brutal | Dark bg, gray text, orange accent, all sans |
| `custom_brand` | Custom Brand Kit | Fully customizable via brandKit in manifest |

---

## How to Add a New Theme

Themes are auto-discovered — no code changes needed to add one.

### Step 1: Create a folder

```bash
mkdir themes/my-new-theme
```

### Step 2: Create `manifest.json`

```json
{
  "schemeId": "void_editorial",
  "name": "My Theme Name",
  "description": "What this carousel is about"
}
```

For a custom-branded theme (with `custom_brand` scheme):

```json
{
  "schemeId": "custom_brand",
  "name": "My Brand",
  "description": "A branded carousel",
  "brandKit": {
    "bg": "#0F172A",
    "text": "#F8FAFC",
    "accent": "#38BDF8",
    "fontSerif": "Playfair Display",
    "fontSans": "Inter",
    "logoUrl": ""
  }
}
```

### Step 3: Create `slides.ts`

```typescript
import type { VoidContract } from '../../schema';

const contract: VoidContract = {
  slides: [
    {
      id: "my-cover-1",
      type: "cover",
      tag: "MY TAG",
      headline: "My Headline",
      subheadline: "Supporting text goes here.",
      metadata: "VOL. 01",
      footerLeft: "MY BRAND",
      footerRight: "PAGE 01"
    }
  ]
};

export default contract;
```

The file must export a `VoidContract` (an object with a `slides` array) as the default export.

### Step 4: Run the pipeline

```bash
npm run pipeline
```

The pipeline will discover your theme, validate the slides, and export PNGs to `output/my-new-theme/`.

---

## How to Add a New Slide Type

This requires code changes in several files.

### Step 1: Define the schema in `schema.ts`

Add a new Zod schema object:

```typescript
export const MyNewSlideSchema = z.object({
  id: z.string(),
  type: z.literal('my-new-type'),
  // ... your fields
  ...FooterFields,
});
```

Then add it to the discriminated union:

```typescript
export const SlideSchema = z.discriminatedUnion('type', [
  CoverSlideSchema,
  // ...
  MyNewSlideSchema,  // ← add here
]);
```

Also add the type to the helper array:

```typescript
export const SLIDE_TYPES: SlideType[] = [
  'cover', 'definition', /* ... */, 'my-new-type',
];
```

### Step 2: Add a layout branch in `SlideRenderer.tsx`

Inside `SlideRenderer.tsx`, add a new conditional render block:

```tsx
{slide.type === "my-new-type" && (
  <div className="...">
    {/* Your layout JSX here */}
  </div>
)}
```

### Step 3: Update `Engine.tsx` (optional)

If you want the interactive editor to support the new type, also add the layout branch in `Engine.tsx` (same JSX as above, but using `activeData` instead of `slide`).

---

## How to Add a New Color Scheme

Edit `src/engine-utils.ts` and add a new entry to the `SCHEMES` object:

```typescript
export const SCHEMES = {
  void_editorial: { /* ... */ },
  // ...
  my_new_scheme: {
    id: 'my_new_scheme',
    name: 'My Scheme Name',
    bg: '#1a1a2e',
    text: '#eaeaea',
    accent: '#e94560',
    border: 'rgba(234, 234, 234, 0.15)',
    gridBorder: 'rgba(234, 234, 234, 0.08)',
    fontSerif: 'Your Serif Font',
    fontSans: 'Your Sans Font',
    fontMono: 'Space Mono',
  },
};
```

The new scheme is immediately available in any theme's `manifest.json` via `"schemeId": "my_new_scheme"`.

---

## Running the Pipeline

```bash
cd loop
npm install
npx playwright install chromium

# Run the full pipeline (discovers themes, validates, exports PNGs)
npx tsx pipeline.ts

# Or via npm script
npm run pipeline
```

Output goes to `output/<theme-folder-name>/slide_NN.png` (2x DPR, 1080x1350).

---

## Maintenance Notes

- **Zod schemas** (`schema.ts`) enforce character limits. Update the `MAX` object if you need longer fields.
- **Font scaling** (`src/engine-utils.ts` → `Engine.getHeadlineStyle`, `Engine.getBodyStyle`) controls text sizing based on character count. Adjust the thresholds there if layouts break with certain content lengths.
- **Auto-pagination thresholds** are hardcoded in `Engine.tsx` (sequences >4, tables >5, telemetry >4, timelines >4). Change the chunk sizes there if needed.
- **Playwright** runs headless Chromium. If you need different output dimensions, edit `width`/`height`/`deviceScaleFactor` in `exporter.ts`.
- **Google Fonts** are loaded via the `injectFonts` helper. If fonts fail to load (no internet), the slides use system fallback fonts. This does not block PNG export.

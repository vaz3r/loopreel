# Loop Engine + Loopreel Integration Plan

## Status: PLANNING COMPLETE — READY TO EXECUTE

---

## 1. Executive Summary

Integrate the loop engine (`loop/`) as the rendering backend for the loopreel pipeline. The loop engine provides 5 production-quality editorial templates with 11-27 slide types each. The integration replaces loopreel's current SSR rendering path with the loop engine's client-side Vite+React rendering approach.

**Key decisions:**
- Rendering: Client-side via Vite dev server (same as loop engine's own export pipeline)
- Vite server: Separate PM2 process
- BrandKit: Supported via `custom_brand` scheme + new `__BRAND_KIT` global
- Playwright: Reuse loopreel's existing `BrowserPool` (5 pages, 100-use TTL)
- Editor: Loop engine's built-in editor at `http://localhost:5173` (free, no changes needed)
- EditorialRunway: Removed entirely (superseded by loop engine's 5 templates)
- Responsive layouts: CSS media queries in frame `.module.css` files (no JS changes)

---

## 2. Architecture

```
┌─────────────────────────────────────────────────────────┐
│  PM2 Process Group                                       │
│                                                          │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌─────────┐ │
│  │   API    │  │  Worker  │  │  Worker  │  │ Worker  │ │
│  │ (Fastify)│  │  Ingest  │  │Structure │  │ Render  │ │
│  │  :3000   │  │          │  │          │  │         │ │
│  └──────────┘  └──────────┘  └──────────┘  └────┬────┘ │
│                                                  │      │
│  ┌──────────────────────────────────────────────┐│      │
│  │  Loop Engine (Vite)            :5173         ││      │
│  │  ┌─────────────┐ ┌──────────────────────┐   ││      │
│  │  │   Editor    │ │   Export Renderer    │◄──┘│      │
│  │  │ (browser UI)│ │ (headless target)    │    │      │
│  │  └─────────────┘ └──────────────────────┘    │      │
│  └──────────────────────────────────────────────┘       │
│                                                          │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐              │
│  │ Postgres │  │  Redis   │  │ Whisper  │              │
│  │  :5432   │  │  :6379   │  │  :8000   │              │
│  └──────────┘  └──────────┘  └──────────┘              │
└─────────────────────────────────────────────────────────┘
```

### Data Flow

```
POST /api/jobs { sourceUrl, platform, templateId, brandKit? }
  → API creates job in DB (status: queued)
  → dispatches to ingest queue

worker-ingest:
  YouTube: yt-dlp → audio → R2 → dispatch to transcribe
  Blog: scrape → dispatch to structure

worker-transcribe (YouTube only):
  Whisper → transcript → dispatch to structure

worker-structure:
  - Looks up template from loop-bridge registry
  - Gets LLM prompt from loop-bridge (per template)
  - LLM generates slides matching template's Zod contract
  - Validates with template's Zod schema
  - Paginates with loop engine's paginateContract()
  - Fetches background images for image slides
  - Stores content_payload in loop engine format
  → dispatches to render queue

worker-render:
  - Acquires Playwright page from pool
  - Sets viewport to platform dimensions
  - For each slide:
      page.addInitScript({ __SLIDE_DATA, __SLIDE_SCHEME_ID, __SLIDE_TEMPLATE_ID, __SLIDE_SIZE, __BRAND_KIT })
      page.goto('http://localhost:5173')
      page.evaluate(() => document.fonts.ready)
      screenshot → R2 upload
  - Generates LinkedIn/Twitter text
  - Marks job complete
```

---

## 3. Supported Platforms

| Platform ID | Label | Width | Height | Aspect Ratio |
|------------|-------|-------|--------|-------------|
| `instagram-feed` | Instagram Feed | 1080 | 1350 | 4:5 |
| `instagram-square` | Instagram Square | 1080 | 1080 | 1:1 |
| `instagram-stories` | Instagram Stories | 1080 | 1920 | 9:16 |
| `linkedin` | LinkedIn | 1200 | 627 | 1.91:1 |
| `x` | X / Twitter | 1600 | 900 | 16:9 |
| `facebook` | Facebook | 1200 | 630 | 1.91:1 |

---

## 4. Supported Templates

| Template ID | Name | Scheme ID | Slide Types |
|------------|------|-----------|-------------|
| `paper-of-record` | The Paper of Record | `archive_paper` | cover, quote, definition, sequence, dichotomy, telemetry, timeline, image-split, table, analysis, profile, cta |
| `the-globalist` | The Globalist | `globalist_editorial` | cover, quote, definition, sequence, dichotomy, telemetry, timeline, image-split, table, interview, quadrant, case-study, myth-fact, resource-grid, cta |
| `the-terminal` | The Terminal | `terminal_dark` | cover, quote, definition, sequence, dichotomy, telemetry, timeline, image-split, table, interview, quadrant, case-study, myth-fact, resource-grid, cta |
| `the-curator` | The Curator | `curator_gallery` | cover, quote, sequence, telemetry, hero-metric, methodology, juxtaposition, checklist, breakdown, image-split, timeline, cta |
| `the-academic` | The Academic | `academic_research` | cover, quote, sequence, telemetry, interview, quadrant, case-study, myth-fact, resource-grid, image-split, timeline, cta |

---

## 5. BrandKit Support

### Schema

```ts
interface BrandKit {
  bg?: string;        // Background color (hex)
  text?: string;      // Text color (hex)
  accent?: string;    // Accent color (hex)
  fontSerif?: string; // Serif font family name (Google Fonts)
  fontSans?: string;  // Sans font family name (Google Fonts)
  logoUrl?: string;   // Logo image URL
}
```

### How it works

1. User sends `brandKit` in `POST /api/jobs`
2. API stores `brandKit` in job metadata
3. Worker-render injects `window.__BRAND_KIT` via `addInitScript`
4. Loop engine's `main.tsx` reads `__BRAND_KIT` and merges into scheme when `schemeId === 'custom_brand'`
5. Frame components already support `brandKit` prop — all 5 frames override CSS custom properties from brandKit values

### Required change to loop engine

**File: `loop/src/main.tsx`** — Add 3 lines to read `__BRAND_KIT`:

```tsx
declare global {
  interface Window {
    __BRAND_KIT?: { bg?: string; text?: string; accent?: string; fontSerif?: string; fontSans?: string; logoUrl?: string };
  }
}
```

And in `ExportRenderer` (SlideRenderer.tsx), pass brandKit to SlideRenderer when scheme is custom_brand.

---

## 6. Implementation Phases

### Phase 1: Clean Up Dead Code

**Delete directories:**
- `packages/templates/src/EditorialRunway/`
- `packages/templates/src/archive-paper/`
- `packages/templates/src/archive/`
- `packages/templates/src/custom-brand/`
- `packages/templates/src/industrial-brutal/`
- `packages/templates/src/protocol-001/`
- `packages/templates/src/void-editorial/`
- `packages/templates/src/engine/`
- `packages/templates/src/shared/`

**Delete files:**
- `apps/api/src/routes/render.ts`
- `packages/design/src/types.ts`
- `packages/design/src/templates.ts`
- `packages/templates/src/registry.ts`

**Modify files:**
- `packages/templates/src/index.ts` — Remove EditorialRunway exports
- `packages/design/src/index.ts` — Remove deleted exports
- `apps/api/src/server.ts` — Remove render route registration
- `apps/worker-render/src/index.ts` — Remove `fitTextToContainers` function and its call

---

### Phase 2: Create `packages/loop-bridge/`

New package that bridges the loop engine's schemas and prompts into loopreel's pipeline.

**Structure:**
```
packages/loop-bridge/
  package.json
  tsconfig.json
  src/
    index.ts          # Public API
    schemas.ts        # Re-exports loop engine Zod schemas
    prompts.ts        # Re-exports loop engine LLM prompts per template
    registry.ts       # Template registry (maps IDs to schema + scheme + prompt)
    adapter.ts        # Converts content_payload → __SLIDE_DATA format per slide
    brandkit.ts       # BrandKit type definition
```

**`package.json`:**
```json
{
  "name": "@loopreel/loop-bridge",
  "version": "0.0.1",
  "type": "module",
  "main": "src/index.ts",
  "dependencies": {
    "zod": "^3.23.8"
  },
  "devDependencies": {
    "typescript": "^5.5.3"
  }
}
```

**`src/schemas.ts`** — Re-exports from `loop/schema.ts`:
- All slide schemas (CoverSlideSchema, QuoteSlideSchema, etc.)
- Template-specific contracts (PaperOfRecordContract, TheTerminalContract, etc.)
- All TypeScript types (Slide, SlideType, etc.)

**`src/prompts.ts`** — Reads prompt files from each loop engine template:
```ts
import { readFile } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const LOOP_DIR = join(__dirname, '../../../loop');

const PROMPT_FILES: Record<string, string> = {
  'paper-of-record': 'src/layouts/paper-of-record/prompt.txt',
  'the-globalist': 'src/layouts/the-globalist/prompt.txt',
  'the-terminal': 'src/layouts/the-terminal/prompt.txt',
  'the-curator': 'src/layouts/the-curator/prompt.txt',
  'the-academic': 'src/layouts/the-academic/prompt.txt',
};

export async function getPrompt(templateId: string, rawText: string): Promise<string> {
  const relPath = PROMPT_FILES[templateId];
  if (!relPath) throw new Error(`No prompt for template "${templateId}"`);
  const prompt = await readFile(join(LOOP_DIR, relPath), 'utf-8');
  return `${prompt}\n\n---\n\nSource content:\n${rawText}`;
}
```

**`src/registry.ts`** — Maps template IDs to metadata:
```ts
import { PaperOfRecordContract } from '../loop/schema';
import { TheGlobalistContract } from '../loop/schema';
import { TheTerminalContract } from '../loop/schema';
import { TheCuratorContract } from '../loop/schema';
import { TheAcademicContract } from '../loop/schema';

export interface TemplateEntry {
  id: string;
  name: string;
  schemeId: string;
  schema: z.ZodTypeAny;
  defaultPlatform: string;
}

export const TEMPLATES: Record<string, TemplateEntry> = {
  'paper-of-record': { id: 'paper-of-record', name: 'The Paper of Record', schemeId: 'archive_paper', schema: PaperOfRecordContract, defaultPlatform: 'instagram-feed' },
  'the-globalist': { id: 'the-globalist', name: 'The Globalist', schemeId: 'globalist_editorial', schema: TheGlobalistContract, defaultPlatform: 'instagram-feed' },
  'the-terminal': { id: 'the-terminal', name: 'The Terminal', schemeId: 'terminal_dark', schema: TheTerminalContract, defaultPlatform: 'instagram-feed' },
  'the-curator': { id: 'the-curator', name: 'The Curator', schemeId: 'curator_gallery', schema: TheCuratorContract, defaultPlatform: 'instagram-feed' },
  'the-academic': { id: 'the-academic', name: 'The Academic', schemeId: 'academic_research', schema: TheAcademicContract, defaultPlatform: 'instagram-feed' },
};

export function getTemplate(id: string): TemplateEntry { ... }
export function getTemplateIds(): string[] { ... }
```

**`src/adapter.ts`** — Slide data adapter:
```ts
// Converts a slide from content_payload to the format expected by __SLIDE_DATA
export function adaptSlideForEngine(slide: Record<string, unknown>): Slide {
  // The loop engine's Slide type is a discriminated union on `type`
  // loopreel's content_payload already stores slides in this format
  // This adapter handles any field name differences
  return slide as Slide;
}
```

**`src/brandkit.ts`** — BrandKit types:
```ts
export interface BrandKit {
  bg?: string;
  text?: string;
  accent?: string;
  fontSerif?: string;
  fontSans?: string;
  logoUrl?: string;
}
```

---

### Phase 3: Update Schemas and Platforms

**`packages/schemas/src/index.ts`:**

```ts
// Extend PlatformEnum
export const PlatformEnum = z.enum([
  'instagram-feed',
  'instagram-square',   // NEW
  'instagram-stories',
  'linkedin',
  'x',                  // NEW
  'facebook',
]);

// Extend template IDs
export const JobCreateSchema = z.object({
  sourceUrl: z.string().url(),
  platform: PlatformEnum.default('instagram-feed'),
  templateId: z.enum([
    'paper-of-record',
    'the-globalist',
    'the-terminal',
    'the-curator',
    'the-academic',
  ]).default('paper-of-record'),
  brandKit: z.object({
    bg: z.string().optional(),
    text: z.string().optional(),
    accent: z.string().optional(),
    fontSerif: z.string().optional(),
    fontSans: z.string().optional(),
    logoUrl: z.string().optional(),
  }).optional(),
});
```

**`packages/design/src/platforms.ts`:**

Add `instagram-square` and `x` platforms, align all dimensions with loop engine:

```ts
export const instagramSquare: PlatformFormat = {
  id: 'instagram-square',
  name: 'Instagram Square',
  width: 1080,
  height: 1080,
  maxSlides: 10,
  safeZones: { top: 40, right: 40, bottom: 40, left: 40 },
  typographyScale: 1.0,
};

export const xTwitter: PlatformFormat = {
  id: 'x',
  name: 'X / Twitter',
  width: 1600,
  height: 900,
  maxSlides: 10,
  safeZones: { top: 30, right: 30, bottom: 30, left: 30 },
  typographyScale: 0.9,
};

export const platforms: Record<string, PlatformFormat> = {
  'instagram-feed': instagramFeed,
  'instagram-square': instagramSquare,
  'instagram-stories': instagramStories,
  'linkedin': linkedin,
  'x': xTwitter,
  'facebook': facebook,
};
```

---

### Phase 4: Rewrite worker-structure

**`apps/worker-structure/src/index.ts`:**

Replace EditorialRunway-specific logic with loop engine's generic pipeline:

```ts
import { getTemplate, getPrompt } from '@loopreel/loop-bridge';
import { paginateContract } from '@loopreel/loop-bridge';

const worker = createWorker<StructurePayload>('structure', async (job) => {
  const existing = await JobRepository.findById(jobId);

  // Get template from loop-bridge registry
  const template = getTemplate(existing.template_id);

  // Get LLM prompt (template-specific)
  const prompt = await getPrompt(existing.template_id, rawText);

  // LLM call
  const rawResponse = await llm.generateJSON(prompt, rawText);
  const cleaned = stripMarkdownFences(rawResponse);
  const parsed = parseLlmXmlOutput(cleaned);

  // Validate against template's Zod contract
  const result = template.schema.safeParse(parsed);
  if (!result.success) {
    // Handle validation error
    return;
  }

  // Paginate (loop engine's paginateContract)
  const paginated = paginateContract({ slides: result.data.slides });

  // Fetch images for image slides
  const withImages = await fetchImagesForSlides(paginated.slides, jobId);

  // Store content_payload in loop engine format
  await JobRepository.updateStatus(jobId, 'rendering', {
    contentPayload: {
      slides: withImages,
      meta: {
        ...result.data.meta,
        brandKit: existing.brand_kit ?? null,
      },
    },
    slideCount: withImages.length,
  });

  await renderQueue.add('render-slide', { jobId });
});
```

---

### Phase 5: Rewrite worker-render

**`apps/worker-render/src/index.ts`:**

Replace SSR-based rendering with client-side rendering via Vite server:

```ts
import { getPool } from './pool/browser-pool.js';
import { getPlatform } from '@loopreel/design';
import { getTemplate, adaptSlideForEngine } from '@loopreel/loop-bridge';

const VITE_SERVER_URL = process.env['VITE_SERVER_URL'] ?? 'http://localhost:5173';

const worker = createWorker<RenderPayload>('render', async (job) => {
  const existing = await JobRepository.findById(jobId);
  const platform = getPlatform(existing.platform);
  const template = getTemplate(existing.template_id);
  const payload = existing.content_payload as { slides: Record<string, unknown>[]; meta?: any };

  const pool = await getPool();
  const assets: Array<{ ... }> = [];

  for (let i = 0; i < payload.slides.length; i++) {
    const slide = adaptSlideForEngine(payload.slides[i]);
    const page = await pool.acquire();

    try {
      await page.setViewportSize({ width: platform.width, height: platform.height });

      // Inject slide data BEFORE page load (same as loop engine's exporter.ts)
      await page.addInitScript({
        content: `
          window.__SLIDE_DATA = ${JSON.stringify(slide)};
          window.__SLIDE_SCHEME_ID = ${JSON.stringify(template.schemeId)};
          window.__SLIDE_TEMPLATE_ID = ${JSON.stringify(template.id)};
          window.__SLIDE_SIZE = ${JSON.stringify({ width: platform.width, height: platform.height })};
          ${payload.meta?.brandKit ? `window.__BRAND_KIT = ${JSON.stringify(payload.meta.brandKit)};` : ''}
        `,
      });

      // Navigate to Vite server — React renders client-side
      await page.goto(VITE_SERVER_URL, { waitUntil: 'networkidle', timeout: 30000 });

      // Wait for fonts
      await page.evaluate(() => document.fonts.ready);

      // Screenshot
      const screenshot = await page.screenshot({ type: 'png' });
      const r2Key = await uploadSlide(jobId, i, screenshot);

      assets.push({ jobId, formatType: 'carousel_slide', slideIndex: i, storageUrl: r2Key });
    } finally {
      pool.release(page);
    }
  }

  // Generate LinkedIn/Twitter text (same logic as current)
  // ...

  await AssetRepository.insertBatch(assets);
  await JobRepository.updateStatus(jobId, 'complete');
});
```

**Key differences from current worker-render:**
- No fetching HTML from API — goes directly to Vite server
- No `fitTextToContainers` — loop engine handles text sizing
- No `waitForFunction('data-render-complete')` — `document.fonts.ready` is sufficient
- `addInitScript` sets globals before React mounts — same pattern as loop engine's exporter

---

### Phase 6: Update API

**`apps/api/src/server.ts`:**
- Remove render route registration
- Add Vite server health check (optional)

**`apps/api/src/routes/jobs.ts`:**
- `POST /api/jobs` — Accept `brandKit` field, store in job metadata
- `GET /api/jobs/:id` — Return brandKit info
- No changes to download endpoint

**`apps/api/src/bootstrap.ts`:**
- No Vite server management (separate PM2 process)

---

### Phase 7: PM2 Configuration

**`ecosystem.config.cjs`** — Add loop engine as separate process:

```js
{
  name: 'loop-engine',
  script: 'npx',
  args: 'vite --host --port 5173',
  cwd: resolve(__dirname, 'loop'),
  watch: false,
  autorestart: true,
  max_restarts: 10,
  env: { NODE_ENV: 'development' },
}
```

---

### Phase 8: Media Queries for Responsive Frames

Add CSS media queries to all 5 frame `.module.css` files. No changes to `.tsx` files.

**Breakpoint strategy:**
- `max-aspect-ratio: 1/1` — Tall/Square (4:5, 9:16, 1:1): keep current proportions
- `min-aspect-ratio: 1/1` and `max-aspect-ratio: 2/1` — Wide (16:9, 1.91:1): compress vertical padding
- `min-aspect-ratio: 2/1` — Ultra-wide: minimal padding

**Files to modify (CSS only):**
1. `loop/src/layouts/paper-of-record/frame.module.css`
2. `loop/src/layouts/the-globalist/frame.module.css`
3. `loop/src/layouts/the-terminal/frame.module.css`
4. `loop/src/layouts/the-curator/frame.module.css`
5. `loop/src/layouts/the-academic/frame.module.css`

**Example for Paper of Record:**

```css
/* Default (tall/square) — current values */
.masthead { top: 60px; }
.content { top: 180px; bottom: 140px; left: 80px; right: 80px; }
.footer { bottom: 60px; }

/* Wide formats (16:9, 1.91:1) */
@media (min-aspect-ratio: 1/1) {
  .masthead { top: 30px; }
  .content { top: 90px; bottom: 70px; left: 60px; right: 60px; }
  .footer { bottom: 30px; }
}

/* Ultra-wide */
@media (min-aspect-ratio: 2/1) {
  .masthead { top: 20px; }
  .content { top: 60px; bottom: 50px; left: 40px; right: 40px; }
  .footer { bottom: 20px; }
}
```

---

### Phase 9: Add `__BRAND_KIT` Global to Loop Engine

**File: `loop/src/main.tsx`** — Add window type declaration:

```tsx
declare global {
  interface Window {
    __BRAND_KIT?: { bg?: string; text?: string; accent?: string; fontSerif?: string; fontSans?: string; logoUrl?: string };
  }
}
```

**File: `loop/src/SlideRenderer.tsx`** — In `ExportRenderer`, read brandKit and pass to SlideRenderer:

```tsx
export default function ExportRenderer() {
  const slide = window.__SLIDE_DATA;
  const schemeId = window.__SLIDE_SCHEME_ID || 'archive_paper';
  const templateId = window.__SLIDE_TEMPLATE_ID || 'paper-of-record';
  const size = window.__SLIDE_SIZE || { width: 1080, height: 1350 };
  const brandKit = window.__BRAND_KIT;
  const scheme = (SCHEMES[schemeId as keyof typeof SCHEMES] || SCHEMES.archive_paper) as Scheme;

  // ... existing logic ...

  return (
    <main style={{ ... }}>
      <SlideRenderer
        slide={slide}
        scheme={scheme}
        templateId={templateId}
        brandKit={brandKit}
        size={size}
      />
    </main>
  );
}
```

This is ~5 lines of change to the loop engine. The `SlideRenderer` component already accepts and passes `brandKit` to Frame components. The Frame components already handle brandKit overrides. The only missing piece was reading `window.__BRAND_KIT`.

---

### Phase 10: Wire Workspace and Verify

**`pnpm-workspace.yaml`:**
```yaml
packages:
  - 'apps/*'
  - 'packages/*'
```

(Already includes `packages/*`, so `packages/loop-bridge` is automatically included.)

**Verification steps:**
1. `pnpm install` — Ensure loop-bridge resolves
2. `pnpm build` — Ensure TypeScript compiles
3. `pnpm typecheck` — No type errors
4. `pnpm lint` — No lint errors
5. Start PM2 processes: `pm2 start ecosystem.config.cjs`
6. Verify Vite server at `http://localhost:5173`
7. Verify editor loads at `http://localhost:5173` (no __SLIDE_DATA = editor mode)
8. Create test job via API with each template + platform combination
9. Verify screenshots are correct dimensions
10. Verify brandKit overrides work with custom_brand scheme

---

## 7. File Change Summary

| Action | Path | Description |
|--------|------|-------------|
| **DELETE** | `packages/templates/src/EditorialRunway/` | Entire directory |
| **DELETE** | `packages/templates/src/archive-paper/` | Old template |
| **DELETE** | `packages/templates/src/archive/` | Old template |
| **DELETE** | `packages/templates/src/custom-brand/` | Old template |
| **DELETE** | `packages/templates/src/industrial-brutal/` | Old template |
| **DELETE** | `packages/templates/src/protocol-001/` | Old template |
| **DELETE** | `packages/templates/src/void-editorial/` | Old template |
| **DELETE** | `packages/templates/src/engine/` | Legacy engine code |
| **DELETE** | `packages/templates/src/shared/` | Legacy shared utils |
| **DELETE** | `packages/templates/src/registry.ts` | Old registry |
| **DELETE** | `apps/api/src/routes/render.ts` | SSR endpoint |
| **DELETE** | `packages/design/src/types.ts` | V2 types |
| **DELETE** | `packages/design/src/templates.ts` | Legacy template configs |
| **CREATE** | `packages/loop-bridge/package.json` | Package manifest |
| **CREATE** | `packages/loop-bridge/tsconfig.json` | TypeScript config |
| **CREATE** | `packages/loop-bridge/src/index.ts` | Public API |
| **CREATE** | `packages/loop-bridge/src/schemas.ts` | Schema re-exports |
| **CREATE** | `packages/loop-bridge/src/prompts.ts` | Prompt re-exports |
| **CREATE** | `packages/loop-bridge/src/registry.ts` | Template registry |
| **CREATE** | `packages/loop-bridge/src/adapter.ts` | Data format adapter |
| **CREATE** | `packages/loop-bridge/src/brandkit.ts` | BrandKit types |
| **MODIFY** | `packages/schemas/src/index.ts` | Extend PlatformEnum, add brandKit |
| **MODIFY** | `packages/design/src/platforms.ts` | Add instagram-square, x |
| **MODIFY** | `packages/design/src/index.ts` | Remove deleted exports |
| **MODIFY** | `packages/templates/src/index.ts` | Remove EditorialRunway exports |
| **MODIFY** | `packages/templates/src/registry.ts` | **REWRITE** — delegate to loop-bridge |
| **MODIFY** | `apps/worker-structure/src/index.ts` | Use loop-bridge schemas/prompts |
| **MODIFY** | `apps/worker-render/src/index.ts` | Client-side rendering via Vite |
| **MODIFY** | `apps/api/src/server.ts` | Remove render route |
| **MODIFY** | `apps/api/src/routes/jobs.ts` | Accept brandKit |
| **MODIFY** | `ecosystem.config.cjs` | Add loop-engine PM2 process |
| **MODIFY** | `loop/src/main.tsx` | Add __BRAND_KIT window type |
| **MODIFY** | `loop/src/SlideRenderer.tsx` | Read __BRAND_KIT, pass to SlideRenderer |
| **MODIFY** | `loop/src/layouts/paper-of-record/frame.module.css` | Add media queries |
| **MODIFY** | `loop/src/layouts/the-globalist/frame.module.css` | Add media queries |
| **MODIFY** | `loop/src/layouts/the-terminal/frame.module.css` | Add media queries |
| **MODIFY** | `loop/src/layouts/the-curator/frame.module.css` | Add media queries |
| **MODIFY** | `loop/src/layouts/the-academic/frame.module.css` | Add media queries |

---

## 8. Execution Order

1. Phase 1: Clean up dead code
2. Phase 8: Add media queries to loop engine frames (CSS only, no risk)
3. Phase 9: Add __BRAND_KIT global to loop engine (~5 lines)
4. Phase 2: Create packages/loop-bridge
5. Phase 3: Update schemas and platforms
6. Phase 4: Rewrite worker-structure
7. Phase 5: Rewrite worker-render
8. Phase 6: Update API
9. Phase 7: Update PM2 config
10. Phase 10: Wire workspace and verify

Phases 8-9 are done early because they're low-risk changes to the loop engine that don't affect the existing system until the bridge is wired up.

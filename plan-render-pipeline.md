# Plan: Complete the Render Pipeline

## Context

The render worker is fully coded but has nothing to screenshot. It navigates Playwright to `http://localhost:5173/render/{jobId}/{slideIndex}`, waits for `[data-render-complete="true"]`, and takes a PNG screenshot. But the web app at that URL is just `<div>Loopreel</div>`.

We need to build the React slide rendering UI so the render worker can produce actual output.

## Architecture

```
Worker -> Vite (http://localhost:5173/render/:jobId/:slideIndex)
       -> React app fetches job data from API (http://localhost:3000/api/jobs/:jobId)
       -> React renders 1080x1080px slide with brand kit styling
       -> Page sets data-render-complete="true"
       -> Worker screenshots PNG -> uploads to R2
```

## Implementation Plan

### Step 1: Add `buildSlides()` to `@loopreel/schemas`

**File:** `packages/schemas/src/index.ts`

Add a function that maps `StructuredContent` into an array of slide data objects:

```typescript
export interface SlideData {
  type: 'hook' | 'value' | 'cta';
  index: number;
  heading: string;
  body?: string;
  bulletPoints?: string[];
  subtitle?: string;
  ctaUrl?: string;
}

export function buildSlides(content: StructuredContent): SlideData[] {
  const slides: SlideData[] = [];
  
  // Slide 0: Hook
  slides.push({
    type: 'hook',
    index: 0,
    heading: content.hook.title,
    subtitle: content.hook.subtitle,
  });
  
  // Slides 1..N: Value points
  content.valuePoints.forEach((vp, i) => {
    slides.push({
      type: 'value',
      index: i + 1,
      heading: vp.heading,
      body: vp.body,
      bulletPoints: vp.bulletPoints,
    });
  });
  
  // Slide N+1: CTA
  slides.push({
    type: 'cta',
    index: content.valuePoints.length + 1,
    heading: content.callToAction.message,
    ctaUrl: content.callToAction.url,
  });
  
  return slides;
}
```

Also export `BrandKitSchema` (already exists) and a `SlideData` type.

### Step 2: Install `react-router-dom` in web app

```bash
pnpm --filter @loopreel/web add react-router-dom
```

### Step 3: Set up React Router

**File:** `apps/web/src/main.tsx`

Add `BrowserRouter` wrapper.

**File:** `apps/web/src/App.tsx`

Add routes:
- `/render/:jobId/:slideIndex` -> `RenderPage`
- `/` -> placeholder (future test UI)

### Step 4: Create `RenderPage` component

**File:** `apps/web/src/pages/RenderPage.tsx`

This component:
1. Extracts `jobId` and `slideIndex` from URL params
2. Fetches job data from `http://localhost:3000/api/jobs/:jobId`
3. Calls `buildSlides(structuredJson)` to get slide data array
4. Renders the appropriate slide template for the given index
5. Sets `data-render-complete="true"` on `document.documentElement` after fonts load

Key details:
- Uses `useEffect` to fetch data and signal completion
- Uses `document.fonts.ready` to wait for fonts before signaling
- Renders a 1080x1080px container with the slide content

### Step 5: Create SlideTemplate component

**File:** `apps/web/src/components/SlideTemplate.tsx`

A single component that renders different layouts based on slide type:
- `hook` slide: Large centered title, optional subtitle
- `value` slide: Heading at top, body text, bullet points list
- `cta` slide: Call-to-action message, optional URL

Styling:
- Container: 1080x1080px, fixed dimensions, no scrolling
- Default template: `modern-dark` (dark background `#1a1a2e`, white text, accent color)
- Brand kit overrides: `primaryColor` applied as accent, `fontFamily` applied to text
- Google Fonts: Inter (sans-serif) loaded via `<link>` in index.html

### Step 6: Create slide CSS

**File:** `apps/web/src/styles/slides.css`

```css
.slide-container {
  width: 1080px;
  height: 1080px;
  overflow: hidden;
  font-family: 'Inter', sans-serif;
  position: relative;
}

.slide-hook { /* centered title layout */ }
.slide-value { /* heading + body + bullets layout */ }
.slide-cta { /* centered CTA layout */ }
```

### Step 7: Add Google Fonts to index.html

**File:** `apps/web/index.html`

Add `<link>` for Inter font from Google Fonts.

### Step 8: Wire up the API render route

**File:** `apps/api/src/routes/render.ts`

Keep the existing stub but update it to serve the React app's HTML for the render route. Actually, this route is on port 3000 (API) but the worker navigates to port 5173 (Vite). So this route is not used by the worker. We can leave it as-is or remove it.

Actually, looking more carefully: the worker goes to `http://localhost:5173/render/:jobId/:slideIndex` which hits Vite, not the API. The API's `/render/:jobId/:slideIndex` is a separate route that was probably planned for production (where Vite isn't running). For now, we can leave the API stub as-is.

## Files to Create/Modify

| File | Action | Purpose |
|------|--------|---------|
| `packages/schemas/src/index.ts` | Modify | Add `buildSlides()` function and `SlideData` type |
| `apps/web/package.json` | Modify | Add `react-router-dom` dependency |
| `apps/web/index.html` | Modify | Add Google Fonts link |
| `apps/web/src/main.tsx` | Modify | Add `BrowserRouter` |
| `apps/web/src/App.tsx` | Modify | Add routes |
| `apps/web/src/pages/RenderPage.tsx` | Create | Render page component |
| `apps/web/src/components/SlideTemplate.tsx` | Create | Slide template component |
| `apps/web/src/styles/slides.css` | Create | Slide CSS (1080x1080px) |

## Verification

1. `pnpm typecheck` passes
2. `pnpm build` passes
3. Start infra: `docker compose -f docker-compose.infra.yml up -d`
4. Start apps: `pnpm dev`
5. Create a job: `curl -X POST http://localhost:3000/api/jobs -H "Content-Type: application/json" -d '{"sourceUrl":"https://www.anthropic.com/research/building-effective-agents"}'`
6. Wait for structuring to complete
7. Manually test render route: open `http://localhost:5173/render/{jobId}/0` in browser
8. Verify slide renders at 1080x1080px with correct content
9. Check that `data-render-complete="true"` is set on the page
10. The render worker should now be able to screenshot slides

# Premium Render Pipeline — Redesign Plan

> Status: Planning
> Created: 2026-07-18

## The Problem

Current system is a text-on-dark-background generator. We need a **premium design engine** that produces agency-quality social media content.

| Current | Required |
|---------|----------|
| 1 template (dark theme) | 5-8 premium templates |
| Text on solid color | Background images + effects |
| No brand kit | AI-adapted brand profiles |
| 1080x1080 only | IG feed/stories, LinkedIn, Facebook |
| Same look every time | Unique per client + per iteration |
| No visual variety | Layouts, shapes, overlays, typography |

---

## Architecture Overview

### New Packages
- `@loopreel/design` — Template definitions, layout engine, design tokens
- `@loopreel/backgrounds` — Stock photo API (Unsplash) + gradient/pattern library

### Modified Packages
- `@loopreel/schemas` — New schemas for design decisions, brand kit, platform formats
- `@loopreel/templates` — Updated LLM prompts (split into 3 specialized calls)

### Modified Apps
- `apps/web` — Complete rewrite of SlideTemplate + slides.css
- `worker-render` — Multi-format rendering (IG, LinkedIn, Facebook)
- `apps/api` — Brand kit endpoints, platform-specific downloads

---

## LLM Strategy: Split Calls + XML Output

### Why XML Over JSON

LLMs are notoriously unreliable at returning perfectly formatted JSON:
- **Escaping issues** — Quotes, newlines, special characters break JSON
- **Trailing commas** — LLMs often add them, invalidating JSON
- **Schema confusion** — Complex nested JSON increases error surface
- **Partial outputs** — LLM may truncate mid-object

XML is more forgiving:
- **Self-describing tags** — Structure is explicit, less ambiguity
- **Natural text handling** — No escaping needed for content
- **Tolerant parsers** — XML parsers handle more formatting variations
- **LLM familiarity** — Trained on massive amounts of XML (HTML, config files, etc.)

### Approach: XML in, TypeScript out

1. LLM outputs XML with clear tag structure
2. XML parser extracts data (fast-xml-parser or similar)
3. Validate against Zod schemas
4. Convert to TypeScript types

### Split Into 3 Specialized Calls

**Call 1: Content Structuring**
- **Input**: Raw text from source URL
- **Output**: XML with hook, value points, CTA
- **Why**: Focused prompt = fewer hallucinations, cleaner output
- **Model**: Standard model (current `openrouter/free`)

**Call 2: Brand Profile Generation**
- **Input**: User-provided brand name, primary/secondary colors, font preference
- **Output**: XML with full brand kit (colors, fonts, style direction)
- **Why**: Isolates brand logic, can be cached per client
- **Model**: Standard model

**Call 3: Design Decisions**
- **Input**: Content from Call 1 + Brand kit from Call 2 + available templates
- **Output**: XML with template selection, layouts, backgrounds per slide
- **Why**: Full context for coherent design, independent of content quality
- **Model**: Standard model

### Benefits
1. **Bug-free outputs** — XML eliminates JSON formatting errors
2. **Better results** — Each call has a focused, simpler prompt
3. **Fewer hallucinations** — Smaller output surface per call
4. **Retry independence** — If design call fails, content doesn't need re-generation
5. **Cacheability** — Brand profiles cached per client, content reusable across renders
6. **Model optimization** — Could use different models per call in future

---

## Phase A: Design System Foundation

### A1. Template Definitions (`@loopreel/design`)

8 premium templates, each a JSON schema:

```typescript
interface Template {
  id: string;
  name: string;                    // "Modern Bold", "Minimal Clean", etc.
  colorPalette: ColorPalette;
  typography: TypographyConfig;
  layout: LayoutConfig;
  background: BackgroundConfig;
  effects: EffectsConfig;
  slideLayouts: {
    hook: LayoutVariant[];
    value: LayoutVariant[];
    cta: LayoutVariant[];
  };
}
```

**The 8 Templates:**

| # | Name | Aesthetic | Best For |
|---|------|-----------|----------|
| 1 | Modern Bold | Large type, geometric shapes, high contrast | Tech, startups |
| 2 | Minimal Clean | White space, thin fonts, subtle borders | Corporate, SaaS |
| 3 | Elegant Luxury | Serif fonts, gold accents, dark gradients | Fashion, lifestyle |
| 4 | Tech Gradient | Mesh gradients, neon accents, futuristic | AI, crypto, dev |
| 5 | Organic Natural | Soft shapes, earth tones, nature feel | Health, wellness |
| 6 | Corporate Sharp | Clean lines, blue/navy, structured grid | Finance, B2B |
| 7 | Creative Pop | Asymmetric, vibrant colors, playful | Marketing, media |
| 8 | Premium Dark | Dark + glow effects, glassmorphism | Premium brands |

Each template has 3-4 layout variants per slide type, ensuring visual variety within a carousel.

### A2. Background System (`@loopreel/backgrounds`)

**Stock photos** (Unsplash API):
- Search by content keywords (extracted by LLM in Call 3)
- Cache results in R2 to avoid repeated API calls
- Apply blur/overlay for text readability

**Gradient/pattern library**:
- 20+ curated mesh gradients (Stripe/Linear aesthetic)
- 10+ geometric patterns (dots, lines, grids, waves)
- CSS-only generation (no image files needed)

**Background selection logic**:
- Call 3 determines background type per slide (image vs gradient vs pattern)
- Template constrains which types are allowed
- Brand kit influences color extraction from images

### A3. Brand Kit System

**User Input** (via API):
```json
{
  "name": "Acme Corp",
  "primaryColor": "#FF6B6B",
  "secondaryColor": "#4ECDC4",
  "fontPreference": "modern-sans"
}
```

**LLM-Generated Brand Profile** (Call 2):
```json
{
  "name": "Acme Corp",
  "colors": {
    "primary": "#FF6B6B",
    "secondary": "#4ECDC4",
    "accent": "#45B7D1",
    "background": "#1A1A2E",
    "surface": "#232340",
    "text": "#FFFFFF",
    "muted": "#8888AA"
  },
  "fonts": {
    "heading": "Inter",
    "body": "Inter",
    "headingWeight": 800,
    "bodyWeight": 400
  },
  "style": "modern"
}
```

Stored per-client, reused across jobs.

---

## Phase B: AI Design Engine

### B1. LLM Output Schemas (XML Format)

All LLM outputs use XML for reliable parsing. Each output is validated against Zod schemas after XML→JSON conversion.

**Call 1 Output** (Content Structuring):
```xml
<content>
  <hook>
    <title>Attention-grabbing headline here</title>
    <subtitle>Optional supporting text</subtitle>
  </hook>
  <valuePoints>
    <point>
      <heading>First key insight</heading>
      <body>Detailed explanation of this point with supporting information.</body>
      <bulletPoints>
        <bullet>Key takeaway one</bullet>
        <bullet>Key takeaway two</bullet>
      </bulletPoints>
    </point>
    <point>
      <heading>Second key insight</heading>
      <body>Another detailed explanation.</body>
    </point>
  </valuePoints>
  <callToAction>
    <message>Clear call to action text</message>
    <url>https://example.com</url>
  </callToAction>
</content>
```

**Call 2 Output** (Brand Profile):
```xml
<brand>
  <colors>
    <primary>#FF6B6B</primary>
    <secondary>#4ECDC4</secondary>
    <accent>#45B7D1</accent>
    <background>#1A1A2E</background>
    <surface>#232340</surface>
    <text>#FFFFFF</text>
    <muted>#8888AA</muted>
  </colors>
  <fonts>
    <heading>Inter</heading>
    <body>Inter</body>
    <headingWeight>800</headingWeight>
    <bodyWeight>400</bodyWeight>
  </fonts>
  <styleDirection>modern</styleDirection>
</brand>
```

**Call 3 Output** (Design Decisions):
```xml
<design>
  <template>modern-bold</template>
  <colorScheme>
    <primary>#667eea</primary>
    <secondary>#764ba2</secondary>
    <accent>#f093fb</accent>
    <background>#0f0c29</background>
    <text>#FFFFFF</text>
  </colorScheme>
  <slides>
    <slide index="0">
      <layout>hero-center</layout>
      <backgroundType>gradient</backgroundType>
      <gradientType>mesh</gradientType>
      <gradientColors>
        <color>#667eea</color>
        <color>#764ba2</color>
      </gradientColors>
      <textAlignment>center</textAlignment>
      <emphasis>large</emphasis>
      <shapes>
        <shape type="circle" position="top-right" />
      </shapes>
    </slide>
    <slide index="1">
      <layout>split-left</layout>
      <backgroundType>image</backgroundType>
      <imageSearch>technology code</imageSearch>
      <imageBlur>0.3</imageBlur>
      <imageOverlay>rgba(0,0,0,0.5)</imageOverlay>
      <textAlignment>left</textAlignment>
      <emphasis>medium</emphasis>
      <shapes />
    </slide>
  </slides>
</design>
```

### B1b. XML Parser Setup

```typescript
import { XMLParser } from 'fast-xml-parser';

const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: '@_',
  textNodeName: '#text',
  isArray: (name) => ['point', 'bullet', 'slide', 'color', 'shape'].includes(name),
});

function parseLlmXml<T>(xml: string): T {
  return parser.parse(xml) as T;
}
```

After parsing, validate with Zod schemas before using the data.

### B2. Platform Format System

| Platform | Format | Dimensions | Max Slides | Notes |
|----------|--------|------------|------------|-------|
| Instagram Feed | Carousel | 1080x1080 | 10 | Square, most common |
| Instagram Stories | Stories | 1080x1920 | — | Vertical, full-bleed |
| LinkedIn | Post | 1200x627 | 10 | Landscape, professional |
| Facebook | Feed | 1200x630 | 10 | Landscape, social |

Each platform defines:
- Dimension constants
- Safe zone guidelines (text not cut off by platform UI)
- Typography scale adjustments (smaller on mobile-first platforms)
- Layout recommendations (landscape vs portrait)

---

## Phase C: Premium Rendering

### C1. SlideTemplate → SlideRenderer

Replace current component with a **layout engine**:

```tsx
<SlideRenderer slide={slideData} template={template} brandKit={brandKit} platform={platform}>
  <Background layer={backgroundConfig} />
  <Overlay effect={overlayConfig} />
  <ContentLayout layout={layoutVariant}>
    <Heading>{heading}</Heading>
    <Body>{body}</Body>
    <Bullets items={bulletPoints} />
  </ContentLayout>
  <DecorativeElements shapes={decorativeShapes} />
  <BrandMark logo={brandKit.logoUrl} />
  <SlideNumber current={index} total={count} />
</SlideRenderer>
```

### C2. CSS Architecture

Replace `slides.css` with a comprehensive design system:

- **CSS Grid** — Complex layouts (split, quadrant, centered, asymmetric)
- **CSS Filters** — Blur, brightness, contrast, drop-shadow
- **CSS Gradients** — Mesh, linear, radial backgrounds
- **CSS Blend Modes** — Overlay effects (multiply, screen, overlay)
- **CSS Clip-Path** — Geometric shapes (circles, triangles, waves)
- **CSS Custom Properties** — Theming per template
- **CSS Typography Scale** — Consistent font sizing across platforms

### C3. Visual Effects Library

Each template composes from:

| Effect Type | Options |
|-------------|---------|
| **Shadows** | Text shadow, box shadow, glow, neon glow |
| **Overlays** | Color overlay, gradient overlay, blur overlay |
| **Shapes** | Circle, rectangle, triangle, wave, blob |
| **Borders** | Solid, dashed, gradient, rounded |
| **Glass** | Background blur + semi-transparent surface |
| **Gradients** | Mesh, linear, radial, conic |

---

## Phase D: Implementation Sequence

### Week 1: Design System
1. Create `@loopreel/design` package with template schemas
2. Define 8 template objects (colors, typography, layouts, effects)
3. Create gradient/pattern library (CSS-only, 30+ variants)
4. Integrate Unsplash API in `@loopreel/backgrounds`
5. Update `@loopreel/schemas` with new design schemas

### Week 2: AI Engine
1. Create 3 specialized XML prompts (content, brand, design)
2. Add `fast-xml-parser` to `@loopreel/templates`
3. Create XML→TypeScript parser with Zod validation
4. Create brand kit generation endpoint (`POST /api/brands`)
5. Define platform format constants and safe zones
6. Update `worker-structure` to chain 3 LLM calls
7. Add design metadata to `StructuredContentSchema`

### Week 3: Rendering
1. Complete rewrite of `SlideTemplate` → `SlideRenderer`
2. Complete rewrite of `slides.css` → design system CSS
3. Implement background compositing (images + gradients + patterns)
4. Implement decorative shapes and effects
5. Add platform-specific rendering (IG stories, LinkedIn, Facebook)

### Week 4: Integration & Polish
1. Update `worker-render` for multi-format output
2. Update download endpoint for all platforms
3. Add brand kit API endpoints
4. Cache Unsplash images in R2
5. Performance optimization (parallel rendering)

### Week 5: Testing
1. Testcontainers integration tests
2. Playwright E2E tests
3. Visual regression tests (screenshot comparison)
4. Edge cases and error handling

---

## Key File Changes

| File | Change |
|------|--------|
| `packages/design/` | **NEW** — Template definitions, layout engine |
| `packages/backgrounds/` | **NEW** — Stock photo API, gradient library |
| `packages/schemas/src/index.ts` | Major — New design schemas, brand kit, platform formats |
| `packages/templates/src/prompts/v1/` | Major — 3 specialized XML prompts (content, brand, design) |
| `packages/templates/src/parser.ts` | **NEW** — XML parser + Zod validation for LLM outputs |
| `apps/web/src/components/SlideTemplate.tsx` | **REWRITE** → `SlideRenderer` with layout engine |
| `apps/web/src/styles/slides.css` | **REWRITE** → Comprehensive design system CSS |
| `apps/web/src/pages/RenderPage.tsx` | Major — Multi-platform support, design metadata |
| `apps/api/src/routes/brands.ts` | **NEW** — Brand kit CRUD |
| `apps/api/src/routes/jobs.ts` | Major — Platform param, brand kit input |
| `apps/worker-render/src/index.ts` | Major — Multi-format rendering loop |
| `apps/worker-structure/src/index.ts` | Major — Chain 3 LLM calls with XML parsing |
| `.env` | New — `UNSPLASH_ACCESS_KEY` |

### Dependencies to Add
- `fast-xml-parser` — XML parsing for LLM outputs
- `unsplash-js` — Unsplash API client (or use fetch directly)

---

## Cost Considerations

| Item | Impact |
|------|--------|
| **Unsplash API** | Free (50 req/hr demo, 5000 production) |
| **LLM calls** | 3 calls per job (~1500 tokens total, ~3x current) |
| **Storage** | 3-4x more PNGs (multi-format) |
| **Rendering** | Same Playwright approach, more CSS complexity |
| **XML parsing** | Negligible (fast-xml-parser is native C++ binding) |

---

## Success Criteria

1. **Visual quality** — Slides look like they came from a design agency
2. **Variety** — Same content produces different visual output per client
3. **Brand consistency** — Brand kit influences all slides coherently
4. **Platform coverage** — IG feed/stories, LinkedIn, Facebook all supported
5. **Performance** — Full pipeline completes in < 3 minutes
6. **Reliability** — Split LLM calls + XML output = zero formatting errors

---

## Appendix: XML Prompt Engineering Tips

When writing prompts that output XML:

1. **Show, don't tell** — Provide 2-3 complete XML examples in the prompt
2. **Tag naming** — Use consistent, descriptive tag names (not abbreviations)
3. **Self-closing tags** — Use `<empty/>` for optional fields, not `<empty></empty>`
4. **Attribute vs element** — Use attributes for metadata (index, type), elements for content
5. **CDATA sections** — Instruct LLM to use `<![CDATA[...]]>` for content with special chars
6. **Validation reminder** — Add "Output ONLY valid XML, no explanations" to prompt
7. **Schema reference** — Include the XML schema definition in the prompt for complex outputs

Example prompt addition:
```
IMPORTANT: Output ONLY valid XML. Do not include any text before or after the XML.
Use the exact tag structure shown in the examples below.
```

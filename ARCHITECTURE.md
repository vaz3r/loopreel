# Loopreel — Full System Architecture

End-to-end documentation of how Loopreel ingests a URL, structures content via LLM, renders carousel slides with Playwright, and delivers assets.

---

## Table of Contents

1. [System Overview](#1-system-overview)
2. [Monorepo Structure](#2-monorepo-structure)
3. [Infrastructure & Environment](#3-infrastructure--environment)
4. [Database Schema](#4-database-schema)
5. [Job State Machine](#5-job-state-machine)
6. [Stage 1: API — Job Creation](#6-stage-1-api--job-creation)
7. [Stage 2: Ingest Worker — Content Extraction](#7-stage-2-ingest-worker--content-extraction)
8. [Stage 3: Transcribe Worker — Audio Transcription](#8-stage-3-transcribe-worker--audio-transcription)
9. [Stage 4: Structure Worker — LLM Processing](#9-stage-4-structure-worker--llm-processing)
10. [Stage 5: Render Worker — Screenshot Pipeline](#10-stage-5-render-worker--screenshot-pipeline)
11. [Template System](#11-template-system)
12. [Design System](#12-design-system)
13. [Schemas & Type System](#13-schemas--type-system)
14. [Queue & Outbox Pattern](#14-queue--outbox-pattern)
15. [Storage (Cloudflare R2)](#15-storage-cloudflare-r2)
16. [Error Handling & Resilience](#16-error-handling--resilience)
17. [Monitoring & Observability](#17-monitoring--observability)

---

## 1. System Overview

Loopreel is a pipeline that converts a URL (blog post, article, or YouTube video) into a set of branded social media carousel slide images, plus LinkedIn and Twitter text drafts.

**High-level flow:**

```
URL → Ingest (scrape/download) → Transcribe (if video) → Structure (3× LLM calls) → Render (Playwright screenshots) → Upload (R2 storage)
```

**Key technologies:**
- **Runtime**: Node.js with TypeScript (tsx for dev, tsc for build)
- **Queue**: BullMQ over Redis
- **Database**: PostgreSQL (via `pg` driver)
- **LLM**: OpenRouter API (model: `openrouter/free`)
- **Browser**: Playwright (Chromium headless) for slide screenshots
- **Storage**: Cloudflare R2 (S3-compatible) for audio and slide images
- **Orchestration**: PM2 (development), outbox pattern for reliable queue publishing

---

## 2. Monorepo Structure

```
loopreel/
├── apps/
│   ├── api/                    # Fastify HTTP API
│   ├── web/                    # Vite + React (slide preview & render endpoint)
│   ├── worker-ingest/          # Content extraction (scrape/download)
│   ├── worker-transcribe/      # Audio → text (Whisper)
│   ├── worker-structure/       # LLM content + design structuring
│   ├── worker-render/          # Playwright screenshot capture
│   └── worker-relay/           # Outbox → BullMQ bridge
├── packages/
│   ├── schemas/                # Zod schemas, types, buildSlides()
│   ├── db/                     # PostgreSQL pool, repositories, migrations
│   ├── queue/                  # BullMQ client factories, Redis connection
│   ├── llm/                    # OpenRouter LLM client
│   ├── storage/                # Cloudflare R2 upload/download
│   ├── templates/              # XML parser, prompt files (v1/v2)
│   ├── design/                 # Platform configs, gradients, template defs
│   ├── errors/                 # Error classification (transient vs fatal)
│   └── types/                  # Shared TypeScript types
├── ecosystem.config.cjs        # PM2 process definitions
├── .env                        # Environment variables
└── package.json                # Root workspace config
```

---

## 3. Infrastructure & Environment

| Service | Purpose | Connection |
|---------|---------|------------|
| **PostgreSQL** | Job/asset state, outbox events, worker heartbeats | `DATABASE_URL` |
| **Redis** | BullMQ job queues | `REDIS_URL` |
| **OpenRouter** | LLM API (content structuring, brand, design) | `LLM_API_KEY`, `LLM_BASE_URL` |
| **Cloudflare R2** | Audio files + rendered slide PNGs | `R2_ACCOUNT_ID`, `R2_ACCESS_KEY_ID`, `R2_SECRET_ACCESS_KEY` |
| **Whisper** | Audio transcription (local instance) | `WHISPER_URL` |
| **Vite dev server** | React app serving `/render/:jobId/:slideIndex` | `RENDER_URL` |
| **Playwright** | Chromium headless browser pool for screenshots | `PLAYWRIGHT_POOL_SIZE` (default 5) |

**Key environment variables:**

| Variable | Default | Purpose |
|----------|---------|---------|
| `DATABASE_URL` | — | PostgreSQL connection string |
| `REDIS_URL` | `redis://localhost:6379` | Redis for BullMQ |
| `LLM_API_KEY` | — | OpenRouter API key |
| `LLM_BASE_URL` | `https://openrouter.ai/api/v1` | LLM endpoint |
| `LLM_MODEL` | `openrouter/free` | LLM model identifier |
| `LLM_TIMEOUT` | `60000` | LLM request timeout (ms) |
| `LLM_MAX_RETRIES` | `3` | LLM retry count |
| `R2_BUCKET_NAME` | `loopreel` | R2 bucket |
| `API_PORT` | `3000` | API listen port |
| `RENDER_URL` | `http://localhost:5173` | Vite dev server for Playwright |
| `PLAYWRIGHT_POOL_SIZE` | `5` | Browser page pool size |
| `WHISPER_URL` | `http://localhost:8000` | Whisper transcription endpoint |

---

## 4. Database Schema

### Enum Types

| Enum | Values |
|------|--------|
| `job_status` | `queued`, `ingesting`, `transcribing`, `structuring`, `rendering`, `complete`, `failed` |
| `source_type` | `youtube`, `blog`, `article` |
| `format_type` | `carousel_slide`, `linkedin_post`, `twitter_thread` |

### Table: `generation_jobs`

| Column | Type | Description |
|--------|------|-------------|
| `id` | `uuid` PK | Job identifier |
| `source_url` | `text` NOT NULL | Original URL |
| `source_type` | `source_type` NOT NULL | YouTube/blog/article |
| `status` | `job_status` NOT NULL | Current pipeline stage |
| `priority` | `integer` NOT NULL | 1 (high), 5 (normal), 10 (low) |
| `brand_kit` | `jsonb` NOT NULL | Brand configuration (colors, fonts, style) |
| `template_id` | `text` NOT NULL | Template identifier |
| `audio_r2_key` | `text` nullable | R2 key for downloaded audio |
| `structured_json` | `jsonb` nullable | Full carousel spec (content + design + brand) |
| `slide_count` | `integer` nullable | Total slides (hook + content + CTA) |
| `error_message` | `text` nullable | Error details on failure |
| `retry_count` | `integer` NOT NULL | BullMQ retry tracking |
| `created_at` | `timestamptz` | Creation timestamp |
| `updated_at` | `timestamptz` | Last update timestamp |

### Table: `generated_assets`

| Column | Type | Description |
|--------|------|-------------|
| `id` | `uuid` PK | Asset identifier |
| `job_id` | `uuid` FK → `generation_jobs` | Parent job |
| `format_type` | `format_type` NOT NULL | `carousel_slide`, `linkedin_post`, or `twitter_thread` |
| `slide_index` | `integer` nullable | 0-based slide position (for carousel_slide) |
| `storage_url` | `text` nullable | R2 key (e.g., `slides/{jobId}/0.png`) |
| `content_text` | `text` nullable | Text content (for linkedin_post/twitter_thread) |
| `created_at` | `timestamptz` | Creation timestamp |

### Table: `outbox_events`

| Column | Type | Description |
|--------|------|-------------|
| `id` | `uuid` PK | Event identifier |
| `queue_name` | `text` NOT NULL | Target queue: `ingest`, `transcribe`, `structure`, or `render` |
| `job_payload` | `jsonb` NOT NULL | Queue-specific payload |
| `bullmq_opts` | `jsonb` NOT NULL | BullMQ options (priority, attempts, backoff) |
| `published` | `boolean` NOT NULL | Whether relay has dispatched to BullMQ |
| `created_at` | `timestamptz` | Creation timestamp |

### Table: `worker_instances`

| Column | Type | Description |
|--------|------|-------------|
| `instance_id` | `text` PK | Worker UUID |
| `worker_type` | `text` NOT NULL | `ingest`, `transcribe`, `structure`, or `render` |
| `hostname` | `text` NOT NULL | Machine hostname |
| `queue_name` | `text` NOT NULL | BullMQ queue name |
| `started_at` | `timestamptz` | Worker start time |
| `last_seen` | `timestamptz` | Last heartbeat (active = within 30s) |
| `jobs_processed` | `bigint` | Running counter |

---

## 5. Job State Machine

```
POST /api/jobs
      │
      ▼
   [queued] ──── outbox → 'ingest' queue ────▶ worker-ingest
      │
      ▼
  [ingesting]
      │
      ├── YouTube ──▶ [transcribing] ── outbox → 'transcribe' ──▶ worker-transcribe
      │                    │
      │                    ▼
      │               [structuring] ── outbox → 'structure' ──▶ worker-structure
      │
      └── Blog/Article ──▶ [structuring] ── outbox → 'structure' ──▶ worker-structure
                                    │
                                    ▼
                               [rendering] ── outbox → 'render' ──▶ worker-render
                                    │
                                    ▼
                                [complete]
```

**Terminal states**: `complete` and `failed`. The TTL sweeper force-fails any non-terminal job stuck for >30 minutes.

**State transitions** are atomic: `JobRepository.updateStatusAndOutbox()` runs `UPDATE generation_jobs` + `INSERT outbox_events` in a single PostgreSQL transaction.

---

## 6. Stage 1: API — Job Creation

**File**: `apps/api/src/routes/jobs.ts`

### Endpoints

| Method | Route | Purpose |
|--------|-------|---------|
| `POST` | `/api/jobs` | Create a new generation job |
| `GET` | `/api/jobs/:id` | Fetch job status + assets |
| `GET` | `/api/jobs/:id/download` | Get presigned R2 URLs for completed slides |

### POST /api/jobs

**Request body:**
```json
{
  "sourceUrl": "https://example.com/article",
  "priority": 5,
  "platform": "instagram-feed",
  "brandKit": { "name": "MyBrand", "primaryColor": "#FF0000" },
  "templateId": "editorial-runway"
}
```

**Processing:**
1. Validates with `JobCreateSchema` (Zod)
2. Classifies source type: `youtube` / `article` / `blog` (by URL domain)
3. Builds full `BrandKit` from partial user input (fills defaults for missing fields)
4. `JobRepository.create()` — inserts job + outbox event in a transaction
5. Returns `{ jobId, status: 'queued' }` (201)

### GET /api/jobs/:id

Returns the job row + all associated assets from `generated_assets`, ordered by `slide_index`.

### GET /api/jobs/:id/download

Only works when `status === 'complete'`. Generates presigned R2 URLs for each `carousel_slide` asset. Optionally includes `linkedin_post` and `twitter_thread` text based on `?format=` query param.

### TTL Sweeper

Runs every 5 minutes. Force-fails any job stuck in a non-terminal state for >30 minutes.

---

## 7. Stage 2: Ingest Worker — Content Extraction

**Files**: `apps/worker-ingest/src/index.ts`, `handlers/blog.ts`, `handlers/youtube.ts`

### Blog/Article Path (two-tier scraping)

**Tier 1: Cheerio (server-side)**
1. `fetch()` with custom User-Agent, 30s timeout
2. Parse HTML with `cheerio`
3. Remove noise: `script, style, nav, header, footer, iframe, noscript`
4. Select content container: `<article>` → `<main>` → `<body>`
5. Extract: `h1-h4`, `p`, `li`, `blockquote`
6. Format as markdown-like text (headings as `## text`, lists as `- item`)
7. If <200 chars, fallback to `$.text()` (all document text)

**Tier 2: Puppeteer (headless Chrome)**
- Activated when Cheerio result <200 chars OR `fetch()` fails
- Launches headless Chromium, navigates with `networkidle2`
- Gets rendered HTML, applies same Cheerio parsing

**Validation:**
- Max length: 100,000 chars (truncated)
- Min length: 10 chars (hard error if shorter)

**Output:** Transitions job to `structuring` with `rawText` in the outbox payload.

### YouTube Path

1. `yt-dlp` downloads audio as MP3 (`-x --audio-format mp3 --audio-quality 5`)
2. 5-minute process timeout
3. Upload MP3 to R2 at `audio/{jobId}.mp3`
4. Delete local temp file
5. Transition to `transcribing` with `audioR2Key` in outbox payload

---

## 8. Stage 3: Transcribe Worker — Audio Transcription

**File**: `apps/worker-transcribe/src/index.ts`

1. Downloads audio from R2 using `audioR2Key`
2. Sends to local Whisper instance at `WHISPER_URL`
3. Receives transcription text
4. Transitions to `structuring` with `rawText` in outbox payload

---

## 9. Stage 4: Structure Worker — LLM Processing

**File**: `apps/worker-structure/src/index.ts` (602 lines)

This is the most complex worker. It makes **3 sequential LLM calls** to structure content, generate a brand profile, and decide visual design.

### Call 1: Content Structuring

**Prompt**: `packages/templates/src/prompts/v2/content-structure.txt`

**Input**: Raw text from ingest/transcribe

**Output**: XML `<content>` with:
```xml
<content>
  <meta>
    <seriesName>...</seriesName>
    <authorName>...</authorName>
    <handle>...</handle>
    <readTime>...</readTime>
    <category>...</category>
  </meta>
  <hook>
    <title>Attention-grabbing headline</title>
    <kicker>ESSAY / GUIDE / LIST</kicker>
    <subtitle>Optional supporting text</subtitle>
  </hook>
  <slides>
    <slide type="content">
      <heading>Key insight</heading>
      <body>Detailed explanation</body>
    </slide>
    <slide type="list">
      <heading>Optional heading</heading>
      <items>
        <item>Actionable takeaway</item>
      </items>
    </slide>
    <slide type="quote">
      <quote>Memorable quote</quote>
      <attribution>Person name</attribution>
    </slide>
    <slide type="stat">
      <value>96%</value>
      <label>times per day</label>
      <body>Optional context</body>
    </slide>
  </slides>
  <callToAction>
    <message>Clear call to action</message>
    <label>Button label</label>
  </callToAction>
</content>
```

**Rules**: 2-8 content slides, vary types, max 100 chars per heading/item.

**Validation**: If content validation fails → hard fail (`markFailed`). If parsing fails → retry.

### Call 2: Brand Profiling

**Prompt**: `packages/templates/src/prompts/v2/brand-profile.txt`

**Input**: Brand name, primary color, secondary color from job's `brand_kit`

**Output**: XML `<brand>` with:
- 7 colors: primary, secondary, accent, background, surface, text, muted
- 4 font settings: heading, body, headingWeight, bodyWeight
- styleDirection: modern | minimal | elegant | bold | organic

**Validation**: If brand validation fails → soft fail (logs warning, uses raw normalized data).

### Call 3: Design Decisions

**Prompt**: `packages/templates/src/prompts/v2/design-decisions.txt`

**Input**: Content hook title, slide headings, brand style, brand colors, template ID, platform, available templates

**Output**: XML `<design>` with:
```xml
<design>
  <template>editorial-runway</template>
  <colorScheme>
    <primary>#B31E23</primary>
    <secondary>#E7E4D9</secondary>
    <accent>#B31E23</accent>
    <background>#E7E4D9</background>
    <text>#15130F</text>
  </colorScheme>
  <slides>
    <slide index="0">
      <layout>hero-center</layout>
      <backgroundType>gradient</backgroundType>
      <textAlignment>center</textAlignment>
      <emphasis>large</emphasis>
    </slide>
  </slides>
</design>
```

**Validation**: If design validation fails → soft fail (falls back to `getDefaultDesign()` which generates alternating gradient/solid layouts).

### LLM Response Parsing

Uses a try-JSON-first, fall-back-to-XML strategy:

1. `extractJson()`: Strip markdown fences, try `JSON.parse()`, or find first `{`/last `}` substring
2. `parseXml()`: Uses `fast-xml-parser` with:
   - `attributeNamePrefix: '@_'` (XML attrs → `@_type`, etc.)
   - `textNodeName: '#text'`
   - `isArray`: Forces `point`, `bullet`, `slide`, `item`, `color`, `shape` to always be arrays

### normalizeContent()

Handles two formats:
- **New format** (when `content.slides` exists): Iterates slides, reads `@_type` attribute, dispatches by type (content/list/quote/stat)
- **Legacy format** (when `content.valuePoints` exists): Converts old `valuePoints` to new slide format for backward compatibility

### normalizeDesign()

Normalizes LLM design output. Forces `template` to `'editorial-runway'` regardless of LLM output.

### normalizeBrand()

Normalizes brand LLM output with defaults for missing fields.

### Post-LLM Processing

1. Template forced to `'editorial-runway'`
2. `buildSlidesWithDesign(content, design)` → `{ slides: SlideData[], meta: PostMeta }`
   - Creates HookSlide (index 0), ContentSlide[] (index 1..N), CtaSlide (last)
   - Attaches design metadata to each slide
3. Saves to DB:
   - `structured_json` = content + design + brand (JSONB)
   - `slide_count` = total slides
   - Status → `rendering` + outbox event for `render` queue

---

## 10. Stage 5: Render Worker — Screenshot Pipeline

**Files**: `apps/worker-render/src/index.ts`, `pool/browser-pool.ts`

### Browser Pool

- Single Chromium instance, headless, `--no-sandbox`
- Pool of 5 pages (configurable via `PLAYWRIGHT_POOL_SIZE`)
- Pages recycled after 100 uses (memory leak prevention)
- Acquire/release with 30s timeout, max 20 waiters

### Render Flow

For each slide (0 to `slide_count - 1`):

1. **Acquire** page from pool (or wait up to 30s)
2. **Navigate** to `{RENDER_URL}/render/{jobId}/{slideIndex}?platform={platform}`
3. **Wait** for `networkidle` (30s timeout)
4. **Wait** for `[data-render-complete="true"]` DOM attribute (20s timeout)
5. **Set viewport** to platform dimensions (e.g., 1080×1080 for Instagram Feed)
6. **Screenshot** entire viewport as PNG
7. **Upload** PNG to R2 at `slides/{jobId}/{slideIndex}.png`
8. **Release** page back to pool

### Platform Dimensions

| Platform | Width × Height | MaxSlides | TypographyScale |
|----------|---------------|-----------|-----------------|
| `instagram-feed` | 1080 × 1080 | 10 | 1.0 |
| `instagram-stories` | 1080 × 1920 | 10 | 1.1 |
| `linkedin` | 1200 × 627 | 10 | 0.85 |
| `facebook` | 1200 × 630 | 10 | 0.85 |

### Text Asset Generation

After all screenshots, the worker generates:

**LinkedIn Post:**
```
{hook title}
{hook subtitle}

📌 {slide 1 heading}
{slide 1 body}

📌 {slide 2 heading}
{slide 2 body}

{CTA message}
```

**Twitter Thread:**
```
{hook title}

1/N 📌 {slide 1 heading}
{slide 1 body}

2/N 📌 {slide 2 heading}
{slide 2 body}

{CTA message}
```

### Final Steps

1. Batch-insert all assets (slides + text) via `AssetRepository.insertBatch()`
2. Mark job as `complete` via `JobRepository.updateStatus()`

---

## 11. Template System

### Registry (`apps/web/src/components/templates/registry.ts`)

Only **one** template component exists: `EditorialTemplate` from `EditorialRunway/EditorialRunway.tsx`.

11 legacy template names alias to it with a console warning:
`modern-bold`, `modern-dark`, `editorial`, `minimal-clean`, `elegant-luxury`, `tech-gradient`, `organic-natural`, `corporate-sharp`, `creative-pop`, `premium-dark`, `glassmorphism`

### SlideRenderer (`apps/web/src/components/SlideTemplate.tsx`)

```typescript
const templateId = design?.template ?? 'editorial-runway';
const Template = getTemplate(templateId);
return <Template {...props} />;
```

### EditorialRunway Template (`EditorialRunway.tsx`)

The sole production template. Design system:

- **Ink/paper alternation**: Hook + CTA = dark (`#15130F`), content slides = light (`#E7E4D9`)
- **Accent color**: Hardcoded `#B31E23` (lacquer red) for spine, kicker, numbered markers
- **Display face**: Fraunces (italic) for headings, quotes, stats
- **Utility face**: Archivo for body text, labels, meta
- **Spine tab**: Fixed left-edge vertical bar with series name + look number

**Subcomponents:**

| Component | Purpose |
|-----------|---------|
| `SpineTab` | Left-edge vertical accent bar with rotated label |
| `RunningHead` | Top bar: series/category label + page mark |
| `HookBody` | Centered: optional kicker + large italic heading |
| `ContentBody` | Heading + body paragraph |
| `ListBody` | Heading + numbered items with border rules |
| `QuoteBody` | Large quotation mark + italic quote + attribution |
| `StatBody` | Large accent-colored number + label + context |
| `ImageBody` | Full-bleed image with gradient overlay + caption |
| `CtaBody` | Centered heading + outlined CTA button |
| `CreditFooter` | Avatar + handle + date (pushed to bottom via `marginTop: auto`) |

**Adaptive font sizing** via `clampFontSize()`:
- Hook heading: 30–96px (scales down for long titles)
- Content heading: 30–56px
- Body text: 16–22px

**Format presets:**
- `square`: 1080 × 1080
- `portrait`: 1080 × 1350
- `story`: 1080 × 1920

All dimensions use `* scale` where `scale = height / 1080`.

---

## 12. Design System

**Package**: `packages/design/src/`

### Platform Configs (`platforms.ts`)

Defines dimensions, safe zones, and max slides per platform (see table in §10).

### Gradients & Patterns (`backgrounds.ts`)

- **23 gradients** in 4 categories: mesh (10), dark (5), vibrant (4), subtle (3)
- **10 patterns**: dots, lines, grid, waves, noise

### Template Definitions (`templates.ts`)

10 pre-defined template configurations (design objects, not React components):
`modern-bold`, `minimal-clean`, `elegant-luxury`, `tech-gradient`, `organic-natural`, `corporate-sharp`, `creative-pop`, `premium-dark`, `glassmorphism`, `editorial`

These are configuration objects from an earlier iteration. Currently only `editorial-runway` is used in production.

### Utilities (`template-utils.ts`)

| Function | Purpose |
|----------|---------|
| `hexToRgba(hex, alpha)` | Color conversion for opacity effects |
| `clampFontSize(len, {min, max, pivot})` | Adaptive font sizing based on text length |
| `meshGradient(colors, angle)` | Multi-layer radial+linear gradient |
| `noiseTexture` | Inline SVG fractal noise |
| `diagonalStripes(color, alpha)` | CSS repeating gradient |
| `dots(color, alpha)` | Radial-gradient dot pattern |
| `grid(color, alpha)` | Cross-hatch pattern |

---

## 13. Schemas & Type System

**Package**: `packages/schemas/src/index.ts`

### Content Schemas (LLM Call 1 Output)

**`ContentSlideSchema`** — discriminated union on `type`:

| Type | Fields |
|------|--------|
| `content` | `heading`, `body?` |
| `list` | `heading?`, `items: string[]` |
| `quote` | `quote`, `attribution?` |
| `stat` | `value`, `label?`, `body?` |
| `image` | `imageUrl`, `imageCaption?` |

**`StructuredContentSchema`**: `{ meta?, hook, slides: ContentSlide[], callToAction }`

### Design Schemas (LLM Call 3 Output)

**`DesignOutputSchema`**: `{ template, colorScheme: {primary, secondary, accent, background, text}, slides: SlideDesign[] }`

**`SlideDesignSchema`**: `{ index, layout, backgroundType, gradientType?, gradientColors?, textAlignment, emphasis, shapes[] }`

### Brand Schemas (LLM Call 2 Output)

**`BrandKitSchema`**: `{ name, colors: {7 fields}, fonts: {heading, body, headingWeight, bodyWeight}, styleDirection }`

### Builder Functions

**`buildSlides(content)`**: Creates `SlideData[]` from structured content:
- Index 0: `HookSlide` (type: 'hook', heading: hook.title, kicker, subtitle)
- Index 1..N: Content slides (each with added `index`)
- Last: `CtaSlide` (type: 'cta', heading: cta.message)
- Also extracts `PostMeta` from `content.meta`

**`buildSlidesWithDesign(content, design)`**: Calls `buildSlides()`, then attaches `design.slides[i]` to each slide as `.design` property. Uses default design for slides beyond the design array length.

---

## 14. Queue & Outbox Pattern

### BullMQ Queues

| Queue | Concurrency | Attempts | Backoff |
|-------|-------------|----------|---------|
| `ingest` | 1 | 2 | Fixed 5s |
| `transcribe` | 1 | 2 | Fixed 10s |
| `structure` | 1 | 3 | Exponential 5s base |
| `render` | 1 | 1 | Fixed 5s |

### Outbox Pattern

Every state transition is atomic via `JobRepository.updateStatusAndOutbox()`:

```sql
BEGIN;
  UPDATE generation_jobs SET status = $newStatus WHERE id = $jobId;
  INSERT INTO outbox_events (queue_name, job_payload, published) VALUES ($queue, $payload, false);
COMMIT;
```

**Relay process** (`worker-relay`): Polls `outbox_events WHERE published = false` every 500ms using `SELECT ... FOR UPDATE SKIP LOCKED`. For each event, adds a job to the corresponding BullMQ queue, then marks `published = true`.

### Outbox Payloads per Queue

| Queue | Payload |
|-------|---------|
| `ingest` | `{ jobId, sourceUrl, sourceType }` |
| `transcribe` | `{ jobId, audioR2Key }` |
| `structure` | `{ jobId, rawText }` |
| `render` | `{ jobId }` |

---

## 15. Storage (Cloudflare R2)

**Package**: `packages/storage/src/`

Uses `@aws-sdk/client-s3` pointed at Cloudflare R2.

| Function | R2 Key | Content Type |
|----------|--------|-------------|
| `uploadAudio(jobId, data)` | `audio/{jobId}.mp3` | `audio/mpeg` |
| `uploadSlide(jobId, index, data)` | `slides/{jobId}/{index}.png` | `image/png` |
| `downloadAudio(r2Key)` | — | Returns Buffer |
| `deleteAudio(r2Key)` | — | — |
| `getPresignedUrl(key, expiresIn?)` | — | URL valid for 1 hour |

---

## 16. Error Handling & Resilience

### Error Classification (`packages/errors/src/index.ts`)

Errors are classified as **transient** or **fatal** by matching against known patterns:

**Transient (retryable):** `timeout`, `econnreset`, `econnrefused`, `socket hang up`, `rate limit`, `429`, `503`, `502`, `529`, `eai_again`, `fetch failed`

**Fatal (non-retryable):** Everything else.

### Worker-Level Handling

- **Transient errors**: Re-thrown → BullMQ retries per queue config
- **Fatal errors**: `JobRepository.markFailed(jobId, message)` → job is dead

### TTL Sweeper

Runs every 5 minutes. Force-fails any job stuck in a non-terminal state for >30 minutes.

### Idempotency Guards

Each worker checks the job's current status before processing:
- If status has already advanced past the expected state → skip (no-op)
- If job not found → log and skip

---

## 17. Monitoring & Observability

### Worker Heartbeats

Every 10 seconds, each worker upserts a row into `worker_instances`:
- `instance_id` (UUID)
- `worker_type` (ingest/transcribe/structure/render)
- `hostname`
- `queue_name`
- `jobs_processed` (running counter)
- `last_seen` (NOW())

Active workers = those with `last_seen` within 30 seconds.

### Render Worker Metrics

Sidecar HTTP server on port 8004 (`GET /metrics`) exposing:
- Browser pool stats (total pages, in-use, available, waiters)
- Jobs processed

### Logging

All workers use `pino` structured JSON logger. Log level from `LOG_LEVEL` env var (default: `info`).

### API Health Check

`GET /api/health` — returns database connection status, worker counts, queue depths.

---

## Appendix: Complete Request Lifecycle

```
1. User POSTs { sourceUrl, platform, brandKit } to /api/jobs
2. API creates job (status: queued) + outbox event (queue: ingest)
3. worker-relay polls outbox, adds to BullMQ 'ingest' queue
4. worker-ingest picks up job:
   a. Blog/article → Cheerio scrape (or Puppeteer fallback) → rawText
   b. YouTube → yt-dlp audio download → R2 upload → audioR2Key
5. Job transitions to structuring (or transcribing for YouTube)
6. worker-structure picks up job:
   a. LLM Call 1: rawText → StructuredContent (XML parsed)
   b. LLM Call 2: brandKit → BrandKit (XML parsed)
   c. LLM Call 3: content + brand → DesignOutput (XML parsed)
   d. buildSlidesWithDesign() → SlideData[] + PostMeta
   e. Save structured_json + slide_count to DB
   f. Transition to rendering
7. worker-render picks up job:
   a. For each slide 0..N:
      - Navigate Playwright to /render/{jobId}/{i}
      - Wait for data-render-complete signal
      - Screenshot viewport as PNG
      - Upload to R2
   b. Generate LinkedIn post + Twitter thread text
   c. Batch-insert all assets to DB
   d. Mark job as complete
8. User polls GET /api/jobs/{id} until status = complete
9. User calls GET /api/jobs/{id}/download for presigned R2 URLs
```

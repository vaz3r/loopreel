# Loopreel V1 — The Engine

> **Philosophy:** Build the backbone first. V1 is a scalable, tunable, production-grade content repurposing engine — no auth, no billing, no multi-tenancy. It is deliberately minimal on product surface and maximal on pipeline quality. Every architectural decision is made so that V1.1 can snap onto it without rework.

---

## Decisions Locked In

| Decision | Choice | Rationale |
|---|---|---|
| Frontend | Vite + React + TypeScript | Fast dev iteration, SPA (no SSR needed in V1) |
| Backend/API | Node.js + Fastify + TypeScript | Same language as frontend, Playwright is native Node, fast HTTP |
| Job Queue | BullMQ (Redis-backed) | TypeScript-native, priority support, any worker can connect from anywhere |
| LLM | DeepSeek V4 Flash (default) via central provider service | $0.14/1M input tokens cache miss, OpenAI-compatible format, 1M context |
| Rendering | Playwright browser pool (persistent, pre-warmed) | Full CSS fidelity, no browser restart per render |
| Transcription | Local Whisper (home server) | Near-zero cost |
| Infra (Dev) | Docker Compose (all services local) | Fast iteration, no cloud dependency during dev |
| Infra (Prod) | Oracle Cloud VPS + Home Server (Tailscale) | $0 compute, private heavy processing |
| Language | TypeScript everywhere | Single language across api, worker, web, packages |

---

## Monorepo Structure

```
loopreel/
├── apps/
│   ├── web/                   # Vite + React + TypeScript — internal test UI
│   ├── api/                   # Fastify + TypeScript — orchestrator, HTTP, Playwright pool
│   ├── worker-ingest/         # Consumes: ingest queue. Does: yt-dlp, web scraping
│   ├── worker-transcribe/     # Consumes: transcribe queue. Does: Whisper transcription
│   ├── worker-structure/      # Consumes: structure queue. Does: LLM → structured JSON
│   └── worker-render/         # Consumes: render queue. Does: Playwright → PNG slides
├── packages/
│   ├── templates/             # React components — carousel slide templates
│   ├── llm/                   # LLM provider abstraction (DeepSeek, OpenAI, Groq, etc.)
│   ├── queue/                 # BullMQ queue definitions + job type contracts (shared)
│   ├── transcription/         # Whisper client abstraction
│   └── types/                 # Shared TypeScript types across all apps
├── docker-compose.dev.yml          # Local dev: all services
├── docker-compose.vps.yml          # Oracle VPS services
├── docker-compose.homeserver.yml   # Home server workers
└── turbo.json                      # Turborepo build orchestration
```

---

## The Queue Architecture (Core of V1)

BullMQ is the spine of the entire system. Every heavy operation is a job. The API never does compute — it only enqueues and serves results.

### Queue Topology

4 queues, 4 dedicated worker types. Each worker type only knows about its own queue and carries only the dependencies it needs.

```
  API (Fastify)
  Receives HTTP request → debit credit → create job row
       │
       ▼
  ┌──────────────────────────────────────────────────┐
  │                  Redis                            │
  │                                                  │
  │   ingest      transcribe    structure    render   │
  │   queue       queue         queue        queue    │
  │   [P:1-10]    [P:1-10]      [P:1-10]     [P:1]   │
  └───┬───────────────┬─────────────┬────────────┬───┘
      │               │             │            │
      ▼               ▼             ▼            ▼
  worker-ingest  worker-       worker-      worker-render
                 transcribe    structure

  ┌─────────────────────────────────────────────────────────────┐
  │ worker-ingest                                               │
  │ • yt-dlp (child process) → download audio                  │
  │ • Cheerio → scrape blog HTML                               │
  │ • Puppeteer → JS-rendered pages (fallback)                 │
  │ • On finish: enqueues TranscribeJob or StructureJob        │
  │                                                            │
  │ Deps: yt-dlp binary, cheerio, puppeteer                    │
  │ Best deployed: Home server (keeps scraping IP private)     │
  │ Scale: run 2-3 for parallel ingestion                      │
  └─────────────────────────────────────────────────────────────┘

  ┌─────────────────────────────────────────────────────────────┐
  │ worker-transcribe                                           │
  │ • Calls faster-whisper HTTP API with audio file path       │
  │ • Handles audio download from R2 if needed                 │
  │ • On finish: enqueues StructureJob                         │
  │                                                            │
  │ Deps: HTTP client (axios/fetch), @aws-sdk/client-s3 (R2)   │
  │ Best deployed: Home server (co-located with Whisper)       │
  │ Scale: 1 usually sufficient; GPU-bound by Whisper itself   │
  └─────────────────────────────────────────────────────────────┘

  ┌─────────────────────────────────────────────────────────────┐
  │ worker-structure                                            │
  │ • Calls LLM via packages/llm abstraction                   │
  │ • Zod validates structured JSON output                     │
  │ • Retries once on schema validation failure                │
  │ • On finish: enqueues RenderJob                            │
  │                                                            │
  │ Deps: packages/llm, zod, openai (SDK)                      │
  │ Best deployed: Anywhere with internet — no GPU needed      │
  │ Scale: run 5-10 easily (I/O-bound, not CPU-bound)          │
  └─────────────────────────────────────────────────────────────┘

  ┌─────────────────────────────────────────────────────────────┐
  │ worker-render                                               │
  │ • Consumes render queue                                    │
  │ • Acquires a page from the Playwright pool (in-process)    │
  │ • Navigates to internal Vite render route                  │
  │ • Screenshots each slide → PNG                             │
  │ • Uploads to Cloudflare R2                                 │
  │ • Updates job status → complete                            │
  │                                                            │
  │ Deps: playwright, @aws-sdk/client-s3                        │
  │ Best deployed: Oracle VPS (co-located with web for render) │
  │ Scale: bounded by Playwright pool size (default 5 pages)   │
  └─────────────────────────────────────────────────────────────┘
```

### Priority Levels

```typescript
// packages/queue/src/priorities.ts
export const Priority = {
  HIGH: 1,    // Reserved for future paid tier — processes first
  NORMAL: 5,  // Default in V1
  LOW: 10,    // Background / cron jobs (founder auto-post engine)
} as const
```

### Job Type Contracts (Shared via packages/queue)

```typescript
// packages/queue/src/jobs.ts

export interface IngestJob {
  jobId: string
  sourceUrl: string
  sourceType: 'youtube' | 'blog' | 'article'
  priority: number
}

export interface TranscribeJob {
  jobId: string
  audioR2Key: string   // R2 object key for the downloaded audio file
  priority: number
}

export interface StructureJob {
  jobId: string
  rawText: string
  priority: number
}

export interface RenderJob {
  jobId: string
  structuredJson: StructuredContent
  brandKit: BrandKit
  templateId: string
  slideCount: number
  priority: number
}

export interface StructuredContent {
  hook: string
  valuePoints: Array<{
    headline: string
    body: string
    statOrQuote?: string
  }>
  summary: string
  cta: string
  linkedinPost: string
  twitterThread: string[]
}
```

### Each Worker: One Responsibility, Connect From Anywhere

Each worker is a standalone Node.js process. Point it at Redis and it starts consuming its specific queue. You can run multiple instances of any type independently.

```bash
# worker-ingest — on home server
docker run -e REDIS_URL=redis://100.x.x.x:6379 \
           -e R2_BUCKET=... -e R2_ACCESS_KEY=... \
           loopreel/worker-ingest:latest

# worker-transcribe — on home server (next to Whisper)
docker run -e REDIS_URL=redis://100.x.x.x:6379 \
           -e WHISPER_ENDPOINT=http://whisper:8000 \
           -e R2_BUCKET=... \
           loopreel/worker-transcribe:latest

# worker-structure — on Mac during dev, or VPS in prod
docker run -e REDIS_URL=redis://100.x.x.x:6379 \
           -e LLM_PROVIDER=deepseek \
           -e DEEPSEEK_API_KEY=sk-... \
           loopreel/worker-structure:latest

# worker-render — on Oracle VPS (co-located with web)
docker run -e REDIS_URL=redis://redis:6379 \
           -e RENDER_BASE_URL=http://web:5173 \
           -e R2_BUCKET=... \
           loopreel/worker-render:latest

# Scale structure workers horizontally without touching any other worker:
docker run ... loopreel/worker-structure:latest  # instance 2
docker run ... loopreel/worker-structure:latest  # instance 3
```

**Independent scaling per worker type:**

| Worker | Bottleneck | How to scale |
|---|---|---|
| worker-ingest | Network I/O, yt-dlp speed | Run 2–3 instances |
| worker-transcribe | GPU/CPU on Whisper | 1 instance usually fine; add GPU |
| worker-structure | LLM API rate limit / latency | Run 5–10 instances easily |
| worker-render | Playwright pool size | Increase `PLAYWRIGHT_POOL_SIZE` |

---

## The LLM Provider Abstraction (packages/llm)

A single interface that all structuring jobs go through. Swap providers with one env var change.

```typescript
// packages/llm/src/types.ts
export interface LLMProvider {
  name: string
  complete(prompt: string, options?: CompletionOptions): Promise<string>
  structuredComplete<T>(
    prompt: string,
    schema: ZodSchema<T>,
    options?: CompletionOptions
  ): Promise<T>
}

export interface CompletionOptions {
  temperature?: number
  maxTokens?: number
  thinkingMode?: boolean  // DeepSeek-specific
}
```

```typescript
// packages/llm/src/providers/deepseek.ts
import OpenAI from 'openai'  // DeepSeek uses OpenAI-compatible format

export class DeepSeekProvider implements LLMProvider {
  name = 'deepseek'
  private client: OpenAI
  private model: string

  constructor(apiKey: string, model = 'deepseek-v4-flash') {
    this.client = new OpenAI({
      apiKey,
      baseURL: 'https://api.deepseek.com',
    })
    this.model = model
  }

  async structuredComplete<T>(prompt: string, schema: ZodSchema<T>): Promise<T> {
    const response = await this.client.chat.completions.create({
      model: this.model,
      messages: [
        { role: 'system', content: STRUCTURE_SYSTEM_PROMPT },
        { role: 'user', content: prompt },
      ],
      response_format: { type: 'json_object' },
      temperature: 0,
    })
    const raw = JSON.parse(response.choices[0].message.content!)
    return schema.parse(raw)  // Zod validation — rejects malformed output
  }
}
```

```typescript
// packages/llm/src/factory.ts
export function createLLMProvider(config: LLMConfig): LLMProvider {
  switch (config.provider) {
    case 'deepseek':   return new DeepSeekProvider(config.apiKey, config.model)
    case 'openai':     return new OpenAIProvider(config.apiKey, config.model)
    case 'openrouter': return new OpenRouterProvider(config.apiKey, config.model)
    case 'groq':       return new GroqProvider(config.apiKey, config.model)
    case 'google':     return new GoogleAIProvider(config.apiKey, config.model)
    default: throw new Error(`Unknown LLM provider: ${config.provider}`)
  }
}
```

**Configured entirely via environment:**
```env
LLM_PROVIDER=deepseek
LLM_MODEL=deepseek-v4-flash
DEEPSEEK_API_KEY=sk-...

# Swap to any other provider without code changes:
# LLM_PROVIDER=openrouter
# LLM_MODEL=anthropic/claude-3.5-sonnet
# OPENROUTER_API_KEY=sk-or-...
```

**Why DeepSeek V4 Flash as default:**
- $0.0028/1M input tokens (cache hit) — system prompt is cached, near-free on repeat calls
- $0.14/1M input tokens (cache miss) — cheapest capable model available
- OpenAI-compatible format — zero integration friction
- 1M context window — handles long transcripts without chunking
- 2500 concurrent request limit — no rate limit concern at early scale

---

## The Playwright Rendering Pool (apps/api)

Lives inside the Fastify API process. Pre-warmed at startup, reused across requests.

```typescript
// apps/api/src/rendering/pool.ts
import { chromium, Browser, Page } from 'playwright'

export class BrowserPool {
  private available: Page[] = []
  private waiters: ((page: Page) => void)[] = []

  async init(size: number): Promise<void> {
    const browser = await chromium.launch({ headless: true })
    for (let i = 0; i < size; i++) {
      const page = await browser.newPage()
      this.available.push(page)
    }
  }

  async acquire(): Promise<Page> {
    if (this.available.length > 0) return this.available.shift()!
    return new Promise(resolve => this.waiters.push(resolve))
  }

  release(page: Page): void {
    if (this.waiters.length > 0) {
      this.waiters.shift()!(page)
    } else {
      this.available.push(page)
    }
  }

  async render(jobId: string, slideIndex: number, brandKit: BrandKit): Promise<Buffer> {
    const page = await this.acquire()
    try {
      await page.goto(`http://localhost:5173/render/${jobId}/${slideIndex}?brand=${encode(brandKit)}`)
      await page.waitForSelector('[data-render-complete="true"]', { timeout: 10_000 })
      return await page.screenshot({ type: 'png', clip: SLIDE_DIMENSIONS })
    } finally {
      this.release(page)
    }
  }
}
```

---

## The LLM System Prompt (Core Asset)

```
SYSTEM PROMPT (packages/llm/src/prompts/structure.ts):

You are a content repurposing engine. Given a transcript or article text, extract
the core narrative and structure it into a high-converting social media content framework.

Return ONLY valid JSON matching this exact schema — no markdown, no explanation,
no surrounding text.

Schema:
{
  "hook": "One punchy sentence (max 12 words) that makes someone stop scrolling.",
  "valuePoints": [
    {
      "headline": "Short scannable headline (max 8 words)",
      "body": "1-2 sentences expanding on the headline. Concrete and specific.",
      "statOrQuote": "A direct quote or specific number from the source. Only include if
                      genuinely present in the source text — never fabricate."
    }
    // 4-6 entries required
  ],
  "summary": "1-2 sentences that crystallize the core takeaway.",
  "cta": "A specific, low-friction call to action.",
  "linkedinPost": "150-200 word standalone LinkedIn post. No hashtags.",
  "twitterThread": [
    "Tweet 1: hook",
    "Tweets 2-7: one insight per tweet",
    "Final tweet: summary + CTA"
    // 6-10 tweets total
  ]
}

Hard rules:
- Every field is required.
- All content must be derived from the source — never hallucinate.
- valuePoints: minimum 4, maximum 6.
- twitterThread: minimum 6, maximum 10 tweets.
- linkedinPost: no hashtags.
- statOrQuote: only present if explicitly stated in source.
```

---

## API Endpoints (V1 — No Auth)

```
POST /api/jobs                  # Submit URL for processing
GET  /api/jobs/:jobId           # Poll status + get results
GET  /api/jobs/:jobId/download  # Download ZIP of all assets
GET  /api/health                # Health: pool status, queue depth
GET  /api/queue/stats           # Queue metrics per queue
GET  /api/workers               # Active worker heartbeats
```

Job status flow:
```
queued → ingesting → transcribing → structuring → rendering → complete
                                                            ↘ failed
```

---

## Database Schema (V1 — Minimal, Extensible)

```sql
-- No users, workspaces, or billing in V1.
-- Designed so V1.1 adds tables non-destructively.
-- All V1 jobs migrate to a default workspace in V1.1.

generation_jobs (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  source_url      text NOT NULL,
  source_type     text NOT NULL CHECK (source_type IN ('youtube', 'blog', 'article')),
  status          text NOT NULL DEFAULT 'queued',
  priority        integer NOT NULL DEFAULT 5,
  brand_kit       jsonb NOT NULL DEFAULT '{}',
  template_id     text NOT NULL DEFAULT 'modern-dark',
  structured_json jsonb,
  error_message   text,
  created_at      timestamptz NOT NULL DEFAULT now(),
  updated_at      timestamptz NOT NULL DEFAULT now()
)

generated_assets (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  job_id          uuid NOT NULL REFERENCES generation_jobs(id),
  format_type     text NOT NULL CHECK (format_type IN ('carousel_slide', 'linkedin_post', 'twitter_thread')),
  slide_index     integer,
  storage_url     text,
  content_text    text,
  created_at      timestamptz NOT NULL DEFAULT now()
)

worker_heartbeats (
  worker_id       text PRIMARY KEY,
  hostname        text NOT NULL,
  queues          text[] NOT NULL,
  last_seen       timestamptz NOT NULL DEFAULT now(),
  jobs_processed  integer NOT NULL DEFAULT 0
)
```

---

## Docker Compose: Local Dev

4 separate worker services — each only carries what it needs.

```yaml
# docker-compose.dev.yml
services:

  # ── Infrastructure ──────────────────────────────────────────
  redis:
    image: redis:7-alpine
    ports: ["6379:6379"]

  postgres:
    image: postgres:16-alpine
    ports: ["5432:5432"]
    environment:
      POSTGRES_DB: loopreel
      POSTGRES_PASSWORD: dev
    volumes:
      - pgdata:/var/lib/postgresql/data

  whisper:
    image: fedirz/faster-whisper-server:latest-cpu  # :latest-cuda on home server
    ports: ["8000:8000"]
    environment:
      WHISPER__MODEL: large-v3
    volumes:
      - whisper_cache:/root/.cache/huggingface

  # ── App Services ─────────────────────────────────────────────
  api:
    build: { context: ., dockerfile: apps/api/Dockerfile.dev }
    ports: ["3000:3000"]
    environment:
      DATABASE_URL: postgresql://postgres:dev@postgres:5432/loopreel
      REDIS_URL: redis://redis:6379
    depends_on: [postgres, redis]
    volumes: [./apps/api/src:/app/src, ./packages:/packages]

  web:
    build: { context: ., dockerfile: apps/web/Dockerfile.dev }
    ports: ["5173:5173"]
    environment:
      VITE_API_URL: http://localhost:3000
    volumes: [./apps/web/src:/app/src, ./packages:/packages]

  # ── Workers (each isolated, each independently scalable) ─────

  worker-ingest:
    build: { context: ., dockerfile: apps/worker-ingest/Dockerfile.dev }
    environment:
      REDIS_URL: redis://redis:6379
      DATABASE_URL: postgresql://postgres:dev@postgres:5432/loopreel
      R2_ENDPOINT: ${R2_ENDPOINT}
      R2_ACCESS_KEY: ${R2_ACCESS_KEY}
      R2_SECRET_KEY: ${R2_SECRET_KEY}
      R2_BUCKET: ${R2_BUCKET}
    depends_on: [redis, postgres]
    volumes: [./apps/worker-ingest/src:/app/src, ./packages:/packages]
    # Has: yt-dlp binary, cheerio, puppeteer
    # Does NOT have: Whisper client, LLM SDK, Playwright

  worker-transcribe:
    build: { context: ., dockerfile: apps/worker-transcribe/Dockerfile.dev }
    environment:
      REDIS_URL: redis://redis:6379
      DATABASE_URL: postgresql://postgres:dev@postgres:5432/loopreel
      WHISPER_ENDPOINT: http://whisper:8000
      R2_ENDPOINT: ${R2_ENDPOINT}
      R2_ACCESS_KEY: ${R2_ACCESS_KEY}
      R2_SECRET_KEY: ${R2_SECRET_KEY}
      R2_BUCKET: ${R2_BUCKET}
    depends_on: [redis, postgres, whisper]
    volumes: [./apps/worker-transcribe/src:/app/src, ./packages:/packages]
    # Has: packages/transcription HTTP client, R2 client
    # Does NOT have: yt-dlp, LLM SDK, Playwright

  worker-structure:
    build: { context: ., dockerfile: apps/worker-structure/Dockerfile.dev }
    environment:
      REDIS_URL: redis://redis:6379
      DATABASE_URL: postgresql://postgres:dev@postgres:5432/loopreel
      LLM_PROVIDER: deepseek
      LLM_MODEL: deepseek-v4-flash
      DEEPSEEK_API_KEY: ${DEEPSEEK_API_KEY}
    depends_on: [redis, postgres]
    volumes: [./apps/worker-structure/src:/app/src, ./packages:/packages]
    # Has: packages/llm, zod, openai SDK
    # Does NOT have: yt-dlp, Whisper client, Playwright

  worker-render:
    build: { context: ., dockerfile: apps/worker-render/Dockerfile.dev }
    environment:
      REDIS_URL: redis://redis:6379
      DATABASE_URL: postgresql://postgres:dev@postgres:5432/loopreel
      RENDER_BASE_URL: http://web:5173
      PLAYWRIGHT_POOL_SIZE: "3"
      R2_ENDPOINT: ${R2_ENDPOINT}
      R2_ACCESS_KEY: ${R2_ACCESS_KEY}
      R2_SECRET_KEY: ${R2_SECRET_KEY}
      R2_BUCKET: ${R2_BUCKET}
    depends_on: [redis, postgres, web]
    volumes: [./apps/worker-render/src:/app/src, ./packages:/packages]
    # Has: playwright (with chromium), packages/templates, R2 client
    # Does NOT have: yt-dlp, Whisper client, LLM SDK

volumes:
  pgdata:
  whisper_cache:
```

> Scale any worker type by duplicating its service block with a `_2` suffix, or with `docker compose up --scale worker-structure=3`. Each instance connects to the same Redis queue and self-balances via BullMQ's built-in distributed processing.

---

## V1 Phase Plan

### Phase 0 — Scaffold (Week 1)
- [ ] Turborepo monorepo, TypeScript configured across all 6 apps + packages
- [ ] `packages/queue`: BullMQ queue definitions, all 4 job type contracts as shared types
- [ ] `packages/llm`: DeepSeek + OpenAI adapters, Zod validation, factory function
- [ ] `packages/transcription`: Whisper HTTP client abstraction
- [ ] `packages/types`: shared TypeScript interfaces (BrandKit, StructuredContent, etc.)
- [ ] Docker Compose dev stack: all 9 services start cleanly with `docker compose up`
- [ ] Playwright pool prototype in `worker-render`: 3 instances, acquire/release, latency benchmarked

### Phase 1 — Pipeline: 4 Workers (Week 2–3)

**worker-ingest**
- [ ] Detect source type from URL (YouTube regex vs. blog)
- [ ] YouTube path: spawn `yt-dlp` as child process → upload audio to R2 → enqueue `TranscribeJob`
- [ ] Blog path: Cheerio fast-path → Puppeteer fallback for JS-rendered pages → enqueue `StructureJob` directly (bypass transcription)
- [ ] Update job status to `ingesting` → `awaiting_transcription` or `awaiting_structure`

**worker-transcribe**
- [ ] Download audio from R2 to local temp file
- [ ] POST to faster-whisper HTTP API
- [ ] Receive transcript text → enqueue `StructureJob`
- [ ] Update job status to `transcribing` → `awaiting_structure`

**worker-structure**
- [ ] Receive raw text → call LLM via `packages/llm`
- [ ] Zod validate response against `StructuredContentSchema`
- [ ] Auto-retry once on schema validation failure
- [ ] Write `structured_json` to postgres → enqueue `RenderJob`
- [ ] Update job status to `structuring` → `awaiting_render`

**worker-render**
- [ ] Acquire a Playwright page from the pool
- [ ] Navigate to internal Vite render route for each slide
- [ ] Wait for `[data-render-complete="true"]` selector
- [ ] Screenshot → PNG → upload to R2
- [ ] Write asset URLs to `generated_assets` table
- [ ] Update job status to `complete`

### Phase 2 — Templates (Week 4)
- [ ] Template `modern-dark`: dark bg, accent from brand color, bold sans-serif
- [ ] Template `clean-light`: white bg, brand primary accents, editorial feel
- [ ] Slide variants: hook slide, value slide (×4–6), CTA slide
- [ ] Brand kit applied via URL params: primary color, secondary color, font family
- [ ] Internal `/render/:jobId/:slideIndex` route pixel-accurate for both templates

### Phase 3 — Test UI (Week 5)
- [ ] URL input form, template selector, inline color pickers
- [ ] Job status page: polls every 3s, shows current stage with progress bar
- [ ] Slide preview: rendered PNGs in inline carousel viewer
- [ ] LinkedIn post + thread displayed as formatted text
- [ ] ZIP download button
- [ ] `/queue` page: depth per queue, live worker list (type + hostname + jobs processed)

### Phase 4 — Hardening (Week 6)
- [ ] Per-worker retry: auto-retry once, mark failed on second attempt, refund credit signal
- [ ] Worker heartbeat table: each worker type reports `worker_type`, `hostname`, `last_seen`
- [ ] Job TTL: jobs stuck >30min in any queue marked `failed` automatically
- [ ] `worker-render` Playwright pool: per-instance health check, isolated restart on crash
- [ ] Structured logging (pino) with `worker_type` field on every log line
- [ ] `/api/workers` endpoint: live breakdown by worker type, not just a flat list

---

## Exit Criteria for V1

Before moving to V1.1, all must be true:

- [ ] YouTube URL: full pipeline completes in **< 5 minutes** wall clock
- [ ] Blog URL: full pipeline completes in **< 2 minutes** wall clock
- [ ] LLM JSON output coherent and usable on **> 90%** of runs across 10 diverse sources
- [ ] Rendered slides pixel-accurate on both templates
- [ ] 5 concurrent jobs handled without queue degradation
- [ ] Each worker type can be scaled independently (run 3× `worker-structure` alongside 1× others)
- [ ] A `worker-structure` container started on a Mac with 2 env vars begins processing jobs immediately
- [ ] Removing any single worker type causes jobs to queue (not crash) — graceful degradation
- [ ] LLM provider swappable by changing 2 env vars on `worker-structure` only, zero code changes
- [ ] Per-job LLM cost confirmed **< $0.05** on DeepSeek V4 Flash
- [ ] `/api/workers` shows each worker's type, hostname, queue, and last heartbeat separately

---

## What V1 Does Not Have (By Design)

- Authentication / user accounts
- Multi-tenant workspaces
- Brand kit persistence
- Logo upload
- Stripe / billing / credits
- Buffer / scheduler export
- SEO landing pages
- Email notifications

All snap onto V1 in V1.1 without changing V1's core architecture.

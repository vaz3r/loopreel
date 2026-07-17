# Loopreel V1 — The Engine

> **Philosophy:** Build the backbone first. V1 is a scalable, tunable, production-grade content repurposing engine — no auth, no billing, no multi-tenancy. Deliberately minimal on product surface, maximal on pipeline quality. Every decision is made so that V1.1 snaps onto it without rework.

---

## Decisions Locked In

| Decision | Choice | Rationale |
|---|---|---|
| Frontend | Vite + React + TypeScript | Fast dev iteration, SPA (no SSR needed in V1) |
| Backend/API | Node.js + Fastify + TypeScript | Same language as workers, fast HTTP, native Playwright |
| Job Queue | BullMQ (Redis-backed) | TypeScript-native, priority support, distributed workers |
| LLM | DeepSeek V4 Flash (default) via central provider abstraction | $0.14/1M input tokens, OpenAI-compatible, 1M context, 2500 concurrency |
| Rendering | Playwright browser pool in `worker-render` | Full CSS fidelity, persistent pool, no browser restart per render |
| Transcription | Local faster-whisper HTTP server | Near-zero cost; `medium` model in dev, `large-v3` in prod |
| Infra (Dev) | Docker Compose (all services local) | No cloud dependency during iteration |
| Infra (Prod) | Oracle Cloud VPS + Home Server via Tailscale | $0 compute |
| Language | TypeScript everywhere | Single language across all apps and packages |

---

## Monorepo Structure

```
loopreel/
├── apps/
│   ├── web/                   # Vite + React + TypeScript — internal test UI
│   ├── api/                   # Fastify + TypeScript — HTTP orchestrator only
│   ├── worker-ingest/         # Consumes: ingest queue. yt-dlp + web scraping
│   ├── worker-transcribe/     # Consumes: transcribe queue. Whisper transcription
│   ├── worker-structure/      # Consumes: structure queue. LLM → structured JSON
│   └── worker-render/         # Consumes: render queue. Playwright pool → PNG slides
├── packages/
│   ├── templates/             # React components — carousel slide templates
│   ├── llm/                   # LLM provider abstraction
│   ├── queue/                 # BullMQ queue definitions + shared job type contracts
│   ├── transcription/         # faster-whisper HTTP client
│   ├── db/                    # Shared postgres client + query helpers (drizzle-orm)
│   └── types/                 # Shared TypeScript interfaces
├── docker-compose.dev.yml
├── docker-compose.vps.yml
├── docker-compose.homeserver.yml
└── turbo.json
```

> **`packages/db` is critical.** Every app that touches postgres imports from here — consistent schema, no duplicated query logic, no schema drift between services.

---

## Database Schema (V1 — Minimal, Extensible)

Define this first. Everything else depends on it.

```sql
-- Migration: 001_initial.sql

-- Status enum: single source of truth (no text column with magic strings)
CREATE TYPE job_status AS ENUM (
  'queued',
  'ingesting',
  'transcribing',
  'structuring',
  'rendering',
  'complete',
  'failed'
);

CREATE TABLE generation_jobs (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  source_url      text NOT NULL,
  source_type     text NOT NULL CHECK (source_type IN ('youtube', 'blog', 'article')),
  status          job_status NOT NULL DEFAULT 'queued',
  priority        integer NOT NULL DEFAULT 5,
  brand_kit       jsonb NOT NULL DEFAULT '{}',
  template_id     text NOT NULL DEFAULT 'modern-dark',
  audio_r2_key    text,                -- set by worker-ingest for YouTube jobs; used for cleanup
  structured_json jsonb,               -- set by worker-structure on success
  slide_count     integer,             -- set by worker-structure; drives render job count
  error_message   text,
  retry_count     integer NOT NULL DEFAULT 0,
  created_at      timestamptz NOT NULL DEFAULT now(),
  updated_at      timestamptz NOT NULL DEFAULT now()
);

-- Index for polling by ID (API), queue stats by status, and cleanup queries
CREATE INDEX idx_jobs_status ON generation_jobs(status);
CREATE INDEX idx_jobs_created_at ON generation_jobs(created_at DESC);

CREATE TABLE generated_assets (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  job_id          uuid NOT NULL REFERENCES generation_jobs(id) ON DELETE CASCADE,
  format_type     text NOT NULL CHECK (format_type IN ('carousel_slide', 'linkedin_post', 'twitter_thread')),
  slide_index     integer,        -- NULL for post/thread; 0-based for slides
  storage_url     text,           -- R2 public or presigned URL for images
  content_text    text,           -- plain text for linkedin_post, twitter_thread
  created_at      timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_assets_job_id ON generated_assets(job_id);

-- One row per running worker instance (not per worker type)
-- Upserted by each instance on startup and every 10s heartbeat
CREATE TABLE worker_instances (
  instance_id     text PRIMARY KEY,     -- uuid generated at process start
  worker_type     text NOT NULL,        -- 'ingest' | 'transcribe' | 'structure' | 'render'
  hostname        text NOT NULL,
  queue_name      text NOT NULL,
  started_at      timestamptz NOT NULL DEFAULT now(),
  last_seen       timestamptz NOT NULL DEFAULT now(),
  jobs_processed  bigint NOT NULL DEFAULT 0   -- incremented atomically via UPDATE ... + 1
);

CREATE INDEX idx_workers_type ON worker_instances(worker_type);
CREATE INDEX idx_workers_last_seen ON worker_instances(last_seen);

-- Transactional outbox: ensures job chaining survives worker crashes
-- A background relay process polls this table and publishes to BullMQ
CREATE TABLE outbox_events (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  queue_name      text NOT NULL,
  job_payload     jsonb NOT NULL,
  bullmq_opts     jsonb NOT NULL DEFAULT '{}',  -- priority, delay, etc.
  published       boolean NOT NULL DEFAULT false,
  created_at      timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_outbox_unpublished ON outbox_events(published, created_at)
  WHERE published = false;
```

---

## The Queue Architecture

4 queues, 4 specialized worker types. Each worker only knows its own queue.

### Pipeline Flow

```
  POST /api/jobs
       │
       ▼
  API: validate input
     → INSERT generation_jobs (status='queued')
     → INSERT outbox_events (queue='ingest', payload={jobId, sourceUrl, ...})
     → COMMIT transaction
     ← return { jobId, status: 'queued' }
       │
       ▼
  Outbox Relay (runs in API process, polls every 500ms):
     → SELECT unpublished outbox rows
     → ADD to BullMQ queue
     → UPDATE outbox SET published=true
       │
       ▼
  ┌────────────────────────────────────────────────────────┐
  │                     Redis / BullMQ                     │
  │  ingest[P]   transcribe[P]   structure[P]   render[P] │
  └─────┬───────────────┬──────────────┬─────────────┬────┘
        │               │              │             │
        ▼               ▼              ▼             ▼
  worker-ingest  worker-transcribe  worker-structure  worker-render
```

### Priority Inheritance

Priority is set once at job creation and **carried through the entire pipeline**. A HIGH priority ingest job produces a HIGH priority transcribe job, which produces a HIGH priority structure job, which produces a HIGH priority render job.

```typescript
// packages/queue/src/priorities.ts
export const Priority = {
  HIGH: 1,    // Future paid tier
  NORMAL: 5,  // Default in V1
  LOW: 10,    // Background / cron (founder auto-post)
} as const
```

### Job Payload Contracts

```typescript
// packages/queue/src/jobs.ts
// These are BullMQ job data payloads — minimal. Workers fetch full context from DB.

export interface IngestJobPayload {
  jobId: string
  sourceUrl: string
  sourceType: 'youtube' | 'blog' | 'article'
}

export interface TranscribeJobPayload {
  jobId: string
  audioR2Key: string    // R2 object key — persisted to DB, not just in-flight
}

export interface StructureJobPayload {
  jobId: string
  rawText: string       // Passed directly; avoids a DB read in worker-structure
}

export interface RenderJobPayload {
  jobId: string
  // worker-render reads brand_kit, template_id, structured_json, slide_count from DB
  // Not passed in payload — avoids large payloads in Redis and keeps single source of truth
}
```

> **Note on RenderJobPayload:** render workers read everything they need from the DB using `jobId`. This is intentional — brand kit JSON can be large, and passing it through Redis adds unnecessary payload size and a second source of truth. The DB read adds ~1ms latency which is negligible against a 500ms render.

---

## Transactional Outbox Pattern

**Problem:** If a worker writes to postgres (e.g., updates status, writes structured_json) and then crashes before calling `bullmq.add()`, the next job in the chain is never enqueued. The job silently stalls.

**Solution:** Write the next job's payload to an `outbox_events` table in the **same database transaction** as the status update. A relay process (running inside the API) polls unpublished outbox rows and publishes them to BullMQ. Since both writes are in one transaction, either both succeed or neither does.

```typescript
// packages/db/src/outbox.ts
export async function enqueueViaOutbox(
  tx: Transaction,                    // same pg transaction
  queueName: string,
  payload: object,
  opts: { priority: number; delay?: number }
): Promise<void> {
  await tx.insert(outboxEvents).values({
    queueName,
    jobPayload: payload,
    bullmqOpts: opts,
    published: false,
  })
  // That's it. The relay publishes to Redis asynchronously.
}

// Relay (runs in API process on a setInterval(500ms)):
export async function relayOutboxEvents(db: DB, queues: QueueMap): Promise<void> {
  const pending = await db
    .select()
    .from(outboxEvents)
    .where(eq(outboxEvents.published, false))
    .orderBy(asc(outboxEvents.createdAt))
    .limit(50)
    .for('update', { skipLocked: true })  // prevents double-publishing under concurrent relays

  for (const event of pending) {
    await queues[event.queueName].add(event.queueName, event.jobPayload, event.bullmqOpts)
    await db.update(outboxEvents)
      .set({ published: true })
      .where(eq(outboxEvents.id, event.id))
  }
}
```

This guarantees exactly-once enqueue semantics even across crashes.

---

## Worker Contracts

Each worker follows the same pattern:

```
1. BullMQ picks up job
2. Update job status in DB (e.g., 'ingesting')
3. Do the work
4. In a single DB transaction:
   a. Write result to DB (e.g., audio_r2_key, structured_json)
   b. Update job status (e.g., 'transcribing')
   c. INSERT outbox row for next queue
5. Commit
6. BullMQ marks job complete
```

If step 3 fails: BullMQ retries. The status update at step 2 is idempotent (setting the same status again is safe).

### worker-ingest

```
Deps: yt-dlp binary, cheerio, puppeteer-core, @aws-sdk/client-s3
Deploy: Home server (scraping IP stays off Oracle infra)
Concurrency: 3 per instance

On job:
  1. Update status → 'ingesting'
  2a. YouTube path:
      - Spawn yt-dlp: extract audio → write to /tmp/${jobId}.mp3
      - Upload /tmp/${jobId}.mp3 to R2 key: audio/${jobId}.mp3
      - Delete /tmp/${jobId}.mp3 (cleanup)
      - In transaction:
          UPDATE jobs SET audio_r2_key='audio/${jobId}.mp3', status='transcribing'
          INSERT outbox (queue='transcribe', payload={jobId, audioR2Key})
  2b. Blog/article path:
      - Cheerio: fetch + extract article text (fast path, ~100ms)
      - If Cheerio yields < 200 chars: Puppeteer fallback (JS-rendered pages)
      - In transaction:
          UPDATE jobs SET status='structuring'
          INSERT outbox (queue='structure', payload={jobId, rawText})

Error handling:
  - yt-dlp non-zero exit: mark job failed, write yt-dlp stderr as error_message
  - Network timeout on scrape: retry via BullMQ (max 2 attempts), then fail
```

### worker-transcribe

```
Deps: node-fetch / axios, @aws-sdk/client-s3, packages/transcription
Deploy: Home server (co-located with faster-whisper)
Concurrency: 1 (Whisper is the bottleneck, not the worker)

On job:
  1. Update status → 'transcribing'
  2. Download R2 audio file to /tmp/${jobId}.mp3
  3. POST audio to faster-whisper HTTP API
     - Content-Type: multipart/form-data (binary upload)
     - NOT a file path — faster-whisper server accepts binary or URL
  4. Receive transcript text
  5. Delete /tmp/${jobId}.mp3 (cleanup — always, in finally block)
  6. In transaction:
       UPDATE jobs SET status='structuring'
       INSERT outbox (queue='structure', payload={jobId, rawText})
  7. DELETE R2 audio object (audio is temporary; assets are in generated_assets)

Error handling:
  - Whisper HTTP timeout (>5min): BullMQ retry once, then fail
  - R2 download failure: BullMQ retry once
  - Cleanup (temp file delete) errors: log warning, do NOT fail the job
```

### worker-structure

```
Deps: packages/llm, zod, openai SDK
Deploy: Anywhere with internet — no GPU, no special binary
Concurrency: 10 per instance (I/O-bound: waiting on LLM API)

On job:
  1. Update status → 'structuring'
  2. Call LLM via packages/llm (DeepSeek V4 Flash, JSON mode, temp=0)
  3. Parse response with JSON.parse()
  4. Validate against StructuredContentSchema (Zod)
  5. If validation fails: auto-retry the LLM call once (not the whole BullMQ job)
     If still fails: mark job failed with error_message = 'LLM output failed schema validation'
  6. Compute slide_count = structuredContent.valuePoints.length + 2 (hook + CTA)
  7. In transaction:
       UPDATE jobs SET structured_json=..., slide_count=..., status='rendering'
       INSERT outbox (queue='render', payload={jobId})

Error handling:
  - LLM API 429 (rate limit): BullMQ exponential backoff, max 3 retries
  - LLM API 5xx: BullMQ retry once
  - Schema validation failure after 2 LLM attempts: fail job
```

### worker-render

```
Deps: playwright (chromium), @aws-sdk/client-s3, packages/db
Deploy: Oracle VPS (must be co-located with the web/Vite service for the render route)
Concurrency: controlled by Playwright pool size (not BullMQ concurrency)

Internal Playwright Pool:
  - Lives inside the worker-render process (NOT in the API)
  - Initialized at process startup
  - Pool size: PLAYWRIGHT_POOL_SIZE env var (default 5)
  - Max waiter queue depth: PLAYWRIGHT_MAX_WAITERS (default 20)
    - If waiters > max: reject new render requests with a 503-equivalent
    - This prevents memory runaway under backpressure

On job:
  1. Fetch job from DB: structured_json, brand_kit, template_id, slide_count
  2. Update status → 'rendering'
  3. For each slide index 0..slide_count-1 (in parallel, bounded by pool):
     a. acquire() page from pool
     b. page.goto(`${RENDER_BASE_URL}/render/${jobId}/${slideIndex}`)
        - NO query params — brand kit is read from DB inside the render route
     c. page.waitForSelector('[data-render-complete="true"]', timeout: 10s)
     d. PNG bytes = page.screenshot({ type:'png', clip: SLIDE_DIMENSIONS })
     e. release() page back to pool
     f. Upload PNG to R2: slides/${jobId}/${slideIndex}.png
  4. In transaction:
       INSERT generated_assets rows (one per slide, plus linkedin_post text, thread text)
       UPDATE jobs SET status='complete'
       (No outbox needed — render is the terminal stage)

Pool health:
  - Each page has a crash listener: if the page emits 'crash', remove from pool,
    launch a replacement page, add to pool. No restart of the whole browser.
  - Pool exposes size(), available(), waiters() metrics for the health endpoint.

Error handling:
  - page.goto timeout (>15s): release page, BullMQ retry once
  - page.waitForSelector timeout (>10s): page.reload() once, retry selector wait once,
    then release and fail the job (avoids leaking the page)
  - R2 upload failure: BullMQ retry (slides already rendered — cheap to retry)
```

---

## Playwright Pool (in worker-render)

```typescript
// apps/worker-render/src/pool.ts
import { chromium, Page } from 'playwright'

export class BrowserPool {
  private available: Page[] = []
  private waiters: Array<{ resolve: (p: Page) => void; reject: (e: Error) => void }> = []
  private allPages: Set<Page> = new Set()
  private browser: Awaited<ReturnType<typeof chromium.launch>>
  private maxWaiters: number

  constructor(private poolSize: number, maxWaiters = 20) {
    this.maxWaiters = maxWaiters
  }

  async init(): Promise<void> {
    this.browser = await chromium.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],  // required in Docker
    })
    for (let i = 0; i < this.poolSize; i++) {
      await this.addPage()
    }
  }

  private async addPage(): Promise<void> {
    const page = await this.browser.newPage()
    this.allPages.add(page)
    page.on('crash', () => this.handleCrash(page))
    this.available.push(page)
  }

  private async handleCrash(page: Page): Promise<void> {
    this.allPages.delete(page)
    this.available = this.available.filter(p => p !== page)
    // Reject any waiter waiting on this specific page (there shouldn't be one
    // since the page is in the pool when idle, but guard anyway)
    await this.addPage()  // replace the crashed page
  }

  async acquire(): Promise<Page> {
    if (this.available.length > 0) return this.available.shift()!

    if (this.waiters.length >= this.maxWaiters) {
      throw new Error(`BrowserPool: max waiter depth (${this.maxWaiters}) exceeded`)
    }

    return new Promise((resolve, reject) => {
      this.waiters.push({ resolve, reject })
    })
  }

  release(page: Page): void {
    if (!this.allPages.has(page)) return  // page crashed, discard
    if (this.waiters.length > 0) {
      this.waiters.shift()!.resolve(page)
    } else {
      this.available.push(page)
    }
  }

  metrics() {
    return {
      total: this.allPages.size,
      available: this.available.length,
      waiters: this.waiters.length,
    }
  }

  async destroy(): Promise<void> {
    await this.browser.close()
  }
}
```

---

## The Vite Render Route

Internal-only page that worker-render navigates to for screenshots. Not accessible from public UI.

```tsx
// apps/web/src/pages/render/[jobId]/[slideIndex].tsx
// Protected by: middleware that rejects requests not from 127.0.0.1

import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export function RenderPage() {
  const { jobId, slideIndex } = useParams<{ jobId: string; slideIndex: string }>()
  const [ready, setReady] = useState(false)
  const [data, setData] = useState<SlideData | null>(null)

  useEffect(() => {
    // Fetch from API — brand kit comes from DB, not URL params
    fetch(`/api/jobs/${jobId}/render-data?slideIndex=${slideIndex}`)
      .then(r => r.json())
      .then((d: SlideData) => {
        setData(d)
        // Wait for all images/fonts to load before signalling ready
        document.fonts.ready.then(() => {
          setReady(true)
          document.documentElement.setAttribute('data-render-complete', 'true')
        })
      })
  }, [jobId, slideIndex])

  if (!data) return <div style={{ display: 'none' }} />

  return (
    <SlideTemplate
      slide={data.slide}
      brandKit={data.brandKit}
      templateId={data.templateId}
    />
  )
}
```

```typescript
// API endpoint that serves render data (internal use only)
// GET /api/jobs/:jobId/render-data?slideIndex=N
// Middleware: reject if X-Forwarded-For or remote IP != 127.0.0.1

fastify.get('/api/jobs/:jobId/render-data', {
  schema: { hide: true },  // exclude from OpenAPI docs
}, async (req, reply) => {
  const { jobId } = req.params as { jobId: string }
  const slideIndex = parseInt((req.query as any).slideIndex)
  const job = await db.query.generationJobs.findFirst({ where: eq(jobs.id, jobId) })
  if (!job?.structuredJson) return reply.code(404).send()

  const structured = job.structuredJson as StructuredContent
  const slides = buildSlides(structured)  // hook + value points + CTA

  return {
    slide: slides[slideIndex],
    brandKit: job.brandKit,
    templateId: job.templateId,
  }
})
```

---

## LLM Provider Abstraction (`packages/llm`)

```typescript
// packages/llm/src/types.ts
export interface LLMProvider {
  name: string
  structuredComplete<T>(
    systemPrompt: string,
    userPrompt: string,
    schema: ZodSchema<T>,
    options?: { temperature?: number; maxTokens?: number }
  ): Promise<T>
}
```

```typescript
// packages/llm/src/providers/deepseek.ts
export class DeepSeekProvider implements LLMProvider {
  name = 'deepseek'
  private client: OpenAI

  constructor(private apiKey: string, private model = 'deepseek-v4-flash') {
    this.client = new OpenAI({ apiKey, baseURL: 'https://api.deepseek.com' })
  }

  async structuredComplete<T>(
    systemPrompt: string,
    userPrompt: string,
    schema: ZodSchema<T>,
    options: { temperature?: number; maxTokens?: number } = {}
  ): Promise<T> {
    const response = await this.client.chat.completions.create({
      model: this.model,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
      ],
      response_format: { type: 'json_object' },
      temperature: options.temperature ?? 0,
      max_tokens: options.maxTokens,
    })

    const content = response.choices[0]?.message?.content
    if (!content) throw new Error('DeepSeek returned empty content')

    let parsed: unknown
    try {
      parsed = JSON.parse(content)
    } catch {
      throw new Error(`DeepSeek returned non-JSON content: ${content.slice(0, 200)}`)
    }

    return schema.parse(parsed)  // throws ZodError if schema mismatch
  }
}
```

```typescript
// packages/llm/src/factory.ts
export type LLMProviderName = 'deepseek' | 'openai' | 'openrouter' | 'groq' | 'google'

export function createLLMProvider(env: NodeJS.ProcessEnv): LLMProvider {
  const provider = (env.LLM_PROVIDER ?? 'deepseek') as LLMProviderName
  const model = env.LLM_MODEL
  const apiKey = env[`${provider.toUpperCase()}_API_KEY`]
  if (!apiKey) throw new Error(`Missing env var: ${provider.toUpperCase()}_API_KEY`)

  switch (provider) {
    case 'deepseek':   return new DeepSeekProvider(apiKey, model)
    case 'openai':     return new OpenAIProvider(apiKey, model)
    case 'openrouter': return new OpenRouterProvider(apiKey, model)
    case 'groq':       return new GroqProvider(apiKey, model)
    case 'google':     return new GoogleAIProvider(apiKey, model)
  }
}
```

---

## The LLM System Prompt

```typescript
// packages/llm/src/prompts/structure.ts
export const STRUCTURE_SYSTEM_PROMPT = `
You are a content repurposing engine. Given a transcript or article, extract the
core narrative and structure it into a high-converting social media framework.

Return ONLY a single valid JSON object. No markdown fences, no commentary.

Required schema:
{
  "hook": string,           // One punchy sentence, max 12 words, stops the scroll
  "valuePoints": [          // Minimum 4, maximum 6 items
    {
      "headline": string,   // Max 8 words, scannable
      "body": string,       // 1-2 sentences, concrete and specific
      "statOrQuote": string | null  // Exact quote or stat from source; null if none
    }
  ],
  "summary": string,        // 1-2 sentences crystallizing the core takeaway
  "cta": string,            // Specific, low-friction call to action
  "linkedinPost": string,   // 150-200 words, no hashtags, ends with a question or CTA
  "twitterThread": string[] // 6-10 tweets; tweet[0] is hook, last tweet is CTA
}

Validation rules (violations cause a hard retry):
- All fields required, no nulls except statOrQuote
- valuePoints.length must be 4-6
- twitterThread.length must be 6-10
- linkedinPost must not contain # character
- statOrQuote: only include if the exact number or quote appears verbatim in the source
- Never fabricate data not present in the source text
`.trim()
```

---

## API Endpoints (V1 — No Auth)

```
POST /api/jobs
  Body: { sourceUrl, brandKit?, templateId?, priority? }
  → Creates job, writes to outbox, returns { jobId, status: 'queued' }

GET /api/jobs/:jobId
  → Returns job row + generated_assets (after complete)

GET /api/jobs/:jobId/download
  → Returns 302 redirect to a Cloudflare R2 presigned ZIP URL
  → API pre-generates the ZIP on first request, caches the presigned URL

GET /api/jobs/:jobId/render-data?slideIndex=N  [INTERNAL ONLY — 127.0.0.1]
  → Returns { slide, brandKit, templateId } for Playwright render route

GET /api/health
  → { status, pool: { total, available, waiters }, queues: { ingest, transcribe, structure, render } }
  Note: pool metrics come from worker-render's HTTP sidecar endpoint, not the API process

GET /api/queue/stats
  → BullMQ queue metrics: waiting, active, completed, failed counts per queue

GET /api/workers
  → Active worker_instances rows where last_seen > now() - 30s, grouped by worker_type
```

**Job status flow (single enum, no aliases):**
```
queued → ingesting → transcribing → structuring → rendering → complete
                  ↘                ↘             ↘          ↘
                  failed          failed         failed     failed
```

---

## Worker Health Sidecar

Each worker exposes a tiny HTTP server on a local port (not exposed externally) so the API can aggregate metrics:

```typescript
// packages/worker-base/src/sidecar.ts
// Included by all workers. Port: worker-specific (8001=ingest, 8002=transcribe, etc.)

export function startSidecar(port: number, getMetrics: () => WorkerMetrics) {
  const server = http.createServer((req, res) => {
    if (req.url === '/metrics') {
      res.writeHead(200, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify(getMetrics()))
    } else {
      res.writeHead(404).end()
    }
  })
  server.listen(port)
}
```

---

## Docker Compose: Local Dev

```yaml
# docker-compose.dev.yml
services:

  # ── Infrastructure ─────────────────────────────────────────────
  redis:
    image: redis:7-alpine
    ports: ["6379:6379"]
    command: redis-server --maxmemory 256mb --maxmemory-policy allkeys-lru

  postgres:
    image: postgres:16-alpine
    ports: ["5432:5432"]
    environment:
      POSTGRES_DB: loopreel
      POSTGRES_PASSWORD: dev
      POSTGRES_USER: loopreel
    volumes:
      - pgdata:/var/lib/postgresql/data
      - ./packages/db/migrations:/docker-entrypoint-initdb.d  # auto-run migrations on first start

  whisper:
    image: fedirz/faster-whisper-server:latest-cpu
    ports: ["8000:8000"]
    environment:
      WHISPER__MODEL: medium          # 'medium' in dev (fast on CPU); 'large-v3' on home server GPU
      WHISPER__INFERENCE_DEVICE: cpu  # 'cuda' on home server
    volumes:
      - whisper_cache:/root/.cache/huggingface

  # ── App Services ────────────────────────────────────────────────
  api:
    build: { context: ., dockerfile: apps/api/Dockerfile.dev }
    ports: ["3000:3000"]
    environment:
      DATABASE_URL: postgresql://loopreel:dev@postgres:5432/loopreel
      REDIS_URL: redis://redis:6379
      NODE_ENV: development
    depends_on: [postgres, redis]
    volumes: [./apps/api/src:/app/src, ./packages:/packages]

  web:
    build: { context: ., dockerfile: apps/web/Dockerfile.dev }
    ports: ["5173:5173"]
    environment:
      VITE_API_URL: http://localhost:3000
    volumes: [./apps/web/src:/app/src, ./packages:/packages]

  # ── Workers ─────────────────────────────────────────────────────
  worker-ingest:
    build: { context: ., dockerfile: apps/worker-ingest/Dockerfile.dev }
    environment:
      REDIS_URL: redis://redis:6379
      DATABASE_URL: postgresql://loopreel:dev@postgres:5432/loopreel
      R2_ENDPOINT: ${R2_ENDPOINT}
      R2_ACCESS_KEY_ID: ${R2_ACCESS_KEY_ID}
      R2_SECRET_ACCESS_KEY: ${R2_SECRET_ACCESS_KEY}
      R2_BUCKET: ${R2_BUCKET}
      WORKER_CONCURRENCY: "2"
    depends_on: [redis, postgres]
    volumes: [./apps/worker-ingest/src:/app/src, ./packages:/packages]

  worker-transcribe:
    build: { context: ., dockerfile: apps/worker-transcribe/Dockerfile.dev }
    environment:
      REDIS_URL: redis://redis:6379
      DATABASE_URL: postgresql://loopreel:dev@postgres:5432/loopreel
      WHISPER_ENDPOINT: http://whisper:8000
      R2_ENDPOINT: ${R2_ENDPOINT}
      R2_ACCESS_KEY_ID: ${R2_ACCESS_KEY_ID}
      R2_SECRET_ACCESS_KEY: ${R2_SECRET_ACCESS_KEY}
      R2_BUCKET: ${R2_BUCKET}
      WORKER_CONCURRENCY: "1"    # Whisper is the bottleneck, not this worker
    depends_on: [redis, postgres, whisper]
    volumes: [./apps/worker-transcribe/src:/app/src, ./packages:/packages]

  worker-structure:
    build: { context: ., dockerfile: apps/worker-structure/Dockerfile.dev }
    environment:
      REDIS_URL: redis://redis:6379
      DATABASE_URL: postgresql://loopreel:dev@postgres:5432/loopreel
      LLM_PROVIDER: deepseek
      LLM_MODEL: deepseek-v4-flash
      DEEPSEEK_API_KEY: ${DEEPSEEK_API_KEY}
      WORKER_CONCURRENCY: "5"    # I/O-bound; safe to run many concurrently
    depends_on: [redis, postgres]
    volumes: [./apps/worker-structure/src:/app/src, ./packages:/packages]

  worker-render:
    build: { context: ., dockerfile: apps/worker-render/Dockerfile.dev }
    environment:
      REDIS_URL: redis://redis:6379
      DATABASE_URL: postgresql://loopreel:dev@postgres:5432/loopreel
      RENDER_BASE_URL: http://web:5173
      PLAYWRIGHT_POOL_SIZE: "3"
      PLAYWRIGHT_MAX_WAITERS: "10"
      R2_ENDPOINT: ${R2_ENDPOINT}
      R2_ACCESS_KEY_ID: ${R2_ACCESS_KEY_ID}
      R2_SECRET_ACCESS_KEY: ${R2_SECRET_ACCESS_KEY}
      R2_BUCKET: ${R2_BUCKET}
    depends_on: [redis, postgres, web]
    volumes: [./apps/worker-render/src:/app/src, ./packages:/packages]

volumes:
  pgdata:
  whisper_cache:
```

**`.env.dev` (committed as `.env.dev.example`, never commit real values):**
```env
R2_ENDPOINT=https://<account>.r2.cloudflarestorage.com
R2_ACCESS_KEY_ID=
R2_SECRET_ACCESS_KEY=
R2_BUCKET=loopreel-dev
DEEPSEEK_API_KEY=
```

---

## V1 Phase Plan

### Phase 0 — Scaffold (Week 1)

**Monorepo + shared packages (do this first — everything depends on it)**
- [ ] Turborepo monorepo init, TypeScript strict mode across all apps + packages
- [ ] `packages/db`: drizzle-orm schema, migration files, shared query client
- [ ] Run migrations: `docker compose up postgres` then `pnpm db:migrate`
- [ ] `packages/queue`: BullMQ queue instances + all 4 job payload types
- [ ] `packages/types`: `BrandKit`, `StructuredContent`, `SlideData`, `WorkerMetrics`
- [ ] `packages/llm`: DeepSeek + OpenAI providers, Zod `StructuredContentSchema`, factory
- [ ] `packages/transcription`: faster-whisper HTTP client (multipart upload + response parsing)
- [ ] All 6 apps scaffolded (empty `index.ts`, `package.json`, `tsconfig.json`, `Dockerfile.dev`)
- [ ] Docker Compose dev stack: `docker compose up` starts all 9 services clean
- [ ] Outbox relay running in `apps/api`: polls every 500ms, publishes to BullMQ, marks published

**Validate scaffold:**
- [ ] Manually INSERT a generation_jobs row + outbox_event row → verify BullMQ receives the job

### Phase 1 — Pipeline: 4 Workers (Week 2–3)

**worker-ingest**
- [ ] YouTube detection (URL pattern regex)
- [ ] `yt-dlp` child process: extract best audio format, pipe to temp file
- [ ] R2 upload of audio file (`audio/${jobId}.mp3`)
- [ ] Temp file cleanup in `finally` block
- [ ] DB transaction: `audio_r2_key` + status + outbox → TranscribeJob
- [ ] Cheerio fast-path blog scraper (article text extraction heuristic)
- [ ] Puppeteer fallback for JS-rendered pages (30s timeout, no infinite scroll)
- [ ] DB transaction: status + outbox → StructureJob (bypasses transcribe queue)
- [ ] BullMQ retry: max 2 attempts, 5s backoff

**worker-transcribe**
- [ ] R2 audio download to `/tmp/${jobId}.mp3`
- [ ] faster-whisper HTTP call (multipart form-data binary upload)
- [ ] Transcript extraction from response
- [ ] Temp file cleanup in `finally` block (always runs, even on error)
- [ ] R2 audio object deletion after successful transcription
- [ ] DB transaction: status + outbox → StructureJob
- [ ] BullMQ retry: max 2 attempts, 10s backoff

**worker-structure**
- [ ] LLM call via `packages/llm` factory (provider from env)
- [ ] `StructuredContentSchema` Zod validation
- [ ] In-process retry of LLM call on schema validation failure (1 retry)
- [ ] `slide_count` computed from `valuePoints.length + 2`
- [ ] DB transaction: `structured_json` + `slide_count` + status + outbox → RenderJob
- [ ] BullMQ retry: max 3 attempts with exponential backoff (handles LLM 429s)

**worker-render**
- [ ] `BrowserPool` init at startup (3 pages in dev, 5 in prod)
- [ ] Fetch job data from DB (`/api/jobs/:jobId/render-data` internal endpoint)
- [ ] `buildSlides(structuredContent)` → array of slide data objects
- [ ] Render each slide concurrently (bounded by pool size via `acquire()`)
- [ ] `page.goto` → `waitForSelector('[data-render-complete]')` → `screenshot()`
- [ ] R2 upload per slide: `slides/${jobId}/${index}.png`
- [ ] DB transaction: `INSERT generated_assets` (all slides + linkedin text + thread text) + `UPDATE status='complete'`
- [ ] No outbox needed (terminal stage)
- [ ] Playwright pool crash handler (page replacement, no full browser restart)

**End-to-end smoke test:**
- [ ] Submit a YouTube URL via `curl POST /api/jobs`
- [ ] Watch logs across all 4 workers
- [ ] Job reaches `complete` status
- [ ] Generated PNGs are accessible in R2

### Phase 2 — Templates (Week 4)

- [ ] `packages/templates`: React component library setup, TypeScript, CSS modules
- [ ] `buildSlides(structured)` function: maps StructuredContent → SlideData[]
  - `slides[0]`: hook slide
  - `slides[1..N]`: value point slides (one per valuePoint)
  - `slides[N+1]`: CTA/summary slide
- [ ] Template `modern-dark`: dark bg, brand primary accent, bold sans-serif, slide number indicator
- [ ] Template `clean-light`: white bg, minimal layout, brand primary color accents
- [ ] Slide dimensions: 1080×1080px (Instagram square) — hardcoded in SLIDE_DIMENSIONS
- [ ] Vite render route: `GET /render/:jobId/:slideIndex` → fetches data, renders template
- [ ] `document.fonts.ready` signal before setting `data-render-complete` (font loading must complete)
- [ ] Render route: 127.0.0.1 guard middleware in Vite dev server (custom plugin)
- [ ] Visual QA: render 10 real slides, check font rendering, color accuracy, text overflow

### Phase 3 — Test UI (Week 5)

- [ ] `/` — URL input form, template selector (dropdown), brand color pickers (primary + secondary), submit
- [ ] Submit → `POST /api/jobs` → redirect to `/jobs/:jobId`
- [ ] `/jobs/:jobId` — status polling every 3s:
  - Stage progress bar: queued → ingesting → transcribing → structuring → rendering → complete
  - Error display with `error_message` from DB
  - On complete: slide preview carousel (fetches PNG URLs from generated_assets)
  - LinkedIn post text (collapsible)
  - Twitter thread (numbered list)
  - "Download ZIP" button
- [ ] `/queue` — live queue stats (polling every 5s):
  - Per-queue: waiting / active / completed / failed counts
  - Worker list: grouped by type, each instance's hostname + last_seen + jobs_processed
- [ ] `/health` — simple status page showing API health, pool metrics

### Phase 4 — Hardening (Week 6)

- [ ] **Structured logging (pino):** every log line includes `{ jobId, workerType, instanceId, level }`
- [ ] **Job TTL sweep:** cron in API process, runs every 5 minutes. Jobs in a non-terminal status for >30min → mark `failed`, set `error_message='Job TTL exceeded — worker likely offline'`
- [ ] **Outbox relay error handling:** if BullMQ publish fails, log + retry next cycle. Do NOT mark outbox row as published on failure.
- [ ] **Graceful shutdown:** on `SIGTERM`, each worker stops accepting new BullMQ jobs, waits for in-flight jobs to complete (up to 30s), then exits. Prevents half-processed jobs on deploy.
- [ ] **BullMQ failed job cleanup:** configure `removeOnFail: { count: 100 }` — keep last 100 failed jobs for inspection, auto-purge older ones
- [ ] **R2 lifecycle rule:** delete objects under `audio/` prefix after 24h (audio is transient)
- [ ] **Worker heartbeat:** each worker upserts `worker_instances` row every 10s. API's `/api/workers` returns rows where `last_seen > now() - 30s`
- [ ] **Pool metrics endpoint:** `worker-render` sidecar on port 8004 exposes pool size/available/waiters
- [ ] **Redis maxmemory policy:** set in docker-compose (`allkeys-lru`) — prevents OOM if queue grows large

---

## Exit Criteria for V1

All of these must be true before V1.1 begins:

**Correctness**
- [ ] YouTube URL → complete pipeline in **< 5 min** (home server Whisper GPU)
- [ ] Blog URL → complete pipeline in **< 90 seconds**
- [ ] LLM structured JSON passes Zod schema on **> 90%** of runs (10+ diverse sources)
- [ ] Slides are pixel-accurate: no text overflow, correct font, correct brand colors

**Scalability**
- [ ] 5 concurrent jobs run without queue degradation or errors
- [ ] 3 × `worker-structure` instances started simultaneously — BullMQ distributes jobs evenly
- [ ] Killing one `worker-structure` instance mid-job → BullMQ retries on surviving instance
- [ ] Removing `worker-transcribe` entirely → jobs queue in `transcribe`, no crash anywhere

**Portability**
- [ ] `worker-structure` started fresh on a Mac with `REDIS_URL + LLM_PROVIDER + DEEPSEEK_API_KEY` begins processing within 5 seconds
- [ ] LLM provider changed to `openai` via env var → worker-structure picks up on restart, no code change

**Reliability**
- [ ] Outbox relay: if Redis is down for 60s, jobs do not get lost — they sit in outbox and publish when Redis recovers
- [ ] Worker crash mid-job → BullMQ re-enqueues, job eventually completes on retry
- [ ] Playwright page crash → pool replaces page, subsequent render jobs succeed
- [ ] Job stuck >30 min → TTL sweep marks it failed, credit refund signal is emitted (logged; actual refund is V1.1)

**Cost**
- [ ] Per-job LLM cost < **$0.05** on DeepSeek V4 Flash (measure on 5 real jobs)
- [ ] No audio files persist in R2 beyond 24h (lifecycle rule active)

**Observability**
- [ ] `/api/workers` shows each instance's type, hostname, queue, last_seen, jobs_processed
- [ ] `/api/queue/stats` shows waiting/active/failed per queue
- [ ] `/api/health` reports pool metrics from worker-render sidecar

---

## What V1 Does Not Have (By Design)

- Authentication / sessions
- Multi-tenant workspaces
- Persistent brand kit storage (brand kit is per-request JSON, not a DB entity)
- Logo upload
- Stripe / billing / credit ledger
- Buffer / scheduler export
- SEO landing pages
- Email notifications
- Admin dashboard

All snap onto V1 non-destructively in V1.1. The V1 schema is designed to accept these additions via new tables and nullable foreign key columns on `generation_jobs`.

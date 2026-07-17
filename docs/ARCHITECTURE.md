# Loopreel V1 Architecture

## Overview

Loopreel V1 is a distributed content repurposing engine built on TypeScript, Node.js, PostgreSQL, and BullMQ. It transforms a single source URL (YouTube, blog, article) into a multi-format carousel using a 4-stage pipeline:

1. **Ingest** — Download audio/extract text
2. **Transcribe** — Convert audio to text (Whisper)
3. **Structure** — Convert text to structured JSON (LLM)
4. **Render** — Generate carousel slides (Playwright pool)

The system is designed for **scale-out workers**: any machine can run any worker type by pointing to the same Redis + PostgreSQL URLs.

---

## System Diagram

```
┌──────────────────────────────────────────────────────────────────────────────────┐
│                          Client Browser                           │
│                                                                  │
│  1. Paste YouTube URL              2. View job status            │
│  2. Submit form                    3. Download ZIP or preview    │
└──────────────────────────────────────────┬───────────────────────┬────────────────┘
                     │                           │
                     │ POST /api/jobs            │ GET /api/jobs/:id
                     │                           │ GET /render/:[slideId]
                     ▼                           ▼
┌───────────────────────────────────────────────────────────────────────────────────┐
│                     Fastify API (Node.js)                        │
│                      (Oracle Cloud VPS)                          │
│                                                                  │
│  • Validate input + brand kit                                    │
│  • INSERT job + outbox (atomic)                                  │
│  • Serve render route (internal, 127.0.0.1 only)               │
│  • Stream job status + health metrics                            │
│                                                                  │
│  Dependencies: PostgreSQL, Redis, Playwright pool               │
└────────────────────────┬───────────────┬──────────────┬──────────┘
                   │                    │              │
        ┌──────────┴─────────┬──────────┴──────┬───────┴──────────┐
        │                    │                 │                  │
        ▼                    ▼                 ▼                  ▼
┌──────────────────┐  ┌──────────────────┐  ┌────────────────────────┐
│  PostgreSQL     │  │     Redis        │  │ Playwright Pool      │
│  (Source of     │  │   (Job Queue)    │  │ (Screenshot render)  │
│   Truth)        │  │                  │  │                      │
│                 │  │ • ingest Q       │  │ • 5x Chromium pages  │
│ • generation    │  │ • transcribe Q   │  │ • Health check loop  │
│   _jobs         │  │ • structure Q    │  │ • Crash detection    │
│ • generated_    │  │ • render Q       │  │   & replacement      │
│   assets        │  │                  │  │                      │
│ • outbox_events │  │ TTL: 30 min      │  │ Pool metrics sidecar │
│ • worker_       │  │ Priority: 1/5/10 │  │ (port 8004)          │
│   instances     │  │                  │  │                      │
│                 │  │ Broker: Redis 7  │  │ Driver: Playwright   │
└────────────┬────┘  └────────┬─────────┘  └──────────┬───────────┘
         │                    │                       │
         │ Outbox relay       │ Job dispatch          │ Screenshots
         │ (500ms poll)       │                       │
         └────────────┬───────┴───────┬───────────────┘
                  │           │           │
        ┌─────────▼─────┬─────▼───────┬──▼─────────────┬────────────┐
        │               │             │                │            │
        ▼               ▼             ▼                ▼            ▼
   ┌──────────┐  ┌──────────────────────┐ ┌──────────────────┐  ┌────────┐
   │ Outbox   │  │worker-ingest         │ │worker-           │  │ R2     │
   │ Relay    │  │                      │ │transcribe        │  │(Storage)│
   │          │  │ • yt-dlp             │ │                  │  │        │
   │ (in API  │  │ • cheerio            │ │ • Whisper HTTP   │  │ • audio│
   │ process) │  │ • Puppeteer          │ │   call           │  │ • PNG  │
   │          │  │                      │ │                  │  │ • ZIP  │
   │ Polls    │  │ Home server or       │ │ Home server or   │  │        │
   │ every    │  │ Oracle               │ │ Oracle           │  │Cloud-  │
   │ 500ms    │  │ concurrency: 3 (I/O) │ │ concurrency: 1   │  │flare   │
   │          │  │                      │ │                  │  │S3 API  │
   │ Publishes    │ concurrency: 1      │ │ concurrency:     │  │Lifecycle:
   │ to BullMQ    │ (CPU bound)          │ │ (CPU bound)      │  │24h audio│
   │ (idempotent) │                      │ │                  │  │delete   │
   │              │ Retries: 2           │ │ Retries: 2       │  │        │
   │ Retries: max  │ Backoff: 5s          │ │ Backoff: 10s     │  │        │
   │ per-queue    │ Jitter: 1s           │ │ Jitter: 2s       │  │        │
   └──────────────┴──────────────────────┴──────────────────┴────────────┘
        │                    │             │                │
        └────────────┬───────┴─────────┬───┴────────┬───────┘
                 │           │           │
        ┌────────▼─────┬─────▼───────┬──▼─────────────┐
        │              │             │                │
        ▼              ▼             ▼                ▼
   ┌─────────────┐  ┌────────────────────┐ ┌──────────────────┐
   │worker-       │  │worker-structure    │ │ (all workers)
   │structure     │  │                    │ │ Outbox only
   │              │  │ • LLM API          │ │ writes
   │ • LLM API    │  │ • JSON mode        │ │ (rendered)
   │ • JSON mode  │  │ • Zod valid.       │ │
   │ • Zod valid. │  │                    │ │ No return
   │              │  │ Oracle VPS         │ │ to queue
   │ Oracle VPS   │  │ concurrency: 10    │ │
   │ concurrency: │  │                    │ │
   │ 10 (I/O)     │  │ Retries: 3 (rate  │ │
   │              │  │ limits), Backoff: │ │
   │ Retries: 3   │  │ exponential        │ │
   │ Backoff: exp │  │                    │ │
   │              │  └────────────────────┘ │
   │              │                         │
   └──────────────┴─────────────────────────┘
```

---

## Component Responsibilities

### API (apps/api)

**Responsibility:** HTTP orchestration, job creation, status polling, render route serving.

**Runs:**
- Fastify HTTP server (port 3000)
- Outbox relay (background service)
- Playwright pool (for rendering)
- Health check aggregator

**Does NOT:**
- Heavy processing (yt-dlp, Whisper, LLM calls, scraping)
- Store state in memory (all state in DB)

**Key files:**
- `src/server.ts` — Fastify bootstrap, routes
- `src/services/outbox-relay.ts` — Poll + publish loop
- `src/services/render.ts` — Playwright pool management
- `src/routes/jobs.ts` — POST /api/jobs, GET /api/jobs/:id
- `src/routes/health.ts` — GET /api/health

### worker-ingest (apps/worker-ingest)

**Responsibility:** Download audio from YouTube or scrape text from blogs/articles.

**Queue:** Consumes from `ingest` queue, produces to `transcribe` queue (YouTube) or `structure` queue (blogs).

**Key operations:**
- Detect source type (URL pattern → YouTube, else blog/article)
- YouTube: `yt-dlp` → download audio → upload to R2 → write outbox for transcribe
- Blog/Article: Cheerio (fast) → fallback Puppeteer (JS-rendered) → write outbox for structure

**Runs on:** Home server or any machine (Tailscale access to Redis + DB)

**Concurrency:** 3 (I/O-bound, can run 3 jobs in parallel)

**Key files:**
- `src/worker.ts` — BullMQ consumer setup
- `src/handlers/youtube.ts` — yt-dlp logic
- `src/handlers/blog.ts` — Cheerio + Puppeteer logic
- `src/handlers/error.ts` — Error classification + retry decision

### worker-transcribe (apps/worker-transcribe)

**Responsibility:** Convert audio to text using faster-whisper.

**Queue:** Consumes from `transcribe` queue, produces to `structure` queue.

**Key operations:**
- Download audio file from R2
- POST to faster-whisper HTTP server
- Parse transcript
- Delete audio (cleanup)
- Write outbox for structure

**Runs on:** Home server (co-located with faster-whisper service for latency)

**Concurrency:** 1 (Whisper is the bottleneck)

**Key files:**
- `src/worker.ts` — BullMQ consumer
- `src/services/whisper-client.ts` — HTTP multipart upload
- `src/handlers/transcribe.ts` — Main logic

### worker-structure (apps/worker-structure)

**Responsibility:** Convert text to structured JSON using an LLM.

**Queue:** Consumes from `structure` queue, produces to `render` queue.

**Key operations:**
- Call LLM (DeepSeek, OpenAI, etc.) with system prompt
- Force JSON mode (via provider)
- Validate output against `StructuredContentSchema` (Zod)
- Compute slide count
- Write outbox for render

**Runs on:** Anywhere with internet + LLM API key (typically Oracle VPS)

**Concurrency:** 10 (I/O-bound, waiting on LLM API)

**Key files:**
- `src/worker.ts` — BullMQ consumer
- `src/services/llm-client.ts` — LLM abstraction
- `src/handlers/structure.ts` — Main logic
- `src/schemas/structured-content.ts` — Zod schema

### worker-render (apps/worker-render)

**Responsibility:** Screenshot carousel slides from Vite render route.

**Queue:** Consumes from `render` queue (final stage, no outbox produced).

**Key operations:**
- Fetch job data from DB (brand kit, template, structured JSON)
- For each slide: acquire Playwright page → navigate → screenshot → release page
- Upload PNG to R2
- Insert generated_assets rows
- Mark job complete

**Runs on:** Oracle VPS (Playwright pool cannot be distributed)

**Concurrency:** Bounded by Playwright pool size (default 5)

**Key files:**
- `src/worker.ts` — BullMQ consumer
- `src/pool/browser-pool.ts` — Playwright pool implementation
- `src/handlers/render.ts` — Main logic
- `src/sidecar.ts` — Metrics HTTP server

### Web (apps/web)

**Responsibility:** Vite + React UI for rendering preview + internal render route.

**Routes:**
- `/` — Test UI (paste URL, submit, view results)
- `/render/:jobId/:slideIndex` — Internal-only route (127.0.0.1 guard), renders one slide for Playwright

**Dependencies:** React, Vite, TypeScript

**Key files:**
- `src/pages/index.tsx` — Main test UI
- `src/pages/render/[jobId]/[slideIndex].tsx` — Render route
- `src/components/slide-template.tsx` — Slide components
- `src/middleware/auth.ts` — 127.0.0.1 guard

---

## Data Flow: Complete Request Lifecycle

```
1. USER submits URL
   POST /api/jobs { sourceUrl, brandKit, templateId, priority }

2. API validates + creates job
   INSERT generation_jobs (status='queued', source_url=...)
   INSERT outbox_events (queue='ingest', payload={jobId, sourceUrl, sourceType})
   COMMIT transaction → response: { jobId, status: 'queued' }

3. Outbox relay polls (every 500ms)
   SELECT * FROM outbox_events WHERE published = false LIMIT 50 FOR UPDATE SKIP LOCKED
   For each row:
     PUBLISH to BullMQ ingest queue
     UPDATE outbox_events SET published = true WHERE id = ?

4. worker-ingest acquires job from Redis
   UPDATE generation_jobs SET status='ingesting' (idempotent)
   
   IF YouTube:
     yt-dlp download audio → /tmp/{jobId}.mp3
     S3.PUT audio/{jobId}.mp3 → R2
     DELETE /tmp/{jobId}.mp3 (cleanup)
     
     UPDATE generation_jobs SET audio_r2_key='audio/{jobId}.mp3', status='transcribing'
     INSERT outbox_events (queue='transcribe', payload={jobId, audioR2Key})
   
   ELSE (blog/article):
     Cheerio scrape OR Puppeteer fallback → rawText
     UPDATE generation_jobs SET status='structuring'
     INSERT outbox_events (queue='structure', payload={jobId, rawText})

5. Outbox relay publishes to transcribe/structure queue
   BullMQ pickup by appropriate worker

6. worker-transcribe (YouTube path only):
   R2.GET audio/{jobId}.mp3 → /tmp/{jobId}.mp3
   Whisper HTTP POST binary upload
   transcript = response.text
   DELETE /tmp/{jobId}.mp3 (always, in finally)
   R2.DELETE audio/{jobId}.mp3 (cleanup R2)
   
   UPDATE generation_jobs SET status='structuring'
   INSERT outbox_events (queue='structure', payload={jobId, rawText=transcript})

7. worker-structure:
   LLM(systemPrompt, userPrompt=rawText) → JSON
   Zod validate → StructuredContent
   slide_count = valuePoints.length + 2 (hook + CTA)
   
   UPDATE generation_jobs SET structured_json=..., slide_count=..., status='rendering'
   INSERT outbox_events (queue='render', payload={jobId})

8. worker-render:
   SELECT job FROM generation_jobs WHERE id=jobId
   FOR slide_index IN 0..job.slide_count-1:
     page = pool.acquire()
     page.goto('/render/{jobId}/{slideIndex}')
     page.waitForSelector('[data-render-complete="true"]')
     PNG = page.screenshot()
     R2.PUT slides/{jobId}/{slideIndex}.png
     pool.release(page)
   
   INSERT generated_assets (one row per slide + linkedin post + twitter thread)
   UPDATE generation_jobs SET status='complete'
   (No outbox — render is terminal stage)

9. API streams job status
   GET /api/jobs/:jobId → { status: 'complete', slides: [...] }

10. USER downloads/previews
    GET /jobs/:jobId → React UI displays slides
    GET /api/jobs/:jobId/download → 302 → R2 presigned ZIP URL
```

---

## Database Schema (High-Level)

Detailed in DATABASE.md. Key tables:

```sql
generation_jobs          -- Core job entity
├── id (uuid, PK)
├── source_url (text)
├── source_type (enum: youtube|blog|article)
├── status (enum: queued|ingesting|transcribing|structuring|rendering|complete|failed)
├── priority (1-10)
├── structured_json (jsonb)
├── audio_r2_key (text, nullable)
├── error_message (text, nullable)
└── retry_count (int)

generated_assets         -- Rendered output
├── id (uuid, PK)
├── job_id (uuid, FK → generation_jobs)
├── format_type (enum: carousel_slide|linkedin_post|twitter_thread)
├── slide_index (int, nullable)
└── storage_url (text)

outbox_events           -- Transactional outbox
├── id (uuid, PK)
├── queue_name (text)
├── job_payload (jsonb)
├── bullmq_opts (jsonb)
├── published (bool)
└── created_at (timestamp)

worker_instances        -- Worker fleet monitoring
├── instance_id (text, PK)
├── worker_type (text)
├── hostname (text)
├── last_seen (timestamp)
└── jobs_processed (bigint)
```

---

## Concurrency Model

### Queues

| Queue | Max Workers | Processing Rate | Bottleneck | Notes |
|-------|-------------|-----------------|------------|-------|
| ingest | 3-5 | yt-dlp: 1 per min, blogs: 5+ per min | yt-dlp on YouTube | High variance |
| transcribe | 1 | Whisper: 1-5 min per audio | Whisper latency | CPU-bound, no parallelism |
| structure | 10 | LLM: 0.5-2 sec per call | LLM API latency | I/O-bound, highly parallelizable |
| render | pool size (5) | Playwright: 1-5 sec per slide | Playwright startup | Bounded by pool |

### Playwright Pool

- **Size:** 5 pages (tunable via env)
- **Reuse:** Pages reused across render requests (navigate → screenshot → navigate)
- **Crash handling:** Individual page crashes trigger replacement, not full browser restart
- **Waiter queue:** Max 20 waiters before rejecting with 503

---

## Deployment Topology

### Development (Docker Compose)

```yaml
services:
  api, web, worker-ingest, worker-transcribe, worker-structure, worker-render
  postgres, redis, faster-whisper
  
All on localhost, no networking complexity
```

### Production

```
Oracle Cloud VPS (public)           Home Server (private, Tailscale)
├── nginx (reverse proxy)           ├── worker-ingest
├── Fastify API                     ├── worker-transcribe
├── Vite web (render route only)    ├── faster-whisper HTTP
├── Playwright pool (5x)            └── (optional: worker-structure)
├── PostgreSQL                      
├── Redis                           
└── Outbox relay (in API)           

Connected by: Tailscale mesh VPN (encrypted)
Communication: Redis queue + PostgreSQL replication (optional)
```

---

## Error Handling Strategy

See WORKERS.md and STATE-MACHINES.md for detailed error trees.

**Classification:**
- **Transient** (retryable): Network timeouts, rate limits, temporary resource exhaustion
- **Fatal** (not retryable): Invalid URL, LLM schema validation failed, corrupted audio file

**Per-queue retry budgets:**
- ingest: 2 retries × 5s backoff
- transcribe: 2 retries × 10s backoff
- structure: 3 retries × exponential backoff (handles 429s)
- render: 1 retry × 5s backoff

---

## Checklist for Implementation

- [ ] Monorepo structure: apps/{api, web, worker-ingest, worker-transcribe, worker-structure, worker-render}, packages/{db, queue, llm, types, templates}
- [ ] PostgreSQL schema (all tables + indexes + migrations)
- [ ] Redis setup (BullMQ queues, connection pooling)
- [ ] API bootstrap (DB, Redis, Playwright pool, outbox relay)
- [ ] Outbox relay (500ms poll loop, idempotent publishing)
- [ ] Playwright pool (5 pages, crash detection, metrics sidecar)
- [ ] Each worker setup (BullMQ consumer, error handling, heartbeat)
- [ ] Docker Compose (dev + prod configs)
- [ ] Zod schemas for all contracts
- [ ] TypeScript strict mode + ESLint

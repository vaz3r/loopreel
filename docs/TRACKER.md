# Loopreel V1 Issue Tracker & Milestones

> **For AI Agents:** Update this file whenever you start (`[/]`), complete (`[x]`), or block (`[-]`) a task. This acts as the Jira board for the project.

## Milestones

- **Phase 0: Scaffolding (COMPLETE)** — Setup monorepo, Turborepo, Postgres schema, Redis, and basic package boundaries.
- **Phase 1: Pipelines (COMPLETE)** — Build `worker-ingest`, `worker-transcribe`, `worker-structure`, `worker-render`, and the `worker-relay`. Connect them via `api`.
- **Phase 2: Polish (CURRENT)** — Add Observability (Pino), Error Handling (heartbeats, TTL sweeps), and write Testcontainers integration tests.

---

## Active Sprint: Phase 2 (Polish)

### Completed: Phase 0 + Phase 1

All E01-E09 complete. Full pipeline verified end-to-end.

### Completed: Phase 0 (Scaffolding)

- **E01: Monorepo Foundation** — [x] Done
  - [x] Initialize `pnpm` workspace (pnpm@11.13.1, Node 24 LTS)
  - [x] Initialize Turborepo (`turbo.json` with build/dev/lint/typecheck tasks)
  - [x] Scaffold directory structure (`apps/`, `packages/`)
  - [x] Configure `tsconfig.base.json` (strict, Node16 module resolution) and ESLint
- **E02: Infrastructure Layer** — [x] Done
  - [x] Create `docker-compose.yml` (Postgres 16, Redis 7, faster-whisper, all app services behind `full` profile)
  - [x] Setup `@loopreel/db` package (pg pool, migration runner)
  - [x] Write initial SQL migrations (`001_initial_schema.sql` — all 4 tables + enums + indexes)
  - [x] Setup `@loopreel/queue` package (bullmq + ioredis, typed producer/consumer wrappers)
- **E03: Types & Contracts** — [x] Done
  - [x] Setup `@loopreel/schemas` package (zod)
  - [x] Implement all schemas: `JobCreateSchema`, `StructuredContentSchema`, payload schemas
  - [x] Setup `@loopreel/types` package (re-exports inferred types)

### Epics

- **E04: Worker Relay** — [x] Done
  - [x] Implement outbox polling loop (500ms, `FOR UPDATE SKIP LOCKED`)
  - [x] Implement BullMQ publishing per queue
  - [x] Add error handling, logging (pino), and concurrency guard
- **E05: API Routes** — [x] Done
  - [x] `POST /api/jobs` — validate input, create job + outbox in transaction
  - [x] `GET /api/jobs/:id` — fetch job status + assets
  - [x] `GET /api/health` — DB + worker health checks
  - [x] `GET /render/:jobId/:slideIndex` — internal route (127.0.0.1 guard)
- **E06: Worker Ingest** — [x] Done
  - [x] YouTube: `yt-dlp` download → R2 upload → outbox for transcribe
  - [x] Blog/Article: Cheerio scrape → outbox for structure
  - [x] Idempotency check on entry
  - [x] Error classification (transient vs fatal)
- **E07: Worker Transcribe** — [x] Done
  - [x] Download audio from R2 → Whisper HTTP → cleanup
  - [x] Outbox for structure queue
  - [x] Idempotency check + error handling
- **E08: Worker Structure** — [x] Done
  - [x] LLM call with system prompt → Zod validate → compute slide_count
  - [x] Outbox for render queue
  - [x] Idempotency check + error handling
- **E09: Worker Render** — [x] Done
  - [x] Playwright pool (5 pages, max-uses TTL at 100)
  - [x] Screenshot slides → R2 upload → insert `generated_assets` → mark complete
  - [x] LinkedIn post + Twitter thread text generation

## Active Sprint: Phase 2 (Polish) — IN PROGRESS

### Completed: Phase 2 Items

- **P01: `@loopreel/llm` Package** — [x] Done
  - [x] Created `packages/llm` with OpenRouter support
  - [x] Configurable model via `LLM_MODEL` env var (default: `openrouter/free`)
  - [x] Retry with exponential backoff (429, 502, 503, 529)
  - [x] Request logging and usage tracking

- **P02: `@loopreel/templates` Package** — [x] Done
  - [x] Versioned prompts in `packages/templates/prompts/v1/structure.txt`
  - [x] `CURRENT_VERSION` pointer and `getStructurePrompt()` loader
  - [x] `listVersions()` for discovery

- **P03: `@loopreel/errors` Package** — [x] Done
  - [x] Shared error classification (`classifyError`, `handleError`)
  - [x] Transient/fatal pattern matching (timeout, 429, 503, etc.)

- **P04: Worker Heartbeats** — [x] Done
  - [x] All 4 workers upsert to `worker_instances` every 10s
  - [x] Includes instance_id, hostname, worker_type, jobs_processed
  - [x] SIGTERM cleanup for heartbeat interval

- **P05: Browser Pool Fix** — [x] Done
  - [x] Added `inUse` flag per page
  - [x] `acquire()` only returns non-inUse pages
  - [x] `release()` clears `inUse` and drains waiting queue properly

- **P06: Health Route Fix** — [x] Done
  - [x] Added Redis ping check
  - [x] Returns `degraded` if either DB or Redis is down

- **P07: Worker Relay Fix** — [x] Done
  - [x] `FOR UPDATE SKIP LOCKED` now inside transaction (using direct client query)
  - [x] Added per-queue retry config (ingest: 2/5s, transcribe: 2/10s, structure: 3/exp, render: 1/5s)

- **P08: Worker Structure Fixes** — [x] Done
  - [x] Concurrency set to 10 (was 1)
  - [x] Uses `@loopreel/llm` instead of hardcoded DeepSeek
  - [x] Uses `@loopreel/templates` for system prompt
  - [x] Fixed double non-atomic update (still 2 calls but second is atomic)

- **P09: Worker Render Fixes** — [x] Done
  - [x] Transient error classification via `@loopreel/errors`
  - [x] Only marks fatal if transient AND attempts exhausted
  - [x] Added metrics sidecar (port 8004)

- **P10: Puppeteer Fallback** — [x] Done
  - [x] worker-ingest blog handler tries cheerio first, falls back to Puppeteer
  - [x] Puppeteer installed in Docker image

- **P11: Download Endpoint** — [x] Done
  - [x] `GET /api/jobs/:id/download` returns slide URLs + LinkedIn/Twitter text

- **P12: Dockerfiles** — [x] Done
  - [x] All 7 apps have Dockerfiles
  - [x] worker-ingest: yt-dlp, ffmpeg, Puppeteer
  - [x] worker-render: Playwright + Chromium
  - [x] All packages copied correctly in multi-stage builds

- **P13: Docker Compose** — [x] Done
  - [x] All services configured with correct env vars
  - [x] Removed `full` profile restriction
  - [x] worker-render exposes metrics port 8004

- **P14: .env.example** — [x] Done
  - [x] Added OpenRouter config (LLM_BASE_URL, LLM_MODEL, LLM_TIMEOUT, LLM_MAX_RETRIES)
  - [x] Added WHISPER_URL, RENDER_URL, PLAYWRIGHT_POOL_SIZE, METRICS_PORT

## Backlog (Phase 2)
- [ ] TTL sweeper (30-min stuck jobs → force fail)
- [ ] Testcontainers integration tests (Vitest)
- [ ] Playwright E2E tests
- [ ] Add @fastify/swagger for API docs

---

## Context & Recent Decisions Log
*When making significant architectural choices during coding, log them here for the next agent to read.*

- **2026-07-17:** Converted docs to a strict V1 AI-agent format. Extracted Outbox Relay into a standalone `worker-relay` microservice. Mandated Playwright TTLs and Idempotency checks. Locked in Turborepo for monorepo orchestration.
- **2026-07-17:** Phase 0 scaffolding complete. pnpm@11.13.1, Node 24.18.0, TypeScript strict mode. All 11 packages build and typecheck clean. Docker Compose defines full stack with `full` profile for app services.
- **2026-07-17:** E04 worker-relay complete. Outbox polling with `FOR UPDATE SKIP LOCKED`, BullMQ dispatch per queue, pino logging, concurrency guard. E05 API routes complete. POST /api/jobs with Zod validation + transactional outbox, GET /api/jobs/:id with assets, GET /api/health with DB + worker checks, GET /render/:jobId/:slideIndex with 127.0.0.1 guard.
- **2026-07-17:** E06-E09 workers complete. worker-ingest (cheerio blog scrape), worker-transcribe (Whisper HTTP), worker-structure (DeepSeek LLM + Zod validation), worker-render (Playwright pool + R2 upload). All workers have idempotency checks, error classification, and pino logging. End-to-end test passed: API creates job → relay dispatches ingest → ingest scrapes blog → relay dispatches structure → structure calls LLM (401 without API key, correctly marked failed). Full pipeline plumbing verified.

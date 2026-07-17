# Loopreel V1 Issue Tracker & Milestones

> **For AI Agents:** Update this file whenever you start (`[/]`), complete (`[x]`), or block (`[-]`) a task. This acts as the Jira board for the project.

## Milestones

- **Phase 0: Scaffolding (COMPLETE)** — Setup monorepo, Turborepo, Postgres schema, Redis, and basic package boundaries.
- **Phase 1: Pipelines (CURRENT)** — Build `worker-ingest`, `worker-transcribe`, `worker-structure`, `worker-render`, and the `worker-relay`. Connect them via `api`.
- **Phase 2: Polish** — Add Observability (Pino), Error Handling (heartbeats, TTL sweeps), and write Testcontainers integration tests.

---

## Active Sprint: Phase 1 (Pipelines)

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
- **E06: Worker Ingest**
  - [ ] YouTube: `yt-dlp` download → R2 upload → outbox for transcribe
  - [ ] Blog/Article: Cheerio scrape → Puppeteer fallback → outbox for structure
  - [ ] Idempotency check on entry
- **E07: Worker Transcribe**
  - [ ] Download audio from R2 → Whisper HTTP → cleanup
  - [ ] Outbox for structure queue
- **E08: Worker Structure**
  - [ ] LLM call with system prompt → Zod validate → compute slide_count
  - [ ] Outbox for render queue
- **E09: Worker Render**
  - [ ] Playwright pool (5 pages, max-uses TTL)
  - [ ] Screenshot slides → R2 upload → insert `generated_assets` → mark complete

## Backlog (Phase 2)
- [ ] Add Pino structured logging across all packages
- [ ] Worker heartbeat interval (10s upsert to `worker_instances`)
- [ ] TTL sweeper (30-min stuck jobs → force fail)
- [ ] Testcontainers integration tests (Vitest)
- [ ] Playwright E2E tests

---

## Context & Recent Decisions Log
*When making significant architectural choices during coding, log them here for the next agent to read.*

- **2026-07-17:** Converted docs to a strict V1 AI-agent format. Extracted Outbox Relay into a standalone `worker-relay` microservice. Mandated Playwright TTLs and Idempotency checks. Locked in Turborepo for monorepo orchestration.
- **2026-07-17:** Phase 0 scaffolding complete. pnpm@11.13.1, Node 24.18.0, TypeScript strict mode. All 11 packages build and typecheck clean. Docker Compose defines full stack with `full` profile for app services.
- **2026-07-17:** E04 worker-relay complete. Outbox polling with `FOR UPDATE SKIP LOCKED`, BullMQ dispatch per queue, pino logging, concurrency guard. E05 API routes complete. POST /api/jobs with Zod validation + transactional outbox, GET /api/jobs/:id with assets, GET /api/health with DB + worker checks, GET /render/:jobId/:slideIndex with 127.0.0.1 guard.

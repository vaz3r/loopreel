# Loopreel V1 Issue Tracker & Milestones

> **For AI Agents:** Update this file whenever you start (`[/]`), complete (`[x]`), or block (`[-]`) a task. This acts as the Jira board for the project.

## Milestones

- **Phase 0: Scaffolding (CURRENT)** — Setup monorepo, Turborepo, Postgres schema, Redis, and basic package boundaries.
- **Phase 1: Pipelines** — Build `worker-ingest`, `worker-transcribe`, `worker-structure`, `worker-render`, and the `worker-relay`. Connect them via `api`.
- **Phase 2: Polish** — Add Observability (Pino), Error Handling (heartbeats, TTL sweeps), and write Testcontainers integration tests.

---

## Active Sprint: Phase 0 (Scaffolding)

### Epics
- **E01: Monorepo Foundation**
  - [ ] Initialize `pnpm` workspace in root
  - [ ] Initialize Turborepo (`npx create-turbo@latest`)
  - [ ] Scaffold empty directories for `apps/` and `packages/`
  - [ ] Configure `tsconfig.base.json` and ESLint
- **E02: Infrastructure Layer**
  - [ ] Create `docker-compose.yml` for Postgres 16 and Redis 7
  - [ ] Setup `@loopreel/db` package (install `pg`, configure connection pool)
  - [ ] Write initial SQL migrations based on `DATABASE.md`
  - [ ] Setup `@loopreel/queue` package (install `bullmq`, configure Redis client)
- **E03: Types & Contracts**
  - [ ] Setup `@loopreel/schemas` package (install `zod`)
  - [ ] Implement `StructuredContentSchema` and Payload schemas from `SCHEMAS.md`

## Backlog (Phase 1)
- [ ] Build `api` Fastify server boilerplate
- [ ] Build `worker-relay` polling microservice
- [ ] Implement `worker-ingest` (`yt-dlp` / `cheerio`)
- [ ] Implement `worker-transcribe` (Whisper HTTP client)
- [ ] Implement `worker-structure` (DeepSeek JSON API)
- [ ] Implement `worker-render` (Playwright Pool)

---

## Context & Recent Decisions Log
*When making significant architectural choices during coding, log them here for the next agent to read.*

- **2026-07-17:** Converted docs to a strict V1 AI-agent format. Extracted Outbox Relay into a standalone `worker-relay` microservice. Mandated Playwright TTLs and Idempotency checks. Locked in Turborepo for monorepo orchestration.

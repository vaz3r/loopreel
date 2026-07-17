# Loopreel V1 Documentation

This documentation suite is designed for AI coding agents to build the system accurately and completely. Every part of the system is specified with unambiguous contracts, error handling paths, and state machines.

**Start here, then follow the dependency chain below.**

## Quick Navigation

### 🏗️ Architecture & Design
1. **[ARCHITECTURE.md](./ARCHITECTURE.md)** — System overview, component inventory, deployment topology
2. **[DATABASE.md](./DATABASE.md)** — Complete schema with constraints, indexes, ER diagram
3. **[STATE-MACHINES.md](./STATE-MACHINES.md)** — XState definitions for job lifecycle + worker flows

### 🔌 Interfaces & Contracts
4. **[API.md](./API.md)** — Complete endpoint specs, request/response contracts, error codes
5. **[WORKERS.md](./WORKERS.md)** — Per-worker specifications, input/output contracts, error handling
6. **[PACKAGES.md](./PACKAGES.md)** — Public API of each shared package (`queue`, `db`, `llm`, etc.)

### 🚀 Deployment & Operations
7. **[DEPLOYMENT.md](./DEPLOYMENT.md)** — Dev/prod setup, Docker Compose, secrets, networking
8. **[OBSERVABILITY.md](./OBSERVABILITY.md)** — Logging, metrics, health checks, alerting

### 🧪 Quality & Testing
9. **[TESTING.md](./TESTING.md)** — Unit, integration, E2E strategy + examples
10. **[SCHEMAS.md](./SCHEMAS.md)** — Zod validation schemas (executable reference)

---

## Document Structure Convention

Each document follows this pattern:

```
# [Topic]

## Overview
[2-3 sentence summary of responsibility]

## Specification
[Detailed requirements, invariants, and behavior]

### [Subsection]
[Technical details]

## Examples
[Runnable code or curl examples]

## Error Handling
[Decision trees for failure paths]

## Checklist for Implementation
[ ] Item 1
[ ] Item 2
...
```

---

## Key Principles for Agents

✅ **Unambiguous** — Every edge case is documented. No guessing.  
✅ **Type-Safe** — All contracts are in Zod; validation is executable.  
✅ **Traceable** — Requirements map to specific code files/functions.  
✅ **Testable** — Every spec has acceptance criteria and examples.  

---

## System at a Glance

```
┌─────────────────────────────────────────────────────────────┐
│                        User                                  │
│                    (web/test UI)                             │
└────────────────────────┬────────────────────────────────────┘
                         │
                    POST /api/jobs
                         │
┌────────────────────────▼────────────────────────────────────┐
│                   API (Fastify)                              │
│  • Validate input                                            │
│  • INSERT job + outbox                                       │
│  • Trigger workers                                           │
│  • Stream results                                            │
└────┬─────────────┬──────────────┬──────────────┬────────────┘
     │             │              │              │
     │          PostgreSQL     Redis          R2
     │         (source of     (queue          (storage)
     │          truth)        & relay)
     │
     ├─► ⚙️ worker-ingest (3 concurrency)
     │   └─► yt-dlp / cheerio → audio/article text
     │
     ├─► ⚙️ worker-transcribe (1 concurrency — Whisper bottleneck)
     │   └─► faster-whisper HTTP → transcript
     │
     ├─► ⚙️ worker-structure (10 concurrency — I/O bound)
     │   └─► DeepSeek LLM (JSON mode) → structured content
     │
     └─► ⚙️ worker-render (Playwright pool)
         └─► Screenshot carousel slides → R2

```

---

## Reading Order for Implementation

**Week 1 (Scaffold):**
1. Read ARCHITECTURE.md (understand the big picture)
2. Read DATABASE.md (define all tables first)
3. Read PACKAGES.md (understand module boundaries)
4. Read DEPLOYMENT.md (get Docker Compose running)

**Week 2-3 (Pipelines):**
1. Read STATE-MACHINES.md (understand job lifecycle)
2. Read WORKERS.md (build each worker)
3. Read API.md (implement endpoints)
4. Read SCHEMAS.md (validate contracts)

**Week 4-6 (Polish):**
1. Read TESTING.md (write tests)
2. Read OBSERVABILITY.md (add logging/metrics)

---

## Key Decisions Locked In

| Component | Choice | Why |
|-----------|--------|-----|
| Frontend | Vite + React + TypeScript | Fast iteration, no SSR needed |
| Backend | Node.js + Fastify + TypeScript | Same language everywhere, fast HTTP |
| Job Queue | BullMQ (Redis-backed) | Native TypeScript, distributed workers |
| LLM | DeepSeek V4 Flash | $0.14/1M input tokens, 1M context |
| Rendering | Playwright pool | Full CSS fidelity, persistent pool |
| Transcription | Local faster-whisper | Near-zero cost, on-premise |
| Language | TypeScript everywhere | Single language, strict types |
| Infra | Docker Compose (dev), Oracle VPS (prod) | Portable, cost-effective |

---

## Critical Invariants

**These must never be violated:**

1. **No orphaned jobs** — If a DB transaction fails, the entire operation rolls back. No partial state.
2. **Exactly-once semantics** — Outbox pattern ensures jobs aren't enqueued twice, even if workers crash.
3. **Idempotent retries** — Any worker can restart and re-process the same job without data corruption.
4. **Single source of truth** — PostgreSQL, not Redis. Redis is transient.
5. **Type safety** — All contracts validated with Zod before processing.
6. **Graceful failure** — If any stage fails, the job is marked failed with a specific error_message. No stuck jobs.

---

## Glossary

| Term | Definition |
|------|------------|
| **Outbox Pattern** | A DB table that captures the next job before publishing to Redis; survives crashes |
| **Idempotent** | Safe to retry; produces the same result every time |
| **BullMQ** | Redis-backed distributed job queue with priority support and automatic retries |
| **Structured Content** | LLM output validated against `StructuredContentSchema` (Zod) |
| **Slide** | One image in the carousel (1080×1080px); generated from one piece of structured content |
| **Brand Kit** | JSON object with colors, fonts, logo; applied to all renders for a job |
| **Worker** | A long-running process that consumes jobs from a queue and processes them |
| **Pool** | A set of reusable resources (e.g., Playwright browser pages) managed by a worker |
| **TTL** | Time-To-Live; jobs stuck for >30min are marked failed automatically |
| **R2** | Cloudflare R2 object storage (S3-compatible) for audio, slides, and assets |

---

## Next Steps

1. **Create a branch**: `git checkout -b docs/v1-spec`
2. **Read ARCHITECTURE.md** — it links everything together
3. **Ask AI agents to implement** using the specific `.md` files as requirements

---

## Document Versions

| Date | Version | Author | Changes |
|------|---------|--------|----------|
| 2026-07-17 | 1.0 | vaz3r | Initial comprehensive spec for V1 |

---

## Contact & Questions

If specs are unclear or contradictory, file an issue in this repo and tag the spec file. AI agents should ask clarifying questions rather than guess.

**Good agent question:** "In WORKERS.md, it says worker-ingest retries up to 2 times on network timeout. Does this include the initial attempt, or is it 2 retries = 3 total attempts?"

**Bad agent approach:** "I'll just retry 5 times" (deviates from spec without asking)

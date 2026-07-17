# Loopreel V1 Documentation

> **Authoritative source of truth:** These documents define the current Loopreel V1 contracts. Do not use root-level files or `archive/` for implementation decisions.

## Start Here

1. Read [AI_SYSTEM_PROMPT.md](./AI_SYSTEM_PROMPT.md) for the mandatory agent protocol and V1 boundaries.
2. Read [TRACKER.md](./TRACKER.md) to choose and record the current task.
3. Follow the implementation reading order below.

## Master Index

| Area | Document | Purpose |
| --- | --- | --- |
| System design | [ARCHITECTURE.md](./ARCHITECTURE.md) | Components, data flow, and deployment topology. |
| Data model | [DATABASE.md](./DATABASE.md) | PostgreSQL schema, constraints, and indexes. |
| State | [STATE-MACHINES.md](./STATE-MACHINES.md) | XState job and worker lifecycle contracts. |
| HTTP interface | [API.md](./API.md) | Fastify routes, payloads, responses, and errors. |
| Background processing | [WORKERS.md](./WORKERS.md) | Worker inputs, outputs, idempotency, and failure handling. |
| Shared code | [PACKAGES.md](./PACKAGES.md) | Package boundaries and plain-SQL repository rules. |
| Validation | [SCHEMAS.md](./SCHEMAS.md) | Zod schemas and executable data contracts. |
| Deployment | [DEPLOYMENT.md](./DEPLOYMENT.md) | Local and production topology, secrets, and networking. |
| Operations | [OBSERVABILITY.md](./OBSERVABILITY.md) | Logging, health checks, metrics, and alerting. |
| Verification | [TESTING.md](./TESTING.md) | Testcontainers and Playwright testing requirements. |
| Agent workflow | [AI_SYSTEM_PROMPT.md](./AI_SYSTEM_PROMPT.md) | Non-negotiable implementation rules. |
| Work tracking | [TRACKER.md](./TRACKER.md) | Current milestones, tasks, and decision log. |

## Required Reading Order

1. [ARCHITECTURE.md](./ARCHITECTURE.md)
2. [DATABASE.md](./DATABASE.md)
3. [PACKAGES.md](./PACKAGES.md)
4. [STATE-MACHINES.md](./STATE-MACHINES.md)
5. [WORKERS.md](./WORKERS.md) and [API.md](./API.md)
6. [SCHEMAS.md](./SCHEMAS.md)
7. [DEPLOYMENT.md](./DEPLOYMENT.md), [OBSERVABILITY.md](./OBSERVABILITY.md), and [TESTING.md](./TESTING.md)

## Non-Negotiable V1 Rules

- Use plain SQL repositories through `@loopreel/db`; do not introduce an ORM.
- Treat PostgreSQL as the source of truth and Redis as transient queue infrastructure.
- Advance jobs only through the documented XState transitions and transactional outbox events.
- Make every worker idempotent and keep API and worker processes stateless.
- Do not add auth, billing, sessions, or other V1.1+ scope without explicit direction.
- When contracts conflict or are incomplete, ask before implementing.

## Historical Documents

[`../archive/`](../archive/) contains retained roadmaps and earlier system design material. It is historical reference only and must not override this directory.

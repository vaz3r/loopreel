# Testing (V1)

## Overview
Loopreel V1 strictly relies on **Real-Life Testing** rather than unit testing with mocks. Because the pipeline is heavily dependent on Database transactions (Outbox Pattern) and Redis message brokering, mocking these boundaries creates a false sense of security. 

We use **Testcontainers** to spin up ephemeral PostgreSQL and Redis instances for Integration tests, and real Playwright browsers for E2E tests.

## Specification

### Integration Testing Strategy (Testcontainers)
Tests run against real backing services. No database mocks are allowed.

**Setup:**
- Use `testcontainers-node` to spin up PostgreSQL and Redis before the test suite runs.
- Run DB migrations against the Testcontainer DB.
- Point the shared packages (`@loopreel/db`, `@loopreel/queue`) to the Testcontainer ports.

**What we test:**
1. **The Outbox Relay Pattern:** 
   - Insert a job + outbox row. 
   - Ensure the relay picks it up, publishes to the BullMQ Testcontainer queue, and marks the outbox row as published.
2. **Worker Logic with Real DB:**
   - Add a dummy payload to the queue.
   - Run the worker handler.
   - Assert that the `generation_jobs` table updated correctly and the next outbox event was written.

### E2E Testing Strategy
E2E tests validate the full lifecycle from the HTTP API to the final R2 upload.

- **Environment:** Requires a fully running Docker Compose stack locally.
- **Tooling:** Playwright Test Runner (`@playwright/test`).
- **Flow:**
  1. `POST /api/jobs` with a predefined mock URL.
  2. Poll `GET /api/jobs/:id` until status is `complete`.
  3. Validate the `assets` array contains valid R2 (or local mock R2) URLs.
  4. Ensure `Playwright` visually compares the generated PNG slide against a golden snapshot.

## Examples

### Integration Test Example (Vitest + Testcontainers)

```typescript
import { describe, it, beforeAll, afterAll, expect } from 'vitest';
import { PostgreSqlContainer } from '@testcontainers/postgresql';
import { RedisContainer } from '@testcontainers/redis';
import { JobRepository } from '@loopreel/db';

describe('JobRepository Outbox Flow', () => {
  let pgContainer;
  let redisContainer;

  beforeAll(async () => {
    pgContainer = await new PostgreSqlContainer().start();
    redisContainer = await new RedisContainer().start();
    
    // Override connection strings
    process.env.DATABASE_URL = pgContainer.getConnectionUri();
    process.env.REDIS_URL = redisContainer.getConnectionUrl();
    
    // Run Migrations (helper function)
    await runMigrations();
  });

  afterAll(async () => {
    await pgContainer.stop();
    await redisContainer.stop();
  });

  it('atomically updates status and inserts outbox event', async () => {
    const jobId = await JobRepository.createDummyJob();
    
    await JobRepository.updateStatusAndOutbox(
      jobId, 
      'transcribing', 
      'structure', 
      { text: 'hello' }
    );

    const job = await JobRepository.findById(jobId);
    expect(job.status).toBe('transcribing');

    const outbox = await JobRepository.getUnpublishedEvents();
    expect(outbox).toHaveLength(1);
    expect(outbox[0].queue_name).toBe('structure');
  });
});
```

## Error Handling in Tests
- Testcontainers must be forcefully stopped in `afterAll` even if a test fails, otherwise orphan Docker containers will consume host memory.
- If an external API (like LLM or YouTube) is required, use a wiremock server (e.g. `msw` or `nock`) ONLY for the external HTTP call. The local DB and Redis must remain real.

## Checklist for Implementation
- [ ] Install `@testcontainers/postgresql` and `@testcontainers/redis`.
- [ ] Configure `vitest.workspace.ts` with dedicated `integration` and `e2e` projects.
- [ ] Write the Outbox Relay integration test to guarantee exactly-once delivery.
- [ ] Write one golden-path E2E test using Playwright.

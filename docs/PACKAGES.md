# Shared Packages (V1)

## Overview
Loopreel relies on shared packages within the monorepo to enforce consistency across the API and the distributed workers. These packages wrap external dependencies (Postgres, Redis, LLM APIs) and expose strict, type-safe internal APIs. 

**Critical Invariant:** No application code (API or Workers) should establish direct database or Redis connections. They must use these packages. We intentionally **avoid ORMs** in favor of plain, powerful SQL queries organized via the Repository pattern.

**Monorepo Tooling:** The workspace and cross-package dependencies are orchestrated by **Turborepo** to ensure fast, cached builds across the `apps/` and `packages/` boundaries.

## Specification

### `@loopreel/db`
Provides connection pooling and plain SQL Repositories. Uses `pg` (node-postgres) under the hood. 

**Structure:**
- `src/pool.ts`: Singleton PostgreSQL connection pool.
- `src/repositories/JobRepository.ts`: Methods for `generation_jobs`.
- `src/repositories/AssetRepository.ts`: Methods for `generated_assets`.
- `src/repositories/WorkerRepository.ts`: Methods for `worker_instances`.

**Repository Pattern Rules:**
1. Return strictly typed objects using Zod validation or Typescript interfaces from `@loopreel/types`.
2. Wrap multi-table operations in transactions natively.
3. Manage the Outbox Pattern internally so application code doesn't have to remember to do it.

### `@loopreel/queue`
Wraps `bullmq` to provide typed producers and consumers.

**Structure:**
- `src/client.ts`: Singleton Redis connection for BullMQ.
- `src/producer.ts`: Strongly typed wrapper around `Queue.add()`.
- `src/consumer.ts`: Strongly typed wrapper around `Worker`.

### `@loopreel/llm`
Wraps external LLM APIs (e.g. DeepSeek, OpenAI) to ensure consistency in system prompts and JSON mode coercion.

**Structure:**
- `src/client.ts`: Exposes `.generateStructuredContent(rawText: string)` returning validated JSON.

### `@loopreel/types`
Centralized TypeScript interfaces and enums (shared by frontend, backend, workers, and packages). Should ideally infer types from `@loopreel/schemas`.

## Examples

### Plain SQL Repository with Transaction (Outbox Pattern)
This is the standard approach to updating job state and queuing the next stage simultaneously:

```typescript
// packages/db/src/repositories/JobRepository.ts
import { pool } from '../pool';

export class JobRepository {
  /**
   * Updates job status and inserts an outbox event within a single transaction.
   */
  static async updateStatusAndOutbox(
    jobId: string, 
    newStatus: string, 
    nextQueue: string, 
    outboxPayload: any
  ): Promise<void> {
    const client = await pool.connect();
    
    try {
      await client.query('BEGIN');
      
      // 1. Update Job Status
      await client.query(
        `UPDATE generation_jobs SET status = $1, updated_at = NOW() WHERE id = $2`,
        [newStatus, jobId]
      );
      
      // 2. Insert Outbox Event
      await client.query(
        `INSERT INTO outbox_events (queue_name, job_payload, published) VALUES ($1, $2, false)`,
        [nextQueue, JSON.stringify(outboxPayload)]
      );
      
      await client.query('COMMIT');
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  }
}
```

## Error Handling

- **Database Transient Errors:** Connection resets should be handled by `pg` pool retry logic natively.
- **Transaction Rollbacks:** The Repository layer is responsible for catching errors during transactions, explicitly issuing a `ROLLBACK`, and then re-throwing the error for the caller (API or Worker handler) to manage.

## Checklist for Implementation
- [ ] Initialize `pg` pool with sensible defaults (min 2, max 20 connections).
- [ ] Implement `JobRepository`, `AssetRepository`, and `WorkerRepository`.
- [ ] Implement Redis connection pooling in `@loopreel/queue` optimized for BullMQ.

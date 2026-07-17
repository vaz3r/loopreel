# Loopreel V1 — System Design & State Machines

> **Status:** Pre-build. This document specifies every state machine, data flow, and edge case before code implementation. All AI agents follow these specifications exactly.

---

## Table of Contents

1. [Philosophy](#philosophy)
2. [State Machine Overview](#state-machine-overview)
3. [Job Lifecycle State Machine](#job-lifecycle-state-machine)
4. [Worker State Machine](#worker-state-machine)
5. [Playwright Pool State Machine](#playwright-pool-state-machine)
6. [Outbox Relay State Machine](#outbox-relay-state-machine)
7. [Application Startup State Machine](#application-startup-state-machine)
8. [Database Consistency Model](#database-consistency-model)
9. [Error Handling & Recovery](#error-handling--recovery)
10. [Observability & Metrics](#observability--metrics)

---

## Philosophy

This system is built on **state machines, not status strings**. Every component (job, worker, pool, relay) has explicit states and transitions. Benefits:

- **No ambiguous states** — "what does status='failed' mean if the worker restarted?" Never happens.
- **AI-safe** — LLMs can be given the xstate config and generate correct handlers.
- **Testable** — Every transition can be unit-tested in isolation.
- **Observable** — State transitions = events = logs = metrics.

**Single source of truth for state:** The state machine definition (xstate config), not scattered business logic.

---

## State Machine Overview

```
┌──────────────────────────────────────────────────────────────────┐
│                      Loopreel State Machines                      │
├──────────────────────────────────────────────────────────────────┤
│                                                                   │
│ 1. Job Lifecycle (22 states, handles retries + credit refunds)   │
│ 2. Worker Lifecycle (6 states per worker type + fleet mgmt)      │
│ 3. Playwright Pool (4 states, crash detection + recovery)        │
│ 4. Outbox Relay (5 states, handles Redis failure + recovery)     │
│ 5. App Startup (4 states, graceful initialization sequence)      │
│                                                                   │
└──────────────────────────────────────────────────────────────────┘
```

All machines are **stateless** (state lives in PostgreSQL or Redis), defined in xstate configs, and executed by deterministic handlers.

---

## Job Lifecycle State Machine

### States

```
                         ┌─────────────────────────────────────────────┐
                         │           CREATED (implicit)                │
                         │ (job row inserted, not in queue yet)        │
                         └──────────────────┬──────────────────────────┘
                                            │ [outbox_relay publishes]
                                            ▼
                         ┌─────────────────────────────────────────────┐
                         │           QUEUED (waiting)                  │
                         │ In Redis queue, waiting for worker          │
                         └──────┬──────────────────────────┬──────────┘
                                │                          │
                        [worker pick]              [TTL > 30m?]
                                │                          │
                                ▼                          ▼
                    ┌──────────────────────┐  ┌──────────────────────┐
                    │    INGESTING_WORK    │  │   TTL_EXPIRED_FAIL   │
                    │ (processing started) │  │  (credit refunded)   │
                    └──────┬───────┬───────┘  └────────────────────┬─┘
                           │       │                               │
                      [ok] │       │ [error]                       │
                           │       │                               │
                           ▼       ▼                               │
                    ┌──────────────────────┐  [TERMINAL]           │
                    │    TRANSCRIBING_WORK │                       │
                    └──────┬───────┬───────┘  [output: FAILED]     │
                           │       │                               │
                      [ok] │       │ [error]                       │
                           │       │                               │
                           ▼       ▼                               │
                    ┌──────────────────────┐                       │
                    │   STRUCTURING_WORK   │                       │
                    └──────┬───────┬───────┘                       │
                           │       │                               │
                      [ok] │       │ [error]                       │
                           │       │                               │
                           ▼       ▼                               │
                    ┌──────────────────────┐                       │
                    │    RENDERING_WORK    │                       │
                    └──────┬───────┬───────┘                       │
                           │       │                               │
                      [ok] │       │ [error]                       │
                           │       │                               │
                           ▼       ▼                               │
                    ┌──────────────────────┐                       │
                    │     COMPLETED       │                       │
                    │  (slides in R2)      │                       │
                    └────────────────┬─────┘                       │
                                     │                             │
                                     │ [TERMINAL]                 │
                                     │                             │
         ┌──────────────────────────────────────────────────────┬─┤
         │                                                      │ │
    ┌────▼──────────────┐  ┌───────────────────┐  ┌──────────┐│ │
    │  WORK_ERROR (can  │  │ RETRY_QUEUED      │  │   FAILED ││ │
    │  retry or fail)   │  │ (back in queue)    │  │ (credit  ││ │
    └────┬──────────────┘  └───────────────────┘  │ refunded)││ │
         │                                        └──────────┘│ │
         │ [< max retries?]                                   │ │
         │ [dedicate strategy per queue]                      │ │
         │                                                    │ │
      [yes]                                               [TERMINAL]
         │                                                    │ │
         ├──────────────────────────────────────────────────┘│
         │                                                    │
      [no]                                                   │
         │ [credit refund written]                           │
         │                                                    │
         ▼                                                    ▼
    MARKED_FAILED (in DB)          ──────────────────→    OUTPUT
```

### State Definitions (xstate format)

```typescript
// packages/types/src/jobs.ts — exported for all apps

export interface JobStateMachineContext {
  jobId: string
  sourceUrl: string
  sourceType: 'youtube' | 'blog' | 'article'
  priority: 1 | 5 | 10
  retryCount: number
  maxRetries: { [key in QueueName]: number }  // per-queue max
  backoffDelayMs: number
  errorMessage?: string
  createdAt: Date
  updatedAt: Date
  dbStatus: DatabaseStatus  // what's actually in the database
}

export type JobState =
  | 'CREATED'
  | 'QUEUED'
  | 'INGESTING_WORK'
  | 'TRANSCRIBING_WORK'
  | 'STRUCTURING_WORK'
  | 'RENDERING_WORK'
  | 'WORK_ERROR'
  | 'RETRY_QUEUED'
  | 'TTL_EXPIRED_FAIL'
  | 'COMPLETED'
  | 'MARKED_FAILED'

export type JobEvent =
  | { type: 'OUTBOX_RELAY_PUBLISHED'; queueName: string }
  | { type: 'WORKER_PICKED_UP'; queueName: string }
  | { type: 'WORKER_COMPLETED'; result: any }
  | { type: 'WORKER_ERRORED'; error: string; queueName: string }
  | { type: 'RETRY_READY'; nextQueueName: string }
  | { type: 'TTL_EXPIRED' }
  | { type: 'CREDIT_REFUND_WRITTEN' }
  | { type: 'MARKED_FAILED_IN_DB' }
```

### Transitions & Rules

```typescript
// xstate machine definition
export const jobMachine = createMachine<JobStateMachineContext, JobEvent>(
  {
    initial: 'CREATED',
    states: {
      CREATED: {
        on: {
          OUTBOX_RELAY_PUBLISHED: 'QUEUED',
        },
      },
      QUEUED: {
        on: {
          WORKER_PICKED_UP: {
            target: (queueName === 'ingest') ? 'INGESTING_WORK' : ...,
            actions: ['logStateTransition', 'updateDbStatus'],
          },
          TTL_EXPIRED: 'TTL_EXPIRED_FAIL',
        },
      },
      INGESTING_WORK: {
        on: {
          WORKER_COMPLETED: 'TRANSCRIBING_WORK',
          WORKER_ERRORED: {
            target: 'WORK_ERROR',
            cond: (ctx) => ctx.retryCount < ctx.maxRetries['ingest'],
          },
        },
      },
      TRANSCRIBING_WORK: {
        on: {
          WORKER_COMPLETED: 'STRUCTURING_WORK',
          WORKER_ERRORED: {
            target: 'WORK_ERROR',
            cond: (ctx) => ctx.retryCount < ctx.maxRetries['transcribe'],
          },
        },
      },
      STRUCTURING_WORK: {
        on: {
          WORKER_COMPLETED: 'RENDERING_WORK',
          WORKER_ERRORED: {
            target: 'WORK_ERROR',
            cond: (ctx) => ctx.retryCount < ctx.maxRetries['structure'],
          },
        },
      },
      RENDERING_WORK: {
        on: {
          WORKER_COMPLETED: 'COMPLETED',
          WORKER_ERRORED: {
            target: 'WORK_ERROR',
            cond: (ctx) => ctx.retryCount < ctx.maxRetries['render'],
          },
        },
      },
      WORK_ERROR: {
        on: {
          RETRY_READY: 'RETRY_QUEUED',
          MARKED_FAILED_IN_DB: 'MARKED_FAILED',
        },
        exit: ['incrementRetryCount'],
      },
      RETRY_QUEUED: {
        on: {
          WORKER_PICKED_UP: {
            // Route to same queue based on queueName from event
            target: 'INGESTING_WORK',  // or others depending on logic
          },
        },
      },
      TTL_EXPIRED_FAIL: {
        entry: ['refundCredit', 'logJobExpired'],
        on: {
          CREDIT_REFUND_WRITTEN: 'MARKED_FAILED',
        },
      },
      COMPLETED: {
        type: 'final',
        entry: ['logJobCompleted', 'publishCompletionEvent'],
      },
      MARKED_FAILED: {
        type: 'final',
        entry: ['logJobFailed', 'cleanupArtifacts'],
      },
    },
  },
  {
    actions: {
      logStateTransition: (ctx, event) => {
        logger.info({ jobId: ctx.jobId, from: state.value, to: state.nextValue, event })
      },
      // ... other actions
    },
  }
)
```

### Retry Strategy

Each queue has **independent retry logic**:

```typescript
export const QueueRetryConfig = {
  ingest: {
    maxRetries: 2,
    baseDelayMs: 5_000,
    backoffMultiplier: 1.5,
    jitterMs: 1_000,
  },
  transcribe: {
    maxRetries: 2,
    baseDelayMs: 10_000,
    backoffMultiplier: 1.5,
    jitterMs: 2_000,
  },
  structure: {
    maxRetries: 3,  // LLM rate limits
    baseDelayMs: 5_000,
    backoffMultiplier: 2.0,  // exponential for 429s
    jitterMs: 2_000,
  },
  render: {
    maxRetries: 1,
    baseDelayMs: 5_000,
    backoffMultiplier: 1.0,
    jitterMs: 500,
  },
}
```

### Credit Lifecycle

```
CREATED          (no credit action yet)
   │
   ├─ QUEUED (optional: soft-reserve credit? or only on WORK_ERROR?)
   │
   ├─ COMPLETED
   │    └─ credit spent (ledger entry: -1)
   │
   └─ WORK_ERROR / MARKED_FAILED
        └─ credit refunded if spent earlier (ledger entry: +1)

RULE: Credit is debited ONCE, either:
  A) On first WORKER_PICKED_UP (hard debit immediately)
  B) On COMPLETED only (debit on success)

Decision: Use (B) — no debit until confirmed complete. Simplifies refund logic.
```

### TTL Sweep

Database TTL sweep runs in API process, every 5 minutes:

```sql
-- Scheduled job in API process
-- Every 5 minutes, find jobs stuck in non-terminal states
SELECT * FROM generation_jobs
  WHERE status NOT IN ('complete', 'failed')
    AND updated_at < now() - INTERVAL '30 minutes'
    AND job_id NOT IN (
      SELECT job_id FROM outbox_events WHERE published = false
    );
-- For each row: transition to MARKED_FAILED, write credit refund, update status
```

---

## Worker State Machine

### States

Each worker type (`IngestWorker`, `TranscribeWorker`, `StructureWorker`, `RenderWorker`) runs a **fleet** of instances. The fleet machine tracks:

```
┌──────────────┐
│ INITIALIZING │ (loading deps, connecting to Redis + DB)
└──────┬───────┘
       │ [all deps ready?]
       ▼
┌──────────────┐
│ IDLE         │ (waiting for job from queue)
└──────┬───────┘
       │ [BullMQ job received]
       ▼
┌──────────────┐
│ PROCESSING   │ (executing job logic)
└──────┬───────┘
       │
   ┌───┴────┬─────────────┐
   │        │             │
 [ok]  [transient]   [fatal]
   │        │             │
   ▼        ▼             ▼
┌──────┐ ┌─────────┐  ┌──────────┐
│ IDLE │ │ ERROR   │  │ CRASHED  │
│      │ │ TRANSIENT
│      │ │         │  │ (SIGTERM │
│      │ │ (retry?)│  │ or OOM)  │
└──────┘ └────┬────┘  └────┬─────┘
              │            │
        [BullMQ re-enqueue] │ [graceful restart?]
              │            │ [or manual restart]
              ▼            ▼
            [IDLE]     [CRASHED]
```

### State Definitions

```typescript
export interface WorkerContext {
  instanceId: string
  workerType: 'ingest' | 'transcribe' | 'structure' | 'render'
  hostname: string
  pid: number
  redisUrl: string
  databaseUrl: string
  concurrency: number
  jobsProcessed: number
  currentJobId?: string
  lastError?: string
  crashCount: number
  startedAt: Date
  lastHeartbeatAt: Date
}

export type WorkerState =
  | 'INITIALIZING'
  | 'IDLE'
  | 'PROCESSING'
  | 'ERROR_TRANSIENT'
  | 'ERROR_FATAL'
  | 'CRASHED'

export type WorkerEvent =
  | { type: 'INIT_COMPLETE' }
  | { type: 'INIT_FAILED'; error: string }
  | { type: 'JOB_RECEIVED'; jobId: string }
  | { type: 'JOB_COMPLETED'; jobId: string; result: any }
  | { type: 'JOB_ERRORED'; jobId: string; error: string; retryable: boolean }
  | { type: 'HEARTBEAT_SKIPPED' }
  | { type: 'GRACEFUL_SHUTDOWN' }
  | { type: 'CRASHED'; reason: string }
```

### Heartbeat & Health Check

Every worker **upserts** a `worker_instances` row every **10 seconds**:

```typescript
// In worker process, recurring task
setInterval(async () => {
  await db
    .insert(worker_instances)
    .values({
      instance_id: context.instanceId,
      worker_type: context.workerType,
      hostname: context.hostname,
      queue_name: `${context.workerType}_queue`,
      started_at: context.startedAt,
      last_seen: new Date(),
      jobs_processed: context.jobsProcessed,
    })
    .onConflict((oc) => oc.column('instance_id').doUpdateSet({
      last_seen: new Date(),
      jobs_processed: context.jobsProcessed,
    }))
}, 10_000)
```

API `/api/workers` endpoint:

```typescript
fastify.get('/api/workers', async (req, reply) => {
  // Return instances where last_seen > now() - 30 seconds
  // Grouped by worker_type
  const workers = await db
    .select()
    .from(worker_instances)
    .where(gt(worker_instances.last_seen, sql`now() - INTERVAL '30 seconds'`))

  return workers.reduce((acc, w) => {
    acc[w.worker_type] ??= []
    acc[w.worker_type].push({
      instanceId: w.instance_id,
      hostname: w.hostname,
      jobsProcessed: w.jobs_processed,
      lastSeen: w.last_seen,
      uptime: datesDiff(w.started_at, new Date()),
    })
    return acc
  }, {} as Record<string, WorkerInfo[]>)
})
```

### Graceful Shutdown

On `SIGTERM`:

```typescript
process.on('SIGTERM', async () => {
  logger.info('SIGTERM received, shutting down gracefully')
  
  // State transition: PROCESSING → (finish in-flight jobs or timeout)
  const shutdownTimeout = 30_000
  const shutdownPromise = bullQueue.close(shutdownTimeout)
  
  await Promise.race([
    shutdownPromise,
    new Promise((_, reject) => 
      setTimeout(() => reject(new Error('Graceful shutdown timeout')), shutdownTimeout)
    )
  ])
  
  // State transition: IDLE → exit
  process.exit(0)
})
```

---

## Playwright Pool State Machine

### States

The pool is **internal to `worker-render`**, not a distributed service. State lives in memory.

```
┌──────────────┐
│ INITIALIZING │ (launching Chromium instances)
└──────┬───────┘
       │ [all N pages launched?]
       ▼
┌──────────────┐
│ HEALTHY      │ (all pages available, serving render requests)
└──────┬───────┐
       │       │
  [page   [crash
   crash] detected]
       │       │
       ▼       ▼
┌──────────────────────────────┐
│ DEGRADED                     │ (one or more pages crashed, but replacing)
│ (replacing crashed page)     │
└──────┬───────────────────────┘
       │ [replacement page online?]
       ▼
┌──────────────────────────────┐
│ CRASHED (unrecoverable)      │ (multiple pages crashed, recovery failed)
└──────────────────────────────┘
       │ [manual restart required]
```

### State Definitions

```typescript
export interface BrowserPoolContext {
  poolSize: number
  maxWaiters: number
  availablePages: Set<Page>
  allPages: Map<string, Page>  // pageId → Page
  crashedPages: Map<string, { page: Page; crashCount: number }>
  waiters: Array<{ resolve: (p: Page) => void; reject: (e: Error) => void }>
  state: 'INITIALIZING' | 'HEALTHY' | 'DEGRADED' | 'CRASHED'
}

export type PoolEvent =
  | { type: 'INIT_COMPLETE' }
  | { type: 'INIT_FAILED'; error: string }
  | { type: 'PAGE_ACQUIRED'; pageId: string }
  | { type: 'PAGE_RELEASED'; pageId: string }
  | { type: 'PAGE_CRASHED'; pageId: string }
  | { type: 'REPLACEMENT_SPAWNED'; pageId: string }
  | { type: 'MAX_WAITERS_EXCEEDED' }
  | { type: 'RECOVERY_FAILED' }
```

### Critical Implementation: Crash Handler

```typescript
// In BrowserPool.addPage()
private async addPage(): Promise<void> {
  const page = await this.browser.newPage()
  const pageId = crypto.randomUUID()
  
  this.allPages.set(pageId, page)
  this.availablePages.add(page)
  
  page.on('crash', async () => {
    logger.warn(`Page ${pageId} crashed`)
    this.allPages.delete(pageId)
    this.availablePages.delete(page)
    this.crashedPages.set(pageId, { page, crashCount: (this.crashedPages.get(pageId)?.crashCount ?? 0) + 1 })
    
    // Attempt replacement
    if (this.crashedPages.get(pageId)!.crashCount > 3) {
      logger.error(`Page ${pageId} crashed 3+ times, not replacing`)
      // Transition to DEGRADED or CRASHED state
      return
    }
    
    try {
      await this.addPage()  // spawn replacement
      logger.info(`Spawned replacement page for ${pageId}`)
    } catch (e) {
      logger.error(`Failed to spawn replacement page: ${e.message}`)
    }
  })
}
```

### Pool Metrics Sidecar

HTTP server running on port 8004 (configurable):

```typescript
// worker-render/src/sidecar.ts
export function startPoolSidecar(pool: BrowserPool, port: number) {
  const server = http.createServer((req, res) => {
    if (req.url === '/metrics') {
      const metrics = {
        poolSize: pool.poolSize,
        available: pool.availablePages.size,
        waiters: pool.waiters.length,
        allPages: pool.allPages.size,
        crashedPages: pool.crashedPages.size,
        state: pool.state,
      }
      res.writeHead(200, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify(metrics))
    } else {
      res.writeHead(404).end()
    }
  })
  server.listen(port)
}
```

API health check aggregates this:

```typescript
fastify.get('/api/health', async (req, reply) => {
  const poolMetrics = await fetch('http://localhost:8004/metrics').then(r => r.json())
  const queueStats = await bullQueues.ingest.getJobCounts()  // per queue
  
  return {
    status: 'healthy',
    pool: poolMetrics,
    queues: queueStats,
    timestamp: new Date(),
  }
})
```

---

## Outbox Relay State Machine

### States

The relay runs inside the API process as a background service.

```
┌──────────────┐
│ INITIALIZING │ (connecting to Redis + DB)
└──────┬───────┘
       │ [ready?]
       ▼
┌──────────────┐
│ IDLE         │ (sleeping, waiting for next poll cycle)
└──────┬───────┘
       │ [timer: 500ms]
       ▼
┌──────────────┐
│ POLLING      │ (reading unpublished outbox rows)
└──────┬───────┘
       │
    ┌──┴──────────┬────────────────┐
    │             │                │
 [error]      [found    [none
    │          rows]     found]
    ▼             │         │
┌──────────┐      ▼         ▼
│ ERROR    │   ┌────────┐ ┌──────┐
│ (transient)   │PUBLISHING│ │IDLE  │
│          │   │        │ │      │
└────┬─────┘   └───┬────┘ └──────┘
     │             │
  [wait 10s]   [all published?]
     │             │
     ▼             ├─ yes → IDLE
  [retry]          │
                   └─ no → ERROR (partial failure)
```

### State Definitions

```typescript
export interface OutboxRelayContext {
  pollIntervalMs: number
  maxBatchSize: number
  lastPollAt?: Date
  lastErrorAt?: Date
  errorCount: number
  successCount: number
}

export type OutboxRelayEvent =
  | { type: 'POLL_TICK' }
  | { type: 'ROWS_FOUND'; count: number }
  | { type: 'PUBLISH_SUCCESS'; count: number }
  | { type: 'PUBLISH_ERROR'; error: string; partialCount?: number }
  | { type: 'RETRY_BACKOFF_COMPLETE' }
```

### Implementation

```typescript
// packages/db/src/outbox-relay.ts
export class OutboxRelay {
  private state: OutboxRelayEvent['type'] = 'IDLE'
  private errorBackoffMs = 10_000
  private pollInterval: NodeJS.Timeout | null = null

  async start(db: Database, queues: QueueMap) {
    this.pollInterval = setInterval(() => this.poll(db, queues), 500)
  }

  private async poll(db: Database, queues: QueueMap) {
    try {
      // Fetch unpublished rows with row-level locking to prevent double-publish
      const rows = await db
        .selectFrom(outboxEvents)
        .selectAll()
        .where((eb) => eb('published', '=', false))
        .orderBy('created_at', 'asc')
        .limit(50)
        .forUpdate({ skipLocked: true })
        .execute()

      if (rows.length === 0) {
        this.state = 'IDLE'
        return
      }

      this.state = 'POLLING'

      // Publish to BullMQ
      let publishCount = 0
      for (const row of rows) {
        try {
          await queues[row.queue_name].add(
            row.queue_name,
            row.job_payload,
            row.bullmq_opts
          )
          publishCount++
        } catch (e) {
          logger.error({
            outboxId: row.id,
            queueName: row.queue_name,
            error: e.message,
          })
          // Partial failure — continue with remaining rows
        }
      }

      // Mark published rows as done
      if (publishCount > 0) {
        await db
          .updateTable(outboxEvents)
          .set({ published: true })
          .where((eb) =>
            eb('id', 'in', rows.slice(0, publishCount).map((r) => r.id))
          )
          .execute()

        logger.info({ publishedCount: publishCount })
        this.state = 'IDLE'
        this.successCount++
      } else {
        this.state = 'ERROR'
        this.errorCount++
      }
    } catch (e) {
      logger.error({ event: 'relay_error', error: e.message })
      this.state = 'ERROR'
      this.errorCount++

      // Backoff: don't poll again for 10s
      await new Promise((resolve) => setTimeout(resolve, this.errorBackoffMs))
    }
  }

  stop() {
    if (this.pollInterval) clearInterval(this.pollInterval)
  }
}
```

**Key properties:**
- **Row-level locking** (`FOR UPDATE SKIP LOCKED`) prevents two relay instances publishing the same row twice.
- **Partial failures are safe** — if 3/5 rows publish successfully, only those 3 are marked published. Failed rows retry next cycle.
- **No message loss** — if the API crashes mid-relay, unpublished rows stay in the table and replay on restart.

---

## Application Startup State Machine

The API must validate all dependencies before accepting traffic.

```
┌──────────────┐
│ INITIALIZING │
└──────┬───────┘
       │
  ┌────┴────────────────────────────────────┐
  │                                         │
  ▼                                         ▼
┌─────────────────┐              ┌──────────────────┐
│ DB_CONNECTING   │              │ REDIS_CONNECTING │
│ (migrations)    │              │ (ping test)      │
└────┬────────────┘              └────┬─────────────┘
     │ [ready?]                       │ [ready?]
     │                               │
     ▼                               ▼
┌─────────────┐                ┌──────────────┐
│ DB_READY    │                │ REDIS_READY  │
└────┬────────┘                └────┬─────────┘
     │                              │
     └──────────────────┬───────────┘
                        │
                        ▼
                ┌────────────────┐
                │ POOL_INIT      │
                │ (Playwright)   │
                └────┬───────────┘
                     │ [ready?]
                     ▼
                ┌────────────────┐
                │ RELAY_START    │
                │ (outbox relay) │
                └────┬───────────┘
                     │ [ready?]
                     ▼
                ┌────────────────┐
                │ READY          │
                │ (listen on 3000)
                └────────────────┘
                
             [FAILURE AT ANY STEP]
                     │
                     ▼
                ┌──────────────┐
                │ INIT_FAILED  │
                │ (error logs) │
                │ (exit 1)     │
                └──────────────┘
```

### Implementation

```typescript
// apps/api/src/bootstrap.ts
export async function bootstrap(): Promise<Fastify> {
  const fastify = Fastify()

  // STATE: INITIALIZING
  logger.info('API initializing...')

  try {
    // STATE: DB_CONNECTING
    logger.info('Connecting to database...')
    const db = createDatabaseClient(process.env.DATABASE_URL)
    await db.execute(sql`SELECT 1`)  // connectivity check
    logger.info('Database ready')

    // STATE: REDIS_CONNECTING
    logger.info('Connecting to Redis...')
    const redis = new Redis(process.env.REDIS_URL)
    await redis.ping()
    logger.info('Redis ready')

    // STATE: POOL_INIT
    logger.info('Initializing Playwright pool...')
    const pool = new BrowserPool(parseInt(process.env.PLAYWRIGHT_POOL_SIZE ?? '5'))
    await pool.init()
    logger.info('Playwright pool ready')

    // STATE: RELAY_START
    logger.info('Starting outbox relay...')
    const relay = new OutboxRelay()
    const queues = {
      ingest: new Queue('ingest', redis),
      transcribe: new Queue('transcribe', redis),
      structure: new Queue('structure', redis),
      render: new Queue('render', redis),
    }
    await relay.start(db, queues)
    logger.info('Outbox relay ready')

    // Register routes
    fastify.get('/api/health', (req, reply) => {
      // returns pool metrics
    })
    fastify.post('/api/jobs', async (req, reply) => {
      // creates job + outbox row
    })
    // ... other routes

    // STATE: READY
    await fastify.listen({ port: 3000, host: '0.0.0.0' })
    logger.info('API listening on port 3000')

    return fastify
  } catch (e) {
    // STATE: INIT_FAILED
    logger.fatal({ error: e.message })
    process.exit(1)
  }
}
```

---

## Database Consistency Model

### Invariants

These must be **always true** at the database level:

1. **Every job has exactly one status** (CHECK constraint enforces enum values).
2. **Status transitions are unidirectional** (enforced in application logic, not DB — no cyclic transitions).
3. **Credit ledger is append-only** — no UPDATE or DELETE statements ever touch `credit_ledger` rows.
4. **Outbox row is idempotent** — same `job_id` + `queue_name` can be re-inserted, treated as duplicate if already published.
5. **Worker instance upserts by `instance_id`** — no duplicates, just updates `last_seen` and `jobs_processed`.
6. **Generated assets are immutable** — once inserted, never updated; only deleted on job failure.

### Transactions

All mutations use **serializable isolation level** for critical sections:

```typescript
// Job submission (API)
await db.transaction(async (tx) => {
  // 1. Insert job row
  const job = await tx
    .insertInto(generation_jobs)
    .values({
      id: jobId,
      source_url: sourceUrl,
      source_type: sourceType,
      status: 'queued',
      priority: priority,
      brand_kit: brandKit,
      template_id: templateId,
    })
    .returning('*')
    .executeTakeFirstOrThrow()

  // 2. Insert outbox row (atomic with job creation)
  await tx
    .insertInto(outbox_events)
    .values({
      queue_name: 'ingest',
      job_payload: { jobId, sourceUrl, sourceType },
      bullmq_opts: { priority },
      published: false,
    })
    .execute()

  // Both or neither — no halfway state
}, { isolationLevel: 'serializable' })
```

### Foreign Key Constraints

```sql
ALTER TABLE generated_assets
  ADD CONSTRAINT fk_assets_job_id
  FOREIGN KEY (job_id) REFERENCES generation_jobs(id)
  ON DELETE CASCADE;

ALTER TABLE credit_ledger
  ADD CONSTRAINT fk_ledger_user_id
  FOREIGN KEY (user_id) REFERENCES users(id)
  ON DELETE CASCADE;
```

---

## Error Handling & Recovery

### Classification of Errors

| Error Type | Retryable? | Handler | Example |
|---|---|---|---|
| **Transient** | YES | BullMQ automatic retry with backoff | Network timeout, Redis connection hiccup, `Retry-After` header from LLM API |
| **Fatal (job-specific)** | NO | Mark job FAILED, refund credit | Invalid source URL, LLM schema validation failed after 2 attempts, Playwright page unresponsive |
| **Fatal (worker-level)** | MAYBE | Log, may auto-restart | Out of memory, file descriptor limit, database connection pool exhausted |
| **Transient (fleet-level)** | YES | Graceful shutdown, restart | SIGTERM during deployment, temporary CPU spike |

### Error Recovery Patterns

#### Pattern 1: Worker Error → Retry

```typescript
// In worker-transcribe
try {
  const transcript = await transcribeWithWhisper(audioR2Key)
  // ... on success, write to outbox
} catch (error) {
  if (isTransient(error)) {
    // BullMQ catches this and re-enqueues with backoff
    throw error
  } else {
    // Fatal — update job status to 'failed'
    await db.transaction(async (tx) => {
      await tx
        .updateTable(generation_jobs)
        .set({
          status: 'failed',
          error_message: error.message,
          updated_at: new Date(),
        })
        .where(eq(generation_jobs.id, jobId))
        .execute()
    })
    // Job state machine transitions: WORK_ERROR → MARKED_FAILED
  }
}
```

#### Pattern 2: Job TTL Expiry → Refund

```typescript
// In API cron (every 5 minutes)
const expiredJobs = await db
  .select()
  .from(generation_jobs)
  .where(and(
    notInArray(generation_jobs.status, ['complete', 'failed']),
    lt(generation_jobs.updated_at, sql`now() - INTERVAL '30 minutes'`),
  ))
  .execute()

for (const job of expiredJobs) {
  await db.transaction(async (tx) => {
    // 1. Mark job as failed
    await tx
      .updateTable(generation_jobs)
      .set({
        status: 'failed',
        error_message: 'Job TTL exceeded — worker offline for >30 minutes',
        updated_at: new Date(),
      })
      .where(eq(generation_jobs.id, job.id))
      .execute()

    // 2. Refund credit (write ledger row)
    await tx
      .insertInto(credit_ledger)
      .values({
        user_id: job.user_id,
        delta: 1,  // assuming 1 credit per job
        reason: 'job_refund_ttl_expired',
        job_id: job.id,
      })
      .execute()

    logger.info({ jobId: job.id, reason: 'ttl_expired', refunded: true })
  }, { isolationLevel: 'serializable' })
}
```

#### Pattern 3: Playwright Page Crash → Replace

```typescript
// In BrowserPool
page.on('crash', async () => {
  this.allPages.delete(page)
  this.availablePages.delete(page)
  crashedPages.increment()

  if (crashedPages > 3) {
    logger.error('Pool degraded: too many crashes, not replacing')
    this.state = 'DEGRADED'
    // Return 503 on next render request
    return
  }

  try {
    await this.addPage()  // spawn replacement
    logger.info('Page crash recovered, replacement online')
  } catch (e) {
    logger.error({ error: e.message })
    this.state = 'CRASHED'
  }
})
```

---

## Observability & Metrics

### Structured Logging

All logs include context:

```typescript
export interface LogContext {
  jobId?: string
  workerId?: string
  workerType?: string
  queueName?: string
  level: 'trace' | 'debug' | 'info' | 'warn' | 'error' | 'fatal'
  timestamp: Date
  message: string
  [key: string]: any
}
```

Example:

```typescript
logger.info({
  jobId: job.id,
  event: 'job_created',
  sourceUrl: job.source_url,
  sourceType: job.source_type,
  priority: job.priority,
})

logger.error({
  jobId: job.id,
  workerType: 'transcribe',
  workerId: worker.id,
  event: 'worker_error',
  error: error.message,
  stack: error.stack,
  retryable: true,
  retryCount: job.retry_count,
})
```

### State Transition Events

Every state machine transition emits an event:

```typescript
const stateTransition = (context: JobStateMachineContext, from: JobState, to: JobState, event: JobEvent) => {
  logger.info({
    jobId: context.jobId,
    event: 'state_transition',
    from,
    to,
    trigger: event.type,
  })

  // Also increment metric
  metrics.stateTransitions.labels(context.jobId, from, to).inc()
}
```

### Key Metrics (Prometheus)

```
# Counter: total state transitions
loopreel_state_transitions_total{job_state, from, to}

# Gauge: current jobs by state
loopreel_jobs_current{state}

# Histogram: job duration (CREATED → COMPLETED or FAILED)
loopreel_job_duration_seconds{status, source_type}

# Gauge: queue depth
loopreel_queue_depth{queue_name}

# Counter: worker errors
loopreel_worker_errors_total{worker_type, error_type}

# Gauge: browser pool stats
loopreel_pool_available_pages
loopreel_pool_total_pages
loopreel_pool_waiters_depth

# Counter: outbox relay stats
loopreel_outbox_published_total
loopreel_outbox_failed_total

# Gauge: active worker instances
loopreel_worker_instances{worker_type}
```

### Health Check Endpoint

```typescript
fastify.get('/api/health', async (req, reply) => {
  const dbPing = await db.execute(sql`SELECT 1`).catch(() => null)
  const redisPing = await redis.ping().catch(() => null)
  const poolMetrics = await fetch('http://localhost:8004/metrics').then(r => r.json()).catch(() => null)
  const queueStats = await Promise.all([
    queues.ingest.getJobCounts(),
    queues.transcribe.getJobCounts(),
    queues.structure.getJobCounts(),
    queues.render.getJobCounts(),
  ])

  const status = dbPing && redisPing && poolMetrics ? 'healthy' : 'degraded'

  return {
    status,
    checks: {
      database: dbPing ? 'ok' : 'error',
      redis: redisPing ? 'ok' : 'error',
      pool: poolMetrics ? 'ok' : 'error',
    },
    pool: poolMetrics,
    queues: {
      ingest: queueStats[0],
      transcribe: queueStats[1],
      structure: queueStats[2],
      render: queueStats[3],
    },
    timestamp: new Date(),
  }
})
```

---

## Summary: State Machine Rules

When writing code, follow these rules **religiously**:

1. **State lives in PostgreSQL or Redis, not in-process memory** (except for transient UI state).
2. **Emit state transition events for every change** (logs + metrics).
3. **Guard all transitions with preconditions** (e.g., "can only retry if retryCount < maxRetries").
4. **Make transitions idempotent** (applying the same event twice = same outcome).
5. **Never skip the database** (always write state, then execute side effect).
6. **Test each state machine in isolation** (unit tests per state and per transition).
7. **Log the state machine context** (jobId, workerId, error, attempt count).

---

## Next Steps

1. **AI Agents can now reference this spec** when implementing any module.
2. **Each app/worker will have an xstate machine config** (`src/machines/*.ts`).
3. **Test suite**: for each state machine, write tests covering all transitions + edge cases.
4. **Code generation**: AI can auto-generate 80% of boilerplate (handlers, logging, metrics).


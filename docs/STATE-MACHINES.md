# State Machines

## Overview
This document defines the core state machines governing Loopreel V1. Because the system is distributed, state machines are critical for ensuring consistency, fault tolerance, and predictable recovery. We use XState (JS) to formalize these state transitions, providing executable contracts for the AI agents to implement.

## Specification

### 1. Job Lifecycle State Machine

The core `generation_jobs` entity moves through a strict linear pipeline. 

**Critical Invariants:**
- Transitions only move forward, except for retries which remain in the current state.
- `failed` and `complete` are terminal states.
- The state in the database is the ultimate source of truth.

```javascript
import { createMachine } from 'xstate';

export const jobLifecycleMachine = createMachine({
  id: 'generationJob',
  initial: 'queued',
  context: {
    jobId: null,
    sourceType: null,
    retryCount: 0,
    maxRetries: 3
  },
  states: {
    queued: {
      on: {
        START_INGEST: 'ingesting'
      }
    },
    ingesting: {
      on: {
        INGEST_SUCCESS_YOUTUBE: 'transcribing',
        INGEST_SUCCESS_TEXT: 'structuring',
        INGEST_ERROR_TRANSIENT: [
          { target: 'ingesting', cond: 'canRetry', actions: 'incrementRetry' },
          { target: 'failed' }
        ],
        INGEST_ERROR_FATAL: 'failed'
      }
    },
    transcribing: {
      on: {
        TRANSCRIBE_SUCCESS: 'structuring',
        TRANSCRIBE_ERROR_TRANSIENT: [
          { target: 'transcribing', cond: 'canRetry', actions: 'incrementRetry' },
          { target: 'failed' }
        ],
        TRANSCRIBE_ERROR_FATAL: 'failed'
      }
    },
    structuring: {
      on: {
        STRUCTURE_SUCCESS: 'rendering',
        STRUCTURE_ERROR_TRANSIENT: [
          { target: 'structuring', cond: 'canRetry', actions: 'incrementRetry' },
          { target: 'failed' }
        ],
        STRUCTURE_ERROR_FATAL: 'failed'
      }
    },
    rendering: {
      on: {
        RENDER_SUCCESS: 'complete',
        RENDER_ERROR_TRANSIENT: [
          { target: 'rendering', cond: 'canRetry', actions: 'incrementRetry' },
          { target: 'failed' }
        ],
        RENDER_ERROR_FATAL: 'failed'
      }
    },
    complete: {
      type: 'final'
    },
    failed: {
      type: 'final'
    }
  }
}, {
  guards: {
    canRetry: (context) => context.retryCount < context.maxRetries
  },
  actions: {
    incrementRetry: (context) => {
      context.retryCount += 1;
    }
  }
});
```

### 2. Outbox Relay State Machine

The Outbox pattern guarantees exactly-once dispatch to the Redis queue. The relay polls the `outbox_events` table and publishes to BullMQ.

```javascript
import { createMachine } from 'xstate';

export const outboxRelayMachine = createMachine({
  id: 'outboxRelay',
  initial: 'idle',
  states: {
    idle: {
      after: {
        500: 'polling'
      }
    },
    polling: {
      invoke: {
        src: 'fetchUnpublishedEvents',
        onDone: [
          { target: 'publishing', cond: 'hasEvents' },
          { target: 'idle' }
        ],
        onError: 'error'
      }
    },
    publishing: {
      invoke: {
        src: 'publishEventsToBullMQ',
        onDone: 'markingAsPublished',
        onError: 'error'
      }
    },
    markingAsPublished: {
      invoke: {
        src: 'updateEventsAsPublished',
        onDone: 'idle',
        onError: 'error'
      }
    },
    error: {
      // In case of error (e.g. DB connection loss, Redis down), backoff and retry
      after: {
        5000: 'idle'
      }
    }
  }
}, {
  guards: {
    hasEvents: (_, event) => event.data.length > 0
  }
});
```

## Examples

### Using the Job Machine to Drive DB Updates
When a worker completes its task, it doesn't just arbitrarily update the DB. It should effectively execute a state transition:

```javascript
// Inside worker-ingest
if (sourceType === 'youtube') {
  // Execute transition
  const nextState = jobLifecycleMachine.transition('ingesting', 'INGEST_SUCCESS_YOUTUBE');
  
  // Database Transaction: (Plain SQL Repository Pattern)
  await jobRepository.updateStatusAndOutbox(jobId, nextState.value, 'transcribe', payload);
}
```

## Error Handling

- **Transient vs Fatal:** Always classify errors. Network timeouts are transient; validation failures are fatal.
- **Rollback:** If a state transition fails at the database level, the worker must throw so BullMQ can handle the retry natively based on the current state.
- **Stuck Jobs (TTL):** A background chron should sweep `generation_jobs` where `updated_at < now() - 30 mins` and force transition them to `failed`.

## Checklist for Implementation
- [ ] Implement `JobLifecycleMachine` as a shared utility in `@loopreel/queue` (or shared package).
- [ ] Implement `OutboxRelayMachine` logic in the dedicated `worker-relay` service.
- [ ] Map all BullMQ worker success/failure conditions to explicit machine events.

# Workers (V1)

## Overview
Loopreel uses 4 distinct, distributed worker types consuming from BullMQ queues. Each worker isolates one discrete stage of the content generation pipeline. Workers are stateless and rely entirely on PostgreSQL (via plain SQL repositories) as the single source of truth for job state.

## Specification

All workers use BullMQ as the message broker (via Redis), but they **must not** rely on BullMQ payload data for absolute truth. The BullMQ payload is simply a trigger to fetch the latest state from the database.

> [!WARNING]
> **Idempotency Check Required:** Because a worker can crash *after* performing work but *before* writing the final DB state, BullMQ will retry the job. To avoid double-billing (e.g., calling the LLM twice), every worker handler must start by checking the DB state. If the DB status has already advanced past the current stage, the worker must immediately `return` without doing work.

### 1. `worker-ingest` (Queue: `ingest`)
**Responsibility:** Fetches media/text based on the `source_type`.

- **Input Payload Trigger:** `{ "jobId": "uuid", "sourceUrl": "string", "sourceType": "youtube|blog|article" }`
- **Logic Sequence:**
  1. Fetch job from DB using `jobId`.
  2. If `youtube`, run `yt-dlp` to download audio to `/tmp/[jobId].mp3`. Upload to R2. Clean up `/tmp/`.
  3. If `blog` or `article`, use `cheerio` (fallback to `puppeteer`) to extract raw text content.
  4. Upon success, invoke `JobRepository.updateStatusAndOutbox(...)` to push the job to `transcribe` (if YouTube) or `structure` (if Text).

### 2. `worker-transcribe` (Queue: `transcribe`)
**Responsibility:** Converts audio to text using a local `faster-whisper` HTTP instance.

- **Input Payload Trigger:** `{ "jobId": "uuid", "audioR2Key": "string" }`
- **Logic Sequence:**
  1. Download audio from R2 (`audioR2Key`) to `/tmp/[jobId].mp3`.
  2. POST the file to the local `faster-whisper` API.
  3. Wait for the plain text transcript.
  4. Delete `/tmp/[jobId].mp3`. Delete object from R2.
  5. Upon success, invoke `JobRepository.updateStatusAndOutbox(...)` with the extracted transcript payload to the `structure` queue.

### 3. `worker-structure` (Queue: `structure`)
**Responsibility:** Converts raw text into JSON suitable for rendering using DeepSeek LLM.

- **Input Payload Trigger:** `{ "jobId": "uuid", "rawText": "string" }`
- **Logic Sequence:**
  1. Inject `rawText` into the Loopreel System Prompt.
  2. Call the LLM API forcing `json_object` mode.
  3. Validate the LLM output strictly against `StructuredContentSchema` (Zod).
  4. Compute `slide_count` from the JSON payload.
  5. Store the structured JSON directly into the `generation_jobs` table and push to `render` queue via outbox. *(Note: For V1, saving full JSON to Postgres is fine. In V1.1, large payloads will be offloaded to R2 to prevent table bloat).*

### 4. `worker-render` (Queue: `render`)
**Responsibility:** Renders HTML slides into PNGs using a persistent Playwright pool.

- **Input Payload Trigger:** `{ "jobId": "uuid" }`
- **Logic Sequence:**
  1. Fetch full job data including `brand_kit` and `structured_json` from DB.
  2. For `slide_index` from `0` to `slide_count - 1`:
     - Acquire Playwright page from pool. *(Note: Pages must enforce a Max-Uses TTL, e.g. 100 renders, to prevent Chromium memory leaks).*
     - Navigate to `http://localhost:3000/render/:jobId/:slideIndex`.
     - Await a `[data-render-complete="true"]` DOM selector.
     - Take a screenshot.
     - Release Playwright page to pool.
     - Upload PNG to R2.
  3. Insert metadata records into `generated_assets` table (using plain SQL `INSERT`).
  4. Mark job as `complete` in DB. *(Note: Render is the terminal queue; no outbox row is written).*

## Error Handling Decision Trees

Workers must intercept all exceptions, classify them, and decide whether to throw (triggering BullMQ retry) or fail the job explicitly in the DB.

```text
Error Caught in Worker Handler
 ├── Is it Transient? (e.g., Timeout, ECONNRESET, HTTP 429, Playwright crash)
 │    ├── YES: Does `job.attemptsMade` < `maxRetries`?
 │    │    ├── YES: Log warning. Throw Error. (BullMQ will retry).
 │    │    └── NO: Log error. Call `JobRepository.markJobFailed(jobId, errMsg)`. Throw.
 │    │
 └── Is it Fatal? (e.g., yt-dlp Video Not Found, Zod Parsing Failed, Invalid JSON)
      └── YES: Log error. Call `JobRepository.markJobFailed(jobId, errMsg)`. Throw.
```

**Retry Budgets (Configured in Queue Defaults):**
- `ingest`: 2 retries, 5s backoff
- `transcribe`: 2 retries, 10s backoff
- `structure`: 3 retries, exponential backoff (handles LLM rate limits)
- `render`: 1 retry, 5s backoff

## Checklist for Implementation
- [ ] Implement explicit error classification logic in a shared worker utility.
- [ ] Ensure all database writes happen via plain SQL repository methods (no direct db calls inside handlers).
- [ ] Ensure `finally { ... }` blocks are used to clean up any temporary local files (e.g. `/tmp/*.mp3`).
- [ ] Integrate worker instance heartbeats (upserting to `worker_instances` every 10s).

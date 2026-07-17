# Fastify API (V1)

## Overview
The V1 API provides the HTTP interface for job orchestration. It validates incoming requests, writes jobs to the PostgreSQL database (alongside transactional outbox events), and streams job status. It also serves an internal-only route used by the Playwright pool for rendering. 

*Note: V1 contains no authentication or billing. These will be introduced in V1.1.*

## Specification

### `POST /api/jobs`
Creates a new generation job.

- **Content-Type**: `application/json`
- **Body Schema (Zod)**:
  ```json
  {
    "sourceUrl": "string (URL format)",
    "priority": "number (1, 5, or 10, default 5)",
    "brandKit": {
      "logoUrl": "string (optional)",
      "primaryColor": "string (hex, optional)",
      "secondaryColor": "string (hex, optional)",
      "fontFamily": "string (optional)"
    },
    "templateId": "string (default: 'modern-dark')"
  }
  ```

### `GET /api/jobs/:id`
Retrieves the current status and outputs of a generation job.

- **Response Schema**:
  ```json
  {
    "id": "uuid",
    "status": "string (queued|ingesting|transcribing|structuring|rendering|complete|failed)",
    "errorMessage": "string (nullable)",
    "assets": [
      {
        "formatType": "carousel_slide",
        "slideIndex": 0,
        "storageUrl": "https://..."
      }
    ]
  }
  ```

### `GET /api/health`
Aggregates health metrics across the database, Redis queue, and active workers.

- **Response Schema**:
  ```json
  {
    "status": "ok",
    "db": "connected",
    "redis": "connected",
    "activeWorkers": {
      "ingest": 2,
      "transcribe": 1,
      "structure": 5,
      "render": 1
    }
  }
  ```

### `GET /render/:jobId/:slideIndex` (Internal Only)
Serves the Vite React application payload for a specific slide. This route is accessed exclusively by the local Playwright worker pool.

- **Security Constraint**: Must reject requests not originating from `127.0.0.1` or the Docker network's internal gateway.

## Examples

**Creating a Job:**
```bash
curl -X POST http://localhost:3000/api/jobs \
  -H "Content-Type: application/json" \
  -d '{
    "sourceUrl": "https://youtube.com/watch?v=123",
    "priority": 5,
    "templateId": "modern-dark"
  }'

# Response (200 OK)
# { "jobId": "f47ac10b-58cc-4372-a567-0e02b2c3d479", "status": "queued" }
```

## Error Handling

All Fastify routes must return standardized error JSON bodies.

- **400 Bad Request:** Payload validation failure (Zod). Return the exact Zod issue array.
- **404 Not Found:** Invalid Job ID on `GET /api/jobs/:id`.
- **403 Forbidden:** External IP attempting to access `/render/*`.
- **500 Internal Server Error:** Uncaught exceptions (e.g. database connection failure). Fastify default is acceptable here, provided it gets logged by Pino.

## Checklist for Implementation
- [ ] Implement global error handler in Fastify.
- [ ] Configure `fastify-swagger` or similar to auto-generate OpenAPI spec from Zod schemas.
- [ ] Implement `IP-restriction` middleware for the `/render/*` route.
- [ ] Implement standard repository DB calls for endpoints (no ORM).

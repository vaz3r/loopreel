# Schemas (V1)

## Overview
Loopreel relies on Zod for runtime type validation across the API boundary and worker payloads. This document serves as the executable reference for all core V1 schemas. By maintaining strict contracts, we prevent malformed data from entering the database and guarantee predictable structures for the rendering engine.

## Specification

All schemas should reside in `@loopreel/schemas` (or `@loopreel/types`), imported into API endpoints and workers.

### 1. Job Creation Schema (API)

Used by Fastify `POST /api/jobs` to validate incoming requests.

```typescript
import { z } from 'zod';

export const BrandKitSchema = z.object({
  logoUrl: z.string().url().optional(),
  primaryColor: z.string().regex(/^#([0-9A-F]{3}){1,2}$/i).optional(),
  secondaryColor: z.string().regex(/^#([0-9A-F]{3}){1,2}$/i).optional(),
  fontFamily: z.string().optional(),
});

export const JobCreateSchema = z.object({
  sourceUrl: z.string().url(),
  priority: z.union([z.literal(1), z.literal(5), z.literal(10)]).default(5),
  brandKit: BrandKitSchema.default({}),
  templateId: z.string().default('modern-dark'),
});

export type JobCreateInput = z.infer<typeof JobCreateSchema>;
```

### 2. Structured Content Schema (LLM Output)

Used by `worker-structure` to strictly validate the JSON returned by the LLM. If validation fails, the job must fail.

```typescript
import { z } from 'zod';

export const SlideContentSchema = z.object({
  heading: z.string().max(100),
  body: z.string().max(500),
  bulletPoints: z.array(z.string().max(100)).max(5).optional(),
});

export const StructuredContentSchema = z.object({
  hook: z.object({
    title: z.string().max(100),
    subtitle: z.string().max(200).optional(),
  }),
  valuePoints: z.array(SlideContentSchema).min(1).max(10),
  callToAction: z.object({
    message: z.string().max(150),
    url: z.string().url().optional(),
  }),
});

export type StructuredContent = z.infer<typeof StructuredContentSchema>;
```

### 3. Outbox Event Payloads

These schemas validate the shape of data placed into the BullMQ queues by the Outbox relay.

```typescript
import { z } from 'zod';

export const IngestPayloadSchema = z.object({
  jobId: z.string().uuid(),
  sourceUrl: z.string().url(),
  sourceType: z.enum(['youtube', 'blog', 'article']),
});

export const TranscribePayloadSchema = z.object({
  jobId: z.string().uuid(),
  audioR2Key: z.string(),
});

export const StructurePayloadSchema = z.object({
  jobId: z.string().uuid(),
  rawText: z.string().min(10), // Must have some text to process
});

export const RenderPayloadSchema = z.object({
  jobId: z.string().uuid(),
  // Structured content is NOT passed via Redis payload. 
  // It is too large and must be fetched from PostgreSQL.
});
```

## Examples

### Using Zod with Fastify

```typescript
// Inside apps/api/src/routes/jobs.ts
import { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { JobCreateSchema } from '@loopreel/schemas';
import { JobRepository } from '@loopreel/db';

const jobsRoute: FastifyPluginAsyncZod = async (fastify) => {
  fastify.post('/jobs', {
    schema: {
      body: JobCreateSchema
    }
  }, async (request, reply) => {
    // request.body is safely typed as JobCreateInput here
    const { sourceUrl, priority, brandKit, templateId } = request.body;
    
    // Determine sourceType locally (e.g. regex check on sourceUrl)
    const sourceType = determineSourceType(sourceUrl); 

    // Plain SQL transaction
    const jobId = await JobRepository.createJobAndOutbox({
       sourceUrl, 
       sourceType,
       priority,
       brandKit,
       templateId
    });

    return reply.status(201).send({ jobId, status: 'queued' });
  });
};
```

## Error Handling
- **API Validation:** Fastify with Zod type providers will automatically catch validation errors and return HTTP 400.
- **Worker Validation (LLM):** If `StructuredContentSchema.parse()` throws a `ZodError` inside `worker-structure`, it is considered a **Fatal Error**. The worker catches it, logs the parsing issues, calls `JobRepository.markJobFailed(jobId, 'LLM Schema Validation Failed')`, and terminates processing. No retry logic is applied, as the LLM hallucinated beyond repair.

## Checklist for Implementation
- [ ] Create `@loopreel/schemas` (or add to `types` package).
- [ ] Implement `JobCreateSchema`, `StructuredContentSchema`, and Queue Payload Schemas.
- [ ] Export TypeScript types (`z.infer`) alongside the schemas.
- [ ] Setup `fastify-type-provider-zod` in the API server.

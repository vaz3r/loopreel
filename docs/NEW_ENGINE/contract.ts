import { z } from 'zod';

/**
 * EditorialRunway's data contract.
 *
 * This is the ONLY place that defines what this template needs. It is not
 * shared with other templates on purpose — a spec-sheet template and this
 * magazine template have genuinely different load-bearing fields, and
 * forcing them into one shared schema is what let fields silently go
 * missing before (meta was optional, kicker was optional — an LLM under
 * time pressure skips whatever isn't required).
 *
 * Two-part split:
 *  - Fields the LLM authors per post (content-structure call)
 *  - Fields the app supplies per user/job (brand kit, profile, timestamp)
 * These are validated separately, then merged into one contract that must
 * pass BEFORE a render job is queued. If validation fails, the job fails
 * in worker-structure with a clear error — it must never reach Playwright
 * as a slide with blank space where content should be.
 */

// ---------------------------------------------------------------------------
// LLM-authored (content-structure prompt output)
// ---------------------------------------------------------------------------

export const HookContractSchema = z.object({
  type: z.literal('hook'),
  heading: z.string().min(1).max(80),
  // Required, not optional. Doubles as the carousel-wide category shown in
  // the running head on every subsequent slide — there is no per-slide
  // kicker in this template, one classification covers the whole post.
  kicker: z.string().min(1).max(28),
});

export const ContentContractSchema = z.object({
  type: z.literal('content'),
  heading: z.string().min(1).max(70),
  body: z.string().min(1).max(220),
});

export const ListContractSchema = z.object({
  type: z.literal('list'),
  heading: z.string().min(1).max(70),
  // Minimum 3. A 1-2 item list is exactly what produced the near-empty
  // slide in the render you sent — use `content` type for a single point.
  items: z.array(z.string().min(1).max(60)).min(3).max(5),
});

export const QuoteContractSchema = z.object({
  type: z.literal('quote'),
  quote: z.string().min(1).max(160),
  // Required. An unattributed pull-quote loses its authority — if the
  // source has no named person to quote, don't produce a quote slide.
  attribution: z.string().min(1).max(60),
});

export const StatContractSchema = z.object({
  type: z.literal('stat'),
  value: z.string().min(1).max(12),
  label: z.string().min(1).max(40),
  body: z.string().max(120).optional(),
});

export const ContentSlideContractSchema = z.discriminatedUnion('type', [
  ContentContractSchema,
  ListContractSchema,
  QuoteContractSchema,
  StatContractSchema,
]);

export const CtaContractSchema = z.object({
  type: z.literal('cta'),
  heading: z.string().min(1).max(60),
  ctaLabel: z.string().min(1).max(24),
});

/** Meta fields the LLM is actually positioned to know, from reading the source content. */
export const LlmAuthoredMetaSchema = z.object({
  readTime: z.string().max(20).optional(),
});

export const EditorialRunwayLlmOutputSchema = z.object({
  meta: LlmAuthoredMetaSchema,
  hook: HookContractSchema,
  slides: z.array(ContentSlideContractSchema).min(2).max(6),
  cta: CtaContractSchema,
});

export type EditorialRunwayLlmOutput = z.infer<typeof EditorialRunwayLlmOutputSchema>;

// ---------------------------------------------------------------------------
// App-supplied (brand kit / user profile / job metadata — never the LLM's job)
// ---------------------------------------------------------------------------

export const AppSuppliedMetaSchema = z.object({
  // The account's recurring series identity (e.g. "Field Notes"). A brand
  // constant, not something re-invented per post — defaults to brandKit.name
  // in RenderPage if the user hasn't set one explicitly.
  seriesName: z.string().min(1).max(30),
  handle: z.string().min(1).max(30),
  authorName: z.string().max(40).optional(),
  avatarUrl: z.string().url().optional(),
  // Derived from authorName if not supplied — see mergePostMeta() below.
  avatarInitials: z.string().max(3).optional(),
  date: z.string(),
});

export type AppSuppliedMeta = z.infer<typeof AppSuppliedMetaSchema>;

// ---------------------------------------------------------------------------
// Merged, render-ready contract — what actually reaches the React component
// ---------------------------------------------------------------------------

export const PostMetaSchema = AppSuppliedMetaSchema.merge(LlmAuthoredMetaSchema);
export type PostMeta = z.infer<typeof PostMetaSchema>;

export const EditorialRunwayRenderContractSchema = EditorialRunwayLlmOutputSchema.extend({
  meta: PostMetaSchema,
});
export type EditorialRunwayRenderContract = z.infer<typeof EditorialRunwayRenderContractSchema>;

/**
 * Call this in worker-structure, immediately after the content-structure LLM
 * call returns and is parsed. On failure, mark the job failed with the
 * issue list — do not fall back to a default and do not proceed to render.
 */
export function validateLlmOutput(data: unknown) {
  return EditorialRunwayLlmOutputSchema.safeParse(data);
}

/**
 * Merges LLM output with app-supplied meta and derives avatarInitials as a
 * fallback when the user has no avatar image. Call this once in RenderPage,
 * not per-slide — meta is post-level data, not per-slide data.
 */
export function mergePostMeta(llmMeta: z.infer<typeof LlmAuthoredMetaSchema>, appMeta: AppSuppliedMeta): PostMeta {
  const avatarInitials = appMeta.avatarInitials
    ?? appMeta.authorName?.trim().slice(0, 2).toUpperCase()
    ?? appMeta.handle.replace('@', '').slice(0, 2).toUpperCase();
  return { ...appMeta, ...llmMeta, avatarInitials };
}

/**
 * Final gate: validate the fully-merged contract before the render worker
 * navigates Playwright to this slide. This is the check that would have
 * caught both bugs in your screenshots — missing footer, missing kicker —
 * before a single screenshot was taken.
 */
export function validateRenderContract(data: unknown) {
  return EditorialRunwayRenderContractSchema.safeParse(data);
}
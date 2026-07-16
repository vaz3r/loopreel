# Loopreel: Build Roadmap

## Overview

Loopreel is a B2B SaaS white-label repurposing engine for agencies. This roadmap breaks the build into discrete phases, with each phase shipping a usable, testable slice of the product. The guiding principle: **revenue before perfection** — get a paying agency on the platform by the end of Phase 2, not Phase 5.

---

## Open Questions (Resolve Before Building)

> [!IMPORTANT]
> **Rendering Engine: Playwright Browser Pool — DECIDED ✅** — Full CSS fidelity is a hard requirement to support advanced visual templates, gradients, custom fonts, layered effects, and third-party component libraries. Playwright with a persistent, pre-warmed browser pool is the chosen approach. **Satori is ruled out** (constrained layout engine, no arbitrary CSS). **html2canvas is ruled out** (DOM approximation, not a real layout engine). See the dedicated Rendering Architecture section in Phase 1 for the pool design.

> [!IMPORTANT]
> **Hosting / Infra Provider** — Playwright pool requires a long-running server process (not serverless). Use Railway or Fly.io for the Python API service. The pool must stay alive between requests — serverless cold starts would defeat the entire purpose of the pre-warmed design.

> [!WARNING]
> **LLM + Transcription Cost Validation** — The Hobbyist Pack ($19 / 15 credits) is only viable as an acquisition/cost-offset tier if the per-generation cost (Whisper + LLM call + render) stays well below ~$1.27/credit. Benchmark real costs using representative content before launch. If costs are marginal, tighten the model usage (cached prompts, cheaper models for structure extraction, etc.).

> [!NOTE]
> **Scheduler API Access** — Buffer, Publer, and Later all have public APIs but with different OAuth flows and rate limits. Confirm which scheduler(s) to support in V1 (recommend Buffer-only first) and complete OAuth app registration early, as approval can take days.

---

## Phase 0 — Foundation & Infra Skeleton (Week 1–2)

**Goal:** Stand up the skeleton infra and validate cost assumptions. Rendering engine is already decided (Playwright pool). Nothing customer-facing ships here.

### Playwright Pool Prototype (2 days)
- Stand up a minimal Python asyncio pool with 3 instances.
- Benchmark: p50 and p99 latency per slide render, memory footprint per instance.
- Confirm Docker + Playwright system deps install cleanly in the CI environment.
- **Output:** Confirmed pool size and server RAM requirement for Railway/Fly.io provisioning.

### Repo & Infra Skeleton
- Monorepo structure: `/apps/web` (Next.js), `/apps/api` (Python FastAPI), `/packages/templates` (shared React components).
- Docker Compose for local dev: `api`, `web`, `postgres`, and optionally `redis` (job queue).
- GitHub Actions CI: lint + typecheck on PR, no tests yet (premature at this stage).
- Provision: PostgreSQL (Supabase or Railway), object storage (S3 or Cloudflare R2 for generated assets), Stripe account in test mode.

### Database Schema (V1)
```sql
-- Core tables only
users (id, email, hashed_password, stripe_customer_id, created_at)
workspaces (id, owner_id, client_name, slug, brand_kit jsonb, created_at)
brand_kits (id, workspace_id, logo_url, primary_color, secondary_color, font_family, raw_extraction jsonb)
generation_jobs (id, workspace_id, source_url, source_type, status, structured_json jsonb, created_at, completed_at)
generated_assets (id, job_id, format_type [carousel|linkedin_post|thread], storage_url, slide_count, created_at)
credit_ledger (id, user_id, delta, reason, stripe_event_id, created_at)
-- available_credits is a computed view over credit_ledger, not a raw column
--   → prevents double-spend race conditions vs. a single integer column
```

---

## Phase 1 — The Core Pipeline, No Auth (Week 3–5)

**Goal:** A working, end-to-end generation pipeline for a single hardcoded brand. Prove the intelligence layer produces usable output before building any UX around it.

### Backend: Ingestion & Intelligence

**`/ingest` endpoint (FastAPI)**
- Accept a URL → detect source type (YouTube via URL pattern, else blog/article).
- **YouTube path:** `yt-dlp` to pull audio, Whisper (local `whisper.cpp` or OpenAI Whisper API) for transcription. Start with OpenAI API to move fast; swap to local later if margin demands it.
- **Blog/article path:** BeautifulSoup first (simple, no cost); fall back to Playwright for JS-rendered pages.
- Return raw text/transcript, stored in `generation_jobs`.

**`/structure` endpoint**
- Takes raw text, sends to LLM (GPT-4o-mini or Claude Haiku for cost) with a strict system prompt that returns structured JSON only:
```json
{
  "hook": "...",
  "value_points": [
    { "headline": "...", "body": "...", "stat_or_quote": "..." }
  ],
  "summary": "...",
  "cta": "...",
  "linkedin_post": "...",
  "twitter_thread": ["tweet1", "tweet2", "tweet3", "..."]
}
```
- Validate JSON schema strictly — reject and retry once on malformed output.
- Store structured JSON in `generation_jobs.structured_json`.

**`/render` endpoint**
- Accept `job_id` + `brand_kit` → render carousel slides + export LinkedIn post text + thread text.
- Routes the render request to the **Playwright Browser Pool** (see section below).
- Upload rendered PNG slides to R2/S3, store URLs in `generated_assets`.

---

### Rendering Architecture: Persistent Playwright Browser Pool

**Decision rationale:** Full CSS fidelity is non-negotiable — templates will leverage advanced CSS features (gradients, `backdrop-filter`, `mix-blend-mode`, `clip-path`, custom `@font-face`, CSS Grid/Subgrid, complex `box-shadow`, third-party UI component libraries). Satori's layout engine cannot support this. Launching a fresh browser per request is too slow (~1–3s cold start). The solution: a pool of pre-warmed Playwright browser instances kept alive for the lifetime of the server process.

**Pool Design:**
```
Playwright Pool (Python, asyncio)
├── 5 browser instances (Chromium, launched at server startup)
├── Each instance holds one persistent Page object
├── Pool manager: asyncio.Queue() of available pages
│   └── acquire() → get page from queue (blocks if all busy)
│   └── release(page) → return page to queue after render
└── On render request:
    1. acquire() a free page from the pool
    2. page.goto(f"http://localhost:3001/render/{job_id}?brand={...}")
    3. page.wait_for_selector('[data-render-complete="true"]')
    4. page.screenshot(full_page=False, clip={...}) → PNG bytes
    5. release() the page back to the pool
    6. Upload PNG to R2/S3
```

**Key implementation details:**
- Pool size = 5 by default, tunable via env var `PLAYWRIGHT_POOL_SIZE`.
- `asyncio.Queue(maxsize=5)` — `acquire()` naturally queues waiting callers when all instances are busy, no custom semaphore logic needed.
- Each render request navigates to a dedicated Next.js render route (`/render/[job_id]`) that renders the carousel slide server-side (no auth, only accessible from localhost/internal network).
- The render route sets `data-render-complete="true"` on the root element once all fonts/images are loaded — Playwright waits on this selector, not an arbitrary timeout.
- Pages are reused across requests (navigate → screenshot → navigate again) — **no browser restart per request**.
- Browser instances are restarted individually if they crash (health check loop, restart the dead instance only).
- **Concurrency:** With a pool of 5, up to 5 slides render in parallel. A 6-slide carousel can be batched as 5+1 (first batch done, then last slide), or rendered sequentially if simplicity is preferred in V1.

**Infra implications:**
- Requires a **persistent server process** (Railway, Fly.io, or EC2 — not Vercel/Lambda).
- Memory budget: ~150–200MB per Chromium instance → 5 instances ≈ ~1GB RAM baseline. Size the server accordingly (Railway: 2GB RAM minimum).
- Install Playwright system deps via Docker (`playwright install --with-deps chromium`).

**The render-only Next.js route (`/render/[job_id]`):**
```tsx
// apps/web/app/render/[jobId]/page.tsx
// Internal-only route — renders a slide for Playwright to screenshot
// Protected: only accessible from 127.0.0.1 (middleware check)
export default async function RenderPage({ params, searchParams }) {
  const job = await getJobById(params.jobId)
  const brandKit = deserializeBrandKit(searchParams.brand)
  const slideIndex = parseInt(searchParams.slide ?? '0')
  return (
    <SlideCanvas
      slide={job.structured_json.value_points[slideIndex]}
      brand={brandKit}
      onReady={() => document.documentElement.dataset.renderComplete = 'true'}
    />
  )
}
```

### Frontend: Internal Testing Canvas

- A single Next.js page: paste a URL → submit → poll job status → display rendered slides.
- No auth, no multi-workspace — hardcoded to one test brand kit.
- Purpose: rapid iteration on the pipeline without UI overhead.

**Exit Criteria for Phase 1:**
- Given a YouTube URL, generate a 6-slide carousel + LinkedIn post + thread in under 3 minutes.
- Structured JSON output is coherent and usable on >8/10 test runs.
- Rendering engine renders slides pixel-accurately against the chosen template.

---

## Phase 2 — Auth, Workspaces & Brand Kits (Week 6–9)

**Goal:** Multi-tenant app with real workspaces. The first paying agency can onboard here.

### Auth
- Email/password auth via NextAuth.js (or Supabase Auth for less plumbing).
- No OAuth social login in V1 — unnecessary complexity.
- Session-based, JWT stored in httpOnly cookie.

### Workspace Management
- Agency owner creates an account → can create N client workspaces.
- Each workspace = one client, one brand kit, one isolated set of generation jobs.
- Workspace slug used for internal routing: `/workspace/[slug]/`.

### Brand Kit
This is the actual product moat — invest design time here.

**Auto-Extraction Path:**
- Agency enters client's website URL.
- Backend fetches the page (Playwright), extracts:
  - Dominant colors via color quantization (e.g., `colorthief` in Python).
  - Logo: look for `<link rel="icon">`, `og:image`, or prominent `<img>` tags.
  - Font: parse `font-family` from CSS for `body`/`h1` selectors.
- Store as `brand_kits.raw_extraction`, let agency override any field.

**Manual Override UI:**
- Color pickers for primary/secondary.
- Logo upload (stored to R2/S3).
- Font selector: Google Fonts typeahead + option to upload a custom font file.
- Live preview: render one sample slide in real-time as they adjust values.

### Frontend: Full Agency Dashboard
- `/dashboard` — workspace list, credit balance, recent jobs.
- `/workspace/[slug]` — generation history, new generation CTA.
- `/workspace/[slug]/brand-kit` — brand kit editor with live preview.
- `/workspace/[slug]/generate` — URL input, format selector, submit.
- `/workspace/[slug]/job/[id]` — job status, rendered previews, export buttons.

**Exit Criteria for Phase 2:**
- An agency owner can sign up, create a workspace for a client, set brand colors/logo/font, paste a YouTube URL, and receive a fully branded carousel + post + thread.
- Zero hardcoded values — all brand parameters are pulled from the workspace's brand kit.

---

## Phase 3 — Billing & Credits (Week 10–12)

**Goal:** Stripe integration live, credit system enforced, no generation without payment.

### Stripe Integration

**Products to configure in Stripe:**
| Product | Type | Price | Credits |
|---|---|---|---|
| Hobbyist Pack | One-time | $19 | 15 credits |
| Agency Pro – Starter | Subscription | $99/mo | 60 credits/mo |
| Agency Pro – Growth | Subscription | $149/mo | 120 credits/mo |
| Top-Up | One-time | $20 | 20 credits |

**Credit Ledger Architecture:**
- `credit_ledger` table: append-only, one row per credit event (purchase, usage, refund, expiry).
- A `available_credits(user_id)` function = `SUM(delta)` over ledger for that user.
- On generation start: write a `-1` debit row (or `-N` for a multi-slide job) — **before** kicking off the job. Refund the credit if the job fails.
- Stripe webhooks → `/api/webhooks/stripe`:
  - `invoice.payment_succeeded` → write `+N` credit row for the subscription amount.
  - `checkout.session.completed` → write `+N` credit row for one-time purchase.
  - `invoice.payment_failed` → flag account, block generation, email user.

**Subscription Lifecycle:**
- Monthly renewal auto-adds credits (does not roll over — credits expire at billing cycle end).
- Cancellation: existing credits remain usable until billing cycle end.
- Downgrade: no refund of current period, new credit allotment applies next cycle.

### Credit UI
- Credit balance visible in nav bar on all pages.
- Pre-generation check: if credits = 0, show upgrade modal before accepting the URL.
- Credit history page: table of all ledger entries (date, description, delta, balance).

**Exit Criteria for Phase 3:**
- Agency can subscribe via Stripe, receive credits, use them to generate, and top up when empty.
- A user with 0 credits cannot trigger a generation job.
- Stripe webhook events are idempotent (safe to replay without double-crediting).

---

## Phase 4 — Export & Scheduler Integration (Week 13–15)

**Goal:** One-click export to Buffer. ZIP download. The product is now end-to-end.

### Export Formats

**ZIP Download (Day 1 of this phase — simplest, highest value)**
- Bundle all PNG slides + `linkedin_post.txt` + `thread.txt` into a ZIP.
- Download triggered from the job results page.
- No third-party dependency — ships in a single afternoon.

**Buffer Integration (Primary Scheduler)**
- Buffer OAuth 2.0 app registration → store access/refresh tokens per workspace.
- On "Export to Buffer": POST each carousel image to Buffer's media endpoint, then create a scheduled post draft with the LinkedIn post copy.
- Thread export: create multiple scheduled drafts in sequence (Buffer supports this for Twitter/X).
- Surface Buffer connection status on the workspace settings page.

**Publer / Later (Secondary — Post-V1 unless early customer asks)**
- Same OAuth pattern, different API shape.
- Defer until an Agency Pro customer explicitly requests it — avoid premature integration.

### Export UX
- Job results page: "Download ZIP" button (always available) + "Export to Buffer" button (shown if Buffer is connected to this workspace).
- Workspace settings: "Connect Buffer" OAuth flow.

**Exit Criteria for Phase 4:**
- Agency can download a ZIP of all assets from any completed job.
- Agency can push a completed job's assets to Buffer as a draft post in one click.

---

## Phase 5 — Polish, SEO & GTM Enablement (Week 16–18)

**Goal:** The product is ready for cold outreach at scale and organic inbound.

### Template Library (Expand to 3)
- **Modern Dark** — dark background, accent color from brand kit, clean sans-serif.
- **Clean Light** — white/light background, bold brand color accents.
- **Editorial** — editorial magazine aesthetic, heavy typography.
- Template selector on the generate page — agency picks a template per job (or sets a workspace default).

### SEO Landing Pages
- `/tools/youtube-to-carousel` — targets "turn YouTube video into Instagram carousel."
- `/tools/blog-to-linkedin` — targets "repurpose blog post for LinkedIn."
- `/tools/podcast-to-thread` — targets "turn podcast into Twitter thread."
- Each page: hero → demo preview (static example output) → "Try free" CTA → Hobbyist Pack checkout.
- Server-side rendered in Next.js for full SEO indexability.

### Founder Auto-Post Engine (Internal Cron, Not Customer-Facing)
- Separate internal service (Python cron, runs nightly).
- Scrapes tech/agency news (via RSS or a curated list of sources).
- Runs each story through the same pipeline (without credits — internal flag).
- Posts output to founder's Instagram/LinkedIn via Buffer API.
- **Not a product feature** — a marketing channel. Keep it simple and separate.

### Quality & Reliability
- Job retry logic: failed generation retries once automatically, refunds credit on second failure.
- Email notifications: job complete, job failed, low credits (< 5 remaining).
- Rate limiting: max 3 concurrent jobs per user (prevents abuse on Hobbyist tier).
- Admin dashboard: internal page showing active jobs, error rates, credit usage per user.

---

## Phase 6 — Scale & Defensibility (Post-$5K MRR)

These items are intentionally deferred. Do not build them early.

### White-Label Domain Support
- Custom subdomain per agency: `portal.clientagency.com` → their Loopreel workspace.
- Requires wildcard SSL (Cloudflare for SaaS or similar).

### API Access for Power Agencies
- REST API key per workspace → agencies can trigger generation programmatically.
- Same credit system applies.

### Browser Extension ("Loopreel Clipper")
- As described in the spec: bypasses CORS for protected/login-gated content.
- Rust/WASM for parsing, same structured JSON output fed to existing pipeline.
- Submit to Chrome Web Store + Firefox Add-ons.

### Advanced Brand Kit
- AI-assisted color harmony suggestions.
- Import brand kit directly from a Figma file via Figma API.
- Brand voice settings (formal, casual, punchy) applied to LLM prompting.

### Analytics Dashboard
- Per-workspace: generation history, credit consumption trends.
- Per-agency: aggregate across all client workspaces.
- Export reports as PDF (for agencies to show clients).

---

## Technical Risk Register

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| Playwright pool instance crashes under load | Medium | High | Individual instance health-check loop; restart crashed instance without affecting pool |
| Whisper transcription quality degrades on low-audio-quality videos | High | Medium | Show confidence score, allow manual transcript paste as fallback |
| LLM returns malformed JSON | Medium | Medium | Strict schema validation, one auto-retry, error surfaced to user |
| `yt-dlp` breaks on YouTube anti-scraping updates | High | High | Monitor for breakage, pin yt-dlp version, fallback to YouTube Data API v3 for transcript retrieval |
| Stripe webhook delivery failures | Low | High | Idempotent webhook handler, webhook retry handling, reconciliation job |
| Buffer API changes breaking export | Low | Medium | Version-pin Buffer API calls, abstract behind an `ExportAdapter` interface |
| Per-credit cost too high for Hobbyist margin | Medium | Medium | Validate before launch; switch to cheaper model or local Whisper if needed |

---

## Phase Timeline Summary

| Phase | Duration | Key Deliverable | Revenue Gate |
|---|---|---|---|
| 0 — Foundation & Spike | 2 weeks | Rendering decision, schema, infra | ❌ |
| 1 — Core Pipeline | 3 weeks | End-to-end generation, no auth | ❌ |
| 2 — Auth & Workspaces | 4 weeks | Multi-tenant, branded workspaces | ✅ First agency beta |
| 3 — Billing & Credits | 3 weeks | Stripe, credit enforcement | ✅ First paid customer |
| 4 — Export | 3 weeks | ZIP + Buffer export | ✅ Full V1 product |
| 5 — Polish & GTM | 3 weeks | SEO pages, 3 templates, cron | ✅ Outbound at scale |
| 6 — Scale | Post-$5K MRR | White-label, API, extension | — |

**Total to shippable V1:** ~18 weeks (4.5 months) at solo-founder pace.
**First paying customer possible by:** End of Phase 3 (~Week 12).

---

## Immediate Next Actions (This Week)

1. **Run the rendering spike.** 3 days, one template, three methods. Make the decision.
2. **Register Stripe account** (takes 1–2 days for full activation).
3. **Register Buffer OAuth app** (approval takes up to 5 business days — start now).
4. **Benchmark LLM + Whisper cost per generation** on 3 representative YouTube videos.
5. **Set up monorepo** (Next.js + FastAPI + Docker Compose), push to GitHub.
6. **Write the LLM system prompt** for structured JSON extraction — this is the core intelligence asset. Spend real time on it.

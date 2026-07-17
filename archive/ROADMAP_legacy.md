# Loopreel: Build Roadmap

## Overview

Loopreel is a B2B SaaS white-label repurposing engine for agencies. This roadmap breaks the build into discrete phases, with each phase shipping a usable, testable slice of the product. The guiding principle: **revenue before perfection** — get a paying agency on the platform by the end of Phase 2, not Phase 5.

---

## Open Questions (Resolve Before Building)

> [!IMPORTANT]
> **Rendering Engine: Playwright Browser Pool — DECIDED ✅** — Full CSS fidelity is a hard requirement to support advanced visual templates, gradients, custom fonts, layered effects, and third-party component libraries. Playwright with a persistent, pre-warmed browser pool is the chosen approach. **Satori is ruled out** (constrained layout engine, no arbitrary CSS). **html2canvas is ruled out** (DOM approximation, not a real layout engine). See the dedicated Rendering Architecture section in Phase 1 for the pool design.

> [!IMPORTANT]
> **Hosting / Infra Provider — DECIDED ✅** — Oracle Cloud VPS (Docker containers) as the public-facing node. Home server as a private heavy-processing worker node, connected via Tailscale. See the dedicated Infrastructure Architecture section below.

> [!WARNING]
> **LLM Cost Validation** — Transcription cost is now near-zero (local Whisper on home server). The remaining per-generation cost is the LLM call. Benchmark GPT-4o-mini vs Claude Haiku vs a locally-hosted Mistral/Llama3 on the home server before committing to an API-based LLM. If local LLM quality is sufficient, per-credit cost drops to essentially compute-only.

> [!NOTE]
> **Scheduler API Access** — Buffer, Publer, and Later all have public APIs but with different OAuth flows and rate limits. Confirm which scheduler(s) to support in V1 (recommend Buffer-only first) and complete OAuth app registration early, as approval can take days.

---

## Phase 0 — Foundation & Infra Skeleton (Week 1–2)

**Goal:** Stand up both nodes (Oracle VPS + home server), validate the job routing path, and benchmark the Playwright pool. Nothing customer-facing ships here.

### Playwright Pool Prototype (2 days)
- Stand up a minimal Python asyncio pool with 3 instances on the Oracle VPS.
- Benchmark: p50 and p99 latency per slide render, memory footprint per Chromium instance.
- Confirm Docker + Playwright system deps install cleanly (`playwright install --with-deps chromium` in Dockerfile).
- **Output:** Confirmed pool size and VPS RAM requirement.

### Home Server Worker Setup (1 day)
- Install Tailscale on both Oracle VPS and home server → join same tailnet.
- Verify private connectivity: `ping home-server.tailnet` from VPS.
- Deploy the `worker` Docker container on the home server: Whisper model loaded, Celery (or ARQ) worker running.
- Submit a test transcription job from the VPS → routed via Redis → processed on home server → result returned.
- **Output:** Round-trip job completion confirmed over Tailscale.

### Repo & Infra Skeleton
- Monorepo structure: `/apps/web` (Next.js), `/apps/api` (Python FastAPI), `/apps/worker` (Python Celery/ARQ heavy worker), `/packages/templates` (shared React components).
- Docker Compose files: `docker-compose.dev.yml` (local dev, all services), `docker-compose.vps.yml` (Oracle VPS services), `docker-compose.worker.yml` (home server worker).
- GitHub Actions CI: lint + typecheck on PR, Docker build check.
- Provision: PostgreSQL on VPS (Dockerized, local volume), Cloudflare R2 for generated asset storage, Stripe account in test mode.

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

## Infrastructure Architecture

Two-node setup connected by a private Tailscale mesh. The Oracle VPS is the public face of the product; the home server is a private, cost-free heavy compute worker.

```
┌─────────────────────────────────────────────────────────────┐
│                    Oracle Cloud VPS                          │
│                  (Docker, public-facing)                     │
│                                                             │
│  ┌──────────┐  ┌──────────┐  ┌────────────┐  ┌─────────┐  │
│  │ nginx    │  │  web     │  │  api       │  │  redis  │  │
│  │ (proxy)  │→ │ Next.js  │  │  FastAPI   │  │  (queue)│  │
│  └──────────┘  └──────────┘  └─────┬──────┘  └────┬────┘  │
│                                     │               │       │
│  ┌──────────────────────────────────▼───────────────▼────┐  │
│  │            Playwright Browser Pool (5 instances)      │  │
│  │            Internal render route: localhost:3001      │  │
│  └───────────────────────────────────────────────────────┘  │
│                                                             │
│  ┌──────────┐                                              │
│  │ postgres │  (Dockerized, persistent volume)             │
│  └──────────┘                                              │
└─────────────────────────────┬───────────────────────────────┘
                              │ Tailscale (private mesh VPN)
                              │ 100.x.x.x ↔ 100.x.x.x
┌─────────────────────────────▼───────────────────────────────┐
│                    Home Server                               │
│              (Docker, private — not publicly routable)       │
│                                                             │
│  ┌───────────────────────────────────────────────────────┐  │
│  │               Celery / ARQ Worker                     │  │
│  │                                                       │  │
│  │  • Whisper (local model, GPU/CPU)  → transcription    │  │
│  │  • yt-dlp                          → audio download   │  │
│  │  • Playwright (blog scraping)      → text extraction  │  │
│  │  • LLM (local, optional)           → structuring      │  │
│  └───────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

### Job Routing Logic

The FastAPI `api` service on the VPS acts as the orchestrator. It **never** does heavy processing itself — it enqueues jobs and Playwright-renders only.

```
User submits URL
        │
        ▼
  api: debit credit, create generation_job row, enqueue to Redis
        │
        ▼
  Redis queue: "heavy" queue (consumed by home server worker)
        │
        ▼
  Home server worker:
    1. yt-dlp → download audio (YouTube) or scrape text (blog)
    2. Whisper → transcribe (local model, GPU-accelerated)
    3. LLM API call (or local LLM) → structured JSON
    4. Push result back to Redis "render" queue
        │
        ▼
  api: picks up render job, routes to Playwright pool
    5. Playwright renders each slide → PNG
    6. Upload PNGs to Cloudflare R2
    7. Update generation_job status → "complete"
        │
        ▼
  User sees completed carousel in dashboard
```

### Resilience: Home Server Offline Fallback

The home server is a cost-saving node, not a guaranteed-uptime SLA. When it's offline:
- Jobs sit in the Redis queue (up to configurable TTL, e.g. 30 minutes).
- API returns `status: queued` to the frontend — the job page polls every 10s.
- If TTL expires without processing: mark job as `failed`, refund credit, notify user.
- **Optional cloud fallback:** If a job has waited >5 minutes, re-enqueue to a secondary Redis queue consumed by a lightweight cloud worker (small EC2/Hetzner spot instance) — only activated when home server is confirmed offline via heartbeat check.
- For V1: simple TTL + refund is sufficient. Cloud fallback is a Phase 6 concern.

### Docker Compose: Oracle VPS (`docker-compose.vps.yml`)

```yaml
services:
  nginx:
    image: nginx:alpine
    ports: ["80:80", "443:443"]
    volumes: [./nginx.conf:/etc/nginx/nginx.conf, letsencrypt:/etc/letsencrypt]

  web:
    build: ./apps/web
    environment:
      - NEXT_PUBLIC_API_URL=https://api.loopreel.io
    expose: ["3000"]

  api:
    build: ./apps/api
    environment:
      - DATABASE_URL=postgresql://...
      - REDIS_URL=redis://redis:6379
      - R2_BUCKET=...
      - PLAYWRIGHT_POOL_SIZE=5
      - RENDER_BASE_URL=http://web:3000
    expose: ["8000"]
    depends_on: [postgres, redis]

  postgres:
    image: postgres:16-alpine
    volumes: [pgdata:/var/lib/postgresql/data]
    environment:
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD}

  redis:
    image: redis:7-alpine
    expose: ["6379"]

volumes:
  pgdata:
  letsencrypt:
```

### Docker Compose: Home Server (`docker-compose.worker.yml`)

```yaml
services:
  worker:
    build: ./apps/worker
    environment:
      - REDIS_URL=redis://100.x.x.x:6379   # VPS Tailscale IP
      - WHISPER_MODEL=large-v3              # or medium for speed/quality tradeoff
      - LLM_PROVIDER=openai                 # or 'local' for Ollama
      - OLLAMA_HOST=http://localhost:11434  # if using local LLM
    volumes:
      - whisper_models:/root/.cache/whisper
      - /dev/dri:/dev/dri                   # GPU passthrough (if available)
    deploy:
      resources:
        reservations:
          devices:
            - capabilities: [gpu]            # optional, if home server has GPU

volumes:
  whisper_models:
```

### Networking & Security
- **Tailscale** connects the two nodes on a private mesh — no public port exposure on the home server.
- Redis on the VPS binds to `0.0.0.0` but is firewalled to only accept connections from the Tailscale IP range (`100.64.0.0/10`) via Oracle Cloud Security List / `ufw`.
- The Playwright render route (`/render/[jobId]`) is protected by Next.js middleware: reject any request not originating from `127.0.0.1`.
- PostgreSQL is not exposed outside the Docker network at all.
- TLS via Let's Encrypt (Certbot), auto-renewed in the nginx container.

### Cost Estimate (Monthly)
| Resource | Cost |
|---|---|
| Oracle Cloud VPS (4 OCPU / 24GB RAM ARM — Always Free) | **$0** |
| Cloudflare R2 storage (first 10GB) | **$0** |
| Tailscale (personal/starter plan) | **$0** |
| Home server electricity (rough estimate) | ~$10–20 |
| LLM API calls (GPT-4o-mini, ~$0.15/1M tokens) | ~$5–15 depending on volume |
| Stripe fees | 2.9% + $0.30 per transaction |
| **Total infra cost at early scale** | **~$15–35/month** |

This is an extremely low-cost baseline. Even with 40 Agency Pro accounts the infra cost stays well under $100/month until volume demands VPS scaling.

---

## Phase 1 — The Core Pipeline, No Auth (Week 3–5)

**Goal:** A working, end-to-end generation pipeline for a single hardcoded brand. Prove the intelligence layer produces usable output before building any UX around it.

### Backend: Ingestion & Intelligence

**`/ingest` endpoint (FastAPI)**
- Accept a URL → detect source type (YouTube via URL pattern, else blog/article).
- **YouTube path:** `yt-dlp` to pull audio → enqueue to Redis `heavy` queue → home server worker runs **local Whisper** (large-v3 or medium) → transcript returned.
- **Blog/article path:** Home server worker handles this too — BeautifulSoup first, Playwright fallback for JS-rendered pages. Running on home server keeps scraping IP off Oracle's shared infrastructure.
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
| Per-credit cost too high for Hobbyist margin | Low | Medium | Local Whisper eliminates transcription cost; LLM call is now the only variable cost — switch to local Ollama model if API cost is marginal |
| Home server goes offline mid-job | Medium | Medium | Job TTL in Redis queue + credit refund on expiry; cloud fallback worker in Phase 6 |
| Home server IP changes / Tailscale drops | Low | High | Tailscale stable IPs (100.x.x.x) don't change; add Tailscale heartbeat check in worker health monitor |

---

## Phase Timeline Summary

| Phase | Duration | Key Deliverable | Revenue Gate |
|---|---|---|---|
| 0 — Foundation & Infra | 2 weeks | VPS + home server live, Playwright pool, job routing | ❌ |
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

1. **Install Tailscale on Oracle VPS and home server** — confirm private connectivity between the two nodes. This is the prerequisite for everything else.
2. **Scaffold the monorepo** (Next.js + FastAPI + worker + Docker Compose files for both nodes), push to the `loopreel` repo.
3. **Deploy Whisper on the home server** — pull `large-v3` model, test a transcription job end-to-end. Confirm GPU passthrough in Docker if the home server has a GPU.
4. **Prototype the Playwright pool** — 3 instances, asyncio.Queue, benchmark p50/p99 render latency on the VPS.
5. **Register Stripe account** (takes 1–2 days for full activation).
6. **Register Buffer OAuth app** (approval takes up to 5 business days — start now).
7. **Write the LLM system prompt** for structured JSON extraction — this is the core intelligence asset, spend real time on it. Test against 5 diverse real YouTube videos before treating it as done.
8. **Decide: local LLM or API LLM?** — Run `ollama run llama3.1:8b` on the home server, test JSON structuring quality vs GPT-4o-mini. If quality is within 10–15% and latency is acceptable, local wins on cost.

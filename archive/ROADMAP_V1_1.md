# Loopreel V1.1 — Full Product

> **Prerequisite:** All V1 exit criteria must be met before starting V1.1. The engine is the backbone. V1.1 wraps it in auth, billing, multi-tenancy, and GTM without touching the core pipeline.

---

## What Changes in V1.1

V1.1 is additive. The pipeline (BullMQ, workers, Playwright pool, LLM abstraction) does not change. What gets added on top:

| Added in V1.1 | Notes |
|---|---|
| Authentication | Email/password, JWT in httpOnly cookie |
| Multi-tenant workspaces | One agency → N client workspaces |
| Brand kit persistence | Logo, colors, fonts stored per workspace |
| Stripe billing + credit ledger | Subscriptions + one-time packs |
| Credit enforcement | Jobs debit credits, refund on failure |
| Buffer export | OAuth integration, push to scheduler |
| ZIP download (polish) | Already in V1, just surfaces in proper UI |
| SEO landing pages | Organic acquisition funnel |
| Admin dashboard | Internal ops visibility |
| Email notifications | Job complete, failed, low credits |

---

## Stack Additions (V1 → V1.1)

| Layer | V1 | Added in V1.1 |
|---|---|---|
| Frontend | Vite SPA (test UI) | Expanded Vite app with auth flows, workspace routing |
| Auth | None | NextAuth.js or custom JWT (Fastify plugin) |
| Sessions | None | httpOnly cookie, Redis session store |
| File storage | R2 (assets only) | R2 + logo uploads per workspace |
| Payments | None | Stripe (subscriptions + one-time) |
| Email | None | Resend or Postmark (transactional) |
| Scheduler export | None | Buffer OAuth + API |

---

## Database Schema: V1.1 Additions

All additions are non-destructive to V1 schema. V1 `generation_jobs` rows are assigned to `default_workspace` on migration.

```sql
-- New tables in V1.1

users (
  id                  uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email               text UNIQUE NOT NULL,
  hashed_password     text NOT NULL,
  stripe_customer_id  text,
  created_at          timestamptz NOT NULL DEFAULT now()
)

workspaces (
  id                  uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id            uuid NOT NULL REFERENCES users(id),
  client_name         text NOT NULL,
  slug                text UNIQUE NOT NULL,
  default_template_id text NOT NULL DEFAULT 'modern-dark',
  created_at          timestamptz NOT NULL DEFAULT now()
)

brand_kits (
  id                  uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id        uuid NOT NULL REFERENCES workspaces(id),
  logo_url            text,
  primary_color       text NOT NULL DEFAULT '#6366f1',
  secondary_color     text NOT NULL DEFAULT '#f1f5f9',
  font_family         text NOT NULL DEFAULT 'Inter',
  raw_extraction      jsonb,
  updated_at          timestamptz NOT NULL DEFAULT now()
)

-- Alter generation_jobs (add workspace linkage)
ALTER TABLE generation_jobs
  ADD COLUMN workspace_id uuid REFERENCES workspaces(id),
  ADD COLUMN user_id      uuid REFERENCES users(id);

-- Credit ledger — append only, never update rows
credit_ledger (
  id                  uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id             uuid NOT NULL REFERENCES users(id),
  delta               integer NOT NULL,   -- positive = credit, negative = debit
  reason              text NOT NULL,      -- 'subscription_renewal' | 'topup' | 'job_debit' | 'job_refund'
  stripe_event_id     text,
  job_id              uuid REFERENCES generation_jobs(id),
  created_at          timestamptz NOT NULL DEFAULT now()
)

-- available_credits is a function, not a column
-- SELECT COALESCE(SUM(delta), 0) FROM credit_ledger WHERE user_id = $1

scheduler_connections (
  id                  uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id        uuid NOT NULL REFERENCES workspaces(id),
  provider            text NOT NULL CHECK (provider IN ('buffer', 'publer', 'later')),
  access_token        text NOT NULL,
  refresh_token       text,
  token_expires_at    timestamptz,
  created_at          timestamptz NOT NULL DEFAULT now()
)
```

---

## Phase 1.1 — Auth & Multi-Tenancy (Week 1–4)

**Goal:** An agency can create an account and manage client workspaces. No billing yet — this is the UX foundation.

### Auth
- Email + password registration/login via Fastify plugin (fastify-session + argon2 for hashing).
- JWT stored in httpOnly cookie (not localStorage — XSS protection).
- No OAuth social login in V1.1 — unnecessary complexity.
- Password reset flow: Resend email → one-time token → reset form.

### Workspace Management
- `POST /api/workspaces` — create a client workspace (name → auto-generate slug).
- `GET /api/workspaces` — list agency's workspaces.
- Each workspace gets a default empty brand kit on creation.
- All generation jobs scoped to a workspace: `POST /api/workspaces/:slug/jobs`.

### Frontend Routing
```
/auth/login               Agency login
/auth/register            Agency registration
/auth/reset-password      Password reset flow
/dashboard                Workspace list + credit balance
/workspace/:slug          Generation history + new job CTA
/workspace/:slug/brand    Brand kit editor
/workspace/:slug/generate URL input + format selector
/workspace/:slug/job/:id  Job status + results + export
/workspace/:slug/settings Scheduler connections
/account                  Plan, billing, credit history
```

---

## Phase 1.2 — Brand Kit (Week 5–6)

**Goal:** Each client workspace has a persistent brand kit applied automatically to every generation.

### Auto-Extraction Path
Agency enters client's website URL. Backend:
1. Fetches the page via Playwright (reuses existing pool).
2. Extracts dominant colors via `node-vibrant` (color quantization from favicon/og:image).
3. Finds logo: `<link rel="icon">`, `og:image`, or prominent `<img>` in header.
4. Parses font: `font-family` from CSS on `body` / `h1` selectors.
5. Stores as `brand_kits.raw_extraction` — agency can override any field.

### Manual Override UI
- Color pickers: primary + secondary (hex input + visual picker).
- Logo upload: drag-drop → upload to R2 → store URL in brand kit.
- Font: Google Fonts typeahead (fetch font list from Google Fonts API) + custom font file upload option.
- **Live preview panel:** renders a single sample slide in real-time using the Playwright pool as brand kit values change (debounced 500ms).

### Brand Kit Applied to Generation
- When a job is submitted from a workspace, brand kit is attached to the `RenderJob`.
- Render route in Vite app receives brand kit params → applies to template at render time.
- No brand kit = use default (black + white + Inter).

---

## Phase 1.3 — Billing & Credits (Week 7–9)

**Goal:** Stripe live, credit enforcement active. First paying customer possible.

### Stripe Products

| Product | Type | Price | Credits Granted |
|---|---|---|---|
| Hobbyist Pack | One-time | $19 | 15 credits |
| Agency Pro – Starter | Subscription | $99/mo | 60 credits/mo |
| Agency Pro – Growth | Subscription | $149/mo | 120 credits/mo |
| Top-Up | One-time | $20 | 20 credits |

### Credit Ledger Architecture
- Append-only `credit_ledger` table — never update rows.
- `available_credits(userId)` = `SUM(delta) WHERE user_id = ?` (Postgres function).
- **On job submit:** write `-1` debit row before enqueuing. Refund on failure.
- **On Stripe event:** write `+N` credit row.
- Idempotent webhook handler: check `stripe_event_id` uniqueness before writing.

### Stripe Webhook Events
```
invoice.payment_succeeded    → write +N credits (subscription renewal)
checkout.session.completed   → write +N credits (one-time pack or topup)
invoice.payment_failed       → flag account, block generation, send email
customer.subscription.deleted → no credit removal, credits remain until expiry
```

### Credit UI
- Credit balance in navigation bar (all authenticated pages).
- Pre-generation check: 0 credits → upgrade modal before URL submission.
- `/account` page: credit history table (date, reason, delta, running balance).

---

## Phase 1.4 — Export (Week 10–11)

**Goal:** One-click export to Buffer. ZIP download polished and accessible from workspace UI.

### ZIP Download
- Already built in V1. Surface it in the workspace job results page.
- Bundle: all PNG slides + `linkedin_post.txt` + `thread.txt` + `README.txt` (posting instructions).

### Buffer Integration
1. Agency clicks "Connect Buffer" on workspace settings page.
2. OAuth 2.0 flow → store `access_token` + `refresh_token` in `scheduler_connections`.
3. On "Export to Buffer": `POST /api/workspaces/:slug/jobs/:jobId/export/buffer`.
4. API uploads carousel images to Buffer media endpoint, creates draft post with LinkedIn copy.
5. Thread: create multiple sequential draft posts for X/Twitter.
6. Surface connection status + last export timestamp on workspace settings.

---

## Phase 1.5 — Polish & GTM (Week 12–15)

**Goal:** The product is ready for cold outreach and SEO-driven organic acquisition.

### Third Template
- `editorial` — magazine aesthetic, heavy typography, asymmetric layout.
- Template selector in workspace settings (set workspace default, override per job).

### SEO Landing Pages
Vite SPA doesn't do SSR — use a lightweight static site generator (Astro or plain HTML) for the marketing/SEO pages, deployed separately from the app.

| Page | Target keyword |
|---|---|
| `/tools/youtube-to-carousel` | "turn YouTube video into Instagram carousel" |
| `/tools/blog-to-linkedin` | "repurpose blog post for LinkedIn" |
| `/tools/podcast-to-thread` | "turn podcast into Twitter thread" |

Each page: hero → static example output (pre-rendered PNGs) → "Try free" CTA → Hobbyist Pack Stripe checkout.

### Founder Auto-Post Engine
- Separate internal service (`apps/cron`), runs nightly.
- RSS scrape (tech/agency news sources) → submits URLs to the pipeline with `priority: LOW`.
- Posts output to founder's Instagram/LinkedIn via Buffer API.
- Uses same worker queue as production — just lower priority.
- **Not a product feature.** A marketing channel. Keep it simple.

### Quality & Reliability
- Job retry: auto-retry once, refund credit on second failure.
- Email notifications (Resend): job complete, job failed, low credits (< 5).
- Rate limiting: Agency Pro = 10 concurrent jobs, Hobbyist = 2.
- Admin dashboard (`/admin` — IP-restricted): active jobs, error rates, credit usage, worker status.

---

## Phase 1.6 — Hardening & Launch (Week 16–18)

**Goal:** Production-ready. Outbound cold outreach at scale.

### Pre-Launch Checklist
- [ ] Stripe live mode keys + webhook endpoint configured on Oracle VPS
- [ ] Buffer OAuth app approved by Buffer (can take 5 business days — start in Phase 1.4)
- [ ] SSL certificate auto-renewal confirmed (Let's Encrypt via nginx on VPS)
- [ ] Backups: nightly postgres dump to R2 (`pg_dump` cron)
- [ ] Error tracking: Sentry in both `api` and `worker`
- [ ] Uptime monitoring: UptimeRobot or Better Uptime on `/api/health`
- [ ] Home server Tailscale heartbeat check: alert if worker offline > 15 minutes
- [ ] GDPR: privacy policy, data deletion endpoint (`DELETE /api/account`)
- [ ] Rate limiting: global (nginx) + per-user (Fastify)

### GTM: Cold Outreach Motion
- Find target agency on LinkedIn/Twitter.
- Find their client with recent YouTube video or blog post.
- Run client content through Loopreel locally.
- DM agency with rendered carousel: "This took 30 seconds. It's in [Client]'s brand colors. Resell this to your full roster for $125/month."
- Track: response rate, demo-to-paid conversion, time-to-first-revenue.

---

## Revenue Target Summary

| Tier | Price | Credits | Role |
|---|---|---|---|
| Hobbyist Pack | $19 one-time | 15 | Acquisition + cost offset |
| Agency Pro – Starter | $99/mo | 60/mo | Revenue |
| Agency Pro – Growth | $149/mo | 120/mo | Revenue |
| Top-Up | $20 one-time | 20 | Ad hoc, any tier |

**Target:** 40 × $125/mo avg = **$5,000 MRR**

Leading indicator: Hobbyist → Agency Pro conversion within 60 days.

---

## Phase Timeline Summary

| Phase | Duration | Key Deliverable | Revenue Gate |
|---|---|---|---|
| **V1** | 6 weeks | Engine: pipeline, queue, workers, templates, test UI | ❌ |
| **1.1** Auth + Workspaces | 4 weeks | Multi-tenant, branded workspaces | ✅ First agency beta |
| **1.2** Brand Kit | 2 weeks | Persistent brand kits, auto-extraction, live preview | ✅ |
| **1.3** Billing | 3 weeks | Stripe, credit enforcement | ✅ First paid customer |
| **1.4** Export | 2 weeks | ZIP polish + Buffer export | ✅ Full V1.1 product |
| **1.5** GTM | 4 weeks | SEO pages, 3rd template, cron, cold outreach | ✅ Outbound at scale |
| **1.6** Hardening | 3 weeks | Production hardening, launch | ✅ |

**Total V1 + V1.1:** ~24 weeks (6 months) at solo-founder pace.
**First paying customer:** End of Phase 1.3 (~Week 15 from start of V1).

---

## Phase 2 — Scale (Post $5K MRR)

Defer entirely. Do not build early.

### White-Label Domains
- `portal.agencyname.com` routes to that agency's Loopreel workspace.
- Cloudflare for SaaS wildcard SSL.

### API Access
- REST API key per workspace → programmatic job submission.
- Same credit system.

### Browser Extension ("Loopreel Clipper")
- Bypasses CORS for login-gated content.
- Rust/WASM for parsing, shared with backend scraping path.
- Chrome Web Store + Firefox Add-ons.

### Advanced Brand Kit
- Figma API import.
- Brand voice settings (formal / casual / punchy) applied to LLM system prompt.
- AI color harmony suggestions.

### Analytics
- Per-workspace generation history + credit trends.
- Agency-level aggregate across all client workspaces.
- PDF report export for client-facing delivery.

### Home Server Offline: Cloud Fallback Worker
- If home server offline >5 min: re-enqueue to secondary Redis queue.
- Secondary queue consumed by a Hetzner spot instance (~€3/mo, spun on demand).
- Auto-terminate when queue empties.

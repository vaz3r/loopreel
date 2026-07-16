# Loopreel

> *One piece of content, looped into everything your clients post — under their brand.*

Loopreel is a B2B SaaS white-label repurposing engine for boutique content and social media agencies. It transforms a single source URL — YouTube video, blog post, or article — into a full set of branded, ready-to-post assets: Instagram/LinkedIn carousels, a LinkedIn text post, and an X/Twitter thread.

---

## Architecture

```
Source URL (YouTube / Blog / Article)
        │
        ▼
  Fastify API (Oracle Cloud VPS)
  Debit credit → create job → enqueue to Redis
        │
        ▼
  BullMQ Priority Queue (Redis)
  HIGH / NORMAL / LOW — any worker can connect
        │
        ▼
  Worker (Home Server / Mac / Any Node)
  ├── yt-dlp → audio download
  ├── faster-whisper → local transcription
  ├── DeepSeek V4 Flash → structured JSON
  └── Cheerio / Puppeteer → blog scraping
        │
        ▼
  Playwright Browser Pool (Oracle VPS, 5 pre-warmed instances)
  Full CSS rendering → PNG slides
        │
        ▼
  Cloudflare R2 Storage
        │
        ▼
  Export: ZIP download / Buffer / Publer
```

## Stack

| Layer | Technology |
|---|---|
| Frontend | Vite + React + TypeScript |
| Backend | Node.js + Fastify + TypeScript |
| Job Queue | BullMQ (Redis) — priority, distributed workers |
| LLM | DeepSeek V4 Flash via central provider abstraction |
| Rendering | Playwright browser pool (persistent, pre-warmed) |
| Transcription | faster-whisper (local HTTP server) |
| Database | PostgreSQL |
| Storage | Cloudflare R2 |
| Infra | Oracle Cloud VPS + Home Server via Tailscale |
| Dev | Docker Compose (all services local) |

---

## Roadmaps

| Document | Phase | Description |
|---|---|---|
| [ROADMAP_V1.md](./ROADMAP_V1.md) | **V1 — The Engine** | Pipeline backbone. No auth/billing. BullMQ, Playwright pool, DeepSeek, distributed workers, test UI. 6 weeks. |
| [ROADMAP_V1_1.md](./ROADMAP_V1_1.md) | **V1.1 — Full Product** | Plugs auth, workspaces, brand kits, Stripe, Buffer export, SEO onto the V1 engine. ~18 more weeks. |
| [ROADMAP.md](./ROADMAP.md) | **Architecture Reference** | Infra topology, two-node setup, Docker Compose configs, security model. |

---

## Key Design Decisions

**Workers connect from anywhere.** BullMQ consumers point at a Redis URL and start processing. Spin a worker on a Mac, home server, or cloud VM — no API restarts, no config changes.

**LLM is swappable in one env var.** The `packages/llm` abstraction supports DeepSeek, OpenAI, OpenRouter, Groq, and Google AI. Change `LLM_PROVIDER` + the matching API key. Default: DeepSeek V4 Flash (~$0.14/1M tokens).

**Playwright pool, not per-request browsers.** 5 pre-warmed Chromium instances stay alive for the server's lifetime. Full CSS fidelity — gradients, custom fonts, `backdrop-filter`, complex layouts — at low latency.

**V1 is auth-free by design.** The engine is built and proven before any product layer is added. V1.1 snaps onto V1 non-destructively.

---

## Revenue Target

~40 Agency Pro accounts × ~$125/mo ≈ **$5,000 MRR**

*Status: Pre-build. V1 roadmap finalized. Starting Phase 0.*

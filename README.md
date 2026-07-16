# Loopreel

> *One piece of content, looped into everything your clients post — under their brand.*

Loopreel is a B2B SaaS white-label repurposing engine for boutique content and social media agencies. It transforms a single source URL — YouTube video, blog post, or article — into a full set of branded, ready-to-post assets: Instagram/LinkedIn carousels, a LinkedIn text post, and an X/Twitter thread.

## How It Works

```
Source URL (YouTube / Blog / Article)
        │
        ▼
  Transcript / Text Extraction
  (yt-dlp + Whisper / BeautifulSoup / Playwright)
        │
        ▼
  Structured JSON via LLM
  (Hook → Value Points → Summary → CTA)
        │
        ▼
  Branded Template Rendering
  (Next.js React templates + Playwright browser pool → PNG)
        │
        ▼
  Export
  (Buffer / Publer / ZIP download)
```

## Stack

| Layer | Technology |
|---|---|
| Backend | Python, FastAPI, Docker |
| Frontend | Next.js, React, TailwindCSS |
| Database | PostgreSQL |
| Rendering | Playwright browser pool (persistent, pre-warmed) |
| Ingestion | yt-dlp, Whisper, BeautifulSoup, Playwright |
| Billing | Stripe |
| Storage | Cloudflare R2 / S3 |

## Documentation

- [**ROADMAP.md**](./ROADMAP.md) — Full 6-phase build roadmap, database schema, rendering architecture, technical risk register, and GTM plan.

## Target

~40 Agency Pro accounts × ~$125/month ≈ **$5,000 MRR**

---

*Status: Pre-build. Roadmap finalized. Starting Phase 0.*

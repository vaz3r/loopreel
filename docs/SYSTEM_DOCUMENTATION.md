# Loopreel System Architecture & Developer Documentation

## 1. Executive Summary

**Loopreel** is an automated, AI-driven editorial publication engine that transforms raw information—news articles, YouTube videos, and research briefs—into art-directed, high-signal multi-slide visual carousels (1080×1350 Instagram/LinkedIn carousels) and investigative long-form social copy.

Unlike conventional AI tools that generate repetitive, generic Canva-style templates with clip-art and boilerplate text, Loopreel operates as a full autonomous **newsroom and design studio**:
- **Journalistic Rigor**: A dedicated research bureau compiles a verified `GroundTruthDossier` citing exact numbers, legal fine print, and procedural mechanisms.
- **Handcrafted Art Direction**: Slides are synthesized directly into custom, self-contained React TypeScript components (`.tsx`) rendered with custom SVG vector drawings, precise typographic hierarchies, and brand palettes.
- **Editorial Voice**: Enforces strict copy budgets (2-word kickers, active headlines, zero qualifier clutter) modeled after publications like *The New York Times*, *HBR*, *MoMA*, and *Wired*.
- **Quality Assurance**: Every publication is audited in headless Chromium via Playwright for DOM bounding-box collisions, safe-area bounds, and font rendering before delivery.

---

## 2. Monorepo Architecture

Loopreel is structured as a **Turborepo** monorepo managed with `pnpm`.

```
loopreel/
├── apps/
│   ├── admin/               # React 18 + Vite + Tailwind operator console & template studio
│   ├── api/                 # Fastify / Node REST API gateway (Port 3000)
│   ├── newsroom/            # Automated newsroom desk (Google News RSS -> Ingest -> Buffer)
│   ├── worker-ingest/       # Content ingestion worker (Web scraping, Readability, YouTube)
│   ├── worker-structure/    # Bespoke codegen & slide synthesis worker
│   └── worker-transcribe/   # Audio / video speech-to-text worker (Whisper / Deepgram)
│
├── packages/
│   ├── db/                  # PostgreSQL schema, migrations, and query clients
│   ├── generator/           # Bespoke Codegen Engine, Template Studio, and Playwright audit
│   ├── llm/                 # Multi-provider LLM abstraction layer with JSON extractors
│   ├── queue/               # BullMQ Redis queue definitions and connection managers
│   ├── schemas/             # Shared Zod schemas, data contracts, and TypeScript interfaces
│   └── storage/             # Asset storage engine (local filesystem & S3-compatible cloud)
│
├── docs/                    # Architecture guides, pipeline flowcharts, and operational runbooks
└── logs/                    # PM2 process logs and error diagnostics
```

---

## 3. Package & Application Responsibilities

### 3.1 Applications (`apps/`)

#### `apps/api` (REST API Server)
- **Port**: `http://localhost:3000`
- **Stack**: Fastify, Node.js, TypeScript.
- **Endpoints**:
  - `POST /api/jobs`: Submits a new carousel creation job (`sourceUrl`, `platform`, `engine`, `brandKit`, `templateId`).
  - `GET /api/jobs/:id`: Fetches job status, content payload, asset URLs, and compiler logs.
  - `GET /api/jobs`: Lists recent jobs with pagination and status filtering.
  - `GET /api/assets/*`: Serves stored slide PNG snapshots, SVG assets, and export archives.

#### `apps/admin` (Operator Console & Template Studio)
- **Port**: `http://localhost:5175`
- **Stack**: React 18, Vite, Tailwind CSS, TanStack Query, Radix UI, Lucide Icons.
- **Key Features**:
  - **Create Job Page**: Visual form to submit jobs with source selection, topic prompts, and brand preset pickers.
  - **Job Inspector (`/jobs/:id`)**: Live real-time status tracker, interactive 1080×1350 carousel slide previewer, slide inspector, and copy-to-clipboard for Instagram captions.
  - **Template Studio**: In-browser inspector for previewing bespoke templates at native resolution.

#### `apps/newsroom` (Automated Investigative Desk)
- **Role**: Continuously monitors Google News RSS feeds for corporate accountability topics (Disney, Starbucks, airlines, tech fine print), ingests articles, generates carousels, and schedules them to social channels via Buffer.

#### `apps/worker-ingest` (Ingestion Worker)
- **Queue**: `ingest`
- **Role**: Normalizes incoming sources:
  - If URL is an article: extracts title, author, body using Mozilla Readability.
  - If URL is YouTube: extracts metadata and queues audio stream for transcription.
  - If source is a prompt (`prompt:...`): passes directly to structuring.

#### `apps/worker-transcribe` (Transcription Worker)
- **Queue**: `transcribe`
- **Role**: Runs speech-to-text processing for video and audio content via Whisper or Deepgram, generating timestamped text transcripts.

#### `apps/worker-structure` (Bespoke Codegen & Structuring Worker)
- **Queue**: `structure`
- **Role**: The core pipeline engine. Invokes `@loopreel/generator` to execute the full 8-pass generation lifecycle, assembling React TSX slides, compiling TypeScript, running Playwright visual audits, and saving final snapshots.

---

### 3.2 Shared Packages (`packages/`)

#### `packages/generator` (Bespoke Generation Engine)
- **Heart of the system**: Contains `pipeline.ts`, `prompt.ts`, `engine.ts`, `presets.ts`, `audit.ts`, and `self-heal.ts`.
- Manages template lifecycle in `packages/generator/templates/<slug>/`.
- Implements parallel slide synthesis (`concurrency: 3`) and automated AST syntax repair.
- Houses the Template Studio preview server on `http://localhost:5174`.

#### `packages/llm` (LLM Client Layer)
- Supports **GitHub Copilot**, **Anthropic (Claude 3.5 Sonnet)**, **OpenAI (GPT-4o)**, **Google (Gemini 1.5 Pro)**, and **OpenRouter**.
- Provides robust structured JSON extraction (`generateJSON`), markdown code block stripping, and exponential backoff retry policies.

#### `packages/schemas` (Shared Contracts)
- Central Zod schemas and TypeScript type declarations ensuring strict runtime validation:
  - `GroundTruthDossierSchema`: Fact dossier schema.
  - `BrandTokensSchema`: Typography, palette, wordmark, handle contracts.
  - `DeckSchema`: 7-slide storyboard structure.
  - `SlideDesignBlueprintSchema`: Spatial coordinates and visual layouts.
  - `CarouselJobSchema`: Job database record state.

#### `packages/queue` (BullMQ Queue Manager)
- Manages BullMQ job queues backed by Redis:
  - `ingest-queue`
  - `transcribe-queue`
  - `structure-queue`
- Handles retries, job progress tracking, and event listeners.

#### `packages/storage` (Asset Storage)
- Abstracted file storage provider supporting local filesystem storage (`storage/`) and S3-compatible object stores.
- Manages storage paths for slide PNG snapshots, source media, and export packages.

#### `packages/db` (PostgreSQL Database)
- Database connection pool, schema definitions, and migration scripts.
- Stores `jobs`, `assets`, `brands`, `sources`, and `audit_logs`.

---

## 4. End-to-End Generation Pipeline

The generation pipeline executes an 8-pass multi-stage LLM workflow followed by an automated Playwright visual audit:

```
[Input Source]
      ↓
[Pass 1: Forensic Fact & Research Bureau] ──→ GroundTruthDossier
      ↓
[Pass 2: Creative Director Art Direction] ──→ BrandTokens (e.g. The Fine Print)
      ↓
[Pass 3: Editorial Strategist Hook] ───────→ Hook & Value Promise
      ↓
[Pass 4: Senior Copy Editor Storyboard] ───→ 7-Slide Storyboard
      ↓
[Pass 5: Spatial Layout Architect] ────────→ 7 SlideDesignBlueprints
      ↓
[Pass 6: Parallel React Codegen (N=3)] ────→ Slide01.tsx ... Slide07.tsx
      ↓ (AST & Syntax Self-Healing)
[Pass 7: Entrypoint Assembly & TS Check] ──→ index.ts (0 TS errors gate)
      ↓
[Pass 8: Social Caption & Hashtags] ───────→ caption.json
      ↓
[Pass 9: Playwright Visual Collision Audit] → Headless Chromium (0 collisions)
      ↓
[Slide Snapshots & Storage Upload] ────────→ complete (Admin Review URL)
```

> [!NOTE]
> For the complete stage-by-stage flowchart and data contract breakdown, see [docs/PIPELINE_LLM_FLOW.md](file:///home/core/projects/loopreel/docs/PIPELINE_LLM_FLOW.md).

---

## 5. Brand Presets & The Fine Print Standard

Loopreel supports curated brand presets that lock in handcrafted typography, color palettes, and editorial motifs. The primary baseline preset is **The Fine Print**:

| Token | Value | Editorial Purpose |
|:---|:---|:---|
| **Slug** | `the-fine-print` | Master investigative brand preset |
| **Paper** | `#0A0A0C` | Pitch black void background |
| **Ink** | `#F5F5F7` | High-contrast crisp ivory newsprint |
| **Accent** | `#FF2A2A` | Signal redline accent for focal mechanisms |
| **Surface** | `#141418` | Recessed dark container surface |
| **Headline Font** | `Playfair Display` | High-authority serif headline typography |
| **Body Font** | `Source Serif 4` | Journalistic editorial body copy |
| **Mono Font** | `JetBrains Mono` | Technical telemetry badges and kickers |
| **Wordmark** | `THE FINE PRINT` | Small-caps publication masthead |
| **Handle** | `@thefineprint.pub` | Official publication social handle |

---

## 6. Core Quality Principles (AGENTS.md)

1. **Always Test With Live Jobs in Admin**:
   Whenever making changes to templates, prompts, schemas, or workers, always submit a real live job via `POST http://localhost:3000/api/jobs`. Track it through all worker phases until `complete`, and provide the clickable Admin URL `http://localhost:5175/jobs/<JOB_ID>` so the user can visually review the result.

2. **Handcrafted Editorial Excellence**:
   - Every slide must feel like an art-directed editorial publication (The New York Times, Monocle, HBR, MoMA, Wired).
   - Never allow robotic phrasing, rhetorical question cover headlines, or qualifier-cluttered telemetry values.
   - Telemetry `<value>` must be strictly numerical or signed badge (`+12%`, `-17%`, `$1.2T`). Qualifiers go in `<label>`.

3. **Space Balance & Breathing Space**:
   - Zero top-heavy clumping: Content must fill 75%–95% of the frame or be optically centered vertically (`Ratio ~ 1.0`).
   - Dedicated visual region height: 500px–560px reserved for inline SVG vector art.
   - AutoFit is a safety net only (`scale = 1.000` for normal content, unscaled full-height pass-through).

---

## 7. Operational Runbook

### Service Management (PM2)
Loopreel uses PM2 to manage all background services in development and production:
```bash
# Check status of all running services
pm2 status

# Restart all services after code changes
pm2 restart all

# View live logs for a specific service
pm2 logs worker-structure --lines 50

# Restart an individual service
pm2 restart worker-structure
```

### Submitting a Test Job
```bash
curl -s -X POST http://localhost:3000/api/jobs \
  -H "Content-Type: application/json" \
  -d '{
    "sourceUrl": "prompt:Why Airlines Overbook Flights and How Passengers Can Protect Themselves",
    "platform": "instagram-feed",
    "engine": "bespoke",
    "templateId": "bespoke",
    "brandKit": "the-fine-print"
  }'
```

### Building the Monorepo
```bash
# Run turbo build across all 12 packages
pnpm build

# Type check without emitting files
pnpm turbo type-check
```

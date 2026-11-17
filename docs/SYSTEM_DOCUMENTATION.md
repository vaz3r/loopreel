# Loopreel System Documentation

## 1. System Overview & Architecture

Loopreel is an autonomous editorial carousel publishing system. It transforms raw media inputs (scraped articles, news wires, video transcripts, or user prompts) into multi-slide editorial carousels rendered via bespoke React TypeScript components (`.tsx`) and styled with Tailwind CSS.

### Monorepo Structure

```
loopreel/
├── apps/
│   ├── api/                 # Fastify REST API (Port 3000)
│   ├── admin/               # React + Tailwind Admin Console (Port 5175)
│   ├── newsroom/            # Wire scanner, curator LLM, review gate & Buffer client
│   ├── worker-ingest/       # Media downloading & URL extraction worker
│   ├── worker-transcribe/   # Deepgram STT transcription worker
│   └── worker-structure/    # Multi-pass editorial generation orchestrator
├── packages/
│   ├── db/                  # PostgreSQL connection pool & repositories
│   ├── schemas/             # Zod domain schemas and enum contracts
│   ├── llm/                 # Gemini / Claude / OpenRouter multi-model client
│   ├── storage/             # Cloudflare R2 / S3 asset client
│   └── generator/           # 9-stage pipeline, prompts, visual auditor & Slide Preview Server (Port 5174)
└── docs/                    # Architecture, specifications, and pipeline flowcharts
```

### Network Port Allocation

| Port | Service | Description |
| :--- | :--- | :--- |
| **3000** | API Server (`apps/api`) | Fastify REST API for jobs, templates, slides, and webhooks. |
| **5174** | Slide Preview Server (`packages/generator`) | Vite HMR slide preview server used by Playwright visual auditor and developers. |
| **5175** | Admin Console (`apps/admin`) | React operator dashboard for viewing job queues, worker status, and reviewing slides. |
| **5432** | PostgreSQL Database | Primary datastore for jobs, assets, and newsroom stories. |
| **6379** | Redis BullMQ | Task queues (`ingest`, `transcribe`, `structure`). |

---

## 2. Safety Controls & Risk Management: Built vs Roadmap

To maintain strict editorial integrity and prevent legal, reputational, or execution hazards, system controls are categorized into active features and roadmap specifications:

| Control Domain | Status | Enforcing Mechanism | Code Location |
| :--- | :--- | :--- | :--- |
| **Buffer Human Review Gate** | **Built & Enforced** | Stories halt at `pending_review`. Atomic claim (`publishing`) before Buffer dispatch; rollback on failure. | `apps/newsroom/src/publisher.ts`, `apps/newsroom/src/daemon.ts` |
| **Unverified Source Guard** | **Built & Enforced** | Refuses to publish `prompt:`-mode stories without explicit `--confirm-unverified` flag. | `apps/newsroom/src/publisher.ts` |
| **AutoPublish Bypass Warning** | **Built & Enforced** | Daemon emits prominent security warning on startup whenever `NEWSROOM_AUTO_PUBLISH=true`. | `apps/newsroom/src/daemon.ts` |
| **TypeScript Compiler Healing** | **Built & Enforced** | Bounded self-healing loop: max 3 attempts (`attempt <= 3`); fails fatal on 4th attempt. | `packages/generator/src/pipeline.ts` |
| **AST Syntax Repair** | **Built & Enforced** | Bounded Babel AST auto-repair: max 1 retry attempt before aborting. | `packages/generator/src/pipeline.ts` |
| **Visual Assertion Auditor** | **Built & Enforced** | Headless Chromium assertion check (8 DOM rules, font settling wait, AutoFit thresholds). | `packages/generator/src/visual-auditor.ts` |
| **Deterministic Brand Presets** | **Built & Enforced** | Brand kits (*The Fine Print*, *The Zurich Typographer*) skip LLM generation entirely. | `packages/generator/src/presets/` |
| **Copy Word Budgets** | **Built & Enforced** | Prompt rules enforce hard limits on kickers (1–3 words), headlines (3–7 words), and subheads (12–18 words). | `packages/generator/src/prompt.ts` |
| **AST Import Allowlist** | *Roadmap* | Restricting slide component imports exclusively to React, Lucide icons, and approved primitives. | Proposed in `packages/generator/src/pipeline.ts` |
| **Chromium CSP Sandboxing** | *Roadmap* | Disabling network access (`route.abort()`) and setting strict CSP during Playwright audit rendering. | Proposed in `packages/generator/src/visual-auditor.ts` |
| **Source Citation Engine** | *Roadmap* | Mandating source URL, timestamp, and verbatim quote attribution for every numerical claim. | Proposed in `packages/generator/src/prompt.ts` |
| **Reproducibility Metadata** | *Roadmap* | Persisting model version, prompt hash, temperature, and git commit per generated job. | Proposed in `packages/db/src/repositories/JobRepository.ts` |
| **Per-Slide Alt Text** | *Roadmap* | Generating WCAG-compliant screen reader descriptions alongside visual slides. | Proposed in `packages/generator/src/pipeline.ts` |

---

## 3. The 9-Stage Generation Pipeline

The generation pipeline consists of 8 generator passes followed by Stage 9 (Playwright Visual Audit). When a pre-configured brand preset (such as *The Fine Print*) is used, the pipeline executes **6 primary LLM passes** (Stages 1, 3, 4, 5, 6, and 8).

```
Raw Input (Prompt / URL / Audio)
  │
  ▼
[Stage 1: Fact Extraction Dossier]  ──(LLM: gemini-2.5-pro / claude-3-5-sonnet)
  │
  ▼
[Stage 2: Brand Kit Selection]     ──(Deterministic Preset or LLM)
  │
  ▼
[Stage 3: Storyboard Deck]          ──(LLM: deck structuring)
  │
  ▼
[Stage 4: Layout Blueprint]         ──(LLM: layout token mapping)
  │
  ▼
[Stage 5: Spatial Architecture]     ──(LLM: spatial geometry & composition)
  │
  ▼
[Stage 6: React TSX Generation]     ──(LLM: concurrency pool = 3)
  │
  ▼
[Stage 7: Assembly & TS Check]      ──(Deterministic index.ts + tsc; up to 3 LLM retries)
  │
  ▼
[Stage 8: Journalistic Caption]     ──(LLM: synthesis; currently sequential after Pass 7)
  │
  ▼
[Stage 9: Playwright Visual Audit]  ──(Deterministic assertions in headless browser)
```

### Detailed Stage Breakdown

1. **Stage 1: Fact Extraction Dossier (LLM)**
   - Extracts structured claims, entities, dates, core thesis, and fine-print receipts from raw source text or prompt.
   - Temperature: `0.2` for factual fidelity.
   - Output: `dossier.json`.

2. **Stage 2: Brand Kit Selection (Deterministic Preset or LLM)**
   - If a recognized `brandKit` slug is provided (e.g. `the-fine-print`), the LLM call is bypassed completely in favor of deterministic tokens.
   - If unspecified, an LLM selects bespoke typography, color palette, motif, and wordmark style.
   - Output: `brand.json`.

3. **Stage 3: Storyboard Deck Structuring (LLM)**
   - Establishes narrative arc across 7 slides: Hook cover, Context, The Trap/Mechanism, The Fine Print Proof, Financial Impact, Counter-Strategy/Action, and Resolution.
   - Word budgets are assigned to kickers, headlines, subheads, and telemetry badges.
   - Output: `deck.json`.

4. **Stage 4: Layout Blueprint & Token Binding (LLM)**
   - Maps each slide to structural archetypes (e.g. `stat-callout`, `split-comparison`, `evidence-quote`, `receipt-stack`).
   - Assigns density classes, padding budgets, and visual anchors.
   - Output: `blueprints.json`.

5. **Stage 5: Spatial Layout Architecture (LLM)**
   - Resolves spatial coordinates, flexbox ordering, icon selections, and container bounding boxes before code synthesis.
   - Output: `layouts.json`.

6. **Stage 6: React TSX Code Generation (LLM Pool)**
   - Generates publication-grade React TypeScript components (`Slide01_Cover.tsx` through `Slide07_Resolution.tsx`) with pure Tailwind CSS and Lucide icons.
   - Uses a dynamic FIFO worker queue with concurrency = 3 (`p-limit`).
   - Slides wrap in `<SlideFrame>` with `<AutoFit>` protection.
   - Output: Individual `SlideXX_*.tsx` files.

7. **Stage 7: Assembly & TypeScript Verification (Deterministic + Bounded LLM Loop)**
   - Assembles `index.ts` re-exporting all slides and metadata deterministically.
   - AST validation executes with Babel parser; up to 1 auto-repair attempt (`HEAL_AST`).
   - TypeScript compiler (`tsc --noEmit`) validates types across all slides.
   - If compilation errors occur, an LLM healing prompt runs with error diagnostics. Bounded: max 3 attempts (`attempt <= 3`). Throws fatal error on attempt 4.

8. **Stage 8: Journalistic Social Caption (LLM)**
   - Synthesizes editorial Instagram post caption with hook, receipt summary, call to action, and curated hashtags.
   - **Execution Order**: Currently sequential in `pipeline.ts` (executes following Stage 7 assembly). Parallel execution alongside Stages 5–7 is cataloged as a roadmap optimization.
   - Output: `caption.json`.

9. **Stage 9: Playwright Visual Audit (Deterministic Headless Browser)**
   - Spins up headless Chromium to evaluate each slide rendered on the Slide Preview Server (`http://localhost:5174/?template=<slug>&slide=<idx>&export=true`).
   - Evaluates the 8 DOM assertions and AutoFit scale metrics.
   - Total collisions = 0 indicates a clean pass; >0 collisions fails or halts publication.

---

## 4. Visual Auditor Specifications & Assertions

The Playwright visual auditor (`packages/generator/src/visual-auditor.ts`) performs deterministic browser assertions without heuristic layout repair loops.

### Pre-Audit Font Settling
Before auditing the DOM, the auditor waits for dynamic typography to load and layout to stabilize:
```ts
await page.evaluate(async () => {
  if (document.fonts) {
    await document.fonts.ready;
  }
});
await page.waitForTimeout(300); // Allow fonts and AutoFit to settle
```

### The 8 DOM Assertions
The auditor scans all elements with text or layout containers and checks:
1. **Visual Clipping**: `el.scrollHeight > el.clientHeight + 2` on text containers with hidden overflow.
2. **Token Fusing**: Text containing numbers directly fused to alphabetical tokens without spacing (e.g. `12000passengers`).
3. **Word Repetition**: Consecutive identical words across whitespace boundaries (e.g. `the the`, `clause clause`).
4. **Leaked JavaScript Literals**: Unrendered framework artifacts in DOM text (`[object Object]`, `undefined`, `NaN`, `null`).
5. **Mobile Font Size Floor**: Text elements rendered below 12px computed font size (`fontSize < 12px`), violating mobile legibility standards.
6. **Banned CSS Rules**: Explicit `overflow: hidden` on editable body text containers that masks content clipping instead of properly scaling it.
7. **Safe Area Boundary Overflows**: Any element bounding rect exceeding the `952×1028` safe area boundaries.
8. **Vertical Void Gaps**: Consecutive vertical block elements with an empty void gap exceeding 220px (`gap > 220px`).

### AutoFit Scale Thresholds
- **Fatal Error (`numericScale < 0.85`)**: Content is excessively tall or dense. Fails visual audit and blocks publication.
- **Warning (`0.85 <= numericScale < 0.95`)**: Minor scaling applied. Logged in audit warnings for editorial awareness.
- **Clean Pass (`numericScale >= 0.95`)**: Component rendered at near-native scale (`scale ~ 1.000`).

---

## 5. Canvas Dimensions, Safe Area & Space Utilization

### Geometry Specifications
- **Canvas Size**: 1080px width × 1350px height (4:5 vertical portrait aspect ratio for mobile feeds).
- **Canvas Padding**: 64px on all four sides (`SlideFrame.tsx`).
- **Inner Width**: `1080 - (64 × 2) = 952px`.
- **Header**: ~80px (pb-8 border separator, wordmark, category kicker, volume badge).
- **Footer**: ~80px (pt-8 border separator, slide pagination index, swipe indicator).
- **Main Margins**: 32px top and bottom (`my-8`).
- **Safe Area Dimensions**: **952px width × 1028px height** (Y: ~161px to ~1189px).

### Space Balance & Fill Ratio
- Content fill percentage is measured as:
  $$\text{fillPercent} = \text{round}\left(\frac{\text{contentRect.height}}{1350} \times 100\right)$$
- **Safe Area Bound Constraint**: Because the safe area height is 1028px within a 1350px canvas, the maximum possible unscaled content height without clipping is $1028 / 1350 \approx 76.1\%$.
- **Superseded Legacy Rule**: The earlier guideline stating "content must fill 75%–95% of the frame" is physically incompatible with the safe area without triggering clipping or AutoFit downscaling. It is officially superseded.
- **Current Target**: Content fill targets **60%–75%** of total canvas height, or vertical optical centering (`Ratio ~ 1.0`).
- **Auditor Threshold**: `visual-auditor.ts` triggers a low-utilization warning only when `fillPercent < 60`.

---

## 6. Status Lifecycles & State Transitions

Generation lifecycle and newsroom publishing lifecycle are strictly separated:

### Generation Job Status (`Job.status`)
```
[queued] ──► [ingesting] ──► [transcribing] ──► [structuring] ──► [rendering] ──► [complete]
    │                                                                             ▲
    └──────────────────────────────► [failed] / [needs_review] ───────────────────┘
```
- `queued`: Submitted to BullMQ queue.
- `ingesting`: Downloading media/source text.
- `transcribing`: Audio transcription via Deepgram.
- `structuring`: Running 9-stage generator pipeline.
- `rendering`: Generating final PNG slide assets.
- `complete`: Successfully generated all assets and passed verification.
- `failed`: Pipeline or compilation failure.
- `needs_review`: Flagged for manual review.

### Newsroom Story Status (`NewsroomStatus`)
```
[discovered] ──► [pitched] ──► [approved] ──► [generating]
                                                   │
  ┌────────────────────────────────────────────────┘
  ▼
[pending_review] ──► [publishing] ──► [scheduled] ──► [published]
  ▲                        │
  └──────(on error)────────┘
```
- `discovered`: Scraped from wire feed.
- `pitched`: Scored by curator LLM.
- `approved`: Selected for production.
- `generating`: Job submitted to Loopreel API.
- `pending_review`: Generation job reached `complete`. Held for human editorial review.
- `publishing`: Atomically claimed by publisher process before Buffer API call.
- `scheduled`: Post queued in Buffer calendar.
- `published`: Post confirmed live on platform.
- `rejected`: Did not meet editorial bar.
- `failed`: Generation or pipeline error.

---

## 7. Newsroom Human Review Gate Implementation

### Shared Publisher Architecture (`apps/newsroom/src/publisher.ts`)
Both the CLI and the autonomous daemon route Buffer dispatch through the unified `publishStory()` function:
1. **Story Verification**: Queries story record; rejects missing stories.
2. **Idempotency Guard**: If `status === 'scheduled'` or `'published'`, returns clean no-op without re-calling Buffer.
3. **Status Check**: Enforces `status === 'pending_review'`. Rejects stories in `generating`, `publishing`, or other states.
4. **Job & Audit Validation**: Validates attached Loopreel job is `complete` and visual audit reported 0 fatal errors and 0 collisions.
5. **Provenance Check**: If source is `prompt:`, refuses to publish unless `--confirm-unverified` is explicitly supplied.
6. **Atomic State Claim**:
   ```sql
   UPDATE newsroom_stories
   SET status = 'publishing', updated_at = NOW()
   WHERE id = $1 AND status = 'pending_review'
   RETURNING *;
   ```
7. **Buffer Dispatch & Rollback**: Calls Buffer API. On success, records `buffer_post_id`, `approved_by`, and `approved_at`, transitioning to `scheduled`. On failure, reverts status back to `pending_review` with failure error logged in metadata.

### CLI Usage
```bash
# Review and publish an approved story
pnpm --filter @loopreel/newsroom exec tsx src/index.ts --action=publish --id=<UUID> --reviewer="Managing Editor"

# Publish an unverified prompt-sourced story
pnpm --filter @loopreel/newsroom exec tsx src/index.ts --action=publish --id=<UUID> --reviewer="Fact Checker" --confirm-unverified
```

---

## 8. Design Tokens & Typographic Conventions

### Primary Brand Preset: The Fine Print
- **Vibe**: Investigative Corporate Autopsies, Fine Print Tricks & Receipts.
- **Palette**:
  - `paper`: `#0A0A0C` (Deep obsidian black background)
  - `ink`: `#F5F5F7` (Silver newsprint off-white; 18:1 contrast on `#0A0A0C`, passing WCAG AAA)
  - `accent`: `#FF2A2A` (Warning redline red; 5.3:1 contrast on `#0A0A0C`, passing WCAG AA)
  - `surface`: `#121216` (Raised card surface)
  - `border`: `#24242C` (Subtle boundary borders)
  - `subtle`: `#8E8E98` (Secondary metadata text)
- **Typography**:
  - `headlineFont`: Space Grotesk
  - `bodyFont`: Space Grotesk
  - `monoFont`: JetBrains Mono
- **Rules**:
  - Telemetry `<value>` elements must contain purely numerical figures or signed percentage badges (`+12%`, `-17%`, `$1.2B`). Descriptive units and qualifiers go in `<label>`.
  - Zero rhetorical question headlines (e.g. "Is Your Airline Cheating You?"). Use declarative investigative assertions ("How Airlines Pocket Unclaimed Bump Vouchers").

---

## 9. Environment Variables & API Reference

### Key Environment Variables

| Variable | Purpose | Default | Required |
| :--- | :--- | :--- | :--- |
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://loopreel:loopreel@localhost:5432/loopreel` | Yes |
| `REDIS_URL` | Redis BullMQ connection string | `redis://localhost:6379` | Yes |
| `GEMINI_API_KEY` | Gemini LLM provider key | — | Yes |
| `DEEPGRAM_API_KEY` | Deepgram STT transcription key | — | For audio |
| `BUFFER_ACCESS_TOKEN` | Buffer GraphQL API token | — | For publishing |
| `BUFFER_CHANNEL_ID` | Buffer target channel ID | — | For publishing |
| `BUFFER_ORGANIZATION_ID` | Buffer organization ID | — | For publishing |
| `NEWSROOM_AUTO_PUBLISH` | Emergency bypass for Buffer review gate | `false` | No |
| `NEWSROOM_DRY_RUN` | Simulates Buffer scheduling without dispatch | `false` | No |
| `NEWSROOM_MIN_SCORE` | Minimum curator score to pitch story (0–10) | `7.5` | No |
| `R2_ACCOUNT_ID` | Cloudflare R2 account ID | — | For storage |
| `R2_ACCESS_KEY_ID` | Cloudflare R2 access key | — | For storage |
| `R2_SECRET_ACCESS_KEY` | Cloudflare R2 secret key | — | For storage |
| `R2_BUCKET_NAME` | Cloudflare R2 bucket name | `loopreel` | No |

### API Endpoint Reference

- `POST /api/jobs`: Create generation job (`prompt`, `sourceUrl`, `brandKit`, `platform`).
- `GET /api/jobs`: List jobs with status, pagination, and sorting.
- `GET /api/jobs/:id`: Retrieve detailed job metadata, assets, LLM usage, and visual audit results.
- `POST /api/jobs/:id/retry`: Re-queue a failed job.
- `GET /api/jobs/:id/download`: Download ZIP archive of all generated slide PNGs and caption.
- `GET /api/health`: Healthcheck endpoint for API, database, and Redis readiness.

---

## 10. Data Retention & Copyright Policy

- **Scraped Article Text**: Stored temporarily in PostgreSQL `newsroom_stories.source_snippet` solely for scoring and fact-extraction passes. Verbatim article bodies are not redistributed.
- **Generated TSX Slides**: Original creative interpretations and editorial analysis published under the publication brand.
- **Slide Asset Persistence**: Generated PNGs and JSON manifests are persisted in Cloudflare R2 for a minimum of 90 days.
- **PII Scrubbing**: News wire scans strictly filter corporate and public legal filings; private personal information is excluded at the curator pass.

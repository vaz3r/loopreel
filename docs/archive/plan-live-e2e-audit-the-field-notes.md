# Implementation Plan: Live End-to-End Audit & Test with Real Article & LLM

We need to conduct a real-world end-to-end audit of **`the-field-notes`** template using a real web article and real LLM (Google Gemini 2.5 Flash) via the full microservices queue pipeline (`api` -> `worker-ingest` -> `worker-structure` -> `worker-render`).

This will verify that the LLM successfully introspects the expanded 17-slide `TheFieldNotesContract`, generates creative and structured field-notes carousel content, validates cleanly against the schema, and renders 2x Retina PNGs without visual clipping or overflow.

---

## 1. Goal Description

1. **Verify Live LLM Structuring**:
   - Submit a real article on qualitative human-centered design (`https://en.wikipedia.org/wiki/Design_research`).
   - Route to `the-field-notes` with custom publication brandkit (`wordmark: "RESEARCH JOURNAL"`, `handle: "@fieldresearcher"`).
   - Let Google Gemini 2.5 Flash dynamically select from the 17 slide types, compose field observations, add handwritten annotations (`scribble`), and apply highlighter marks (`*text*`).
2. **Verify Headless Worker Rendering**:
   - Process the generated deck through `worker-render` using Playwright in 2x Retina resolution ($2160 \times 2700$).
3. **Audit Visual Output**:
   - Inspect every rendered slide for typography balance, layout integrity, margin spacing, and styling.
   - Embed the generated slide carousel in `docs/walkthrough.md`.

---

## 2. User Review Required

> [!IMPORTANT]
> This test uses real Google Gemini API calls via the running BullMQ worker stack (`apps/worker-structure` and `apps/worker-render`). PM2 services will be restarted before the test to ensure all in-memory workers pick up the new schema and bridge exports.

---

## 3. Execution Steps

### Step 1: Reload PM2 Services
Restart all 7 PM2 services so that the Fastify API, BullMQ workers (`worker-structure`, `worker-render`), and the Loop engine pick up the newly compiled `@loopreel/loop`, `@loopreel/schemas`, and `the-field-notes` layout code in memory:
```bash
pm2 restart all
```

### Step 2: Submit Live Article Job
Use `scripts/submit-api-job.ts` to submit a real article and poll until completion:
```bash
pnpm tsx scripts/submit-api-job.ts \
  --url "https://en.wikipedia.org/wiki/Design_research" \
  --template "the-field-notes" \
  --platform "instagram-feed" \
  --wordmark "RESEARCH JOURNAL" \
  --handle "@fieldresearcher" \
  --outDir "output/live-audit-the-field-notes"
```

### Step 3: Inspect Structured JSON & Slide Types
- Query the job results from the PostgreSQL database / API.
- Verify which slide types the LLM selected (e.g. `cover`, `statement`, `list`, `specimen`, `measure`, `compare`, `cta`).
- Check that all fields (`scribbles`, `notes`, `highlights`) conform strictly to `TheFieldNotesContract`.

### Step 4: Visual Audit of Rendered Slides
- Inspect each generated PNG in `output/live-audit-the-field-notes/`.
- Check:
  1. Header with custom wordmark (`RESEARCH JOURNAL`) and dynamic entry number.
  2. Notebook margin rule and 9 bound-edge holes.
  3. Highlighter marks on key takeaways.
  4. Handwritten scribble annotations with arrow SVGs.
  5. Footer with `@fieldresearcher` handle, dot progress indicators, and page counter.

### Step 5: Document Results
- Copy the live-rendered slides into `<Artifact Directory>/the-field-notes-live-audit/`.
- Update `docs/walkthrough.md` with Section 11 detailing the live E2E run, execution time, token performance, and visual carousel.
- Commit all documentation to Git.

---

## 4. Verification Plan

### Automated Execution
```bash
# 1. PM2 reload
pm2 restart all

# 2. Run live job submission
pnpm tsx scripts/submit-api-job.ts \
  --url "https://en.wikipedia.org/wiki/Design_research" \
  --template "the-field-notes" \
  --platform "instagram-feed" \
  --wordmark "RESEARCH JOURNAL" \
  --handle "@fieldresearcher" \
  --outDir "output/live-audit-the-field-notes"
```

### Manual Inspection
- Verify that `output/live-audit-the-field-notes/` contains all generated slide PNGs.
- Inspect the visual quality of each slide image.

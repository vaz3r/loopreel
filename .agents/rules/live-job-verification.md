# Mandatory Live Job Verification & Admin Review Rule

## Core Directive
Whenever testing or modifying:
- Core carousel engine or layouts (`packages/loop`)
- Editorial prompts, copywriting, or LLM pipeline (`packages/llm`)
- Schemas or contracts (`packages/schemas`)
- Background workers (`apps/worker-ingest`, `apps/worker-structure`, `apps/worker-render`)
- Backend API or admin dashboard (`apps/api`, `apps/admin`)

**NEVER consider a task complete solely on the basis of unit tests or headless scripts.**

## Verification Protocol
1. **Submit a Real Job**: Always submit an end-to-end job via `POST http://localhost:3000/api/jobs` using a real-world article (e.g. Google News, RSS, or published journalism).
2. **Track Pipeline Progression**: Monitor BullMQ worker execution through:
   - `ingest` (Scraping & HTML normalization)
   - `structure` (Multi-phase LLM slide planning, copywriting, and schema validation)
   - `render` (Playwright 2160x2700 PNG asset generation)
3. **Assert Visual Balance**: Verify that all generated slides achieve space balance fill rates and zero overflow distortion (`Scale = 1.000`).
4. **Always Provide the Admin URL**: Every task completion message MUST provide the direct clickable link to the job in the Admin UI:
   `http://localhost:5175/jobs/<JOB_ID>`

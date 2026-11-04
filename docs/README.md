# Loopreel Documentation Hub

Welcome to the Loopreel repository documentation directory. This folder houses all core architecture specifications, business and product strategy blueprints, layout guidelines, and verification records.

---

## Documentation Index

### 1. [Monorepo Architecture Reference](./architecture-reference.md)
Comprehensive technical overview of the monorepo topology:
- **6 Deployable Applications**: `apps/api`, `apps/admin`, `apps/worker-ingest`, `apps/worker-transcribe`, `apps/worker-structure`, `apps/worker-render`.
- **6 Core Packages**: `packages/schemas`, `packages/db`, `packages/queue`, `packages/storage`, `packages/loop`, `packages/llm`.
- **Subpath Export Integration**: Headless Node template introspection via `@loopreel/loop/bridge`.
- **Data Flow & Queue Topology**: BullMQ pipeline routing from source ingestion to 2x Retina rendering.

### 2. [Strategic Blueprint: Premium B2B SaaS](./premium-saas-strategy.md)
The complete executive strategy for launching Loopreel as a high-margin commercial SaaS:
- **Value Proposition & Anchor Pricing**: Replacing \$3,000–\$8,000/month design agencies and ghostwriters.
- **Ideal Customer Profiles (ICPs)**: Tech executives, B2B founders, and content marketing agencies.
- **The 5 Moat Pillars**: Bespoke typography, dynamic density engine, source fidelity auditing, multi-channel formats (LinkedIn PDF), and multi-tenancy.
- **Packaging, Tiers & Unit Economics**: \$49 / \$149 / \$399 / custom enterprise tiers with < \$0.01 direct COGS per carousel.
- **Go-To-Market (GTM) Playbook**: Dogfooding in public, free teaser graders, and agency trial passes.

### 3. [Layout Standardization & Verification Walkthrough](./walkthrough.md)
Technical and visual verification logs:
- Systematic resolution of the CTA centering and duplicate footer bugs across all editorial templates.
- Multi-template automated test suite (`scripts/test-all-templates-visual.ts`).
- Monorepo package consolidation audit (elimination of 4 micro-packages, deletion of `the-terminal` template).
- Full live pipeline benchmarks (Quantum Computing Wikipedia job).

---

## Guidelines for Documentation
- All future architectural designs, RFCs, and product strategies must be written or mirrored directly in this `./docs/` folder.
- Keep diagrams updated using standard Mermaid syntax.

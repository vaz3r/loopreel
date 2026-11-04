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

### 2. [Strategic Blueprint: MVP Validation & Credit-Pack Model](./mvp-validation-and-credit-model.md)
The lean execution and founder dogfooding blueprint:
- **Founder Dogfooding & Customer Zero**: Launching a dedicated Instagram page to validate real audience traction and layout feedback daily before scaling tech.
- **Credit-Pack Monetization**: Replacing friction-heavy recurring subscriptions with pay-as-you-go packs (\$19 for 5 carousels, \$49 for 15, \$99 for 35).
- **BrandKit Differentiation Engine**: Ensuring no two brands look the same via dynamic hex harmonies, typography pairing presets, and border frame styles.
- **Template Roadmap**: Expanding beyond the 4 broadsheet templates into modern B2B tech and high-contrast styles.
- **Daily 15-Minute Playbook**: Content selection formula, operational loop, and signals to watch.

### 3. [Strategic Blueprint: Premium B2B SaaS (Long-Term Reference)](./premium-saas-strategy.md)
The complete executive strategy for launching Loopreel as a high-margin commercial SaaS:
- **Value Proposition & Anchor Pricing**: Replacing \$3,000–\$8,000/month design agencies and ghostwriters.
- **Ideal Customer Profiles (ICPs)**: Tech executives, B2B founders, and content marketing agencies.
- **The 5 Moat Pillars**: Bespoke typography, dynamic density engine, source fidelity auditing, multi-channel formats (LinkedIn PDF), and multi-tenancy.
- **Packaging, Tiers & Unit Economics**: \$49 / \$149 / \$399 / custom enterprise tiers with < \$0.01 direct COGS per carousel.
- **Go-To-Market (GTM) Playbook**: Dogfooding in public, free teaser graders, and agency trial passes.

### 4. [Implementation Plan: 100% Isolated Template Architecture & Multi-Platform Engine](./plan-isolated-template-architecture.md)
The revised, fully isolated template architecture blueprint:
- **100% Isolated Template Plugin Model**: Each template remains completely self-contained with its own frame, slides, CSS modules, and brandkit.
- **Scaffolding CLI & Starter Blueprint**: `pnpm run create-template <name>` to bootstrap a new isolated template in under 60 seconds.
- **Preserved Auto-Select + Strict Fixed Template Override**: Auto-select remains the smart default, while explicit template choices in Admin/API strictly bypass the classifier.
- **Typographic Wordmark & Handle System**: Replacing raw raster JPEG logos with crisp, high-DPI typographic wordmarks and handles.
- **Multi-Platform Aspect Ratio Engine**: Standardized canvas sizing for Instagram Feed (4:5), Stories (9:16), Square (1:1), LinkedIn (4:5 PDF), and Pinterest (2:3).
- **Pure Admin Testing Workflow**: Zero credit/auth friction with saved BrandKit presets in `localStorage`.

### 5. [Antigravity Skill: Template Converter](./skills-template-converter.md) & [Golden Prompt Recipe](./template-prompt-recipe.md)
The official workspace Antigravity Skill (`.agents/skills/template-converter/SKILL.md`) for zero-manual-effort template conversion:
- **Progressive Disclosure**: Antigravity automatically triggers when you ask to convert an HTML mock from `packages/loop/design-references/`.
- **Zero-Manual-Friction Contract**: The user provides the HTML file; Antigravity executes 100% of the CSS translation, component isolation, registration, and visual testing.
- **Golden Prompt Recipe** ([`template-prompt-recipe.md`](./template-prompt-recipe.md)): Copy-paste prompt for ChatGPT/Claude generating standard $1080 \times 1350$ single-file HTML mocks.
- **Conversion Checklist**: Automated verification for isolation, dynamic wordmark compliance, and visual fidelity.

### 6. [Implementation Plan: Antigravity Skill for Template Conversion](./plan-template-converter-skill.md)
Technical design document for the Antigravity Skill implementation and workflow architecture.

### 7. [Layout Standardization & Verification Walkthrough](./walkthrough.md)
Technical and visual verification logs:
- Systematic resolution of the CTA centering and duplicate footer bugs across all editorial templates.
- Multi-template automated test suite (`scripts/test-all-templates-visual.ts`).
- Monorepo package consolidation audit (elimination of 4 micro-packages, deletion of `the-terminal` template).
- Full live pipeline benchmarks (Quantum Computing Wikipedia job).

---

## Guidelines for Documentation
- All future architectural designs, RFCs, and product strategies must be written or mirrored directly in this `./docs/` folder.
- Keep diagrams updated using standard Mermaid syntax.

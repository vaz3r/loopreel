# Implementation Plan: Antigravity Skill for Template Conversion

## Goal Description

Rather than a static text playbook, we will create an official workspace-scoped **Antigravity Skill** (`.agents/skills/template-converter/SKILL.md`).

This skill extends Google Antigravity's capabilities by giving the agent a specialized, progressively disclosed runbook. Whenever you say:
> *"Convert `packages/loop/design-references/The Terminal.html` into a template"*
or
> *"Add a new template from this HTML mock"*

Antigravity will automatically detect the intent from the skill's semantic description, load the specialized conversion protocol into its context, and execute the full translation autonomously—with zero manual CSS editing required from you.

---

## User Review Required

> [!IMPORTANT]
> **Workspace Scope (`.agents/skills/template-converter/`)**:
> Storing the skill in `.agents/skills/` within the repository ensures that it is tracked in Git. Any future Antigravity agent or developer working on Loopreel will automatically inherit this skill.

> [!TIP]
> **No Manual CSS Translation**:
> You never touch CSS or JSX. You only create the single-file HTML in ChatGPT/Claude using the included Golden Prompt Recipe, drop it into `packages/loop/design-references/`, and ask Antigravity to convert it.

---

## Skill Architecture & Directory Layout

```text
.agents/skills/template-converter/
├── SKILL.md                          # Main Antigravity skill definition with YAML frontmatter
└── resources/
    ├── prompt-recipe.md              # "Golden Prompt Recipe" to copy-paste into ChatGPT/Claude
    └── conversion-checklist.md       # Pre-flight & post-flight verification checklist
```

---

## Skill Specification (`SKILL.md`)

### 1. YAML Frontmatter & Semantic Trigger
```yaml
---
name: template-converter
description: >-
  Use this skill whenever the user asks to convert, ingest, or build a production
  isolated Loopreel template from a single-file HTML design reference in
  packages/loop/design-references/, or asks to create or register a new template layout.
---
```

### 2. Core Protocol Defined in `SKILL.md`

1. **Phase 1: Token & Typography Extraction**
   - Read the target HTML file from `packages/loop/design-references/`.
   - Extract Google Fonts `<link>` URLs and font families.
   - Extract the color palette: `bg` (paper), `text` (ink), `accent`, `border`, `surface`, and semantic colors into `brandkit.ts`.
2. **Phase 2: Isolated Directory Scaffolding**
   - Run `pnpm run create-template <template-id> "<Template Name>"` to generate a completely isolated template directory in `packages/loop/src/layouts/<template-id>/`.
3. **Phase 3: Frame & Typographic Wordmark Translation**
   - Translate the HTML masthead and footer into `frame.tsx` and `frame.module.css`.
   - Wire up `TypographicWordmark` for high-DPI text handles and mastheads.
4. **Phase 4: Slide Layouts Translation**
   - Translate the HTML slide layers into `slides.tsx`.
   - Convert Tailwind utility classes to scoped CSS module classes or inline styles.
   - Map static HTML content to dynamic slide data props:
     - `cover`: `headline`, `kicker`, `takeaway`
     - `sequence`: `steps` (`index`, `label`, `body`)
     - `telemetry`: `metrics` (`value`, `label`, `change`)
     - `quote`: `quote`, `attribution`
     - `cta`: `headline`, `action`, `kicker`
5. **Phase 5: Auto-Registration & Schema Update**
   - Verify registration in:
     - `packages/schemas/src/index.ts` (`ALL_TEMPLATE_KEYS`, `TEMPLATE_INFO`)
     - `packages/loop/src/bridge/registry.ts`
     - `packages/loop/src/bridge/classifier.ts` (`TEMPLATE_CHARACTERISTICS`)
     - `apps/admin/src/lib/constants.ts` (Admin UI dropdown)
6. **Phase 6: Visual Audit & Screenshot Verification**
   - Run `pnpm tsx scripts/test-all-templates-visual.ts`.
   - Render and store visual comparison screenshots in `output/template-audit/<template-id>/` and the brain artifacts directory.
   - Run `pnpm turbo run build typecheck` to verify 0 errors.

---

## Deliverables

1. `.agents/skills/template-converter/SKILL.md`
2. `.agents/skills/template-converter/resources/prompt-recipe.md`
3. `.agents/skills/template-converter/resources/conversion-checklist.md`
4. `docs/skills-template-converter.md` & updated `docs/README.md`.

# Antigravity Skill: Template Converter

The **Template Converter** skill (`.agents/skills/template-converter/SKILL.md`) extends Google Antigravity with a specialized workflow for converting single-file HTML design mocks into production-ready, 100% isolated React carousel templates for Loopreel.

---

## Overview

### The Human-AI Hand-Off
- **Founder / Creative Director**: Uses ChatGPT, Claude, or Gemini with the [Golden Prompt Recipe](./template-prompt-recipe.md) to generate single-file HTML mocks, and places them in `packages/loop/design-references/`.
- **Antigravity AI**: Autonomously parses the HTML, extracts tokens, scaffolds an isolated template under `packages/loop/src/layouts/<template-id>/`, translates HTML/Tailwind to CSS modules, wires up dynamic wordmarks and content props, registers the template across all schemas and the Admin UI, and runs visual screenshot audits.

---

## Directory Structure

```text
.agents/skills/template-converter/
├── SKILL.md                          # Skill definition with YAML frontmatter & 6-phase protocol
└── resources/
    ├── prompt-recipe.md              # Golden Prompt Recipe for external LLMs
    └── conversion-checklist.md       # Pre-flight & post-flight verification checklist
```

---

## Triggering the Skill

Because the skill is stored in `.agents/skills/` within the repository, Antigravity automatically indexes its YAML frontmatter:

```yaml
---
name: template-converter
description: >-
  Use this skill whenever the user asks to convert, ingest, or build a production
  isolated Loopreel carousel template from a single-file HTML design reference in
  packages/loop/design-references/, or asks to create or register a new template layout.
---
```

You can trigger the skill naturally in chat with prompts like:
- *"Convert `packages/loop/design-references/The Terminal.html` into a template."*
- *"Take the HTML mock in design-references and turn it into an isolated template."*
- *"Ingest this new HTML design reference."*

---

## The 6 Conversion Phases

1. **Token & Aesthetic Extraction**: Parses Google Fonts, palette colors (`paper`, `ink`, `accent`, `border`, `surface`), and typographic weights.
2. **Isolated Directory Scaffolding**: Runs `pnpm run create-template <id> "<Name>"` to bootstrap a zero-dependency template folder.
3. **Frame & Wordmark Translation**: Generates `frame.tsx` + `frame.module.css` with dynamic typographic wordmark support.
4. **Slide Layouts Translation**: Generates `slides.tsx` mapping HTML sections to dynamic props (`headline`, `steps`, `metrics`, `quote`, `action`).
5. **Schema & Admin Registration**: Auto-registers in `@loopreel/schemas`, `@loopreel/loop/bridge`, the classifier, and the Admin UI dropdown.
6. **Visual Audit & Quality Verification**: Runs `test-all-templates-visual.ts` and `turbo run build typecheck` to verify 1:1 visual fidelity and 0 compiler errors.

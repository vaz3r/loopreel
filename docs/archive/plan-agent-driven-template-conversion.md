# Implementation Plan: Agent-Driven "Design Reference → Production Template" Workflow

## Goal Description

You clarified your desired flow:
> *"I will not translate the CSS by hand, I will simply ask you to convert the template to a proper template."*

This is the exact right division of labor between founder and AI agent:
- **Your Role (Creative Director)**: Brainstorm high-level concepts with ChatGPT, Claude, or Gemini, preview the generated single-file HTML in your browser, drop it into `packages/loop/design-references/`, and say: **"Convert this into a template."**
- **My Role (Autonomous AI Engineer)**: Read the HTML file, parse its design tokens (Google Fonts, palette, spacing), translate all HTML/Tailwind into a 100% isolated React layout in `packages/loop/src/layouts/<template-id>/`, register it across schemas and the Admin UI, run visual screenshot audits, and deliver it ready-to-use in under 2 minutes.

---

## User Review Required

> [!IMPORTANT]
> **Zero Manual Work for You**: You will never need to touch CSS, write JSX, or run conversion CLI scripts. You simply drop the HTML file into `packages/loop/design-references/` and tell me to convert it.

To make this seamless, we provide two standardized assets:
1. **The Golden Prompt Recipe** ([`docs/template-prompt-recipe.md`](./template-prompt-recipe.md)): A 1-click prompt you can paste into ChatGPT, Claude 3.5 Sonnet, or Gemini. It guarantees that whatever aesthetic the LLM designs, it will output a clean $1080 \times 1350$ canvas with standardized slide sections that I can convert with 100% pixel fidelity.
2. **The Agent Conversion Playbook** ([`docs/agent-template-conversion-playbook.md`](./agent-template-conversion-playbook.md)): The strict, step-by-step protocol I follow to scaffold, translate, register, and visually test each new template.

---

## The End-to-End Workflow

```mermaid
sequenceDiagram
    autonumber
    actor User as You (Creative Director)
    participant LLM as ChatGPT / Claude / Gemini
    participant Agent as Antigravity (AI Coding Assistant)
    participant Loop as packages/loop
    participant Admin as Admin UI (/create)

    User->>LLM: Copy "Golden Prompt Recipe" + Describe aesthetic (e.g. "Milan Luxury")
    LLM-->>User: Outputs single-file HTML with Google Fonts & Tailwind
    User->>Loop: Saves HTML to packages/loop/design-references/MyTemplate.html
    User->>Agent: "Convert packages/loop/design-references/MyTemplate.html"
    Note over Agent: Agent parses HTML, extracts fonts & colors,<br/>scaffolds packages/loop/src/layouts/my-template/,<br/>translates CSS to isolated modules,<br/>registers in schemas & Admin dropdown
    Agent->>Agent: Runs visual audit & captures PNG screenshots
    Agent-->>User: Displays slide screenshots for visual confirmation. Ready in Admin!
    User->>Admin: Selects "My Template" from dropdown & generates carousels
```

---

## What I (The Agent) Do When You Say "Convert This Template"

Whenever you point me to an HTML file in `packages/loop/design-references/`:

1. **Step 1: Extract Aesthetics & Design Tokens**
   - Extract Google Fonts `<link>` URLs and font families.
   - Extract background, ink, panel, border, and accent colors into `brandkit.ts`.
2. **Step 2: Scaffold Isolated Template Directory**
   - Run `pnpm run create-template <template-id> "<Template Name>"` to generate a completely isolated workspace under `packages/loop/src/layouts/<template-id>/`.
3. **Step 3: Translate Frame & Typographic Wordmark**
   - Convert the HTML header and footer into `frame.tsx` + `frame.module.css`.
   - Wire up `TypographicWordmark` for high-DPI text handles and mastheads.
4. **Step 4: Translate Slide Layouts**
   - Convert the HTML slides (`cover`, `sequence`, `telemetry`, `quote`, `cta`, etc.) into `slides.tsx`.
   - Map static HTML dummy text into dynamic template props (`s.headline`, `s.kicker`, `s.steps`, `s.metrics`, `s.quote`, `s.action`).
5. **Step 5: Auto-Register Everywhere**
   - Ensure it is registered in `packages/schemas/src/index.ts` (`ALL_TEMPLATE_KEYS`), `packages/loop/src/bridge/registry.ts`, `classifier.ts`, and `apps/admin/src/lib/constants.ts`.
6. **Step 6: Visual Audit & Verification**
   - Run the visual test suite and save rendered PNGs into `<appDataDir>/brain/...` and `output/template-audit/<template-id>/`.
   - Run `turbo run build typecheck` to guarantee 0 compiler errors.

---

## Deliverables

1. `docs/template-prompt-recipe.md`: Prompt recipe for external LLMs.
2. `docs/agent-template-conversion-playbook.md`: Standard operating procedure for the agent.
3. Test conversion with any HTML mock (such as `packages/loop/design-references/The Terminal.html`).

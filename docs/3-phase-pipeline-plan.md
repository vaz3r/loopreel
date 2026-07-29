# 3-Phase LLM Pipeline Plan

## Architecture

```
Phase 1: SUMMARISE              Phase 2: CONFIGURE              Phase 3: GENERATE
┌─────────────────┐      ┌──────────────────────────┐      ┌──────────────────┐
│ Raw article text │  →   │ contentBrief (2-3k chars) │  →   │ contentBrief     │
│ (40k chars)      │      │ + all 5 template styles   │      │ + selected template│
│         ↓        │      │              ↓            │      │ + slidePlan       │
│ <contentBrief>   │      │ <slideConfig>             │      │ + narrativeArc    │
│ • title          │      │ • templateId              │      │ + schema          │
│ • oneLiner       │      │ • slidePlan [cover, ...]  │      │ + brandKit        │
│ • keyInsights    │      │ • narrativeArc            │      │         ↓         │
│ • quotes         │      │ • slideCount              │      │ <presentation>    │
│ • hardData       │      │ • styleGuidance           │      │   7-8 <slide>s    │
│ • counterpoints  │      │                           │      │   cohesive deck   │
│ • people/companies│     │ 1 LLM call                │      │ 1 LLM call        │
│ • tone           │      │                           │      │                   │
│ • readingLevel   │      │                           │      │                   │
│ 1 LLM call        │      │                           │      │                   │
└─────────────────┘      └──────────────────────────┘      └──────────────────┘
```

## Phase 1 — Summarise

**Input:** Full raw article text (40k chars)
**Output:** `<contentBrief>` XML (~2-3k chars)
**Fields:** title, oneLiner, keyInsights (5-7), notableQuotes (exact text + attribution), counterpoints, hardData (numbers only), people/companies, tone, readingLevel

The key rule: hardData ONLY contains actual numbers. No opinions, no advice. If the article has no numbers, leave it empty.

This becomes the shared context injected into every downstream LLM call.

## Phase 2 — Configure

**Input:** `contentBrief` + all 5 template styles
**Output:** `<slideConfig>` XML

| Field | Example |
|---|---|
| `templateId` | `the-academic` |
| `slidePlan` | `cover, telemetry, sequence, myth-fact, interview, quote, cta` |
| `slideCount` | `7` |
| `narrativeArc` | "A rigorous examination of the startup idea discovery process, moving from empirical patterns to methodological critique to actionable frameworks" |
| `styleGuidance` | "Write like an HBR research paper. Use evidence-based language. Cite the author as the primary source. Avoid Bloomberg-style data presentation in favor of structured argument." |

The LLM reads the brief, understands the topic's tone, and picks the right template + structures the story.

Replaces both `autoSelectTemplate()` (in worker-structure) and `buildSlidePlan()` (in multi-phase.ts).

## Phase 3 — Generate Slides (ONE CALL)

**Input:** Everything — `contentBrief` + `slideConfig` + template style + schema constraints + brand kit
**Output:** `<presentation>` XML with all slides

The prompt includes:
- Template voice/style description from registry
- Narrative arc
- Slide plan (ordered list of types with purpose of each)
- Content brief
- Schema constraints (introspected Zod schema)
- Brand kit values
- Quality rules

## Quality Rules

- Stats = numbers with units ONLY
- Cover subheadline ≤15 words
- Myth/fact ≤25 words each, punchy
- Headlines ≤8 words
- One cohesive voice throughout
- Write like the selected template, not generic

## Available Templates

| Template | Voice |
|---|---|
| `paper-of-record` | NYT/Guardian — authoritative, investigative, serious |
| `the-globalist` | Economist/Monocle — macro-economic, worldly, premium |
| `the-terminal` | Bloomberg Terminal — data-driven, quantitative, technical |
| `the-curator` | MoMA/gallery — minimal, artistic, conceptual |
| `the-academic` | HBR/MIT — evidence-based, structured, methodical |

## Files to Change

| File | Changes |
|---|---|
| `packages/llm/src/multi-phase.ts` | Three prompt functions + orchestrator. Template styles passed as params, not hardcoded. |
| `apps/worker-structure/src/index.ts` | Fetch template styles from loop-bridge, pass into generateSlidesMultiPhase(). Load schema after Phase 2. |
| `scripts/test-multi-phase.ts` | Test 3-phase flow, save slides output. |

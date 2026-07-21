# Rendering Engine — System Design Spec

Target audience: an AI coding agent implementing this directly against the
Loopreel monorepo described in the architecture doc. Every section states a
requirement and the concrete reason it exists — most reasons trace to a real
bug found in this project, not a hypothetical.

---

## 1. Scope

Build the rendering engine as **N self-contained template packages** sharing
only true platform primitives (dimensions, color math, font-loading gate,
overflow-safety utility). Do **not** build a generic layout solver, a
config-driven template system, or shared "slide type" components used across
templates with different visual systems.

**Why:** A generic solver computes positions from character-count heuristics
or abstract role/constraint objects. It cannot express a signature design
move (a spine tab, ink/paper alternation tied to slide function) without an
escape hatch — and once every template needs the escape hatch, the
abstraction bought nothing. Two templates built from the same config schema
converge on "same skeleton, different colors," which is indistinguishable
from the generic AI-carousel look this project exists to avoid. Design
quality is authored per template, not solved for.

---

## 2. Directory contract — every template follows this shape

```
templates/
  shared/
    layout.ts        # FORMAT_DIMENSIONS, hexToRgba, clampFontSize — pure, presentational-only
    fit.ts            # measure-and-shrink utility (§5) — Playwright-side, not a design decision
    render-gate.ts    # font-loading + data-render-complete signal (§4)
  registry.ts          # id -> component lookup, throws on unknown id (§6)
  EditorialRunway/
    contract.ts        # Zod schema — this template's required LLM + app fields (done, see attached)
    prompt-fragment.txt # LLM instructions specific to this template's contract (done, see attached)
    tokens.ts            # palette, type scale — this template's design system only
    blocks.tsx            # subcomponents (SpineTab, HookBody, ListBody, ...)
    EditorialRunway.tsx    # skeleton — grid layout, wires blocks + tokens together
    index.ts                # export { EditorialRunway } from './EditorialRunway'
  <NextTemplate>/
    ...same five files, same pattern, zero shared visual code
```

A new template = a new folder with all five files. Nothing elsewhere in the
codebase changes except one line in `registry.ts`.

---

## 3. The contract gate — non-negotiable, enforced before render

Every template ships a Zod contract (`contract.ts`) with two schemas:

- `<Template>LlmOutputSchema` — fields the content-structure LLM call must produce
- `AppSuppliedMetaSchema` — fields the app supplies (brand kit, user profile, job timestamp) and merges in once, post-level, never re-derived per slide

**Enforcement points (both required, not either/or):**

| Where | What | On failure |
|---|---|---|
| `worker-structure`, immediately after the content-structure LLM call is parsed | `validateLlmOutput(parsed)` | `markFailed(jobId, issues)` — job never reaches `rendering` status |
| `RenderPage`, after `mergePostMeta()`, before the template mounts | `validateRenderContract(merged)` | Throw before Playwright navigates — a render worker should never screenshot a component holding invalid props |

**Why both, not just one:** the LLM call can produce valid-per-itself output
that becomes invalid once merged with a job that's missing app-level data
(no handle configured, no brand kit `name` set). Validating only at the LLM
boundary misses that case; validating only at render time means you've
already burned an LLM call on content that was never going to render.

No field required by a contract may have a silent fallback in the render
component (e.g. `if (!meta) return null`). If the contract says a field is
required, the component may assume it exists. This is deliberate — it moves
every "what if this is missing" decision to one place (the contract) instead
of scattering optional-chaining defenses through the JSX, which is what
produced the bare-footer, bare-kicker render you saw in production: fields
were optional in the type system, so nothing forced the LLM to fill them, so
nothing forced the component to handle their absence *correctly* rather than
silently.

Reference implementation: `EditorialRunway/contract.ts` (attached below).

---

## 4. Render-correctness gate — font loading + completion signal

`RenderPage` must not set `data-render-complete="true"` until:

```typescript
await document.fonts.ready;
```

resolves, in addition to whatever content-ready condition already exists.

**Why:** Google Fonts load asynchronously. The render worker's flow (navigate
→ wait `networkidle` → wait `[data-render-complete="true"]` → screenshot)
does not guarantee font-load completion — `networkidle` is a network
condition, not a paint condition. Without this gate, Playwright can
screenshot mid-FOUT: the correct layout, in a fallback system font. This is
indistinguishable from "the design system doesn't have distinctive
typography" from the outside, and is the single most likely explanation for
any render that looks generically-fonted despite the component code being
correct.

---

## 5. Overflow safety — measure-and-shrink, not character-count guessing

`clampFontSize(charCount, {min, max, pivot})` is permitted as the **first-pass**
size, computed before render, because it's free (no extra render pass).
It is **not** permitted as the only safety mechanism. `shared/fit.ts` must
implement a measure-and-shrink pass that runs against real rendered DOM,
immediately before the `data-render-complete` signal fires:

```typescript
// shared/fit.ts
export async function fitTextToContainer(
  page: Page,
  selector: string,
  opts: { minSize: number; step: number } = { minSize: 14, step: 1 }
) {
  await page.evaluate(({ selector, minSize, step }) => {
    const el = document.querySelector(selector) as HTMLElement;
    if (!el) return;
    const parent = el.parentElement!;
    let size = parseFloat(getComputedStyle(el).fontSize);
    while (el.scrollHeight > parent.clientHeight && size > minSize) {
      size -= step;
      el.style.fontSize = `${size}px`;
    }
  }, { selector, ...opts });
}
```

**Why a heuristic is insufficient on its own:** character count is a poor
proxy for rendered width — "iiiiiiii" and "WWWWWWWW" at equal length render
at very different widths, CJK text is denser per character than Latin,
emoji-heavy strings are wider than their character count suggests. A
heuristic-only system will misjudge a non-trivial fraction of real LLM
output. A real browser is already in this pipeline (Playwright); use its
actual measured layout as the correctness check, and use the heuristic only
to avoid an extra layout thrash on the common case.

Apply `fitTextToContainer` to every text block whose length varies with LLM
output (headings, body, list items, quotes) — not to fixed-content elements
(kickers, page marks, footer labels), which don't need it.

**Line length is a separate concern from overflow and must be constrained
independently.** `max-width: 90%` (a percentage of container) prevents
clipping but not overlong lines — on a wide frame it still permits a line
well past comfortable reading length. Every variable-length text block must
cap its width in `ch` units (character-relative, independent of frame
width), tuned per element to a sane reading measure — roughly 30–35ch for
a large display headline, 45–55ch for body copy, tighter for a pull quote.
This is a design decision made once per element in the template's own
`blocks.tsx`, not something the shrink pass or the LLM contract handles for
you.

---

## 6. Template registry — fail loud on unknown, never silently substitute

```typescript
// templates/registry.ts
import { EditorialRunway } from './EditorialRunway';

const registry: Record<string, React.ComponentType<any>> = {
  'editorial-runway': EditorialRunway,
};

export function getTemplate(id: string) {
  const Template = registry[id];
  if (!Template) {
    throw new Error(`Unknown template id "${id}" — check registry.ts and the design-decision LLM call's allowed template list.`);
  }
  return Template;
}
```

**Why not `?? EditorialRunway` as a fallback:** a silent substitution means a
typo'd template id, or a template removed from the registry without updating
the design-decision prompt, produces a job that "succeeds" while rendering
the wrong template — indistinguishable from correct behavior until a human
notices weeks later. Fail the render job immediately and visibly instead.

---

## 7. Format handling — derive from platform, and treat landscape as a distinct layout, not a scaled square

`SlideFormat` must be derived from the job's `platform` field at the
`RenderPage` boundary (one lookup table), never accepted as an independent
parameter that could disagree with `platform`.

Current platform dimensions include landscape aspect ratios (LinkedIn
1200×627, Facebook 1200×630) alongside square/portrait/story. A template's
layout logic for a tall spine tab, vertically-centered content, and a
bottom-anchored footer does not hold at a 1200×627 frame — `scale = height/1080`
uniformly shrinking every element is not equivalent to redesigning the
composition for a short, wide frame. Each template's `EditorialRunway.tsx`-
equivalent skeleton must define **distinct layout logic per format class**
(`tall` — square/portrait/story vs `wide` — landscape), not a single scale
factor applied to one layout. This is a per-template design decision (e.g.
spine tab becomes a top strip in `wide`), not something `shared/layout.ts`
can solve generically.

---

## 8. Acceptance criteria — a template is not "done" until every row passes

| Check | How to verify |
|---|---|
| Renders correctly at min and max content length per slide type | Feed the contract's own min/max bounds (e.g. `list` with 3 items and with 5) through the render pipeline; no visible empty space, no overflow |
| Fonts render as specified, not fallback | Screenshot diff or manual check against the font family actually painted |
| All four platform dimensions render without clipping or dead space | Run the same job through `instagram-feed`, `instagram-stories`, `linkedin`, `facebook` |
| Invalid/incomplete LLM output fails the job before rendering | Unit test: malformed content-structure output against `validateLlmOutput` |
| No template-required field has a silent runtime fallback in JSX | Code review: grep for `??`/`?.`/`if (!x) return null` guarding a contract-required field inside `blocks.tsx` — should not exist |
| Unknown template id throws, does not substitute | Unit test on `registry.ts` |

---

## Appendix: mistakes already found in this project — do not reintroduce

- Optional-everything flattened union types (`SlideData` with every field
  optional regardless of `type`) defeat the point of a discriminated union.
  Derive types from the Zod schema; don't hand-roll a permissive interface
  next to it.
- A component that returns blank/empty on missing data (`if (!meta) return null`)
  hides the bug instead of surfacing it. That's what shipped the bare-footer
  render.
- Forcing every job to one template regardless of the design-decision LLM
  call's actual output (`normalizeDesign()` hardcoding `template` to one
  value) defeats template selection before it's even built.
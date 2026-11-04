# Analysis & Plan: Evaluating ARCHIVIO & CASA FORMA Design References

## Goal Description

You asked:
> *"I pasted the prompt you gave me and it generated `packages/loop/design-references/ARCHIVIO.html` and `packages/loop/design-references/casa-forma-carousel-reference.html`. I don't think this is what we want or is it?"*

### Honest Verdict: **You are 100% right. This is NOT what we want.**

Your intuition is spot-on. While the HTML code itself is technically valid, **strategically and aesthetically it is the wrong direction for your Instagram validation.**

Here is the exact diagnostic breakdown of why this happened, why it doesn't serve you, and how we fix it immediately.

---

## The 4 Reasons This Isn't What We Want

### 1. Aesthetic Redundancy (We Already Have This!)
Both `ARCHIVIO.html` and `casa-forma-carousel-reference.html` are:
- Ivory/travertine cream backgrounds (`#F5F1EA`, `#F4EFE4`).
- Espresso/charcoal serif typography (Playfair, Instrument Serif, Bodoni Moda).
- Terracotta/crimson accents.
- Archival Italian monograph theme.

👉 **The Problem**: You already have [`paper-of-record`](../packages/loop/src/layouts/paper-of-record/) (heritage broadsheet serif) and [`the-curator`](../packages/loop/src/layouts/the-curator/) (luxury gallery monograph). Converting these would give you **3 nearly identical templates**. When validating your Instagram page, you need high visual contrast, not slight variations of the same aesthetic.

### 2. Prompt Leakage: The LLM Copied the Placeholder Example
In our previous prompt template, we included this example:
> `[STYLE DESCRIPTION - e.g.: ... "Bespoke Italian architectural monograph with ivory paper, deep espresso typography, Bodoni poster headlines"...]`

ChatGPT/Claude latched directly onto that example text and generated an architectural monograph about Italian marble quarries and brutalism, rather than a versatile social template for business, tech, or frameworks.

### 3. "Studio Inspector" Shell Bloat
Both files contain 500+ lines of unnecessary interactive web app code:
- Zoom slider bars (`#scaleSlider`, `.zoom button`).
- Safe-zone toggle overlays (`.safe-zone-overlay`).
- Studio header bars (`.shell-header`).
- Horizontal scrolling rails.

None of this viewer chrome is part of an actual carousel slide.

### 4. Dummy Content Disconnect
The dummy content in both files (*"The Geometry of Stone"*, *"Pietra Serena"*, *"Milanese Brutalism"*) is hyper-niche architecture copy. When you generate carousels from Wikipedia, YouTube, or articles about AI, leadership, or startups, this layout structure won't naturally fit.

---

## What We Actually Want: Distinct High-Contrast Archetypes

For your daily Instagram validation to work, every template in your library should stop thumbs for a **completely different reason**:

| Template | Aesthetic | Tone / Niche | Status |
|---|---|---|---|
| **1. Paper of Record** | Cream broadsheet, Times serif, red line | Heritage journalism, investigative deep-dives | ✅ Built |
| **2. The Globalist** | Warm cream, green/mustard, Futura sans | International business, macroeconomics | ✅ Built |
| **3. The Curator** | White gallery, razor serif, asymmetric | Luxury art, fashion, minimalism | ✅ Built |
| **4. The Academic** | Crisp journal, cobalt blue, structural grid | Scientific research, peer-reviewed analysis | ✅ Built |
| **5. The Signal** | Dark slate, neon cyan, Substack sans | B2B engineering, tech leadership | ✅ Built |
| **6. The Terminal** | **Pitch black, neon amber/green, JetBrains Mono** | **FinTech, crypto, live market data** | ⚡ **Ready in `The Terminal.html`** |
| **7. The Blueprint** | **Stripe/Linear off-white & obsidian, 1px cards** | **SaaS founders, product playbooks, frameworks** | 🎯 **Target Next** |
| **8. The Vanguard** | **Swiss brutalism, fluorescent yellow, massive font** | **Hot takes, myth debunking, mindset shifts** | 🎯 **Target Next** |

---

## Action Plan to Fix This

### Step 1: Fix the Golden Prompt Recipe
We will update `docs/template-prompt-recipe.md` and `.agents/skills/template-converter/resources/prompt-recipe.md`:
1. **Remove the Italian architecture example** to prevent LLMs from copying it.
2. **Explicitly forbid viewer chrome**: Tell the LLM: *"Do NOT include zoom sliders, inspector bars, safe-zone buttons, or shell headers. Output ONLY the raw carousel slide articles."*
3. **Provide 3 Ready-to-Use Recipe Presets**:
   - **Preset A: The SaaS Blueprint** (Linear / Stripe style).
   - **Preset B: The Swiss Vanguard** (High-contrast brutalist scroll-stopper).
   - **Preset C: The Bloomberg Terminal** (FinTech / Data).

### Step 2: What to Do With the Files
- We can safely archive or ignore `ARCHIVIO.html` and `casa-forma-carousel-reference.html`.
- For our next production template, we have two great options:
  - **Option 1 (Immediate)**: Convert `The Terminal.html` into **`the-terminal`** right now. It is pitch-black, mono, data-driven, and 100% distinct from everything we have.
  - **Option 2**: Paste the new "SaaS Blueprint" prompt into ChatGPT/Claude to get a clean Linear/Stripe style template.

# The Golden Prompt Recipe: Single-File HTML Carousel Design Reference

Copy and paste the prompt below into **ChatGPT (GPT-4o)**, **Claude 3.5 Sonnet**, or **Gemini 1.5 Pro** when designing a new template for Loopreel. Replace the bracketed `[STYLE DESCRIPTION]` with your desired aesthetic.

---

### Copy-Paste Prompt for ChatGPT / Claude:

```markdown
You are an elite editorial art director and frontend design engineer. Create a complete, self-contained single-file HTML carousel design reference for an editorial carousel publishing platform.

## Aesthetic & Tone:
[STYLE DESCRIPTION - e.g.:
- "Bloomberg / Financial Times data terminal aesthetic with pitch black background, neon green/amber accents, and JetBrains Mono typography"
- OR "Bespoke Italian architectural monograph with ivory paper, deep espresso typography, Bodoni poster headlines, and airy negative space"
- OR "Swiss international style with stark high-contrast typography, Akzidenz-Grotesk styling, and asymmetrical red geometric markers"]

## Technical Requirements:
1. Deliver as a single HTML file with embedded CSS and Tailwind via CDN (<script src="https://cdn.tailwindcss.com"></script>).
2. Use Google Fonts loaded via standard `<link>` tags in the `<head>`. Pick distinct, premium pairings for:
   - Headline / Display font
   - Body copy font
   - Monospace / Micro-label font
3. Define the color palette in Tailwind config or CSS variables:
   - `paper` (canvas background)
   - `ink` (primary text)
   - `accent` (signature highlight color)
   - `border` (divider lines and frame borders)
   - `surface` (card and callout backgrounds)
4. Canvas Dimensions:
   - Every slide canvas MUST have exact dimensions of 1080px width by 1350px height (4:5 vertical aspect ratio).
   - Class name: `.canvas-container { width: 1080px; height: 1350px; position: relative; overflow: hidden; }`
   - Render the slides in a horizontal scroll container or vertical grid on the page so I can easily preview them side-by-side in any browser.

## Required Slide Layouts:
Include at least these 5 distinct slide layouts, each clearly identified:
1. `id="slide-cover"`:
   - Masthead header with publication wordmark and date/issue label.
   - Large headline, category kicker tag, and teaser summary.
   - Footer with social handle badge (e.g. "@brandname") and "SWIPE" indicator.
2. `id="slide-sequence"`:
   - 3 to 4 sequential steps or breakdown cards.
   - Distinct numbered badges, step headings, and concise explanations.
3. `id="slide-telemetry"`:
   - 2 to 4 data metrics, stat callouts, or key benchmarks.
   - Bold numerical stats with descriptive labels and comparative percentage tags.
4. `id="slide-quote"`:
   - Bold editorial pull-quote with elegant quotation markers.
   - Attribution block with author name and title.
5. `id="slide-cta"`:
   - High-impact takeaway summary card.
   - Distinct call-to-action button or badge (e.g. "SAVE THIS GUIDE", "FOLLOW FOR DAILY BRIEFS").
   - Brand account badge.

## Framing Rules:
- Header: Masthead text/wordmark at the top.
- Footer: Publication handle and slide counter (e.g. "01 / 05") at the bottom.
- Maintain generous padding (at least 60px on sides) to protect safe zones on mobile screens.
```

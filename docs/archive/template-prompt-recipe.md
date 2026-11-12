# The Universal Template Prompt Recipe: Single-File HTML Design Reference

Copy and paste the prompt below into **ChatGPT (GPT-4o)**, **Claude 3.5 Sonnet**, or **Gemini 1.5 Pro**. Replace `[DESCRIBE YOUR DESIRED STYLE, AESTHETIC, OR MOOD HERE]` with **any** aesthetic, niche, or topic you want.

---

### Copy-Paste Master Prompt:

```markdown
You are an expert graphic designer and frontend engineer. Create a complete, self-contained single-file HTML carousel design reference based on my design brief.

## MY DESIGN BRIEF:
[DESCRIBE YOUR DESIRED STYLE, AESTHETIC, OR MOOD HERE. For example:
- "Dark mode B2B SaaS product framework inspired by Linear and Stripe with sharp borders and clean badges"
- "Bold Swiss brutalist poster with high-contrast fluorescent accents and massive typography"
- "Minimalist Japanese zen aesthetic with muted earth tones and generous white space"
- "High-energy creator carousel with vibrant gradients and punchy headline cards"
- Or ANY other style, topic, or industry you want!]

## TECHNICAL SPECIFICATIONS:
1. Deliver as a single HTML file with embedded CSS and Tailwind via CDN (<script src="https://cdn.tailwindcss.com"></script>).
2. Fonts: Load appropriate Google Fonts matching my requested aesthetic via standard <link> tags in the <head>. Provide distinct pairings for:
   - Headline / Display font
   - Body text font
   - Monospace / Micro-label font (if fitting the style)
3. Design Tokens: In tailwind.config or CSS variables, define:
   - `paper`: Canvas background color
   - `ink`: Primary body & title text color
   - `accent`: Signature highlight color
   - `border`: Divider lines & card borders
   - `surface`: Nested cards / callout backgrounds
4. Canvas Dimensions (MANDATORY):
   - Every slide canvas MUST be strictly 1080px width by 1350px height (4:5 vertical aspect ratio).
   - Class name: `.canvas-container { width: 1080px; height: 1350px; position: relative; overflow: hidden; box-sizing: border-box; }`
   - In the body, display the slides in a simple, clean vertical list or horizontal scroll row on a dark background for easy browser preview.

## STRICT NEGATIVE CONSTRAINTS (CRITICAL):
- DO NOT generate a "web application shell", zoom slider, scale controller, safe-zone toggle, inspector toolbar, or preview chrome.
- Output ONLY pure, export-ready carousel slide elements (`.canvas-container`).
- Use realistic, compelling copy matching my design brief for headlines and content (do not use generic lorem ipsum).

## REQUIRED SLIDE LAYOUTS:
Create these 5 distinct slides, styled consistently according to my design brief:
1. `id="slide-cover"` (Cover):
   - Top Masthead: Publication wordmark / publication title and issue/category label.
   - Main: Large display headline, category kicker badge, and brief teaser subtitle.
   - Bottom Footer: Account handle (e.g. "@brandname") and "SWIPE" indicator.
2. `id="slide-sequence"` (Sequential Breakdown):
   - 3 to 4 sequential steps, framework pillars, or numbered breakdown points.
   - Step numbers, bold step titles, and explanatory body text.
3. `id="slide-telemetry"` (Data & Metrics):
   - 2 to 4 data callouts, statistics, or key benchmarks.
   - Prominent numerical stats with descriptive labels and comparative tags (+42%, 3.8x, etc.).
4. `id="slide-quote"` (Editorial Pull-Quote):
   - Bold statement, thought leadership quote, or key takeaway.
   - Attribution block with author name and title.
5. `id="slide-cta"` (Call to Action):
   - Summary key takeaway card.
   - Distinct call-to-action button/badge (e.g., "SAVE THIS POST", "FOLLOW FOR DAILY INSIGHTS").
   - Brand account badge.

## Framing & Margins:
- Top: Persistent masthead / header.
- Bottom: Persistent footer with handle and page number indicator (e.g., "01 / 05", "02 / 05").
- Safe Zone: Keep all readable text inset by at least 64px from all canvas edges.
```

---

## How to Use It:
1. Copy the master prompt above.
2. Fill in `[DESCRIBE YOUR DESIRED STYLE, AESTHETIC, OR MOOD HERE]` with whatever design concept you want.
3. Paste it into ChatGPT or Claude.
4. Save the generated HTML file into `packages/loop/design-references/<Template Name>.html`.
5. Tell Antigravity:
   > *"Convert `packages/loop/design-references/<Template Name>.html` into a template"*
6. Antigravity will extract the design tokens, scaffold the isolated React template, register it across all apps, and render visual screenshots for your preview.

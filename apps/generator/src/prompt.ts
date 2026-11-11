import type { BrandTokens, SlideData } from './skeleton/types';

export interface TemplateBrief {
  name: string;
  vibe: string;
  domain?: string;
  inspiration?: string;
}

// ============================================================================
// PASS 1: BRAND CONCEPT & DESIGN TOKENS
// ============================================================================

export function buildBrandSystemPrompt(): string {
  return `You are a legendary Creative Director at a premier editorial design agency (Pentagram, Wolff Olins, Monocle, Wired).
Your job is to establish the design identity and visual tokens for a new publication-grade carousel template.

CRITICAL RULES:
1. Palette must be sophisticated and editorial (e.g. sumi-e charcoal, washi cream, vermilion accent, or Swiss black/white/crimson).
2. Typography: Select authentic Google Fonts pairings (one distinctive headline font, one ultra-clean body font, and one technical monospace font). Provide a valid Google Fonts embed URL.
3. Wordmark Style: Choose 'serif' | 'sans' | 'mono' | 'small-caps'.
4. Texture: Choose 'washi' | 'grid' | 'dots' | 'blueprint' | 'none'.
5. Motif: Choose 'seal' (Japanese cinnabar seal) | 'crosshair' (Swiss modernist registration) | 'coord' (technical coordinate badge) | 'bracket' | 'none'.
6. Return strictly valid JSON matching the BrandTokens schema without preamble or markdown formatting outside the json code block.`;
}

export function buildBrandUserPrompt(brief: TemplateBrief): string {
  return `Define the complete Brand Tokens for this template:
Template Name: "${brief.name}"
Vibe / Aesthetic: "${brief.vibe}"
Content Domain: "${brief.domain || 'General In-Depth Editorial'}"
Inspiration: "${brief.inspiration || 'Monocle, The New York Times Magazine, Wired, Swiss Modernism'}"

Return JSON matching:
{
  "name": "${brief.name}",
  "slug": "${brief.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}",
  "vibe": "${brief.vibe}",
  "domain": "${brief.domain || 'General In-Depth Editorial'}",
  "palette": {
    "paper": "#HEX",
    "ink": "#HEX",
    "accent": "#HEX",
    "surface": "#HEX",
    "border": "#HEX",
    "subtle": "#HEX"
  },
  "typography": {
    "headlineFont": "Font Name",
    "bodyFont": "Font Name",
    "monoFont": "Font Name",
    "googleFontsUrl": "https://fonts.googleapis.com/css2?family=...&display=swap"
  },
  "wordmark": "PUBLICATION NAME",
  "wordmarkStyle": "serif",
  "handle": "@publication",
  "texture": "washi",
  "motif": "seal"
}`;
}

// ============================================================================
// PASS 2: 17-SLIDE MASTER CONTENT DECK (2 FAST BATCHES TO PREVENT TIMEOUTS)
// ============================================================================

export function buildDeckSystemPrompt(): string {
  return `You are an Executive Editor at The New York Times Magazine and Harvard Business Review.
Your task is to author rich, high-signal narrative content for a carousel template.

CRITICAL EDITORIAL RULES:
1. Handcrafted editorial depth: ZERO corporate filler, zero robotic phrasing ("synergy", "game-changer", "dive into"), zero rhetorical question headlines.
2. Every slide must deliver concrete, authentic, high-signal intel specifically tailored to the requested domain.
3. Telemetry numbers MUST be strictly numerical or signed badge (e.g. "$1.2T", "+34%", "4.8ms"). Never put explanatory text in the value slot.
4. Return strictly valid JSON array of slide objects: [ { "id": "slide-1", "type": "...", ... } ] without preamble.`;
}

export function buildDeckBatch1Prompt(brief: TemplateBrief, brand: BrandTokens): string {
  return `Author Batch 1 (Slides 1–9) for:
Publication: "${brand.name}"
Domain: "${brand.domain}"
Tone: "${brand.vibe}"

Archetypes to produce (strictly in this order):
1. cover: { "id": "slide-1", "type": "cover", "headline": "...", "subheadline": "...", "kicker": "...", "authorName": "...", "authorRole": "..." }
2. list: { "id": "slide-2", "type": "list", "title": "...", "items": [{ "tag": "...", "title": "...", "takeaway": "..." }, { ... }, { ... }] }
3. image-split: { "id": "slide-3", "type": "image-split", "headline": "...", "label": "...", "observation": "...", "notes": ["...", "..."] }
4. telemetry: { "id": "slide-4", "type": "telemetry", "headline": "...", "metrics": [{ "value": "+34%", "label": "...", "context": "..." }, { "value": "$1.2T", "label": "...", "context": "..." }, { "value": "4.2ms", "label": "...", "context": "..." }] }
5. dialogue: { "id": "slide-5", "type": "dialogue", "topic": "...", "speaker": "...", "role": "...", "thesis": "...", "counterThesis": "..." }
6. quadrant: { "id": "slide-6", "type": "quadrant", "headline": "...", "quadrants": [{ "quadrant": "Q1", "title": "...", "body": "..." }, { "quadrant": "Q2", ... }, { "quadrant": "Q3", ... }, { "quadrant": "Q4", ... }] }
7. case-study: { "id": "slide-7", "type": "case-study", "headline": "...", "subject": "...", "before": "...", "after": "...", "takeaway": "...", "impact": { "value": "2.4x", "label": "..." } }
8. debunk: { "id": "slide-8", "type": "debunk", "headline": "...", "myth": { "title": "THE MYTH", "text": "..." }, "reality": { "title": "THE REALITY", "text": "..." } }
9. grid: { "id": "slide-9", "type": "grid", "headline": "...", "cards": [{ "index": "01", "title": "...", "desc": "..." }, { "index": "02", ... }, { "index": "03", ... }] }

Return strictly JSON array: [ ... 9 slide objects ... ]`;
}

export function buildDeckBatch2Prompt(brief: TemplateBrief, brand: BrandTokens): string {
  return `Author Batch 2 (Slides 10–17) for:
Publication: "${brand.name}"
Domain: "${brand.domain}"
Tone: "${brand.vibe}"

Archetypes to produce (strictly in this order):
10. timeline: { "id": "slide-10", "type": "timeline", "headline": "...", "phases": [{ "phase": "01", "label": "...", "detail": "..." }, { "phase": "02", ... }, { "phase": "03", ... }] }
11. pullquote: { "id": "slide-11", "type": "pullquote", "quote": "...", "attribution": "...", "role": "..." }
12. hero-cta: { "id": "slide-12", "type": "hero-cta", "headline": "...", "kicker": "...", "action": "...", "handle": "${brand.handle}" }
13. hero-stat: { "id": "slide-13", "type": "hero-stat", "headline": "...", "stat": { "value": "94.8%", "label": "...", "detail": "..." } }
14. step-by-step: { "id": "slide-14", "type": "step-by-step", "headline": "...", "steps": [{ "step": "1", "title": "...", "body": "..." }, { "step": "2", ... }, { "step": "3", ... }] }
15. dos-and-donts: { "id": "slide-15", "type": "dos-and-donts", "headline": "...", "do": { "title": "RECOMMENDED", "body": "..." }, "dont": { "title": "AVOID", "body": "..." } }
16. checklist: { "id": "slide-16", "type": "checklist", "headline": "...", "items": [{ "check": true, "title": "...", "note": "..." }, { ... }, { ... }, { ... }] }
17. anatomy: { "id": "slide-17", "type": "anatomy", "headline": "...", "components": [{ "label": "...", "desc": "..." }, { "label": "...", "desc": "..." }, { "label": "...", "desc": "..." }] }

Return strictly JSON array: [ ... 8 slide objects ... ]`;
}

// ============================================================================
// PASS 3: SINGLE SLIDE REACT + TAILWIND COMPONENT
// ============================================================================

export function buildSingleSlideSystemPrompt(): string {
  return `You are a world-class Frontend Engineer and Editorial Art Director.
You write bespoke React components using Tailwind CSS for editorial publication carousels.

CRITICAL DESIGN & CODING RULES:
1. Component Signature:
   import React from 'react';
   import type { SlideComponentProps } from '../../../src/skeleton/types';

   export default function SlideNN({ slide, brand, totalSlides }: SlideComponentProps) {
     return ( ... );
   }

2. Styling & Theme Integration:
   - Use Tailwind CSS classes for layout, flexbox, grid, padding, rounded corners, and typography.
   - Use CSS variables for brand colors and fonts:
     * bg-[var(--surface)] for cards/panels
     * text-[var(--ink)] for body text
     * text-[var(--accent)] or bg-[var(--accent)] for accents, badges, highlights
     * border-[var(--border)] for card borders and hairlines
     * font-[var(--font-headline)] for titles, quotes, hero numbers
     * font-[var(--font-body)] for body copy and descriptions
     * font-[var(--font-mono)] for metrics, tags, indices
   - Card styling: Elegant borders (border border-[var(--border)]), subtle shadows, rounded-lg or rounded-xl.

3. Spatial Balance Rule (75%–90% Vertical Fill):
   - Zero top-heavy clumping: do not cram all content into the top 20% leaving an empty void at the bottom.
   - Distribute space vertically using \`flex flex-col justify-between h-full\`, \`gap-6\`, or generous card padding (\`p-8\`).
   - If content is short, center it optically with generous line heights and larger font scales.

4. Slide-Specific Art Direction:
   - cover: Massive headline (\`text-6xl\` or \`text-7xl\` font-bold tracking-tight), subtle category pill, editorial subheadline, author credits bar.
   - list: 3 distinct cards with accent tag, clear bold title, and takeaway subtext.
   - image-split: Two-column layout with an editorial diagram placeholder frame on one side and structured analytical notes on the other.
   - telemetry: 3-4 metric cards. Numbers must be large and prominent (\`text-5xl\` or \`text-6xl\` font-mono font-bold), with percentage badges and concise context.
   - dialogue: Dramatic Q&A with oversized drop-caps or quotation marks.
   - debunk: Side-by-side or stacked comparative cards contrasting Myth (subtle muted/red) vs Reality (accent/green).
   - pullquote: Large italic quote with 4px brand accent border (\`border-l-4 border-[var(--accent)] pl-8\`).
   - hero-stat: Single massive stat (\`text-8xl\` or \`text-9xl\` font-mono) dominating the upper frame with deep analytical paragraph below.

5. Technical Constraints:
   - Output ONLY self-contained React TypeScript JSX code in a \`\`\`tsx code block.
   - NO external dependencies or icon libraries (no lucide-react, no react-icons). Use pure SVG or Tailwind.
   - Do NOT wrap in the outer 1080x1350 frame or header/footer—the framework's SlideFrame already provides those.
   - Return valid JSX without syntax errors.`;
}

export function buildSingleSlideUserPrompt(
  slideNumber: number,
  slideData: SlideData,
  brand: BrandTokens
): string {
  return `Generate the React + Tailwind component for Slide ${slideNumber}:
Archetype: "${slideData.type}"
Slide Data:
${JSON.stringify(slideData, null, 2)}

Brand Context:
- Publication: "${brand.name}"
- Domain: "${brand.domain}"
- Accent Color: "${brand.palette.accent}"
- Paper Background: "${brand.palette.paper}"
- Surface Color: "${brand.palette.surface}"
- Border Color: "${brand.palette.border}"

Write the complete Slide${String(slideNumber).padStart(2, '0')}.tsx component.`;
}

// ============================================================================
// PASS 5: COMPILER ERROR SELF-HEALING
// ============================================================================

export function buildSelfHealingPrompt(
  filename: string,
  code: string,
  compilerError: string
): string {
  return `The following React component failed TypeScript compilation:
File: ${filename}
Error Output:
${compilerError}

Original Code:
\`\`\`tsx
${code}
\`\`\`

Fix the syntax or type errors completely. Return ONLY the corrected code in a \`\`\`tsx code block.`;
}

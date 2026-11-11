import type { BrandTokens, SlideData } from './skeleton/types';
import type { ArticleIntel } from './ingest';

export interface TemplateBrief {
  name?: string;
  vibe?: string;
  domain?: string;
  inspiration?: string;
  url?: string;
}

export interface StoryStrategy {
  hookHeadline: string;
  valuePromise: string;
  kicker: string;
  coreConflict: string;
  hiddenCatch: string;
  verdict: string;
  keyMetrics: Array<{ value: string; label: string; context: string }>;
  keyQuotes: Array<{ quote: string; speaker: string; role: string }>;
}

// ============================================================================
// PASS 1: BRAND CONCEPT & DESIGN TOKENS
// ============================================================================

export function buildBrandSystemPrompt(): string {
  return `You are a legendary Creative Director at a premier editorial design agency (Pentagram, Wolff Olins, Monocle, Wired).
Your job is to establish the design identity and visual tokens for a publication-grade carousel template.

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
Template Name: "${brief.name || 'The Dispatch'}"
Vibe / Aesthetic: "${brief.vibe || 'Modern editorial broadsheet'}"
Content Domain: "${brief.domain || 'General In-Depth Editorial'}"
Inspiration: "${brief.inspiration || 'Monocle, The New York Times Magazine, Wired, Swiss Modernism'}"

Return JSON matching:
{
  "name": "${brief.name || 'The Dispatch'}",
  "slug": "${(brief.name || 'the-dispatch').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}",
  "vibe": "${brief.vibe || 'Modern editorial broadsheet'}",
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

export function buildArticleBrandUserPrompt(article: ArticleIntel, brief?: TemplateBrief): string {
  return `Analyze this real news article and establish the ideal Publication Identity and Brand Tokens to art-direct this story:

Article Title: "${article.title}"
Publisher / Source: "${article.publisher}"
Author: "${article.byline || 'Staff'}"
Summary Snippet:
${article.summary}

Creative Direction Guidance:
- If high-tech, AI, or consumer robotics: obsidian black (#0A0E17), electric cyan (#38BDF8), slate cards (#141D2B), Space Grotesk / Inter / IBM Plex Mono.
- If macroeconomics, business, or geopolitics: broadsheet newsprint (#F8F9FA), deep ink (#111827), crimson accents (#E11D48), Playfair or Syne display.
- If design, architecture, or spatial philosophy: warm washi (#F5F2EB), sumi-e ink (#1A1918), cinnabar vermilion (#E85A3C), elegant serif.
- Custom vibe requested: "${brief?.vibe || 'High-end investigative technology editorial'}"

Return strictly valid JSON matching BrandTokens:
{
  "name": "${article.publisher || 'The Daily Briefing'}",
  "slug": "${(article.title || 'story').toLowerCase().replace(/[^a-z0-9]+/g, '-').slice(0, 32).replace(/(^-|-$)/g, '')}",
  "vibe": "Concise aesthetic description",
  "domain": "Topic / Category Domain",
  "palette": {
    "paper": "#HEX",
    "ink": "#HEX",
    "accent": "#HEX",
    "surface": "#HEX",
    "border": "#HEX",
    "subtle": "#HEX"
  },
  "typography": {
    "headlineFont": "Space Grotesk",
    "bodyFont": "Inter",
    "monoFont": "IBM Plex Mono",
    "googleFontsUrl": "https://fonts.googleapis.com/css2?family=...&display=swap"
  },
  "wordmark": "${(article.publisher || 'THE REPORT').toUpperCase()}",
  "wordmarkStyle": "sans",
  "handle": "@${(article.publisher || 'loopreel').toLowerCase().replace(/[^a-z0-9]/g, '')}",
  "texture": "grid",
  "motif": "crosshair"
}`;
}

// ============================================================================
// PASS 1B: EDITORIAL STRATEGIST (THE HOOK & VALUE EXTRACTION)
// ============================================================================

export function buildStoryStrategySystemPrompt(): string {
  return `You are the Editor-in-Chief at Wired, The New York Times Magazine, and Vox.
Your mission is to transform a news article into a scroll-stopping, high-signal editorial carousel.

CRITICAL HOOK & VALUE PRINCIPLES:
1. THE SCROLL-STOPPING HOOK (Slide 1):
   - Never use passive corporate titles (e.g. "Amazon puts Ring cameras on patrol" is BANNED).
   - Use the tension formula: [Surprising Action] + [The Hidden Catch / Stakes].
   - Examples of great hooks:
     * "Amazon Put Wings on Ring Cameras. Here’s What They Aren’t Telling You."
     * "Your Next Security Guard Flies Inside Your House. Why Civil Rights Groups Are Terrified."
     * "The $1,000 Indoor Drone: What Amazon’s Patent Disclosures Actually Reveal."
2. THE VALUE PROPOSITION:
   - State clearly why the reader must swipe through (e.g. "3 critical findings: The $1,000 price tag, interior mapping, and the 180-day retention loop.").
3. HIGH-SIGNAL EXTRACTION:
   - Extract the real numbers (pricing, dates, limits).
   - Extract the core conflict (Amazon pitch vs privacy reality).
   - Extract the hidden catch (what's in the fine print).
   - Extract actionable advice (who should buy it vs who should avoid it).

Return strictly JSON matching:
{
  "hookHeadline": "Scroll-stopping provocative headline",
  "valuePromise": "Clear 1-sentence value promise telling viewer what they will learn",
  "kicker": "SURVEILLANCE / IN FOCUS",
  "coreConflict": "1-sentence summary of the main controversy",
  "hiddenCatch": "1-sentence summary of what's in the fine print",
  "verdict": "1-sentence consumer/enterprise advice",
  "keyMetrics": [
    { "value": "$250", "label": "Drone Cam starting price", "context": "Base consumer hardware" },
    { "value": "$1,000", "label": "Rover Cam price", "context": "Positioned for businesses" },
    { "value": "180 Days", "label": "Cloud retention limit", "context": "Triggered by motion and live view" }
  ],
  "keyQuotes": [
    { "quote": "...", "speaker": "...", "role": "..." }
  ]
}`;
}

export function buildStoryStrategyUserPrompt(article: ArticleIntel): string {
  return `Extract the high-signal story strategy for this article:
Title: "${article.title}"
Publisher: "${article.publisher}"
Author: "${article.byline || 'Staff Bureau'}"
Article Text:
${article.cleanText.slice(0, 10000)}

Output strictly the StoryStrategy JSON.`;
}

// ============================================================================
// PASS 2: 10-SLIDE HIGH-SIGNAL NARRATIVE STORYBOARD
// ============================================================================

export function buildStoryDeckSystemPrompt(): string {
  return `You are an Executive Editor authoring a 10-slide high-density editorial carousel.

CRITICAL CONTENT & ANTI-OVERFLOW RULES:
1. High Signal, Zero Filler: Every slide delivers a distinct, high-value takeaway that can be read in under 3 seconds.
2. Strict Word Limits:
   - Headlines: Maximum 10–12 words.
   - Card Bodies / Bullets: Maximum 15–20 words per item! Never write long paragraph blocks.
3. 10-Slide Narrative Arc:
   1. cover: The Scroll-Stopping Hook & Stakes.
   2. brief: The 3-Bullet Executive Summary (TL;DR).
   3. mechanism: How It Works (Drone vs Rover hardware specs).
   4. telemetry: 3 Hard Numbers / Pricing.
   5. controversy: The Privacy Battle (Amazon claims vs Civil liberties alarm).
   6. catch: The Hidden Catch (What's in the fine print).
   7. debunk: Myth vs Reality.
   8. verdict: Consumer Advice (Who should buy it vs who should avoid it).
   9. future: The Big Picture (Autonomous domestic surveillance trends).
   10. hero-cta: The Final Takeaway & Discussion Question.

Return strictly a JSON array of 10 slide objects: [ { "id": "slide-1", "type": "cover", ... }, ... ]`;
}

export function buildStoryDeckUserPrompt(
  strategy: StoryStrategy,
  article: ArticleIntel,
  brand: BrandTokens
): string {
  return `Author the 10-slide narrative storyboard using this strategy:

Hook Headline: "${strategy.hookHeadline}"
Value Promise: "${strategy.valuePromise}"
Kicker: "${strategy.kicker}"
Core Conflict: "${strategy.coreConflict}"
Hidden Catch: "${strategy.hiddenCatch}"
Verdict: "${strategy.verdict}"
Key Metrics: ${JSON.stringify(strategy.keyMetrics)}
Key Quotes: ${JSON.stringify(strategy.keyQuotes)}

Article Details:
Title: "${article.title}"
Publisher: "${brand.name}"
Author: "${article.byline || 'Staff Bureau'}"

Output strictly the JSON array of 10 slide objects. Remember: MAX 20 WORDS PER CARD BODY!`;
}

// Fallback for non-article briefs
export function buildDeckSystemPrompt(): string {
  return `You are an Executive Editor authoring high-density editorial carousel content.
Rules: Zero corporate filler, concise statements (max 20 words per card body), strict numerical telemetry.
Return strictly valid JSON array of slide objects.`;
}

export function buildDeckBatch1Prompt(brief: TemplateBrief, brand: BrandTokens): string {
  return `Author Batch 1 (Slides 1–9) for ${brand.name} (${brand.domain}).
Archetypes: cover, list, image-split, telemetry, dialogue, quadrant, case-study, debunk, grid.
Keep card text concise under 20 words each. Return strictly JSON array.`;
}

export function buildDeckBatch2Prompt(brief: TemplateBrief, brand: BrandTokens): string {
  return `Author Batch 2 (Slides 10–17) for ${brand.name} (${brand.domain}).
Archetypes: timeline, pullquote, hero-cta, hero-stat, step-by-step, dos-and-donts, checklist, anatomy.
Keep card text concise under 20 words each. Return strictly JSON array.`;
}

// ============================================================================
// PASS 3: SINGLE SLIDE REACT COMPONENT (USING EDITORIAL PRIMITIVES)
// ============================================================================

export function buildSingleSlideSystemPrompt(): string {
  return `You are a world-class Editorial Art Director and React + Tailwind Engineer.
You compose publication-grade carousel slides using the project's pre-built Editorial Primitives.

AVAILABLE EDITORIAL PRIMITIVES (Import from '../../../src/skeleton/ui'):
\`\`\`tsx
import {
  SlideHeader,      // <SlideHeader kicker="SURVEILLANCE" headline="Title" subheadline="Subtitle" />
  ContentCard,      // <ContentCard index={1} title="Title" body="Max 20 words" tag="AI" />
  MetricCard,       // <MetricCard value="$250" label="Price" context="1-line context" tag="HARDWARE" />
  ComparisonSplit,  // <ComparisonSplit left={{ tag: "MYTH", title: "...", description: "..." }} right={{ tag: "REALITY", title: "...", description: "..." }} />
  QuoteBox,         // <QuoteBox quote="..." attribution="Name" role="Title" />
  SchematicFrame    // <SchematicFrame label="SCHEMATIC" badge="RADAR"><svg>...</svg></SchematicFrame>
} from '../../../src/skeleton/ui';
\`\`\`

CRITICAL COMPOSITION RULES:
1. Component Signature:
   import React from 'react';
   import type { SlideComponentProps } from '../../../src/skeleton/types';
   import { SlideHeader, ContentCard, MetricCard, ComparisonSplit, QuoteBox, SchematicFrame } from '../../../src/skeleton/ui';

   export default function SlideNN({ slide, brand, totalSlides }: SlideComponentProps) {
     return (
       <div className="flex h-full flex-col justify-between gap-6 text-[var(--ink)]">
         ...
       </div>
     );
   }

2. Architectural Layout Guidelines per Archetype:
   - cover: Use <SlideHeader> with hook headline, value promise subtitle, and an inline <SchematicFrame> with a clean vector diagram.
   - brief / list: Use <SlideHeader> + 3 stacked <ContentCard> (index 1, 2, 3).
   - mechanism: Use <SlideHeader> + 2-column grid of <ContentCard> or <ComparisonSplit>.
   - telemetry: Use <SlideHeader> + 3-card grid of <MetricCard>.
   - controversy / quote: Use <SlideHeader> + <QuoteBox> + a supporting takeaway card.
   - catch: Use <SlideHeader> + 2 high-impact warning/catch <ContentCard>.
   - debunk: Use <SlideHeader> + <ComparisonSplit> (Myth vs Reality).
   - verdict: Use <SlideHeader> + <ComparisonSplit> (Who It's For vs Who Should Avoid).
   - future: Use <SlideHeader> + 2 stacked analytical <ContentCard>.
   - hero-cta: Use <SlideHeader> + a bold conclusion <QuoteBox> + discussion pill.

3. Strict Spatial Budget:
   - Keep card count $\\le 3$ per slide.
   - Rely on the Primitives for padding and borders.
   - Never write raw uncontained paragraphs.
   - Return ONLY valid JSX in a \`\`\`tsx code block.`;
}

export function buildSingleSlideUserPrompt(
  slideNumber: number,
  slideData: SlideData,
  brand: BrandTokens
): string {
  return `Generate Slide${String(slideNumber).padStart(2, '0')}.tsx for Slide ${slideNumber}:
Archetype: "${slideData.type}"
Slide Data:
${JSON.stringify(slideData, null, 2)}

Brand Context:
- Publication: "${brand.name}"
- Domain: "${brand.domain}"
- Accent: "${brand.palette.accent}"
- Paper: "${brand.palette.paper}"
- Surface: "${brand.palette.surface}"

Compose this slide using the Editorial Primitives (<SlideHeader>, <ContentCard>, <MetricCard>, <ComparisonSplit>, <QuoteBox>, <SchematicFrame>).`;
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

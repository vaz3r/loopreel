import type { BrandTokens, SlideData } from './skeleton/types.js';
import type { ArticleIntel } from './ingest.js';

export interface TemplateBrief {
  name?: string;
  vibe?: string;
  domain?: string;
  inspiration?: string;
  url?: string;
}

// ============================================================================
// STAGE 1: BRAND CONCEPT & DESIGN SYSTEM TOKENS
// ============================================================================

export function buildBrandSystemPrompt(): string {
  return `You are a legendary Creative Director at a premier editorial design agency (Pentagram, Wolff Olins, Monocle, Wired).
Your job is to establish a distinctive, bespoke design identity and visual tokens for a publication-grade carousel template.

CRITICAL RULES:
1. Palette must be unique and tailored to the topic. NEVER default to the same obsidian/cyan palette for every technology story!
   - Hardware / Industrial: Frosted aluminum (#F5F5F7), space graphite (#111318), sapphire blue (#0071E3) or international orange (#FF6700), crisp borders.
   - Investigative Broadsheet: Crisp paper (#FAF9F6), carbon ink (#18181B), vermilion (#E11D48), warm surfaces.
   - Clean Modernist: Pure white newsprint (#FFFFFF), deep midnight ink (#09090B), cadmium yellow (#EAB308) or emerald (#059669).
   - Cyber / Deep Infrastructure: Basalt black (#0B0F19), warm amber (#F59E0B) or electric violet (#8B5CF6).
2. Publication Name: Invent an art-directed editorial imprint name fitting the subject (e.g. "The Cupertino Ledger", "Silicon Index", "The Benchmark", "Hardware Quarterly", "The Dispatch"), NOT just the raw generic news scraper domain.
3. Typography: Select distinctive Google Fonts pairings from diverse families:
   - Modern Tech: 'Plus Jakarta Sans', 'Outfit', 'Cabinet Grotesk', 'Syne', 'Inter'
   - Broadsheet: 'Playfair Display', 'Instrument Serif', 'Newsreader', 'Fraunces'
   - Telemetry/Mono: 'JetBrains Mono', 'IBM Plex Mono', 'Space Mono', 'DM Mono'
4. Texture: 'washi' | 'grid' | 'dots' | 'blueprint' | 'none'.
5. Motif: 'seal' | 'crosshair' | 'coord' | 'bracket' | 'none'.
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

export function buildArticleBrandUserPrompt(article: ArticleIntel, _brief?: TemplateBrief): string {
  return `Analyze this journalism reporting and autonomously establish a 100% BESPOKE Publication Identity and Brand Tokens:

Article Title: "${article.title}"
Publisher / Source: "${article.publisher}"
Author: "${article.byline || 'Staff Bureau'}"
Summary Snippet:
${article.summary}

Creative Direction Guidance (AUTHENTIC CONTENT-DRIVEN DESIGN):
1. Publication Name ("name" and "wordmark"):
   Invent an evocative, art-directed editorial masthead suited to this exact beat (e.g. if Aerospace & Military: "The Orbital Dispatch", "Flight & Fleet", "The Launch Ledger"; if Mathematics: "The Mathematical Monograph"; if Energy/Climate: "The Global Commons", "Carbon & Capital"). Never repeat the generic news scraper domain.
2. Palette ("palette"):
   Autonomously derive the palette from the physical and emotional atmosphere of THIS content:
   - Aerospace / Defense / Military / Space: Deep mission-control stealth navy or space graphite paper (#0A1118, #0B1320, #0F172A), contrast ink (#F1F5F9), with high-visibility radar amber (#F59E0B) or signal gold/orange (#EA580C) accent, slate console surface (#162232), and titanium border (#334155).
   - Consumer Hardware / Gadgets: Frosted aluminum or anodized black (#F5F5F7, #121316), contrast ink (#1D1D1F, #F5F5F7), international orange (#C74416) or sapphire accent.
   - Pure Science / Mathematics: Archival parchment or blackboard slate (#FAF8F5, #18181B), deep ink, proof cobalt (#2563EB) or cinnabar (#DC2626) accent.
   - Global Energy / Macroeconomics: Financial salmon/sand (#F4E8D7) or deep slate, forest green (#059669) or crude oil black accent.
   CRITICAL ANTI-CLONING RULE: DO NOT default to off-white (#F5F5F7 or #F3F2EC) or safety orange (#C74416 or #BD401F) unless the story is literally consumer aluminum hardware!
3. Typography ("typography"):
   Choose a distinctive Google Fonts pairing with high editorial personality:
   - For Aerospace/Defense: 'Barlow Condensed' or 'Chivo' + 'Public Sans' or 'Inter' + 'IBM Plex Mono'.
   - For Science/Math: 'Newsreader' or 'Playfair Display' + 'Source Serif 4' + 'Space Mono'.
   - For Modern Tech: 'Plus Jakarta Sans' + 'Inter' + 'JetBrains Mono'.
   Provide a valid googleFontsUrl.
4. Motif ("motif") & Texture ("texture"):
   Choose a visual motif that symbolizes the subject:
   - "crosshair" for aerospace, defense, military targeting, satellite tracking.
   - "coord" for global geopolitics, latitude/longitude, maritime trade.
   - "seal" for academic proofs, official treaties, cultural monographs.
   - "bracket" for industrial dimensions, engineering tolerances.
   Texture: "blueprint" | "grid" | "dots" | "washi" | "none".
5. Wordmark Style: "serif" | "sans" | "mono" | "small-caps".

Return strictly valid JSON matching BrandTokens without markdown outside the json code block:
{
  "name": "Bespoke Publication Name",
  "slug": "bespoke-slug",
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
    "headlineFont": "Font Name",
    "bodyFont": "Font Name",
    "monoFont": "Font Name",
    "googleFontsUrl": "https://fonts.googleapis.com/css2?family=...&display=swap"
  },
  "wordmark": "PUBLICATION NAME",
  "wordmarkStyle": "sans",
  "handle": "@handle",
  "texture": "blueprint",
  "motif": "crosshair"
}`;
}

// ============================================================================
// STAGE 2: GROUND TRUTH FACT EXTRACTION (ZERO HALLUCINATION)
// ============================================================================

export interface GroundTruthDossier {
  articleTitle: string;
  publisher: string;
  byline: string;
  summary: string;
  entities: Array<{ name: string; type: string; role: string }>;
  verifiedMetrics: Array<{ value: string; label: string; context: string }>;
  verifiedQuotes: Array<{ quote: string; speaker: string; role: string; context: string }>;
  hardwareSpecs: {
    deviceA: { name: string; specs: string[]; price: string; availability: string };
    deviceB?: { name: string; specs: string[]; price: string; availability: string };
  };
  coreControversy: {
    corporateClaim: string;
    criticismOrAlarm: string;
    regulatoryOrHistoricalPrecedent: string;
  };
  hiddenCatchesAndLimits: string[];
  editorialVerdict: {
    avoidAdvice: string[];
    fitAdvice: string[];
  };
}

export function buildFactExtractionSystemPrompt(): string {
  return `You are a Lead Investigative Researcher and Fact-Checker at Reuters, ProPublica, and The New York Times.
Your mission is to extract verified ground truth from a news article into a structured GroundTruthDossier JSON.

CRITICAL FACT-CHECKING RULES:
1. ZERO HALLUCINATION: You must ONLY extract facts, quotes, specs, numbers, and precedents explicitly stated in the article.
2. Exact Metrics: Numbers, prices, dates, flight times, and retention days must be verbatim from the text.
3. Exact Quotes & Attribution: Attribute quotes only to the actual persons or organizations named in the piece (e.g. Amazon, FTC, EFF).
4. Extract Hardware Specs: Detail dimensions, battery life, camera resolution, flight limits, coverage area, and floor restrictions.
5. Extract Hidden Catches: Note subscriptions required, cloud dependencies, key retention policies, and FCC approval statuses.

Return strictly valid JSON matching this exact structure:
{
  "articleTitle": "Title of article",
  "publisher": "Publisher name",
  "byline": "Author name",
  "summary": "2-sentence factual summary",
  "entities": [{ "name": "Amazon", "type": "Company", "role": "Hardware creator" }],
  "verifiedMetrics": [{ "value": "$249.99", "label": "Drone Cam starting price", "context": "Target shipping Jan 2027" }],
  "verifiedQuotes": [{ "quote": "...", "speaker": "...", "role": "...", "context": "..." }],
  "hardwareSpecs": {
    "deviceA": { "name": "Ring Drone Cam", "specs": ["2K video", "148 deg FOV", "8 min flight"], "price": "$249.99", "availability": "Jan 27, 2027" },
    "deviceB": { "name": "Ring Rover Cam", "specs": ["4K livestream", "single floor", "5000 sq ft"], "price": "$999.99", "availability": "Dec 16, 2026" }
  },
  "coreControversy": {
    "corporateClaim": "Amazon claims privacy and security without compromise",
    "criticismOrAlarm": "EFF says TAKE falls short of end-to-end encryption",
    "regulatoryOrHistoricalPrecedent": "FTC 2023 complaint cited 55,000 compromised accounts and employee access"
  },
  "hiddenCatchesAndLimits": [
    "AI Pilot relies on cloud processing, not local-only",
    "Scheduled patrols require Ring Protect subscription",
    "Rover cannot climb stairs or cross thresholds > 1.375 in"
  ],
  "editorialVerdict": {
    "avoidAdvice": ["Privacy-first homes requiring local-only processing"],
    "fitAdvice": ["Single-floor business facilities needing mobile patrols"]
  }
}`;
}

export function buildFactExtractionUserPrompt(article: ArticleIntel): string {
  return `Extract the complete, verified GroundTruthDossier from this article:
Title: "${article.title}"
Publisher: "${article.publisher}"
Author: "${article.byline || 'Staff Bureau'}"

Raw Article Text:
${article.cleanText.slice(0, 14000)}

Output strictly the GroundTruthDossier JSON.`;
}

export function buildTopicResearchSystemPrompt(): string {
  return `You are a Lead AI Research Analyst at SemiAnalysis, Epoch AI, and MIT Technology Review.
Your task is to compile a verified, highly accurate GroundTruthDossier for an in-depth editorial topic.

CRITICAL RULES:
1. Grounded Technical Reality: Use real, verified technical facts, actual model names, verified benchmark scores (e.g. MMLU, GSM8K, MATH), exact hardware specs (H100/H800 cluster sizes, active vs total parameters), and published research innovations (Multi-head Latent Attention, DeepSeekMoE, GRPO).
2. Exact Metrics: Training cost figures, parameter counts, context window sizes, and API pricing per million tokens.
3. Real Industry Context: Real companies, researchers, and market reactions (OpenAI, DeepSeek, Meta Llama, US export controls).

Return strictly valid JSON matching GroundTruthDossier without markdown outside the json block.`;
}

export function buildTopicResearchUserPrompt(brief: TemplateBrief): string {
  return `Compile the GroundTruthDossier for this editorial exploration:
Topic/Name: "${brief.name || 'AI Frontier & Open Weights'}"
Domain: "${brief.domain || 'Artificial Intelligence / Open Weights / Frontier Compute'}"
Vibe/Angle: "${brief.vibe || 'The open-source revolution, reasoning models (DeepSeek-R1), and the collapse of proprietary AI moats'}"
Inspiration: "${brief.inspiration || 'SemiAnalysis, Epoch AI, MIT Technology Review, Wired'}"

Output strictly the GroundTruthDossier JSON.`;
}

// ============================================================================
// STAGE 3: EDITORIAL STRATEGY & HOOK FORMULATION
// ============================================================================

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

export function buildStoryStrategySystemPrompt(): string {
  return `You are the Editor-in-Chief at Wired, The New York Times Magazine, and Vox.
Your mission is to transform verified facts into a scroll-stopping, high-signal editorial carousel strategy.

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
   - Ground strictly in the provided GroundTruthDossier.

Return strictly valid JSON matching StoryStrategy.`;
}

export function buildStoryStrategyUserPrompt(
  dossier: GroundTruthDossier,
  _article?: ArticleIntel
): string {
  return `Formulate the EditorialStrategy using this verified ground truth:
Article: "${dossier.articleTitle}" (${dossier.publisher})
Summary: "${dossier.summary}"
Controversy: ${JSON.stringify(dossier.coreControversy)}
Specs: ${JSON.stringify(dossier.hardwareSpecs)}
Metrics: ${JSON.stringify(dossier.verifiedMetrics)}
Catches: ${JSON.stringify(dossier.hiddenCatchesAndLimits)}

Output strictly the StoryStrategy JSON.`;
}

// ============================================================================
// STAGE 4: SENIOR COPY EDITOR & LAYOUT ARCHITECT (LOCKED STORYBOARD + VISUAL STYLES)
// ============================================================================

export function buildStoryDeckSystemPrompt(): string {
  return `You are a Senior Copy Editor and Visual Layout Architect at Wired, Bloomberg Businessweek, and The New York Times Graphics Desk.
You author high-signal editorial carousel content with STRICT word budgets and AUTONOMOUSLY CHOOSE THE VISUAL STYLE & SVG BLUEPRINT FOR EACH SLIDE.

CRITICAL CONTENT, LAYOUT & ANTI-OVERFLOW RULES:
1. ZERO HALLUCINATION: All copy and numerical data must derive strictly from the provided GroundTruthDossier.
2. CONTENT-DRIVEN VISUAL STYLE PER SLIDE:
   For EACH slide, you MUST choose a bespoke visual style and spatial topology directly reflecting what that slide communicates:
   - "visualStyle": e.g. "orbital-trajectory-hero", "asymmetric-capital-split", "horizontal-cadence-gantt", "hud-radar-reticle", "monumental-editorial-split", "stepped-ladder-matrix".
   - "layoutTopology": Spatial architecture (e.g. "hero-diagram-with-callouts", "left-metric-placard-right-stack", "horizontal-timeline-cadence", "hud-sensor-split", "full-height-editorial-split").
   - "svgBlueprint": Detailed instruction for the custom inline vector SVG diagram to render on this slide.
   CRITICAL TOPOLOGY DIVERSITY MANDATE: You MUST use at least 5 different layout topologies across the 10 slides. Strictly ban repeating the same 2-card layout across multiple slides!
3. DYNAMIC ARCHETYPE SELECTION (Tailored to the Story):
   Dramatize this specific journalistic story across 10 slides (e.g. cover, procurement-split, demand-curve, transition-timeline, vehicle-matrix, infrastructure-map, unit-economics, critical-bottleneck, leadership-debrief, strategic-cta).
4. RULE OF 3 ANTI-CRAMMING (Prevent Overcrowding):
   - MAXIMUM 2 to 3 items per slide! Never cram 4 or 5 items onto one slide.
   - Telemetry: Exactly 2 or 3 key metrics with signed numerical badges (e.g. "$5.6B", "2028", "2033", "+35%").
   - Comparisons: Exactly 2 contrasting entities.
5. STRICT WORD LIMITS (Anti-Overflow Guardrail):
   - Headlines: Maximum 6–8 words.
   - Subheadlines: Maximum 12–14 words.
   - Cards / Points: Maximum 10–13 words per item! Every word must be punchy and high-signal.
   - Telemetry Values: MUST be strictly numerical or signed badge.

Return strictly a JSON array of 10 slide objects:
[
  {
    "id": "slide-1",
    "index": 0,
    "type": "cover",
    "kicker": "...",
    "headline": "...",
    "subheadline": "...",
    "visualStyle": "full-bleed-trajectory-hero",
    "layoutTopology": "hero-diagram-with-callouts",
    "svgBlueprint": "Elliptical orbital trajectory arc with dashed apogee burns and coordinate markers"
  },
  ...
]`;
}

export function buildStoryDeckUserPrompt(
  strategy: StoryStrategy,
  dossier: GroundTruthDossier,
  brand: BrandTokens
): string {
  return `Author the 10-slide narrative storyboard AND choose the distinct visual style, layout topology, and SVG blueprint for each slide:

Publication: "${brand.name}" (${brand.domain})
Palette: Paper ${brand.palette.paper}, Ink ${brand.palette.ink}, Accent ${brand.palette.accent}, Surface ${brand.palette.surface}
Hook Headline: "${strategy.hookHeadline}"
Value Promise: "${strategy.valuePromise}"
Kicker: "${strategy.kicker}"
Core Conflict: "${strategy.coreConflict}"
Hidden Catch: "${strategy.hiddenCatch}"
Verdict: "${strategy.verdict}"

Verified Dossier:
Hardware: ${JSON.stringify(dossier.hardwareSpecs)}
Metrics: ${JSON.stringify(dossier.verifiedMetrics)}
Quotes: ${JSON.stringify(dossier.verifiedQuotes)}
Catches: ${JSON.stringify(dossier.hiddenCatchesAndLimits)}
Verdict Advice: ${JSON.stringify(dossier.editorialVerdict)}

Output strictly the JSON array of 10 slide objects. Remember: MAX 18 WORDS PER CARD BODY, AND CHOOSE DIVERSE LAYOUT TOPOLOGIES!`;
}

// Fallback for non-article briefs
export function buildDeckSystemPrompt(): string {
  return `You are an Executive Editor authoring high-density editorial carousel content.
Rules: Zero corporate filler, concise statements (max 20 words per card body), strict numerical telemetry.
Return strictly valid JSON array of slide objects.`;
}

export function buildDeckBatch1Prompt(_brief: TemplateBrief, brand: BrandTokens): string {
  return `Author Batch 1 (Slides 1–9) for ${brand.name} (${brand.domain}).
Archetypes: cover, list, image-split, telemetry, dialogue, quadrant, case-study, debunk, grid.
Keep card text concise under 20 words each. Return strictly JSON array.`;
}

export function buildDeckBatch2Prompt(_brief: TemplateBrief, brand: BrandTokens): string {
  return `Author Batch 2 (Slides 10–17) for ${brand.name} (${brand.domain}).
Archetypes: timeline, pullquote, hero-cta, hero-stat, step-by-step, dos-and-donts, checklist, anatomy.
Keep card text concise under 20 words each. Return strictly JSON array.`;
}

// ============================================================================
// STAGE 5: VISUAL ART DIRECTOR (SPATIAL LAYOUT & SVG BLUEPRINT)
// ============================================================================

export interface SlideDesignBlueprint {
  slideId: string;
  type: string;
  layoutStructure: string;
  svgConcept?: {
    description: string;
    type: 'floorplan' | 'schematic' | 'telemetry-bars' | 'contrast-icons' | 'spatial-glyphs' | 'none';
    elements?: string[];
  };
  typographyScale?: {
    headlineSize: string;
    subtitleSize?: string;
  };
  accentPlacement?: string;
  spatialBalanceGuidance?: string;
}

export function buildVisualBlueprintSystemPrompt(): string {
  return `You are an Information Designer and Art Director at Pentagram, Monocle, and The New York Times Graphics Desk.
Your task is to plan the visual layout architecture and bespoke vector SVG concept for each slide in a carousel deck.

CRITICAL VISUAL DESIGN PRINCIPLES:
1. Bespoke Vector Art:
   - Slide 1 (Cover): Conceptual floor plan showing rooms and dashed patrol routes, or hardware blueprint.
   - Slide 2 (Brief): Custom spatial glyphs or boundary threshold markers for each item.
   - Slide 3 (Hardware Specs): Drone elevation cross-section vs Rover periscope diagram.
   - Slide 4 (Telemetry): Custom data visualization bars or metric ratio indicators.
2. Space Balance:
   - Every slide must fill 75%–90% of the vertical frame organically.
   - Avoid top-heavy clumping. If content is short, center it optically with generous line heights and large typography.
   - Multi-item slides must use equal height distribution or balanced multi-column grids.

Return strictly a JSON array of 10 SlideDesignBlueprint objects: [ { "slideId": "slide-1", ... }, ... ]`;
}

export function buildVisualBlueprintUserPrompt(
  slides: SlideData[],
  brand: BrandTokens,
  dossier: GroundTruthDossier
): string {
  return `Design the visual blueprints for these 10 slides:
Publication: "${brand.name}" (${brand.domain})
Palette: Accent ${brand.palette.accent}, Paper ${brand.palette.paper}, Surface ${brand.palette.surface}
Hardware: ${JSON.stringify(dossier.hardwareSpecs)}

Slides Content:
${JSON.stringify(slides, null, 2)}

Output strictly the JSON array of 10 SlideDesignBlueprint objects.`;
}

// ============================================================================
// STAGE 6: PRINCIPAL REACT ENGINEER (BESPOKE CODE GENERATION)
// ============================================================================

export function buildSingleSlideSystemPrompt(platform = 'instagram-feed'): string {
  const isStories = platform === 'instagram-stories';
  const isSquare = platform === 'instagram-square';
  const canvasWidth = 1080;
  const canvasHeight = isStories ? 1920 : isSquare ? 1080 : 1350;
  const safeAreaDesc = isStories
    ? '1080x1920 canvas (9:16 vertical stories format), 952x1596 safe area'
    : isSquare
    ? '1080x1080 canvas (1:1 square format), 952x758 safe area'
    : '1080x1350 canvas (4:5 portrait format), 952x1028 safe area';

  return `You are a world-class Frontend Engineer and Editorial Art Director (Pentagram, Wired, The New York Times, Monocle).
You write bespoke React TypeScript components using pure Tailwind CSS for publication-grade carousel slides (${safeAreaDesc}).

CRITICAL DESIGN & CODING RULES:
1. Component Signature:
   import React from 'react';
   import type { SlideComponentProps } from '../../../src/skeleton/types';

   export default function SlideNN({ slide, brand, totalSlides }: SlideComponentProps) {
     return ( ... );
   }

2. Creative Freedom & Architectural Topology:
   - You MUST implement the specific "Visual Style", "Layout Topology", and "Bespoke SVG Blueprint" assigned to this slide!
   - STRICT BAN ON REPETITIVE 2-CARD LAYOUTS: Do NOT just render two rounded rectangles with text. If the layout topology says "hero-diagram-with-callouts", render a prominent custom inline vector SVG taking 40%-60% of the space with callout pointers. If it says "horizontal-timeline-cadence", render a multi-year horizontal Gantt timeline. If it says "hud-sensor-split", render a radar/target crosshair overlay.
   - Author rich inline SVGs with crisp viewBoxes (e.g. orbital paths, launch trajectories, pad coordinates, timeline milestones, HUD reticles).

3. Theme & Token Integration:
   - Use Tailwind utility classes with CSS variables:
     * text-[var(--ink)] for primary text
     * text-[var(--accent)] or bg-[var(--accent)] for focal points, badges, highlights
     * bg-[var(--surface)] for card backgrounds and elevation
     * border-[var(--border)] for hairlines and borders
     * font-[var(--font-headline)] for titles, quotes, hero numbers
     * font-[var(--font-body)] for body copy and descriptions
     * font-[var(--font-mono)] for metrics, tags, numbers

4. MOBILE INSTAGRAM LEGIBILITY (0.36x Phone Scaling Law):
   When viewed on a smartphone (390px mobile Instagram / LinkedIn viewport), canvas elements scale down by 0.36x.
   - TEXT UNDER 20px IS STRICTLY FORBIDDEN!
     * NEVER use 'text-xs' (12px), 'text-sm' (14px), 'text-base' (16px), or 'text-lg' (18px) for readable content!
     * On a phone screen, 14px becomes 5.0px (unreadable), and 18px becomes 6.5px (squinting).
   - MANDATORY FONT SIZE SCALE:
     * Body copy & descriptions: MUST be text-[24px] to text-[28px] (leading-snug / leading-normal).
     * Card / section titles: MUST be text-[32px] to text-[38px] (font-semibold).
     * Kickers, badges, tags, metadata: MUST be text-[20px] to text-[22px] (font-mono tracking-wider).
     * Major headlines: MUST be text-[52px] to text-[68px] (font-headline font-bold).
     * Monumental hero metrics: text-[84px] to text-[112px] (font-mono font-bold).

5. ZERO-OVERFLOW & NATURAL FLOW (Ban overflow-hidden):
   - The interior safe area is strictly ${isStories ? '952px wide by 1596px high' : isSquare ? '952px wide by 758px high' : '952px wide by 1028px high'}.
   - NEVER put 'overflow-hidden' on the top-level <section>! 'overflow-hidden' clips content and conceals overflow.
   - Outer wrapper signature: className="flex flex-col h-full min-h-0 w-full text-[var(--ink)]"
   - Multi-card grids: Use 'gap-5' or 'gap-6', card padding 'py-5 px-7' or 'py-6 px-8'.
   - Limit items to 2 or 3 per slide so the larger 24px-28px body text fits effortlessly without overflow.
   - AutoFit scale MUST remain 1.000 (no scaling needed).
   - Always respect the locked text provided—do not invent new text or exceed word counts.

6. Technical Constraints:
   - Output ONLY self-contained React TypeScript JSX in a \`\`\`tsx code block.
   - Pure Tailwind and SVG only (NO external icon libraries, no lucide-react).
   - Do NOT output the outer ${canvasWidth}x${canvasHeight} wrapper or header/footer—SlideFrame provides those.`;
}

export function buildSingleSlideUserPrompt(
  slideNumber: number,
  slideData: SlideData,
  blueprint: SlideDesignBlueprint | undefined,
  brand: BrandTokens
): string {
  const chosenStyle = slideData.visualStyle || blueprint?.layoutStructure || 'bespoke-editorial';
  const chosenTopology = slideData.layoutTopology || blueprint?.layoutStructure || 'hero-diagram-with-callouts';
  const chosenSvg = slideData.svgBlueprint || blueprint?.svgConcept?.description || 'Custom inline vector SVG matching topic';

  return `Generate the bespoke React + Tailwind component for Slide ${slideNumber}:
Archetype: "${slideData.type}"

Slide Data (Locked Copy):
${JSON.stringify(slideData, null, 2)}

CHOSEN VISUAL ARCHITECTURE & BLUEPRINT:
- Visual Style: "${chosenStyle}"
- Layout Topology: "${chosenTopology}"
- Bespoke Vector SVG: "${chosenSvg}"
Follow this layout topology strictly! Do NOT revert to generic rounded cards.

Brand Context:
- Publication: "${brand.name}"
- Domain: "${brand.domain}"
- Accent: "${brand.palette.accent}"
- Paper: "${brand.palette.paper}"
- Surface: "${brand.palette.surface}"
- Border: "${brand.palette.border}"

Write the complete Slide${String(slideNumber).padStart(2, '0')}.tsx component.`;
}

// ============================================================================
// STAGE 7: COMPILER ERROR SELF-HEALING
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

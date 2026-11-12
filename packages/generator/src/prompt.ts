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
  return `You are a Lead Investigative Researcher and Fact-Checker at Reuters, ProPublica, The Economist, and The New York Times.
Your mission is to extract verified ground truth from reporting into a structured GroundTruthDossier JSON.

CRITICAL FACT-CHECKING & JOURNALISTIC EXCELLENCE RULES:
1. ZERO HALLUCINATION & ZERO META-COMMENTARY:
   - Extract actual reported events, timeline dates, verified numbers, official claims, and dissenting perspectives.
   - STRICTLY FORBIDDEN: Writing meta-critique of the source text (e.g. NEVER write "No hardware products supplied", "The supplied text ends mid-citation", "Dossier labels do not establish verification", or "sentence marked [update]"). Focus 100% on the factual subject matter!
2. Domain-Adaptive Truth Extraction:
   - For Geopolitical / Investigative News: Extract major actors/nations, chronological dates/milestones, official statements vs intelligence assessments, verified casualty/financial numbers, diplomatic efforts, and systemic consequences.
   - For Technology / Hardware: Extract exact specifications, pricing, battery life, release dates, cloud dependencies, and privacy limits.
   - For Markets / Business: Extract valuations, revenue/spending metrics, regulatory filings, and market impacts.
3. Exact Metrics: Numbers, percentages, financial amounts, dates, and troop/casualty counts must be verbatim from the text.
4. Exact Quotes & Attribution: Attribute quotes only to the actual persons or organizations named in the piece.

Return strictly valid JSON matching this exact structure:
{
  "articleTitle": "Title of article",
  "publisher": "Publisher name",
  "byline": "Author name",
  "summary": "2-sentence factual editorial summary of the subject matter",
  "entities": [{ "name": "Entity Name", "type": "Country | Organization | Person | Company", "role": "Factual role in the event" }],
  "verifiedMetrics": [{ "value": "$47.1B", "label": "Military spending estimate", "context": "Department of Defense figure" }],
  "verifiedQuotes": [{ "quote": "...", "speaker": "...", "role": "...", "context": "..." }],
  "hardwareSpecs": {
    "deviceA": { "name": "Key Entity or Program A", "specs": ["Factual parameter 1", "Factual parameter 2"], "price": "Metric / Budget / N/A", "availability": "Date / Timeline / N/A" }
  },
  "coreControversy": {
    "corporateClaim": "Primary official assertion, government rationale, or executive statement",
    "criticismOrAlarm": "Opposing intelligence assessment, international criticism, or counter-evidence",
    "regulatoryOrHistoricalPrecedent": "Key historical treaties, resolutions, or precedents cited"
  },
  "hiddenCatchesAndLimits": [
    "High-signal caveat or tension 1 directly about the subject matter",
    "High-signal caveat or tension 2 directly about the subject matter"
  ],
  "editorialVerdict": {
    "avoidAdvice": ["Critical strategic or policy risk"],
    "fitAdvice": ["Essential factual takeaway"]
  }
};`;
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
  return `You are a Senior Editor and Visual Layout Architect at The Economist, Wired, and The New York Times Magazine.
You author high-signal editorial carousel content with STRICT word budgets and AUTONOMOUSLY CHOOSE THE VISUAL STYLE & SVG BLUEPRINT FOR EACH SLIDE.

CRITICAL CONTENT, EDITORIAL VOICE & LAYOUT RULES:
1. AUTHORITATIVE EDITORIAL PROSE (NO ROBOTIC META-COMMENTARY):
   - Every slide must read like an elite art-directed broadsheet publication.
   - STRICTLY FORBIDDEN: Writing robotic meta-phrases like "The article states...", "The supplied text...", "The account describes...", "The article contrasts...", "sentence marked [update]", or "publisher and byline are user-provided".
   - State the facts, historical milestones, tensions, and implications directly with active, compelling journalistic prose!
2. DEDICATED SLIDE 1 COVER ARCHETYPE ("monumental-editorial-cover"):
   - Slide 1 is an ICONIC MAGAZINE COVER, NOT an internal technical schematic!
   - Must have "layoutTopology": "monumental-editorial-cover".
   - Must feature a bold, monumental headline (52px–72px), topic kicker badge, compelling narrative subheadline, and publication issue / reading time telemetry badge (e.g. "SPECIAL REPORT · 10 SLIDES").
   - STRICT BAN ON COVER DIAGRAMS: Do NOT put complex flowcharts, multiple callout boxes, or sprawling schematic diagrams on Slide 1!
3. DIVERSE CONTENT-DRIVEN TOPOLOGIES FOR SLIDES 2–10:
   - "layoutTopology" must suit 9:16 vertical storytelling:
     * "ascending-stepped-timeline" or "vertical-milestone-spine" for chronological developments
     * "full-height-editorial-split" for opposing claims, dual intelligence timelines, or entity comparisons
     * "hero-metric-placard" for monumental statistics (e.g. "$47.1B") with editorial footnote cards
     * "three-row-verification-ledger" for structured registers or institutional positions
     * "asymmetric-editorial-cards" for contrasting strategic fronts
   - STRICT TOPOLOGY DIVERSITY MANDATE: You MUST use at least 5 different layout topologies across the 10 slides.
4. RULE OF 3 ANTI-CRAMMING:
   - Maximum 2 to 3 items per slide! Never cram 4 or 5 items onto one slide.
   - Telemetry: Exactly 2 or 3 key metrics with signed numerical badges (e.g. "$47.1B", "2026", "2035", "+18%").
5. STRICT WORD LIMITS (Anti-Overflow Guardrail):
   - Headlines: Maximum 6–8 words.
   - Subheadlines: Maximum 10–14 words.
   - Cards / Points: Maximum 12–16 words per item! Every word must be punchy and high-signal.

Return strictly a JSON array of 10 slide objects:
[
  {
    "id": "slide-1",
    "index": 0,
    "type": "cover",
    "kicker": "GEOPOLITICS / IN FOCUS",
    "headline": "War During Nuclear Talks",
    "subheadline": "How strategic miscalculations unravelled regional deterrence across the Middle East.",
    "visualStyle": "monumental-editorial-cover",
    "layoutTopology": "monumental-editorial-cover",
    "svgBlueprint": "Clean Swiss architectural rule with minimal geometric focal emblem"
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
   - Do NOT output the outer ${canvasWidth}x${canvasHeight} wrapper or header/footer—SlideFrame provides those.

7. MANDATORY ARRAY DATA BINDING (BAN UNINDEXED ARRAY ACCESS):
   - In 'SlideData', 'slide.items' is an ARRAY of objects (e.g. [{ label: "...", body: "..." }, { label: "...", body: "..." }]).
   - If rendering separate cards, columns, or rows by position, you MUST access items by index:
     * CORRECT:
       const items = slide.items ?? [];
       const item0 = items[0];
       const item1 = items[1];
       // then render:
       <h2>{item0?.label || item0?.title}</h2>
       <p>{item0?.body}</p>
       <h2>{item1?.label || item1?.title}</h2>
       <p>{item1?.body}</p>
     * STRICTLY FORBIDDEN: Writing '{items?.label}' or '{items?.body}'! In JavaScript, an Array object has NO .label or .body property. Doing so evaluates to undefined and leaves the card completely BLANK!
   - WHEN CREATING HELPER ARRAYS (e.g. columns, stages, rows):
     * You MUST index elements individually:
       const stages = [
         { card: cards[0], metric: telemetry[0], offset: 'ml-[224px]' },
         { card: cards[1], metric: telemetry[1], offset: 'ml-[112px]' },
         { card: cards[2], metric: telemetry[2], offset: 'ml-0' },
       ];
     * NEVER write '{ card: cards }' or '{ item: items }' or '{ metric: telemetry }' or 'const item0 = items;'! Passing an Array object instead of an element causes TypeScript failure: "Property 'title' does not exist on type 'Item[]'".
   - If mapping dynamically:
     {items.map((item: any, index: number) => (
       <div key={index}>
         <h2>{item.label || item.title}</h2>
         <p>{item.body}</p>
       </div>
     ))}

8. COVER SLIDE DEDICATED ARCHITECTURE (Slide 1):
   - If slide.type === 'cover' or slideNumber === 1:
     * Render an iconic broadsheet magazine cover layout!
     * Topic Kicker badge (font-mono uppercase tracking-[0.16em] text-[var(--accent)]).
     * Monumental headline (56px–72px, leading-[1.02] tracking-[-0.04em]).
     * Narrative subheadline (26px–30px, leading-snug).
     * Reading telemetry badge (e.g. 'SPECIAL REPORT · 10 SLIDES').
     * Subtle Swiss architectural hairline, border, or minimal geometric focal mark.
     * STRICT BAN ON COVER DIAGRAMS: Do NOT render technical flowcharts, callout boxes, or complex multi-node graphs on Slide 1!

9. UNIFIED SVG & HTML COORDINATES (No Disconnected Callout Lines):
   - NEVER draw hardcoded SVG connector lines pointing to disconnected HTML absolute <div>s!
   - Use HTML flex/grid cards with inline SVG accent marks or unified layout.
   - BAN <foreignObject> inside SVGs: It causes text clipping, font-rendering glitches, and layout failure. Use pure Tailwind flex/grid cards for copy.

10. SPACE BALANCE RULE (75%–90% Frame Utilization):
   - For 9:16 vertical stories (1596px safe area), distribute content vertically with balance:
     * Card padding: 'p-7' to 'p-10' (or 'px-8 py-7').
     * Vertical gaps between sections: 'gap-7' to 'gap-10'.
     * Avoid massive empty voids (e.g. do NOT leave 800px of white space below a single short paragraph).`;
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

Common Fix Guidelines:
1. "Property 'value' does not exist on type '...[]'" or "Property 'title' does not exist on type '...[]'":
   - An entire array was assigned where a single object was expected.
   - If stages/columns are declared: change \`{ card: cards, metric: telemetry }\` to \`{ card: cards[0], metric: telemetry[0] }\`, etc.
   - If numbered variables are declared: change \`const item0 = items;\` to \`const item0 = items[0];\`
   - If accessed in JSX: change \`{telemetry?.value}\` to \`{telemetry?.[0]?.value}\` or map over the array.
2. "Identifier expected":
   - Check for dangling optional chaining or unclosed syntax (e.g. \`telemetry?.;\` -> \`telemetry?.[0];\`).

Fix all syntax and type errors completely. Return ONLY the corrected code in a \`\`\`tsx code block.`;
}

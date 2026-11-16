import type { BrandTokens, DeckData, SlideData } from './skeleton/types.js';
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

export interface SystemMechanismStep {
  step: number;
  title: string;
  description: string;
}

export interface EntityComparison {
  entityA: string;
  entityB: string;
  dimension: string;
  metricA: string;
  metricB: string;
  takeaway: string;
}

export interface GroundTruthDossier {
  articleTitle: string;
  publisher: string;
  byline: string;
  summary: string;
  entities: Array<{ name: string; type: string; role: string }>;
  verifiedMetrics: Array<{ value: string; label: string; context: string }>;
  verifiedQuotes: Array<{ quote: string; speaker: string; role: string; context: string }>;
  systemMechanisms?: SystemMechanismStep[];
  comparisons?: EntityComparison[];
  hardwareSpecs?: {
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
3. Exact Quotes & Attribution: Attribute quotes only to the actual persons or organizations named in the piece (e.g. FAA, DOT, Airlines).
4. System Mechanisms & Catches: Extract step-by-step operations, dependencies, failure risks, and key restrictions.

Return strictly valid JSON matching this schema:
{
  "articleTitle": "string",
  "publisher": "string",
  "byline": "string",
  "summary": "string (concise 2-3 sentence overview)",
  "verifiedMetrics": [
    { "value": "string (e.g. 1970s, 45,000, $5B)", "label": "string", "context": "string" }
  ],
  "verifiedQuotes": [
    { "quote": "string", "speaker": "string", "role": "string", "context": "string" }
  ],
  "systemMechanisms": [
    { "stepNumber": 1, "title": "string", "description": "string", "operationalDetail": "string" }
  ],
  "comparisons": [
    { "entityA": "string", "entityB": "string", "dimension": "string", "metricA": "string", "metricB": "string", "takeaway": "string" }
  ],
  "coreControversy": {
    "corporateClaim": "string",
    "criticismOrAlarm": "string",
    "regulatoryOrHistoricalPrecedent": "string"
  },
  "hiddenCatchesAndLimits": ["string"]
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
  return `You are a Senior Forensic Research Analyst and Investigative Journalist at Bloomberg, Financial Times, ProPublica, and The New York Times Graphics Desk.
Your task is to compile a deeply verified, highly accurate, concrete GroundTruthDossier for an in-depth editorial topic.

CRITICAL RESEARCH RULES:
1. CONCRETE QUANTITATIVE FIGURES (Mandatory):
   - You MUST extract or synthesize 8 to 12 exact, real-world numerical figures with exact units and historical context.
   - For financial / business models (e.g. Starbucks, airlines, chipmakers): extract total deposit/float size (e.g. "$1.81B"), annual breakage revenue (e.g. "$196M"), percentage of transactions (e.g. "53%"), member count (e.g. "31M"), interest paid (e.g. "0.00% APR"), and comparative rank (e.g. "Larger than 85% of US banks").
   - For technology / infrastructure: extract cluster sizes, benchmark scores, training compute budgets, pricing per token, power draw, and market share.
2. SYSTEM MECHANISMS (How the Machine Works):
   - Provide a step-by-step operational sequence ("systemMechanisms") breaking down how value, capital, data, or materials circulate through the system from initial customer action to final corporate extraction.
3. BENCHMARK COMPARISONS:
   - Provide concrete entity comparisons ("comparisons") contrasting the subject against traditional peers or regulated baselines (e.g. Starbucks $1.81B vs Customers Bancorp $1.52B, Central Bancompany $1.48B).
4. CONTROVERSY, PRECEDENTS & LOOPHOLES:
   - Detail the regulatory loophole or legal arbitrage (e.g. Dodd-Frank stored-value exemption, non-FDIC status, state escheatment/abandoned property tax treatment).
   - Real criticism or alarms raised by consumer groups, regulators, or market analysts.

Return strictly valid JSON matching GroundTruthDossier without markdown outside the json block.`;
}

export function buildTopicResearchUserPrompt(brief: TemplateBrief): string {
  return `Compile the comprehensive GroundTruthDossier for this editorial exploration:
Topic / Brief: "${brief.name || 'Financial & Industrial Intelligence'}"
Content Domain: "${brief.domain || 'Corporate Finance / Regulatory Arbitrage / Modern Business Models'}"
Editorial Angle / Vibe: "${brief.vibe || 'Investigative forensic audit of hidden operational mechanics and financial engineering'}"
Inspiration / Style: "${brief.inspiration || 'Bloomberg Businessweek, Financial Times, ProPublica, Visual Capitalist'}"

Output strictly the GroundTruthDossier JSON with at least 8 concrete metrics, step-by-step mechanisms, and benchmark comparisons.`;
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
  storySpine?: Array<{ slideIndex: number; role: string; theme: string }>;
}

export function buildStoryStrategySystemPrompt(): string {
  return `You are the Editor-in-Chief at Bloomberg Businessweek, Wired, and The New York Times Magazine.
Your mission is to transform verified facts into a scroll-stopping, high-signal 7-beat editorial carousel strategy.

CRITICAL HOOK & NARRATIVE PRINCIPLES:
1. THE SCROLL-STOPPING HOOK (Slide 1):
   - Never use passive corporate titles or dry summaries (e.g. "Analysis of FAA systems" is STRICTLY BANNED).
   - Use the tension formula: [The Shocking Core Paradox] + [The Surprising Scale or Hidden Catch].
   - Examples of great hooks:
     * "The 0% Interest Bank Disguised as a Coffee Shop"
     * "How Starbucks Built a $1.8B Unregulated Float Larger Than 85% of American Banks"
     * "America's Air Traffic Runs on 1970s Floppy Disks and Aging Mainframes"
2. THE 7-BEAT NARRATIVE ARC:
   - Slide 1: The Core Paradox / Hook
   - Slide 2: The Scale & Systemic Baseline
   - Slide 3: The Benchmark Scale Comparison (contrasting traditional peers or modern standards)
   - Slide 4: The Operational Step Mechanics / System Pipeline
   - Slide 5: The Compounding Risk / Hidden Catch / Failure Point
   - Slide 6: The Regulatory Arbitrage / Compliance Perimeter / Technical Debt Audit
   - Slide 7: The Strategic Takeaway / Future Verdict
3. ZERO FOURTH-WALL BREAKING:
   - NEVER comment on the prompt itself. NEVER write meta-criticism like "The dossier has no metrics" or "A story without data".
   - You are publishing directly to a discerning, executive audience of millions.

OUTPUT FORMAT:
Return strictly a valid JSON object matching this exact schema:
{
  "hookHeadline": "Monumental, scroll-stopping headline capturing the paradox (max 8 words)",
  "valuePromise": "What high-value operational insight the reader gains (max 12 words)",
  "kicker": "2-3 word uppercase editorial kicker (e.g. SYSTEM ARCHITECTURE AUDIT)",
  "coreConflict": "The core systemic paradox or operational collision",
  "hiddenCatch": "The hidden catch, systemic vulnerability, or technical debt trap",
  "verdict": "The definitive strategic takeaway or forward-looking verdict",
  "keyMetrics": [
    { "value": "string", "label": "string", "context": "string" }
  ],
  "keyQuotes": [
    { "quote": "string", "speaker": "string", "role": "string" }
  ]
}`;
}

export function buildStoryStrategyUserPrompt(
  dossier: GroundTruthDossier,
  _brief?: TemplateBrief,
  _article?: ArticleIntel
): string {
  return `Formulate the EditorialStrategy using this verified ground truth:
Topic / Article: "${dossier.articleTitle}" (${dossier.publisher})
Summary: "${dossier.summary}"
Controversy: ${JSON.stringify(dossier.coreControversy)}
Metrics: ${JSON.stringify(dossier.verifiedMetrics)}
Mechanisms: ${JSON.stringify(dossier.systemMechanisms || [])}
Comparisons: ${JSON.stringify(dossier.comparisons || [])}
Catches: ${JSON.stringify(dossier.hiddenCatchesAndLimits)}

Output strictly the StoryStrategy JSON.`;
}

// ============================================================================
// STAGE 4: SENIOR COPY EDITOR & LAYOUT ARCHITECT (LOCKED STORYBOARD + VISUAL STYLES)
// ============================================================================

export function buildStoryDeckSystemPrompt(): string {
  return `You are a Senior Copy Editor and Visual Layout Architect at Wired, Bloomberg Businessweek, and The New York Times Graphics Desk.
You author high-signal editorial carousel content with STRICT word budgets. The SVG art is the central hero, so all copy must be lean, razor-sharp, and punchy!

CRITICAL CONTENT & ANTI-OVERFLOW RULES:
1. ZERO HALLUCINATION: All copy and numerical data must derive strictly from the provided GroundTruthDossier.
2. NARRATIVE 7-SLIDE ARC:
   - Slide 1 (type: "cover"): Hook, core paradox, monumental headline, hero optic/telemetry badge or diagram.
   - Slide 2 (type: "context"): The scale, volume, customer inflow, or systemic baseline.
   - Slide 3 (type: "comparison"): Benchmark comparison against traditional peers or competing systems.
   - Slide 4 (type: "mechanics"): Step-by-step operational mechanism, conduit pipeline, or technical flowchart.
   - Slide 5 (type: "perimeter"): The hidden catch, breakage revenue, margin engine, or compounding flywheel.
   - Slide 6 (type: "evidence"): Regulatory loophole, legal perimeter, or risk audit matrix.
   - Slide 7 (type: "verdict"): Strategic verdict, playbook takeaway, or architectural gate.
3. STRICT ANTI-CRAMMING & HARD WORD BUDGETS:
   - MAXIMUM 1 OR 2 ITEMS PER SLIDE! Never cram 3, 4, or 5 items onto one slide.
   - Headline: Maximum 6–7 words (max 40 characters). Punchy, editorial, active voice.
   - Subheadline: Maximum 10–12 words (max 65 characters).
   - Items: Strictly { "label": string (max 2–3 words), "body": string (max 10–12 words / 60 characters) }.
   - Telemetry Values: Strictly numerical or signed badge (e.g. "$1.81B", "0.00%", "+12%", "$196M"). Qualifiers belong in label.

Return strictly a JSON array of 7 slide objects:
[
  {
    "id": "slide-1",
    "index": 0,
    "type": "cover",
    "kicker": "THE PARADOX",
    "headline": "The 0% Interest Bank Disguised as Coffee",
    "subheadline": "Starbucks holds $1.8B in deposits with zero FDIC insurance.",
    "items": [
      { "label": "Customer Float", "body": "$1.81 billion in unspent card balances on balance sheet." },
      { "label": "Capital Cost", "body": "0.00% APR paid to customers who pre-fund cash balances." }
    ]
  },
  ...
]`;
}

export function buildStoryDeckUserPrompt(
  strategy: StoryStrategy,
  dossier: GroundTruthDossier,
  brand: BrandTokens
): string {
  const clean = (val: string | undefined, fallback: string) =>
    val && val !== 'undefined' && val !== 'null' && val.trim().length > 0 ? val.trim() : fallback;

  const hookHeadline = clean(strategy?.hookHeadline, dossier?.articleTitle || 'The Critical Investigation');
  const valuePromise = clean(strategy?.valuePromise, 'Essential architectural breakdown and operational risk analysis.');
  const kicker = clean(strategy?.kicker, 'INVESTIGATIVE DOSSIER');
  const coreConflict = clean(strategy?.coreConflict, dossier?.summary?.slice(0, 120) || 'Operational friction and systemic technical debt.');
  const hiddenCatch = clean(
    strategy?.hiddenCatch,
    dossier?.hiddenCatchesAndLimits?.[0] || 'The risk and complexity of modernizing live safety-critical infrastructure.'
  );
  const verdict = clean(strategy?.verdict, 'Comprehensive long-term architectural modernisation is urgent and mandatory.');

  return `Author the 7-slide narrative storyboard AND choose the distinct visual style, layout topology, and bespoke SVG blueprint for each slide:

Publication: "${brand.name}" (${brand.domain})
Palette: Paper ${brand.palette.paper}, Ink ${brand.palette.ink}, Accent ${brand.palette.accent}, Surface ${brand.palette.surface}
Hook Headline: "${hookHeadline}"
Value Promise: "${valuePromise}"
Kicker: "${kicker}"
Core Conflict: "${coreConflict}"
Hidden Catch: "${hiddenCatch}"
Verdict: "${verdict}"

Verified Intelligence:
Metrics: ${JSON.stringify(dossier.verifiedMetrics)}
Mechanisms: ${JSON.stringify(dossier.systemMechanisms || [])}
Comparisons: ${JSON.stringify(dossier.comparisons || [])}
Controversy: ${JSON.stringify(dossier.coreControversy)}
Catches: ${JSON.stringify(dossier.hiddenCatchesAndLimits)}
Hardware: ${JSON.stringify(dossier.hardwareSpecs || {})}

Output strictly the JSON array of 7 slide objects. Remember: MAX 13 WORDS (65 CHARS) PER ITEM BODY, 2-3 ITEMS PER SLIDE, AND CHOOSE DIVERSE LAYOUT TOPOLOGIES!`;
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
// STAGE 5: VISUAL ART DIRECTOR & SPATIAL LAYOUT ARCHITECT (MAGAZINE EDITORIAL)
// ============================================================================

export type LayoutModelType =
  | 'contract-redline-autopsy'
  | 'typographic-broadsheet'
  | 'telemetry-anchor'
  | 'split-dossier'
  | 'investigative-timeline'
  | 'editorial-verdict-seal'
  | 'editorial-verdict-gate'
  | 'stepped-pipeline-flow'
  | 'stacked-hero-svg'
  | 'split-column-50-50'
  | 'horizontal-comparison-ledger';

export interface SlideDesignBlueprint {
  slideId: string;
  type: string;
  layoutModel: LayoutModelType;
  headerZone: {
    headlineSize: 'text-[52px]' | 'text-[60px]' | 'text-[68px]' | 'text-[72px]';
    hasSubheadline: boolean;
    subheadMaxWords: number;
  };
  svgArtZone: {
    viewBox: string;
    allocatedHeightPx: number;
    artConcept: string;
    primaryElements: string[];
    negativeSpaceBufferPx: number;
  };
  cardsZone: {
    placement: 'bottom-2-col' | 'stacked-placard' | 'left-column-cards' | 'hairline-columns' | 'none';
    cardCount: number;
    maxWordsPerBody: number;
    style: 'surface-border-top' | 'border-left-accent' | 'hairline-ledger' | 'print-broadsheet';
  };
  spacing: {
    zoneGap: 'gap-6' | 'gap-8';
  };
  // Backward compatibility fields
  layoutStructure?: string;
  svgConcept?: {
    description: string;
    type: 'floorplan' | 'schematic' | 'telemetry-bars' | 'contrast-icons' | 'spatial-glyphs' | 'none';
  };
}

export function buildVisualBlueprintSystemPrompt(): string {
  return `You are the Lead Visual Art Director & Spatial Layout Architect at Pentagram, Monocle, and The New York Times Graphics Desk.
Your mission is to architect authentic, prestigious, editorial magazine-grade spatial layouts and vector illustrations for an investigative publication carousel.

MAGAZINE EDITORIAL EXCELLENCE PRINCIPLE:
1. NEVER LOOK LIKE A WEB DASHBOARD OR MOBILE APP:
   - STRICTLY FORBIDDEN: Clumping dark grey box containers across the frame. Real print magazines (The New York Times, Monocle, Wired, HBR) rely on generous negative space, delicate hairline rules (1px), vertical column dividers, and monumental typographic contrast.
   - STRICTLY FORBIDDEN: Drawing SVG <rect> boxes with borders that look like web UI cards, flowchart blocks, or Miro wireframes! SVGs must be authentic vector graphics: timeline rails, official legal stamp seals, judicial scales, compass/coordinate axes, document corner folds, or data bars.

2. THE 6 CANONICAL MAGAZINE EDITORIAL ARCHETYPES:
   1. 'contract-redline-autopsy':
      - Authentic legal clause autopsy on paper.
      - Features contract text excerpts with yellow highlighter markup, red pen underlines, section tags [§ 7(b)], red strike-throughs, and marginal notes.
      - SVG provides subtle document ephemera (paper edge lines, seal stamp, bracket callout), NOT fake CSS card boxes!
   2. 'typographic-broadsheet':
      - Pure print broadsheet layout.
      - Monumental headline serif (text-[64px] to text-[72px]), drop-cap first letter (first-letter:text-[76px]), 2-column or 3-column body text divided by fine hairline rules (divide-x divide-[var(--border)]).
      - ZERO card boxes! The typography breathes on the paper.
   3. 'telemetry-anchor':
      - Large-scale data or financial autopsy.
      - Massive numerical metric (text-[100px] to text-[130px] font-mono font-bold) with signed badge.
      - Accompanying thesis paragraph, horizontal comparison ledger lines with delta tags, and delicate citation hairline.
   4. 'split-dossier':
      - Asymmetric split (40% left / 60% right) divided by a crisp vertical hairline rule (border-r border-[var(--border)]).
      - Left: Court docket filing, verified receipts (CASE NO. 2024-CA-001616-O), official dates.
      - Right: The hidden trap, actual contractual mechanism, and consumer reality.
   5. 'investigative-timeline':
      - Chronological investigative audit rail (e.g. 2019 Signup → 2023 Ticket → 2024 Lawsuit → 2024 Court Withdrawal).
      - A clean, continuous horizontal or vertical timeline rail with date markers, milestone flags, and connector paths.
      - NEVER draw 5 grey box rectangles! Draw a continuous timeline rail with clear typography and milestone flags.
   6. 'editorial-verdict-seal':
      - The final investigative verdict.
      - Features an authentic stamped official seal badge ([UNCONSCIONABLE], [ARBITRATION SHIELD], [CLASS ACTION WAIVER]) with an angled stamp border, consumer guardrail checklist, and bookmark callout.

3. MANDATORY DIVERSITY RULE:
   - You MUST assign at least 4 different layout models across the 7 slides!
   - Under no circumstances should every slide share the same vertical 3-tier card structure!

Return strictly a JSON array of 7 SlideDesignBlueprint objects.`;
}

export function buildVisualBlueprintUserPrompt(
  slides: SlideData[],
  brand: BrandTokens,
  dossier: GroundTruthDossier
): string {
  return `Architect the spatial layout and bespoke SVG art for these 7 slides:

Publication: "${brand.name}" (${brand.domain})
Palette: Paper ${brand.palette.paper}, Ink ${brand.palette.ink}, Accent ${brand.palette.accent}, Surface ${brand.palette.surface}
Canvas: 1080x1350 portrait (952x1028 interior safe area)

Verified Intel:
Metrics: ${JSON.stringify(dossier.verifiedMetrics)}
Mechanisms: ${JSON.stringify(dossier.systemMechanisms || [])}
Comparisons: ${JSON.stringify(dossier.comparisons || [])}

Slides Content to Architect:
${JSON.stringify(
  slides.map((s, idx) => ({
    id: s.id || `slide-${idx + 1}`,
    index: idx,
    type: s.type,
    kicker: s.kicker,
    headline: s.headline,
    subheadline: s.subheadline,
    items: s.items,
  })),
  null,
  2
)}

Output strictly the JSON array of 7 SlideDesignBlueprint objects. Ensure layoutModel diversity across all 7 slides!`;
}

// ============================================================================
// STAGE 6: PRINCIPAL REACT ENGINEER (BESPOKE CODE GENERATION)
// ============================================================================

export function buildSingleSlideSystemPrompt(platform = 'instagram-feed'): string {
  const isStories = platform === 'instagram-stories';
  const isSquare = platform === 'instagram-square';
  const safeAreaDesc = isStories
    ? '1080x1920 canvas (9:16 vertical stories format), 952x1596 safe area'
    : isSquare
    ? '1080x1080 canvas (1:1 square format), 952x758 safe area'
    : '1080x1350 canvas (4:5 portrait format), 952x1028 safe area';

  return `You are a world-class Frontend Engineer and Editorial Art Director (Pentagram, Wired, The New York Times, Monocle).
You write bespoke React TypeScript components using pure Tailwind CSS for publication-grade carousel slides (${safeAreaDesc}).

CRITICAL MAGAZINE EDITORIAL PRINCIPLES:
1. MANDATORY COMPONENT SIGNATURE (STRICT TYPE SAFETY):
   You MUST import SlideComponentProps and export the component with this EXACT signature:

   import React from 'react';
   import type { SlideComponentProps } from '../../../src/skeleton/types';

   export default function SlideNN({ slide, brand, totalSlides }: SlideComponentProps) {
     const items = slide.items ?? [];
     return ( ... );
   }

   STRICTLY FORBIDDEN: Declaring local custom props types like \`type Slide04Props\` or \`interface Slide07Props\`. Always use SlideComponentProps!

2. MAGAZINE EDITORIAL STANDARDS OVER WEB UI:
   - This is an art-directed print publication (like The New York Times Magazine, Monocle, or The Paper of Record), NOT a web dashboard or mobile app!
   - STRICTLY FORBIDDEN: Drawing SVG <rect> boxes with borders that look like web UI cards or flowchart containers! If drawing a timeline or schematic, use vector lines (<path>), date nodes (<circle>), coordinate axes, or legal stamp seals.
   - STRICTLY FORBIDDEN: Ending every slide with an identical 2-card bottom grid (<div className="grid grid-cols-2 gap-5"><article ...>). Use diverse magazine structures: columnar text with drop-caps, hairline ledgers, full-width quotes, split dossiers, or annotated clause placards.
   - PREFER HAIRLINES OVER CARD BOXES: Print magazines use delicate hairline rules (border-t border-[var(--border)], divide-x divide-[var(--border)]) and generous whitespace, rather than heavy card backgrounds (bg-[var(--surface)]) on every element.

3. IMPLEMENT THE ASSIGNED MAGAZINE ARCHETYPE:
   - For 'contract-redline-autopsy':
     * Simulate an authentic legal document/contract clause on paper.
     * Render the legal clause excerpt in an authentic document inset with yellow highlighter markup (<mark className="bg-[#FEF08A] text-[#121212] px-1 py-0.5 font-mono">), red pen underlines (<span className="underline decoration-[var(--accent)] decoration-2">), section tags [§ 7(b)], and red strike-throughs.
     * Accompany with marginal investigative analysis and receipt notes.
   - For 'typographic-broadsheet':
     * Classical editorial broadsheet layout with monumental headline serif (text-[64px] to text-[72px]).
     * Drop-cap lede: className="first-letter:text-[76px] first-letter:font-bold first-letter:float-left first-letter:mr-3 first-letter:leading-none font-[var(--font-headline)] text-[var(--accent)]"
     * 2-column or 3-column body text divided by fine hairline rules (divide-x divide-[var(--border)]). ZERO card boxes!
   - For 'telemetry-anchor':
     * Massive numerical metric (text-[100px] to text-[120px] font-mono font-bold text-[var(--ink)]) with signed badge or unit.
     * Accompanying thesis paragraph, horizontal comparison ledger lines with delta tags, and delicate citation hairline.
   - For 'split-dossier':
     * Asymmetric 40/60 vertical split with a vertical hairline dividing rule (border-r border-[var(--border)] pr-8).
     * Left: Court docket filing, verified receipts (CASE NO. 2024-CA-001616-O), official dates.
     * Right: The hidden trap, actual fine-print mechanism, and consumer reality.
   - For 'investigative-timeline':
     * A clean, continuous horizontal or vertical timeline rail connecting chronological milestones.
     * Use clean SVG lines and circle nodes for the rail, and HTML text for the date tags and milestone descriptions.
     * NEVER draw 5 grey box rectangles!
   - For 'editorial-verdict-seal':
     * Concluding verdict slide with an authentic stamped official badge ([UNCONSCIONABLE], [ARBITRATION SHIELD], [CLASS ACTION WAIVER]) with an angled stamp border (border-2 border-[var(--accent)] rotate-[-2deg] px-3 py-1 font-mono uppercase text-[var(--accent)]).
     * Prominent consumer guardrail placard and bookmark CTA.
   - For 'stacked-hero-svg' or 'horizontal-comparison-ledger':
     * Zone 1 Header (shrink-0): Kicker + Headline + Subheadline.
     * Zone 2 SVG Art Canvas (flex-1 min-h-0 relative flex items-center justify-center): Dedicated vector canvas taking 440px–500px height.
     * Zone 3 Takeaway (shrink-0): Full-width hairline ledger or single placard.

3. STRICT PROHIBITION ON OVERLAYS:
   NEVER place floating absolute HTML text boxes (e.g. <div className="absolute top-0 right-0">) over the SVG canvas!
   HTML text belongs cleanly in its dedicated structural flow.

4. STRICT THEME & TYPOGRAPHY INHERITANCE:
   - DO NOT declare a local 'const tokens = { ... }' or 'const theme = { ... }' object!
   - The outer <SlideFrame> ALREADY injects the authentic brand typography and colors into CSS variables.
   - STRICTLY FORBIDDEN: Writing 'Arial', 'Helvetica', or 'Courier New' in the component.
   - Use inherited Tailwind classes:
     * font-[var(--font-headline)] for titles, kickers, and headlines (e.g. Playfair Display)
     * font-[var(--font-body)] for body copy and descriptions (e.g. Source Serif 4)
     * font-[var(--font-mono)] for metrics, tags, and numbers (e.g. JetBrains Mono)
     * text-[var(--ink)] for primary text
     * text-[var(--accent)] or bg-[var(--accent)] for focal accents and highlights
     * bg-[var(--surface)] for document insets
     * border-[var(--border)] for hairlines and borders

5. TYPOGRAPHY SCALE FLOOR & ANTI-CRAMMING:
   - Headline: text-[52px] to text-[68px] (font-bold leading-[1.02] tracking-tight).
   - Subheadline: text-[24px] to text-[28px] (leading-snug line-clamp-2).
   - Section / Item Titles: text-[26px] to text-[30px] (font-semibold leading-tight).
   - Body Copy: text-[22px] to text-[24px] (leading-snug line-clamp-2 or line-clamp-3).
   - Hero Numbers / Telemetry: text-[80px] to text-[120px] (font-mono font-bold).
   - TEXT UNDER 20px IS STRICTLY BANNED for readable content.

6. ARRAY INDEXING TYPE-SAFETY & SAFE STRING RENDERING:
   - slide.items is an ARRAY. When accessing items:
     const item0 = items[0];
     const item1 = items[1];
   - STRICTLY BANNED: Writing 'items?.label' or 'items?.body' (this produces undefined). Always use array indexing or items.map((it: any, idx: number) => ...).
   - If rendering arrays of lines, NEVER render {node.lines} directly (which joins without spaces); render line by line.

7. SPACE BALANCE MANDATE:
   - The outer section must fill 80% to 92% of the safe vertical height organically without overflow.
   - className="flex flex-col h-full min-h-0 w-full justify-between text-[var(--ink)]"
   - NEVER put 'overflow-hidden' on the top-level <section>.

8. Output ONLY self-contained React TypeScript JSX in a \`\`\`tsx code block. Pure Tailwind and inline SVG only.`;
}

export function buildSingleSlideUserPrompt(
  slideNumber: number,
  slideData: SlideData,
  blueprint: SlideDesignBlueprint | undefined,
  brand: BrandTokens
): string {
  const layoutModel = blueprint?.layoutModel || 'stacked-hero-svg';
  const headlineSize = blueprint?.headerZone?.headlineSize || 'text-[60px]';
  const svgViewBox = blueprint?.svgArtZone?.viewBox || '0 0 952 460';
  const artConcept = blueprint?.svgArtZone?.artConcept || slideData.svgBlueprint || 'Bespoke inline vector SVG diagram';
  const cardStyle = blueprint?.cardsZone?.style || 'surface-border-top';

  return `Generate the bespoke React + Tailwind component for Slide ${slideNumber}:
Archetype: "${slideData.type}"
Layout Model: "${layoutModel}"

Slide Data (Locked Copy):
- Kicker: "${slideData.kicker || 'IN-DEPTH INVESTIGATION'}"
- Headline: "${slideData.headline}"
- Subheadline: "${slideData.subheadline || ''}"
- Items: ${JSON.stringify(slideData.items || [], null, 2)}

SPATIAL BLUEPRINT & ART DIRECTION (Follow Strictly!):
- Layout Model: "${layoutModel}"
- Headline Size: "${headlineSize}"
- SVG Canvas: viewBox="${svgViewBox}", dedicated flex-1 space.
- Vector SVG Art Concept: "${artConcept}"
- Cards Styling: "${cardStyle}" (strictly non-overlapping, placed in dedicated cards zone)
- Primary Elements: ${JSON.stringify(blueprint?.svgArtZone?.primaryElements || ['geometric nodes', 'directional conduits', 'accent flags'])}

Brand Identity:
- Name: "${brand.name}"
- Domain: "${brand.domain}"
- Palette: Ink ${brand.palette.ink}, Paper ${brand.palette.paper}, Accent ${brand.palette.accent}, Surface ${brand.palette.surface}, Border ${brand.palette.border}

Remember:
1. NO floating absolute HTML text boxes over the SVG canvas.
2. NO local font overrides (Arial/Courier are banned; inherit from SlideFrame).
3. Access items via items[0]?.label and items[1]?.label or map.
4. BANNED: Drawing SVG <rect> elements that look like UI cards or flowcharts.
5. BANNED: Ending every slide with an identical 2-card bottom grid. Implement the assigned magazine archetype!
6. If layoutModel is 'contract-redline-autopsy', render a highlighted contract excerpt (<mark className="bg-[#FEF08A] text-[#121212] px-1 py-0.5 font-mono">) with section tags and editorial margins.
7. If layoutModel is 'typographic-broadsheet', render a 2-column broadsheet with drop cap and hairline dividers.
8. If layoutModel is 'investigative-timeline', render a continuous vector line rail with milestone nodes, NOT 5 grey boxes.

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

// ============================================================================
// STAGE 8: JOURNALISTIC INSTAGRAM CAPTION ENGINE
// ============================================================================

export interface InstagramCaptionData {
  hook: string;
  body: string;
  receipts: string;
  guardrail: string;
  cta: string;
  hashtags: string[];
  fullText: string;
}

export function buildInstagramCaptionSystemPrompt(): string {
  return `You are a veteran investigative staff writer and copy chief at "The Fine Print" (in the tradition of ProPublica, The Wall Street Journal, and NYT DealBook).
Your task is to write a compelling, publication-grade Instagram caption for an editorial carousel investigation.

ABSOLUTE NEGATIVE CONSTRAINTS (STRICTLY BANNED):
1. ZERO RHETORICAL QUESTIONS as opening sentences ("Have you ever wondered...?", "Did you know that...?", "Are you tired of...?"). BANNED.
2. ZERO TECH-HYPE OR AI CLICHES ("In today's fast-paced digital world...", "Let's dive in", "Buckle up", "Here's the scoop", "Game changer", "At the end of the day", "Mind-blowing", "Game-changing", "Unpack"). BANNED.
3. ZERO EMOJI SPAM. Never use rocket ships (🚀), fire (🔥), brains (🧠), lightbulbs (💡), party poppers (🎉), or eyes (👀). At most 1 or 2 clean typographic markers (such as ▪ or →) for functional lists.
4. ZERO MORALIZING or generic cheerleading ("Remember to stay vigilant!", "Knowledge is power!"). Stick to cold facts, regulatory clauses, dollar figures, and legal mechanisms.

EDITORIAL CONVERSION ARCHITECTURE:
- Line 1 (The Hook): A sharp, declarative factual statement naming the company, specific dollar figure or statutory clause, and the real-world consequence.
- Paragraph 2 (The Mechanism): 2 to 3 concise, analytical sentences explaining exactly how the contractual asymmetry or loophole operates against consumers or competitors.
- Paragraph 3 (The Receipts): Exact citations from SEC 10-K filings, court dockets, arbitration clauses, or FTC/CFPB enforcement actions.
- Paragraph 4 (The Guardrail): The practical takeaway—what readers need to check in their own terms, opt-out timeframes (e.g., 30-day arbitration reject notices), or billing statements.
- Paragraph 5 (Conversion Sign-off):
  - Mention: "Full breakdown across the carousel above."
  - Save prompt: "Bookmark this receipt for your records."
  - Follow prompt: "Follow @thefineprint.pub for weekly investigative autopsies into corporate fine print."
  - Discussion prompt: A specific, provocative debate question on the policy or legal precedent to generate high-signal comment engagement.
- Hashtags: 4 to 6 focused, relevant editorial hashtags (e.g. #TheFinePrint #ConsumerRights #CorporateAccountability #Investigation).

Return strictly valid JSON matching the InstagramCaptionData schema.`;
}

export function buildInstagramCaptionUserPrompt(
  brand: BrandTokens,
  dossier: GroundTruthDossier,
  deck: DeckData
): string {
  const slidesSummary = deck.slides
    .map((s: SlideData, i: number) => `Slide ${i + 1} (${s.kicker || s.type}): ${s.headline}${s.subheadline ? ` — ${s.subheadline}` : ''}`)
    .join('\n');

  const metricsSummary = (dossier.verifiedMetrics || [])
    .map((m) => `  * ${m.label}: ${m.value} (${m.context})`)
    .join('\n');

  const quotesSummary = (dossier.verifiedQuotes || [])
    .map((q) => `  * "${q.quote}" — ${q.speaker}, ${q.role}`)
    .join('\n');

  const catchesSummary = (dossier.hiddenCatchesAndLimits || [])
    .map((c) => `  * ${c}`)
    .join('\n');

  return `Write an investigative, high-converting Instagram caption for this editorial investigation:

Publication: "${brand.name}" (${brand.handle})
Investigation Title: "${deck.templateName}"
Narrative Arc: "${deck.domain}"

GROUND TRUTH DOSSIER (Use exact facts, dates, dollar figures):
- Article Title: "${dossier.articleTitle}"
- Executive Summary: "${dossier.summary}"
- Core Controversy:
  * Corporate Claim: "${dossier.coreControversy?.corporateClaim || ''}"
  * Reality / Alarm: "${dossier.coreControversy?.criticismOrAlarm || ''}"
  * Legal Precedent: "${dossier.coreControversy?.regulatoryOrHistoricalPrecedent || ''}"
- Verified Metrics:
${metricsSummary || '  * None listed'}
- Verified Quotes & Attributions:
${quotesSummary || '  * None listed'}
- Hidden Clauses & Traps:
${catchesSummary || '  * None listed'}

SLIDE BREAKDOWN:
${slidesSummary}

Format your output as JSON:
{
  "hook": "Single declarative factual opener without questions or hype",
  "body": "2-3 sentences explaining the mechanism",
  "receipts": "Specific docket, terms section, or SEC citation",
  "guardrail": "Concrete action or check for consumers",
  "cta": "Save and follow prompt + provocative discussion question",
  "hashtags": ["#TheFinePrint", "#ConsumerRights", "#CorporateAccountability"],
  "fullText": "The complete, ready-to-publish Instagram caption with clean paragraph breaks (no emoji spam)."
}`;
}

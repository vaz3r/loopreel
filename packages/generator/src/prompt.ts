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
  return `You are a Senior Forensic Research Analyst and Investigative Journalist at ProPublica, The Wall Street Journal, and The New York Times Graphics Desk.
Your task is to compile a deeply verified, highly accurate, concrete GroundTruthDossier for an in-depth editorial topic.

CRITICAL RESEARCH RULES:
1. HUMAN REALITY & REAL-WORLD STAKES:
   - Identify who was affected, what happened to real people, and the direct human or financial damage.
   - Document the corporate claim or defense versus the real-world controversy.
2. CONCRETE QUANTITATIVE FIGURES & RECEIPTS (Mandatory):
   - Extract or synthesize 6 to 10 exact, real-world figures: dates, case docket numbers, dollar amounts, percentages, user counts, or statutory sections.
3. SYSTEM MECHANISMS & FINE PRINT TRAPS:
   - Provide a step-by-step operational sequence ("systemMechanisms") breaking down how the fine print clause, corporate loophole, or business mechanism actually functions.
   - Translate all legal, corporate, or financial maneuvers into plain, understandable human terms.
4. CONTROVERSY, PRECEDENTS & PUBLIC DANGER:
   - Detail the regulatory loophole, corporate overreach, or legal arbitrage.
   - Explain why this sets a dangerous or alarming precedent for everyday consumers or the broader industry.

Return strictly valid JSON matching GroundTruthDossier without markdown outside the json block.`;
}

export function buildTopicResearchUserPrompt(brief: TemplateBrief): string {
  return `Compile the comprehensive GroundTruthDossier for this editorial exploration:
Topic / Brief: "${brief.name || 'Corporate Fine Print & Systems Intelligence'}"
Content Domain: "${brief.domain || 'Corporate Accountability / Regulatory Arbitrage / Consumer Rights'}"
Editorial Angle / Vibe: "${brief.vibe || 'Investigative forensic audit of hidden operational mechanics, fine print traps, and consumer realities'}"
Inspiration / Style: "${brief.inspiration || 'ProPublica, The Wall Street Journal, Wired, Vox Explains'}"

Output strictly the GroundTruthDossier JSON with concrete facts, human stakes, mechanisms, and receipts.`;
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
  return `You are the Editor-in-Chief at Wired, Vox, The Verge, and The New York Times Magazine.
Your mission is to transform verified facts into a scroll-stopping, gripping 7-beat investigative carousel strategy that anyone can understand and share.

CRITICAL HOOK & NARRATIVE PRINCIPLES:
1. THE SCROLL-STOPPING HOOK (Slide 1):
   - Never use passive corporate titles or dry court summaries (e.g. "Analysis of terms of service" is STRICTLY BANNED).
   - Use the tension formula: [The Shocking Core Paradox] + [The Surprising Scale, Human Reality, or Hidden Catch].
   - Examples of great hooks:
     * "How a $0 Disney+ Free Trial Nearly Erased a Man's Right to Sue for Wrongful Death"
     * "The 0% Interest Bank Disguised as a Coffee Shop"
     * "How Clicking 'I Agree' in 2019 Waived a Constitutional Right in 2024"
2. THE 7-BEAT INVESTIGATIVE NARRATIVE ARC:
   - Slide 1: The Core Paradox / Unbelievable Premise (The Hook)
   - Slide 2: The Human Story / Real-World Event (What actually happened to real people)
   - Slide 3: The Trap / Fine Print Clause (The exact hidden mechanism that changed everything)
   - Slide 4: The Mechanism / The Absurdity (How an everyday app click connects to real-world liability)
   - Slide 5: The Public Threat / Systemic Danger (Why this threatens millions of everyday consumers)
   - Slide 6: The Backlash / Corporate Retreat / Evidence (Public outrage, court battle, and receipts)
   - Slide 7: The Consumer Playbook / Strategic Takeaway (How readers can protect their rights)
3. ZERO FOURTH-WALL BREAKING:
   - NEVER comment on the prompt itself. NEVER write meta-criticism like "The dossier has no metrics".
   - You are publishing directly to a discerning audience of millions.

OUTPUT FORMAT:
Return strictly a valid JSON object matching this exact schema:
{
  "hookHeadline": "Monumental, scroll-stopping headline capturing the paradox (max 8 words)",
  "valuePromise": "What high-value operational insight the reader gains (max 12 words)",
  "kicker": "2-3 word uppercase editorial kicker (e.g. FINE PRINT AUTOPSY)",
  "coreConflict": "The core systemic paradox or operational collision",
  "hiddenCatch": "The hidden catch, systemic vulnerability, or fine print trap",
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
  return `You are a Senior Copy Editor and Visual Layout Architect at Wired, Vox, and The New York Times Graphics Desk.
You author high-signal editorial carousel content with STRICT word budgets. The visual art is the central hero, so all copy must be lean, razor-sharp, conversational, and punchy!

CRITICAL PLAIN-LANGUAGE & ANTI-OVERFLOW RULES:
1. THE 8TH-GRADE EXPLAINER RULE (ELI5):
   - Write like an investigative journalist explaining a complex corporate scandal to a smart friend at dinner.
   - STRICTLY FORBIDDEN: Raw, un-translated legal statutes (e.g. "9 U.S.C. § 3"), procedural courtroom jargon ("delegation clause", "stay of proceedings", "interlocutory appeal", "forum non conveniens").
   - MANDATORY: Always translate into human stakes! (e.g. Instead of "Disney cited subscriber agreement delegation clause to compel arbitration", write "Disney argued that clicking 'I Agree' on a free streaming trial waives your right to take any future lawsuit to a public jury.")
2. ZERO HALLUCINATION: All core facts and receipts must derive strictly from the GroundTruthDossier.
3. NARRATIVE 7-SLIDE ARC:
   - Slide 1 (type: "cover"): Hook, core paradox, monumental headline, hero optic/telemetry badge or diagram.
   - Slide 2 (type: "context"): The human story and baseline event (who was hurt, what happened).
   - Slide 3 (type: "comparison"): The hidden clause or fine print discovery vs. consumer expectation.
   - Slide 4 (type: "mechanics"): The cross-service trap or step-by-step mechanism (how the company connects the dots).
   - Slide 5 (type: "perimeter"): The public threat or systemic danger (why this sets a terrifying precedent for everyone).
   - Slide 6 (type: "evidence"): The backlash, corporate retreat, or court receipts.
   - Slide 7 (type: "verdict"): The consumer defense playbook (what to check before signing, how to opt out).
4. STRICT ANTI-CRAMMING & HARD WORD BUDGETS:
   - MAXIMUM 1 OR 2 ITEMS PER SLIDE! Never cram 3, 4, or 5 items onto one slide.
   - Headline: Maximum 6–8 words (max 45 characters). Punchy, editorial, active voice.
   - Subheadline: Maximum 10–14 words (max 75 characters).
   - Items: Strictly { "label": string (max 2–3 words), "body": string (max 12–14 words / 70 characters) }.
   - Telemetry Values: Strictly numerical or signed badge (e.g. "$1.81B", "0.00%", "+12%", "$196M"). Qualifiers belong in label.

Return strictly a JSON array of 7 slide objects:
[
  {
    "id": "slide-1",
    "index": 0,
    "type": "cover",
    "kicker": "THE PARADOX",
    "headline": "The $0 Free Trial That Nearly Waived a Lawsuit",
    "subheadline": "How watching a movie in 2019 was used to block a wrongful death claim in 2024.",
    "items": [
      { "label": "The Free Trial", "body": "1-month streaming signup on a home couch." },
      { "label": "The Claim", "body": "Wrongful death lawsuit at an Orlando resort." }
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
    headlineSize: 'text-[52px]' | 'text-[56px]' | 'text-[60px]' | 'text-[64px]' | 'text-[68px]' | 'text-[72px]' | string;
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

MAGAZINE EDITORIAL & VISUAL METAPHOR PRINCIPLES:
1. MEANINGFUL VISUAL METAPHORS (NO MEANINGLESS NOODLES OR CIRCLES):
   - Every slide must have a concrete, purposeful VISUAL SCENE or METAPHOR that illustrates the concept!
   - Examples of great visual metaphors:
     * A streaming TV screen chained via barbed SVG paths to a restaurant/building
     * A judicial balance scale tipped heavily by a corporate terms agreement
     * An authentic document autopsy with yellow highlighter, section brackets, and a stamped seal
     * A timeline rail tracking the escalation from a $0 free trial to a courtroom showdown
     * A spotlight illuminating tiny fine print text underneath a big colorful logo
   - STRICTLY FORBIDDEN: Drawing random, abstract geometric circles and connector lines that look like circuit boards or subway maps without any real-world meaning!
   - STRICTLY FORBIDDEN: Drawing SVG <rect> boxes with borders that look like web UI cards, flowchart blocks, or Miro wireframes.

2. DYNAMIC VERTICAL BUDGETING (ZERO OVERFLOW):
   - Canvas is 1080x1350 portrait (interior safe area 952x1028).
   - If a slide has a substantial footer/ledger, allocate 320px–360px for the visual canvas.
   - If the slide is hero-visual focused, allocate 400px–460px with a compact header.
   - All visual canvases must use 'flex-1 min-h-0' so they breathe organically without scaling warnings.

3. THE 6 CANONICAL MAGAZINE EDITORIAL ARCHETYPES:
   1. 'contract-redline-autopsy':
      - Authentic legal clause autopsy on dark luxury paper.
      - Features contract text excerpts with yellow highlighter markup, red pen underlines, section tags [§ 7(b)], red strike-throughs, and marginal notes.
   2. 'typographic-broadsheet':
      - Pure print broadsheet layout with monumental headline serif (text-[64px] to text-[72px]), drop-cap first letter (first-letter:text-[76px]), and 2-column or 3-column body text divided by fine hairline rules.
   3. 'telemetry-anchor':
      - Large-scale data or financial autopsy with massive numerical metric (text-[100px] to text-[130px] font-mono font-bold), signed badge, and delta tag.
   4. 'split-dossier':
      - Asymmetric split (40% left / 60% right) divided by a crisp vertical hairline rule. Left: receipts/dates. Right: fine-print reality.
   5. 'investigative-timeline':
      - Chronological investigative audit rail with date markers, milestone flags, and connector paths.
   6. 'editorial-verdict-seal':
      - Concluding verdict slide with an authentic stamped official seal badge ([UNCONSCIONABLE], [ARBITRATION SHIELD], [CLASS ACTION WAIVER]) with an angled stamp border and consumer guardrail checklist.

4. MANDATORY DIVERSITY RULE:
   - You MUST assign at least 4 different layout models across the 7 slides!

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
You write bespoke React TypeScript components using pure Tailwind CSS and Lucide icons for publication-grade carousel slides (${safeAreaDesc}).

CRITICAL MAGAZINE EDITORIAL & CODING PRINCIPLES:
1. MANDATORY COMPONENT SIGNATURE (STRICT TYPE SAFETY):
   You MUST import SlideComponentProps and export the component with this EXACT signature:

   import React from 'react';
   import type { SlideComponentProps } from '../../../src/skeleton/types';
   // You have full access to lucide-react icons! E.g.:
   // import { Scale, Gavel, FileText, Tv, Building2, ShieldAlert, AlertTriangle, Lock, Unlock, Users, Flame, Coins, Eye, CheckCircle2, XCircle, ArrowRight } from 'lucide-react';

   export default function SlideNN({ slide, brand, totalSlides }: SlideComponentProps) {
     const items = slide.items ?? [];
     return ( ... );
   }

   STRICTLY FORBIDDEN: Declaring local custom props types like \`type Slide04Props\` or \`interface Slide07Props\`. Always use SlideComponentProps!

2. CREATIVE BESPOKE SCENES WITH LUCIDE ICONS (NO MEANINGLESS NOODLES):
   - You have TOTAL FREEDOM to architect creative visual scenes, diagrams, and metaphors!
   - Use Lucide icons as semantic real-world anchors (<Tv className="w-12 h-12 text-[var(--accent)]" />, <Scale />, <Lock />, <Gavel />, <Building2 />, <ShieldAlert />).
   - Combine them with bespoke SVG curved paths, glowing pulse rings, directional arrows, registration ticks, stamped seals, and annotated callouts.
   - STRICTLY FORBIDDEN: Drawing random abstract geometric circles connected by lines that look like circuit boards or subway maps without any real-world meaning! The visual MUST tell the story of the slide.
   - STRICTLY FORBIDDEN: Drawing SVG <rect> boxes with borders that look like web UI cards or flowchart containers.

3. DYNAMIC HEIGHT BUDGETING & ZERO AUTOFIT OVERFLOW:
   - Safe vertical area is 1028px.
   - Outer section: className="flex h-full min-h-0 w-full flex-col justify-between py-8 px-2 text-[var(--ink)]"
   - Header Zone: 'shrink-0'
   - Visual Drawing Canvas: 'flex-1 min-h-0 relative flex items-center justify-center overflow-hidden'
   - Bottom Takeaway/Ledger: 'shrink-0'
   - This flexbox structure guarantees the slide never overflows and always renders at scale = 1.000 without scaling warnings!

4. MAGAZINE EDITORIAL ARCHETYPES:
   - For 'contract-redline-autopsy':
     * Simulate an authentic legal document/contract clause on dark luxury paper.
     * Render the legal clause excerpt in an authentic document inset with yellow highlighter markup (<mark className="bg-[#FEF08A] text-[#121212] px-1.5 py-0.5 font-mono font-medium">), red pen underlines (<span className="underline decoration-[var(--accent)] decoration-2">), section tags [§ 7(b)], and red strike-throughs.
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
     * A clean, continuous timeline rail connecting chronological milestones with dates, status badges, and Lucide icons.
   - For 'editorial-verdict-seal':
     * Concluding verdict slide with an authentic stamped official badge ([UNCONSCIONABLE], [ARBITRATION SHIELD], [CLASS ACTION WAIVER]) with an angled stamp border (border-2 border-[var(--accent)] rotate-[-2deg] px-3 py-1 font-mono uppercase text-[var(--accent)]).
     * Prominent consumer guardrail checklist and bookmark CTA.

5. STRICT THEME & TYPOGRAPHY INHERITANCE:
   - DO NOT declare a local 'const tokens = { ... }' or 'const theme = { ... }' object!
   - The outer <SlideFrame> ALREADY injects the authentic brand typography and colors into CSS variables.
   - bg-[var(--surface)] is an elevated midnight slate (#141923), NEVER stark white!
   - Inherited Tailwind classes:
     * font-[var(--font-headline)] for titles, kickers, and headlines (e.g. Playfair Display)
     * font-[var(--font-body)] for body copy and descriptions (e.g. Source Serif 4)
     * font-[var(--font-mono)] for metrics, tags, and numbers (e.g. JetBrains Mono)
     * text-[var(--ink)] for primary text (#F8FAFC)
     * text-[var(--accent)] or bg-[var(--accent)] for focal accents and highlights (#F43F5E)
     * bg-[var(--surface)] for document insets (#141923)
     * border-[var(--border)] for hairlines and borders (#222B3D)

6. TYPOGRAPHY SCALE FLOOR & ANTI-CRAMMING:
   - Headline: text-[52px] to text-[66px] (font-bold leading-[1.04] tracking-tight).
   - Subheadline: text-[24px] to text-[28px] (leading-snug line-clamp-2).
   - Section / Item Titles: text-[26px] to text-[30px] (font-semibold leading-tight).
   - Body Copy: text-[22px] to text-[24px] (leading-snug line-clamp-2 or line-clamp-3).
   - Hero Numbers / Telemetry: text-[80px] to text-[120px] (font-mono font-bold).
   - TEXT UNDER 20px IS STRICTLY BANNED for readable content.

7. ARRAY INDEXING TYPE-SAFETY:
   - Always access items via items[0]?.label and items[1]?.label or map.
   - STRICTLY BANNED: Writing 'items?.label' or 'items?.body'.

8. Output ONLY self-contained React TypeScript JSX in a \`\`\`tsx code block. Pure Tailwind, Lucide icons, and inline SVG only.`;
}

export function buildSingleSlideUserPrompt(
  slideNumber: number,
  slideData: SlideData,
  blueprint: SlideDesignBlueprint | undefined,
  brand: BrandTokens
): string {
  const layoutModel = blueprint?.layoutModel || 'stacked-hero-svg';
  const headlineSize = blueprint?.headerZone?.headlineSize || 'text-[58px]';
  const svgViewBox = blueprint?.svgArtZone?.viewBox || '0 0 952 420';
  const artConcept = blueprint?.svgArtZone?.artConcept || slideData.svgBlueprint || 'Bespoke conceptual illustration with Lucide icons and vector paths';
  const cardStyle = blueprint?.cardsZone?.style || 'hairline-ledger';

  return `Generate the bespoke React + Tailwind component for Slide ${slideNumber}:
Archetype: "${slideData.type}"
Layout Model: "${layoutModel}"

Slide Data (Locked Plain-Language Copy):
- Kicker: "${slideData.kicker || 'IN-DEPTH INVESTIGATION'}"
- Headline: "${slideData.headline}"
- Subheadline: "${slideData.subheadline || ''}"
- Items: ${JSON.stringify(slideData.items || [], null, 2)}

SPATIAL BLUEPRINT & ART DIRECTION:
- Layout Model: "${layoutModel}"
- Headline Size: "${headlineSize}"
- SVG/Visual Canvas: viewBox="${svgViewBox}", flex-1 min-h-0 space.
- Visual Scene Concept: "${artConcept}"
- Cards/Ledger Styling: "${cardStyle}" (hairline dividers, generous spacing, zero boxy card grids)

Brand Identity (Obsidian Dark Luxury):
- Name: "${brand.name}"
- Domain: "${brand.domain}"
- Palette: Ink ${brand.palette.ink}, Paper ${brand.palette.paper}, Accent ${brand.palette.accent}, Surface ${brand.palette.surface}, Border ${brand.palette.border}

Remember:
1. Import Lucide icons to represent real-world concepts (Tv, Scale, Lock, Gavel, Building2, ShieldAlert, FileText, etc.).
2. Compose a meaningful visual scene that tells the story—never abstract disconnected circles and lines.
3. Access items via items[0]?.label and items[1]?.label or map.
4. BANNED: Drawing SVG <rect> elements that look like UI cards or flowcharts.
5. BANNED: Ending every slide with an identical 2-card bottom grid.
6. If layoutModel is 'contract-redline-autopsy', render a highlighted contract excerpt (<mark className="bg-[#FEF08A] text-[#121212] px-1.5 py-0.5 font-mono font-medium">) with section tags.
7. If layoutModel is 'typographic-broadsheet', render a 2-column broadsheet with drop cap and hairline dividers.
8. If layoutModel is 'investigative-timeline', render a continuous timeline rail with milestone nodes.

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
  return `You are a veteran investigative staff writer and copy chief at "The Fine Print" (in the tradition of ProPublica, The Wall Street Journal, and Vox Explains).
Your task is to write a compelling, publication-grade Instagram caption for an editorial carousel investigation in clear, gripping, plain English.

ABSOLUTE NEGATIVE CONSTRAINTS (STRICTLY BANNED):
1. ZERO RHETORICAL QUESTIONS as opening sentences ("Have you ever wondered...?", "Did you know that...?", "Are you tired of...?"). BANNED.
2. ZERO TECH-HYPE OR AI CLICHES ("In today's fast-paced digital world...", "Let's dive in", "Buckle up", "Here's the scoop", "Game changer", "At the end of the day", "Mind-blowing", "Game-changing", "Unpack"). BANNED.
3. ZERO EMOJI SPAM. Never use rocket ships (🚀), fire (🔥), brains (🧠), lightbulbs (💡), party poppers (🎉), or eyes (👀). At most 1 or 2 clean typographic markers (such as ▪ or →) for functional lists.
4. ZERO DENSE COURT-PROCEDURAL JARGON without immediate translation. Write like a master journalist explaining a real scandal to a smart friend.

EDITORIAL CONVERSION ARCHITECTURE:
- Line 1 (The Hook): A sharp, declarative factual statement naming the company, what they did, and the shocking human consequence.
- Paragraph 2 (The Mechanism): 2 to 3 concise, plain-language sentences explaining exactly how the fine print clause or corporate loophole trapped the consumer.
- Paragraph 3 (The Receipts): Exact verified citations from court dockets, arbitration filings, terms of service sections, or regulatory audits.
- Paragraph 4 (The Guardrail): The practical takeaway—what readers need to check in their own terms, opt-out timeframes (e.g., 30-day arbitration reject notices), or billing statements.
- Paragraph 5 (Conversion Sign-off):
  - Mention: "Full breakdown across the carousel above."
  - Save prompt: "Bookmark this receipt for your records."
  - Follow prompt: "Follow @thefineprint.pub for weekly investigative autopsies into corporate fine print."
  - Discussion prompt: A specific, provocative debate question on the corporate action to generate high-signal comment engagement.
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

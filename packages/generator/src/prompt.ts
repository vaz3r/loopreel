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
// STAGE 1: NARRATIVE & FACT INTELLIGENCE (UNIFIED DOSSIER)
// ============================================================================

export interface NarrativeDossier {
  articleTitle: string;
  publisher: string;
  byline: string;
  summary: string;
  hookHeadline: string; // 4-6 words
  valuePromise: string; // 8-12 words
  kicker: string; // CATEGORY / TENSION KICKER
  editorialTheme: string; // High-concept conceptual tone (e.g. "Forensic Financial Autopsy", "Tectonic Power Struggle", "Imperial Archaeological Monolith")
  visualMetaphor?: string; // Optional visual anchor
  narrativeBeats: Array<{
    beatTitle: string; // 2-3 word concept (e.g. "THE CATALYST", "THE BREAKAGE FLOAT")
    takeaway: string; // 6-10 word crisp takeaway statement
    keyReceipt: string; // Verified numerical data point or citation
  }>;
  coreConflict: {
    claim: string; // Primary corporate or PR claim (e.g. "Convenient digital gifting")
    reality: string; // Forensic reality or regulatory concern (e.g. "Interest-free corporate financing float")
  };
  hiddenCatches: string[]; // 2-3 bullet catches
  verifiedMetrics: Array<{ value: string; label: string; context?: string }>;
  verifiedQuotes: Array<{ quote: string; speaker: string; role?: string; context?: string }>;
  verdict: string; // Enduring consequence or takeaway
}

// Backward-compatible type aliases
export type NarrativeIntelligence = NarrativeDossier;
export type GroundTruthDossier = NarrativeDossier;

export function buildNarrativeIntelligenceSystemPrompt(): string {
  return `You are a World-Class Investigative Journalist, Chief Financial Analyst, and Editorial Director at The Economist, ProPublica, Reuters, Bloomberg, and The New York Times Magazine.
Your mission is to perform deep content analysis on an editorial subject and craft a definitive NarrativeIntelligence brief.

CRITICAL EDITORIAL & FACTUAL RULES:
1. EMPIRICAL FACTS & VERIFIED METRICS:
   - Provide concrete, verified numerical data, financial figures ($B, $M, percentages, multiples), regulatory milestones, and technical realities.
   - For corporate/financial topics: include real balance sheet numbers, breakage metrics, SEC filing disclosures, and consumer protection precedents.
   - For technology/engineering topics: include cluster sizes, parameter counts, benchmarks, latency, and hardware specs.
   - ZERO HALLUCINATION & ZERO META-ATTRIBUTIONS: Never write "The article states...", "According to the report...", or "Sentence marked [update]". Speak with primary journalistic authority!

2. TENSION-DRIVEN HOOK & VALUE FORMULA:
   - "hookHeadline": Short, punchy 4 to 6 words maximum. High-tension, provocative, active voice.
     * EXCELLENT: "Starbucks Is An Unregulated Bank"
     * EXCELLENT: "The $1.8 Billion Coffee Float"
     * EXCELLENT: "How Unspent Cards Finance Starbucks"
     * BANNED: Vague rhetorical questions ("Did you know this about gift cards?").
   - "valuePromise": 8 to 12 words explaining the systemic mechanism revealed by swiping through.
   - "kicker": Category and tension pair in uppercase (e.g. "SHADOW BANKING / STORED VALUE", "CONSUMER FINANCE / EXPOSED").

3. SLIDE-BY-SLIDE NARRATIVE BEATS:
   - Map out the exact sequence of editorial narrative beats (The Hook, The Catalyst, The Scale, The Flow/Evolution, The Systemic Collision, The Receipts, The Strategic Verdict).
   - STRICT BAN ON PROCESS DIAGRAMS OR CLIPART: DO NOT invent diagrams, pipes, conduits, or process flowcharts. Focus exclusively on authoritative journalism and tension-driven copy.

4. STRUCTURED CORE CONFLICT & CATCHES:
   - Contrast the corporate PR claim against the forensic mechanism.
   - Extract 2–3 high-signal hidden catches or loopholes.
   - Deliver a clear, authoritative editorial verdict.

Return strictly valid JSON matching this exact structure:
{
  "articleTitle": "Title of the investigation",
  "publisher": "Publisher name",
  "byline": "Author / Bureau",
  "summary": "2-sentence factual editorial summary of the core thesis and mechanism",
  "hookHeadline": "4-6 word punchy hook headline",
  "valuePromise": "8-12 word narrative promise",
  "kicker": "CATEGORY / TENSION KICKER",
  "editorialTheme": "Forensic Financial Autopsy",
  "narrativeBeats": [
    { "beatTitle": "THE HOOK", "takeaway": "Your prepaid card balances finance corporate operations interest-free.", "keyReceipt": "$1.8B float" },
    { "beatTitle": "THE ILLUSION", "takeaway": "Convenience masks an interest-free loan with zero deposit insurance.", "keyReceipt": "0% interest" },
    { "beatTitle": "THE BREAKAGE ENGINE", "takeaway": "Forgotten pocket change converts directly into pure corporate revenue.", "keyReceipt": "$222M annual breakage" }
  ],
  "coreConflict": {
    "claim": "Primary public/PR claim",
    "reality": "Forensic reality or regulatory loophole"
  },
  "hiddenCatches": [
    "High-signal caveat or hidden mechanism 1",
    "High-signal caveat or hidden mechanism 2"
  ],
  "verifiedMetrics": [
    { "value": "$1.8B", "label": "Stored value liabilities", "context": "10-K filing unspent customer card balance" },
    { "value": "$222M", "label": "Annual nonredemption revenue", "context": "Breakage profit recognized without delivering goods" }
  ],
  "verifiedQuotes": [
    { "quote": "...", "speaker": "...", "role": "..." }
  ],
  "verdict": "The enduring consequence or takeaway"
}`;
}

export function buildNarrativeIntelligenceUserPrompt(input: {
  article?: ArticleIntel;
  brief?: TemplateBrief;
  promptText?: string;
}): string {
  if (input.article) {
    return `Analyze this source reporting and produce the complete NarrativeIntelligence brief:
Article: "${input.article.title}"
Publisher: "${input.article.publisher}"
Byline: "${input.article.byline || 'Staff Bureau'}"

Raw Text:
${input.article.cleanText.slice(0, 14000)}

Output strictly valid JSON.`;
  }

  const topic = input.promptText || input.brief?.name || 'Editorial Investigation';
  const domain = input.brief?.domain || 'Investigative Corporate & Consumer Analysis';
  const vibe = input.brief?.vibe || input.brief?.inspiration || 'The Fine Print / Investigative Forensics';

  return `Conduct deep investigative research and author the complete NarrativeIntelligence brief on this topic:
Topic: "${topic}"
Domain: "${domain}"
Perspective / Focus: "${vibe}"

Output strictly valid JSON.`;
}

// ============================================================================
// STAGE 3: EDITORIAL STRATEGY & HOOK FORMULATION
// ============================================================================

export interface StoryStrategy {
  hookHeadline: string;
  valuePromise: string;
  kicker: string;
  visualMetaphor?: string;
  coreConflict: string;
  hiddenCatch: string;
  verdict: string;
  keyMetrics: Array<{ value: string; label: string; context: string }>;
  keyQuotes: Array<{ quote: string; speaker: string; role: string }>;
}

export type NarrativePreset =
  | 'storytelling'
  | 'news-reporting'
  | 'deep-dive'
  | 'financial-analysis'
  | 'case-study'
  | 'entertainment'
  | 'mythbuster'
  | 'playbook';

export function getNarrativeArc(preset: NarrativePreset = 'storytelling', targetSlideCount = 7): string {
  const count = Math.max(4, Math.min(14, targetSlideCount));

  if (preset === 'news-reporting') {
    const steps = [
      'Slide 1: BROADSHEET LEAD (Cover) — Definitive news headline, breaking event scope, and verified telemetry badge.',
      'Slide 2: THE BREAKING CHRONOLOGY — Verified chronological sequence of fast-moving developments.',
      'Slide 3: OFFICIAL POSITIONS & CLAIMS — What corporations, agencies, or state actors officially claimed.',
      'Slide 4: FORENSIC COUNTER-EVIDENCE — Independent documents, contradictory evidence, or satellite data.',
      'Slide 5: SYSTEMIC & FINANCIAL IMPACT — Hard verified telemetry, operational toll, or supply chain shock.',
      'Slide 6: STAKEHOLDER EXPOSURE — Who wins, who pays, and who carries the systemic risk.',
      'Slide 7: FORENSIC PAPER TRAIL — Internal memos, patent filings, contracts, or leaked records.',
      'Slide 8: REGULATORY & MARKET FALLOUT — Sanctions, antitrust filings, or market shockwaves.',
      'Slide 9: THE LOOMING MILESTONE — Upcoming court dates, hearings, or policy deadlines.',
      'Slide 10: BUREAU SOURCE AUDIT & VERDICT — Final balance of verified facts and critical unanswered questions.',
    ];
    return steps.slice(0, count - 1).concat([`Slide ${count}: BUREAU SOURCE AUDIT & VERDICT — Final balance of verified facts and critical unanswered questions.`]).join('\n     * ');
  }

  if (preset === 'deep-dive') {
    const steps = [
      'Slide 1: THE SYSTEMS THESIS (Cover) — The core engineering challenge and architectural paradigm shift.',
      'Slide 2: FIRST PRINCIPLES & BASELINE — Fundamental physical, computational, or thermodynamic limits.',
      'Slide 3: SYSTEM TOPOLOGY (UNDER THE HOOD) — How the core mechanism or model architecture functions.',
      'Slide 4: THE CRITICAL BOTTLENECK — Memory wall, thermal dissipation, latency, or compute ceiling.',
      'Slide 5: COMPONENT DATAFLOW & ARCHITECTURE — Stage-by-stage pipeline walkthrough with technical telemetry.',
      'Slide 6: BENCHMARK TELEMETRY & EFFICIENCY — P99 latency, FLOPS/watt, cost-performance curves.',
      'Slide 7: THE ARCHITECTURAL TRADEOFF MATRIX — What was sacrificed (consistency, cost, power, privacy).',
      'Slide 8: FAILURE MODES & EDGE CASES — What breaks under stress or adversarial inputs.',
      'Slide 9: DEPLOYMENT HORIZON — Production roadmap, ecosystem dependencies, and scaling hurdles.',
      'Slide 10: ARCHITECTURAL VERDICT & LESSONS — The lasting takeaway for systems engineers and builders.',
    ];
    return steps.slice(0, count - 1).concat([`Slide ${count}: ARCHITECTURAL VERDICT & LESSONS — The lasting takeaway for systems engineers and builders.`]).join('\n     * ');
  }

  if (preset === 'financial-analysis') {
    const steps = [
      'Slide 1: THE MARKET SHOCK (Cover) — The market-moving valuation event, earnings surprise, or capital shock.',
      'Slide 2: TOPLINE VS BOTTOMLINE — Revenue trajectory, net margin, and consensus delta.',
      'Slide 3: THE REVENUE ENGINE BREAKDOWN — Unit economics, segment growth, and customer acquisition efficiency.',
      'Slide 4: MARGIN COMPRESSION & HIDDEN COSTS — Operating leverage, R&D burden, and overhead drag.',
      'Slide 5: CASH RUNWAY & DEBT MATURITY — Free cash flow, liquidity runway, and balance sheet leverage.',
      'Slide 6: COMPETITIVE MOAT TEARDOWN — Market share shifts, pricing power, and churn vs competitors.',
      'Slide 7: BULL THESIS VS BEAR REALITY — Institutional upside case juxtaposed with downside exposure.',
      'Slide 8: MACRO CONTAGION & HEADWINDS — Currency volatility, rate sensitivity, tariffs, and inflation.',
      'Slide 9: THE GUIDANCE HORIZON — Management forecast, revisions, and the next earnings catalyst.',
      'Slide 10: WALL STREET VERDICT — Consensus valuation takeaway and capital allocation summary.',
    ];
    return steps.slice(0, count - 1).concat([`Slide ${count}: WALL STREET VERDICT — Consensus valuation takeaway and capital allocation summary.`]).join('\n     * ');
  }

  if (preset === 'case-study') {
    const steps = [
      'Slide 1: THE STRATEGIC PARADOX (Cover) — The existential crisis threatening market dominance.',
      'Slide 2: PRE-CRISIS DOMINANCE — The original moat, market share, and structural advantage.',
      'Slide 3: THE DISRUPTION TRIGGER — The technology or regulatory shock that broke the moat.',
      'Slide 4: THE STRATEGIC FORK — The competing internal executive options (Path A vs Path B).',
      'Slide 5: THE PIVOT DECISION — The capital, product, and organizational bet leadership made.',
      'Slide 6: MEASURABLE AFTERMATH — Market share, churn, retention, and operating margin shift.',
      'Slide 7: THE UNINTENDED TRADEOFFS — What was sacrificed to make the pivot work.',
      'Slide 8: THE COMPETITIVE REBALANCING — How rivals countered and reorganized the industry.',
      'Slide 9: OPERATIONAL LESSONS — Execution pitfalls and organizational friction.',
      'Slide 10: THE EXECUTIVE PLAYBOOK — 3 core transferable strategic lessons for leaders.',
    ];
    return steps.slice(0, count - 1).concat([`Slide ${count}: THE EXECUTIVE PLAYBOOK — 3 core transferable strategic lessons for leaders.`]).join('\n     * ');
  }

  if (preset === 'entertainment') {
    const steps = [
      'Slide 1: THE CULTURAL PHENOMENON (Cover) — Bold, witty hook that cuts through the internet noise.',
      'Slide 2: THE SPECTACLE / THE PITCH — The glossy promise that captured mainstream attention.',
      'Slide 3: BEHIND THE VELVET ROPE — What was actually happening behind closed doors and PR spin.',
      'Slide 4: THE GREAT POLARIZATION — Fanatics vs skeptics, internet discourse, and tribal lines.',
      'Slide 5: THE REALITY CHECK / CRASH — When the hype met cold operational friction.',
      'Slide 6: THE RECEIPTS (NUMBERS & MEMES) — The eye-opening metrics, churn data, or viral receipts.',
      'Slide 7: CULTURAL CONTAGION / THE RIPPLE — How competitors and copycats scrambled.',
      'Slide 8: THE CYNICAL TRAP — Why users or platforms are locked into this dynamic.',
      'Slide 9: THE NEXT DROP / IMMINENT CLIMAX — The upcoming sequel, product drop, or reckoning.',
      'Slide 10: THE CULTURAL VERDICT — What this phenomenon reveals about modern attention and society.',
    ];
    return steps.slice(0, count - 1).concat([`Slide ${count}: THE CULTURAL VERDICT — What this phenomenon reveals about modern attention and society.`]).join('\n     * ');
  }

  if (preset === 'mythbuster') {
    const steps = [
      'Slide 1: THE CONVENTIONAL WISDOM (Cover) — The widely repeated myth, PR talking point, or viral claim.',
      'Slide 2: WHY EVERYONE BELIEVED IT — The psychological, financial, or PR engine behind the belief.',
      'Slide 3: THE ANOMALY — The quiet contradiction or missing data that triggered scrutiny.',
      'Slide 4: THE REAL MECHANISM REVEALED — What is actually occurring beneath the surface.',
      'Slide 5: FORENSIC EVIDENCE & RECEIPTS — Independent data, physical tests, or leaked documentation.',
      'Slide 6: FOLLOW THE MONEY / WHO BENEFITS — The institutional incentives keeping the illusion alive.',
      'Slide 7: THE HIDDEN CASUALTIES — Who pays the cost or suffers the collateral damage.',
      'Slide 8: WHY THE MYTH PERSISTS — Institutional incentives and cognitive bias keeping it alive.',
      'Slide 9: THE LITMUS TEST — How the reader can independently spot this deception in the wild.',
      'Slide 10: THE REALITY CHECK VERDICT — The definitive factual record and final takeaway.',
    ];
    return steps.slice(0, count - 1).concat([`Slide ${count}: THE REALITY CHECK VERDICT — The definitive factual record and final takeaway.`]).join('\n     * ');
  }

  if (preset === 'playbook') {
    const steps = [
      'Slide 1: THE CORE FRAMEWORK (Cover) — The universal problem and the core mental model.',
      'Slide 2: WHY STANDARD PLAYBOOKS FAIL — The flawed conventional advice that creates bottlenecks.',
      'Slide 3: THE UNDERLYING PRINCIPLE — The fundamental dynamic that unlocks 10x leverage.',
      'Slide 4: PHASE 1: BASELINE DIAGNOSTIC — How to audit your current state before taking action.',
      'Slide 5: PHASE 2: HIGH-LEVERAGE INTERVENTION — The core strategic lever to pull first.',
      'Slide 6: PHASE 3: OPERATIONAL GUARDRAILS — Rules and metrics to prevent backsliding.',
      'Slide 7: COMMON FAILURE MODES & TRAPS — 3 mistakes where most teams derail.',
      'Slide 8: REAL-WORLD CASE EXAMPLE — Concrete proof of the framework deployed in production.',
      'Slide 9: THE DECISION MATRIX — Quick-reference logic tree for daily execution.',
      'Slide 10: THE DAY-ONE ACTION PLAN — Concrete immediate execution steps.',
    ];
    return steps.slice(0, count - 1).concat([`Slide ${count}: THE DAY-ONE ACTION PLAN — Concrete immediate execution steps.`]).join('\n     * ');
  }

  // Default: storytelling
  const steps = [
    'Slide 1: THE INCITING HOOK (Cover) — What surprising event happened, what is at stake, and why everything changes now.',
    'Slide 2: THE FLASHPOINT — The pivotal catalyst or trigger event that broke the equilibrium.',
    'Slide 3: THE HIDDEN DYNAMIC — What most people miss: the quiet structural vulnerability, underlying motive, or pre-existing tension.',
    'Slide 4: THE COLLISION / OPPOSING FRONTS — Direct clash of conflicting claims, opposing forces, or asymmetric strategies.',
    'Slide 5: THE TURNING POINT — The strategic escalation or breakthrough that crossed the point of no return.',
    'Slide 6: GROUND REALITY & SYSTEMIC TOLL — Hard verified numbers, operational disruption, or human and economic weight.',
    'Slide 7: THE UNINTENDED RIPPLE — Global or regional side effects (trade routes, diplomacy, market contagion, energy).',
    'Slide 8: THE HIGH-STAKES DILEMMA — The trap: what both sides are caught between and why easy exits failed.',
    'Slide 9: THE DECISIVE PRESSURE POINT — The looming deadline, bottleneck, political clock, or threshold that forces a climax.',
    'Slide 10: THE STRATEGIC VERDICT — The permanent shift in the landscape and the lingering question the reader must reckon with.',
  ];
  return steps.slice(0, count - 1).concat([`Slide ${count}: THE STRATEGIC VERDICT — The permanent shift in the landscape and the lingering question the reader must reckon with.`]).join('\n     * ');
}

export function buildStoryStrategySystemPrompt(preset: NarrativePreset = 'storytelling'): string {
  let personaDesc = 'You are the Editor-in-Chief at Wired, The New York Times Magazine, and Vox.';
  let focusDesc = 'Use the tension formula: [Surprising Action / Event] + [The Hidden Catch / Systemic Stakes].';

  if (preset === 'news-reporting') {
    personaDesc = 'You are an Investigative Bureau Chief at The Financial Times, Reuters, and ProPublica.';
    focusDesc = 'Use the forensic lead formula: [Breaking Verified Action / Finding] + [Contradiction / Institutional Stakes].';
  } else if (preset === 'deep-dive') {
    personaDesc = 'You are a Principal Systems Research Editor at Stripe Press, MIT Technology Review, and Bell Labs.';
    focusDesc = 'Use the systems thesis formula: [Architectural / Engineering Shift] + [The Physical / Computational Bottleneck].';
  } else if (preset === 'financial-analysis') {
    personaDesc = 'You are a Senior Equity Research Director at Bloomberg Intelligence and Wall Street Journal.';
    focusDesc = 'Use the valuation shock formula: [Topline Valuation / Capital Event] + [The Margin / Cash Burn Reality].';
  } else if (preset === 'case-study') {
    personaDesc = 'You are a Senior Partner at Harvard Business Review and McKinsey Quarterly.';
    focusDesc = 'Use the strategic dilemma formula: [Existential Market Threat] + [The Strategic Choice & Tradeoff].';
  } else if (preset === 'entertainment') {
    personaDesc = 'You are a Culture & Tech Editor at The Verge, New Yorker, and Wired.';
    focusDesc = 'Use the zeitgeist formula: [The Viral Cultural Spectacle] + [The Cynical Truth / The Receipts].';
  } else if (preset === 'mythbuster') {
    personaDesc = 'You are a Lead Forensic Investigator at Vox Explained and Bellingcat.';
    focusDesc = 'Use the mythbuster formula: [The Common PR Illusion] + [The Undeniable Counter-Evidence].';
  } else if (preset === 'playbook') {
    personaDesc = 'You are a Master Operator and Author at Farnam Street and First Round Review.';
    focusDesc = 'Use the playbook formula: [Universal Bottleneck / Flawed Practice] + [The 10x Mental Model].';
  }

  return `${personaDesc}
Your mission is to transform verified facts into a scroll-stopping, high-signal editorial carousel strategy.

CRITICAL HOOK & VALUE PRINCIPLES:
1. THE SCROLL-STOPPING HOOK (Slide 1):
   - Never use passive corporate titles or dry academic headings.
   - ${focusDesc}
   - Examples of great hooks:
     * "The Forgotten Port That Defied Two Empires"
     * "War Erupted During Nuclear Talks. What Went Wrong Behind Closed Doors."
     * "The $1,000 Indoor Drone: What Amazon’s Patent Disclosures Actually Reveal."
2. THE VALUE PROPOSITION:
   - State clearly why the reader must swipe through (e.g. "From Phoenician trade outpost to Roman colony, why Tipaza's ruin reshaped North African history.").
3. HIGH-SIGNAL EXTRACTION:
   - Ground strictly in the provided GroundTruthDossier.
   - Do NOT mention "the article" or "the text". Speak with primary editorial authority.

Return strictly valid JSON matching this exact structure:
{
  "hookHeadline": "Short, punchy 4-6 word hook headline",
  "valuePromise": "Compelling 8-12 word narrative promise of what the carousel reveals",
  "kicker": "CATEGORY / TENSION KICKER",
  "visualMetaphor": "The physical visual anchor for the story (e.g. an unregulated bank vault disguised as a latte cup)",
  "coreConflict": "The fundamental tension or opposing forces",
  "hiddenCatch": "The quiet factor or structural vulnerability overlooked by most",
  "verdict": "The enduring consequence or takeaway",
  "keyMetrics": [{ "value": "Metric", "label": "Label", "context": "Context" }],
  "keyQuotes": [{ "quote": "Quote text", "speaker": "Speaker", "role": "Role" }]
}`;
}

export function buildStoryStrategyUserPrompt(
  dossier: NarrativeDossier,
  _article?: ArticleIntel
): string {
  return `Formulate the EditorialStrategy using this verified ground truth:
Article: "${dossier.articleTitle}" (${dossier.publisher})
Summary: "${dossier.summary}"
Conflict: ${JSON.stringify(dossier.coreConflict)}
Metrics: ${JSON.stringify(dossier.verifiedMetrics)}
Catches: ${JSON.stringify(dossier.hiddenCatches)}

Output strictly the StoryStrategy JSON.`;
}

// ============================================================================
// STAGE 4: SENIOR COPY EDITOR & LAYOUT ARCHITECT (LOCKED STORYBOARD + VISUAL STYLES)
// ============================================================================

export function buildStoryDeckSystemPrompt(
  preset: NarrativePreset = 'storytelling',
  targetSlideCount = 7
): string {
  const count = Math.max(4, Math.min(14, targetSlideCount));
  const arcDescription = getNarrativeArc(preset, count);

  return `You are a World-Class Visual Journalism Creative Director and Senior Editor at The New York Times Graphics Desk, Reuters, Wired, and The Financial Times.
You author scroll-stopping, high-impact editorial carousel content engineered for MOBILE INSTAGRAM (3-SECOND SCAN RULE).
Every slide must look like an art-directed museum publication graphic (inspired by benchmark 'tipaza')—NEVER an off-the-shelf web UI, web dashboard, or corporate slide deck.

CRITICAL EDITORIAL & VISUAL ARCHITECTURE RULES:

1. THE 3-SECOND MOBILE SCAN RULE (STRICT WORD BUDGETS):
   On a mobile smartphone screen, users swipe in 3 seconds. Dense text is an instant failure.
   - HEADLINES: 4 to 6 words maximum. High-tension, active voice, zero passive jargon.
   - SUBHEADLINES: 6 to 10 words maximum (1 clean sentence or omit if headline is self-explanatory).
   - CARD / POINT BODY: STRICT 5 TO 8 WORDS MAXIMUM PER ITEM! Every word must hit like a punchy bullet.
     * BAD: "Starbucks receives prepayment. Customers receive spending value—not interest or FDIC insurance." (11 words)
     * GOOD: "You lend them cash. You earn **0% interest** with **zero FDIC insurance**." (8 words)
     * BAD: "Combined company-operated and licensed store breakage revenue calculated from segment disclosures." (12 words)
     * GOOD: "**$222M in pure profit** harvested from forgotten card change." (7 words)
     * BAD: "Non-bank stored value falls outside federal reserve ratio requirements and deposit insurance frameworks." (13 words)
     * GOOD: "**Zero reserve requirements.** If they fail, your balance vanishes." (7 words)
   - CARD TITLES: 2 to 3 words maximum (e.g. "THE ILLUSION", "THE FINE PRINT", "THE FLOAT", "ZERO INSURANCE").
   - MANDATORY BOLD SKIM ANCHORS: You MUST bold the single highest-signal takeaway phrase in every point (e.g. **0% interest**, **$1.8B float**, **zero protection**).

2. STRICT BAN ON WEB UI TROPES & DASHBOARD PATTERNS:
   - FORBIDDEN: Drop shadows ('shadow-lg', 'shadow-md'), pill badges on kickers/cards ('rounded-full'), thick left accent borders ('border-l-[6px]'), HTML progress bars with rounded indicators.
   - REQUIREMENT: Sharp architectural 0px/2px corners, crisp 1px hairline borders ('border border-[var(--border)]'), monospace kickers with square indicator dots, and pure tabular telemetry.

3. AUTONOMOUS DYNAMIC ARCHETYPE & TOPOLOGY SELECTION:
   For EACH slide, you MUST choose a bespoke archetype, visual style, and spatial layout topology that best dramatizes what that slide proves:
   - Slide 1 (EXCLUSIVELY): "monumental-editorial-cover"
     Broadsheet magazine cover with monospace kicker + square accent dot, monumental 64px condensed headline, 1px divider hairline, dominant abstract architectural SVG vector centerpiece (45%-55% canvas, viewBox="0 0 952 650"), and a clean footer metadata ledger. NEVER use this on Slide 2+!
   - Slides 2–${count}: Autonomously select from rich editorial archetypes:
     * "asymmetric-editorial-cards": High-contrast asymmetric multi-panel layout (1 hero panel + 1 secondary ledger card) with sharp 0px/2px corners, 1px hairlines, and background architectural vector line art (viewBox="0 0 952 420").
     * "hero-metric-placard": Massive tabular numeral (96px-110px) in accent color, uppercase mono metric label, and an architectural abstract SVG dimension rule or rupture (viewBox="0 0 952 440").
     * "vertical-milestone-spine": Continuous 1px vertical hairline spine with square milestone markers, monospace timeline tags, and punchy impact bullets (MAX 3 milestones total, viewBox="0 0 952 480").
     * "full-height-editorial-split": 50/50 or 60/40 vertical split: one half is a dominant abstract architectural vector elevation or tectonic section (viewBox="0 0 448 370"); the other half is editorial typography with crisp 1px bordered ledger cards.
     * "three-row-verification-ledger": Clean 3-row tabular ledger divided by 1px hairlines ('divide-y divide-[var(--border)]') with monospace indexes [01], [02], [03], 2-word labels, 5-8 word findings with bold anchors, and right-aligned metric badges.
     * "conditional-release-rail": Stacked horizontal cadence tracks with solid shipping endpoints vs open dashed authorization gates and date plates (viewBox="0 0 952 420").
     * "optical-sector-versus-scan-reticle": Circular instrument comparison field with accurate field-of-view arcs, rotation arrows, and resolution badges (viewBox="0 0 448 370" each or 952 420).
   TOPOLOGY DIVERSITY MANDATE: You MUST use at least 4 to 5 different layout topologies across the deck. Strictly ban repeating the same card layout across multiple slides!

4. DYNAMIC NARRATIVE ARC (${count} SLIDES — NEVER A FLAT SUMMARY):
   * ${arcDescription}

5. STRICT WORD BUDGET & ANTI-CRAMMING (Anti-Overflow Guardrail):
   - Maximum 2 items per slide! (Milestone spine: max 3 compact milestones).
   - Total words per slide: STRICTLY 25 to 50 words across the entire slide.
   - Headlines: Maximum 4–6 words.
   - Subheadlines: Maximum 6–10 words.
   - Card / item body: STRICT 5 TO 8 WORDS MAXIMUM PER ITEM! Every word must be punchy, high-signal, and editorial.
   - Telemetry values: MUST be strictly numerical or signed badge ("$1.8B", "0%", "$222M", "+12%"). Qualifiers belong in label.

Return strictly a JSON array of exactly ${count} slide objects (PURE EDITORIAL COPY ONLY — DO NOT WRITE SVG BLUEPRINTS):
[
  {
    "id": "slide-1",
    "index": 0,
    "type": "cover",
    "archetype": "monumental-editorial-cover",
    "kicker": "CONSUMER FINANCE / EXPOSED",
    "headline": "The $1.8 Billion Coffee Bank",
    "subheadline": "How unspent gift card balances created an unregulated, interest-free corporate float.",
    "visualStyle": "monumental-editorial-cover",
    "layoutTopology": "monumental-editorial-cover",
    "issueBadge": "SPECIAL INVESTIGATION · ${count} SLIDES",
    "telemetry": [
      { "badge": "$1.8B", "label": "Customer cash held on cards" },
      { "badge": "$222M", "label": "Annual profit from unused balances" }
    ]
  },
  {
    "id": "slide-2",
    "index": 1,
    "type": "belief",
    "archetype": "asymmetric-editorial-cards",
    "kicker": "THE ILLUSION",
    "headline": "Convenience Hides The Tradeoff",
    "subheadline": "Customers pay cash before purchasing a single item.",
    "items": [
      { "title": "WHAT YOU THINK", "body": "Gift cards are **convenient digital cash** for coffee." },
      { "title": "WHAT IT ACTUALLY IS", "body": "An **unregulated interest-free loan** to Starbucks." }
    ],
    "telemetry": [
      { "badge": "$0", "label": "Interest paid to cardholders" },
      { "badge": "0%", "label": "FDIC deposit protection" }
    ],
    "visualStyle": "asymmetric-editorial-cards",
    "layoutTopology": "asymmetric-editorial-cards"
  }
]`;
}

export function buildStoryDeckUserPrompt(
  dossier: NarrativeDossier,
  brand: BrandTokens,
  targetSlideCount = 7,
  strategy?: StoryStrategy
): string {
  const count = Math.max(4, Math.min(14, targetSlideCount));
  const hook = strategy?.hookHeadline || dossier.hookHeadline || 'Editorial Investigation';
  const promise = strategy?.valuePromise || dossier.valuePromise || '';
  const kicker = strategy?.kicker || dossier.kicker || 'SPECIAL REPORT';
  const conflict = strategy?.coreConflict
    ? strategy.coreConflict
    : dossier.coreConflict
    ? `Claim: "${dossier.coreConflict.claim}" vs Reality: "${dossier.coreConflict.reality}"`
    : '';
  const catches = strategy?.hiddenCatch || (dossier.hiddenCatches || []).join('; ');
  const verdict = strategy?.verdict || dossier.verdict || '';
  const metaphor = strategy?.visualMetaphor || dossier.visualMetaphor || dossier.editorialTheme || 'Architectural structural silhouettes';

  return `Author the ${count}-slide storyboard, crafting pure editorial copy and assigning diverse layout topologies for each slide:

Publication: "${brand.name}" (${brand.domain})
Palette: Paper ${brand.palette.paper}, Ink ${brand.palette.ink}, Accent ${brand.palette.accent}, Surface ${brand.palette.surface}
Hook Headline: "${hook}"
Value Promise: "${promise}"
Kicker: "${kicker}"
Core Visual Metaphor: "${metaphor}"
Core Conflict: "${conflict}"
Hidden Catches: "${catches}"
Verdict: "${verdict}"

TOPOLOGY DIVERSITY MANDATE:
- Slide 1: "monumental-editorial-cover" (broadsheet magazine cover).
- Slides 2-${count}: Autonomously select AT LEAST 4 to 5 DIFFERENT layout topologies from:
  * "asymmetric-editorial-cards"
  * "hero-metric-placard"
  * "vertical-milestone-spine"
  * "full-height-editorial-split"
  * "three-row-verification-ledger"
  * "conditional-release-rail"
  * "optical-sector-versus-scan-reticle"
Strictly ban repeating the same card layout across multiple slides!

Verified Data & Metrics:
${JSON.stringify(dossier.verifiedMetrics || [], null, 2)}
Quotes:
${JSON.stringify(dossier.verifiedQuotes || [], null, 2)}

Output strictly the JSON array of exactly ${count} slide objects. Remember: PURE EDITORIAL COPY ONLY, MAX 8 WORDS PER CARD BODY WITH **BOLD ANCHORS**, STRICT NUMERICAL TELEMETRY BADGES, AND ZERO WEB UI SHADOWS OR PILLS!`;
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
// STAGE 5: VISUAL ART DIRECTOR & LAYOUT ARCHITECT (SVG & SPATIAL BLUEPRINTS)
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

export function buildVisualBlueprintSystemPrompt(targetSlideCount = 7): string {
  const count = Math.max(4, Math.min(14, targetSlideCount));
  return `You are an Information Designer and Art Director at Pentagram, Monocle, Wired, and The New York Times Graphics Desk.
Your task is to plan the bespoke visual layout architecture and detailed vector SVG infographic concept for each slide in an editorial carousel deck (${count} slides).

CRITICAL VISUAL DESIGN PRINCIPLES:
1. Bespoke Editorial Information Design (Tangible Specimens & Infographics - NEVER Bare Rectangles):
   - Slide 1 (Cover): Dominant visual centerpiece occupying 45%–55% of the frame (e.g. diagonal dual trajectories with price plates, fluted column elevation section, physical EMV chip stored-value card specimen, circular bank vault door, or hardware schematic).
   - Slides 2–${count}: Each slide MUST have a tailored visual architecture depicting concrete, recognizable physical or technical artifacts matching its content:
     * For Financial & Corporate Forensics:
       - Physical payment / gift card with gold EMV microchip (6 contact pads), contactless wave arcs, embossed numbers, and magnetic stripe.
       - Thermal cash register receipt specimen with authentic barcode stripes (1px to 5px widths) and serrated cut edge.
       - Heavy circular bank vault door with radiating locking lugs, combination dial ticks, and central wheel.
       - Fluid liquidity reservoir tank with graduated volumetric capacity ticks ($0 to $1.8B), inlet wallet pipe, float retention zone, and breakage drainage trap.
       - Asymmetric balance beam scale with triangular fulcrum tipped by corporate float.
     * For Technology & Systems:
       - Schematic multi-rotor drone with motor arms, rotor hubs, 4 propeller ellipses, and camera gimbal.
       - Wheeled rover robot with chassis, lens mast, and treaded wheels.
       - Circular optical camera sector arc (148° wedge, lens circles, LED sensor marks).
       - Silicon die floorplans, bus interconnect traces, and latency benchmark scales.
     * For History, Politics & Architecture:
       - Classical Corinthian or Doric fluted column with base, capital, and jagged accent fracture line.
       - Harbor breakwater, maritime coastline contours, or archaeological basilica floorplans.
     * For Timelines & Sequences: Horizontal release tracks with authorization gates, or continuous vertical hairline spines with beveled milestone panels.
     * For Metrics & Placards: Massive tabular numerals with attribution cards, registration crosshairs, and 1px dimension hairlines.
   - ABSOLUTE BAN: ZERO bare empty rectangles! Every SVG blueprint must instruct the engineer to construct at least 15–30 detailed vector elements depicting the specimen's internal anatomy.

2. Visual Contrast & Tonal Depth:
   - STRICT BAN on invisible dark-on-dark fills (never use #141418 on #0A0A0C without visible strokes).
   - Use layered architectural linework:
     * Structural bounds & hairlines: stroke="var(--border)" or stroke="var(--ink)" strokeOpacity="0.25" with strokeWidth="1.5" or "2".
     * Tonal surface fills: fill="var(--surface)" or fill="var(--ink)" fillOpacity="0.06".
     * Focal gestures & trajectories: stroke="var(--accent)" strokeWidth="2.5" to "3.5", or fill="var(--accent)".
     * Registration marks: crosshairs, corner ticks, and coordinate indices with strokeOpacity="0.4".

3. Space Balance & Composition:
   - Content must organically fill 80%–95% of the vertical canvas height.
   - The visual graphic or infographic centerpiece must occupy 40%–60% of the frame, giving the editorial copy strong visual support.
   - BAN crude rectangular bar chart blocks and tiny isolated wireframe icons! All graphics must be unified, cohesive vector illustrations with deliberate viewBox coordinates.

4. Vector Typography & Diagrams in SVG:
   - Body copy, titles, descriptions, and paragraphs belong strictly in HTML/Tailwind.
   - However, standalone vector callouts, numerical badges, degree marks, unit labels, or date plates directly anchored to the vector artwork (e.g. '$250', '$1,000', '148°', '4K', '430 CE', 'Dec 16') are encouraged inside SVG <text> elements with clean font classes and coordinates.
   - ABSOLUTE BAN: Never draw fake text wireframe paths (d="M...H..."). Never simulate text with hatching lines!

5. STRICT VIEWBOX HEIGHT & VERTICAL CANVAS BUDGET (Anti-Overflow Law):
   The interior safe area height is strictly 1028px. All slides MUST conform to these viewBox height limits:
   - Slide 1 (Cover): viewBox="0 0 952 650" (dominant cover specimen; minimal footer metadata).
   - Slides 2–${count} WITH BOTTOM CARDS OR LEDGER: viewBox MUST BE BETWEEN 952×360 AND 952×420 (e.g. viewBox="0 0 952 380" or viewBox="0 0 952 400").
     STRICTLY FORBIDDEN: Using a 650px–700px height viewBox when cards or ledger rows are rendered beneath the SVG! A 650px SVG plus cards forces vertical canvas overflow and fails the visual audit!
   - Half-Width Columns (full-height-editorial-split): viewBox="0 0 448 370" to viewBox="0 0 448 420".

Return strictly a JSON array of exactly ${count} SlideDesignBlueprint objects:
[
  {
    "slideId": "slide-1",
    "type": "cover",
    "layoutStructure": "monumental-editorial-cover",
    "svgConcept": {
      "type": "schematic",
      "description": "viewBox='0 0 952 650'. Imposing geometric stored-value card silhouette or physical specimen with gold EMV chip (6 contact pads), 1px magnetic stripe hairline, fluid liquidity reservoir watermark, and micro-coordinates [37°N 122°W]. 20+ geometric vector elements with layered surface fills and border hairlines.",
      "elements": ["stored-value-card-silhouette", "emv-contact-pad-grid", "magnetic-stripe-hairline", "micro-coordinates"]
    },
    "typographyScale": {
      "headlineSize": "text-[64px]",
      "subtitleSize": "text-[26px]"
    },
    "spatialBalanceGuidance": "Header zone occupies top 220px; SVG centerpiece occupies middle 500px; bottom metadata ledger occupies bottom 100px. Fills 90% of vertical canvas."
  },
  {
    "slideId": "slide-2",
    "type": "editorial",
    "layoutStructure": "asymmetric-editorial-cards",
    "svgConcept": {
      "type": "schematic",
      "description": "viewBox='0 0 952 420'. Subtle geometric balance-sheet grid with 1px hairlines, crosshair registration marks, and fluid float conduit behind cards. Layered architectural linework.",
      "elements": ["balance-sheet-grid", "registration-crosshairs", "float-conduit-trace"]
    },
    "typographyScale": {
      "headlineSize": "text-[64px]",
      "subtitleSize": "text-[26px]"
    },
    "spatialBalanceGuidance": "Header zone 180px; two full-height asymmetric cards occupy remaining 760px using grid-rows-2 with p-8 padding."
  }
]`;
}

export function buildVisualBlueprintUserPrompt(
  slides: SlideData[],
  brand: BrandTokens,
  dossier: NarrativeDossier,
  strategy?: StoryStrategy
): string {
  const metaphor = strategy?.visualMetaphor || brand.vibe || dossier.visualMetaphor || dossier.editorialTheme || 'Technical editorial autopsy';
  const hook = strategy?.hookHeadline || dossier.hookHeadline || '';

  return `Design the bespoke visual layout architecture and SVG infographic blueprints for these ${slides.length} slides:

Publication: "${brand.name}" (${brand.domain})
Palette: Accent ${brand.palette.accent}, Paper ${brand.palette.paper}, Surface ${brand.palette.surface}, Ink ${brand.palette.ink}, Border ${brand.palette.border}
Theme / Metaphor: "${metaphor}"
Hook Headline: "${hook}"
Key Metrics: ${JSON.stringify(dossier.verifiedMetrics || [])}

Slides Content & Intent:
${JSON.stringify(slides.map(s => ({
  id: s.id,
  type: s.type,
  headline: s.headline,
  subheadline: s.subheadline,
  items: s.items,
  telemetry: s.telemetry,
  visualStyle: s.visualStyle,
  layoutTopology: s.layoutTopology
})), null, 2)}

Output strictly the JSON array of exactly ${slides.length} SlideDesignBlueprint objects.`;
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
1. Component Signature & Explicit TypeScript Interfaces:
   \`\`\`tsx
   import React from 'react';
   import { parseMetricBadge, type SlideComponentProps } from '../../../src/skeleton/types';

   export default function SlideNN({ slide, brand, totalSlides }: SlideComponentProps) {
     return ( ... );
   }
   \`\`\`

   EXACT TYPESCRIPT DATA STRUCTURE:
   \`\`\`tsx
   export interface SlideData {
     id: string;
     index: number;
     type: string;
     archetype:
       | 'monumental-editorial-cover'
       | 'asymmetric-editorial-cards'
       | 'hero-metric-placard'
       | 'vertical-milestone-spine'
       | 'full-height-editorial-split'
       | 'three-row-verification-ledger'
       | 'conditional-release-rail'
       | 'optical-sector-versus-scan-reticle';
     layoutTopology?: string;
     visualStyle?: string;
     svgBlueprint?: string;
     kicker?: string;
     headline?: string;
     subheadline?: string;
     issueBadge?: string;
     items?: Array<{
       title?: string;
       body?: string;
       tag?: string;
       metric?: { badge: string; label: string };
     }>;
     telemetry?: Array<{
       badge: string;
       label: string;
     }>;
     closingTakeaway?: string;
   }
   \`\`\`

2. Creative Freedom & Architectural Information Design:
   - You MUST implement the specific "Visual Style", "Layout Topology", and "Bespoke SVG Blueprint" assigned to this slide!
   - STRICT BAN ON REPETITIVE WIREFRAME BOXES: Do NOT just render identical grey cards on every slide.
   - If the layout topology is:
     * "airborne-grounded-editorial-hero" or "diagonal-dual-trajectory": render prominent custom inline vector SVGs taking 40%–60% of vertical space with curved accent trajectory arrows, device glyphs, price plates, and registration crosshairs.
     * "conditional-release-rail" or "horizontal-release-tracks": render stacked horizontal release timeline tracks with authorization gates and status endpoint panels.
     * "optical-sector-versus-scan-reticle" or circular instrument layouts: render circular instrument fields with field-of-view pie wedges and location scan reticles.
     * "floorplan-convergence-diagram": render an architectural 2D floorplan with convergence paths and room patrol points.
     * "architectural-material-hazard-section" or isometric cutaways: render a 3D isometric room cutaway with callout pointers.
     * "stored-value-escrow-strata" or "asymmetric-editorial-cards": render stacked asymmetric ledger cards with staggered offsets ('mr-10' on top, 'ml-10' on bottom), internal breathing spacers ('<div aria-hidden="true" className="h-[120px] shrink-0" />'), and balance-sheet strata linework.
     * "vertical-milestone-spine": render a continuous 1px hairline spine with milestone nodes.
     * "hero-metric-placard": render a massive tabular numeral (96px–110px) with attribution cards and dimension hairlines.
     * "three-row-verification-ledger": render a clean 3-row tabular ledger divided by 1px hairlines with monospace indexes.
   - Pure SVG geometry & vector callouts: ZERO clipart! All body copy, titles, and descriptions belong in HTML/Tailwind. Standalone vector numerical callouts, degree marks, unit labels, or compact date plates directly anchored to the vector artwork (e.g. '$250', '$1,000', '148°', '4K', '430 CE') are permitted and encouraged in SVG <text> elements with clean font classes and coordinates. BANNED: Never draw fake text wireframe paths (d="M...H...") or long multi-sentence paragraphs in SVG.
   - Frame your layouts with sharp 0px/2px corners, 1px hairlines, and spacious asymmetric grids.

3. Theme & Token Integration:
   - STRICT NEGATIVE CONSTRAINT: DO NOT declare an inline theme object (e.g. 'const theme = { ... }' or 'const currentBrand = { ... }') and NEVER apply 'style={theme}' or inline style objects! The canvas CSS variables (--ink, --accent, --paper, --surface, --border, --font-headline, --font-body, --font-mono) are injected globally by SlideFrame.
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
     * Universal main headlines: MUST be locked at text-[64px] (font-headline font-bold leading-[1.02] to leading-[1.05] tracking-[-0.04em]) across full-width layouts! Never shrink full-width headlines below text-[56px].
     * HALF-WIDTH HEADLINE EXCEPTION (full-height-editorial-split): In half-width columns (~448px in grid-cols-2), main headlines MUST be sized between text-[44px] and text-[48px] (leading-[1.08] tracking-[-0.035em]) to prevent vertical crowding, 4-line wrapping, and crushing cards below.
     * Subheadlines: MUST be text-[26px] to text-[28px] (leading-snug text-[var(--ink)]/80).
     * Body copy & descriptions: MUST be text-[24px] to text-[28px] (leading-snug / leading-normal).
     * Card / section titles: MUST be text-[32px] to text-[38px] (font-semibold).
     * Kickers, badges, tags, metadata: MUST be text-[20px] to text-[22px] (font-mono tracking-wider).
     * Monumental hero metrics: text-[84px] to text-[112px] (font-mono font-bold) ONLY when full-width (hero-metric-placard)!
     * MULTI-COLUMN FONT CEILING: In 2-column, 3-column, or split diptychs, metric numerals MUST NOT exceed text-[48px] to text-[56px]! text-[84px] is strictly forbidden inside half-width columns because it causes horizontal clipping and overflows into adjacent columns.
     * MULTI-ROW LEDGER CEILING: In 3-row stacked ledgers (grid-rows-3), metric numerals MUST NOT exceed text-[38px] to text-[42px], and card titles MUST NOT exceed text-[26px] to text-[28px]! This guarantees zero vertical crowding and ample breathing room.
     * CANONICAL BADGE PARSING: Always parse badges cleanly using parseMetricBadge:
       import { parseMetricBadge, type SlideComponentProps } from '../../../src/skeleton/types';
       const { qualifier, value: metric, unit } = parseMetricBadge(item.badge);
       // In JSX:
       <div className="flex shrink-0 items-baseline gap-2">
         {qualifier && <span className="font-[var(--font-body)] text-[22px]">{qualifier}</span>}
         <span className="font-[var(--font-mono)] text-[40px] font-bold tabular-nums">{metric}</span>
         {unit && <span className="font-[var(--font-body)] text-[22px]">{unit}</span>}
       </div>
       STRICTLY FORBIDDEN: Writing 'const metric = remainingWords;' or rendering unindexed array slices in JSX! In JavaScript, an array rendered in JSX concatenates into a collapsed token (e.g. "5.2millionunits") without spaces.

5. ZERO-OVERFLOW & NATURAL FLOW (Ban overflow-hidden):
   - The interior safe area is strictly ${isStories ? '952px wide by 1596px high' : isSquare ? '952px wide by 758px high' : '952px wide by 1028px high'}.
   - NEVER put 'overflow-hidden' on the top-level <section>! 'overflow-hidden' clips content and conceals overflow.
   - Outer wrapper signature: className="flex flex-col h-full min-h-0 w-full text-[var(--ink)]"
   - Multi-card grids: Use 'gap-5' or 'gap-6', card padding 'py-5 px-7' or 'py-6 px-8'.
   - Limit items to 2 or 3 per slide so the larger 24px-28px body text fits effortlessly without overflow.
   - SVG CONTAINER HEIGHT CONSTRAINT: When an SVG is paired with bottom cards, articles, or ledgers, ALWAYS constrain the SVG's height with 'max-h-[360px]' or 'max-h-[380px]' (e.g. className="block w-full max-h-[380px] min-h-0 text-[var(--ink)]"). Never let an unconstrained 650px tall SVG push bottom cards beyond the 1028px canvas safe area!
   - AutoFit scale MUST remain 1.000 (no scaling needed).
   - Always respect the locked text provided—do not invent new text or exceed word counts.

6. Technical Constraints:
   - Output ONLY self-contained React TypeScript JSX in a \`\`\`tsx code block.
   - Pure Tailwind and SVG only (NO external icon libraries, no lucide-react).
   - Do NOT output the outer ${canvasWidth}x${canvasHeight} wrapper or header/footer—SlideFrame provides those.

7. CANONICAL DATA BINDING (BAN UNINDEXED & DOUBLE-INDEXED ACCESS):
   - 'slide.items' is an ARRAY of objects [{ title: "...", body: "...", tag: "..." }, ...].
     Always bind as:
     const items = slide.items ?? [];
     const item0 = items[0];
     const item1 = items[1];
     Access in JSX: {item0?.title}, {item0?.body}, {item1?.title}, {item1?.body}.
     STRICTLY FORBIDDEN: Writing {items?.title} or {items?.body}! An Array has no .title or .body.
   - 'slide.telemetry' is an ARRAY of objects [{ badge: "...", label: "..." }, ...].
     Always bind cleanly:
     const telemetry = Array.isArray(slide.telemetry) ? slide.telemetry : [];
     const t0 = telemetry[0] ? parseMetricBadge(telemetry[0].badge) : null;
     const t1 = telemetry[1] ? parseMetricBadge(telemetry[1].badge) : null;
     CRITICAL: NEVER write 'const telemetry = slide.telemetry?.[0]; ... telemetry?.[0]?.badge;'! That double-indexes, evaluates to undefined, and makes the metric BLANK!
   - SPLIT ARRAYS & STRING METHODS:
     * If you do 'const parts = (label ?? "").split(...)', 'parts' is an ARRAY of strings.
     * Always index explicitly: 'parts[0]', 'parts[1]', 'parts[0]?.toLowerCase()'.
     * STRICTLY FORBIDDEN: Writing 'parts?.toLowerCase()' or 'const val = parts;'! In JavaScript, an Array has no .toLowerCase() method. Doing so causes fatal runtime crash: 'TypeError: parts.toLowerCase is not a function'.
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
     * STRICTLY FORBIDDEN: Writing '{items?.label}', '{items?.body}', '{items?.metric}', or '{items?.metric?.badge}'! In JavaScript/TypeScript, an Array object has NO .label, .body, or .metric property. Doing so causes fatal TypeScript compilation failure ("Property 'metric' does not exist on type 'Item[]'").
     * When accessing item metrics or badges: ALWAYS index explicitly: '{items[0]?.metric?.badge}', '{items[1]?.metric?.badge}', or '{rows[0]?.item?.metric?.badge}'.
   - WHEN CREATING HELPER ARRAYS (e.g. columns, stages, rows):
     * You MUST index elements individually:
       const stages = [
         { card: cards[0], metric: telemetry[0], offset: 'ml-[224px]' },
         { card: cards[1], metric: telemetry[1], offset: 'ml-[112px]' },
         { card: cards[2], metric: telemetry[2], offset: 'ml-0' },
       ];
     * NEVER write '{ card: cards }' or '{ item: items }' or '{ metric: telemetry }' or 'const item0 = items;'! Passing an Array object instead of an element causes TypeScript failure: "Property 'title' does not exist on type 'Item[]'".
     * NEVER call array methods like .find() on an individual array element (e.g. NEVER write 'telemetry[0].find(...)')! If matching telemetry, call .find() on the array: 'telemetry.find(t => t.id === cards[0]?.telemetryRef)' or use indexing 'telemetry[0]'.
   - If mapping dynamically:
     {items.map((item: any, index: number) => (
       <div key={index}>
         <h2>{item.label || item.title}</h2>
         <p>{item.body}</p>
       </div>
     ))}

8. EDITORIAL PUBLICATION ARCHETYPE BLUEPRINTS (PRINT STANDARDS — ZERO WEB UI TROPES):
   You MUST implement the designated archetype for this slide following handcrafted editorial standards (inspired by gold standard 'tipaza'):
   * ABSOLUTE BAN: NEVER use 'shadow-lg', 'shadow-md', 'shadow-sm', 'rounded-full' on cards or kickers, 'border-l-[6px]', or HTML progress bars!
   * MANDATORY: Sharp 0px or 2px corners ('rounded-none' or 'rounded-sm'), 1px hairlines ('border border-[var(--border)]'), monospace kickers with square accent dots, and bespoke domain-adaptive vector SVG illustrations.
   * MANDATORY FULL-HEIGHT CANVAS FILL: Every archetype MUST fill 85%–95% of the vertical canvas height using 'flex-1 min-h-0' and 'justify-between'. ZERO dead bottom voids!

   A. "monumental-editorial-cover":
      - Outer container: 'flex flex-col h-full min-h-0 w-full justify-between'
      - Header zone: Monospace kicker with square accent dot:
        '<div className="flex items-center gap-2.5 font-[var(--font-mono)] text-[20px] uppercase tracking-[0.2em] text-[var(--accent)]"><span className="inline-block w-2.5 h-2.5 bg-[var(--accent)]" /><span>{slide.kicker}</span></div>'
      - Monumental headline: 'text-[64px] to text-[72px] font-bold leading-[1.05] tracking-[-0.04em] text-[var(--ink)] mt-4'
      - 1px hairline rule: '<div className="w-full border-b border-[var(--border)] my-6" />'
      - Subheadline: 'text-[24px] text-[var(--ink)]/80 leading-snug mb-4'
      - DOMINANT DOMAIN-ADAPTIVE EDITORIAL VECTOR CENTERPIECE: Must occupy 45%–55% of the vertical frame ('my-4 flex min-h-[460px] flex-1 items-center justify-center')!
        Follow the slide's designated 'svgBlueprint'.
        For corporate finance/forensics: Imposing geometric stored-value card silhouette or balance-sheet vault strata with 1px magnetic hairlines, micro-coordinates, and accent foil blocks.
        For tech: Silicon die layout, wafer bus traces, or logic gate strata.
        For history/culture: Monument elevation, architectural pediments, fluted column contours.
        Pure sculptural vector linework with coordinate crosshairs and registration ticks.
        NO CLIPART, NO FLOWCHART PIPES, ZERO FAKE TEXT WIREFRAME PATHS!
      - Footer metadata ledger: Clean 1px bordered split ledger pinned to bottom ('mt-auto border-t border-[var(--border)] pt-5') showing issue badge and numerical telemetry badges with 0px corners.

   B. "asymmetric-editorial-cards":
      - Header zone: Monospace kicker with square dot + locked 64px headline ('text-[64px] font-bold leading-[1.04] tracking-[-0.04em]').
      - Layout container: MUST use 'grid min-h-0 flex-1 grid-rows-2 gap-7 my-6' so cards span the ENTIRE vertical space!
        Zero 300px dead bottom voids! Do NOT use unconstrained 'items-start'.
      - Each card: 'border border-[var(--border)] bg-[var(--surface)] p-8 rounded-none flex flex-col justify-between'
        Primary hero card features a bold tabular metric ('text-[52px] font-bold text-[var(--accent)] leading-none') and 5-8 word punchline with bold anchors.
        Secondary card features monospace tag, 1px divider, and subtle graphic linework. Zero fake text wireframes.

   C. "vertical-milestone-spine":
      - Header zone: Monospace kicker + locked 64px headline ('text-[64px] font-bold leading-[1.04] tracking-[-0.04em]').
      - Layout container: MUST use 'relative my-6 flex min-h-0 flex-1 flex-col justify-between border-l-2 border-[var(--border)] pl-8 py-4'.
        Spans the full height between header and bottom!
      - Square milestone nodes: Each milestone has an absolute square marker: 'w-3 h-3 bg-[var(--accent)] -left-[33px] top-2 absolute'.
      - Milestone content: Monospace time/phase label ('text-[20px] font-[var(--font-mono)] text-[var(--accent)] tracking-wider'), bold 2-word title, and punchy 5-8 word body with **bold anchors**. Maximum 3 milestones total.

   D. "hero-metric-placard":
      - Header zone: Monospace kicker with square dot + locked 64px headline ('text-[64px] font-bold leading-[1.04] tracking-[-0.04em]').
      - Layout container: MUST use 'my-6 flex min-h-0 flex-1 flex-col justify-between gap-7'. Spans the entire height!
      - Massive hero metric placard ('flex-1 min-h-0 border border-[var(--border)] bg-[var(--surface)] p-9 rounded-none flex flex-col justify-between'):
        Hero tabular numeral: 'text-[96px] to text-[110px] font-bold tabular-nums text-[var(--accent)] leading-none' (rendered in HTML, NOT in SVG!).
        Monospace metric label: 'text-[22px] font-[var(--font-mono)] uppercase tracking-wider text-[var(--ink)]/70 mt-3'.
      - Bottom editorial context placard ('shrink-0 border border-[var(--border)] bg-[var(--surface)] p-7 rounded-none'): 1px hairline card with 5-8 word takeaway.

   E. "full-height-editorial-split":
      - Layout container: MUST use 'my-6 grid min-h-0 flex-1 grid-cols-2 gap-7 border-y border-[var(--border)] py-6'. Spans the entire height!
      - Graphic half: Dominant domain-adaptive vector silhouette or technical section linework with 1px hairlines and accent focal point.
      - Editorial half: 'flex flex-col justify-between': Monospace kicker with square dot, locked half-width headline ('text-[44px] to text-[48px] font-bold leading-[1.08] tracking-[-0.035em]'), and a 2-card 1px hairline ledger with verified metrics and 5-8 word takeaways.

   F. "three-row-verification-ledger":
      - Header zone: Monospace kicker with square dot + locked 64px headline ('text-[64px] font-bold leading-[1.04] tracking-[-0.04em]').
      - Layout container: MUST use 'my-6 flex min-h-0 flex-1 flex-col justify-between divide-y divide-[var(--border)] border border-[var(--border)] bg-[var(--surface)] rounded-none'.
      - Each row: 'p-7 flex items-center justify-between gap-6 flex-1'
      - Left column: Monospace index '[01]', '[02]', '[03]' in 'text-[var(--accent)] font-[var(--font-mono)] text-[20px] font-bold'.
      - Middle column: 2-word title + 5-8 word finding with **bold skim anchors**.
      - Right column: Clean tabular numerical badge in sharp 1px hairline badge (e.g. 'border border-[var(--accent)]/40 px-3.5 py-1.5 font-[var(--font-mono)] text-[22px] text-[var(--accent)]').

   G. "conditional-release-rail":
      - Header zone: Monospace kicker with square dot + locked 64px headline ('text-[64px] font-bold leading-[1.04] tracking-[-0.04em]').
      - Layout container: MUST use 'my-6 flex min-h-0 flex-1 flex-col justify-between gap-6'. Spans the entire height!
      - Horizontal cadence tracks: Stacked release rails with solid shipping endpoints versus open dashed authorization gates, status milestone nodes, and date plates (viewBox="0 0 952 420").
      - Bottom verification cards: 2-card horizontal split with 5-8 word takeaways and bold skim anchors.

   H. "optical-sector-versus-scan-reticle":
      - Header zone: Monospace kicker with square dot + locked 64px headline ('text-[64px] font-bold leading-[1.04] tracking-[-0.04em]').
      - Layout container: MUST use 'my-6 grid min-h-0 flex-1 grid-cols-2 gap-7 items-center'.
      - Circular instrument fields: Left field shows calibrated optical sector arc with degree callout (e.g. 148° wedge, camera lens circle, LED sensor ticks, viewBox="0 0 448 370"); right field shows scanning reticle or comparative metric cards with 5-8 word punchlines.

9. GRAPHIC VECTOR SVG STANDARDS & BAN ON FAKE TEXT SKELETONS:
   - ABSOLUTE BAN ON FAKE TEXT PATHS: Strictly forbidden to draw parallel horizontal lines, dashes, or hatching (<path d="M106 529H276 M106 542H245" /> or lines with dx/dy) to mimic placeholder text or wireframe greeking! That looks broken and amateur.
   - ALL editorial copy, long descriptions, titles, subheadlines, and card bodies MUST be authored in HTML elements (<h1>, <h2>, <p>, <span>) styled with Tailwind CSS!
   - Standalone chart/vector numerals, degree symbols, dates, or concise 2-3 word unit labels (e.g. "148°", "360°", "8 min", "$250", "430 CE") MAY be rendered inside SVG <text> with font-[var(--font-mono)] or font-[var(--font-headline)], exactly as done in publication benchmarks 'tipaza' and 'the-threshold-review'.
   - BAN <foreignObject> inside SVGs: It causes rendering glitches and layout failure.
   - CONTAINER-MATCHED VIEWBOXES (BAN 600×750 and BAN preserveAspectRatio="none"):
     * The interior canvas safe area is strictly 952px wide.
     * Full-width SVGs MUST use viewBox="0 0 952 <height>" (e.g. viewBox="0 0 952 420" or viewBox="0 0 952 650").
     * Half-width column SVGs MUST use viewBox="0 0 448 <height>" (e.g. viewBox="0 0 448 370").
     * NEVER use preserveAspectRatio="none" or arbitrary scale transforms (scale(1.15 2.21)). All geometry must scale uniformly and remain undistorted.

10. MANDATORY SPACE BALANCE & VERTICAL CANVAS SATURATION (ZERO BOTTOM VOIDS):
   - ABSOLUTE BAN: ZERO 300px–500px dead pitch-black bottom voids! A layout that hugs the top and leaves empty black space at the bottom looks like an unfinished wireframe and will be rejected instantly!
   - Canvas fill requirement: Content MUST fill 85%–95% of the vertical safe area (or be optically centered vertically).
   - Architectural pattern: Always use 'flex flex-col h-full min-h-0 w-full justify-between' on the top-level section.
   - Child containers MUST use 'flex-1 min-h-0' so cards, spines, splits, and ledgers stretch to occupy the full height between the slide header and footer.
   - Inside cards: Use 'flex flex-col justify-between' so the card's header, body, and metrics distribute cleanly across the card's height.
   - Generous card padding: 'p-8' to 'p-9'.
   - Balanced vertical gaps: 'gap-6' to 'gap-8'.
   - Publication-grade typography and balanced vertical rhythm matching benchmark 'tipaza'.`;
}

export function buildSingleSlideUserPrompt(
  slideNumber: number,
  slideData: SlideData,
  blueprint: SlideDesignBlueprint | undefined,
  brand: BrandTokens
): string {
  const chosenArchetype = slideData.archetype || slideData.layoutTopology || blueprint?.layoutStructure || 'asymmetric-editorial-cards';
  const chosenStyle = slideData.visualStyle || chosenArchetype;
  const chosenSvg = slideData.svgBlueprint || blueprint?.svgConcept?.description || 'Bespoke inline vector SVG matching archetype';
  const spatialGuidance = blueprint?.spatialBalanceGuidance || 'Fill 85%-95% of vertical frame using flex-1 min-h-0 and justify-between. Zero dead bottom voids.';
  const headlineSize = blueprint?.typographyScale?.headlineSize || (chosenArchetype === 'full-height-editorial-split' ? 'text-[44px] to text-[48px]' : 'text-[64px]');

  return `Generate the bespoke React + Tailwind component for Slide ${slideNumber}:
Assigned Archetype: "${chosenArchetype}"
Type: "${slideData.type}"

Slide Data (Locked Copy - Keep Ultra-Concise):
${JSON.stringify(slideData, null, 2)}

CHOSEN VISUAL ARCHITECTURE & BLUEPRINT:
- Visual Archetype: "${chosenArchetype}"
- Visual Style: "${chosenStyle}"
- Layout Topology: "${slideData.layoutTopology || chosenArchetype}"
- Bespoke Vector SVG: "${chosenSvg}"
- Spatial Balance Guidance: "${spatialGuidance}"
- Prescribed Headline Size: "${headlineSize}"
Follow the assigned archetype blueprint strictly! Do NOT revert to generic identical grey boxes.
STRICT NEGATIVE CONSTRAINT: Never declare local theme objects (e.g. const theme = ...) or inline styles. Use var(--ink), var(--surface), var(--border), var(--accent).

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
1. "Property 'value' does not exist on type '...[]'" or "Property 'title' does not exist on type '...[]'" or "Property 'metric' does not exist on type '...[]'" or "Property 'badge' does not exist on type '...[]'":
   - An entire array was assigned where a single object was expected, or an array was accessed without indexing.
   - If stages/columns/strata/boundaries are declared: change \`{ card: cards, inventory: telemetry }\` to \`{ card: cards[0], inventory: telemetry[0] }\` OR change \`[cards, cards]\` or \`[guardrails, guardrails]\` to \`[guardrails[0], guardrails[1]]\`.
   - Never write \`const boundaries = [guardrails, guardrails];\` — that creates an array of arrays (\`Guardrail[][]\`), so mapping gives an array instead of an object!
   - If numbered variables are declared: change \`const item0 = items;\` to \`const item0 = items[0];\`
   - If accessed in JSX: change \`{items?.metric}\` to \`{items?.[0]?.metric}\`, and change \`{items?.metric?.badge}\` to \`{items?.[0]?.metric?.badge}\` (or index with \`[i]\` when looping).
   - If telemetry accessed in JSX: change \`{telemetry?.value}\` to \`{telemetry?.[0]?.value}\` or \`{telemetry?.[0]?.badge}\`.
2. "Identifier expected":
   - Check for dangling optional chaining or unclosed syntax (e.g. \`telemetry?.;\` -> \`telemetry?.[0];\`).
3. "Property 'find' does not exist on type '...'":
   - \`.find()\` was called on an individual element instead of the array!
   - Change \`telemetry[0].find(...)\` to \`telemetry.find(...)\`.
4. "Property '...' does not exist on type '...[]'":
   - A property was accessed directly on an array. Index into it first: change \`cards?.telemetryRef\` to \`cards[0]?.telemetryRef\` or \`card?.telemetryRef\`.
5. Comparison with array:
   - If \`words = str.split(...)\`, compare \`words[0] === '...'\` rather than \`words === '...'\`.

Fix all syntax and type errors completely. Return ONLY the corrected code in a \`\`\`tsx code block.`;
}

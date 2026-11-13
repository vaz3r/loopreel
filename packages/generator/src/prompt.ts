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
  return `You are a Lead Investigative Researcher, Financial Analyst, and Fact-Checker at The Economist, ProPublica, Reuters, and Bloomberg.
Your mission is to compile an authoritative, empirical GroundTruthDossier for an editorial investigation.

CRITICAL RULES:
1. EMPIRICAL FACTS & VERIFIED METRICS:
   - Provide concrete, verified numerical data, financial figures ($B, $M, percentages, multiples), regulatory milestones, and technical realities.
   - For corporate/financial topics (e.g. unspent gift cards, float banking, revenue models, antitrust): include real balance sheet numbers, breakage metrics, SEC filing disclosures, and consumer protection precedents.
   - For technology/engineering topics: include cluster sizes, parameter counts, benchmarks, latency, and hardware specs.
   - NEVER provide meta-critique. Focus 100% on the factual subject matter.

2. STRUCTURED CORE CONTROVERSY & CATCHES:
   - Identify the primary corporate claim / public narrative vs the hidden mechanism or critical downside.
   - Extract 3–5 high-signal hidden catches, loopholes, or asterisks.

Return strictly valid JSON matching this exact structure:
{
  "articleTitle": "Title of the investigation",
  "publisher": "Investigation Bureau / Research Desk",
  "byline": "Senior Investigative Bureau",
  "summary": "2-sentence factual editorial summary of the core thesis and mechanism",
  "entities": [{ "name": "Entity Name", "type": "Company | Agency | Person | Product", "role": "Factual role in the investigation" }],
  "verifiedMetrics": [{ "value": "$1.8B", "label": "Stored value liabilities", "context": "Starbucks 10-K filing unspent customer card balance" }],
  "verifiedQuotes": [{ "quote": "...", "speaker": "...", "role": "...", "context": "..." }],
  "hardwareSpecs": {
    "deviceA": { "name": "Core System / Mechanism", "specs": ["Parameter 1", "Parameter 2"], "price": "Financial scale", "availability": "Active" }
  },
  "coreControversy": {
    "corporateClaim": "Primary corporate or PR claim (e.g. Convenience and customer rewards)",
    "criticismOrAlarm": "Forensic reality or regulatory concern (e.g. Unregulated interest-free banking float)",
    "regulatoryOrHistoricalPrecedent": "Relevant legal, CFPB, SEC, or banking framework"
  },
  "hiddenCatchesAndLimits": [
    "High-signal caveat or hidden mechanism 1",
    "High-signal caveat or hidden mechanism 2"
  ],
  "editorialVerdict": {
    "avoidAdvice": ["Critical risk or consumer trap to beware"],
    "fitAdvice": ["Strategic reality or takeaway"]
  }
};`;
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

export function buildStoryDeckSystemPrompt(
  preset: NarrativePreset = 'storytelling',
  targetSlideCount = 7
): string {
  const count = Math.max(4, Math.min(14, targetSlideCount));
  const arcDescription = getNarrativeArc(preset, count);

  return `You are a World-Class Visual Journalism Creative Director and Senior Editor at Visual Capitalist, Vox Explained, Wired, and The Financial Times.
You author scroll-stopping, high-impact editorial carousel content engineered for MOBILE INSTAGRAM (3-SECOND SCAN RULE).
Every slide must look like an art-directed publication graphic—NEVER an academic memo, accounting footnote, or text-heavy corporate report.

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

2. STRICT BAN ON CORPORATE, SEC & ACCOUNTING JARGON:
   - FORBIDDEN: Citing regulatory codes, accounting standards, or legal minutiae in main slide copy (e.g. "ASC 606", "dormancy remittances", "Nestlé royalty upfront payments", "unclaimed property escheatment").
   - Translate all financial/legal mechanisms into visceral, consumer-accessible human realities.

3. MANDATORY VISUAL EDITORIAL ARCHETYPE CATALOG:
   Every slide in your JSON output MUST declare an explicit "archetype" chosen from this catalog:
   - "monumental-cover": (Slide 1 exclusively) Broadsheet magazine cover with topic kicker capsule, monumental headline, and reading telemetry badge.
   - "myth-vs-reality": High-contrast binary split contrasting "THE ILLUSION" (what consumers believe) vs "THE REALITY / FINE PRINT" (the hidden contract catch).
   - "hero-stat-bar": Giant monumental number (e.g. "$1.8B"), 1-line plain-English label, and an editorial comparison bar (e.g. "Larger than 85% of US commercial banks").
   - "step-flow-chain": 3 numbered step nodes ([01] Reload Cash -> [02] Forgotten $2.40 -> [03] 100% Margin Float) connected by visual arrows.
   - "receipt-highlight": A stylized contract / receipt card featuring a marker-highlighted clause in accent color and a bottom verdict stamp.
   - "by-the-numbers-grid": A 2x2 or 3-column data matrix of bold tabular numbers and 2-word labels (ZERO paragraphs!).

   STRICT ARCHETYPE DIVERSITY MANDATE: You MUST use at least 4 DIFFERENT archetypes across the ${count} slides. Never repeat the same archetype consecutively!

4. DYNAMIC NARRATIVE ARC (${count} SLIDES — NEVER A FLAT SUMMARY):
   * ${arcDescription}

5. STRICT BAN ON META-ATTRIBUTIONS:
   - FORBIDDEN: "The article states...", "According to the report...", "The text notes...", "sentence marked [update]".
   - State the reality with primary journalistic authority!

6. TELEMETRY & METRIC VALUES:
   - Numerical values must be strictly clean numbers, currencies, percentages, or years (e.g. "$1.8B", "0%", "2025", "+18%").
   - Put qualifiers ("calculated", "estimated", "annual") strictly into the "label" field.

Return strictly a JSON array of exactly ${count} slide objects:
[
  {
    "id": "slide-1",
    "index": 0,
    "type": "cover",
    "archetype": "monumental-cover",
    "kicker": "CONSUMER FINANCE / EXPOSED",
    "headline": "The $1.8 Billion Coffee Bank",
    "subheadline": "How unspent gift card balances created an unregulated, interest-free corporate float.",
    "visualStyle": "monumental-cover",
    "layoutTopology": "monumental-cover",
    "issueBadge": "SPECIAL INVESTIGATION · ${count} SLIDES",
    "telemetry": [
      { "badge": "$1.8B", "label": "Customer cash held on cards" },
      { "badge": "$222M", "label": "Annual profit from unused balances" }
    ],
    "svgBlueprint": "Clean Swiss architectural rule with minimal geometric focal card emblem"
  },
  {
    "id": "slide-2",
    "index": 1,
    "type": "belief",
    "archetype": "myth-vs-reality",
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
    "visualStyle": "myth-vs-reality",
    "layoutTopology": "myth-vs-reality",
    "svgBlueprint": "High-contrast dual panel comparing the PR illusion against the contract reality"
  }
]`;
}

export function buildStoryDeckUserPrompt(
  strategy: StoryStrategy,
  dossier: GroundTruthDossier,
  brand: BrandTokens,
  targetSlideCount = 7
): string {
  const count = Math.max(4, Math.min(14, targetSlideCount));
  return `Author the ${count}-slide storyboard AND choose the distinct visual style, layout topology, and SVG blueprint for each slide:

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

Output strictly the JSON array of exactly ${count} slide objects. Remember: MAX 16 WORDS PER CARD BODY, AND CHOOSE DIVERSE LAYOUT TOPOLOGIES!`;
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
     * Monumental hero metrics: text-[84px] to text-[112px] (font-mono font-bold) ONLY when full-width (hero-metric-placard)!
     * MULTI-COLUMN FONT CEILING: In 2-column, 3-column, or split diptychs, metric numerals MUST NOT exceed text-[48px] to text-[56px]! text-[84px] is strictly forbidden inside half-width columns because it causes horizontal clipping and overflows into adjacent columns.
     * MULTI-ROW LEDGER CEILING: In 3-row or 4-row stacked ledgers (grid-rows-3, grid-rows-4), metric numerals MUST NOT exceed text-[38px] to text-[42px], and card titles MUST NOT exceed text-[26px] to text-[28px]! This guarantees zero vertical crowding and ample breathing room.
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
     * NEVER call array methods like .find() on an individual array element (e.g. NEVER write 'telemetry[0].find(...)')! If matching telemetry, call .find() on the array: 'telemetry.find(t => t.id === cards[0]?.telemetryRef)' or use indexing 'telemetry[0]'.
   - If mapping dynamically:
     {items.map((item: any, index: number) => (
       <div key={index}>
         <h2>{item.label || item.title}</h2>
         <p>{item.body}</p>
       </div>
     ))}

8. VISUAL EDITORIAL ARCHETYPE BLUEPRINTS (MANDATORY ARCHITECTURE PATTERNS):
   You MUST implement the designated archetype for this slide:

   A. "monumental-cover":
      - Kicker capsule: 'inline-flex px-5 py-2.5 rounded-full border border-[var(--accent)] bg-[var(--surface)] font-[var(--font-mono)] text-[20px] uppercase tracking-[0.16em] text-[var(--accent)]'
      - Monumental headline: 'text-[60px] to text-[72px] font-bold leading-[1.04] tracking-[-0.04em]'
      - Subheadline: 'text-[26px] to text-[28px] text-[var(--ink)]/80 leading-snug mt-6'
      - Focal visual: Crisp inline SVG emblem matching subject (e.g. geometric card perimeter, vault seal, radar ring).
      - Footer metadata: 2 compact telemetry cards + issue pill ('SPECIAL INVESTIGATION · 7 SLIDES').

   B. "myth-vs-reality":
      - Two distinct, vertically stacked or side-by-side high-contrast panels:
        * Card 1 (THE ILLUSION): 'bg-[var(--surface)]/50 border border-[var(--border)] p-7 rounded-lg'. Header tagged with muted text or alert tag. Body describes the consumer illusion in 6-8 words.
        * Card 2 (THE FINE PRINT / REALITY): 'bg-[var(--surface)] border border-[var(--accent)] border-l-[6px] p-7 rounded-lg shadow-lg'. Header tagged with 'text-[var(--accent)] font-bold'. Large stat badge ('text-[48px]') and bolded reality punchline.
        * Connect the two with an inline SVG indicator or contrast badge.

   C. "hero-stat-bar":
      - Massive hero stat placard: Tabular numeral 'text-[96px] font-bold text-[var(--accent)] leading-none'.
      - Single-line uppercase label 'text-[22px] font-[var(--font-mono)] tracking-wider text-[var(--ink)]/70'.
      - Visual comparison / ratio bar:
        '<div className="w-full bg-[var(--surface)] border border-[var(--border)] rounded-full h-5 p-1 mt-6 flex"><div className="bg-[var(--accent)] h-full rounded-full" style={{ width: "82%" }} /></div>'
      - Comparison label underneath: 'text-[24px] font-medium text-[var(--ink)] mt-3'.
      - 1 or 2 high-contrast secondary cards below for the systemic takeaway.

   D. "step-flow-chain":
      - 3 connected sequential steps (e.g. [01] Cash In -> [02] Forgotten Card -> [03] 100% Margin Float).
      - Each step features a circular/pill index: 'w-12 h-12 rounded-full border-2 border-[var(--accent)] text-[var(--accent)] font-[var(--font-mono)] font-bold text-[22px] flex items-center justify-center shrink-0'.
      - Connected with crisp SVG downward/forward chevrons or line dividers.
      - Step body copy: strictly 5-8 punchy words with bolded anchors!

   E. "receipt-highlight":
      - A stylized document/receipt placard: 'border border-dashed border-[var(--border)] bg-[var(--surface)] p-8 rounded-lg relative'.
      - Monospace document stamp header: 'DOCUMENT EXCERPT // SEC NOTE 14'.
      - Highlighted contract clause callout: 'border-l-4 border-[var(--accent)] bg-[var(--accent)]/10 px-6 py-5 rounded-r my-6' with italicized locked contract quote.
      - Bottom official verdict badge: 'inline-flex px-4 py-2 border border-[var(--accent)] text-[var(--accent)] font-[var(--font-mono)] text-[20px] uppercase font-bold tracking-wider'.

   F. "by-the-numbers-grid":
      - 2x2 grid or 3-column ledger of pure telemetry data.
      - Each quadrant: 'border border-[var(--border)] bg-[var(--surface)] p-7 rounded-lg flex flex-col justify-between'.
      - Huge numerals: 'text-[56px] font-bold tabular-nums text-[var(--accent)]'.
      - Clean 2-to-3 word label: 'text-[22px] font-[var(--font-mono)] uppercase tracking-wider text-[var(--ink)]'.
      - ZERO paragraph text in telemetry cells! Pure high-signal data.

9. UNIFIED SVG & HTML COORDINATES (No Disconnected Callout Lines):
   - NEVER draw hardcoded SVG connector lines pointing to disconnected HTML absolute <div>s!
   - Use HTML flex/grid cards with inline SVG accent marks or unified layout.
   - BAN <foreignObject> inside SVGs: It causes text clipping, font-rendering glitches, and layout failure. Use pure Tailwind flex/grid cards for copy.

10. SPACE BALANCE & OPTICAL BREATHING ROOM:
   - Zero top-heavy clumping or crowded wireframes. Distribute content vertically across the frame.
   - Generous card padding: 'p-8' to 'p-9'.
   - Balanced vertical gaps: 'gap-6' to 'gap-8'.
   - Content must feel like an art-directed editorial graphic with intentional whitespace.`;
}

export function buildSingleSlideUserPrompt(
  slideNumber: number,
  slideData: SlideData,
  blueprint: SlideDesignBlueprint | undefined,
  brand: BrandTokens
): string {
  const chosenArchetype = slideData.archetype || slideData.layoutTopology || blueprint?.layoutStructure || 'myth-vs-reality';
  const chosenStyle = slideData.visualStyle || chosenArchetype;
  const chosenSvg = slideData.svgBlueprint || blueprint?.svgConcept?.description || 'Bespoke inline vector SVG matching archetype';

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
Follow the assigned archetype blueprint strictly! Do NOT revert to generic identical grey boxes.

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
   - If stages/columns/strata/boundaries are declared: change \`{ card: cards, inventory: telemetry }\` to \`{ card: cards[0], inventory: telemetry[0] }\` OR change \`[cards, cards]\` or \`[guardrails, guardrails]\` to \`[guardrails[0], guardrails[1]]\`.
   - Never write \`const boundaries = [guardrails, guardrails];\` — that creates an array of arrays (\`Guardrail[][]\`), so mapping gives an array instead of an object!
   - If numbered variables are declared: change \`const item0 = items;\` to \`const item0 = items[0];\`
   - If accessed in JSX: change \`{telemetry?.value}\` to \`{telemetry?.[0]?.value}\` or map over the array.
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

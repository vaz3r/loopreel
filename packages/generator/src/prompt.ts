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
  "publisher": "Clean 2-4 word publication masthead name (e.g. 'The Fine Print', 'The Financial Autopsy', 'The Daily Briefing'). BANNED: Never write AI disclaimers, meta-qualifiers, or 'not a verified publication'!",
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

3. MANDATORY 7-SLIDE ARCHETYPE SEQUENCE CONTRACT (ASC):
   To guarantee radical swipe diversity and eliminate layout fatigue, EVERY deck must follow this exact editorial sequence:
   - Slide 1: "monumental-editorial-cover"
     Broadsheet magazine cover with monospace kicker + square accent dot, monumental 64px headline, subheadline, issue badge, and hero telemetry. Dominant abstract architectural SVG vector centerpiece (viewBox="0 0 952 560"). ZERO body cards!
   - Slide 2: "claim-vs-reality-diptych"
     High-tension editorial confrontation. Top PR claim quote in serif italics vs bottom dark forensic reality box stamped with accent badge. ZERO SVG (pure typography)!
   - Slide 3: "full-height-editorial-split"
     50/50 vertical diptych. Left column (448px) = 46px headline + 2 stacked narrative cards; Right column (448px) = full-height 720px tall vertical cutaway SVG (viewBox="0 0 448 720")!
   - Slide 4: "hero-metric-placard"
     Monumental 110px tabular numeral in HTML commanding the page + uppercase mono metric label + punchy takeaway. ZERO SVG (the number is the hero graphic)!
   - Slide 5: "systemic-mechanism-flow"
     Wide horizontal flow SVG (viewBox="0 0 952 340") depicting 3 sequential stations + 3 step callout cards aligned directly below.
   - Slide 6: "three-row-verification-ledger"
     Clean institutional tabular ledger divided by 1px hairlines ('divide-y divide-[var(--border)]') with monospace indexes [01], [02], [03], findings with bold anchors, and right badges. ZERO SVG!
   - Slide 7: "editorial-verdict-playbook"
     Actionable 2-choice decision matrix ("Option A" vs "Option B") + closing authoritative verdict seal.

4. DYNAMIC NARRATIVE ARC (${count} SLIDES — NEVER A FLAT SUMMARY):
   * ${arcDescription}

5. STRICT WORD BUDGET & ANTI-CRAMMING (Anti-Overflow Guardrail):
   - Maximum 2 items per slide (Slide 5 flow and Slide 6 ledger: exactly 3 items; Slide 1: 0 items; Slide 4: 1 item).
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
    "kicker": "FORENSIC INVESTIGATION",
    "headline": "The $4.2 Billion Seat Monopoly",
    "subheadline": "How airlines sell 115% capacity and profit from calculated mathematical no-show margins.",
    "visualStyle": "monumental-editorial-cover",
    "layoutTopology": "monumental-editorial-cover",
    "issueBadge": "EXECUTIVE AUDIT · ${count} SLIDES",
    "telemetry": [
      { "badge": "$4.2B", "label": "Annual overbooking margin" },
      { "badge": "400%", "label": "Federal cash penalty cap" }
    ]
  },
  {
    "id": "slide-2",
    "index": 1,
    "type": "belief",
    "archetype": "claim-vs-reality-diptych",
    "kicker": "THE CONVENTIONAL MYTH",
    "headline": "The PR Pitch vs. The Mathematical Reality",
    "subheadline": "Airlines frame overbooking as an efficiency savings passed on to travelers.",
    "claim": {
      "title": "THE CORPORATE POSITION",
      "body": "Overbooking keeps ticket prices affordable by compensating for inevitable no-shows."
    },
    "reality": {
      "title": "THE FORENSIC REALITY",
      "body": "A calculated revenue engine where bumped seats generate **pure statistical margin** with zero liability risk.",
      "badge": "FORENSIC AUDIT"
    },
    "visualStyle": "claim-vs-reality-diptych",
    "layoutTopology": "layout-claim-reality"
  },
  {
    "id": "slide-3",
    "index": 2,
    "type": "mechanism",
    "archetype": "full-height-editorial-split",
    "kicker": "SYSTEM ARCHITECTURE",
    "headline": "Poisson Yield Curves",
    "subheadline": "Algorithms balance bumping penalties against unsold seat losses in real time.",
    "items": [
      { "title": "HISTORICAL NO-SHOWS", "body": "Routes average an expected **9.2% cancellation rate** on peak business flights." },
      { "title": "ASYMMETRIC MARGIN", "body": "Selling 15 extra seats nets **$4,500 upside** against a **$1,200 penalty risk**." }
    ],
    "visualStyle": "full-height-editorial-split",
    "layoutTopology": "layout-split-diptych"
  },
  {
    "id": "slide-4",
    "index": 3,
    "type": "telemetry",
    "archetype": "hero-metric-placard",
    "kicker": "REGULATORY THRESHOLD",
    "headline": "The 400% Payout Cap",
    "subheadline": "Federal law mandates aggressive cash penalties for involuntary bumps.",
    "telemetry": [
      { "badge": "400%", "label": "Cash compensation multiplier for delays exceeding 2 hours" }
    ],
    "items": [
      { "title": "THE VOUCHER TRAP", "body": "Carriers push **$800 travel credits** before disclosing your right to **$1,550 cash**." }
    ],
    "footer": "14 CFR § 250.5 Federal Airline Consumer Protections.",
    "visualStyle": "hero-metric-placard",
    "layoutTopology": "hero-metric-placard"
  },
  {
    "id": "slide-5",
    "index": 4,
    "type": "system",
    "archetype": "systemic-mechanism-flow",
    "kicker": "OPERATIONAL SEQUENCE",
    "headline": "The Involuntary Bump Pipeline",
    "subheadline": "How automated airline algorithms triage candidates before boarding starts.",
    "items": [
      { "title": "CHECK-IN GATE", "body": "Timestamp assigns default priority tier." },
      { "title": "FARE CLASS FILTER", "body": "Basic Economy tickets routed to bump pool." },
      { "title": "GATE AUCTION", "body": "Vouchers escalate until volunteers surrender seats." }
    ],
    "visualStyle": "systemic-mechanism-flow",
    "layoutTopology": "layout-grid-3"
  },
  {
    "id": "slide-6",
    "index": 5,
    "type": "ledger",
    "archetype": "three-row-verification-ledger",
    "kicker": "AUDIT LEDGER",
    "headline": "Three Buried Contract Rules",
    "subheadline": "Contract of Carriage provisions carriers hope you never read.",
    "items": [
      { "index": "01", "title": "CHECK-IN CUTOFF", "body": "Missing the **45-minute bag drop deadline** forfeits all denied boarding rights.", "badge": "RULE 14" },
      { "index": "02", "title": "PAYMENT METHOD", "body": "Airlines must pay **cash or check immediately at the gate**, not delayed travel credits.", "badge": "CFR 250" },
      { "index": "03", "title": "DOWNGAUGE EXCEPTION", "body": "Aircraft swaps for safety reasons **exempt carriers from cash liability**.", "badge": "SECTION 7" }
    ],
    "visualStyle": "three-row-verification-ledger",
    "layoutTopology": "layout-ledger"
  },
  {
    "id": "slide-7",
    "index": 6,
    "type": "verdict",
    "archetype": "editorial-verdict-playbook",
    "kicker": "EXECUTIVE PLAYBOOK",
    "headline": "The Gate Counter Confrontation",
    "subheadline": "How to maximize leverage when a flight announces an involuntary bump.",
    "items": [
      { "title": "OPTION A: TAKE THE DEAL", "body": "Volunteer only if vouchers exceed **$1,500+ with confirmed seat** on next departure." },
      { "title": "OPTION B: FORCE INVOLUNTARY", "body": "Never volunteer. Demand **400% cash payout up to $1,550** immediately." }
    ],
    "verdict": {
      "title": "THE GOLDEN RULE",
      "takeaway": "Volunteering waives federal rights. Always force an involuntary denied boarding."
    },
    "visualStyle": "editorial-verdict-playbook",
    "layoutTopology": "editorial-verdict-playbook"
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

  return `Author the ${count}-slide storyboard according to the Mandatory 7-Slide Archetype Sequence Contract (ASC):

Publication: "${brand.name}" (${brand.domain})
Palette: Paper ${brand.palette.paper}, Ink ${brand.palette.ink}, Accent ${brand.palette.accent}, Surface ${brand.palette.surface}
Hook Headline: "${hook}"
Value Promise: "${promise}"
Kicker: "${kicker}"
Core Visual Metaphor: "${metaphor}"
Core Conflict: "${conflict}"
Hidden Catches: "${catches}"
Verdict: "${verdict}"

MANDATORY ARCHETYPE SEQUENCE CONTRACT (ASC):
- Slide 1: "monumental-editorial-cover" (Title, Kicker, Subheadline, Issue Badge, Hero Telemetry; NO body cards).
- Slide 2: "claim-vs-reality-diptych" (claim vs reality confrontation; ZERO SVG).
- Slide 3: "full-height-editorial-split" (50/50 vertical diptych; 2 items on left, 720px tall cutaway on right).
- Slide 4: "hero-metric-placard" (Dominant 110px HTML number in telemetry[0] + 1 takeaway item; ZERO SVG).
- Slide 5: "systemic-mechanism-flow" (3 sequential pipeline items).
- Slide 6: "three-row-verification-ledger" (3 tabular findings with [01]-[03] indices and right badges; ZERO SVG).
- Slide 7: "editorial-verdict-playbook" (2 comparative choices Option A vs Option B + closing verdict takeaway).

Verified Data & Metrics:
${JSON.stringify(dossier.verifiedMetrics || [], null, 2)}
Quotes:
${JSON.stringify(dossier.verifiedQuotes || [], null, 2)}

Output strictly the JSON array of exactly ${count} slide objects following the ASC schema. Remember: PURE EDITORIAL COPY ONLY, MAX 8 WORDS PER CARD BODY WITH **BOLD ANCHORS**, STRICT NUMERICAL TELEMETRY BADGES, AND ZERO WEB UI SHADOWS OR PILLS!`;
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
1. ARCHETYPE ASSET ALLOCATION CONTRACT (ELIMINATE WIREFRAME FATIGUE):
   Never force an SVG onto every slide! The greatest editorial publications balance high-density graphics with bold, breathing typographic spreads:
   - Slide 1 (Cover: "monumental-editorial-cover"):
     Dominant monumental visual centerpiece (viewBox="0 0 952 560") occupying the center frame between header and issue badge. Layered vector elements depicting the core physical or systemic artifact (e.g., microchip die, aircraft fuselage cross-section, balance sheet reservoir, radar azimuth).
   - Slide 2 (Debunking: "claim-vs-reality-diptych"):
     PURE TYPOGRAPHIC TENSION. Must output svgConcept: { "type": "none", "description": "none" }. DO NOT GENERATE AN SVG! Pass 6 will render an authoritative high-contrast serif quote box vs dark reality container.
   - Slide 3 (System Deep-Dive: "full-height-editorial-split"):
     Full-Height Vertical Cutaway SVG (viewBox="0 0 448 720") rendered exclusively in the right 50% column. High-density vertical technical elevation, stacked architecture layers, or longitudinal cross-section.
   - Slide 4 (Hero Metric: "hero-metric-placard"):
     MASSIVE 110PX HTML NUMERAL DOMINATING CANVAS. Must output svgConcept: { "type": "none", "description": "none" }. DO NOT GENERATE AN SVG! The numeral itself is the hero graphic.
   - Slide 5 (Sequence: "systemic-mechanism-flow"):
     Wide Horizontal Flow SVG (viewBox="0 0 952 340") depicting 3 sequential numbered stations connected by pipeline trajectories.
   - Slide 6 (Evidence: "three-row-verification-ledger"):
     INSTITUTIONAL TABULAR LEDGER. Must output svgConcept: { "type": "none", "description": "none" }. DO NOT GENERATE AN SVG! Pass 6 will render the crisp hairline-separated data ledger.
   - Slide 7 (Verdict: "editorial-verdict-playbook"):
     Compact Decision Fork SVG (viewBox="0 0 952 220") or subtle branching pathways, or svgConcept: { "type": "none", "description": "none" }.

2. Visual Contrast & Tonal Depth (For slides with SVGs):
   - STRICT BAN on hollow 1px wireframes! Every SVG must use solid surface fills to create depth:
     * Structural bounds & hairlines: stroke="var(--border)" or stroke="var(--ink)" strokeOpacity="0.25" with strokeWidth="1.5" or "2".
     * Tonal surface fills: fill="var(--surface)" or fill="var(--ink)" fillOpacity="0.06".
     * Focal gestures & trajectories: stroke="var(--accent)" strokeWidth="2.5" to "3.5", or fill="var(--accent)".
     * Registration marks: crosshairs, corner ticks, and coordinate indices with strokeOpacity="0.4".

3. Vector Typography & Diagrams in SVG:
   - Body copy, titles, descriptions, and paragraphs belong strictly in HTML/Tailwind.
   - Standalone vector callouts, numerical badges, degree marks, unit labels, or date plates directly anchored to the vector artwork (e.g. '$250', '$1,000', '148°', '4K', '430 CE', 'Dec 16') are encouraged inside SVG <text> elements with clean font classes and coordinates.
   - ABSOLUTE BAN: Never draw fake text wireframe paths (d="M...H..."). Never simulate text with hatching lines!

Return strictly a JSON array of exactly ${count} SlideDesignBlueprint objects:
[
  {
    "slideId": "slide-1",
    "type": "cover",
    "layoutStructure": "monumental-editorial-cover",
    "svgConcept": {
      "type": "schematic",
      "description": "viewBox='0 0 952 560'. Imposing geometric system centerpiece with layered surface fills (fill='var(--surface)'), 1.5px hairlines, accent focal trajectories, and micro-coordinates. 20+ geometric vector elements with architectural depth.",
      "elements": ["primary-silhouette", "structural-elevation", "accent-trajectories", "micro-coordinates"]
    },
    "typographyScale": {
      "headlineSize": "text-[64px]",
      "subtitleSize": "text-[26px]"
    },
    "spatialBalanceGuidance": "Header zone occupies top 200px; SVG centerpiece occupies middle 560px; bottom metadata ledger occupies bottom 80px. Fills 90% of vertical canvas."
  },
  {
    "slideId": "slide-2",
    "type": "belief",
    "layoutStructure": "claim-vs-reality-diptych",
    "svgConcept": {
      "type": "none",
      "description": "none"
    },
    "typographyScale": {
      "headlineSize": "text-[64px]",
      "subtitleSize": "text-[26px]"
    },
    "spatialBalanceGuidance": "Pure typography diptych. Top quote card (40% height) vs bottom dark reality card (45% height). Zero SVG."
  },
  {
    "slideId": "slide-3",
    "type": "mechanism",
    "layoutStructure": "full-height-editorial-split",
    "svgConcept": {
      "type": "schematic",
      "description": "viewBox='0 0 448 720'. High-density vertical cutaway schematic occupying the right 50% column. Stacked technical layers, pipeline flows, and annotated component nodes.",
      "elements": ["vertical-pipeline-spine", "annotated-stage-nodes", "accent-flow-arrows"]
    },
    "typographyScale": {
      "headlineSize": "text-[46px]",
      "subtitleSize": "text-[22px]"
    },
    "spatialBalanceGuidance": "50/50 vertical split. Left column 448px copy and 2 cards; right column 448px vertical 720px SVG cutaway."
  },
  {
    "slideId": "slide-4",
    "type": "telemetry",
    "layoutStructure": "hero-metric-placard",
    "svgConcept": {
      "type": "none",
      "description": "none"
    },
    "typographyScale": {
      "headlineSize": "text-[64px]",
      "subtitleSize": "text-[26px]"
    },
    "spatialBalanceGuidance": "Massive 110px HTML tabular numeral in accent color commanding screen + uppercase label + context card. Zero SVG."
  },
  {
    "slideId": "slide-5",
    "type": "system",
    "layoutStructure": "systemic-mechanism-flow",
    "svgConcept": {
      "type": "schematic",
      "description": "viewBox='0 0 952 340'. Horizontal flow infographic with 3 sequential stations [01, 02, 03] linked by directional pipeline paths and status markers.",
      "elements": ["flow-pipeline-tracks", "three-station-nodes", "status-indicators"]
    },
    "typographyScale": {
      "headlineSize": "text-[64px]",
      "subtitleSize": "text-[24px]"
    },
    "spatialBalanceGuidance": "Header 180px; horizontal SVG flow 340px; 3-column step cards 280px directly aligned under stations."
  },
  {
    "slideId": "slide-6",
    "type": "ledger",
    "layoutStructure": "three-row-verification-ledger",
    "svgConcept": {
      "type": "none",
      "description": "none"
    },
    "typographyScale": {
      "headlineSize": "text-[64px]",
      "subtitleSize": "text-[24px]"
    },
    "spatialBalanceGuidance": "Institutional tabular ledger with 3 rows divided by 1px hairlines. Zero SVG."
  },
  {
    "slideId": "slide-7",
    "type": "verdict",
    "layoutStructure": "editorial-verdict-playbook",
    "svgConcept": {
      "type": "schematic",
      "description": "viewBox='0 0 952 220'. Compact decision fork schematic showing branching paths between Option A and Option B.",
      "elements": ["decision-branch-fork", "option-nodes"]
    },
    "typographyScale": {
      "headlineSize": "text-[64px]",
      "subtitleSize": "text-[24px]"
    },
    "spatialBalanceGuidance": "Header 180px; compact fork SVG 200px; 2 comparison cards 300px; verdict seal 100px."
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
Visual Metaphor: "${metaphor}"
Hook: "${hook}"

MANDATORY ASSET ALLOCATION CONTRACT:
- Slide 1 (Cover): viewBox="0 0 952 560" monumental centerpiece.
- Slide 2: svgConcept: { "type": "none", "description": "none" } (PURE TYPOGRAPHY DIPTYCH).
- Slide 3: viewBox="0 0 448 720" full-height vertical cutaway for right column.
- Slide 4: svgConcept: { "type": "none", "description": "none" } (110PX HTML HERO METRIC).
- Slide 5: viewBox="0 0 952 340" horizontal flow with 3 sequential stations.
- Slide 6: svgConcept: { "type": "none", "description": "none" } (TABULAR VERIFICATION LEDGER).
- Slide 7: viewBox="0 0 952 220" compact decision fork or "none".

Slide Data to Architect:
${JSON.stringify(slides, null, 2)}

Output strictly the JSON array of exactly ${slides.length} SlideDesignBlueprint objects.`;
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
You write bespoke React TypeScript components using semantic editorial CSS classes and Tailwind utilities for publication-grade carousel slides (${safeAreaDesc}).

SHARED EDITORIAL CSS ARCHITECTURE:
All slides inherit from a single, shared, mathematically calibrated editorial stylesheet (editorial.css):
* Root Container: className="editorial-slide" (guarantees flex flex-col justify-between h-full min-h-0 w-full gap-4)
* Header Zone: className="editorial-header"
  - Kicker: className="editorial-kicker" containing '<span className="editorial-kicker-dot" />' + '{slide.kicker}'
  - Universal Headline: className="editorial-headline" (locked at 64px bold, line-height 1.04)
  - Half-Width Split Headline: className="editorial-headline editorial-headline-split" (46px bold for 2-column diptychs)
  - Subheadline: className="editorial-subheadline" (26px font-body)
* Visual Frames (Container-Matched inline vector SVGs):
  - Compact Visual Frame (when cards/ledgers follow): className="editorial-visual-frame editorial-visual-compact" (max-h: 320px)
  - Monumental Visual Frame (cover hero): className="editorial-visual-frame editorial-visual-monumental" (max-h: 560px)
  - Full-Height Split Frame (50/50 diptychs): className="editorial-visual-frame editorial-visual-split" (max-h: 720px)
* Editorial Cards & Placards:
  - Standard Card: className="editorial-card" (guarantees uniform 20px 24px padding, 1px border, surface background)
  - Card Title: className="editorial-card-title" (28px font-headline font-semibold)
  - Card Body: className="editorial-card-body" (22px font-body with <strong> emphasis)
* Layout Topologies:
  - 2-Column Equal Cards: className="layout-grid-2" (gap: 20px)
  - 3-Column Equal Cards: className="layout-grid-3" (gap: 16px)
  - 2-Row Vertical Stacked Cards: className="layout-grid-rows-2" (gap: 18px)
  - 50/50 Vertical Diptych: className="layout-split-diptych" (gap: 28px)
  - Claim vs Reality Diptych: className="layout-claim-reality" with 'editorial-quote-box' & 'editorial-reality-box'
  - Tabular Verification Ledger: className="layout-ledger" with child className="layout-ledger-row"
  - Milestone Spine: className="layout-spine" with child className="layout-spine-node" and bullet className="layout-spine-bullet"
* Telemetry & Data Badges:
  - Hero Tabular Numeral: className="editorial-metric-huge" (96px-110px bold font-mono)
  - Telemetry Pill: className="editorial-metric-badge" (accent border, font-mono tabular numerals)
  - Issue Badge: className="editorial-issue-badge"
  - Verdict Seal: className="editorial-verdict-seal"
  - Legal / Source Footnote: className="editorial-note"

CRITICAL DESIGN & CODING RULES:
1. STRICT ADHERENCE TO THE ASSIGNED ARCHETYPE (BAN MONOTONOUS STACKING):
   You MUST write the exact JSX structure tailored to the assigned archetype. Strictly ban repeating "Header -> SVG -> 2 cards" across slides!

   - ARCHETYPE 1 ("monumental-editorial-cover"):
     \`\`\`tsx
     <section className="editorial-slide">
       <header className="editorial-header">
         <div className="editorial-kicker"><span className="editorial-kicker-dot" /><span>{slide.kicker}</span></div>
         <h1 className="editorial-headline">{slide.headline}</h1>
         {slide.subheadline && <p className="editorial-subheadline">{slide.subheadline}</p>}
       </header>
       <div className="editorial-visual-frame editorial-visual-monumental">
         <svg viewBox="0 0 952 560" role="img">...</svg>
       </div>
       <footer className="flex justify-between items-center border-t border-[var(--border)] pt-4">
         <p className="editorial-issue-badge">{slide.issueBadge || 'SPECIAL REPORT'}</p>
         {t0 && <div className="editorial-metric-badge">{t0.value} {t0.label}</div>}
       </footer>
     </section>
     \`\`\`

   - ARCHETYPE 2 ("claim-vs-reality-diptych"): ZERO SVG!
     \`\`\`tsx
     <section className="editorial-slide">
       <header className="editorial-header">
         <div className="editorial-kicker"><span className="editorial-kicker-dot" /><span>{slide.kicker}</span></div>
         <h1 className="editorial-headline">{slide.headline}</h1>
         {slide.subheadline && <p className="editorial-subheadline">{slide.subheadline}</p>}
       </header>
       <div className="layout-claim-reality">
         <article className="editorial-card editorial-quote-box">
           <div className="font-[family-name:var(--font-mono)] text-[18px] tracking-widest text-[var(--ink)] opacity-60 uppercase">[ {slide.claim?.title || 'THE CONVENTIONAL CLAIM'} ]</div>
           <p className="editorial-quote-text">"{slide.claim?.body || items[0]?.body}"</p>
         </article>
         <article className="editorial-card editorial-reality-box">
           <div className="flex justify-between items-center">
             <div className="font-[family-name:var(--font-mono)] text-[18px] tracking-widest text-[var(--accent)] font-semibold uppercase">[ {slide.reality?.title || 'THE FORENSIC REALITY'} ]</div>
             <span className="editorial-metric-badge !text-[16px]">{slide.reality?.badge || 'VERIFIED'}</span>
           </div>
           <p className="editorial-card-body !text-[24px] !leading-relaxed"><InlineEmphasis text={slide.reality?.body || items[1]?.body} /></p>
         </article>
       </div>
     </section>
     \`\`\`

   - ARCHETYPE 3 ("full-height-editorial-split"):
     \`\`\`tsx
     <section className="editorial-slide">
       <div className="layout-split-diptych">
         <div className="flex flex-col justify-between h-full gap-4">
           <header className="editorial-header">
             <div className="editorial-kicker"><span className="editorial-kicker-dot" /><span>{slide.kicker}</span></div>
             <h1 className="editorial-headline editorial-headline-split">{slide.headline}</h1>
             {slide.subheadline && <p className="editorial-subheadline !text-[22px]">{slide.subheadline}</p>}
           </header>
           <div className="flex flex-col gap-4">
             {items.map((item: any, i: number) => (
               <article key={i} className="editorial-card">
                 <h2 className="editorial-card-title !text-[24px]">{item.title}</h2>
                 <p className="editorial-card-body !text-[20px]"><InlineEmphasis text={item.body} /></p>
               </article>
             ))}
           </div>
         </div>
         <div className="editorial-visual-frame editorial-visual-split border border-[var(--border)] bg-[var(--surface)] p-4">
           <svg viewBox="0 0 448 720" role="img" className="w-full h-full">...</svg>
         </div>
       </div>
     </section>
     \`\`\`

   - ARCHETYPE 4 ("hero-metric-placard"): ZERO SVG!
     \`\`\`tsx
     <section className="editorial-slide">
       <header className="editorial-header">
         <div className="editorial-kicker"><span className="editorial-kicker-dot" /><span>{slide.kicker}</span></div>
         <h1 className="editorial-headline">{slide.headline}</h1>
         {slide.subheadline && <p className="editorial-subheadline">{slide.subheadline}</p>}
       </header>
       <div className="editorial-card flex-1 flex flex-col justify-center items-center text-center p-12 !border-2 !border-[var(--accent)] gap-6">
         <div className="editorial-metric-huge !text-[120px]">{t0?.value || '400%'}</div>
         <div className="font-[family-name:var(--font-mono)] text-[22px] tracking-widest text-[var(--ink)] opacity-80 uppercase max-w-[600px]">{t0?.label || slide.subheadline}</div>
         {items[0] && (
           <p className="editorial-card-body !text-[26px] !leading-relaxed max-w-[700px] border-t border-[var(--border)] pt-6 mt-2">
             <InlineEmphasis text={items[0].body} />
           </p>
         )}
       </div>
       {slide.footer && <p className="editorial-note"><InlineEmphasis text={slide.footer} /></p>}
     </section>
     \`\`\`

   - ARCHETYPE 5 ("systemic-mechanism-flow"):
     \`\`\`tsx
     <section className="editorial-slide">
       <header className="editorial-header">
         <div className="editorial-kicker"><span className="editorial-kicker-dot" /><span>{slide.kicker}</span></div>
         <h1 className="editorial-headline">{slide.headline}</h1>
         {slide.subheadline && <p className="editorial-subheadline">{slide.subheadline}</p>}
       </header>
       <div className="editorial-visual-frame editorial-visual-compact">
         <svg viewBox="0 0 952 340" role="img">...</svg>
       </div>
       <div className="layout-grid-3">
         {items.map((item: any, i: number) => (
           <article key={i} className="editorial-card !p-4 !gap-2">
             <div className="font-[family-name:var(--font-mono)] text-[16px] text-[var(--accent)] font-semibold">0{i + 1}</div>
             <h2 className="editorial-card-title !text-[20px]">{item.title}</h2>
             <p className="editorial-card-body !text-[18px]"><InlineEmphasis text={item.body} /></p>
           </article>
         ))}
       </div>
     </section>
     \`\`\`

   - ARCHETYPE 6 ("three-row-verification-ledger"): ZERO SVG!
     \`\`\`tsx
     <section className="editorial-slide">
       <header className="editorial-header">
         <div className="editorial-kicker"><span className="editorial-kicker-dot" /><span>{slide.kicker}</span></div>
         <h1 className="editorial-headline">{slide.headline}</h1>
         {slide.subheadline && <p className="editorial-subheadline">{slide.subheadline}</p>}
       </header>
       <div className="layout-ledger">
         {items.map((item: any, i: number) => (
           <div key={i} className="layout-ledger-row">
             <span className="font-[family-name:var(--font-mono)] text-[22px] text-[var(--accent)] font-bold">[{item.index || '0' + (i + 1)}]</span>
             <div className="flex-1 flex flex-col gap-1">
               <span className="font-[family-name:var(--font-headline)] text-[22px] font-semibold text-[var(--ink)]">{item.title}</span>
               <p className="editorial-card-body !text-[20px]"><InlineEmphasis text={item.body} /></p>
             </div>
             {item.badge && <span className="editorial-metric-badge !text-[18px]">{item.badge}</span>}
           </div>
         ))}
       </div>
     </section>
     \`\`\`

   - ARCHETYPE 7 ("editorial-verdict-playbook"):
     \`\`\`tsx
     <section className="editorial-slide">
       <header className="editorial-header">
         <div className="editorial-kicker"><span className="editorial-kicker-dot" /><span>{slide.kicker}</span></div>
         <h1 className="editorial-headline">{slide.headline}</h1>
         {slide.subheadline && <p className="editorial-subheadline">{slide.subheadline}</p>}
       </header>
       <div className="layout-grid-2">
         <article className="editorial-card !border-l-4 !border-l-[var(--border)]">
           <h2 className="editorial-card-title">{items[0]?.title}</h2>
           <p className="editorial-card-body"><InlineEmphasis text={items[0]?.body} /></p>
         </article>
         <article className="editorial-card !border-l-4 !border-l-[var(--accent)]">
           <h2 className="editorial-card-title">{items[1]?.title}</h2>
           <p className="editorial-card-body"><InlineEmphasis text={items[1]?.body} /></p>
         </article>
       </div>
       <div className="editorial-verdict-seal">
         <div className="font-[family-name:var(--font-mono)] text-[18px] text-[var(--accent)] font-bold uppercase tracking-wider">{slide.verdict?.title || 'FINAL VERDICT'}</div>
         <p className="font-[family-name:var(--font-body)] text-[22px] font-semibold text-[var(--ink)] flex-1 text-right">
           <InlineEmphasis text={slide.verdict?.takeaway || slide.footer || 'The bottom line takeaway.'} />
         </p>
       </div>
     </section>
     \`\`\`

2. STRICT BAN ON DUPLICATE FOOTERS & AI DISCLAIMERS:
   - SlideFrame ALREADY provides the outer magazine shell: publication masthead (top) and pagination bar (bottom: 01/07, progress dots, handle, swipe cue).
   - DO NOT render a second outer footer ('border-t pt-4 ...'), duplicate pagination, or AI research caveats ('Independent editorial brief prepared for...')!
   - Footnotes or legal references belong in '<p className="editorial-note">'.

3. Creative Freedom & Architectural Information Design:
   - For slides with SVGs: Pure geometry, layered surface fills, visible stroke hairlines, and focal accent trajectories. ZERO clipart!
   - Standalone vector numerical callouts, degree marks, unit labels (e.g. '$250', '$1,000', '148°', '4K') are permitted in SVG <text>.
   - BANNED: Never draw fake text wireframe paths (d="M...H..."). Never simulate text with hatching lines!

4. Theme & Token Integration:
   - STRICT NEGATIVE CONSTRAINT: DO NOT declare an inline theme object (e.g. 'const theme = { ... }' or 'const currentBrand = { ... }') and NEVER apply 'style={theme}'! The canvas CSS variables (--ink, --accent, --paper, --surface, --border, --font-headline, --font-body, --font-mono) are injected globally by SlideFrame.
   - Use the semantic editorial classes. Use Tailwind utilities only for fine-grained alignment.

5. Canonical Imports:
   \`\`\`tsx
   import React from 'react';
   import { parseMetricBadge, InlineEmphasis, type SlideComponentProps } from '../../../src/skeleton/types';
   \`\`\`

6. SIMPLICITY IN HEADLINE & TEXT RENDERING:
   - NEVER write brittle word slicing/joining code (e.g. split(/\s+/).slice().join()).
   - Always render \`{slide.headline}\` directly inside \`<h1 className="editorial-headline">{slide.headline}</h1>\` (or \`<h1 className="editorial-headline editorial-headline-split">{slide.headline}</h1>\`).
`;
}

export function buildSingleSlideUserPrompt(
  slideNumber: number,
  slideData: SlideData,
  blueprint: SlideDesignBlueprint | undefined,
  brand: BrandTokens
): string {
  const chosenArchetype = slideData.archetype || slideData.layoutTopology || blueprint?.layoutStructure || 'asymmetric-editorial-cards';
  const chosenStyle = slideData.visualStyle || chosenArchetype;
  const isSvgFree = ['claim-vs-reality-diptych', 'hero-metric-placard', 'three-row-verification-ledger'].includes(chosenArchetype) ||
    blueprint?.svgConcept?.type === 'none' ||
    blueprint?.svgConcept?.description === 'none';
  const chosenSvg = isSvgFree
    ? 'NONE (PURE TYPOGRAPHY / DATA LAYOUT — DO NOT RENDER ANY SVG! Let the HTML copy, metric typography, or ledger table fill the canvas vertically.)'
    : (slideData.svgBlueprint || blueprint?.svgConcept?.description || 'Bespoke inline vector SVG matching archetype');
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
Follow the assigned archetype blueprint strictly! Do NOT revert to a generic "Header -> SVG -> 2 cards" layout!
Compose using the shared editorial CSS classes ('editorial-slide', 'editorial-header', 'editorial-kicker', 'editorial-headline', 'editorial-visual-frame', 'editorial-card', 'layout-grid-2', 'layout-grid-3', 'layout-claim-reality', 'layout-ledger', etc.).
DO NOT render duplicate outer footers or brand mastheads—SlideFrame provides those.
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
6. "Property 'join' does not exist on type 'string'":
   - \`.join()\` was called on a string instead of an array.
   - If \`words = str.split(/\s+/)\`, \`words[0]\` is a string! Change \`words[0]?.slice(...).join(' ')\` to \`words.slice(...).join(' ')\`, or better yet, simply render \`{slide.headline}\` directly without splitting!

Fix all syntax and type errors completely. Return ONLY the corrected code in a \`\`\`tsx code block.`;
}

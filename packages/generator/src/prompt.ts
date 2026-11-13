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
// STAGE 4: SENIOR COPY EDITOR & STORY ARCHITECT (DYNAMIC STORYBOARD)
// ============================================================================

export function buildStoryDeckSystemPrompt(
  preset: NarrativePreset = 'storytelling',
  targetSlideCount = 7
): string {
  const count = Math.max(4, Math.min(14, targetSlideCount));
  const arcDescription = getNarrativeArc(preset, count);

  return `You are a World-Class Visual Journalism Creative Director and Senior Editor at The New York Times Graphics Desk, Reuters, Wired, and The Financial Times.
You author scroll-stopping, high-impact editorial carousel content engineered for MOBILE INSTAGRAM (3-SECOND SCAN RULE).
Every slide must read like an art-directed editorial publication (The New York Times, Monocle, HBR, MoMA, Wired)—NEVER an off-the-shelf web UI, corporate pitch deck, or generic bullet list.

CRITICAL EDITORIAL & COPY RULES:

1. THE 3-SECOND MOBILE SCAN RULE (STRICT WORD BUDGETS):
   On a mobile smartphone screen, users swipe in 3 seconds. Dense text is an instant failure.
   - HEADLINES: 4 to 6 words maximum. High-tension, active voice, zero passive corporate jargon.
   - SUBHEADLINES: 6 to 10 words maximum (1 punchy clarifying sentence or omit if headline is self-explanatory).
   - CARD / POINT BODY: STRICT 6 TO 12 WORDS MAXIMUM PER ITEM! Every word must hit with surgical editorial precision.
     * BAD: "Starbucks receives prepayment. Customers receive spending value—not interest or FDIC insurance." (11 words)
     * GOOD: "You lend them cash. You earn **0% interest** with **zero FDIC insurance**." (8 words)
     * BAD: "Combined company-operated and licensed store breakage revenue calculated from segment disclosures." (12 words)
     * GOOD: "**$222M in pure profit** harvested from forgotten card change." (7 words)
   - CARD TITLES: 2 to 4 words maximum (e.g. "THE ILLUSION", "THE FINE PRINT", "THE FLOAT", "ZERO INSURANCE").
   - MANDATORY BOLD SKIM ANCHORS: You MUST bold the single highest-signal takeaway phrase in every point (e.g. **0% interest**, **$1.8B float**, **zero protection**).

2. RADICAL SLIDE DIVERSITY (NATURAL JOURNALISTIC ARC):
   To guarantee high swipe engagement and eliminate layout fatigue, craft each slide with its distinct narrative purpose:
   * Slide 1: Monumental Hook / Cover — Inciting event, massive stakes, hook headline, subheadline, issue badge, hero telemetry.
   * Slide 2: The Conventional Myth / Belief vs Reality — PR spin or popular belief vs the forensic reality.
   * Slide 3: The Core Mechanism / Hidden Dynamic — The engine or structural system making this happen.
   * Slide 4: Monumental Telemetry / The Big Number — Dominant quantitative fact or regulatory threshold.
   * Slide 5: The Systemic Process / Operational Pipeline — Step-by-step mechanism or ripple sequence.
   * Slide 6: Evidence Ledger / Buried Receipts — Tabular forensic proof, contract clauses, or comparative data.
   * Slide 7: The Verdict / Executive Playbook — Definitive conclusion, decision matrix, or final takeaway rule.

3. DYNAMIC NARRATIVE ARC (${count} SLIDES):
   * ${arcDescription}

4. DATA & METRIC DISCIPLINE:
   - Telemetry values: MUST be strictly numerical or signed badge ("$1.8B", "0%", "$222M", "+12%", "400%"). Qualifiers belong in label.
   - Total words per slide: strictly 25 to 55 words across the entire slide.

Return strictly a JSON array of exactly ${count} slide objects:
[
  {
    "id": "slide-1",
    "index": 0,
    "type": "cover",
    "kicker": "FORENSIC INVESTIGATION",
    "headline": "The $4.2 Billion Seat Monopoly",
    "subheadline": "How airlines sell 115% capacity and profit from calculated no-show margins.",
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
    "kicker": "THE CONVENTIONAL MYTH",
    "headline": "PR Pitch vs. Mathematical Reality",
    "subheadline": "Airlines frame overbooking as efficiency savings passed on to travelers.",
    "claim": {
      "title": "THE CORPORATE POSITION",
      "body": "Overbooking keeps ticket prices affordable by compensating for inevitable no-shows."
    },
    "reality": {
      "title": "THE FORENSIC REALITY",
      "body": "A calculated revenue engine where bumped seats generate **pure statistical margin** with zero liability risk.",
      "badge": "FORENSIC AUDIT"
    }
  },
  {
    "id": "slide-3",
    "index": 2,
    "type": "mechanism",
    "kicker": "SYSTEM ARCHITECTURE",
    "headline": "Poisson Yield Curves",
    "subheadline": "Algorithms balance bumping penalties against unsold seat losses in real time.",
    "items": [
      { "title": "HISTORICAL NO-SHOWS", "body": "Routes average an expected **9.2% cancellation rate** on peak business flights." },
      { "title": "ASYMMETRIC MARGIN", "body": "Selling 15 extra seats nets **$4,500 upside** against a **$1,200 penalty risk**." }
    ]
  },
  {
    "id": "slide-4",
    "index": 3,
    "type": "telemetry",
    "kicker": "REGULATORY THRESHOLD",
    "headline": "The 400% Payout Cap",
    "subheadline": "Federal law mandates aggressive cash penalties for involuntary bumps.",
    "telemetry": [
      { "badge": "400%", "label": "Cash compensation multiplier for delays exceeding 2 hours" }
    ],
    "items": [
      { "title": "THE VOUCHER TRAP", "body": "Carriers push **$800 travel credits** before disclosing your right to **$1,550 cash**." }
    ],
    "footer": "14 CFR § 250.5 Federal Airline Consumer Protections."
  },
  {
    "id": "slide-5",
    "index": 4,
    "type": "system",
    "kicker": "OPERATIONAL SEQUENCE",
    "headline": "The Involuntary Bump Pipeline",
    "subheadline": "How automated airline algorithms triage candidates before boarding starts.",
    "items": [
      { "title": "CHECK-IN GATE", "body": "Timestamp assigns default priority tier." },
      { "title": "FARE CLASS FILTER", "body": "Basic Economy tickets routed to bump pool." },
      { "title": "GATE AUCTION", "body": "Vouchers escalate until volunteers surrender seats." }
    ]
  },
  {
    "id": "slide-6",
    "index": 5,
    "type": "ledger",
    "kicker": "AUDIT LEDGER",
    "headline": "Three Buried Contract Rules",
    "subheadline": "Contract of Carriage provisions carriers hope you never read.",
    "items": [
      { "index": "01", "title": "CHECK-IN CUTOFF", "body": "Missing the **45-minute bag drop deadline** forfeits all denied boarding rights.", "badge": "RULE 14" },
      { "index": "02", "title": "PAYMENT METHOD", "body": "Airlines must pay **cash or check immediately at the gate**, not delayed travel credits.", "badge": "CFR 250" },
      { "index": "03", "title": "DOWNGAUGE EXCEPTION", "body": "Aircraft swaps for safety reasons **exempt carriers from cash liability**.", "badge": "SECTION 7" }
    ]
  },
  {
    "id": "slide-7",
    "index": 6,
    "type": "verdict",
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
    }
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

  return `Author the ${count}-slide storyboard for this editorial publication:

Publication: "${brand.name}" (${brand.domain})
Palette: Paper ${brand.palette.paper}, Ink ${brand.palette.ink}, Accent ${brand.palette.accent}, Surface ${brand.palette.surface}
Hook Headline: "${hook}"
Value Promise: "${promise}"
Kicker: "${kicker}"
Core Visual Metaphor: "${metaphor}"
Core Conflict: "${conflict}"
Hidden Catches: "${catches}"
Verdict: "${verdict}"

Verified Data & Metrics:
${JSON.stringify(dossier.verifiedMetrics || [], null, 2)}
Quotes:
${JSON.stringify(dossier.verifiedQuotes || [], null, 2)}

Output strictly the JSON array of exactly ${count} slide objects. Remember: PURE EDITORIAL COPY ONLY, MAX 12 WORDS PER CARD BODY WITH **BOLD ANCHORS**, STRICT NUMERICAL TELEMETRY BADGES, AND ZERO CORPORATE FLUFF!`;
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
// STAGE 5: VISUAL ART DIRECTOR & DESIGN TECHNOLOGIST (BESPOKE CSS + BLUEPRINTS)
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

export interface DeckArtDirection {
  baseCss: string;
  blueprints: SlideDesignBlueprint[];
}

export function buildVisualBlueprintSystemPrompt(targetSlideCount = 7): string {
  const count = Math.max(4, Math.min(14, targetSlideCount));
  return `You are an Information Designer, Art Director, and Principal Design Technologist at Pentagram, Monocle, Wired, and The New York Times Graphics Desk.
Your task is twofold:
1. CRAFT A BESPOKE STYLESHEET (baseCss):
   Author a story-tailored CSS stylesheet (styles.css) that gives the entire carousel a handcrafted, high-end editorial identity.
   - Tailor the styling to the subject matter (e.g. aviation telemetry/tickets, microchip lithography, financial ledger, luxury retail, legal briefs).
   - Use CSS custom properties provided by SlideFrame:
     * var(--paper), var(--ink), var(--accent), var(--surface), var(--border), var(--subtle)
     * var(--font-headline), var(--font-body), var(--font-mono)
   - Define expressive, reusable CSS helper classes (e.g. custom card treatments, subtle tints, hairline dividers, callout borders, stat placards, quote containers, ledger rows, badges).
   - Editorial Aesthetic Rules:
     * Architectural 0px or 2px corners (never bloated web UI pill bubbles)
     * Crisp 1px hairlines ('1px solid var(--border)')
     * Rich tonal surface treatments (backgrounds using var(--surface) or subtle transparencies)
     * Monospace tags and tabular telemetry styling
     * Absolutely NO tacky drop-shadows or generic corporate boxes.

2. ARCHITECT BESPOKE VISUAL BLUEPRINTS FOR EACH SLIDE (${count} SLIDES):
   Plan the bespoke spatial layout architecture, typography scale, and inline SVG infographic concept for every slide.
   - Radical swipe diversity: Alternate between visual centerpieces, pure high-contrast typography diptychs, tabular data ledgers, hero numerical placards, and technical cutaways.
   - For slides requiring an SVG: viewBox matched to the container (e.g. 952x560 for cover, 448x720 for split diptych, 952x340 for horizontal flow). Layered surface fills (fill="var(--surface)"), stroke hairlines (stroke="var(--border)"), accent focal trajectories (stroke="var(--accent)"), zero clipart.
   - For slides that are typography or tabular driven (e.g. myth vs reality, hero number, data ledger): set svgConcept: { "type": "none", "description": "none" }.

Return strictly a JSON object matching this structure:
{
  "baseCss": "/* Story-tailored editorial stylesheet */\\n.deck-slide { ... }\\n.deck-card { ... }\\n...",
  "blueprints": [
    {
      "slideId": "slide-1",
      "type": "cover",
      "layoutStructure": "Monumental cover with large headline, subheadline, hero metric badge, and dominant central visual artifact.",
      "svgConcept": {
        "type": "schematic",
        "description": "viewBox='0 0 952 560'. Imposing geometric system centerpiece with layered surface fills (fill='var(--surface)'), 1.5px hairlines, accent focal trajectories, and micro-coordinates.",
        "elements": ["primary-silhouette", "structural-elevation", "accent-trajectories", "micro-coordinates"]
      },
      "typographyScale": {
        "headlineSize": "text-[64px]",
        "subtitleSize": "text-[26px]"
      },
      "spatialBalanceGuidance": "Header zone occupies top 220px; SVG centerpiece occupies middle 540px; bottom metadata ledger occupies bottom 80px. Fills 90% of vertical canvas."
    }
  ]
}`;
}

export function buildVisualBlueprintUserPrompt(
  slides: SlideData[],
  brand: BrandTokens,
  dossier: NarrativeDossier,
  strategy?: StoryStrategy
): string {
  const metaphor = strategy?.visualMetaphor || brand.vibe || dossier.visualMetaphor || dossier.editorialTheme || 'Technical editorial autopsy';
  const hook = strategy?.hookHeadline || dossier.hookHeadline || '';

  return `Synthesize the bespoke base CSS stylesheet (baseCss) and visual blueprints (blueprints) for these ${slides.length} slides:

Publication: "${brand.name}" (${brand.domain})
Palette: Paper ${brand.palette.paper}, Ink ${brand.palette.ink}, Accent ${brand.palette.accent}, Surface ${brand.palette.surface}, Border ${brand.palette.border}
Fonts: Headline "${brand.typography.headlineFont}", Body "${brand.typography.bodyFont}", Mono "${brand.typography.monoFont}"
Visual Metaphor: "${metaphor}"
Hook: "${hook}"

Editorial Slides to Blueprint:
${JSON.stringify(slides, null, 2)}

Output strictly valid JSON with keys "baseCss" and "blueprints" (containing exactly ${slides.length} SlideDesignBlueprint items).`;
}

// ============================================================================
// STAGE 6: PRINCIPAL REACT ENGINEER (BESPOKE CODE GENERATION WITH CoT)
// ============================================================================

export interface SlidePromptContext {
  slideNumber: number;
  totalSlides: number;
  slideData: SlideData;
  blueprint?: SlideDesignBlueprint;
  precedingSlides: Array<{
    slideNumber: number;
    type: string;
    headline: string;
    layoutStructure?: string;
  }>;
  upcomingSlides: Array<{
    slideNumber: number;
    type: string;
    headline: string;
  }>;
  baseCss?: string;
  brand: BrandTokens;
}

export function buildSingleSlideSystemPrompt(platform = 'instagram-feed'): string {
  const isStories = platform === 'instagram-stories';
  const isSquare = platform === 'instagram-square';
  const safeAreaDesc = isStories
    ? '1080x1920 canvas (9:16 vertical stories format), 952x1596 safe area'
    : isSquare
    ? '1080x1080 canvas (1:1 square format), 952x758 safe area'
    : '1080x1350 canvas (4:5 portrait format), 952x1028 safe area';

  return `You are a world-class Frontend Engineer and Editorial Art Director (Pentagram, Wired, The New York Times, Monocle).
You write bespoke React TypeScript components for publication-grade carousel slides (${safeAreaDesc}).

AUTONOMOUS HANDCRAFTED DESIGN (ZERO PREBUILT SKELETONS):
You have complete creative autonomy to design this slide. There are NO rigid pre-canned layout templates or deterministic class names you are forced to use.
Instead, compose with full editorial craftsmanship using Tailwind CSS utilities along with any custom classes available from the deck's bespoke stylesheet (styles.css).

CHAIN-OF-THOUGHT (CoT) REASONING MANDATE:
Before emitting the tsx code block, you MUST provide an explicit <design_thought>...</design_thought> block detailing:
1. Preceding Slides Harmony & Contrast: Review what slides 1 to i-1 have already built. What visual rhythm, density, and layouts were used? How does this slide introduce a fresh, scroll-stopping contrast while remaining part of the same publication?
2. Narrative Role & Emotional Tension: What is the exact editorial mission of this slide in the story arc?
3. Upcoming Slides Foresight: What information and visual punchlines are planned for upcoming slides? How do you ensure this slide doesn't steal their thunder or repeat their upcoming visual devices?
4. Spatial Balance & Styling Strategy: How will your layout balance the vertical canvas (aiming for 75%–95% coverage, avoiding top-heavy voids) using Tailwind and the deck's bespoke styles.css?

CRITICAL EDITORIAL & TECHNICAL RULES:
1. ROOT CONTAINER:
   - Must fill the frame: <section className="w-full h-full flex flex-col justify-between ..."> or similar.
   - Use flex flex-col justify-between with min-h-0 and gap utilities to distribute content harmoniously across the canvas.
2. EDITORIAL EXCELLENCE:
   - High-contrast typography: monumental headlines (text-[48px] to text-[64px] font-[family-name:var(--font-headline)]), crisp monospace kickers with letter-spacing, punchy subheadlines.
   - Skim anchors: Wrap key takeaways in <InlineEmphasis text={...} /> or <strong>...</strong>.
   - Tabular numerals: Use font-[family-name:var(--font-mono)] for metrics and badges.
3. INLINE VECTOR GRAPHICS (IF SPECIFIED IN BLUEPRINT):
   - When the blueprint specifies an SVG: render clean, high-precision inline SVG with viewBox matched to container dimensions. Use stroke="var(--border)", fill="var(--surface)", stroke="var(--accent)", fill="var(--ink)" fillOpacity="0.06".
   - When blueprint specifies "none": DO NOT RENDER ANY SVG! Let typography, callout panels, ledgers, or hero metrics command the canvas.
4. CANONICAL IMPORTS:
   \`\`\`tsx
   import React from 'react';
   import { InlineEmphasis, parseMetricBadge, type SlideComponentProps } from '../../../src/skeleton/types';
   \`\`\`
5. ZERO HEADLINE STRIP/SPLIT BUGS:
   - NEVER manually slice or join headline strings (e.g. split().slice().join()). Render \`{slide.headline}\` directly inside your headline tag.
6. ZERO DUPLICATE SHELL ELEMENTS:
   - SlideFrame already provides the outer publication masthead and pagination/swipe footer. Do NOT render duplicate outer headers or footers!
7. TOKENS & STYLING:
   - NEVER declare local theme objects (e.g. \`const theme = { ... }\`) or apply \`style={theme}\`. Use Tailwind classes, the deck's \`styles.css\` classes, and CSS variables \`var(--ink)\`, \`var(--paper)\`, \`var(--accent)\`, \`var(--surface)\`, \`var(--border)\`.
8. ZERO OVERFLOW-HIDDEN:
   - NEVER add 'overflow-hidden' or 'overflow: hidden' to the root <section> or container. It risks clipping cards or sub-elements and fails the automated visual audit. Size content naturally using flex-1, min-h-0, and appropriate gap sizes.
9. HEADLINE WRAPPING & NO NARROW MAX-WIDTH:
   - Headlines must be sized text-[48px] to text-[64px] (never larger than 64px) with [text-wrap:balance] and line-height between 1.0 and 1.1.
   - NEVER constrain headlines with narrow pixel max-width (e.g. style={{ maxWidth: 660 }} or max-w-[600px]) that causes single words or lines to clip ('scrollWidth > clientWidth'). Allow headlines to span the full safe area width (952px) and wrap naturally.
`;
}

export function buildSingleSlideUserPrompt(
  slideNumberOrContext: number | SlidePromptContext,
  slideData?: SlideData,
  blueprint?: SlideDesignBlueprint,
  brand?: BrandTokens
): string {
  let ctx: SlidePromptContext;
  if (typeof slideNumberOrContext === 'object') {
    ctx = slideNumberOrContext;
  } else {
    ctx = {
      slideNumber: slideNumberOrContext,
      totalSlides: 7,
      slideData: slideData!,
      blueprint,
      precedingSlides: [],
      upcomingSlides: [],
      brand: brand!,
    };
  }

  const { slideNumber, totalSlides, slideData: slide, blueprint: bp, precedingSlides, upcomingSlides, baseCss, brand: b } = ctx;
  const isSvgFree = bp?.svgConcept?.type === 'none' || bp?.svgConcept?.description === 'none';
  const chosenSvg = isSvgFree
    ? 'NONE (PURE TYPOGRAPHY / DATA LAYOUT — DO NOT RENDER ANY SVG! Let the HTML copy, metric typography, or ledger table fill the canvas vertically.)'
    : (slide.svgBlueprint || bp?.svgConcept?.description || 'Bespoke inline vector SVG matching blueprint');

  return `Generate the bespoke React + Tailwind component for Slide ${slideNumber} of ${totalSlides}:

=== CUMULATIVE DECK CONTEXT (CHAIN-OF-THOUGHT MEMORY) ===

1. PRECEDING SLIDES (Already Planned / Generated in this Deck):
${precedingSlides.length > 0
  ? precedingSlides.map((s) => `   - Slide ${s.slideNumber} [${s.type}]: "${s.headline}" (${s.layoutStructure || 'Standard'})`).join('\n')
  : '   (This is Slide 1 — The Monumental Opening Cover)'}

2. CURRENT SLIDE TO GENERATE (Slide ${slideNumber}):
   - Type: "${slide.type}"
   - Kicker: "${slide.kicker || ''}"
   - Headline: "${slide.headline}"
   - Subheadline: "${slide.subheadline || ''}"
   - Copy Data:
${JSON.stringify(slide, null, 2)}

3. UPCOMING SLIDES (Ahead in this Deck):
${upcomingSlides.length > 0
  ? upcomingSlides.map((s) => `   - Slide ${s.slideNumber} [${s.type}]: "${s.headline}"`).join('\n')
  : '   (This is the final climax/verdict slide)'}

=== VISUAL ARCHITECTURE & BLUEPRINT ===
- Assigned Layout Structure: "${bp?.layoutStructure || slide.layoutTopology || 'Bespoke Editorial'}"
- Bespoke Vector SVG: "${chosenSvg}"
- Spatial Balance Guidance: "${bp?.spatialBalanceGuidance || 'Fill 75%-95% of vertical frame using flex-1 min-h-0 and justify-between. Avoid dead voids.'}"
- Prescribed Headline Scale: "${bp?.typographyScale?.headlineSize || 'text-[52px] to text-[64px]'}"

=== BESPOKE DECK STYLESHEET (styles.css) ===
${baseCss ? `The following custom classes and tokens were generated specifically for this deck:\n\`\`\`css\n${baseCss}\n\`\`\`` : '(Use Tailwind utilities and CSS custom properties)'}

=== PUBLICATION & BRAND TOKENS ===
- Publication: "${b.name}" (${b.domain})
- Palette: Paper ${b.palette.paper}, Ink ${b.palette.ink}, Accent ${b.palette.accent}, Surface ${b.palette.surface}, Border ${b.palette.border}
- Fonts: Headline "${b.typography.headlineFont}", Body "${b.typography.bodyFont}", Mono "${b.typography.monoFont}"

MANDATORY INSTRUCTIONS:
1. First, provide your explicit <design_thought> reasoning addressing:
   - Harmony & visual contrast with Preceding Slides
   - Narrative purpose of Current Slide
   - Foresight regarding Upcoming Slides
   - Spatial layout & styling execution plan (Tailwind + styles.css)
2. Then, provide the complete, working React TypeScript component inside a \`\`\`tsx code block.`;
}

// ============================================================================
// STAGE 7: COMPILER & VISUAL AUDIT SELF-HEALING
// ============================================================================

export function buildVisualSelfHealingPrompt(
  filename: string,
  code: string,
  visualError: string
): string {
  return `The following React component failed the Playwright Visual Audit:
File: ${filename}
Visual Audit Error:
${visualError}

Original Code:
\`\`\`tsx
${code}
\`\`\`

Instructions to Fix:
1. If the error mentions "Main <section> has overflow:hidden":
   - Remove "overflow-hidden" or "overflow: hidden" from the main/section element so elements size naturally.
2. If the error mentions "Text clipped" or "scrollWidth > clientWidth":
   - Remove narrow max-width constraints (e.g. maxWidth: 660 or max-w-[...]) from the clipped element.
   - Sightly reduce headline font size (e.g. from 76px to 56px or 60px) and add [text-wrap:balance] so text wraps cleanly without clipping.
3. If the error mentions "Element overflows canvas":
   - Adjust padding, gap, or element height so all content fits within the canvas.

Fix all visual issues. Return ONLY the corrected code in a \`\`\`tsx code block.`;
}

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


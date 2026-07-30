import { parseXml } from './xml-parser.js';
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';

// ─── Types ──────────────────────────────────────────────────────────────────

export interface TemplateInfo {
  id: string;
  name: string;
  aesthetics: string;
  schemaText: string;
  schemaTextConcise: string;
  toneKeywords: string[];
}

export interface DomainExamples {
  id: string;
  name: string;
  description: string;
  powerWords: string[];
  principles: string[];
  fewShotId?: string;
}

// ─── Per-Phase Retry Budgets ────────────────────────────────────────────────

const RETRY_BUDGETS: Record<string, number> = {
  extraction: 1,
  planning: 1,
  generation: 1,
  labelDetection: 2,
};

async function withPhaseRetry<T>(
  fn: () => Promise<T>,
  phase: string,
  retriesUsed: Record<string, number>,
  onError?: (err: Error) => void,
): Promise<T> {
  const budget = RETRY_BUDGETS[phase] ?? 0;
  const used = retriesUsed[phase] ?? 0;

  try {
    return await fn();
  } catch (err) {
    if (used >= budget) {
      onError?.(err as Error);
      throw err;
    }
    retriesUsed[phase] = used + 1;
    throw err;
  }
}

// ─── Few-Shot Examples ──────────────────────────────────────────────────────

const FEW_SHOT_NEWS = `## EXAMPLE CAROUSEL — News/Disaster (GREAT quality)

Content: 13 dead after 6.8 earthquake in Kumamoto, Japan. Mall collapsed. 3,600 troops deployed.
Domain: news

<presentation>
  <slide type="cover" id="slide-01" tag="BREAKING NEWS" headline="13 Dead. Mall Collapsed. They're Hiding Something." subheadline="The Kumamoto earthquake nobody saw coming. You need to know." authorName="Editorial Desk" authorRole="Investigative Unit" footerLeft="THE PAPER OF RECORD" footerRight="PAGE 01" />
  <slide type="telemetry" id="slide-02" tag="SHOCKING DATA" headline="These Numbers Tell the Real Story" footerLeft="THE PAPER OF RECORD" footerRight="PAGE 02">
    <stats>
      <stat value="6.8" unit="mag" label="Earthquake magnitude" />
      <stat value="13" unit="lives" label="Confirmed deaths" />
      <stat value="6" unit="miles" label="Depth of quake" />
      <stat value="3,600" unit="troops" label="Personnel deployed" />
    </stats>
  </slide>
  <slide type="sequence" id="slide-03" tag="URGENT RESCUE" headline="3 Things Happening Right Now" footerLeft="THE PAPER OF RECORD" footerRight="PAGE 03">
    <items>
      <item num="1" title="Mall collapse rescue" desc="Two women confirmed dead. Teams searching for trapped survivors." />
      <item num="2" title="3,600 troops deployed" desc="Self-defense forces searching affected areas immediately." />
      <item num="3" title="Nuclear facilities stable" desc="No abnormalities reported at nearby plants." />
    </items>
  </slide>
  <slide type="myth-fact" id="slide-04" tag="TSUNAMI TRUTH" headline="Tsunami Warning. Lifted. Panic Was Real" myth="The tsunami threat is ongoing and catastrophic." fact="Advisory was lifted. The immediate danger to your coast is gone." footerLeft="THE PAPER OF RECORD" footerRight="PAGE 04" />
  <slide type="quote" id="slide-05" tag="OFFICIAL STATEMENT" quote="We have already confirmed extensive damage, including casualties, collapsed buildings, damaged roads and fires" author="Takaichi Sanae" role="Japanese Prime Minister" footerLeft="THE PAPER OF RECORD" footerRight="PAGE 05" />
  <slide type="cta" id="slide-06" tag="STAY VIGILANT" headline="Don't Scroll Past This" subtext="Aftershocks remain a threat. Follow trusted sources for live updates." actionLabel="Follow for updates" socialHandle="@PaperOfRecord" footerLeft="THE PAPER OF RECORD" footerRight="PAGE 06" />
</presentation>

Notice: Cover uses a SPECIFIC DETAIL (13 dead + mall collapse), not a generic label. Headlines use Title Case. Headlines are claims or commands, never noun phrases. Myth-fact is factually accurate — the advisory WAS lifted. All data comes from the content.`;

const FEW_SHOT_POLITICS = `## EXAMPLE CAROUSEL — Politics/Investigation (GREAT quality)

Content: Fauci's leaked journals reveal private thoughts on COVID origins. 1,100 pages. Rand Paul released them. 10 of 12 scientists saw lab leak as possible.
Domain: politics

<presentation>
  <slide type="cover" id="slide-01" tag="THE HIDDEN FILES" headline="1,100 Pages They Tried to Bury" subheadline="Fauci's private journals. The truth is inside." authorName="Editorial Desk" authorRole="Investigative Analysis" footerLeft="THE PAPER OF RECORD" footerRight="PAGE 01" />
  <slide type="telemetry" id="slide-02" tag="THE EVIDENCE" headline="2 vs 10. The Debate Was Real" footerLeft="THE PAPER OF RECORD" footerRight="PAGE 02">
    <stats>
      <stat value="1,100" unit="pages" label="Leaked private journal documents" />
      <stat value="12" unit="scientists" label="On the February 1, 2020 call" />
      <stat value="10" unit="of 12" label="Saw lab leak as possible" />
    </stats>
  </slide>
  <slide type="sequence" id="slide-03" tag="WHAT HE WROTE" headline="What His Private Notes Actually Say" footerLeft="THE PAPER OF RECORD" footerRight="PAGE 03">
    <items>
      <item num="1" title="Lab leak was possible" desc="10 of 12 scientists on the Feb 1 call thought deliberate insertion was possible." />
      <item num="2" title="Market was amplifier" desc="Fauci privately wrote the market spread the virus, didn't start it." />
      <item num="3" title="Trump frustration" desc="Fauci called Trump's rhetoric nonsense and an embarrassment." />
      <item num="4" title="Fame discomfort" desc="He tracked his celebrity status while writing he didn't like it." />
    </items>
  </slide>
  <slide type="myth-fact" id="slide-04" tag="THE DECEPTION" headline="Public Said One Thing. Private Said Another" myth="The journals reveal a deliberate cover-up of lab-leak evidence." fact="The journals show scientists were genuinely divided, with no definitive proof of either origin." footerLeft="THE PAPER OF RECORD" footerRight="PAGE 04" />
  <slide type="quote" id="slide-05" tag="THE VERDICT" quote="We've probably never ever seen people so completely at odds with their private thoughts, and then publicly proclaiming the opposite of what they were truly saying in private." author="Rand Paul" role="Republican Senator" footerLeft="SENATE TESTIMONY" footerRight="PAGE 05" />
  <slide type="cta" id="slide-06" tag="YOUR TURN" headline="Read the Files. Decide" subtext="1,100 pages are public. Form your own opinion." actionLabel="Share your thoughts" socialHandle="@PaperOfRecord" footerLeft="THE FINAL WORD" footerRight="PAGE 06" />
</presentation>

Notice: Cover uses a SPECIFIC NUMBER (1,100 pages) to create curiosity. Myth-fact is factually accurate — the brief says scientists were divided, not that there was a cover-up. Headlines use Title Case. Headlines are claims or commands. All facts come from the content brief.`;

const FEW_SHOT_MAP: Record<string, string> = {
  news: FEW_SHOT_NEWS,
  politics: FEW_SHOT_POLITICS,
};
const DEFAULT_FEW_SHOT = FEW_SHOT_NEWS;

// ─── Domain Classification ──────────────────────────────────────────────────

function resolveDomainsDir(): string {
  // Try multiple paths to find the domains directory
  const candidates = [
    // During development (source)
    join(process.cwd(), 'packages', 'llm', 'domains'),
    // In Docker container (built)
    join('/app', 'packages', 'llm', 'domains'),
    // Relative to this file's compiled location
    join(import.meta.dirname ?? '.', 'domains'),
    join(import.meta.dirname ?? '.', '..', 'domains'),
  ];
  for (const dir of candidates) {
    if (existsSync(dir)) return dir;
  }
  return candidates[0]!; // fallback
}

const DOMAINS_DIR = resolveDomainsDir();

let _domainsCache: DomainExamples[] | null = null;

function loadAllDomains(): DomainExamples[] {
  if (_domainsCache) return _domainsCache;
  try {
    const files = readdirSync(DOMAINS_DIR).filter(f => f.endsWith('.xml'));
    _domainsCache = files.map(file => {
      const xml = readFileSync(join(DOMAINS_DIR, file), 'utf-8');
      const root = parseXml(xml);
      const obj = xmlToObjects(root) as Record<string, unknown>;
      const principlesContainer = obj['principles'] as Record<string, unknown> | undefined;
      const rawPrinciples = (principlesContainer?.['principle'] ?? []) as string[];
      const principles = Array.isArray(rawPrinciples) ? rawPrinciples : [];
      return {
        id: (obj['id'] as string) ?? file.replace('.xml', ''),
        name: (obj['name'] as string) ?? file.replace('.xml', ''),
        description: (obj['description'] as string) ?? '',
        powerWords: ((obj['powerWords'] as string) ?? '').split(',').map(w => w.trim()).filter(Boolean),
        principles,
        fewShotId: (obj['fewShotId'] as string) ?? undefined,
      };
    });
    return _domainsCache;
  } catch {
    _domainsCache = [];
    return [];
  }
}

const DOMAIN_CLASSIFICATION_PROMPT = `You are a content classifier. Classify the content into ONE of the provided domains.

## Available Domains
{domains}

## Task
Read the content brief and classify it into the single most appropriate domain.

## Output Format
Return a single <domainClassification> element:

<domainClassification>
  <domainId>the-domain-id</domainId>
  <confidence>high | medium | low</confidence>
</domainClassification>

## Rules
- Pick EXACTLY ONE domain.
- If content spans multiple domains, pick the PRIMARY one.
- If unsure, use "general" as fallback.
- Return ONLY the XML, no markdown fences, no explanation.`;

function classifyDomainPrompt(briefXml: string, domains: DomainExamples[]): { system: string; user: string } {
  const domainList = domains.map(d => `- **${d.id}**: ${d.description}`).join('\n');
  const system = DOMAIN_CLASSIFICATION_PROMPT.replace('{domains}', domainList);
  return { system, user: briefXml };
}

function parseDomainClassification(xml: string, domains: DomainExamples[]): DomainExamples {
  try {
    const obj = xmlToObjects(parseXml(xml)) as Record<string, unknown>;
    const domainId = (obj['domainId'] as string) ?? 'general';
    return domains.find(d => d.id === domainId) ?? domains.find(d => d.id === 'general') ?? domains[0]!;
  } catch {
    return domains.find(d => d.id === 'general') ?? domains[0]!;
  }
}

// ─── Phase 1: Summarise ──────────────────────────────────────────────────────

const EXTRACTION_PROMPT = `You are an expert content analyst. Summarise the article into a structured content brief for a social media carousel.

## Output Format

Return a single <contentBrief> element:

<contentBrief>
  <title>The article title</title>
  <oneLiner>One sentence summary of the article's core argument (max 25 words)</oneLiner>
  <keyInsights>
    <point>The first key insight or argument</point>
    <point>The second key insight</point>
    <point>The third key insight</point>
    <point>The fourth key insight</point>
    <point>The fifth key insight</point>
  </keyInsights>
  <quotes>
    <quote text="Exact direct quote from the article — word for word" author="Person Name" role="Their Title" />
  </quotes>
  <counterpoints>
    <point>A common objection or alternative view mentioned in the article</point>
  </counterpoints>
  <hardData>
    <point>A specific number, percentage, dollar amount, or measurable fact from the article</point>
  </hardData>
  <hasRealNumbers>true or false — does the article contain ACTUAL hard statistics (percentages, dollar amounts, specific counts)? Not general references to numbers.</hasRealNumbers>
  <people>
    <person name="Person Name" role="Their role or title in the article" />
  </people>
  <tone>Describe the article's tone in one word (e.g., analytical, opinionated, newsy, academic, provocative)</tone>
  <readingLevel>professional | general | technical</readingLevel>
</contentBrief>

## Rules
- Extract 5-7 keyInsights that capture the article's core argument
- Include direct quotes ONLY if the article has notable ones with named attribution
- hardData: ONLY include actual numbers, percentages, dollar amounts, or measurable facts. Do NOT include opinions, advice, or qualitative statements. If the article has no numbers, leave <hardData> empty.
- hasRealNumbers: Answer "true" ONLY if the article contains specific, citable statistics. "2-3 percent" mentioned casually is NOT a real statistic. "42% year-over-year growth" IS a real statistic. When in doubt, answer "false".
- counterpoints: Capture objections, "but actually" moments, or myths the article debunks
- Do NOT invent content not in the article
- Keep each point concise (1-2 sentences)
- Return ONLY the XML, no markdown fences, no explanation`;

// ─── Phase 2: Select Template ────────────────────────────────────────────────

function getTemplateSelectionPrompt(briefXml: string, templates: TemplateInfo[]): { system: string; user: string } {
  const templateSections = templates.map(t => `### ${t.id}
Name: ${t.name}
Aesthetics: ${t.aesthetics}
Best for tones: ${t.toneKeywords.join(', ')}

Supported slide types and their fields:
${t.schemaText}`).join('\n\n---\n\n');

  return {
    system: `You are a carousel strategist selecting the best template for a social media carousel.

## Content Brief
${briefXml}

## Available Templates

Each template below includes its name, visual aesthetics, tone keywords, and the FULL schema of supported slide types with all field constraints.

${templateSections}

## Task

1. Read the content brief carefully. Note the tone field.
2. Match the content's tone to each template's tone keywords.
3. Choose the template whose tone keywords AND slide types best match the content.
4. Write a brief rationale explaining WHY this template is the best fit.

## Output Format

Return a single <templateSelection> element:

<templateSelection>
  <templateId>the-selected-template-id</templateId>
  <rationale>Why this template is the best fit. Reference tone keywords and slide types.</rationale>
</templateSelection>

## Rules
- Pick exactly ONE template.
- Prefer templates whose tone keywords match the content's tone.
- If the content has hard statistics, ensure the template supports telemetry.
- If the content has contrasting ideas, ensure the template supports dichotomy or myth-fact.
- If the content has notable quotes, ensure the template supports quote slides.
- Return ONLY the XML, no markdown fences, no explanation.`,
    user: 'Select the best template for this content brief.',
  };
}

// ─── Phase 3: Plan Slides ────────────────────────────────────────────────────

function getSlidePlanPrompt(
  briefXml: string,
  selectedTemplate: TemplateInfo,
  brandKit?: Record<string, string | undefined>,
  domainExamples?: DomainExamples,
): { system: string; user: string } {
  // Build domain principles section for the planner
  let domainPrinciplesSection = '';
  if (domainExamples && domainExamples.principles.length > 0) {
    const principleList = domainExamples.principles.map(p => `- ${p}`).join('\n');

    domainPrinciplesSection = `
## DOMAIN PRINCIPLES (${domainExamples.name})

When writing slide purposes, ensure the hook strategy aligns with these domain principles:

${principleList}`;
  }

  return {
    system: `You are a carousel planner. Given a content brief and a selected template, plan the exact slide types and their purpose for each slide.

## Content Brief
${briefXml}

## Selected Template: ${selectedTemplate.name}
Aesthetics: ${selectedTemplate.aesthetics}

## Supported Slide Types (use ONLY these types)

${selectedTemplate.schemaText}

## Brand Kit
${brandKit ? `Background: ${brandKit.bg ?? 'not set'}
Text: ${brandKit.text ?? 'not set'}
Accent: ${brandKit.accent ?? 'not set'}
Font: ${brandKit.fontSerif ?? brandKit.fontSans ?? brandKit.fontMono ?? 'not set'}` : 'Use default brand colors for the selected template.'}
${domainPrinciplesSection}

## Task

Plan 5-7 slides. For each slide, choose a type from the supported list above and describe what content goes in it.

## Output Format

Return a single <slidePlan> element:

<slidePlan>
  <narrativeArc>Describe the story this carousel tells in 2-3 sentences. What journey does the reader go on?</narrativeArc>
  <slide type="cover" purpose="Hook strategy — what rhetorical approach stops the scroll (e.g., curiosity gap about human cost, pattern interrupt about what nobody knows). Do NOT write the exact headline text." />
  <slide type="sequence" purpose="What framework or list this presents — list the actual items" />
  <slide type="myth-fact" purpose="What misconception this challenges — state the myth and fact" />
  <slide type="quote" purpose="Which quote from the brief — include the attribution" />
  <slide type="cta" purpose="What action the reader should take" />
</slidePlan>

## Rules
1. Use ONLY slide types from the supported list above. Do NOT invent new types.
2. Start with a cover slide. End with a CTA slide.
3. Vary slide types — never repeat the same type twice in a row.
4. If hasRealNumbers="false" in the brief, do NOT use telemetry. Use sequence, quote, or myth-fact instead.
5. Each slide's purpose must describe the HOOK STRATEGY or CONTENT APPROACH — do NOT write exact headline text. Phase 4 will generate headlines. Your job is to describe the rhetorical approach.
6. narrativeArc: Tell me the STORY, not a list. "The reader opens with X, discovers Y, is challenged by Z, and leaves with W."
7. Return ONLY the XML, no markdown fences, no explanation.`,
    user: 'Plan the slides for this carousel.',
  };
}

// ─── Domain-Matched Few-Shot ─────────────────────────────────────────────────

function getDomainFewShot(domain?: DomainExamples): string {
  if (!domain) return DEFAULT_FEW_SHOT;
  const fewShotId = domain.fewShotId ?? domain.id;
  return FEW_SHOT_MAP[fewShotId] ?? DEFAULT_FEW_SHOT;
}

// ─── Slide-Type Rules (Universal) ───────────────────────────────────────────

const SLIDE_TYPE_RULES = [
  { type: 'cover', rule: '- MUST include a specific detail: number, name, or action from the brief\n- Pattern: "[Detail]. [Emotion/Curiosity]."\n- Example: "13 Dead. Mall Collapsed."' },
  { type: 'telemetry', rule: '- MUST include at least one number from the stats in the headline\n- Pattern: "[Number] [Unit]. [Number] [Unit]."\n- Example: "6.8 Mag. 13 Lives."' },
  { type: 'sequence', rule: '- MUST use numbered urgency or specific detail\n- Pattern: "[Number] Things Happening Right Now"\n- Example: "3 Things Happening Right Now"' },
  { type: 'myth-fact', rule: '- MUST contrast myth vs fact — check brief\'s counterpoint section\n- Pattern: "[Contrast]. [Pivot]."\n- Example: "Advisory Lifted. Panic Was Real."' },
  { type: 'quote', rule: '- Headline is optional — the quote IS the content\n- If used: "[Evocative tagline]" — 2-4 words\n- Example: "THE VERDICT" or "OFFICIAL STATEMENT"' },
  { type: 'cta', rule: '- MUST be a command or question\n- Pattern: "[Command]. [Specific Detail]."\n- Example: "Don\'t Scroll Past This."' },
  { type: 'timeline', rule: '- MUST show progression or sequence of events\n- Pattern: "[Event]. [Consequence]." or "From [X] to [Y]"\n- Example: "3 Years. Zero Progress."' },
  { type: 'analysis', rule: '- MUST present insight or interpretation of data\n- Pattern: "What [Data] Actually Means"\n- Example: "What These Numbers Actually Mean"' },
  { type: 'definition', rule: '- MUST explain a concept clearly\n- Pattern: "[Concept]: [Plain English]"\n- Example: "Inflation: Your Dollar Worth Less"' },
  { type: 'dichotomy', rule: '- MUST contrast two opposing ideas\n- Pattern: "[X] vs [Y]. [Stakes]."\n- Example: "Growth vs Stability. Your Choice."' },
  { type: 'table', rule: '- MUST compare data across categories\n- Pattern: "[Comparison]: [Winner/Loser]"\n- Example: "Q3 Earnings: Who Won, Who Lost"' },
  { type: 'profile', rule: '- MUST humanize a person or entity\n- Pattern: "[Person]. [What They Did]."\n- Example: "The Engineer Who Saw It Coming"' },
  { type: 'image-split', rule: '- MUST use visual contrast or juxtaposition\n- Headline describes the visual split\n- Pattern: "[Left Side] vs [Right Side]"\n- Example: "Before the Storm. After."' },
  { type: 'breakdown', rule: '- MUST decompose a complex topic\n- Pattern: "[Topic]: [Number] Parts"\n- Example: "The Deal: 3 Moving Parts"' },
  { type: 'juxtaposition', rule: '- MUST contrast two related things\n- Pattern: "[Thing A]. [Thing B]. [Insight]."\n- Example: "Public Promise. Private Reality."' },
  { type: 'methodology', rule: '- MUST explain a process or approach\n- Pattern: "How [Entity] [Did X]"\n- Example: "How We Calculated the Risk"' },
  { type: 'hero-metric', rule: '- MUST highlight a single key number\n- Pattern: "[Number]. [Context]."\n- Example: "47%. The Real Unemployment Rate."' },
  { type: 'checklist', rule: '- MUST provide actionable steps\n- Pattern: "[Number] Steps to [Outcome]"\n- Example: "3 Steps to Protect Your Data"' },
  { type: 'quadrant', rule: '- MUST categorize or map concepts\n- Pattern: "[Category]: [Key Insight]"\n- Example: "High Risk, High Reward: Where You Fall"' },
  { type: 'case-study', rule: '- MUST tell a story with outcome\n- Pattern: "[Entity] Tried [X]. What Happened."\n- Example: "Apple Tried Foldables. What Happened."' },
  { type: 'resource-grid', rule: '- MUST provide multiple resources or references\n- Pattern: "[Number] Resources for [Outcome]"\n- Example: "5 Tools to Automate Your Workflow"' },
  { type: 'interview', rule: '- MUST feature Q&A format\n- Pattern: "Q: [Question]" / "A: [Key Answer]"\n- Example: "Q: Is This Safe?" / "A: We Don\'t Know Yet"' },
];

// ─── Phase 4: Generate Content ───────────────────────────────────────────────

function getGeneratePrompt(
  briefXml: string,
  planXml: string,
  selectedTemplate: TemplateInfo,
  slidePlan: string[],
  domainExamples?: DomainExamples,
): { system: string; user: string } {
  // Filter schema to only selected slide types
  const selectedTypes = new Set(slidePlan);
  const filteredSchema = selectedTemplate.schemaTextConcise
    .split('\n')
    .filter(line => {
      const typeName = line.split(':')[0]?.trim();
      return typeName && selectedTypes.has(typeName);
    })
    .join('\n');

  // Build domain principles section
  let domainPrinciplesSection = '';
  if (domainExamples && domainExamples.principles.length > 0) {
    const principleList = domainExamples.principles.map(p => `- ${p}`).join('\n');
    domainPrinciplesSection = `
## DOMAIN PRINCIPLES (${domainExamples.name})

Apply these principles to your copy:

${principleList}

## DOMAIN POWER WORDS
Use these power words in headlines: ${domainExamples.powerWords.join(', ')}`;
  }

  // Build slide-type rules for selected types only
  const slideTypeRules = SLIDE_TYPE_RULES
    .filter(rule => selectedTypes.has(rule.type))
    .map(rule => `### ${rule.type.charAt(0).toUpperCase() + rule.type.slice(1)}\n${rule.rule}`)
    .join('\n\n');

  return {
    system: `You are a social media carousel designer. Generate a complete carousel of slides.

## Template: ${selectedTemplate.name}
Aesthetics: ${selectedTemplate.aesthetics}

${getDomainFewShot(domainExamples)}

## Slide Plan
${planXml}

## Content Brief
${briefXml}

## Slide Type Constraints (EXACT — you MUST follow these)

${filteredSchema}

## SLIDE TYPE RULES

${slideTypeRules}

## OUTPUT FORMAT

Return a single <presentation> element containing all slides.

## XML Child Element Format

For arrays (stats, items), use nested child elements:
<slide type="sequence" id="slide-02" tag="KEY FINDINGS" headline="Five Trends" footerLeft="ANALYSIS" footerRight="PAGE 02">
  <items>
    <item num="1" title="Edge AI" desc="Processing moves to devices" />
  </items>
</slide>

## ANTI-HALLUCINATION RULES (CRITICAL)

<antiHallucination>
  <rule>Every fact, number, and quote MUST come DIRECTLY from the content brief above. Do NOT paraphrase, round, interpolate, or invent anything.</rule>
  <rule>If the content brief has NO hard data, do NOT generate telemetry. Use sequence, quote, or myth-fact instead.</rule>
  <rule>If the content brief says "2-3%", you MUST write exactly that. Do NOT change to "3%" or "2.5%".</rule>
  <rule>If you cannot find an exact number in the brief, the stat does not exist. Period.</rule>
  <rule>NEVER invent statistics, percentages, dollar amounts, or counts. NEVER.</rule>
  <rule>NEVER invent quotes. Use ONLY quotes from the brief's quotes section.</rule>
</antiHallucination>

## RULES
- Return ONLY the XML <presentation> element. No markdown fences, no explanation.
- Generate ALL slides in order as specified in the slidePlan. You MUST generate a slide for EVERY slide in the slidePlan. Do NOT skip any slides. Do NOT change the order. The slidePlan is a REQUIREMENT, not a suggestion.
- Use ONLY data from the content brief. Do NOT invent facts, statistics, or quotes.
- Respect ALL field constraints (character limits, required fields, array sizes) exactly.
- Self-closing tags for simple elements: <item ... />
- Every slide MUST have: id, type, tag, footerLeft, footerRight.
- footerRight: "PAGE 01", "PAGE 02", etc. (sequential)

## HEADLINE RULES

<headlineRules>
  <rule>Headlines MUST be a CLAIM, QUESTION, or COMMAND — never a noun phrase. Reference a specific detail from the brief: a number, name, or action.</rule>
  <rule>Max 5 words. Fragments only. Active voice. Use contractions.</rule>
  <rule>Myth-fact slides: Check the brief's counterpoint section. If it says views were consistent or scientists were divided, do NOT invent a contradiction. Frame the myth as a common assumption and the fact as what the evidence actually shows.</rule>
</headlineRules>${domainPrinciplesSection ? `\n${domainPrinciplesSection}` : ''}`,
    user: 'Generate all slides for this carousel.',
  };
}

// ─── Phase 4.5: Label Detection ─────────────────────────────────────────────

function buildLabelDetectionPrompt(slides: Record<string, unknown>[]): { system: string; user: string } {
  const headlineList = slides
    .filter(s => s['headline'])
    .map(s => `[${s['id']}] ${s['headline']}`)
    .join('\n');

  return {
    system: `You are a headline quality checker. Classify each headline.

## Classification Types
- "claim" — states something specific (e.g., "13 dead. Mall collapsed.")
- "question" — asks the reader (e.g., "Was your trust misplaced?")
- "command" — tells the reader to act (e.g., "Stop believing the official story")
- "pattern-interrupt" — breaks expectations (e.g., "Nobody saw this coming")
- "label" — noun phrase with no action, urgency, or curiosity (e.g., "The Truth From Leadership", "Fauci's Secret Private Journals")

## Output Format
Return a JSON array. For each slide:
{"id": "slide-01", "headline": "...", "type": "claim|question|command|pattern-interrupt|label", "fix": "if label, suggest a rewrite as claim/question/command (max 5 words, reference specific detail from content)"}

## Rules
- A "label" is a noun phrase that describes WHAT something is without creating urgency or curiosity.
- "The Truth From Leadership" = label (no action, no specificity)
- "They don't want you to see this" = claim (has urgency, uses "you")
- "1,100 pages they tried to bury" = claim (specific number + curiosity)
- Return ONLY the JSON array, no markdown fences, no explanation.`,
    user: `Classify these headlines:\n${headlineList}`,
  };
}

function buildRetryPrompt(
  labelResult: { id: string; headline: string; fix: string },
  slides: Record<string, unknown>[],
  briefXml: string,
  domainId: string,
): { system: string; user: string } {
  const slide = slides.find(s => s['id'] === labelResult.id);
  const slideXml = slide ? objectToXml(slide) : `<slide type="cover" id="${labelResult.id}" headline="${labelResult.headline}" />`;

  return {
    system: `You are a headline rewriter. Fix one slide whose headline is a "label" (noun phrase, no urgency).

## Rules
- Max 5 words
- Must be a claim, question, or command — not a noun phrase
- Use a specific detail from the content brief
- Keep the same slide type and structure
- Return ONLY the fixed slide XML element

## Headline Rewrite Guidance
${labelResult.fix ? `Suggested rewrite direction: "${labelResult.fix}"` : 'Rewrite the headline to be a claim, question, or command.'}`,
    user: `Fix this slide:

Original:
${slideXml}

Domain: ${domainId}

Content brief excerpt:
${briefXml.slice(0, 1000)}`,
  };
}

function objectToXml(obj: Record<string, unknown>): string {
  const attrs = Object.entries(obj)
    .filter(([k, v]) => k !== 'items' && k !== 'stats' && k !== 'events' && k !== 'left' && k !== 'right' && typeof v !== 'object')
    .map(([k, v]) => `${k}="${String(v).replace(/"/g, '&quot;')}"`)
    .join(' ');

  const children: string[] = [];
  for (const [key, value] of Object.entries(obj)) {
    if (key === 'items' && Array.isArray(value)) {
      children.push(`<items>${value.map(item => {
        const attrs = Object.entries(item as Record<string, unknown>)
          .map(([k, v]) => `${k}="${String(v).replace(/"/g, '&quot;')}"`)
          .join(' ');
        return `<item ${attrs} />`;
      }).join('')}</items>`);
    } else if (key === 'stats' && Array.isArray(value)) {
      children.push(`<stats>${value.map(item => {
        const attrs = Object.entries(item as Record<string, unknown>)
          .map(([k, v]) => `${k}="${String(v).replace(/"/g, '&quot;')}"`)
          .join(' ');
        return `<stat ${attrs} />`;
      }).join('')}</stats>`);
    } else if (key === 'left' && typeof value === 'object') {
      const inner = Object.entries(value as Record<string, unknown>)
        .map(([k, v]) => `${k}="${String(v).replace(/"/g, '&quot;')}"`)
        .join(' ');
      children.push(`<left ${inner} />`);
    } else if (key === 'right' && typeof value === 'object') {
      const inner = Object.entries(value as Record<string, unknown>)
        .map(([k, v]) => `${k}="${String(v).replace(/"/g, '&quot;')}"`)
        .join(' ');
      children.push(`<right ${inner} />`);
    } else if (typeof value === 'object' && value !== null && key !== 'id' && key !== 'type') {
      // Skip nested objects we don't handle
    }
  }

  if (children.length > 0) {
    return `<slide ${attrs}>\n${children.join('\n')}\n</slide>`;
  }
  return `<slide ${attrs} />`;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function stripFences(text: string): string {
  return text.replace(/^```(?:xml)?\s*\n?/i, '').replace(/\n?```\s*$/i, '').trim();
}

function unwrapChildWrappers(obj: Record<string, unknown>): Record<string, unknown> {
  const result: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(obj)) {
    if (value && typeof value === 'object' && !Array.isArray(value)) {
      const inner = value as Record<string, unknown>;
      const keys = Object.keys(inner);
      if (keys.length === 1 && keys[0] && Array.isArray(inner[keys[0]])) {
        result[key] = inner[keys[0]];
      } else {
        result[key] = unwrapChildWrappers(inner);
      }
    } else if (Array.isArray(value)) {
      result[key] = value.map(item =>
        item && typeof item === 'object' && !Array.isArray(item)
          ? unwrapChildWrappers(item as Record<string, unknown>)
          : item
      );
    } else {
      result[key] = value;
    }
  }
  return result;
}

function createFallbackSlide(type: string, index: number): Record<string, unknown> {
  const id = `slide-${String(index).padStart(2, '0')}`;
  const footerRight = `PAGE ${String(index).padStart(2, '0')}`;

  switch (type) {
    case 'cover':
      return { id, type: 'cover', tag: 'INSIGHT', headline: 'Key Insights', footerLeft: 'ANALYSIS', footerRight };
    case 'sequence':
      return { id, type: 'sequence', tag: 'HIGHLIGHTS', headline: 'Main Takeaways', items: [{ num: '1', title: 'First Point', desc: 'Key insight from the content' }], footerLeft: 'ANALYSIS', footerRight };
    case 'myth-fact':
      return { id, type: 'myth-fact', tag: 'ANALYSIS', headline: 'Common Misconception', myth: 'A common belief about this topic.', fact: 'The reality is more nuanced than most people think.', footerLeft: 'RESEARCH', footerRight };
    case 'quote':
      return { id, type: 'quote', tag: 'REFERENCE', quote: 'Insightful quote from the content.', footerLeft: 'REFERENCE', footerRight };
    case 'cta':
      return { id, type: 'cta', tag: 'CONCLUSION', headline: 'Learn More', subtext: 'Explore the full article', footerLeft: 'END', footerRight };
    default:
      return { id, type: 'sequence', tag: 'INSIGHT', headline: 'Additional Insight', items: [{ num: '1', title: 'Point', desc: 'Key point' }], footerLeft: 'ANALYSIS', footerRight };
  }
}

// ─── Main Export ─────────────────────────────────────────────────────────────

export interface MultiPhaseResult {
  slides: Record<string, unknown>[];
  briefXml: string;
  selectionXml: string;
  planXml: string;
  rawGenerationXml: string;
  extractionLatencyMs: number;
  selectionLatencyMs: number;
  planLatencyMs: number;
  generationLatencyMs: number;
  totalLatencyMs: number;
  totalTokens: { input: number; output: number };
  selectedTemplateId: string;
  slidePlan: string[];
  domainId: string;
  domainClassificationMs: number;
  needsReview: boolean;
}

export async function generateSlidesMultiPhase(
  rawText: string,
  templates: TemplateInfo[],
  options: {
    llm: { generateJSON(system: string, user: string): Promise<string> };
    brandKit?: Record<string, string | undefined>;
    onProgress?: (phase: string, detail: string) => void;
    onDebug?: (filename: string, content: string) => void;
    checkpoint?: { phase: string; data: Record<string, unknown> };
    retriesUsed?: Record<string, number>;
    onSaveCheckpoint?: (phase: string, data: Record<string, unknown>) => Promise<void>;
  },
): Promise<MultiPhaseResult> {
  const { llm, onProgress, onDebug, brandKit, checkpoint, retriesUsed = {}, onSaveCheckpoint } = options;
  const totalStart = Date.now();

  // Resume from checkpoint if available
  let briefXml = checkpoint?.data?.briefXml as string | undefined;
  let selectedDomain = checkpoint?.data?.domain as DomainExamples | undefined;
  let selectedTemplate = checkpoint?.data?.template as TemplateInfo | undefined;
  let planXml = checkpoint?.data?.planXml as string | undefined;
  let slidePlan = checkpoint?.data?.slidePlan as string[] | undefined;
  let genCleaned = checkpoint?.data?.genCleaned as string | undefined;
  let selectionXml = checkpoint?.data?.selectionXml as string | undefined;

  let extractionLatencyMs = 0;
  let domainClassificationMs = 0;
  let selectionLatencyMs = 0;
  let planLatencyMs = 0;
  let generationLatencyMs = 0;

  // ── PHASE 1: Extract Content Brief ────────────────────────────────────────
  if (!briefXml) {
    onProgress?.('extraction', 'Phase 1: Extracting content brief...');
    onDebug?.('01-prompt-phase1-extraction.md', `## System\n\n${EXTRACTION_PROMPT}\n\n## User\n\n${rawText}`);

    const phase1Start = Date.now();
    briefXml = await withPhaseRetry(
      async () => {
        const raw = await llm.generateJSON(EXTRACTION_PROMPT, rawText);
        return stripFences(raw);
      },
      'extraction',
      retriesUsed,
    );
    extractionLatencyMs = Date.now() - phase1Start;

    // Validation gate: brief must have content
    if (!briefXml || briefXml.length < 50) {
      throw new Error('Extraction produced empty or invalid brief');
    }

    onProgress?.('extraction', `Phase 1 complete: ${extractionLatencyMs}ms`);
    onDebug?.('05-phase1-brief.xml', briefXml);
    await onSaveCheckpoint?.('extraction', { briefXml });
  } else {
    onProgress?.('extraction', 'Phase 1: Resumed from checkpoint');
  }

  // ── PHASE 1.5 + Phase 2: Domain Classification + Template Selection (PARALLEL) ──
  if (!selectedDomain || !selectedTemplate) {
    const allDomains = loadAllDomains();
    const fallbackDomain: DomainExamples = {
      id: 'general',
      name: 'General',
      description: 'General content',
      powerWords: ['secret', 'hidden', 'wrong', 'never', 'stop', 'truth', 'reverse', 'shocking'],
      principles: ['Lead with specific details and numbers', 'Use urgency language', 'Make it personal with "you" language'],
    };

    onProgress?.('domain', 'Phase 1.5: Classifying content domain...');
    onProgress?.('selection', 'Phase 2: Selecting best template...');

    const parallelStart = Date.now();

    // Run both in parallel
    const [domainResult, templateResult] = await Promise.all([
      // Domain classification
      (async () => {
        if (allDomains.length === 0) return fallbackDomain;
        const { system: domainSystem, user: domainUser } = classifyDomainPrompt(briefXml!, allDomains);
        onDebug?.('01b-prompt-domain-classify.md', `## System\n\n${domainSystem}\n\n## User\n\n${domainUser}`);

        try {
          const domainRaw = await withPhaseRetry(
            async () => {
              const raw = await llm.generateJSON(domainSystem, domainUser);
              return stripFences(raw);
            },
            'extraction', // using extraction budget for domain classification
            retriesUsed,
          );
          const domainXml = domainRaw;
          onDebug?.('05b-domain-classification.xml', domainXml);
          return parseDomainClassification(domainXml, allDomains);
        } catch {
          onProgress?.('domain', 'Domain classification failed, using general');
          return allDomains.find(d => d.id === 'general') ?? fallbackDomain;
        }
      })(),
      // Template selection
      (async () => {
        const { system: selSystem, user: selUser } = getTemplateSelectionPrompt(briefXml!, templates);
        onDebug?.('02-prompt-phase2-select-template.md', `## System\n\n${selSystem}\n\n## User\n\n${selUser}`);

        try {
          const selRaw = await llm.generateJSON(selSystem, selUser);
          const selXml = stripFences(selRaw);
          selectionXml = selXml;
          onDebug?.('06-phase2-selection.xml', selXml);

          // Parse and validate template ID
          const selObj = xmlToObjects(parseXml(selXml)) as Record<string, unknown>;
          const templateId = (selObj['templateId'] as string) ?? templates[0]!.id;
          const found = templates.find(t => t.id === templateId);
          if (!found) {
            onProgress?.('selection', `Unknown template "${templateId}", using default`);
            return templates[0]!;
          }
          return found;
        } catch {
          onProgress?.('selection', 'Template selection failed, using default');
          return templates[0]!;
        }
      })(),
    ]);

    selectedDomain = domainResult;
    selectedTemplate = templateResult;
    domainClassificationMs = Date.now() - parallelStart;
    selectionLatencyMs = domainClassificationMs; // same duration since parallel

    onProgress?.('domain', `Domain: ${selectedDomain.name} (${domainClassificationMs}ms)`);
    onProgress?.('selection', `Selected: ${selectedTemplate.name}`);
    await onSaveCheckpoint?.('classification', { domain: selectedDomain, template: selectedTemplate, selectionXml });
  } else {
    onProgress?.('domain', 'Phase 1.5: Resumed from checkpoint');
    onProgress?.('selection', 'Phase 2: Resumed from checkpoint');
  }

  // ── PHASE 3: Plan Slides ──────────────────────────────────────────────────
  if (!planXml || !slidePlan) {
    onProgress?.('plan', 'Phase 3: Planning slide sequence...');

    const phase3Start = Date.now();
    const { system: planSystem, user: planUser } = getSlidePlanPrompt(briefXml!, selectedTemplate!, brandKit, selectedDomain);
    onDebug?.('03-prompt-phase3-plan-slides.md', `## System\n\n${planSystem}\n\n## User\n\n${planUser}`);

    planXml = await withPhaseRetry(
      async () => {
        const raw = await llm.generateJSON(planSystem, planUser);
        return stripFences(raw);
      },
      'planning',
      retriesUsed,
    );
    planLatencyMs = Date.now() - phase3Start;

    // Parse plan to get slide types
    slidePlan = [];
    try {
      const planObj = xmlToObjects(parseXml(planXml)) as Record<string, unknown>;
      const slides = planObj['slide'] as Array<Record<string, string>> | Record<string, string>;
      if (Array.isArray(slides)) {
        slidePlan = slides.map(s => s['type'] ?? 'sequence');
      } else if (slides && slides['type']) {
        slidePlan = [slides['type']];
      }
    } catch {
      slidePlan = ['cover', 'sequence', 'myth-fact', 'quote', 'cta'];
    }

    if (slidePlan.length === 0) {
      slidePlan = ['cover', 'sequence', 'myth-fact', 'quote', 'cta'];
    }

    // Validation gate: all slide types must exist in schema
    const validTypes = new Set(selectedTemplate!.schemaTextConcise.split('\n').map(l => l.split(':')[0]?.trim()));
    const invalidTypes = slidePlan.filter(t => !validTypes.has(t));
    if (invalidTypes.length > 0) {
      onProgress?.('plan', `Invalid slide types: ${invalidTypes.join(', ')} — dropping`);
      slidePlan = slidePlan.filter(t => validTypes.has(t));
    }

    onProgress?.('plan', `Phase 3 complete: ${planLatencyMs}ms — Slides: ${slidePlan.join(', ')}`);
    onDebug?.('07-phase3-plan.xml', planXml);
    await onSaveCheckpoint?.('planning', { planXml, slidePlan });
  } else {
    onProgress?.('plan', 'Phase 3: Resumed from checkpoint');
  }

  // ── PHASE 4: Generate Content ─────────────────────────────────────────────
  if (!genCleaned) {
    onProgress?.('generation', 'Phase 4: Generating slide content...');

    const phase4Start = Date.now();
    const { system: genSystem, user: genUser } = getGeneratePrompt(briefXml!, planXml!, selectedTemplate!, slidePlan!, selectedDomain);
    onDebug?.('04-prompt-phase4-generate.md', `## System\n\n${genSystem}\n\n## User\n\n${genUser}`);

    genCleaned = await withPhaseRetry(
      async () => {
        const raw = await llm.generateJSON(genSystem, genUser);
        return stripFences(raw);
      },
      'generation',
      retriesUsed,
    );
    generationLatencyMs = Date.now() - phase4Start;

    // Validation gate: XML must be well-formed and have slides
    try {
      const root = parseXml(genCleaned);
      const rootObj = xmlToObjects(root) as Record<string, unknown>;
      const slideData = rootObj['slide'];
      if (!slideData) {
        throw new Error('Generated XML has no slides');
      }
    } catch (err) {
      onProgress?.('generation', `Validation failed: ${err} — retrying`);
      // One more attempt with error context
      const retryRaw = await llm.generateJSON(
        genSystem + `\n\n## PREVIOUS ATTEMPT FAILED\nThe XML was malformed or had no slides. Return valid XML with a <slidePlan> containing all slides.`,
        genUser,
      );
      genCleaned = stripFences(retryRaw);
    }

    onProgress?.('generation', `Phase 4 complete: ${generationLatencyMs}ms`);
    onDebug?.('08-phase4-slides.xml', genCleaned);
    await onSaveCheckpoint?.('generation', { genCleaned });
  } else {
    onProgress?.('generation', 'Phase 4: Resumed from checkpoint');
  }

  // ── Parse Slides ──────────────────────────────────────────────────────────
  const slides: Record<string, unknown>[] = [];
  try {
    const root = parseXml(genCleaned);
    const rootObj = xmlToObjects(root) as Record<string, unknown>;
    const slideData = rootObj['slide'];

    if (Array.isArray(slideData)) {
      for (const s of slideData) {
        slides.push(unwrapChildWrappers(s as Record<string, unknown>));
      }
    } else if (slideData && typeof slideData === 'object') {
      slides.push(unwrapChildWrappers(slideData as Record<string, unknown>));
    }

    // Collect bare typed elements
    const BARE_TYPE_TAGS = ['telemetry', 'myth-fact', 'case-study', 'resource-grid', 'timeline', 'quadrant', 'interview', 'image-split', 'image-cover'];
    for (const tag of BARE_TYPE_TAGS) {
      const bareData = rootObj[tag];
      if (bareData && typeof bareData === 'object' && !Array.isArray(bareData)) {
        const slide = unwrapChildWrappers(bareData as Record<string, unknown>);
        if (!slide['type']) slide['type'] = tag;
        slides.push(slide);
      } else if (Array.isArray(bareData)) {
        for (const s of bareData) {
          const slide = unwrapChildWrappers(s as Record<string, unknown>);
          if (!slide['type']) slide['type'] = tag;
          slides.push(slide);
        }
      }
    }
  } catch {
    onProgress?.('generation', 'Parse failed, using fallback slides');
    for (let i = 0; i < slidePlan!.length; i++) {
      slides.push(createFallbackSlide(slidePlan![i]!, i + 1));
    }
  }

  // Ensure IDs
  for (let i = 0; i < slides.length; i++) {
    slides[i]!['id'] = `slide-${String(i + 1).padStart(2, '0')}`;
  }

  // ── PHASE 4.5: Label Detection + Retry ────────────────────────────────────
  let needsReview = false;
  const slidesWithHeadlines = slides.filter(s => s['headline']);
  if (slidesWithHeadlines.length > 0) {
    onProgress?.('validation', 'Phase 4.5: Checking headline quality...');

    const { system: detectSystem, user: detectUser } = buildLabelDetectionPrompt(slides);
    onDebug?.('09-prompt-label-detect.md', `## System\n\n${detectSystem}\n\n## User\n\n${detectUser}`);

    try {
      const detectRaw = await llm.generateJSON(detectSystem, detectUser);
      const detectCleaned = stripFences(detectRaw);
      onDebug?.('10-label-detection.json', detectCleaned);

      const classifications: Array<{ id: string; headline: string; type: string; fix?: string }> = JSON.parse(detectCleaned);
      const labelSlides = classifications.filter(c => c.type === 'label');

      if (labelSlides.length > 0) {
        onProgress?.('validation', `Found ${labelSlides.length} label headline(s): ${labelSlides.map(l => `"${l.headline}"`).join(', ')}`);

        const toRetry = labelSlides.slice(0, 2);
        for (const label of toRetry) {
          const labelRetries = retriesUsed['labelDetection'] ?? 0;
          if (labelRetries >= (RETRY_BUDGETS['labelDetection'] ?? 0)) {
            onProgress?.('retry', `Label detection retry budget exhausted for ${label.id}`);
            needsReview = true;
            continue;
          }

          onProgress?.('retry', `Retrying slide ${label.id}: "${label.headline}" → "${label.fix ?? 'rewrite'}"`);

          const { system: retrySystem, user: retryUser } = buildRetryPrompt(
            { id: label.id, headline: label.headline, fix: label.fix ?? '' },
            slides, briefXml!, selectedDomain!.id,
          );
          onDebug?.(`11-retry-${label.id}-prompt.md`, `## System\n\n${retrySystem}\n\n## User\n\n${retryUser}`);

          try {
            const retryRaw = await llm.generateJSON(retrySystem, retryUser);
            const retryCleaned = stripFences(retryRaw);
            onDebug?.(`12-retry-${label.id}-result.xml`, retryCleaned);

            const retryRoot = parseXml(retryCleaned);
            const retryObj = xmlToObjects(retryRoot) as Record<string, unknown>;
            const retrySlide = retryObj['slide'] ?? retryObj;
            if (retrySlide && typeof retrySlide === 'object') {
              const fixed = unwrapChildWrappers(retrySlide as Record<string, unknown>);
              const slideIndex = slides.findIndex(s => s['id'] === label.id);
              if (slideIndex >= 0) {
                slides[slideIndex] = { ...slides[slideIndex], ...fixed, id: label.id };
                onProgress?.('retry', `Fixed slide ${label.id}: "${fixed['headline'] ?? label.headline}"`);
              }
            }
            retriesUsed['labelDetection'] = labelRetries + 1;
          } catch (retryErr) {
            onProgress?.('retry', `Retry failed for ${label.id}: ${retryErr}`);
            retriesUsed['labelDetection'] = labelRetries + 1;
          }
        }
      } else {
        onProgress?.('validation', 'All headlines pass quality check');
      }
    } catch (detectErr) {
      onProgress?.('validation', `Label detection failed: ${detectErr}`);
    }
  }

  // Write final slides debug after retries
  onDebug?.('13-final-slides.json', JSON.stringify(slides, null, 2));

  // Headline validation
  const headlineWarnings: string[] = [];
  for (const slide of slides) {
    const headline = slide['headline'] as string | undefined;
    if (!headline) continue;
    const words = headline.split(/\s+/).length;
    if (words > 5) {
      headlineWarnings.push(`${slide['type']}: "${headline}" (${words} words, max 5)`);
    }
    const lc = headline.toLowerCase();
    if (lc.startsWith('the ') || lc.startsWith('a ') || lc.startsWith('an ')) {
      headlineWarnings.push(`${slide['type']}: "${headline}" starts with article`);
    }
  }
  if (headlineWarnings.length > 0) {
    onProgress?.('validation', `Headline warnings: ${headlineWarnings.join('; ')}`);
  }

  const totalLatencyMs = Date.now() - totalStart;
  onProgress?.('complete', `Total: ${totalLatencyMs}ms, ${slides.length} slides`);

  return {
    slides,
    briefXml: briefXml!,
    selectionXml: selectionXml ?? '',
    planXml: planXml!,
    rawGenerationXml: genCleaned!,
    extractionLatencyMs,
    selectionLatencyMs,
    planLatencyMs,
    generationLatencyMs,
    totalLatencyMs,
    totalTokens: { input: 0, output: 0 },
    selectedTemplateId: selectedTemplate!.id,
    slidePlan: slidePlan!,
    domainId: selectedDomain!.id,
    domainClassificationMs,
    needsReview,
  };
}

function xmlToObjects(el: ReturnType<typeof parseXml>): unknown {
  if (el.text && el.children.length === 0) return el.text;
  const result: Record<string, unknown> = { ...el.attributes };
  if (el.children.length > 0) {
    const grouped: Record<string, unknown[]> = {};
    for (const child of el.children) {
      const obj = xmlToObjects(child);
      (grouped[child.tag] ??= []).push(obj);
    }
    for (const [k, v] of Object.entries(grouped)) {
      result[k] = v.length === 1 ? v[0] : v;
    }
  }
  return result;
}

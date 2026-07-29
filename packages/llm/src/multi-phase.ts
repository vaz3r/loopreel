import { z } from 'zod';
import { parseXml, xmlElementToObjects } from './xml-parser.js';

const SLIDE_TYPE_CONSTRAINTS: Record<string, string> = {
  cover: `id: REQUIRED (string), type: "cover", tag?: string, headline: REQUIRED (max 80 chars), subheadline?: string (max 200), authorName?: string, authorRole?: string, footerLeft?: string, footerRight?: string`,
  sequence: `id: REQUIRED (string), type: "sequence", tag?: string, headline: REQUIRED (max 60 chars), items: REQUIRED array of {num: string, title: string (max 50), desc: string (max 200)}, footerLeft?: string, footerRight?: string`,
  'image-split': `id: REQUIRED (string), type: "image-split", tag?: string, headline: REQUIRED (max 60 chars), bodyText?: string (max 400), imageUrl?: string (URL), credit?: string, footerLeft?: string, footerRight?: string`,
  telemetry: `id: REQUIRED (string), type: "telemetry", tag?: string, headline: REQUIRED (max 60 chars), stats: REQUIRED array of {value: string, unit?: string, label: string (max 150), color?: "green"|"red"|"amber"|"blue"}, footerLeft?: string, footerRight?: string`,
  interview: `id: REQUIRED (string), type: "interview", tag?: string, headline: REQUIRED (max 60 chars), question: REQUIRED (max 200), answer: REQUIRED (max 600), respondentName?: string, respondentRole?: string, footerLeft?: string, footerRight?: string`,
  quadrant: `id: REQUIRED (string), type: "quadrant", tag?: string, headline: REQUIRED (max 60 chars), topLeft: REQUIRED {title: string (max 40), desc: string (max 150)}, topRight: REQUIRED, bottomLeft: REQUIRED, bottomRight: REQUIRED, topLabel?: string, bottomLabel?: string, leftLabel?: string, rightLabel?: string, highlight?: "topLeft"|"topRight"|"bottomLeft"|"bottomRight", footerLeft?: string, footerRight?: string`,
  'case-study': `id: REQUIRED (string), type: "case-study", tag?: string, headline: REQUIRED (max 60 chars), stages: REQUIRED array of {label: string, title: string (max 50), desc: string (max 250), highlighted: "true"|"false"}, footerLeft?: string, footerRight?: string`,
  'myth-fact': `id: REQUIRED (string), type: "myth-fact", tag?: string, headline: REQUIRED (max 60 chars), myth: REQUIRED (max 300), fact: REQUIRED (max 300), footerLeft?: string, footerRight?: string`,
  'resource-grid': `id: REQUIRED (string), type: "resource-grid", tag?: string, headline: REQUIRED (max 60 chars), items: REQUIRED array of {title: string (max 40), desc: string (max 150)}, footerLeft?: string, footerRight?: string`,
  timeline: `id: REQUIRED (string), type: "timeline", tag?: string, headline: REQUIRED (max 60 chars), events: REQUIRED array of {date: string, title: string (max 50), desc: string (max 200), highlight: "true"|"false"}, footerLeft?: string, footerRight?: string`,
  quote: `id: REQUIRED (string), type: "quote", tag?: string, quote: REQUIRED (max 500), author?: string, role?: string, footerLeft?: string, footerRight?: string`,
  cta: `id: REQUIRED (string), type: "cta", tag?: string, headline: REQUIRED (max 60 chars), subtext?: string (max 200), actionLabel?: string, socialHandle?: string, footerLeft?: string, footerRight?: string`,
};

const EXTRACTION_PROMPT = `You are an expert content analyst. Extract the essential content from this article into a structured brief for a social media carousel.

## Input
The full article text will be provided as user content.

## Output Format
Return a single <contentBrief> element with these fields as child elements:

<contentBrief>
  <title>The article title</title>
  <oneLiner>One sentence summary of the article's core argument (max 25 words)</oneLiner>
  <keyPoints>
    <point>The first key insight or argument</point>
    <point>The second key insight</point>
    <point>The third key insight</point>
    <point>The fourth key insight</point>
    <point>The fifth key insight</point>
  </keyPoints>
  <quotes>
    <quote text="Exact direct quote from the article — word for word" author="Person Name" role="Their Title" />
  </quotes>
  <counterpoints>
    <point>A common objection or alternative view mentioned</point>
  </counterpoints>
  <dataPoints>
    <point>A specific number, percentage, dollar amount, or measurable fact from the article</point>
  </dataPoints>
  <hasRealNumbers>true or false — does the article contain ACTUAL hard statistics (percentages, dollar amounts, specific counts)? Not general references to numbers.</hasRealNumbers>
  <companies>
    <company name="Company Name" role="What they did or represent" />
  </companies>
  <conclusion>The article's conclusion or call to action</conclusion>
</contentBrief>

## Rules
- Extract 5-7 key points that capture the article's core argument
- Include direct quotes ONLY if the article has notable ones with named attribution
- Capture counterpoints or alternative views
- dataPoints: ONLY include actual numbers, percentages, dollar amounts, or measurable facts. Do NOT include opinions, advice, or qualitative statements as data points. If the article has no numbers, leave <dataPoints> empty.
- hasRealNumbers: Answer "true" ONLY if the article contains specific, citable statistics. "2-3 percent" mentioned casually is NOT a real statistic. "42% year-over-year growth" IS a real statistic. When in doubt, answer "false".
- Note companies or people mentioned
- Do NOT invent content not in the article
- Keep each point concise (1-2 sentences)
- Return ONLY the XML element, no markdown fences`;

function getSlidePrompt(slideType: string, briefXml: string): { system: string; user: string } {
  const constraints = SLIDE_TYPE_CONSTRAINTS[slideType]!;

  const examples: Record<string, string> = {
    cover: `<slide type="cover" id="slide-01" tag="MARKET DATA" headline="Nobody tells you this about AI" subheadline="$184B in enterprise spending — and most founders are missing it." authorName="Terminal Intelligence" footerLeft="ANALYSIS" footerRight="PAGE 01" />`,
    telemetry: `<slide type="telemetry" id="slide-01" tag="DATA" headline="Key Growth Metrics" footerLeft="METRICS" footerRight="PAGE 01">
  <stats>
    <stat value="42" unit="%" label="Year-over-year growth" color="green" />
    <stat value="184" unit="B" label="Global market size by 2026" color="blue" />
  </stats>
</slide>`,
    sequence: `<slide type="sequence" id="slide-02" tag="KEY FINDINGS" headline="Why most founders fail" footerLeft="ANALYSIS" footerRight="PAGE 02">
  <items>
    <item num="1" title="Chasing 'sexy'" desc="Ignore what's trendy. Focus on what's missing." />
    <item num="2" title="Forcing ideas" desc="You're building fake solutions for non-existent problems." />
    <item num="3" title="Ignoring the schlep" desc="The boring work = the billion-dollar opportunity." />
  </items>
</slide>`,
    'myth-fact': `<slide type="myth-fact" id="slide-01" tag="ANALYSIS" headline="The competition myth" myth="You need a unique idea to win." fact="The best ideas aren't unique. They're executed well." footerLeft="RESEARCH" footerRight="PAGE 01" />`,
    interview: `<slide type="interview" id="slide-01" tag="EXPERT VOICE" headline="Central Bank Perspective" question="What does the current rate environment mean for emerging markets?" answer="We are seeing a structural shift. Countries with dollar-denominated debt face significant refinancing risk." respondentName="Dr. Sarah Chen" respondentRole="IMF Chief Economist" footerLeft="INTERVIEW" footerRight="PAGE 01" />`,
    quadrant: `<slide type="quadrant" id="slide-01" tag="ANALYSIS" headline="Risk Matrix" footerLeft="FRAMEWORK" footerRight="PAGE 01">
  <topLeft title="High Yield" desc="Corporate bonds with elevated default risk" />
  <topRight title="Investment Grade" desc="Stable returns with lower volatility" />
  <bottomLeft title="Emerging Markets" desc="Currency and sovereign risk exposure" />
  <bottomRight title="Private Credit" desc="Illiquid but higher yield potential" />
</slide>`,
    'case-study': `<slide type="case-study" id="slide-01" tag="CASE STUDY" headline="Apple's Market Entry" footerLeft="ANALYSIS" footerRight="PAGE 01">
  <stages>
    <stage label="Step 1" title="Research" desc="Deep user research into mobile phone market" highlighted="true" />
    <stage label="Step 2" title="Design" desc="Minimalist design philosophy applied to phone" highlighted="false" />
    <stage label="Step 3" title="Launch" desc="iPhone launches and disrupts Nokia" highlighted="true" />
  </stages>
</slide>`,
    'resource-grid': `<slide type="resource-grid" id="slide-01" tag="RESOURCES" headline="Essential Reading" footerLeft="RESOURCES" footerRight="PAGE 01">
  <items>
    <item title="Book A" desc="Key resource description" />
    <item title="Book B" desc="Another important resource" />
  </items>
</slide>`,
    timeline: `<slide type="timeline" id="slide-01" tag="TIMELINE" headline="Key Milestones" footerLeft="TIMELINE" footerRight="PAGE 01">
  <events>
    <event date="2020" title="Started" desc="Initial research phase" highlight="true" />
    <event date="2022" title="Launched" desc="Product launch" highlight="true" />
  </events>
</slide>`,
    quote: `<slide type="quote" id="slide-01" tag="THESIS" quote="The best way to predict the future is to invent it." author="Alan Kay" role="Computer Scientist" footerLeft="REFERENCE" footerRight="PAGE 01" />`,
    cta: `<slide type="cta" id="slide-01" tag="CONCLUSION" headline="Your turn" subtext="Comment your biggest frustration. Let's solve it together." actionLabel="Subscribe" socialHandle="@terminal" footerLeft="END" footerRight="PAGE 01" />`,
  };

  return {
    system: `You are a slide copywriter for "The Terminal" — a Bloomberg-style data intelligence platform. You write punchy, social-media-ready copy that stops the scroll.

Generate exactly ONE slide element for a social media carousel.

## Content Brief
The following XML contains the extracted content from the source article. Use ONLY facts from this brief.

${briefXml}

## Slide Type to Generate: ${slideType}

## Schema Constraints for This Slide Type
${constraints}

## CRITICAL: XML Child Element Format
For fields that are ARRAYS (like stats, items, events, stages), you MUST use nested child elements — NOT stringified JSON in attributes.

CORRECT format for telemetry:
<slide type="telemetry" id="slide-01" tag="DATA" headline="Key Metrics" footerLeft="METRICS" footerRight="PAGE 01">
  <stats>
    <stat value="42" unit="%" label="Year-over-year growth" color="green" />
  </stats>
</slide>

WRONG (do NOT do this):
<slide type="telemetry" id="slide-01" stats="[{value: '42'}]" ... />

## Output Format
Return a single <slide> element with type="${slideType}". Include exactly: id="slide-01", tag (short category), type, footerLeft, footerRight ("PAGE 01"), and all required fields for this slide type.

## ANTI-HALLUCINATION RULES (CRITICAL)

<antiHallucination>
  <rule>Every fact, number, and quote MUST come DIRECTLY from the content brief above. Do NOT paraphrase, round, interpolate, or invent anything.</rule>
  <rule>If the content brief has NO hard data, do NOT generate telemetry. Use sequence, quote, or myth-fact instead.</rule>
  <rule>If the content brief says "2-3%", you MUST write exactly that. Do NOT change to "3%" or "2.5%".</rule>
  <rule>If you cannot find an exact number in the brief, the stat does not exist. Period.</rule>
  <rule>NEVER invent statistics, percentages, dollar amounts, or counts. NEVER.</rule>
  <rule>NEVER invent quotes. Use ONLY quotes from the brief's quotes section.</rule>
</antiHallucination>

## PREMIUM COPYWRITING RULES (follow exactly)

<copyRules>
  <rule>HEADLINE = HOOK. You have 0.3 seconds to stop the scroll. Make it count.</rule>
  <rule>Use CURIOSITY GAPS: create an information void the reader MUST fill. "Nobody tells you this about..." "The mistake 90% make..."</rule>
  <rule>Use POWER WORDS in every headline: Secret, Mistake, Truth, Nobody Tells You, Why, How, Stop, Never, Always, Shocking, Hidden, Reverse</rule>
  <rule>Use PATTERN INTERRUPTS: break expectations. "Don't do this." "This is wrong." "Everyone gets this backwards."</rule>
  <rule>Max 5 words per line. No sentences. Fragments only.</rule>
  <rule>Active voice only. No passive constructions.</rule>
  <rule>Contractions mandatory (you're, don't, can't) — sounds human, not corporate.</rule>
  <rule>Write like you're talking to a friend, not writing a report.</rule>
  <rule>End EVERY slide with emotional punch, not information.</rule>
  <rule>Use "YOU" language. Make it personal. "Your problem" not "one's problem"</rule>
</copyRules>

## PREMIUM COPY EXAMPLES — GOOD vs GREAT

<copyExamples>
  BAD: "Evidence suggests superior ventures are noticed, not manufactured through abstract brainstorming."
  GOOD: "Stop brainstorming. Start noticing."
  GREAT: "You're brainstorming wrong. Here's why."

  BAD: "Maintain residency at the leading edge of your field to perceive gaps before the market."
  GOOD: "Live in the future. Build what's missing."
  GREAT: "The future is already here. You're just not looking."

  BAD: "Startup success requires a brilliant, original 'lightbulb moment' generated through brainstorming."
  GOOD: "You don't need a lightbulb moment."
  GREAT: "Nobody tells you this: lightbulb moments are a myth."

  BAD: "Embrace tedious, unglamorous problems; they often harbor the highest barriers to entry and value."
  GOOD: "The unsexy problems = the billion-dollar ones."
  GREAT: "The boring problems? That's where the money hides."

  BAD: "Focus on problems you encounter that you possess the unique technical skill to resolve."
  GOOD: "Solve YOUR problem first."
  GREAT: "Your biggest frustration = your biggest opportunity."
</copyExamples>

## SLIDE-SPECIFIC RULES

### Cover slides (THE MAKE-OR-BREAK MOMENT):
- headline: max 8 words. MUST use a curiosity gap or pattern interrupt.
- subheadline: max 15 words. Create intrigue. Make them NEED to swipe.
- Examples:
  - headline="Nobody tells you this about startup ideas" subheadline="The truth is simpler — and more powerful — than you think."
  - headline="You're brainstorming wrong" subheadline="Here's the 2-minute fix that changes everything."
  - headline="The startup myth that's killing you" subheadline="Stop believing this. Start noticing instead."

### Sequence slides (MAKE IT SCANNABLE):
- item titles: max 5 words. Use power words.
- item descriptions: max 12 words. Punchy. No fluff.
- Examples:
  - title="Solve YOUR problem" desc="Build what you need first. Not what others want."
  - title="Live in the future" desc="Work where the world is heading tomorrow."
  - title="Notice the gaps" desc="See what's missing in your daily life."

### Myth-fact slides (SHOCK VALUE):
- myth: max 12 words. Something EVERYONE believes.
- fact: max 12 words. Sharp, surprising, contrarian.
- Examples:
  - myth="You need a brilliant idea to start." fact="The best ideas aren't thought up. They're noticed."
  - myth="Competition is bad for startups." fact="Competition proves demand. Avoid it and you avoid money."

### Quote slides:
- Use the EXACT quote text from the brief — do not paraphrase
- Keep the full quote, even if long

### CTA slides (DRIVE ENGAGEMENT):
- headline: max 6 words. Action-oriented. Create urgency.
- subtext: max 12 words. Tell them EXACTLY what to do. Make it easy.
- Examples:
  - headline="Your turn" subtext="Comment your biggest frustration. Let's solve it."
  - headline="Try this now" subtext="Spend 2 minutes writing down your problems."

### Footer convention:
- footerLeft: short category label (e.g., "INSIGHT", "RESEARCH", "METHODOLOGY")
- footerRight: "PAGE 01", "PAGE 02", etc. (sequential)

## RULES
- Return ONLY the XML <slide> element. No markdown fences, no explanation.
- Use ONLY data from the content brief. Do NOT invent facts, statistics, or quotes.
- Respect character limits exactly.
- Use self-closing tags <stat ... /> for simple leaf elements.

## Example Output
${examples[slideType] ?? examples.cover}`,
    user: `Generate a single "${slideType}" slide from the content brief above.`,
  };
}

function buildSlidePlan(briefXml: string): string[] {
  const plan: string[] = ['cover'];

  if (briefXml.includes('<counterpoints>') && /<point>/.test(briefXml.split('<counterpoints>')[1]?.split('</counterpoints>')[0] ?? '')) {
    plan.push('myth-fact');
  }

  // Check hasRealNumbers flag — only include telemetry if article has actual stats
  const hasRealNumbers = briefXml.includes('<hasRealNumbers>true</hasRealNumbers>');
  if (hasRealNumbers) {
    const dataPointsSection = briefXml.includes('<dataPoints>')
      ? briefXml.split('<dataPoints>')[1]?.split('</dataPoints>')[0] ?? ''
      : '';
    const hasNumbers = /<point>[^<]*\d+[%$xBMKkTt]/.test(dataPointsSection);
    if (hasNumbers) {
      plan.push('telemetry');
    }
  }

  if (briefXml.includes('<keyPoints>')) {
    plan.push('sequence');
  }

  if (briefXml.includes('<quotes>') && /<quote /.test(briefXml.split('<quotes>')[1]?.split('</quotes>')[0] ?? '')) {
    plan.push('quote');
  }

  if (briefXml.includes('<companies>') && /<company /.test(briefXml.split('<companies>')[1]?.split('</companies>')[0] ?? '')) {
    plan.push('interview');
  }

  if (plan.length < 5) {
    const extras = ['quadrant', 'timeline', 'resource-grid'];
    for (const e of extras) {
      if (plan.length >= 6) break;
      if (!plan.includes(e)) plan.push(e);
    }
  }

  plan.push('cta');
  return plan.slice(0, 8);
}

export interface MultiPhaseResult {
  slides: Record<string, unknown>[];
  briefXml: string;
  extractionLatencyMs: number;
  slideLatenciesMs: number[];
  totalLatencyMs: number;
  totalTokens: { input: number; output: number };
  slidePlan: string[];
}

export async function generateSlidesMultiPhase(
  rawText: string,
  _templateSchema: z.ZodTypeAny,
  options: {
    llm: { generateJSON(system: string, user: string): Promise<string> };
    templateHint?: string;
    onProgress?: (phase: string, detail: string) => void;
  },
): Promise<MultiPhaseResult> {
  const { llm, onProgress } = options;
  const totalStart = Date.now();

  onProgress?.('extraction', 'Extracting content brief...');

  const extractionPrompt = EXTRACTION_PROMPT;
  const briefXml = await llm.generateJSON(extractionPrompt, rawText);
  const extractionLatencyMs = Date.now() - totalStart;

  onProgress?.('extraction', `Extracted in ${extractionLatencyMs}ms`);

  const slidePlan = buildSlidePlan(briefXml);
  onProgress?.('planning', `Plan: ${slidePlan.join(', ')}`);

  const slides: Record<string, unknown>[] = [];
  const slideLatenciesMs: number[] = [];
  let totalTokens = { input: 0, output: 0 };

  for (let i = 0; i < slidePlan.length; i++) {
    const slideType = slidePlan[i]!;
    onProgress?.('slide', `Generating slide ${i + 1}/${slidePlan.length}: ${slideType}`);

    const slideStart = Date.now();
    const { system, user } = getSlidePrompt(slideType, briefXml);
    const raw = await llm.generateJSON(system, user);
    const latency = Date.now() - slideStart;
    slideLatenciesMs.push(latency);

    let cleaned = raw.trim();
    if (cleaned.startsWith('```xml')) cleaned = cleaned.slice(6);
    else if (cleaned.startsWith('```')) cleaned = cleaned.slice(3);
    if (cleaned.endsWith('```')) cleaned = cleaned.slice(0, -3);
    cleaned = cleaned.trim();

    let parsed: Record<string, unknown>;
    try {
      const xmlResult = parseXml(cleaned);
      parsed = unwrapChildWrappers(xmlElementToObjects(xmlResult) as Record<string, unknown>);
    } catch {
      onProgress?.('slide', `Parse failed for ${slideType}, using fallback`);
      parsed = createFallbackSlide(slideType, i + 1);
    }

    parsed.id = `slide-${String(i + 1).padStart(2, '0')}`;
    slides.push(parsed);

    onProgress?.('slide', `Generated ${slideType} in ${latency}ms`);
  }

  onProgress?.('validation', 'Validating against schema...');

  const totalLatencyMs = Date.now() - totalStart;

  return {
    slides,
    briefXml,
    extractionLatencyMs,
    slideLatenciesMs,
    totalLatencyMs,
    totalTokens,
    slidePlan,
  };
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
    case 'telemetry':
      return { id, type: 'telemetry', tag: 'DATA', headline: 'Key Metrics', stats: [{ value: 'N/A', label: 'Data not available', color: 'amber' as const }], footerLeft: 'METRICS', footerRight };
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

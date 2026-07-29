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
  <oneLiner>One sentence summary of the article's core argument</oneLiner>
  <keyPoints>
    <point>The first key insight or argument</point>
    <point>The second key insight</point>
    <point>The third key insight</point>
    <point>The fourth key insight</point>
    <point>The fifth key insight</point>
  </keyPoints>
  <quotes>
    <quote text="Direct quote from the article" author="Person Name" role="Their Title" />
  </quotes>
  <counterpoints>
    <point>A common objection or alternative view mentioned</point>
  </counterpoints>
  <dataPoints>
    <point>Statistic or data point with source</point>
  </dataPoints>
  <companies>
    <company name="Company Name" role="What they did or represent" />
  </companies>
  <conclusion>The article's conclusion or call to action</conclusion>
</contentBrief>

## Rules
- Extract 5-7 key points that capture the article's core argument
- Include direct quotes if the article has notable ones
- Capture counterpoints or alternative views
- List specific data, statistics, or examples
- Note companies or people mentioned
- Do NOT invent content not in the article
- Keep each point concise (1-2 sentences)
- Return ONLY the XML element, no markdown fences`;

function getSlidePrompt(slideType: string, briefXml: string): { system: string; user: string } {
  const constraints = SLIDE_TYPE_CONSTRAINTS[slideType]!;

  const examples: Record<string, string> = {
    cover: `<slide type="cover" id="slide-01" tag="MARKET DATA" headline="AI Adoption Reaches Inflection Point" subheadline="Enterprise spending projected at $184B in 2026" authorName="Terminal Intelligence" footerLeft="ANALYSIS" footerRight="PAGE 01" />`,
    telemetry: `<slide type="telemetry" id="slide-01" tag="DATA" headline="Key Growth Metrics" footerLeft="METRICS" footerRight="PAGE 01">
  <stats>
    <stat value="42" unit="%" label="Year-over-year growth" color="green" />
    <stat value="184" unit="B" label="Global market size projected for 2026" color="blue" />
  </stats>
</slide>`,
    sequence: `<slide type="sequence" id="slide-02" tag="KEY FINDINGS" headline="Five Trends Shaping AI in 2026" footerLeft="ANALYSIS" footerRight="PAGE 02">
  <items>
    <item num="1" title="Edge AI" desc="Processing moves to devices, reducing latency" />
    <item num="2" title="Multimodal Models" desc="Systems that understand text, images, and audio" />
    <item num="3" title="AI Agents" desc="Autonomous systems for complex tasks" />
  </items>
</slide>`,
    'myth-fact': `<slide type="myth-fact" id="slide-01" tag="ANALYSIS" headline="The Market Size Fallacy" myth="Market size is the most important factor for startup success." fact="Growth rate is the key metric that determines whether a company will succeed." footerLeft="RESEARCH" footerRight="PAGE 01" />`,
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
    cta: `<slide type="cta" id="slide-01" tag="CONCLUSION" headline="Stay Ahead of the Curve" subtext="Subscribe for weekly intelligence briefings" actionLabel="Subscribe" socialHandle="@terminal" footerLeft="END" footerRight="PAGE 01" />`,
  };

  return {
    system: `You are a slide content writer for "The Terminal" — a Bloomberg-style data intelligence platform.

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
    <stat value="42" unit="%" label="Growth rate" color="green" />
    <stat value="184" unit="B" label="Market size" color="blue" />
  </stats>
</slide>

WRONG format (do NOT do this):
<slide type="telemetry" id="slide-01" tag="DATA" headline="Key Metrics" stats="[{value: '42', unit: '%'}]" footerLeft="METRICS" footerRight="PAGE 01" />

Same for sequence: use <items><item num="1" .../></items>
Same for timeline: use <events><event .../></events>
Same for case-study: use <stages><stage .../></stages>

## Output Format
Return a single <slide> element with type="${slideType}". Include exactly: id="slide-01", tag (short category), type, footerLeft, footerRight ("PAGE 01"), and all required fields for this slide type.

## Rules
- Return ONLY the XML <slide> element. No markdown fences, no explanation, no presentation wrapper.
- Use ONLY data from the content brief. Do NOT invent facts, statistics, or quotes.
- Respect character limits exactly.
- For stats: use concrete numbers with units (e.g., "42%", "3.2x", "$184B").
- For quotes: use exact text from the brief with proper attribution.
- For myth-fact: use counterpoints from the brief.
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
  if (briefXml.includes('<dataPoints>') && /<point>/.test(briefXml.split('<dataPoints>')[1]?.split('</dataPoints>')[0] ?? '')) {
    plan.push('telemetry');
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
  return plan.slice(0, 10);
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

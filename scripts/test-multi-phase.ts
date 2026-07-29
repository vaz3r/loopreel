/**
 * Multi-Phase LLM Pipeline Test
 *
 * Tests the hypothesis that splitting a monolithic LLM call into smaller,
 * focused phases produces more reliable output for smaller models.
 *
 * Run: pnpm tsx scripts/test-multi-phase.ts
 */

const API_KEY = process.env['LLM_API_KEY'] ?? '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';
const BASE_URL = process.env['LLM_BASE_URL'] ?? 'https://openrouter.ai/api/v1';
const MODEL = process.env['LLM_MODEL'] ?? 'google/gemma-4-26b-a4b-it:free';
const TIMEOUT_MS = 120_000;

// ─── Types ───────────────────────────────────────────────────────────────────

interface TestResult {
  id: string;
  phase: string;
  variant: string;
  promptLength: number;
  promptPreview: string;
  responseRaw: string;
  responseLength: number;
  latencyMs: number;
  parsed: unknown;
  parseError: string | null;
  validXml: boolean;
  hasPresentationRoot: boolean;
  tokenEstimate: { input: number; output: number };
}

// ─── LLM Call ────────────────────────────────────────────────────────────────

async function callLLM(systemPrompt: string, userContent: string, retries = 3): Promise<{ text: string; latencyMs: number; tokenEstimate: { input: number; output: number } }> {
  for (let attempt = 0; attempt < retries; attempt++) {
    const start = Date.now();
    try {
      const response = await fetch(`${BASE_URL}/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${API_KEY}`,
        },
        signal: AbortSignal.timeout(TIMEOUT_MS),
        body: JSON.stringify({
          model: MODEL,
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userContent },
          ],
        }),
      });

      if (!response.ok) {
        const body = await response.text().catch(() => '');
        const is500 = response.status >= 500;
        if (is500 && attempt < retries - 1) {
          const delay = 5000 * (attempt + 1);
          console.log(`    ⚠ ${response.status} error, retrying in ${delay / 1000}s (attempt ${attempt + 1}/${retries})...`);
          await new Promise(r => setTimeout(r, delay));
          continue;
        }
        throw new Error(`LLM ${response.status}: ${body.slice(0, 300)}`);
      }

      const data = (await response.json()) as {
        choices?: Array<{ message: { content: string } }>;
        usage?: { prompt_tokens: number; completion_tokens: number };
      };

      const content = data.choices?.[0]?.message?.content;
      if (!content) {
        if (attempt < retries - 1) {
          const delay = 3000 * (attempt + 1);
          console.log(`    ⚠ Empty response, retrying in ${delay / 1000}s...`);
          await new Promise(r => setTimeout(r, delay));
          continue;
        }
        throw new Error(`Empty response: ${JSON.stringify(data).slice(0, 200)}`);
      }

      return {
        text: content,
        latencyMs: Date.now() - start,
        tokenEstimate: {
          input: data.usage?.prompt_tokens ?? Math.round(systemPrompt.length / 4),
          output: data.usage?.completion_tokens ?? Math.round(content.length / 4),
        },
      };
    } catch (e) {
      if (attempt < retries - 1 && String(e).includes('500')) {
        const delay = 5000 * (attempt + 1);
        console.log(`    ⚠ Retrying in ${delay / 1000}s after error...`);
        await new Promise(r => setTimeout(r, delay));
        continue;
      }
      throw e;
    }
  }
  throw new Error('Failed after retries');
}

// ─── XML Parser (inline, no imports needed) ──────────────────────────────────

interface XmlElement {
  tag: string;
  attributes: Record<string, string>;
  children: XmlElement[];
  text?: string;
}

function parseAttributes(attrString: string): Record<string, string> {
  const attrs: Record<string, string> = {};
  const regex = /(\w+)="([^"]*)"/g;
  let match;
  while ((match = regex.exec(attrString)) !== null) {
    attrs[match[1]!] = match[2]!
      .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"').replace(/&#x27;/g, "'").replace(/&#39;/g, "'");
  }
  return attrs;
}

function parseXmlNode(xml: string, pos: number): { element: XmlElement; endPos: number } {
  while (pos < xml.length && /\s/.test(xml[pos]!)) pos++;
  if (pos >= xml.length || xml[pos] !== '<') throw new Error(`Expected '<' at ${pos}`);
  pos++;
  if (xml[pos] === '/') throw new Error(`Unexpected closing tag at ${pos}`);
  let tag = '';
  while (pos < xml.length && /[a-zA-Z0-9_-]/.test(xml[pos]!)) { tag += xml[pos]!; pos++; }
  let attrStr = '';
  while (pos < xml.length && xml[pos] !== '>' && !(xml[pos] === '/' && xml[pos + 1] === '>')) { attrStr += xml[pos]!; pos++; }
  const attributes = parseAttributes(attrStr);
  if (xml[pos] === '/' && xml[pos + 1] === '>') return { element: { tag, attributes, children: [] }, endPos: pos + 2 };
  pos++; // skip >
  const children: XmlElement[] = [];
  let text = '';
  while (pos < xml.length) {
    while (pos < xml.length && /\s/.test(xml[pos]!)) pos++;
    if (pos >= xml.length) break;
    if (xml[pos] === '<') {
      if (xml[pos + 1] === '/') { while (pos < xml.length && xml[pos] !== '>') pos++; pos++; break; }
      const { element: child, endPos } = parseXmlNode(xml, pos);
      children.push(child);
      pos = endPos;
    } else {
      while (pos < xml.length && xml[pos] !== '<') { text += xml[pos]!; pos++; }
    }
  }
  return { element: { tag, attributes, children, text: text || undefined }, endPos: pos };
}

function parseXml(xmlString: string): XmlElement {
  const { element } = parseXmlNode(xmlString.trim(), 0);
  return element;
}

function xmlToObjects(el: XmlElement): unknown {
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

// ─── Test Data ───────────────────────────────────────────────────────────────

// Fetch real article from Paul Graham
async function fetchArticle(): Promise<string> {
  console.log('  Fetching real article from paulgraham.com...');
  const res = await fetch('https://www.paulgraham.com/startupideas.html');
  const html = await res.text();
  // Strip HTML tags, collapse whitespace (same as ingest worker)
  const text = html
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  console.log(`  Article fetched: ${text.length} chars`);
  return text;
}

const TEMPLATE_STYLE_TERMINAL = 'Bloomberg Terminal / Financial Times dark mode. Data-driven, market-focused, quantitative. Technical and precise.';

// ─── Slide Schema Constraints (for single-slide generation) ──────────────────

const SLIDE_TYPE_CONSTRAINTS: Record<string, string> = {
  cover: `cover:
  id: string, REQUIRED
  tag: string, optional
  headline: string, max 80 chars, REQUIRED
  subheadline: string, max 200 chars, optional
  authorName: string, optional
  authorRole: string, optional
  footerLeft: string, optional
  footerRight: string, optional`,

  telemetry: `telemetry:
  id: string, REQUIRED
  tag: string, optional
  headline: string, max 60 chars, REQUIRED
  stats: array of {value: string, unit: string, label: string, max 150 chars, color: green | red | amber | blue}, min 1, max 4, REQUIRED
  footerLeft: string, optional
  footerRight: string, optional`,

  'myth-fact': `myth-fact:
  id: string, REQUIRED
  tag: string, optional
  headline: string, max 60 chars, REQUIRED
  myth: string, max 300 chars, REQUIRED
  fact: string, max 300 chars, REQUIRED
  footerLeft: string, optional
  footerRight: string, optional`,
};

// ─── TEST 1: Content Extraction ──────────────────────────────────────────────

const EXTRACTION_PROMPTS = {
  bare: {
    variant: 'bare',
    system: `You are a content analyst. Extract key elements from the article below into XML.

Output format — return ONLY this XML structure:

<contentBrief>
  <title>Article title</title>
  <oneLiner>One sentence summary of the article's main argument</oneLiner>
  <keyPoints>
    <point>Key takeaway 1</point>
    <point>Key takeaway 2</point>
    <point>Key takeaway 3</point>
    <point>Key takeaway 4</point>
  </keyPoints>
  <quotes>
    <quote text="Exact quote from the article" attribution="Person Name" role="Their title" />
  </quotes>
  <statistics>
    <stat value="42" unit="%" label="What the stat measures" color="green" />
  </statistics>
  <timelineEvents>
    <event date="Year or date" title="Event name" desc="Brief description" />
  </timelineEvents>
  <counterpoints>
    <item myth="Common misconception" fact="What the article actually says" />
  </counterpoints>
</contentBrief>

Rules:
- Extract real data from the article. Do NOT invent facts or statistics.
- If the article doesn't contain statistics, leave <statistics> empty.
- If the article doesn't contain quotes, leave <quotes> empty.
- Provide 3-6 key points.
- Return ONLY the XML, no markdown fences, no explanation.`,
  },

  templateAware: {
    variant: 'template-aware',
    system: `You are a content analyst for "The Terminal" — a Bloomberg-style data intelligence platform. Your audience is quantitative professionals who care about metrics, data, and market trends.

Extract key elements from the article below into XML.

Output format — return ONLY this XML structure:

<contentBrief>
  <title>Article title</title>
  <oneLiner>One sentence summary</oneLiner>
  <keyPoints>
    <point>Key takeaway 1</point>
    <point>Key takeaway 2</point>
    <point>Key takeaway 3</point>
    <point>Key takeaway 4</point>
  </keyPoints>
  <quotes>
    <quote text="Exact quote" attribution="Person Name" role="Their title" />
  </quotes>
  <statistics>
    <stat value="42" unit="%" label="What the stat measures" color="green" />
  </statistics>
  <timelineEvents>
    <event date="Year" title="Event" desc="Description" />
  </timelineEvents>
  <counterpoints>
    <item myth="Common misconception" fact="What the article says" />
  </counterpoints>
</contentBrief>

Rules:
- PRIORITIZE quantitative data: growth rates, market sizes, percentages, dollar amounts.
- If the article contains any numbers, extract them as <statistics>.
- Extract direct quotes for attribution slides.
- Extract counterpoints as myth/fact pairs when the article debunks common beliefs.
- Return ONLY the XML, no markdown fences, no explanation.`,
  },

  withExample: {
    variant: 'with-example',
    system: `You are a content analyst. Extract key elements from the article below into XML.

## Output Format

<contentBrief>
  <title>Article title</title>
  <oneLiner>One sentence summary</oneLiner>
  <keyPoints>
    <point>Key takeaway 1</point>
    <point>Key takeaway 2</point>
    <point>Key takeaway 3</point>
    <point>Key takeaway 4</point>
  </keyPoints>
  <quotes>
    <quote text="Exact quote" attribution="Person Name" role="Their title" />
  </quotes>
  <statistics>
    <stat value="42" unit="%" label="What the stat measures" color="green" />
  </statistics>
  <timelineEvents>
    <event date="Year" title="Event" desc="Description" />
  </timelineEvents>
  <counterpoints>
    <item myth="Common misconception" fact="What the article says" />
  </counterpoints>
</contentBrief>

## Example (for a hypothetical article about AI adoption)

<contentBrief>
  <title>Enterprise AI Adoption Reaches Inflection Point</title>
  <oneLiner>Global enterprise AI spending is projected to reach $184B in 2026, driven by cost reduction and competitive pressure.</oneLiner>
  <keyPoints>
    <point>Enterprise AI adoption grew 42% year-over-year</point>
    <point>Healthcare and finance are the fastest-adopting sectors</point>
    <point>ROI realization timeline dropped from 18 to 6 months</point>
  </keyPoints>
  <quotes>
    <quote text="AI is not replacing humans. It is replacing tasks humans shouldn't be doing." attribution="Dr. Sarah Chen" role="VP of AI, Microsoft" />
  </quotes>
  <statistics>
    <stat value="42" unit="%" label="Year-over-year enterprise AI adoption growth" color="green" />
    <stat value="184" unit="B" label="Global enterprise AI market size projected for 2026" color="blue" />
    <stat value="6" unit="months" label="Average ROI realization timeline for enterprise AI" color="amber" />
  </statistics>
  <timelineEvents>
    <event date="2023" title="ChatGPT Launch" desc="Public LLM adoption begins" />
    <event date="2024" title="Enterprise Integration" desc="Fortune 500 deploy internal AI tools" />
    <event date="2025" title="ROI Inflection" desc="AI projects start showing measurable returns" />
  </timelineEvents>
  <counterpoints>
    <item myth="AI will replace all jobs" fact="AI augments roles; only 5% of occupations are fully automatable" />
    <item myth="Small companies can't compete in AI" fact="73% of AI startups are founded by companies under 100 employees" />
  </counterpoints>
</contentBrief>

## Rules

- Extract REAL data from the article. Do NOT invent facts or statistics.
- If the article doesn't contain a type of data, leave that section empty.
- Provide 3-6 key points.
- Return ONLY the XML, no markdown fences, no explanation.`,
  },
};

// ─── TEST 2: Single-Slide Prompts ────────────────────────────────────────────

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
    'myth-fact': `<slide type="myth-fact" id="slide-01" tag="ANALYSIS" headline="The Market Size Fallacy" myth="Market size is the most important factor for startup success." fact="Growth rate is the key metric that determines whether a company will succeed." footerLeft="RESEARCH" footerRight="PAGE 01" />`,
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
${examples[slideType] ?? examples.cover!}`,
    user: `Generate a single "${slideType}" slide from the content brief above.`,
  };
}

// ─── TEST 3: Monolithic Prompt ───────────────────────────────────────────────

function getMonolithicPrompt(articleText: string): string {
  return `You are a world-class editorial content strategist. Your task is to transform the provided source content into a structured social media carousel for "The Terminal" template.

## Template Style
Bloomberg Terminal / Financial Times dark mode. Data-driven, market-focused, quantitative. Technical and precise. Content should feel like real-time market intelligence.

## Output Format
Return an XML document with a <presentation> root element. Each slide is a <slide> element. Simple fields go as XML attributes. Complex fields go as child elements. Do NOT use markdown fences — return raw XML only.

## Slide Type Constraints
Each slide type has specific fields with character limits and array size limits. YOU MUST FOLLOW THESE EXACTLY.

cover:
  id: string, REQUIRED
  tag: string, optional
  headline: string, max 80 chars, REQUIRED
  subheadline: string, max 200 chars, optional
  authorName: string, optional
  authorRole: string, optional
  footerLeft: string, optional
  footerRight: string, optional

sequence:
  id: string, REQUIRED
  tag: string, optional
  headline: string, max 60 chars, REQUIRED
  items: array of {num: string, title: string, max 50 chars, desc: string, max 200 chars}, min 1, max 20, REQUIRED
  footerLeft: string, optional
  footerRight: string, optional

telemetry:
  id: string, REQUIRED
  tag: string, optional
  headline: string, max 60 chars, REQUIRED
  stats: array of {value: string, unit: string, label: string, max 150 chars, color: green | red | amber | blue}, min 1, max 4, REQUIRED
  footerLeft: string, optional
  footerRight: string, optional

quote:
  id: string, REQUIRED
  tag: string, optional
  quote: string, max 500 chars, REQUIRED
  author: string, optional
  role: string, optional
  footerLeft: string, optional
  footerRight: string, optional

myth-fact:
  id: string, REQUIRED
  tag: string, optional
  headline: string, max 60 chars, REQUIRED
  myth: string, max 300 chars, REQUIRED
  fact: string, max 300 chars, REQUIRED
  footerLeft: string, optional
  footerRight: string, optional

cta:
  id: string, REQUIRED
  tag: string, optional
  headline: string, max 60 chars, REQUIRED
  subtext: string, max 200 chars, optional
  actionLabel: string, optional
  socialHandle: string, optional
  footerLeft: string, optional
  footerRight: string, optional

## Universal Rules
1. Generate 6-8 slides. Start with a cover slide, end with a CTA slide.
2. Use a variety of slide types — never repeat the same type twice in a row.
3. Every slide MUST have: id, type, tag, footerLeft, footerRight.
4. Respect the character limits listed above for each field.
5. Stats should have concrete numbers with units (e.g., "42%", "3.2x", "$184B").
6. Quotes must have named attribution with role.
7. footerRight: "PAGE 01", "PAGE 02", etc.
8. Return ONLY the XML document, no markdown fences, no explanation.
9. Use self-closing tags <slide ... /> for slides with no child elements.
10. Use nested elements for arrays.

## Source Content
${articleText}`;
}

// ─── Test Runner ─────────────────────────────────────────────────────────────

function stripFences(text: string): string {
  return text.replace(/^```(?:xml)?\s*\n?/i, '').replace(/\n?```\s*$/i, '').trim();
}

function isXml(text: string): boolean {
  return text.startsWith('<') && text.endsWith('>');
}

function tryParseXml(text: string): { ok: boolean; root: XmlElement | null; error: string | null } {
  try {
    const root = parseXml(text);
    return { ok: true, root, error: null };
  } catch (e) {
    return { ok: false, root: null, error: String(e) };
  }
}

async function runTest(id: string, phase: string, variant: string, systemPrompt: string, userContent: string): Promise<TestResult> {
  console.log(`\n  ▶ ${id} [${variant}] — prompt: ${systemPrompt.length} chars`);
  const start = Date.now();

  try {
    const { text, latencyMs, tokenEstimate } = await callLLM(systemPrompt, userContent);
    const cleaned = stripFences(text);

    console.log(`    ✓ response: ${cleaned.length} chars, ${latencyMs}ms, ~${tokenEstimate.input}→${tokenEstimate.output} tokens`);
    console.log(`    preview: ${cleaned.slice(0, 120).replace(/\n/g, ' ')}...`);

    const parsed = tryParseXml(cleaned);

    return {
      id, phase, variant,
      promptLength: systemPrompt.length,
      promptPreview: systemPrompt.slice(0, 80).replace(/\n/g, ' '),
      responseRaw: text,
      responseLength: cleaned.length,
      latencyMs,
      parsed: parsed.root ? xmlToObjects(parsed.root) : null,
      parseError: parsed.error,
      validXml: parsed.ok,
      hasPresentationRoot: parsed.root?.tag === 'presentation' || parsed.root?.tag === 'contentBrief',
      tokenEstimate,
    };
  } catch (e) {
    const err = String(e);
    console.log(`    ✗ ERROR: ${err.slice(0, 150)}`);
    return {
      id, phase, variant,
      promptLength: systemPrompt.length,
      promptPreview: systemPrompt.slice(0, 80).replace(/\n/g, ' '),
      responseRaw: '',
      responseLength: 0,
      latencyMs: Date.now() - start,
      parsed: null,
      parseError: err,
      validXml: false,
      hasPresentationRoot: false,
      tokenEstimate: { input: 0, output: 0 },
    };
  }
}

// ─── Main ────────────────────────────────────────────────────────────────────

async function main() {
  const MOCK_ARTICLE = await fetchArticle();

  console.log('═══════════════════════════════════════════════════════════════');
  console.log('  MULTI-PHASE LLM PIPELINE TEST');
  console.log(`  Model: ${MODEL}`);
  console.log(`  Article: ${MOCK_ARTICLE.length} chars`);
  console.log('═══════════════════════════════════════════════════════════════');

  const results: TestResult[] = [];

  // ── TEST 1: Content Extraction (3 variants) ────────────────────────────────
  console.log('\n┌─ TEST 1: Content Extraction ──────────────────────────────┐');

  for (const [key, prompt] of Object.entries(EXTRACTION_PROMPTS)) {
    const result = await runTest(`extract-${key}`, 'extraction', key, prompt.system, MOCK_ARTICLE);
    results.push(result);
  }

  // Show extraction results
  console.log('\n┌─ TEST 1 RESULTS ──────────────────────────────────────────┐');
  for (const r of results) {
    const status = r.validXml ? (r.hasPresentationRoot ? '✓ VALID XML' : '⚠ WRONG ROOT') : `✗ PARSE FAILED: ${r.parseError?.slice(0, 60)}`;
    console.log(`  ${r.variant}: ${status} | ${r.responseLength} chars | ${r.latencyMs}ms`);
  }

  // Pick best extraction for phase 2
  const bestExtraction = results.find(r => r.validXml && r.hasPresentationRoot && r.parseError === null);
  if (!bestExtraction) {
    console.log('\n  ⚠ No valid extraction found. Using first result anyway for phase 2.');
  }

  const bestBriefXml = bestExtraction ? stripFences(bestExtraction.responseRaw) : results[0]?.responseRaw ?? '';

  // ── TEST 2: Single-Slide Generation (3 slide types) ────────────────────────
  console.log('\n┌─ TEST 2: Single-Slide Generation ─────────────────────────┐');

  for (const slideType of ['cover', 'telemetry', 'myth-fact']) {
    const { system, user } = getSlidePrompt(slideType, bestBriefXml);
    const result = await runTest(`slide-${slideType}`, 'single-slide', slideType, system, user);
    results.push(result);
  }

  // ── TEST 3: Monolithic Comparison ───────────────────────────────────────────
  console.log('\n┌─ TEST 3: Monolithic Comparison ────────────────────────────┐');

  const monoPrompt = getMonolithicPrompt(MOCK_ARTICLE);
  const monoResult = await runTest('monolithic', 'monolithic', 'full', monoPrompt, 'Generate the carousel slides.');
  results.push(monoResult);

  // ── FINAL REPORT ────────────────────────────────────────────────────────────
  console.log('\n═══════════════════════════════════════════════════════════════');
  console.log('  FINAL REPORT');
  console.log('═══════════════════════════════════════════════════════════════');

  console.log('\n  Phase         Variant          Valid?    ParseErr?  Chars  Latency  Tokens');
  console.log('  ───────────── ──────────────── ───────── ────────── ────── ──────── ──────');

  for (const r of results) {
    const valid = r.validXml ? '✓ YES' : '✗ NO';
    const err = r.parseError ? r.parseError.slice(0, 20) : 'none';
    const tokens = `${r.tokenEstimate.input}→${r.tokenEstimate.output}`;
    console.log(`  ${r.phase.padEnd(14)} ${r.variant.padEnd(16)} ${valid.padEnd(10)} ${err.padEnd(9)} ${String(r.responseLength).padStart(5)} ${String(r.latencyMs).padStart(7)}ms ${tokens}`);
  }

  // Detailed extraction output
  for (const r of results.filter(r => r.phase === 'extraction' && r.validXml)) {
    console.log(`\n  ── ${r.variant} extraction output ──`);
    console.log(r.responseRaw.slice(0, 800));
    console.log('  ...');
  }

  // Detailed slide output
  for (const r of results.filter(r => r.phase === 'single-slide' && r.validXml)) {
    console.log(`\n  ── ${r.variant} slide output ──`);
    console.log(r.responseRaw.slice(0, 500));
  }

  // Detailed monolithic output
  for (const r of results.filter(r => r.phase === 'monolithic')) {
    console.log(`\n  ── monolithic output ──`);
    if (r.validXml) {
      console.log(r.responseRaw.slice(0, 1000));
      console.log('  ...');
    } else {
      console.log(`  PARSE ERROR: ${r.parseError}`);
      console.log(`  RAW (first 300): ${r.responseRaw.slice(0, 300)}`);
    }
  }

  // Token comparison
  const extractTokens = results.filter(r => r.phase === 'extraction').reduce((s, r) => s + r.tokenEstimate.input + r.tokenEstimate.output, 0);
  const slideTokens = results.filter(r => r.phase === 'single-slide').reduce((s, r) => s + r.tokenEstimate.input + r.tokenEstimate.output, 0);
  const monoTokens = results.filter(r => r.phase === 'monolithic').reduce((s, r) => s + r.tokenEstimate.input + r.tokenEstimate.output, 0);

  console.log('\n  ── Token Comparison ──');
  console.log(`  Multi-phase total (extract + 3 slides): ${extractTokens + slideTokens} tokens`);
  console.log(`  Monolithic total:                        ${monoTokens} tokens`);

  // Validity comparison
  const extractValid = results.filter(r => r.phase === 'extraction' && r.validXml && r.hasPresentationRoot).length;
  const slideValid = results.filter(r => r.phase === 'single-slide' && r.validXml).length;
  const monoValid = results.filter(r => r.phase === 'monolithic' && r.validXml).length;

  console.log('\n  ── Validity ──');
  console.log(`  Extraction: ${extractValid}/${results.filter(r => r.phase === 'extraction').length} valid`);
  console.log(`  Single-slide: ${slideValid}/${results.filter(r => r.phase === 'single-slide').length} valid`);
  console.log(`  Monolithic: ${monoValid}/${results.filter(r => r.phase === 'monolithic').length} valid`);

  // Save full results
  const outPath = new URL('../test-results.json', import.meta.url).pathname;
  await import('node:fs/promises').then(fs => fs.writeFile(outPath, JSON.stringify(results, null, 2)));
  console.log(`\n  Full results saved to test-results.json`);
  console.log('═══════════════════════════════════════════════════════════════\n');
}

main().catch(e => { console.error('FATAL:', e); process.exit(1); });

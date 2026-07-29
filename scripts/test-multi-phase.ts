/**
 * 3-Phase LLM Pipeline Test — V2 (Premium Quality)
 *
 * Phase 1: SUMMARISE — Extract structured content brief with hasRealNumbers flag
 * Phase 2: CONFIGURE — Select template, plan slides, define copy voice
 * Phase 3: GENERATE — Generate all slides with anti-hallucination + copy quality rules
 *
 * Run: pnpm tsx scripts/test-multi-phase.ts
 */

import 'dotenv/config';

const PROVIDER = process.env['LLM_PROVIDER'] ?? 'openrouter';
const API_KEY = process.env['LLM_API_KEY'] ?? '';
const GOOGLE_API_KEY = process.env['LLM_GOOGLE_API_KEY'] ?? '';
const BASE_URL = process.env['LLM_BASE_URL'] ?? 'https://openrouter.ai/api/v1';
const MODEL = process.env['LLM_MODEL'] ?? (PROVIDER === 'google' ? 'gemini-2.5-flash-lite' : 'google/gemma-4-26b-a4b-it:free');
const TIMEOUT_MS = 180_000;

// ─── Types ───────────────────────────────────────────────────────────────────

interface PhaseResult {
  phase: string;
  promptLength: number;
  responseRaw: string;
  responseLength: number;
  latencyMs: number;
  parsed: unknown;
  parseError: string | null;
  validXml: boolean;
  tokenEstimate: { input: number; output: number };
}

interface PipelineResult {
  article: string;
  phase1: PhaseResult;
  phase2: PhaseResult;
  phase3: PhaseResult;
  totalMs: number;
  slidesJson: unknown;
}

// ─── Template Styles (Publication Aesthetics) ────────────────────────────────

const TEMPLATE_STYLES = [
  {
    id: 'paper-of-record',
    name: 'The Paper of Record',
    aesthetics: 'Classic newspaper editorial. Think New York Times, The Guardian longform. Authoritative, serious, investigative.',
  },
  {
    id: 'the-globalist',
    name: 'The Globalist',
    aesthetics: 'Economist/Monocle-style global affairs magazine. Macro-economic, geopolitical, sophisticated.',
  },
  {
    id: 'the-terminal',
    name: 'The Terminal',
    aesthetics: 'Bloomberg Terminal / Financial Times dark mode. Data-driven, market-focused, quantitative.',
  },
  {
    id: 'the-curator',
    name: 'The Curator',
    aesthetics: 'MoMA gallery / avant-garde design publication. Minimal, artistic, conceptual.',
  },
  {
    id: 'the-academic',
    name: 'The Academic',
    aesthetics: 'Harvard Business Review / MIT research paper. Academic, evidence-based, structured.',
  },
];

// ─── LLM Call ────────────────────────────────────────────────────────────────

async function callLLM(systemPrompt: string, userContent: string, retries = 3): Promise<{ text: string; latencyMs: number; tokenEstimate: { input: number; output: number } }> {
  for (let attempt = 0; attempt < retries; attempt++) {
    const start = Date.now();
    try {
      if (PROVIDER === 'google') {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${GOOGLE_API_KEY}`;
        const response = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          signal: AbortSignal.timeout(TIMEOUT_MS),
          body: JSON.stringify({
            system_instruction: { parts: [{ text: systemPrompt }] },
            contents: [{ role: 'user', parts: [{ text: userContent }] }],
            generationConfig: { temperature: 0.7, maxOutputTokens: 8192 },
          }),
        });

        if (!response.ok) {
          const body = await response.text().catch(() => '');
          if ((response.status === 429 || response.status >= 500) && attempt < retries - 1) {
            const delay = 5000 * (attempt + 1);
            console.log(`    ⚠ ${response.status} error, retrying in ${delay / 1000}s...`);
            await new Promise(r => setTimeout(r, delay));
            continue;
          }
          throw new Error(`Google AI ${response.status}: ${body.slice(0, 300)}`);
        }

        const data = (await response.json()) as {
          candidates?: Array<{ content?: { parts?: Array<{ text?: string }> } }>;
          usageMetadata?: { promptTokenCount?: number; candidatesTokenCount?: number };
        };

        const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (!text) {
          if (attempt < retries - 1) {
            await new Promise(r => setTimeout(r, 3000 * (attempt + 1)));
            continue;
          }
          throw new Error(`Empty response`);
        }

        return {
          text,
          latencyMs: Date.now() - start,
          tokenEstimate: {
            input: data.usageMetadata?.promptTokenCount ?? Math.round(systemPrompt.length / 4),
            output: data.usageMetadata?.candidatesTokenCount ?? Math.round(text.length / 4),
          },
        };
      }

      // Default: OpenRouter
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
        if ((response.status === 429 || response.status >= 500) && attempt < retries - 1) {
          const delay = 5000 * (attempt + 1);
          console.log(`    ⚠ ${response.status} error, retrying in ${delay / 1000}s...`);
          await new Promise(r => setTimeout(r, delay));
          continue;
        }
        throw new Error(`OpenRouter ${response.status}: ${body.slice(0, 300)}`);
      }

      const data = (await response.json()) as {
        choices?: Array<{ message: { content: string } }>;
        usage?: { prompt_tokens: number; completion_tokens: number };
      };

      const content = data.choices?.[0]?.message?.content;
      if (!content) {
        if (attempt < retries - 1) {
          await new Promise(r => setTimeout(r, 3000 * (attempt + 1)));
          continue;
        }
        throw new Error(`Empty response`);
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
      if (attempt < retries - 1) {
        await new Promise(r => setTimeout(r, 5000 * (attempt + 1)));
        continue;
      }
      throw e;
    }
  }
  throw new Error('Failed after retries');
}

// ─── XML Parser (inline) ─────────────────────────────────────────────────────

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
  pos++;
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

function stripFences(text: string): string {
  return text.replace(/^```(?:xml)?\s*\n?/i, '').replace(/\n?```\s*$/i, '').trim();
}

function tryParseXml(text: string): { ok: boolean; root: XmlElement | null; error: string | null } {
  try {
    const root = parseXml(text);
    return { ok: true, root, error: null };
  } catch (e) {
    return { ok: false, root: null, error: String(e) };
  }
}

// ─── Article Fetch ───────────────────────────────────────────────────────────

async function fetchArticle(): Promise<string> {
  console.log('  Fetching real article from paulgraham.com...');
  const res = await fetch('https://www.paulgraham.com/startupideas.html');
  const html = await res.text();
  const text = html
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  console.log(`  Article fetched: ${text.length} chars`);
  return text;
}

// ─── Phase 1: Summarise ──────────────────────────────────────────────────────

function getPhase1Prompt(): { system: string; user: string } {
  return {
    system: `You are an expert content analyst. Summarise the article into a structured content brief for a social media carousel.

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
- Return ONLY the XML, no markdown fences, no explanation`,
    user: 'Summarise this article into the structured content brief above.',
  };
}

// ─── Phase 2: Configure ──────────────────────────────────────────────────────

function getPhase2Prompt(briefXml: string): { system: string; user: string } {
  return {
    system: `You are a carousel strategist for a social media platform. Given a content brief, select the best template and design the carousel's narrative arc.

## Content Brief
${briefXml}

## Available Templates

${TEMPLATE_STYLES.map(t => `### ${t.id}
Name: ${t.name}
Aesthetics: ${t.aesthetics}`).join('\n\n')}

## Output Format

Return a single <slideConfig> element:

<slideConfig>
  <templateId>the-template-id</templateId>
  <narrativeArc>Describe the story this carousel tells in 2-3 sentences. What journey does the reader go on?</narrativeArc>
  <slidePlan>
    <slide type="cover" purpose="Hook the reader, set the tone" />
    <slide type="sequence" purpose="Explain the core argument or framework" />
    <slide type="myth-fact" purpose="Challenge a common misconception" />
    <slide type="quote" purpose="The article's most memorable quote" />
    <slide type="cta" purpose="Drive the reader to take action" />
  </slidePlan>
  <slideCount>6</slideCount>
  <copyVoice>
    <rule>HEADLINE = HOOK. You have 0.3 seconds to stop the scroll. Use curiosity gaps and pattern interrupts.</rule>
    <rule>Use POWER WORDS in every headline: Secret, Mistake, Truth, Nobody Tells You, Why, How, Stop, Never, Shocking, Hidden, Reverse</rule>
    <rule>Max 5 words per line. No sentences. Fragments only.</rule>
    <rule>Active voice only. No passive constructions.</rule>
    <rule>Contractions mandatory (you're, don't, can't) — sounds human, not corporate.</rule>
    <rule>Use "YOU" language. Make it personal.</rule>
    <rule>End EVERY slide with emotional punch, not information.</rule>
    <rule>Write like you're talking to a friend, not writing a report.</rule>
  </copyVoice>
</slideConfig>

## Rules
1. Choose the template that best fits the article's topic and tone.
2. Plan 5-7 slides. Start with cover, end with CTA. Vary types.
3. If hasRealNumbers="false", do NOT include telemetry. Use sequence, quote, myth-fact instead.
4. narrativeArc: Tell me the STORY, not a list. "The reader opens with X, discovers Y, is challenged by Z, and leaves with W."
5. copyVoice: These are the COPYWRITING rules for all slides. Every slide must follow these rules.
6. Return ONLY the XML, no markdown fences, no explanation.`,
    user: 'Design the carousel configuration for this content brief.',
  };
}

// ─── Phase 3: Generate ───────────────────────────────────────────────────────

function getPhase3Prompt(briefXml: string, configXml: string, templateAesthetics: string): { system: string; user: string } {
  return {
    system: `You are a social media carousel designer. Generate a complete carousel of slides for a social media post.

## Template Aesthetics
${templateAesthetics}

## Carousel Configuration
${configXml}

## Content Brief
${briefXml}

## Output Format

Return a single <presentation> element containing all slides.

## Slide Type Constraints

cover: id, tag?, headline (max 40), subheadline (max 80), authorName?, authorRole?, footerLeft?, footerRight?
sequence: id, tag?, headline (max 40), items (array of {num, title (max 20), desc (max 60)}), footerLeft?, footerRight?
myth-fact: id, tag?, headline (max 40), myth (max 100), fact (max 100), footerLeft?, footerRight?
quote: id, tag?, quote (max 500), author?, role?, footerLeft?, footerRight?
cta: id, tag?, headline (max 40), subtext (max 80), actionLabel?, socialHandle?, footerLeft?, footerRight?

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

## PREMIUM COPYWRITING RULES (this is what makes posts go viral)

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
  <rule>Use numbers and specifics when possible. "7 ways" > "several ways". "3 minutes" > "a few minutes"</rule>
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

  BAD: "Prioritize narrow, deep market penetration over broad, shallow initiatives to ensure product-market fit."
  GOOD: "Go narrow and deep. Not wide and shallow."
  GREAT: "Go deep, not wide. That's how you win."

  BAD: "Avoid markets that are crowded."
  GOOD: "Crowds prove demand."
  GREAT: "Everyone avoids competition. That's the mistake."

  BAD: "Write it down today. Start building your solution now."
  GOOD: "Drop your problem in the comments."
  GREAT: "Comment your biggest frustration. Let's solve it together."
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
  - myth="Brainstorming works." fact="Brainstorming produces garbage. Observation produces gold."

### Quote slides:
- Use the EXACT quote text from the brief
- Keep the full quote, even if long

### CTA slides (DRIVE ENGAGEMENT):
- headline: max 6 words. Action-oriented. Create urgency.
- subtext: max 12 words. Tell them EXACTLY what to do. Make it easy.
- Examples:
  - headline="Your turn" subtext="Comment your biggest frustration. Let's solve it."
  - headline="Try this now" subtext="Spend 2 minutes writing down your problems."
  - headline="What's your take?" subtext="Drop your answer below. I read every comment."

### Footer convention:
- footerLeft: short category label (e.g., "INSIGHT", "RESEARCH", "METHODOLOGY")
- footerRight: "PAGE 01", "PAGE 02", etc. (sequential)

## RULES
- Return ONLY the XML <presentation> element. No markdown fences, no explanation.
- Generate ALL slides in order as specified in the slidePlan.
- Use ONLY data from the content brief. Do NOT invent facts, statistics, or quotes.
- Respect character limits exactly.
- Self-closing tags for simple elements: <item ... />`,
    user: 'Generate all slides for this carousel.',
  };
}

// ─── Main ────────────────────────────────────────────────────────────────────

async function main() {
  const article = await fetchArticle();

  console.log('');
  console.log('═══════════════════════════════════════════════════════════════');
  console.log('  3-PHASE PIPELINE TEST — V2 (Premium Quality)');
  console.log(`  Provider: ${PROVIDER} | Model: ${MODEL}`);
  console.log(`  Article: ${article.length} chars`);
  console.log('═══════════════════════════════════════════════════════════════');

  const totalStart = Date.now();

  // ── PHASE 1: Summarise ──────────────────────────────────────────────────────
  console.log('\n┌─ PHASE 1: SUMMARISE ──────────────────────────────────────┐');

  const { system: p1System, user: p1User } = getPhase1Prompt();
  console.log(`  ▶ Prompt: ${p1System.length} chars`);
  const p1Start = Date.now();
  const p1Raw = await callLLM(p1System, article);
  const p1Cleaned = stripFences(p1Raw.text);
  const p1Parsed = tryParseXml(p1Cleaned);

  console.log(`  ✓ Response: ${p1Cleaned.length} chars, ${p1Raw.latencyMs}ms`);
  console.log(`  ✓ Parsed: ${p1Parsed.ok ? 'valid XML' : 'PARSE ERROR: ' + p1Parsed.error}`);

  // Check hasRealNumbers
  const hasRealNumbers = p1Cleaned.includes('<hasRealNumbers>true</hasRealNumbers>');
  console.log(`  ✓ hasRealNumbers: ${hasRealNumbers}`);

  const phase1: PhaseResult = {
    phase: 'summarise',
    promptLength: p1System.length,
    responseRaw: p1Raw.text,
    responseLength: p1Cleaned.length,
    latencyMs: p1Raw.latencyMs,
    parsed: p1Parsed.root ? xmlToObjects(p1Parsed.root) : null,
    parseError: p1Parsed.error,
    validXml: p1Parsed.ok,
    tokenEstimate: p1Raw.tokenEstimate,
  };

  // ── PHASE 2: Configure ──────────────────────────────────────────────────────
  console.log('\n┌─ PHASE 2: CONFIGURE ──────────────────────────────────────┐');

  const { system: p2System, user: p2User } = getPhase2Prompt(p1Cleaned);
  console.log(`  ▶ Prompt: ${p2System.length} chars`);
  const p2Raw = await callLLM(p2System, p2User);
  const p2Cleaned = stripFences(p2Raw.text);
  const p2Parsed = tryParseXml(p2Cleaned);

  console.log(`  ✓ Response: ${p2Cleaned.length} chars, ${p2Raw.latencyMs}ms`);
  console.log(`  ✓ Parsed: ${p2Parsed.ok ? 'valid XML' : 'PARSE ERROR: ' + p2Parsed.error}`);

  // Extract config details
  const configObj = p2Parsed.ok && p2Parsed.root ? xmlToObjects(p2Parsed.root) as Record<string, unknown> : null;
  if (configObj) {
    console.log(`  Template: ${configObj['templateId'] ?? 'unknown'}`);
    console.log(`  Slides: ${configObj['slideCount'] ?? 'unknown'}`);
    if (typeof configObj['narrativeArc'] === 'string') {
      console.log(`  Narrative: ${configObj['narrativeArc'].slice(0, 120)}...`);
    }
  }

  // Find the template aesthetics for Phase 3
  const selectedTemplateId = (configObj?.['templateId'] as string) ?? 'the-terminal';
  const selectedTemplate = TEMPLATE_STYLES.find(t => t.id === selectedTemplateId) ?? TEMPLATE_STYLES[2]!;
  console.log(`  Using template: ${selectedTemplate.name}`);

  const phase2: PhaseResult = {
    phase: 'configure',
    promptLength: p2System.length,
    responseRaw: p2Raw.text,
    responseLength: p2Cleaned.length,
    latencyMs: p2Raw.latencyMs,
    parsed: p2Parsed.root ? xmlToObjects(p2Parsed.root) : null,
    parseError: p2Parsed.error,
    validXml: p2Parsed.ok,
    tokenEstimate: p2Raw.tokenEstimate,
  };

  // ── PHASE 3: Generate ───────────────────────────────────────────────────────
  console.log('\n┌─ PHASE 3: GENERATE ──────────────────────────────────────┐');

  const { system: p3System, user: p3User } = getPhase3Prompt(p1Cleaned, p2Cleaned, selectedTemplate.aesthetics);
  console.log(`  ▶ Prompt: ${p3System.length} chars`);
  const p3Raw = await callLLM(p3System, p3User);
  const p3Cleaned = stripFences(p3Raw.text);
  const p3Parsed = tryParseXml(p3Cleaned);

  console.log(`  ✓ Response: ${p3Cleaned.length} chars, ${p3Raw.latencyMs}ms`);
  console.log(`  ✓ Parsed: ${p3Parsed.ok ? 'valid XML' : 'PARSE ERROR: ' + p3Parsed.error}`);

  // Count slides
  if (p3Parsed.ok && p3Parsed.root) {
    const slideCount = p3Parsed.root.children.filter(c => c.tag === 'slide').length;
    console.log(`  Slides generated: ${slideCount}`);
  }

  const phase3: PhaseResult = {
    phase: 'generate',
    promptLength: p3System.length,
    responseRaw: p3Raw.text,
    responseLength: p3Cleaned.length,
    latencyMs: p3Raw.latencyMs,
    parsed: p3Parsed.root ? xmlToObjects(p3Parsed.root) : null,
    parseError: p3Parsed.error,
    validXml: p3Parsed.ok,
    tokenEstimate: p3Raw.tokenEstimate,
  };

  const totalMs = Date.now() - totalStart;

  // ── REPORT ──────────────────────────────────────────────────────────────────
  console.log('\n═══════════════════════════════════════════════════════════════');
  console.log('  PIPELINE RESULTS');
  console.log('═══════════════════════════════════════════════════════════════');

  console.log('\n  Phase         Valid?    Chars   Latency  Tokens');
  console.log('  ───────────── ───────── ─────── ──────── ─────────────');

  for (const r of [phase1, phase2, phase3]) {
    const valid = r.validXml ? '✓ YES' : '✗ NO';
    const tokens = `${r.tokenEstimate.input}→${r.tokenEstimate.output}`;
    console.log(`  ${r.phase.padEnd(14)} ${valid.padEnd(10)} ${String(r.responseLength).padStart(6)} ${String(r.latencyMs).padStart(7)}ms ${tokens}`);
  }

  const totalTokens = phase1.tokenEstimate.input + phase1.tokenEstimate.output +
    phase2.tokenEstimate.input + phase2.tokenEstimate.output +
    phase3.tokenEstimate.input + phase3.tokenEstimate.output;

  console.log(`\n  Total: ${totalMs}ms, ~${totalTokens} tokens`);

  // ── DETAILED OUTPUT ─────────────────────────────────────────────────────────

  console.log('\n  ── Phase 1: Content Brief ──');
  console.log(p1Cleaned.slice(0, 800));
  console.log('  ...');

  console.log('\n  ── Phase 2: Configuration ──');
  console.log(p2Cleaned.slice(0, 800));
  console.log('  ...');

  console.log('\n  ── Phase 3: Slides ──');
  console.log(p3Cleaned.slice(0, 1500));
  console.log('  ...');

  // ── SAVE ────────────────────────────────────────────────────────────────────

  const result: PipelineResult = {
    article: article.slice(0, 200) + '...',
    phase1,
    phase2,
    phase3,
    totalMs,
    slidesJson: phase3.parsed,
  };

  const outPath = new URL('../test-3phase-output.json', import.meta.url).pathname;
  await import('node:fs/promises').then(fs => fs.writeFile(outPath, JSON.stringify(result, null, 2)));
  console.log(`\n  Full results saved to test-3phase-output.json`);

  // Save slides-only for easy review
  const slidesOnly = phase3.parsed;
  const slidesPath = new URL('../test-slides-output.json', import.meta.url).pathname;
  await import('node:fs/promises').then(fs => fs.writeFile(slidesPath, JSON.stringify(slidesOnly, null, 2)));
  console.log(`  Slides JSON saved to test-slides-output.json`);

  console.log('═══════════════════════════════════════════════════════════════\n');
}

main().catch(e => { console.error('FATAL:', e); process.exit(1); });

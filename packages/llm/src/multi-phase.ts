import { z } from 'zod';
import { parseXml } from './xml-parser.js';

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

// ─── Phase 2: Configure ──────────────────────────────────────────────────────

const TEMPLATE_STYLES = [
  { id: 'paper-of-record', name: 'The Paper of Record', aesthetics: 'Classic newspaper editorial. Think New York Times, The Guardian longform. Authoritative, serious, investigative.' },
  { id: 'the-globalist', name: 'The Globalist', aesthetics: 'Economist/Monocle-style global affairs magazine. Macro-economic, geopolitical, sophisticated.' },
  { id: 'the-terminal', name: 'The Terminal', aesthetics: 'Bloomberg Terminal / Financial Times dark mode. Data-driven, market-focused, quantitative.' },
  { id: 'the-curator', name: 'The Curator', aesthetics: 'MoMA gallery / avant-garde design publication. Minimal, artistic, conceptual.' },
  { id: 'the-academic', name: 'The Academic', aesthetics: 'Harvard Business Review / MIT research paper. Academic, evidence-based, structured.' },
];

function getConfigPrompt(briefXml: string, brandKit?: Record<string, string | undefined>): { system: string; user: string } {
  return {
    system: `You are a carousel strategist for a social media platform. Given a content brief, select the best template and design the carousel's narrative arc.

## Content Brief
${briefXml}

## Brand Kit
${brandKit ? `Background: ${brandKit.bg ?? 'not set'}
Text: ${brandKit.text ?? 'not set'}
Accent: ${brandKit.accent ?? 'not set'}
Font: ${brandKit.fontSerif ?? brandKit.fontSans ?? brandKit.fontMono ?? 'not set'}` : 'Use default brand colors for the selected template.'}

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

function getGeneratePrompt(briefXml: string, configXml: string, templateAesthetics: string): { system: string; user: string } {
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

### Sequence slides (MAKE IT SCANNABLE):
- item titles: max 5 words. Use power words.
- item descriptions: max 12 words. Punchy. No fluff.

### Myth-fact slides (SHOCK VALUE):
- myth: max 12 words. Something EVERYONE believes.
- fact: max 12 words. Sharp, surprising, contrarian.

### Quote slides:
- Use the EXACT quote text from the brief
- Keep the full quote, even if long

### CTA slides (DRIVE ENGAGEMENT):
- headline: max 6 words. Action-oriented. Create urgency.
- subtext: max 12 words. Tell them EXACTLY what to do. Make it easy.

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
  configXml: string;
  rawGenerationXml: string;
  extractionLatencyMs: number;
  configLatencyMs: number;
  generationLatencyMs: number;
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
    brandKit?: Record<string, string | undefined>;
    onProgress?: (phase: string, detail: string) => void;
    onDebug?: (filename: string, content: string) => void;
  },
): Promise<MultiPhaseResult> {
  const { llm, onProgress, onDebug, brandKit } = options;
  const totalStart = Date.now();

  // ── PHASE 1: Summarise ──────────────────────────────────────────────────────
  onProgress?.('extraction', 'Phase 1: Extracting content brief...');
  onDebug?.('01-prompt-phase1-extraction.md', `## System\n\n${EXTRACTION_PROMPT}\n\n## User\n\n${rawText}`);

  const phase1Start = Date.now();
  const briefRaw = await llm.generateJSON(EXTRACTION_PROMPT, rawText);
  const briefXml = stripFences(briefRaw);
  const extractionLatencyMs = Date.now() - phase1Start;

  onProgress?.('extraction', `Phase 1 complete: ${extractionLatencyMs}ms`);

  // ── PHASE 2: Configure ──────────────────────────────────────────────────────
  onProgress?.('config', 'Phase 2: Designing carousel configuration...');

  const phase2Start = Date.now();
  const { system: configSystem, user: configUser } = getConfigPrompt(briefXml, brandKit);
  onDebug?.('02-prompt-phase2-config.md', `## System\n\n${configSystem}\n\n## User\n\n${configUser}`);
  const configRaw = await llm.generateJSON(configSystem, configUser);
  const configXml = stripFences(configRaw);
  const configLatencyMs = Date.now() - phase2Start;

  onProgress?.('config', `Phase 2 complete: ${configLatencyMs}ms`);

  // Parse config to get template and slide plan
  let templateId = 'the-terminal';
  let slidePlan: string[] = [];
  try {
    const configObj = xmlToObjects(parseXml(configXml)) as Record<string, unknown>;
    templateId = (configObj['templateId'] as string) ?? 'the-terminal';
    const plan = configObj['slidePlan'] as Record<string, unknown>;
    if (plan && typeof plan === 'object') {
      const slides = plan['slide'] as Array<Record<string, string>> | Record<string, string>;
      if (Array.isArray(slides)) {
        slidePlan = slides.map(s => s['type'] ?? 'sequence');
      } else if (slides && slides['type']) {
        slidePlan = [slides['type']];
      }
    }
  } catch {
    // Fallback plan
    slidePlan = ['cover', 'sequence', 'myth-fact', 'quote', 'cta'];
  }

  if (slidePlan.length === 0) {
    slidePlan = ['cover', 'sequence', 'myth-fact', 'quote', 'cta'];
  }

  const templateStyle = TEMPLATE_STYLES.find(t => t.id === templateId) ?? TEMPLATE_STYLES[2]!;
  onProgress?.('config', `Template: ${templateStyle.name}, Slides: ${slidePlan.join(', ')}`);

  // ── PHASE 3: Generate ───────────────────────────────────────────────────────
  onProgress?.('generation', 'Phase 3: Generating all slides...');

  const phase3Start = Date.now();
  const { system: genSystem, user: genUser } = getGeneratePrompt(briefXml, configXml, templateStyle.aesthetics);
  onDebug?.('03-prompt-phase3-generate.md', `## System\n\n${genSystem}\n\n## User\n\n${genUser}`);
  const genRaw = await llm.generateJSON(genSystem, genUser);
  const genCleaned = stripFences(genRaw);
  const generationLatencyMs = Date.now() - phase3Start;

  onProgress?.('generation', `Phase 3 complete: ${generationLatencyMs}ms`);

  // Parse all slides
  const slides: Record<string, unknown>[] = [];
  try {
    const root = parseXml(genCleaned);
    const rootObj = xmlToObjects(root) as Record<string, unknown>;
    const slideData = rootObj['slide'];

    if (Array.isArray(slideData)) {
      for (const s of slideData) {
        const slide = unwrapChildWrappers(s as Record<string, unknown>);
        slides.push(slide);
      }
    } else if (slideData && typeof slideData === 'object') {
      slides.push(unwrapChildWrappers(slideData as Record<string, unknown>));
    }
  } catch {
    onProgress?.('generation', 'Parse failed, using fallback slides');
    for (let i = 0; i < slidePlan.length; i++) {
      slides.push(createFallbackSlide(slidePlan[i]!, i + 1));
    }
  }

  // Ensure IDs
  for (let i = 0; i < slides.length; i++) {
    slides[i]!['id'] = `slide-${String(i + 1).padStart(2, '0')}`;
  }

  const totalLatencyMs = Date.now() - totalStart;
  onProgress?.('complete', `Total: ${totalLatencyMs}ms, ${slides.length} slides`);

  return {
    slides,
    briefXml,
    configXml,
    rawGenerationXml: genCleaned,
    extractionLatencyMs,
    configLatencyMs,
    generationLatencyMs,
    totalLatencyMs,
    totalTokens: { input: 0, output: 0 },
    slidePlan,
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

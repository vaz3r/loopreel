import { parseXml } from './xml-parser.js';

// ─── Types ──────────────────────────────────────────────────────────────────

export interface TemplateInfo {
  id: string;
  name: string;
  aesthetics: string;
  schemaText: string; // introspectSchema output — full slide type/field constraints
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

Supported slide types and their fields:
${t.schemaText}`).join('\n\n---\n\n');

  return {
    system: `You are a carousel strategist selecting the best template for a social media carousel.

## Content Brief
${briefXml}

## Available Templates

Each template below includes its name, visual aesthetics, and the FULL schema of supported slide types with all field constraints.

${templateSections}

## Task

1. Read the content brief carefully.
2. Review each template's supported slide types and their field constraints.
3. Choose the template whose slide types best match the content's needs (e.g., if the content has data/numbers, prefer a template with telemetry. If it has contrasting ideas, prefer one with dichotomy or myth-fact. If it has quotes, ensure the template supports quote slides).
4. Write a brief rationale explaining WHY this template is the best fit.

## Output Format

Return a single <templateSelection> element:

<templateSelection>
  <templateId>the-selected-template-id</templateId>
  <rationale>Why this template is the best fit for this content. Reference specific slide types from the template's schema that will be useful.</rationale>
</templateSelection>

## Rules
- Pick exactly ONE template.
- The rationale must reference actual slide types from the selected template's schema.
- If the content has hard statistics, prefer templates with telemetry slide type.
- If the content has contrasting ideas or myths, prefer templates with dichotomy or myth-fact.
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
): { system: string; user: string } {
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

## Task

Plan 5-7 slides. For each slide, choose a type from the supported list above and describe what content goes in it.

## Output Format

Return a single <slidePlan> element:

<slidePlan>
  <narrativeArc>Describe the story this carousel tells in 2-3 sentences. What journey does the reader go on?</narrativeArc>
  <slide type="cover" purpose="What this slide communicates — be specific about the headline hook" />
  <slide type="sequence" purpose="What framework or list this presents — list the actual items" />
  <slide type="myth-fact" purpose="What misconception this challenges — state the myth and fact" />
  <slide type="quote" purpose="Which quote from the brief — include the attribution" />
  <slide type="cta" purpose="What action the reader should take" />
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
</slidePlan>

## Rules
1. Use ONLY slide types from the supported list above. Do NOT invent new types.
2. Start with a cover slide. End with a CTA slide.
3. Vary slide types — never repeat the same type twice in a row.
4. If hasRealNumbers="false" in the brief, do NOT use telemetry. Use sequence, quote, or myth-fact instead.
5. Each slide's purpose must be SPECIFIC — reference actual content from the brief, not generic descriptions.
6. narrativeArc: Tell me the STORY, not a list. "The reader opens with X, discovers Y, is challenged by Z, and leaves with W."
7. Return ONLY the XML, no markdown fences, no explanation.`,
    user: 'Plan the slides for this carousel.',
  };
}

// ─── Phase 4: Generate Content ───────────────────────────────────────────────

function getGeneratePrompt(
  briefXml: string,
  planXml: string,
  selectedTemplate: TemplateInfo,
): { system: string; user: string } {
  return {
    system: `You are a social media carousel designer. Generate a complete carousel of slides.

## Template: ${selectedTemplate.name}
Aesthetics: ${selectedTemplate.aesthetics}

## Slide Plan
${planXml}

## Content Brief
${briefXml}

## Slide Type Constraints (EXACT — you MUST follow these)

${selectedTemplate.schemaText}

## Output Format

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

## RULES
- Return ONLY the XML <presentation> element. No markdown fences, no explanation.
- Generate ALL slides in order as specified in the slidePlan.
- Use ONLY data from the content brief. Do NOT invent facts, statistics, or quotes.
- Respect ALL field constraints (character limits, required fields, array sizes) exactly.
- Self-closing tags for simple elements: <item ... />
- Every slide MUST have: id, type, tag, footerLeft, footerRight.
- footerRight: "PAGE 01", "PAGE 02", etc. (sequential)`,
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
}

export async function generateSlidesMultiPhase(
  rawText: string,
  templates: TemplateInfo[],
  options: {
    llm: { generateJSON(system: string, user: string): Promise<string> };
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
  onDebug?.('05-phase1-brief.xml', briefXml);

  // ── PHASE 2: Select Template ────────────────────────────────────────────────
  onProgress?.('selection', 'Phase 2: Selecting best template...');

  const phase2Start = Date.now();
  const { system: selSystem, user: selUser } = getTemplateSelectionPrompt(briefXml, templates);
  onDebug?.('02-prompt-phase2-select-template.md', `## System\n\n${selSystem}\n\n## User\n\n${selUser}`);
  const selRaw = await llm.generateJSON(selSystem, selUser);
  const selectionXml = stripFences(selRaw);
  const selectionLatencyMs = Date.now() - phase2Start;

  onProgress?.('selection', `Phase 2 complete: ${selectionLatencyMs}ms`);
  onDebug?.('06-phase2-selection.xml', selectionXml);

  // Parse selection to get template ID
  let selectedTemplateId = templates[0]!.id;
  try {
    const selObj = xmlToObjects(parseXml(selectionXml)) as Record<string, unknown>;
    selectedTemplateId = (selObj['templateId'] as string) ?? templates[0]!.id;
  } catch {
    // Fallback to first template
  }

  const selectedTemplate = templates.find(t => t.id === selectedTemplateId) ?? templates[0]!;
  onProgress?.('selection', `Selected: ${selectedTemplate.name}`);

  // ── PHASE 3: Plan Slides ────────────────────────────────────────────────────
  onProgress?.('plan', 'Phase 3: Planning slide sequence...');

  const phase3Start = Date.now();
  const { system: planSystem, user: planUser } = getSlidePlanPrompt(briefXml, selectedTemplate, brandKit);
  onDebug?.('03-prompt-phase3-plan-slides.md', `## System\n\n${planSystem}\n\n## User\n\n${planUser}`);
  const planRaw = await llm.generateJSON(planSystem, planUser);
  const planXml = stripFences(planRaw);
  const planLatencyMs = Date.now() - phase3Start;

  onProgress?.('plan', `Phase 3 complete: ${planLatencyMs}ms`);
  onDebug?.('07-phase3-plan.xml', planXml);

  // Parse plan to get slide types
  let slidePlan: string[] = [];
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

  onProgress?.('plan', `Slides: ${slidePlan.join(', ')}`);

  // ── PHASE 4: Generate Content ───────────────────────────────────────────────
  onProgress?.('generation', 'Phase 4: Generating slide content...');

  const phase4Start = Date.now();
  const { system: genSystem, user: genUser } = getGeneratePrompt(briefXml, planXml, selectedTemplate);
  onDebug?.('04-prompt-phase4-generate.md', `## System\n\n${genSystem}\n\n## User\n\n${genUser}`);
  const genRaw = await llm.generateJSON(genSystem, genUser);
  const genCleaned = stripFences(genRaw);
  const generationLatencyMs = Date.now() - phase4Start;

  onProgress?.('generation', `Phase 4 complete: ${generationLatencyMs}ms`);
  onDebug?.('08-phase4-slides.xml', genCleaned);

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
    selectionXml,
    planXml,
    rawGenerationXml: genCleaned,
    extractionLatencyMs,
    selectionLatencyMs,
    planLatencyMs,
    generationLatencyMs,
    totalLatencyMs,
    totalTokens: { input: 0, output: 0 },
    selectedTemplateId: selectedTemplate.id,
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

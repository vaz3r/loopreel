import { parseXml } from '../xml-parser.js';
import type { BrainResult, BrainOptions, DomainExamples, TemplateInfo } from './types.js';
import { createUsageTracker, withPhaseRetry, RETRY_BUDGETS } from './retry.js';
import { getDomainFewShot } from './few-shot.js';
import { loadAllDomains, classifyDomainPrompt, parseDomainClassification } from './domain-classification.js';
import { stripFences, unwrapChildWrappers, createFallbackSlide, xmlToObjects } from './xml-helpers.js';
import { renderPrompt } from './prompts/loader.js';

const SLIDE_TYPE_RULES = [
  { type: 'cover', rule: '- MUST hook the reader in the first 3 words\n- Choose ONE of these approaches (do NOT default to the same one every time):\n- APPROACH A: Lead with the most shocking number or fact from the brief\n- APPROACH B: Ask a question the reader is already thinking\n- APPROACH C: Lead with the human impact — who is affected, what they lost\n- APPROACH D: Lead with the unexpected — what nobody anticipated\n- NEVER start with the same word as the previous carousel cover. NEVER use "13" as the first word more than once per batch.' },
  { type: 'telemetry', rule: '- MUST include at least one number from the stats in the headline\n- PATTERN A: "[Number] [Unit]. [Number] [Unit]." — two data points contrasted\n- PATTERN B: "[Number] [Unit]. [What it means for you]."\n- PATTERN C: "The [Noun]: [Number]."\n- PATTERN D: "[Number] [Unit] — and [something unexpected]."\n- VARY your pattern. Do NOT copy the few-shot telemetry headline.' },
  { type: 'sequence', rule: '- MUST tell a story or reveal progression\n- PATTERN A: "[Timeframe]: What Changed"\n- PATTERN B: "What We Know (and What We Don\'t)"\n- PATTERN C: "[Number] Things That Happened While You Slept"\n- PATTERN D: "From [X] to [Y]: The Timeline"\n- VARY your pattern. Make the headline specific to the content, not generic.' },
  { type: 'myth-fact', rule: '- MUST contrast myth vs fact — check brief\'s counterpoint section\n- PATTERN A: "[Common belief]. [What evidence shows]."\n- PATTERN B: "[Myth]. [Truth]."\n- PATTERN C: "The [assumption] everyone made — Except [reality]"\n- PATTERN D: "[Fact]. Not [myth]."\n- VARY your pattern. Frame myths as assumptions, not lies.' },
  { type: 'quote', rule: '- Headline is optional — the quote IS the content\n- PATTERN A: [Evocative tagline]\n- PATTERN B: [What They Said]\n- PATTERN C: [Person]: [Key phrase from quote]\n- VARY your pattern.' },
  { type: 'cta', rule: '- MUST connect the content to the reader\'s life\n- PATTERN A: "[Question that makes it personal]."\n- PATTERN B: "[Action they can take]. [Why it matters]."\n- PATTERN C: "[What\'s at stake if they ignore this]."\n- PATTERN D: "[Number] reasons to [take action]"\n- VARY your pattern. Make it about THEM, not about following you.' },
  { type: 'timeline', rule: '- MUST show progression or sequence of events\n- PATTERN A: "[Time period]. [What changed]."\n- PATTERN B: "From [X] to [Y]"\n- PATTERN C: "[Timeframe]: [Turning point]"\n- VARY your pattern.' },
  { type: 'analysis', rule: '- MUST present insight or interpretation of data\n- PATTERN A: "What [Data] Actually Means"\n- PATTERN B: "[Data]. Here\'s Why It Matters."\n- PATTERN C: "The [Noun] Behind [Data]"\n- VARY your pattern.' },
  { type: 'definition', rule: '- MUST explain a concept clearly\n- PATTERN A: "[Concept]: [Plain English explanation]"\n- PATTERN B: "What [Concept] Really Means for You"\n- VARY your pattern.' },
  { type: 'dichotomy', rule: '- MUST contrast two opposing ideas\n- left and right MUST be objects with {title, desc} — NOT strings\n- PATTERN A: "[X] vs [Y]. [Stakes]."\n- PATTERN B: "[X] or [Y]. [Consequence]."\n- VARY your pattern.' },
  { type: 'table', rule: '- MUST compare data across categories\n- PATTERN A: "[Comparison]: [Winner/Loser]"\n- PATTERN B: "[Topic]: The Numbers Tell a Different Story"\n- VARY your pattern.' },
  { type: 'profile', rule: '- MUST humanize a person or entity\n- PATTERN A: "[Person]. [What They Did]."\n- PATTERN B: "[Person]: [Their Quote]"\n- VARY your pattern.' },
  { type: 'image-split', rule: '- MUST use visual contrast or juxtaposition\n- PATTERN A: "[Left Side] vs [Right Side]"\n- VARY your pattern.' },
  { type: 'breakdown', rule: '- MUST decompose a complex topic\n- PATTERN A: "[Topic]: [Number] Parts"\n- PATTERN B: "Breaking Down [Topic]"\n- VARY your pattern.' },
  { type: 'juxtaposition', rule: '- MUST contrast two related things\n- PATTERN A: "[Thing A]. [Thing B]. [Insight]."\n- VARY your pattern.' },
  { type: 'methodology', rule: '- MUST explain a process or approach\n- PATTERN A: "How [Entity] [Did X]"\n- VARY your pattern.' },
  { type: 'hero-metric', rule: '- MUST highlight a single key number\n- PATTERN A: "[Number]. [Context]."\n- PATTERN B: "The Number That Changes Everything: [Number]"\n- VARY your pattern.' },
  { type: 'checklist', rule: '- MUST provide actionable steps\n- PATTERN A: "[Number] Steps to [Outcome]"\n- PATTERN B: "What to Do Right Now"\n- VARY your pattern.' },
  { type: 'quadrant', rule: '- MUST categorize or map concepts\n- PATTERN A: "[Category]: [Key Insight]"\n- VARY your pattern.' },
  { type: 'case-study', rule: '- MUST tell a story with outcome\n- PATTERN A: "[Entity] Tried [X]. What Happened."\n- VARY your pattern.' },
  { type: 'resource-grid', rule: '- MUST provide multiple resources or references\n- PATTERN A: "[Number] Resources for [Outcome]"\n- VARY your pattern.' },
  { type: 'interview', rule: '- MUST feature Q&A format\n- PATTERN A: "Q: [Question]" / "A: [Key Answer]"\n- VARY your pattern.' },
];

function buildSlidePlanPrompt(
  briefXml: string,
  selectedTemplate: TemplateInfo,
  brandKit?: Record<string, string | undefined>,
  domainExamples?: DomainExamples,
): { system: string; user: string } {
  const brandKitData = brandKit ? {
    bg: brandKit.bg ?? 'not set',
    text: brandKit.text ?? 'not set',
    accent: brandKit.accent ?? 'not set',
    font: brandKit.fontSerif ?? brandKit.fontSans ?? brandKit.fontMono ?? 'not set',
  } : null;

  let domainPrinciples = '';
  let domainName = '';
  if (domainExamples && domainExamples.principles.length > 0) {
    domainPrinciples = domainExamples.principles.map(p => `- ${p}`).join('\n');
    domainName = domainExamples.name;
  }

  const system = renderPrompt('slide-planning', {
    briefXml,
    templateName: selectedTemplate.name,
    templateAesthetics: selectedTemplate.aesthetics,
    schemaText: selectedTemplate.schemaText,
    brandKit: brandKitData,
    domainPrinciples,
    domainName,
  });

  return { system, user: 'Plan the slides for this carousel.' };
}

function buildGeneratePrompt(
  briefXml: string,
  planXml: string,
  selectedTemplate: TemplateInfo,
  slidePlan: string[],
  domainExamples?: DomainExamples,
): { system: string; user: string } {
  const selectedTypes = new Set(slidePlan);
  const filteredSchema = selectedTemplate.schemaTextConcise
    .split('\n')
    .filter(line => {
      const typeName = line.split(':')[0]?.trim();
      return typeName && selectedTypes.has(typeName);
    })
    .join('\n');

  const slideTypeRules = SLIDE_TYPE_RULES
    .filter(rule => selectedTypes.has(rule.type))
    .map(rule => `### ${rule.type.charAt(0).toUpperCase() + rule.type.slice(1)}\n${rule.rule}`)
    .join('\n\n');

  let domainPrinciples = '';
  let domainName = '';
  let domainPowerWords = '';
  if (domainExamples && domainExamples.principles.length > 0) {
    domainPrinciples = domainExamples.principles.map(p => `- ${p}`).join('\n');
    domainName = domainExamples.name;
    domainPowerWords = domainExamples.powerWords.join(', ');
  }

  const system = renderPrompt('content-generation', {
    templateName: selectedTemplate.name,
    templateAesthetics: selectedTemplate.aesthetics,
    fewShot: getDomainFewShot(domainExamples),
    planXml,
    briefXml,
    filteredSchema,
    slideTypeRules,
    domainPrinciples,
    domainName,
    domainPowerWords,
  });

  return { system, user: 'Generate all slides for this carousel.' };
}

function buildLabelDetectionPrompt(slides: Record<string, unknown>[]): { system: string; user: string } {
  const headlineList = slides
    .filter(s => s['headline'])
    .map(s => `[${s['id']}] ${s['headline']}`)
    .join('\n');

  const system = renderPrompt('label-detection', {});
  return { system, user: `Classify these headlines:\n${headlineList}` };
}

function buildRetryPrompt(
  labelResult: { id: string; headline: string; fix: string },
  slides: Record<string, unknown>[],
  briefXml: string,
  domainId: string,
): { system: string; user: string } {
  const slide = slides.find(s => s['id'] === labelResult.id);
  const slideXml = slide ? require('./xml-helpers.js').objectToXml(slide) : `<slide type="cover" id="${labelResult.id}" headline="${labelResult.headline}" />`;

  const system = renderPrompt('label-retry', {
    fixSuggestion: labelResult.fix || null,
  });

  return {
    system,
    user: `Fix this slide:\n\nOriginal:\n${slideXml}\n\nDomain: ${domainId}\n\nContent brief excerpt:\n${briefXml.slice(0, 1000)}`,
  };
}

function buildCreativeDirectorPrompt(
  genCleaned: string,
  varietyIssues: string[],
): { system: string; user: string } {
  const system = renderPrompt('creative-director', {
    carousel: genCleaned,
    issues: varietyIssues,
  });

  return { system, user: '' };
}

export async function generateSlides(
  rawText: string,
  templates: TemplateInfo[],
  options: BrainOptions,
): Promise<BrainResult> {
  const { llm, onProgress, onDebug, brandKit, checkpoint, retriesUsed = {}, onSaveCheckpoint } = options;
  const totalStart = Date.now();
  const usageTracker = createUsageTracker();

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
    const extractionPrompt = renderPrompt('extraction', {});
    onDebug?.('01-prompt-phase1-extraction.md', `## System\n\n${extractionPrompt}\n\n## User\n\n${rawText}`);

    const phase1Start = Date.now();
    briefXml = await withPhaseRetry(
      async () => {
        const raw = await usageTracker.callLLM(llm, 'extraction', extractionPrompt, rawText, 0.3);
        return stripFences(raw);
      },
      'extraction',
      retriesUsed,
    );
    extractionLatencyMs = Date.now() - phase1Start;

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

    const [domainResult, templateResult] = await Promise.all([
      (async () => {
        if (allDomains.length === 0) return fallbackDomain;
        const { system: domainSystem, user: domainUser } = classifyDomainPrompt(briefXml!, allDomains);
        onDebug?.('01b-prompt-domain-classify.md', `## System\n\n${domainSystem}\n\n## User\n\n${domainUser}`);

        try {
          const domainRaw = await withPhaseRetry(
            async () => {
              const raw = await usageTracker.callLLM(llm, 'classification', domainSystem, domainUser, 0.3);
              return stripFences(raw);
            },
            'extraction',
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
      (async () => {
        const { system: selSystem, user: selUser } = {
          system: renderPrompt('template-selection', { briefXml, templates }),
          user: 'Select the best template for this content brief.',
        };
        onDebug?.('02-prompt-phase2-select-template.md', `## System\n\n${selSystem}\n\n## User\n\n${selUser}`);

        try {
          const selRaw = await usageTracker.callLLM(llm, 'selection', selSystem, selUser, 0.5);
          const selXml = stripFences(selRaw);
          selectionXml = selXml;
          onDebug?.('06-phase2-selection.xml', selXml);

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
    selectionLatencyMs = domainClassificationMs;

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
    const { system: planSystem, user: planUser } = buildSlidePlanPrompt(briefXml!, selectedTemplate!, brandKit, selectedDomain);
    onDebug?.('03-prompt-phase3-plan-slides.md', `## System\n\n${planSystem}\n\n## User\n\n${planUser}`);

    planXml = await withPhaseRetry(
      async () => {
        const raw = await usageTracker.callLLM(llm, 'planning', planSystem, planUser, 0.5);
        return stripFences(raw);
      },
      'planning',
      retriesUsed,
    );
    planLatencyMs = Date.now() - phase3Start;

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
    const { system: genSystem, user: genUser } = buildGeneratePrompt(briefXml!, planXml!, selectedTemplate!, slidePlan!, selectedDomain);
    onDebug?.('04-prompt-phase4-generate.md', `## System\n\n${genSystem}\n\n## User\n\n${genUser}`);

    genCleaned = await withPhaseRetry(
      async () => {
        const raw = await usageTracker.callLLM(llm, 'generation', genSystem, genUser, 0.9);
        return stripFences(raw);
      },
      'generation',
      retriesUsed,
    );
    generationLatencyMs = Date.now() - phase4Start;

    try {
      const root = parseXml(genCleaned);
      const rootObj = xmlToObjects(root) as Record<string, unknown>;
      const slideData = rootObj['slide'];
      if (!slideData) {
        throw new Error('Generated XML has no slides');
      }
    } catch (err) {
      onProgress?.('generation', `Validation failed: ${err} — retrying`);
      const retryRaw = await usageTracker.callLLM(
        llm,
        'generation',
        genSystem + `\n\n## PREVIOUS ATTEMPT FAILED\nThe XML was malformed or had no slides. Return valid XML with a <slidePlan> containing all slides.`,
        genUser,
        0.9,
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
      const detectRaw = await usageTracker.callLLM(llm, 'label-detection', detectSystem, detectUser, 0.1);
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
            const retryRaw = await usageTracker.callLLM(llm, 'label-detection', retrySystem, retryUser, 0.1);
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

  onDebug?.('13-final-slides.json', JSON.stringify(slides, null, 2));

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

  // ─── Phase 5: Creative Director (variety enforcement) ──────────────────────
  const creativeDirectorStart = Date.now();
  onProgress?.('creative-director', 'Starting variety enforcement...');

  const varietyIssues: string[] = [];

  const coverHeadlines = slides.filter(s => s['type'] === 'cover').map(s => String(s['headline'] ?? ''));
  if (coverHeadlines.length > 1) {
    const firstWords = coverHeadlines.map(h => h.split(/\s+/)[0]?.toLowerCase() ?? '');
    const uniqueFirstWords = new Set(firstWords);
    if (uniqueFirstWords.size === 1) {
      varietyIssues.push(`All covers start with "${firstWords[0]}" — vary the opening word`);
    }
  }

  const powerWords = ['shocking', 'breaking', 'urgent', 'exclusive', 'revealed', 'stunning', 'unprecedented', 'critical', 'devastating', 'bizarre'];
  const usedPowerWords = new Set<string>();
  for (const slide of slides) {
    const headline = String(slide['headline'] ?? '').toLowerCase();
    for (const word of powerWords) {
      if (headline.includes(word)) {
        if (usedPowerWords.has(word)) {
          varietyIssues.push(`Power word "${word}" used in multiple slides`);
        }
        usedPowerWords.add(word);
      }
    }
  }

  const emotionalPatterns = [
    { pattern: /\?$/, label: 'question' },
    { pattern: /\!$/, label: 'exclamation' },
    { pattern: /\d+%/, label: 'percentage' },
    { pattern: /\$\d/, label: 'dollar' },
  ];
  const usedAngles = new Set<string>();
  for (const slide of slides) {
    const headline = String(slide['headline'] ?? '');
    for (const { pattern, label } of emotionalPatterns) {
      if (pattern.test(headline)) {
        if (usedAngles.has(label)) {
          varietyIssues.push(`Emotional angle "${label}" used in multiple slides`);
        }
        usedAngles.add(label);
      }
    }
  }

  let creativeDirectorSlides = slides;
  let creativeDirectorLatencyMs = 0;

  if (varietyIssues.length > 0) {
    onProgress?.('creative-director', `Variety issues found: ${varietyIssues.join('; ')}`);

    const { system: cdSystem, user: cdUser } = buildCreativeDirectorPrompt(genCleaned!, varietyIssues);
    onDebug?.('14-prompt-creative-director.md', `## System\n\n${cdSystem}\n\n## User\n\n${cdUser}`);

    try {
      const response = await withPhaseRetry(
        () => usageTracker.callLLM(llm, 'creativeDirector', cdSystem, cdUser, 0.9),
        'creativeDirector',
        retriesUsed,
      );

      const cdCleaned = stripFences(response);
      const root = parseXml(cdCleaned);
      const rootObj = xmlToObjects(root) as Record<string, unknown>;
      const cdSlideData = rootObj['slide'];
      const cdSlides: Record<string, unknown>[] = [];

      if (Array.isArray(cdSlideData)) {
        for (const s of cdSlideData) {
          cdSlides.push(unwrapChildWrappers(s as Record<string, unknown>));
        }
      } else if (cdSlideData && typeof cdSlideData === 'object') {
        cdSlides.push(unwrapChildWrappers(cdSlideData as Record<string, unknown>));
      }

      if (cdSlides.length > 0) {
        creativeDirectorSlides = cdSlides;
        onProgress?.('creative-director', `Fixed ${varietyIssues.length} variety issues`);
      }
    } catch (err) {
      onProgress?.('creative-director', `Creative Director failed: ${err instanceof Error ? err.message : 'unknown'}, using original`);
    }
  } else {
    onProgress?.('creative-director', 'No variety issues found');
  }

  creativeDirectorLatencyMs = Date.now() - creativeDirectorStart;

  const totalLatencyMs = Date.now() - totalStart;
  onProgress?.('complete', `Total: ${totalLatencyMs}ms, ${creativeDirectorSlides.length} slides`);

  return {
    slides: creativeDirectorSlides,
    briefXml: briefXml!,
    selectionXml: selectionXml ?? '',
    planXml: planXml!,
    rawGenerationXml: genCleaned!,
    extractionLatencyMs,
    selectionLatencyMs,
    planLatencyMs,
    generationLatencyMs,
    creativeDirectorLatencyMs,
    totalLatencyMs,
    totalTokens: usageTracker.getTotals(),
    phaseUsages: usageTracker.getPhaseUsages(),
    selectedTemplateId: selectedTemplate!.id,
    slidePlan: slidePlan!,
    domainId: selectedDomain!.id,
    domainClassificationMs,
    needsReview,
  };
}

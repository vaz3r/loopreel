import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import ts from 'typescript';
import { createLLMClient } from '@loopreel/llm';
import { resolveBrandPreset } from './presets.js';
import type { BrandTokens, DeckData, SlideData } from './skeleton/types.js';
import { ingestArticle, type ArticleIntel } from './ingest.js';
import {
  type TemplateBrief,
  type StoryStrategy,
  type GroundTruthDossier,
  type SlideDesignBlueprint,
  type LayoutModelType,
  buildFactExtractionSystemPrompt,
  buildFactExtractionUserPrompt,
  buildTopicResearchSystemPrompt,
  buildTopicResearchUserPrompt,
  buildBrandSystemPrompt,
  buildBrandUserPrompt,
  buildArticleBrandUserPrompt,
  buildStoryStrategySystemPrompt,
  buildStoryStrategyUserPrompt,
  buildStoryDeckSystemPrompt,
  buildStoryDeckUserPrompt,
  buildVisualBlueprintSystemPrompt,
  buildVisualBlueprintUserPrompt,
  buildSingleSlideSystemPrompt,
  buildSingleSlideUserPrompt,
  buildSelfHealingPrompt,
  type InstagramCaptionData,
  buildInstagramCaptionSystemPrompt,
  buildInstagramCaptionUserPrompt,
} from './prompt.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const TEMPLATES_ROOT = path.resolve(__dirname, '../templates');

function extractJson<T>(raw: string): T {
  let cleaned = raw.trim();
  const jsonMatch = cleaned.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
  if (jsonMatch && jsonMatch[1]) {
    cleaned = jsonMatch[1].trim();
  }
  const firstBrace = cleaned.indexOf('{');
  const firstBracket = cleaned.indexOf('[');
  if (firstBrace !== -1 && (firstBracket === -1 || firstBrace < firstBracket)) {
    const lastBrace = cleaned.lastIndexOf('}');
    if (lastBrace !== -1) cleaned = cleaned.slice(firstBrace, lastBrace + 1);
  } else if (firstBracket !== -1) {
    const lastBracket = cleaned.lastIndexOf(']');
    if (lastBracket !== -1) cleaned = cleaned.slice(firstBracket, lastBracket + 1);
  }
  return JSON.parse(cleaned) as T;
}

function extractTsx(raw: string): string {
  let cleaned = raw.trim();
  const tsxMatch = cleaned.match(/```(?:tsx|typescript|jsx|javascript)?\s*([\s\S]*?)\s*```/);
  if (tsxMatch && tsxMatch[1]) {
    cleaned = tsxMatch[1].trim();
  }
  return cleaned;
}

export function sanitizeTsxCode(rawCode: string): string {
  let code = rawCode;

  // Fix broken chained optional access: slide.items?.?.property -> slide.items?.[N]?.property
  let titleIndex = 0;
  code = code.replace(/slide\.([a-zA-Z0-9_]+)\?\.\?\.title/g, (_m, prop) => {
    return `slide.${prop}?.[${titleIndex++}]?.title`;
  });
  let bodyIndex = 0;
  code = code.replace(/slide\.([a-zA-Z0-9_]+)\?\.\?\.body/g, (_m, prop) => {
    return `slide.${prop}?.[${bodyIndex++}]?.body`;
  });
  code = code.replace(/slide\.([a-zA-Z0-9_]+)\?\.\?\.([a-zA-Z0-9_]+)/g, 'slide.$1?.[0]?.$2');

  // Fix dangling optional chaining on any variable/property access before delimiters:
  // e.g. content.cards?.; or data.cards?. ?? fallback or match?. ?? ''
  const danglingCounts: Record<string, number> = {};
  code = code.replace(
    /([a-zA-Z0-9_]+(?:\.[a-zA-Z0-9_]+)*)\?\.(?=\s*(?:[;,)\n}\]:]|\?\?|\|\||&&))/g,
    (_match, prop) => {
      const startIdx = prop.endsWith('match') ? 1 : 0;
      const current = danglingCounts[prop] !== undefined ? danglingCounts[prop] + 1 : startIdx;
      danglingCounts[prop] = current;
      return `${prop}?.[${current}]`;
    }
  );

  // Fix array fallback for single item: e.g. data.cards?.[0] ?? lockedCards -> data.cards?.[0] ?? lockedCards[0]
  const fallbackCounts: Record<string, number> = {};
  code = code.replace(
    /\?\?\s*([a-zA-Z0-9_]+(?:\.[a-zA-Z0-9_]+)*)(?=\s*[;,)\n}])/g,
    (match, arrName) => {
      const commonArrays = ['lockedCards', 'defaultCards', 'fallbackCards', 'cards', 'items', 'points', 'metrics', 'timeline', 'rows', 'steps', 'quotes', 'findings', 'terms'];
      const baseName = arrName.split('.').pop() || '';
      if (commonArrays.includes(baseName)) {
        const idx = fallbackCounts[arrName] || 0;
        fallbackCounts[arrName] = idx + 1;
        return `?? ${arrName}[${idx}]`;
      }
      return match;
    }
  );

  // Fix array .trim() calls on regex match/split arrays: e.g. sentences?.trim() -> sentences[0]?.trim()
  code = code.replace(/(\b[a-zA-Z0-9_]+)\?\.trim\(\)/g, (match, varName) => {
    const arrayDeclRegex = new RegExp(`const\\s+${varName}\\s*=\\s*[^;]*(?:match|split|\\[)`);
    if (arrayDeclRegex.test(code)) {
      return `${varName}[0]?.trim()`;
    }
    return match;
  });

  // Fix single item variable assignment from array: const opening = cards!; -> const opening = cards[0]!;
  code = code.replace(
    /const\s+([a-zA-Z0-9_]+)\s*=\s*([a-zA-Z0-9_]+(?:\.[a-zA-Z0-9_]+)*)!?;/g,
    (match, varName, arrName) => {
      const commonArrays = ['cards', 'items', 'points', 'metrics', 'timeline', 'rows', 'steps', 'quotes', 'findings', 'terms'];
      const baseName = arrName.split('.').pop() || '';
      if (commonArrays.includes(baseName)) {
        return `const ${varName} = ${arrName}[0]!;`;
      }
      return match;
    }
  );

  // Fix passing entire array to a single item prop: e.g. <Turn card={cards!} /> -> <Turn card={cards[N]!} />
  const propCountMap: Record<string, number> = {};
  code = code.replace(
    /<([A-Z][a-zA-Z0-9]*)\s+([a-zA-Z0-9_]+)=\{([a-zA-Z0-9_]+(?:\.[a-zA-Z0-9_]+)*)\s*!?\s*\}\s*\/?>/g,
    (match, compName, propName, arrName) => {
      const commonArrays = ['cards', 'items', 'points', 'metrics', 'timeline', 'rows', 'steps', 'quotes', 'findings', 'terms'];
      const baseName = arrName.split('.').pop() || '';
      if (commonArrays.includes(baseName)) {
        const key = `${compName}_${propName}_${arrName}`;
        const idx = propCountMap[key] || 0;
        propCountMap[key] = idx + 1;
        return `<${compName} ${propName}={${arrName}[${idx}]!} />`;
      }
      return match;
    }
  );

  return code;
}

export function validateTsxSyntax(code: string, filename = 'slide.tsx'): { valid: boolean; errors: string[] } {
  try {
    const sf = ts.createSourceFile(filename, code, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
    const diags = (sf as any).parseDiagnostics || [];
    if (diags.length === 0) return { valid: true, errors: [] };
    const errors = diags.map((d: any) => {
      const line = sf && d.start !== undefined ? sf.getLineAndCharacterOfPosition(d.start).line + 1 : 0;
      const msg = typeof d.messageText === 'string' ? d.messageText : d.messageText?.messageText || 'Syntax error';
      return `${filename}:${line}: ${msg}`;
    });
    return { valid: false, errors };
  } catch (err: any) {
    return { valid: false, errors: [err.message] };
  }
}

export function validateTemplateTypeScript(templateDir: string): { valid: boolean; errors: string[] } {
  try {
    const indexPath = path.join(templateDir, 'index.ts');
    if (!fs.existsSync(indexPath)) {
      return { valid: false, errors: [`Entrypoint not found: ${indexPath}`] };
    }

    const program = ts.createProgram([indexPath], {
      target: ts.ScriptTarget.ES2022,
      module: ts.ModuleKind.ESNext,
      moduleResolution: ts.ModuleResolutionKind.Bundler,
      jsx: ts.JsxEmit.ReactJSX,
      skipLibCheck: true,
      noEmit: true,
      strict: false,
      noImplicitAny: false,
      allowImportingTsExtensions: true,
    });

    const diagnostics = ts.getPreEmitDiagnostics(program);
    // Filter diagnostics to only report issues originating in the target template directory
    const templateDiags = diagnostics.filter((d) => {
      const fn = d.file?.fileName || '';
      return fn.startsWith(templateDir) || fn.includes('/skeleton/');
    });

    if (templateDiags.length === 0) {
      return { valid: true, errors: [] };
    }

    const errors = templateDiags.map((d) => {
      const file = d.file?.fileName ? path.basename(d.file.fileName) : 'unknown';
      const line = d.file && d.start !== undefined ? d.file.getLineAndCharacterOfPosition(d.start).line + 1 : 0;
      const msg = typeof d.messageText === 'string' ? d.messageText : d.messageText?.messageText || 'Type error';
      return `${file}:${line}: ${msg}`;
    });

    return { valid: false, errors };
  } catch (err: any) {
    return { valid: false, errors: [err.message] };
  }
}

export interface PipelineOptions {
  brief?: TemplateBrief;
  url?: string;
  provider?: string;
  platform?: string;
  brandKit?: any;
  concurrency?: number;
  onProgress?: (stage: string, current: number, total: number) => void;
}

export interface PipelineResult {
  templateSlug: string;
  templateDir: string;
  brand: BrandTokens;
  deck: DeckData;
  slideCount: number;
  caption?: InstagramCaptionData;
}

async function runConcurrentPool<T, R>(
  items: T[],
  concurrency: number,
  taskFn: (item: T, index: number) => Promise<R>
): Promise<R[]> {
  const results: R[] = new Array(items.length);
  let currentIndex = 0;

  async function worker() {
    while (currentIndex < items.length) {
      const idx = currentIndex++;
      results[idx] = await taskFn(items[idx]!, idx);
    }
  }

  const workers = Array.from(
    { length: Math.min(concurrency, items.length) },
    () => worker()
  );
  await Promise.all(workers);
  return results;
}

export async function runTemplatePipeline(options: PipelineOptions): Promise<PipelineResult> {
  const brief = options.brief || {};
  const provider = options.provider || 'copilot';
  const llm = createLLMClient(provider);

  console.log(`\n[Pipeline] Initializing LLM client with provider "${provider}"...`);

  // Optional: Ingest live article URL if provided
  const articleUrl = options.url || brief.url;
  let article: ArticleIntel | undefined;
  if (articleUrl) {
    console.log(`[Pipeline] Ingesting real news story from: ${articleUrl}...`);
    options.onProgress?.('Ingesting Article Content', 0, 15);
    article = await ingestArticle(articleUrl);
  }

  // ==========================================================================
  // PASS 1: INVESTIGATIVE FACT-CHECKER (ZERO HALLUCINATION DOSSIER)
  // ==========================================================================
  let dossier: GroundTruthDossier;
  if (article) {
    console.log('[Pipeline] >>> Pass 1: Investigative Fact-Checker Extracting Verified GroundTruthDossier...');
    options.onProgress?.('Extracting Verified Facts', 1, 15);

    const factResponse = await llm.generateJSON(
      buildFactExtractionSystemPrompt(),
      buildFactExtractionUserPrompt(article),
      0.2 // Low temperature for high factual precision
    );
    const rawDossier = extractJson<any>(factResponse.text);
    dossier = {
      articleTitle: rawDossier.articleTitle || article.title,
      publisher: rawDossier.publisher || article.publisher,
      byline: rawDossier.byline || article.byline || 'Staff Bureau',
      summary: rawDossier.summary || article.summary,
      entities: rawDossier.entities || [],
      verifiedMetrics:
        Array.isArray(rawDossier.verifiedMetrics) && rawDossier.verifiedMetrics.length > 0
          ? rawDossier.verifiedMetrics
          : Array.isArray(rawDossier.metrics) && rawDossier.metrics.length > 0
          ? rawDossier.metrics
          : (article.extractedMetrics || []).map((m: string) => ({
              value: m,
              label: 'Reported Metric',
              context: 'Extracted from official reporting',
            })),
      verifiedQuotes:
        Array.isArray(rawDossier.verifiedQuotes) && rawDossier.verifiedQuotes.length > 0
          ? rawDossier.verifiedQuotes
          : Array.isArray(rawDossier.quotes) && rawDossier.quotes.length > 0
          ? rawDossier.quotes
          : (article.extractedQuotes || []).map((q: string) => ({
              quote: q,
              speaker: 'Official Source',
              role: 'Spokesperson',
              context: 'Direct statement',
            })),
      systemMechanisms: rawDossier.systemMechanisms || [],
      comparisons: rawDossier.comparisons || [],
      hardwareSpecs: rawDossier.hardwareSpecs || {
        deviceA: { name: 'Standard', specs: [], price: 'N/A', availability: 'N/A' },
      },
      coreControversy: rawDossier.coreControversy || {
        corporateClaim: 'Maintaining operational safety and mission-critical uptime',
        criticismOrAlarm: 'Critical dependency on multi-decade legacy architectures',
        regulatoryOrHistoricalPrecedent: 'Federal safety mandates and multi-billion-dollar upgrade backlogs',
      },
      hiddenCatchesAndLimits:
        Array.isArray(rawDossier.hiddenCatchesAndLimits) && rawDossier.hiddenCatchesAndLimits.length > 0
          ? rawDossier.hiddenCatchesAndLimits
          : rawDossier.catches || ['The operational fragility of replacing live infrastructure without interrupting daily service.'],
      editorialVerdict: rawDossier.editorialVerdict || { avoidAdvice: [], fitAdvice: [] },
    };
    console.log(
      `[Pipeline] Dossier Extracted: ${dossier.verifiedMetrics.length} metrics, ${dossier.verifiedQuotes.length} quotes, ${dossier.systemMechanisms?.length || 0} mechanisms.`
    );
  } else {
    console.log('[Pipeline] >>> Pass 1: Forensic Fact & Research Bureau Compiling GroundTruthDossier from Brief...');
    options.onProgress?.('Compiling Verified Topic Dossier', 1, 15);

    const factResponse = await llm.generateJSON(
      buildTopicResearchSystemPrompt(),
      buildTopicResearchUserPrompt(brief),
      0.2
    );
    const rawDossier = extractJson<any>(factResponse.text);
    dossier = {
      articleTitle: rawDossier.articleTitle || brief.name || 'Financial & Industrial Intelligence',
      publisher: rawDossier.publisher || 'The Financial Bureau',
      byline: rawDossier.byline || 'Staff Intelligence Bureau',
      summary: rawDossier.summary || brief.vibe || 'Forensic investigation of business model and operational mechanics',
      entities: rawDossier.entities || [],
      verifiedMetrics: rawDossier.verifiedMetrics || rawDossier.metrics || [],
      verifiedQuotes: rawDossier.verifiedQuotes || rawDossier.quotes || [],
      systemMechanisms: rawDossier.systemMechanisms || [],
      comparisons: rawDossier.comparisons || [],
      hardwareSpecs: rawDossier.hardwareSpecs,
      coreControversy: rawDossier.coreControversy || {
        corporateClaim: 'Customer convenience and loyalty incentives',
        criticismOrAlarm: 'Unregulated shadow banking float without FDIC protection',
        regulatoryOrHistoricalPrecedent: 'Exempt from reserve ratios and Dodd-Frank requirements',
      },
      hiddenCatchesAndLimits: rawDossier.hiddenCatchesAndLimits || rawDossier.catches || [],
      editorialVerdict: rawDossier.editorialVerdict || { avoidAdvice: [], fitAdvice: [] },
    };
    console.log(
      `[Pipeline] Topic Dossier Compiled: ${dossier.verifiedMetrics.length} metrics, ${dossier.systemMechanisms?.length || 0} mechanisms, ${dossier.comparisons?.length || 0} comparisons.`
    );
  }

  // ==========================================================================
  // PASS 2: CREATIVE DIRECTOR ART DIRECTION & BRAND IDENTITY
  // ==========================================================================
  console.log('[Pipeline] >>> Pass 2: Creative Director Art Direction & Brand Identity...');
  options.onProgress?.('Generating Brand Identity', 2, 15);

  const defaultSlug = article
    ? (article.title || 'story').toLowerCase().replace(/[^a-z0-9]+/g, '-').slice(0, 32).replace(/(^-|-$)/g, '')
    : (brief.name || 'custom').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

  let brand: BrandTokens;

  const resolvedPreset = resolveBrandPreset(options.brandKit);
  if (resolvedPreset || (options.brandKit && Object.keys(options.brandKit).length > 0)) {
    console.log('[Pipeline] Pass 2: Using User-Selected Brand Kit / Preset override...');
    const b = (resolvedPreset || options.brandKit) as any;
    const palette = b.palette || {};
    const typography = b.typography || {};

    const paper = palette.paper || b.bg || '#0D0E12';
    const ink = palette.ink || b.text || '#F1F3F9';
    const accent = palette.accent || b.accent || '#FF4D00';
    const surface = palette.surface || b.surface || '#161820';
    const border = palette.border || (typeof ink === 'string' && ink.startsWith('#') ? `${ink}25` : '#2A2D3A');
    const subtle = palette.subtle || (typeof ink === 'string' && ink.startsWith('#') ? `${ink}80` : '#8E93A6');

    const headlineFont = typography.headlineFont || b.fontSerif || 'Syne';
    const bodyFont = typography.bodyFont || b.fontSans || 'Inter';
    const monoFont = typography.monoFont || b.fontMono || 'JetBrains Mono';

    let googleFontsUrl = typography.googleFontsUrl || b.googleFontsUrl;
    if (!googleFontsUrl) {
      const fontsParam = [headlineFont, bodyFont, monoFont]
        .filter((v, i, a) => a.indexOf(v) === i)
        .map((f) => `family=${encodeURIComponent(f)}:wght@400;500;600;700;800`)
        .join('&');
      googleFontsUrl = `https://fonts.googleapis.com/css2?${fontsParam}&display=swap`;
    }

    const CANONICAL_TEMPLATES = new Set([
      'the-zurich-typographer',
      'the-tokyo-review',
      'the-threshold',
      'the-token-ledger',
      'the-threshold-review',
      'the-fine-print',
    ]);
    const name = b.name || b.wordmark || 'Custom Brand';
    const baseSlug = b.slug || defaultSlug;
    const slug = CANONICAL_TEMPLATES.has(baseSlug) ? `${baseSlug}-${defaultSlug}` : baseSlug;

    brand = {
      name,
      slug,
      vibe: b.vibe || 'Curated Editorial Publication',
      domain: b.domain || `${slug}.pub`,
      palette: {
        paper,
        ink,
        accent,
        surface,
        border,
        subtle,
      },
      typography: {
        headlineFont,
        bodyFont,
        monoFont,
        googleFontsUrl,
      },
      wordmark: b.wordmark || name.toUpperCase(),
      wordmarkStyle: (b.wordmarkStyle as any) || 'sans',
      handle: b.handle || `@${slug.replace(/[^a-zA-Z0-9]/g, '')}`,
      texture: (b.texture as any) || 'grid',
      motif: (b.motif as any) || 'crosshair',
    };
  } else {
    const brandPrompt = article
      ? buildArticleBrandUserPrompt(article, brief)
      : buildBrandUserPrompt(brief);

    const brandResponse = await llm.generateJSON(
      buildBrandSystemPrompt(),
      brandPrompt,
      0.7
    );

    brand = extractJson<BrandTokens>(brandResponse.text);
    brand.slug = brand.slug || defaultSlug;
  }

  brand.platform = options.platform || 'instagram-feed';
  if (!brand.handle || brand.handle.length > 25) {
    const cleanHandle = brand.slug.split('-').slice(0, 3).join('');
    brand.handle = `@${cleanHandle}`.slice(0, 20);
  }
  if (!brand.domain || brand.domain.length > 30) {
    const cleanDomain = brand.slug.split('-').slice(0, 3).join('');
    brand.domain = `${cleanDomain}.pub`.slice(0, 25);
  }
  const slug = brand.slug;
  console.log(`[Pipeline] Pass 2 complete: Brand established for "${brand.name}" (${brand.slug}).`);

  // ==========================================================================
  // PASS 3: EDITORIAL STRATEGIST (HOOK & TENSION FORMULA)
  // ==========================================================================
  console.log('[Pipeline] >>> Pass 3: Editorial Strategist Extracting Scroll-Stopping Hook & Core Conflict...');
  options.onProgress?.('Extracting Story Strategy', 3, 15);

  const strategyResponse = await llm.generateJSON(
    buildStoryStrategySystemPrompt(),
    buildStoryStrategyUserPrompt(dossier, brief, article),
    0.7
  );
  let rawStrategy: Partial<StoryStrategy> = {};
  try {
    rawStrategy = extractJson<StoryStrategy>(strategyResponse.text) || {};
  } catch (err: any) {
    console.warn(`[Pipeline] Failed to parse story strategy JSON: ${err.message}`);
  }

  const cleanString = (val: any, fallback: string): string => {
    if (typeof val === 'string' && val.trim().length > 0 && val !== 'undefined' && val !== 'null') {
      return val.trim();
    }
    return fallback;
  };

  const strategy: StoryStrategy = {
    hookHeadline: cleanString(rawStrategy.hookHeadline, article?.title || brief?.name || dossier.articleTitle || 'The Critical Investigation'),
    valuePromise: cleanString(rawStrategy.valuePromise, brief?.vibe || 'Essential architectural breakdown and operational risk analysis.'),
    kicker: cleanString(rawStrategy.kicker, 'INVESTIGATIVE DOSSIER'),
    coreConflict: cleanString(
      rawStrategy.coreConflict,
      dossier.coreControversy?.criticismOrAlarm || dossier.summary?.slice(0, 120) || 'Operational friction and systemic technical debt.'
    ),
    hiddenCatch: cleanString(
      rawStrategy.hiddenCatch,
      dossier.hiddenCatchesAndLimits?.[0] || 'The risk and complexity of modernizing live infrastructure without service disruption.'
    ),
    verdict: cleanString(rawStrategy.verdict, 'Comprehensive long-term architectural modernisation is urgent and mandatory.'),
    keyMetrics: Array.isArray(rawStrategy.keyMetrics) && rawStrategy.keyMetrics.length > 0 ? rawStrategy.keyMetrics : dossier.verifiedMetrics,
    keyQuotes: Array.isArray(rawStrategy.keyQuotes) && rawStrategy.keyQuotes.length > 0 ? rawStrategy.keyQuotes : dossier.verifiedQuotes,
    storySpine: rawStrategy.storySpine,
  };
  console.log(`[Pipeline] Hook Formulated: "${strategy.hookHeadline}"`);
  console.log(`[Pipeline] Value Promise:  "${strategy.valuePromise}"`);

  // ==========================================================================
  // PASS 4: SENIOR COPY EDITOR (7-SLIDE STORYBOARD WITH HARD WORD BUDGETS)
  // ==========================================================================
  console.log('[Pipeline] >>> Pass 4: Senior Copy Editor Authoring 7-Slide High-Signal Storyboard...');
  options.onProgress?.('Authoring Storyboard', 4, 15);

  const deckResponse = await llm.generateJSON(
    buildStoryDeckSystemPrompt(),
    buildStoryDeckUserPrompt(strategy, dossier, brand),
    0.6
  );
  let allSlides = extractJson<SlideData[]>(deckResponse.text);

  // Helper to strip leaked runtime literals or meta-commentary
  const sanitizeSlideText = (text: string | undefined): string => {
    if (!text) return '';
    return text
      .replace(/\[object Object\]/gi, '')
      .replace(/\b(undefined|NaN)\b/gi, '')
      .replace(/\s{2,}/g, ' ')
      .trim();
  };

  // Normalize slide schema ensuring id, index, type, and sanitized copy are guaranteed
  const activePlatform = options.platform || 'instagram-feed';
  allSlides = allSlides.map((s, idx) => ({
    ...s,
    id: s.id || `slide-${idx + 1}`,
    index: typeof s.index === 'number' ? s.index : idx,
    type: s.type || (s as any).archetype || 'editorial',
    platform: activePlatform,
    kicker: sanitizeSlideText(s.kicker) || (idx === 0 ? 'INVESTIGATION' : `PART 0${idx + 1}`),
    headline: sanitizeSlideText(s.headline) || brand.name,
    subheadline: sanitizeSlideText(s.subheadline),
    items: (s.items || []).map((it: any) => ({
      label: sanitizeSlideText(it.label) || 'Key Point',
      body: sanitizeSlideText(it.body),
    })),
  }));

  const deck: DeckData = {
    templateName: brand.name,
    templateSlug: brand.slug,
    domain: brand.domain,
    platform: activePlatform,
    slides: allSlides,
  };
  console.log(`[Pipeline] Pass 4 complete: Storyboard authored with ${deck.slides.length} slides.`);

  // Create isolated template folder in apps/generator/templates/<slug>/
  const templateDir = path.join(TEMPLATES_ROOT, slug);
  const slidesDir = path.join(templateDir, 'slides');
  fs.mkdirSync(slidesDir, { recursive: true });

  fs.writeFileSync(path.join(templateDir, 'brand.json'), JSON.stringify(brand, null, 2), 'utf-8');
  fs.writeFileSync(path.join(templateDir, 'deck.json'), JSON.stringify(deck, null, 2), 'utf-8');
  fs.writeFileSync(path.join(templateDir, 'dossier.json'), JSON.stringify(dossier, null, 2), 'utf-8');

  // ==========================================================================
  // PASS 5: VISUAL ART DIRECTOR & SPATIAL LAYOUT ARCHITECT (WHERE EVERYTHING FALLS)
  // ==========================================================================
  console.log('[Pipeline] >>> Pass 5: Visual Art Director & Spatial Layout Architect Planning Exact Coordinates...');
  options.onProgress?.('Architecting Spatial Layout & SVG Art', 5, 15);

  let blueprints: SlideDesignBlueprint[] = [];
  try {
    const blueprintResponse = await llm.generateJSON(
      buildVisualBlueprintSystemPrompt(),
      buildVisualBlueprintUserPrompt(deck.slides, brand, dossier),
      0.7
    );
    blueprints = extractJson<SlideDesignBlueprint[]>(blueprintResponse.text);
    console.log(`[Pipeline] Pass 5 complete: ${blueprints.length} slide spatial blueprints architected.`);
  } catch (err: any) {
    console.warn(`[Pipeline] Spatial blueprint generation fallback: ${err.message}`);
    const fallbackModels: LayoutModelType[] = [
      'typographic-broadsheet',
      'split-dossier',
      'contract-redline-autopsy',
      'investigative-timeline',
      'telemetry-anchor',
      'stacked-hero-svg',
      'editorial-verdict-seal',
    ];
    blueprints = deck.slides.map((s, idx) => ({
      slideId: s.id,
      type: s.type,
      layoutModel: fallbackModels[idx % fallbackModels.length] ?? 'stacked-hero-svg',
      headerZone: {
        headlineSize: 'text-[60px]',
        hasSubheadline: !!s.subheadline,
        subheadMaxWords: 12,
      },
      svgArtZone: {
        viewBox: '0 0 952 420',
        allocatedHeightPx: 380,
        artConcept: s.svgBlueprint || 'Bespoke conceptual illustration with recognizable icons and vector paths',
        primaryElements: ['vector scene', 'icon anchors', 'annotated connectors'],
        negativeSpaceBufferPx: 24,
      },
      cardsZone: {
        placement: 'hairline-columns',
        cardCount: s.items?.length || 2,
        maxWordsPerBody: 14,
        style: 'hairline-ledger',
      },
      spacing: {
        zoneGap: 'gap-6',
      },
    }));
  }

  // ==========================================================================
  // PASS 6: PRINCIPAL REACT ENGINEER (PARALLEL BESPOKE CODE GENERATION)
  // ==========================================================================
  const concurrency = options.concurrency || 3;
  console.log(
    `[Pipeline] >>> Pass 6: Principal React Engineer Synthesizing Slides in Parallel (Concurrency: ${concurrency})...`
  );

  const slideTasks = deck.slides.map((slideData, i) => async () => {
    const slideNumber = i + 1;
    const blueprint = blueprints[i] || blueprints.find((b) => b.slideId === slideData.id);
    const padNum = String(slideNumber).padStart(2, '0');
    const cleanType = (slideData.type || 'slide').replace(/[^a-zA-Z0-9]/g, '');
    const pascalType = cleanType.charAt(0).toUpperCase() + cleanType.slice(1);
    const componentName = `Slide${padNum}_${pascalType}`;
    const filename = `${componentName}.tsx`;
    const filePath = path.join(slidesDir, filename);

    console.log(`[Pipeline]   ⚡ [${slideNumber}/${deck.slides.length}] Synthesizing ${filename} (${slideData.type})...`);
    options.onProgress?.(`Synthesizing Slide ${slideNumber}: ${slideData.type}`, 5 + slideNumber, 15);

    const startTime = Date.now();
    const slideResponse = await llm.generateJSON(
      buildSingleSlideSystemPrompt(activePlatform),
      buildSingleSlideUserPrompt(slideNumber, slideData, blueprint, brand),
      0.6
    );

    let code = sanitizeTsxCode(extractTsx(slideResponse.text));

    // Fix imports if necessary
    if (!code.includes("from '../../../src/skeleton/types'")) {
      code = code.replace(
        /import type \{ SlideComponentProps \} from ['"][^'"]+['"];?/,
        "import type { SlideComponentProps } from '../../../src/skeleton/types';"
      );
    }
    if (!code.includes('import type { SlideComponentProps }')) {
      code = `import type { SlideComponentProps } from '../../../src/skeleton/types';\n${code}`;
    }

    // Sanitize broken array access like items?.label or items?.body
    code = code.replace(/\bitems\?\.label\b/g, 'items[0]?.label');
    code = code.replace(/\bitems\?\.body\b/g, 'items[0]?.body');

    // Strip rogue local font overrides (Arial, Courier, etc.) that kill authentic brand typography
    code = code.replace(/'--font-headline':\s*['"][^'"]+['"],?/g, '');
    code = code.replace(/'--font-body':\s*['"][^'"]+['"],?/g, '');
    code = code.replace(/'--font-mono':\s*['"][^'"]+['"],?/g, '');

    // Fast AST syntax check before writing to disk
    const syntaxCheck = validateTsxSyntax(code, filename);
    if (!syntaxCheck.valid) {
      console.warn(`[Pipeline]   ⚠ Syntax issues in ${filename}: ${syntaxCheck.errors.join('; ')}. Auto-repairing...`);
      try {
        const repairResponse = await llm.generateJSON(
          'You are a TypeScript and React compiler expert. Fix the reported syntax errors completely. Return ONLY the corrected code in a ```tsx code block.',
          buildSelfHealingPrompt(filename, code, syntaxCheck.errors.join('\n')),
          0.2
        );
        const repaired = sanitizeTsxCode(extractTsx(repairResponse.text));
        const secondCheck = validateTsxSyntax(repaired, filename);
        code = repaired;
        if (secondCheck.valid) {
          console.log(`[Pipeline]   ✔ Syntax successfully auto-repaired for ${filename}`);
        } else {
          console.warn(`[Pipeline]   ⚠ Syntax repair partial for ${filename}`);
        }
      } catch (repairErr: any) {
        console.warn(`[Pipeline]   ⚠ Syntax auto-repair skipped: ${repairErr.message}`);
      }
    }

    fs.writeFileSync(filePath, code, 'utf-8');
    const elapsedSec = ((Date.now() - startTime) / 1000).toFixed(1);
    console.log(`[Pipeline]   ✔ [${slideNumber}/${deck.slides.length}] ${filename} finished in ${elapsedSec}s`);

    return { filename, componentName, index: i };
  });

  const slideExports = await runConcurrentPool(slideTasks, concurrency, (task) => task());

  // ==========================================================================
  // PASS 7: TEMPLATE INDEX ASSEMBLY & TYPESCRIPT COMPILER VERIFICATION
  // ==========================================================================
  console.log('[Pipeline] >>> Pass 7: Assembling template package entry point (index.ts)...');
  const indexImports = slideExports
    .map((s) => `import ${s.componentName} from './slides/${s.filename.replace('.tsx', '')}';`)
    .join('\n');

  const indexArray = slideExports.map((s) => `  ${s.componentName},`).join('\n');

  const indexContent = `// Auto-generated by @loopreel/generator
import type { TemplatePackage } from '../../src/skeleton/types';
import brandData from './brand.json';
import deckData from './deck.json';

${indexImports}

const pkg: TemplatePackage = {
  brand: brandData as any,
  deck: deckData as any,
  slides: [
${indexArray}
  ],
};

export default pkg;
`;

  fs.writeFileSync(path.join(templateDir, 'index.ts'), indexContent, 'utf-8');

  console.log(`[Pipeline] >>> Verifying TypeScript integrity for template ${slug}...`);
  options.onProgress?.('Verifying TypeScript Integrity', 14, 15);

  const initialCheck = validateTemplateTypeScript(templateDir);
  if (initialCheck.valid) {
    console.log(`[Pipeline] TypeScript integrity verified for ${slug}: 0 errors.`);
  } else {
    let currentErrors = initialCheck.errors;
    console.warn(`[Pipeline] TypeScript reported ${currentErrors.length} errors in ${slug}. Attempting self-healing...`);

    let healed = false;
    for (let attempt = 1; attempt <= 3; attempt++) {
      for (const s of slideExports) {
        if (currentErrors.some((e) => e.includes(s.filename) || e.includes(s.componentName))) {
          const fileErrors = currentErrors.filter((e) => e.includes(s.filename) || e.includes(s.componentName)).join('\n');
          console.log(`[Pipeline] Self-healing repair for ${s.filename} (attempt ${attempt}/3)...`);
          const currentCode = fs.readFileSync(path.join(slidesDir, s.filename), 'utf-8');
          const repairResponse = await llm.generateJSON(
            'You are a TypeScript and React compiler expert. Fix the reported compiler error completely. Return ONLY the corrected code in a ```tsx code block.',
            buildSelfHealingPrompt(s.filename, currentCode, fileErrors),
            0.2
          );
          const fixedCode = sanitizeTsxCode(extractTsx(repairResponse.text));
          fs.writeFileSync(path.join(slidesDir, s.filename), fixedCode, 'utf-8');
        }
      }

      const reCheck = validateTemplateTypeScript(templateDir);
      if (reCheck.valid) {
        console.log(`[Pipeline] Self-healing succeeded on attempt ${attempt}: 0 errors after repair.`);
        healed = true;
        break;
      }
      currentErrors = reCheck.errors;
    }

    if (!healed) {
      throw new Error(`TypeScript compilation failed for template ${slug} after 3 self-healing attempts:\n${currentErrors.join('\n')}`);
    }
  }

  // ==========================================================================
  // PASS 8: JOURNALISTIC INSTAGRAM CAPTION SYNTHESIS
  // ==========================================================================
  console.log('[Pipeline] >>> Pass 8: Synthesizing Investigative Instagram Caption & Conversion Copy...');
  let caption: InstagramCaptionData | undefined;
  try {
    const captionResponse = await llm.generateJSON(
      buildInstagramCaptionSystemPrompt(),
      buildInstagramCaptionUserPrompt(brand, dossier, deck),
      0.3
    );
    caption = extractJson<InstagramCaptionData>(captionResponse.text);
    fs.writeFileSync(path.join(templateDir, 'caption.json'), JSON.stringify(caption, null, 2), 'utf-8');
    console.log(`[Pipeline] Caption synthesized successfully (${caption.hashtags?.length ?? 0} hashtags).`);
  } catch (err: any) {
    console.warn(`[Pipeline] Caption generation failed or skipped: ${err.message}`);
  }

  options.onProgress?.('Complete', 15, 15);
  return {
    templateSlug: slug,
    templateDir,
    brand,
    deck,
    slideCount: deck.slides.length,
    caption,
  };
}

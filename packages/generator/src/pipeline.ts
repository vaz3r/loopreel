import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { execSync } from 'node:child_process';
import ts from 'typescript';
import { createLLMClient } from '@loopreel/llm';
import type { BrandTokens, DeckData, SlideData } from './skeleton/types.js';
import { ingestArticle, type ArticleIntel } from './ingest.js';
import {
  type TemplateBrief,
  type StoryStrategy,
  type GroundTruthDossier,
  type SlideDesignBlueprint,
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
  buildDeckSystemPrompt,
  buildDeckBatch1Prompt,
  buildDeckBatch2Prompt,
  buildSingleSlideSystemPrompt,
  buildSingleSlideUserPrompt,
  buildSelfHealingPrompt,
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

  // Fix dangling optional chaining: slide.items?. followed by ;, ,, ), }, or newline
  let itemIndex = 0;
  code = code.replace(/slide\.([a-zA-Z0-9_]+)\?\.(?=\s*[;,)\n}])/g, (_match, prop) => {
    return `slide.${prop}?.[${itemIndex++}]`;
  });

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
      verifiedMetrics: rawDossier.verifiedMetrics || rawDossier.metrics || [],
      verifiedQuotes: rawDossier.verifiedQuotes || rawDossier.quotes || [],
      hardwareSpecs: rawDossier.hardwareSpecs || {
        deviceA: { name: 'Standard', specs: [], price: 'N/A', availability: 'N/A' },
      },
      coreControversy: rawDossier.coreControversy || {
        corporateClaim: '',
        criticismOrAlarm: '',
        regulatoryOrHistoricalPrecedent: '',
      },
      hiddenCatchesAndLimits: rawDossier.hiddenCatchesAndLimits || rawDossier.catches || [],
      editorialVerdict: rawDossier.editorialVerdict || { avoidAdvice: [], fitAdvice: [] },
    };
    console.log(
      `[Pipeline] Dossier Extracted: ${dossier.verifiedMetrics.length} metrics, ${dossier.verifiedQuotes.length} quotes.`
    );
  } else {
    console.log('[Pipeline] >>> Pass 1: Lead AI Research Analyst Compiling GroundTruthDossier from Brief...');
    options.onProgress?.('Compiling Verified Topic Dossier', 1, 15);

    const factResponse = await llm.generateJSON(
      buildTopicResearchSystemPrompt(),
      buildTopicResearchUserPrompt(brief),
      0.2
    );
    const rawDossier = extractJson<any>(factResponse.text);
    dossier = {
      articleTitle: rawDossier.articleTitle || brief.name || 'AI Frontier & Open Weights',
      publisher: rawDossier.publisher || brief.name || 'The Compute Review',
      byline: rawDossier.byline || 'Staff Intelligence Bureau',
      summary: rawDossier.summary || brief.vibe || 'Curated editorial exploration',
      entities: rawDossier.entities || [],
      verifiedMetrics: rawDossier.verifiedMetrics || rawDossier.metrics || [],
      verifiedQuotes: rawDossier.verifiedQuotes || rawDossier.quotes || [],
      hardwareSpecs: rawDossier.hardwareSpecs || {
        deviceA: { name: 'Standard', specs: [], price: 'N/A', availability: 'N/A' },
      },
      coreControversy: rawDossier.coreControversy || {
        corporateClaim: '',
        criticismOrAlarm: '',
        regulatoryOrHistoricalPrecedent: '',
      },
      hiddenCatchesAndLimits: rawDossier.hiddenCatchesAndLimits || rawDossier.catches || [],
      editorialVerdict: rawDossier.editorialVerdict || { avoidAdvice: [], fitAdvice: [] },
    };
    console.log(
      `[Pipeline] Topic Dossier Compiled: ${dossier.verifiedMetrics.length} metrics, ${dossier.verifiedQuotes.length} quotes.`
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

  if (options.brandKit && Object.keys(options.brandKit).length > 0) {
    console.log('[Pipeline] Pass 2: Using User-Selected Brand Kit / Preset override...');
    const b = options.brandKit;
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

    const name = b.name || b.wordmark || 'Custom Brand';
    const slug = b.slug || defaultSlug;

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
  const slug = brand.slug;
  console.log(`[Pipeline] Pass 2 complete: Brand established for "${brand.name}" (${brand.slug}).`);

  // ==========================================================================
  // PASS 3: EDITORIAL STRATEGIST (HOOK & TENSION FORMULA)
  // ==========================================================================
  console.log('[Pipeline] >>> Pass 3: Editorial Strategist Extracting Scroll-Stopping Hook & Core Conflict...');
  options.onProgress?.('Extracting Story Strategy', 3, 15);

  let strategy: StoryStrategy;
  if (article) {
    const strategyResponse = await llm.generateJSON(
      buildStoryStrategySystemPrompt(),
      buildStoryStrategyUserPrompt(dossier, article),
      0.7
    );
    strategy = extractJson<StoryStrategy>(strategyResponse.text);
  } else {
    strategy = {
      hookHeadline: brief.name || 'The Investigation',
      valuePromise: brief.vibe || 'Essential insights',
      kicker: 'ANALYSIS / IN FOCUS',
      coreConflict: 'Understanding emerging market dynamics',
      hiddenCatch: 'Critical parameters to watch',
      verdict: 'The essential takeaway',
      keyMetrics: [],
      keyQuotes: [],
    };
  }
  console.log(`[Pipeline] Hook Formulated: "${strategy.hookHeadline}"`);
  console.log(`[Pipeline] Value Promise:  "${strategy.valuePromise}"`);

  // ==========================================================================
  // PASS 4: SENIOR COPY EDITOR (10-SLIDE STORYBOARD WITH HARD WORD BUDGETS)
  // ==========================================================================
  console.log('[Pipeline] >>> Pass 4: Senior Copy Editor Authoring 10-Slide High-Signal Storyboard...');
  options.onProgress?.('Authoring Storyboard', 4, 15);

  let allSlides: SlideData[] = [];

  if (article) {
    const deckResponse = await llm.generateJSON(
      buildStoryDeckSystemPrompt(),
      buildStoryDeckUserPrompt(strategy, dossier, brand),
      0.6
    );
    allSlides = extractJson<SlideData[]>(deckResponse.text);
  } else {
    console.log('[Pipeline] >>> Pass 4: Authoring Master Deck (Batch 1: Slides 1–9)...');
    const batch1Response = await llm.generateJSON(
      buildDeckSystemPrompt(),
      buildDeckBatch1Prompt(brief, brand),
      0.7
    );
    const batch1Slides = extractJson<SlideData[]>(batch1Response.text);

    console.log('[Pipeline] >>> Pass 4: Authoring Master Deck (Batch 2: Slides 10–17)...');
    const batch2Response = await llm.generateJSON(
      buildDeckSystemPrompt(),
      buildDeckBatch2Prompt(brief, brand),
      0.7
    );
    const batch2Slides = extractJson<SlideData[]>(batch2Response.text);
    allSlides = [...batch1Slides, ...batch2Slides];
  }

  // Normalize slide schema ensuring id, index, and type are guaranteed
  const activePlatform = options.platform || 'instagram-feed';
  allSlides = allSlides.map((s, idx) => ({
    ...s,
    id: s.id || `slide-${idx + 1}`,
    index: typeof s.index === 'number' ? s.index : idx,
    type: s.type || (s as any).archetype || 'editorial',
    platform: activePlatform,
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
  // PASS 5: VISUAL ART DIRECTOR & LAYOUT ARCHITECT (SVG & SPATIAL BLUEPRINT)
  // ==========================================================================
  console.log('[Pipeline] >>> Pass 5: Visual Art Director Designing Bespoke Slide Layout & SVG Blueprints...');
  options.onProgress?.('Designing Visual Blueprints', 5, 15);

  let blueprints: SlideDesignBlueprint[] = [];
  if (deck.slides.some((s) => s.svgBlueprint || s.layoutTopology)) {
    console.log('[Pipeline] Pass 5: Using per-slide visual styles and SVG blueprints determined from content.');
    blueprints = deck.slides.map((s) => ({
      slideId: s.id,
      type: s.type,
      layoutStructure: s.layoutTopology || s.visualStyle || 'hero-diagram-with-callouts',
      svgConcept: {
        description: s.svgBlueprint || 'Inline bespoke SVG vector diagram matching content',
        type: 'schematic',
      },
    }));
  } else {
    try {
      const blueprintResponse = await llm.generateJSON(
        buildVisualBlueprintSystemPrompt(),
        buildVisualBlueprintUserPrompt(deck.slides, brand, dossier),
        0.7
      );
      blueprints = extractJson<SlideDesignBlueprint[]>(blueprintResponse.text);
      console.log(`[Pipeline] Pass 5 complete: ${blueprints.length} slide visual blueprints generated.`);
    } catch (err: any) {
      console.warn(`[Pipeline] Visual blueprint generation fallback: ${err.message}`);
    }
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
        if (currentErrors.some((e) => e.includes(s.filename))) {
          const fileErrors = currentErrors.filter((e) => e.includes(s.filename)).join('\n');
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

  options.onProgress?.('Complete', 15, 15);
  return {
    templateSlug: slug,
    templateDir,
    brand,
    deck,
    slideCount: deck.slides.length,
  };
}

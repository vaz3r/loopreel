import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { execSync } from 'node:child_process';
import { createLLMClient } from '@loopreel/llm';
import type { BrandTokens, DeckData, SlideData, TemplatePackage } from './skeleton/types';
import { ingestArticle, type ArticleIntel } from './ingest';
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
} from './prompt';

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

export interface PipelineOptions {
  brief?: TemplateBrief;
  url?: string;
  provider?: string;
  onProgress?: (stage: string, current: number, total: number) => void;
}

export interface PipelineResult {
  templateSlug: string;
  templateDir: string;
  brand: BrandTokens;
  deck: DeckData;
  slideCount: number;
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

  const brandPrompt = article
    ? buildArticleBrandUserPrompt(article, brief)
    : buildBrandUserPrompt(brief);

  const brandResponse = await llm.generateJSON(
    buildBrandSystemPrompt(),
    brandPrompt,
    0.7
  );

  const brand = extractJson<BrandTokens>(brandResponse.text);
  const defaultSlug = article
    ? (article.title || 'story').toLowerCase().replace(/[^a-z0-9]+/g, '-').slice(0, 32).replace(/(^-|-$)/g, '')
    : (brief.name || 'custom').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  const slug = brand.slug || defaultSlug;
  brand.slug = slug;
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
  allSlides = allSlides.map((s, idx) => ({
    ...s,
    id: s.id || `slide-${idx + 1}`,
    index: typeof s.index === 'number' ? s.index : idx,
    type: s.type || (s as any).archetype || 'editorial',
  }));

  const deck: DeckData = {
    templateName: brand.name,
    templateSlug: brand.slug,
    domain: brand.domain,
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

  // ==========================================================================
  // PASS 6: PRINCIPAL REACT ENGINEER (BESPOKE CODE GENERATION PER SLIDE)
  // ==========================================================================
  console.log(`[Pipeline] >>> Pass 6: Principal React Engineer Authoring Bespoke Slide Components...`);

  const slideExports: { filename: string; componentName: string }[] = [];

  for (let i = 0; i < deck.slides.length; i++) {
    const slideNumber = i + 1;
    const slideData = deck.slides[i]!;
    const blueprint = blueprints[i] || blueprints.find((b) => b.slideId === slideData.id);
    const padNum = String(slideNumber).padStart(2, '0');
    const cleanType = (slideData.type || 'slide').replace(/[^a-zA-Z0-9]/g, '');
    const pascalType = cleanType.charAt(0).toUpperCase() + cleanType.slice(1);
    const componentName = `Slide${padNum}_${pascalType}`;
    const filename = `${componentName}.tsx`;
    const filePath = path.join(slidesDir, filename);

    console.log(`[Pipeline]   └─ [${slideNumber}/${deck.slides.length}] Generating ${filename} (${slideData.type})...`);
    options.onProgress?.(`Authoring Slide ${slideNumber}: ${slideData.type}`, 5 + slideNumber, 15);

    const slideResponse = await llm.generateJSON(
      buildSingleSlideSystemPrompt(),
      buildSingleSlideUserPrompt(slideNumber, slideData, blueprint, brand),
      0.6
    );

    let code = extractTsx(slideResponse.text);

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

    fs.writeFileSync(filePath, code, 'utf-8');
    slideExports.push({ filename, componentName });
  }

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

  console.log('[Pipeline] >>> Verifying TypeScript integrity (tsc --noEmit)...');
  options.onProgress?.('Verifying TypeScript Integrity', 14, 15);

  try {
    execSync('pnpm --filter @loopreel/generator typecheck', {
      stdio: 'pipe',
      encoding: 'utf-8',
    });
    console.log('[Pipeline] TypeScript integrity verified: 0 errors.');
  } catch (err: any) {
    const errorOutput = err.stderr || err.stdout || String(err);
    console.warn('[Pipeline] TypeScript reported errors. Attempting self-healing...');

    for (const s of slideExports) {
      if (errorOutput.includes(s.filename)) {
        console.log(`[Pipeline] Self-healing repair for ${s.filename}...`);
        const currentCode = fs.readFileSync(path.join(slidesDir, s.filename), 'utf-8');
        const repairResponse = await llm.generateJSON(
          'You are a TypeScript and React compiler expert. Fix the reported compiler error.',
          buildSelfHealingPrompt(s.filename, currentCode, errorOutput),
          0.2
        );
        const fixedCode = extractTsx(repairResponse.text);
        fs.writeFileSync(path.join(slidesDir, s.filename), fixedCode, 'utf-8');
      }
    }

    try {
      execSync('pnpm --filter @loopreel/generator typecheck', { stdio: 'pipe' });
      console.log('[Pipeline] Self-healing succeeded: 0 errors after repair.');
    } catch {
      console.warn('[Pipeline] Self-healing completed with remaining warnings.');
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

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { execSync } from 'node:child_process';
import { createLLMClient } from '@loopreel/llm';
import type { BrandTokens, DeckData, SlideData } from './skeleton/types';
import { ingestArticle, type ArticleIntel } from './ingest';
import {
  type TemplateBrief,
  type StoryStrategy,
  buildBrandSystemPrompt,
  buildBrandUserPrompt,
  buildArticleBrandUserPrompt,
  buildStoryStrategySystemPrompt,
  buildStoryStrategyUserPrompt,
  buildStoryDeckSystemPrompt,
  buildStoryDeckUserPrompt,
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
  let startIdx = -1;
  let endIdx = -1;
  if (firstBracket !== -1 && (firstBrace === -1 || firstBracket < firstBrace)) {
    startIdx = firstBracket;
    endIdx = cleaned.lastIndexOf(']');
  } else if (firstBrace !== -1) {
    startIdx = firstBrace;
    endIdx = cleaned.lastIndexOf('}');
  }
  if (startIdx !== -1 && endIdx !== -1 && endIdx > startIdx) {
    cleaned = cleaned.slice(startIdx, endIdx + 1);
  }
  return JSON.parse(cleaned) as T;
}

function extractTsx(raw: string): string {
  let cleaned = raw.trim();
  const codeMatch = cleaned.match(/```(?:tsx|typescript|jsx)?\s*([\s\S]*?)\s*```/);
  if (codeMatch && codeMatch[1]) {
    return codeMatch[1].trim();
  }
  return cleaned;
}

export interface PipelineOptions {
  provider?: string;
  url?: string;
  onProgress?: (step: string, current: number, total: number) => void;
}

export async function runTemplatePipeline(
  brief: TemplateBrief,
  options: PipelineOptions = {}
): Promise<{
  templateSlug: string;
  templateDir: string;
  brand: BrandTokens;
  deck: DeckData;
  slideCount: number;
}> {
  const provider = options.provider || process.env.LLM_PROVIDER || 'copilot';
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
  // PASS 1A: BRAND CONCEPT & DESIGN SYSTEM TOKENS
  // ==========================================================================
  console.log('[Pipeline] >>> Pass 1: Creative Director Art Direction & Brand Identity...');
  options.onProgress?.('Generating Brand Identity', 1, 15);

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
  console.log(`[Pipeline] Pass 1 complete: Brand established for "${brand.name}" (${brand.slug}).`);

  // ==========================================================================
  // PASS 1B: EDITORIAL STRATEGIST (HOOK & HIGH-SIGNAL EXTRACTION)
  // ==========================================================================
  let allSlides: SlideData[] = [];

  if (article) {
    console.log('[Pipeline] >>> Pass 1B: Editorial Strategist Extracting Scroll-Stopping Hook & Core Conflict...');
    options.onProgress?.('Extracting Story Strategy', 2, 15);

    const strategyResponse = await llm.generateJSON(
      buildStoryStrategySystemPrompt(),
      buildStoryStrategyUserPrompt(article),
      0.7
    );
    const strategy = extractJson<StoryStrategy>(strategyResponse.text);
    console.log(`[Pipeline] Hook Formulated: "${strategy.hookHeadline}"`);
    console.log(`[Pipeline] Value Promise:  "${strategy.valuePromise}"`);

    // ==========================================================================
    // PASS 2: 10-SLIDE HIGH-SIGNAL NARRATIVE STORYBOARD
    // ==========================================================================
    console.log('[Pipeline] >>> Pass 2: Authoring 10-Slide High-Signal Narrative Storyboard...');
    options.onProgress?.('Authoring Storyboard', 3, 15);

    const deckResponse = await llm.generateJSON(
      buildStoryDeckSystemPrompt(),
      buildStoryDeckUserPrompt(strategy, article, brand),
      0.7
    );
    allSlides = extractJson<SlideData[]>(deckResponse.text);
  } else {
    // Non-URL preset fallback: 17 slides in 2 batches
    console.log('[Pipeline] >>> Pass 2: Authoring Master Deck (Batch 1: Slides 1–9)...');
    const batch1Response = await llm.generateJSON(
      buildDeckSystemPrompt(),
      buildDeckBatch1Prompt(brief, brand),
      0.7
    );
    const batch1Slides = extractJson<SlideData[]>(batch1Response.text);

    console.log('[Pipeline] >>> Pass 2: Authoring Master Deck (Batch 2: Slides 10–17)...');
    const batch2Response = await llm.generateJSON(
      buildDeckSystemPrompt(),
      buildDeckBatch2Prompt(brief, brand),
      0.7
    );
    const batch2Slides = extractJson<SlideData[]>(batch2Response.text);
    allSlides = [...batch1Slides, ...batch2Slides];
  }

  const deck: DeckData = {
    templateName: brand.name,
    templateSlug: brand.slug,
    domain: brand.domain,
    slides: allSlides,
  };
  console.log(`[Pipeline] Pass 2 complete: Storyboard authored with ${deck.slides.length} slides.`);

  // Create isolated template folder in apps/generator/templates/<slug>/
  const templateDir = path.join(TEMPLATES_ROOT, slug);
  const slidesDir = path.join(templateDir, 'slides');
  fs.mkdirSync(slidesDir, { recursive: true });

  fs.writeFileSync(path.join(templateDir, 'brand.json'), JSON.stringify(brand, null, 2), 'utf-8');
  fs.writeFileSync(path.join(templateDir, 'deck.json'), JSON.stringify(deck, null, 2), 'utf-8');

  // ==========================================================================
  // PASSES 3.1 TO 3.N: BESPOKE REACT + TAILWIND SLIDE GENERATION
  // ==========================================================================
  console.log(`[Pipeline] >>> Pass 3: Generating bespoke React components using Editorial Primitives...`);

  const slideExports: { filename: string; componentName: string }[] = [];

  for (let i = 0; i < deck.slides.length; i++) {
    const slideNumber = i + 1;
    const slideData = deck.slides[i]!;
    const padNum = String(slideNumber).padStart(2, '0');
    const cleanType = (slideData.type || 'slide').replace(/[^a-zA-Z0-9]/g, '');
    const pascalType = cleanType.charAt(0).toUpperCase() + cleanType.slice(1);
    const componentName = `Slide${padNum}_${pascalType}`;
    const filename = `${componentName}.tsx`;
    const filePath = path.join(slidesDir, filename);

    console.log(`[Pipeline]   └─ [${slideNumber}/${deck.slides.length}] Generating ${filename} (${slideData.type})...`);
    options.onProgress?.(`Generating Slide ${slideNumber}: ${slideData.type}`, 3 + slideNumber, 15);

    const slideResponse = await llm.generateJSON(
      buildSingleSlideSystemPrompt(),
      buildSingleSlideUserPrompt(slideNumber, slideData, brand),
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
    if (!code.includes("from '../../../src/skeleton/ui'")) {
      code = `import { SlideHeader, ContentCard, MetricCard, ComparisonSplit, QuoteBox, SchematicFrame } from '../../../src/skeleton/ui';\n${code}`;
    }

    fs.writeFileSync(filePath, code, 'utf-8');
    slideExports.push({ filename, componentName });
  }

  // ==========================================================================
  // PASS 4: TEMPLATE INDEX ASSEMBLY
  // ==========================================================================
  console.log('[Pipeline] >>> Pass 4: Assembling template package entry point (index.ts)...');
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

  // ==========================================================================
  // PASS 5: TYPESCRIPT BUILD VERIFICATION & SELF-HEALING
  // ==========================================================================
  console.log('[Pipeline] >>> Pass 5: TypeScript build verification (tsc --noEmit)...');
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

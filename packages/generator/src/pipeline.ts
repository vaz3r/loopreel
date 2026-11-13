import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import ts from 'typescript';
import { createLLMClient } from '@loopreel/llm';
import type { BrandTokens, DeckData, SlideData } from './skeleton/types.js';
import { ingestArticle, type ArticleIntel } from './ingest.js';
import {
  type TemplateBrief,
  type NarrativePreset,
  type NarrativeDossier,
  type SlideDesignBlueprint,
  type NarrativeIntelligence,
  type StoryStrategy,
  buildNarrativeIntelligenceSystemPrompt,
  buildNarrativeIntelligenceUserPrompt,
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

  // 1. Fix broken chained optional access: slide.items?.?.property -> slide.items?.[N]?.property
  let titleIndex = 0;
  code = code.replace(/slide\.([a-zA-Z0-9_]+)\?\.\?\.title/g, (_m, prop) => {
    return `slide.${prop}?.[${titleIndex++}]?.title`;
  });
  let bodyIndex = 0;
  code = code.replace(/slide\.([a-zA-Z0-9_]+)\?\.\?\.body/g, (_m, prop) => {
    return `slide.${prop}?.[${bodyIndex++}]?.body`;
  });
  code = code.replace(/slide\.([a-zA-Z0-9_]+)\?\.\?\.([a-zA-Z0-9_]+)/g, 'slide.$1?.[0]?.$2');

  // 2. Fix dangling optional chaining: any variable or property followed by ?. and punctuation/newline/operator
  let danglingIdx = 0;
  code = code.replace(/([a-zA-Z0-9_$]+(?:\.[a-zA-Z0-9_$]+)*)\?\.\s*(?=[;,)\n}\?])/g, (_m, expr) => {
    return `${expr}?.[${danglingIdx++}]`;
  });

  // 3. Fix sequential unpacking of array variables without index:
  // e.g. const openingUS = cards; const openingIsrael = cards; -> cards[0], cards[1]
  // or const first = milestones; const second = milestones; -> milestones[0], milestones[1]
  const collectionNames = new Set([
    'cards',
    'metrics',
    'items',
    'telemetry',
    'stages',
    'steps',
    'columns',
    'milestones',
    'events',
    'points',
    'phases',
    'quotes',
    'takeaways',
  ]);

  // First pass: detect ANY identifier assigned to multiple distinct variables
  const assignRegex = /(?:const|let)\s+([a-zA-Z0-9_$]+)\s*=\s*([a-zA-Z0-9_$]+)\s*;/g;
  const rhsCounts: Record<string, number> = {};
  let matchAssign: RegExpExecArray | null;
  while ((matchAssign = assignRegex.exec(code)) !== null) {
    const lhs = matchAssign[1];
    const rhs = matchAssign[2];
    if (lhs && rhs && lhs !== rhs && !collectionNames.has(lhs)) {
      rhsCounts[rhs] = (rhsCounts[rhs] || 0) + 1;
    }
  }

  const universalRhsIndex: Record<string, number> = {};
  code = code.replace(/((?:const|let)\s+([a-zA-Z0-9_$]+)\s*=\s*)([a-zA-Z0-9_$]+)(\s*;)/g, (full, prefix, lhs, rhs, suffix) => {
    if (lhs && rhs && lhs !== rhs && !collectionNames.has(lhs) && rhsCounts[rhs] && rhsCounts[rhs] >= 2) {
      const idx = universalRhsIndex[rhs] ?? 0;
      universalRhsIndex[rhs] = idx + 1;
      return `${prefix}${rhs}[${idx}]${suffix}`;
    }
    return full;
  });

  const arrayCounts: Record<string, number> = {};
  code = code.replace(/((?:const|let)\s+([a-zA-Z0-9_$]+)\s*=\s*)(cards|metrics|items|telemetry|stages|steps|columns|milestones|events|points|phases|quotes|takeaways)(\s*;)/g, (match, prefix, varName, arr, suffix) => {
    if (collectionNames.has(varName)) return match; // keep array aliases intact
    const idx = arrayCounts[arr] ?? 0;
    arrayCounts[arr] = idx + 1;
    return `${prefix}${arr}[${idx}]${suffix}`;
  });

  // 3b. Fix unindexed assignment from .split(...) or .match(...) array variables:
  // e.g. const ancientBadge = str.split(' '); const ancientMetric = ancientBadge; -> const ancientMetric = ancientBadge[0];
  const splitVars = new Set<string>();
  const splitRegex = /(?:const|let)\s+([a-zA-Z0-9_$]+)\s*=\s*[^;]+?\.(?:split|match)\s*\([^;]+?\)\s*;/g;
  let sm: RegExpExecArray | null;
  while ((sm = splitRegex.exec(code)) !== null) {
    if (sm[1]) splitVars.add(sm[1]);
  }
  if (splitVars.size > 0) {
    const list = Array.from(splitVars).join('|');
    code = code.replace(
      new RegExp(`((?:const|let)\\s+([a-zA-Z0-9_$]+)\\s*=\\s*)(${list})(\\s*;)`, 'g'),
      (full, prefix, lhs, rhs, suffix) => {
        if (lhs !== rhs && !/words|parts|tokens|array|list/i.test(lhs)) {
          return `${prefix}${rhs}[0]${suffix}`;
        }
        return full;
      }
    );
  }

  // 4. Fix unindexed numbered variable declaration: e.g. const item0 = items; -> const item0 = items[0];
  code = code.replace(/const\s+([a-zA-Z0-9_$]*?(?:item|card|col|metric|entry|stage|step|milestone))([0-9])\s*=\s*([a-zA-Z0-9_$.]+?)\s*;/g, (match, prefix, num, rhs) => {
    if (rhs.includes('[')) return match;
    return `const ${prefix}${num} = ${rhs}[${num}];`;
  });

  // 4. Fix array helper objects with repeated unindexed collection properties:
  // e.g. { card: cards, metric: telemetry }, { card: cards, inventory: telemetry } inside an array literal
  const propCounters: Record<string, number> = {};
  code = code.replace(/(\b[a-zA-Z0-9_$]+\s*:\s*)(cards|items|telemetry|metrics|stages|steps|milestones|columns|points|specs|callouts|entries|inventory)\b(?!\s*\[)/g, (_m, prefix, arr) => {
    const key = prefix.trim();
    const count = propCounters[key] || 0;
    propCounters[key] = count + 1;
    return `${prefix}${arr}[${count}]`;
  });

  // 4b. Fix array literals with unindexed repeated identifiers:
  // e.g. [guardrails, guardrails] -> [guardrails[0], guardrails[1]]
  // e.g. [items, items, items] -> [items[0], items[1], items[2]]
  code = code.replace(/\[\s*([a-zA-Z0-9_$]+)\s*(?:,\s*\1\s*)+(?:,\s*)?\]/g, (fullMatch, ident) => {
    let count = 0;
    return fullMatch.replace(new RegExp(`\\b${ident}\\b(?!\\s*\\[)`, 'g'), () => {
      return `${ident}[${count++}]`;
    });
  });

  // 4c. Fix repeated unindexed array variables rendered in JSX:
  // e.g. <span className="block">{headlineLines}</span>
  //      <span className="block">{headlineLines}</span>
  //      <span className="block">{headlineLines}</span>
  // -> {headlineLines[0]}, {headlineLines[1]}, {headlineLines[2]}
  const jsxArrayCounts: Record<string, number> = {};
  code = code.replace(/\{([a-zA-Z0-9_$]*(?:Lines|Parts|Words|Items|Cards|List|Array))\}\s*(?=<\/(?:span|p|h[1-6]|div)>)/g, (_m, ident) => {
    const idx = jsxArrayCounts[ident] ?? 0;
    jsxArrayCounts[ident] = idx + 1;
    return `{${ident}[${idx}]}`;
  });

  // 5. Fix unindexed items/cards/telemetry/metrics/inventory/specs/badges property access when variable is an array
  const unindexedPropCounts: Record<string, number> = {};
  code = code.replace(
    /(\b(?:cards|items|telemetry|metrics|inventory|specs|badges|stats|callouts|points))\??\.(title|label|body|metric|badge|value|val)(?!\s*\[)/g,
    (_m, varName, prop) => {
      const key = `${varName}.${prop}`;
      const count = unindexedPropCounts[key] ?? 0;
      unindexedPropCounts[key] = count + 1;
      return `${varName}?.[${count}]?.${prop}`;
    }
  );
  // Protect subsequent chained property access on metric (e.g. items?.[0]?.metric.badge -> items?.[0]?.metric?.badge)
  code = code.replace(/(\?\.\[\d+\]\?\.metric)\.([a-zA-Z]+)/g, '$1?.$2');

  // 6. Strip meta-attributions: eliminate robotic phrases like "The article states that", "The text notes", etc.
  code = code.replace(/\b(?:The|This)\s+(?:article|piece|report|text|source|account)\s+(?:states|says|reports|claims|notes|explains|observes|contrasts|describes)\s+(?:that\s+)?/gi, '');
  code = code.replace(/\bAccording\s+to\s+(?:the\s+)?(?:article|piece|report|text|source|account),\s*/gi, '');

  // 7. Auto-protect and promote main H1 headline to canonical editorial text-[64px]
  code = code.replace(/(<h1\b[^>]*\bclassName="[^"]*?)\btext-\[(?:2[0-9]|3[0-9]|4[0-9]|5[0-2])px\]/g, '$1text-[64px]');

  // 8. Fix unindexed array assignment to metric variables:
  // e.g. const metric = hasQualifier ? remainingWords : firstWord;
  // -> const metric = hasQualifier ? (remainingWords[0] ?? '') : firstWord;
  code = code.replace(/(\bmetric\s*=\s*[^;]*?\bremainingWords\b)(?!\s*\[)(?!\s*\.join)/g, '$1[0]');
  code = code.replace(/const\s+metric\s*=\s*remainingWords\s*;/g, 'const metric = remainingWords[0] ?? "";');

  // 9. Web UI trope sanitizer: enforce editorial print standards (zero drop shadows, zero pill badges on cards/kickers, zero progress bars)
  code = code.replace(/\bshadow-(?:lg|md|xl|2xl|sm)\b/g, '');
  code = code.replace(/\bborder-l-\[(?:4|6|8)px\]\b/g, 'border border-[var(--border)]');
  code = code.replace(/\bborder-l-[468]\b/g, 'border border-[var(--border)]');
  code = code.replace(/\brounded-(?:lg|xl|2xl|3xl)\b/g, 'rounded-none');

  // 10. Strip fake text skeleton wireframe paths inside SVGs (e.g. M106 529H276 M106 542H245)
  code = code.replace(/<path\b[^>]*\bd="M[0-9]+\s+[0-9]+H[0-9]+(?:\s+M[0-9]+\s+[0-9]+H[0-9]+)+[^"]*"[^>]*\/?>/gi, '');

  // 12. Fix dangling or double optional chaining:
  // e.g. .split('/')?.?.trim() -> .split('/')?.[0]?.trim()
  // e.g. telemetry?.; -> telemetry;
  code = code.replace(/\?\.[\s]*\?\.+/g, '?.[0]?.');
  code = code.replace(/\?\.[\s]*\?\.\[/g, '?.[');
  code = code.replace(/\?\.[\s]*;/g, ';');
  code = code.replace(/\?\.[\s]*\)/g, ')');
  code = code.replace(/\?\.[\s]*,/g, ',');

  // 13. Telemetry double-indexing repair: prevent blank metric glitches where LLM writes
  // const telemetry = slide.telemetry?.[0]; ... telemetry?.[0]?.badge
  code = code.replace(/(\btelemetry\b)\?\.\[0\]\?\.\[0\]/g, '$1?.[0]');
  code = code.replace(/(\btelemetry\b)\?\.\[(\d+)\]\?\.\[(\d+)\]/g, '$1?.[$2]');
  code = code.replace(/const\s+(\w+)\s*=\s*(?:slide\.)?telemetry\?\.\[(\d+)\];([\s\S]*?)\b\1\?\.\[\d+\]\?\.badge/g, 'const $1 = slide.telemetry?.[$2];$3$1?.badge');
  if (/const\s+(\w+)\s*=\s*(?:slide\.)?telemetry\?\.\[\d+\]/i.test(code)) {
    const match = code.match(/const\s+(\w+)\s*=\s*(?:slide\.)?telemetry\?\.\[\d+\]/i);
    if (match) {
      const varName = match[1];
      const reg = new RegExp(`\\b${varName}\\?\\.\\[\\d+\\]\\?\\.(badge|label|value|qualifier|unit)`, 'g');
      code = code.replace(reg, `${varName}?.$1`);
    }
  }

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
  preset?: string;
  narrativePreset?: NarrativePreset;
  targetSlideCount?: number;
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
    options.onProgress?.('Ingesting Article Content', 0, 4);
    article = await ingestArticle(articleUrl);
  }

  // ==========================================================================
  // PASS 1: INVESTIGATIVE FACT-CHECKER & CONTENT DOSSIER (ZERO HALLUCINATION)
  // ==========================================================================
  console.log('[Pipeline] >>> Pass 1/7: Analyzing Content & Formulating Ground Truth Dossier...');
  options.onProgress?.('Extracting Ground Truth & Content Intelligence', 1, 7);

  const narrativeResponse = await llm.generateJSON(
    buildNarrativeIntelligenceSystemPrompt(),
    buildNarrativeIntelligenceUserPrompt({
      article,
      brief,
      promptText: brief.name || options.brief?.name,
    }),
    0.2 // Low temperature for high factual precision & journalistic punch
  );
  const narrative = extractJson<NarrativeIntelligence>(narrativeResponse.text);

  console.log(`[Pipeline] Pass 1 Complete:`);
  console.log(`[Pipeline]   Hook:    "${narrative.hookHeadline}"`);
  console.log(`[Pipeline]   Promise: "${narrative.valuePromise}"`);
  console.log(`[Pipeline]   Metaphor: "${narrative.visualMetaphor || narrative.editorialTheme}"`);

  // Unified research dossier for disk persistence
  const dossier: NarrativeDossier = narrative;

  // ==========================================================================
  // PASS 2: CREATIVE DIRECTOR ART DIRECTION & BRAND IDENTITY
  // ==========================================================================
  console.log('[Pipeline] >>> Pass 2/7: Establishing Bespoke Brand Identity & Publication Masthead...');
  options.onProgress?.('Establishing Editorial Masthead & Design System', 2, 7);

  const defaultSlug = (narrative.articleTitle || article?.title || brief.name || 'story')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .slice(0, 32)
    .replace(/(^-|-$)/g, '');

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

    const name = b.name || b.wordmark || narrative.publisher || 'Custom Brand';
    const slug = options.preset || defaultSlug;

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
      aestheticPreset: (b.aestheticPreset as any) || 'sculptural-monolith',
    };
  } else {
    const brandPrompt = article
      ? buildArticleBrandUserPrompt(article, brief)
      : buildBrandUserPrompt({
          ...brief,
          name: narrative.publisher || brief.name,
          domain: brief.domain || `${defaultSlug}.pub`,
          vibe: `${narrative.visualMetaphor || narrative.editorialTheme} - ${narrative.kicker}`,
        });

    const brandResponse = await llm.generateJSON(
      buildBrandSystemPrompt(),
      brandPrompt,
      0.7
    );

    brand = extractJson<BrandTokens>(brandResponse.text);
    brand.slug = options.preset || brand.slug || defaultSlug;
    brand.aestheticPreset = brand.aestheticPreset || 'sculptural-monolith';
  }

  brand.platform = options.platform || 'instagram-feed';
  const slug = options.preset || brand.slug || defaultSlug;
  brand.slug = slug;
  console.log(`[Pipeline] Pass 2 complete: Brand established for "${brand.name}" (${brand.slug}, style: ${brand.aestheticPreset || 'default'}).`);

  const rawBrandKit = (options.brandKit as any) || {};
  const narrativePreset: NarrativePreset =
    options.narrativePreset ||
    rawBrandKit.narrativePreset ||
    'storytelling';

    const targetSlideCount: number =
    typeof options.targetSlideCount === 'number'
      ? options.targetSlideCount
      : typeof rawBrandKit.targetSlideCount === 'number'
      ? rawBrandKit.targetSlideCount
      : 7;

  // ==========================================================================
  // PASS 3: EDITORIAL STRATEGIST (HOOK & TENSION FORMULA)
  // ==========================================================================
  console.log('[Pipeline] >>> Pass 3/7: Editorial Strategist Extracting Scroll-Stopping Hook & Core Conflict...');
  options.onProgress?.('Formulating Narrative Strategy & Tension Formula', 3, 7);

  let strategy: StoryStrategy;
  try {
    const strategyResponse = await llm.generateJSON(
      buildStoryStrategySystemPrompt(narrativePreset),
      buildStoryStrategyUserPrompt(dossier, article),
      0.5
    );
    strategy = extractJson<StoryStrategy>(strategyResponse.text);
    console.log(`[Pipeline] Pass 3 complete: Hook "${strategy.hookHeadline}", Promise "${strategy.valuePromise}".`);
  } catch (err: any) {
    console.warn(`[Pipeline] Pass 3 note: ${err.message}, using dossier defaults.`);
    strategy = {
      hookHeadline: narrative.hookHeadline || 'The Investigation',
      valuePromise: narrative.valuePromise || 'Essential systemic findings',
      kicker: narrative.kicker || 'SPECIAL REPORT',
      coreConflict: narrative.coreConflict ? `${narrative.coreConflict.claim} vs ${narrative.coreConflict.reality}` : 'Underlying corporate trade-offs',
      hiddenCatch: (narrative.hiddenCatches || []).join('; ') || 'Critical regulatory loopholes',
      verdict: narrative.verdict || 'The permanent shift in the landscape',
      keyMetrics: (narrative.verifiedMetrics || []).map((m) => ({ value: m.value, label: m.label, context: m.context || '' })),
      keyQuotes: (narrative.verifiedQuotes || []).map((q) => ({ quote: q.quote, speaker: q.speaker, role: q.role || '' })),
    };
  }

  // ==========================================================================
  // PASS 4: SENIOR COPY EDITOR (DYNAMIC STORYBOARD WITH CONTENT-DRIVEN TOPOLOGY)
  // ==========================================================================
  console.log(`[Pipeline] >>> Pass 4/7: Senior Copy Editor Authoring ${targetSlideCount}-Slide Storyboard...`);
  options.onProgress?.('Authoring Storyboard & Editorial Copy', 4, 7);

  const deckResponse = await llm.generateJSON(
    buildStoryDeckSystemPrompt(narrativePreset, targetSlideCount),
    buildStoryDeckUserPrompt(dossier, brand, targetSlideCount),
    0.6
  );
  let allSlides = extractJson<SlideData[]>(deckResponse.text);
  if (!Array.isArray(allSlides) || allSlides.length === 0) {
    console.warn('[Pipeline] Storyboard JSON was not an array, attempting object extraction...');
    allSlides = (allSlides as any)?.slides || [];
  }

  // Normalize slide schema and ensure unique IDs, indexes, and archetypes
  const activePlatform = options.platform || 'instagram-feed';

  allSlides = allSlides.map((s, idx) => {
    const chosenTopology = s.layoutTopology || s.visualStyle || (idx === 0 ? 'monumental-editorial-cover' : 'asymmetric-editorial-cards');
    const chosenStyle = s.visualStyle || chosenTopology;
    const archetype = s.archetype || chosenTopology;

    return {
      ...s,
      id: s.id || `slide-${idx + 1}`,
      index: typeof s.index === 'number' ? s.index : idx,
      type: s.type || (s as any).archetype || (idx === 0 ? 'cover' : 'editorial'),
      archetype,
      layoutTopology: chosenTopology,
      visualStyle: chosenStyle,
      platform: activePlatform,
    };
  });

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
  if (fs.existsSync(slidesDir)) {
    const existing = fs.readdirSync(slidesDir);
    for (const f of existing) {
      if (f.endsWith('.tsx') || f.endsWith('.ts')) {
        fs.unlinkSync(path.join(slidesDir, f));
      }
    }
  }
  fs.mkdirSync(slidesDir, { recursive: true });

  fs.writeFileSync(path.join(templateDir, 'brand.json'), JSON.stringify(brand, null, 2), 'utf-8');
  fs.writeFileSync(path.join(templateDir, 'deck.json'), JSON.stringify(deck, null, 2), 'utf-8');
  fs.writeFileSync(path.join(templateDir, 'dossier.json'), JSON.stringify(dossier, null, 2), 'utf-8');

  // ==========================================================================
  // PASS 5: VISUAL ART DIRECTOR & LAYOUT ARCHITECT (BESPOKE SVG & SPATIAL BLUEPRINTS)
  // ==========================================================================
  console.log(`[Pipeline] >>> Pass 5/7: Visual Art Director Designing Bespoke Slide Layout & SVG Blueprints...`);
  options.onProgress?.('Designing Bespoke Layout & SVG Infographic Blueprints', 5, 7);

  let blueprints: SlideDesignBlueprint[] = [];
  try {
    const blueprintResponse = await llm.generateJSON(
      buildVisualBlueprintSystemPrompt(deck.slides.length),
      buildVisualBlueprintUserPrompt(deck.slides, brand, dossier),
      0.5
    );
    const parsedBlueprints = extractJson<SlideDesignBlueprint[]>(blueprintResponse.text);
    if (Array.isArray(parsedBlueprints) && parsedBlueprints.length > 0) {
      blueprints = parsedBlueprints;
      console.log(`[Pipeline] Pass 5 complete: ${blueprints.length} bespoke slide visual blueprints generated.`);
    }
  } catch (err: any) {
    console.warn(`[Pipeline] Pass 5 blueprint generation note: ${err.message}`);
  }

  blueprints = deck.slides.map((s, idx) => {
    const found = blueprints.find((b) => b.slideId === s.id || b.slideId === `slide-${idx + 1}`);
    const svgDescription = found?.svgConcept?.description || s.svgBlueprint || 'Bespoke editorial vector infographic matching slide thesis';
    return {
      slideId: s.id,
      type: s.type,
      layoutStructure: found?.layoutStructure || s.layoutTopology || s.archetype || 'asymmetric-editorial-cards',
      svgConcept: {
        description: svgDescription,
        type: found?.svgConcept?.type || 'schematic',
        elements: found?.svgConcept?.elements || [],
      },
      spatialBalanceGuidance: found?.spatialBalanceGuidance,
    };
  });

  // ==========================================================================
  // PASS 6: PRINCIPAL REACT ENGINEER (PARALLEL BESPOKE CODE GENERATION)
  // ==========================================================================
  const concurrency = options.concurrency || 3;
  console.log(
    `[Pipeline] >>> Pass 6/7: Synthesizing Slides Final Form in Parallel (Concurrency: ${concurrency})...`
  );
  options.onProgress?.('Synthesizing Slide React Components', 6, 7);

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
    options.onProgress?.(`Pass 6/7: Synthesizing Slide ${slideNumber}: ${slideData.type}`, slideNumber, deck.slides.length);

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
        /import (?:type )?\{([^}]+)\}\s*from\s*['"][^'"]+['"];?/,
        "import {$1} from '../../../src/skeleton/types';"
      );
    }
    if (code.includes('parseMetricBadge') && !code.includes('parseMetricBadge,')) {
      code = code.replace(
        /import\s*\{(?:\s*type\s+)?SlideComponentProps\s*\}\s*from\s*['"][^'"]+['"];?/,
        "import { parseMetricBadge, type SlideComponentProps } from '../../../src/skeleton/types';"
      );
    }
    if (!code.includes('SlideComponentProps')) {
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
  // PASS 7: TEMPLATE ENTRYPOINT ASSEMBLY & TYPESCRIPT COMPILER VERIFICATION
  // ==========================================================================
  console.log('[Pipeline] >>> Pass 7/7: Assembling template package entry point (index.ts) and verifying TypeScript integrity...');
  options.onProgress?.('Assembling Template Entry Point', 7, 7);
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

  console.log(`[Pipeline] >>> Pass 7/7: Verifying TypeScript compiler integrity for template ${slug}...`);
  options.onProgress?.('Verifying Template Integrity & TypeScript Verification', 7, 7);

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

  options.onProgress?.('Complete', 7, 7);
  return {
    templateSlug: slug,
    templateDir,
    brand,
    deck,
    slideCount: deck.slides.length,
  };
}

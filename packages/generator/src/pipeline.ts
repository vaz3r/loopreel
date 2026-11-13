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
  buildNarrativeIntelligenceSystemPrompt,
  buildNarrativeIntelligenceUserPrompt,
  buildBrandSystemPrompt,
  buildBrandUserPrompt,
  buildArticleBrandUserPrompt,
  buildStoryDeckSystemPrompt,
  buildStoryDeckUserPrompt,
  buildSingleSlideSystemPrompt,
  buildSingleSlideUserPrompt,
  buildSelfHealingPrompt,
} from './prompt.js';

export function getDeterministicArchetypeSequence(count: number): string[] {
  const n = Math.max(4, Math.min(14, count));
  const bodyPool = [
    'asymmetric-editorial-cards',
    'hero-metric-placard',
    'vertical-milestone-spine',
    'full-height-editorial-split',
    'three-row-verification-ledger',
  ];

  const sequence: string[] = ['monumental-editorial-cover'];

  for (let i = 1; i < n - 1; i++) {
    const candidate = bodyPool[(i - 1) % bodyPool.length]!;
    if (sequence[i - 1] === candidate) {
      const alt = bodyPool[i % bodyPool.length]!;
      sequence.push(alt);
    } else {
      sequence.push(candidate);
    }
  }

  // Final slide: verdict / takeaway diptych (ensure not equal to previous)
  const prev = sequence[sequence.length - 1];
  const finalCandidate = prev === 'asymmetric-editorial-cards'
    ? 'full-height-editorial-split'
    : 'asymmetric-editorial-cards';
  sequence.push(finalCandidate);

  return sequence;
}

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

  // 7. Multi-column font clamping: in 2-column or split layouts, clamp numerals >64px down to 56px to prevent column blowout
  if (/grid-cols-2|grid-cols-3|grid-cols-\[.*?(?:fr|px).*?\]/i.test(code)) {
    code = code.replace(/text-\[(?:8[0-9]|9[0-9]|1[0-1][0-9])px\]/g, 'text-[56px]');
  }

  // 8. Fix unindexed array assignment to metric variables:
  // e.g. const metric = hasQualifier ? remainingWords : firstWord;
  // -> const metric = hasQualifier ? (remainingWords[0] ?? '') : firstWord;
  code = code.replace(/(\bmetric\s*=\s*[^;]*?\bremainingWords\b)(?!\s*\[)(?!\s*\.join)/g, '$1[0]');
  code = code.replace(/const\s+metric\s*=\s*remainingWords\s*;/g, 'const metric = remainingWords[0] ?? "";');

  // 9. Multi-row ledger font clamping: in 3+ row stacked layouts (grid-rows-3, grid-rows-4),
  // clamp numerals > 44px down to 40px and headers > 30px down to 28px to eliminate row boundary overflow
  if (/grid-rows-(?:3|4|5)/i.test(code)) {
    code = code.replace(/text-\[(?:4[5-9]|[5-9][0-9]|1[0-1][0-9])px\]/g, 'text-[40px]');
    code = code.replace(/text-\[(?:3[1-9]|4[0-9])px\]/g, 'text-[28px]');
  }

  // 10. Web UI trope sanitizer: enforce editorial print standards (zero drop shadows, zero pill badges on cards/kickers, zero progress bars)
  code = code.replace(/\bshadow-(?:lg|md|xl|2xl|sm)\b/g, '');
  code = code.replace(/\bborder-l-\[(?:4|6|8)px\]\b/g, 'border border-[var(--border)]');
  code = code.replace(/\bborder-l-[468]\b/g, 'border border-[var(--border)]');
  code = code.replace(/\brounded-(?:lg|xl|2xl|3xl)\b/g, 'rounded-none');

  // 11. SVG text stripper: remove rogue <text>...</text> tags from inside <svg> blocks (Tipaza rule: all typography belongs in HTML)
  code = code.replace(/<svg\b[^>]*>([\s\S]*?)<\/svg>/gi, (svgBlock) => {
    return svgBlock.replace(/<text\b[^>]*>[\s\S]*?<\/text>/gi, '');
  });

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

export function getDomainSvgBlueprints(themeText: string): string[] {
  const lower = themeText.toLowerCase();
  const isFinance = /card|bank|float|interest|cash|dollar|fund|revenue|profit|asset|liability|balance|escrow|fintech|invest|corporate|seattle/i.test(lower);
  const isTech = /chip|silicon|die|gpu|cpu|ai|model|llm|software|hardware|compute|latency|server|network|cloud|drone|robot/i.test(lower);
  const isGeo = /geopolitic|military|territor|maritime|defense|war|treaty|border|corridor|soviet|sanction/i.test(lower);

  if (isFinance) {
    return [
      '600×750 viewBox; 40px safe margins. Dark paper field. In the center, an imposing geometric stored-value card silhouette in dark surface and ink with a 1px vermilion magnetic stripe hairline, micro-coordinates [37°N 122°W], and subtle foil stamp registration crosshairs. Geometric editorial linework. No clipart, no flowchart pipes, zero text in SVG.',
      '600×750 viewBox; 40px margins. Stack two offset, full-width cards beneath a 44px headline. Subtle geometric balance-sheet grid with 1px hairlines and crosshair registration marks behind the cards. Clean graphic precision, not a flowchart.',
      '600×750 viewBox; 40px margins. Dark paper field with a full-width surface metric placard. Render massive numeral in ink, with attribution below. An accent fracture interrupts the placard’s lower border, leading into one compact consequence card. Exactly two content groups; no decorative chart axes.',
      '600×750 viewBox; 40px margins. Three stacked milestones on a left-aligned 1px hairline spine. Use accent broken segments for catalysts; clean surface milestone panels. Background dark paper; each panel contains its date/tag, short title, and body only.',
      '600×750 viewBox; 40px margins. Beneath a 44px headline, divide the body into two tall panels separated by an accent discontinuity. Left: dark surface with corporate float ledger strata and 1px hairlines. Right: paper with verified badges. Bottom full-width rule holds closing takeaway.',
      '600×750 viewBox; 40px margins. Clean 3-row tabular ledger divided by 1px hairlines with monospace indexes [01], [02], [03], 2-word labels, 5-8 word findings with bold anchors, and right-aligned metric badges. Clean technical registration marks.',
      '600×750 viewBox; 40px margins. Final asymmetric verdict diptych with monumental closing takeaway, signature publication wordmark, and subtle balance-sheet strata boundary mark.',
    ];
  }

  if (isTech) {
    return [
      '600×750 viewBox; 40px safe margins. Dark paper field. In the center, an imposing geometric silicon die section silhouette in dark surface and ink with 1px bus interconnect hairlines, micro-stepped cache strata, and registration crosshairs. Clean engineering linework. Zero text in SVG, zero flowchart pipes.',
      '600×750 viewBox; 40px margins. Stack two offset cards. Subtle 1px bus traces and logic-gate coordinate ticks behind the cards. High precision technical linework, not a flowchart.',
      '600×750 viewBox; 40px margins. Dark paper field with a full-width surface metric placard. Accent fracture line cutting across 1px dimension hairlines. Clean editorial layout, zero charts.',
      '600×750 viewBox; 40px margins. Three stacked milestones on a left-aligned 1px hairline spine. Precision micro-ticks and bus routing hairlines.',
      '600×750 viewBox; 40px margins. Split diptych: Left dark surface with architectural wafer section silhouette and 1px hairlines. Right paper with verified specs.',
      '600×750 viewBox; 40px margins. Clean 3-row tabular verification ledger with monospace indexes [01], [02], [03], 1px dividers, and right-aligned metric badges.',
      '600×750 viewBox; 40px margins. Final verdict diptych with closing takeaway and clean technical boundary marks.',
    ];
  }

  if (isGeo) {
    return [
      '600×750 viewBox; 40px safe margins. Dark paper field. In the center, abstract territorial demarcation hairlines and maritime transit vectors in dark surface and accent ink. Zero cartoon maps, zero text in SVG.',
      '600×750 viewBox; 40px margins. Stack two offset cards with subtle strategic coordinate crosshairs and 1px hairlines behind the cards.',
      '600×750 viewBox; 40px margins. Massive metric placard with 1px border and focal vector accent. Clean editorial linework.',
      '600×750 viewBox; 40px margins. Three stacked milestones on a left-aligned 1px hairline spine with registration ticks.',
      '600×750 viewBox; 40px margins. Split diptych with strategic convergence axes on dark surface and verified policy ledger on paper.',
      '600×750 viewBox; 40px margins. Clean 3-row tabular verification ledger with monospace indexes [01], [02], [03] and metric badges.',
      '600×750 viewBox; 40px margins. Final verdict diptych with closing takeaway and signature publication wordmark.',
    ];
  }

  // Historical / Architectural / General
  return [
    '600×750 viewBox; 40px safe margins. Dark paper field, accent kicker badge, large format condensed headline. Below, one monumental abstract architectural plinth silhouette in dark surface and ink, with an intense accent fracture. Pure sculptural vector artwork. No diagrams, arrows, or callout boxes.',
    '600×750 viewBox; 40px margins. Stack two offset, full-width cards beneath a 44px headline. A faint topographic contour curve becomes a rigid accent boundary behind the upper card. Restrained architectural silhouette.',
    '600×750 viewBox; 40px margins. Dark paper field with a full-width surface metric placard. Render massive numeral in ink, with attribution below. An accent fracture interrupts the placard’s lower border, leading into one compact consequence card.',
    '600×750 viewBox; 40px margins. Three stacked milestones on a left-aligned 1px hairline spine. Use accent broken segments for catalysts; clean surface milestone panels. Background dark paper.',
    '600×750 viewBox; 40px margins. Beneath a 44px headline, divide the body into two tall panels separated by an accent discontinuity. Left: dark surface with a fragmented architectural elevation. Right: paper with a quiet contour arc and verified badge.',
    '600×750 viewBox; 40px margins. Clean 3-row tabular ledger divided by 1px hairlines with monospace indexes [01], [02], [03], 2-word labels, 5-8 word findings with bold anchors, and right-aligned metric badges.',
    '600×750 viewBox; 40px margins. Final asymmetric verdict diptych with monumental closing takeaway, signature publication wordmark, and subtle architectural boundary mark.',
  ];
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
  // PASS 1: CONTENT & HOOK INTELLIGENCE (SPECIALIZED CONTENT / HOOK ANALYSIS)
  // ==========================================================================
  console.log('[Pipeline] >>> Pass 1/4: Analyzing Content & Formulating Hook Intelligence...');
  options.onProgress?.('Analyzing Content & Hook Intelligence', 1, 4);

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
  // PASS 2: VISUAL CONFIG & BRAND THEME (THEME, STYLES & OPTIMAL PRESET)
  // ==========================================================================
  console.log('[Pipeline] >>> Pass 2/4: Creating Visual Theme, Styles & Optimal Config...');
  options.onProgress?.('Creating Visual Theme & Config', 2, 4);

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

  // Programmatically assign non-repeating archetypes
  const assignedArchetypes = getDeterministicArchetypeSequence(targetSlideCount);

  // ==========================================================================
  // PASS 3: SLIDES CONTENT & SPATIAL ELEMENTS JSON (CONTENT + CONFIG -> STORYBOARD)
  // ==========================================================================
  console.log(`[Pipeline] >>> Pass 3/4: Authoring ${targetSlideCount}-Slide Content & Elements JSON (${narrativePreset})...`);
  options.onProgress?.('Authoring Slides Content JSON', 3, 4);

  const deckResponse = await llm.generateJSON(
    buildStoryDeckSystemPrompt(narrativePreset, targetSlideCount),
    buildStoryDeckUserPrompt(narrative, brand, targetSlideCount, assignedArchetypes),
    0.6
  );
  let allSlides = extractJson<SlideData[]>(deckResponse.text);
  if (!Array.isArray(allSlides) || allSlides.length === 0) {
    console.warn('[Pipeline] Storyboard JSON was not an array, attempting object extraction...');
    allSlides = (allSlides as any)?.slides || [];
  }

  // Normalize slide schema and enforce strict editorial word budgets & visual archetypes
  const activePlatform = options.platform || 'instagram-feed';

  allSlides = allSlides.map((s, idx) => {
    // 1. Programmatically assigned non-repeating archetype
    const archetype = assignedArchetypes[idx] || (idx === 0 ? 'monumental-editorial-cover' : 'asymmetric-editorial-cards');

    // 2. Clamp and sanitize items body copy (Strict 10-word ceiling for mobile scannability)
    let sanitizedItems = s.items;
    if (Array.isArray(sanitizedItems)) {
      sanitizedItems = sanitizedItems.map((item: any) => {
        if (typeof item === 'object' && item !== null && typeof item.body === 'string') {
          const rawWords = item.body.trim().split(/\s+/);
          if (rawWords.length > 10) {
            console.log(`[Pipeline] Trimming verbose item body on slide ${idx + 1} from ${rawWords.length} words to 10 words.`);
            item.body = rawWords.slice(0, 10).join(' ') + '…';
          }
        }
        return item;
      });
    }

    // 3. Clamp headlines to max 8 words
    let sanitizedHeadline = s.headline;
    if (sanitizedHeadline) {
      const headlineWords = sanitizedHeadline.trim().split(/\s+/);
      if (headlineWords.length > 8) {
        console.log(`[Pipeline] Trimming verbose headline on slide ${idx + 1} from ${headlineWords.length} to 8 words.`);
        sanitizedHeadline = headlineWords.slice(0, 8).join(' ');
      }
    }

    // 4. Clamp subheadline to max 12 words
    let sanitizedSubheadline = s.subheadline;
    if (sanitizedSubheadline) {
      const subheadlineWords = sanitizedSubheadline.trim().split(/\s+/);
      if (subheadlineWords.length > 12) {
        sanitizedSubheadline = subheadlineWords.slice(0, 12).join(' ');
      }
    }

    return {
      ...s,
      id: s.id || `slide-${idx + 1}`,
      index: typeof s.index === 'number' ? s.index : idx,
      type: s.type || (s as any).archetype || 'editorial',
      archetype,
      layoutTopology: archetype,
      visualStyle: archetype,
      headline: sanitizedHeadline,
      subheadline: sanitizedSubheadline,
      items: sanitizedItems,
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
  console.log(`[Pipeline] Pass 3 complete: Storyboard authored with ${deck.slides.length} slides.`);

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

  // Prepare slide design blueprints directly from Pass 3 content JSON
  const domainThemeContext = `${brand.domain} ${brand.name} ${brand.vibe || ''} ${narrative.editorialTheme || ''} ${narrative.visualMetaphor || ''} ${narrative.articleTitle || ''} ${narrative.hookHeadline || ''}`;
  const domainBlueprints = getDomainSvgBlueprints(domainThemeContext);

  const blueprints: SlideDesignBlueprint[] = deck.slides.map((s, idx) => {
    let bp = s.svgBlueprint;
    // Intercept literal flowchart/diagram/pipe blueprints and replace with domain-adaptive editorial vector blueprints
    if (!bp || /flowchart|diagram|pipe|valve|cutaway|conduit|tokens? enter|chamber|slot|app screen/i.test(bp)) {
      bp = domainBlueprints[idx % domainBlueprints.length];
    }

    return {
      slideId: s.id,
      type: s.type,
      layoutStructure: s.archetype || s.layoutTopology || 'asymmetric-editorial-cards',
      svgConcept: {
        description: bp || `Bespoke editorial abstract vector artwork matching ${s.archetype}`,
        type: 'schematic',
      },
    };
  });

  // ==========================================================================
  // PASS 4: SLIDES FINAL FORM SYNTHESIS & AUDIT (REACT + SVG CODEGEN & AUDIT)
  // ==========================================================================
  const concurrency = options.concurrency || 3;
  console.log(
    `[Pipeline] >>> Pass 4/4: Synthesizing Slides Final Form in Parallel (Concurrency: ${concurrency})...`
  );
  options.onProgress?.('Synthesizing Slides Final Form', 4, 4);

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
    options.onProgress?.(`Pass 4/4: Synthesizing Slide ${slideNumber}: ${slideData.type}`, slideNumber, deck.slides.length);

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

  // Assemble template package entry point (index.ts)
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

  console.log(`[Pipeline] >>> Pass 4: Verifying TypeScript compiler integrity for template ${slug}...`);
  options.onProgress?.('Verifying TypeScript & Visual Integrity', 4, 4);

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

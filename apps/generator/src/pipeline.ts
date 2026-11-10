import type { LLMClient } from '@loopreel/llm';
import type { TemplateBrief } from './prompt.js';
import {
  buildConceptSystemPrompt,
  buildConceptUserPrompt,
  buildEditorialSystemPrompt,
  buildEditorialBatch1UserPrompt,
  buildEditorialBatch2UserPrompt,
} from './prompt.js';
import { compileCompleteTemplate } from './archetypes.js';

export interface BrandDesignSystem {
  templateName: string;
  domain: string;
  tagline: string;
  aestheticManifesto: string;
  colors: {
    paper: string;     // e.g. #F5F5F0
    ink: string;       // e.g. #1A1A1A
    graphite: string;  // e.g. #4A4A4A
    accent: string;    // e.g. #D97706
    hairline: string;  // e.g. #D1D1CD
    surface: string;   // e.g. #EFEFEA
  };
  typography: {
    displayFont: string;  // e.g. Cormorant Garamond, Syne
    bodyFont: string;     // e.g. Inter, Plus Jakarta Sans
    monoFont: string;     // e.g. IBM Plex Mono, Space Mono
    googleFontsUrl: string;
  };
  visualMetaphor: {
    texturePattern: 'washi' | 'grid' | 'dots' | 'blueprint' | 'clean';
    signatureMotif: 'seal' | 'crosshair' | 'coordinate' | 'medallion' | 'bracket';
    motifText: string;   // e.g. "印", "+", "CH-8001", "MOD. 01"
    borderStyle: 'minimal' | 'architectural' | 'technical' | 'editorial';
  };
  slideConcepts: Array<{
    slideNumber: number;
    archetype: string;
    title: string;
    narrativeAngle: string;
  }>;
}

export interface SlideItem {
  index: string;
  kicker: string;
  body: string;
}

export interface SlideStat {
  value: string;
  unit?: string;
  label: string;
  context: string;
}

export interface DetailedSlideContent {
  slideNumber: number;
  archetype: string;
  kicker: string;
  headline: string;
  subhead?: string;
  bodyText?: string;
  authorOrAttribution?: string;
  thesisQuote?: string;
  items?: SlideItem[];
  stats?: SlideStat[];
  claimVsRecord?: {
    claim: string;
    recordTitle: string;
    recordBody: string;
  };
  quadrants?: Array<{
    quadrantNumber: string;
    title: string;
    body: string;
    isHero?: boolean;
  }>;
  caseStudy?: {
    hypothesis: string;
    intervention: string;
    result: string;
  };
  milestones?: Array<{
    phase: string;
    title: string;
    body: string;
  }>;
  steps?: Array<{
    stepNumber: string;
    title: string;
    body: string;
  }>;
  dosAndDonts?: {
    legacyItems: string[];
    proposedItems: string[];
  };
  checklist?: Array<{
    text: string;
    checked: boolean;
  }>;
  callouts?: Array<{
    tag: string;
    title: string;
    body: string;
  }>;
  cta?: {
    buttonText: string;
    socialHandle: string;
  };
}

function cleanJsonResponse(raw: string): string {
  let cleaned = raw.trim();
  if (cleaned.startsWith('```json')) {
    cleaned = cleaned.replace(/^```json\s*/i, '');
  } else if (cleaned.startsWith('```')) {
    cleaned = cleaned.replace(/^```\s*/i, '');
  }
  if (cleaned.endsWith('```')) {
    cleaned = cleaned.replace(/\s*```$/i, '');
  }
  return cleaned.trim();
}

/**
 * Pass 1: Strategic Art Direction & Concept Brainstorming
 */
export async function runConceptPass(brief: TemplateBrief, client: LLMClient): Promise<BrandDesignSystem> {
  console.log('[apps/generator] >>> Pass 1: Creative Director Art Direction & Brand Concept...');
  const sysPrompt = buildConceptSystemPrompt();
  const userPrompt = buildConceptUserPrompt(brief);

  const res = await client.generateJSON(sysPrompt, userPrompt);
  const jsonStr = cleanJsonResponse(res.text);

  try {
    const data = JSON.parse(jsonStr) as BrandDesignSystem;
    if (!data.colors || !data.typography || !data.slideConcepts) {
      throw new Error('Manifest missing required fields');
    }
    console.log(`[apps/generator] Pass 1 complete: Established "${data.templateName}" with palette [${data.colors.paper}, ${data.colors.ink}, ${data.colors.accent}]`);
    return data;
  } catch (err) {
    console.warn('[apps/generator] Failed to parse Pass 1 JSON. Raw response:\n', res.text.slice(0, 300));
    throw new Error(`Pass 1 (Concept) JSON parse error: ${err instanceof Error ? err.message : String(err)}`);
  }
}

/**
 * Pass 2: Editorial & Spatial Composition Engineering (All 17 Slides in 2 Batches)
 */
export async function runEditorialPass(
  manifest: BrandDesignSystem,
  client: LLMClient
): Promise<DetailedSlideContent[]> {
  const sysPrompt = buildEditorialSystemPrompt();
  const allSlides: DetailedSlideContent[] = [];

  // Batch 1: Slides 1-9
  console.log('[apps/generator] >>> Pass 2: Executive Editor Copywriting (Batch 1: Slides 1–9)...');
  const batch1Prompt = buildEditorialBatch1UserPrompt(manifest);
  const res1 = await client.generateJSON(sysPrompt, batch1Prompt);
  const jsonStr1 = cleanJsonResponse(res1.text);
  try {
    const parsed1 = JSON.parse(jsonStr1);
    const slides1: DetailedSlideContent[] = Array.isArray(parsed1) ? parsed1 : parsed1.slides || [];
    allSlides.push(...slides1);
    console.log(`[apps/generator] Batch 1 complete: ${slides1.length} slides authored.`);
  } catch (err) {
    console.warn('[apps/generator] Failed to parse Batch 1 JSON. Raw response:\n', res1.text.slice(0, 300));
  }

  // Batch 2: Slides 10-17
  console.log('[apps/generator] >>> Pass 2: Executive Editor Copywriting (Batch 2: Slides 10–17)...');
  const batch2Prompt = buildEditorialBatch2UserPrompt(manifest);
  const res2 = await client.generateJSON(sysPrompt, batch2Prompt);
  const jsonStr2 = cleanJsonResponse(res2.text);
  try {
    const parsed2 = JSON.parse(jsonStr2);
    const slides2: DetailedSlideContent[] = Array.isArray(parsed2) ? parsed2 : parsed2.slides || [];
    allSlides.push(...slides2);
    console.log(`[apps/generator] Batch 2 complete: ${slides2.length} slides authored.`);
  } catch (err) {
    console.warn('[apps/generator] Failed to parse Batch 2 JSON. Raw response:\n', res2.text.slice(0, 300));
  }

  console.log(`[apps/generator] Pass 2 complete: Authored bespoke editorial copy for ${allSlides.length} slides.`);
  return allSlides;
}

/**
 * Pass 3: Front-End Master Assembly into Single-File HTML (All 17 Canonical Archetypes)
 */
export async function runAssemblyPass(
  manifest: BrandDesignSystem,
  slides: DetailedSlideContent[],
  _client: LLMClient
): Promise<string> {
  console.log('[apps/generator] >>> Pass 3: Compiling All 17 Canonical Archetypes with Interactive Preview Panel...');
  const html = compileCompleteTemplate(manifest, slides);
  console.log(`[apps/generator] Pass 3 complete: Assembled ${html.length} characters of standalone HTML.`);
  return html.trim();
}

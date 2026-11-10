import type { LLMClient } from '@loopreel/llm';
import type { TemplateBrief } from './prompt.js';
import {
  buildConceptSystemPrompt,
  buildConceptUserPrompt,
  buildEditorialSystemPrompt,
  buildEditorialUserPrompt,
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
 * Pass 2: Editorial & Spatial Composition Engineering
 */
export async function runEditorialPass(
  manifest: BrandDesignSystem,
  client: LLMClient
): Promise<DetailedSlideContent[]> {
  console.log('[apps/generator] >>> Pass 2: Executive Editor & Senior Typographer Copywriting...');
  const sysPrompt = buildEditorialSystemPrompt();
  const userPrompt = buildEditorialUserPrompt(manifest);

  const res = await client.generateJSON(sysPrompt, userPrompt);
  const jsonStr = cleanJsonResponse(res.text);

  try {
    const parsed = JSON.parse(jsonStr);
    const slides: DetailedSlideContent[] = Array.isArray(parsed) ? parsed : parsed.slides || [];
    if (!slides || slides.length < 4) {
      throw new Error(`Pass 2 returned only ${slides.length} slides, expected at least 4`);
    }
    console.log(`[apps/generator] Pass 2 complete: Authored editorial copy for ${slides.length} slides.`);
    return slides;
  } catch (err) {
    console.warn('[apps/generator] Failed to parse Pass 2 JSON. Raw response:\n', res.text.slice(0, 300));
    throw new Error(`Pass 2 (Editorial) JSON parse error: ${err instanceof Error ? err.message : String(err)}`);
  }
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

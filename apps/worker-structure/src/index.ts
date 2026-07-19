import { JobRepository, WorkerRepository } from '@loopreel/db';
import { createWorker } from '@loopreel/queue';
import type { StructurePayload, BrandKit } from '@loopreel/schemas';
import { generateStructuredContent } from '@loopreel/llm';
import {
  getContentStructurePrompt,
  getBrandProfilePrompt,
  getDesignDecisionsPrompt,
  parseXml,
} from '@loopreel/templates';
import {
  StructuredContentSchema,
  BrandKitSchema,
  DesignOutputSchema,
} from '@loopreel/schemas';
import { classifyError } from '@loopreel/errors';
import pino from 'pino';
import { randomUUID } from 'node:crypto';
import { hostname } from 'node:os';

const logger = pino({
  level: process.env['LOG_LEVEL'] ?? 'info',
  formatters: {
    level: (label) => ({ level: label.toUpperCase() }),
  },
});

const INSTANCE_ID = randomUUID();
const HOSTNAME = hostname();
let jobsProcessed = 0n;

const heartbeat = setInterval(() => {
  void WorkerRepository.upsertHeartbeat(INSTANCE_ID, 'structure', HOSTNAME, 'structure', jobsProcessed);
}, 10_000);

// Load all 3 prompts
const [contentPrompt, brandPrompt, designPrompt] = await Promise.all([
  getContentStructurePrompt(),
  getBrandProfilePrompt(),
  getDesignDecisionsPrompt(),
]);

// Try to extract JSON from LLM output (may be wrapped in markdown code fences or text)
function extractJson(text: string): unknown {
  let cleaned = text.trim();

  // Remove markdown code fences
  if (cleaned.startsWith('```json')) {
    cleaned = cleaned.slice(7);
  } else if (cleaned.startsWith('```xml')) {
    cleaned = cleaned.slice(6);
  } else if (cleaned.startsWith('```')) {
    cleaned = cleaned.slice(3);
  }
  if (cleaned.endsWith('```')) {
    cleaned = cleaned.slice(0, -3);
  }
  cleaned = cleaned.trim();

  // Try direct parse first
  try {
    return JSON.parse(cleaned);
  } catch {
    // Not direct JSON
  }

  // Try to find JSON object between first { and last }
  const firstBrace = cleaned.indexOf('{');
  const lastBrace = cleaned.lastIndexOf('}');
  if (firstBrace !== -1 && lastBrace > firstBrace) {
    try {
      return JSON.parse(cleaned.slice(firstBrace, lastBrace + 1));
    } catch {
      // Not valid JSON in braces
    }
  }

  return null;
}

// Parse content: try JSON first, then XML
function parseContentResponse(raw: string, jobLogger: pino.Logger) {
  const json = extractJson(raw);
  if (json && typeof json === 'object') {
    const obj = json as Record<string, unknown>;
    // Detect LLM error responses
    if (obj['error']) {
      throw new Error(`LLM returned error: ${String(obj['error']).slice(0, 200)}`);
    }
    // Check if it has the expected structure
    if (obj['hook'] || obj['content']) {
      const content = (obj['content'] ?? obj) as Record<string, unknown>;
      jobLogger.info('Parsed content from JSON');
      return normalizeContent(content);
    }
  }

  // Fallback: try XML
  try {
    const parsed = parseXml<Record<string, unknown>>(raw);
    const content = (parsed['content'] ?? parsed) as Record<string, unknown>;
    if (content && typeof content === 'object' && Object.keys(content).length > 0) {
      jobLogger.info({ contentKeys: Object.keys(content) }, 'Parsed content from XML');
      return normalizeContent(content);
    }
    jobLogger.info({ parsedKeys: Object.keys(parsed) }, 'XML parsed but no content found');
  } catch (e) {
    jobLogger.info({ error: (e as Error).message }, 'XML parse failed for content');
  }

  throw new Error('Could not parse LLM response as JSON or XML');
}

function normalizeContent(content: Record<string, unknown>) {
  const hook = (content['hook'] ?? {}) as Record<string, unknown>;
  const meta = (content['meta'] ?? {}) as Record<string, unknown>;
  const cta = (content['callToAction'] ?? content['call_to_action'] ?? {}) as Record<string, unknown>;

  interface NormalizedSlide {
    type: string;
    heading?: string;
    body?: string;
    items?: string[];
    quote?: string;
    attribution?: string;
    value?: string;
    label?: string;
    imageUrl?: string;
    imageCaption?: string;
  }

  // Check for new format first: { slides: [...] }
  const hasNewFormat = 'slides' in content && Array.isArray(content['slides']);

  let slides: NormalizedSlide[] = [];

  if (hasNewFormat) {
    // New format: <slides><slide type="content">...</slide></slides>
    const slidesContainer = content['slides'] ?? [];
    const slidesRaw = Array.isArray(slidesContainer) ? slidesContainer
      : (typeof slidesContainer === 'object' && slidesContainer !== null && 'slide' in slidesContainer)
        ? (slidesContainer as Record<string, unknown>)['slide']
        : [];

    slides = Array.isArray(slidesRaw)
      ? slidesRaw.map((sl) => {
          const raw = typeof sl === 'object' && sl !== null ? sl as Record<string, unknown> : {};
          const slideType = String(raw['@_type'] ?? raw['type'] ?? 'content');

          const heading = extractSlideText(raw, 'heading');
          const body = extractSlideText(raw, 'body');

          if (slideType === 'list') {
            const itemsContainer = raw['items'];
            const itemsRaw = Array.isArray(itemsContainer) ? itemsContainer
              : (typeof itemsContainer === 'object' && itemsContainer !== null && 'item' in itemsContainer)
                ? (itemsContainer as Record<string, unknown>)['item']
                : [];
            const items = normalizeStringArray(itemsRaw);
            return { type: 'list', heading: heading || undefined, items };
          }

          if (slideType === 'quote') {
            return {
              type: 'quote',
              quote: extractSlideText(raw, 'quote') || heading,
              attribution: extractSlideText(raw, 'attribution') || undefined,
            };
          }

          if (slideType === 'stat') {
            return {
              type: 'stat',
              value: extractSlideText(raw, 'value'),
              label: extractSlideText(raw, 'label') || undefined,
              body: body || undefined,
            };
          }

          return { type: 'content', heading, body: body || undefined };
        })
        .filter((s) => {
          if (s.type === 'list') return (s.items ?? []).length > 0;
          if (s.type === 'quote') return (s.quote ?? '').length > 0;
          if (s.type === 'stat') return (s.value ?? '').length > 0;
          if (s.type === 'content') return (s.heading ?? '').length > 0;
          return true;
        })
      : [];
  } else {
    // Legacy format: { valuePoints: [...] } — convert to new slide types
    const valuePointsContainer = content['valuePoints'] ?? content['value_points'] ?? [];
    const valuePointsRaw = Array.isArray(valuePointsContainer) ? valuePointsContainer
      : (typeof valuePointsContainer === 'object' && valuePointsContainer !== null && 'point' in valuePointsContainer)
        ? (valuePointsContainer as Record<string, unknown>)['point']
        : [];

    slides = Array.isArray(valuePointsRaw)
      ? valuePointsRaw.map((vp) => {
          const raw = typeof vp === 'object' && vp !== null ? vp as Record<string, unknown> : {};
          const p = ('point' in raw && typeof raw['point'] === 'object' && raw['point'] !== null)
            ? raw['point'] as Record<string, unknown>
            : raw;
          const heading = String(p['heading'] ?? '');
          const body = String(p['body'] ?? '');

          // Convert bulletPoints to list if present
          const bulletPointsContainer = p['bulletPoints'] ?? p['bullet_points'];
          let bulletTexts: string[] = [];
          if (Array.isArray(bulletPointsContainer)) {
            bulletTexts = bulletPointsContainer.map((item) => {
              if (typeof item === 'string') return item;
              if (typeof item === 'object' && item !== null) {
                const obj = item as Record<string, unknown>;
                return String(obj['bullet'] ?? obj['text'] ?? '');
              }
              return String(item);
            }).filter((t) => t.length > 0);
          } else if (typeof bulletPointsContainer === 'object' && bulletPointsContainer !== null && 'bullet' in bulletPointsContainer) {
            const b = (bulletPointsContainer as Record<string, unknown>)['bullet'];
            bulletTexts = (Array.isArray(b) ? b : [b]).map((item) => {
              if (typeof item === 'string') return item;
              if (typeof item === 'object' && item !== null) {
                const obj = item as Record<string, unknown>;
                return String(obj['bullet'] ?? obj['text'] ?? '');
              }
              return String(item);
            }).filter((t) => t.length > 0);
          }

          if (bulletTexts.length > 0) {
            return { type: 'list', heading: heading || undefined, items: bulletTexts };
          }

          return { type: 'content', heading, body: body || undefined };
        })
        .filter((s) => {
          if (s.type === 'list') return (s.items ?? []).length > 0;
          if (s.type === 'content') return (s.heading ?? '').length > 0;
          return true;
        })
      : [];
  }

  // Fallback CTA if LLM returned empty
  const ctaMessage = String(cta['message'] ?? '') || 'Learn more';
  const ctaUrl = String(cta['url'] ?? '') || undefined;
  const ctaLabel = String(cta['label'] ?? '') || undefined;

  return {
    meta: {
      seriesName: String(meta['seriesName'] ?? '') || undefined,
      authorName: String(meta['authorName'] ?? '') || undefined,
      handle: String(meta['handle'] ?? '') || undefined,
      readTime: String(meta['readTime'] ?? '') || undefined,
      category: String(meta['category'] ?? '') || undefined,
    },
    hook: {
      title: String(hook['title'] ?? ''),
      kicker: String(hook['kicker'] ?? '') || undefined,
      subtitle: String(hook['subtitle'] ?? '') || undefined,
    },
    slides,
    callToAction: {
      message: ctaMessage,
      url: ctaUrl,
      label: ctaLabel,
    },
  };
}

function extractSlideText(obj: Record<string, unknown>, key: string): string {
  const value = obj[key];
  if (typeof value === 'string') return value;
  if (typeof value === 'number') return String(value);
  if (typeof value === 'object' && value !== null && '#text' in value) {
    return String((value as Record<string, unknown>)['#text']);
  }
  return '';
}

function normalizeStringArray(raw: unknown): string[] {
  if (!Array.isArray(raw)) return [];
  return raw.map((item) => {
    if (typeof item === 'string') return item;
    if (typeof item === 'object' && item !== null) {
      const obj = item as Record<string, unknown>;
      return String(obj['item'] ?? obj['#text'] ?? obj['text'] ?? '');
    }
    return String(item);
  }).filter((t) => t.length > 0);
}

function normalizeBrand(brand: Record<string, unknown>) {
  const colors = (brand['colors'] ?? {}) as Record<string, unknown>;
  const fonts = (brand['fonts'] ?? {}) as Record<string, unknown>;

  return {
    name: String(brand['name'] ?? 'Brand'),
    colors: {
      primary: String(colors['primary'] ?? '#e94560'),
      secondary: String(colors['secondary'] ?? '#4ECDC4'),
      accent: String(colors['accent'] ?? '#45B7D1'),
      background: String(colors['background'] ?? '#1A1A2E'),
      surface: String(colors['surface'] ?? '#232340'),
      text: String(colors['text'] ?? '#FFFFFF'),
      muted: String(colors['muted'] ?? '#8888AA'),
    },
    fonts: {
      heading: String(fonts['heading'] ?? 'Inter'),
      body: String(fonts['body'] ?? 'Inter'),
      headingWeight: Number(fonts['headingWeight'] ?? 800),
      bodyWeight: Number(fonts['bodyWeight'] ?? 400),
    },
    styleDirection: String(brand['styleDirection'] ?? brand['style_direction'] ?? 'modern') as 'modern' | 'minimal' | 'elegant' | 'bold' | 'organic',
  };
}

function normalizeDesign(design: Record<string, unknown>) {
  const colorScheme = (design['colorScheme'] ?? design['color_scheme'] ?? {}) as Record<string, unknown>;
  const slidesContainer = design['slides'] ?? design['slides'] ?? [];
  // XML parser wraps arrays in {slide: [...]} for <slides><slide>...</slide></slides>
  const slidesRaw = Array.isArray(slidesContainer) ? slidesContainer
    : (typeof slidesContainer === 'object' && slidesContainer !== null && 'slide' in slidesContainer)
      ? (slidesContainer as Record<string, unknown>)['slide']
      : [];

  const slides = Array.isArray(slidesRaw)
    ? slidesRaw.map((sl) => {
        const s = sl as Record<string, unknown>;
        const shapesContainer = s['shapes'] ?? [];
        const shapesRaw = Array.isArray(shapesContainer) ? shapesContainer
          : (typeof shapesContainer === 'object' && shapesContainer !== null && 'shape' in shapesContainer)
            ? (shapesContainer as Record<string, unknown>)['shape']
            : [];
        const shapes = Array.isArray(shapesRaw)
          ? shapesRaw.map((sh) => {
              const raw = typeof sh === 'object' && sh !== null ? sh as Record<string, unknown> : {};
              // LLM may return {shape: {type, position}} or just {type, position}
              const shape = ('shape' in raw && typeof raw['shape'] === 'object' && raw['shape'] !== null)
                ? raw['shape'] as Record<string, unknown>
                : raw;
              return {
                type: String(shape['type'] ?? ''),
                position: String(shape['position'] ?? 'center'),
              };
            })
          : [];

        const gradientColorsContainer = s['gradientColors'] ?? s['gradient_colors'];
        const gradientColorsRaw = Array.isArray(gradientColorsContainer) ? gradientColorsContainer
          : (typeof gradientColorsContainer === 'object' && gradientColorsContainer !== null && 'color' in gradientColorsContainer)
            ? (gradientColorsContainer as Record<string, unknown>)['color']
            : undefined;
        const gradientColors = Array.isArray(gradientColorsRaw)
          ? gradientColorsRaw.map((c) => {
              if (typeof c === 'string') return c;
              if (typeof c === 'object' && c !== null && 'color' in c) return String((c as Record<string, unknown>)['color']);
              return String(c);
            })
          : undefined;

        return {
          index: Number(s['index'] ?? 0),
          layout: String(s['layout'] ?? 'center-focus'),
          backgroundType: String(s['backgroundType'] ?? s['background_type'] ?? 'gradient') as 'solid' | 'gradient' | 'pattern' | 'image',
          gradientType: String(s['gradientType'] ?? s['gradient_type'] ?? '') || undefined,
          gradientColors,
          imageSearch: String(s['imageSearch'] ?? s['image_search'] ?? '') || undefined,
          imageBlur: Number(s['imageBlur'] ?? s['image_blur'] ?? 0) || undefined,
          imageOverlay: String(s['imageOverlay'] ?? s['image_overlay'] ?? '') || undefined,
          textAlignment: String(s['textAlignment'] ?? s['text_alignment'] ?? 'center') as 'left' | 'center' | 'right',
          emphasis: String(s['emphasis'] ?? 'medium') as 'small' | 'medium' | 'large',
          shapes,
        };
      })
    : [];

  const isEditorial = String(design['template'] ?? design['selectedTemplate'] ?? design['selected_template'] ?? 'editorial-runway') === 'editorial-runway';
  return {
    template: 'editorial-runway',
    colorScheme: {
      primary: String(colorScheme['primary'] ?? (isEditorial ? '#B31E23' : '#FF6B6B')),
      secondary: String(colorScheme['secondary'] ?? (isEditorial ? '#E7E4D9' : '#4ECDC4')),
      accent: String(colorScheme['accent'] ?? (isEditorial ? '#B31E23' : '#45B7D1')),
      background: String(colorScheme['background'] ?? (isEditorial ? '#E7E4D9' : '#1A1A2E')),
      text: String(colorScheme['text'] ?? (isEditorial ? '#15130F' : '#FFFFFF')),
    },
    slides,
  };
}

function parseLlmResponse(raw: string, jobLogger: pino.Logger) {
  jobLogger.debug({ rawSnippet: raw.slice(0, 500) }, 'Parsing LLM response');

  const json = extractJson(raw);
  if (json && typeof json === 'object' && Object.keys(json).length > 0) {
    const obj = json as Record<string, unknown>;
    // Detect LLM error responses
    if (obj['error']) {
      throw new Error(`LLM returned error: ${String(obj['error']).slice(0, 200)}`);
    }
    jobLogger.debug({ keys: Object.keys(json) }, 'Parsed as JSON');
    return obj;
  }

  try {
    const parsed = parseXml<Record<string, unknown>>(raw);
    const keys = Object.keys(parsed);

    // Validate it has meaningful content (not just <?xml?> or empty)
    const meaningfulKeys = keys.filter((k) => !k.startsWith('?') && k !== '');
    if (meaningfulKeys.length === 0) {
      throw new Error('XML parsed but contains no meaningful keys');
    }

    jobLogger.debug({ parsedKeys: meaningfulKeys }, 'Parsed as XML');
    return parsed;
  } catch (e) {
    jobLogger.debug({ error: (e as Error).message, rawSnippet: raw.slice(0, 300) }, 'XML parse failed');
    throw new Error(`Could not parse LLM response: ${(e as Error).message}`);
  }
}

function getDefaultDesign(templateId: string, pointCount: number) {
  const slideCount = pointCount + 2; // hook + points + CTA
  const layouts = ['hero-center', 'split-left', 'center-focus', 'split-right', 'center-focus'];
  const backgroundTypes: ('gradient' | 'solid' | 'gradient' | 'solid')[] = ['gradient', 'solid', 'gradient', 'solid', 'gradient'];

  const slides = Array.from({ length: slideCount }, (_, i) => ({
    index: i,
    layout: layouts[i % layouts.length],
    backgroundType: backgroundTypes[i % backgroundTypes.length] as 'solid' | 'gradient',
    gradientType: i === 0 ? 'radial' : 'linear',
    gradientColors: i % 2 === 0 ? ['#1A1A2E', '#e94560'] : undefined,
    textAlignment: i === 0 ? 'center' as const : (i % 2 === 0 ? 'center' as const : 'left' as const),
    emphasis: i === 0 ? 'large' as const : 'medium' as const,
    shapes: i === 0 ? [
      { type: 'circle', position: 'top-left' },
      { type: 'circle', position: 'bottom-right' },
    ] : [],
  }));

  return {
    template: templateId,
    colorScheme: {
      primary: '#B31E23',
      secondary: '#E7E4D9',
      accent: '#B31E23',
      background: '#E7E4D9',
      text: '#15130F',
    },
    slides,
  };
}

const worker = createWorker<StructurePayload>('structure', async (job) => {
  const { jobId, rawText } = job.data;
  const jobLogger = logger.child({ jobId, workerType: 'structure' });

  const existing = await JobRepository.findById(jobId);
  if (!existing) {
    jobLogger.error('Job not found, skipping');
    return;
  }
  if (existing.status !== 'structuring') {
    jobLogger.info({ currentStatus: existing.status }, 'Job already advanced, skipping');
    return;
  }

  jobLogger.info('Starting structuring with 3-call pipeline');

  try {
    // Call 1: Content structuring
    jobLogger.info('Call 1: Content structuring');
    const contentResponse = await generateStructuredContent([
      { role: 'system', content: contentPrompt },
      { role: 'user', content: rawText },
    ], jobLogger);

    jobLogger.info({ rawSnippet: contentResponse.content.slice(0, 200) }, 'Raw LLM response (content)');

    const contentData = parseContentResponse(contentResponse.content, jobLogger);
    const contentResult = StructuredContentSchema.safeParse(contentData);

    if (!contentResult.success) {
      jobLogger.error({ errors: contentResult.error.issues }, 'Content validation failed');
      await JobRepository.markFailed(jobId, `Content structuring failed: ${contentResult.error.message}`);
      return;
    }

    // Call 2: Brand profile generation
    jobLogger.info('Call 2: Brand profile generation');
    const brandInput = existing.brand_kit ?? {};
    const brandUserMessage = `Brand name: ${brandInput.name ?? 'Default'}\nPrimary color: ${brandInput.colors?.primary ?? '#e94560'}\nSecondary color: ${brandInput.colors?.secondary ?? '#4ECDC4'}`;

    const brandResponse = await generateStructuredContent([
      { role: 'system', content: brandPrompt },
      { role: 'user', content: brandUserMessage },
    ], jobLogger);

    jobLogger.info({ rawSnippet: brandResponse.content.slice(0, 200) }, 'Raw LLM response (brand)');
    const brandParsed = parseLlmResponse(brandResponse.content, jobLogger);
    const brandData = normalizeBrand(brandParsed['brand'] as Record<string, unknown> ?? brandParsed);
    const brandResult = BrandKitSchema.safeParse(brandData);

    if (!brandResult.success) {
      jobLogger.warn({ errors: brandResult.error.issues }, 'Brand validation failed, using defaults');
    }

    const finalBrandKit = brandResult.success ? brandResult.data : brandData as BrandKit;

    // Call 3: Design decisions
    jobLogger.info('Call 3: Design decisions');
    const templateId = existing.template_id ?? 'editorial-runway';

    const slideHeadings = contentResult.data.slides.map(s => {
      if (s.type === 'list') return s.heading ?? 'List';
      if (s.type === 'quote') return s.quote;
      if (s.type === 'stat') return s.value;
      if (s.type === 'image') return s.imageCaption ?? 'Image';
      return s.heading;
    }).join(', ');

    const designUserMessage = `Content hook: ${contentResult.data.hook.title}
Content slides: ${slideHeadings}
Brand style: ${finalBrandKit.styleDirection}
Brand colors: primary=${finalBrandKit.colors.primary}, secondary=${finalBrandKit.colors.secondary}
Template preference: ${templateId}
Platform: instagram-feed
Available templates: editorial-runway`;

    const designResponse = await generateStructuredContent([
      { role: 'system', content: designPrompt },
      { role: 'user', content: designUserMessage },
    ], jobLogger);

    jobLogger.info({ rawSnippet: designResponse.content.slice(0, 200) }, 'Raw LLM response (design)');

    let designOutput;
    try {
      const designParsed = parseLlmResponse(designResponse.content, jobLogger);
      const designData = normalizeDesign(designParsed['design'] as Record<string, unknown> ?? designParsed);
      const designResult = DesignOutputSchema.safeParse(designData);

      if (!designResult.success) {
        jobLogger.warn({ errors: designResult.error.issues }, 'Design validation failed, using defaults');
        designOutput = getDefaultDesign(templateId, contentResult.data.slides.length);
      } else {
        designOutput = designResult.data;
      }
    } catch (e) {
      jobLogger.warn({ error: (e as Error).message }, 'Design LLM failed, using defaults');
      designOutput = getDefaultDesign(templateId, contentResult.data.slides.length);
    }

    // Force template to editorial-runway regardless of what the LLM returned
    designOutput.template = 'editorial-runway';

    // Combine all results
    const slideCount = contentResult.data.slides.length + 2;

    await JobRepository.updateStatusAndOutbox(
      jobId,
      'rendering',
      'render',
      { jobId },
      undefined,
    );

    await JobRepository.updateStatus(jobId, 'rendering', {
      structuredJson: {
        ...contentResult.data,
        design: designOutput,
        brandKit: finalBrandKit,
      },
      slideCount,
    });

    jobsProcessed++;
    jobLogger.info({ slideCount, template: designOutput.template }, 'Dispatched to render queue');
  } catch (err) {
    const classified = classifyError(err);
    jobLogger.error({ err, errorType: classified.type }, 'Structuring failed');

    if (classified.type === 'transient' && job.attemptsMade < 3) {
      throw classified;
    }

    await JobRepository.markFailed(jobId, classified.message);
  }
});

worker.on('failed', (job, err) => {
  logger.error({ jobId: job?.id, err }, 'Worker failed');
});

process.on('SIGTERM', () => {
  clearInterval(heartbeat);
});

logger.info({ instanceId: INSTANCE_ID }, 'worker-structure started');

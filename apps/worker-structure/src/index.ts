import { JobRepository } from '@loopreel/db';
import { createWorker, createQueue } from '@loopreel/queue';
import type { StructurePayload } from '@loopreel/schemas';
import { getTemplate, getPrompt, autoSelectTemplate, paginateContract, TEMPLATES, introspectSchema, introspectSchemaConcise } from '@loopreel/loop-bridge';
import { createLLMClient, parseLlmXmlOutput, generateSlidesMultiPhase, calculateCost } from '@loopreel/llm';
import type { TemplateInfo } from '@loopreel/llm';
import { getRandomPhoto, getPhotoUrl, getPlaceholderUrl } from '@loopreel/backgrounds';
import { downloadImage, uploadImage, getPresignedUrl } from '@loopreel/storage';
import { classifyError } from '@loopreel/errors';
import { mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import pino from 'pino';

const DEBUG_LOG = process.env['DEBUG_LOG'] === 'true';
const DEBUG_DIR = process.env['DEBUG_DIR'] ?? '/app/debug';

const logger = pino({
  level: process.env['LOG_LEVEL'] ?? 'info',
  formatters: {
    level: (label) => ({ level: label.toUpperCase() }),
  },
});

const llm = createLLMClient();
const renderQueue = createQueue('render');

async function writeDebug(jobId: string, filename: string, content: string): Promise<void> {
  if (!DEBUG_LOG) return;
  try {
    const dir = join(DEBUG_DIR, jobId);
    await mkdir(dir, { recursive: true });
    await writeFile(join(dir, filename), content, 'utf-8');
  } catch {
    // best effort, don't fail the job
  }
}

function stripMarkdownFences(text: string): string {
  let cleaned = text.trim();
  if (cleaned.startsWith('```xml')) cleaned = cleaned.slice(6);
  else if (cleaned.startsWith('```')) cleaned = cleaned.slice(3);
  if (cleaned.endsWith('```')) cleaned = cleaned.slice(0, -3);
  return cleaned.trim();
}

async function fetchImagesForSlides(
  slides: Record<string, unknown>[],
  jobId: string,
): Promise<Record<string, unknown>[]> {
  return Promise.all(
    slides.map(async (slide, idx) => {
      const type = slide['type'] as string;
      if ((type === 'image-split' || type === 'image-cover') && slide['imageKeywords'] && !slide['imageUrl']) {
        try {
          const keywords = slide['imageKeywords'] as string;
          let imageUrl: string;

          try {
            const photo = await getRandomPhoto(keywords, { orientation: 'portrait' });
            const url = getPhotoUrl(photo, 'raw', 1080);
            const buffer = await downloadImage(url);
            const r2Key = await uploadImage(jobId, idx, buffer);
            imageUrl = await getPresignedUrl(r2Key);
          } catch {
            imageUrl = getPlaceholderUrl(keywords);
          }

          return { ...slide, imageUrl };
        } catch {
          return slide;
        }
      }
      return slide;
    }),
  );
}

const VALID_SLIDE_TYPES = ['cover', 'sequence', 'image-split', 'telemetry', 'interview', 'quadrant', 'case-study', 'myth-fact', 'resource-grid', 'timeline', 'quote', 'cta', 'profile', 'analysis', 'definition', 'dichotomy', 'table', 'breakdown', 'juxtaposition', 'methodology', 'hero-metric', 'checklist'];

const TYPE_MAP: Record<string, string> = {
  'hero-metric': 'telemetry',
  'hero': 'telemetry',
  'metric': 'telemetry',
  'stats': 'telemetry',
  'data': 'telemetry',
  'comparison': 'quadrant',
  'dichotomy': 'quadrant',
  'vs': 'quadrant',
  'checklist': 'resource-grid',
  'resources': 'resource-grid',
  'list': 'sequence',
  'steps': 'sequence',
  'pros-cons': 'quadrant',
  'proscons': 'quadrant',
  'myth': 'myth-fact',
  'fact': 'myth-fact',
  'debunk': 'myth-fact',
  'expert': 'interview',
  'qa': 'interview',
  'q&a': 'interview',
  'interview-slide': 'interview',
};

function sanitizeSlides(slides: Record<string, unknown>[]): Record<string, unknown>[] {
  return slides
    .filter((s) => typeof s === 'object' && s !== null)
    .map((slide) => {
      let type = String(slide.type ?? '');

      if (!VALID_SLIDE_TYPES.includes(type)) {
        const mapped = TYPE_MAP[type.toLowerCase()];
        type = mapped ?? 'sequence';
      }

      const fixed: Record<string, unknown> = { ...slide, type };

      // Fix string fields that the LLM wraps in objects
      const stringFields = ['headline', 'subheadline', 'tag', 'myth', 'fact', 'quote',
        'respondentName', 'respondentRole', 'author', 'role', 'credit', 'bodyText',
        'subtext', 'actionLabel', 'socialHandle'];
      for (const field of stringFields) {
        if (fixed[field] && typeof fixed[field] === 'object') {
          const obj = fixed[field] as Record<string, unknown>;
          fixed[field] = obj.title ?? obj.text ?? obj.name ?? obj.value ?? JSON.stringify(obj);
        }
      }

      // Ensure quadrant slides have required fields
      if (type === 'quadrant') {
        for (const corner of ['topLeft', 'topRight', 'bottomLeft', 'bottomRight']) {
          if (!fixed[corner] || typeof fixed[corner] !== 'object') {
            fixed[corner] = { title: corner, desc: '' };
          }
        }
      }

      // Ensure interview slides have string respondentName
      if (type === 'interview') {
        if (typeof fixed.respondentName !== 'string') fixed.respondentName = '';
        if (typeof fixed.respondentRole !== 'string') fixed.respondentRole = '';
      }

      // Ensure case-study has stages array
      if (type === 'case-study' && (!fixed.stages || !Array.isArray(fixed.stages))) {
        fixed.stages = [{ label: 'Step 1', title: 'Process', desc: 'Key process step', highlighted: 'true' }];
      }

      // Ensure resource-grid has items array
      if (type === 'resource-grid' && (!fixed.items || !Array.isArray(fixed.items))) {
        fixed.items = [{ title: 'Resource', desc: 'Key resource' }];
      }

      // Ensure timeline has events array
      if (type === 'timeline' && (!fixed.events || !Array.isArray(fixed.events))) {
        fixed.events = [{ date: '2024', title: 'Event', desc: 'Key event', highlight: 'true' }];
      }

      return fixed;
    });
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

  const useMultiPhase = process.env['LLM_MULTI_PHASE'] !== 'false';
  jobLogger.info({ useMultiPhase }, 'Starting structuring pipeline');

  try {
    let targetTemplateId = existing.template_id;

    if (!targetTemplateId || targetTemplateId === 'auto') {
      jobLogger.info('Auto-selecting optimal template via Dynamic LLM Classifier...');
      const classification = await autoSelectTemplate(rawText);
      targetTemplateId = classification.templateId;
      jobLogger.info({ autoSelected: targetTemplateId, rationale: classification.rationale }, 'Template auto-selected');

      await JobRepository.updateTemplate(jobId, targetTemplateId);
    }

    const template = getTemplate(targetTemplateId);

    if (useMultiPhase) {
      const brandKit = (existing.brand_kit as Record<string, string | undefined>) ?? {};

      // Build template info with full schema introspection for each template
      const TEMPLATE_STYLES: Record<string, { name: string; aesthetics: string }> = {
        'paper-of-record': { name: 'The Paper of Record', aesthetics: 'Classic newspaper editorial. Think New York Times, The Guardian longform. Authoritative, serious, investigative.' },
        'the-globalist': { name: 'The Globalist', aesthetics: 'Economist/Monocle-style global affairs magazine. Macro-economic, geopolitical, sophisticated.' },
        'the-terminal': { name: 'The Terminal', aesthetics: 'Bloomberg Terminal / Financial Times dark mode. Data-driven, market-focused, quantitative.' },
        'the-curator': { name: 'The Curator', aesthetics: 'MoMA gallery / avant-garde design publication. Minimal, artistic, conceptual.' },
        'the-academic': { name: 'The Academic', aesthetics: 'Harvard Business Review / MIT research paper. Academic, evidence-based, structured.' },
      };

      const templates: TemplateInfo[] = Object.entries(TEMPLATES).map(([id, entry]) => ({
        id,
        name: TEMPLATE_STYLES[id]?.name ?? entry.name,
        aesthetics: TEMPLATE_STYLES[id]?.aesthetics ?? '',
        schemaText: introspectSchema(entry.schema),
        schemaTextConcise: introspectSchemaConcise(entry.schema),
        toneKeywords: entry.toneKeywords,
      }));

      const result = await generateSlidesMultiPhase(rawText, templates, {
        llm,
        brandKit,
        onProgress: (phase, detail) => {
          jobLogger.info({ phase, detail }, 'Multi-phase progress');
        },
        onDebug: (filename, content) => {
          void writeDebug(jobId, filename, content);
        },
        checkpoint: await JobRepository.getCheckpoint(jobId) ?? undefined,
        retriesUsed: await JobRepository.getRetriesUsed(jobId),
        onSaveCheckpoint: async (phase, data) => {
          await JobRepository.checkpoint(jobId, phase, data);
        },
      });

      // Handle needs_review terminal state
      if (result.needsReview) {
        jobLogger.warn('Label detection failed after retries, flagging for review');
        await JobRepository.markNeedsReview(jobId, 'label_detection_failed');
        return;
      }

      jobLogger.info({
        slideCount: result.slides.length,
        selectedTemplate: result.selectedTemplateId,
        domain: result.domainId,
        extractionMs: result.extractionLatencyMs,
        domainMs: result.domainClassificationMs,
        selectionMs: result.selectionLatencyMs,
        planMs: result.planLatencyMs,
        generationMs: result.generationLatencyMs,
        creativeDirectorMs: result.creativeDirectorLatencyMs,
        totalMs: result.totalLatencyMs,
        slidePlan: result.slidePlan,
        totalTokens: result.totalTokens,
        phaseUsages: result.phaseUsages,
      }, 'Multi-phase pipeline completed');

      // Write per-phase LLM usage to llm_usage table
      const model = process.env['LLM_MODEL'] ?? 'gemini-2.5-flash-lite';
      for (const usage of result.phaseUsages) {
        await JobRepository.insertLlmUsage({
          jobId,
          phase: usage.phase,
          provider: process.env['LLM_PROVIDER'] ?? 'google',
          model,
          promptTokens: usage.promptTokens,
          completionTokens: usage.completionTokens,
          latencyMs: usage.latencyMs,
          estimatedCostUsd: calculateCost(model, usage.promptTokens, usage.completionTokens),
        });
      }

      // Update generation_jobs cost columns
      await JobRepository.updateCostColumns(jobId, {
        domainId: result.domainId,
        totalPromptTokens: result.totalTokens.input,
        totalCompletionTokens: result.totalTokens.output,
        totalCostUsd: calculateCost(model, result.totalTokens.input, result.totalTokens.output),
      });

      // Bug 1 fix: Use the Phase 2 template selection, not the pre-selected one
      if (result.selectedTemplateId !== targetTemplateId) {
        jobLogger.info({ from: targetTemplateId, to: result.selectedTemplateId }, 'Phase 2 selected different template, updating job');
        targetTemplateId = result.selectedTemplateId;
        await JobRepository.updateTemplate(jobId, targetTemplateId);
      }

      // Bug 2 fix: Sanitize and validate slides against schema
      const selectedTpl = getTemplate(targetTemplateId);
      const sanitized = { slides: sanitizeSlides(result.slides) };
      const validationResult = selectedTpl.schema.safeParse(sanitized);

      if (!validationResult.success) {
        jobLogger.error({ errors: validationResult.error.issues }, 'Schema validation failed after multi-phase generation');
        const validationErrors = validationResult.error.issues
          .map((i: { path: (string | number)[]; message: string }) => `${i.path.join('.')}: ${i.message}`)
          .join('\n');

        await JobRepository.markFailed(jobId, {
          stage: 'structuring',
          reason: 'schema_validation_failed',
          details: validationErrors,
        });
        return;
      }

      const { slides: paginated } = paginateContract({ slides: validationResult.data.slides });
      const withImages = await fetchImagesForSlides(paginated, jobId);

      // Write per-slide rows to slide_data table
      for (let i = 0; i < withImages.length; i++) {
        const slide = withImages[i];
        if (slide) {
          await JobRepository.insertSlideData({
            jobId,
            phase: 'phase4',
            slideIndex: i,
            slideType: String(slide.type ?? 'unknown'),
            headline: String(slide.headline ?? slide.tag ?? null),
            content: slide,
          });
        }
      }

      await writeDebug(jobId, '05-paginated.json', JSON.stringify({ slides: withImages }, null, 2));

      await JobRepository.updateStatus(jobId, 'rendering', {
        contentPayload: { slides: withImages },
        slideCount: withImages.length,
      });

      await renderQueue.add('render-slide', { jobId });

      // Clear checkpoint after successful completion
      await JobRepository.clearCheckpoint(jobId);

      jobLogger.info(
        { slideCount: withImages.length, template: targetTemplateId, validated: true },
        'Dispatched to render queue (multi-phase)',
      );
    } else {
      const brandKit = (existing.brand_kit as Record<string, string | undefined>) ?? {};
      const basePrompt = await getPrompt(targetTemplateId, rawText, brandKit);
      await writeDebug(jobId, '01-prompt-monolithic.md', `## System\n\n${basePrompt}\n\n## User\n\n(See 00-extracted.txt for raw text input)`);

      let lastValidationErrors = '';

      for (let attempt = 0; attempt < 3; attempt++) {
        const prompt = lastValidationErrors
          ? `${basePrompt}\n\n## PREVIOUS ATTEMPT FAILED VALIDATION\nYour previous output had these errors:\n${lastValidationErrors}\nFix ALL of these errors. Do NOT invent slide types that are not in the schema.`
          : basePrompt;

        const rawResponse = await llm.generateJSON(prompt, rawText);
        jobLogger.info({ attempt, rawSnippet: rawResponse.text.slice(0, 200) }, 'Raw LLM response');

        await writeDebug(jobId, `02-monolithic-attempt${attempt}.txt`, rawResponse.text);

        const cleaned = stripMarkdownFences(rawResponse.text);
        let parsed: unknown;

        try {
          const result = parseLlmXmlOutput(cleaned);
          parsed = result;
        } catch {
          try {
            parsed = JSON.parse(cleaned);
          } catch {
            throw new Error('Could not parse LLM response as XML or JSON');
          }
        }

        const sanitized = { slides: sanitizeSlides((parsed as Record<string, unknown>).slides as Record<string, unknown>[] ?? []) };
        const result = template.schema.safeParse(sanitized);

        if (result.success) {
          var validData = result.data;
          break;
        }

        lastValidationErrors = result.error.issues
          .map((i: { path: (string | number)[]; message: string }) => `${i.path.join('.')}: ${i.message}`)
          .join('\n');

        jobLogger.error({ attempt, errors: result.error.issues }, 'Schema validation failed, retrying');

        if (attempt === 2) {
          await JobRepository.markFailed(jobId, {
            stage: 'structuring',
            reason: 'schema_validation_failed',
            details: lastValidationErrors,
          });
          return;
        }
      }

      if (!validData!) return;
      const data = validData as { slides: Record<string, unknown>[]; meta?: Record<string, unknown> };

      const { slides: paginated } = paginateContract({ slides: data.slides });

      const withImages = await fetchImagesForSlides(paginated, jobId);

      await writeDebug(jobId, '05-paginated.json', JSON.stringify({ slides: withImages }, null, 2));

      await JobRepository.updateStatus(jobId, 'rendering', {
        contentPayload: { ...data, slides: withImages },
        slideCount: withImages.length,
      });

      await renderQueue.add('render-slide', { jobId });

      jobLogger.info(
        { slideCount: withImages.length, template: targetTemplateId },
        'Dispatched to render queue (monolithic)',
      );
    }
  } catch (err) {
    const classified = classifyError(err);
    jobLogger.error({ err, errorType: classified.type }, 'Structuring failed');

    if (classified.type === 'transient' && job.attemptsMade < 3) {
      throw classified;
    }

    await JobRepository.markFailed(jobId, {
      stage: 'structuring',
      reason: classified.type,
      details: classified.message,
    });
  }
}, { concurrency: 5 });

worker.on('failed', (job, err) => {
  logger.error({ jobId: job?.id, err }, 'Worker failed');
});

logger.info('worker-structure started');

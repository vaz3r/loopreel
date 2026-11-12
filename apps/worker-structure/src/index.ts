import { JobRepository, AssetRepository, type InsertAssetParams } from '@loopreel/db';
import { createWorker, createQueue } from '@loopreel/queue';
import { classifyError, type StructurePayload } from '@loopreel/schemas';
import { uploadSlide } from '@loopreel/storage';
import { generateTemplateReference } from '@loopreel/generator';
import { getTemplate, getPrompt, autoSelectTemplate, paginateContract, TEMPLATES, introspectSchema, introspectSchemaConcise } from '@loopreel/loop/bridge';
import { createLLMClient, parseLlmXmlOutput, generateSlides, calculateCost } from '@loopreel/llm';
import type { TemplateInfo } from '@loopreel/llm';
import { validateInput } from '@loopreel/llm';
import { sanitizeSlides } from './slide-sanitizer.js';
import { fetchImagesForSlides } from './image-fetcher.js';
import { mkdir, writeFile } from 'node:fs/promises';
import fs from 'node:fs';
import path, { join } from 'node:path';
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

  // Pre-flight input validation: fail fast before any LLM calls
  const inputResult = validateInput(rawText);
  if (!inputResult.valid) {
    jobLogger.warn({ reason: inputResult.reason, details: inputResult.details, textLength: rawText.length }, 'Input validation failed — rejecting');
    await JobRepository.updateStatus(jobId, 'failed');
    await JobRepository.markFailed(jobId, {
      stage: 'structuring',
      reason: inputResult.reason ?? 'input_validation_failed',
      details: `${inputResult.details} (${inputResult.textLength} chars, ${inputResult.bodyLineCount} body lines)`,
    });
    return;
  }

  try {
    const isBespoke = existing.template_id === 'bespoke' ||
      job.data.engine === 'bespoke' ||
      ((existing.brand_kit as any)?.engine === 'bespoke');

    if (isBespoke) {
      jobLogger.info({ sourceUrl: existing.source_url }, 'Processing via Bespoke Codegen Engine (@loopreel/generator)...');

      const rawBrandKit = (existing.brand_kit as any) || {};
      const narrativePreset = rawBrandKit.narrativePreset || 'storytelling';
      const targetSlideCount = typeof rawBrandKit.targetSlideCount === 'number' ? rawBrandKit.targetSlideCount : 7;

      // Run bespoke generation pipeline with parallel codegen (N=3) and automated visual audit
      const result = await generateTemplateReference(
        {
          url: existing.source_url,
          platform: existing.platform,
          brandKit: rawBrandKit,
          narrativePreset,
          targetSlideCount,
        },
        { runAudit: true, concurrency: 3 }
      );

      // Strict failure gate: never upload corrupt slides if audit failed
      if (result.audit && !result.audit.passed) {
        const errorDetails = result.audit.errors.length > 0
          ? result.audit.errors.join('; ')
          : `${result.audit.totalCollisions} collisions or visual faults detected during visual audit`;
        jobLogger.error({ errors: result.audit.errors, collisions: result.audit.totalCollisions }, 'Visual audit failed — rejecting job');
        await JobRepository.markFailed(jobId, {
          stage: 'structuring',
          reason: 'visual_audit_failed',
          details: errorDetails,
        });
        return;
      }

      jobLogger.info({
        templateSlug: result.templateSlug,
        slideCount: result.slideCount,
        collisions: result.audit?.totalCollisions ?? 0,
      }, 'Bespoke codegen completed, uploading slide snapshots to storage');

      // Upload screenshots to storage and create asset records
      const screenshotsDir = result.audit?.screenshotsDir ||
        path.resolve(result.templateDir, 'screenshots');

      const assets: InsertAssetParams[] = [];

      for (let i = 0; i < result.slideCount; i++) {
        const slideFileName = `slide-${String(i + 1).padStart(2, '0')}.png`;
        const filePath = path.join(screenshotsDir, slideFileName);
        if (fs.existsSync(filePath)) {
          const buffer = await fs.promises.readFile(filePath);
          const r2Key = await uploadSlide(jobId, i, buffer);
          assets.push({
            jobId,
            formatType: 'carousel_slide',
            slideIndex: i,
            storageUrl: r2Key,
          });
        }
      }

      // Generate companion social posts if enabled
      if (existing.generate_text && result.deck?.slides) {
        const linkedinText = result.deck.slides
          .map((s: { headline?: string; body?: string }) => `${s.headline ?? ''}\n${s.body ?? ''}`.trim())
          .join('\n\n');

        const twitterThread = result.deck.slides
          .map((s: { headline?: string; body?: string }, idx: number) => `${idx + 1}/${result.slideCount} ${s.headline ?? ''}\n${s.body ?? ''}`.trim())
          .join('\n\n');

        assets.push({ jobId, formatType: 'linkedin_post', contentText: linkedinText });
        assets.push({ jobId, formatType: 'twitter_thread', contentText: twitterThread });
      }

      await AssetRepository.insertBatch(assets);
      await JobRepository.updateTemplate(jobId, result.templateSlug);
      await JobRepository.updateStatus(jobId, 'complete', {
        contentPayload: {
          templateSlug: result.templateSlug,
          brand: result.brand,
          deck: result.deck,
          audit: result.audit,
        },
        slideCount: result.slideCount,
      });

      jobLogger.info({
        jobId,
        templateSlug: result.templateSlug,
        assetCount: assets.length,
      }, 'Bespoke job successfully completed');
      return;
    }

    let targetTemplateId = existing.template_id;
    const isFixedTemplate = Boolean(existing.template_id && existing.template_id !== 'auto');

    if (!targetTemplateId || targetTemplateId === 'auto') {
      jobLogger.info('Auto-selecting optimal template via Dynamic LLM Classifier...');
      const classification = await autoSelectTemplate(rawText);
      targetTemplateId = classification.templateId;
      jobLogger.info({ autoSelected: targetTemplateId, rationale: classification.rationale }, 'Template auto-selected');

      await JobRepository.updateTemplate(jobId, targetTemplateId);
    } else {
      jobLogger.info({ fixedTemplate: targetTemplateId }, 'Using user-selected fixed template (classifier bypassed)');
    }

    const template = getTemplate(targetTemplateId);

    if (useMultiPhase) {
      const brandKit = (existing.brand_kit as Record<string, string | undefined>) ?? {};

      const TEMPLATE_STYLES: Record<string, { name: string; aesthetics: string }> = {
        'paper-of-record': { name: 'The Paper of Record', aesthetics: 'Classic newspaper editorial. Think New York Times, The Guardian longform. Authoritative, serious, investigative.' },
        'the-globalist': { name: 'The Globalist', aesthetics: 'Economist/Monocle-style global affairs magazine. Macro-economic, geopolitical, sophisticated. Best for business, markets, and global trends.' },
        'the-curator': { name: 'The Curator', aesthetics: 'MoMA gallery / avant-garde design publication. Minimal, artistic, conceptual.' },
        'the-academic': { name: 'The Academic', aesthetics: 'Harvard Business Review / MIT research paper. Academic, evidence-based, quantitative, structured.' },
        'the-signal': { name: 'The Signal', aesthetics: 'Modern B2B tech briefing and startup playbook. Sharp, punchy, high-velocity insights.' },
        'the-field-notes': { name: 'The Field Notes', aesthetics: 'Researcher pocket notebook & field observations on dot-grid kraft paper with ruled margins, hand-drawn annotations, specimen definition cards, telemetry tallies, and reflective entries. Every slide must be rich with substance.' },
      };

      const templates: TemplateInfo[] = Object.entries(TEMPLATES).map(([id, entry]) => ({
        id,
        name: TEMPLATE_STYLES[id]?.name ?? entry.name,
        aesthetics: TEMPLATE_STYLES[id]?.aesthetics ?? '',
        schemaText: introspectSchema(entry.schema),
        schemaTextConcise: introspectSchemaConcise(entry.schema),
        toneKeywords: entry.toneKeywords,
      }));

      const result = await generateSlides(rawText, templates, {
        llm,
        brandKit,
        fixedTemplateId: isFixedTemplate ? targetTemplateId : undefined,
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

      // Handle needs_review state: only block if explicitly configured to block
      if (result.needsReview) {
        jobLogger.warn('Quality validator flagged for review — proceeding with best-effort render');
        if (process.env['BLOCK_ON_REVIEW'] === 'true') {
          await JobRepository.markNeedsReview(jobId, 'label_detection_failed');
          return;
        }
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
      const activeProvider = process.env['LLM_PROVIDER'] ?? 'google';
      const model = (activeProvider === 'copilot' || activeProvider === 'copilot-studio' || activeProvider === 'directline')
        ? (process.env['COPILOT_MODEL'] ?? 'copilot-studio')
        : (process.env['LLM_MODEL'] ?? 'gemini-2.5-flash-lite');

      for (const usage of result.phaseUsages) {
        await JobRepository.insertLlmUsage({
          jobId,
          phase: usage.phase,
          provider: activeProvider,
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

      // Use the Phase 2 template selection only if job was set to auto
      if (!isFixedTemplate && result.selectedTemplateId !== targetTemplateId) {
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
        contentPayload: { slides: withImages, meta: { brandKit } },
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
}, { concurrency: 2, lockDuration: 300_000, maxStalledCount: 3 });

worker.on('failed', (job, err) => {
  logger.error({ jobId: job?.id, err }, 'Worker failed');
});

logger.info('worker-structure started');

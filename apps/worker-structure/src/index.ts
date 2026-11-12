import { JobRepository, AssetRepository, type InsertAssetParams } from '@loopreel/db';
import { createWorker } from '@loopreel/queue';
import { classifyError, type StructurePayload } from '@loopreel/schemas';
import { uploadSlide } from '@loopreel/storage';
import { generateTemplateReference } from '@loopreel/generator';
import { validateInput } from '@loopreel/llm';
import fs from 'node:fs';
import path from 'node:path';
import pino from 'pino';

const logger = pino({
  level: process.env['LOG_LEVEL'] ?? 'info',
  formatters: {
    level: (label) => ({ level: label.toUpperCase() }),
  },
});

const worker = createWorker<StructurePayload>('structure', async (job) => {
  const { jobId, rawText } = job.data;
  const jobLogger = logger.child({ jobId, workerType: 'structure' });

  const existing = await JobRepository.findById(jobId);
  if (!existing) {
    jobLogger.error('Job not found, skipping');
    return;
  }
  const isPromptMode = existing.source_type === 'prompt' || existing.source_url.startsWith('prompt:');

  if (existing.status !== 'structuring' && existing.status !== 'queued') {
    jobLogger.info({ currentStatus: existing.status }, 'Job already advanced, skipping');
    return;
  }
  await JobRepository.updateStatus(jobId, 'structuring');

  jobLogger.info({ isPromptMode }, 'Starting structuring pipeline (Bespoke Codegen)');

  // Pre-flight input validation:
  // In prompt mode, require only a concise topic/thesis (>= 5 chars).
  // In scraped URL mode, enforce full article length validation (> 500 chars).
  if (!isPromptMode) {
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
  } else if (!rawText || rawText.trim().length < 5) {
    jobLogger.warn({ textLength: rawText?.length }, 'Prompt input too short — rejecting');
    await JobRepository.updateStatus(jobId, 'failed');
    await JobRepository.markFailed(jobId, {
      stage: 'structuring',
      reason: 'prompt_too_short',
      details: 'Prompt must be at least 5 characters long.',
    });
    return;
  }

  try {
    jobLogger.info({ sourceUrl: existing.source_url }, 'Processing via Bespoke Codegen Engine (@loopreel/generator)...');

    const rawBrandKit = (existing.brand_kit as any) || {};
    const narrativePreset = rawBrandKit.narrativePreset || 'storytelling';
    const targetSlideCount = typeof rawBrandKit.targetSlideCount === 'number' ? rawBrandKit.targetSlideCount : 7;

    const isPromptMode = existing.source_type === 'prompt' || existing.source_url.startsWith('prompt:');
    const promptText = isPromptMode
      ? existing.source_url.replace(/^prompt:\s*/, '').trim()
      : undefined;

    const generatorOptions: any = {
      platform: existing.platform,
      brandKit: rawBrandKit,
      narrativePreset,
      targetSlideCount,
    };

    if (isPromptMode && promptText) {
      jobLogger.info({ prompt: promptText }, 'Synthesizing editorial publication directly from prompt/topic...');
      generatorOptions.brief = {
        name: promptText.slice(0, 100),
        domain: rawBrandKit.domain || 'thefineprint.co',
        vibe: promptText,
        inspiration: rawBrandKit.vibe || 'Investigative corporate autopsies, fine print tricks and receipts',
      };
    } else {
      generatorOptions.url = existing.source_url;
    }

    // Run bespoke generation pipeline with parallel codegen (N=3) and automated visual audit
    const result = await generateTemplateReference(
      generatorOptions,
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

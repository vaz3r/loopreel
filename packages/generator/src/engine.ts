import fs from 'node:fs';
import path from 'node:path';
import { runTemplatePipeline, sanitizeTsxCode, extractTsx, type PipelineOptions } from './pipeline.js';
import { auditTemplateStudio, type VisualAuditResult } from './visual-auditor.js';
import { buildVisualSelfHealingPrompt, type TemplateBrief } from './prompt.js';
import { createLLMClient } from '@loopreel/llm';
import type { BrandTokens, DeckData } from './skeleton/types.js';

export interface GenerationResult {
  templateSlug: string;
  templateDir: string;
  brand: BrandTokens;
  deck: DeckData;
  slideCount: number;
  audit?: VisualAuditResult;
}

export async function generateTemplateReference(
  briefOrOptions?: TemplateBrief | (PipelineOptions & { runAudit?: boolean }),
  options: PipelineOptions & { runAudit?: boolean } = {}
): Promise<GenerationResult> {
  const mergedOptions: PipelineOptions & { runAudit?: boolean } = {
    ...options,
    ...(briefOrOptions && (
      'concurrency' in briefOrOptions ||
      'provider' in briefOrOptions ||
      'url' in briefOrOptions ||
      'platform' in briefOrOptions ||
      'brandKit' in briefOrOptions ||
      'narrativePreset' in briefOrOptions ||
      'targetSlideCount' in briefOrOptions ||
      'preset' in briefOrOptions ||
      'brief' in briefOrOptions
    )
      ? (briefOrOptions as PipelineOptions & { runAudit?: boolean })
      : { brief: briefOrOptions as TemplateBrief }),
  };

  const pipelineResult = await runTemplatePipeline(mergedOptions);

  let audit: VisualAuditResult | undefined;
  if (mergedOptions.runAudit) {
    try {
      console.log('\n[Engine] >>> Pass 6: Running Automated Playwright Visual Audit on http://localhost:5175/studio...');
      audit = await auditTemplateStudio(pipelineResult.templateSlug, pipelineResult.slideCount, {
        platform: mergedOptions.platform,
      });
      console.log(
        `[Engine] Audit finished: ${audit.totalCollisions} collisions detected across ${audit.slideCount} slides.`
      );

      // Automated visual self-healing loop
      if (!audit.passed && audit.errors.length > 0) {
        console.log(`[Engine] Attempting automated visual self-healing for ${audit.errors.length} visual fault(s)...`);
        const llm = createLLMClient(mergedOptions.provider || 'copilot');
        const slidesDir = path.join(pipelineResult.templateDir, 'slides');
        const files = fs.readdirSync(slidesDir).filter((f) => f.endsWith('.tsx'));

        let healedAny = false;
        for (const file of files) {
          const slideMatch = file.match(/Slide(\d+)/i);
          if (slideMatch && slideMatch[1]) {
            const slideNum = parseInt(slideMatch[1], 10);
            const slideErrors = audit.errors.filter((e) => e.startsWith(`Slide ${slideNum}:`));
            if (slideErrors.length > 0) {
              console.log(`[Engine] Visual self-healing for ${file}: ${slideErrors.join('; ')}`);
              const currentCode = fs.readFileSync(path.join(slidesDir, file), 'utf-8');
              const repairResponse = await llm.generateJSON(
                'You are a React and CSS expert. Fix the reported visual audit issues completely. Return ONLY the corrected code in a ```tsx code block.',
                buildVisualSelfHealingPrompt(file, currentCode, slideErrors.join('\n')),
                0.2
              );
              const fixedCode = sanitizeTsxCode(extractTsx(repairResponse.text));
              fs.writeFileSync(path.join(slidesDir, file), fixedCode, 'utf-8');
              healedAny = true;
            }
          }
        }

        if (healedAny) {
          console.log('[Engine] Re-running Visual Audit after self-healing repairs...');
          audit = await auditTemplateStudio(pipelineResult.templateSlug, pipelineResult.slideCount, {
            platform: mergedOptions.platform,
          });
          console.log(
            `[Engine] Post-repair Audit finished: ${audit.totalCollisions} collisions detected across ${audit.slideCount} slides.`
          );
        }
      }
    } catch (err: any) {
      console.warn(`[Engine] Visual audit skipped or failed: ${err.message}`);
    }
  }

  return {
    ...pipelineResult,
    audit,
  };
}

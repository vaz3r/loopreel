import { runTemplatePipeline, type PipelineOptions } from './pipeline.js';
import { auditTemplateStudio, type VisualAuditResult } from './visual-auditor.js';
import type { TemplateBrief } from './prompt.js';
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
    ...(briefOrOptions && ('concurrency' in briefOrOptions || 'provider' in briefOrOptions || 'url' in briefOrOptions)
      ? (briefOrOptions as PipelineOptions & { runAudit?: boolean })
      : { brief: briefOrOptions as TemplateBrief }),
  };

  const pipelineResult = await runTemplatePipeline(mergedOptions);

  let audit: VisualAuditResult | undefined;
  if (mergedOptions.runAudit) {
    try {
      console.log('\n[Engine] >>> Pass 6: Running Automated Playwright Visual Audit on http://localhost:5174...');
      audit = await auditTemplateStudio(pipelineResult.templateSlug, pipelineResult.slideCount);
      console.log(
        `[Engine] Audit finished: ${audit.totalCollisions} collisions detected across ${audit.slideCount} slides.`
      );
    } catch (err: any) {
      console.warn(`[Engine] Visual audit skipped or failed: ${err.message}`);
    }
  }

  return {
    ...pipelineResult,
    audit,
  };
}

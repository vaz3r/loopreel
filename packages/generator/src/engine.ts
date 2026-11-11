import { runTemplatePipeline, type PipelineOptions } from './pipeline';
import { auditTemplateStudio, type VisualAuditResult } from './visual-auditor';
import type { TemplateBrief } from './prompt';
import type { BrandTokens, DeckData } from './skeleton/types';

export interface GenerationResult {
  templateSlug: string;
  templateDir: string;
  brand: BrandTokens;
  deck: DeckData;
  slideCount: number;
  audit?: VisualAuditResult;
}

export async function generateTemplateReference(
  brief: TemplateBrief,
  options: PipelineOptions & { runAudit?: boolean } = {}
): Promise<GenerationResult> {
  const pipelineResult = await runTemplatePipeline({ ...options, brief });

  let audit: VisualAuditResult | undefined;
  if (options.runAudit) {
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

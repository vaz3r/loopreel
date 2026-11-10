import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createLLMClient } from '@loopreel/llm';
import type { TemplateBrief } from './prompt.js';
import { runConceptPass, runEditorialPass, runAssemblyPass } from './pipeline.js';
import { cleanAndValidateHtml, type ValidationResult } from './validator.js';
import { auditTemplateHtml, type AuditReport } from './visual-auditor.js';

function findRepoRoot(): string {
  let dir = path.dirname(fileURLToPath(import.meta.url));
  while (dir !== path.dirname(dir)) {
    if (fs.existsSync(path.join(dir, 'pnpm-workspace.yaml'))) {
      return dir;
    }
    dir = path.dirname(dir);
  }
  return process.cwd();
}

export interface GenerationResult {
  filePath: string;
  templateName: string;
  validation: ValidationResult;
  audit?: AuditReport;
  usage?: { promptTokens: number; completionTokens: number };
}

export async function generateTemplateReference(
  brief: TemplateBrief,
  options?: { outputDir?: string; provider?: string; skipAudit?: boolean }
): Promise<GenerationResult> {
  const rootDir = findRepoRoot();
  const targetDir = options?.outputDir || path.resolve(rootDir, 'packages/loop/design-references');

  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  const requestedProvider = options?.provider || process.env['LLM_PROVIDER'] || 'copilot';
  console.log(`[apps/generator] Initializing Multi-Pass Thought Pipeline with provider "${requestedProvider}"...`);
  const client = createLLMClient(requestedProvider);

  // Pass 1: Concept & Design System
  const manifest = await runConceptPass(brief, client);

  // Pass 2: Editorial Copywriting & Composition
  const slides = await runEditorialPass(manifest, client);

  // Pass 3: HTML/CSS Master Assembly
  const rawHtml = await runAssemblyPass(manifest, slides, client);

  console.log(`[apps/generator] Validating assembled HTML structure...`);
  const validation = cleanAndValidateHtml(rawHtml);

  if (!validation.valid) {
    throw new Error(`HTML Validation failed:\n${validation.errors.join('\n')}`);
  }

  // Sanitize filename
  const cleanName = (manifest.templateName || brief.name).trim().replace(/[<>:"/\\|?*]+/g, '');
  const fileName = `${cleanName}.html`;
  const filePath = path.join(targetDir, fileName);

  fs.writeFileSync(filePath, validation.html, 'utf8');
  console.log(`[apps/generator] Successfully saved design reference: ${filePath}`);

  // Pass 4: Automated Playwright Visual Collision & Balance Audit
  let audit: AuditReport | undefined;
  if (!options?.skipAudit) {
    console.log(`[apps/generator] >>> Pass 4: Automated Playwright Visual Collision & Balance Audit...`);
    const screenshotDir = path.resolve(
      rootDir,
      `node_modules/.cache/generator/${cleanName.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`
    );
    audit = await auditTemplateHtml(filePath, { screenshotDir });

    if (audit.totalCollisions > 0) {
      console.warn(`[apps/generator] WARNING: Visual auditor detected ${audit.totalCollisions} collision(s)!`);
      audit.errors.forEach((err) => console.warn(`  - ${err}`));
    } else {
      console.log(`[apps/generator] Visual audit PASSED: 0 collisions detected across all ${audit.slideCount} slides.`);
    }

    if (audit.warnings.length > 0) {
      audit.warnings.forEach((warn) => console.warn(`  - ${warn}`));
    }
  }

  return {
    filePath,
    templateName: manifest.templateName || brief.name,
    validation,
    audit,
  };
}

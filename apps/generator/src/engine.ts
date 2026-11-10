import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createLLMClient } from '@loopreel/llm';
import { buildSystemPrompt, buildUserPrompt, type TemplateBrief } from './prompt.js';
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

  const systemPrompt = buildSystemPrompt();
  const userPrompt = buildUserPrompt(brief);

  const requestedProvider = options?.provider || process.env['LLM_PROVIDER'] || 'copilot';

  let response;
  try {
    console.log(`[apps/generator] Calling LLM (${requestedProvider})...`);
    const client = createLLMClient(requestedProvider);
    response = await client.generateJSON(systemPrompt, userPrompt);
  } catch (primaryErr) {
    const errMsg = primaryErr instanceof Error ? primaryErr.message : String(primaryErr);
    console.warn(`[apps/generator] Provider "${requestedProvider}" failed: ${errMsg}`);

    // If primary provider was copilot or openrouter, attempt fallback to google if LLM_GOOGLE_API_KEY exists
    if (requestedProvider !== 'google' && process.env['LLM_GOOGLE_API_KEY']) {
      console.log(`[apps/generator] Attempting fallback to Google AI Studio (gemini-2.5-flash-lite)...`);
      const fallbackClient = createLLMClient('google');
      response = await fallbackClient.generateJSON(systemPrompt, userPrompt);
    } else {
      throw primaryErr;
    }
  }

  console.log(`[apps/generator] Response received (${response.text.length} characters). Validating structure...`);
  const validation = cleanAndValidateHtml(response.text);

  if (!validation.valid) {
    throw new Error(`HTML Validation failed:\n${validation.errors.join('\n')}`);
  }

  // Sanitize filename
  const cleanName = brief.name.trim().replace(/[<>:"/\\|?*]+/g, '');
  const fileName = `${cleanName}.html`;
  const filePath = path.join(targetDir, fileName);

  fs.writeFileSync(filePath, validation.html, 'utf8');
  console.log(`[apps/generator] Saved design reference: ${filePath}`);

  // Run automated Playwright visual audit
  let audit: AuditReport | undefined;
  if (!options?.skipAudit) {
    console.log(`[apps/generator] Running automated visual collision & balance audit...`);
    const screenshotDir = path.resolve(
      rootDir,
      `node_modules/.cache/generator/${cleanName.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`
    );
    audit = await auditTemplateHtml(filePath, { screenshotDir });

    if (audit.totalCollisions > 0) {
      console.warn(`[apps/generator] WARNING: Visual auditor detected ${audit.totalCollisions} text collision(s)!`);
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
    templateName: brief.name,
    validation,
    audit,
    usage: response.usage,
  };
}

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createLLMClient } from '@loopreel/llm';
import { buildSystemPrompt, buildUserPrompt, type TemplateBrief } from './prompt.js';
import { cleanAndValidateHtml, type ValidationResult } from './validator.js';

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
  usage?: { promptTokens: number; completionTokens: number };
}

export async function generateTemplateReference(
  brief: TemplateBrief,
  options?: { outputDir?: string; provider?: string }
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

  console.log(`[apps/generator] Response received (${response.text.length} characters). Validating...`);
  const validation = cleanAndValidateHtml(response.text);

  if (!validation.valid) {
    throw new Error(`HTML Validation failed:\n${validation.errors.join('\n')}`);
  }

  // Sanitize filename
  const cleanName = brief.name.trim().replace(/[<>:"/\\|?*]+/g, '');
  const fileName = `${cleanName}.html`;
  const filePath = path.join(targetDir, fileName);

  fs.writeFileSync(filePath, validation.html, 'utf8');
  console.log(`[apps/generator] Successfully saved design reference: ${filePath}`);

  return {
    filePath,
    templateName: brief.name,
    validation,
    usage: response.usage,
  };
}

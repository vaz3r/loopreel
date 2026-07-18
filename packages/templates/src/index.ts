import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const PROMPTS_DIR = join(__dirname, 'prompts');

export const CURRENT_VERSION = 'v1' as const;

export type PromptVersion = 'v1';

export async function getStructurePrompt(version: PromptVersion = CURRENT_VERSION): Promise<string> {
  const promptPath = join(PROMPTS_DIR, version, 'structure.txt');
  return readFile(promptPath, 'utf-8');
}

export async function listVersions(): Promise<string[]> {
  const { readdir } = await import('node:fs/promises');
  const entries = await readdir(PROMPTS_DIR, { withFileTypes: true });
  return entries.filter((e) => e.isDirectory()).map((e) => e.name).sort();
}

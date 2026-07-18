import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const PROMPTS_DIR = join(__dirname, 'prompts');

export const CURRENT_VERSION = 'v2' as const;

export type PromptVersion = 'v1' | 'v2';

// Legacy v1 prompt
export async function getStructurePrompt(version: PromptVersion = 'v1'): Promise<string> {
  const promptPath = join(PROMPTS_DIR, version, 'structure.txt');
  return readFile(promptPath, 'utf-8');
}

// v2 prompts
export async function getContentStructurePrompt(): Promise<string> {
  const promptPath = join(PROMPTS_DIR, 'v2', 'content-structure.txt');
  return readFile(promptPath, 'utf-8');
}

export async function getBrandProfilePrompt(): Promise<string> {
  const promptPath = join(PROMPTS_DIR, 'v2', 'brand-profile.txt');
  return readFile(promptPath, 'utf-8');
}

export async function getDesignDecisionsPrompt(): Promise<string> {
  const promptPath = join(PROMPTS_DIR, 'v2', 'design-decisions.txt');
  return readFile(promptPath, 'utf-8');
}

export async function listVersions(): Promise<string[]> {
  const { readdir } = await import('node:fs/promises');
  const entries = await readdir(PROMPTS_DIR, { withFileTypes: true });
  return entries.filter((e) => e.isDirectory()).map((e) => e.name).sort();
}

// Re-export parser utilities
export { parseXml, extractText, extractString, extractNumber, extractArray } from './parser.js';

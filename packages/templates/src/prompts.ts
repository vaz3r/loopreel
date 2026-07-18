import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const CURRENT_VERSION = 'v2';

async function loadPrompt(version: string, name: string): Promise<string> {
  const promptPath = join(__dirname, 'prompts', version, `${name}.txt`);
  return readFile(promptPath, 'utf-8');
}

export async function getContentStructurePrompt(): Promise<string> {
  return loadPrompt(CURRENT_VERSION, 'content-structure');
}

export async function getBrandProfilePrompt(): Promise<string> {
  return loadPrompt(CURRENT_VERSION, 'brand-profile');
}

export async function getDesignDecisionsPrompt(): Promise<string> {
  return loadPrompt(CURRENT_VERSION, 'design-decisions');
}

// Legacy v1 prompt for backward compatibility
export async function getStructurePrompt(): Promise<string> {
  return loadPrompt('v1', 'structure');
}

export function listVersions(): string[] {
  return ['v1', 'v2'];
}

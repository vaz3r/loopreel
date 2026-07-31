import Handlebars from 'handlebars';
import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

function resolvePromptsDir(): string {
  const candidates = [
    // During development (source)
    join(process.cwd(), 'packages', 'llm', 'src', 'brain', 'prompts'),
    // In Docker container (copied to src)
    join('/app', 'packages', 'llm', 'src', 'brain', 'prompts'),
    // Relative to this file's compiled location (dist/brain/prompts -> src/brain/prompts)
    join(import.meta.dirname ?? '.', '..', '..', 'src', 'brain', 'prompts'),
    // Fallback: same directory
    join(import.meta.dirname ?? '.', '.'),
  ];
  for (const dir of candidates) {
    if (existsSync(dir)) return dir;
  }
  return candidates[0]!;
}

const PROMPTS_DIR = resolvePromptsDir();
const cache = new Map<string, HandlebarsTemplateDelegate>();

export function loadPrompt(name: string): HandlebarsTemplateDelegate {
  if (cache.has(name)) return cache.get(name)!;
  const md = readFileSync(join(PROMPTS_DIR, `${name}.md`), 'utf8');
  const compiled = Handlebars.compile(md);
  cache.set(name, compiled);
  return compiled;
}

export function renderPrompt(name: string, data: Record<string, unknown>): string {
  return loadPrompt(name)(data);
}

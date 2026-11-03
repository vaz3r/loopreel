import Handlebars from 'handlebars';
import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

function resolvePromptsDir(): string {
  const candidates = [
    // Next to compiled loader in dist/brain/prompts/
    join(import.meta.dirname ?? '.', '.'),
    // Next to compiled file if in dist/brain/
    join(import.meta.dirname ?? '.', 'prompts'),
    // During development (source)
    join(process.cwd(), 'packages', 'llm', 'src', 'brain', 'prompts'),
    // Relative from dist/brain/prompts -> packages/llm/src/brain/prompts
    join(import.meta.dirname ?? '.', '..', '..', '..', 'src', 'brain', 'prompts'),
    // Relative from dist/brain -> packages/llm/src/brain/prompts
    join(import.meta.dirname ?? '.', '..', '..', 'src', 'brain', 'prompts'),
    // In Docker container
    join('/app', 'packages', 'llm', 'src', 'brain', 'prompts'),
  ];
  for (const dir of candidates) {
    if (existsSync(dir) && existsSync(join(dir, 'extraction.md'))) return dir;
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

import { readFile } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { EditorialRunway as EditorialRunwayComponent, EditorialRunwayRenderContractSchema } from './EditorialRunway/index.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

const editorialRunwayPrompt = await readFile(
  join(__dirname, 'EditorialRunway', 'prompt.txt'),
  'utf-8',
);

function getEditorialRunwayPrompt(rawText: string): string {
  return `${editorialRunwayPrompt}\n\n---\n\nSource content:\n${rawText}`;
}

const registry: Record<string, {
  schema: any;
  Component: React.ComponentType<any>;
  getPrompt: (rawText: string) => string;
}> = {
  'editorial-runway': {
    schema: EditorialRunwayRenderContractSchema,
    Component: EditorialRunwayComponent,
    getPrompt: getEditorialRunwayPrompt,
  },
};

export function getTemplate(id: string) {
  const template = registry[id];
  if (!template) {
    throw new Error(`Unknown template id "${id}" — check registry.ts and the design-decision LLM call's allowed template list.`);
  }
  return template;
}

export function getTemplateIds(): string[] {
  return Object.keys(registry);
}

export type TemplateId = keyof typeof registry;

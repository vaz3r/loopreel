import { readFile } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { EditorialContractSchema } from './editorial-runway/schema.js';
import { EditorialRunwayComponent } from './editorial-runway/Component.js';
import { ProtocolContractSchema } from './protocol-001/schema.js';
import { Protocol001Component } from './protocol-001/Component.js';
import { ArchiveContractSchema } from './archive/schema.js';
import ArchiveTemplate from './archive/index.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

const editorialRunwayPrompt = await readFile(
  join(__dirname, 'editorial-runway', 'prompt.txt'),
  'utf-8',
);

const protocol001Prompt = await readFile(
  join(__dirname, 'protocol-001', 'prompt.txt'),
  'utf-8',
);

const archivePrompt = await readFile(
  join(__dirname, 'archive', 'prompt.txt'),
  'utf-8',
);

function getEditorialRunwayPrompt(rawText: string): string {
  return `${editorialRunwayPrompt}\n\n---\n\nSource content:\n${rawText}`;
}

function getProtocol001Prompt(rawText: string): string {
  return `${protocol001Prompt}\n\n---\n\nSource content:\n${rawText}`;
}

function getArchivePrompt(rawText: string): string {
  return `${archivePrompt}\n\n---\n\nSource content:\n${rawText}`;
}

export const EditorialRunway = {
  schema: EditorialContractSchema,
  Component: EditorialRunwayComponent,
  getPrompt: getEditorialRunwayPrompt,
};

export const Protocol001 = {
  schema: ProtocolContractSchema,
  Component: Protocol001Component,
  getPrompt: getProtocol001Prompt,
};

export const Archive = {
  schema: ArchiveContractSchema,
  Component: ArchiveTemplate,
  getPrompt: getArchivePrompt,
};

export const TEMPLATES = {
  'editorial-runway': EditorialRunway,
  'protocol-001': Protocol001,
  'archive': Archive,
} as const;

export type TemplateId = keyof typeof TEMPLATES;
export type TemplateModule = typeof EditorialRunway | typeof Protocol001 | typeof Archive;

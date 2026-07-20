import { readFile } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { EditorialContractSchema } from './editorial-runway/schema.js';
import { EditorialRunwayComponent } from './editorial-runway/Component.js';
import { ProtocolContractSchema } from './protocol-001/schema.js';
import { Protocol001Component } from './protocol-001/Component.js';
import { ArchiveContractSchema } from './archive/schema.js';
import ArchiveTemplate from './archive/index.js';
import { CustomBrandContractSchema } from './custom-brand/schema.js';
import { CustomBrandSingle } from './custom-brand/index.js';
import { VoidContractSchema } from './void-editorial/schema.js';
import { VoidEditorialComponent } from './void-editorial/index.js';
import { ArchivePaperContractSchema } from './archive-paper/schema.js';
import { ArchivePaperSingle } from './archive-paper/index.js';
import { IndustrialBrutalContractSchema } from './industrial-brutal/schema.js';
import { IndustrialBrutalSingle } from './industrial-brutal/index.js';

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

const customBrandPrompt = await readFile(
  join(__dirname, 'custom-brand', 'prompt.txt'),
  'utf-8',
);

const voidEditorialPrompt = await readFile(
  join(__dirname, 'void-editorial', 'prompt.txt'),
  'utf-8',
);

const archivePaperPrompt = await readFile(
  join(__dirname, 'archive-paper', 'prompt.txt'),
  'utf-8',
);

const industrialBrutalPrompt = await readFile(
  join(__dirname, 'industrial-brutal', 'prompt.txt'),
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

function getCustomBrandPrompt(rawText: string): string {
  return `${customBrandPrompt}\n\n---\n\nSource content:\n${rawText}`;
}

function getVoidEditorialPrompt(rawText: string): string {
  return `${voidEditorialPrompt}\n\n---\n\nSource content:\n${rawText}`;
}

function getArchivePaperPrompt(rawText: string): string {
  return `${archivePaperPrompt}\n\n---\n\nSource content:\n${rawText}`;
}

function getIndustrialBrutalPrompt(rawText: string): string {
  return `${industrialBrutalPrompt}\n\n---\n\nSource content:\n${rawText}`;
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

export const CustomBrand = {
  schema: CustomBrandContractSchema,
  Component: CustomBrandSingle,
  getPrompt: getCustomBrandPrompt,
};

export const VoidEditorial = {
  schema: VoidContractSchema,
  Component: VoidEditorialComponent,
  getPrompt: getVoidEditorialPrompt,
};

export const ArchivePaper = {
  schema: ArchivePaperContractSchema,
  Component: ArchivePaperSingle,
  getPrompt: getArchivePaperPrompt,
};

export const IndustrialBrutal = {
  schema: IndustrialBrutalContractSchema,
  Component: IndustrialBrutalSingle,
  getPrompt: getIndustrialBrutalPrompt,
};

export const TEMPLATES = {
  'editorial-runway': EditorialRunway,
  'protocol-001': Protocol001,
  'archive': Archive,
  'custom-brand': CustomBrand,
  'void-editorial': VoidEditorial,
  'archive-paper': ArchivePaper,
  'industrial-brutal': IndustrialBrutal,
} as const;

export type TemplateId = keyof typeof TEMPLATES;
export type TemplateModule = typeof EditorialRunway | typeof Protocol001 | typeof Archive | typeof CustomBrand | typeof VoidEditorial | typeof ArchivePaper | typeof IndustrialBrutal;

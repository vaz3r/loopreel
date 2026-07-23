import type { z } from 'zod';
import { PaperOfRecordContract } from './schemas.js';
import { TheGlobalistContract } from './schemas.js';
import { TheTerminalContract } from './schemas.js';
import { TheCuratorContract } from './schemas.js';
import { TheAcademicContract } from './schemas.js';

export interface TemplateEntry {
  id: string;
  name: string;
  schemeId: string;
  schema: z.ZodTypeAny;
  defaultPlatform: string;
}

export const TEMPLATES: Record<string, TemplateEntry> = {
  'paper-of-record': {
    id: 'paper-of-record',
    name: 'The Paper of Record',
    schemeId: 'archive_paper',
    schema: PaperOfRecordContract,
    defaultPlatform: 'instagram-feed',
  },
  'the-globalist': {
    id: 'the-globalist',
    name: 'The Globalist',
    schemeId: 'globalist_editorial',
    schema: TheGlobalistContract,
    defaultPlatform: 'instagram-feed',
  },
  'the-terminal': {
    id: 'the-terminal',
    name: 'The Terminal',
    schemeId: 'terminal_dark',
    schema: TheTerminalContract,
    defaultPlatform: 'instagram-feed',
  },
  'the-curator': {
    id: 'the-curator',
    name: 'The Curator',
    schemeId: 'curator_gallery',
    schema: TheCuratorContract,
    defaultPlatform: 'instagram-feed',
  },
  'the-academic': {
    id: 'the-academic',
    name: 'The Academic',
    schemeId: 'academic_research',
    schema: TheAcademicContract,
    defaultPlatform: 'instagram-feed',
  },
};

export function getTemplate(id: string): TemplateEntry {
  const template = TEMPLATES[id];
  if (!template) {
    throw new Error(`Unknown template "${id}". Valid: ${Object.keys(TEMPLATES).join(', ')}`);
  }
  return template;
}

export function getTemplateIds(): string[] {
  return Object.keys(TEMPLATES);
}

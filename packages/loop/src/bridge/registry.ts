import type { z } from 'zod';
import { PaperOfRecordContract } from './schemas.js';
import { TheFieldNotesContract } from './schemas.js';
import { TheGlobalistContract } from './schemas.js';
import { TheCuratorContract } from './schemas.js';
import { TheAcademicContract } from './schemas.js';
import { TheSignalContract } from './schemas.js';

export interface TemplateEntry {
  id: string;
  name: string;
  schemeId: string;
  schema: z.ZodTypeAny;
  defaultPlatform: string;
  toneKeywords: string[];
  cluster: string;
}

export const TEMPLATES: Record<string, TemplateEntry> = {
  'paper-of-record': {
    id: 'paper-of-record',
    name: 'The Paper of Record',
    schemeId: 'archive_paper',
    schema: PaperOfRecordContract,
    defaultPlatform: 'instagram-feed',
    toneKeywords: ['news', 'editorial', 'human-interest', 'opinion', 'breaking', 'disaster', 'crisis'],
    cluster: 'editorial',
  },
  'the-globalist': {
    id: 'the-globalist',
    name: 'The Globalist',
    schemeId: 'globalist_editorial',
    schema: TheGlobalistContract,
    defaultPlatform: 'instagram-feed',
    toneKeywords: ['world', 'geopolitics', 'culture', 'society', 'longform', 'analysis'],
    cluster: 'editorial',
  },
  'the-curator': {
    id: 'the-curator',
    name: 'The Curator',
    schemeId: 'curator_gallery',
    schema: TheCuratorContract,
    defaultPlatform: 'instagram-feed',
    toneKeywords: ['creative', 'artistic', 'minimal', 'conceptual', 'design', 'visual'],
    cluster: 'creative',
  },
  'the-academic': {
    id: 'the-academic',
    name: 'The Academic',
    schemeId: 'academic_research',
    schema: TheAcademicContract,
    defaultPlatform: 'instagram-feed',
    toneKeywords: ['research', 'science', 'evidence', 'academic', 'structured', 'methodology'],
    cluster: 'academic',
  },
  'the-signal': {
    id: 'the-signal',
    name: 'The Signal',
    schemeId: 'custom_brand',
    schema: TheSignalContract,
    defaultPlatform: 'instagram-feed',
    toneKeywords: ['the signal', 'modern', 'editorial'],
    cluster: 'modern',
  },
  'the-field-notes': {
    id: 'the-field-notes',
    name: 'The Field Notes',
    schemeId: 'custom_brand',
    schema: TheFieldNotesContract,
    defaultPlatform: 'instagram-feed',
    toneKeywords: ['notebook', 'journal', 'field notes', 'observations', 'qualitative', 'ux', 'study', 'interviews'],
    cluster: 'editorial',
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

export function getTemplatesByCluster(cluster: string): TemplateEntry[] {
  return Object.values(TEMPLATES).filter(t => t.cluster === cluster);
}

export function getClusters(): string[] {
  return [...new Set(Object.values(TEMPLATES).map(t => t.cluster))];
}

import type { ComponentType } from 'react';
import type { SlideData, PostMeta, BrandKit, DesignOutput } from '@loopreel/schemas';
import type { SlideFormat } from './shared/types.js';
import { EditorialTemplate } from './EditorialRunway/EditorialRunway.js';

export interface TemplateProps {
  slide: SlideData;
  slideCount: number;
  brandKit?: BrandKit;
  design?: DesignOutput;
  meta?: PostMeta;
  format?: SlideFormat;
}

export type TemplateComponent = ComponentType<TemplateProps>;

const registry: Record<string, TemplateComponent> = {
  'editorial-runway': EditorialTemplate,
};

const legacyAliases: Record<string, string> = {
  'modern-bold': 'editorial-runway',
  'modern-dark': 'editorial-runway',
  'editorial': 'editorial-runway',
  'minimal-clean': 'editorial-runway',
  'elegant-luxury': 'editorial-runway',
  'tech-gradient': 'editorial-runway',
  'organic-natural': 'editorial-runway',
  'corporate-sharp': 'editorial-runway',
  'creative-pop': 'editorial-runway',
  'premium-dark': 'editorial-runway',
  'glassmorphism': 'editorial-runway',
};

export function getTemplate(id: string): TemplateComponent {
  const resolved = legacyAliases[id] ?? id;
  const tmpl = registry[resolved];
  if (!tmpl) throw new Error(`Unknown template: ${id}`);
  if (resolved !== id) console.warn(`Template "${id}" is deprecated, using "${resolved}"`);
  return tmpl;
}

export function getTemplateIds(): string[] {
  return Object.keys(registry);
}

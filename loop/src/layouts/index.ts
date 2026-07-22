import React from 'react';
import type { FrameProps, LayoutProps } from './shared/types';

import * as VoidEditorial from './void-editorial/layout';
import * as ArchivePaper from './archive-paper/layout';
import * as IndustrialBrutal from './industrial-brutal/layout';
import * as CustomBrand from './custom-brand/layout';
import * as ModernClean from './modern-clean/layout';
import * as PremiumSocial from './premium-social/layout';
import * as AvantGardeEditorial from './avant-garde-editorial/layout';

const templateIndex: Record<string, typeof VoidEditorial> = {
  'void-editorial': VoidEditorial,
  'archive-paper': ArchivePaper,
  'industrial-brutal': IndustrialBrutal,
  'custom-brand': CustomBrand,
  'modern-clean': ModernClean,
  'premium-social': PremiumSocial,
  'avant-garde-editorial': AvantGardeEditorial,
};

export type { FrameProps, LayoutProps };

export function getFrame(templateId: string): React.ComponentType<FrameProps> {
  return templateIndex[templateId]?.frame ?? templateIndex['void-editorial'].frame;
}

export function getLayout(templateId: string, slideType: string): React.ComponentType<LayoutProps> {
  return templateIndex[templateId]?.slides[slideType] ?? getLayout('void-editorial', slideType);
}

export function getTemplateMeta(templateId: string) {
  return templateIndex[templateId]?.templateMeta ?? templateIndex['void-editorial'].templateMeta;
}

export function getAllTemplateMeta() {
  return Object.values(templateIndex).map(t => t.templateMeta);
}

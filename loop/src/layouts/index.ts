import React from 'react';
import type { FrameProps, LayoutProps } from './shared/types';

import VoidEditorialFrame from './void-editorial/frame';
import VoidEditorialCover from './void-editorial/cover';
import VoidEditorialDefinition from './void-editorial/definition';
import VoidEditorialDichotomy from './void-editorial/dichotomy';
import VoidEditorialTimeline from './void-editorial/timeline';
import VoidEditorialQuote from './void-editorial/quote';
import VoidEditorialSequence from './void-editorial/sequence';
import VoidEditorialTelemetry from './void-editorial/telemetry';
import VoidEditorialTable from './void-editorial/table';
import VoidEditorialImageSplit from './void-editorial/image-split';
import VoidEditorialImageCover from './void-editorial/image-cover';
import VoidEditorialCta from './void-editorial/cta';

import ArchivePaperFrame from './archive-paper/frame';
import ArchivePaperCover from './archive-paper/cover';
import ArchivePaperDefinition from './archive-paper/definition';
import ArchivePaperDichotomy from './archive-paper/dichotomy';
import ArchivePaperTimeline from './archive-paper/timeline';
import ArchivePaperQuote from './archive-paper/quote';
import ArchivePaperSequence from './archive-paper/sequence';
import ArchivePaperTelemetry from './archive-paper/telemetry';
import ArchivePaperTable from './archive-paper/table';
import ArchivePaperImageSplit from './archive-paper/image-split';
import ArchivePaperImageCover from './archive-paper/image-cover';
import ArchivePaperCta from './archive-paper/cta';

import IndustrialBrutalFrame from './industrial-brutal/frame';
import IndustrialBrutalCover from './industrial-brutal/cover';
import IndustrialBrutalDefinition from './industrial-brutal/definition';
import IndustrialBrutalDichotomy from './industrial-brutal/dichotomy';
import IndustrialBrutalTimeline from './industrial-brutal/timeline';
import IndustrialBrutalQuote from './industrial-brutal/quote';
import IndustrialBrutalSequence from './industrial-brutal/sequence';
import IndustrialBrutalTelemetry from './industrial-brutal/telemetry';
import IndustrialBrutalTable from './industrial-brutal/table';
import IndustrialBrutalImageSplit from './industrial-brutal/image-split';
import IndustrialBrutalImageCover from './industrial-brutal/image-cover';
import IndustrialBrutalCta from './industrial-brutal/cta';

import CustomBrandFrame from './custom-brand/frame';
import CustomBrandCover from './custom-brand/cover';
import CustomBrandDefinition from './custom-brand/definition';
import CustomBrandDichotomy from './custom-brand/dichotomy';
import CustomBrandTimeline from './custom-brand/timeline';
import CustomBrandQuote from './custom-brand/quote';
import CustomBrandSequence from './custom-brand/sequence';
import CustomBrandTelemetry from './custom-brand/telemetry';
import CustomBrandTable from './custom-brand/table';
import CustomBrandImageSplit from './custom-brand/image-split';
import CustomBrandImageCover from './custom-brand/image-cover';
import CustomBrandCta from './custom-brand/cta';

import ModernCleanFrame from './modern-clean/frame';
import ModernCleanCover from './modern-clean/cover';
import ModernCleanDefinition from './modern-clean/definition';
import ModernCleanDichotomy from './modern-clean/dichotomy';
import ModernCleanTimeline from './modern-clean/timeline';
import ModernCleanQuote from './modern-clean/quote';
import ModernCleanSequence from './modern-clean/sequence';
import ModernCleanTelemetry from './modern-clean/telemetry';
import ModernCleanTable from './modern-clean/table';
import ModernCleanImageSplit from './modern-clean/image-split';
import ModernCleanImageCover from './modern-clean/image-cover';
import ModernCleanCta from './modern-clean/cta';

interface TemplateLayouts {
  frame: React.ComponentType<FrameProps>;
  cover: React.ComponentType<LayoutProps>;
  definition: React.ComponentType<LayoutProps>;
  dichotomy: React.ComponentType<LayoutProps>;
  timeline: React.ComponentType<LayoutProps>;
  quote: React.ComponentType<LayoutProps>;
  sequence: React.ComponentType<LayoutProps>;
  telemetry: React.ComponentType<LayoutProps>;
  table: React.ComponentType<LayoutProps>;
  'image-split': React.ComponentType<LayoutProps>;
  'image-cover': React.ComponentType<LayoutProps>;
  cta: React.ComponentType<LayoutProps>;
}

const registry: Record<string, TemplateLayouts> = {
  'void-editorial': {
    frame: VoidEditorialFrame,
    cover: VoidEditorialCover,
    definition: VoidEditorialDefinition,
    dichotomy: VoidEditorialDichotomy,
    timeline: VoidEditorialTimeline,
    quote: VoidEditorialQuote,
    sequence: VoidEditorialSequence,
    telemetry: VoidEditorialTelemetry,
    table: VoidEditorialTable,
    'image-split': VoidEditorialImageSplit,
    'image-cover': VoidEditorialImageCover,
    cta: VoidEditorialCta,
  },
  'archive-paper': {
    frame: ArchivePaperFrame,
    cover: ArchivePaperCover,
    definition: ArchivePaperDefinition,
    dichotomy: ArchivePaperDichotomy,
    timeline: ArchivePaperTimeline,
    quote: ArchivePaperQuote,
    sequence: ArchivePaperSequence,
    telemetry: ArchivePaperTelemetry,
    table: ArchivePaperTable,
    'image-split': ArchivePaperImageSplit,
    'image-cover': ArchivePaperImageCover,
    cta: ArchivePaperCta,
  },
  'industrial-brutal': {
    frame: IndustrialBrutalFrame,
    cover: IndustrialBrutalCover,
    definition: IndustrialBrutalDefinition,
    dichotomy: IndustrialBrutalDichotomy,
    timeline: IndustrialBrutalTimeline,
    quote: IndustrialBrutalQuote,
    sequence: IndustrialBrutalSequence,
    telemetry: IndustrialBrutalTelemetry,
    table: IndustrialBrutalTable,
    'image-split': IndustrialBrutalImageSplit,
    'image-cover': IndustrialBrutalImageCover,
    cta: IndustrialBrutalCta,
  },
  'custom-brand': {
    frame: CustomBrandFrame,
    cover: CustomBrandCover,
    definition: CustomBrandDefinition,
    dichotomy: CustomBrandDichotomy,
    timeline: CustomBrandTimeline,
    quote: CustomBrandQuote,
    sequence: CustomBrandSequence,
    telemetry: CustomBrandTelemetry,
    table: CustomBrandTable,
    'image-split': CustomBrandImageSplit,
    'image-cover': CustomBrandImageCover,
    cta: CustomBrandCta,
  },
  'modern-clean': {
    frame: ModernCleanFrame,
    cover: ModernCleanCover,
    definition: ModernCleanDefinition,
    dichotomy: ModernCleanDichotomy,
    timeline: ModernCleanTimeline,
    quote: ModernCleanQuote,
    sequence: ModernCleanSequence,
    telemetry: ModernCleanTelemetry,
    table: ModernCleanTable,
    'image-split': ModernCleanImageSplit,
    'image-cover': ModernCleanImageCover,
    cta: ModernCleanCta,
  },
};

export type { FrameProps, LayoutProps };

export function getFrame(templateId: string): React.ComponentType<FrameProps> {
  return registry[templateId]?.frame ?? registry['void-editorial'].frame;
}

export function getLayout(templateId: string, slideType: string): React.ComponentType<LayoutProps> {
  const entry = registry[templateId];
  if (entry && entry[slideType as keyof TemplateLayouts]) {
    return entry[slideType as keyof TemplateLayouts] as React.ComponentType<LayoutProps>;
  }
  return getLayout('void-editorial', slideType);
}

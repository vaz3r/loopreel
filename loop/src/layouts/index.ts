import React from 'react';
import type { FrameProps, LayoutProps } from './shared/types';

import * as PaperOfRecord from './paper-of-record/layout';

const templateIndex: Record<string, typeof PaperOfRecord> = {
  'paper-of-record': PaperOfRecord,
};

export type { FrameProps, LayoutProps };

export function getFrame(templateId: string): React.ComponentType<FrameProps> {
  return templateIndex[templateId]?.frame ?? templateIndex['paper-of-record'].frame;
}

export function getLayout(templateId: string, slideType: string): React.ComponentType<LayoutProps> {
  return templateIndex[templateId]?.slides[slideType] ?? getLayout('paper-of-record', slideType);
}

export function getTemplateMeta(templateId: string) {
  return templateIndex[templateId]?.templateMeta ?? templateIndex['paper-of-record'].templateMeta;
}

export function getAllTemplateMeta() {
  return Object.values(templateIndex).map(t => t.templateMeta);
}

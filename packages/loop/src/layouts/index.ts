import React from 'react';
import type { FrameProps, LayoutProps } from './shared/types';

import * as PaperOfRecord from './paper-of-record/layout';
import * as TheGlobalist from './the-globalist/layout';
import * as TheTerminal from './the-terminal/layout';
import * as TheCurator from './the-curator/layout';
import * as TheAcademic from './the-academic/layout';

const templateIndex: Record<string, typeof PaperOfRecord> = {
  'paper-of-record': PaperOfRecord,
  'the-globalist': TheGlobalist,
  'the-terminal': TheTerminal,
  'the-curator': TheCurator,
  'the-academic': TheAcademic,
};

export type { FrameProps, LayoutProps };

export function getFrame(templateId: string): React.ComponentType<FrameProps> {
  return templateIndex[templateId]?.frame ?? templateIndex['paper-of-record'].frame;
}

function createThemeFallback(Component: React.ComponentType<LayoutProps>): React.ComponentType<LayoutProps> {
  return function FallbackWrapper(props: LayoutProps) {
    const { scheme } = props;
    return React.createElement(
      'div',
      {
        style: {
          width: '100%',
          height: '100%',
          color: scheme.text,
          fontFamily: scheme.fontSans,
          backgroundColor: scheme.bg,
        },
      },
      React.createElement(Component, props),
    );
  };
}

export function getLayout(templateId: string, slideType: string): React.ComponentType<LayoutProps> {
  const targetLayout = templateIndex[templateId]?.slides[slideType];
  if (targetLayout) {
    return targetLayout;
  }
  const fallbackLayout = templateIndex['paper-of-record'].slides[slideType] ?? templateIndex['paper-of-record'].slides.cover;
  return createThemeFallback(fallbackLayout);
}

export function getTemplateMeta(templateId: string) {
  return templateIndex[templateId]?.templateMeta ?? templateIndex['paper-of-record'].templateMeta;
}

export function getAllTemplateMeta() {
  return Object.values(templateIndex).map(t => t.templateMeta);
}

import React from 'react';
import { getFrame, getLayout } from './layouts';
import type { Slide } from '../schema';
import type { Scheme } from './engine-utils';

interface SlideRendererProps {
  slide: Slide;
  scheme: Scheme;
  templateId?: string;
  brandKit?: Record<string, string>;
}

export default function SlideRenderer({ slide, scheme, templateId = 'void-editorial', brandKit }: SlideRendererProps) {
  const Frame = getFrame(templateId);
  const Layout = getLayout(templateId, slide.type);

  return (
    <Frame slide={slide} scheme={scheme} brandKit={brandKit}>
      <Layout slide={slide} scheme={scheme} />
    </Frame>
  );
}

import React, { useEffect } from 'react';
import { getFrame, getLayout } from './layouts';
import { SCHEMES, injectFonts, type Scheme } from './engine-utils';
import type { Slide } from '../schema';

declare global {
  interface Window {
    __SLIDE_DATA?: Slide;
    __SLIDE_SCHEME_ID?: string;
    __SLIDE_TEMPLATE_ID?: string;
    __SLIDE_SIZE?: { width: number; height: number };
    __BRAND_KIT?: Record<string, string | undefined>;
  }
}

interface SlideRendererProps {
  slide: Slide;
  scheme: Scheme;
  templateId?: string;
  brandKit?: Record<string, string | undefined>;
  size?: { width: number; height: number };
}

export function SlideRenderer({ slide, scheme, templateId = 'paper-of-record', brandKit, size }: SlideRendererProps) {
  const Frame = getFrame(templateId);
  const Layout = getLayout(templateId, slide.type);

  return (
    <Frame slide={slide} scheme={scheme} brandKit={brandKit} size={size}>
      <Layout slide={slide} scheme={scheme} />
    </Frame>
  );
}

export default function ExportRenderer() {
  const slide = window.__SLIDE_DATA;
  const schemeId = window.__SLIDE_SCHEME_ID || 'archive_paper';
  const templateId = window.__SLIDE_TEMPLATE_ID || 'paper-of-record';
  const size = window.__SLIDE_SIZE || { width: 1080, height: 1350 };
  const brandKit = window.__BRAND_KIT;
  const scheme = (SCHEMES[schemeId as keyof typeof SCHEMES] || SCHEMES.archive_paper) as Scheme;

  useEffect(() => {
    injectFonts(schemeId === 'custom_brand' ? [scheme.fontSerif, scheme.fontSans] : []);
  }, [schemeId]);

  if (!slide) {
    return <div style={{ color: 'red', padding: 40, fontFamily: 'monospace' }}>No slide data provided.</div>;
  }

  return (
    <main style={{ margin: 0, padding: 0, background: '#000', width: size.width, height: size.height, overflow: 'hidden' }}>
      <SlideRenderer slide={slide} scheme={scheme} templateId={templateId} brandKit={brandKit} size={size} />
    </main>
  );
}

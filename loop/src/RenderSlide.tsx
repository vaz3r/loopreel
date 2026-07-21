import React, { useEffect } from 'react';
import SlideRenderer from './SlideRenderer';
import { SCHEMES, injectFonts, type Scheme } from './engine-utils';
import type { Slide } from '../schema';

declare global {
  interface Window {
    __SLIDE_DATA?: Slide;
    __SLIDE_SCHEME_ID?: string;
    __SLIDE_TEMPLATE_ID?: string;
  }
}

export default function RenderSlide() {
  const slide: Slide | undefined = window.__SLIDE_DATA;
  const schemeId = window.__SLIDE_SCHEME_ID || 'void_editorial';
  const templateId = window.__SLIDE_TEMPLATE_ID || 'void-editorial';
  const scheme = (SCHEMES[schemeId as keyof typeof SCHEMES] || SCHEMES.void_editorial) as Scheme;

  useEffect(() => {
    injectFonts(schemeId === 'custom_brand' ? [scheme.fontSerif, scheme.fontSans] : []);
  }, [schemeId]);

  if (!slide) {
    return <div style={{ color: 'red', padding: 40, fontFamily: 'monospace' }}>No slide data provided.</div>;
  }

  return (
    <main style={{ margin: 0, padding: 0, background: '#000', width: 1080, height: 1350, overflow: 'hidden' }}>
      <SlideRenderer slide={slide} scheme={scheme} templateId={templateId} />
    </main>
  );
}

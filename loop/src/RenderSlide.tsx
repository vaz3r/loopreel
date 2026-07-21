import React, { useEffect } from 'react';
import SlideRenderer from './SlideRenderer';
import { SCHEMES, injectFonts, type Scheme } from './engine-utils';
import type { Slide } from '../schema';

declare global {
  interface Window {
    __SLIDE_DATA?: Slide;
    __SLIDE_SCHEME_ID?: string;
  }
}

export default function RenderSlide() {
  const params = new URLSearchParams(window.location.search);

  const slide: Slide | undefined = window.__SLIDE_DATA || (() => {
    const raw = params.get('slide');
    if (!raw) return undefined;
    try { return JSON.parse(decodeURIComponent(raw)); }
    catch { return undefined; }
  })();

  const schemeId = window.__SLIDE_SCHEME_ID || params.get('schemeId') || 'void_editorial';
  const scheme = (SCHEMES[schemeId as keyof typeof SCHEMES] || SCHEMES.void_editorial) as Scheme;

  useEffect(() => {
    injectFonts(schemeId === 'custom_brand' ? [scheme.fontSerif, scheme.fontSans] : []);
  }, [schemeId]);

  if (!slide) {
    return <div style={{ color: 'red', padding: 40, fontFamily: 'monospace' }}>No slide data provided.</div>;
  }

  return (
    <main style={{ margin: 0, padding: 0, background: '#000', width: 1080, height: 1350, overflow: 'hidden' }}>
      <SlideRenderer slide={slide} scheme={scheme} />
    </main>
  );
}

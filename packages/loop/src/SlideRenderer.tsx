import React, { useEffect } from 'react';
import { getFrame, getLayout } from './layouts';
import { SCHEMES, injectFonts, type Scheme } from './engine-utils';
import type { Slide } from '../schema';
import { computeSlideDensity } from './layouts/_shared/density-engine';
import { getAllDecks } from './layouts/registry';

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

export function SlideRenderer({ slide, scheme, templateId = 'paper-of-record', brandKit, size = { width: 1080, height: 1350 } }: SlideRendererProps) {
  const Frame = getFrame(templateId);
  const Layout = getLayout(templateId, slide.type);
  const density = computeSlideDensity(slide, size);

  return (
    <div
      className={density.classes.join(' ')}
      style={{
        width: size.width,
        height: size.height,
        position: 'relative',
        overflow: 'hidden',
        ...density.cssVariables,
      }}
    >
      <Frame slide={slide} scheme={scheme} brandKit={brandKit} size={size} density={density}>
        <Layout slide={slide} scheme={scheme} density={density} />
      </Frame>
    </div>
  );
}

export default function ExportRenderer() {
  const [renderState, setRenderState] = React.useState(() => ({
    slide: window.__SLIDE_DATA,
    schemeId: window.__SLIDE_SCHEME_ID || 'archive_paper',
    templateId: window.__SLIDE_TEMPLATE_ID || 'paper-of-record',
    size: window.__SLIDE_SIZE || { width: 1080, height: 1350 },
    brandKit: window.__BRAND_KIT,
  }));

  useEffect(() => {
    const handleSlideUpdate = () => {
      setRenderState({
        slide: window.__SLIDE_DATA,
        schemeId: window.__SLIDE_SCHEME_ID || 'archive_paper',
        templateId: window.__SLIDE_TEMPLATE_ID || 'paper-of-record',
        size: window.__SLIDE_SIZE || { width: 1080, height: 1350 },
        brandKit: window.__BRAND_KIT,
      });
    };

    window.addEventListener('slide-update', handleSlideUpdate);
    return () => window.removeEventListener('slide-update', handleSlideUpdate);
  }, []);

  const { slide, schemeId, templateId, size, brandKit } = renderState;
  const scheme = (SCHEMES[schemeId as keyof typeof SCHEMES] || SCHEMES.archive_paper) as Scheme;

  useEffect(() => {
    injectFonts(schemeId === 'custom_brand' ? [scheme.fontSerif, scheme.fontSans] : []);
  }, [schemeId, scheme]);

  const fallbackSlide = (getAllDecks()[0]?.sampleSlides as any)?.slides?.[0] as Slide | undefined;
  const activeSlide = slide || fallbackSlide;

  if (!activeSlide) {
    return <div style={{ color: '#94a3b8', padding: 40, fontFamily: 'monospace' }}>Waiting for slide data...</div>;
  }

  return (
    <main data-slide-id={activeSlide.id} style={{ margin: 0, padding: 0, background: '#000', width: size.width, height: size.height, overflow: 'hidden' }}>
      <SlideRenderer slide={activeSlide} scheme={scheme} templateId={templateId} brandKit={brandKit} size={size} />
    </main>
  );
}

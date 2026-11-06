import React, { useEffect } from 'react';
import { type ThemeSpec, DEFAULT_CHAMELEON_THEME, computeThemeCssVariables, injectGoogleFonts } from './theme/index.js';
import { computeTokens } from './shared/tokens.js';
import {
  CoverSlide,
  SplitSlide,
  MetricsSlide,
  QuoteSlide,
  BreakdownSlide,
  MatrixSlide,
  CtaSlide,
} from './primitives/index.js';

export interface RenderSlide {
  id: string;
  type: string;
  [key: string]: unknown;
}

declare global {
  interface Window {
    __SLIDE_DATA?: RenderSlide;
    __CHAMELEON_THEME?: ThemeSpec;
    __SLIDE_SIZE?: { width: number; height: number };
    __BRAND_KIT?: Record<string, string | undefined>;
  }
}

interface SlideRendererProps {
  slide: RenderSlide;
  theme?: ThemeSpec;
  size?: { width: number; height: number };
}

export function SlideRenderer({
  slide,
  theme = DEFAULT_CHAMELEON_THEME,
  size = { width: 1080, height: 1350 },
}: SlideRendererProps) {
  useEffect(() => {
    injectGoogleFonts([
      theme.typography.headlineFont,
      theme.typography.bodyFont,
      theme.typography.monoFont,
    ]);
  }, [theme]);

  const themeVariables = computeThemeCssVariables(theme);
  const tokenVariables = computeTokens(slide, size).cssVariables;

  const textureClass = `texture-${theme.decorations.texture || 'clean'}`;

  const renderPrimitive = () => {
    switch (slide.type) {
      case 'cover':
        return <CoverSlide slide={slide as any} />;
      case 'split':
      case 'dichotomy':
      case 'compare':
        return <SplitSlide slide={slide as any} />;
      case 'metrics':
      case 'telemetry':
        return <MetricsSlide slide={slide as any} />;
      case 'quote':
        return <QuoteSlide slide={slide as any} />;
      case 'breakdown':
      case 'sequence':
      case 'list':
        return <BreakdownSlide slide={slide as any} />;
      case 'matrix':
      case 'table':
        return <MatrixSlide slide={slide as any} />;
      case 'cta':
        return <CtaSlide slide={slide as any} />;
      default:
        // Graceful fallback to breakdown or cover
        if ((slide as any).quote) return <QuoteSlide slide={slide as any} />;
        if ((slide as any).metrics || (slide as any).stats) return <MetricsSlide slide={slide as any} />;
        if ((slide as any).items) return <BreakdownSlide slide={slide as any} />;
        return <CoverSlide slide={slide as any} />;
    }
  };

  return (
    <div
      className={`w-full h-full relative overflow-hidden select-none ${textureClass}`}
      style={{
        width: size.width,
        height: size.height,
        backgroundColor: 'var(--cham-bg)',
        color: 'var(--cham-text)',
        fontFamily: 'var(--cham-font-body)',
        ...themeVariables,
        ...tokenVariables,
      } as React.CSSProperties}
    >
      {renderPrimitive()}
    </div>
  );
}

export default function ExportRenderer() {
  const [renderState, setRenderState] = React.useState(() => ({
    slide: window.__SLIDE_DATA,
    theme: window.__CHAMELEON_THEME || DEFAULT_CHAMELEON_THEME,
    size: window.__SLIDE_SIZE || { width: 1080, height: 1350 },
  }));

  useEffect(() => {
    const handleSlideUpdate = () => {
      setRenderState({
        slide: window.__SLIDE_DATA,
        theme: window.__CHAMELEON_THEME || DEFAULT_CHAMELEON_THEME,
        size: window.__SLIDE_SIZE || { width: 1080, height: 1350 },
      });
    };

    window.addEventListener('slide-update', handleSlideUpdate);
    return () => window.removeEventListener('slide-update', handleSlideUpdate);
  }, []);

  const { slide, theme, size } = renderState;

  const fallbackSlide: RenderSlide = {
    id: 'preview-cover',
    type: 'cover',
    kicker: 'AI CHAMELEON ENGINE',
    headline: 'Dynamic Parametric Visual Generation',
    subheadline: 'Bespoke themes synthesized per article with mathematically guaranteed 0px overflow.',
    author: 'Loopreel Chameleon',
    handle: '@loopreel',
    date: 'LIVE PREVIEW',
  };

  const activeSlide = slide || fallbackSlide;

  return (
    <main
      data-slide-id={activeSlide.id}
      style={{
        margin: 0,
        padding: 0,
        background: '#000',
        width: size.width,
        height: size.height,
        overflow: 'hidden',
      }}
    >
      <SlideRenderer slide={activeSlide} theme={theme} size={size} />
    </main>
  );
}

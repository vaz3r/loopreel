import React, { useEffect } from 'react';
import type { BrandTokens, SlideData } from './types';
import { AutoFit } from './AutoFit';

export interface SlideFrameProps {
  brand: BrandTokens;
  slide: SlideData;
  slideIndex: number;
  totalSlides: number;
  children: React.ReactNode;
}

export function SlideFrame({
  brand,
  slide,
  slideIndex,
  totalSlides,
  children,
}: SlideFrameProps) {
  // Dynamically inject Google Fonts
  useEffect(() => {
    if (!brand.typography.googleFontsUrl) return;
    const fontId = `google-font-${brand.slug}`;
    if (!document.getElementById(fontId)) {
      const link = document.createElement('link');
      link.id = fontId;
      link.rel = 'stylesheet';
      link.href = brand.typography.googleFontsUrl;
      document.head.appendChild(link);
    }
  }, [brand.slug, brand.typography.googleFontsUrl]);

  const textureClass =
    brand.texture === 'washi'
      ? 'texture-washi'
      : brand.texture === 'grid'
      ? 'texture-grid'
      : brand.texture === 'dots'
      ? 'texture-dots'
      : brand.texture === 'blueprint'
      ? 'texture-blueprint'
      : '';

  const renderMotif = () => {
    switch (brand.motif) {
      case 'seal':
        return (
          <span
            className="inline-flex items-center justify-center w-8 h-8 rounded border text-xs font-serif font-black tracking-widest shadow-sm"
            style={{
              borderColor: brand.palette.accent,
              color: brand.palette.accent,
              backgroundColor: `${brand.palette.accent}15`,
            }}
          >
            印
          </span>
        );
      case 'crosshair':
        return (
          <span
            className="inline-flex items-center justify-center text-sm font-mono font-bold tracking-tighter"
            style={{ color: brand.palette.accent }}
          >
            ✛
          </span>
        );
      case 'coord':
        return (
          <span
            className="text-[11px] font-mono tracking-widest uppercase px-2 py-0.5 rounded border"
            style={{
              borderColor: brand.palette.border,
              color: brand.palette.subtle || brand.palette.ink,
              backgroundColor: brand.palette.surface,
            }}
          >
            35°40&apos;N / 139°45&apos;E
          </span>
        );
      case 'bracket':
        return (
          <span className="font-mono text-xs opacity-60" style={{ color: brand.palette.accent }}>
            [ SYS_{String(slideIndex + 1).padStart(2, '0')} ]
          </span>
        );
      default:
        return null;
    }
  };

  const getWordmarkClass = () => {
    switch (brand.wordmarkStyle) {
      case 'serif':
        return 'font-headline font-bold italic tracking-tight text-2xl';
      case 'sans':
        return 'font-body font-extrabold tracking-widest uppercase text-xl';
      case 'mono':
        return 'font-mono font-bold tracking-widest uppercase text-lg';
      case 'small-caps':
        return 'font-headline font-semibold tracking-[0.2em] uppercase text-xl';
      default:
        return 'font-headline font-bold text-2xl';
    }
  };

  return (
    <div
      className={`slide-canvas relative w-[1080px] h-[1350px] shrink-0 overflow-hidden flex flex-col justify-between p-16 select-none ${textureClass}`}
      style={
        {
          backgroundColor: brand.palette.paper,
          color: brand.palette.ink,
          fontFamily: `'${brand.typography.bodyFont}', sans-serif`,
          '--paper': brand.palette.paper,
          '--ink': brand.palette.ink,
          '--accent': brand.palette.accent,
          '--surface': brand.palette.surface,
          '--border': brand.palette.border,
          '--subtle': brand.palette.subtle || `${brand.palette.ink}99`,
          '--font-headline': `'${brand.typography.headlineFont}', serif`,
          '--font-body': `'${brand.typography.bodyFont}', sans-serif`,
          '--font-mono': `'${brand.typography.monoFont}', monospace`,
        } as React.CSSProperties
      }
      data-slide-index={slideIndex}
      data-slide-id={slide.id || `slide-${slideIndex + 1}`}
      data-slide-type={slide.type}
    >
      {/* FRAME HEADER */}
      <header
        className="w-full flex items-center justify-between pb-8 border-b shrink-0 z-10"
        style={{ borderColor: brand.palette.border }}
      >
        <div className="flex items-center gap-4">
          <span className={getWordmarkClass()}>{brand.wordmark}</span>
          <span
            className="w-1.5 h-1.5 rounded-full"
            style={{ backgroundColor: brand.palette.accent }}
          />
          <span
            className="text-xs font-mono tracking-widest uppercase opacity-75"
            style={{ color: brand.palette.subtle || brand.palette.ink }}
          >
            {slide.tag || brand.domain}
          </span>
        </div>
        <div className="flex items-center gap-3">
          {renderMotif()}
          <span
            className="text-xs font-mono font-medium px-2.5 py-1 rounded border tracking-wider"
            style={{
              borderColor: brand.palette.border,
              backgroundColor: brand.palette.surface,
              color: brand.palette.subtle || brand.palette.ink,
            }}
          >
            VOL. 01
          </span>
        </div>
      </header>

      {/* FRAME CONTENT SAFE AREA */}
      <main className="w-full flex-1 my-10 relative overflow-hidden flex flex-col justify-center z-10">
        <AutoFit verticalAlign="center" paddingBuffer={24}>
          {children}
        </AutoFit>
      </main>

      {/* FRAME FOOTER */}
      <footer
        className="w-full flex items-center justify-between pt-8 border-t shrink-0 z-10"
        style={{ borderColor: brand.palette.border }}
      >
        <div className="flex items-center gap-3">
          <span
            className="text-sm font-mono font-bold tracking-wider"
            style={{ color: brand.palette.accent }}
          >
            {String(slideIndex + 1).padStart(2, '0')}
          </span>
          <span className="text-xs font-mono opacity-40">/</span>
          <span className="text-xs font-mono opacity-50">
            {String(totalSlides).padStart(2, '0')}
          </span>
          <div className="flex gap-1 ml-3">
            {Array.from({ length: totalSlides }).map((_, i) => (
              <span
                key={i}
                className="h-1 rounded-full transition-all duration-200"
                style={{
                  width: i === slideIndex ? '20px' : '4px',
                  backgroundColor:
                    i === slideIndex ? brand.palette.accent : `${brand.palette.ink}25`,
                }}
              />
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <span
            className="text-xs font-mono tracking-wider opacity-60"
            style={{ color: brand.palette.ink }}
          >
            {brand.handle}
          </span>
          <span
            className="text-[11px] font-mono tracking-widest uppercase px-2 py-0.5 rounded opacity-50"
            style={{ backgroundColor: `${brand.palette.ink}10` }}
          >
            SWIPE ➔
          </span>
        </div>
      </footer>
    </div>
  );
}

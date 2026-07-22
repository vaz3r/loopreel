import React from 'react';
import type { FrameProps } from '../shared/types';

export default function CustomBrandFrame({ slide, scheme, children, brandKit, size }: FrameProps) {
  const w = size?.width ?? 1080;
  const h = size?.height ?? 1350;
  return (
    <div className="relative overflow-hidden flex flex-col"
      style={{ width: w, height: h, backgroundColor: scheme.bg, color: scheme.text, fontFamily: `'${scheme.fontSans}', sans-serif` }}>
      <div className="absolute inset-0 opacity-[0.05]" style={{
        background: `linear-gradient(135deg, ${scheme.accent} 0%, transparent 50%, ${scheme.text} 100%)`,
        opacity: 0.08
      }} />

      <div className="absolute top-[45px] left-[100px] right-[100px] flex justify-between items-baseline z-20">
        <span className="text-[12px] font-medium tracking-[0.2em] uppercase"
          style={{ color: scheme.accent, fontFamily: `'${scheme.fontMono}', monospace` }}>
          {slide.tag || ''}
        </span>
        {brandKit?.logoUrl ? (
          <img src={brandKit.logoUrl} alt="Logo" className="h-[22px] object-contain"
            style={{ filter: brandKit.text === '#FFFFFF' || brandKit.text === '#F8FAFC' ? 'invert(1)' : 'none' }} />
        ) : (
          <span className="text-[11px] tracking-[0.15em] uppercase opacity-40"
            style={{ fontFamily: `'${scheme.fontMono}', monospace` }}>
            LOOP
          </span>
        )}
      </div>

      <div className="absolute top-[80px] left-[100px] right-[100px] h-[1px]" style={{ backgroundColor: scheme.border, opacity: 0.3 }} />

      <div className="absolute bottom-[45px] left-[100px] right-[100px] flex justify-between items-baseline z-20">
        <span className="text-[11px] tracking-[0.1em] uppercase opacity-40"
          style={{ fontFamily: `'${scheme.fontSans}', sans-serif` }}>
          {slide.footerLeft || ''}
        </span>
        <span className="text-[11px] tracking-[0.1em] uppercase"
          style={{ color: scheme.accent, fontFamily: `'${scheme.fontMono}', monospace` }}>
          {slide.footerRight || ''}
        </span>
      </div>
      <div className="absolute bottom-[80px] left-[100px] right-[100px] h-[1px]" style={{ backgroundColor: scheme.border, opacity: 0.3 }} />

      <div className="absolute inset-x-[100px] top-[120px] bottom-[120px] z-10 flex flex-col justify-center">
        {children}
      </div>
    </div>
  );
}

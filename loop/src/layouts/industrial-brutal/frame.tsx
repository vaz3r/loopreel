import React from 'react';
import type { FrameProps } from '../shared/types';

export default function IndustrialBrutalFrame({ slide, scheme, children, size }: FrameProps) {
  const w = size?.width ?? 1080;
  const h = size?.height ?? 1350;
  return (
    <div className="relative overflow-hidden flex flex-col"
      style={{
        width: w, height: h,
        backgroundColor: scheme.bg, color: scheme.text,
        fontFamily: `'${scheme.fontSans}', sans-serif`,
        '--accent': scheme.accent, '--text': scheme.text, '--bg': scheme.bg,
        '--border': scheme.border, '--fontSans': scheme.fontSans,
        '--fontMono': scheme.fontMono, '--fontSerif': scheme.fontSerif,
      } as React.CSSProperties}>
      <div className="absolute inset-0 opacity-[0.06]" style={{
        backgroundImage: `linear-gradient(45deg, ${scheme.text} 25%, transparent 25%, transparent 75%, ${scheme.text} 75%, ${scheme.text})`,
        backgroundSize: '60px 60px'
      }} />

      <div className="absolute top-[40px] left-[80px] right-[80px] z-20">
        <div className="flex justify-between items-center mb-2">
          <span className="text-[14px] font-bold tracking-[0.2em] uppercase"
            style={{ fontFamily: `'${scheme.fontMono}', monospace` }}>
            {slide.tag || ''}
          </span>
        </div>
        <div className="h-[4px]" style={{ backgroundColor: scheme.accent }} />
        <div className="h-[2px] mt-[2px]" style={{ backgroundColor: scheme.border }} />
      </div>

      <div className="absolute bottom-[40px] left-[80px] right-[80px] z-20">
        <div className="h-[2px]" style={{ backgroundColor: scheme.border }} />
        <div className="h-[4px] mt-[2px]" style={{ backgroundColor: scheme.accent }} />
        <div className="flex justify-between mt-3">
          <span className="text-[12px] font-bold tracking-[0.15em] uppercase opacity-60"
            style={{ fontFamily: `'${scheme.fontMono}', monospace` }}>
            {slide.footerLeft || ''}
          </span>
          <span className="text-[12px] font-bold tracking-[0.15em] uppercase"
            style={{ color: scheme.accent, fontFamily: `'${scheme.fontMono}', monospace` }}>
            {slide.footerRight || ''}
          </span>
        </div>
      </div>

      <div className="absolute inset-x-[80px] top-[120px] bottom-[120px] z-10 flex flex-col justify-center">
        {children}
      </div>
    </div>
  );
}

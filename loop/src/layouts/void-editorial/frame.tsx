import React from 'react';
import type { FrameProps } from '../shared/types';

export default function VoidEditorialFrame({ slide, scheme, children }: FrameProps) {
  return (
    <div className="w-[1080px] h-[1350px] relative overflow-hidden flex flex-col"
      style={{ backgroundColor: scheme.bg, color: scheme.text, fontFamily: `'${scheme.fontSerif}', serif` }}>
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, ${scheme.text} 1px, transparent 0)`,
        backgroundSize: '40px 40px'
      }} />

      <div className="absolute top-[55px] left-[120px] right-[120px] flex items-baseline gap-4 z-20">
        <span className="text-[13px] font-semibold tracking-[0.3em] uppercase"
          style={{ color: scheme.accent, fontFamily: `'${scheme.fontMono}', monospace`, letterSpacing: '0.3em' }}>
          {slide.tag || ''}
        </span>
        <div className="flex-1 h-[1px]" style={{ backgroundColor: scheme.accent, opacity: 0.5 }} />
      </div>

      <div className="absolute bottom-[45px] left-[120px] right-[120px] flex items-baseline justify-between z-20">
        <div className="flex-1 h-[1px] mb-1" style={{ backgroundColor: scheme.border }} />
        <div className="flex items-baseline gap-6 ml-6">
          <span className="text-[12px] tracking-[0.15em] uppercase opacity-40"
            style={{ fontFamily: `'${scheme.fontSans}', sans-serif` }}>
            {slide.footerLeft || ''}
          </span>
          <span className="text-[12px] tracking-[0.15em] uppercase"
            style={{ color: scheme.accent, fontFamily: `'${scheme.fontMono}', monospace` }}>
            {slide.footerRight || ''}
          </span>
        </div>
      </div>

      <div className="absolute inset-x-[120px] top-[160px] bottom-[140px] z-10 flex flex-col justify-center">
        {children}
      </div>
    </div>
  );
}

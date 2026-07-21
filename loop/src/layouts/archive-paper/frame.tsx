import React from 'react';
import type { FrameProps } from '../shared/types';

export default function ArchivePaperFrame({ slide, scheme, children }: FrameProps) {
  return (
    <div className="w-[1080px] h-[1350px] relative overflow-hidden flex flex-col"
      style={{ backgroundColor: scheme.bg, color: scheme.text, fontFamily: `'${scheme.fontSerif}', serif` }}>
      <div className="absolute inset-0 opacity-[0.04]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E")`,
        backgroundSize: '200px 200px',
        opacity: 0.15
      }} />

      <div className="absolute top-[50px] left-[140px] right-[140px] z-20">
        <div className="flex justify-between items-baseline mb-2">
          <span className="text-[11px] tracking-[0.15em] uppercase opacity-50"
            style={{ fontFamily: `'${scheme.fontSans}', sans-serif` }}>
            {slide.footerLeft || ''}
          </span>
          <span className="text-[11px] tracking-[0.15em] uppercase opacity-50"
            style={{ fontFamily: `'${scheme.fontSans}', sans-serif` }}>
            {slide.footerRight || ''}
          </span>
        </div>
        <div className="h-[1px]" style={{ backgroundColor: scheme.border }} />
        <div className="h-[1px] mt-[3px]" style={{ backgroundColor: scheme.border, opacity: 0.5 }} />
      </div>

      <div className="absolute top-[55px] left-[140px] right-[140px] flex justify-center z-20" style={{ marginTop: '36px' }}>
        <span className="text-[18px] tracking-[0.35em] uppercase font-medium"
          style={{ color: scheme.accent, fontFamily: `'${scheme.fontSerif}', serif`, letterSpacing: '0.35em' }}>
          {slide.tag || ''}
        </span>
      </div>

      <div className="absolute bottom-[50px] left-[140px] right-[140px] z-20">
        <div className="h-[1px]" style={{ backgroundColor: scheme.border, opacity: 0.5 }} />
        <div className="h-[1px] mt-[3px]" style={{ backgroundColor: scheme.border }} />
      </div>

      <div className="absolute inset-x-[140px] top-[180px] bottom-[160px] z-10 flex flex-col justify-center">
        {children}
      </div>
    </div>
  );
}

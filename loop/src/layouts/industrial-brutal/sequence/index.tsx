import React from 'react';
import { Engine } from '../../../engine-utils';
import type { LayoutProps } from '../../shared/types';

export default function BrutalSequence({ slide, scheme }: LayoutProps) {
  const s = slide as any;
  return (
    <div className="flex-1 flex flex-col justify-center min-h-0">
      <div className={`${Engine.getHeadlineStyle(s.headline, scheme.id)} uppercase mb-8`}
        style={{ color: scheme.text, fontFamily: `'${scheme.fontSans}', sans-serif` }}>
        {s.headline}
      </div>
      <div className="flex-1 flex flex-col justify-center gap-5 min-h-0 overflow-y-auto">
        {s.items.map((item: any, i: number) => (
          <div key={i} className="flex items-start gap-6">
            <div className="w-[64px] h-[64px] shrink-0 flex items-center justify-center border-2"
              style={{ borderColor: scheme.accent }}>
              <span className="text-[28px] font-black"
                style={{ color: scheme.accent, fontFamily: `'${scheme.fontMono}', monospace` }}>
                {item.num}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[28px] font-black uppercase tracking-tight leading-tight"
                style={{ color: scheme.text, fontFamily: `'${scheme.fontSans}', sans-serif` }}>
                {item.title}
              </div>
              <div className="text-[18px] mt-1 font-mono leading-snug"
                style={{ color: scheme.text, opacity: 0.7, fontFamily: `'${scheme.fontMono}', monospace` }}>
                {item.desc}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

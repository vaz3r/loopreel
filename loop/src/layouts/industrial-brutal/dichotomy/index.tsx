import React from 'react';
import { Engine } from '../../../engine-utils';
import type { LayoutProps } from '../../shared/types';

export default function BrutalDichotomy({ slide, scheme }: LayoutProps) {
  const s = slide as any;
  return (
    <div className="flex-1 flex flex-col justify-center min-h-0">
      <div className={`${Engine.getHeadlineStyle(s.headline, scheme.id)} uppercase mb-10`}
        style={{ color: scheme.text, fontFamily: `'${scheme.fontSans}', sans-serif` }}>
        {s.headline}
      </div>
      <div className="flex gap-0 flex-1 min-h-0">
        <div className="flex-1 flex flex-col justify-center pr-6 pt-6"
          style={{ borderTop: `6px solid ${scheme.accent}` }}>
          <div className="text-[40px] font-black uppercase tracking-tight mb-4"
            style={{ color: scheme.text, fontFamily: `'${scheme.fontSans}', sans-serif` }}>
            {s.left.title}
          </div>
          <div className="text-[20px] leading-[1.5] font-mono"
            style={{ color: scheme.text, opacity: 0.75, fontFamily: `'${scheme.fontMono}', monospace` }}>
            {s.left.desc}
          </div>
        </div>
        <div className="w-[6px] shrink-0 mx-6" style={{ backgroundColor: scheme.accent }} />
        <div className="flex-1 flex flex-col justify-center pl-6 pt-6"
          style={{ borderTop: `6px solid ${scheme.accent}` }}>
          <div className="text-[40px] font-black uppercase tracking-tight mb-4"
            style={{ color: scheme.text, fontFamily: `'${scheme.fontSans}', sans-serif` }}>
            {s.right.title}
          </div>
          <div className="text-[20px] leading-[1.5] font-mono"
            style={{ color: scheme.text, opacity: 0.75, fontFamily: `'${scheme.fontMono}', monospace` }}>
            {s.right.desc}
          </div>
        </div>
      </div>
    </div>
  );
}

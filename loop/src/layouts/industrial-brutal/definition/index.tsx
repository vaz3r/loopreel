import React from 'react';
import { Engine } from '../../../engine-utils';
import type { LayoutProps } from '../../shared/types';

export default function BrutalDefinition({ slide, scheme }: LayoutProps) {
  const s = slide as any;
  return (
    <div className="flex-1 flex flex-col justify-center min-h-0">
      <div className="pb-6 mb-6" style={{ borderBottom: `6px solid ${scheme.accent}` }}>
        <div className="text-[72px] leading-[0.9] font-black uppercase tracking-tight"
          style={{ color: scheme.text, fontFamily: `'${scheme.fontSans}', sans-serif` }}>
          {s.term}
        </div>
        {s.phonetic && (
          <div className="text-[22px] mt-2 font-mono tracking-widest"
            style={{ color: scheme.accent, fontFamily: `'${scheme.fontMono}', monospace` }}>
            {s.phonetic}
          </div>
        )}
      </div>
      <div className={`${Engine.getBodyStyle(s.definition)} leading-relaxed max-w-[85%]`}
        style={{ color: scheme.text, fontFamily: `'${scheme.fontMono}', monospace`, opacity: 0.85 }}>
        {s.definition}
      </div>
    </div>
  );
}

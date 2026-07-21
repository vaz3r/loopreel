import React from 'react';
import { Engine } from '../../../engine-utils';
import type { LayoutProps } from '../../shared/types';

export default function BrutalQuote({ slide, scheme }: LayoutProps) {
  const s = slide as any;
  return (
    <div className="flex-1 flex flex-col justify-center min-h-0">
      <div className="pl-8" style={{ borderLeft: `8px solid ${scheme.accent}` }}>
        <div className="text-[42px] leading-[1.15] font-bold italic tracking-tight max-w-[90%]"
          style={{ color: scheme.text, fontFamily: `'${scheme.fontSans}', sans-serif` }}>
          {s.quote}
        </div>
      </div>
      <div className="mt-10 flex items-center gap-4">
        <div className="h-[4px] w-[60px]" style={{ backgroundColor: scheme.accent }} />
        <div>
          <div className="text-[22px] font-black uppercase tracking-[0.15em]"
            style={{ color: scheme.text, fontFamily: `'${scheme.fontMono}', monospace` }}>
            {s.author}
          </div>
          {s.role && (
            <div className="text-[16px] font-mono mt-1 uppercase tracking-wider"
              style={{ color: scheme.text, opacity: 0.6, fontFamily: `'${scheme.fontMono}', monospace` }}>
              {s.role}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

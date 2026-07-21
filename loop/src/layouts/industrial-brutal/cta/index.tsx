import React from 'react';
import { Engine } from '../../../engine-utils';
import type { LayoutProps } from '../../shared/types';

export default function BrutalCta({ slide, scheme }: LayoutProps) {
  const s = slide as any;
  return (
    <div className="flex-1 flex flex-col justify-center min-h-0 items-start gap-8">
      <div className={`${Engine.getHeadlineStyle(s.headline, scheme.id)} uppercase leading-tight`}
        style={{ color: scheme.text, fontFamily: `'${scheme.fontSans}', sans-serif` }}>
        {s.headline}
      </div>
      {s.subtext && (
        <div className="text-[22px] leading-[1.5] font-mono max-w-[80%]"
          style={{ color: scheme.text, opacity: 0.7, fontFamily: `'${scheme.fontMono}', monospace` }}>
          {s.subtext}
        </div>
      )}
      {s.actionLabel && (
        <div className="inline-block px-10 py-5 border-2 text-[26px] font-black uppercase tracking-[0.15em]"
          style={{ borderColor: scheme.accent, color: scheme.accent, fontFamily: `'${scheme.fontSans}', sans-serif` }}>
          {s.actionLabel}
        </div>
      )}
      {s.socialHandle && (
        <div className="text-[18px] font-mono uppercase tracking-widest mt-4"
          style={{ color: scheme.text, opacity: 0.5, fontFamily: `'${scheme.fontMono}', monospace` }}>
          {s.socialHandle}
        </div>
      )}
    </div>
  );
}

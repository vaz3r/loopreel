import React from 'react';
import { Engine } from '../../../engine-utils';
import type { LayoutProps } from '../../shared/types';

export default function BrutalTimeline({ slide, scheme }: LayoutProps) {
  const s = slide as any;
  return (
    <div className="flex-1 flex flex-col justify-center min-h-0">
      <div className={`${Engine.getHeadlineStyle(s.headline, scheme.id)} uppercase mb-8`}
        style={{ color: scheme.text, fontFamily: `'${scheme.fontSans}', sans-serif` }}>
        {s.headline}
      </div>
      <div className="flex-1 flex flex-col justify-center gap-4 min-h-0 overflow-y-auto">
        {s.events.map((event: any, i: number) => (
          <div key={i} className="flex flex-col">
            <div className="flex items-center h-[52px] px-6"
              style={{ backgroundColor: scheme.accent }}>
              <span className="text-[22px] font-black uppercase tracking-widest"
                style={{ color: scheme.bg, fontFamily: `'${scheme.fontMono}', monospace` }}>
                {event.date}
              </span>
            </div>
            <div className="mt-2 pl-6"
              style={{ borderLeft: `4px solid ${scheme.accent}` }}>
              <div className="text-[26px] font-bold uppercase tracking-tight"
                style={{ color: scheme.text, fontFamily: `'${scheme.fontSans}', sans-serif` }}>
                {event.title}
              </div>
              <div className="text-[16px] mt-1 font-mono leading-snug"
                style={{ color: scheme.text, opacity: 0.7, fontFamily: `'${scheme.fontMono}', monospace` }}>
                {event.desc}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

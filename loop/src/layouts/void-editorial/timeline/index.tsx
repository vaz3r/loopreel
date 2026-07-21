import React from 'react';
import { Engine } from '../../../engine-utils';
import type { LayoutProps } from '../../shared/types';

export default function TimelineLayout({ slide, scheme }: LayoutProps) {
  const s = slide as any;
  const hCls = Engine.getHeadlineStyle(s.headline, scheme.id);

  return (
    <div className="flex-1 flex flex-col justify-center min-h-0">
      <p className="text-[13px] tracking-[0.3em] uppercase mb-3"
        style={{ fontFamily: `'${scheme.fontMono}', monospace`, color: scheme.accent }}>
        {s.tag}
      </p>
      <h1 className={hCls + " mb-8"}
        style={{ fontFamily: `'${scheme.fontSerif}', serif`, color: scheme.text }}>
        {s.headline}
      </h1>
      <div className="flex-1 overflow-y-auto space-y-5 pl-6 relative">
        <div className="absolute left-[7px] top-2 bottom-2 w-[1px]" style={{ backgroundColor: scheme.border }} />
        {(s.events || []).map((evt: any, i: number) => (
          <div key={i} className="relative pl-8">
            <div className="absolute left-[-6px] top-[6px] w-[14px] h-[14px] rounded-full border-2"
              style={{ backgroundColor: scheme.bg, borderColor: scheme.accent }} />
            <p className="text-[13px] tracking-[0.2em] uppercase mb-1"
              style={{ fontFamily: `'${scheme.fontMono}', monospace`, color: scheme.accent }}>
              {evt.date}
            </p>
            <p className="text-[22px] font-medium leading-tight mb-1"
              style={{ fontFamily: `'${scheme.fontSerif}', serif`, color: scheme.text }}>
              {evt.title}
            </p>
            <p className="text-[14px] leading-[1.5] font-light"
              style={{ fontFamily: `'${scheme.fontSans}', sans-serif`, color: scheme.text, opacity: 0.5 }}>
              {evt.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

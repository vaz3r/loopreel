import React from 'react';
import { Engine } from '../../../engine-utils';
import type { LayoutProps } from '../../shared/types';

export default function SequenceLayout({ slide, scheme }: LayoutProps) {
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
      <div className="flex-1 overflow-y-auto space-y-5">
        {(s.items || []).map((item: any, i: number) => (
          <div key={i} className="flex items-start gap-5">
            <div className="w-11 h-11 rounded-full flex items-center justify-center shrink-0 text-[16px] font-bold"
              style={{ backgroundColor: scheme.accent, color: scheme.bg, fontFamily: `'${scheme.fontSans}', sans-serif` }}>
              {item.num}
            </div>
            <div className="min-w-0">
              <p className="text-[22px] font-medium leading-tight"
                style={{ fontFamily: `'${scheme.fontSerif}', serif`, color: scheme.text }}>
                {item.title}
              </p>
              <p className="text-[15px] leading-[1.5] font-light mt-1"
                style={{ fontFamily: `'${scheme.fontSans}', sans-serif`, color: scheme.text, opacity: 0.5 }}>
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

import React from 'react';
import { Engine } from '../../../engine-utils';
import type { LayoutProps } from '../../shared/types';

export default function BrutalTelemetry({ slide, scheme }: LayoutProps) {
  const s = slide as any;
  const grid = s.stats.slice(0, 4);
  const pad = (arr: any[], n: number) => { while (arr.length < n) arr.push({ value: '', label: '' }); return arr; };
  const cells = pad([...grid], 4);
  return (
    <div className="flex-1 flex flex-col justify-center min-h-0">
      <div className={`${Engine.getHeadlineStyle(s.headline, scheme.id)} uppercase mb-8`}
        style={{ color: scheme.text, fontFamily: `'${scheme.fontSans}', sans-serif` }}>
        {s.headline}
      </div>
      <div className="flex-1 grid grid-cols-2 min-h-0 border-2"
        style={{ borderColor: scheme.border }}>
        {cells.map((stat: any, i: number) => (
          <div key={i} className="flex flex-col items-center justify-center p-6 border-2"
            style={{ borderColor: scheme.border }}>
            <div className="text-[80px] leading-[0.9] font-black tracking-tight"
              style={{ color: scheme.accent, fontFamily: `'${scheme.fontSans}', sans-serif` }}>
              {stat.value}
            </div>
            <div className="text-[18px] mt-3 font-bold uppercase tracking-[0.15em] text-center"
              style={{ color: scheme.text, fontFamily: `'${scheme.fontMono}', monospace` }}>
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

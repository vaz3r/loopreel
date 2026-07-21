import React from 'react';
import { Engine, chunkArray } from '../../../engine-utils';
import type { LayoutProps } from '../../shared/types';

export default function TelemetryLayout({ slide, scheme }: LayoutProps) {
  const s = slide as any;
  const hCls = Engine.getHeadlineStyle(s.headline, scheme.id);
  const rows = chunkArray(s.stats || [], 2);

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
      <div className="flex-1 grid grid-rows-2 gap-4">
        {rows.map((row: any[], ri: number) => (
          <div key={ri} className="grid grid-cols-2 gap-4">
            {row.map((stat: any, si: number) => (
              <div key={si} className="flex flex-col justify-center px-5 pt-4"
                style={{ borderTop: `3px solid ${scheme.accent}` }}>
                <p className="text-[72px] leading-[0.9] font-light italic"
                  style={{ fontFamily: `'${scheme.fontSerif}', serif`, color: scheme.text }}>
                  {stat.value}
                </p>
                <p className="text-[15px] tracking-[0.05em] mt-2"
                  style={{ fontFamily: `'${scheme.fontSans}', sans-serif`, color: scheme.text, opacity: 0.5 }}>
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

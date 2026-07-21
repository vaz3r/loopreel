import React from 'react';
import { Engine } from '../../../engine-utils';
import type { LayoutProps } from '../../shared/types';

export default function BrandTelemetry({ slide, scheme }: LayoutProps) {
  const s = slide as any;
  return (
    <div className="flex-1 flex flex-col justify-center min-h-0">
      <h2 className={Engine.getHeadlineStyle(s.headline, scheme.id) + ' text-center mb-8'}
        style={{ fontFamily: `'${scheme.fontSans}', sans-serif`, color: scheme.text }}>
        {s.headline}
      </h2>
      <div className="grid grid-cols-2 gap-4 px-2">
        {s.stats.map((stat: any, i: number) => (
          <div key={i} className="flex flex-col items-center justify-center p-6 rounded-xl"
            style={{ border: `1px solid ${scheme.border}`, backgroundColor: 'rgba(255,255,255,0.03)' }}>
            <span className="text-[52px] font-bold leading-none"
              style={{ fontFamily: `'${scheme.fontSans}', sans-serif`, color: scheme.accent }}>
              {stat.value}
            </span>
            <span className="text-[18px] font-light mt-2"
              style={{ fontFamily: `'${scheme.fontSans}', sans-serif`, color: scheme.text, opacity: 0.6 }}>
              {stat.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

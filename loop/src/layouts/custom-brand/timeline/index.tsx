import React from 'react';
import { Engine } from '../../../engine-utils';
import type { LayoutProps } from '../../shared/types';

export default function BrandTimeline({ slide, scheme }: LayoutProps) {
  const s = slide as any;
  return (
    <div className="flex-1 flex flex-col justify-center min-h-0">
      <h2 className={Engine.getHeadlineStyle(s.headline, scheme.id) + ' mb-6'}
        style={{ fontFamily: `'${scheme.fontSans}', sans-serif`, color: scheme.text }}>
        {s.headline}
      </h2>
      <div className="flex flex-col gap-5 overflow-y-auto">
        {s.events.map((ev: any, i: number) => (
          <div key={i} className="flex gap-5 items-start">
            <div className="flex flex-col items-center">
              <div className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: scheme.accent }} />
              {i < s.events.length - 1 && (
                <div className="w-[1px] flex-1 min-h-[24px]" style={{ backgroundColor: scheme.border }} />
              )}
            </div>
            <div className="pb-2">
              <span className="text-[14px] font-medium tracking-wide"
                style={{ fontFamily: `'${scheme.fontSans}', sans-serif`, color: scheme.accent }}>
                {ev.date}
              </span>
              <h3 className="text-[24px] font-semibold leading-tight mt-1"
                style={{ fontFamily: `'${scheme.fontSans}', sans-serif`, color: scheme.text }}>
                {ev.title}
              </h3>
              <p className="text-[18px] leading-[1.5] font-light mt-1"
                style={{ fontFamily: `'${scheme.fontSans}', sans-serif`, color: scheme.text, opacity: 0.6 }}>
                {ev.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

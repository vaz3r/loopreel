import React from 'react';
import { Engine } from '../../../engine-utils';
import type { LayoutProps } from '../../shared/types';

export default function BrandCta({ slide, scheme }: LayoutProps) {
  const s = slide as any;
  return (
    <div className="flex-1 flex flex-col justify-center min-h-0">
      <div className="flex flex-col items-center text-center px-4">
        <h2 className={Engine.getHeadlineStyle(s.headline, scheme.id)}
          style={{ fontFamily: `'${scheme.fontSans}', sans-serif`, color: scheme.text }}>
          {s.headline}
        </h2>
        {s.subtext && (
          <p className="text-[24px] leading-[1.5] font-light mt-4 max-w-[70%]"
            style={{ fontFamily: `'${scheme.fontSans}', sans-serif`, color: scheme.text, opacity: 0.6 }}>
            {s.subtext}
          </p>
        )}
        <div className="mt-8 px-8 py-3 rounded-full text-[18px] font-semibold tracking-wide"
          style={{ backgroundColor: scheme.accent, color: scheme.bg, fontFamily: `'${scheme.fontSans}', sans-serif` }}>
          {s.actionLabel}
        </div>
        {s.socialHandle && (
          <div className="mt-6">
            <span className="text-[14px] tracking-[0.15em] uppercase"
              style={{ fontFamily: `'${scheme.fontSans}', sans-serif`, color: scheme.accent, opacity: 0.6 }}>
              {s.socialHandle}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

import React from 'react';
import { Engine } from '../../../engine-utils';
import type { LayoutProps } from '../../shared/types';

export default function BrandCover({ slide, scheme }: LayoutProps) {
  const s = slide as any;
  return (
    <div className="flex-1 flex flex-col justify-center min-h-0">
      <div className="flex flex-col items-center text-center px-4">
        <h1 className={Engine.getHeadlineStyle(s.headline, scheme.id)}
          style={{ fontFamily: `'${scheme.fontSans}', sans-serif`, color: scheme.text }}>
          {s.headline}
        </h1>
        <div className="w-24 h-[2px] my-6" style={{ backgroundColor: scheme.accent, opacity: 0.8 }} />
        {s.subheadline && (
          <p className="text-[28px] leading-[1.4] font-light max-w-[80%]"
            style={{ fontFamily: `'${scheme.fontSans}', sans-serif`, color: scheme.text, opacity: 0.6 }}>
            {s.subheadline}
          </p>
        )}
        <div className="mt-12">
          <span className="text-[13px] tracking-[0.2em] uppercase"
            style={{ fontFamily: `'${scheme.fontSans}', sans-serif`, color: scheme.accent, opacity: 0.7 }}>
            {s.metadata}
          </span>
        </div>
      </div>
    </div>
  );
}

import React from 'react';
import { Engine } from '../../../engine-utils';
import type { LayoutProps } from '../../shared/types';

export default function BrandSequence({ slide, scheme }: LayoutProps) {
  const s = slide as any;
  return (
    <div className="flex-1 flex flex-col justify-center min-h-0">
      <h2 className={Engine.getHeadlineStyle(s.headline, scheme.id) + ' mb-6'}
        style={{ fontFamily: `'${scheme.fontSans}', sans-serif`, color: scheme.text }}>
        {s.headline}
      </h2>
      <div className="flex flex-col gap-4">
        {s.items.map((item: any, i: number) => (
          <div key={i} className="flex items-start gap-5">
            <span className="text-[40px] font-bold leading-none"
              style={{ fontFamily: `'${scheme.fontSans}', sans-serif`, color: scheme.accent, opacity: 0.7 }}>
              {String(item.num).padStart(2, '0')}
            </span>
            <div className="flex-1 pt-1">
              <h3 className="text-[24px] font-semibold leading-tight"
                style={{ fontFamily: `'${scheme.fontSans}', sans-serif`, color: scheme.text }}>
                {item.title}
              </h3>
              <p className="text-[18px] leading-[1.5] font-light mt-1"
                style={{ fontFamily: `'${scheme.fontSans}', sans-serif`, color: scheme.text, opacity: 0.6 }}>
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

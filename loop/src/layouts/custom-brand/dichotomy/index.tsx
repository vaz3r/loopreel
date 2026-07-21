import React from 'react';
import { Engine } from '../../../engine-utils';
import type { LayoutProps } from '../../shared/types';

export default function BrandDichotomy({ slide, scheme }: LayoutProps) {
  const s = slide as any;
  return (
    <div className="flex-1 flex flex-col justify-center min-h-0">
      <h2 className={Engine.getHeadlineStyle(s.headline, scheme.id) + ' text-center mb-8'}
        style={{ fontFamily: `'${scheme.fontSans}', sans-serif`, color: scheme.text }}>
        {s.headline}
      </h2>
      <div className="flex gap-10 px-2">
        {[s.left, s.right].map((col, i) => (
          <div key={i} className="flex-1 flex flex-col pt-4"
            style={{ borderTop: `2px solid ${scheme.accent}` }}>
            <h3 className="text-[30px] font-semibold leading-tight mb-3"
              style={{ fontFamily: `'${scheme.fontSans}', sans-serif`, color: scheme.text }}>
              {col.title}
            </h3>
            <p className="text-[22px] leading-[1.5] font-light"
              style={{ fontFamily: `'${scheme.fontSans}', sans-serif`, color: scheme.text, opacity: 0.6 }}>
              {col.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

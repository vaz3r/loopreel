import React from 'react';
import { Engine } from '../../../engine-utils';
import type { LayoutProps } from '../../shared/types';

export default function BrandImageSplit({ slide, scheme }: LayoutProps) {
  const s = slide as any;
  return (
    <div className="flex-1 flex flex-col justify-center min-h-0">
      <div className="flex gap-0 h-full items-stretch">
        <div className="flex-1 flex flex-col justify-center pr-8 relative">
          <div className="absolute left-0 top-4 bottom-4 w-[3px] rounded-full" style={{ backgroundColor: scheme.accent }} />
          <div className="pl-6">
            <h2 className={Engine.getHeadlineStyle(s.headline, scheme.id)}
              style={{ fontFamily: `'${scheme.fontSans}', sans-serif`, color: scheme.text }}>
              {s.headline}
            </h2>
            <p className={Engine.getBodyStyle(s.bodyText) + ' mt-4'}
              style={{ fontFamily: `'${scheme.fontSans}', sans-serif`, color: scheme.text, opacity: 0.7 }}>
              {s.bodyText}
            </p>
          </div>
        </div>
        <div className="w-1/2 rounded-xl overflow-hidden"
          style={{ border: `1px solid ${scheme.border}` }}>
          <img src={s.imageUrl} alt="" className="w-full h-full object-cover" />
        </div>
      </div>
    </div>
  );
}

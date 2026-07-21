import React from 'react';
import { Engine } from '../../../engine-utils';
import type { LayoutProps } from '../../shared/types';

export default function BrandImageCover({ slide, scheme }: LayoutProps) {
  const s = slide as any;
  return (
    <div className="flex-1 flex flex-col justify-center min-h-0 relative rounded-xl overflow-hidden"
      style={{ border: `1px solid ${scheme.border}` }}>
      <img src={s.imageUrl} alt="" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0" style={{
        background: `linear-gradient(135deg, ${scheme.bg} 0%, transparent 60%, ${scheme.bg} 100%)`,
        opacity: 0.85
      }} />
      <div className="relative z-10 flex flex-col items-center text-center px-10">
        <h2 className={Engine.getHeadlineStyle(s.headline, scheme.id)}
          style={{ fontFamily: `'${scheme.fontSans}', sans-serif`, color: scheme.text }}>
          {s.headline}
        </h2>
        {s.subtext && (
          <p className="text-[24px] leading-[1.5] font-light mt-4 max-w-[75%]"
            style={{ fontFamily: `'${scheme.fontSans}', sans-serif`, color: scheme.text, opacity: 0.7 }}>
            {s.subtext}
          </p>
        )}
      </div>
    </div>
  );
}

import React from 'react';
import { Engine } from '../../../engine-utils';
import type { LayoutProps } from '../../shared/types';

export default function BrutalImageSplit({ slide, scheme }: LayoutProps) {
  const s = slide as any;
  return (
    <div className="flex-1 flex flex-row min-h-0">
      <div className="relative w-1/2 h-full overflow-hidden flex items-center justify-center border-r-[6px]"
        style={{ borderColor: scheme.accent }}>
        <div className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${s.imageUrl})`, filter: 'grayscale(1)' }} />
        <div className="absolute inset-0" style={{ backgroundColor: scheme.bg, opacity: 0.2 }} />
      </div>
      <div className="w-1/2 h-full flex flex-col justify-center pl-10">
        <div className={`${Engine.getHeadlineStyle(s.headline, scheme.id)} uppercase leading-tight`}
          style={{ color: scheme.text, fontFamily: `'${scheme.fontSans}', sans-serif` }}>
          {s.headline}
        </div>
        <div className="mt-6 pl-4"
          style={{ borderLeft: `4px solid ${scheme.accent}` }}>
          <div className="text-[22px] leading-[1.5] font-mono"
            style={{ color: scheme.text, opacity: 0.8, fontFamily: `'${scheme.fontMono}', monospace` }}>
            {s.bodyText}
          </div>
        </div>
      </div>
    </div>
  );
}

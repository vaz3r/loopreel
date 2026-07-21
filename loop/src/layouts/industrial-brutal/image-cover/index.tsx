import React from 'react';
import { Engine } from '../../../engine-utils';
import type { LayoutProps } from '../../shared/types';

export default function BrutalImageCover({ slide, scheme }: LayoutProps) {
  const s = slide as any;
  return (
    <div className="flex-1 flex flex-col justify-end min-h-0 relative overflow-hidden">
      <div className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${s.imageUrl})`, filter: 'grayscale(1) contrast(1.2)' }} />
      <div className="absolute inset-0"
        style={{ background: `linear-gradient(to top, ${scheme.bg} 0%, rgba(26,26,26,0.4) 50%, rgba(26,26,26,0.8) 100%)` }} />
      <div className="relative z-10 pb-8">
        <div className="w-[100px] h-[8px] mb-6" style={{ backgroundColor: scheme.accent }} />
        <div className={`${Engine.getHeadlineStyle(s.headline, scheme.id)} uppercase leading-tight max-w-[85%]`}
          style={{ color: scheme.text, fontFamily: `'${scheme.fontSans}', sans-serif` }}>
          {s.headline}
        </div>
        <div className="text-[24px] mt-4 font-mono uppercase tracking-widest max-w-[75%] leading-snug"
          style={{ color: scheme.text, opacity: 0.7, fontFamily: `'${scheme.fontMono}', monospace` }}>
          {s.subtext}
        </div>
      </div>
    </div>
  );
}

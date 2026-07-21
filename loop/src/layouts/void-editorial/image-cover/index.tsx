import React from 'react';
import { Engine } from '../../../engine-utils';
import type { LayoutProps } from '../../shared/types';

export default function ImageCoverLayout({ slide, scheme }: LayoutProps) {
  const s = slide as any;
  const hCls = Engine.getHeadlineStyle(s.headline, scheme.id);

  return (
    <div className="flex-1 flex flex-col justify-center min-h-0">
      <div className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${s.imageUrl})` }} />
      <div className="absolute inset-0"
        style={{ background: `linear-gradient(to bottom, transparent 30%, ${scheme.bg} 100%)` }} />
      <div className="relative z-10 flex flex-col items-center text-center px-10 mt-auto mb-16">
        <p className="text-[13px] tracking-[0.3em] uppercase mb-4"
          style={{ fontFamily: `'${scheme.fontMono}', monospace`, color: scheme.accent }}>
          {s.tag}
        </p>
        <h1 className={hCls}
          style={{ fontFamily: `'${scheme.fontSerif}', serif`, color: scheme.text }}>
          {s.headline}
        </h1>
        {s.subtext && (
          <p className="text-[20px] leading-[1.5] font-light mt-4 max-w-[70%]"
            style={{ fontFamily: `'${scheme.fontSans}', sans-serif`, color: scheme.text, opacity: 0.55 }}>
            {s.subtext}
          </p>
        )}
      </div>
    </div>
  );
}

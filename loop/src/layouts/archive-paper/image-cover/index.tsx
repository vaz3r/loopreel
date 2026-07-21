import React from 'react';
import { Engine } from '../../../engine-utils';
import type { Slide } from '../../../../schema';
import type { LayoutProps } from '../../shared/types';

export default function ArchivePaperImageCover({ slide, scheme }: LayoutProps) {
  const s = slide as any;
  return (
    <div className="flex-1 flex flex-col justify-center min-h-0">
      <div className="relative flex-1 flex items-center justify-center overflow-hidden">
        <img src={s.imageUrl} alt=""
          className="absolute inset-0 w-full h-full object-cover"
          style={{ filter: 'sepia(0.3) contrast(0.9)', mixBlendMode: 'multiply' }} />
        <div className="absolute inset-0"
          style={{ background: `linear-gradient(to top, ${scheme.bg}dd, ${scheme.bg}88 40%, ${scheme.bg}55 100%)` }} />
        <div className="relative z-10 text-center px-12 py-16 max-w-[80%]">
          {s.headline && (
            <h1 className={Engine.getHeadlineStyle(s.headline, scheme.id)}
              style={{ fontFamily: `'${scheme.fontSerif}', serif`, color: scheme.text }}>
              {s.headline}
            </h1>
          )}
          {s.subtext && (
            <p className="text-[22px] leading-[1.5] font-light italic mt-6"
              style={{ fontFamily: `'${scheme.fontSerif}', serif`, color: scheme.text, opacity: 0.75 }}>
              {s.subtext}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

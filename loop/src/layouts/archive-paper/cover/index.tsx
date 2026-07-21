import React from 'react';
import { Engine } from '../../../engine-utils';
import type { Slide } from '../../../../schema';
import type { LayoutProps } from '../../shared/types';

export default function ArchivePaperCover({ slide, scheme }: LayoutProps) {
  const s = slide as any;
  return (
    <div className="flex-1 flex flex-col justify-center min-h-0">
      <div className="flex flex-col items-center text-center px-8">
        <div className="w-16 h-[1px] mb-10" style={{ backgroundColor: scheme.accent }} />
        <div className="w-16 h-[1px] mb-12" style={{ backgroundColor: scheme.accent, opacity: 0.4 }} />
        <h1 className={Engine.getHeadlineStyle(s.headline, scheme.id)}
          style={{ fontFamily: `'${scheme.fontSerif}', serif`, color: scheme.text }}>
          {s.headline}
        </h1>
        {s.subheadline && (
          <p className="text-[28px] leading-[1.4] font-light mt-6 max-w-[80%]"
            style={{ fontFamily: `'${scheme.fontSerif}', serif`, color: scheme.text, opacity: 0.65 }}>
            {s.subheadline}
          </p>
        )}
        <div className="mt-auto pt-16">
          <div className="w-12 h-[1px] mx-auto mb-4" style={{ backgroundColor: scheme.border }} />
          <span className="text-[13px] tracking-[0.25em] uppercase"
            style={{ fontFamily: `'${scheme.fontSans}', sans-serif`, color: scheme.text, opacity: 0.5 }}>
            {s.metadata}
          </span>
        </div>
      </div>
    </div>
  );
}

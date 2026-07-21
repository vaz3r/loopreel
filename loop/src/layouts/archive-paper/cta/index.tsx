import React from 'react';
import { Engine } from '../../../engine-utils';
import type { Slide } from '../../../../schema';
import type { LayoutProps } from '../../shared/types';

export default function ArchivePaperCta({ slide, scheme }: LayoutProps) {
  const s = slide as any;
  return (
    <div className="flex-1 flex flex-col justify-center min-h-0">
      <div className="px-8 flex flex-col items-center text-center">
        {s.headline && (
          <h2 className={Engine.getHeadlineStyle(s.headline, scheme.id)}
            style={{ fontFamily: `'${scheme.fontSerif}', serif`, color: scheme.text }}>
            {s.headline}
          </h2>
        )}
        {s.subtext && (
          <p className="text-[22px] leading-[1.5] font-light mt-4 max-w-[75%]"
            style={{ fontFamily: `'${scheme.fontSerif}', serif`, color: scheme.text, opacity: 0.65 }}>
            {s.subtext}
          </p>
        )}
        {s.actionLabel && (
          <div className="mt-10 inline-block px-10 py-4 border"
            style={{ borderColor: scheme.accent, borderWidth: '1.5px' }}>
            <span className="text-[18px] font-semibold tracking-[0.15em] uppercase"
              style={{ fontFamily: `'${scheme.fontSerif}', serif`, color: scheme.accent }}>
              {s.actionLabel}
            </span>
          </div>
        )}
        {s.socialHandle && (
          <div className="mt-auto pt-12">
            <div className="w-8 h-[1px] mx-auto mb-3" style={{ backgroundColor: scheme.border }} />
            <span className="text-[14px] tracking-[0.2em] uppercase"
              style={{ fontFamily: `'${scheme.fontSerif}', serif`, color: scheme.text, opacity: 0.4 }}>
              {s.socialHandle}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

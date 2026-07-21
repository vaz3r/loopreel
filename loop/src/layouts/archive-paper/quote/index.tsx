import React from 'react';
import { Engine } from '../../../engine-utils';
import type { Slide } from '../../../../schema';
import type { LayoutProps } from '../../shared/types';

export default function ArchivePaperQuote({ slide, scheme }: LayoutProps) {
  const s = slide as any;
  return (
    <div className="flex-1 flex flex-col justify-center min-h-0">
      <div className="px-8 flex flex-col">
        <div className="text-[120px] leading-[0.6] font-serif mb-4"
          style={{ fontFamily: `'${scheme.fontSerif}', serif`, color: scheme.accent, opacity: 0.3 }}>
          “
        </div>
        <div className="pl-8 border-l-[2px] ml-2"
          style={{ borderColor: scheme.accent }}>
          <p className={Engine.getBodyStyle(s.quote)}
            style={{ fontFamily: `'${scheme.fontSerif}', serif`, color: scheme.text, fontStyle: 'italic' }}>
            {s.quote}
          </p>
        </div>
        <div className="flex items-center gap-4 mt-8 self-end">
          <div className="h-[1px] w-12" style={{ backgroundColor: scheme.border }} />
          <div className="text-right">
            <span className="text-[18px] font-semibold"
              style={{ fontFamily: `'${scheme.fontSerif}', serif`, color: scheme.text }}>
              {s.author}
            </span>
            {s.role && (
              <span className="text-[12px] tracking-[0.2em] uppercase block mt-1"
                style={{ fontFamily: `'${scheme.fontSans}', sans-serif`, color: scheme.text, opacity: 0.5 }}>
                {s.role}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

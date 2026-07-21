import React from 'react';
import { Engine } from '../../../engine-utils';
import type { LayoutProps } from '../../shared/types';

export default function BrandQuote({ slide, scheme }: LayoutProps) {
  const s = slide as any;
  return (
    <div className="flex-1 flex flex-col justify-center min-h-0">
      <div className="flex gap-5 px-2">
        <div className="w-[3px] shrink-0 rounded-full" style={{ backgroundColor: scheme.accent }} />
        <div className="flex flex-col">
          <span className="text-[64px] leading-[0.8] font-serif" style={{ color: scheme.accent, opacity: 0.35 }}>
            &ldquo;
          </span>
          <blockquote className="text-[30px] leading-[1.4] font-normal -mt-4"
            style={{ fontFamily: `'${scheme.fontSans}', sans-serif`, color: scheme.text }}>
            {s.quote}
          </blockquote>
          <div className="mt-6 flex items-center gap-3">
            <span className="text-[20px] font-semibold"
              style={{ fontFamily: `'${scheme.fontSans}', sans-serif`, color: scheme.text }}>
              {s.author}
            </span>
            {s.role && (
              <span className="text-[16px] font-light"
                style={{ fontFamily: `'${scheme.fontSans}', sans-serif`, color: scheme.text, opacity: 0.5 }}>
                &mdash; {s.role}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

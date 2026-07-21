import React from 'react';
import { Engine } from '../../../engine-utils';
import type { LayoutProps } from '../../shared/types';

export default function BrandDefinition({ slide, scheme }: LayoutProps) {
  const s = slide as any;
  return (
    <div className="flex-1 flex flex-col justify-center min-h-0">
      <div className="flex flex-col px-2">
        <span className="text-[14px] tracking-[0.2em] uppercase mb-4"
          style={{ fontFamily: `'${scheme.fontSans}', sans-serif`, color: scheme.accent }}>
          {s.phonetic}
        </span>
        <h2 className="text-[56px] leading-[1.05] font-bold tracking-tight"
          style={{ fontFamily: `'${scheme.fontSans}', sans-serif`, color: scheme.text }}>
          {s.term}
        </h2>
        <div className="w-16 h-[2px] mt-5 mb-6" style={{ backgroundColor: scheme.accent }} />
        <p className="text-[28px] leading-[1.4] font-light max-w-[85%]"
          style={{ fontFamily: `'${scheme.fontSans}', sans-serif`, color: scheme.text, opacity: 0.8 }}>
          {s.definition}
        </p>
        {s.example && (
          <p className="text-[20px] leading-[1.5] mt-6 max-w-[75%]"
            style={{ fontFamily: `'${scheme.fontSans}', sans-serif`, color: scheme.accent, opacity: 0.6, fontStyle: 'italic' }}>
            "{s.example}"
          </p>
        )}
      </div>
    </div>
  );
}

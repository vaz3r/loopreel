import React from 'react';
import { Engine } from '../../../engine-utils';
import type { LayoutProps } from '../../shared/types';

export default function DefinitionLayout({ slide, scheme }: LayoutProps) {
  const s = slide as any;

  return (
    <div className="flex-1 flex flex-col justify-center min-h-0">
      <p className="text-[13px] tracking-[0.3em] uppercase mb-6"
        style={{ fontFamily: `'${scheme.fontMono}', monospace`, color: scheme.accent }}>
        {s.tag}
      </p>
      <h1 className="text-[88px] leading-[0.92] font-light italic"
        style={{ fontFamily: `'${scheme.fontSerif}', serif`, color: scheme.text }}>
        {s.term}
      </h1>
      <p className="text-[20px] tracking-[0.15em] mt-2 mb-10"
        style={{ fontFamily: `'${scheme.fontMono}', monospace`, color: scheme.accent, opacity: 0.8 }}>
        {s.phonetic}
      </p>
      <div className="pl-8 border-l-[3px] mb-6"
        style={{ borderColor: scheme.accent }}>
        <p className="text-[28px] leading-[1.4] font-light"
          style={{ fontFamily: `'${scheme.fontSerif}', serif`, color: scheme.text }}>
          {s.definition}
        </p>
      </div>
      {s.example && (
        <p className="text-[18px] leading-[1.5] italic"
          style={{ fontFamily: `'${scheme.fontSans}', sans-serif`, color: scheme.text, opacity: 0.5 }}>
          &ldquo;{s.example}&rdquo;
        </p>
      )}
    </div>
  );
}

import React from 'react';
import type { LayoutProps } from '../../shared/types';

export default function QuoteLayout({ slide, scheme }: LayoutProps) {
  const s = slide as any;

  return (
    <div className="flex-1 flex flex-col justify-center min-h-0">
      <p className="text-[72px] leading-[0.6] font-serif mb-2"
        style={{ color: scheme.accent, fontFamily: `'${scheme.fontSerif}', serif` }}>
        &ldquo;
      </p>
      <p className="text-[54px] leading-[1.15] font-light italic"
        style={{ fontFamily: `'${scheme.fontSerif}', serif`, color: scheme.text }}>
        {s.quote}
      </p>
      <div className="w-16 h-[2px] my-8" style={{ backgroundColor: scheme.accent }} />
      <p className="text-[22px] font-semibold text-right"
        style={{ fontFamily: `'${scheme.fontSerif}', serif`, color: scheme.text }}>
        {s.author}
      </p>
      <p className="text-[15px] text-right tracking-[0.1em]"
        style={{ fontFamily: `'${scheme.fontSans}', sans-serif`, color: scheme.text, opacity: 0.5 }}>
        {s.role}
      </p>
    </div>
  );
}

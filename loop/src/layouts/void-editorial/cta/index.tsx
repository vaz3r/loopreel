import React from 'react';
import { Engine } from '../../../engine-utils';
import type { LayoutProps } from '../../shared/types';

export default function CtaLayout({ slide, scheme }: LayoutProps) {
  const s = slide as any;
  const hCls = Engine.getHeadlineStyle(s.headline, scheme.id);
  const subCls = Engine.getBodyStyle(s.subtext || '');

  return (
    <div className="flex-1 flex flex-col justify-center min-h-0 items-center text-center">
      <p className="text-[13px] tracking-[0.3em] uppercase mb-6"
        style={{ fontFamily: `'${scheme.fontMono}', monospace`, color: scheme.accent }}>
        {s.tag}
      </p>
      <h1 className={hCls}
        style={{ fontFamily: `'${scheme.fontSerif}', serif`, color: scheme.text }}>
        {s.headline}
      </h1>
      {s.subtext && (
        <p className={subCls + " mt-5 max-w-[65%]"}
          style={{ fontFamily: `'${scheme.fontSans}', sans-serif`, color: scheme.text, opacity: 0.55 }}>
          {s.subtext}
        </p>
      )}
      <div className="mt-10 px-10 py-4 text-[17px] tracking-[0.25em] uppercase font-semibold"
        style={{ backgroundColor: scheme.accent, color: scheme.bg, fontFamily: `'${scheme.fontSans}', sans-serif` }}>
        {s.actionLabel}
      </div>
      <p className="mt-8 text-[14px] tracking-[0.15em]"
        style={{ fontFamily: `'${scheme.fontMono}', monospace`, color: scheme.accent }}>
        {s.socialHandle}
      </p>
    </div>
  );
}

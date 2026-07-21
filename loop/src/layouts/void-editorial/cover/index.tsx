import React from 'react';
import { Engine } from '../../../engine-utils';
import type { LayoutProps } from '../../shared/types';

export default function CoverLayout({ slide, scheme }: LayoutProps) {
  const s = slide as any;
  const headlineCls = Engine.getHeadlineStyle(s.headline, scheme.id);
  const subCls = Engine.getBodyStyle(s.subheadline || '');

  return (
    <div className="flex-1 flex flex-col justify-center min-h-0 items-center text-center">
      <div className="h-16 w-[1px]" style={{ backgroundColor: scheme.accent }} />
      <p className="text-[14px] tracking-[0.35em] uppercase mt-6 mb-10"
        style={{ fontFamily: `'${scheme.fontMono}', monospace`, color: scheme.accent }}>
        {s.tag}
      </p>
      <h1 className={headlineCls} style={{ fontFamily: `'${scheme.fontSerif}', serif`, color: scheme.text }}>
        {s.headline}
      </h1>
      {s.subheadline && (
        <p className={subCls + " mt-8 max-w-[80%]"} style={{ fontFamily: `'${scheme.fontSerif}', serif`, color: scheme.text, opacity: 0.6 }}>
          {s.subheadline}
        </p>
      )}
      <div className="mt-auto mb-4 text-[13px] tracking-[0.25em] uppercase"
        style={{ fontFamily: `'${scheme.fontMono}', monospace`, color: scheme.accent }}>
        {s.metadata}
      </div>
    </div>
  );
}

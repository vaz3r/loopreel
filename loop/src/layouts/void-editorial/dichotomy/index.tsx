import React from 'react';
import { Engine } from '../../../engine-utils';
import type { LayoutProps } from '../../shared/types';

export default function DichotomyLayout({ slide, scheme }: LayoutProps) {
  const s = slide as any;
  const hCls = Engine.getHeadlineStyle(s.headline, scheme.id);

  return (
    <div className="flex-1 flex flex-col justify-center min-h-0">
      <p className="text-[13px] tracking-[0.3em] uppercase mb-4"
        style={{ fontFamily: `'${scheme.fontMono}', monospace`, color: scheme.accent }}>
        {s.tag}
      </p>
      <h1 className={hCls + " text-center mb-12"}
        style={{ fontFamily: `'${scheme.fontSerif}', serif`, color: scheme.text }}>
        {s.headline}
      </h1>
      <div className="flex gap-0 flex-1 min-h-0">
        {[s.left, s.right].map((col: any, i: number) => (
          <div key={i} className="flex-1 flex flex-col justify-center px-6 relative">
            {i === 0 && (
              <div className="absolute inset-y-[10%] left-0 w-[4px]" style={{ backgroundColor: scheme.accent }} />
            )}
            <h2 className="text-[36px] font-light italic mb-4"
              style={{ fontFamily: `'${scheme.fontSerif}', serif`, color: scheme.text }}>
              {col.title}
            </h2>
            <p className="text-[16px] leading-[1.6] font-light"
              style={{ fontFamily: `'${scheme.fontSans}', sans-serif`, color: scheme.text, opacity: 0.55 }}>
              {col.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

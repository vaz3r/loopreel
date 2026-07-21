import React from 'react';
import { Engine } from '../../../engine-utils';
import type { LayoutProps } from '../../shared/types';

export default function ImageSplitLayout({ slide, scheme }: LayoutProps) {
  const s = slide as any;
  const hCls = Engine.getHeadlineStyle(s.headline, scheme.id);
  const bodyCls = Engine.getBodyStyle(s.bodyText || '');

  return (
    <div className="flex-1 flex flex-col justify-center min-h-0">
      <div className="flex flex-1 min-h-0 -mx-[120px]" style={{ width: 'calc(100% + 240px)' }}>
        <div className="w-1/2 bg-cover bg-center" style={{ backgroundImage: `url(${s.imageUrl})` }} />
        <div className="w-1/2 flex flex-col justify-center px-10 pl-8 border-l-[3px]"
          style={{ borderColor: scheme.accent }}>
          <p className="text-[13px] tracking-[0.3em] uppercase mb-3"
            style={{ fontFamily: `'${scheme.fontMono}', monospace`, color: scheme.accent }}>
            {s.tag}
          </p>
          <h1 className={hCls}
            style={{ fontFamily: `'${scheme.fontSerif}', serif`, color: scheme.text }}>
            {s.headline}
          </h1>
          {s.bodyText && (
            <p className={bodyCls + " mt-4"}
              style={{ fontFamily: `'${scheme.fontSans}', sans-serif`, color: scheme.text, opacity: 0.55 }}>
              {s.bodyText}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

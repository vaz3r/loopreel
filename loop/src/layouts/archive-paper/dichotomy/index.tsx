import React from 'react';
import { Engine } from '../../../engine-utils';
import type { Slide } from '../../../../schema';
import type { LayoutProps } from '../../shared/types';

export default function ArchivePaperDichotomy({ slide, scheme }: LayoutProps) {
  const s = slide as any;
  return (
    <div className="flex-1 flex flex-col justify-center min-h-0">
      <div className="px-8">
        {s.headline && (
          <h2 className={Engine.getHeadlineStyle(s.headline, scheme.id)}
            style={{ fontFamily: `'${scheme.fontSerif}', serif`, color: scheme.text, textAlign: 'center' }}>
            {s.headline}
          </h2>
        )}
        <div className="flex gap-0 mt-8 flex-1 min-h-0">
          <div className="flex-1 pr-10 text-right">
            <h3 className="text-[32px] leading-[1.2] font-semibold mb-4"
              style={{ fontFamily: `'${scheme.fontSerif}', serif`, color: scheme.accent }}>
              {s.left.title}
            </h3>
            <p className={Engine.getBodyStyle(s.left.desc)}
              style={{ fontFamily: `'${scheme.fontSerif}', serif`, color: scheme.text, textAlign: 'right' }}>
              {s.left.desc}
            </p>
          </div>
          <div className="w-[1px] mx-8 shrink-0" style={{ backgroundColor: scheme.border }} />
          <div className="flex-1 pl-10">
            <h3 className="text-[32px] leading-[1.2] font-semibold mb-4"
              style={{ fontFamily: `'${scheme.fontSerif}', serif`, color: scheme.accent }}>
              {s.right.title}
            </h3>
            <p className={Engine.getBodyStyle(s.right.desc)}
              style={{ fontFamily: `'${scheme.fontSerif}', serif`, color: scheme.text, textAlign: 'justify' }}>
              {s.right.desc}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

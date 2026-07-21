import React from 'react';
import { Engine } from '../../../engine-utils';
import type { Slide } from '../../../../schema';
import type { LayoutProps } from '../../shared/types';

export default function ArchivePaperImageSplit({ slide, scheme }: LayoutProps) {
  const s = slide as any;
  return (
    <div className="flex-1 flex flex-col justify-center min-h-0">
      <div className="flex flex-1 min-h-0">
        <div className="flex-1 flex flex-col justify-center px-8 py-8">
          <h2 className={Engine.getHeadlineStyle(s.headline, scheme.id)}
            style={{ fontFamily: `'${scheme.fontSerif}', serif`, color: scheme.text }}>
            {s.headline}
          </h2>
          {s.bodyText && (
            <p className={Engine.getBodyStyle(s.bodyText)}
              style={{ fontFamily: `'${scheme.fontSerif}', serif`, color: scheme.text, textAlign: 'justify' }}>
              {s.bodyText}
            </p>
          )}
        </div>
        <div className="w-[1px] shrink-0" style={{ backgroundColor: scheme.border }} />
        <div className="w-1/2 shrink-0 relative">
          <div className="absolute inset-0"
            style={{ background: `linear-gradient(135deg, transparent 60%, ${scheme.bg} 100%)` }} />
          <img src={s.imageUrl} alt=""
            className="w-full h-full object-cover"
            style={{ mixBlendMode: 'multiply', opacity: 0.85 }} />
        </div>
      </div>
    </div>
  );
}

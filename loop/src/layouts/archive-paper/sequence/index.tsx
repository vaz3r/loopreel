import React from 'react';
import { Engine } from '../../../engine-utils';
import type { Slide } from '../../../../schema';
import type { LayoutProps } from '../../shared/types';

const ROMAN = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII'];

export default function ArchivePaperSequence({ slide, scheme }: LayoutProps) {
  const s = slide as any;
  const items = s.items || [];
  return (
    <div className="flex-1 flex flex-col justify-center min-h-0">
      <div className="px-8">
        {s.headline && (
          <h2 className={Engine.getHeadlineStyle(s.headline, scheme.id)}
            style={{ fontFamily: `'${scheme.fontSerif}', serif`, color: scheme.text, textAlign: 'center' }}>
            {s.headline}
          </h2>
        )}
        <div className="mt-8 space-y-0">
          {items.slice(0, 6).map((item: any, i: number) => (
            <React.Fragment key={i}>
              {i > 0 && <div className="h-[1px] my-5" style={{ backgroundColor: scheme.border, opacity: 0.4 }} />}
              <div className="flex gap-6 items-start">
                <span className="text-[28px] font-bold leading-none shrink-0 w-12 pt-1"
                  style={{ fontFamily: `'${scheme.fontSerif}', serif`, color: scheme.accent }}>
                  {ROMAN[i] || item.num}
                </span>
                <div className="flex-1 min-w-0">
                  <h3 className="text-[24px] leading-[1.3] font-semibold mb-1"
                    style={{ fontFamily: `'${scheme.fontSerif}', serif`, color: scheme.text }}>
                    {item.title}
                  </h3>
                  {item.desc && (
                    <p className="text-[16px] leading-[1.5]"
                      style={{ fontFamily: `'${scheme.fontSerif}', serif`, color: scheme.text, opacity: 0.7, textAlign: 'justify' }}>
                      {item.desc}
                    </p>
                  )}
                </div>
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}

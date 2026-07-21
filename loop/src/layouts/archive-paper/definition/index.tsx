import React from 'react';
import { Engine } from '../../../engine-utils';
import type { Slide } from '../../../../schema';
import type { LayoutProps } from '../../shared/types';

export default function ArchivePaperDefinition({ slide, scheme }: LayoutProps) {
  const s = slide as any;
  return (
    <div className="flex-1 flex flex-col justify-center min-h-0">
      <div className="px-8">
        <div className="flex items-baseline gap-4 mb-2">
          <h2 className="text-[56px] leading-[1.1] font-semibold"
            style={{ fontFamily: `'${scheme.fontSerif}', serif`, color: scheme.text }}>
            {s.term}
          </h2>
          {s.phonetic && (
            <span className="text-[24px] italic"
              style={{ fontFamily: `'${scheme.fontSerif}', serif`, color: scheme.text, opacity: 0.5 }}>
              {s.phonetic}
            </span>
          )}
        </div>
        <div className="w-24 h-[1px] mb-8" style={{ backgroundColor: scheme.accent }} />
        <p className={Engine.getBodyStyle(s.definition)}
          style={{ fontFamily: `'${scheme.fontSerif}', serif`, color: scheme.text, textAlign: 'justify' }}>
          {s.definition}
        </p>
        {s.example && (
          <p className="text-[22px] leading-[1.5] italic mt-6 pl-6"
            style={{ fontFamily: `'${scheme.fontSerif}', serif`, color: scheme.text, opacity: 0.6, borderLeft: `2px solid ${scheme.border}` }}>
            “{s.example}”
          </p>
        )}
      </div>
    </div>
  );
}

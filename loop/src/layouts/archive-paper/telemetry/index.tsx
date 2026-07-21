import React from 'react';
import { Engine } from '../../../engine-utils';
import type { Slide } from '../../../../schema';
import type { LayoutProps } from '../../shared/types';

export default function ArchivePaperTelemetry({ slide, scheme }: LayoutProps) {
  const s = slide as any;
  const stats = s.stats || [];
  return (
    <div className="flex-1 flex flex-col justify-center min-h-0">
      <div className="px-8">
        {s.headline && (
          <h2 className={Engine.getHeadlineStyle(s.headline, scheme.id)}
            style={{ fontFamily: `'${scheme.fontSerif}', serif`, color: scheme.text, textAlign: 'center' }}>
            {s.headline}
          </h2>
        )}
        <div className="grid grid-cols-4 gap-0 mt-10">
          {stats.slice(0, 4).map((stat: any, i: number) => (
            <React.Fragment key={i}>
              {i > 0 && <div className="w-[1px] mx-4" style={{ backgroundColor: scheme.border }} />}
              <div className="flex flex-col items-center text-center py-6 flex-1">
                <span className="text-[56px] leading-[1] font-semibold mb-3"
                  style={{ fontFamily: `'${scheme.fontSerif}', serif`, color: scheme.accent }}>
                  {stat.value}
                </span>
                <span className="text-[13px] tracking-[0.2em] uppercase"
                  style={{ fontFamily: `'${scheme.fontSans}', sans-serif`, color: scheme.text, opacity: 0.6 }}>
                  {stat.label}
                </span>
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}

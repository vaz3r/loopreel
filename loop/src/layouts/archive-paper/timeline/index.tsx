import React from 'react';
import { Engine } from '../../../engine-utils';
import type { Slide } from '../../../../schema';
import type { LayoutProps } from '../../shared/types';

export default function ArchivePaperTimeline({ slide, scheme }: LayoutProps) {
  const s = slide as any;
  const events = s.events || [];
  return (
    <div className="flex-1 flex flex-col justify-center min-h-0">
      <div className="px-8">
        {s.headline && (
          <h2 className={Engine.getHeadlineStyle(s.headline, scheme.id)}
            style={{ fontFamily: `'${scheme.fontSerif}', serif`, color: scheme.text, textAlign: 'center' }}>
            {s.headline}
          </h2>
        )}
        <div className="relative mt-10 pt-6">
          <div className="absolute top-0 left-8 right-8 h-[1px]" style={{ backgroundColor: scheme.border }} />
          <div className="flex gap-4 justify-between items-start">
            {events.slice(0, 5).map((event: any, i: number) => (
              <div key={i} className="flex-1 text-center relative pt-4">
                <div className="absolute top-[-5px] left-1/2 -translate-x-1/2 w-[9px] h-[9px] rounded-full"
                  style={{ backgroundColor: scheme.bg, border: `1.5px solid ${scheme.accent}` }} />
                <div className="text-[14px] font-semibold tracking-[0.1em] uppercase mb-2"
                  style={{ fontFamily: `'${scheme.fontSans}', sans-serif`, color: scheme.accent }}>
                  {event.date}
                </div>
                <div className="text-[18px] leading-[1.3] font-semibold mb-1"
                  style={{ fontFamily: `'${scheme.fontSerif}', serif`, color: scheme.text }}>
                  {event.title}
                </div>
                {event.desc && (
                  <div className="text-[13px] leading-[1.4] px-1"
                    style={{ fontFamily: `'${scheme.fontSerif}', serif`, color: scheme.text, opacity: 0.6 }}>
                    {event.desc}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

import React from 'react';
import { AutoFit } from '../shared/AutoFit';

export interface CoverSlideProps {
  slide: {
    id: string;
    kicker?: string;
    headline: string;
    subheadline?: string;
    author?: string;
    handle?: string;
    date?: string;
    tags?: string[];
  };
}

export function CoverSlide({ slide }: CoverSlideProps) {
  const kicker = slide.kicker || (slide.tags && slide.tags[0]) || 'SPECIAL BRIEFING';

  return (
    <div className="w-full h-full flex flex-col justify-between p-[8%] relative z-10">
      {/* Header Bar */}
      <div className="flex items-center justify-between pb-6 border-b border-cham-border">
        <span
          className="px-3.5 py-1.5 rounded-cham font-mono text-[calc(13px*var(--loop-k))] tracking-wider uppercase font-semibold bg-cham-tag-bg text-cham-tag-text border border-cham-border"
        >
          {kicker}
        </span>
        {slide.date && (
          <span className="font-mono text-[calc(13px*var(--loop-k))] text-cham-muted tracking-tight">
            {slide.date}
          </span>
        )}
      </div>

      {/* Main Content with AutoFit Shield */}
      <div className="flex-1 flex flex-col justify-center py-8">
        <AutoFit verticalAlign="center" paddingBuffer={32}>
          <div className="space-y-6">
            <h1
              className="text-[calc(68px*var(--loop-k))] leading-[1.04] font-headline text-cham-text break-words"
              style={{
                fontWeight: 'var(--cham-headline-weight)' as any,
                fontStyle: 'var(--cham-headline-style)' as any,
                textTransform: 'var(--cham-headline-transform)' as any,
                letterSpacing: 'var(--cham-letter-spacing)',
              }}
            >
              {slide.headline}
            </h1>

            {slide.subheadline && (
              <p className="text-[calc(26px*var(--loop-k))] leading-[1.4] font-body text-cham-muted max-w-2xl break-words">
                {slide.subheadline}
              </p>
            )}
          </div>
        </AutoFit>
      </div>

      {/* Footer / Author Bar */}
      <div className="pt-6 border-t border-cham-border flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-cham-surface-alt flex items-center justify-center border border-cham-border text-cham-accent font-headline font-bold text-sm">
            {(slide.author || 'LR').slice(0, 2).toUpperCase()}
          </div>
          <div>
            <div className="font-body font-semibold text-[calc(15px*var(--loop-k))] text-cham-text">
              {slide.author || 'Loopreel Briefing'}
            </div>
            {slide.handle && (
              <div className="font-mono text-[calc(12px*var(--loop-k))] text-cham-muted">
                {slide.handle}
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="font-mono text-[calc(12px*var(--loop-k))] uppercase tracking-widest text-cham-muted">
            SWIPE TO READ →
          </span>
        </div>
      </div>
    </div>
  );
}

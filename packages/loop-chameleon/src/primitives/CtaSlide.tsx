import React from 'react';
import { AutoFit } from '../shared/AutoFit';

export interface CtaSlideProps {
  slide: {
    id: string;
    kicker?: string;
    headline: string;
    takeaway: string;
    actionPrompt?: string;
    handle?: string;
    url?: string;
  };
}

export function CtaSlide({ slide }: CtaSlideProps) {
  return (
    <div className="w-full h-full flex flex-col justify-between p-[8%] relative z-10">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-cham-border">
        <span className="px-3.5 py-1.5 rounded-cham font-mono text-[calc(13px*var(--loop-k))] tracking-wider uppercase font-semibold bg-cham-tag-bg text-cham-tag-text border border-cham-border">
          {slide.kicker || 'FINAL TAKEAWAY'}
        </span>
        <span className="font-mono text-[calc(12px*var(--loop-k))] text-cham-muted tracking-tight">
          CONCLUSION
        </span>
      </div>

      {/* Main Content with AutoFit Shield */}
      <div className="flex-1 flex flex-col justify-center py-6">
        <AutoFit verticalAlign="center" paddingBuffer={24}>
          <div className="space-y-6 max-w-2xl">
            <h2
              className="text-[calc(52px*var(--loop-k))] leading-[1.08] font-headline text-cham-text break-words"
              style={{
                fontWeight: 'var(--cham-headline-weight)' as any,
                fontStyle: 'var(--cham-headline-style)' as any,
                textTransform: 'var(--cham-headline-transform)' as any,
                letterSpacing: 'var(--cham-letter-spacing)',
              }}
            >
              {slide.headline}
            </h2>

            <div className="bg-cham-surface rounded-cham p-6 sm:p-7 border border-cham-border space-y-4 shadow-sm relative overflow-hidden">
              <div className="text-[calc(11px*var(--loop-k))] font-mono font-bold uppercase tracking-wider text-cham-accent">
                KEY IMPLICATION
              </div>
              <p className="font-body text-[calc(18px*var(--loop-k))] text-cham-text leading-relaxed">
                {slide.takeaway}
              </p>
            </div>

            {slide.actionPrompt && (
              <div className="flex items-center gap-3 pt-2">
                <div className="w-2.5 h-2.5 rounded-full bg-cham-accent animate-pulse" />
                <span className="font-body font-semibold text-[calc(16px*var(--loop-k))] text-cham-muted">
                  {slide.actionPrompt}
                </span>
              </div>
            )}
          </div>
        </AutoFit>
      </div>

      {/* Footer / Connect Bar */}
      <div className="pt-6 border-t border-cham-border flex items-center justify-between">
        <div className="font-mono text-[calc(13px*var(--loop-k))] text-cham-muted">
          {slide.handle ? `CONNECT: ${slide.handle}` : 'SAVE & SHARE THIS CAROUSEL'}
        </div>

        <div className="px-4 py-2 rounded-cham font-mono font-bold text-[calc(12px*var(--loop-k))] uppercase bg-cham-accent text-cham-bg">
          FOLLOW FOR MORE
        </div>
      </div>
    </div>
  );
}

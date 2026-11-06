import React from 'react';
import { AutoFit } from '../shared/AutoFit';

export interface BreakdownItem {
  num?: string;
  title: string;
  desc: string;
  tag?: string;
}

export interface BreakdownSlideProps {
  slide: {
    id: string;
    kicker?: string;
    headline: string;
    subheadline?: string;
    items: BreakdownItem[];
  };
}

export function BreakdownSlide({ slide }: BreakdownSlideProps) {
  const items = slide.items || [];

  return (
    <div className="w-full h-full flex flex-col justify-between p-[8%] relative z-10">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-cham-border">
        <span className="px-3.5 py-1.5 rounded-cham font-mono text-[calc(13px*var(--loop-k))] tracking-wider uppercase font-semibold bg-cham-tag-bg text-cham-tag-text border border-cham-border">
          {slide.kicker || 'CORE BREAKDOWN'}
        </span>
        <span className="font-mono text-[calc(12px*var(--loop-k))] text-cham-muted tracking-tight">
          FRAMEWORK
        </span>
      </div>

      {/* Main Content with AutoFit Shield */}
      <div className="flex-1 flex flex-col justify-center py-6">
        <AutoFit verticalAlign="center" paddingBuffer={24}>
          <div className="space-y-6">
            <div>
              <h2
                className="text-[calc(44px*var(--loop-k))] leading-[1.1] font-headline text-cham-text break-words"
                style={{
                  fontWeight: 'var(--cham-headline-weight)' as any,
                  fontStyle: 'var(--cham-headline-style)' as any,
                  textTransform: 'var(--cham-headline-transform)' as any,
                  letterSpacing: 'var(--cham-letter-spacing)',
                }}
              >
                {slide.headline}
              </h2>
              {slide.subheadline && (
                <p className="mt-2 text-[calc(18px*var(--loop-k))] font-body text-cham-muted">
                  {slide.subheadline}
                </p>
              )}
            </div>

            <div className="space-y-3.5">
              {items.map((item, idx) => {
                const num = item.num || String(idx + 1).padStart(2, '0');
                return (
                  <div
                    key={idx}
                    className="bg-cham-surface rounded-cham p-4 sm:p-5 border border-cham-border flex items-start gap-4 shadow-sm"
                  >
                    <div className="w-9 h-9 rounded-cham bg-cham-tag-bg text-cham-tag-text border border-cham-border flex items-center justify-center font-mono font-bold text-[calc(14px*var(--loop-k))] shrink-0">
                      {num}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <h3 className="font-headline font-bold text-[calc(20px*var(--loop-k))] text-cham-text leading-snug">
                          {item.title}
                        </h3>
                        {item.tag && (
                          <span className="px-2 py-0.5 rounded font-mono text-[calc(11px*var(--loop-k))] text-cham-muted bg-cham-surface-alt shrink-0">
                            {item.tag}
                          </span>
                        )}
                      </div>

                      <p className="font-body text-[calc(15px*var(--loop-k))] text-cham-muted leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </AutoFit>
      </div>

      {/* Footer */}
      <div className="pt-4 border-t border-cham-border flex items-center justify-between text-cham-muted font-mono text-[calc(11px*var(--loop-k))]">
        <span>STEP-BY-STEP SYNTHESIS</span>
        <span>CONTINUED →</span>
      </div>
    </div>
  );
}

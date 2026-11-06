import React from 'react';
import { AutoFit } from '../shared/AutoFit';

export interface SplitSlideProps {
  slide: {
    id: string;
    kicker?: string;
    headline: string;
    left: {
      label: string;
      title: string;
      desc: string;
      items?: string[];
    };
    right: {
      label: string;
      title: string;
      desc: string;
      items?: string[];
    };
  };
}

export function SplitSlide({ slide }: SplitSlideProps) {
  return (
    <div className="w-full h-full flex flex-col justify-between p-[8%] relative z-10">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-cham-border">
        <span className="px-3.5 py-1.5 rounded-cham font-mono text-[calc(13px*var(--loop-k))] tracking-wider uppercase font-semibold bg-cham-tag-bg text-cham-tag-text border border-cham-border">
          {slide.kicker || 'ANALYSIS & CONTRAST'}
        </span>
        <span className="font-mono text-[calc(12px*var(--loop-k))] text-cham-muted tracking-tight">
          COMPARISON
        </span>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col justify-center py-6">
        <AutoFit verticalAlign="center" paddingBuffer={24}>
          <div className="space-y-6">
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

            <div className="grid grid-cols-2 gap-5">
              {/* Left Column */}
              <div className="bg-cham-surface rounded-cham p-6 border border-cham-border flex flex-col justify-between space-y-4 shadow-sm">
                <div>
                  <div className="inline-block px-2.5 py-1 rounded font-mono text-[calc(11px*var(--loop-k))] uppercase tracking-wider font-semibold text-cham-muted bg-cham-surface-alt mb-3">
                    {slide.left.label || 'SIDE A'}
                  </div>
                  <h3 className="font-headline font-bold text-[calc(24px*var(--loop-k))] text-cham-text leading-snug mb-2">
                    {slide.left.title}
                  </h3>
                  <p className="font-body text-[calc(16px*var(--loop-k))] text-cham-muted leading-relaxed">
                    {slide.left.desc}
                  </p>
                </div>
                {slide.left.items && slide.left.items.length > 0 && (
                  <ul className="space-y-2 pt-3 border-t border-cham-border">
                    {slide.left.items.map((item, idx) => (
                      <li key={idx} className="font-body text-[calc(14px*var(--loop-k))] text-cham-text flex items-start gap-2">
                        <span className="text-cham-muted">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Right Column */}
              <div className="bg-cham-surface rounded-cham p-6 border border-cham-accent/30 flex flex-col justify-between space-y-4 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-cham-accent/5 rounded-full blur-2xl pointer-events-none" />
                <div>
                  <div className="inline-block px-2.5 py-1 rounded font-mono text-[calc(11px*var(--loop-k))] uppercase tracking-wider font-semibold text-cham-tag-text bg-cham-tag-bg mb-3 border border-cham-accent/20">
                    {slide.right.label || 'SIDE B'}
                  </div>
                  <h3 className="font-headline font-bold text-[calc(24px*var(--loop-k))] text-cham-text leading-snug mb-2">
                    {slide.right.title}
                  </h3>
                  <p className="font-body text-[calc(16px*var(--loop-k))] text-cham-muted leading-relaxed">
                    {slide.right.desc}
                  </p>
                </div>
                {slide.right.items && slide.right.items.length > 0 && (
                  <ul className="space-y-2 pt-3 border-t border-cham-border">
                    {slide.right.items.map((item, idx) => (
                      <li key={idx} className="font-body text-[calc(14px*var(--loop-k))] text-cham-text flex items-start gap-2">
                        <span className="text-cham-accent">→</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        </AutoFit>
      </div>

      {/* Footer */}
      <div className="pt-4 border-t border-cham-border flex items-center justify-between text-cham-muted font-mono text-[calc(11px*var(--loop-k))]">
        <span>PERSPECTIVE COMPARISON</span>
        <span>CONTINUED →</span>
      </div>
    </div>
  );
}

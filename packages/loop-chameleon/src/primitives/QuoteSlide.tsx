import React from 'react';
import { AutoFit } from '../shared/AutoFit';

export interface QuoteSlideProps {
  slide: {
    id: string;
    kicker?: string;
    quote: string;
    author: string;
    title?: string;
    publication?: string;
    context?: string;
  };
}

export function QuoteSlide({ slide }: QuoteSlideProps) {
  return (
    <div className="w-full h-full flex flex-col justify-between p-[8%] relative z-10">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-cham-border">
        <span className="px-3.5 py-1.5 rounded-cham font-mono text-[calc(13px*var(--loop-k))] tracking-wider uppercase font-semibold bg-cham-tag-bg text-cham-tag-text border border-cham-border">
          {slide.kicker || 'EDITORIAL VOICE'}
        </span>
        <span className="font-mono text-[calc(12px*var(--loop-k))] text-cham-muted tracking-tight">
          PRIMARY STATEMENT
        </span>
      </div>

      {/* Main Quote with AutoFit Shield */}
      <div className="flex-1 flex flex-col justify-center py-6">
        <AutoFit verticalAlign="center" paddingBuffer={32}>
          <div className="space-y-8 max-w-3xl">
            <div className="text-cham-accent font-headline text-[calc(72px*var(--loop-k))] leading-none opacity-80">
              “
            </div>

            <blockquote
              className="text-[calc(38px*var(--loop-k))] leading-[1.25] font-headline text-cham-text break-words -mt-6"
              style={{
                fontStyle: 'italic',
                fontWeight: 400,
                letterSpacing: '-0.01em',
              }}
            >
              {slide.quote}
            </blockquote>

            <div className="pt-4 border-t border-cham-border/50 flex items-center gap-4">
              <div className="w-1.5 h-12 bg-cham-accent rounded-full" />
              <div>
                <div className="font-body font-bold text-[calc(20px*var(--loop-k))] text-cham-text">
                  {slide.author}
                </div>
                {(slide.title || slide.publication) && (
                  <div className="font-body text-[calc(14px*var(--loop-k))] text-cham-muted">
                    {[slide.title, slide.publication].filter(Boolean).join(' • ')}
                  </div>
                )}
              </div>
            </div>

            {slide.context && (
              <p className="font-mono text-[calc(12px*var(--loop-k))] text-cham-muted/80 bg-cham-surface px-4 py-2.5 rounded-cham border border-cham-border">
                {slide.context}
              </p>
            )}
          </div>
        </AutoFit>
      </div>

      {/* Footer */}
      <div className="pt-4 border-t border-cham-border flex items-center justify-between text-cham-muted font-mono text-[calc(11px*var(--loop-k))]">
        <span>VERBATIM TRANSCRIPTION</span>
        <span>CONTINUED →</span>
      </div>
    </div>
  );
}

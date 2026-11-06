import React from 'react';
import { AutoFit } from '../shared/AutoFit';

export interface MetricItem {
  value: string;
  unit?: string;
  label: string;
  subtext?: string;
  trend?: string;
}

export interface MetricsSlideProps {
  slide: {
    id: string;
    kicker?: string;
    headline: string;
    subheadline?: string;
    metrics: MetricItem[];
    sourceNotes?: string;
  };
}

export function MetricsSlide({ slide }: MetricsSlideProps) {
  const metrics = slide.metrics || [];
  const cols = metrics.length === 1 ? 'grid-cols-1' : metrics.length === 2 ? 'grid-cols-2' : metrics.length === 3 ? 'grid-cols-3' : 'grid-cols-2';

  return (
    <div className="w-full h-full flex flex-col justify-between p-[8%] relative z-10">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-cham-border">
        <span className="px-3.5 py-1.5 rounded-cham font-mono text-[calc(13px*var(--loop-k))] tracking-wider uppercase font-semibold bg-cham-tag-bg text-cham-tag-text border border-cham-border">
          {slide.kicker || 'DATA & TELEMETRY'}
        </span>
        <span className="font-mono text-[calc(12px*var(--loop-k))] text-cham-muted tracking-tight">
          BY THE NUMBERS
        </span>
      </div>

      {/* Main Content */}
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

            <div className={`grid ${cols} gap-4`}>
              {metrics.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-cham-surface rounded-cham p-6 border border-cham-border flex flex-col justify-between shadow-sm relative overflow-hidden"
                >
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="font-body font-semibold text-[calc(14px*var(--loop-k))] text-cham-muted uppercase tracking-wider">
                      {item.label}
                    </span>
                    {item.trend && (
                      <span className="px-2 py-0.5 rounded font-mono text-[calc(11px*var(--loop-k))] font-bold bg-cham-tag-bg text-cham-tag-text border border-cham-border">
                        {item.trend}
                      </span>
                    )}
                  </div>

                  <div className="my-2">
                    <span className="font-headline font-extrabold text-[calc(56px*var(--loop-k))] text-cham-accent leading-none tracking-tight">
                      {item.value}
                    </span>
                    {item.unit && (
                      <span className="font-headline font-semibold text-[calc(24px*var(--loop-k))] text-cham-text ml-1.5">
                        {item.unit}
                      </span>
                    )}
                  </div>

                  {item.subtext && (
                    <p className="font-body text-[calc(13px*var(--loop-k))] text-cham-muted leading-relaxed mt-2 pt-2 border-t border-cham-border">
                      {item.subtext}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </AutoFit>
      </div>

      {/* Footer */}
      <div className="pt-4 border-t border-cham-border flex items-center justify-between text-cham-muted font-mono text-[calc(11px*var(--loop-k))]">
        <span>{slide.sourceNotes ? `SOURCE: ${slide.sourceNotes}` : 'TELEMETRY REPORT'}</span>
        <span>CONTINUED →</span>
      </div>
    </div>
  );
}

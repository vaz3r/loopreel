import React from 'react';
import { AutoFit } from '../shared/AutoFit';

export interface MatrixRow {
  label: string;
  values: string[];
}

export interface MatrixSlideProps {
  slide: {
    id: string;
    kicker?: string;
    headline: string;
    headers: string[];
    rows: MatrixRow[];
  };
}

export function MatrixSlide({ slide }: MatrixSlideProps) {
  const headers = slide.headers || [];
  const rows = slide.rows || [];

  return (
    <div className="w-full h-full flex flex-col justify-between p-[8%] relative z-10">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-cham-border">
        <span className="px-3.5 py-1.5 rounded-cham font-mono text-[calc(13px*var(--loop-k))] tracking-wider uppercase font-semibold bg-cham-tag-bg text-cham-tag-text border border-cham-border">
          {slide.kicker || 'SYSTEM MATRIX'}
        </span>
        <span className="font-mono text-[calc(12px*var(--loop-k))] text-cham-muted tracking-tight">
          COMPARATIVE MATRIX
        </span>
      </div>

      {/* Main Content with AutoFit Shield */}
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

            <div className="bg-cham-surface rounded-cham border border-cham-border overflow-hidden shadow-sm">
              {/* Header Row */}
              <div
                className="grid gap-2 px-5 py-3.5 bg-cham-surface-alt/70 border-b border-cham-border font-mono text-[calc(12px*var(--loop-k))] text-cham-muted uppercase font-bold tracking-wider"
                style={{ gridTemplateColumns: `1.5fr ${headers.map(() => '1fr').join(' ')}` }}
              >
                <div>FEATURE / CRITERIA</div>
                {headers.map((h, i) => (
                  <div key={i} className="text-cham-accent font-semibold">{h}</div>
                ))}
              </div>

              {/* Data Rows */}
              <div className="divide-y divide-cham-border">
                {rows.map((row, idx) => (
                  <div
                    key={idx}
                    className="grid gap-2 px-5 py-3.5 items-center font-body text-[calc(14px*var(--loop-k))]"
                    style={{ gridTemplateColumns: `1.5fr ${headers.map(() => '1fr').join(' ')}` }}
                  >
                    <div className="font-semibold text-cham-text pr-2">
                      {row.label}
                    </div>
                    {row.values.map((v, i) => (
                      <div key={i} className="text-cham-muted">
                        {v}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </AutoFit>
      </div>

      {/* Footer */}
      <div className="pt-4 border-t border-cham-border flex items-center justify-between text-cham-muted font-mono text-[calc(11px*var(--loop-k))]">
        <span>STRUCTURED DATA MATRIX</span>
        <span>CONTINUED →</span>
      </div>
    </div>
  );
}

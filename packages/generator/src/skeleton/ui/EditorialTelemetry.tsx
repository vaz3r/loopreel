import React from 'react';

export interface EditorialMetricItem {
  value: string;
  label: string;
  context?: string;
  tag?: string;
  changeBadge?: string;
}

export interface EditorialTelemetryProps {
  kicker?: string;
  headline: string;
  metrics: EditorialMetricItem[];
  className?: string;
}

/**
 * Full-Frame Editorial Telemetry Archetype.
 * For 2-3 metrics: full-width stacked rows spanning all 880px of canvas width.
 * For 4 metrics: balanced 2x2 grid.
 * Giant monospace numbers with zero horizontal clipping or wrapping.
 */
export function EditorialTelemetry({
  kicker,
  headline,
  metrics,
  className = '',
}: EditorialTelemetryProps) {
  const isGrid4 = metrics.length === 4;

  return (
    <div className={`flex flex-col h-full min-h-0 ${className}`}>
      {/* EDITORIAL HEADER WITH THICK RULE */}
      <div className="border-b-4 border-[var(--border)] pb-5 mb-4 shrink-0 flex flex-col gap-2">
        {kicker && (
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[var(--accent)] shrink-0" />
            <span className="font-[var(--font-mono)] text-xs font-bold uppercase tracking-[0.22em] text-[var(--accent)]">
              {kicker}
            </span>
          </div>
        )}
        <h2 className="font-[var(--font-headline)] text-[44px] md:text-[52px] font-black leading-[1.05] tracking-tight text-balance text-[var(--ink)]">
          {headline}
        </h2>
      </div>

      {/* METRIC ROWS / GRID */}
      {isGrid4 ? (
        <div className="flex-1 grid grid-cols-2 grid-rows-2 gap-6 min-h-0">
          {metrics.map((m, idx) => (
            <div
              key={idx}
              className="flex flex-col justify-between p-6 rounded-xl border border-[var(--border)] bg-[var(--surface)] shadow-sm min-h-0"
            >
              <div className="flex items-center justify-between">
                <span className="font-[var(--font-mono)] text-[11px] uppercase tracking-wider text-[var(--ink)]/60 font-semibold">
                  {m.tag || `METRIC 0${idx + 1}`}
                </span>
                {m.changeBadge && (
                  <span className="font-[var(--font-mono)] text-xs px-2 py-0.5 rounded bg-[var(--accent)]/15 text-[var(--accent)] font-bold">
                    {m.changeBadge}
                  </span>
                )}
              </div>
              <div className="font-[var(--font-mono)] text-[56px] md:text-[68px] font-black tracking-tight text-[var(--accent)] leading-none my-2 truncate">
                {m.value}
              </div>
              <div>
                <h4 className="font-[var(--font-headline)] text-lg font-bold text-[var(--ink)] leading-snug line-clamp-1">
                  {m.label}
                </h4>
                {m.context && (
                  <p className="font-[var(--font-body)] text-xs text-[var(--ink)]/75 mt-1 leading-relaxed line-clamp-2">
                    {m.context}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex-1 flex flex-col min-h-0">
          {metrics.map((m, idx) => (
            <div
              key={idx}
              className="flex-1 flex items-center justify-between gap-8 py-5 border-b border-[var(--border)] last:border-b-0 min-h-0"
            >
              {/* GIANT STAT WITH ACCENT */}
              <div className="shrink-0 flex flex-col">
                <div className="font-[var(--font-mono)] text-[68px] md:text-[82px] font-black tracking-tight text-[var(--accent)] leading-none">
                  {m.value}
                </div>
                {m.tag && (
                  <span className="font-[var(--font-mono)] text-[11px] uppercase tracking-[0.2em] text-[var(--ink)]/60 font-bold mt-1">
                    {m.tag}
                  </span>
                )}
              </div>

              {/* STAT CONTEXT */}
              <div className="flex-1 min-w-0 flex flex-col justify-center text-right">
                <h4 className="font-[var(--font-headline)] text-[22px] md:text-[26px] font-bold text-[var(--ink)] leading-snug line-clamp-1">
                  {m.label}
                </h4>
                {m.context && (
                  <p className="font-[var(--font-body)] text-[16px] md:text-[18px] text-[var(--ink)]/80 mt-1 leading-relaxed line-clamp-2">
                    {m.context}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

import React from 'react';
import {
  parseMetricBadge,
  type SlideComponentProps,
} from '../../../src/skeleton/types';

export default function Slide03({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  const telemetry = slide.telemetry ?? [];

  const renderCell = (index: number, bracketed: boolean) => {
    const item = telemetry[index];
    if (!item) return null;

    const { qualifier, value: metric, unit } = parseMetricBadge(item.badge);

    return (
      <div className="flex min-w-0 flex-col items-center justify-center gap-5 px-6 py-5">
        <div className="flex w-full min-w-0 items-center justify-center gap-3">
          {bracketed && (
            <svg
              aria-hidden="true"
              viewBox="0 0 12 88"
              className="h-[88px] w-3 shrink-0 text-[var(--accent)]"
              fill="none"
            >
              <path
                d="M11 2H2V86H11"
                stroke="currentColor"
                strokeWidth="2"
                vectorEffect="non-scaling-stroke"
              />
            </svg>
          )}

          <div className="flex min-w-0 flex-col items-center gap-2">
            <div className="flex items-baseline justify-center gap-2 whitespace-nowrap">
              {qualifier && (
                <span className="font-[var(--font-body)] text-[22px] text-[var(--accent)]">
                  {qualifier}
                </span>
              )}
              <span className="font-[var(--font-mono)] text-[56px] font-bold leading-none tracking-[-0.045em] text-[var(--accent)] tabular-nums">
                {metric}
              </span>
            </div>
            {unit && (
              <span className="font-[var(--font-body)] text-[24px] leading-none">
                {unit}
              </span>
            )}
          </div>

          {bracketed && (
            <svg
              aria-hidden="true"
              viewBox="0 0 12 88"
              className="h-[88px] w-3 shrink-0 text-[var(--accent)]"
              fill="none"
            >
              <path
                d="M1 2H10V86H1"
                stroke="currentColor"
                strokeWidth="2"
                vectorEffect="non-scaling-stroke"
              />
            </svg>
          )}
        </div>

        <p className="max-w-full text-center font-[var(--font-mono)] text-[22px] uppercase leading-snug tracking-[0.025em]">
          {item.label}
        </p>
      </div>
    );
  };

  return (
    <section className="flex flex-col h-full min-h-0 w-full text-[var(--ink)]">
      <div className="shrink-0">
        <p className="font-[var(--font-mono)] text-[22px] uppercase leading-tight tracking-[0.16em] text-[var(--accent)]">
          {slide.kicker}
        </p>

        <h1 className="mt-4 max-w-[900px] font-[var(--font-headline)] text-[64px] font-bold leading-[1.04] tracking-[-0.04em]">
          {slide.headline}
        </h1>

        <p className="mt-4 font-[var(--font-body)] text-[26px] leading-snug">
          {slide.subheadline}
        </p>

        <p className="mt-4 font-[var(--font-mono)] text-[20px] leading-snug tracking-wider opacity-70">
          {slide.scope}
        </p>
      </div>

      <div className="my-6 grid min-h-[380px] flex-1 grid-cols-2 border-y border-[var(--ink)]/35">
        <div className="grid min-w-0 grid-rows-[1fr_48px_1fr] border-r border-[var(--ink)]/35">
          {renderCell(0, true)}

          <div className="flex items-center" aria-hidden="true">
            <div className="h-px flex-1 bg-[var(--ink)]/35" />
            <svg
              viewBox="0 0 48 48"
              className="h-12 w-12 shrink-0 text-[var(--accent)]"
              fill="none"
            >
              <path
                d="M24 44V5M16 13L24 5L32 13"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="square"
                strokeLinejoin="miter"
                vectorEffect="non-scaling-stroke"
              />
              <circle cx="24" cy="44" r="3" fill="currentColor" />
            </svg>
            <div className="h-px flex-1 bg-[var(--ink)]/35" />
          </div>

          {renderCell(2, false)}
        </div>

        <div className="grid min-w-0 grid-rows-[1fr_48px_1fr]">
          {renderCell(1, true)}

          <div className="flex items-center" aria-hidden="true">
            <div className="h-px w-full bg-[var(--ink)]/35" />
          </div>

          {renderCell(3, false)}
        </div>
      </div>

      <div className="shrink-0">
        <p className="inline-flex border border-[var(--accent)] bg-[var(--surface)] px-4 py-2 font-[var(--font-mono)] text-[22px] font-bold uppercase leading-tight tracking-wider text-[var(--accent)]">
          {slide.verdictStamp?.replace(/\*\*/g, '')}
        </p>

        {slide.sourceNotes && slide.sourceNotes.length > 0 && (
          <aside className="mt-5 border-t border-[var(--border)] pt-4">
            {slide.sourceNotes.map((note, index) => (
              <p
                key={index}
                className="font-[var(--font-body)] text-[24px] leading-snug opacity-75"
              >
                {note}
              </p>
            ))}
          </aside>
        )}
      </div>
    </section>
  );
}
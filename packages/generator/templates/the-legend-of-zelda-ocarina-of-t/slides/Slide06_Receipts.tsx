import React from 'react';
import { parseMetricBadge, type SlideComponentProps } from '../../../src/skeleton/types';

export default function Slide06({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  const items = (slide.items ?? []).slice(0, 3);
  void brand;
  void totalSlides;

  return (
    <section className="flex flex-col h-full min-h-0 w-full text-[var(--ink)]">
      <div className="shrink-0">
        <p className="font-[var(--font-mono)] text-[20px] leading-[28px] tracking-[0.12em]">
          {slide.kicker}
        </p>

        <h1 className="mt-4 max-w-[920px] font-[var(--font-headline)] text-[60px] font-bold leading-[1.02] tracking-[-0.04em]">
          {slide.headline}
        </h1>

        <p className="mt-5 max-w-[910px] font-[var(--font-body)] text-[26px] leading-snug">
          {slide.subheadline}
        </p>
      </div>

      <div className="mt-7 grid min-h-0 flex-1 grid-rows-3 border-t-2 border-[var(--ink)]">
        {items.map((item, index) => {
          const { qualifier, value: metric, unit } = parseMetricBadge(item.badge);

          const body = item.body ?? '';
          const separator = body.indexOf(';');
          const reportingWindow =
            separator >= 0 ? body.slice(0, separator + 1) : body;
          const explanation =
            separator >= 0 ? body.slice(separator + 1).trim() : '';

          const highlighted = index === 1;

          return (
            <article
              key={`${slide.id}-${index}`}
              className="relative flex min-h-0 flex-col justify-center gap-2 border-b border-[var(--border)] px-6 py-4"
            >
              {highlighted && (
                <svg
                  aria-hidden="true"
                  viewBox="0 0 4 100"
                  preserveAspectRatio="none"
                  className="pointer-events-none absolute inset-y-4 left-0 h-[calc(100%-32px)] w-[4px] text-[var(--accent)]"
                >
                  <path
                    d="M2 0V100"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                </svg>
              )}

              <div className="flex items-baseline justify-between gap-4">
                <h2 className="min-w-0 max-w-[500px] font-[var(--font-headline)] text-[28px] font-semibold leading-[1.15] tracking-tight">
                  {item.title || item.label}
                </h2>

                <div className="flex shrink-0 items-baseline gap-2 whitespace-nowrap">
                  {qualifier && (
                    <span className="font-[var(--font-body)] text-[20px] font-medium text-[var(--ink)]/80">
                      {qualifier}
                    </span>
                  )}

                  <span className="font-[var(--font-mono)] text-[40px] font-bold leading-none tracking-tight tabular-nums text-[var(--accent)]">
                    {metric}
                  </span>

                  {unit && (
                    <span className="font-[var(--font-body)] text-[20px] font-medium text-[var(--ink)]/80">
                      {unit}
                    </span>
                  )}
                </div>
              </div>

              <p className="font-[var(--font-body)] text-[20px] leading-[1.35] text-[var(--ink)]/90">
                <span className="font-semibold text-[var(--ink)]">
                  {reportingWindow}
                </span>
                {explanation && (
                  <span className="ml-1 text-[var(--ink)]/80">{explanation}</span>
                )}
              </p>
            </article>
          );
        })}
      </div>

      {/* Citation gutter; source citations are supplied by SlideFrame. */}
      <div aria-hidden="true" className="h-8 shrink-0" />
    </section>
  );
}

import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

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
          const [firstWord, ...remainingWords] = (item.badge ?? '')
            .trim()
            .split(/\s+/);

          const hasQualifier = firstWord.toLowerCase() === 'over';
          const qualifier = hasQualifier ? firstWord : '';
          const metric = hasQualifier ? remainingWords : firstWord;
          const unit = (
            hasQualifier ? remainingWords.slice(1) : remainingWords
          ).join(' ');

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
              className="relative flex min-h-0 flex-col justify-center gap-3 border-b border-[var(--border)] px-7 py-5"
            >
              {highlighted && (
                <svg
                  aria-hidden="true"
                  viewBox="0 0 4 100"
                  preserveAspectRatio="none"
                  className="pointer-events-none absolute inset-y-5 left-0 h-[calc(100%-40px)] w-[4px] text-[var(--accent)]"
                >
                  <path
                    d="M2 0V100"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                </svg>
              )}

              <div className="flex items-center justify-between gap-5">
                <h2 className="min-w-0 max-w-[420px] font-[var(--font-headline)] text-[34px] font-semibold leading-[1.1] tracking-[-0.025em]">
                  {item.title || item.label}
                </h2>

                <div className="flex shrink-0 items-baseline gap-3 whitespace-nowrap">
                  {qualifier && (
                    <span className="font-[var(--font-body)] text-[26px] leading-none">
                      {qualifier}
                    </span>
                  )}

                  <span className="font-[var(--font-mono)] text-[56px] font-bold leading-none tracking-[-0.055em] tabular-nums">
                    {metric}
                  </span>

                  <span className="font-[var(--font-body)] text-[26px] leading-none">
                    {unit}
                  </span>
                </div>
              </div>

              <p className="font-[var(--font-body)] text-[26px] leading-[1.3]">
                <span className="block font-semibold">
                  {reportingWindow}
                </span>
                {explanation && (
                  <span className="mt-1 block">{explanation}</span>
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
import React from 'react';
import {
  parseMetricBadge,
  type SlideComponentProps,
} from '../../../src/skeleton/types';

export default function Slide02({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  const items = slide.items ?? [];
  const reassurance = items[0];
  const exchange = items[1];

  const reassuranceMetric = parseMetricBadge(
    reassurance?.metric?.badge ?? '',
  );
  const exchangeMetric = parseMetricBadge(exchange?.metric?.badge ?? '');

  return (
    <section className="flex flex-col h-full min-h-0 w-full text-[var(--ink)]">
      <header className="flex shrink-0 flex-col gap-5">
        <div className="flex items-center gap-5">
          <span
            aria-hidden="true"
            className="h-[2px] w-12 shrink-0 bg-[var(--accent)]"
          />
          <p className="font-[var(--font-mono)] text-[22px] uppercase leading-tight tracking-[0.16em] text-[var(--accent)]">
            {slide.kicker}
          </p>
        </div>

        <h1 className="max-w-[920px] font-[var(--font-headline)] text-[64px] font-bold leading-[1.04] tracking-[-0.04em]">
          {slide.headline}
        </h1>

        <p className="max-w-[860px] font-[var(--font-body)] text-[28px] leading-snug">
          {slide.subheadline}
        </p>
      </header>

      <div className="mt-10 flex shrink-0 flex-col">
        <article className="flex min-h-[272px] w-[calc(100%-56px)] flex-col justify-center gap-6 border border-[var(--ink)] bg-[var(--surface)] px-8 py-7">
          <h2 className="font-[var(--font-headline)] text-[32px] font-semibold leading-tight tracking-[-0.02em]">
            {reassurance?.title}
          </h2>

          <div className="grid grid-cols-[178px_minmax(0,1fr)] items-start gap-7">
            <div className="flex min-w-0 flex-col gap-3">
              <div className="flex items-baseline gap-2">
                {reassuranceMetric.qualifier && (
                  <span className="font-[var(--font-body)] text-[22px]">
                    {reassuranceMetric.qualifier}
                  </span>
                )}
                <span className="font-[var(--font-mono)] text-[48px] font-bold leading-none tracking-[-0.05em] tabular-nums">
                  {reassuranceMetric.value}
                </span>
                {reassuranceMetric.unit && (
                  <span className="font-[var(--font-body)] text-[22px]">
                    {reassuranceMetric.unit}
                  </span>
                )}
              </div>

              <p className="font-[var(--font-mono)] text-[22px] leading-snug">
                {reassurance?.metric?.label}
              </p>
            </div>

            <p className="min-w-0 border-l border-[var(--border)] pl-7 font-[var(--font-body)] text-[26px] leading-snug">
              {reassurance?.body}
            </p>
          </div>
        </article>

        <svg
          aria-hidden="true"
          focusable="false"
          viewBox="0 0 540 800"
          preserveAspectRatio="none"
          className="block h-[52px] w-full shrink-0 text-[var(--accent)]"
          fill="none"
        >
          <path
            d="M 480 0 C 480 400, 64 400, 64 800"
            stroke="currentColor"
            strokeWidth="2"
            vectorEffect="non-scaling-stroke"
          />
        </svg>

        <article className="ml-[56px] flex min-h-[272px] w-[calc(100%-56px)] flex-col justify-center gap-6 border border-[var(--border)] border-l-[4px] border-l-[var(--accent)] bg-[var(--surface)] px-8 py-7">
          <h2 className="font-[var(--font-headline)] text-[32px] font-semibold leading-tight tracking-[-0.02em]">
            {exchange?.title}
          </h2>

          <div className="grid grid-cols-[178px_minmax(0,1fr)] items-start gap-7">
            <div className="flex min-w-0 flex-col gap-3">
              <div className="flex items-baseline gap-2 text-[var(--accent)]">
                {exchangeMetric.qualifier && (
                  <span className="font-[var(--font-body)] text-[22px]">
                    {exchangeMetric.qualifier}
                  </span>
                )}
                <span className="font-[var(--font-mono)] text-[48px] font-bold leading-none tracking-[-0.05em] tabular-nums">
                  {exchangeMetric.value}
                </span>
                {exchangeMetric.unit && (
                  <span className="font-[var(--font-body)] text-[22px]">
                    {exchangeMetric.unit}
                  </span>
                )}
              </div>

              <p className="font-[var(--font-mono)] text-[22px] leading-snug">
                {exchange?.metric?.label}
              </p>
            </div>

            <p className="min-w-0 border-l border-[var(--border)] pl-7 font-[var(--font-body)] text-[26px] leading-snug">
              {exchange?.body}
            </p>
          </div>
        </article>
      </div>

      <div aria-hidden="true" className="min-h-8 flex-1" />
    </section>
  );
}
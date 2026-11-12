import React from 'react';
import {
  parseMetricBadge,
  type SlideComponentProps,
} from '../../../src/skeleton/types';

export default function Slide05({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  const items = slide.items ?? [];
  const metrics = slide.metrics ?? [];

  const rows = [
    { item: items[0], metric: metrics[0] },
    { item: items[1], metric: metrics[1] },
    { item: items[2], metric: metrics[2] },
  ];

  return (
    <section className="flex flex-col h-full min-h-0 w-full text-[var(--ink)]">
      <header className="shrink-0 border-t border-[var(--border)] pt-6">
        <p className="font-[var(--font-mono)] text-[20px] leading-normal tracking-[0.12em]">
          {slide.kicker}
        </p>

        <h1 className="mt-5 max-w-[920px] font-[var(--font-headline)] text-[56px] font-bold leading-[1.04] tracking-[-0.04em]">
          {slide.headline}
        </h1>

        <p className="mt-5 max-w-[850px] font-[var(--font-body)] text-[28px] leading-snug">
          {slide.subheadline}
        </p>
      </header>

      <div className="mt-9 grid min-h-0 flex-1 grid-rows-[1fr_1fr_1.4fr]">
        {rows.map(({ item, metric: metricData }, index) => {
          const isTotal = index === 2;
          const { qualifier, value: metric, unit } = parseMetricBadge(
            metricData?.badge ?? '',
          );
          const displayedUnit = metricData?.unit || unit;

          return (
            <article
              key={index}
              className={`relative flex min-w-0 flex-col justify-center px-7 py-6 ${
                isTotal
                  ? 'bg-[var(--surface)]'
                  : 'border-t border-[var(--border)]'
              }`}
            >
              {index === 1 && (
                <svg
                  aria-hidden="true"
                  viewBox="0 0 28 28"
                  className="absolute -top-[14px] left-7 h-7 w-7 text-[var(--ink)]"
                  fill="none"
                >
                  <path
                    d="M14 5V23M5 14H23"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="square"
                  />
                </svg>
              )}

              {isTotal && (
                <svg
                  aria-hidden="true"
                  viewBox="0 0 952 8"
                  preserveAspectRatio="none"
                  className="absolute inset-x-0 top-0 h-2 w-full text-[var(--accent)]"
                  fill="none"
                >
                  <path
                    d="M0 1H952M0 7H952"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                </svg>
              )}

              <div className="grid grid-cols-[minmax(0,1fr)_240px] items-start gap-8">
                <div className="min-w-0">
                  <h2
                    className={`font-[var(--font-headline)] text-[26px] font-semibold leading-tight tracking-[-0.015em] ${
                      isTotal ? 'text-[var(--accent)]' : ''
                    }`}
                  >
                    {item?.title || item?.label}
                  </h2>

                  <p className="mt-3 font-[var(--font-body)] text-[28px] leading-snug">
                    {item?.body}
                  </p>
                </div>

                <div
                  className={`flex min-w-0 flex-col items-end border-l border-[var(--border)] pl-6 ${
                    isTotal ? 'text-[var(--accent)]' : ''
                  }`}
                >
                  <div className="flex shrink-0 items-baseline gap-2 whitespace-nowrap">
                    {qualifier && (
                      <span className="font-[var(--font-body)] text-[22px]">
                        {qualifier}
                      </span>
                    )}
                    <span className="font-[var(--font-mono)] text-[42px] font-bold leading-none tracking-[-0.04em] tabular-nums">
                      {metric}
                    </span>
                  </div>

                  {displayedUnit && (
                    <span className="mt-3 font-[var(--font-body)] text-[22px] leading-normal">
                      {displayedUnit}
                    </span>
                  )}

                  {isTotal && (
                    <span className="mt-6 inline-flex border-2 border-[var(--accent)] px-3 py-2 font-[var(--font-mono)] text-[20px] leading-none tracking-[0.12em]">
                      REVENUE
                    </span>
                  )}
                </div>
              </div>

              {isTotal && metricData?.label && (
                <p className="mt-6 border-t border-[var(--border)] pt-4 font-[var(--font-mono)] text-[20px] leading-normal">
                  {metricData.label}
                </p>
              )}
            </article>
          );
        })}
      </div>
    </section>
  );
}
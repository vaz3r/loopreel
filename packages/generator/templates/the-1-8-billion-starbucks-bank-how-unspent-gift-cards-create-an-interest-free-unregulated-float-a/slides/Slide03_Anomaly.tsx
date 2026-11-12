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
  void brand;
  void totalSlides;

  const items = slide.items ?? [];
  const metrics = slide.metrics ?? [];

  const cutaways = [
    {
      item: items[0],
      metric: metrics[0],
      position: 'mr-auto w-[920px]',
      height: 'min-h-[300px]',
    },
    {
      item: items[1],
      metric: metrics[1],
      position: 'ml-auto w-[840px]',
      height: 'min-h-[286px]',
    },
  ];

  return (
    <section className="flex flex-col h-full min-h-0 w-full text-[var(--ink)]">
      <header className="shrink-0">
        <div className="mb-5 flex items-center gap-4">
          <span
            aria-hidden="true"
            className="h-[2px] w-10 shrink-0 bg-[var(--accent)]"
          />
          <p className="font-[var(--font-mono)] text-[20px] leading-[26px] tracking-[0.12em] text-[var(--accent)]">
            {slide.kicker}
          </p>
        </div>

        <h1 className="max-w-[920px] font-[var(--font-headline)] text-[56px] font-bold leading-[1.04] tracking-[-0.04em]">
          {slide.headline}
        </h1>

        <p className="mt-5 max-w-[900px] font-[var(--font-body)] text-[28px] leading-[1.3]">
          {slide.subheadline}
        </p>
      </header>

      <div className="mt-9 flex flex-col gap-8">
        {cutaways.map(({ item, metric, position, height }, index) => {
          const {
            qualifier,
            value,
            unit: parsedUnit,
          } = parseMetricBadge(metric?.badge ?? '');

          const unit = metric?.unit || parsedUnit;

          return (
            <div
              key={index}
              className={`relative isolate shrink-0 max-w-full pb-[22px] pr-[22px] ${position}`}
            >
              <svg
                aria-hidden="true"
                focusable="false"
                className="pointer-events-none absolute inset-0 h-full w-full text-[var(--border)]"
                viewBox="0 0 920 330"
                preserveAspectRatio="none"
                fill="none"
              >
                <path
                  d="M12 10H908V318H12Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  vectorEffect="non-scaling-stroke"
                />
                <path
                  d="M24 22H919V329H24Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  vectorEffect="non-scaling-stroke"
                />
                <path
                  d="M884 329H919V294"
                  stroke="var(--accent)"
                  strokeWidth="2"
                  vectorEffect="non-scaling-stroke"
                />
              </svg>

              <article
                className={`relative flex flex-col border border-[var(--border)] bg-[var(--surface)] px-8 py-7 ${height}`}
              >
                <div className="flex items-center gap-4">
                  <span
                    aria-hidden="true"
                    className="h-7 w-[6px] shrink-0 bg-[var(--accent)]"
                  />
                  <h2 className="font-[var(--font-mono)] text-[20px] font-semibold leading-[26px] tracking-[0.08em] text-[var(--accent)]">
                    {item?.title || item?.label}
                  </h2>
                </div>

                <div
                  aria-label={metric?.label}
                  className="mt-4 flex shrink-0 flex-wrap items-baseline gap-x-3 gap-y-1"
                >
                  {qualifier && (
                    <span className="font-[var(--font-body)] text-[22px] leading-snug">
                      {qualifier}
                    </span>
                  )}

                  <span className="font-[var(--font-mono)] text-[52px] font-bold leading-[1.2] tracking-[-0.04em] tabular-nums">
                    {value}
                  </span>

                  {unit && (
                    <span className="font-[var(--font-body)] text-[24px] leading-snug">
                      {unit}
                    </span>
                  )}
                </div>

                <p className="mt-4 font-[var(--font-body)] text-[28px] leading-[1.3]">
                  {item?.body}
                </p>
              </article>
            </div>
          );
        })}
      </div>
    </section>
  );
}
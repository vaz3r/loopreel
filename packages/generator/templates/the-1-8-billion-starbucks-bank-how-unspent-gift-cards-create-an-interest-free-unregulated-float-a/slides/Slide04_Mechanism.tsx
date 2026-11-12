import React from 'react';
import {
  parseMetricBadge,
  type SlideComponentProps,
} from '../../../src/skeleton/types';

export default function Slide04({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  const items = slide.items ?? [];
  const item0 = items[0];
  const item1 = items[1];
  const item2 = items[2];
  const metrics = (slide.metrics ?? []).slice(0, 2);

  const stages = [
    { item: item0, placement: 'col-start-2 row-start-1' },
    { item: item1, placement: 'col-start-2 row-start-2' },
    { item: item2, placement: 'col-start-2 row-start-3' },
  ];

  return (
    <section className="flex flex-col h-full min-h-0 w-full text-[var(--ink)]">
      <header className="shrink-0">
        <p className="font-[var(--font-mono)] text-[20px] leading-[1.3] tracking-[0.12em] text-[var(--accent)]">
          {slide.kicker}
        </p>

        <h1 className="mt-4 max-w-[920px] font-[var(--font-headline)] text-[54px] font-bold leading-[1.04] tracking-[-0.04em]">
          {slide.headline}
        </h1>

        <p className="mt-5 max-w-[900px] font-[var(--font-body)] text-[28px] leading-snug">
          {slide.subheadline}
        </p>
      </header>

      <div className="mt-8 grid h-[528px] shrink-0 grid-cols-[112px_minmax(0,1fr)] grid-rows-[166px_136px_226px] gap-x-6">
        <svg
          className="col-start-1 row-start-1 row-span-3 h-[528px] w-[112px]"
          viewBox="0 0 112 528"
          fill="none"
          aria-hidden="true"
        >
          {/* All junctions and the proportional-recognition branch share
              one coordinate system. */}
          <path
            d="M40 22V324"
            stroke="#FFFFFF"
            strokeWidth="3"
          />

          <path
            d="M40 188H69C85 188 94 197 94 213V279C94 297 84 310 67 317L51 324"
            stroke="var(--accent)"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          <path
            d="M64 313L51 324L68 327"
            stroke="var(--accent)"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          <circle
            cx="40"
            cy="22"
            r="13"
            fill="var(--surface)"
            stroke="#FFFFFF"
            strokeWidth="3"
          />
          <circle
            cx="40"
            cy="188"
            r="13"
            fill="var(--surface)"
            stroke="#FFFFFF"
            strokeWidth="3"
          />
          <circle
            cx="40"
            cy="324"
            r="13"
            fill="var(--surface)"
            stroke="var(--accent)"
            strokeWidth="3"
          />
          <circle
            cx="40"
            cy="324"
            r="4"
            fill="var(--accent)"
          />
        </svg>

        {stages.map(({ item, placement }, index) => (
          <article
            key={index}
            className={`${placement} min-w-0 pr-3 pt-1`}
          >
            <h2
              className={`font-[var(--font-headline)] text-[28px] font-semibold leading-[36px] tracking-[0.025em] ${
                index === 2
                  ? 'text-[var(--accent)]'
                  : 'text-[var(--ink)]'
              }`}
            >
              {item?.title || item?.label}
            </h2>

            <p className="mt-3 max-w-[790px] font-[var(--font-body)] text-[28px] leading-snug">
              {item?.body}
            </p>
          </article>
        ))}
      </div>

      <div className="mt-auto grid shrink-0 grid-cols-2 gap-6 border-t border-[var(--border)] pt-6">
        {metrics.map((item, index) => {
          const {
            qualifier: parsedQualifier,
            value: metric,
            unit: parsedUnit,
          } = parseMetricBadge(item.badge);

          const qualifier = item.qualifier || parsedQualifier;
          const unit = item.unit || parsedUnit;

          return (
            <div
              key={index}
              className={`min-w-0 ${
                index === 1
                  ? 'border-l border-[var(--border)] pl-6'
                  : ''
              }`}
            >
              <div className="flex items-baseline gap-3">
                {qualifier && (
                  <span className="font-[var(--font-body)] text-[22px] leading-snug">
                    {qualifier}
                  </span>
                )}

                <span className="font-[var(--font-mono)] text-[48px] font-bold leading-none tracking-[-0.04em] tabular-nums">
                  {metric}
                </span>

                {unit && (
                  <span className="font-[var(--font-body)] text-[22px] leading-snug">
                    {unit}
                  </span>
                )}
              </div>

              <p className="mt-3 font-[var(--font-body)] text-[24px] leading-snug">
                {item.label}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
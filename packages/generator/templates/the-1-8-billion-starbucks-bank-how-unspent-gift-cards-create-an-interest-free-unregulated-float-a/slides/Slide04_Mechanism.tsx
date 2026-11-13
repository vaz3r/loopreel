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
  const telemetry = slide.telemetry ?? [];

  const stages = [
    { item: items[0], placement: 'row-start-2' },
    { item: items[1], placement: 'row-start-4' },
    { item: items[2], placement: 'row-start-6' },
  ];

  const reporting = [telemetry[0], telemetry[1]];

  return (
    <section className="flex flex-col h-full min-h-0 w-full text-[var(--ink)]">
      <div className="isolate grid h-full min-h-0 w-full grid-cols-[94fr_446fr] grid-rows-[300fr_130fr_57.5fr_130fr_57.5fr_125fr]">
        {/* Artwork and copy share one coordinate grid; no absolute callouts. */}
        <svg
          aria-hidden="true"
          focusable="false"
          viewBox="0 0 540 800"
          preserveAspectRatio="none"
          className="pointer-events-none z-0 col-start-1 col-end-3 row-start-1 row-end-7 h-full min-h-0 w-full text-[var(--accent)]"
        >
          <path
            d="M58 315V690"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            vectorEffect="non-scaling-stroke"
          />

          {/* Compensated radii retain circular nodes on the 952 × 1028 grid. */}
          <ellipse
            cx="58"
            cy="315"
            rx="7"
            ry="9.72"
            fill="currentColor"
          />

          <ellipse
            cx="58"
            cy="502.5"
            rx="7"
            ry="9.72"
            fill="var(--surface)"
            stroke="currentColor"
            strokeWidth="2"
            vectorEffect="non-scaling-stroke"
          />

          <g>
            <ellipse
              cx="58"
              cy="690"
              rx="7"
              ry="9.72"
              fill="var(--surface)"
            />
            <path
              d="M58 680.28A7 9.72 0 0 0 58 699.72Z"
              fill="currentColor"
            />
            <ellipse
              cx="58"
              cy="690"
              rx="7"
              ry="9.72"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              vectorEffect="non-scaling-stroke"
            />
          </g>
        </svg>

        <header className="z-10 col-start-1 col-end-3 row-start-1 flex min-w-0 flex-col gap-2">
          <p className="font-[var(--font-mono)] text-[20px] leading-[24px] tracking-[0.16em] text-[var(--accent)]">
            {slide.kicker}
          </p>

          <h1 className="max-w-[900px] font-[var(--font-headline)] text-[56px] font-bold leading-[1.02] tracking-[-0.04em]">
            {slide.headline}
          </h1>

          <p className="max-w-[920px] font-[var(--font-body)] text-[26px] leading-[32px]">
            {slide.subheadline}
          </p>

          <div className="grid grid-cols-[300px_minmax(0,1fr)] gap-7 border-t border-[var(--border)] pt-2">
            {reporting.map((entry, index) => {
              if (!entry) return null;

              const {
                qualifier,
                value: metric,
                unit: parsedUnit,
              } = parseMetricBadge(entry.badge);

              const unit = entry.unit || parsedUnit;

              return (
                <div
                  key={index}
                  className="flex min-w-0 items-start gap-3"
                >
                  <div className="flex shrink-0 items-baseline gap-2 border border-[var(--border)] bg-[var(--surface)] px-3 py-1">
                    {qualifier && (
                      <span className="font-[var(--font-body)] text-[22px] leading-[28px]">
                        {qualifier}
                      </span>
                    )}
                    <span className="font-[var(--font-mono)] text-[26px] font-bold leading-[30px] tabular-nums text-[var(--accent)]">
                      {metric}
                    </span>
                    {unit && (
                      <span className="font-[var(--font-body)] text-[22px] leading-[28px]">
                        {unit}
                      </span>
                    )}
                  </div>

                  <p className="min-w-0 font-[var(--font-body)] text-[20px] leading-[22px]">
                    {entry.label}
                  </p>
                </div>
              );
            })}
          </div>
        </header>

        {stages.map(({ item, placement }, index) => {
          if (!item) return null;

          return (
            <article
              key={index}
              className={`z-10 col-start-2 min-h-0 min-w-0 ${placement}`}
            >
              <h2 className="font-[var(--font-headline)] text-[28px] font-semibold leading-[34px] tracking-[-0.015em]">
                {item.title || item.label}
              </h2>

              <p className="mt-2 max-w-[760px] font-[var(--font-body)] text-[26px] leading-[34px]">
                {item.body}
              </p>
            </article>
          );
        })}
      </div>
    </section>
  );
}
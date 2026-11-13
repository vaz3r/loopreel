import React from 'react';
import {
  parseMetricBadge,
  type SlideComponentProps,
} from '../../../src/skeleton/types';

export default function Slide06({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  const items = slide.items ?? [];
  const telemetry = slide.telemetry ?? [];

  const rows = [items[0], items[1], items[2]];
  const metrics = [telemetry[0], telemetry[1]];

  return (
    <section className="flex flex-col h-full min-h-0 w-full text-[var(--ink)]">
      <div className="relative flex h-full min-h-0 w-full flex-col">
        {/* Shared coordinates: ledger rows begin at 425, 550, and 675. */}
        <svg
          aria-hidden="true"
          viewBox="0 0 540 800"
          preserveAspectRatio="none"
          className="pointer-events-none absolute inset-0 h-full w-full"
          fill="none"
        >
          <g
            stroke="var(--border)"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
          >
            <path d="M0 425H540 M0 550H540" />
          </g>

          <path
            d="M1 550V675"
            stroke="#FF2A2A"
            strokeWidth="4"
            vectorEffect="non-scaling-stroke"
          />

          {/* Open corners distinguish the refund exception. */}
          <path
            d="
              M0 695V675H24
              M516 675H540V695
              M0 780V799H24
              M516 799H540V780
            "
            stroke="var(--border)"
            strokeWidth="2"
            vectorEffect="non-scaling-stroke"
          />
        </svg>

        <div className="relative flex h-[53.125%] shrink-0 flex-col pb-7">
          <p className="font-[var(--font-mono)] text-[20px] leading-[1.3] tracking-[0.14em] text-[var(--accent)]">
            {slide.kicker}
          </p>

          <h1 className="mt-4 max-w-[920px] font-[var(--font-headline)] text-[28px] font-bold leading-[1.02] tracking-[-0.04em]">
            {slide.headline}
          </h1>

          <p className="mt-4 max-w-[930px] font-[var(--font-body)] text-[26px] leading-[1.3]">
            {slide.subheadline}
          </p>

          <div className="mt-auto grid shrink-0 grid-cols-2 border-y border-[var(--border)] bg-[var(--surface)] py-4">
            {metrics.map((entry, index) => {
              if (!entry) return null;

              const parsed = parseMetricBadge(entry.badge ?? '');
              const qualifier = entry.qualifier || parsed.qualifier;
              const unit = entry.unit || parsed.unit;

              return (
                <div
                  key={index}
                  className={`min-w-0 px-6 ${
                    index === 1
                      ? 'border-l border-[var(--border)]'
                      : ''
                  }`}
                >
                  <div className="flex items-baseline gap-2 whitespace-nowrap">
                    {qualifier && (
                      <span className="font-[var(--font-body)] text-[22px] leading-normal">
                        {qualifier}
                      </span>
                    )}

                    <span className="font-[var(--font-mono)] text-[28px] font-bold leading-[1.1] tabular-nums tracking-[-0.04em] text-[var(--accent)]">
                      {parsed.value}
                    </span>

                    {unit && (
                      <span className="font-[var(--font-body)] text-[22px] leading-normal">
                        {unit}
                      </span>
                    )}
                  </div>

                  <p className="mt-2 font-[var(--font-body)] text-[24px] leading-[1.25]">
                    {entry.label}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="relative grid min-h-0 flex-1 grid-rows-3">
          {rows.map((item, index) => (
            <article
              key={index}
              className="flex min-h-0 min-w-0 flex-col justify-center px-7 py-5"
            >
              <h2
                className={`font-[var(--font-headline)] text-[26px] font-semibold uppercase leading-[1.2] tracking-[0.035em] ${
                  index === 1 ? 'text-[var(--accent)]' : ''
                }`}
              >
                {item?.title || item?.label}
              </h2>

              <p className="mt-3 max-w-[880px] font-[var(--font-body)] text-[24px] leading-[1.3]">
                {item?.body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
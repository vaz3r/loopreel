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
  const items = slide.items ?? [];
  const panels = [items[0], items[1]];

  return (
    <section className="flex flex-col h-full min-h-0 w-full text-[var(--ink)]">
      <header className="flex h-[366px] shrink-0 flex-col pb-7">
        <p className="font-[var(--font-mono)] text-[20px] uppercase leading-snug tracking-[0.16em] text-[var(--accent)]">
          {slide.kicker}
        </p>

        <h1 className="mt-5 max-w-[940px] font-[var(--font-headline)] text-[62px] font-bold leading-[1.03] tracking-[-0.04em]">
          {slide.headline}
        </h1>

        <p className="mt-5 max-w-[880px] font-[var(--font-body)] text-[28px] leading-snug">
          {slide.subheadline}
        </p>

        <p className="mt-auto pt-5 font-[var(--font-mono)] text-[22px] leading-snug tracking-[0.04em]">
          {slide.asOf}
        </p>
      </header>

      <div className="relative isolate grid min-h-0 flex-1 grid-cols-2 gap-[56px] px-[56px]">
        <svg
          aria-hidden="true"
          focusable="false"
          className="pointer-events-none absolute inset-0 -z-10 h-full w-full"
          viewBox="0 285 540 515"
          preserveAspectRatio="none"
          fill="none"
        >
          <path
            d="M0 285H540"
            stroke="var(--border)"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
          />

          <g
            stroke="var(--border)"
            strokeWidth="1"
            opacity="0.48"
          >
            <path d="M32 370H254 M286 370H508" />
            <path d="M32 425H254 M286 425H508" />
            <path d="M32 480H254 M286 480H508" />
            <path d="M32 535H254 M286 535H508" />
            <path d="M32 590H254 M286 590H508" />
            <path d="M32 645H254 M286 645H508" />
            <path d="M32 700H254 M286 700H508" />
            <path d="M32 755H254 M286 755H508" />
          </g>

          <path
            d="M270 285V800"
            stroke="var(--accent)"
            strokeWidth="2"
            vectorEffect="non-scaling-stroke"
          />

          <path
            d="M263 285H277 M263 800H277"
            stroke="var(--accent)"
            strokeWidth="2"
            vectorEffect="non-scaling-stroke"
          />

          <path
            d="M32 800H254 M286 800H508"
            stroke="var(--border)"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
          />
        </svg>

        {panels.map((item, index) => {
          if (!item) return null;

          const { qualifier, value: metric, unit } = parseMetricBadge(
            item.metric?.badge ?? ''
          );
          const metricUnit = item.metric?.unit || unit;

          return (
            <article
              key={`${slide.id}-${index}`}
              className="flex min-w-0 flex-col pb-9 pt-9"
            >
              <h2 className="min-h-[88px] font-[var(--font-headline)] text-[32px] font-semibold leading-[1.15] tracking-[-0.025em]">
                {item.title || item.label}
              </h2>

              <div className="mt-6">
                <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                  {qualifier && (
                    <span className="font-[var(--font-body)] text-[22px] leading-snug">
                      {qualifier}
                    </span>
                  )}

                  <span className="whitespace-nowrap font-[var(--font-mono)] text-[44px] font-bold leading-[1.1] tracking-[-0.04em] tabular-nums">
                    {metric}
                  </span>
                </div>

                {metricUnit && (
                  <p className="mt-2 font-[var(--font-mono)] text-[22px] leading-snug">
                    {metricUnit}
                  </p>
                )}
              </div>

              <p className="mt-7 min-h-[66px] max-w-[350px] font-[var(--font-body)] text-[24px] leading-snug">
                {item.metric?.label}
              </p>

              <div className="mt-8 h-[3px] w-10 shrink-0 bg-[var(--accent)]" />

              <p className="mt-6 font-[var(--font-body)] text-[26px] leading-[1.4]">
                {item.body}
              </p>
            </article>
          );
        })}
      </div>
    </section>
  );
}
import React from 'react';
import {
  parseMetricBadge,
  type SlideComponentProps,
} from '../../../src/skeleton/types';

function renderEmphasis(copy?: string): React.ReactNode {
  return copy?.split(/(\*\*.*?\*\*)/g).map((part, index) =>
    part.startsWith('**') && part.endsWith('**') ? (
      <strong key={index} className="font-semibold text-[var(--ink)]">
        {part.substring(2, part.length - 2)}
      </strong>
    ) : (
      <React.Fragment key={index}>{part}</React.Fragment>
    ),
  );
}

export default function Slide03({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  void brand;
  void totalSlides;

  const items = slide.items ?? [];
  const item0 = items[0];
  const item1 = items[1];

  const telemetry = Array.isArray(slide.telemetry) ? slide.telemetry : [];
  const t0 = telemetry ? parseMetricBadge(telemetry?.[0]?.badge) : null;

  return (
    <section className="flex flex-col h-full min-h-0 w-full text-[var(--ink)] justify-between">
      <header className="shrink-0">
        <div className="flex items-center gap-2.5 font-[var(--font-mono)] text-[20px] uppercase tracking-[0.2em] text-[var(--accent)]">
          <span
            aria-hidden="true"
            className="inline-block h-2.5 w-2.5 shrink-0 bg-[var(--accent)]"
          />
          <span>{slide.kicker}</span>
        </div>

        <h1 className="mt-4 font-[var(--font-headline)] text-[64px] font-bold leading-[1.04] tracking-[-0.04em]">
          {slide.headline}
        </h1>

        <p className="mt-4 font-[var(--font-body)] text-[26px] leading-snug text-[var(--ink)]/80">
          {slide.subheadline}
        </p>
      </header>

      <div className="my-6 flex min-h-0 flex-1 flex-col justify-between gap-7">
        <div className="flex min-h-0 flex-1 flex-col justify-between rounded-none border border-[var(--border)] bg-[var(--surface)] p-9">
          <div className="shrink-0">
            {t0 && (
              <div
                aria-label={telemetry?.[1]?.badge}
                className="flex items-baseline gap-2 text-[var(--accent)]"
              >
                {t0.qualifier && (
                  <span className="font-[var(--font-body)] text-[22px]">
                    {t0.qualifier}
                  </span>
                )}

                <span className="whitespace-nowrap font-[var(--font-mono)] text-[104px] font-bold leading-none tracking-[-0.055em] tabular-nums">
                  {t0.value}
                </span>

                {t0.unit && (
                  <span className="font-[var(--font-body)] text-[22px]">
                    {t0.unit}
                  </span>
                )}
              </div>
            )}

            <p className="mt-3 font-[var(--font-mono)] text-[22px] uppercase leading-snug tracking-[0.06em] text-[var(--ink)]/70">
              {telemetry?.[0]?.label}
            </p>
          </div>

          <div className="mt-5 flex min-h-0 flex-1 items-center justify-center">
            <svg
              aria-hidden="true"
              focusable="false"
              viewBox="0 0 952 440"
              preserveAspectRatio="xMidYMid meet"
              className="block h-full min-h-0 w-full"
              fill="none"
            >
              {/* A single capped dimension rule spans both categories. */}
              <path
                d="M34 54V380 M24 54H44 M24 380H44"
                stroke="var(--ink)"
                strokeOpacity="0.45"
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
              />

              {/* Upper outlined accounting stratum. */}
              <rect
                x="76"
                y="54"
                width="800"
                height="126"
                fill="var(--surface)"
                stroke="var(--ink)"
                strokeOpacity="0.65"
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
              />

              {/* The incision belongs only to the upper stratum. */}
              <path
                d="M646 54V112"
                stroke="var(--accent)"
                strokeWidth="4"
                vectorEffect="non-scaling-stroke"
              />

              {/* The 74-unit separation is deliberately left untouched. */}
              <rect
                x="76"
                y="254"
                width="800"
                height="126"
                fill="#161820"
                stroke="var(--ink)"
                strokeOpacity="0.35"
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
              />
            </svg>
          </div>
        </div>

        <div className="grid shrink-0 grid-cols-2 divide-x divide-[var(--border)]">
          <article className="flex min-w-0 flex-col gap-3 pr-8">
            <h2 className="font-[var(--font-headline)] text-[32px] font-semibold leading-tight tracking-[-0.025em]">
              {item0?.title}
            </h2>
            <p className="font-[var(--font-body)] text-[24px] leading-snug text-[var(--ink)]/80">
              {renderEmphasis(item0?.body)}
            </p>
          </article>

          <article className="flex min-w-0 flex-col gap-3 pl-8">
            <h2 className="font-[var(--font-headline)] text-[32px] font-semibold leading-tight tracking-[-0.025em]">
              {item1?.title}
            </h2>
            <p className="font-[var(--font-body)] text-[24px] leading-snug text-[var(--ink)]/80">
              {renderEmphasis(item1?.body)}
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}
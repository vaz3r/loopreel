import React from 'react';
import {
  parseMetricBadge,
  type SlideComponentProps,
} from '../../../src/skeleton/types';

export default function Slide01({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  const telemetry = Array.isArray(slide.telemetry) ? slide.telemetry : [];
  const t0 = telemetry ? parseMetricBadge(telemetry?.[0]?.badge) : null;

  const words = (slide.headline ?? '').trim().split(/\s+/);
  const headlineLines = [
    words.slice(0, 2).join(' '),
    words.slice(2, 4).join(' '),
    words.slice(4).join(' '),
  ];

  return (
    <section className="flex flex-col h-full min-h-0 w-full justify-between text-[var(--ink)]">
      <header className="shrink-0">
        <div className="flex items-center gap-2.5 font-[var(--font-mono)] text-[20px] uppercase leading-[1.3] tracking-[0.12em] text-[var(--accent)]">
          <span
            aria-hidden="true"
            className="inline-block h-2.5 w-2.5 shrink-0 bg-[var(--accent)]"
          />
          <span>{slide.kicker}</span>
        </div>

        <h1 className="mt-4 font-[var(--font-headline)] text-[64px] font-bold leading-[1.04] tracking-[-0.04em]">
          <span className="block">{headlineLines[0]}</span>
          <span className="block">{headlineLines[1]}</span>
          <span className="block">{headlineLines[2]}</span>
        </h1>

        <div
          aria-hidden="true"
          className="my-5 w-full border-b border-[var(--border)]"
        />

        {slide.subheadline && (
          <p className="max-w-[880px] font-[var(--font-body)] text-[32px] leading-[1.25] text-[var(--ink)]/80">
            {slide.subheadline}
          </p>
        )}
      </header>

      <div className="relative my-4 flex min-h-[460px] flex-1 items-center justify-center">
        <svg
          aria-hidden="true"
          focusable="false"
          viewBox="0 0 952 650"
          preserveAspectRatio="xMidYMid meet"
          className="absolute inset-0 h-full w-full"
          fill="none"
        >
          <rect width="952" height="650" fill="var(--paper, #0D0E12)" />

          <rect
            x="146"
            y="70"
            width="660"
            height="430"
            fill="var(--surface)"
            stroke="var(--ink)"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
          />

          <path
            d="M146 168H806"
            stroke="var(--accent)"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
          />

          <rect
            x="146"
            y="526"
            width="660"
            height="36"
            fill="var(--surface)"
            stroke="var(--border)"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
          />

          <path
            d="M310 526V562 M638 526V562"
            stroke="var(--border)"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
          />

          <rect
            x="782"
            y="527"
            width="23"
            height="34"
            fill="var(--accent)"
          />

          <path
            d="M120 86V44H162
               M790 44H832V86
               M120 484V526H136
               M816 526H832V484"
            stroke="var(--ink)"
            strokeOpacity="0.5"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
          />

          <path
            d="M874 70V562 M864 70H884 M864 562H884"
            stroke="var(--ink)"
            strokeOpacity="0.5"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
      </div>

      <div className="mt-auto grid shrink-0 grid-cols-[290px_minmax(0,1fr)] items-stretch gap-7 border-t border-[var(--border)] pt-5">
        <div className="flex flex-col justify-between border-r border-[var(--border)] pr-7">
          <p className="max-w-[260px] font-[var(--font-mono)] text-[20px] uppercase leading-[1.5] tracking-[0.1em]">
            {slide.issueBadge}
          </p>
        </div>

        {t0 && (
          <div className="flex min-w-0 items-start justify-between gap-6">
            <div className="flex shrink-0 items-baseline gap-2 text-[var(--accent)]">
              {t0.qualifier && (
                <span className="font-[var(--font-body)] text-[22px]">
                  {t0.qualifier}
                </span>
              )}
              <span className="font-[var(--font-mono)] text-[52px] font-bold leading-none tracking-[-0.04em] tabular-nums">
                {t0.value}
              </span>
              {t0.unit && (
                <span className="font-[var(--font-body)] text-[22px]">
                  {t0.unit}
                </span>
              )}
            </div>

            <p className="min-w-0 flex-1 font-[var(--font-body)] text-[32px] leading-[1.25] text-[var(--ink)]/80">
              {telemetry?.[0]?.label}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
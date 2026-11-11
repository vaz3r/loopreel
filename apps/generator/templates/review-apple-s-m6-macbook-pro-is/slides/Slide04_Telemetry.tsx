import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

const metrics = [
  {
    value: '$1,999',
    label: 'M6 STARTING PRICE',
    context: 'Includes a mandatory 1TB storage allotment.',
    tag: 'ENTRY LEVEL',
  },
  {
    value: '$700',
    label: 'INCREASE OVER M1',
    context: 'Compared with the basic M1 MacBook Pro from 2020.',
    tag: 'PRICE COMPARISON',
  },
  {
    value: '$400',
    label: 'INCREASE OVER M5',
    context: "Compared with the M5 MacBook Pro's starting price a year ago.",
    tag: 'PRICE COMPARISON',
  },
];

export default function Slide04({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  return (
    <section className="flex h-full min-h-0 flex-col gap-8 text-[var(--ink)]">
      <header className="shrink-0 border-t border-[var(--border)] pt-7">
        <h1 className="max-w-[850px] text-balance font-[var(--font-headline)] text-[76px] font-bold leading-[0.99] tracking-[-0.055em]">
          {slide.headline}
        </h1>
      </header>

      <div className="grid min-h-0 flex-1 grid-rows-[1.4fr_1fr_1fr] gap-5">
        <article className="relative isolate grid min-h-0 grid-cols-[1fr_240px] items-center gap-5 overflow-hidden border border-[var(--border)] bg-[var(--surface)] px-9 py-8">
          <div className="absolute inset-y-0 left-0 w-1 bg-[var(--accent)]" />

          <div className="relative z-10 min-w-0">
            <span className="inline-flex border border-[var(--accent)] px-3 py-1.5 font-[var(--font-mono)] text-[14px] leading-none tracking-[0.14em] text-[var(--accent)]">
              {metrics.tag}
            </span>

            <p className="mt-5 whitespace-nowrap font-[var(--font-headline)] text-[116px] font-bold leading-none tracking-[-0.065em] text-[var(--accent)]">
              {metrics.value}
            </p>

            <h2 className="mt-4 font-[var(--font-mono)] text-[18px] font-medium leading-tight tracking-[0.12em]">
              {metrics.label}
            </h2>

            <p className="mt-3 max-w-[460px] font-[var(--font-body)] text-[23px] leading-[1.35]">
              {metrics.context}
            </p>
          </div>

          <svg
            viewBox="0 0 240 260"
            fill="none"
            aria-hidden="true"
            className="h-auto w-full self-center text-[var(--accent)]"
          >
            <g stroke="var(--border)" strokeWidth="1">
              <path d="M16 36H224M16 88H224M16 140H224M16 192H224M16 244H224" />
              <path d="M16 36V244M68 36V244M120 36V244M172 36V244M224 36V244" />
            </g>

            <path
              d="M16 220H70V170H124V112H180V48H220V244H16Z"
              fill="currentColor"
              fillOpacity="0.06"
            />
            <path
              d="M16 220H70V170H124V112H180V48H220"
              stroke="currentColor"
              strokeWidth="4"
              strokeLinejoin="miter"
            />
            <path
              d="M207 35L220 48L207 61"
              stroke="currentColor"
              strokeWidth="4"
            />

            <g fill="var(--surface)" stroke="currentColor" strokeWidth="2">
              <circle cx="70" cy="170" r="5" />
              <circle cx="124" cy="112" r="5" />
            </g>
            <circle cx="180" cy="48" r="11" fill="currentColor" fillOpacity="0.14" />
            <circle cx="180" cy="48" r="5" fill="currentColor" />

            <path
              d="M180 66V244"
              stroke="currentColor"
              strokeOpacity="0.45"
              strokeDasharray="3 6"
            />
          </svg>
        </article>

        {metrics.slice(1).map((metric) => (
          <article
            key={metric.label}
            className="grid min-h-0 grid-cols-[320px_1fr] items-center gap-8 border border-[var(--border)] px-9 py-6"
          >
            <div className="flex min-w-0 items-center gap-4">
              <svg
                viewBox="0 0 32 64"
                fill="none"
                aria-hidden="true"
                className="h-16 w-8 shrink-0 text-[var(--accent)]"
              >
                <path
                  d="M16 57V8M4 20L16 8L28 20"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="square"
                />
                <path
                  d="M4 57H28"
                  stroke="var(--border)"
                  strokeWidth="2"
                />
              </svg>

              <p className="whitespace-nowrap font-[var(--font-headline)] text-[88px] font-bold leading-none tracking-[-0.065em]">
                {metric.value}
              </p>
            </div>

            <div className="min-w-0 border-l border-[var(--border)] pl-8">
              <p className="font-[var(--font-mono)] text-[13px] leading-tight tracking-[0.14em] text-[var(--accent)]">
                {metric.tag}
              </p>
              <h2 className="mt-3 font-[var(--font-mono)] text-[19px] font-medium leading-tight tracking-[0.065em]">
                {metric.label}
              </h2>
              <p className="mt-3 text-pretty font-[var(--font-body)] text-[22px] leading-[1.35]">
                {metric.context}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
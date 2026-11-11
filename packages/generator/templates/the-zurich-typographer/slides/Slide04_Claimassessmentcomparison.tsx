import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

export default function Slide04({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  const statements = [
    {
      entity: 'Donald Trump',
      label: 'February 2026',
      body: 'Said Iran was developing missiles capable of striking the United States.',
    },
    {
      entity: 'US intelligence reports',
      label: '2035',
      body: 'The article says Iran needed until then to build US-threatening missiles.',
    },
  ];

  return (
    <section className="flex flex-col h-full min-h-0 w-full text-[var(--ink)] relative isolate">
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 h-full w-full"
        viewBox="0 0 952 1596"
        preserveAspectRatio="none"
      >
        <rect width="476" height="1596" fill="#FFFFFF" />
        <rect
          x="476"
          width="476"
          height="1596"
          fill="var(--surface, #F5F5F5)"
        />
        <line
          x1="476"
          y1="0"
          x2="476"
          y2="1596"
          stroke="var(--accent, #E60000)"
          strokeWidth="2"
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      <header className="grid shrink-0 grid-cols-2">
        <div className="min-w-0 px-10 pt-12 pb-14">
          <p className="font-[var(--font-mono)] text-[20px] leading-normal tracking-[0.12em] text-[var(--accent)]">
            THE MISSILE QUESTION
          </p>

          <h1 className="mt-16 font-[var(--font-headline)] text-[64px] font-bold leading-[1.04] tracking-[-0.045em]">
            A Claim And An Assessment
          </h1>
        </div>

        <div className="flex min-w-0 items-end px-10 pt-12 pb-14">
          <p className="max-w-[360px] font-[var(--font-body)] text-[28px] leading-[1.4]">
            The article juxtaposes presidential language with an intelligence
            timeline.
          </p>
        </div>
      </header>

      <div className="grid min-h-0 flex-1 grid-cols-2 pt-20">
        {statements.map((statement) => (
          <article
            key={statement.entity}
            className="flex min-w-0 flex-col px-10 pb-12"
          >
            <div className="border-t border-[var(--border)] pt-10">
              <h2 className="min-h-[104px] font-[var(--font-headline)] text-[38px] font-semibold leading-[1.15] tracking-[-0.025em]">
                {statement.entity}
              </h2>

              <p className="mt-6 font-[var(--font-mono)] text-[22px] leading-normal tracking-[0.04em] text-[var(--accent)]">
                {statement.label}
              </p>
            </div>

            <p className="mt-20 font-[var(--font-body)] text-[28px] leading-[1.5]">
              {statement.body}
            </p>

            <svg
              aria-hidden="true"
              className="mt-auto h-[42px] w-full shrink-0 pt-10"
              viewBox="0 0 396 2"
              preserveAspectRatio="none"
            >
              <line
                x1="0"
                y1="1"
                x2="396"
                y2="1"
                stroke="var(--border, #E5E5E5)"
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
              />
            </svg>
          </article>
        ))}
      </div>
    </section>
  );
}
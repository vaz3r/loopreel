import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

export default function Slide03({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  return (
    <section className="flex flex-col h-full min-h-0 w-full text-[var(--ink)]">
      <header className="shrink-0">
        <p className="font-[var(--font-mono)] text-[20px] leading-[28px] tracking-[0.14em] text-[var(--accent)]">
          {slide.kicker}
        </p>

        <h1 className="mt-5 max-w-[920px] font-[var(--font-headline)] text-[64px] font-bold leading-[1.04] tracking-[-0.045em]">
          {slide.headline}
        </h1>

        <p className="mt-6 max-w-[850px] font-[var(--font-body)] text-[28px] leading-snug">
          {slide.subheadline}
        </p>
      </header>

      <figure className="m-0 mt-8 flex min-h-0 flex-1 flex-col">
        <div className="flex flex-1 flex-col justify-center">
          <svg
            viewBox="0 0 952 264"
            className="block h-[264px] w-full shrink-0"
            role="img"
            aria-label="up to 249"
          >
            <text
              x="476"
              y="48"
              textAnchor="middle"
              fill="currentColor"
              className="font-[var(--font-headline)] text-[36px] font-semibold"
            >
              up to
            </text>

            <text
              x="476"
              y="174"
              textAnchor="middle"
              fill="currentColor"
              className="font-[var(--font-mono)] text-[112px] font-bold tracking-[-0.06em] text-[var(--accent)]"
            >
              249
            </text>

            <path
              d="M 88 224 H 864"
              fill="none"
              stroke="var(--accent)"
              strokeWidth="12"
            />

            <path
              d="M 88 204 V 244 M 864 204 V 244"
              fill="none"
              stroke="var(--border)"
              strokeWidth="2"
            />
          </svg>

          <figcaption className="mx-auto max-w-[700px] text-center font-[var(--font-body)] text-[26px] leading-snug">
            Forecast military medium-to-heavy-lift launches through the early
            2030s.
          </figcaption>
        </div>

        <svg
          viewBox="0 0 952 88"
          className="block h-[88px] w-full shrink-0"
          aria-hidden="true"
        >
          <path
            d="M 476 88 V 12 M 461 28 L 476 12 L 491 28"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="3"
            strokeLinecap="square"
            strokeLinejoin="miter"
          />
        </svg>

        <div className="grid shrink-0 grid-cols-[330px_1fr] items-center gap-6 border-y border-[var(--border)] bg-[var(--surface)] px-8 py-6">
          <h2 className="font-[var(--font-headline)] text-[36px] font-semibold leading-[1.1] tracking-[-0.035em] text-[var(--accent)]">
            more than double
          </h2>

          <p className="border-l border-[var(--border)] pl-6 font-[var(--font-body)] text-[24px] leading-snug">
            Compared with Space Systems Command’s expectation just two years ago.
          </p>
        </div>
      </figure>
    </section>
  );
}
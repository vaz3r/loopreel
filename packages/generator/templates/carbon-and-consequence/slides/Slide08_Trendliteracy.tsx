import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

export default function Slide08({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  const headlineId = `${slide.id}-headline`;
  void brand;
  void totalSlides;

  return (
    <section
      aria-labelledby={headlineId}
      className="flex flex-col h-full min-h-0 w-full text-[var(--ink)]"
    >
      <header className="shrink-0">
        <p className="font-[var(--font-mono)] text-[22px] leading-7 tracking-wider text-[var(--accent)]">
          THE INTERPRETATION TRAP
        </p>

        <h1
          id={headlineId}
          className="mt-4 font-[var(--font-headline)] text-[64px] font-bold leading-[1.06] tracking-[-0.035em]"
        >
          One Year Cannot
          <br />
          Establish A Trend
        </h1>

        <p className="mt-5 max-w-[900px] font-[var(--font-body)] text-[28px] leading-[1.35]">
          The article rejects a historical warming claim and cautions against
          declaring an emissions peak.
        </p>
      </header>

      <div className="relative mt-8 h-[650px] w-full shrink-0">
        {/* An editorial chronology, not a shared quantitative data series. */}
        <svg
          aria-hidden="true"
          focusable="false"
          viewBox="0 0 952 650"
          className="pointer-events-none absolute inset-0 h-full w-full"
          fill="none"
        >
          <path
            d="M476 24V120 M476 232V424 M476 536V626"
            stroke="var(--ink)"
            strokeWidth="1.5"
          />

          <path
            d="M465 24H487 M465 626H487"
            stroke="var(--ink)"
            strokeWidth="1.5"
          />

          {/* Equal-sized date nodes keep the two eras visually balanced. */}
          <circle
            cx="476"
            cy="176"
            r="56"
            fill="var(--surface)"
            stroke="var(--ink)"
            strokeWidth="1.5"
          />
          <circle
            cx="476"
            cy="480"
            r="56"
            stroke="var(--accent)"
            strokeWidth="2"
          />

          {/* Separate annotation leaders establish subject-specific notes. */}
          <path
            d="M420 176H388 M388 164V188"
            stroke="var(--ink)"
            strokeWidth="1.5"
          />
          <path
            d="M532 480H564 M564 468V492"
            stroke="var(--accent)"
            strokeWidth="2"
          />

          <text
            x="476"
            y="176"
            textAnchor="middle"
            dominantBaseline="central"
            fill="var(--ink)"
            className="font-[var(--font-mono)] text-[28px] font-bold"
          >
            1998
          </text>
          <text
            x="476"
            y="480"
            textAnchor="middle"
            dominantBaseline="central"
            fill="var(--accent)"
            className="font-[var(--font-mono)] text-[28px] font-bold"
          >
            2026
          </text>
        </svg>

        <article
          aria-labelledby={`${slide.id}-warming`}
          className="absolute left-0 top-[20px] w-[388px] border-l-2 border-[var(--ink)] bg-[var(--surface)] px-7 py-6"
        >
          <h2
            id={`${slide.id}-warming`}
            className="font-[var(--font-headline)] text-[32px] font-semibold leading-[1.15] tracking-[-0.02em]"
          >
            1998 warming
            <br />
            claim
          </h2>
          <div className="my-4 h-px w-12 bg-[var(--border)]" />
          <p className="font-[var(--font-body)] text-[26px] leading-[1.35]">
            La-Niña-dominated years followed a very strong El Niño; warming had
            not ended.
          </p>
        </article>

        <article
          aria-labelledby={`${slide.id}-emissions`}
          className="absolute right-0 top-[340px] w-[388px] border-2 border-[var(--accent)] px-7 py-6"
        >
          <h2
            id={`${slide.id}-emissions`}
            className="font-[var(--font-headline)] text-[32px] font-semibold leading-[1.15] tracking-[-0.02em] text-[var(--accent)]"
          >
            2026 emissions
            <br />
            estimate
          </h2>
          <div className="my-4 h-px w-12 bg-[var(--accent)]" />
          <p className="font-[var(--font-body)] text-[26px] leading-[1.35]">
            The decline is probably temporary, not an established sustained peak.
          </p>
        </article>
      </div>
    </section>
  );
}
import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

export default function Slide05({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  return (
    <section className="flex flex-col h-full min-h-0 w-full text-[var(--ink)]">
      <header className="shrink-0">
        <p className="font-[var(--font-mono)] text-[20px] leading-[26px] tracking-wider text-[var(--accent)]">
          {slide.kicker}
        </p>

        <h1 className="mt-3 max-w-[930px] font-[var(--font-headline)] text-[64px] font-bold leading-[1.04] tracking-[-0.035em]">
          {slide.headline}
        </h1>

        <p className="mt-4 max-w-[880px] font-[var(--font-body)] text-[26px] leading-snug">
          {slide.subheadline}
        </p>
      </header>

      <figure className="m-0 mt-5 flex min-h-0 flex-1 flex-col justify-center">
        <svg
          viewBox="0 0 952 420"
          role="img"
          aria-label="Flight-time limit: 8 minutes."
          className="block h-[420px] w-full shrink-0"
        >
          <title>Flight-time limit: 8 minutes.</title>

          <circle
            cx="476"
            cy="210"
            r="190"
            fill="var(--paper, #E7ECE5)"
            stroke="var(--border, #A0AFA3)"
            strokeWidth="1"
          />

          <circle
            cx="476"
            cy="210"
            r="175"
            fill="none"
            stroke="var(--ink, #182923)"
            strokeWidth="18"
          />

          <circle
            cx="476"
            cy="210"
            r="151"
            fill="none"
            stroke="var(--border, #A0AFA3)"
            strokeWidth="1"
          />

          <path
            d="M 48 210 H 252 M 700 210 H 904"
            fill="none"
            stroke="var(--border, #A0AFA3)"
            strokeWidth="1"
          />

          <path
            d="M 252 200 V 220 M 700 200 V 220"
            fill="none"
            stroke="var(--ink, #182923)"
            strokeWidth="2"
          />

          <path
            d="M 476 15 V 65"
            fill="none"
            stroke="var(--accent, #9B254D)"
            strokeWidth="12"
          />

          <text
            x="476"
            y="143"
            textAnchor="middle"
            fill="var(--ink, #182923)"
            className="font-[var(--font-headline)] text-[32px] font-semibold"
          >
            Flight-time limit
          </text>

          <text
            textAnchor="middle"
            fill="var(--ink, #182923)"
            className="font-[var(--font-mono)] font-bold"
          >
            <tspan x="476" y="260" className="text-[112px]">
              8
            </tspan>
            <tspan x="476" y="310" className="text-[38px]">
              {' minutes.'}
            </tspan>
          </text>
        </svg>

        <figcaption className="mx-auto mt-3 max-w-[820px] text-center font-[var(--font-body)] text-[26px] leading-snug">
          8 minutes on a new, fully-charged battery under controlled conditions.
        </figcaption>
      </figure>

      <aside className="mt-6 shrink-0 border-t border-[var(--border)] bg-[var(--surface)] px-8 py-6">
        <h2 className="font-[var(--font-headline)] text-[32px] font-semibold leading-tight">
          Subscription dependency
        </h2>

        <p className="mt-2 font-[var(--font-body)] text-[26px] leading-snug">
          Set-route and scheduled operation reportedly requires Ring Protect;
          subscription price unspecified.
        </p>
      </aside>
    </section>
  );
}
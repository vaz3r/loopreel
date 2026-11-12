import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

export default function Slide04({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  const milestones = slide.telemetry ?? [];
  const first = milestones;
  const second = milestones;

  return (
    <section className="flex flex-col h-full min-h-0 w-full text-[var(--ink)]">
      <header className="flex shrink-0 flex-col items-start">
        <p className="font-[var(--font-mono)] text-[20px] uppercase tracking-[0.16em] text-[var(--accent)]">
          {slide.kicker}
        </p>

        <div
          aria-hidden="true"
          className="mt-6 h-px w-full bg-[var(--border)]"
        />

        <h1 className="mt-7 max-w-[720px] font-[var(--font-headline)] text-[44px] font-bold leading-[1.08] tracking-[-0.04em]">
          {slide.headline}
        </h1>

        <p className="mt-5 max-w-[760px] font-[var(--font-body)] text-[25px] leading-snug">
          {slide.subheadline}
        </p>
      </header>

      <div className="mt-14 grid h-[612px] shrink-0 grid-cols-[80px_minmax(0,1fr)] grid-rows-[250px_112px_250px]">
        <svg
          aria-hidden="true"
          focusable="false"
          viewBox="0 0 80 612"
          fill="none"
          className="col-start-1 row-start-1 row-end-4 h-full w-[80px] text-[var(--accent)]"
        >
          <path
            d="M24 0V10 M24 30V244 M24 368V372 M24 392V612"
            stroke="currentColor"
            strokeWidth="2"
          />

          <path
            d="M18 250L30 238 M18 374L30 362"
            stroke="currentColor"
            strokeWidth="2"
          />

          <circle
            cx="24"
            cy="20"
            r="10"
            stroke="currentColor"
            strokeWidth="2"
          />
          <circle cx="24" cy="20" r="3" fill="currentColor" />

          <circle
            cx="24"
            cy="382"
            r="10"
            stroke="currentColor"
            strokeWidth="2"
          />
          <circle cx="24" cy="382" r="3" fill="currentColor" />
        </svg>

        <article className="col-start-2 row-start-1 min-w-0 pl-4">
          <p className="max-w-[390px] font-[var(--font-mono)] text-[30px] leading-[1.2] tracking-[-0.025em] text-[var(--accent)]">
            {first?.badge}
          </p>

          <h2 className="mt-5 font-[var(--font-headline)] text-[34px] font-semibold leading-tight tracking-[-0.025em]">
            {first?.label}
          </h2>

          <p className="mt-3 max-w-[650px] font-[var(--font-body)] text-[25px] leading-snug">
            {first?.body}
          </p>
        </article>

        <article className="col-start-2 row-start-3 min-w-0 pl-4">
          <p className="max-w-[390px] font-[var(--font-mono)] text-[30px] leading-[1.2] tracking-[-0.025em] text-[var(--accent)]">
            {second?.badge}
          </p>

          <h2 className="mt-5 font-[var(--font-headline)] text-[34px] font-semibold leading-tight tracking-[-0.025em]">
            {second?.label}
          </h2>

          <p className="mt-3 max-w-[650px] font-[var(--font-body)] text-[25px] leading-snug">
            {second?.body}
          </p>
        </article>
      </div>
    </section>
  );
}
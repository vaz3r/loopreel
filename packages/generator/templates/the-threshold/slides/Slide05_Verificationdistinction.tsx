import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

export default function Slide05({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  const verification = slide.items?.[0];
  const finding = slide.items?.[1];

  return (
    <section className="flex flex-col h-full min-h-0 w-full text-[var(--ink)]">
      <header className="flex flex-col gap-5">
        <p className="font-[var(--font-mono)] text-[20px] leading-7 tracking-[0.14em] text-[var(--accent)]">
          {slide.kicker}
        </p>

        <h1 className="max-w-[920px] font-[var(--font-headline)] text-[64px] font-bold leading-[1.04] tracking-[-0.035em]">
          {slide.headline}
        </h1>

        <p className="max-w-[880px] font-[var(--font-body)] text-[28px] leading-snug">
          {slide.subheadline}
        </p>
      </header>

      <div className="mt-10 grid h-[560px] shrink-0 grid-cols-[568px_1px_minmax(0,1fr)] gap-x-10">
        <div className="relative h-full">
          <svg
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 h-full w-full"
            viewBox="0 0 568 560"
            fill="none"
          >
            {/* Open outer ledger: unresolved edges remain dashed. */}
            <path
              d="M 46 14 H 554 V 492"
              stroke="var(--border)"
              strokeWidth="2"
              strokeDasharray="10 9"
            />
            <path
              d="M 14 66 V 546 H 502"
              stroke="var(--border)"
              strokeWidth="2"
            />
            <path
              d="M 14 14 H 34 M 14 14 V 38"
              stroke="var(--accent)"
              strokeWidth="3"
              strokeLinecap="square"
            />

            {/* Nested outline, deliberately incomplete at its corners. */}
            <path
              d="M 76 54 H 514 V 466"
              stroke="var(--border)"
              strokeWidth="2"
              strokeDasharray="6 8"
            />
            <path
              d="M 54 104 V 506 H 466"
              stroke="var(--border)"
              strokeWidth="2"
            />

            {/* Quiet ledger ruling beneath the statement. */}
            <path
              d="M 88 400 H 474 M 88 442 H 474"
              stroke="var(--border)"
              strokeWidth="1"
            />
            <path
              d="M 88 358 H 474"
              stroke="var(--border)"
              strokeWidth="1"
              strokeDasharray="6 8"
            />
          </svg>

          <div className="relative flex h-full flex-col px-[88px] pt-[100px]">
            <h2 className="font-[var(--font-headline)] text-[36px] font-semibold leading-[1.12] tracking-[-0.025em]">
              {verification?.label}
            </h2>

            <p className="mt-7 font-[var(--font-body)] text-[28px] leading-snug">
              {verification?.body}
            </p>
          </div>
        </div>

        {/* A boundary, not an arrow or an implied causal connection. */}
        <div
          aria-hidden="true"
          className="my-[54px] w-px bg-[var(--border)]"
        />

        <aside className="flex min-w-0 flex-col pt-[100px]">
          <span
            aria-hidden="true"
            className="mb-7 h-[3px] w-12 bg-[var(--accent)]"
          />

          <h2 className="font-[var(--font-headline)] text-[34px] font-semibold leading-[1.12] tracking-[-0.025em] text-[var(--accent)]">
            {finding?.label}
          </h2>

          <p className="mt-7 font-[var(--font-body)] text-[28px] leading-snug">
            {finding?.body}
          </p>
        </aside>
      </div>
    </section>
  );
}
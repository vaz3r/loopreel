import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

function emphasizeDates(copy: string) {
  return copy.split(/(February 2026|2035)/g).map((part, index) =>
    part === 'February 2026' || part === '2035' ? (
      <strong
        key={index}
        className="font-[var(--font-mono)] font-bold text-[var(--accent)]"
      >
        {part}
      </strong>
    ) : (
      <React.Fragment key={index}>{part}</React.Fragment>
    ),
  );
}

export default function Slide04({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  void brand;
  void totalSlides;

  return (
    <section className="flex flex-col h-full min-h-0 w-full text-[var(--ink)]">
      <header className="shrink-0 border-t-2 border-[var(--ink)] pt-6">
        <p className="font-[var(--font-mono)] text-[22px] font-medium tracking-[0.14em] text-[var(--accent)]">
          {slide.kicker}
        </p>

        <h1 className="mt-7 max-w-[900px] font-[var(--font-headline)] text-[68px] font-bold leading-[1.03] tracking-[-0.045em]">
          {slide.headline}
        </h1>

        <p className="mt-7 max-w-[800px] font-[var(--font-body)] text-[28px] leading-snug">
          {slide.subheadline}
        </p>
      </header>

      <div className="relative mt-12 h-[1000px] w-full shrink-0">
        <svg
          aria-hidden="true"
          focusable="false"
          viewBox="0 0 952 1000"
          preserveAspectRatio="none"
          className="pointer-events-none absolute inset-0 h-full w-full"
          fill="none"
        >
          {/* Central divider: no ticks, dates, or proportional time axis. */}
          <path
            d="M476 24V976"
            stroke="#000000"
            strokeWidth="4"
          />

          {/* Left-facing bracket and its connection to the central rule. */}
          <path
            d="M396 100H430V430H396"
            stroke="#000000"
            strokeWidth="3"
            strokeLinejoin="miter"
          />
          <path
            d="M430 265H476"
            stroke="#000000"
            strokeWidth="3"
          />
          <path
            d="M396 100H416 M396 430H416"
            stroke="#E60000"
            strokeWidth="5"
            strokeLinecap="square"
          />

          {/* Right-facing bracket and its connection to the central rule. */}
          <path
            d="M556 550H522V880H556"
            stroke="#000000"
            strokeWidth="3"
            strokeLinejoin="miter"
          />
          <path
            d="M476 715H522"
            stroke="#000000"
            strokeWidth="3"
          />
          <path
            d="M536 550H556 M536 880H556"
            stroke="#E60000"
            strokeWidth="5"
            strokeLinecap="square"
          />
        </svg>

        <article className="absolute left-0 top-[100px] w-[38.45%]">
          <h2 className="font-[var(--font-headline)] text-[38px] font-semibold leading-tight tracking-[-0.025em]">
            {slide.items?.[0]?.title}
          </h2>

          <p className="mt-7 font-[var(--font-body)] text-[28px] leading-normal">
            {emphasizeDates(slide.items?.[0]?.body ?? '')}
          </p>
        </article>

        <article className="absolute right-0 top-[550px] w-[38.45%]">
          <h2 className="font-[var(--font-headline)] text-[38px] font-semibold leading-tight tracking-[-0.025em]">
            {slide.items?.[1]?.title}
          </h2>

          <p className="mt-7 font-[var(--font-body)] text-[28px] leading-normal">
            {emphasizeDates(slide.items?.[1]?.body ?? '')}
          </p>
        </article>
      </div>
    </section>
  );
}
import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

export default function Slide03({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  void brand;
  void totalSlides;

  const items = [
    {
      label: 'February 2026',
      body: 'Trump said Iran was developing missiles capable of striking the United States.',
    },
    {
      label: '2035',
      body: 'Reported US intelligence assessment: Iran needed until 2035 to build US-threatening missiles.',
    },
  ];

  return (
    <section className="flex flex-col h-full min-h-0 w-full text-[var(--ink)]">
      <header className="shrink-0">
        <p className="font-[var(--font-mono)] text-[22px] uppercase leading-snug tracking-[0.14em] text-[var(--accent)]">
          {slide.kicker}
        </p>

        <h2 className="mt-6 max-w-[920px] font-[var(--font-headline)] text-[64px] font-bold leading-[1.06] tracking-[-0.035em]">
          {slide.headline}
        </h2>

        <p className="mt-7 max-w-[850px] font-[var(--font-body)] text-[26px] leading-normal">
          {slide.subheadline}
        </p>
      </header>

      <div className="relative mt-14 grid min-h-[480px] flex-1 grid-cols-2">
        <svg
          aria-hidden="true"
          focusable="false"
          className="pointer-events-none absolute inset-0 h-full w-full"
          viewBox="0 0 952 560"
          preserveAspectRatio="none"
          fill="none"
        >
          {/* Opposing open brackets frame independent statements. */}
          <path
            d="M 34 32 H 2 V 528 H 34"
            stroke="var(--border)"
            strokeWidth="3"
            vectorEffect="non-scaling-stroke"
          />
          <path
            d="M 918 32 H 950 V 528 H 918"
            stroke="var(--border)"
            strokeWidth="3"
            vectorEffect="non-scaling-stroke"
          />

          {/* A neutral separator, not a timeline or directional relationship. */}
          <path
            d="M 476 32 V 528"
            stroke="var(--accent)"
            strokeWidth="2"
            vectorEffect="non-scaling-stroke"
          />
        </svg>

        {items.map((item, index) => (
          <article
            key={item.label}
            className="relative flex min-w-0 flex-col px-12 pb-16 pt-20"
          >
            <h3
              className={`font-[var(--font-mono)] text-[34px] font-semibold leading-tight tracking-[-0.025em] ${
                index === 0
                  ? 'text-[var(--ink)]'
                  : 'text-[var(--accent)]'
              }`}
            >
              {item.label}
            </h3>

            <p className="mt-9 font-[var(--font-body)] text-[28px] leading-[1.5]">
              {item.body}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
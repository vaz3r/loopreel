import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

export default function Slide04({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  void brand;
  void totalSlides;

  return (
    <section
      className="flex flex-col h-full min-h-0 w-full text-[var(--ink)]"
      aria-labelledby={`${slide.id}-headline`}
    >
      <header className="shrink-0">
        <p className="font-[var(--font-mono)] text-[22px] leading-normal tracking-wider text-[var(--accent)]">
          NOT ANOTHER LOCKDOWN
        </p>

        <h2
          id={`${slide.id}-headline`}
          className="mt-5 max-w-[920px] font-[var(--font-headline)] text-[64px] font-bold leading-[1.05] tracking-[-0.035em]"
        >
          Demand Grew Through The Decline
        </h2>

        <p className="mt-6 max-w-[850px] font-[var(--font-body)] text-[28px] leading-snug">
          Clean technologies covered almost 70 percent of energy-demand
          growth.
        </p>
      </header>

      <figure className="m-0 flex min-h-0 flex-1 items-center py-8">
        <svg
          viewBox="0 0 952 310"
          className="block h-[310px] w-full shrink-0"
          role="img"
          aria-labelledby={`${slide.id}-ribbon-title`}
        >
          <title id={`${slide.id}-ribbon-title`}>
            Clean technologies covered almost 70 percent of energy-demand
            growth.
          </title>

          {/* The entire ribbon represents growth, not total energy demand. */}
          <path
            d="M1 42H951"
            fill="none"
            stroke="var(--border)"
            strokeWidth="2"
          />
          <path
            d="M1 32V52M951 32V52"
            fill="none"
            stroke="var(--border)"
            strokeWidth="2"
          />

          <rect
            x="0"
            y="76"
            width="952"
            height="196"
            fill="var(--surface)"
          />
          <rect
            x="0"
            y="76"
            width="656.88"
            height="196"
            fill="var(--accent)"
          />

          <text
            x="36"
            y="174"
            dominantBaseline="middle"
            fill="var(--paper, #EBD4C3)"
            className="font-[var(--font-mono)] text-[38px] font-bold"
          >
            almost 70 percent
          </text>

          <path
            d="M656.88 272V296"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="2"
          />
        </svg>
      </figure>

      <div className="grid shrink-0 grid-cols-2 pb-6">
        <article className="pr-10">
          <h3 className="font-[var(--font-mono)] text-[36px] font-semibold leading-tight">
            2020
          </h3>
          <p className="mt-5 max-w-[370px] font-[var(--font-body)] text-[26px] leading-snug">
            The pandemic drove the emissions decline.
          </p>
        </article>

        <article className="border-l-2 border-[var(--ink)] pl-10">
          <h3 className="font-[var(--font-mono)] text-[36px] font-semibold leading-tight text-[var(--accent)]">
            2026
          </h3>
          <p className="mt-5 max-w-[390px] font-[var(--font-body)] text-[26px] leading-snug">
            Energy demand increased despite the estimated emissions decline.
          </p>
        </article>
      </div>
    </section>
  );
}
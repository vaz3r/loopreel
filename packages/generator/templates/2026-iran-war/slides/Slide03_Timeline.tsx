import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

export default function Slide03({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  const telemetry = slide.telemetry ?? [];
  const destruction = telemetry[0];
  const reconstruction = telemetry[1];

  return (
    <section className="flex flex-col h-full min-h-0 w-full text-[var(--ink)]">
      <header className="flex shrink-0 flex-col items-start">
        <div className="mb-6 flex w-full items-center gap-5">
          <p className="shrink-0 font-[var(--font-mono)] text-[22px] uppercase leading-tight tracking-[0.12em] text-[var(--accent)]">
            {slide.kicker}
          </p>
          <span
            aria-hidden="true"
            className="h-px flex-1 bg-[var(--border)]"
          />
        </div>

        <h1 className="max-w-[920px] font-[var(--font-headline)] text-[44px] font-bold leading-[1.08] tracking-[-0.035em]">
          {slide.headline}
        </h1>

        <p className="mt-6 max-w-[880px] font-[var(--font-body)] text-[28px] leading-snug">
          {slide.subheadline}
        </p>
      </header>

      <div className="flex min-h-0 flex-1 items-center">
        <div className="relative isolate grid h-[560px] w-full shrink-0 grid-cols-[452fr_500fr]">
          <svg
            aria-hidden="true"
            focusable="false"
            viewBox="0 0 952 560"
            preserveAspectRatio="none"
            className="pointer-events-none absolute inset-0 -z-10 h-full w-full"
          >
            {/* Two broad stone terraces: sequence, not a measured scale. */}
            <path
              d="M0 486H424L439 501L430 521L444 542L435 560H0Z"
              fill="var(--surface)"
            />
            <path
              d="M476 286H952V560H457L466 539L452 520L463 498L452 480V316Z"
              fill="var(--surface)"
            />

            {/* Ink chronology breaks at the fracture. */}
            <path
              d="M0 486H424L437 498"
              fill="none"
              stroke="var(--ink)"
              strokeWidth="4"
              strokeLinecap="square"
            />
            <path
              d="M452 456V316L476 286H952"
              fill="none"
              stroke="var(--accent)"
              strokeWidth="4"
              strokeLinecap="square"
            />

            {/* Sparse, angular stone seams. */}
            <g
              fill="none"
              stroke="var(--border)"
              strokeWidth="2"
              strokeLinejoin="miter"
            >
              <path d="M24 522H188L211 545H382" />
              <path d="M126 486L143 505L132 522" />
              <path d="M500 326H718L740 346H928" />
              <path d="M789 286L773 308L789 326" />
              <path d="M492 402H616L641 423H904" />
              <path d="M584 402L571 435L591 463L578 494" />
              <path d="M490 520H720L744 540H928" />
            </g>

            <path
              d="M416 467L430 452M430 477L446 469"
              fill="none"
              stroke="var(--ink)"
              strokeWidth="2"
            />
            <circle cx="500" cy="286" r="7" fill="var(--accent)" />
          </svg>

          <article className="min-w-0 px-6 pt-[272px]">
            <p className="font-[var(--font-mono)] text-[38px] font-semibold leading-[1.15] tracking-[-0.035em]">
              {destruction?.badge}
            </p>

            <h2 className="mt-4 font-[var(--font-headline)] text-[32px] font-semibold leading-[1.15] tracking-[-0.025em]">
              {destruction?.label}
            </h2>

            <p className="mt-3 max-w-[365px] font-[var(--font-body)] text-[25px] leading-snug">
              {destruction?.body}
            </p>
          </article>

          <article className="min-w-0 pl-12 pr-6 pt-4">
            <p className="whitespace-nowrap font-[var(--font-mono)] text-[38px] font-semibold leading-[1.15] tracking-[-0.035em] text-[var(--accent)]">
              {reconstruction?.badge}
            </p>

            <h2 className="mt-4 max-w-[410px] font-[var(--font-headline)] text-[32px] font-semibold leading-[1.15] tracking-[-0.025em]">
              {reconstruction?.label}
            </h2>

            <p className="mt-3 max-w-[410px] font-[var(--font-body)] text-[25px] leading-snug">
              {reconstruction?.body}
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}
import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

export default function Slide01({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  return (
    <section className="flex flex-col h-full min-h-0 w-full text-[var(--ink)]">
      <div className="flex items-center gap-4">
        <span
          aria-hidden="true"
          className="h-[10px] w-[10px] bg-[var(--accent)]"
        />
        <p className="font-[var(--font-mono)] text-[22px] leading-none tracking-[0.18em] text-[var(--accent)]">
          {slide.kicker}
        </p>
        <span
          aria-hidden="true"
          className="h-px flex-1 bg-[var(--border)]"
        />
      </div>

      <h1 className="mt-7 max-w-[880px] font-[var(--font-headline)] text-[68px] font-bold leading-[1.04] tracking-[-0.045em]">
        {slide.headline}
      </h1>

      <p className="mt-6 max-w-[820px] font-[var(--font-body)] text-[28px] leading-[1.4]">
        {slide.subheadline}
      </p>

      <div className="relative mt-7 h-[560px] w-full shrink-0">
        <svg
          aria-hidden="true"
          className="absolute inset-0 h-full w-full"
          viewBox="0 0 952 560"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Quiet ground plane: an abstract origin, not a launch pad. */}
          <path
            d="M312 514H640"
            stroke="var(--border)"
            strokeWidth="1"
          />
          <path
            d="M376 530H576"
            stroke="var(--border)"
            strokeWidth="1"
          />
          <ellipse
            cx="476"
            cy="499"
            rx="54"
            ry="15"
            fill="var(--surface)"
            stroke="var(--border)"
            strokeWidth="1.5"
          />

          {/* A single conditional capital-flow stem. */}
          <path
            d="M476 493V394"
            stroke="var(--accent)"
            strokeWidth="4"
            strokeDasharray="10 12"
            strokeLinecap="round"
          />

          {/* Diverging commitments remain dashed throughout. */}
          <path
            d="M476 394C476 331 361 319 327 242C310 204 310 160 310 130"
            stroke="var(--accent)"
            strokeWidth="4"
            strokeDasharray="10 12"
            strokeLinecap="round"
          />
          <path
            d="M476 394C476 331 591 319 625 242C642 204 642 160 642 130"
            stroke="var(--accent)"
            strokeWidth="4"
            strokeDasharray="10 12"
            strokeLinecap="round"
          />

          {/* Outside-facing callout pointers. */}
          <path
            d="M310 130H280M642 130H672"
            stroke="var(--accent)"
            strokeWidth="2"
            strokeDasharray="5 7"
            strokeLinecap="round"
          />

          <circle
            cx="310"
            cy="130"
            r="10"
            fill="var(--paper, #0C1621)"
            stroke="var(--accent)"
            strokeWidth="2.5"
          />
          <circle
            cx="642"
            cy="130"
            r="10"
            fill="var(--paper, #0C1621)"
            stroke="var(--accent)"
            strokeWidth="2.5"
          />

          <circle
            cx="476"
            cy="394"
            r="8"
            fill="var(--paper, #0C1621)"
            stroke="var(--accent)"
            strokeWidth="2.5"
          />
          <circle cx="476" cy="499" r="6" fill="var(--accent)" />
        </svg>

        <div className="absolute left-0 top-[105px] w-[264px]">
          <h2 className="font-[var(--font-headline)] text-[36px] font-semibold leading-[1.15] tracking-[-0.035em]">
            Stoke Space
          </h2>
          <div className="mt-5 h-px w-12 bg-[var(--accent)]" />
          <p className="mt-5 font-[var(--font-body)] text-[26px] leading-[1.4]">
            Additional launch infrastructure for Nova Block 2.
          </p>
        </div>

        <div className="absolute right-0 top-[105px] w-[264px]">
          <h2 className="font-[var(--font-headline)] text-[36px] font-semibold leading-[1.15] tracking-[-0.035em]">
            Rocket Lab
          </h2>
          <div className="mt-5 h-px w-12 bg-[var(--accent)]" />
          <p className="mt-5 font-[var(--font-body)] text-[26px] leading-[1.4]">
            Production, recovery, and processing upgrades for Neutron.
          </p>
        </div>
      </div>
    </section>
  );
}

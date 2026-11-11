import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

export default function Slide10({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  return (
    <section className="flex flex-col h-full min-h-0 w-full text-[var(--ink)]">
      <div className="flex min-h-0 flex-1 flex-col pb-12">
        <p className="font-[var(--font-mono)] text-[22px] leading-normal tracking-wider text-[var(--accent)]">
          {slide.kicker}
        </p>

        <h1 className="mt-14 font-[var(--font-headline)] text-[68px] font-bold leading-[1.06] tracking-[-0.035em]">
          <span className="block">Progress Is Real.</span>
          <span className="mt-3 block">Permanence Is</span>
          <span className="block">Unproven.</span>
        </h1>

        <p className="mt-10 max-w-[800px] font-[var(--font-body)] text-[28px] leading-snug">
          {slide.subheadline}
        </p>
      </div>

      <div className="relative shrink-0 border-t border-[var(--surface)] py-7 pl-[84px]">
        <svg
          aria-hidden="true"
          focusable="false"
          className="pointer-events-none absolute bottom-7 left-0 top-7 h-[calc(100%-56px)] w-[56px] text-[var(--accent)]"
          viewBox="0 0 56 300"
          fill="none"
          preserveAspectRatio="none"
        >
          <path
            d="M 50 7 H 12 V 293 H 38"
            stroke="currentColor"
            strokeWidth="5"
            strokeLinecap="butt"
            strokeLinejoin="miter"
            vectorEffect="non-scaling-stroke"
          />
        </svg>

        <div className="flex flex-col">
          <div className="pb-6">
            <h2 className="font-[var(--font-headline)] text-[34px] font-semibold leading-tight tracking-[-0.02em]">
              What the evidence supports
            </h2>
            <p className="mt-3 max-w-[820px] font-[var(--font-body)] text-[26px] leading-snug">
              Clean technologies slowed emissions growth while energy demand
              continued rising.
            </p>
          </div>

          <div className="border-t border-[var(--surface)] pt-6">
            <h2 className="font-[var(--font-headline)] text-[34px] font-semibold leading-tight tracking-[-0.02em]">
              What remains conditional
            </h2>
            <p className="mt-3 max-w-[820px] font-[var(--font-body)] text-[26px] leading-snug">
              A sustained peak and decline requires further deployment
              acceleration over time.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
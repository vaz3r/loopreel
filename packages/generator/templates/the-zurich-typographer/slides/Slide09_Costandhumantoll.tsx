import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

export default function Slide09({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  void brand;
  void totalSlides;

  const cost = slide.items?.[0];
  const toll = slide.items?.[1];

  return (
    <section className="flex flex-col h-full min-h-0 w-full text-[var(--ink)]">
      <div className="flex h-full min-h-0 w-full flex-col bg-[#FFFFFF]">
        <div className="shrink-0">
          <p className="font-[var(--font-mono)] text-[22px] font-medium uppercase leading-normal tracking-[0.16em] text-[var(--accent)]">
            {slide.kicker}
          </p>

          <h1 className="mt-9 max-w-[920px] font-[var(--font-headline)] text-[68px] font-bold leading-[1.04] tracking-[-0.045em]">
            {slide.headline}
          </h1>

          <p className="mt-8 max-w-[790px] font-[var(--font-body)] text-[28px] leading-snug">
            {slide.subheadline}
          </p>
        </div>

        <div className="flex flex-1 flex-col justify-center py-20">
          <p className="whitespace-nowrap font-[var(--font-mono)] text-[112px] font-bold leading-[1.06] tracking-[-0.075em] text-[#000000]">
            {cost?.label}
          </p>

          <div className="mt-7 max-w-[850px] border-l-2 border-[var(--border)] pl-7">
            <p className="font-[var(--font-body)] text-[26px] leading-normal">
              {cost?.body}
            </p>
          </div>
        </div>

        <div className="mb-20 w-full shrink-0 bg-[var(--surface)]">
          <svg
            className="block h-[6px] w-full"
            viewBox="0 0 952 6"
            preserveAspectRatio="none"
            aria-hidden="true"
            focusable="false"
          >
            <path d="M0 3H952" stroke="#E60000" strokeWidth="6" />
          </svg>

          <div className="px-10 py-12">
            <h2 className="font-[var(--font-headline)] text-[38px] font-semibold leading-tight tracking-[-0.025em]">
              {toll?.label}
            </h2>

            <p className="mt-6 max-w-[800px] font-[var(--font-body)] text-[28px] leading-normal">
              {toll?.body}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
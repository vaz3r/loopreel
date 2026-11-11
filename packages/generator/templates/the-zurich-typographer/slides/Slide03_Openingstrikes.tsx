import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

export default function Slide03({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  const fadeId = `strike-fade-${React.useId().replace(/:/g, '')}`;
  const opening = slide.items?.[0];
  const qualification = slide.items?.[1];

  return (
    <section className="flex flex-col h-full min-h-0 w-full text-[var(--ink)]">
      <div className="flex flex-col gap-7">
        <p className="font-[var(--font-mono)] text-[22px] uppercase leading-normal tracking-[0.16em] text-[var(--accent)]">
          {slide.kicker}
        </p>

        <h1 className="max-w-[900px] font-[var(--font-headline)] text-[68px] font-bold leading-[1.04] tracking-[-0.045em]">
          {slide.headline}
        </h1>

        <p className="max-w-[820px] font-[var(--font-body)] text-[28px] leading-snug">
          {slide.subheadline}
        </p>
      </div>

      <div className="mt-16 border-t-2 border-[#000000] pt-10">
        <div className="flex min-h-[430px] flex-col justify-center">
          <h2 className="max-w-[850px] font-[var(--font-headline)] text-[112px] font-bold leading-[1.03] tracking-[-0.055em] text-[#000000]">
            {opening?.title}
          </h2>

          <p className="mt-10 max-w-[740px] font-[var(--font-body)] text-[28px] leading-snug">
            {opening?.body}
          </p>
        </div>

        <div className="mt-10 border-t border-[var(--border)]" />
      </div>

      <div className="mt-16 grid min-h-[350px] grid-cols-[300px_minmax(0,1fr)] items-center gap-6 bg-[var(--surface)] bg-[#F5F5F5] py-10 pr-8">
        <svg
          viewBox="0 0 300 160"
          className="h-[160px] w-full"
          fill="none"
          aria-hidden="true"
          focusable="false"
        >
          <defs>
            <linearGradient
              id={fadeId}
              x1="174"
              y1="80"
              x2="300"
              y2="80"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0" stopColor="#E60000" stopOpacity="1" />
              <stop offset="0.55" stopColor="#E60000" stopOpacity="0.55" />
              <stop offset="1" stopColor="#E60000" stopOpacity="0" />
            </linearGradient>
          </defs>

          <path
            d="M0 80H174"
            stroke="#E60000"
            strokeWidth="14"
            strokeLinecap="butt"
          />
          <path
            d="M174 80H300"
            stroke={`url(#${fadeId})`}
            strokeWidth="14"
            strokeDasharray="24 14"
            strokeLinecap="butt"
          />
        </svg>

        <div className="min-w-0 py-5">
          <h2 className="font-[var(--font-headline)] text-[38px] font-semibold leading-tight tracking-[-0.025em]">
            {qualification?.title}
          </h2>

          <p className="mt-6 font-[var(--font-body)] text-[28px] leading-normal">
            {qualification?.body}
          </p>
        </div>
      </div>
    </section>
  );
}
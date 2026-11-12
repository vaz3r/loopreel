import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

export default function Slide10({
  slide,
}: SlideComponentProps) {
  const items = slide.items ?? [];

  return (
    <section className="flex flex-col h-full min-h-0 w-full text-[var(--ink)]">
      <header className="shrink-0">
        <p className="font-[var(--font-mono)] text-[22px] leading-normal tracking-[0.14em] text-[var(--accent)]">
          {slide.kicker}
        </p>

        <h1 className="mt-7 max-w-[920px] font-[var(--font-headline)] text-[64px] font-bold leading-[1.06] tracking-[-0.045em]">
          {slide.headline}
        </h1>

        <p className="mt-7 max-w-[820px] font-[var(--font-body)] text-[28px] leading-snug">
          {slide.subheadline}
        </p>
      </header>

      <div className="relative mt-12 h-[1040px] w-full shrink-0">
        <svg
          className="pointer-events-none absolute inset-0 h-full w-full"
          viewBox="0 0 952 1040"
          fill="none"
          aria-hidden="true"
          focusable="false"
        >
          {/* A pale editorial field, not a containing card. */}
          <path d="M0 0H590V1010H0V0Z" fill="#F5F5F5" />

          {/* Oversized source sheet with a deliberately incomplete foot. */}
          <path
            d="M42 944V44H448L550 146V929L484 946L406 932L329 952L253 938L176 956L108 940L42 954Z"
            fill="#FFFFFF"
          />
          <path
            d="M42 944V44H448L550 146V929"
            stroke="#000000"
            strokeWidth="3"
            strokeLinecap="square"
          />
          <path
            d="M448 44V146H550"
            stroke="#000000"
            strokeWidth="3"
          />

          {/* Unlabelled document rules; no fabricated source text. */}
          <path
            d="M89 211H409"
            stroke="#000000"
            strokeWidth="8"
          />
          <path
            d="M89 244H337"
            stroke="#000000"
            strokeWidth="4"
          />
          <path
            d="M89 306H498"
            stroke="#000000"
            strokeWidth="2"
          />

          <g stroke="#000000" strokeWidth="2" opacity="0.24">
            <path d="M89 370H498" />
            <path d="M89 405H498" />
            <path d="M89 440H498" />
            <path d="M89 475H405" />

            <path d="M89 554H498" />
            <path d="M89 589H498" />
            <path d="M89 624H498" />
            <path d="M89 659H444" />

            <path d="M89 738H498" />
            <path d="M89 773H498" />
            <path d="M89 808H498" />
            <path d="M89 843H364" />
          </g>

          {/* Separated fragments leave the lower boundary unresolved. */}
          <g stroke="#000000" strokeWidth="3" strokeLinecap="square">
            <path d="M42 944L103 950" />
            <path d="M146 946L209 952" />
            <path d="M255 947L296 951" />
          </g>

          {/* Two precise red leaders terminate beside the margin notes. */}
          <g stroke="#E60000" strokeWidth="2">
            <path d="M411 211H576V190H620" />
            <path d="M411 199V223" />

            <path d="M367 843H576V657H620" />
            <path d="M367 831V855" />
          </g>
        </svg>

        <aside
          className="absolute left-[66.8%] right-0 top-[174px]"
          aria-labelledby="slide-10-provenance"
        >
          <h2
            id="slide-10-provenance"
            className="font-[var(--font-headline)] text-[32px] font-semibold leading-tight tracking-[-0.025em]"
          >
            {items?.[0]?.label}
          </h2>
          <p className="mt-5 font-[var(--font-body)] text-[26px] leading-[1.4]">
            {items?.[0]?.body}
          </p>
        </aside>

        <aside
          className="absolute left-[66.8%] right-0 top-[641px]"
          aria-labelledby="slide-10-completeness"
        >
          <h2
            id="slide-10-completeness"
            className="font-[var(--font-headline)] text-[32px] font-semibold leading-tight tracking-[-0.025em]"
          >
            {items?.[1]?.label}
          </h2>
          <p className="mt-5 font-[var(--font-body)] text-[26px] leading-[1.4]">
            {items?.[1]?.body}
          </p>
        </aside>
      </div>
    </section>
  );
}
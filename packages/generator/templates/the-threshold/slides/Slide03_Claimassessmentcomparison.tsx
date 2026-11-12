import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

export default function Slide03({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  void brand;
  void totalSlides;

  const items = slide.items ?? [
    {
      label: 'Trump · February 2026',
      body: 'Asserted Iran was developing missiles capable of striking the US.',
    },
    {
      label: 'US intelligence reports · 2035',
      body: 'The excerpt says Iran needed until this year to build such missiles.',
    },
  ];

  return (
    <section className="flex flex-col h-full min-h-0 w-full text-[var(--ink)]">
      <div className="shrink-0">
        <p className="font-[var(--font-mono)] text-[22px] leading-[30px] tracking-[0.14em] text-[var(--accent)]">
          {slide.kicker ?? 'THE MISSILE QUESTION'}
        </p>

        <h1 className="mt-6 max-w-[900px] font-[var(--font-headline)] text-[64px] font-bold leading-[1.04] tracking-[-0.045em]">
          {slide.headline ??
            'A Presidential Claim, An Intelligence Timeline'}
        </h1>

        <p className="mt-6 max-w-[840px] font-[var(--font-body)] text-[28px] leading-[1.4]">
          {slide.subheadline ??
            "The excerpt juxtaposes Trump's assertion with a reported US intelligence assessment."}
        </p>
      </div>

      <div className="relative mt-auto h-[560px] w-full shrink-0">
        <svg
          className="pointer-events-none absolute inset-0 h-full w-full"
          viewBox="0 0 952 560"
          fill="none"
          aria-hidden="true"
        >
          {/* Shared alignment rail: categorical, deliberately unticked. */}
          <path
            d="M16 24V516"
            stroke="var(--border)"
            strokeWidth="2"
          />

          {/* Wide, square-edged editorial bands. */}
          <path
            d="M44 24H876V240H44Z"
            fill="var(--surface)"
          />
          <path
            d="M44 300H876V516H44Z"
            fill="var(--surface)"
          />

          <path
            d="M44 24H876M44 240H876M44 300H876M44 516H876"
            stroke="var(--border)"
            strokeWidth="2"
          />

          {/* Both entities originate on the same left rail. */}
          <path
            d="M16 78H44M16 354H44"
            stroke="var(--ink)"
            strokeWidth="2"
          />
          <rect
            x="11"
            y="73"
            width="10"
            height="10"
            fill="var(--ink)"
          />
          <rect
            x="11"
            y="349"
            width="10"
            height="10"
            fill="var(--ink)"
          />

          {/* A comparison bracket, not a measured interval or trajectory. */}
          <path
            d="M884 78H922V354H884"
            stroke="var(--accent, #FF4D00)"
            strokeWidth="4"
            strokeLinecap="square"
            strokeLinejoin="miter"
          />
        </svg>

        <div className="absolute left-[76px] right-[110px] top-[60px]">
          <p className="font-[var(--font-mono)] text-[22px] leading-[36px] tracking-[0.015em] text-[var(--accent)]">
            {items?.label ?? 'Trump · February 2026'}
          </p>
          <p className="mt-5 max-w-[690px] font-[var(--font-body)] text-[28px] leading-[1.4]">
            {items?.body ??
              'Asserted Iran was developing missiles capable of striking the US.'}
          </p>
        </div>

        <div className="absolute left-[76px] right-[110px] top-[336px]">
          <p className="font-[var(--font-mono)] text-[22px] leading-[36px] tracking-[0.015em] text-[var(--accent)]">
            {items?.label ?? 'US intelligence reports · 2035'}
          </p>
          <p className="mt-5 max-w-[690px] font-[var(--font-body)] text-[28px] leading-[1.4]">
            {items?.body ??
              'The excerpt says Iran needed until this year to build such missiles.'}
          </p>
        </div>
      </div>
    </section>
  );
}
import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

export default function Slide10({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  const incompleteSource = slide.items?.[0];
  const unverifiedAuthorship = slide.items?.[1];

  return (
    <section className="flex flex-col h-full min-h-0 w-full text-[var(--ink)]">
      <div className="shrink-0 border-t-2 border-[var(--ink)] pt-7">
        <p className="font-[var(--font-mono)] text-[22px] leading-normal tracking-[0.12em] text-[var(--accent)]">
          {slide.kicker}
        </p>

        <h1 className="mt-8 max-w-[900px] font-[var(--font-headline)] text-[68px] font-bold leading-[1.04] tracking-[-0.045em]">
          {slide.headline}
        </h1>

        <p className="mt-7 max-w-[760px] font-[var(--font-body)] text-[28px] leading-snug">
          {slide.subheadline}
        </p>
      </div>

      <div className="relative mt-16 h-[850px] w-full shrink-0">
        <svg
          viewBox="0 0 952 850"
          className="absolute inset-0 h-full w-full"
          fill="none"
          aria-hidden="true"
        >
          {/* A single source fragment, visibly torn open at its foot. */}
          <path
            d="
              M 0 24
              H 506
              V 739
              L 477 751
              L 450 735
              L 423 762
              L 397 744
              L 367 769
              L 338 750
              L 312 765
              L 291 710
              L 263 779
              L 232 756
              L 204 774
              L 177 751
              L 146 769
              L 119 744
              L 88 761
              L 59 741
              L 29 754
              L 0 738
              Z
            "
            fill="#F5F5F5"
          />

          {/* Metadata only; no fabricated article passages. */}
          <g
            fill="#000000"
            className="font-[var(--font-mono)]"
            fontSize="26"
          >
            <text x="38" y="151">
              Publisher 'En'
            </text>
            <text x="38" y="193">
              and byline
            </text>
            <text x="38" y="235">
              'Staff Bureau'
            </text>
          </g>

          <text
            x="38"
            y="699"
            fill="#E60000"
            fontSize="64"
            fontWeight="700"
            className="font-[var(--font-mono)]"
          >
            [6
          </text>

          {/* Exactly two connected margin brackets. */}
          <path
            d="M 425 130 H 447 V 249 H 425 M 447 189 H 574"
            stroke="#000000"
            strokeWidth="2"
            strokeLinecap="square"
          />
          <path
            d="M 133 639 H 155 V 709 H 133 M 155 674 H 548 V 599 H 574"
            stroke="#000000"
            strokeWidth="2"
            strokeLinecap="square"
          />
        </svg>

        <aside
          aria-label="Source annotations"
          className="absolute inset-0"
        >
          <div className="absolute left-[604px] right-0 top-[550px]">
            <h2 className="font-[var(--font-headline)] text-[34px] font-semibold leading-[1.12] tracking-[-0.025em]">
              {incompleteSource?.title ?? 'Incomplete source'}
            </h2>
            <p className="mt-5 font-[var(--font-body)] text-[26px] leading-snug">
              {incompleteSource?.body ??
                "The text ends with truncated '[6'; numbered citations lack their source bibliography."}
            </p>
          </div>

          <div className="absolute left-[604px] right-0 top-[140px]">
            <h2 className="font-[var(--font-headline)] text-[34px] font-semibold leading-[1.12] tracking-[-0.025em]">
              {unverifiedAuthorship?.title ?? 'Unverified authorship'}
            </h2>
            <p className="mt-5 font-[var(--font-body)] text-[26px] leading-snug">
              {unverifiedAuthorship?.body ??
                "Publisher 'En' and byline 'Staff Bureau' are metadata, not independently authenticated authorship."}
            </p>
          </div>
        </aside>
      </div>

      <div className="min-h-[200px] flex-1" aria-hidden="true" />
    </section>
  );
}
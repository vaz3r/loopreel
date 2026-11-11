import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

export default function Slide09({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  return (
    <section className="flex flex-col h-full min-h-0 w-full text-[var(--ink)]">
      <div className="shrink-0">
        <p className="font-[var(--font-mono)] text-[22px] leading-normal tracking-wider text-[var(--accent)]">
          THE REPORTED TOLL
        </p>

        <h2 className="mt-5 max-w-[920px] font-[var(--font-headline)] text-[64px] font-bold leading-[1.06] tracking-[-0.035em]">
          The Toll Is Only Partly Quantified
        </h2>

        <p className="mt-6 max-w-[850px] font-[var(--font-body)] text-[28px] leading-snug">
          The spending estimate carries an{' '}
          <span className="text-[var(--accent)]">[update]</span> marker; it is
          not a comprehensive global cost.
        </p>
      </div>

      <div className="relative mt-10 flex min-h-0 flex-1 flex-col pb-6 pt-9">
        <svg
          aria-hidden="true"
          focusable="false"
          className="pointer-events-none absolute inset-0 h-full w-full"
          viewBox="0 0 952 620"
          preserveAspectRatio="none"
          fill="none"
        >
          <path
            d="M20 1H951M20 1V619H951"
            stroke="var(--border)"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
          />
          <path
            d="M34 1V619"
            stroke="var(--border)"
            strokeWidth="1"
            strokeOpacity="0.5"
            vectorEffect="non-scaling-stroke"
          />
          <path
            d="M0 34H34M0 586H34"
            stroke="var(--accent)"
            strokeWidth="2"
            vectorEffect="non-scaling-stroke"
          />
        </svg>

        <div className="relative pl-[72px] pr-6">
          <h3 className="max-w-[760px] font-[var(--font-headline)] text-[34px] font-semibold leading-snug">
            US Department of Defense estimate
          </h3>

          <p className="mt-6 font-[var(--font-body)] text-[28px] leading-snug">
            <span className="block font-[var(--font-mono)] text-[84px] font-bold leading-[1.1] tracking-[-0.055em] text-[var(--accent)]">
              $47.1 billion
            </span>{' '}
            <span className="mt-4 block">
              in US military spending as of October 2026.
            </span>
          </p>
        </div>

        <div className="relative my-9 ml-[34px] shrink-0">
          <svg
            aria-hidden="true"
            focusable="false"
            className="h-[2px] w-full"
            viewBox="0 0 918 2"
            preserveAspectRatio="none"
            fill="none"
          >
            <path
              d="M0 1H918"
              stroke="var(--border)"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
        </div>

        <div className="relative ml-[230px] border-l border-[var(--border)] pl-8 pr-6">
          <h3 className="font-[var(--font-headline)] text-[32px] font-semibold leading-snug">
            Civilian and military casualties
          </h3>

          <p className="mt-4 font-[var(--font-body)] text-[28px] leading-snug">
            Thousands; no exact total, national breakdown, or separation of
            deaths and injuries.
          </p>
        </div>
      </div>
    </section>
  );
}
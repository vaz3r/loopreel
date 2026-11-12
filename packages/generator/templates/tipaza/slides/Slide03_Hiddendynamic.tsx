import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

export default function Slide03({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  const items = slide.items ?? [];
  const scale = items[0];
  const rupture = items[1];

  const [population, ...populationUnitWords] = (scale?.badge ?? '').split(/\s+/);
  const populationUnit = populationUnitWords.join(' ');

  return (
    <section className="flex flex-col h-full min-h-0 w-full text-[var(--ink)]">
      <header className="flex shrink-0 flex-col gap-6">
        <p className="font-[var(--font-mono)] text-[20px] leading-snug tracking-[0.12em] text-[var(--accent)]">
          {slide.kicker}
        </p>

        <h1 className="max-w-[900px] font-[var(--font-headline)] text-[64px] font-bold leading-[1.02] tracking-[-0.04em]">
          {slide.headline}
        </h1>

        <p className="max-w-[880px] font-[var(--font-body)] text-[28px] leading-snug">
          {slide.subheadline}
        </p>
      </header>

      <div className="relative mt-8 aspect-[600/750] w-full shrink-0">
        <svg
          aria-hidden="true"
          focusable="false"
          viewBox="0 0 600 750"
          className="pointer-events-none absolute inset-0 h-full w-full"
          fill="none"
        >
          <rect width="600" height="750" fill="#0D0E12" />

          <path
            d="M40 40H560V430H356L344 419L333 438L320 430H40Z"
            fill="var(--surface, #161820)"
          />

          <path
            d="M40 430V40H560V430"
            stroke="var(--border, #F1F3F925)"
            strokeWidth="1"
          />

          <path
            d="M40 430H310M366 430H560"
            stroke="var(--border, #F1F3F925)"
            strokeWidth="1"
          />

          <path
            d="M310 430H320L333 438L344 419L356 430H366"
            stroke="var(--accent, #FF4D00)"
            strokeWidth="3"
            strokeLinejoin="miter"
          />

          <path
            d="M344 419L337 449L352 460L341 478L347 490"
            stroke="var(--accent, #FF4D00)"
            strokeWidth="2"
            strokeLinejoin="miter"
          />

          <path
            d="M40 490H560V710H40Z"
            fill="var(--surface, #161820)"
          />

          <path
            d="M40 490H560M40 710H560"
            stroke="var(--border, #F1F3F925)"
            strokeWidth="1"
          />

          <path
            d="M319 490H375"
            stroke="var(--accent, #FF4D00)"
            strokeWidth="3"
          />
        </svg>

        <div className="absolute inset-0 grid grid-cols-[40fr_520fr_40fr] grid-rows-[40fr_390fr_60fr_220fr_40fr]">
          <article className="col-start-2 row-start-2 flex min-w-0 flex-col justify-center gap-9 px-10 py-10">
            <h2 className="font-[var(--font-headline)] text-[34px] font-semibold leading-tight">
              {scale?.title || scale?.label}
            </h2>

            <div className="flex min-w-0 flex-col gap-3">
              <p className="whitespace-nowrap font-[var(--font-mono)] text-[56px] font-bold leading-none tracking-[-0.06em] text-[#F1F3F9]">
                {population}
              </p>
              <p className="font-[var(--font-mono)] text-[24px] leading-snug tracking-[0.04em]">
                {populationUnit}
              </p>
            </div>

            <p className="max-w-[650px] border-t border-[var(--border)] pt-7 font-[var(--font-body)] text-[24px] leading-snug">
              {scale?.body}
            </p>
          </article>

          <article className="col-start-2 row-start-4 flex min-w-0 flex-col justify-center gap-5 px-10 py-9">
            <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-3">
              <h2 className="font-[var(--font-headline)] text-[34px] font-semibold leading-tight">
                {rupture?.title || rupture?.label}
              </h2>
              <p className="whitespace-nowrap font-[var(--font-mono)] text-[48px] font-bold leading-none tracking-[-0.04em] text-[var(--accent)]">
                {rupture?.badge}
              </p>
            </div>

            <p className="font-[var(--font-body)] text-[26px] leading-snug">
              {rupture?.body}
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}
import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

export default function Slide07({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  const items = slide.items ?? [];
  const item0 = items[0];
  const item1 = items[1];

  void brand;
  void totalSlides;

  return (
    <section className="flex flex-col h-full min-h-0 w-full text-[var(--ink)]">
      <header className="flex shrink-0 flex-col gap-7">
        <div className="flex items-center gap-5">
          <span
            aria-hidden="true"
            className="h-[18px] w-[18px] shrink-0 bg-[var(--accent)]"
          />
          <p className="font-[var(--font-mono)] text-[20px] uppercase leading-normal tracking-[0.12em] text-[var(--accent)]">
            {slide.kicker}
          </p>
        </div>

        <h1 className="max-w-[850px] font-[var(--font-headline)] text-[58px] font-bold leading-[1.02] tracking-[-0.04em]">
          {slide.headline}
        </h1>

        <p className="max-w-[850px] font-[var(--font-body)] text-[30px] leading-snug">
          {slide.subheadline}
        </p>

        <div className="h-px w-full bg-[var(--border)]" />
      </header>

      <div className="mt-12 grid min-h-0 flex-1 grid-cols-[84px_minmax(0,1fr)] grid-rows-[280px_minmax(120px,1fr)_300px] gap-x-8 pb-10">
        <div aria-hidden="true" className="h-[280px]">
          <svg
            viewBox="0 0 84 280"
            width="84"
            height="280"
            fill="none"
            className="block text-[var(--ink)]"
          >
            <path
              d="M42 26V280"
              stroke="currentColor"
              strokeWidth="2"
            />
            <path
              d="M20 26H64"
              stroke="currentColor"
              strokeWidth="2"
            />
            <circle
              cx="42"
              cy="26"
              r="10"
              fill="var(--accent)"
            />
          </svg>
        </div>

        <article className="min-w-0 pr-8">
          <p className="w-fit border-b border-[var(--border)] pb-4 font-[var(--font-mono)] text-[32px] leading-snug tracking-[-0.035em]">
            {item0?.badge}
          </p>

          <h2 className="mt-7 font-[var(--font-headline)] text-[34px] font-semibold leading-tight tracking-[-0.02em]">
            {item0?.label || item0?.title}
          </h2>

          <p className="mt-4 max-w-[650px] font-[var(--font-body)] text-[28px] leading-snug">
            {item0?.body}
          </p>
        </article>

        <div
          aria-hidden="true"
          className="col-span-2 grid min-h-0 grid-cols-[84px_minmax(0,1fr)] gap-x-8"
        >
          <div className="flex items-center justify-center">
            <svg
              viewBox="0 0 84 48"
              width="84"
              height="48"
              fill="none"
              className="block text-[var(--accent)]"
            >
              <path
                d="M23 33L61 15"
                stroke="currentColor"
                strokeWidth="5"
                strokeLinecap="square"
              />
            </svg>
          </div>
        </div>

        <div aria-hidden="true" className="h-[300px]">
          <svg
            viewBox="0 0 84 300"
            width="84"
            height="300"
            fill="none"
            className="block text-[var(--ink)]"
          >
            <path
              d="M42 0V92"
              stroke="currentColor"
              strokeWidth="2"
            />
            <path
              d="M20 92H64"
              stroke="currentColor"
              strokeWidth="2"
            />
            <circle
              cx="42"
              cy="92"
              r="10"
              fill="white"
              stroke="var(--accent)"
              strokeWidth="3"
            />
          </svg>
        </div>

        <article className="min-w-0 pr-8 pt-[66px]">
          <p className="w-fit border-b border-[var(--border)] pb-4 font-[var(--font-mono)] text-[32px] leading-snug tracking-[-0.035em]">
            {item1?.badge}
          </p>

          <h2 className="mt-7 font-[var(--font-headline)] text-[34px] font-semibold leading-tight tracking-[-0.02em]">
            {item1?.label || item1?.title}
          </h2>

          <p className="mt-4 max-w-[650px] font-[var(--font-body)] text-[28px] leading-snug">
            {item1?.body}
          </p>
        </article>
      </div>
    </section>
  );
}
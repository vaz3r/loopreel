import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

export default function Slide03({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  void brand;
  void totalSlides;

  const items = slide.items ?? [];
  const population = items[0];
  const sacred = items[1];
  const [metric, ...unitWords] = (population?.badge ?? '').split(/\s+/);
  const unit = unitWords.join(' ');

  return (
    <section className="flex flex-col h-full min-h-0 w-full text-[var(--ink)]">
      <header className="flex shrink-0 flex-col gap-7">
        <div className="flex items-center gap-5">
          <span
            aria-hidden="true"
            className="h-[12px] w-[12px] shrink-0 bg-[var(--accent)]"
          />
          <p className="font-[var(--font-mono)] text-[22px] uppercase tracking-[0.16em] text-[var(--accent)]">
            {slide.kicker}
          </p>
        </div>

        <h1 className="max-w-[900px] font-[var(--font-headline)] text-[56px] font-bold leading-[1.04] tracking-[-0.04em]">
          {slide.headline}
        </h1>

        <p className="max-w-[850px] font-[var(--font-body)] text-[30px] leading-snug">
          {slide.subheadline}
        </p>
      </header>

      <div className="mt-10 flex min-h-0 flex-1 flex-col justify-evenly gap-10 pb-8">
        <article className="relative shrink-0 border-y border-[var(--border)] py-10">
          <span
            aria-hidden="true"
            className="absolute left-0 top-[-1px] h-[3px] w-[104px] bg-[var(--accent)]"
          />

          <div className="flex w-full flex-col items-start">
            <p className="font-[var(--font-mono)] text-[56px] font-bold leading-none tracking-[-0.06em] tabular-nums">
              {metric}
            </p>
            <p className="mt-4 font-[var(--font-body)] text-[30px] leading-snug">
              {unit}
            </p>
          </div>

          <div className="mt-10 grid grid-cols-[0.9fr_1.1fr] gap-8 border-t border-[var(--border)] pt-8">
            <h2 className="min-w-0 font-[var(--font-headline)] text-[34px] font-semibold leading-tight tracking-[-0.025em]">
              {population?.label || population?.title}
            </h2>
            <p className="min-w-0 border-l border-[var(--border)] pl-8 font-[var(--font-body)] text-[26px] leading-snug">
              {population?.body}
            </p>
          </div>
        </article>

        <article className="shrink-0 bg-[var(--surface)] p-10">
          <div className="flex items-center gap-6">
            <p className="shrink-0 font-[var(--font-headline)] text-[36px] font-semibold leading-tight tracking-[-0.025em]">
              {sacred?.badge}
            </p>
            <span
              aria-hidden="true"
              className="h-px flex-1 bg-[var(--border)]"
            />
          </div>

          <svg
            aria-hidden="true"
            focusable="false"
            viewBox="0 0 872 220"
            className="my-8 block h-[220px] w-full text-[var(--ink)]"
            fill="none"
          >
            <g
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="square"
            >
              <path d="M100 202V100a64 64 0 0 1 128 0v102" />
              <path d="M372 202V100a64 64 0 0 1 128 0v102" />
              <path d="M644 202V100a64 64 0 0 1 128 0v102" />
            </g>
            <path
              d="M40 204H832"
              stroke="var(--accent)"
              strokeWidth="3"
            />
          </svg>

          <div className="grid grid-cols-[0.9fr_1.1fr] gap-8">
            <h2 className="min-w-0 font-[var(--font-headline)] text-[34px] font-semibold leading-tight tracking-[-0.025em]">
              {sacred?.label || sacred?.title}
            </h2>
            <p className="min-w-0 font-[var(--font-body)] text-[26px] leading-snug">
              {sacred?.body}
            </p>
          </div>
        </article>
      </div>
    </section>
  );
}
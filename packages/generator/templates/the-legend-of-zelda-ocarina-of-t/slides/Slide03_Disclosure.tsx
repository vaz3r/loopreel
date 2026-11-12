import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

export default function Slide03({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  const items = slide.items ?? [];
  const item0 = items[0];
  const item1 = items[1];

  const [qualifier, metric, ...unitWords] = (item0?.badge ?? '').split(/\s+/);
  const unit = unitWords.join(' ');

  return (
    <section className="flex flex-col h-full min-h-0 w-full text-[var(--ink)]">
      <header className="flex shrink-0 flex-col gap-6">
        <p className="font-[var(--font-mono)] text-[20px] leading-normal tracking-[0.12em] text-[var(--accent)]">
          {slide.kicker}
        </p>

        <div className="flex items-start justify-between gap-8">
          <h1 className="max-w-[790px] font-[var(--font-headline)] text-[64px] font-bold leading-[1.02] tracking-[-0.04em]">
            {slide.headline}
          </h1>

          <svg
            aria-hidden="true"
            viewBox="0 0 80 80"
            className="mt-2 h-[72px] w-[72px] shrink-0 text-[var(--accent)]"
            fill="none"
          >
            <g stroke="currentColor" strokeWidth="7" strokeLinecap="square">
              <path d="M40 10V70" />
              <path d="M14 25L66 55" />
              <path d="M14 55L66 25" />
            </g>
          </svg>
        </div>

        <p className="max-w-[850px] font-[var(--font-body)] text-[28px] leading-snug">
          {slide.subheadline}
        </p>
      </header>

      <div className="mt-9 flex min-h-0 flex-1 flex-col gap-8">
        <article className="flex flex-1 flex-col items-center justify-center border-y border-[var(--border)] px-8 py-7 text-center">
          <h2 className="font-[var(--font-headline)] text-[32px] font-semibold leading-tight">
            {item0?.title || item0?.label}
          </h2>

          <div className="mt-5 flex flex-col items-center text-[var(--accent)]">
            <span className="font-[var(--font-body)] text-[28px] leading-snug">
              {qualifier}
            </span>
            <span className="font-[var(--font-mono)] text-[84px] font-bold leading-[1.05] tracking-[-0.06em] tabular-nums">
              {metric}
            </span>
            <span className="mt-1 font-[var(--font-headline)] text-[32px] font-semibold leading-tight">
              {unit}
            </span>
          </div>

          <p className="mt-6 max-w-[740px] font-[var(--font-body)] text-[26px] leading-snug">
            {item0?.body}
          </p>
        </article>

        <article className="shrink-0 border border-[var(--border)] bg-[var(--surface)] px-8 py-7">
          <div className="flex items-baseline justify-between gap-6">
            <h2 className="font-[var(--font-headline)] text-[32px] font-semibold leading-tight">
              {item1?.title || item1?.label}
            </h2>
            <p className="shrink-0 font-[var(--font-mono)] text-[36px] font-semibold leading-tight tracking-[-0.03em] text-[var(--accent)]">
              {item1?.badge}
            </p>
          </div>

          <p className="mt-5 max-w-[810px] font-[var(--font-body)] text-[26px] leading-snug">
            {item1?.body}
          </p>
        </article>
      </div>
    </section>
  );
}
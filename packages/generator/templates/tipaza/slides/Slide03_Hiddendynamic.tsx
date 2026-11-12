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
  const populationBadge = (item0?.badge ?? '').trim();
  const [population, ...unitWords] = populationBadge.split(/\s+/);
  const populationUnit = unitWords.join(' ');

  return (
    <section className="flex flex-col h-full min-h-0 w-full text-[var(--ink)]">
      <div className="flex min-h-0 flex-1 flex-col gap-10 px-4 py-8">
        <header className="flex shrink-0 flex-col gap-7">
          <div className="flex items-center gap-5">
            <span
              aria-hidden="true"
              className="h-[3px] w-12 shrink-0 bg-[var(--accent)]"
            />
            <p className="font-[var(--font-mono)] text-[20px] leading-snug tracking-[0.12em] text-[var(--accent)]">
              {slide.kicker}
            </p>
          </div>

          <h1 className="max-w-[860px] font-[var(--font-headline)] text-[58px] font-bold leading-[1.04] tracking-[-0.04em]">
            {slide.headline}
          </h1>

          <p className="max-w-[810px] font-[var(--font-body)] text-[28px] leading-snug">
            {slide.subheadline}
          </p>
        </header>

        <div className="flex min-h-[440px] flex-1 flex-col justify-center border-t border-[var(--border)] py-10">
          <div className="flex items-center gap-5">
            <span
              aria-hidden="true"
              className="h-3 w-3 shrink-0 bg-[var(--accent)]"
            />
            <h2 className="font-[var(--font-mono)] text-[22px] leading-snug tracking-[0.14em]">
              {item0?.label || item0?.title}
            </h2>
          </div>

          <div className="mt-8">
            <p className="font-[var(--font-mono)] text-[96px] font-bold leading-none tracking-[-0.065em] tabular-nums">
              {population}
            </p>
            <p className="mt-3 font-[var(--font-body)] text-[30px] leading-tight">
              {populationUnit}
            </p>
          </div>

          <div
            aria-hidden="true"
            className="mb-7 mt-9 h-[3px] w-20 bg-[var(--accent)]"
          />

          <p className="max-w-[760px] font-[var(--font-body)] text-[28px] leading-snug">
            {item0?.body}
          </p>
        </div>

        <article className="flex min-h-[472px] shrink-0 flex-col justify-between gap-7 border-t-[3px] border-[var(--accent)] bg-[var(--surface)] p-10">
          <div className="flex items-start justify-between gap-8">
            <h2 className="max-w-[460px] pt-1 font-[var(--font-mono)] text-[22px] leading-snug tracking-[0.14em]">
              {item1?.label || item1?.title}
            </h2>

            {/* Abstract symbolic arches, not an architectural reconstruction. */}
            <svg
              aria-hidden="true"
              focusable="false"
              viewBox="0 0 240 144"
              fill="none"
              className="h-[120px] w-[200px] shrink-0 text-[var(--accent)]"
            >
              <path
                d="M12 132V52C12 30 24 16 42 16C60 16 72 30 72 52V132
                   M90 132V52C90 30 102 16 120 16C138 16 150 30 150 52V132
                   M168 132V52C168 30 180 16 198 16C216 16 228 30 228 52V132"
                stroke="currentColor"
                strokeWidth="10"
                strokeLinecap="square"
              />
              <path
                d="M4 138H236"
                stroke="currentColor"
                strokeWidth="2"
              />
            </svg>
          </div>

          <div className="flex flex-col gap-6">
            <p className="font-[var(--font-headline)] text-[38px] font-semibold leading-tight tracking-[-0.025em]">
              {item1?.badge}
            </p>
            <p className="max-w-[760px] font-[var(--font-body)] text-[28px] leading-snug">
              {item1?.body}
            </p>
          </div>
        </article>
      </div>
    </section>
  );
}
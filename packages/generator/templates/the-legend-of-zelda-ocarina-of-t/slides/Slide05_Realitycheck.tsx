import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

export default function Slide05({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  const items = slide.items ?? [];
  const september = items[0];
  const november = items[1];

  const septemberWords = (september?.badge ?? '').trim().split(/\s+/);
  const septemberYear = septemberWords.pop() ?? '';
  const septemberDate = septemberWords.join(' ');

  return (
    <section className="flex flex-col h-full min-h-0 w-full text-[var(--ink)]">
      <header className="flex shrink-0 flex-col gap-5">
        <p className="font-[var(--font-mono)] text-[20px] leading-[1.4] tracking-[0.12em] uppercase text-[var(--accent)]">
          {slide.kicker}
        </p>

        <h1 className="max-w-[920px] font-[var(--font-headline)] text-[64px] font-bold leading-[1.02] tracking-[-0.04em]">
          {slide.headline}
        </h1>

        <p className="max-w-[880px] font-[var(--font-body)] text-[28px] leading-snug">
          {slide.subheadline}
        </p>

        <div className="mt-1 h-px w-full bg-[var(--border)]" />
      </header>

      <div className="mt-12 grid h-[640px] shrink-0 grid-cols-[64px_minmax(0,1fr)] grid-rows-[296px_48px_296px] gap-x-6">
        <svg
          aria-hidden="true"
          focusable="false"
          viewBox="0 0 64 640"
          fill="none"
          className="col-start-1 row-start-1 row-span-3 block h-[640px] w-[64px] text-[var(--accent)]"
        >
          {/* Two reporting periods, deliberately separated by a visible gap. */}
          <path
            d="M32 0V296 M32 344V640"
            stroke="currentColor"
            strokeWidth="4"
          />

          {/* Exactly two milestone nodes; no connector lines into the copy. */}
          <circle
            cx="32"
            cy="64"
            r="12"
            fill="var(--surface)"
            stroke="currentColor"
            strokeWidth="4"
          />
          <circle
            cx="32"
            cy="408"
            r="12"
            fill="var(--surface)"
            stroke="currentColor"
            strokeWidth="4"
          />
        </svg>

        <article className="col-start-2 row-start-1 flex min-w-0 flex-col justify-between border border-[var(--border)] bg-[var(--surface)] px-8 py-6">
          <p className="font-[var(--font-mono)] text-[40px] font-semibold leading-[1.08] tracking-[-0.035em] text-[var(--accent)]">
            <span className="block">{septemberDate}</span>
            <span className="block">{septemberYear}</span>
          </p>

          <div className="flex min-w-0 flex-col gap-3">
            <h2 className="font-[var(--font-headline)] text-[34px] font-semibold leading-[1.15] tracking-[-0.025em]">
              {september?.title}
            </h2>
            <p className="font-[var(--font-body)] text-[26px] leading-snug">
              {september?.body}
            </p>
          </div>
        </article>

        <article className="col-start-2 row-start-3 flex min-w-0 flex-col justify-between border border-[var(--border)] bg-[var(--surface)] px-8 py-6">
          <p className="font-[var(--font-mono)] text-[48px] font-semibold leading-[1.08] tracking-[-0.035em] text-[var(--accent)]">
            {november?.badge}
          </p>

          <div className="flex min-w-0 flex-col gap-3">
            <h2 className="font-[var(--font-headline)] text-[34px] font-semibold leading-[1.15] tracking-[-0.025em]">
              {november?.title}
            </h2>
            <p className="font-[var(--font-body)] text-[26px] leading-snug">
              {november?.body}
            </p>
          </div>
        </article>
      </div>
    </section>
  );
}
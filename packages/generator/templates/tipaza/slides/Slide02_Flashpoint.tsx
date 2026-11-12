import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

export default function Slide02({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  void brand;
  void totalSlides;

  const items = slide.items ?? [];
  const before = items[0];
  const reversal = items[1];

  return (
    <section className="flex flex-col h-full min-h-0 w-full text-[var(--ink)]">
      <div className="flex flex-col gap-10 py-6">
        <header className="flex flex-col gap-6">
          <div className="flex items-center gap-5">
            <span className="h-[3px] w-14 shrink-0 bg-[var(--accent)]" />
            <p className="font-[var(--font-mono)] text-[22px] uppercase tracking-[0.16em] text-[var(--accent)]">
              {slide.kicker}
            </p>
          </div>

          <h1 className="max-w-[880px] font-[var(--font-headline)] text-[56px] font-bold leading-[1.04] tracking-[-0.04em]">
            {slide.headline}
          </h1>

          <p className="max-w-[820px] font-[var(--font-body)] text-[28px] leading-snug">
            {slide.subheadline}
          </p>
        </header>

        <div className="flex flex-col">
          <article className="grid min-h-[440px] grid-cols-[64px_minmax(0,1fr)] gap-6 bg-[var(--surface)] px-8">
            <div className="relative self-stretch" aria-hidden="true">
              <svg
                viewBox="0 0 64 440"
                preserveAspectRatio="none"
                className="absolute inset-0 h-full w-full text-[var(--ink)]"
                fill="none"
              >
                <path
                  d="M32 0V440"
                  stroke="currentColor"
                  strokeWidth="3"
                  vectorEffect="non-scaling-stroke"
                />
              </svg>
              <svg
                viewBox="0 0 64 64"
                className="absolute left-0 top-[96px] h-16 w-16"
                fill="none"
              >
                <rect
                  x="20"
                  y="20"
                  width="24"
                  height="24"
                  fill="var(--surface)"
                  stroke="var(--ink)"
                  strokeWidth="3"
                />
                <path
                  d="M27 32H37"
                  stroke="var(--ink)"
                  strokeWidth="3"
                />
              </svg>
            </div>

            <div className="flex min-w-0 flex-col justify-center gap-6 py-12">
              <p className="font-[var(--font-mono)] text-[30px] leading-tight tracking-[-0.025em]">
                {before?.badge}
              </p>
              <h2 className="font-[var(--font-headline)] text-[36px] font-semibold leading-tight tracking-[-0.025em]">
                {before?.label || before?.title}
              </h2>
              <p className="max-w-[740px] font-[var(--font-body)] text-[30px] leading-[1.4]">
                {before?.body}
              </p>
            </div>
          </article>

          <div className="h-[120px] w-full shrink-0" aria-hidden="true">
            <svg
              viewBox="0 0 952 120"
              preserveAspectRatio="none"
              className="block h-full w-full text-[var(--accent)]"
              fill="none"
            >
              <path
                d="M0 27L106 39L192 21L300 37L405 23L513 40L620 22L725 35L842 19L952 31V93L840 82L730 101L621 84L514 100L405 82L299 98L193 83L105 101L0 87Z"
                fill="currentColor"
              />
              <path
                d="M0 66L114 55L198 69L306 53L409 67L517 52L626 68L733 51L844 64L952 53"
                stroke="var(--paper, #f5f5f7)"
                strokeWidth="8"
                vectorEffect="non-scaling-stroke"
              />
            </svg>
          </div>

          <article className="grid min-h-[480px] grid-cols-[64px_minmax(0,1fr)] gap-6 border-b-2 border-[var(--border)] px-8">
            <div className="relative self-stretch" aria-hidden="true">
              <svg
                viewBox="0 0 64 480"
                preserveAspectRatio="none"
                className="absolute inset-0 h-full w-full"
                fill="none"
              >
                <path
                  d="M32 0V480"
                  stroke="var(--ink)"
                  strokeWidth="3"
                  vectorEffect="non-scaling-stroke"
                />
              </svg>
              <svg
                viewBox="0 0 64 64"
                className="absolute left-0 top-[96px] h-16 w-16 text-[var(--accent)]"
                fill="none"
              >
                <path
                  d="M32 12L52 32L32 52L12 32Z"
                  fill="currentColor"
                />
                <path
                  d="M25 25L39 39M39 25L25 39"
                  stroke="var(--paper, #f5f5f7)"
                  strokeWidth="3"
                />
              </svg>
            </div>

            <div className="flex min-w-0 flex-col justify-center gap-6 py-12">
              <p className="font-[var(--font-mono)] text-[56px] font-bold leading-none tracking-[-0.045em] text-[var(--accent)]">
                {reversal?.badge}
              </p>
              <h2 className="font-[var(--font-headline)] text-[36px] font-semibold leading-tight tracking-[-0.025em]">
                {reversal?.label || reversal?.title}
              </h2>
              <p className="max-w-[740px] font-[var(--font-body)] text-[30px] leading-[1.4]">
                {reversal?.body}
              </p>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

export default function Slide08({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  const items = slide.items ?? [];
  const item0 = items[0];
  const item1 = items[1];

  const ancientBadge = (item0?.badge ?? '').split(' ');
  const ancientMetric = ancientBadge;
  const ancientUnit = ancientBadge.slice(1).join(' ');

  return (
    <section className="flex flex-col h-full min-h-0 w-full text-[var(--ink)]">
      <div className="flex h-full min-h-0 flex-col gap-10 bg-white">
        <header className="flex shrink-0 flex-col gap-7">
          <div className="h-[2px] w-full bg-[var(--ink)]" />

          <p className="font-[var(--font-mono)] text-[20px] leading-normal tracking-[0.12em]">
            {slide.kicker}
          </p>

          <h1 className="max-w-[880px] font-[var(--font-headline)] text-[58px] font-bold leading-[1.04] tracking-[-0.045em]">
            {slide.headline}
          </h1>

          <p className="max-w-[850px] font-[var(--font-body)] text-[28px] leading-snug">
            {slide.subheadline}
          </p>
        </header>

        <div className="grid min-h-0 flex-1 grid-cols-[minmax(0,1fr)_24px_minmax(0,1fr)]">
          <article className="grid min-w-0 grid-rows-[1fr_1fr_1fr] px-8 py-10">
            <div className="flex min-w-0 flex-col gap-8">
              <h2
                aria-label="TIPASA"
                className="whitespace-nowrap font-[var(--font-headline)] text-[84px] font-bold leading-none tracking-[-0.065em]"
              >
                TIPA<span className="text-[var(--accent)]">S</span>A
              </h2>

              <p className="font-[var(--font-headline)] text-[32px] font-semibold leading-tight tracking-[-0.025em]">
                {item0?.label || item0?.title}
              </p>
            </div>

            <div className="flex flex-col items-start gap-5">
              <div className="mb-3 h-px w-16 bg-[var(--ink)]" />
              <p className="font-[var(--font-mono)] text-[84px] font-bold leading-none tracking-[-0.07em]">
                {ancientMetric}
              </p>
              {ancientUnit && (
                <p className="font-[var(--font-mono)] text-[22px] leading-snug tracking-[0.04em]">
                  {ancientUnit}
                </p>
              )}
            </div>

            <div className="flex flex-col justify-between gap-8">
              <p className="font-[var(--font-body)] text-[28px] leading-normal">
                {item0?.body}
              </p>
              <div className="h-px w-full bg-[var(--border)]" />
            </div>
          </article>

          <div className="relative min-h-0" aria-hidden="true">
            <svg
              viewBox="0 0 24 1000"
              preserveAspectRatio="none"
              className="absolute inset-0 h-full w-full text-[var(--ink)]"
              fill="none"
            >
              <path
                d="M12 0V422 M12 578V1000"
                stroke="currentColor"
                strokeWidth="2"
                vectorEffect="non-scaling-stroke"
              />
              <path
                d="M6 434L18 422 M6 578L18 566"
                stroke="currentColor"
                strokeWidth="2"
                vectorEffect="non-scaling-stroke"
              />
            </svg>
          </div>

          <article className="grid min-w-0 grid-rows-[1fr_1fr_1fr] bg-[var(--surface)] px-8 py-10">
            <div className="flex min-w-0 flex-col gap-8">
              <h2
                aria-label="TIPAZA"
                className="whitespace-nowrap font-[var(--font-headline)] text-[84px] font-bold leading-none tracking-[-0.065em]"
              >
                TIPA<span className="text-[var(--accent)]">Z</span>A
              </h2>

              <p className="font-[var(--font-headline)] text-[32px] font-semibold leading-tight tracking-[-0.025em]">
                {item1?.label || item1?.title}
              </p>
            </div>

            <div className="flex flex-col items-start gap-5">
              <div className="mb-3 h-px w-16 bg-[var(--ink)]" />
              <p className="font-[var(--font-mono)] text-[84px] font-bold leading-none tracking-[-0.07em]">
                {item1?.badge}
              </p>
            </div>

            <div className="flex flex-col justify-between gap-8">
              <p className="font-[var(--font-body)] text-[28px] leading-normal">
                {item1?.body}
              </p>
              <div className="h-px w-full bg-[var(--border)]" />
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
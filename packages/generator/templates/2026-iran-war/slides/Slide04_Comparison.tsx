import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

export default function Slide04({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  const cards = slide.cards ?? [];
  const metrics = slide.metrics ?? [];
  const claim = cards;
  const intelligence = cards;
  const claimDate = metrics;
  const intelligenceDate = metrics;

  return (
    <section className="flex flex-col h-full min-h-0 w-full text-[var(--ink)]">
      <header className="flex shrink-0 flex-col gap-7 pb-10">
        <div className="flex items-center gap-5">
          <svg
            aria-hidden="true"
            viewBox="0 0 32 32"
            className="h-8 w-8 shrink-0 text-[var(--accent)]"
            fill="none"
          >
            <path
              d="M4 4H28M16 4V28M4 28H28"
              stroke="currentColor"
              strokeWidth="2"
            />
          </svg>
          <p className="font-[var(--font-mono)] text-[20px] uppercase tracking-[0.16em] text-[var(--accent)]">
            {slide.kicker}
          </p>
        </div>

        <h1 className="max-w-[900px] font-[var(--font-headline)] text-[68px] font-bold leading-[1.02] tracking-[-0.04em]">
          {slide.headline}
        </h1>

        <p className="max-w-[850px] font-[var(--font-body)] text-[28px] leading-snug">
          {slide.subheadline}
        </p>
      </header>

      <div className="relative grid min-h-0 flex-1 grid-cols-[54fr_46fr] border-y border-[var(--border)]">
        <svg
          aria-hidden="true"
          viewBox="0 0 450 800"
          preserveAspectRatio="none"
          className="pointer-events-none absolute inset-0 h-full w-full"
        >
          <rect
            x="243"
            y="0"
            width="207"
            height="800"
            fill="var(--surface)"
          />
          <path
            d="M243 0V800"
            stroke="var(--accent)"
            strokeWidth="2"
            vectorEffect="non-scaling-stroke"
          />
          <path
            d="M32 32H64M32 32V56M418 768H386M418 768V744"
            fill="none"
            stroke="var(--border)"
            strokeWidth="2"
            vectorEffect="non-scaling-stroke"
          />
        </svg>

        <article className="relative flex min-w-0 flex-col px-8 py-16">
          <div className="flex min-h-[260px] flex-col items-start gap-7">
            <div className="h-1 w-14 bg-[var(--accent)]" />
            <p className="font-[var(--font-mono)] text-[52px] font-bold leading-[1.1] tracking-[-0.05em]">
              {claimDate?.value}
            </p>
            <p className="max-w-[370px] font-[var(--font-mono)] text-[22px] leading-snug tracking-[0.02em]">
              {claimDate?.label}
            </p>
          </div>

          <div className="flex flex-col gap-8 border-t border-[var(--border)] pt-10">
            <h2 className="font-[var(--font-headline)] text-[38px] font-semibold leading-[1.12] tracking-[-0.025em]">
              {claim?.title}
            </h2>
            <p className="font-[var(--font-body)] text-[28px] leading-normal">
              {claim?.body}
            </p>
          </div>

          <div className="mt-auto pt-12" aria-hidden="true">
            <svg
              viewBox="0 0 200 44"
              className="h-11 w-[200px] text-[var(--border)]"
              fill="none"
            >
              <path d="M0 22H200" stroke="currentColor" />
              <path
                d="M0 10V34M50 16V28M100 16V28M150 16V28M200 10V34"
                stroke="currentColor"
                strokeWidth="2"
              />
              <rect x="0" y="18" width="8" height="8" fill="var(--accent)" />
            </svg>
          </div>
        </article>

        <article className="relative flex min-w-0 flex-col px-8 py-16">
          <div className="flex min-h-[260px] flex-col items-start gap-7">
            <div className="h-1 w-14 bg-[var(--accent)]" />
            <p className="font-[var(--font-mono)] text-[88px] font-bold leading-none tracking-[-0.06em] text-[var(--accent)]">
              {intelligenceDate?.value}
            </p>
            <p className="font-[var(--font-mono)] text-[22px] leading-snug tracking-[0.02em]">
              {intelligenceDate?.label}
            </p>
          </div>

          <div className="flex flex-col gap-8 border-t border-[var(--border)] pt-10">
            <h2 className="font-[var(--font-headline)] text-[38px] font-semibold leading-[1.12] tracking-[-0.025em]">
              {intelligence?.title}
            </h2>
            <p className="font-[var(--font-body)] text-[28px] leading-normal">
              {intelligence?.body}
            </p>
          </div>

          <div className="mt-auto pt-12" aria-hidden="true">
            <svg
              viewBox="0 0 200 44"
              className="h-11 w-[200px] text-[var(--border)]"
              fill="none"
            >
              <path
                d="M0 22H200"
                stroke="currentColor"
                strokeDasharray="5 7"
              />
              <path
                d="M0 16V28M50 16V28M100 16V28M150 16V28M200 10V34"
                stroke="currentColor"
                strokeWidth="2"
              />
              <rect
                x="192"
                y="18"
                width="8"
                height="8"
                stroke="var(--accent)"
                strokeWidth="2"
              />
            </svg>
          </div>
        </article>
      </div>

      <div className="flex shrink-0 items-center gap-5 pt-8">
        <span
          aria-hidden="true"
          className="h-3 w-3 shrink-0 bg-[var(--accent)]"
        />
        <p className="font-[var(--font-mono)] text-[20px] uppercase tracking-[0.16em]">
          DISTINCT CAPABILITIES
        </p>
        <span
          aria-hidden="true"
          className="h-px flex-1 bg-[var(--border)]"
        />
      </div>
    </section>
  );
}
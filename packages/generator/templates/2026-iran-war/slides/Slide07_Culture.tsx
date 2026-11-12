import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

export default function Slide07({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  const cards = slide.cards ?? [];
  const telemetry = slide.telemetry ?? [];
  const heritage = cards[0];
  const community = cards[1];
  const foundation = telemetry[0];
  const population = telemetry[1];

  return (
    <section className="flex flex-col h-full min-h-0 w-full text-[var(--ink)]">
      <header className="shrink-0">
        <p className="font-[var(--font-mono)] text-[20px] uppercase leading-[1.3] tracking-[0.16em] text-[var(--accent)]">
          {slide.kicker}
        </p>

        <h1 className="mt-5 max-w-[900px] font-[var(--font-headline)] text-[44px] font-bold leading-[1.06] tracking-[-0.04em]">
          {slide.headline}
        </h1>

        <p className="mt-5 max-w-[860px] font-[var(--font-body)] text-[28px] leading-snug">
          {slide.subheadline}
        </p>
      </header>

      <div className="mt-8 flex flex-col gap-7">
        <article className="ml-[80px] min-h-[264px] border border-[var(--border)] bg-[var(--surface)]">
          <svg
            aria-hidden="true"
            viewBox="0 0 870 56"
            preserveAspectRatio="none"
            className="block h-[56px] w-full text-[var(--border)]"
            fill="none"
          >
            <path
              d="M0 18H870M0 55H870M130 0V18M418 0V18M701 0V18M58 18V55M284 18V55M570 18V55M804 18V55"
              stroke="currentColor"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
            />
            <path
              d="M570 55H704"
              stroke="var(--accent)"
              strokeWidth="3"
              vectorEffect="non-scaling-stroke"
            />
          </svg>

          <div className="grid grid-cols-[minmax(0,1fr)_220px] gap-7 px-8 py-6">
            <div className="min-w-0">
              <h2 className="font-[var(--font-headline)] text-[28px] font-semibold leading-tight tracking-[-0.025em]">
                {heritage?.title}
              </h2>
              <p className="mt-3 font-[var(--font-body)] text-[24px] leading-snug">
                {heritage?.body}
              </p>
            </div>

            <div className="flex flex-col items-start border-l border-[var(--border)] pl-6">
              <span className="inline-flex border border-[var(--accent)] px-4 py-2 font-[var(--font-mono)] text-[32px] font-semibold leading-none tracking-[-0.03em] text-[var(--accent)]">
                {foundation?.badge}
              </span>
              <p className="mt-4 font-[var(--font-mono)] text-[20px] leading-snug">
                {foundation?.label}
              </p>
            </div>
          </div>
        </article>

        <article className="mr-[64px] flex min-h-[414px] flex-col border border-[var(--border)] border-l-[3px] border-l-[var(--accent)] bg-[var(--surface)]">
          <div className="px-8 pt-6">
            <div className="flex flex-wrap items-center gap-x-5 gap-y-3 border-b border-[var(--border)] pb-5">
              <span className="inline-flex bg-[var(--accent)] px-4 py-3 font-[var(--font-mono)] text-[24px] font-semibold leading-none tracking-[-0.025em] text-[var(--surface)]">
                {population?.badge}
              </span>
              <p className="max-w-[330px] font-[var(--font-mono)] text-[20px] leading-snug">
                {population?.label}
              </p>
            </div>

            <h2 className="mt-6 font-[var(--font-headline)] text-[28px] font-semibold leading-tight tracking-[-0.025em]">
              {community?.title}
            </h2>
            <p className="mt-3 max-w-[790px] font-[var(--font-body)] text-[24px] leading-snug">
              {community?.body}
            </p>
          </div>

          <div className="mt-auto px-8 pb-6 pt-5">
            <svg
              aria-hidden="true"
              viewBox="0 0 820 88"
              preserveAspectRatio="none"
              className="block h-[88px] w-full text-[var(--accent)]"
              fill="none"
            >
              <path
                d="M0 54C126 54 172 41 285 41C405 41 457 52 570 52C682 52 730 34 820 34V88H0Z"
                fill="currentColor"
                fillOpacity="0.09"
              />
              <path
                d="M0 54C126 54 172 41 285 41C405 41 457 52 570 52C682 52 730 34 820 34"
                stroke="currentColor"
                strokeWidth="2"
                vectorEffect="non-scaling-stroke"
              />
              <path
                d="M0 73H820"
                stroke="currentColor"
                strokeOpacity="0.3"
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
              />
              <path
                d="M0 87H820"
                stroke="var(--border)"
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
              />
            </svg>
          </div>
        </article>
      </div>
    </section>
  );
}
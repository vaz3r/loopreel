import React from 'react';
import {
  parseMetricBadge,
  type SlideComponentProps,
} from '../../../src/skeleton/types';

export default function Slide07({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  void brand;
  void totalSlides;

  const items = slide.items ?? [];
  const financial = items[0];
  const cashOut = items[1];
  const rewards = items[2];

  const metrics = slide.metrics ?? [];
  const threshold = metrics[0];
  const effectiveDate = metrics[1];

  const {
    qualifier,
    value: metric,
    unit,
  } = parseMetricBadge(threshold?.badge ?? '$15');

  return (
    <section className="flex flex-col h-full min-h-0 w-full text-[var(--ink)]">
      <header className="shrink-0">
        <p className="font-[var(--font-mono)] text-[20px] leading-[26px] tracking-[0.12em] text-[var(--accent)]">
          {slide.kicker}
        </p>

        <h1 className="mt-3 max-w-[940px] font-[var(--font-headline)] text-[54px] font-bold leading-[1.02] tracking-[-0.04em]">
          {slide.headline}
        </h1>

        <p className="mt-3 max-w-[920px] font-[var(--font-body)] text-[28px] leading-[35px]">
          {slide.subheadline}
        </p>
      </header>

      <div className="mt-5 flex min-h-0 flex-1 flex-col justify-between gap-4">
        <article className="shrink-0 border border-[var(--border)] bg-[var(--surface)] px-6 py-4">
          <h2 className="font-[var(--font-headline)] text-[28px] font-semibold leading-[32px] tracking-[-0.02em]">
            {financial?.title || financial?.label}
          </h2>
          <p className="mt-2 font-[var(--font-body)] text-[28px] leading-[34px]">
            {financial?.body}
          </p>
        </article>

        <article className="relative flex shrink-0 flex-col items-center border-y-2 border-[var(--accent)] px-6 py-4 text-center">
          <svg
            aria-hidden="true"
            focusable="false"
            viewBox="0 0 32 32"
            className="absolute left-0 top-0 h-8 w-8 text-[var(--accent)]"
            fill="none"
          >
            <path
              d="M1 31V1H31"
              stroke="currentColor"
              strokeWidth="2"
            />
          </svg>
          <svg
            aria-hidden="true"
            focusable="false"
            viewBox="0 0 32 32"
            className="absolute bottom-0 right-0 h-8 w-8 text-[var(--accent)]"
            fill="none"
          >
            <path
              d="M1 31H31V1"
              stroke="currentColor"
              strokeWidth="2"
            />
          </svg>

          <h2 className="font-[var(--font-headline)] text-[32px] font-semibold leading-[38px] tracking-[-0.02em]">
            {cashOut?.title || cashOut?.label}
          </h2>

          <p className="mt-2 font-[var(--font-mono)] text-[22px] leading-[28px] tracking-[0.08em] text-[var(--accent)]">
            {threshold?.qualifier || qualifier}
          </p>

          <div className="flex shrink-0 items-baseline justify-center gap-2 text-[var(--accent)]">
            <span className="font-[var(--font-mono)] text-[84px] font-bold leading-none tracking-[-0.06em] tabular-nums">
              {metric}
            </span>
            {unit && (
              <span className="font-[var(--font-body)] text-[28px] leading-[34px]">
                {unit}
              </span>
            )}
          </div>

          <p className="mt-2 border border-[var(--border)] bg-[var(--surface)] px-4 py-1 font-[var(--font-mono)] text-[20px] leading-[26px]">
            {effectiveDate?.label}
          </p>

          <p className="mt-2 font-[var(--font-mono)] text-[20px] leading-[26px]">
            {threshold?.label}
          </p>

          <p className="mt-2 max-w-[850px] font-[var(--font-body)] text-[28px] leading-[34px]">
            {cashOut?.body}
          </p>
        </article>

        <article className="shrink-0 border border-[var(--border)] bg-[var(--surface)] px-6 py-4">
          <h2 className="font-[var(--font-headline)] text-[28px] font-semibold leading-[32px] tracking-[-0.02em]">
            {rewards?.title || rewards?.label}
          </h2>
          <p className="mt-2 font-[var(--font-body)] text-[28px] leading-[34px]">
            {rewards?.body}
          </p>
        </article>

        <div className="flex shrink-0 items-center gap-5">
          <svg
            aria-hidden="true"
            focusable="false"
            viewBox="0 0 640 4"
            preserveAspectRatio="none"
            className="h-1 min-w-0 flex-1 text-[var(--accent)]"
          >
            <path
              d="M0 2H640"
              stroke="currentColor"
              strokeWidth="4"
            />
          </svg>
          <p className="shrink-0 font-[var(--font-headline)] text-[32px] font-bold leading-[38px] tracking-[-0.04em]">
            The Fine Print
          </p>
        </div>
      </div>
    </section>
  );
}
import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

function PopulationFigure({ badge }: { badge: string }) {
  const [metric, ...unitWords] = (badge ?? '').split(/\s+/);
  const approximate = metric === 'nearly';
  const numeral = approximate ? unitWords : metric;
  const unit = (approximate ? unitWords.slice(1) : unitWords).join(' ');

  return (
    <div className="font-[var(--font-mono)]">
      <div className="flex flex-wrap items-baseline gap-x-4">
        {approximate && (
          <span className="text-[28px] leading-tight">{metric}</span>
        )}
        <span className="text-[56px] font-bold leading-none tracking-[-0.045em] tabular-nums">
          {numeral}
        </span>
      </div>
      <div className="mt-3 text-[24px] leading-snug">{unit}</div>
    </div>
  );
}

export default function Slide06({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  const items = slide.items ?? [];
  const ancient = items[0];
  const modern = items[1];

  return (
    <section className="flex flex-col h-full min-h-0 w-full text-[var(--ink)]">
      <header className="flex flex-col gap-6">
        <div className="flex items-center gap-5">
          <span className="h-[2px] w-12 shrink-0 bg-[var(--accent)]" />
          <p className="font-[var(--font-mono)] text-[22px] uppercase leading-tight tracking-[0.16em] text-[var(--accent)]">
            {slide.kicker}
          </p>
        </div>

        <h1 className="max-w-[900px] font-[var(--font-headline)] text-[64px] font-bold leading-[1.04] tracking-[-0.04em]">
          {slide.headline}
        </h1>

        <p className="max-w-[850px] font-[var(--font-body)] text-[28px] leading-snug">
          {slide.subheadline}
        </p>
      </header>

      <div className="mt-10 flex flex-col gap-8">
        <article className="mr-[40px] flex min-h-[536px] min-w-0 flex-col border-2 border-[var(--ink)] p-10">
          <div className="flex items-start justify-between gap-6">
            <h2 className="font-[var(--font-headline)] text-[36px] font-semibold leading-tight tracking-[-0.025em]">
              {ancient?.label || ancient?.title}
            </h2>

            <svg
              aria-hidden="true"
              viewBox="0 0 48 48"
              className="h-12 w-12 shrink-0 text-[var(--ink)]"
              fill="none"
            >
              <path
                d="M6 30V6H30M18 42H42V18"
                stroke="currentColor"
                strokeWidth="2"
              />
            </svg>
          </div>

          <div className="mt-12">
            <PopulationFigure badge={ancient?.badge ?? ''} />
          </div>

          <p className="mt-6 max-w-[740px] font-[var(--font-body)] text-[28px] leading-snug">
            {ancient?.body}
          </p>

          <div
            aria-hidden="true"
            className="mt-auto pt-8"
          >
            <div className="h-px w-full bg-[var(--border)]" />
          </div>
        </article>

        <article className="ml-[40px] flex min-h-[456px] min-w-0 flex-col border-l-[6px] border-[var(--accent)] bg-[var(--surface)] p-10">
          <h2 className="font-[var(--font-headline)] text-[36px] font-semibold leading-tight tracking-[-0.025em]">
            {modern?.label || modern?.title}
          </h2>

          <div className="mt-10">
            <PopulationFigure badge={modern?.badge ?? ''} />
          </div>

          <p className="mt-6 max-w-[740px] font-[var(--font-body)] text-[28px] leading-snug">
            {modern?.body}
          </p>
        </article>
      </div>
    </section>
  );
}
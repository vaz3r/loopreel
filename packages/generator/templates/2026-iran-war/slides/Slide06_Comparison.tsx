import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

type PopulationEntry = {
  badge: string;
  label: string;
  body: string;
};

export default function Slide06({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  const telemetry =
    (
      slide as typeof slide & {
        telemetry?: PopulationEntry[];
      }
    ).telemetry ?? [];

  const ancient = telemetry[0];
  const modern = telemetry[1];

  return (
    <section className="flex flex-col h-full min-h-0 w-full text-[var(--ink)]">
      <header className="flex shrink-0 flex-col gap-5 pb-8">
        <p className="font-[var(--font-mono)] text-[22px] leading-snug tracking-[0.12em] text-[var(--accent)]">
          {slide.kicker}
        </p>

        <h1 className="max-w-[900px] font-[var(--font-headline)] text-[42px] font-bold leading-[1.08] tracking-[-0.035em]">
          {slide.headline}
        </h1>

        <p className="max-w-[900px] font-[var(--font-body)] text-[26px] leading-snug">
          {slide.subheadline}
        </p>
      </header>

      <div className="grid min-h-0 flex-1 grid-cols-2 border-y border-[var(--border)]">
        <article className="flex min-w-0 flex-col bg-[var(--paper,#0D0E12)] px-8 pb-12 pt-9">
          <h2 className="font-[var(--font-headline)] text-[34px] font-semibold leading-tight tracking-[-0.025em]">
            {ancient?.label}
          </h2>

          <svg
            aria-hidden="true"
            viewBox="0 0 400 32"
            className="mt-7 h-8 w-full shrink-0 text-[var(--border)]"
            fill="none"
            preserveAspectRatio="none"
          >
            <path d="M0 16H400" stroke="currentColor" strokeWidth="1" />
            <path
              d="M0 5V27"
              stroke="var(--accent)"
              strokeWidth="2"
              vectorEffect="non-scaling-stroke"
            />
          </svg>

          <p className="mt-16 max-w-[370px] font-[var(--font-mono)] text-[36px] font-bold leading-[1.22] tracking-[-0.035em]">
            {ancient?.badge}
          </p>

          <div className="mt-auto pt-16">
            <div className="mb-6 h-[2px] w-12 bg-[var(--accent)]" />
            <p className="font-[var(--font-body)] text-[23px] leading-[1.5]">
              {ancient?.body}
            </p>
          </div>
        </article>

        <article className="flex min-w-0 flex-col border-l border-[var(--accent)] bg-[var(--surface)] px-8 pb-12 pt-9">
          <h2 className="font-[var(--font-headline)] text-[34px] font-semibold leading-tight tracking-[-0.025em]">
            {modern?.label}
          </h2>

          <svg
            aria-hidden="true"
            viewBox="0 0 400 32"
            className="mt-7 h-8 w-full shrink-0 text-[var(--border)]"
            fill="none"
            preserveAspectRatio="none"
          >
            <path d="M0 16H400" stroke="currentColor" strokeWidth="1" />
            <path
              d="M0 5V27"
              stroke="var(--accent)"
              strokeWidth="2"
              vectorEffect="non-scaling-stroke"
            />
          </svg>

          <p className="mt-16 max-w-[370px] font-[var(--font-mono)] text-[36px] font-bold leading-[1.22] tracking-[-0.035em]">
            {modern?.badge}
          </p>

          <div className="mt-auto pt-16">
            <div className="mb-6 h-[2px] w-12 bg-[var(--accent)]" />
            <p className="font-[var(--font-body)] text-[23px] leading-[1.5]">
              {modern?.body}
            </p>
          </div>
        </article>
      </div>
    </section>
  );
}
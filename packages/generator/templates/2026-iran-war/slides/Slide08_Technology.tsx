import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

export default function Slide08({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  const telemetry = slide.telemetry ?? [];
  const frequency = telemetry[0];
  const service = telemetry[1];
  const [frequencyValue, ...frequencyUnit] = (frequency?.badge ?? '').split(
    /\s+/,
  );

  return (
    <section className="flex flex-col h-full min-h-0 w-full text-[var(--ink)]">
      <header className="flex shrink-0 flex-col gap-4">
        <p className="font-[var(--font-mono)] text-[20px] uppercase leading-[1.3] tracking-[0.16em] text-[var(--accent)]">
          {slide.kicker}
        </p>

        <h1 className="font-[var(--font-headline)] text-[44px] font-bold leading-[1.08] tracking-[-0.04em]">
          {slide.headline}
        </h1>

        <p className="max-w-[880px] font-[var(--font-body)] text-[25px] leading-snug">
          {slide.subheadline}
        </p>
      </header>

      <div className="mt-7 flex min-h-0 flex-1 flex-col items-center justify-center border-t border-[var(--border)] py-5">
        <div className="flex items-baseline justify-center gap-5">
          <span className="font-[var(--font-mono)] text-[116px] font-bold leading-none tracking-[-0.08em] text-[var(--accent)]">
            {frequencyValue}
          </span>
          <span className="font-[var(--font-mono)] text-[42px] leading-none tracking-[-0.04em]">
            {frequencyUnit.join(' ')}
          </span>
        </div>

        <h2 className="mt-4 text-center font-[var(--font-headline)] text-[32px] font-semibold leading-tight tracking-[-0.02em]">
          {frequency?.label}
        </h2>

        <svg
          aria-hidden="true"
          focusable="false"
          viewBox="0 0 840 200"
          className="my-4 h-[200px] w-full shrink-0"
          fill="none"
        >
          <path
            d="M 341 83 A 88 88 0 0 1 499 83"
            stroke="var(--accent)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M 296 68 A 135 135 0 0 1 544 68"
            stroke="var(--accent)"
            strokeWidth="2"
            strokeLinecap="round"
            opacity="0.55"
          />

          <path
            d="M 420 62 L 396 180 H 444 Z"
            fill="var(--surface)"
            stroke="var(--ink)"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <path
            d="M 420 45 V 62
               M 411 106 H 429
               M 405 136 H 435
               M 400 161 H 440
               M 411 106 L 435 136
               M 429 106 L 405 136
               M 405 136 L 440 161
               M 435 136 L 400 161"
            stroke="var(--ink)"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <circle cx="420" cy="44" r="5" fill="var(--accent)" />

          <path
            d="M 420 82 L 344 180 M 420 82 L 496 180"
            stroke="var(--border)"
            strokeWidth="1.5"
          />
          <path
            d="M 256 181 H 584"
            stroke="var(--border)"
            strokeWidth="2"
          />
          <path
            d="M 404 181 H 436"
            stroke="var(--accent)"
            strokeWidth="3"
          />
        </svg>

        <p className="max-w-[800px] text-center font-[var(--font-body)] text-[25px] leading-snug">
          {frequency?.body}
        </p>
      </div>

      <div className="mt-7 shrink-0 border-t-2 border-[var(--accent)] bg-[var(--surface)] px-8 py-6">
        <div className="flex items-center gap-5">
          <span
            aria-hidden="true"
            className="h-3 w-3 shrink-0 bg-[var(--accent)]"
          />
          <p className="font-[var(--font-mono)] text-[38px] font-semibold leading-tight tracking-[-0.04em] text-[var(--accent)]">
            {service?.badge}
          </p>
        </div>

        <h2 className="mt-4 font-[var(--font-headline)] text-[32px] font-semibold leading-tight tracking-[-0.02em]">
          {service?.label}
        </h2>

        <p className="mt-3 max-w-[860px] font-[var(--font-body)] text-[25px] leading-snug">
          {service?.body}
        </p>
      </div>
    </section>
  );
}
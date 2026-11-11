import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

export default function Slide13({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  const content = slide as {
    headline?: string;
    stat?: {
      value?: string;
      label?: string;
      detail?: string;
    };
  };

  const headline = content.headline ?? 'An empty floor proves very little.';
  const value = content.stat?.value ?? '94.8%';
  const label =
    content.stat?.label ?? 'Unoccupied floor — hypothetical study';
  const detail =
    content.stat?.detail ??
    'Illustrative calculation, not measured research: 23.7 m² clear within a 25 m² room leaves 1.3 m² occupied. The percentage says nothing about comfortable seating, accessible routes, or adequate storage. Do not mistake vacancy for generosity.';

  return (
    <section
      aria-labelledby="slide-13-headline"
      className="flex h-full min-h-0 flex-col justify-between gap-10 text-[var(--ink)] font-[var(--font-body)]"
    >
      <div className="space-y-7">
        <div className="inline-flex items-center gap-3 rounded-full border border-[var(--border)] bg-[var(--surface)] px-4 py-2">
          <span
            aria-hidden="true"
            className="h-2 w-2 rounded-full bg-[var(--accent)]"
          />
          <span className="font-[var(--font-mono)] text-sm uppercase tracking-[0.16em]">
            Illustration, not evidence
          </span>
        </div>

        <h1
          id="slide-13-headline"
          className="max-w-[850px] font-[var(--font-headline)] text-6xl font-bold leading-[1.04] tracking-tight"
        >
          {headline}
        </h1>
      </div>

      <div className="space-y-8">
        <div className="space-y-5">
          <p className="whitespace-nowrap font-[var(--font-mono)] text-9xl font-bold leading-none tracking-[-0.08em] text-[var(--accent)]">
            {value}
          </p>
          <p className="max-w-[680px] text-2xl leading-snug">
            {label}
          </p>
        </div>

        <figure className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-7 shadow-sm">
          <figcaption className="mb-6 flex items-center justify-between gap-4 font-[var(--font-mono)] text-sm uppercase tracking-[0.12em]">
            <span>Hypothetical floor allocation</span>
            <span className="shrink-0">25 m² room</span>
          </figcaption>

          <div
            role="img"
            aria-label="Illustrative allocation: 23.7 square metres clear and 1.3 square metres occupied within a 25 square metre room."
            className="flex h-24 overflow-hidden rounded-lg border border-[var(--border)]"
          >
            <div
              className="h-full bg-[var(--accent)] opacity-15"
              style={{ width: '94.8%' }}
            />
            <div
              className="h-full border-l border-[var(--border)] bg-[var(--ink)]"
              style={{ width: '5.2%' }}
            />
          </div>

          <div className="mt-5 flex justify-between gap-6">
            <div>
              <p className="font-[var(--font-mono)] text-2xl font-bold">
                23.7 m²
              </p>
              <p className="mt-1 text-base opacity-65">Clear floor</p>
            </div>
            <div className="text-right">
              <p className="font-[var(--font-mono)] text-2xl font-bold">
                1.3 m²
              </p>
              <p className="mt-1 text-base opacity-65">Occupied floor</p>
            </div>
          </div>
        </figure>
      </div>

      <div className="border-l-4 border-[var(--accent)] pl-8">
        <p className="mb-4 font-[var(--font-mono)] text-sm uppercase tracking-[0.16em] text-[var(--accent)]">
          What the number cannot tell you
        </p>
        <p className="max-w-[820px] text-2xl leading-[1.6]">
          {detail}
        </p>
      </div>
    </section>
  );
}
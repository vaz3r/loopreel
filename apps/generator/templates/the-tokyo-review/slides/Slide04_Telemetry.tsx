import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

type Metric = {
  value: string;
  label: string;
  context: string;
};

const defaultMetrics: Metric[] = [
  {
    value: '290',
    label: 'Site area · square meters',
    context:
      'The Tokyo plot accommodates the owner’s dwelling and five rental apartments, with gardens and interconnected courtyards between volumes.',
  },
  {
    value: '10',
    label: 'Detached volumes',
    context:
      'The steel-sheet volumes do not touch. The house is an arrangement of buildings rather than a single enclosure.',
  },
  {
    value: '5',
    label: 'Rental mini-houses',
    context:
      'Each includes its own kitchenette and bathroom. Independent domestic facilities underpin the possibility of living alongside others.',
  },
];

export default function Slide04({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  const content = slide as unknown as {
    headline?: string;
    metrics?: Metric[];
  };

  const metrics = content.metrics ?? defaultMetrics;
  void brand;
  void totalSlides;

  return (
    <section
      aria-labelledby="slide-4-headline"
      className="flex h-full min-h-0 flex-col gap-8 text-[var(--ink)] font-[var(--font-body)]"
    >
      <div className="shrink-0 space-y-5">
        <div className="flex items-center gap-3">
          <span className="h-2 w-2 bg-[var(--accent)]" aria-hidden="true" />
          <span className="font-[var(--font-mono)] text-sm uppercase tracking-[0.2em] text-[var(--accent)]">
            Spatial inventory
          </span>
          <div
            className="h-px flex-1 bg-[var(--border)]"
            aria-hidden="true"
          />
        </div>

        <h2
          id="slide-4-headline"
          className="max-w-[850px] font-[var(--font-headline)] text-6xl font-bold leading-[1.04] tracking-tight"
        >
          {content.headline ?? 'Moriyama, measured in separation'}
        </h2>
      </div>

      <div className="grid min-h-0 flex-1 auto-rows-fr gap-5">
        {metrics.map((metric, index) => (
          <article
            key={`${metric.label}-${index}`}
            className="relative grid grid-cols-[0.82fr_1.18fr] gap-8 overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--surface)] p-8 shadow-sm"
          >
            <div className="flex flex-col justify-between gap-5 border-r border-[var(--border)] pr-7">
              <span className="w-fit rounded-full border border-[var(--border)] px-3 py-1 font-[var(--font-mono)] text-xs tracking-[0.16em] text-[var(--accent)]">
                {String(index + 1).padStart(2, '0')}
              </span>

              <div className="space-y-3">
                <p className="font-[var(--font-mono)] text-7xl font-bold leading-none tracking-tighter tabular-nums text-[var(--accent)]">
                  {metric.value}
                </p>
                <h3 className="max-w-[230px] text-lg font-semibold leading-snug">
                  {metric.label}
                </h3>
              </div>
            </div>

            <div className="flex flex-col justify-between gap-5">
              <div
                aria-hidden="true"
                className="flex h-8 items-center gap-3"
              >
                <span className="h-5 w-5 border border-[var(--accent)]" />
                <span className="h-px w-8 bg-[var(--border)]" />
                <span className="h-7 w-4 border border-[var(--border)]" />
                <span className="h-px w-8 bg-[var(--border)]" />
                <span className="h-4 w-6 bg-[var(--accent)] opacity-20" />
              </div>

              <p className="text-xl leading-relaxed">
                {metric.context}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
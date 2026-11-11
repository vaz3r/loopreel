import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

type Metric = {
  value: string;
  label: string;
  context: string;
};

const defaultMetrics: Metric[] = [
  {
    value: '$250',
    label: 'Ring Drone Cam starting price',
    context:
      'The same starting price as its predecessor, the Ring Always Home Cam.',
  },
  {
    value: '$1,000',
    label: 'Ring Rover Cam price',
    context:
      'Amazon positions the wheeled device as a security robot for businesses.',
  },
  {
    value: '180',
    label: 'Days of cloud video storage, maximum',
    context:
      'For Rover videos triggered by doorbell rings, motion events and Live View events.',
  },
];

const tags = ['FLIGHT / ENTRY PRICE', 'GROUND / PURCHASE PRICE', 'CLOUD / RETENTION LIMIT'];

export default function Slide04({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  const data = slide as unknown as {
    headline?: string;
    metrics?: Metric[];
  };

  const metrics = data.metrics?.length === 3 ? data.metrics : defaultMetrics;
  void brand;

  return (
    <section
      aria-label={`Slide 4 of ${totalSlides}: pricing and video retention`}
      className="flex h-full min-h-0 flex-col gap-8 text-[var(--ink)] font-[var(--font-body)]"
    >
      <div className="shrink-0">
        <div className="mb-5 flex items-center gap-3">
          <span className="h-2 w-2 rounded-full bg-[var(--accent)]" />
          <span className="font-[var(--font-mono)] text-xs font-semibold uppercase tracking-[0.24em] text-[var(--accent)]">
            Consumer robotics / By the numbers
          </span>
          <span className="h-px flex-1 bg-[var(--border)]" />
        </div>

        <h2 className="max-w-[900px] font-[var(--font-headline)] text-6xl font-bold leading-[1.05] tracking-[-0.045em]">
          {data.headline ??
            'The price of movement. The persistence of footage.'}
        </h2>
      </div>

      <div className="grid min-h-0 flex-1 grid-rows-3 gap-5">
        {metrics.map((metric, index) => (
          <article
            key={`${index}-${metric.label}`}
            className="relative flex min-h-0 flex-col justify-between overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--surface)] p-8 shadow-[0_8px_24px_rgba(0,0,0,0.12)]"
          >
            <div
              aria-hidden="true"
              className="absolute bottom-8 left-0 top-8 w-[3px] rounded-r-full bg-[var(--accent)]"
            />

            <div className="mb-5 flex items-center justify-between gap-4">
              <span className="font-[var(--font-mono)] text-xs font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">
                {tags[index]}
              </span>

              <span className="rounded-full border border-[var(--border)] px-3 py-1 font-[var(--font-mono)] text-[10px] uppercase tracking-[0.16em]">
                {index === 0
                  ? 'Starting at'
                  : index === 1
                    ? 'Device price'
                    : 'Maximum'}
              </span>
            </div>

            <div className="grid grid-cols-[0.95fr_1.05fr] items-center gap-7">
              <div className="flex flex-col items-start">
                <span className="whitespace-nowrap font-[var(--font-mono)] text-7xl font-bold leading-none tracking-[-0.065em] text-[var(--accent)] tabular-nums">
                  {metric.value}
                </span>
                <span className="mt-3 font-[var(--font-mono)] text-[11px] uppercase tracking-[0.2em] opacity-60">
                  {index === 2 ? 'Days of footage' : 'Hardware'}
                </span>
              </div>

              <div className="border-l border-[var(--border)] pl-7">
                <h3 className="font-[var(--font-headline)] text-2xl font-bold leading-tight tracking-tight">
                  {metric.label}
                </h3>
                <p className="mt-3 text-lg leading-relaxed opacity-75">
                  {metric.context}
                </p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
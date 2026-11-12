import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

type ComparisonItem = {
  title?: string;
  label?: string;
  body?: string;
};

type ComparisonData = {
  kicker?: string;
  headline?: string;
  subheadline?: string;
  items?: ComparisonItem[];
  cards?: ComparisonItem[];
  telemetry?: {
    value?: string;
    label?: string;
  }[];
};

export default function Slide04({ slide }: SlideComponentProps) {
  const data = slide as ComparisonData;
  const items = data.items ?? [];
  const cards = data.cards ?? items;
  const telemetry = data.telemetry ?? [];

  const columns = [
    { item: cards[0], metric: telemetry[0] },
    { item: cards[1], metric: telemetry[1] },
  ];

  return (
    <section className="flex flex-col h-full min-h-0 w-full text-[var(--ink)]">
      <header className="shrink-0 pb-10">
        <p className="font-[var(--font-mono)] text-[22px] font-medium uppercase leading-snug tracking-[0.16em] text-[var(--accent)]">
          {data.kicker}
        </p>

        <h1 className="mt-7 max-w-[900px] font-[var(--font-headline)] text-[68px] font-bold leading-[1.02] tracking-[-0.045em]">
          {data.headline}
        </h1>

        <p className="mt-7 max-w-[900px] font-[var(--font-body)] text-[28px] leading-snug">
          {data.subheadline}
        </p>
      </header>

      <div className="relative grid min-h-0 flex-1 grid-cols-2 border-t-2 border-[var(--border)]">
        <svg
          aria-hidden="true"
          focusable="false"
          className="pointer-events-none absolute inset-y-0 left-1/2 z-10 h-full w-[4px] -translate-x-1/2 text-[var(--accent)]"
          viewBox="0 0 4 100"
          preserveAspectRatio="none"
        >
          <path d="M2 0V100" stroke="currentColor" strokeWidth="4" />
        </svg>

        {columns.map(({ item, metric }, index) => (
          <article
            key={index}
            className={`flex min-w-0 flex-col px-9 pb-10 pt-12 ${
              index === 0 ? 'bg-white' : 'bg-[var(--surface)]'
            }`}
          >
            <div className="flex h-[96px] shrink-0 items-start">
              <p className="whitespace-nowrap font-[var(--font-headline)] text-[52px] font-bold leading-[1.08] tracking-[-0.05em]">
                {metric?.value}
              </p>
            </div>

            <p className="min-h-[108px] font-[var(--font-mono)] text-[22px] leading-snug tracking-[-0.02em]">
              {metric?.label}
            </p>

            <div className="mb-9 h-px w-16 shrink-0 bg-[var(--border)]" />

            <h2 className="min-h-[112px] font-[var(--font-headline)] text-[36px] font-semibold leading-[1.12] tracking-[-0.025em]">
              {item?.title || item?.label}
            </h2>

            <p className="font-[var(--font-body)] text-[28px] leading-[1.5]">
              {item?.body}
            </p>

            <div aria-hidden="true" className="min-h-[120px] flex-1" />
          </article>
        ))}
      </div>
    </section>
  );
}
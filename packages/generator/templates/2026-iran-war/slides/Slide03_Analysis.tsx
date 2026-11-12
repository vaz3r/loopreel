import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

type LedgerEntry = {
  title?: string;
  label?: string;
  body?: string;
};

type EvidenceSlide = {
  kicker?: string;
  headline?: string;
  subheadline?: string;
  cards?: LedgerEntry[];
  items?: LedgerEntry[];
  metrics?: {
    value: string;
    label: string;
  }[];
};

export default function Slide03({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  const data = slide as unknown as EvidenceSlide;
  const cards = data.cards ?? data.items ?? [];
  const metrics = data.metrics ?? [];

  void brand;
  void totalSlides;

  return (
    <section className="flex flex-col h-full min-h-0 w-full text-[var(--ink)]">
      <div className="mx-4 flex h-full min-h-0 flex-col gap-8">
        <header className="shrink-0">
          <p className="font-[var(--font-mono)] text-[22px] uppercase leading-snug tracking-[0.16em] text-[var(--accent)]">
            {data.kicker}
          </p>

          <h1 className="mt-6 max-w-[900px] font-[var(--font-headline)] text-[64px] font-bold leading-[1.02] tracking-[-0.04em]">
            {data.headline}
          </h1>

          <p className="mt-6 max-w-[900px] font-[var(--font-body)] text-[36px] leading-[1.25] tracking-[-0.015em]">
            {data.subheadline}
          </p>

          <svg
            aria-hidden="true"
            focusable="false"
            viewBox="0 0 920 24"
            preserveAspectRatio="none"
            className="mt-7 h-6 w-full text-[var(--ink)]"
            fill="none"
          >
            <path
              d="M0 12H920 M0 4V20 M230 8V16 M460 4V20 M690 8V16 M920 4V20"
              stroke="currentColor"
              strokeWidth="1"
              opacity="0.22"
            />
            <path
              d="M0 12H92"
              stroke="var(--accent)"
              strokeWidth="3"
            />
          </svg>
        </header>

        <div className="flex min-h-0 flex-1 flex-col border-y border-[var(--border)] bg-[var(--surface)]">
          {cards.map((card, index) => (
            <article
              key={`${card.title ?? card.label}-${index}`}
              className="relative flex min-h-0 flex-1 flex-col justify-center border-l-[4px] border-[var(--accent)] px-9 py-7"
            >
              {index > 0 && (
                <div
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-px bg-[var(--ink)] opacity-[0.14]"
                />
              )}

              <div className="flex items-center justify-between gap-7">
                <h2 className="font-[var(--font-headline)] text-[38px] font-semibold leading-[1.12] tracking-[-0.025em]">
                  {card.title ?? card.label}
                </h2>

                <svg
                  aria-hidden="true"
                  focusable="false"
                  viewBox="0 0 40 40"
                  className="h-10 w-10 shrink-0 text-[var(--accent)]"
                  fill="none"
                >
                  <path
                    d="M14 5H5V14 M26 5H35V14 M5 26V35H14 M35 26V35H26"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    opacity="0.65"
                  />
                  <path
                    d="M14 20H26"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                </svg>
              </div>

              <p className="mt-4 max-w-[830px] font-[var(--font-body)] text-[32px] leading-[1.3] tracking-[-0.012em]">
                {card.body}
              </p>
            </article>
          ))}
        </div>

        <div className="grid shrink-0 grid-cols-2 gap-6">
          {metrics.map((metric, index) => (
            <div
              key={`${metric.value}-${index}`}
              className="flex min-w-0 flex-col border border-[var(--border)] px-7 py-7"
            >
              <div className="flex h-[96px] items-center">
                <p
                  className={`font-[var(--font-mono)] font-bold tracking-[-0.045em] text-[var(--accent)] ${
                    index === 0
                      ? 'whitespace-nowrap text-[38px] leading-[1.1]'
                      : 'text-[84px] leading-none'
                  }`}
                >
                  {metric.value}
                </p>
              </div>

              <p className="mt-3 font-[var(--font-mono)] text-[22px] leading-[1.3] tracking-[0.015em]">
                {metric.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
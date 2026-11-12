import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

type CostSlideContent = {
  kicker?: string;
  headline?: string;
  subheadline?: string;
  cards?: Array<{
    title?: string;
    body?: string;
  }>;
  metrics?: Array<{
    value?: string;
    label?: string;
  }>;
};

export default function Slide08({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  const content = slide as unknown as CostSlideContent;
  const cards = content.cards ?? [];
  const metrics = content.metrics ?? [];
  const spending = metrics[0];
  const cutoff = metrics[1];

  const metricValue = spending?.value ?? '';
  const separator = metricValue.lastIndexOf(' ');
  const amount =
    separator === -1 ? metricValue : metricValue.slice(0, separator);
  const unit = separator === -1 ? '' : metricValue.slice(separator + 1);

  return (
    <section className="flex flex-col h-full min-h-0 w-full text-[var(--ink)]">
      <div className="flex h-full min-h-0 flex-col gap-8">
        <header className="flex shrink-0 flex-col gap-5">
          <div className="flex items-center gap-5">
            <span
              aria-hidden="true"
              className="h-3 w-3 shrink-0 bg-[var(--accent)]"
            />
            <p className="font-[var(--font-mono)] text-[22px] uppercase leading-tight tracking-[0.16em] text-[var(--accent)]">
              {content.kicker}
            </p>
            <div
              aria-hidden="true"
              className="h-px flex-1 bg-[var(--border)]"
            />
          </div>

          <h1 className="max-w-[900px] font-[var(--font-headline)] text-[64px] font-bold leading-[1.02] tracking-[-0.04em]">
            {content.headline}
          </h1>

          <p className="max-w-[920px] font-[var(--font-body)] text-[36px] leading-[1.25] tracking-[-0.015em]">
            {content.subheadline}
          </p>
        </header>

        <figure className="m-0 flex min-h-[390px] flex-1 flex-col items-center justify-center border-y border-[var(--border)] py-6">
          <svg
            viewBox="0 0 952 270"
            role="img"
            aria-label={metricValue}
            className="block h-[270px] w-full shrink-0 text-[var(--accent)]"
          >
            <g
              fill="none"
              stroke="var(--border)"
              strokeWidth="2"
              aria-hidden="true"
            >
              <path d="M44 83V35H104 M848 35H908V83" />
              <path d="M44 187V235H104 M848 235H908V187" />
              <path d="M44 135H92 M860 135H908" />
            </g>

            <g fill="currentColor" textAnchor="middle">
              <text
                x="476"
                y="146"
                className="font-[var(--font-mono)] text-[132px] font-bold tracking-[-0.06em]"
              >
                {amount}
              </text>
              <text
                x="476"
                y="230"
                className="font-[var(--font-headline)] text-[64px] font-bold tracking-[-0.035em]"
              >
                {unit}
              </text>
            </g>
          </svg>

          <div className="flex shrink-0 items-center gap-5 border border-[var(--border)] bg-[var(--surface)] px-6 py-3">
            <span className="font-[var(--font-mono)] text-[20px] uppercase leading-tight tracking-[0.1em]">
              {cutoff?.label}
            </span>
            <span
              aria-hidden="true"
              className="h-7 w-px bg-[var(--border)]"
            />
            <span className="font-[var(--font-mono)] text-[26px] font-semibold leading-tight">
              {cutoff?.value}
            </span>
          </div>

          <figcaption className="mt-5 text-center font-[var(--font-body)] text-[26px] leading-snug">
            {spending?.label}
          </figcaption>
        </figure>

        <div className="flex shrink-0 flex-col gap-5">
          {cards.slice(0, 3).map((card, index) => (
            <article
              key={`${card.title ?? 'footnote'}-${index}`}
              className="border border-[var(--border)] bg-[var(--surface)] px-8 py-7"
            >
              <div className="mb-3 flex items-center gap-4">
                <svg
                  viewBox="0 0 28 28"
                  aria-hidden="true"
                  className="h-7 w-7 shrink-0 text-[var(--accent)]"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M3 3V25H25" />
                  <path d="M10 10H24M10 17H20" />
                </svg>
                <h2 className="font-[var(--font-headline)] text-[34px] font-semibold leading-tight tracking-[-0.02em]">
                  {card.title}
                </h2>
              </div>

              <p className="font-[var(--font-body)] text-[30px] leading-[1.25] tracking-[-0.01em]">
                {card.body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
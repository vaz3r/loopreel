import React from 'react';
import {
  parseMetricBadge,
  type SlideComponentProps,
} from '../../../src/skeleton/types';

export default function Slide06({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  const items = slide.items ?? [];
  const metrics = slide.metrics ?? [];

  const panels = [
    { item: items[0], metric: metrics[0], kind: 'clock' },
    { item: items[1], metric: metrics[1], kind: 'stop' },
  ] as const;

  return (
    <section className="flex flex-col h-full min-h-0 w-full text-[var(--ink)]">
      <header className="shrink-0">
        <p className="font-[var(--font-mono)] text-[20px] leading-[1.3] tracking-[0.08em] text-[var(--accent)]">
          {slide.kicker}
        </p>

        <h1 className="mt-4 max-w-[940px] font-[var(--font-headline)] text-[54px] font-bold leading-[1.04] tracking-[-0.04em]">
          {slide.headline}
        </h1>

        <p className="mt-5 max-w-[920px] font-[var(--font-body)] text-[28px] leading-[1.3]">
          {slide.subheadline}
        </p>
      </header>

      <div className="mt-8 grid min-h-0 flex-1 grid-cols-2 divide-x divide-[var(--border)] border border-[var(--border)] bg-[var(--surface)]">
        {panels.map(({ item, metric, kind }) => {
          const parsed = parseMetricBadge(metric?.badge ?? '');
          const qualifier = metric?.qualifier || parsed.qualifier;
          const unit = metric?.unit || parsed.unit;

          return (
            <article
              key={kind}
              className="relative flex min-w-0 flex-col px-7 py-6"
            >
              <span
                aria-hidden="true"
                className={`absolute inset-x-0 top-0 h-[3px] ${
                  kind === 'clock'
                    ? 'bg-[var(--accent)]'
                    : 'bg-[var(--border)]'
                }`}
              />

              <h2 className="min-h-[76px] font-[var(--font-headline)] text-[32px] font-semibold leading-[1.12] tracking-[-0.025em]">
                {item?.title || item?.label}
              </h2>

              <div className="mt-4 flex h-[112px] shrink-0 items-center border-y border-[var(--border)]">
                {kind === 'clock' ? (
                  <svg
                    viewBox="0 0 400 112"
                    className="h-full w-full text-[var(--accent)]"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M24 56H132M268 56H376"
                      stroke="var(--border)"
                      strokeWidth="2"
                    />
                    <circle
                      cx="200"
                      cy="56"
                      r="44"
                      stroke="var(--border)"
                      strokeWidth="2"
                    />
                    <path
                      d="M200 12A44 44 0 1 1 156 56"
                      stroke="currentColor"
                      strokeWidth="5"
                      strokeLinecap="square"
                    />
                    <path
                      d="M200 27V56L222 69"
                      stroke="var(--ink)"
                      strokeWidth="4"
                      strokeLinecap="square"
                    />
                    <circle cx="200" cy="56" r="5" fill="currentColor" />
                    <path
                      d="M200 12V19M244 56H237M200 100V93M156 56H163"
                      stroke="var(--ink)"
                      strokeWidth="2"
                    />
                  </svg>
                ) : (
                  <svg
                    viewBox="0 0 400 112"
                    className="h-full w-full text-[var(--accent)]"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M24 56H104M304 56H376"
                      stroke="var(--border)"
                      strokeWidth="2"
                    />
                    <path
                      d="M216 26H166A30 30 0 0 0 166 86H226A30 30 0 0 0 256 56V26"
                      stroke="var(--border)"
                      strokeWidth="2"
                    />
                    <path
                      d="M216 26H166A30 30 0 0 0 166 86H226A30 30 0 0 0 256 56V34"
                      stroke="currentColor"
                      strokeWidth="5"
                      strokeLinecap="square"
                    />
                    <path
                      d="M246 45L256 34L266 45"
                      stroke="currentColor"
                      strokeWidth="4"
                      strokeLinejoin="miter"
                    />
                    <rect
                      x="236"
                      y="20"
                      width="40"
                      height="7"
                      fill="var(--ink)"
                    />
                  </svg>
                )}
              </div>

              <div className="mt-5">
                <p className="font-[var(--font-body)] text-[22px] leading-[1.3]">
                  {qualifier}
                </p>

                <div className="mt-1 flex items-baseline gap-3">
                  <span className="font-[var(--font-mono)] text-[52px] font-bold leading-none tracking-[-0.05em] text-[var(--accent)] tabular-nums">
                    {parsed.value}
                  </span>
                  {unit && (
                    <span className="font-[var(--font-body)] text-[24px] leading-snug">
                      {unit}
                    </span>
                  )}
                </div>

                <p className="mt-3 max-w-[330px] font-[var(--font-body)] text-[24px] leading-[1.25]">
                  {metric?.label}
                </p>
              </div>

              <div className="mt-auto pt-6">
                <div className="mb-5 h-px w-12 bg-[var(--accent)]" />
                <p className="font-[var(--font-body)] text-[28px] leading-[1.3]">
                  {item?.body}
                </p>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
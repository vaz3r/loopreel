import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

export default function Slide06({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  const cards = slide.cards ?? [];
  const metrics = slide.metrics ?? [];

  const milestones = [
    { card: cards[0], metric: metrics[0] },
    { card: cards[1], metric: metrics[1] },
    { card: cards[2], metric: metrics[2] },
  ];

  return (
    <section className="flex flex-col h-full min-h-0 w-full text-[var(--ink)]">
      <div className="flex h-full min-h-0 flex-col px-4 py-5">
        <header className="flex shrink-0 flex-col gap-6">
          <div className="flex items-center gap-5">
            <span
              aria-hidden="true"
              className="h-[12px] w-[12px] shrink-0 bg-[var(--accent)]"
            />
            <p className="font-[var(--font-mono)] text-[22px] leading-[28px] tracking-[0.16em] text-[var(--accent)]">
              {slide.kicker}
            </p>
          </div>

          <h1 className="max-w-[880px] font-[var(--font-headline)] text-[64px] font-bold leading-[1.02] tracking-[-0.04em]">
            {slide.headline}
          </h1>

          <p className="max-w-[880px] font-[var(--font-body)] text-[36px] leading-[1.25] tracking-[-0.015em]">
            {slide.subheadline}
          </p>
        </header>

        <div className="mt-9 flex shrink-0 items-center gap-6 border-t border-[var(--border)] pt-6">
          <p className="w-[232px] shrink-0 pr-[9px] text-right font-[var(--font-mono)] text-[22px] leading-[30px] tracking-[0.16em] text-[var(--accent)]">
            2026
          </p>
          <div
            aria-hidden="true"
            className="h-px flex-1 bg-[var(--border)]"
          />
        </div>

        <ol className="mt-7 flex min-h-[1050px] flex-1 list-none flex-col p-0">
          {milestones.map(({ card, metric }, index) => (
            <li
              key={`milestone-${index}`}
              className="grid min-h-[350px] flex-1 grid-cols-[232px_minmax(0,1fr)] gap-x-8"
            >
              <div className="relative h-full" aria-hidden="true">
                <svg
                  className="absolute inset-0 h-full w-full text-[var(--accent)]"
                  width="232"
                  height="350"
                  xmlns="http://www.w3.org/2000/svg"
                  focusable="false"
                >
                  {index > 0 && (
                    <line
                      x1="208"
                      y1="0"
                      x2="208"
                      y2="30"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                  )}

                  {index < milestones.length - 1 && (
                    <line
                      x1="208"
                      y1="30"
                      x2="208"
                      y2="100%"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                  )}

                  <circle
                    cx="208"
                    cy="30"
                    r="22"
                    fill="var(--surface)"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <circle
                    cx="208"
                    cy="30"
                    r={index === 2 ? 10 : 7}
                    fill={index === 2 ? 'var(--surface)' : 'currentColor'}
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <path
                    d="M 168 30 H 178"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    opacity="0.6"
                  />
                </svg>
              </div>

              <article className="min-w-0 pb-7">
                <div className="flex h-[60px] items-center">
                  <p className="inline-flex border border-[var(--border)] bg-[var(--surface)] px-4 py-2 font-[var(--font-mono)] text-[22px] leading-[28px] tracking-[0.04em] text-[var(--accent)]">
                    {metric?.value}
                  </p>
                </div>

                <p className="mt-1 font-[var(--font-mono)] text-[20px] leading-[26px] tracking-[0.015em] opacity-65">
                  {metric?.label}
                </p>

                <h2 className="mt-4 font-[var(--font-headline)] text-[38px] font-semibold leading-[1.12] tracking-[-0.025em]">
                  {card?.title}
                </h2>

                <p className="mt-3 font-[var(--font-body)] text-[32px] leading-[1.25] tracking-[-0.015em]">
                  {card?.body}
                </p>
              </article>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
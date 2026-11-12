import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

type RegionalContent = {
  cards?: Array<{ title?: string; body?: string }>;
  metrics?: Array<{ value?: string; label?: string }>;
};

export default function Slide05({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  const content = slide as typeof slide & RegionalContent;
  const cards = content.cards ?? [];
  const metrics = content.metrics ?? [];

  const dispatches = [
    { card: cards[0], metric: metrics[0], width: 'w-[920px]' },
    { card: cards[1], metric: metrics[1], width: 'w-[800px]' },
    { card: cards[2], metric: metrics[2], width: 'w-[920px]' },
  ];

  return (
    <section className="flex flex-col h-full min-h-0 w-full text-[var(--ink)]">
      <div className="flex flex-col gap-8 py-7">
        <header className="flex flex-col gap-6">
          <div className="flex items-center gap-5">
            <span className="h-[12px] w-[12px] shrink-0 bg-[var(--accent)]" />
            <p className="font-[var(--font-mono)] text-[22px] uppercase leading-[1.3] tracking-[0.16em] text-[var(--accent)]">
              {slide.kicker}
            </p>
            <span className="h-px flex-1 bg-[var(--border)]" />
          </div>

          <h1 className="max-w-[900px] font-[var(--font-headline)] text-[64px] font-bold leading-[1.02] tracking-[-0.04em]">
            {slide.headline}
          </h1>

          <p className="max-w-[880px] font-[var(--font-body)] text-[36px] leading-[1.25] tracking-[-0.015em]">
            {slide.subheadline}
          </p>
        </header>

        <div className="flex flex-col gap-5">
          <div className="flex items-center gap-5">
            <span className="font-[var(--font-mono)] text-[22px] font-semibold leading-[1.3] tracking-[0.16em] text-[var(--accent)]">
              2026
            </span>
            <span className="h-px flex-1 bg-[var(--border)]" />
            <svg
              width="60"
              height="28"
              viewBox="0 0 60 28"
              fill="none"
              aria-hidden="true"
              className="shrink-0 text-[var(--accent)]"
            >
              <path
                d="M1 14H59M45 2L59 14L45 26"
                stroke="currentColor"
                strokeWidth="2"
              />
            </svg>
          </div>

          <div className="flex flex-col items-end gap-8 border-l border-[var(--border)] pl-[31px]">
            {dispatches.map(({ card, metric, width }, index) => (
              <article
                key={index}
                className={`relative flex h-[328px] ${width} max-w-full shrink-0 flex-col bg-[var(--surface)]`}
              >
                <div className="flex h-[38px] shrink-0 items-start">
                  <div className="flex h-[38px] shrink-0 items-center bg-[var(--accent)] px-7">
                    <span className="font-[var(--font-mono)] text-[22px] font-semibold uppercase leading-none tracking-[0.1em] text-[var(--paper,#0D0E12)]">
                      {metric?.value}
                    </span>
                  </div>
                  <span className="h-[3px] flex-1 bg-[var(--accent)]" />
                </div>

                <div className="relative flex min-h-0 flex-1 flex-col px-8 pb-7 pt-5">
                  <h2 className="relative z-10 font-[var(--font-headline)] text-[40px] font-semibold leading-[1.15] tracking-[-0.025em]">
                    {card?.title}
                  </h2>

                  <p className="relative z-10 mt-3 font-[var(--font-body)] text-[34px] leading-[1.3] tracking-[-0.015em]">
                    {card?.body}
                  </p>

                  <div className="relative z-10 mt-auto flex items-center gap-3 pt-3">
                    <span className="h-[6px] w-[6px] shrink-0 bg-[var(--accent)]" />
                    <p className="font-[var(--font-mono)] text-[20px] leading-[1.3] tracking-[0.025em]">
                      {metric?.label}
                    </p>
                  </div>

                  <svg
                    viewBox="0 0 120 72"
                    width="120"
                    height="72"
                    fill="none"
                    aria-hidden="true"
                    className="pointer-events-none absolute bottom-4 right-5 text-[var(--border)]"
                  >
                    <g
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="square"
                      strokeLinejoin="miter"
                      transform={
                        index === 1
                          ? 'translate(120 0) scale(-1 1)'
                          : undefined
                      }
                    >
                      <path d="M8 65L24 56L29 43L46 39L51 24L69 29L79 14L97 8L111 13" />
                      <path d="M26 68L39 59L44 48L59 44L65 34L81 37L92 24L112 22" />
                      <path d="M94 56H114M104 46V66" />
                    </g>
                  </svg>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
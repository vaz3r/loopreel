import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

type EditorialCard = {
  title?: string;
  label?: string;
  body?: string;
};

type ElectoralSlide = {
  kicker?: string;
  headline?: string;
  subheadline?: string;
  cards?: EditorialCard[];
  items?: EditorialCard[];
  metrics?: {
    value?: string;
    label?: string;
  }[];
};

export default function Slide09({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  void brand;
  void totalSlides;

  const content = slide as unknown as ElectoralSlide;
  const cards = content.cards ?? content.items ?? [];
  const metrics = content.metrics ?? [];

  const panels = [
    { card: cards[0], metric: metrics[0], mirrored: false },
    { card: cards[1], metric: metrics[1], mirrored: true },
  ];

  return (
    <section className="flex flex-col h-full min-h-0 w-full text-[var(--ink)]">
      <div className="flex shrink-0 flex-col gap-7 pb-10">
        <div className="flex items-center gap-5">
          <span
            aria-hidden="true"
            className="h-[12px] w-[12px] shrink-0 bg-[var(--accent)]"
          />
          <p className="font-[var(--font-mono)] text-[22px] uppercase leading-normal tracking-[0.16em] text-[var(--accent)]">
            {content.kicker}
          </p>
        </div>

        <h1 className="max-w-[920px] font-[var(--font-headline)] text-[64px] font-bold leading-[1.02] tracking-[-0.04em] [text-wrap:balance]">
          {content.headline}
        </h1>

        <p className="max-w-[900px] font-[var(--font-body)] text-[36px] leading-[1.28] tracking-[-0.015em]">
          {content.subheadline}
        </p>
      </div>

      <div className="grid min-h-0 flex-1 grid-rows-[minmax(0,1fr)_72px_minmax(0,1fr)] border-t border-[var(--border)]">
        {panels.map(({ card, metric, mirrored }, index) => (
          <React.Fragment key={index}>
            {index === 1 && (
              <div className="flex items-center gap-5">
                <div
                  aria-hidden="true"
                  className="h-[10px] flex-1 bg-[var(--accent)]"
                />

                <div className="flex shrink-0 items-center gap-3 text-[var(--accent)]">
                  <span className="font-[var(--font-mono)] text-[22px] uppercase leading-none tracking-[0.14em]">
                    one week
                  </span>
                  <svg
                    aria-hidden="true"
                    width="26"
                    height="30"
                    viewBox="0 0 26 30"
                    fill="none"
                  >
                    <path
                      d="M13 3V26M5 18L13 26L21 18"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="square"
                    />
                  </svg>
                </div>

                <div
                  aria-hidden="true"
                  className="h-[10px] flex-1 bg-[var(--accent)]"
                />
              </div>
            )}

            <article className="relative isolate flex min-h-0 flex-col justify-between bg-[var(--surface)] px-8 py-10">
              <svg
                aria-hidden="true"
                className={`pointer-events-none absolute bottom-5 h-[300px] w-[480px] text-[var(--ink)] opacity-[0.055] ${
                  mirrored ? 'left-5' : 'right-5'
                }`}
                viewBox="0 0 480 300"
                fill="none"
              >
                <g transform={mirrored ? 'translate(480 0) scale(-1 1)' : undefined}>
                  <path
                    d="M44 142L164 85H400L446 142L326 200H90L44 142Z"
                    stroke="currentColor"
                    strokeWidth="8"
                    strokeLinejoin="miter"
                  />
                  <path
                    d="M44 142V226L90 276H326L446 216V142M90 200V276M326 200V276"
                    stroke="currentColor"
                    strokeWidth="8"
                  />
                  <path
                    d="M157 148L322 148"
                    stroke="currentColor"
                    strokeWidth="18"
                    strokeLinecap="square"
                  />
                  <path
                    d="M197 18L303 45L278 139L172 112L197 18Z"
                    fill="currentColor"
                  />
                </g>
              </svg>

              <div className="relative z-10 flex items-start justify-between gap-7">
                <h2 className="max-w-[470px] font-[var(--font-headline)] text-[42px] font-semibold leading-[1.08] tracking-[-0.025em]">
                  {card?.title ?? card?.label}
                </h2>

                <div className="flex w-[310px] shrink-0 flex-col items-end gap-3 text-right">
                  <span className="inline-flex border border-[var(--accent)] px-4 py-2 font-[var(--font-mono)] text-[22px] leading-normal tracking-[0.06em] text-[var(--accent)]">
                    {metric?.value}
                  </span>
                  <p className="font-[var(--font-mono)] text-[20px] leading-[1.35] tracking-[0.02em]">
                    {metric?.label}
                  </p>
                </div>
              </div>

              <div className="relative z-10 mt-8 max-w-[790px]">
                <div
                  aria-hidden="true"
                  className="mb-6 h-[3px] w-[64px] bg-[var(--accent)]"
                />
                <p className="font-[var(--font-body)] text-[34px] leading-[1.36] tracking-[-0.015em] [text-wrap:pretty]">
                  {card?.body}
                </p>
              </div>
            </article>
          </React.Fragment>
        ))}
      </div>
    </section>
  );
}
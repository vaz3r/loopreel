import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

type TimelineCard = {
  title: string;
  body: string;
};

type TimelineMetric = {
  value: string;
  label: string;
};

type TimelineContent = {
  kicker: string;
  headline: string;
  subheadline: string;
  cards?: TimelineCard[];
  metrics?: TimelineMetric[];
};

export default function Slide02({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  void brand;
  void totalSlides;

  const content = slide as unknown as TimelineContent;
  const cards = content.cards ?? [];
  const metrics = content.metrics ?? [];

  // Chronological DOM order; visual chronology ascends from bottom to top.
  const stages = [
    {
      card: cards[0],
      metric: metrics[0],
      offset: 'ml-0',
    },
    {
      card: cards[1],
      metric: metrics[1],
      offset: 'ml-[56px]',
    },
    {
      card: cards[2],
      metric: metrics[2],
      offset: 'ml-[112px]',
    },
  ];

  return (
    <section className="flex flex-col h-full min-h-0 w-full text-[var(--ink)]">
      <header className="shrink-0">
        <div className="flex items-center gap-5">
          <span
            aria-hidden="true"
            className="h-[12px] w-[12px] shrink-0 bg-[var(--accent)]"
          />
          <p className="font-[var(--font-mono)] text-[22px] uppercase leading-[1.3] tracking-[0.16em] text-[var(--accent)]">
            {content.kicker}
          </p>
          <div
            aria-hidden="true"
            className="h-px flex-1 bg-[var(--border)]"
          />
        </div>

        <h1 className="mt-7 max-w-[920px] font-[var(--font-headline)] text-[68px] font-bold leading-[1.02] tracking-[-0.045em]">
          {content.headline}
        </h1>

        <p className="mt-6 max-w-[830px] font-[var(--font-body)] text-[28px] leading-snug">
          {content.subheadline}
        </p>
      </header>

      <div className="flex min-h-0 flex-1 flex-col justify-center py-10">
        <div className="relative h-[1108px] w-full shrink-0">
          {/* Reading direction only: no SVG-to-HTML callout connectors. */}
          <svg
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 h-full w-full"
            viewBox="0 0 450 800"
            preserveAspectRatio="none"
            fill="none"
          >
            <path
              d="M32 768V32"
              stroke="var(--ink)"
              strokeOpacity="0.3"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
            />
            <path
              d="M28 42L32 32L36 42"
              stroke="var(--accent)"
              strokeWidth="2"
              strokeLinecap="square"
              strokeLinejoin="miter"
              vectorEffect="non-scaling-stroke"
            />
            <path
              d="M28 768H36"
              stroke="var(--ink)"
              strokeOpacity="0.5"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
            />
          </svg>

          <ol className="relative m-0 flex h-full list-none flex-col-reverse gap-[44px] pl-[112px]">
            {stages.map(({ card, metric, offset }, index) => (
              <li
                key={metric?.value ?? index}
                className={`${offset} relative h-[340px] shrink-0`}
              >
                <article className="relative flex h-full flex-col border-l border-t border-[var(--border)] bg-[var(--surface)] px-8 pb-7 pt-7">
                  <div className="flex items-center gap-5">
                    <span className="inline-flex min-h-[42px] items-center bg-[var(--accent)] px-4 py-2 font-[var(--font-mono)] text-[22px] font-semibold leading-none tracking-[0.025em] text-[var(--paper,#0D0E12)]">
                      {metric?.value}
                    </span>

                    <svg
                      aria-hidden="true"
                      className="ml-auto h-[26px] w-[26px] shrink-0 text-[var(--ink)]"
                      viewBox="0 0 26 26"
                      fill="none"
                    >
                      <path
                        d="M1 13H25M13 1V25"
                        stroke="currentColor"
                        strokeOpacity="0.35"
                        strokeWidth="1"
                      />
                      <rect
                        x="10"
                        y="10"
                        width="6"
                        height="6"
                        fill="var(--accent)"
                      />
                    </svg>
                  </div>

                  <h2 className="mt-6 font-[var(--font-headline)] text-[36px] font-semibold leading-[1.1] tracking-[-0.025em]">
                    {card?.title}
                  </h2>

                  <p className="mt-4 max-w-[720px] font-[var(--font-body)] text-[26px] leading-[1.35]">
                    {card?.body}
                  </p>

                  {/* The platform rule belongs to this editorial block. */}
                  <svg
                    aria-hidden="true"
                    className="pointer-events-none absolute bottom-0 left-0 h-[14px] w-full"
                    viewBox="0 0 450 14"
                    preserveAspectRatio="none"
                    fill="none"
                  >
                    <path
                      d="M0 1H450M0 1V14"
                      stroke="var(--ink)"
                      strokeOpacity="0.75"
                      strokeWidth="1"
                      vectorEffect="non-scaling-stroke"
                    />
                    <path
                      d="M0 1H40"
                      stroke="var(--accent)"
                      strokeWidth="3"
                      vectorEffect="non-scaling-stroke"
                    />
                  </svg>
                </article>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
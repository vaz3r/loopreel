import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

type MilestoneCard = {
  title: string;
  body: string;
};

type MilestoneMetric = {
  value: string;
  label: string;
};

type DiplomaticSlide = {
  kicker?: string;
  headline?: string;
  subheadline?: string;
  cards?: MilestoneCard[];
  metrics?: MilestoneMetric[];
};

function RouteSegment({ index }: { index: number }) {
  return (
    <svg
      viewBox="0 0 104 360"
      preserveAspectRatio="none"
      className="block h-full w-[104px]"
      fill="none"
      aria-hidden="true"
    >
      {index === 0 && (
        <path
          d="M48 64V360"
          stroke="var(--border)"
          strokeWidth="3"
          vectorEffect="non-scaling-stroke"
        />
      )}

      {index === 1 && (
        <>
          <path
            d="M48 0V266L40 273L55 279"
            stroke="var(--border)"
            strokeWidth="3"
            vectorEffect="non-scaling-stroke"
          />
          <path
            d="M41 344L56 350L48 356V360"
            stroke="var(--accent)"
            strokeWidth="3"
            vectorEffect="non-scaling-stroke"
          />

          <svg
            x="10"
            y="291"
            width="84"
            height="43"
            viewBox="0 0 84 43"
            preserveAspectRatio="xMidYMid meet"
          >
            <path
              d="M5 24H79L68 37H22L12 31Z"
              fill="var(--accent)"
            />
            <path
              d="M15 13H29V24H15ZM33 16H47V24H33ZM51 16H65V24H51Z"
              fill="var(--ink)"
              opacity="0.65"
            />
            <path
              d="M18 6H27V13H18Z"
              fill="var(--ink)"
              opacity="0.65"
            />
          </svg>
        </>
      )}

      {index === 2 && (
        <path
          d="M48 0V64"
          stroke="var(--accent)"
          strokeWidth="3"
          vectorEffect="non-scaling-stroke"
        />
      )}

      <svg
        x="28"
        y="44"
        width="40"
        height="40"
        viewBox="0 0 40 40"
        preserveAspectRatio="xMidYMid meet"
      >
        <circle
          cx="20"
          cy="20"
          r="17"
          fill="var(--surface)"
          stroke={index === 2 ? 'var(--accent)' : 'var(--ink)'}
          strokeWidth="2"
        />
        {index === 2 ? (
          <path
            d="M14 14L26 26M26 14L14 26"
            stroke="var(--accent)"
            strokeWidth="3"
          />
        ) : (
          <circle cx="20" cy="20" r="5" fill="var(--ink)" />
        )}
      </svg>
    </svg>
  );
}

export default function Slide07({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  void brand;
  void totalSlides;

  const content = slide as unknown as DiplomaticSlide;
  const cards = content.cards ?? [];
  const metrics = content.metrics ?? [];

  const stations = [
    { card: cards[0], metric: metrics[0] },
    { card: cards[1], metric: metrics[1] },
    { card: cards[2], metric: metrics[2] },
  ];

  return (
    <section className="flex flex-col h-full min-h-0 w-full text-[var(--ink)]">
      <header className="flex shrink-0 flex-col gap-6">
        <div className="flex items-center gap-5">
          <span
            aria-hidden="true"
            className="h-[3px] w-12 shrink-0 bg-[var(--accent)]"
          />
          <p className="font-[var(--font-mono)] text-[22px] uppercase leading-[1.3] tracking-[0.12em] text-[var(--accent)]">
            {content.kicker}
          </p>
        </div>

        <h1 className="text-center font-[var(--font-headline)] text-[64px] font-bold leading-[1.04] tracking-[-0.04em]">
          {content.headline}
        </h1>

        <p className="text-left font-[var(--font-body)] text-[36px] leading-[1.3] tracking-[-0.015em]">
          {content.subheadline}
        </p>
      </header>

      <div className="mt-9 flex min-h-0 flex-1 flex-col">
        <div className="mb-5 flex shrink-0 items-center gap-5">
          <p className="font-[var(--font-mono)] text-[22px] leading-[1.3] tracking-[0.16em]">
            2026
          </p>
          <div
            aria-hidden="true"
            className="h-px flex-1 bg-[var(--border)]"
          />
        </div>

        <ol className="m-0 grid min-h-0 flex-1 list-none grid-rows-[repeat(3,minmax(0,1fr))] p-0">
          {stations.map(({ card, metric }, index) => (
            <li
              key={`${metric?.value ?? index}`}
              className="grid min-h-0 grid-cols-[104px_minmax(0,1fr)]"
            >
              <RouteSegment index={index} />

              <article
                className={`min-w-0 border-t py-8 pl-7 pr-2 ${
                  index === 2
                    ? 'border-[var(--accent)]'
                    : 'border-[var(--border)]'
                }`}
              >
                <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
                  <span
                    className={`inline-flex shrink-0 items-center px-4 py-2 font-[var(--font-mono)] text-[32px] font-semibold leading-none tracking-[-0.04em] ${
                      index === 2
                        ? 'bg-[var(--accent)] text-[var(--paper,#0D0E12)]'
                        : 'bg-[var(--surface)] text-[var(--ink)]'
                    }`}
                  >
                    {metric?.value}
                  </span>

                  <span className="font-[var(--font-mono)] text-[20px] leading-[1.3] tracking-[0.025em]">
                    {metric?.label}
                  </span>
                </div>

                <h2
                  className={`mt-6 font-[var(--font-headline)] text-[38px] font-semibold leading-[1.12] tracking-[-0.025em] ${
                    index === 2
                      ? 'text-[var(--accent)]'
                      : 'text-[var(--ink)]'
                  }`}
                >
                  {card?.title}
                </h2>

                <p className="mt-4 font-[var(--font-body)] text-[32px] leading-[1.3] tracking-[-0.01em]">
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
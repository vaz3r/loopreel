import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

type TimelineCard = {
  title: string;
  body: string;
};

type TimelineDate = {
  value: string;
  label: string;
};

export default function Slide07({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  const content = slide as typeof slide & {
    cards?: TimelineCard[];
    telemetry?: TimelineDate[];
  };

  const cards = content.cards ?? [];
  const telemetry = content.telemetry ?? [];

  void brand;
  void totalSlides;

  return (
    <section className="flex flex-col h-full min-h-0 w-full text-[var(--ink)]">
      <div className="flex h-full min-h-0 flex-col gap-12 bg-white">
        <header className="flex flex-col gap-6">
          <div className="border-t-2 border-[var(--border)] pt-6">
            <p className="font-[var(--font-mono)] text-[20px] font-medium uppercase leading-[28px] tracking-[0.12em] text-[var(--accent)]">
              {slide.kicker}
            </p>
          </div>

          <h1 className="max-w-[900px] font-[var(--font-headline)] text-[64px] font-bold leading-[1.02] tracking-[-0.04em]">
            {slide.headline}
          </h1>

          <p className="max-w-[840px] font-[var(--font-body)] text-[28px] leading-[1.35]">
            {slide.subheadline}
          </p>
        </header>

        <div className="grid h-[1056px] shrink-0 grid-cols-[minmax(0,435fr)_minmax(0,105fr)] grid-rows-3">
          {/* Shared coordinate plane: the right-hand spine remains at x=475.
              Copy occupies normal-flow grid cells, never absolute callouts. */}
          <svg
            className="pointer-events-none col-span-2 col-start-1 row-span-3 row-start-1 h-full w-full"
            viewBox="0 0 540 960"
            preserveAspectRatio="none"
            aria-hidden="true"
            focusable="false"
          >
            <path
              d="M475 34 V334 M475 354 V590"
              fill="none"
              stroke="var(--ink)"
              strokeWidth="2"
              vectorEffect="non-scaling-stroke"
            />

            {/* Open paper interrupts the connector before the final node. */}
            <path
              d="M469 595 L481 585 M469 609 L481 599"
              fill="none"
              stroke="var(--ink)"
              strokeWidth="2"
              vectorEffect="non-scaling-stroke"
            />

            <rect
              x="465"
              y="14"
              width="20"
              height="20"
              fill="#FFFFFF"
              stroke="var(--ink)"
              strokeWidth="2"
              vectorEffect="non-scaling-stroke"
            />
            <rect
              x="465"
              y="334"
              width="20"
              height="20"
              fill="#FFFFFF"
              stroke="var(--ink)"
              strokeWidth="2"
              vectorEffect="non-scaling-stroke"
            />
            <rect
              x="465"
              y="654"
              width="20"
              height="20"
              fill="var(--accent)"
            />

            <path
              d="M475 674 V930"
              fill="none"
              stroke="var(--accent)"
              strokeWidth="2"
              vectorEffect="non-scaling-stroke"
            />
          </svg>

          {cards.map((card, index) => {
            const milestone = telemetry[index];
            const isRupture = index === 2;

            return (
              <article
                key={`${slide.id}-${index}`}
                className="z-10 col-start-1 flex min-w-0 flex-col gap-5 pr-8"
                style={{ gridRow: index + 1 }}
              >
                <p
                  className={`font-[var(--font-mono)] text-[32px] font-semibold leading-[52px] tracking-[-0.03em] ${
                    isRupture
                      ? 'text-[var(--accent)]'
                      : 'text-[var(--ink)]'
                  }`}
                >
                  {milestone?.value}
                </p>

                <div
                  className={`flex min-h-[240px] flex-col gap-5 border-t-2 bg-[var(--surface)] px-8 py-7 ${
                    isRupture
                      ? 'border-[var(--accent)]'
                      : 'border-[var(--border)]'
                  }`}
                >
                  <h2
                    className={`font-[var(--font-headline)] text-[34px] font-semibold leading-[1.15] tracking-[-0.025em] ${
                      isRupture
                        ? 'text-[var(--accent)]'
                        : 'text-[var(--ink)]'
                    }`}
                  >
                    {card.title}
                  </h2>

                  <p className="font-[var(--font-body)] text-[26px] leading-[1.4]">
                    {card.body}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
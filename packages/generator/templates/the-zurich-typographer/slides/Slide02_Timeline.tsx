import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

type TimelineCard = {
  title?: string;
  label?: string;
  body?: string;
};

type TimelineTelemetry = {
  value: string;
  label: string;
};

type TimelineContent = {
  cards?: TimelineCard[];
  telemetry?: TimelineTelemetry[];
};

export default function Slide02({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  const content = slide as typeof slide & TimelineContent;
  const cards: TimelineCard[] = content.cards ?? slide.items ?? [];
  const telemetry: TimelineTelemetry[] = content.telemetry ?? [];

  const stages = [
    {
      card: cards[0],
      metric: telemetry[0],
      offset: 'ml-[224px]',
      terminal: true,
    },
    {
      card: cards[1],
      metric: telemetry[1],
      offset: 'ml-[112px]',
      terminal: false,
    },
    {
      card: cards[2],
      metric: telemetry[2],
      offset: 'ml-0',
      terminal: false,
    },
  ];

  void brand;
  void totalSlides;

  return (
    <section className="flex flex-col h-full min-h-0 w-full text-[var(--ink)]">
      <header className="flex shrink-0 flex-col gap-7">
        <div className="flex items-center gap-5">
          <svg
            aria-hidden="true"
            width="38"
            height="30"
            viewBox="0 0 38 30"
            fill="none"
            className="shrink-0 text-[var(--accent)]"
          >
            <path
              d="M1 29H13V17H25V5H37"
              stroke="currentColor"
              strokeWidth="2"
            />
            <circle cx="34" cy="5" r="4" fill="currentColor" />
          </svg>

          <p className="font-[var(--font-mono)] text-[22px] uppercase tracking-[0.16em] text-[var(--accent)]">
            {slide.kicker}
          </p>
        </div>

        <h1 className="max-w-[900px] font-[var(--font-headline)] text-[68px] font-bold leading-[1.02] tracking-[-0.045em]">
          {slide.headline}
        </h1>

        <p className="max-w-[820px] font-[var(--font-body)] text-[28px] leading-snug">
          {slide.subheadline}
        </p>
      </header>

      <div className="mt-[76px] flex h-[1050px] w-full shrink-0 flex-col">
        {stages.map(({ card, metric, offset, terminal }, index) => (
          <article
            key={`${metric?.value ?? index}`}
            className={`relative box-border flex h-[350px] w-[728px] shrink-0 flex-col border-l border-t border-[var(--border)] px-8 pb-8 pt-8 ${offset}`}
          >
            {terminal && (
              <svg
                aria-hidden="true"
                width="26"
                height="26"
                viewBox="0 0 26 26"
                className="absolute -left-[13px] -top-[13px] text-[var(--accent)]"
              >
                <circle cx="13" cy="13" r="12" fill="currentColor" />
              </svg>
            )}

            <div className="flex flex-col gap-3">
              <p
                className={`w-fit px-4 py-2 font-[var(--font-mono)] text-[22px] font-semibold leading-snug tracking-[0.025em] ${
                  terminal
                    ? 'bg-[var(--accent)] text-white'
                    : 'bg-[var(--surface)] text-[var(--ink)]'
                }`}
              >
                {metric?.value}
              </p>

              <p className="font-[var(--font-mono)] text-[20px] leading-snug tracking-[0.06em]">
                {metric?.label}
              </p>
            </div>

            <h2 className="mt-7 font-[var(--font-headline)] text-[36px] font-semibold leading-[1.1] tracking-[-0.025em]">
              {card?.title || card?.label}
            </h2>

            <p className="mt-4 max-w-[650px] font-[var(--font-body)] text-[26px] leading-snug">
              {card?.body}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
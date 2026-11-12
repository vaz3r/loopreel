import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

type RegionalCard = {
  title: string;
  body: string;
};

type ChronologyMetric = {
  value: string;
  label: string;
};

function LocationRing({ variant }: { variant: number }) {
  return (
    <svg
      viewBox="0 0 450 800"
      fill="none"
      aria-hidden="true"
      className="h-[112px] w-[63px] shrink-0 text-[var(--accent)]"
    >
      <path
        d="M225 32V192M225 608V768"
        stroke="currentColor"
        strokeWidth="8"
        opacity=".35"
      />
      <circle
        cx="225"
        cy="400"
        r="184"
        stroke="currentColor"
        strokeWidth="7"
        opacity=".25"
      />
      <circle
        cx="225"
        cy="400"
        r="132"
        stroke="currentColor"
        strokeWidth="12"
        strokeDasharray={variant === 1 ? '28 18' : undefined}
      />
      <circle cx="225" cy="400" r="44" fill="currentColor" />
      <path
        d={variant === 2 ? 'M32 400H120M330 400H418' : 'M225 216V268'}
        stroke="currentColor"
        strokeWidth="10"
      />
    </svg>
  );
}

export default function Slide08({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  const data = slide as typeof slide & {
    cards?: RegionalCard[];
    metrics?: ChronologyMetric[];
  };

  const cards = data.cards ?? [];
  const metrics = data.metrics ?? [];

  const fronts = [
    {
      card: cards[0],
      month: 'March',
      position: 'mr-[80px]',
      edge: 'border-l-[3px] border-l-[var(--accent)]',
    },
    {
      card: cards[1],
      month: 'September',
      position: 'ml-[80px]',
      edge: 'border-r-[3px] border-r-[var(--accent)]',
    },
    {
      card: cards[2],
      month: 'October',
      position: 'w-full',
      edge: 'border-l-[3px] border-l-[var(--accent)]',
    },
  ];

  const chronology = [metrics, metrics];

  return (
    <section className="flex flex-col h-full min-h-0 w-full text-[var(--ink)]">
      <header className="flex shrink-0 flex-col gap-6">
        <div className="flex items-center gap-5">
          <span
            aria-hidden="true"
            className="h-[12px] w-[12px] shrink-0 bg-[var(--accent)]"
          />
          <p className="font-[var(--font-mono)] text-[22px] uppercase leading-snug tracking-[0.16em] text-[var(--accent)]">
            {slide.kicker}
          </p>
        </div>

        <h1 className="max-w-[900px] font-[var(--font-headline)] text-[68px] font-bold leading-[1.02] tracking-[-0.045em]">
          {slide.headline}
        </h1>

        <p className="max-w-[850px] font-[var(--font-body)] text-[28px] leading-snug opacity-80">
          {slide.subheadline}
        </p>

        <div className="flex items-center gap-3" aria-hidden="true">
          <span className="h-[3px] w-[96px] bg-[var(--accent)]" />
          <span className="h-px flex-1 bg-[var(--border)]" />
        </div>
      </header>

      <div className="my-9 flex min-h-0 flex-1 flex-col gap-7">
        {fronts.map(({ card, month, position, edge }, index) => (
          <article
            key={month}
            className={`relative flex min-h-[244px] flex-1 flex-col justify-center gap-4 border border-[var(--border)] bg-[var(--surface)] px-8 py-7 ${position} ${edge}`}
          >
            <div className="flex items-center justify-between gap-6">
              <div className="flex min-w-0 flex-col gap-3">
                <p className="font-[var(--font-mono)] text-[20px] uppercase leading-none tracking-[0.18em] text-[var(--accent)]">
                  {month}
                </p>

                <h2 className="font-[var(--font-headline)] text-[38px] font-semibold leading-[1.08] tracking-[-0.025em]">
                  {card?.title}
                </h2>
              </div>

              <LocationRing variant={index} />
            </div>

            <p className="max-w-[780px] font-[var(--font-body)] text-[28px] leading-snug opacity-85">
              {card?.body}
            </p>
          </article>
        ))}
      </div>

      <aside
        aria-label="Chronology"
        className="grid shrink-0 grid-cols-2 gap-6 border-t border-[var(--border)] pt-7"
      >
        {chronology.map((metric, index) => (
          <div
            key={index}
            className="flex min-h-[164px] flex-col gap-4 border border-[var(--border)] px-7 py-6"
          >
            <div className="flex items-center gap-3">
              <span
                aria-hidden="true"
                className="h-[10px] w-[10px] shrink-0 rounded-full bg-[var(--accent)]"
              />
              <p className="font-[var(--font-mono)] text-[26px] font-semibold leading-tight tracking-[-0.035em]">
                {metric?.value}
              </p>
            </div>

            <p className="font-[var(--font-body)] text-[24px] leading-snug opacity-75">
              {metric?.label}
            </p>
          </div>
        ))}
      </aside>
    </section>
  );
}
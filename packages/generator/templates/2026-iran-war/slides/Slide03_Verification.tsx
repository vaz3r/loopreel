import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

type LedgerCard = {
  title?: string;
  label?: string;
  body?: string;
};

type LedgerMetric = {
  value?: string;
  label?: string;
};

function EvidenceIcon({ kind }: { kind: 'claim' | 'finding' | 'unknown' }) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-[44px] w-[44px] shrink-0 text-[var(--accent)]"
      aria-hidden="true"
    >
      {kind === 'claim' && (
        <>
          <path d="M9 9h30v23H23l-10 8v-8H9Z" />
          <path d="M17 18h14M17 24h9" />
        </>
      )}
      {kind === 'finding' && (
        <>
          <path d="M12 5h17l9 9v29H12Z" />
          <path d="M29 5v10h9M19 23h12M19 30h12M19 37h7" />
        </>
      )}
      {kind === 'unknown' && (
        <>
          <path d="M35.5 11.5a17 17 0 1 0 4.5 16" />
          <path d="M24 18v10" />
          <circle cx="24" cy="34" r="1" fill="currentColor" stroke="none" />
        </>
      )}
    </svg>
  );
}

export default function Slide03({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  const data = slide as typeof slide & {
    cards?: LedgerCard[];
    metrics?: LedgerMetric[];
  };

  const items = slide.items ?? [];
  const cards: LedgerCard[] = data.cards ?? items;
  const metrics = data.metrics ?? [];

  const rows = [
    { card: cards[0], label: 'CLAIM', kind: 'claim' as const },
    { card: cards[1], label: 'FINDING', kind: 'finding' as const },
    { card: cards[2], label: 'UNKNOWN', kind: 'unknown' as const },
  ];

  void brand;
  void totalSlides;

  return (
    <section className="flex flex-col h-full min-h-0 w-full text-[var(--ink)]">
      <div className="flex min-h-0 flex-1 flex-col justify-between gap-8">
        <header className="flex shrink-0 flex-col gap-7">
          <div className="flex items-center gap-5">
            <span
              aria-hidden="true"
              className="h-[12px] w-[12px] shrink-0 bg-[var(--accent)]"
            />
            <p className="font-[var(--font-mono)] text-[22px] uppercase leading-[1.3] tracking-[0.16em] text-[var(--accent)]">
              {slide.kicker}
            </p>
            <span
              aria-hidden="true"
              className="h-px flex-1 bg-[var(--border)]"
            />
          </div>

          <h1 className="max-w-[920px] font-[var(--font-headline)] text-[68px] font-bold leading-[1.02] tracking-[-0.04em]">
            {slide.headline}
          </h1>

          <p className="max-w-[870px] font-[var(--font-body)] text-[28px] leading-snug">
            {slide.subheadline}
          </p>
        </header>

        <div className="relative h-[800px] shrink-0">
          <svg
            viewBox="0 0 450 800"
            preserveAspectRatio="none"
            className="pointer-events-none absolute inset-0 h-full w-full"
            fill="none"
            aria-hidden="true"
          >
            <g
              stroke="var(--border)"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
            >
              <path d="M32 1H418M32 245H418M32 490H418M32 799H418" />
            </g>
            <g
              stroke="var(--accent)"
              strokeWidth="2"
              vectorEffect="non-scaling-stroke"
            >
              <path d="M32 1H48M32 245H48M32 490H48M32 799H48" />
            </g>
          </svg>

          <div className="relative grid h-full grid-rows-[245px_245px_310px] px-[68px]">
            {rows.map(({ card, label, kind }) => (
              <article
                key={label}
                className="flex min-w-0 flex-col justify-center gap-4 py-7"
              >
                <div className="flex items-center gap-5">
                  <EvidenceIcon kind={kind} />
                  <p className="font-[var(--font-mono)] text-[22px] font-medium uppercase leading-[1.2] tracking-[0.18em] text-[var(--accent)]">
                    {label}
                  </p>
                </div>

                <div className="flex flex-col gap-3 pl-[64px]">
                  <h2 className="font-[var(--font-headline)] text-[36px] font-semibold leading-[1.12] tracking-[-0.025em]">
                    {card?.title || card?.label}
                  </h2>
                  <p className="font-[var(--font-body)] text-[26px] leading-snug">
                    {card?.body}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="grid shrink-0 grid-cols-2 gap-6">
          {[metrics, metrics].map((metric, index) => (
            <div
              key={index}
              className="flex min-h-[174px] min-w-0 flex-col justify-center gap-4 border-t-2 border-[var(--accent)] bg-[var(--surface)] px-8 py-7"
            >
              <p className="whitespace-nowrap font-[var(--font-mono)] text-[36px] font-semibold leading-[1.1] tracking-[-0.04em]">
                {metric?.value}
              </p>
              <p className="max-w-[350px] font-[var(--font-body)] text-[24px] leading-snug">
                {metric?.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
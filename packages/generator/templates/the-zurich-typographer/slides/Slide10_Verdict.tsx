import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

type LedgerCard = {
  title: string;
  body: string;
};

type Evidence = {
  value: string;
  label: string;
};

export default function Slide10({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  const data = slide as typeof slide & {
    cards?: LedgerCard[];
    telemetry?: Evidence[];
  };

  const cards = data.cards ?? [];
  const telemetry = data.telemetry ?? [];
  const headlineWords = (slide.headline ?? '').split(/\s+/);
  const headlineLines = [
    headlineWords.slice(0, 3).join(' '),
    headlineWords.slice(3, 5).join(' '),
    headlineWords.slice(5).join(' '),
  ];

  void brand;
  void totalSlides;

  return (
    <section className="flex flex-col h-full min-h-0 w-full text-[var(--ink)]">
      <div className="flex h-full min-h-0 flex-col gap-8 bg-white">
        <div className="flex shrink-0 flex-col gap-7">
          <div className="flex items-center gap-4">
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className="h-6 w-6 shrink-0 text-[var(--accent)]"
            >
              <rect width="24" height="24" fill="currentColor" />
            </svg>

            <p className="font-[var(--font-mono)] text-[20px] font-medium uppercase leading-snug tracking-[0.12em] text-[var(--accent)]">
              {slide.kicker}
            </p>
          </div>

          <h1 className="font-[var(--font-headline)] text-[68px] font-bold leading-[1.02] tracking-[-0.04em]">
            {headlineLines.map((line, index) => (
              <span key={index} className="block">
                {line}
              </span>
            ))}
          </h1>

          <p className="max-w-[870px] font-[var(--font-body)] text-[28px] leading-snug">
            {slide.subheadline}
          </p>
        </div>

        <div className="grid min-h-0 flex-1 grid-rows-3">
          {cards.slice(0, 3).map((card, index) => {
            const evidence = telemetry[index];

            return (
              <article
                key={`${index}-${card.title}`}
                className="grid grid-cols-[24px_minmax(0,1fr)] content-center gap-x-7 border-t-2 border-[var(--border)] py-7"
              >
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  className="mt-1.5 h-6 w-6 text-[var(--accent)]"
                >
                  <rect width="24" height="24" fill="currentColor" />
                </svg>

                <div className="flex min-w-0 flex-col gap-5">
                  {evidence && (
                    <div className="flex flex-col items-start gap-2">
                      <p className="font-[var(--font-mono)] text-[26px] font-bold leading-snug tracking-[-0.025em]">
                        {evidence.value}
                      </p>
                      <p className="font-[var(--font-mono)] text-[20px] leading-snug tracking-[0.035em]">
                        {evidence.label}
                      </p>
                    </div>
                  )}

                  <div className="flex flex-col gap-3">
                    <h2 className="font-[var(--font-headline)] text-[36px] font-semibold leading-tight tracking-[-0.025em]">
                      {card.title}
                    </h2>
                    <p className="max-w-[850px] font-[var(--font-body)] text-[28px] leading-snug">
                      {card.body}
                    </p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <div className="shrink-0 border-t-[8px] border-[var(--border)] pt-6">
          <p className="font-[var(--font-mono)] text-[22px] leading-snug tracking-[0.045em]">
            the-zurich-typographer.pub
          </p>
        </div>
      </div>
    </section>
  );
}
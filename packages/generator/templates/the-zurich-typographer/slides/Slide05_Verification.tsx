import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

type VerificationCard = {
  title: string;
  body: string;
};

type VerificationDate = {
  value: string;
  label: string;
};

type VerificationData = {
  kicker: string;
  headline: string;
  subheadline: string;
  cards: VerificationCard[];
  telemetry: VerificationDate[];
};

export default function Slide05({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  const data = slide as typeof slide & VerificationData;
  const cards = data.cards ?? [];
  const telemetry = data.telemetry ?? [];

  void brand;
  void totalSlides;

  return (
    <section className="flex flex-col h-full min-h-0 w-full text-[var(--ink)]">
      <header className="flex shrink-0 flex-col gap-7">
        <p className="font-[var(--font-mono)] text-[22px] font-medium uppercase leading-snug tracking-[0.16em] text-[var(--accent)]">
          {data.kicker}
        </p>

        <h1 className="max-w-[920px] font-[var(--font-headline)] text-[68px] font-bold leading-[1.02] tracking-[-0.04em]">
          {data.headline}
        </h1>

        <p className="max-w-[880px] font-[var(--font-body)] text-[28px] leading-snug">
          {data.subheadline}
        </p>
      </header>

      <div className="mt-10 grid min-h-0 max-h-[1110px] flex-1 grid-rows-3 border-t-2 border-[var(--border)]">
        {cards.slice(0, 3).map((card, index) => {
          const date = telemetry[index];
          const unresolved = index === 2;

          return (
            <article
              key={`${index}-${card.title}`}
              className={`relative flex min-h-0 flex-col justify-center gap-7 border-b border-[var(--border)] px-9 py-8 ${
                index % 2 === 0 ? 'bg-[var(--surface)]' : ''
              }`}
            >
              {unresolved && (
                <svg
                  aria-hidden="true"
                  focusable="false"
                  className="pointer-events-none absolute inset-y-0 left-0 h-full w-[5px] text-[var(--accent)]"
                  viewBox="0 0 5 100"
                  preserveAspectRatio="none"
                >
                  <rect width="5" height="100" fill="currentColor" />
                </svg>
              )}

              {date && (
                <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
                  <time className="inline-flex shrink-0 items-center border border-[var(--border)] px-4 py-2 font-[var(--font-mono)] text-[22px] font-medium leading-none tracking-[0.02em]">
                    {date.value}
                  </time>

                  <p className="font-[var(--font-mono)] text-[20px] leading-snug tracking-[0.04em]">
                    {date.label}
                  </p>
                </div>
              )}

              <div className="flex flex-col gap-4">
                <h2 className="font-[var(--font-headline)] text-[38px] font-semibold leading-[1.12] tracking-[-0.025em]">
                  {card.title}
                </h2>

                <p className="max-w-[830px] font-[var(--font-body)] text-[28px] leading-snug">
                  {card.body}
                </p>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
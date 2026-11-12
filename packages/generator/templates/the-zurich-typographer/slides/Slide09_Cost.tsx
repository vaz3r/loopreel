import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

type CostContent = {
  kicker: string;
  headline: string;
  subheadline: string;
  cards?: Array<{ title: string; body: string }>;
  telemetry?: Array<{ value: string; label: string }>;
};

export default function Slide09({ slide }: SlideComponentProps) {
  const content = slide as unknown as CostContent;
  const cards = content.cards ?? [];
  const telemetry = content.telemetry ?? [];
  const [spending, cutoff] = telemetry;
  const [amount, ...unit] = (spending?.value ?? '').split(' ');

  return (
    <section className="flex flex-col h-full min-h-0 w-full text-[var(--ink)]">
      <header className="flex shrink-0 flex-col gap-8 border-t-2 border-[var(--border)] pt-7">
        <p className="font-[var(--font-mono)] text-[22px] uppercase leading-snug tracking-[0.16em] text-[var(--accent)]">
          {content.kicker}
        </p>

        <h1 className="max-w-[860px] font-[var(--font-headline)] text-[68px] font-bold leading-[1.02] tracking-[-0.04em]">
          {content.headline}
        </h1>

        <p className="max-w-[850px] font-[var(--font-body)] text-[28px] leading-snug">
          {content.subheadline.split(/(\bestimate\b)/).map((part, index) =>
            part === 'estimate' ? (
              <span key={index} className="relative inline-block">
                {part}
                <svg
                  aria-hidden="true"
                  viewBox="0 0 120 8"
                  preserveAspectRatio="none"
                  className="pointer-events-none absolute -bottom-[5px] left-0 h-[8px] w-full text-[var(--accent)]"
                >
                  <path
                    d="M1 5 H119"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                </svg>
              </span>
            ) : (
              <React.Fragment key={index}>{part}</React.Fragment>
            ),
          )}
        </p>
      </header>

      <main className="flex min-h-0 flex-1 flex-col justify-evenly gap-9 py-10">
        <div className="flex shrink-0 flex-col">
          <div className="flex items-center gap-5">
            <svg
              aria-hidden="true"
              viewBox="0 0 36 36"
              className="h-9 w-9 shrink-0 text-[var(--accent)]"
            >
              <path
                d="M0 18H36M18 0V36"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
              />
            </svg>
            <p className="font-[var(--font-mono)] text-[22px] leading-snug tracking-[0.06em]">
              {spending?.label}
            </p>
          </div>

          <div className="mt-8 border-b-2 border-[var(--border)] pb-9">
            <p
              aria-label={spending?.value}
              className="font-[var(--font-mono)] font-bold tabular-nums"
            >
              <span
                aria-hidden="true"
                className="block text-[108px] leading-none tracking-[-0.065em]"
              >
                {amount}
              </span>
              <span
                aria-hidden="true"
                className="mt-2 block text-[52px] leading-none tracking-[-0.04em]"
              >
                {unit.join(' ')}
              </span>
            </p>
          </div>

          <div className="mt-8 grid grid-cols-[auto_1fr] items-center gap-7 border border-[var(--border)] px-8 py-7">
            <p className="whitespace-nowrap font-[var(--font-mono)] text-[38px] font-semibold leading-none tracking-[-0.04em]">
              {cutoff?.value}
            </p>
            <p className="border-l border-[var(--border)] pl-7 font-[var(--font-mono)] text-[22px] leading-snug">
              {cutoff?.label}
            </p>
          </div>
        </div>

        <div className="flex shrink-0 flex-col gap-6">
          {cards.slice(0, 2).map((card, index) => (
            <article
              key={`${index}-${card.title}`}
              className="border-l-2 border-[var(--border)] bg-[var(--surface)] px-8 py-7"
            >
              <h2 className="font-[var(--font-headline)] text-[34px] font-semibold leading-tight tracking-[-0.025em]">
                {card.title}
              </h2>
              <p className="mt-4 max-w-[830px] font-[var(--font-body)] text-[26px] leading-snug">
                {card.body}
              </p>
            </article>
          ))}
        </div>
      </main>
    </section>
  );
}
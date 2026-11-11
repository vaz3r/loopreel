import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

const cards = [
  {
    title: 'Amazon and Ring',
    role: 'The manufacturer',
    body: 'Amazon promises recording indicators, screen notifications and Throw Away the Key Encryption for the new devices. Those safeguards accompany a system that maps private interiors and moves cameras through them.',
    index: '01',
  },
  {
    title: 'Federal Trade Commission',
    role: 'The enforcement record',
    body: 'In a 2023 investigation, the FTC charged Ring with allowing employees and contractors to watch customers’ private recordings. It also described inadequate safeguards that allowed hackers to access 55,000 US customers’ accounts.',
    index: '02',
  },
  {
    title: 'Electronic Frontier Foundation',
    role: 'The digital-rights critic',
    body: 'EFF credits the encryption improvement but says it falls short of end-to-end encryption. It also criticizes Ring’s reintroduction of features allowing law enforcement to request footage or live-stream access from users’ devices.',
    index: '03',
  },
];

export default function Slide09({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  return (
    <section
      aria-label="The institutions behind the privacy dispute"
      className="flex h-full min-h-0 flex-col gap-8 text-[var(--ink)]"
    >
      <div className="shrink-0">
        <div className="mb-5 flex items-center gap-3">
          <span className="h-2.5 w-2.5 rounded-full bg-[var(--accent)]" />
          <span className="font-[var(--font-mono)] text-sm font-medium uppercase tracking-[0.2em] text-[var(--accent)]">
            Privacy / Institutional map
          </span>
        </div>

        <h2 className="max-w-[900px] font-[var(--font-headline)] text-6xl font-bold leading-[1.04] tracking-[-0.045em]">
          The institutions behind the privacy dispute
        </h2>
      </div>

      <div className="grid min-h-0 flex-1 grid-rows-3 gap-5">
        {cards.map((card) => (
          <article
            key={card.index}
            className="relative grid grid-cols-[0.9fr_1.35fr] items-center gap-7 overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--surface)] p-8 shadow-[0_8px_24px_rgba(0,0,0,0.12)]"
          >
            <div
              aria-hidden="true"
              className="absolute inset-y-8 left-0 w-1 rounded-r-full bg-[var(--accent)]"
            />

            <div className="flex h-full flex-col justify-between gap-5 border-r border-[var(--border)] pr-7">
              <div className="flex items-center gap-3">
                <span className="font-[var(--font-mono)] text-lg font-semibold leading-none text-[var(--accent)]">
                  {card.index}
                </span>
                <span className="h-px flex-1 bg-[var(--border)]" />
              </div>

              <h3 className="font-[var(--font-headline)] text-[31px] font-bold leading-[1.08] tracking-[-0.025em]">
                {card.title}
              </h3>

              <span className="self-start rounded-md border border-[var(--border)] px-3 py-2 font-[var(--font-mono)] text-[12px] font-medium uppercase leading-relaxed tracking-[0.07em] text-[var(--accent)]">
                {card.role}
              </span>
            </div>

            <p className="font-[var(--font-body)] text-[22px] leading-[1.5] tracking-[-0.01em]">
              {card.body}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

export default function Slide07({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  const items = slide.items ?? [];
  const item0 = items[0];
  const item1 = items[1];

  return (
    <section className="flex flex-col h-full min-h-0 w-full text-[var(--ink)]">
      <header className="flex flex-col items-start">
        <p className="font-[var(--font-mono)] text-[20px] leading-[1.4] tracking-[0.1em] text-[var(--accent)]">
          {slide.kicker}
        </p>

        <h1 className="mt-5 max-w-[920px] font-[var(--font-headline)] text-[56px] font-bold leading-[1.04] tracking-[-0.04em] [text-wrap:balance]">
          {slide.headline}
        </h1>

        <p className="mt-5 max-w-[860px] font-[var(--font-body)] text-[28px] leading-snug">
          {slide.subheadline}
        </p>
      </header>

      <div className="mt-8 flex flex-col gap-5">
        <article className="w-[832px] max-w-full border-l-2 border-[var(--accent)] bg-[var(--surface)] px-7 py-5">
          <h2 className="font-[var(--font-headline)] text-[32px] font-semibold leading-tight tracking-[-0.02em]">
            {item0?.title || item0?.label}
          </h2>

          <p className="mt-3 font-[var(--font-mono)] text-[52px] font-bold leading-[1.1] tracking-[-0.045em] text-[var(--accent)]">
            {item0?.badge}
          </p>

          <p className="mt-3 max-w-[740px] font-[var(--font-body)] text-[24px] leading-snug">
            {item0?.body}
          </p>
        </article>

        <article className="ml-auto w-[760px] max-w-full border-l border-t border-[var(--border)] bg-[var(--surface)] px-7 py-5">
          <h2 className="font-[var(--font-headline)] text-[32px] font-semibold leading-tight tracking-[-0.02em]">
            {item1?.title || item1?.label}
          </h2>

          <p className="mt-3 font-[var(--font-mono)] text-[52px] font-bold leading-[1.1] tracking-[-0.045em]">
            {item1?.badge}
          </p>

          <p className="mt-3 font-[var(--font-body)] text-[24px] leading-snug">
            {item1?.body}
          </p>
        </article>
      </div>

      <div className="mt-5 shrink-0" aria-hidden="true">
        <svg
          viewBox="0 0 952 100"
          className="block h-[100px] w-full"
          fill="none"
        >
          <path
            d="M 0 64 H 670"
            stroke="var(--accent)"
            strokeWidth="4"
            strokeLinecap="butt"
          />

          <g
            stroke="var(--ink)"
            strokeWidth="2.5"
            strokeLinecap="square"
            strokeLinejoin="miter"
          >
            <path d="M 804 38 L 827 54 L 847 24 L 867 54 L 890 38 L 882 72 H 812 Z" />
            <path d="M 814 82 H 880" />
          </g>
        </svg>
      </div>

      <div className="mt-auto pt-5">
        <p className="font-[var(--font-headline)] text-[34px] font-semibold leading-tight tracking-[-0.025em]">
          {slide.closingLine}
        </p>
        <div
          className="mt-5 h-px w-full bg-[var(--border)]"
          aria-hidden="true"
        />
      </div>
    </section>
  );
}
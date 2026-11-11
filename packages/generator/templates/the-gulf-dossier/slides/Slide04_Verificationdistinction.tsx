import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

export default function Slide04({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  const callouts = [
    {
      label: 'Verification limits',
      body: "The IAEA could not verify enrichment suspension or confirm the stockpile's status.",
    },
    {
      label: 'Weaponization finding',
      body: 'The IAEA found no evidence Iran was weaponizing, according to the article.',
    },
  ];

  return (
    <section className="flex flex-col h-full min-h-0 w-full text-[var(--ink)]">
      <header className="shrink-0">
        <p className="font-[var(--font-mono)] text-[21px] leading-[28px] tracking-[0.16em] text-[var(--accent)]">
          {slide.kicker}
        </p>

        <h1 className="mt-5 max-w-[940px] font-[var(--font-headline)] text-[64px] font-bold leading-[1.04] tracking-[-0.035em]">
          {slide.headline}
        </h1>

        <p className="mt-5 max-w-[880px] font-[var(--font-body)] text-[26px] leading-snug">
          {slide.subheadline}
        </p>
      </header>

      <div className="relative mt-6 h-[680px] w-full shrink-0">
        <svg
          className="pointer-events-none absolute inset-0 h-full w-full"
          viewBox="0 0 952 680"
          fill="none"
          aria-hidden="true"
        >
          {/* An open boundary—not a gauge or a progress indicator. */}
          <path
            d="M 624.49 181.51 A 210 210 0 1 0 686 330"
            stroke="var(--border)"
            strokeWidth="4"
            strokeLinecap="butt"
          />

          {/* Identical neutral leaders give neither finding priority. */}
          <path
            d="M 200 196 V 220 L 310 276"
            stroke="var(--border)"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <circle
            cx="310"
            cy="276"
            r="5"
            fill="var(--ink)"
          />

          <path
            d="M 642 384 L 752 460 V 484"
            stroke="var(--border)"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <circle
            cx="642"
            cy="384"
            r="5"
            fill="var(--ink)"
          />
        </svg>

        <article className="absolute left-0 top-0 flex h-[196px] w-[400px] flex-col border-t-2 border-[var(--border)] bg-[var(--paper,#101923)] pt-5">
          <h2 className="font-[var(--font-headline)] text-[32px] font-semibold leading-[1.15] tracking-[-0.025em]">
            {callouts[0]?.label}
          </h2>
          <p className="mt-3 font-[var(--font-body)] text-[26px] leading-snug">
            {callouts[0]?.body}
          </p>
        </article>

        <article className="absolute bottom-0 right-0 flex h-[196px] w-[400px] flex-col border-t-2 border-[var(--border)] bg-[var(--paper,#101923)] pt-5">
          <h2 className="font-[var(--font-headline)] text-[32px] font-semibold leading-[1.15] tracking-[-0.025em]">
            {callouts[1]?.label}
          </h2>
          <p className="mt-3 font-[var(--font-body)] text-[26px] leading-snug">
            {callouts[1]?.body}
          </p>
        </article>
      </div>
    </section>
  );
}
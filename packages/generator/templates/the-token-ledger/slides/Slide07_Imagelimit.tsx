import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

export default function Slide07({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  const annotations = [
    {
      title: 'Per-image bound',
      body: 'An upper bound applies to the number of tokens per image.',
    },
    {
      title: 'Unspecified value',
      body: 'No numerical limit is supplied; the article refers readers to Vision.',
    },
  ];

  return (
    <section className="flex flex-col h-full min-h-0 w-full text-[var(--ink)]">
      <div className="flex shrink-0 flex-col gap-5">
        <p className="font-[var(--font-mono)] text-[22px] leading-7 tracking-[0.14em] text-[var(--accent)]">
          UNSPECIFIED CEILING
        </p>

        <h1 className="max-w-[880px] font-[var(--font-headline)] text-[64px] font-bold leading-[1.04] tracking-[-0.035em]">
          An Image Token
          <br />
          Ceiling Exists
        </h1>

        <p className="max-w-[810px] font-[var(--font-body)] text-[28px] leading-snug">
          The supplied text gives no numerical limit and points to Vision.
        </p>
      </div>

      <div className="mt-7 shrink-0">
        <svg
          viewBox="0 0 952 300"
          className="block h-[300px] w-full"
          role="img"
          aria-label="An upper-bound rule above an image outline, with no numerical threshold shown."
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            width="952"
            height="300"
            fill="var(--paper, #EAF2EC)"
          />

          <text
            x="0"
            y="27"
            fill="var(--accent, #6534BC)"
            fontFamily="var(--font-mono)"
            fontSize="22"
            letterSpacing="1.2"
          >
            Upper bound
          </text>

          <path
            d="M0 52H952"
            stroke="var(--accent, #6534BC)"
            strokeWidth="8"
          />

          <path
            d="M476 58V103"
            stroke="var(--accent, #6534BC)"
            strokeWidth="2"
          />
          <path
            d="M464 103H488"
            stroke="var(--accent, #6534BC)"
            strokeWidth="2"
          />

          <g
            fill="none"
            stroke="var(--ink, #291D35)"
            strokeWidth="4"
            strokeLinecap="square"
            strokeLinejoin="miter"
          >
            <rect x="360" y="125" width="232" height="144" />
            <circle cx="533" cy="164" r="15" />
            <path d="M376 251L431 185L473 228L501 202L576 251" />
          </g>
        </svg>
      </div>

      <div className="mt-3 flex shrink-0 flex-col gap-5">
        {annotations.map((annotation) => (
          <article
            key={annotation.title}
            className="grid grid-cols-[8px_1fr] border-y border-[var(--border)] bg-[var(--surface)]"
          >
            <div className="bg-[var(--accent)]" aria-hidden="true" />

            <div className="flex flex-col gap-2 px-8 py-5">
              <h2 className="font-[var(--font-headline)] text-[34px] font-semibold leading-tight tracking-[-0.02em]">
                {annotation.title}
              </h2>
              <p className="max-w-[810px] font-[var(--font-body)] text-[26px] leading-snug">
                {annotation.body}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
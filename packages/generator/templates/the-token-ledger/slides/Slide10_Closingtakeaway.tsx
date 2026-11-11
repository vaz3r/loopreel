import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

export default function Slide10({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  void brand;
  void totalSlides;

  const theme = {
    '--ink': '#291D35',
    '--accent': '#6534BC',
    '--paper': '#EAF2EC',
    '--surface': '#DCE8DF',
    '--border': '#A4B5A9',
  } as React.CSSProperties;

  return (
    <section
      className="flex flex-col h-full min-h-0 w-full text-[var(--ink)]"
      style={theme}
    >
      <div className="flex h-full min-h-0 flex-col bg-[var(--paper)]">
        <div className="pt-6">
          <p className="font-[var(--font-mono)] text-[22px] font-medium tracking-[0.16em] text-[var(--accent)]">
            {slide.kicker}
          </p>

          <h1 className="mt-12 max-w-[850px] font-[var(--font-headline)] text-[68px] font-bold leading-[1.08] tracking-[-0.045em]">
            {slide.headline}
          </h1>

          <svg
            className="mt-7 block h-[88px] w-full text-[var(--accent)]"
            viewBox="0 0 952 88"
            fill="none"
            role="img"
            aria-label="Usage results"
          >
            <path
              d="M0 48H678"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              d="M678 48V18H718L732 8H950V78H678V48Z"
              fill="var(--paper)"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinejoin="miter"
            />
            <path
              d="M696 31V55M696 43H708"
              stroke="currentColor"
              strokeWidth="2"
            />
            <text
              x="822"
              y="45"
              dominantBaseline="middle"
              textAnchor="middle"
              fill="var(--ink)"
              className="font-[var(--font-mono)] text-[22px]"
            >
              Usage results
            </text>
          </svg>

          <p className="mt-9 max-w-[760px] font-[var(--font-body)] text-[28px] leading-normal">
            {slide.subheadline}
          </p>
        </div>

        <div className="mt-auto pt-12">
          <div className="grid grid-cols-2 gap-6 border-t-2 border-[var(--accent)] bg-[var(--surface)] px-8 py-8">
            <article className="min-w-0 pr-4">
              <h2 className="font-[var(--font-headline)] text-[34px] font-semibold leading-tight tracking-[-0.025em]">
                Estimates
              </h2>
              <p className="mt-5 font-[var(--font-body)] text-[26px] leading-snug">
                Token estimates may differ slightly from actual processing usage.
              </p>
            </article>

            <article className="min-w-0 border-l border-[var(--border)] pl-8">
              <h2 className="font-[var(--font-headline)] text-[34px] font-semibold leading-tight tracking-[-0.025em]">
                Source of truth
              </h2>
              <p className="mt-5 font-[var(--font-body)] text-[26px] leading-snug">
                Use API-returned usage as the source of truth.
              </p>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
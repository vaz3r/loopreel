import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

export default function Slide03({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  void brand;
  void totalSlides;

  return (
    <section
      className="flex flex-col h-full min-h-0 w-full text-[var(--ink)]"
      style={
        {
          '--ink': '#291D35',
          '--accent': '#6534BC',
          '--paper': '#EAF2EC',
          '--surface': '#DCE8DF',
          '--border': '#A4B5A9',
        } as React.CSSProperties
      }
    >
      <header className="shrink-0">
        <p className="font-[var(--font-mono)] text-[22px] tracking-[0.16em] text-[var(--accent)]">
          {slide.kicker}
        </p>

        <h1 className="mt-5 max-w-[900px] font-[var(--font-headline)] text-[64px] font-bold leading-[1.04] tracking-[-0.035em]">
          {slide.headline}
        </h1>

        <p className="mt-6 max-w-[800px] font-[var(--font-body)] text-[28px] leading-snug">
          {slide.subheadline}
        </p>
      </header>

      <figure
        className="m-0 mt-8 h-[440px] w-full shrink-0"
        aria-label="Tokenization branches toward Model methods and Conversion ratios."
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 952 440"
          width="952"
          height="440"
          className="block h-full w-full"
          role="img"
          aria-label="Tokenization branches toward exactly two annotations: Model methods and Conversion ratios."
        >
          <rect width="952" height="440" fill="var(--paper)" />

          <path
            d="M64 29H888"
            stroke="var(--border)"
            strokeWidth="1"
          />

          <text
            x="476"
            y="104"
            textAnchor="middle"
            fill="var(--ink)"
            className="font-[var(--font-headline)] text-[38px] font-semibold"
          >
            Tokenization
          </text>

          <g
            fill="none"
            stroke="var(--ink)"
            strokeWidth="3"
            strokeLinecap="square"
            strokeLinejoin="miter"
          >
            <path d="M476 127V193" vectorEffect="non-scaling-stroke" />
            <path
              d="M476 193H244V291"
              vectorEffect="non-scaling-stroke"
            />
            <path
              d="M476 193H708V291"
              vectorEffect="non-scaling-stroke"
            />
          </g>

          <circle cx="476" cy="193" r="7" fill="var(--ink)" />

          <rect
            x="64"
            y="291"
            width="360"
            height="108"
            fill="var(--surface)"
          />
          <rect
            x="528"
            y="291"
            width="360"
            height="108"
            fill="var(--surface)"
          />

          <g
            fill="none"
            stroke="var(--accent)"
            strokeWidth="3"
            strokeLinecap="square"
          >
            <path
              d="M88 291H64V399H88 M400 291H424V399H400"
              vectorEffect="non-scaling-stroke"
            />
            <path
              d="M552 291H528V399H552 M864 291H888V399H864"
              vectorEffect="non-scaling-stroke"
            />
          </g>

          <g
            fill="var(--ink)"
            textAnchor="middle"
            className="font-[var(--font-headline)] text-[32px] font-semibold"
          >
            <text x="244" y="356">
              Model methods
            </text>
            <text x="708" y="356">
              Conversion ratios
            </text>
          </g>
        </svg>
      </figure>

      <div className="mt-2 grid shrink-0 grid-cols-2 gap-6 border-t border-[var(--border)] pt-7">
        <article className="pr-6">
          <h2 className="font-[var(--font-headline)] text-[34px] font-semibold leading-tight tracking-[-0.02em]">
            Different methods
          </h2>
          <p className="mt-4 font-[var(--font-body)] text-[26px] leading-snug">
            Different models use different tokenization methods.
          </p>
        </article>

        <article className="border-l border-[var(--border)] pl-7">
          <h2 className="font-[var(--font-headline)] text-[34px] font-semibold leading-tight tracking-[-0.02em]">
            Variable ratios
          </h2>
          <p className="mt-4 font-[var(--font-body)] text-[26px] leading-snug">
            Token-to-character conversion ratios can vary; the supplied text
            gives none.
          </p>
        </article>
      </div>
    </section>
  );
}
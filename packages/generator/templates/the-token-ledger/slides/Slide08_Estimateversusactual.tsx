import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

export default function Slide08({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  const titleId = React.useId();
  const diagramId = React.useId();

  void brand;

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
      aria-labelledby={titleId}
      data-slide-id={slide.id}
      data-total-slides={totalSlides}
    >
      <div className="flex shrink-0 flex-col">
        <p className="font-[var(--font-mono)] text-[20px] leading-[28px] tracking-[0.16em]">
          ACCOUNTING DISTINCTION
        </p>

        <h2
          id={titleId}
          className="mt-6 max-w-[920px] font-[var(--font-headline)] text-[64px] font-bold leading-[1.06] tracking-[-0.035em]"
        >
          Estimated Usage
          <br />
          Versus Actual Usage
        </h2>

        <p className="mt-6 max-w-[860px] font-[var(--font-body)] text-[28px] leading-snug">
          Estimates may differ slightly; API-returned usage remains the source
          of truth.
        </p>
      </div>

      <div className="mt-12 shrink-0 bg-[var(--paper)]">
        <svg
          viewBox="0 0 952 540"
          width="952"
          height="540"
          className="block h-[540px] w-full"
          role="img"
          aria-labelledby={diagramId}
        >
          <title id={diagramId}>
            Estimate: May differ slightly from actual processing usage.
            API-returned usage: The source of truth for actual processing usage.
          </title>

          <rect width="952" height="540" fill="var(--paper)" />

          {/* Equal-length schematic lanes, without a quantitative scale. */}
          <g>
            <text
              x="32"
              y="54"
              fill="var(--ink)"
              className="font-[var(--font-headline)] text-[36px] font-semibold"
            >
              Estimate
            </text>

            <path
              d="M 32 94 H 920"
              fill="none"
              stroke="var(--ink)"
              strokeWidth="5"
              strokeDasharray="16 12"
              strokeLinecap="butt"
            />

            <rect
              x="32"
              y="126"
              width="888"
              height="108"
              fill="var(--surface)"
            />

            <text
              x="60"
              y="189"
              fill="var(--ink)"
              className="font-[var(--font-body)] text-[26px]"
            >
              May differ slightly from actual processing usage.
            </text>
          </g>

          <g>
            <text
              x="32"
              y="324"
              fill="var(--accent)"
              className="font-[var(--font-headline)] text-[36px] font-semibold"
            >
              API-returned usage
            </text>

            <path
              d="M 32 364 H 920"
              fill="none"
              stroke="var(--accent)"
              strokeWidth="5"
              strokeLinecap="butt"
            />

            <rect
              x="32"
              y="396"
              width="888"
              height="108"
              fill="var(--surface)"
            />

            <text
              x="60"
              y="459"
              fill="var(--ink)"
              className="font-[var(--font-body)] text-[26px]"
            >
              The source of truth for actual processing usage.
            </text>
          </g>
        </svg>
      </div>
    </section>
  );
}
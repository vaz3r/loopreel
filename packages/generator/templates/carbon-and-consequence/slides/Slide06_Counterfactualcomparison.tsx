import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

export default function Slide06({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  return (
    <section className="flex flex-col h-full min-h-0 w-full text-[var(--ink)]">
      <header className="shrink-0">
        <p className="font-[var(--font-mono)] text-[22px] leading-[28px] tracking-[0.14em] text-[var(--accent)]">
          THE AVOIDED GROWTH
        </p>

        <h1 className="mt-4 max-w-[920px] font-[var(--font-headline)] text-[64px] font-bold leading-[1.04] tracking-[-0.035em]">
          Clean Technology Slowed Emissions Growth
        </h1>

        <p className="mt-5 max-w-[900px] font-[var(--font-body)] text-[28px] leading-[36px]">
          During 2019–2025, observed growth was below the estimated
          no-expansion counterfactual.
        </p>
      </header>

      <figure
        className="mt-7 flex min-h-0 flex-1 flex-col"
        aria-label="Observed average annual growth of 0.8 percent per year compared with an estimated 1.9 percent per year without clean-technology expansion."
      >
        <div className="grid shrink-0 grid-cols-2 gap-12 text-center">
          <div className="flex flex-col items-center">
            <div className="inline-flex border-b-[3px] border-[var(--ink)] px-4 pb-2">
              <span className="font-[var(--font-mono)] text-[84px] font-bold leading-none tracking-[-0.06em]">
                +0.8%
              </span>
            </div>
            <p className="mt-3 font-[var(--font-body)] text-[26px] leading-[32px]">
              0.8 percent per year
            </p>
          </div>

          <div className="flex flex-col items-center">
            <div className="inline-flex border-b-[3px] border-dashed border-[var(--accent)] px-4 pb-2 text-[var(--accent)]">
              <span className="font-[var(--font-mono)] text-[84px] font-bold leading-none tracking-[-0.06em]">
                +1.9%
              </span>
            </div>
            <p className="mt-3 font-[var(--font-body)] text-[26px] leading-[32px]">
              1.9 percent per year
            </p>
          </div>
        </div>

        <svg
          className="mt-5 block h-[400px] w-full shrink-0"
          viewBox="0 0 952 400"
          fill="none"
          role="img"
          aria-label="Two columns share a zero baseline. The solid observed column has height 160; the dashed counterfactual column has height 380, proportional to annual growth rates of 0.8 and 1.9 percent."
        >
          <rect
            x="86"
            y="230"
            width="280"
            height="160"
            fill="var(--ink)"
          />

          <rect
            x="586"
            y="10"
            width="280"
            height="380"
            fill="var(--paper, #EBD4C3)"
            stroke="var(--accent)"
            strokeWidth="4"
            strokeDasharray="12 10"
          />

          <line
            x1="24"
            y1="390"
            x2="928"
            y2="390"
            stroke="var(--border)"
            strokeWidth="2"
          />

          <line
            x1="226"
            y1="390"
            x2="226"
            y2="400"
            stroke="var(--ink)"
            strokeWidth="2"
          />
          <line
            x1="726"
            y1="390"
            x2="726"
            y2="400"
            stroke="var(--accent)"
            strokeWidth="2"
          />
        </svg>

        <figcaption className="mt-4 grid shrink-0 grid-cols-2 gap-12 text-center">
          <div className="px-5">
            <h2 className="font-[var(--font-headline)] text-[32px] font-semibold leading-[37px] tracking-[-0.02em]">
              Observed average annual growth
            </h2>
          </div>

          <div className="px-2">
            <h2 className="font-[var(--font-headline)] text-[32px] font-semibold leading-[37px] tracking-[-0.02em]">
              Estimated without clean-technology expansion
            </h2>
            <p className="mt-3 font-[var(--font-mono)] text-[20px] leading-[26px] tracking-[0.04em] text-[var(--accent)]">
              counterfactual estimate
            </p>
          </div>
        </figcaption>
      </figure>
    </section>
  );
}
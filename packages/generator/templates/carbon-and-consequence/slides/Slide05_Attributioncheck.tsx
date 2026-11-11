import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

export default function Slide05({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  void brand;
  void totalSlides;

  return (
    <section className="flex flex-col h-full min-h-0 w-full text-[var(--ink)]">
      <header className="shrink-0">
        <p className="font-[var(--font-mono)] text-[22px] uppercase tracking-[0.16em] text-[var(--accent)]">
          {slide.kicker}
        </p>

        <h1 className="mt-6 font-[var(--font-headline)] text-[64px] font-bold leading-[1.04] tracking-[-0.045em]">
          {slide.headline}
        </h1>

        <p className="mt-7 max-w-[850px] font-[var(--font-body)] text-[28px] leading-snug">
          {slide.subheadline}
        </p>
      </header>

      <div className="mt-10 border-t border-[var(--border)]" />

      <div className="flex min-h-0 flex-1 items-center">
        <div className="grid w-full grid-cols-[500px_minmax(0,1fr)] gap-8">
          <figure className="m-0 h-[560px] w-[500px]">
            <svg
              viewBox="0 0 500 560"
              width="500"
              height="560"
              className="block"
              role="img"
              aria-label="Electric vehicles account for about 20 percent of the oil emissions decline. The remainder is unnumbered."
            >
              <circle
                cx="220"
                cy="290"
                r="185"
                fill="none"
                stroke="var(--border)"
                strokeWidth="1"
              />

              <circle
                cx="220"
                cy="290"
                r="156"
                fill="none"
                stroke="var(--surface)"
                strokeWidth="42"
              />

              <circle
                cx="220"
                cy="290"
                r="156"
                pathLength="100"
                fill="none"
                stroke="var(--accent)"
                strokeWidth="42"
                strokeDasharray="20 80"
                strokeLinecap="butt"
                transform="rotate(-90 220 290)"
              />

              <circle
                cx="220"
                cy="290"
                r="126"
                fill="none"
                stroke="var(--border)"
                strokeWidth="1"
              />

              <path
                d="M 312 164 L 366 92 H 500"
                fill="none"
                stroke="var(--accent)"
                strokeWidth="2"
                strokeLinejoin="round"
              />
              <circle
                cx="312"
                cy="164"
                r="6"
                fill="var(--accent)"
              />

              <text
                x="220"
                y="234"
                textAnchor="middle"
                fill="var(--ink)"
                className="font-[var(--font-mono)] text-[24px]"
              >
                about
              </text>
              <text
                x="220"
                y="330"
                textAnchor="middle"
                fill="var(--accent)"
                className="font-[var(--font-mono)] text-[104px] font-bold tracking-[-0.06em]"
              >
                20
              </text>
              <text
                x="220"
                y="372"
                textAnchor="middle"
                fill="var(--ink)"
                className="font-[var(--font-mono)] text-[24px]"
              >
                percent
              </text>
            </svg>
          </figure>

          <div className="min-w-0 pt-[68px]">
            <div className="relative">
              <span
                aria-hidden="true"
                className="absolute -left-8 top-[23px] h-[2px] w-6 bg-[var(--accent)]"
              />
              <h2 className="font-[var(--font-headline)] text-[34px] font-semibold leading-tight tracking-[-0.025em] text-[var(--accent)]">
                Electric vehicles
              </h2>
              <p className="mt-4 font-[var(--font-body)] text-[26px] leading-snug">
                A limited contribution to the decline.
              </p>
            </div>

            <div className="mt-[76px] border-t border-[var(--border)] pt-7">
              <h2 className="font-[var(--font-headline)] text-[38px] font-semibold leading-tight tracking-[-0.025em]">
                High prices
              </h2>
              <p className="mt-4 font-[var(--font-body)] text-[28px] leading-snug">
                The article attributes the bulk of the decline to high prices.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
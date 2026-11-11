import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

export default function Slide02({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  void brand;
  void totalSlides;

  return (
    <section className="flex flex-col h-full min-h-0 w-full text-[var(--ink)]">
      <div className="flex h-full min-h-0 flex-col bg-[var(--paper)]">
        <header className="shrink-0">
          <p className="font-[var(--font-mono)] text-[22px] uppercase tracking-[0.16em] text-[var(--accent)]">
            {slide.kicker}
          </p>

          <h2 className="mt-6 max-w-[850px] font-[var(--font-headline)] text-[68px] font-bold leading-[1.04] tracking-[-0.045em]">
            {slide.headline}
          </h2>

          <p className="mt-6 max-w-[820px] font-[var(--font-body)] text-[28px] leading-snug">
            {slide.subheadline}
          </p>
        </header>

        <div className="mt-10 shrink-0 border-y border-[var(--border)] py-5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 952 570"
            className="block h-[570px] w-full"
            role="img"
            aria-label="Last year's increase: +1.2%, 1.2 percent. This year's estimated decrease: -0.4%, about 0.4 percent."
          >
            <rect width="952" height="570" fill="var(--paper)" />

            {/* One shared zero baseline; both bars use 225px per percent. */}
            <line
              x1="380"
              y1="70"
              x2="380"
              y2="512"
              stroke="var(--border)"
              strokeWidth="2"
              vectorEffect="non-scaling-stroke"
            />

            <g fill="var(--ink)">
              <text
                x="404"
                y="114"
                className="font-[var(--font-headline)] text-[34px] font-semibold"
              >
                Last year's increase
              </text>

              <rect x="380" y="150" width="270" height="68" />

              <text
                x="674"
                y="214"
                className="font-[var(--font-mono)] text-[84px] font-bold tracking-[-0.055em]"
              >
                +1.2%
              </text>

              <text
                x="674"
                y="260"
                className="font-[var(--font-body)] text-[26px]"
              >
                1.2 percent
              </text>
            </g>

            <g>
              <text
                x="404"
                y="304"
                fill="var(--ink)"
                className="font-[var(--font-headline)] text-[34px] font-semibold"
              >
                <tspan x="404">This year's estimated</tspan>
                <tspan x="404" dy="40">
                  decrease
                </tspan>
              </text>

              <rect
                x="290"
                y="365"
                width="90"
                height="68"
                fill="var(--accent)"
              />

              <text
                x="266"
                y="429"
                textAnchor="end"
                fill="var(--accent)"
                className="font-[var(--font-mono)] text-[84px] font-bold tracking-[-0.055em]"
              >
                -0.4%
              </text>

              <rect
                x="0"
                y="458"
                width="318"
                height="60"
                fill="var(--surface)"
              />

              <text
                x="24"
                y="497"
                fill="var(--ink)"
                className="font-[var(--font-body)] text-[26px]"
              >
                about 0.4 percent
              </text>
            </g>
          </svg>
        </div>
      </div>
    </section>
  );
}
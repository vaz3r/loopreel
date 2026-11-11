import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

export default function Slide03({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  const telemetry = [
    {
      value: '-1.9%',
      label: 'Oil emissions decline',
      qualifier: '1.9 percent',
      rising: false,
    },
    {
      value: '-0.3%',
      label: 'Natural gas emissions decline',
      qualifier: '0.3 percent',
      rising: false,
    },
    {
      value: '+0.6%',
      label: 'Coal emissions increase',
      qualifier: '0.6 percent',
      rising: true,
    },
  ];

  return (
    <section className="flex flex-col h-full min-h-0 w-full text-[var(--ink)]">
      <div className="shrink-0 pb-10">
        <p className="font-[var(--font-mono)] text-[22px] uppercase leading-normal tracking-[0.16em] text-[var(--accent)]">
          THE FUEL SPLIT
        </p>

        <h2 className="mt-5 max-w-[850px] font-[var(--font-headline)] text-[68px] font-bold leading-[1.04] tracking-[-0.045em]">
          Coal Moves
          <br />
          The Other Way
        </h2>

        <p className="mt-6 max-w-[820px] font-[var(--font-body)] text-[28px] leading-snug">
          Oil and natural gas emissions fall; coal emissions rise.
        </p>
      </div>

      <div className="flex min-h-0 flex-1 flex-col">
        {telemetry.map((item) => (
          <div
            key={item.label}
            className="grid min-h-0 flex-1 grid-cols-[104px_minmax(0,1fr)_340px] items-center gap-6 border-t border-[var(--surface)] py-6 last:border-b"
          >
            <svg
              viewBox="0 0 104 144"
              width="104"
              height="144"
              fill="none"
              aria-hidden="true"
              focusable="false"
              className={
                item.rising
                  ? 'block h-[144px] w-[104px] text-[var(--ink)]'
                  : 'block h-[144px] w-[104px] text-[var(--accent)]'
              }
            >
              <path
                d="M10 12H94M10 132H94"
                stroke="var(--surface)"
                strokeWidth="2"
              />
              <g transform={item.rising ? 'rotate(180 52 72)' : undefined}>
                <path
                  d="M40 26H64V82H88L52 118L16 82H40V26Z"
                  fill="currentColor"
                />
              </g>
            </svg>

            <h3 className="max-w-[350px] font-[var(--font-body)] text-[36px] font-semibold leading-[1.16] tracking-[-0.025em]">
              {item.label}
            </h3>

            <div
              className={`flex min-h-[174px] w-full flex-col items-center justify-center border px-5 py-5 ${
                item.rising
                  ? 'border-[var(--ink)] bg-[var(--ink)] text-[var(--paper,#EBD4C3)]'
                  : 'border-[var(--border)] bg-[var(--surface)] text-[var(--accent)]'
              }`}
            >
              <p className="whitespace-nowrap font-[var(--font-mono)] text-[96px] font-bold leading-none tracking-[-0.065em] tabular-nums">
                {item.value}
              </p>
              <p className="mt-4 font-[var(--font-mono)] text-[20px] leading-normal tracking-[0.06em]">
                {item.qualifier}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

export default function Slide10({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  const stages = [
    {
      label: 'Pre-training:',
      hours: '2664K',
      cost: '$5.328M',
    },
    {
      label: 'Context extension:',
      hours: '119K',
      cost: '$0.238M',
    },
    {
      label: 'Post-training:',
      hours: '5K',
      cost: '$0.01M.',
    },
  ];

  return (
    <section className="flex h-full min-h-0 flex-col gap-12 text-[var(--ink)]">
      <div className="shrink-0 pt-3">
        <div className="mb-8 flex items-center gap-4">
          <span
            aria-hidden="true"
            className="h-3 w-3 shrink-0 bg-[var(--accent)]"
          />
          <p className="font-[var(--font-mono)] text-[21px] leading-7 tracking-[0.025em]">
            H800 GPU-hours / USD
          </p>
        </div>

        <h1 className="font-[var(--font-headline)] text-[78px] font-semibold leading-[1.02] tracking-[-0.055em]">
          DeepSeek-V3:
          <br />
          the training ledger
        </h1>
      </div>

      <div className="relative grid min-h-0 flex-1 grid-rows-3 gap-5 pb-5">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-[calc(16.666%+17px)] left-[27px] top-[calc(16.666%-3px)] w-px bg-[var(--border)]"
        />

        {stages.map((stage, index) => (
          <div
            key={stage.label}
            className="relative grid min-h-0 grid-cols-[56px_minmax(0,1fr)] items-stretch gap-7"
          >
            <div className="relative flex items-center justify-center">
              <svg
                aria-hidden="true"
                viewBox="0 0 56 56"
                fill="none"
                className="relative h-14 w-14 text-[var(--accent)]"
              >
                <rect
                  x="8"
                  y="8"
                  width="40"
                  height="40"
                  rx="20"
                  className="fill-[var(--surface)] stroke-[var(--border)]"
                  strokeWidth="1.5"
                />
                <circle
                  cx="28"
                  cy="28"
                  r={index === 0 ? 10 : index === 1 ? 7 : 4}
                  fill="currentColor"
                />
                <path
                  d="M28 1V7M28 49V55M1 28H7M49 28H55"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
              </svg>

              {index < stages.length - 1 && (
                <span
                  aria-hidden="true"
                  className="absolute -bottom-[23px] left-1/2 z-10 -translate-x-1/2 rotate-90 font-[var(--font-mono)] text-[25px] leading-none text-[var(--accent)]"
                >
                  →
                </span>
              )}
            </div>

            <div
              className={`relative flex min-h-0 flex-col justify-center overflow-hidden border bg-[var(--surface)] px-9 py-7 ${
                index === 0
                  ? 'border-[var(--accent)]'
                  : 'border-[var(--border)]'
              }`}
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 160 20"
                fill="none"
                className="absolute right-5 top-4 h-5 w-40 text-[var(--border)]"
              >
                <path
                  d="M1 20V4M17 20V12M33 20V12M49 20V12M65 20V4M81 20V12M97 20V12M113 20V12M129 20V4M145 20V12M159 20V12"
                  stroke="currentColor"
                  strokeWidth="1"
                />
              </svg>

              <h2 className="mb-5 font-[var(--font-body)] text-[28px] font-medium leading-9 tracking-[-0.02em]">
                {stage.label}
              </h2>

              <p className="flex items-baseline gap-5 whitespace-nowrap font-[var(--font-mono)] text-[54px] leading-[1.1] tracking-[-0.065em] tabular-nums">
                <span className="text-[var(--accent)]">
                  {stage.hours}
                </span>
                <span className="text-[36px] font-normal text-[var(--border)]">
                  /
                </span>
                <span>{stage.cost}</span>
              </p>

              <span
                aria-hidden="true"
                className="absolute bottom-0 left-0 h-2 w-2 bg-[var(--accent)]"
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
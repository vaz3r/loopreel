import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

export default function Slide08({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  return (
    <section className="flex h-full min-h-0 w-full flex-col gap-10 text-[var(--ink)]">
      <h1 className="max-w-[930px] shrink-0 font-[var(--font-headline)] text-[78px] font-semibold leading-[1.04] tracking-[-0.055em]">
        A training bill
        <br />
        is not an R&amp;D bill
      </h1>

      <div className="grid min-h-0 flex-1 grid-rows-[1fr_1.8fr_1fr] gap-5">
        <article className="grid grid-cols-[64px_1fr] items-center gap-7 border border-[var(--border)] px-8 py-7">
          <svg
            aria-hidden="true"
            viewBox="0 0 64 64"
            fill="none"
            className="h-16 w-16 text-[var(--ink)] opacity-45"
          >
            <circle
              cx="32"
              cy="32"
              r="27"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <path
              d="m22 22 20 20m0-20L22 42"
              stroke="currentColor"
              strokeWidth="2"
            />
          </svg>

          <div>
            <h2 className="mb-3 font-[var(--font-mono)] text-[19px] font-medium uppercase tracking-[0.16em] opacity-60">
              Misreading
            </h2>
            <p className="max-w-[710px] font-[var(--font-body)] text-[32px] leading-[1.3] tracking-[-0.025em]">
              The reported $5.576M covers all DeepSeek-V3 development.
            </p>
          </div>
        </article>

        <article className="relative grid grid-cols-[1fr_190px] items-center gap-7 overflow-hidden border border-[var(--border)] bg-[var(--surface)] px-9 py-8">
          <div
            aria-hidden="true"
            className="absolute inset-y-0 left-0 w-[4px] bg-[var(--accent)]"
          />

          <div className="relative min-w-0">
            <h2 className="mb-5 font-[var(--font-mono)] text-[19px] font-medium uppercase tracking-[0.16em] text-[var(--accent)]">
              Correction
            </h2>
            <p className="font-[var(--font-body)] text-[34px] leading-[1.33] tracking-[-0.025em]">
              <strong className="font-[var(--font-headline)] text-[58px] font-semibold leading-none tracking-[-0.045em] text-[var(--accent)]">
                $5.576M
              </strong>{' '}
              estimates official training at{' '}
              <span className="text-[var(--accent)]">
                $2 per H800 GPU hour
              </span>
              ; prior research and ablation experiments are excluded.
            </p>
          </div>

          <svg
            aria-hidden="true"
            viewBox="0 0 190 270"
            fill="none"
            className="h-[270px] w-[190px] text-[var(--accent)]"
          >
            <path
              d="M16 28V12h158v16M16 242v16h158v-16"
              stroke="var(--border)"
              strokeWidth="1.5"
            />

            <rect
              x="39"
              y="35"
              width="48"
              height="32"
              stroke="var(--border)"
              strokeWidth="1.5"
              strokeDasharray="4 4"
            />
            <rect
              x="103"
              y="35"
              width="48"
              height="32"
              stroke="var(--border)"
              strokeWidth="1.5"
              strokeDasharray="4 4"
            />
            <path
              d="M63 67v23m64-23v23M63 180v23m64-23v23"
              stroke="var(--border)"
              strokeWidth="1.5"
              strokeDasharray="3 5"
            />

            <rect
              x="17"
              y="90"
              width="156"
              height="90"
              fill="currentColor"
              fillOpacity="0.06"
              stroke="currentColor"
              strokeWidth="2"
            />
            <path
              d="M11 102V84h18m132 0h18v18M11 168v18h18m132 0h18v-18"
              stroke="currentColor"
              strokeWidth="2"
            />

            <rect
              x="43"
              y="113"
              width="44"
              height="44"
              fill="currentColor"
              fillOpacity="0.18"
              stroke="currentColor"
            />
            <rect
              x="103"
              y="113"
              width="44"
              height="44"
              fill="currentColor"
              fillOpacity="0.18"
              stroke="currentColor"
            />
            <path
              d="m54 135 7 7 13-15m40 8 7 7 13-15"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="square"
            />

            <rect
              x="39"
              y="203"
              width="48"
              height="32"
              stroke="var(--border)"
              strokeWidth="1.5"
              strokeDasharray="4 4"
            />
            <rect
              x="103"
              y="203"
              width="48"
              height="32"
              stroke="var(--border)"
              strokeWidth="1.5"
              strokeDasharray="4 4"
            />
          </svg>
        </article>

        <article className="grid grid-cols-[190px_1fr] items-center gap-8 border-t border-[var(--border)] px-2 py-7">
          <h2 className="self-start pt-2 font-[var(--font-mono)] text-[19px] font-medium uppercase leading-[1.5] tracking-[0.13em] text-[var(--accent)]">
            Editorial rule
          </h2>
          <p className="max-w-[660px] font-[var(--font-headline)] text-[43px] font-medium leading-[1.15] tracking-[-0.035em]">
            Attach the accounting boundary to every cost headline.
          </p>
        </article>
      </div>
    </section>
  );
}
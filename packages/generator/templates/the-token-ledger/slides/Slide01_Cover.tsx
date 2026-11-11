import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

export default function Slide01({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  void slide;
  void brand;
  void totalSlides;

  const theme = {
    '--paper': '#EAF2EC',
    '--ink': '#291D35',
    '--accent': '#6534BC',
    '--surface': '#DCE8DF',
    '--border': '#A4B5A9',
    backgroundColor: 'var(--paper)',
  } as React.CSSProperties;

  return (
    <section
      className="flex flex-col h-full min-h-0 w-full text-[var(--ink)]"
      style={theme}
    >
      <div className="shrink-0">
        <div className="flex items-center gap-4">
          <span
            aria-hidden="true"
            className="h-3 w-3 shrink-0 bg-[var(--accent)]"
          />
          <p className="font-[var(--font-mono)] text-[20px] font-medium tracking-[0.18em]">
            THE TOKEN LEDGER
          </p>
        </div>

        <h1 className="mt-6 font-[var(--font-headline)] text-[68px] font-bold leading-[1.02] tracking-[-0.045em]">
          <span className="block">Token Estimates</span>
          <span className="block">Aren’t The</span>
          <span className="block text-[var(--accent)]">Final Count</span>
        </h1>

        <p className="mt-6 max-w-[850px] font-[var(--font-body)] text-[28px] leading-snug">
          Usage returned by the API is the source of truth.
        </p>
      </div>

      <div className="my-7 h-[340px] w-full shrink-0">
        <svg
          viewBox="0 0 952 340"
          className="block h-full w-full"
          role="img"
          aria-label="A dashed estimate path and a solid returned usage path converge into a ledger."
        >
          <g
            fill="none"
            stroke="var(--border)"
            strokeWidth="1"
            aria-hidden="true"
          >
            <path d="M0 10H952" />
            <path d="M0 330H952" />
            <path d="M760 32V308" />
          </g>

          <text
            x="20"
            y="57"
            fill="var(--ink)"
            className="font-[var(--font-mono)] text-[22px]"
          >
            Estimate
          </text>

          <path
            d="M28 92 C218 92 294 64 420 110 S616 194 800 194"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="4"
            strokeDasharray="12 12"
            strokeLinecap="round"
          />

          <circle
            cx="28"
            cy="92"
            r="7"
            fill="var(--paper)"
            stroke="var(--accent)"
            strokeWidth="3"
          />

          <path
            d="M28 246 C222 246 325 269 466 231 S651 194 800 194"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="7"
            strokeLinecap="round"
          />

          <circle cx="28" cy="246" r="8" fill="var(--accent)" />

          <text
            x="20"
            y="300"
            fill="var(--ink)"
            className="font-[var(--font-mono)] text-[22px]"
          >
            Returned usage
          </text>

          <g aria-hidden="true">
            <rect
              x="800"
              y="116"
              width="132"
              height="156"
              fill="var(--surface)"
              stroke="var(--border)"
              strokeWidth="1.5"
            />
            <path
              d="M825 116V272"
              fill="none"
              stroke="var(--border)"
              strokeWidth="1.5"
            />
            <path
              d="M839 151H909 M839 172H909 M839 216H909 M839 237H909"
              fill="none"
              stroke="var(--border)"
              strokeWidth="2"
            />
            <path
              d="M800 194H908"
              fill="none"
              stroke="var(--accent)"
              strokeWidth="7"
            />
            <circle cx="800" cy="194" r="8" fill="var(--accent)" />
          </g>
        </svg>
      </div>

      <div className="mt-auto shrink-0 border-t border-[var(--border)]">
        <div className="grid grid-cols-[230px_1fr] items-start gap-6 py-5">
          <h2 className="font-[var(--font-headline)] text-[32px] font-semibold leading-tight tracking-[-0.025em]">
            Estimate
          </h2>
          <p className="max-w-[650px] font-[var(--font-body)] text-[26px] leading-snug">
            Token estimates may differ slightly from actual processing usage.
          </p>
        </div>

        <div className="grid grid-cols-[230px_1fr] items-start gap-6 border-t border-[var(--border)] bg-[var(--surface)] px-7 py-6">
          <h2 className="font-[var(--font-headline)] text-[32px] font-semibold leading-tight tracking-[-0.025em] text-[var(--accent)]">
            Final count
          </h2>
          <p className="font-[var(--font-body)] text-[26px] leading-snug">
            The API’s returned usage establishes the actual processed token
            count.
          </p>
        </div>
      </div>
    </section>
  );
}
import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

export default function Slide01({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  return (
    <article className="flex h-full flex-col justify-between gap-8 text-[var(--ink)]">
      <div className="flex flex-col gap-7">
        <div className="flex items-center gap-3">
          <span
            aria-hidden="true"
            className="h-2 w-2 shrink-0 rounded-full bg-[var(--accent)]"
          />
          <p className="font-[var(--font-mono)] text-xs uppercase tracking-[0.16em]">
            {slide.kicker}
          </p>
        </div>

        <div className="flex items-start gap-5">
          <span
            aria-hidden="true"
            className="mt-3 h-20 w-1 shrink-0 bg-[var(--accent)]"
          />
          <h1 className="max-w-[850px] font-[var(--font-headline)] text-7xl font-bold leading-[0.96] tracking-[-0.055em]">
            {slide.headline}
          </h1>
        </div>

        <p className="max-w-[720px] pl-6 font-[var(--font-body)] text-2xl leading-relaxed">
          {slide.subheadline}
        </p>
      </div>

      <figure className="relative flex min-h-[340px] flex-1 flex-col overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--surface)] p-8 shadow-sm">
        <figcaption className="flex items-center justify-between gap-4 font-[var(--font-mono)] text-[11px] uppercase tracking-[0.18em]">
          <span>Spatial study / 01</span>
          <span className="text-[var(--accent)]">An open center</span>
        </figcaption>

        <div className="flex min-h-0 flex-1 items-center justify-center py-4">
          <svg
            viewBox="0 0 800 360"
            role="img"
            aria-label="Conceptual courtyard plan: an open center surrounded by sheltered rooms, with an accent line crossing the threshold."
            className="h-full max-h-[420px] w-full"
          >
            <defs>
              <pattern
                id="slide01-courtyard-grid"
                width="20"
                height="20"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 20 0 H 0 V 20"
                  fill="none"
                  stroke="var(--border)"
                  strokeWidth="0.7"
                />
              </pattern>
            </defs>

            <rect
              x="100"
              y="30"
              width="600"
              height="280"
              fill="url(#slide01-courtyard-grid)"
            />

            <g fill="none" stroke="var(--ink)">
              <path
                d="M360 310H100V30H700V310H440"
                strokeWidth="5"
              />
              <path
                d="M360 286H124V54H676V286H440"
                strokeWidth="1"
              />
              <rect
                x="270"
                y="100"
                width="260"
                height="140"
                fill="var(--surface)"
                strokeWidth="2"
              />
              <rect
                x="250"
                y="80"
                width="300"
                height="180"
                strokeWidth="0.8"
              />
              <path
                d="M250 54V286M550 54V286M124 170H250M550 170H676"
                strokeWidth="1"
              />
            </g>

            <g
              fill="var(--ink)"
              className="font-[var(--font-mono)]"
              fontSize="10"
              letterSpacing="2"
              textAnchor="middle"
            >
              <text x="187" y="121">SHELTER</text>
              <text x="613" y="223">SHELTER</text>
              <text x="400" y="154">OPEN TO SKY</text>
            </g>

            <circle
              cx="400"
              cy="182"
              r="6"
              fill="var(--accent)"
            />
            <path
              d="M400 340V200"
              fill="none"
              stroke="var(--accent)"
              strokeWidth="2"
            />
            <path
              d="M394 208L400 200L406 208"
              fill="none"
              stroke="var(--accent)"
              strokeWidth="2"
            />
            <path
              d="M370 286H430M370 296H430"
              stroke="var(--accent)"
              strokeWidth="1"
            />
          </svg>
        </div>

        <div className="flex items-center justify-between gap-4 border-t border-[var(--border)] pt-4 font-[var(--font-mono)] text-[10px] uppercase tracking-[0.16em]">
          <span>Conceptual plan · Not to scale</span>
          <span className="text-[var(--accent)]">
            Shelter ↔ Exposure
          </span>
        </div>
      </figure>

      <div className="flex items-center gap-5 border-t border-[var(--border)] pt-6">
        <div
          aria-hidden="true"
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--surface)]"
        >
          <span className="font-[var(--font-headline)] text-xl font-bold text-[var(--accent)]">
            T
          </span>
        </div>
        <div className="flex flex-col gap-1">
          <p className="font-[var(--font-body)] text-base font-semibold">
            {slide.authorName}
          </p>
          <p className="font-[var(--font-mono)] text-xs uppercase tracking-[0.12em]">
            {slide.authorRole}
          </p>
        </div>
      </div>
    </article>
  );
}
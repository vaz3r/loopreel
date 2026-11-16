import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

export default function Slide06({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  const items = slide.items ?? [];
  const item0 = items[0]!;
  const item1 = items[0]!;

  return (
    <section className="flex h-full min-h-0 w-full flex-col justify-between gap-7 text-[var(--ink)]">
      <header className="shrink-0">
        <div className="mb-6 flex items-center gap-4">
          <span
            aria-hidden="true"
            className="h-3 w-3 shrink-0 bg-[var(--accent)]"
          />
          <p className="font-[var(--font-headline)] text-[22px] font-bold tracking-[0.14em]">
            THE STATUTORY PERIMETER
          </p>
        </div>

        <h1 className="max-w-[900px] font-[var(--font-headline)] text-[60px] font-bold leading-[1.02] tracking-tight">
          The Mortgage Ban Is Not Universal
        </h1>

        <p className="mt-5 max-w-[880px] font-[var(--font-body)] text-[26px] leading-snug line-clamp-2">
          The CFPB’s 2015 fact sheet identifies a sector-specific ban.
        </p>
      </header>

      <div className="relative flex min-h-0 flex-1 items-center justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 952 460"
          preserveAspectRatio="xMidYMid meet"
          className="block h-full max-h-[500px] w-full"
          role="img"
          aria-label="Scope comparison: the mortgage arbitration prohibition applies to mortgage contracts, not to Disney agreements. Channel lengths are schematic, not quantitative."
        >
          <path
            d="M0 1H952 M0 230H952 M0 459H952"
            fill="none"
            stroke="var(--border)"
            strokeWidth="2"
          />

          {/* Column headings sit inside the vector ledger. */}
          <text
            x="24"
            y="39"
            fill="var(--ink)"
            className="font-[var(--font-mono)] text-[22px]"
          >
            CONTRACT CATEGORY
          </text>
          <text
            x="928"
            y="39"
            textAnchor="end"
            fill="var(--ink)"
            className="font-[var(--font-mono)] text-[22px]"
          >
            REACH OF THIS BAN
          </text>

          {/* Mortgage channel: an accent conduit ends at a barrier. */}
          <text
            x="24"
            y="101"
            fill="var(--ink)"
            className="font-[var(--font-headline)] text-[30px] font-semibold"
          >
            {item0?.label ?? 'Mortgage contracts'}
          </text>

          <rect
            x="634"
            y="68"
            width="294"
            height="50"
            fill="var(--accent)"
          />
          <text
            x="781"
            y="101"
            textAnchor="middle"
            fill="var(--paper, #0A0A0C)"
            className="font-[var(--font-mono)] text-[24px] font-bold"
          >
            PROHIBITED
          </text>

          <rect
            x="50"
            y="149"
            width="878"
            height="30"
            fill="var(--surface)"
          />
          <rect
            x="50"
            y="149"
            width="584"
            height="30"
            fill="var(--accent)"
            fillOpacity="0.18"
          />
          <path
            d="M64 164H612"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="5"
          />
          <path
            d="M242 153L254 164L242 175 M430 153L442 164L430 175"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="4"
            strokeLinejoin="miter"
          />

          <rect
            x="24"
            y="138"
            width="52"
            height="52"
            fill="var(--surface)"
            stroke="var(--accent)"
            strokeWidth="3"
          />
          <rect
            x="42"
            y="156"
            width="16"
            height="16"
            fill="var(--accent)"
          />

          <path
            d="M634 128V201 M648 128V201"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="6"
          />
          <path
            d="M672 164H928"
            fill="none"
            stroke="var(--border)"
            strokeWidth="3"
            strokeDasharray="6 10"
          />

          {/* Disney channel: a neutral conduit continues past the marker. */}
          <text
            x="24"
            y="291"
            fill="var(--ink)"
            className="font-[var(--font-headline)] text-[30px] font-semibold"
          >
            {item1?.label ?? 'Disney agreements'}
          </text>

          <rect
            x="634"
            y="258"
            width="294"
            height="50"
            fill="var(--surface)"
            stroke="var(--border)"
            strokeWidth="2"
          />
          <text
            x="781"
            y="291"
            textAnchor="middle"
            fill="var(--ink)"
            className="font-[var(--font-mono)] text-[24px] font-bold"
          >
            OUTSIDE THIS BAN
          </text>

          <rect
            x="50"
            y="339"
            width="878"
            height="30"
            fill="var(--surface)"
          />
          <path
            d="M64 354H894"
            fill="none"
            stroke="var(--ink)"
            strokeWidth="5"
          />
          <path
            d="M242 343L254 354L242 365 M430 343L442 354L430 365"
            fill="none"
            stroke="var(--ink)"
            strokeWidth="4"
          />

          <path
            d="M50 328L76 354L50 380L24 354Z"
            fill="var(--surface)"
            stroke="var(--ink)"
            strokeWidth="3"
          />
          <circle cx="50" cy="354" r="7" fill="var(--ink)" />

          <path
            d="M634 322V333 M634 375V387"
            fill="none"
            stroke="var(--border)"
            strokeWidth="3"
          />
          <path
            d="M879 340L895 354L879 368"
            fill="none"
            stroke="var(--ink)"
            strokeWidth="5"
          />

          <text
            x="928"
            y="430"
            textAnchor="end"
            fill="var(--ink)"
            className="font-[var(--font-mono)] text-[22px]"
          >
            SCOPE COMPARISON / NOT A QUANTITY SCALE
          </text>
        </svg>
      </div>

      <footer className="shrink-0 border-t-2 border-[var(--border)] bg-[var(--surface)] px-7 py-7">
        <div className="grid grid-cols-2 gap-7">
          <article className="min-w-0">
            <div className="mb-3 flex items-center gap-3">
              <span
                aria-hidden="true"
                className="h-3 w-3 shrink-0 bg-[var(--accent)]"
              />
              <h2 className="font-[var(--font-headline)] text-[28px] font-semibold leading-tight">
                {item0?.label ?? 'Mortgage contracts'}
              </h2>
            </div>
            <p className="font-[var(--font-body)] text-[24px] leading-snug line-clamp-3">
              {item0?.body ??
                'Dodd-Frank prohibits arbitration clauses in these contracts.'}
            </p>
          </article>

          <article className="min-w-0 border-l border-[var(--border)] pl-7">
            <div className="mb-3 flex items-center gap-3">
              <span
                aria-hidden="true"
                className="h-3 w-3 shrink-0 rotate-45 border border-[var(--ink)]"
              />
              <h2 className="font-[var(--font-headline)] text-[28px] font-semibold leading-tight">
                {item1?.label ?? 'Disney agreements'}
              </h2>
            </div>
            <p className="font-[var(--font-body)] text-[24px] leading-snug line-clamp-3">
              {item1?.body ??
                'That mortgage prohibition does not cover these agreements.'}
            </p>
          </article>
        </div>
      </footer>
    </section>
  );
}
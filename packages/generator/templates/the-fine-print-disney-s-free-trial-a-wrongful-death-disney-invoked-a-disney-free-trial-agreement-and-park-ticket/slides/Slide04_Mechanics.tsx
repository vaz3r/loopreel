import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';
import { Globe2, Ticket, Scale, ArrowDownRight } from 'lucide-react';

export default function Slide04({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  const items = slide.items ?? [];

  return (
    <section className="flex h-full min-h-0 w-full flex-col justify-between px-1 py-5 text-[var(--ink)]">
      <header className="mb-3 shrink-0">
        <div className="mb-5 flex items-center gap-3">
          <span
            aria-hidden="true"
            className="h-3 w-3 shrink-0 bg-[var(--accent)]"
          />
          <p className="font-[var(--font-mono)] text-[20px] uppercase tracking-[0.16em] text-[var(--accent)]">
            THE CONTRACTUAL CHAIN
          </p>
        </div>

        <h1 className="max-w-[900px] font-[var(--font-headline)] text-[58px] font-bold leading-[1.04] tracking-tight">
          How Disney Connected the Dots
        </h1>

        <p className="mt-4 max-w-[850px] font-[var(--font-body)] text-[26px] leading-snug">
          Disney cited website reliance, then a later park-ticket purchase.
        </p>
      </header>

      <div className="relative my-3 flex min-h-0 flex-1 items-center justify-center overflow-hidden">
        <svg
          viewBox="0 0 952 420"
          preserveAspectRatio="xMidYMid meet"
          className="h-full w-full"
          role="img"
          aria-label="Disney’s asserted contractual chain: website reliance, a later ticket purchase, and arbitration."
        >
          {/* A single continuous rail carries the asserted sequence. */}
          <path
            d="M64 250 H888"
            fill="none"
            stroke="var(--border)"
            strokeWidth="2"
          />
          <path
            d="M156 250 H796"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="3"
          />
          <path
            d="m462 243 9 7-9 7 M782 243 l9 7-9 7"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Website milestone. */}
          <text
            x="156"
            y="65"
            textAnchor="middle"
            fill="var(--accent)"
            className="font-[var(--font-mono)] text-[22px]"
          >
            01
          </text>
          <Globe2
            x={106}
            y={110}
            width={100}
            height={100}
            stroke="var(--ink)"
            strokeWidth={1.2}
          />
          <path
            d="M156 218 V238"
            stroke="var(--border)"
            strokeWidth="2"
          />
          <circle
            cx="156"
            cy="250"
            r="9"
            fill="var(--surface)"
            stroke="var(--accent)"
            strokeWidth="3"
          />
          <text
            x="156"
            y="310"
            textAnchor="middle"
            fill="var(--ink)"
            className="font-[var(--font-mono)] text-[22px] tracking-[0.12em]"
          >
            WEBSITE
          </text>

          {/* Later purchase milestone. */}
          <text
            x="476"
            y="65"
            textAnchor="middle"
            fill="var(--accent)"
            className="font-[var(--font-mono)] text-[22px]"
          >
            02
          </text>
          <g transform="rotate(-12 476 160)">
            <Ticket
              x={420}
              y={104}
              width={112}
              height={112}
              stroke="var(--ink)"
              strokeWidth={1.2}
            />
          </g>
          <path
            d="M476 218 V238"
            stroke="var(--border)"
            strokeWidth="2"
          />
          <circle
            cx="476"
            cy="250"
            r="9"
            fill="var(--surface)"
            stroke="var(--accent)"
            strokeWidth="3"
          />
          <text
            x="476"
            y="310"
            textAnchor="middle"
            fill="var(--ink)"
            className="font-[var(--font-mono)] text-[22px] tracking-[0.12em]"
          >
            TICKETS
          </text>

          {/* Claimed destination—not a judicial finding. */}
          <text
            x="796"
            y="65"
            textAnchor="middle"
            fill="var(--accent)"
            className="font-[var(--font-mono)] text-[22px]"
          >
            03
          </text>
          <Scale
            x={742}
            y={106}
            width={108}
            height={108}
            stroke="var(--accent)"
            strokeWidth={1.2}
          />
          <path
            d="M796 218 V238"
            stroke="var(--border)"
            strokeWidth="2"
          />
          <circle
            cx="796"
            cy="250"
            r="18"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="1"
            opacity="0.35"
          />
          <circle cx="796" cy="250" r="9" fill="var(--accent)" />
          <text
            x="796"
            y="310"
            textAnchor="middle"
            fill="var(--accent)"
            className="font-[var(--font-mono)] text-[22px] tracking-[0.08em]"
          >
            ARBITRATION
          </text>

          {/* Editorial bracket marks the argument as a connected chain. */}
          <path
            d="M156 342 V356 H796 V342"
            fill="none"
            stroke="var(--border)"
            strokeWidth="1.5"
          />
        </svg>
      </div>

      <div className="shrink-0 border-t border-[var(--border)] pt-4">
        <article className="grid grid-cols-[56px_250px_minmax(0,1fr)] items-start gap-x-5 pb-5">
          <span className="pt-1 font-[var(--font-mono)] text-[22px] text-[var(--accent)]">
            01
          </span>
          <h2 className="font-[var(--font-headline)] text-[28px] font-semibold leading-tight">
            {items[0]?.label ?? 'Website bridge'}
          </h2>
          <p className="font-[var(--font-body)] text-[24px] leading-snug">
            {items[0]?.body ??
              'Disney linked the claim to alleged reliance on its website.'}
          </p>
        </article>

        <article className="grid grid-cols-[56px_250px_minmax(0,1fr)] items-start gap-x-5 border-t border-[var(--border)] pt-5">
          <ArrowDownRight
            aria-hidden="true"
            className="mt-1 h-7 w-7 text-[var(--accent)]"
            strokeWidth={1.5}
          />
          <h2 className="font-[var(--font-headline)] text-[28px] font-semibold leading-tight">
            {items[1]?.label ?? 'Ticket terms'}
          </h2>
          <p className="font-[var(--font-body)] text-[24px] leading-snug">
            {items[1]?.body ??
              'Disney said later ticket terms reinforced agreement to arbitrate.'}
          </p>
        </article>
      </div>
    </section>
  );
}
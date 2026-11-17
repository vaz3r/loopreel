import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';
import { Ticket, Plane, Clock3, MapPin, ArrowRight } from 'lucide-react';

export default function Slide04({ slide, brand, totalSlides }: SlideComponentProps) {
  const items = slide.items ?? [];
  void brand;
  void totalSlides;

  return (
    <section className="flex h-full min-h-0 w-full flex-col justify-between py-5 px-1 text-[var(--ink)]">
      <header className="mb-3 shrink-0">
        <div className="mb-5 flex items-center gap-3">
          <span
            aria-hidden="true"
            className="h-3 w-3 shrink-0 bg-[var(--accent)]"
          />
          <p className="font-[var(--font-mono)] text-[22px] font-medium uppercase tracking-[0.16em]">
            THE PAYMENT CLOCK
          </p>
        </div>

        <h1 className="max-w-[900px] font-[var(--font-headline)] text-[58px] font-bold leading-[1.04] tracking-tight">
          The schedule sets the calculation
        </h1>

        <p className="mt-5 max-w-[880px] font-[var(--font-body)] text-[26px] leading-snug">
          Eligible compensation uses your fare and the replacement&apos;s
          planned arrival.
        </p>
      </header>

      <div className="relative my-3 flex min-h-0 flex-1 items-center justify-center overflow-hidden">
        <svg
          viewBox="0 0 952 420"
          preserveAspectRatio="xMidYMid meet"
          className="block h-full max-h-[420px] w-full"
          role="img"
          aria-label="A continuous journey timeline from arrangements being made to the replacement's planned arrival. The planned arrival is the calculation reference."
        >
          {/* Subtle registration marks, not a second frame. */}
          <g
            fill="none"
            stroke="var(--border)"
            strokeWidth="1"
            aria-hidden="true"
          >
            <path d="M38 82h18M47 73v18M896 82h18M905 73v18" />
            <path d="M38 350h18M47 341v18M896 350h18M905 341v18" />
          </g>

          {/* A single uninterrupted chronological rail. */}
          <path
            d="M98 264H854"
            fill="none"
            stroke="var(--border)"
            strokeWidth="3"
          />
          <path
            d="M146 264H778"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="3"
          />
          <path
            d="M840 256l14 8-14 8"
            fill="none"
            stroke="var(--ink)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Arrangement milestone: a tangible fare receipt. */}
          <path
            d="M146 186V250"
            fill="none"
            stroke="var(--border)"
            strokeWidth="2"
          />
          <Ticket
            x={104}
            y={100}
            width={84}
            height={84}
            stroke="var(--ink)"
            strokeWidth={1.3}
          />
          <circle
            cx="146"
            cy="264"
            r="9"
            fill="var(--ink)"
            stroke="var(--surface)"
            strokeWidth="4"
          />
          <text
            x="146"
            y="314"
            textAnchor="middle"
            fill="var(--ink)"
            className="font-[var(--font-mono)] text-[22px] tracking-[0.08em]"
          >
            ARRANGEMENTS
          </text>

          {/* The replacement journey travels along the same rail. */}
          <path
            d="M272 167H365M291 181H351"
            fill="none"
            stroke="var(--border)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <Plane
            x={392}
            y={131}
            width={72}
            height={72}
            stroke="var(--ink)"
            strokeWidth={1.3}
          />
          <path
            d="M495 167H576"
            fill="none"
            stroke="var(--border)"
            strokeWidth="2"
          />
          <path
            d="M566 161l10 6-10 6"
            fill="none"
            stroke="var(--border)"
            strokeWidth="2"
          />
          <text
            x="429"
            y="314"
            textAnchor="middle"
            fill="var(--ink)"
            className="font-[var(--font-mono)] text-[22px] tracking-[0.08em]"
          >
            REPLACEMENT
          </text>

          {/* The clock is the focal object, not a decorative network node. */}
          <circle
            cx="778"
            cy="146"
            r="85"
            fill="var(--surface)"
          />
          <path
            d="M778 49v12M875 146h-12M778 243v-12M681 146h12"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="2"
          />
          <Clock3
            x={716}
            y={84}
            width={124}
            height={124}
            stroke="var(--ink)"
            strokeWidth={1.1}
          />
          <path
            d="M778 146V110M778 146l28 17"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="4"
            strokeLinecap="round"
          />
          <path
            d="M778 231V250"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="2"
          />
          <circle
            cx="778"
            cy="264"
            r="15"
            fill="var(--surface)"
            stroke="var(--accent)"
            strokeWidth="2"
          />
          <circle cx="778" cy="264" r="6" fill="var(--accent)" />
          <text
            x="778"
            y="314"
            textAnchor="middle"
            fill="var(--accent)"
            className="font-[var(--font-mono)] text-[22px] font-medium tracking-[0.04em]"
          >
            PLANNED ARRIVAL
          </text>
        </svg>
      </div>

      <div className="shrink-0 border-t border-[var(--border)] pt-4">
        <article className="grid grid-cols-[44px_270px_minmax(0,1fr)] items-start gap-x-5 pb-6">
          <Clock3
            aria-hidden="true"
            className="mt-1 h-8 w-8 text-[var(--accent)]"
            strokeWidth={1.5}
          />
          <h2 className="font-[var(--font-headline)] text-[28px] font-semibold leading-tight">
            {items[0]?.label ?? 'Which schedule?'}
          </h2>
          <p className="font-[var(--font-body)] text-[24px] leading-snug">
            {items[0]?.body ??
              'Planned arrival when arrangements are made—not your actual arrival.'}
          </p>
        </article>

        <article className="grid grid-cols-[44px_270px_minmax(0,1fr)] items-start gap-x-5 border-t border-[var(--border)] pt-6">
          <MapPin
            aria-hidden="true"
            className="mt-1 h-8 w-8 text-[var(--accent)]"
            strokeWidth={1.5}
          />
          <h2 className="font-[var(--font-headline)] text-[28px] font-semibold leading-tight">
            {items[1]?.label ?? 'Which destination?'}
          </h2>
          <p className="font-[var(--font-body)] text-[24px] leading-snug">
            {items[1]?.body ??
              'First stopover—or final destination if there is no stopover.'}
          </p>
        </article>
      </div>
    </section>
  );
}
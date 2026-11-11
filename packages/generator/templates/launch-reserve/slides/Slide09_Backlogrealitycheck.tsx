import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

export default function Slide09({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  void slide;
  void brand;
  void totalSlides;

  return (
    <section className="flex flex-col h-full min-h-0 w-full text-[var(--ink)]">
      <header className="shrink-0">
        <p className="font-[var(--font-mono)] text-[20px] leading-[28px] tracking-[0.14em] text-[var(--accent)]">
          BOOKINGS VERSUS READINESS
        </p>

        <h1 className="mt-4 font-[var(--font-headline)] text-[64px] font-bold leading-[1.04] tracking-[-0.035em]">
          <span className="block">The Backlog Is Not</span>
          <span className="block">Neutron Alone</span>
        </h1>

        <p className="mt-4 max-w-[880px] font-[var(--font-body)] text-[26px] leading-[1.35]">
          Rocket Lab’s combined orders and Neutron’s scheduled debut describe
          different things.
        </p>
      </header>

      <figure className="m-0 mt-6 h-[650px] w-full shrink-0">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 952 650"
          width="952"
          height="650"
          className="block h-full w-full"
          role="img"
          aria-label="117 launches: contracted backlog combines Neutron and Electron orders; no split is provided. Next year: Rocket Lab’s stated Neutron first-launch schedule, not a completed milestone."
        >
          {/* One undivided order book: no vehicle allocation is depicted. */}
          <rect
            x="2"
            y="36"
            width="576"
            height="174"
            rx="2"
            fill="var(--surface)"
            stroke="var(--border)"
            strokeWidth="2"
          />

          <path
            d="M2 66 V36 H32 M548 36 H578 V66
               M2 180 V210 H32 M548 210 H578 V180"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="3"
          />

          <text
            x="290"
            y="151"
            textAnchor="middle"
            fill="var(--accent)"
            className="font-[var(--font-mono)] text-[96px] font-bold"
          >
            117
            <tspan
              fill="var(--ink)"
              className="font-[var(--font-headline)] text-[36px] font-semibold"
            >
              {' '}launches
            </tspan>
          </text>

          {/* Shared brace spans the complete, unsegmented backlog. */}
          <path
            d="M44 230
               V236 Q44 248 58 248
               H270 Q290 248 290 262
               Q290 248 310 248
               H522 Q536 248 536 236 V230"
            fill="none"
            stroke="var(--border)"
            strokeWidth="2"
          />

          <text
            x="290"
            y="303"
            textAnchor="middle"
            fill="var(--ink)"
            className="font-[var(--font-headline)] text-[32px] font-semibold"
          >
            <tspan>Neutron</tspan>
            <tspan dx="44">Electron</tspan>
          </text>

          {/* Backlog annotation attaches to the whole container. */}
          <path
            d="M578 104 H614"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="2"
          />
          <circle cx="578" cy="104" r="4" fill="var(--accent)" />

          <text
            x="634"
            y="80"
            fill="var(--ink)"
            className="font-[var(--font-body)] text-[26px]"
          >
            <tspan x="634">Contracted backlog</tspan>
            <tspan x="634" dy="36">combines Neutron and</tspan>
            <tspan x="634" dy="36">Electron orders; no</tspan>
            <tspan x="634" dy="36">split is provided.</tspan>
          </text>

          {/* Intentional open space separates quantities from readiness. */}

          {/* A disconnected, dashed milestone denotes a stated schedule. */}
          <rect
            x="2"
            y="476"
            width="576"
            height="138"
            rx="2"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="2"
            strokeDasharray="12 10"
          />

          <text
            x="290"
            y="573"
            textAnchor="middle"
            fill="var(--ink)"
            className="font-[var(--font-mono)] text-[84px] font-bold tracking-[-0.04em]"
          >
            next year
          </text>

          <path
            d="M578 540 H614"
            fill="none"
            stroke="var(--border)"
            strokeWidth="2"
            strokeDasharray="6 6"
          />
          <circle
            cx="578"
            cy="540"
            r="4"
            fill="var(--paper, #0C1621)"
            stroke="var(--accent)"
            strokeWidth="2"
          />

          <text
            x="634"
            y="492"
            fill="var(--ink)"
            className="font-[var(--font-body)] text-[26px]"
          >
            <tspan x="634">Rocket Lab’s stated</tspan>
            <tspan x="634" dy="36">Neutron first-launch</tspan>
            <tspan x="634" dy="36">schedule, not a</tspan>
            <tspan x="634" dy="36">completed milestone.</tspan>
          </text>
        </svg>
      </figure>
    </section>
  );
}
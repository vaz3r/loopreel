import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

export default function Slide08({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  return (
    <section className="flex flex-col h-full min-h-0 w-full text-[var(--ink)]">
      <header className="flex flex-col items-start">
        <p className="flex items-center gap-4 font-[var(--font-mono)] text-[20px] tracking-[0.16em] text-[var(--accent)]">
          <span
            aria-hidden="true"
            className="h-[3px] w-12 bg-[var(--accent)]"
          />
          NEUTRON PRICING
        </p>

        <h2 className="mt-6 max-w-[900px] font-[var(--font-headline)] text-[68px] font-bold leading-[1.04] tracking-[-0.045em]">
          A Higher Price
          <br />
          Before Flight
        </h2>

        <p className="mt-6 max-w-[860px] font-[var(--font-body)] text-[28px] leading-snug">
          Rocket Lab attributes the increase to surging bookings for the
          still-unproven vehicle.
        </p>
      </header>

      <figure className="m-0 mt-8 w-full shrink-0">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 952 600"
          className="block h-[600px] w-full"
          role="img"
          aria-label="Previous price: $55 million. Previously announced Neutron launch price. New price: $70 million per launch. Raised while Neutron remained unproven."
        >
          {/* A single editorial step, deliberately without a quantitative axis. */}
          <path
            d="M 12 340 H 350 V 240 H 926"
            fill="none"
            stroke="var(--surface)"
            strokeWidth="22"
            strokeLinejoin="miter"
          />
          <path
            d="M 12 340 H 350 V 240 H 926"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="5"
            strokeLinejoin="miter"
          />

          <circle
            cx="12"
            cy="340"
            r="8"
            fill="var(--surface)"
            stroke="var(--accent)"
            strokeWidth="3"
          />
          <rect
            x="918"
            y="232"
            width="16"
            height="16"
            fill="var(--accent)"
          />

          {/* Upper-right price hierarchy. */}
          <text
            x="410"
            y="52"
            fill="var(--ink)"
            className="font-[var(--font-headline)] text-[34px] font-semibold"
          >
            New price
          </text>

          <text
            x="410"
            y="151"
            fill="var(--accent)"
            className="font-[var(--font-mono)] text-[84px] font-bold tracking-[-0.055em]"
          >
            $70 million
          </text>

          <text
            x="414"
            y="198"
            fill="var(--ink)"
            className="font-[var(--font-body)] text-[32px] font-semibold"
          >
            per launch
          </text>

          {/* Fine callout leader beneath the new-price landing. */}
          <path
            d="M 926 256 V 279 H 480"
            fill="none"
            stroke="var(--border)"
            strokeWidth="2"
          />
          <text
            x="480"
            y="316"
            fill="var(--ink)"
            className="font-[var(--font-body)] text-[26px]"
          >
            <tspan x="480">Raised while Neutron</tspan>
            <tspan x="480" dy="35">
              remained unproven.
            </tspan>
          </text>

          {/* Lower-left price hierarchy. */}
          <path
            d="M 12 354 V 374"
            fill="none"
            stroke="var(--border)"
            strokeWidth="2"
          />
          <text
            x="0"
            y="415"
            fill="var(--ink)"
            className="font-[var(--font-headline)] text-[34px] font-semibold"
          >
            Previous price
          </text>

          <text
            x="0"
            y="510"
            fill="var(--ink)"
            className="font-[var(--font-mono)] text-[84px] font-bold tracking-[-0.055em]"
          >
            $55 million
          </text>

          <text
            x="4"
            y="555"
            fill="var(--ink)"
            className="font-[var(--font-body)] text-[26px]"
          >
            <tspan x="4">Previously announced</tspan>
            <tspan x="4" dy="35">
              Neutron launch price.
            </tspan>
          </text>
        </svg>
      </figure>
    </section>
  );
}
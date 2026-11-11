import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

export default function Slide09({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  return (
    <section className="flex flex-col h-full min-h-0 w-full text-[var(--ink)]">
      <header className="shrink-0">
        <p className="font-[var(--font-mono)] text-[22px] leading-[26px] tracking-wider text-[var(--accent)]">
          THE FORECAST CONDITIONS
        </p>

        <h2 className="mt-5 font-[var(--font-headline)] text-[64px] font-bold leading-[66px] tracking-tight">
          <span className="block">A Sustained Peak</span>
          <span className="block">Remains Conditional</span>
        </h2>

        <p className="mt-6 max-w-[880px] font-[var(--font-body)] text-[26px] leading-[34px]">
          Researchers say sustained peak and decline could be a few years away.
        </p>
      </header>

      <figure
        className="m-0 mt-8 h-[600px] w-full shrink-0"
        aria-label="A pathway through a deployment condition gate continues as an open-ended, conditional outlook. The projection horizon is not a dated peak."
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 952 600"
          className="block h-full w-full"
          role="img"
          aria-label="Deployment condition and conditional outlook"
        >
          <rect width="952" height="600" fill="var(--paper, #EBD4C3)" />

          {/* Open architectural gate: surface interior, accent structure. */}
          <rect
            x="390"
            y="42"
            width="280"
            height="282"
            fill="var(--surface)"
          />
          <path
            d="M390 324V42H670V324"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="4"
          />
          <path
            d="M378 324H412 M648 324H682"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="4"
          />
          <path
            d="M406 86V58H434 M626 58H654V86"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="1.5"
          />

          <text
            x="530"
            y="124"
            textAnchor="middle"
            fill="var(--accent)"
            className="font-[var(--font-headline)] text-[32px] font-semibold"
          >
            <tspan x="530">Deployment</tspan>
            <tspan x="530" dy="39">
              condition
            </tspan>
          </text>

          {/* Solid incoming pathway; no date or peak milestone. */}
          <path
            d="M8 238H670"
            fill="none"
            stroke="var(--ink)"
            strokeWidth="5"
          />
          <path
            d="M348 225L361 238L348 251"
            fill="none"
            stroke="var(--ink)"
            strokeWidth="3"
            strokeLinejoin="miter"
          />

          {/* The outgoing pathway remains dashed and unclosed. */}
          <path
            d="M670 238H946"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="4"
            strokeDasharray="15 13"
          />

          <text
            x="712"
            y="125"
            fill="var(--accent)"
            className="font-[var(--font-mono)] text-[22px] tracking-wider"
          >
            <tspan x="712">Conditional</tspan>
            <tspan x="712" dy="30">
              outlook
            </tspan>
          </text>

          {/* Projection note sits directly beneath the incoming path. */}
          <path
            d="M48 254V350H8"
            fill="none"
            stroke="var(--border)"
            strokeWidth="2"
          />

          <text
            x="8"
            y="400"
            fill="var(--ink)"
            className="font-[var(--font-headline)] text-[32px] font-semibold"
          >
            Projection horizon
          </text>

          <text
            x="8"
            y="445"
            fill="var(--ink)"
            className="font-[var(--font-body)] text-[26px]"
          >
            <tspan x="8">Researchers extrapolated</tspan>
            <tspan x="8" dy="35">
              trends using the IMF's
            </tspan>
            <tspan x="8" dy="35">
              GDP projection
            </tspan>
            <tspan x="8" dy="35">
              through 2028.
            </tspan>
          </text>

          {/* Gate condition is connected to its supporting explanation. */}
          <path
            d="M530 324V350H430"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="2"
          />
          <text
            x="430"
            y="400"
            fill="var(--ink)"
            className="font-[var(--font-body)] text-[26px]"
          >
            <tspan x="430">Further acceleration of</tspan>
            <tspan x="430" dy="35">
              clean-technology deployment
            </tspan>
            <tspan x="430" dy="35">
              must be supported through time.
            </tspan>
          </text>
        </svg>
      </figure>
    </section>
  );
}
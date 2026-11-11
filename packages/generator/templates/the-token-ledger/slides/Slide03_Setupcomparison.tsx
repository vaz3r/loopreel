import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

export default function Slide03({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  const FloorPlan = ({ x, y }: { x: number; y: number }) => (
    <g transform={`translate(${x} ${y})`}>
      <path
        d="M0 0H188V154H116V182H0Z"
        fill="var(--surface)"
        stroke="var(--ink)"
        strokeWidth="3"
        strokeLinejoin="miter"
      />
      <path
        d="M96 0V56M96 84V154M0 96H46M74 96H96M96 64H188"
        fill="none"
        stroke="var(--border)"
        strokeWidth="3"
      />
      <path
        d="M46 96V68A28 28 0 0 1 74 96M96 56H124A28 28 0 0 1 96 84"
        fill="none"
        stroke="var(--accent)"
        strokeWidth="2"
        opacity="0.7"
      />
      <path
        d="M-9 24V-9H24M164-9H197V24M197 130V163H164M24 191H-9V158"
        fill="none"
        stroke="var(--accent)"
        strokeWidth="2"
      />
    </g>
  );

  return (
    <section className="flex flex-col h-full min-h-0 w-full text-[var(--ink)]">
      <header className="shrink-0">
        <p className="font-[var(--font-mono)] text-[20px] font-medium tracking-[0.16em] text-[var(--accent)]">
          {slide.kicker}
        </p>

        <h2 className="mt-5 max-w-[900px] font-[var(--font-headline)] text-[60px] font-bold leading-[1.04] tracking-[-0.035em]">
          {slide.headline}
        </h2>

        <p className="mt-5 max-w-[870px] font-[var(--font-body)] text-[26px] leading-snug">
          {slide.subheadline}
        </p>
      </header>

      <div className="mt-8 shrink-0 border-t border-[var(--border)] pt-5">
        <svg
          viewBox="0 0 952 660"
          width="952"
          height="660"
          role="img"
          aria-label="A carried drone tour and autonomous rover exploration produce illustrative floor plans, with a shared bracket indicating AI Pilot uses cloud processing."
          className="block h-[660px] w-full text-[var(--ink)]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Upper process lane */}
          <text
            x="0"
            y="35"
            fill="currentColor"
            className="font-[var(--font-headline)] text-[34px] font-semibold"
          >
            Drone: carried tour
          </text>

          <text
            x="0"
            y="79"
            fill="currentColor"
            className="font-[var(--font-body)] text-[26px]"
          >
            <tspan x="0">Customers carry the drone through indoor spaces</tspan>
            <tspan x="0" dy="35">to map floor plans.</tspan>
          </text>

          {/* Carried drone: rotors, airframe, and supporting hand */}
          <g
            transform="translate(38 150)"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path
              d="M40 34L84 58M152 34L108 58M40 94L84 70M152 94L108 70"
              stroke="var(--ink)"
              strokeWidth="5"
            />
            <g
              fill="var(--surface)"
              stroke="var(--accent)"
              strokeWidth="3"
            >
              <ellipse cx="36" cy="32" rx="30" ry="12" />
              <ellipse cx="156" cy="32" rx="30" ry="12" />
              <ellipse cx="36" cy="96" rx="30" ry="12" />
              <ellipse cx="156" cy="96" rx="30" ry="12" />
            </g>

            <rect
              x="77"
              y="44"
              width="38"
              height="40"
              rx="10"
              fill="var(--surface)"
              stroke="var(--ink)"
              strokeWidth="3"
            />
            <circle cx="96" cy="57" r="5" fill="var(--accent)" />

            <path
              d="M76 173L67 145L54 129
                 Q49 122 55 117
                 Q61 112 67 119
                 L81 132V95
                 Q81 88 87 88
                 Q93 88 93 95V117
                 L116 111
                 Q129 109 132 122
                 L135 140L123 173"
              fill="var(--surface)"
              stroke="var(--ink)"
              strokeWidth="3"
            />
            <path
              d="M74 176H125M103 119V135M115 117V133"
              stroke="var(--ink)"
              strokeWidth="3"
            />
          </g>

          {/* A simple process connector; no data-transfer semantics */}
          <path
            d="M268 235H416M404 225L416 235L404 245"
            stroke="var(--accent)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="268" cy="235" r="5" fill="var(--accent)" />

          <FloorPlan x={470} y={145} />

          <path
            d="M0 350H685"
            stroke="var(--border)"
            strokeWidth="1.5"
          />

          {/* Lower process lane */}
          <text
            x="0"
            y="394"
            fill="currentColor"
            className="font-[var(--font-headline)] text-[34px] font-semibold"
          >
            Rover: autonomous exploration
          </text>

          <text
            x="0"
            y="438"
            fill="currentColor"
            className="font-[var(--font-body)] text-[26px]"
          >
            <tspan x="0">The rover explores independently to map</tspan>
            <tspan x="0" dy="35">indoor floor plans.</tspan>
          </text>

          {/* Exploration path and rover */}
          <path
            d="M22 614H60Q80 614 80 594V548
               Q80 528 100 528H139Q158 528 158 548V568"
            stroke="var(--accent)"
            strokeWidth="3"
            strokeDasharray="7 9"
            strokeLinecap="round"
          />
          <circle
            cx="22"
            cy="614"
            r="7"
            fill="var(--surface)"
            stroke="var(--accent)"
            strokeWidth="3"
          />

          <g transform="translate(118 558)">
            <path
              d="M22-17Q40-34 58-17M13-29Q40-55 67-29"
              stroke="var(--accent)"
              strokeWidth="2"
              strokeLinecap="round"
              opacity="0.7"
            />
            <rect
              x="-7"
              y="14"
              width="15"
              height="43"
              rx="5"
              fill="var(--ink)"
            />
            <rect
              x="72"
              y="14"
              width="15"
              height="43"
              rx="5"
              fill="var(--ink)"
            />
            <rect
              width="80"
              height="70"
              rx="18"
              fill="var(--surface)"
              stroke="var(--ink)"
              strokeWidth="3"
            />
            <path
              d="M18 49H62"
              stroke="var(--border)"
              strokeWidth="3"
            />
            <circle
              cx="40"
              cy="23"
              r="11"
              stroke="var(--accent)"
              strokeWidth="3"
            />
            <circle cx="40" cy="23" r="4" fill="var(--accent)" />
          </g>

          <path
            d="M268 569H416M404 559L416 569L404 579"
            stroke="var(--accent)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="268" cy="569" r="5" fill="var(--accent)" />

          <FloorPlan x={470} y={469} />

          {/* Shared processing bracket, not an upload or storage diagram */}
          <path
            d="M685 235H720V569H685M720 402H746"
            stroke="var(--accent)"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />

          <text
            x="764"
            y="351"
            fill="var(--accent)"
            className="font-[var(--font-body)] text-[26px] font-semibold"
          >
            <tspan x="764">AI Pilot</tspan>
            <tspan x="764" dy="35">uses cloud</tspan>
            <tspan x="764" dy="35">processing</tspan>
          </text>
        </svg>
      </div>
    </section>
  );
}
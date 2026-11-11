import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

export default function Slide06({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  const arrowId = React.useId();

  void slide;
  void brand;
  void totalSlides;

  return (
    <section className="flex flex-col h-full min-h-0 w-full text-[var(--ink)]">
      <div className="flex flex-col gap-5">
        <p className="font-[var(--font-mono)] text-[22px] tracking-[0.18em] text-[var(--accent)]">
          STOKE SPACE
        </p>

        <h2 className="font-[var(--font-headline)] text-[64px] font-bold leading-[1.05] tracking-[-0.035em]">
          Do Not Confuse
          <br />
          The Nova Milestones
        </h2>

        <p className="max-w-[900px] font-[var(--font-body)] text-[28px] leading-snug">
          The loan supports Block 2 infrastructure; the stated debut timing
          concerns Pathfinder.
        </p>
      </div>

      <div className="mt-8 w-full shrink-0 border-t border-[var(--border)]">
        <svg
          viewBox="0 0 952 620"
          className="block h-[620px] w-full"
          role="img"
          aria-label="Nova Pathfinder develops into Nova Block 2. Pathfinder has the relative debut timing; Block 2 is associated with launch-site infrastructure."
        >
          <defs>
            <marker
              id={arrowId}
              viewBox="0 0 12 12"
              refX="10"
              refY="6"
              markerWidth="12"
              markerHeight="12"
              orient="auto"
              markerUnits="userSpaceOnUse"
            >
              <path
                d="M2 1 L10 6 L2 11"
                fill="none"
                stroke="var(--accent)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </marker>
          </defs>

          {/* Open editorial guides—not enclosing cards. */}
          <g
            fill="none"
            stroke="var(--border)"
            strokeWidth="1"
            opacity="0.55"
          >
            <path d="M22 36 V300 M350 318 V600" />
            <path d="M0 36 H44 M328 600 H372" />
            <path d="M876 36 H928 V88" />
          </g>

          {/* Pathfinder name band and abstract capsule. */}
          <path
            d="M0 64 H580 V172 H0 Z"
            fill="var(--surface)"
          />
          <path
            d="M0 64 H580"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="3"
          />

          <g
            fill="none"
            stroke="var(--ink)"
            strokeWidth="2"
          >
            <rect x="25" y="85" width="42" height="66" rx="21" />
            <path d="M25 119 H67" opacity="0.45" />
          </g>

          <text
            x="96"
            y="132"
            fill="var(--ink)"
            className="font-[var(--font-headline)] text-[38px] font-semibold"
          >
            Nova Pathfinder
          </text>

          {/* Timing belongs exclusively to Pathfinder. */}
          <path
            d="M46 172 V220 H77"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="2"
          />
          <circle cx="46" cy="172" r="4" fill="var(--accent)" />

          <text
            x="96"
            y="222"
            fill="var(--ink)"
            className="font-[var(--font-body)] text-[26px]"
          >
            <tspan x="96">Described as fully reusable;</tspan>
            <tspan x="96" dy="37">
              debut set for{' '}
            </tspan>
            <tspan fill="var(--accent)">sometime next year.</tspan>
          </text>

          {/* Diagonal lineage, with its own clear annotation. */}
          <path
            d="M580 118 H623 Q650 118 668 142 L796 326"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="2.5"
            markerEnd={`url(#${arrowId})`}
          />
          <circle cx="580" cy="118" r="5" fill="var(--accent)" />

          <text
            x="751"
            y="206"
            fill="var(--accent)"
            className="font-[var(--font-mono)] text-[22px]"
          >
            <tspan x="751">upgraded</tspan>
            <tspan x="751" dy="30">
              version
            </tspan>
          </text>

          {/* Block 2 name band, offset along the development path. */}
          <path
            d="M350 350 H952 V458 H350 Z"
            fill="var(--surface)"
          />
          <path
            d="M350 350 H952"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="3"
          />

          <g
            fill="none"
            stroke="var(--ink)"
            strokeWidth="2"
          >
            <rect x="375" y="371" width="42" height="66" rx="21" />
            <path d="M375 405 H417" opacity="0.45" />
          </g>

          <text
            x="446"
            y="418"
            fill="var(--ink)"
            className="font-[var(--font-headline)] text-[38px] font-semibold"
          >
            Nova Block 2
          </text>

          {/* Launch-pad callout is attached only to Block 2. */}
          <path
            d="M396 458 V487"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="2"
          />
          <circle cx="396" cy="458" r="4" fill="var(--accent)" />

          <g
            fill="none"
            stroke="var(--accent)"
            strokeWidth="2"
            strokeLinecap="square"
            strokeLinejoin="miter"
          >
            <path d="M371 537 H421 M378 525 H414 V537" />
            <path d="M379 525 V494 H389 V525" />
            <path d="M389 501 H407 M389 511 H402" />
            <path d="M374 545 H418" />
          </g>

          <text
            x="446"
            y="505"
            fill="var(--ink)"
            className="font-[var(--font-body)] text-[26px]"
          >
            <tspan x="446">Upgraded Pathfinder; planned</tspan>
            <tspan x="446" dy="37">
              second launch site supports flights.
            </tspan>
            <tspan x="446" dy="37">
              No debut date stated.
            </tspan>
          </text>
        </svg>
      </div>
    </section>
  );
}
import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

export default function Slide03({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  const gateTitleId = React.useId();

  return (
    <section className="flex flex-col h-full min-h-0 w-full text-[var(--ink)]">
      <header className="shrink-0">
        <div className="flex items-center gap-4">
          <span
            aria-hidden="true"
            className="h-3 w-3 bg-[var(--accent)]"
          />
          <p className="font-[var(--font-mono)] text-[22px] tracking-[0.18em] text-[var(--accent)]">
            AVAILABILITY
          </p>
        </div>

        <h1 className="mt-7 max-w-[920px] font-[var(--font-headline)] text-[68px] font-bold leading-[1.04] tracking-[-0.045em]">
          Rover Ships First.
          <br />
          Drone Awaits
          <br />
          Authorization.
        </h1>

        <p className="mt-8 max-w-[820px] font-[var(--font-body)] text-[28px] leading-snug">
          Rover has a scheduled shipping date; Drone’s target requires FCC
          authorization.
        </p>
      </header>

      <div className="mt-14 flex flex-col border-t border-[var(--border)] pt-8">
        <svg
          viewBox="0 0 952 620"
          className="block h-[620px] w-full shrink-0"
          role="img"
          aria-labelledby={gateTitleId}
        >
          <title id={gateTitleId}>
            Ring Rover Cam precedes Ring Drone Cam. Drone’s release is
            conditional on Federal Communications Commission authorization.
          </title>

          {/* Schematic sequencing, deliberately without a duration scale. */}
          <path
            d="M24 306H502"
            stroke="var(--border)"
            strokeWidth="2"
            fill="none"
          />
          <path
            d="M24 306H180"
            stroke="var(--accent)"
            strokeWidth="5"
            fill="none"
          />
          <path
            d="M180 306H502"
            stroke="var(--ink)"
            strokeWidth="3"
            fill="none"
          />

          {/* Rover: confirmed sequence position, solid milestone. */}
          <path
            d="M180 280V146H32"
            stroke="var(--accent)"
            strokeWidth="2"
            fill="none"
          />
          <text
            x="32"
            y="116"
            fill="var(--ink)"
            className="font-[var(--font-headline)] text-[36px] font-semibold"
          >
            Ring Rover Cam
          </text>
          <circle
            cx="180"
            cy="306"
            r="35"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="2"
          />
          <circle cx="180" cy="306" r="19" fill="var(--accent)" />

          {/* Regulatory gate interrupts the otherwise solid release track. */}
          <rect
            x="502"
            y="204"
            width="110"
            height="204"
            fill="var(--surface)"
            stroke="var(--accent)"
            strokeWidth="2"
          />
          <path
            d="M518 220H536M518 220V238
               M596 220H578M596 220V238
               M518 392H536M518 392V374
               M596 392H578M596 392V374"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="2"
          />
          <text
            x="557"
            y="314"
            textAnchor="middle"
            fill="var(--accent)"
            className="font-[var(--font-mono)] text-[22px] tracking-[0.12em]"
          >
            FCC
          </text>

          {/* Drone remains outlined and beyond a conditional dashed segment. */}
          <path
            d="M612 306H928"
            stroke="var(--accent)"
            strokeWidth="3"
            strokeDasharray="12 12"
            fill="none"
          />
          <path
            d="M804 278V146H920"
            stroke="var(--border)"
            strokeWidth="2"
            fill="none"
          />
          <text
            x="920"
            y="116"
            textAnchor="end"
            fill="var(--ink)"
            className="font-[var(--font-headline)] text-[36px] font-semibold"
          >
            Ring Drone Cam
          </text>
          <circle
            cx="804"
            cy="306"
            r="27"
            fill="var(--surface)"
            stroke="var(--accent)"
            strokeWidth="3"
          />
          <path
            d="M918 296L928 306L918 316"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="3"
          />

          {/* Leaders connect the milestones to their editorial date copy. */}
          <path
            d="M180 342V570H32V610"
            stroke="var(--border)"
            strokeWidth="2"
            fill="none"
          />
          <path
            d="M804 335V570H612V610"
            stroke="var(--border)"
            strokeWidth="2"
            fill="none"
          />
        </svg>

        <div className="grid grid-cols-[1fr_1fr] gap-12">
          <div className="border-t-[3px] border-[var(--accent)] pt-7">
            <p className="max-w-[420px] font-[var(--font-body)] text-[28px] leading-normal">
              Preorders available; shipping scheduled to start{' '}
              <span className="font-semibold text-[var(--accent)]">
                December 16, 2026.
              </span>
            </p>
          </div>

          <div className="border-t-[3px] border-dashed border-[var(--accent)] pt-7">
            <p className="font-[var(--font-body)] text-[28px] leading-normal">
              Target:{' '}
              <span className="font-semibold">January 27, 2027,</span>{' '}
              conditional on Federal Communications Commission authorization.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
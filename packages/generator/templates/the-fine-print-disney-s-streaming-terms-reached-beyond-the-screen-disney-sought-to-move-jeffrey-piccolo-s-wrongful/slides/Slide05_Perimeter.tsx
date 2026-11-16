import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

export default function Slide05({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  const items = slide.items ?? [];

  return (
    <section
      aria-label={`Slide 5 of ${totalSlides}: Who Decides The Consent Boundary?`}
      className="flex h-full min-h-0 w-full flex-col justify-between gap-6 text-[var(--ink)]"
    >
      <header className="shrink-0">
        <div className="mb-5 flex items-center gap-4">
          <span
            aria-hidden="true"
            className="h-3 w-3 bg-[var(--accent)]"
          />
          <p className="font-[var(--font-headline)] text-[22px] font-bold tracking-[0.16em] text-[var(--accent)]">
            THE HIDDEN CATCH
          </p>
        </div>

        <h1 className="max-w-[900px] font-[var(--font-headline)] text-[60px] font-bold leading-[1.02] tracking-tight">
          Who Decides The
          <br />
          Consent Boundary?
        </h1>

        <p className="mt-5 max-w-[830px] font-[var(--font-body)] text-[26px] leading-snug line-clamp-2">
          Disney also sought arbitrator authority over contractual reach.
        </p>
      </header>

      <div className="relative flex h-[460px] max-h-[500px] min-h-0 flex-1 items-center justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 952 460"
          role="img"
          aria-label="A consent perimeter surrounds requested arbitrator authority. Personal assent approaches from one side; the estate remains across a disputed boundary."
          className="block h-full max-h-[500px] w-full text-[var(--ink)]"
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Architectural registration marks */}
          <g
            fill="none"
            stroke="var(--border)"
            strokeWidth="2"
          >
            <path d="M16 62V26H52 M900 26H936V62" />
            <path d="M16 398V434H52 M900 434H936V398" />
            <path d="M16 230H936" strokeDasharray="3 13" />
          </g>

          {/* The perimeter is a dedicated vector element, not a text overlay. */}
          <rect
            x="298"
            y="76"
            width="356"
            height="320"
            rx="2"
            fill="var(--surface)"
            stroke="var(--border)"
            strokeWidth="2"
          />
          <path
            d="M298 166V76H654V396H298V294"
            fill="none"
            stroke="var(--ink)"
            strokeOpacity="0.42"
            strokeWidth="2"
            strokeDasharray="8 9"
          />

          <text
            x="476"
            y="46"
            textAnchor="middle"
            fill="var(--ink)"
            className="font-[var(--font-mono)] text-[22px]"
            letterSpacing="2"
          >
            CONSENT BOUNDARY
          </text>

          {/* Accent flag anchored to the boundary */}
          <path
            d="M654 76H866L850 100L866 124H654Z"
            fill="var(--accent)"
          />
          <text
            x="754"
            y="108"
            textAnchor="middle"
            fill="var(--ink)"
            className="font-[var(--font-headline)] text-[22px] font-bold"
          >
            WHO DECIDES?
          </text>

          {/* Left geometric node: individual assent */}
          <rect
            x="28"
            y="184"
            width="220"
            height="92"
            fill="var(--surface)"
            stroke="var(--border)"
            strokeWidth="2"
          />
          <rect
            x="44"
            y="169"
            width="14"
            height="14"
            fill="var(--ink)"
          />
          <text
            x="138"
            y="222"
            textAnchor="middle"
            fill="var(--ink)"
            className="font-[var(--font-mono)] text-[22px]"
          >
            PERSONAL
          </text>
          <text
            x="138"
            y="251"
            textAnchor="middle"
            fill="var(--ink)"
            className="font-[var(--font-mono)] text-[22px]"
          >
            ASSENT
          </text>

          {/* Directional conduit entering the requested authority */}
          <path
            d="M248 230H322"
            fill="none"
            stroke="var(--ink)"
            strokeWidth="3"
          />
          <path d="M314 222L326 230L314 238Z" fill="var(--ink)" />

          <text
            x="476"
            y="149"
            textAnchor="middle"
            fill="var(--ink)"
            className="font-[var(--font-mono)] text-[22px]"
            letterSpacing="1"
          >
            REQUESTED AUTHORITY
          </text>

          <rect
            x="336"
            y="184"
            width="280"
            height="92"
            fill="var(--surface)"
            stroke="var(--accent)"
            strokeWidth="3"
          />
          <rect
            x="336"
            y="184"
            width="8"
            height="92"
            fill="var(--accent)"
          />
          <text
            x="480"
            y="240"
            textAnchor="middle"
            fill="var(--ink)"
            className="font-[var(--font-headline)] text-[30px] font-bold"
          >
            ARBITRATOR
          </text>

          {/* Disputed continuation: visibly interrupted at the perimeter */}
          <path
            d="M616 230H642 M676 230H716"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="3"
            strokeDasharray="6 6"
          />
          <path
            d="M647 214L661 246 M661 214L675 246"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="3"
          />
          <path
            d="M708 222L720 230L708 238Z"
            fill="var(--accent)"
          />

          {/* Estate node stays beyond the perimeter */}
          <rect
            x="728"
            y="184"
            width="196"
            height="92"
            fill="var(--surface)"
            stroke="var(--border)"
            strokeWidth="2"
          />
          <text
            x="826"
            y="240"
            textAnchor="middle"
            fill="var(--ink)"
            className="font-[var(--font-headline)] text-[28px] font-semibold"
          >
            ESTATE
          </text>

          {/* Integrated diagram annotation */}
          <path
            d="M476 276V313"
            fill="none"
            stroke="var(--border)"
            strokeWidth="2"
          />
          <circle cx="476" cy="317" r="5" fill="var(--accent)" />
          <text
            x="476"
            y="355"
            textAnchor="middle"
            fill="var(--ink)"
            className="font-[var(--font-mono)] text-[22px]"
          >
            CONTRACTUAL REACH
          </text>
        </svg>
      </div>

      <div className="grid shrink-0 grid-cols-2 gap-5">
        <article className="border-t-2 border-[var(--accent)] bg-[var(--surface)] px-6 py-6">
          <h2 className="font-[var(--font-headline)] text-[28px] font-semibold leading-tight">
            {items[0]?.label ?? 'Requested delegation'}
          </h2>
          <p className="mt-3 font-[var(--font-body)] text-[24px] leading-snug line-clamp-3">
            {items[0]?.body ??
              'Interpretation, applicability, enforceability: arbitrator.'}
          </p>
        </article>

        <article className="border-t-2 border-[var(--border)] bg-[var(--surface)] px-6 py-6">
          <h2 className="font-[var(--font-headline)] text-[28px] font-semibold leading-tight">
            {items[0]?.label ?? 'Estate objection'}
          </h2>
          <p className="mt-3 font-[var(--font-body)] text-[24px] leading-snug line-clamp-3">
            {items[0]?.body ??
              'Lawyers disputed whether personal assent bound the estate.'}
          </p>
        </article>
      </div>
    </section>
  );
}
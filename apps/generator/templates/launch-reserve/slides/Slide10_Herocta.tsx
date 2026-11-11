import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

export default function Slide10({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  void brand;

  return (
    <section
      className="flex flex-col h-full min-h-0 w-full text-[var(--ink)]"
      aria-label="Finance Capacity. Verify Flight Readiness."
      data-slide-id={slide.id}
      data-total-slides={totalSlides}
    >
      <div className="flex items-center gap-4">
        <span
          aria-hidden="true"
          className="h-3 w-3 bg-[var(--accent)]"
        />
        <p className="font-[var(--font-mono)] text-[22px] leading-none tracking-[0.16em]">
          THE TAKEAWAY
        </p>
        <div className="h-px flex-1 bg-[var(--border)]" />
      </div>

      <h1 className="mt-9 font-[var(--font-headline)] text-[68px] font-bold leading-[1.04] tracking-[-0.045em]">
        <span className="block">Finance Capacity.</span>
        <span className="block text-[var(--accent)]">
          Verify Flight Readiness.
        </span>
      </h1>

      <p className="mt-6 max-w-[880px] font-[var(--font-body)] text-[28px] leading-[1.4]">
        These commitments target resilience; neither establishes operational
        readiness.
      </p>

      <div className="mt-9 shrink-0 border-y border-[var(--border)] py-5">
        <svg
          viewBox="0 0 952 232"
          className="block h-[232px] w-full"
          aria-hidden="true"
          focusable="false"
          fill="none"
        >
          {/* Financed infrastructure: solid, grounded geometry. */}
          <path
            d="M32 198H378M48 211H362"
            stroke="var(--border)"
            strokeWidth="2"
          />
          <path
            d="M64 178L185 146L339 178L218 210Z"
            fill="var(--surface)"
            stroke="var(--ink)"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <path
            d="M64 157L185 125L339 157L218 189Z"
            fill="var(--surface)"
            stroke="var(--ink)"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <path
            d="M64 136L185 104L339 136L218 168Z"
            fill="var(--surface)"
            stroke="var(--ink)"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <path
            d="M142 116V37H193V126M142 37L193 64L142 91L193 116M142 64H193M142 91H193"
            stroke="var(--ink)"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
          <path
            d="M167 37V20H250V51M193 51H250"
            stroke="var(--ink)"
            strokeWidth="3"
            strokeLinejoin="round"
          />
          <path
            d="M250 51V81"
            stroke="var(--accent)"
            strokeWidth="3"
          />
          <path
            d="M231 131V96H272V140"
            stroke="var(--accent)"
            strokeWidth="3"
            strokeLinejoin="round"
          />
          <path
            d="M220 142L251 134L286 143"
            stroke="var(--accent)"
            strokeWidth="3"
          />

          {/* The gap between financial capacity and proven operations. */}
          <path
            d="M389 116H442M510 116H563"
            stroke="var(--border)"
            strokeWidth="2"
            strokeDasharray="5 8"
          />
          <path
            d="M460 105H492M460 127H492M489 88L463 144"
            stroke="var(--accent)"
            strokeWidth="4"
            strokeLinecap="square"
          />

          {/* Flight readiness: an unresolved, dashed ascent. */}
          <path
            d="M617 198H920"
            stroke="var(--border)"
            strokeWidth="2"
          />
          <path
            d="M646 198C646 141 676 103 718 79C770 49 830 42 900 25"
            stroke="var(--border)"
            strokeWidth="2"
            strokeDasharray="7 9"
          />
          <path
            d="M752 178V150M739 172V155M765 172V155"
            stroke="var(--accent)"
            strokeWidth="2.5"
            strokeDasharray="4 6"
          />
          <path
            d="M738 139V97C738 77 744 59 752 46C760 59 766 77 766 97V139Z"
            fill="var(--surface)"
            stroke="var(--ink)"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
          <path
            d="M738 109L723 133V148L738 139M766 109L781 133V148L766 139"
            stroke="var(--ink)"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
          <path
            d="M738 118H766M744 145H760"
            stroke="var(--ink)"
            strokeWidth="2.5"
          />
          <circle
            cx="752"
            cy="92"
            r="6"
            stroke="var(--accent)"
            strokeWidth="2.5"
          />
          <circle
            cx="900"
            cy="25"
            r="8"
            stroke="var(--accent)"
            strokeWidth="2"
          />
          <path
            d="M900 9V15M900 35V41M884 25H890M910 25H916"
            stroke="var(--accent)"
            strokeWidth="2"
          />
        </svg>
      </div>

      <div className="mt-8 grid grid-cols-[1.06fr_0.94fr] gap-6">
        <article className="border-t-[3px] border-[var(--border)] bg-[var(--surface)] px-7 py-6">
          <h2 className="font-[var(--font-headline)] text-[34px] font-semibold leading-tight tracking-[-0.025em]">
            The opportunity
          </h2>
          <p className="mt-4 font-[var(--font-body)] text-[26px] leading-[1.4]">
            Additional infrastructure could expand launch capacity and strengthen
            alternatives to SpaceX.
          </p>
        </article>

        <article className="border-t-[3px] border-[var(--accent)] px-7 py-6">
          <h2 className="font-[var(--font-headline)] text-[34px] font-semibold leading-tight tracking-[-0.025em] text-[var(--accent)]">
            The test
          </h2>
          <p className="mt-4 font-[var(--font-body)] text-[26px] leading-[1.4]">
            Can these competitors turn conditional financing into dependable
            launches?
          </p>
        </article>
      </div>
    </section>
  );
}
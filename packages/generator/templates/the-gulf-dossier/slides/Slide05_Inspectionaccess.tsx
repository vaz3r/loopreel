import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

export default function Slide05({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  return (
    <section className="flex flex-col h-full min-h-0 w-full text-[var(--ink)]">
      <div className="shrink-0">
        <p className="font-[var(--font-mono)] text-[20px] font-medium tracking-[0.18em] text-[var(--accent)]">
          {slide.kicker}
        </p>

        <h2 className="mt-5 max-w-[920px] font-[var(--font-headline)] text-[64px] font-bold leading-[1.04] tracking-[-0.035em]">
          {slide.headline}
        </h2>

        <p className="mt-5 max-w-[860px] font-[var(--font-body)] text-[26px] leading-snug opacity-80">
          {slide.subheadline}
        </p>
      </div>

      <div className="mt-7 shrink-0 border-t border-[var(--border)] pt-5">
        <svg
          viewBox="0 0 952 440"
          className="block h-[440px] w-full"
          fill="none"
          role="img"
          aria-label="One inspection entry branches toward two schematic facilities. A closed gate blocks access to bombed facilities; an open gate permits access to unaffected facilities."
        >
          {/* A single neutral entry and shared branching junction. */}
          <circle
            cx="476"
            cy="22"
            r="10"
            fill="var(--surface)"
            stroke="var(--ink)"
            strokeWidth="2"
          />
          <path
            d="M476 32V96"
            stroke="var(--ink)"
            strokeWidth="3"
          />
          <path
            d="M469 72L476 80L483 72"
            stroke="var(--ink)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          <path
            d="M476 96H234V220"
            stroke="var(--ink)"
            strokeWidth="3"
            strokeLinejoin="round"
          />
          <path
            d="M476 96H718V184"
            stroke="var(--ink)"
            strokeWidth="3"
            strokeLinejoin="round"
          />
          <circle cx="476" cy="96" r="5" fill="var(--ink)" />

          {/* Terminal ground planes: schematic, not geographical. */}
          <path
            d="M60 412H408M544 412H892"
            stroke="var(--border)"
            strokeWidth="2"
          />
          <path
            d="M476 154V426"
            stroke="var(--border)"
            strokeWidth="1"
            strokeDasharray="3 10"
            opacity="0.65"
          />

          {/* Closed gate: the inspection branch ends at its barrier. */}
          <path
            d="M158 194V264M310 194V264"
            stroke="var(--ink)"
            strokeWidth="5"
            strokeLinecap="square"
          />
          <rect
            x="166"
            y="207"
            width="136"
            height="40"
            fill="var(--surface)"
            stroke="var(--ink)"
            strokeWidth="2"
          />
          <path
            d="M183 208V246M208 208V246M234 208V246M260 208V246M285 208V246"
            stroke="var(--ink)"
            strokeWidth="2"
            opacity="0.65"
          />
          <path
            d="M166 227H302"
            stroke="var(--ink)"
            strokeWidth="3"
          />
          <rect
            x="227"
            y="217"
            width="14"
            height="20"
            fill="var(--ink)"
          />

          {/* Exactly one generic facility beyond the closed gate. */}
          <path
            d="M114 412V322L234 286L354 322V412Z"
            fill="var(--surface)"
            stroke="var(--border)"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <path
            d="M114 338H354"
            stroke="var(--border)"
            strokeWidth="2"
          />
          <path
            d="M145 357H177V378H145ZM291 357H323V378H291Z"
            stroke="var(--border)"
            strokeWidth="2"
          />
          <path
            d="M211 412V361H257V412"
            stroke="var(--border)"
            strokeWidth="2"
          />

          {/* Exactly one generic facility beyond the open gate. */}
          <path
            d="M598 412V322L718 286L838 322V412Z"
            fill="var(--surface)"
            stroke="var(--border)"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <path
            d="M598 338H838"
            stroke="var(--border)"
            strokeWidth="2"
          />
          <path
            d="M629 357H661V378H629ZM775 357H807V378H775Z"
            stroke="var(--border)"
            strokeWidth="2"
          />
          <path
            d="M695 412V361H741V412"
            stroke="var(--accent)"
            strokeWidth="2"
          />

          {/* Open gate leaves swing away from the inspection route. */}
          <path
            d="M642 194V264M794 194V264"
            stroke="var(--accent)"
            strokeWidth="5"
            strokeLinecap="square"
          />
          <path
            d="M642 207L607 177V216L642 247ZM794 207L829 177V216L794 247Z"
            fill="var(--surface)"
            stroke="var(--accent)"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <path
            d="M642 227L607 197M794 227L829 197"
            stroke="var(--accent)"
            strokeWidth="2"
          />
          <path
            d="M654 257A56 56 0 0 0 692 207M782 257A56 56 0 0 1 744 207"
            stroke="var(--border)"
            strokeWidth="1.5"
            strokeDasharray="4 6"
          />

          {/* The second branch continues through the open gate. */}
          <path
            d="M718 184V390"
            stroke="var(--accent)"
            strokeWidth="4"
          />
          <path
            d="M707 377L718 390L729 377"
            stroke="var(--accent)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        <div className="grid grid-cols-2 gap-10">
          <div className="border-t border-[var(--border)] pt-5">
            <h3 className="font-[var(--font-headline)] text-[34px] font-semibold leading-tight tracking-[-0.025em]">
              Bombed facilities
            </h3>
            <p className="mt-3 max-w-[420px] font-[var(--font-body)] text-[26px] leading-snug opacity-80">
              Iran denied the IAEA access to bombed nuclear facilities.
            </p>
          </div>

          <div className="border-t border-[var(--accent)] pt-5">
            <h3 className="font-[var(--font-headline)] text-[34px] font-semibold leading-tight tracking-[-0.025em] text-[var(--accent)]">
              Unaffected facilities
            </h3>
            <p className="mt-3 max-w-[420px] font-[var(--font-body)] text-[26px] leading-snug opacity-80">
              Iran provided the IAEA access to unaffected facilities.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
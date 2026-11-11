import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

export default function Slide01({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  void brand;
  void totalSlides;

  return (
    <section className="relative flex h-full min-h-0 w-full flex-col justify-center overflow-hidden text-[var(--ink)]">
      <div className="relative flex flex-col gap-8">
        <div className="flex items-center gap-4">
          <span
            aria-hidden="true"
            className="h-3 w-3 shrink-0 bg-[var(--accent)]"
          />
          <p className="font-[var(--font-mono)] text-[17px] font-medium leading-6 tracking-[0.18em] text-[var(--accent)]">
            {slide.kicker}
          </p>
          <span
            aria-hidden="true"
            className="h-px flex-1 bg-[var(--border)]"
          />
        </div>

        <h1 className="max-w-[940px] text-balance font-[var(--font-headline)] text-[86px] font-bold leading-[0.99] tracking-[-0.055em]">
          {slide.headline}
        </h1>

        <div
          aria-hidden="true"
          className="relative h-[330px] w-full shrink-0"
        >
          <svg
            className="h-full w-full"
            viewBox="0 0 952 330"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Quiet drafting field behind the hardware silhouette. */}
            <path
              d="M0 58H952M0 156H952M0 254H952"
              stroke="var(--border)"
              strokeOpacity=".35"
            />
            <path
              d="M110 18V310M476 18V310M842 18V310"
              stroke="var(--border)"
              strokeOpacity=".35"
              strokeDasharray="3 9"
            />

            {/* Display: intentionally schematic rather than product photography. */}
            <path
              d="M227 28H725C737 28 744 35 746 47L777 254H175L206 47C208 35 215 28 227 28Z"
              fill="var(--surface)"
              stroke="var(--border)"
              strokeWidth="2"
            />
            <path
              d="M228 42H724L753 238H199L228 42Z"
              fill="var(--paper, #0A0E17)"
              stroke="var(--border)"
            />
            <path
              d="M432 42H520V49C520 54 517 57 512 57H440C435 57 432 54 432 49V42Z"
              fill="var(--surface)"
            />

            {/* Performance motif meeting an unresolved, dashed boundary. */}
            <path
              d="M239 204H693M239 171H693M239 138H693M239 105H693"
              stroke="var(--border)"
              strokeOpacity=".45"
            />
            <path
              d="M254 203L331 182L403 186L475 145L548 152L625 93"
              stroke="var(--accent)"
              strokeOpacity=".08"
              strokeWidth="20"
              strokeLinejoin="round"
            />
            <path
              d="M254 203L331 182L403 186L475 145L548 152L625 93"
              stroke="var(--accent)"
              strokeWidth="4"
              strokeLinecap="square"
              strokeLinejoin="round"
            />
            <path
              d="M609 93H625V109"
              stroke="var(--accent)"
              strokeWidth="4"
            />
            <path
              d="M648 78H695V210H648V78Z"
              stroke="var(--accent)"
              strokeOpacity=".65"
              strokeWidth="1.5"
              strokeDasharray="5 6"
            />
            <circle cx="475" cy="145" r="5" fill="var(--accent)" />
            <circle
              cx="548"
              cy="152"
              r="5"
              fill="var(--surface)"
              stroke="var(--accent)"
              strokeWidth="2"
            />

            {/* Deck, trackpad, and sharply drawn front edge. */}
            <path
              d="M175 254H777L865 292H87L175 254Z"
              fill="var(--surface)"
              stroke="var(--border)"
              strokeWidth="2"
              strokeLinejoin="round"
            />
            <path
              d="M205 263H747M183 271H769"
              stroke="var(--border)"
              strokeOpacity=".7"
            />
            <path
              d="M408 274H544L563 285H389L408 274Z"
              stroke="var(--border)"
            />
            <path
              d="M87 292H865L846 304H106L87 292Z"
              fill="var(--surface)"
              stroke="var(--border)"
              strokeWidth="2"
              strokeLinejoin="round"
            />
            <path
              d="M429 292H523L516 297H436L429 292Z"
              fill="var(--border)"
            />
            <path
              d="M108 304H844"
              stroke="var(--ink)"
              strokeOpacity=".2"
            />

            {/* Small editorial registration marks. */}
            <path
              d="M33 82V58H57M895 254H919V230"
              stroke="var(--accent)"
              strokeWidth="2"
            />
            <path
              d="M785 91H848M817 83V99"
              stroke="var(--border)"
            />
          </svg>
        </div>

        <div className="grid grid-cols-[5px_1fr] gap-6">
          <span aria-hidden="true" className="bg-[var(--accent)]" />
          <p className="max-w-[840px] font-[var(--font-body)] text-[29px] font-normal leading-[1.38] tracking-[-0.015em]">
            {slide.subheadline}
          </p>
        </div>
      </div>
    </section>
  );
}
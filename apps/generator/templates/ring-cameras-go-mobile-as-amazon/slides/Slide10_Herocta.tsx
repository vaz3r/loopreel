import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

export default function Slide10({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  return (
    <section
      data-slide-id={slide.id}
      className="flex h-full min-h-0 w-full flex-col justify-center text-[var(--ink)]"
    >
      <div className="flex min-h-0 flex-col gap-9">
        <div className="relative h-[208px] shrink-0">
          <svg
            viewBox="0 0 952 208"
            fill="none"
            aria-hidden="true"
            className="h-full w-full"
          >
            {/* Domestic architecture, rendered as a measured plan. */}
            <path
              d="M22 22H390V186H22V22Z"
              fill="var(--surface)"
            />
            <g
              stroke="var(--border)"
              strokeWidth="2"
              strokeLinecap="square"
            >
              <path d="M22 80V22H390V74M390 118V186H22V124" />
              <path d="M142 22V76M142 116V186" />
              <path d="M142 104H230M274 104H390" />
              <path d="M288 22V104" />
              <path d="M44 40H112V60H44Z" />
              <path d="M312 42H368V80H312Z" />
              <path d="M44 144H112V168H44Z" />
              <path d="M306 144H368V164H306Z" />
            </g>

            {/* A moving lens leaves a spatial trace behind it. */}
            <path
              d="M68 102H112Q166 102 166 58H240V150H354Q424 150 456 104H684"
              stroke="var(--accent)"
              strokeWidth="2"
              strokeDasharray="5 9"
              strokeLinecap="round"
            />
            <g fill="var(--accent)">
              <circle cx="68" cy="102" r="4" />
              <circle cx="166" cy="58" r="4" />
              <circle cx="240" cy="150" r="4" />
            </g>

            <path
              d="M354 150L303 118V182L354 150Z"
              fill="var(--accent)"
              fillOpacity=".1"
            />
            <circle
              cx="354"
              cy="150"
              r="16"
              fill="var(--surface)"
              stroke="var(--accent)"
              strokeWidth="2"
            />
            <circle cx="354" cy="150" r="5" fill="var(--accent)" />

            {/* The boundary is explicit; movement does not erase it. */}
            <path
              d="M556 12V196"
              stroke="var(--border)"
              strokeWidth="2"
            />
            <path
              d="M546 12H566M546 196H566"
              stroke="var(--border)"
              strokeWidth="2"
            />
            <rect
              x="547"
              y="95"
              width="18"
              height="18"
              fill="var(--accent)"
            />

            {/* Oversized lens: an observation symbol, not a product claim. */}
            <path
              d="M680 104C712 56 748 34 798 34C848 34 884 56 916 104C884 152 848 174 798 174C748 174 712 152 680 104Z"
              fill="var(--surface)"
              stroke="var(--border)"
              strokeWidth="2"
            />
            <circle
              cx="798"
              cy="104"
              r="44"
              stroke="var(--accent)"
              strokeWidth="2"
            />
            <circle
              cx="798"
              cy="104"
              r="27"
              stroke="var(--border)"
              strokeWidth="2"
            />
            <circle cx="798" cy="104" r="12" fill="var(--accent)" />
            <path
              d="M798 18V42M798 166V190M660 104H684M912 104H936"
              stroke="var(--border)"
              strokeWidth="2"
            />
          </svg>
        </div>

        <h1 className="m-0 font-[var(--font-headline)] text-[86px] font-bold leading-[0.98] tracking-[-0.055em]">
          <span className="block">More Mobility</span>
          <span className="block">Is Not</span>
          <span className="block text-[var(--accent)]">More Privacy</span>
        </h1>

        <p className="m-0 max-w-[850px] font-[var(--font-body)] text-[28px] leading-[1.4] tracking-[-0.015em]">
          Judge these cameras by cloud dependence, operating limits and
          encryption—not autonomy alone.
        </p>

        <div className="grid grid-cols-[8px_minmax(0,1fr)] gap-7 border-t border-[var(--border)] pt-8">
          <div className="bg-[var(--accent)]" />

          <div className="flex min-w-0 flex-col gap-6">
            <p className="m-0 max-w-[820px] font-[var(--font-headline)] text-[38px] font-medium leading-[1.18] tracking-[-0.03em]">
              Would mobile monitoring justify digitally mapping your private
              spaces?
            </p>

            <div className="flex items-center gap-5 text-[var(--accent)]">
              <p className="m-0 font-[var(--font-body)] text-[28px] font-semibold leading-[1.25] tracking-[-0.02em]">
                Where do you draw the line?
              </p>

              <svg
                viewBox="0 0 64 32"
                fill="none"
                aria-hidden="true"
                className="h-8 w-16 shrink-0"
              >
                <path
                  d="M2 16H58M45 3L58 16L45 29"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="square"
                  strokeLinejoin="miter"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

export default function Slide04({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  const titleId = React.useId();

  return (
    <section
      aria-labelledby={titleId}
      className="flex flex-col h-full min-h-0 w-full text-[var(--ink)]"
    >
      <header className="shrink-0">
        <p className="font-[var(--font-mono)] text-[22px] leading-[28px] tracking-[0.12em] text-[var(--accent)]">
          BEFORE THE FIRST PATROL
        </p>

        <h2
          id={titleId}
          className="mt-4 max-w-[900px] font-[var(--font-headline)] text-[64px] font-bold leading-[1.04] tracking-[-0.035em]"
        >
          First, Both Robots
          <br />
          Map Your Space
        </h2>
      </header>

      <div className="mt-8 grid shrink-0 grid-cols-2 gap-12">
        <div className="border-t-2 border-[var(--accent)] pt-4">
          <h3 className="font-[var(--font-headline)] text-[34px] font-semibold leading-[1.15] tracking-[-0.025em]">
            Ring Drone Cam
          </h3>
          <p className="mt-3 max-w-[420px] font-[var(--font-body)] text-[26px] leading-[1.32]">
            Customers carry the drone through indoor spaces to digitally map the
            floor plan.
          </p>
        </div>

        <div className="border-t-2 border-[var(--accent)] pt-4">
          <h3 className="font-[var(--font-headline)] text-[34px] font-semibold leading-[1.15] tracking-[-0.025em]">
            Ring Rover Cam
          </h3>
          <p className="mt-3 max-w-[420px] font-[var(--font-body)] text-[26px] leading-[1.32]">
            Autonomous exploration during setup digitally maps the floor plan.
          </p>
        </div>
      </div>

      <svg
        viewBox="0 0 952 432"
        aria-hidden="true"
        className="mt-3 block h-[432px] w-full shrink-0"
        fill="none"
      >
        {/* Two distinct setup workflows feed the same mapping schematic. */}
        <g
          stroke="var(--accent, #9B254D)"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M226 117V136Q226 158 250 158H448Q476 158 476 184" />
          <path d="M726 117V136Q726 158 702 158H504Q476 158 476 184" />
          <path d="M476 184V214" />
          <path d="M467 204L476 214L485 204" />
        </g>

        <circle
          cx="476"
          cy="158"
          r="8"
          fill="var(--accent, #9B254D)"
          stroke="var(--paper, #E7ECE5)"
          strokeWidth="4"
        />

        {/* Drone above an open carrying hand. */}
        <g
          transform="translate(226 50)"
          stroke="var(--ink, #182923)"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M-24-8L-43-20M24-8L43-20" />
          <path d="M-24 7L-43 18M24 7L43 18" />
          <ellipse
            cx="-46"
            cy="-22"
            rx="20"
            ry="7"
            fill="var(--surface, #D6DFD5)"
          />
          <ellipse
            cx="46"
            cy="-22"
            rx="20"
            ry="7"
            fill="var(--surface, #D6DFD5)"
          />
          <ellipse cx="-46" cy="21" rx="20" ry="7" />
          <ellipse cx="46" cy="21" rx="20" ry="7" />
          <rect
            x="-25"
            y="-16"
            width="50"
            height="33"
            rx="10"
            fill="var(--paper, #E7ECE5)"
          />
          <circle
            cx="0"
            cy="0"
            r="5"
            fill="var(--accent, #9B254D)"
            stroke="none"
          />

          <path
            d="M-58 51L-35 32Q-29 28-23 32L-8 43H24Q35 43 35 51Q35 58 24 58H-5"
            stroke="var(--accent, #9B254D)"
          />
          <path
            d="M34 49L50 38Q57 34 61 40Q65 46 58 52L33 72H-17L-35 82M-58 51L-35 82"
            stroke="var(--accent, #9B254D)"
          />
        </g>

        {/* Wheeled rover with local exploration marks. */}
        <g
          transform="translate(726 57)"
          stroke="var(--ink, #182923)"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path
            d="M-55 15V-11Q-55-27-38-27H30Q47-27 52-11L60 15Z"
            fill="var(--surface, #D6DFD5)"
          />
          <path d="M-15-27V-42H17V-27" />
          <circle
            cx="1"
            cy="-35"
            r="4"
            fill="var(--accent, #9B254D)"
            stroke="none"
          />
          <rect
            x="-29"
            y="-14"
            width="43"
            height="17"
            rx="5"
            fill="var(--paper, #E7ECE5)"
          />
          <circle
            cx="-33"
            cy="19"
            r="13"
            fill="var(--paper, #E7ECE5)"
          />
          <circle
            cx="37"
            cy="19"
            r="13"
            fill="var(--paper, #E7ECE5)"
          />
          <circle cx="-33" cy="19" r="4" />
          <circle cx="37" cy="19" r="4" />
          <path
            d="M-65 53H51Q76 53 84 34"
            stroke="var(--accent, #9B254D)"
            strokeDasharray="7 9"
          />
          <path
            d="M71 36L85 31L89 45"
            stroke="var(--accent, #9B254D)"
          />
          <path
            d="M72-18Q84-8 82 7M85-29Q106-12 101 12"
            stroke="var(--accent, #9B254D)"
          />
        </g>

        {/* Shared floor plan: no dimensions, scale, or storage destination. */}
        <path
          d="M282 226H670V401H526V420H282Z"
          fill="var(--surface, #D6DFD5)"
        />

        <g
          stroke="var(--border, #A0AFA3)"
          strokeWidth="1.5"
          opacity="0.65"
        >
          <path d="M306 226V420M330 226V420M354 226V420M378 226V420M402 226V420M426 226V420M450 226V420M474 226V420M498 226V420M522 226V420M546 226V401M570 226V401M594 226V401M618 226V401M642 226V401" />
          <path d="M282 250H670M282 274H670M282 298H670M282 322H670M282 346H670M282 370H670M282 394H670" />
        </g>

        <g
          stroke="var(--ink, #182923)"
          strokeWidth="5"
          strokeLinecap="square"
          strokeLinejoin="miter"
        >
          <path d="M452 226H282V420H526V401H670V226H500" />
          <path d="M404 226V281M404 314V344H282" />
          <path d="M552 226V306H614M646 306H670" />
          <path d="M526 401V352H473M439 352H404" />
        </g>

        <g
          stroke="var(--border, #A0AFA3)"
          strokeWidth="2"
          strokeLinecap="round"
        >
          <path d="M404 281H437M437 281A33 33 0 0 1 404 314" />
          <path d="M614 306V274M614 274A32 32 0 0 1 646 306" />
          <path d="M439 352V386M439 386A34 34 0 0 0 473 352" />
        </g>

        <g
          fill="var(--accent, #9B254D)"
          stroke="var(--paper, #E7ECE5)"
          strokeWidth="3"
        >
          <circle cx="344" cy="280" r="6" />
          <circle cx="476" cy="302" r="6" />
          <circle cx="606" cy="356" r="6" />
          <circle cx="350" cy="382" r="6" />
        </g>
      </svg>

      <div className="mt-6 flex shrink-0 items-start gap-5 border-t border-[var(--border)] pt-5">
        {/* Processing icon is attached only to the AI Pilot caption. */}
        <svg
          viewBox="0 0 64 56"
          aria-hidden="true"
          className="mt-1 h-[56px] w-[64px] shrink-0 text-[var(--accent)]"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M17 38H48A12 12 0 0 0 49 14A18 18 0 0 0 15 18A10 10 0 0 0 17 38Z" />
          <path d="M24 45V51M32 43V53M40 45V51" />
        </svg>

        <p className="max-w-[820px] font-[var(--font-body)] text-[28px] leading-[1.35]">
          <span className="font-semibold text-[var(--accent)]">AI Pilot</span>{' '}
          uses cameras, specialized vision models, on-device sensors and cloud
          processing.
        </p>
      </div>
    </section>
  );
}
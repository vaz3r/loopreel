import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

export default function Slide01({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  const palette = {
    '--paper': '#0C0E12',
    '--ink': '#F0F4F8',
    '--accent': '#38BDF8',
    '--surface': '#151921',
    '--border': '#263040',
  } as React.CSSProperties;

  return (
    <section
      className="flex flex-col h-full min-h-0 w-full text-[var(--ink)]"
      style={palette}
      aria-label="Ring’s Cameras Are On The Move"
    >
      <div className="relative h-[328px] shrink-0 pt-2">
        <div className="mb-5 flex items-center gap-3">
          <span
            className="h-3 w-3 bg-[var(--accent)]"
            aria-hidden="true"
          />
          <p className="font-[var(--font-mono)] text-[22px] leading-7 tracking-[0.16em] text-[var(--accent)]">
            THE TOKEN LEDGER
          </p>
        </div>

        <h1 className="font-[var(--font-headline)] text-[68px] font-bold leading-[1.02] tracking-[-0.045em]">
          Ring’s Cameras
          <br />
          Are On The Move
        </h1>

        <p className="mt-5 max-w-[790px] font-[var(--font-body)] text-[28px] leading-[36px]">
          A flying camera and rolling robot bring surveillance deeper indoors.
        </p>
      </div>

      <div className="relative min-h-0 flex-1">
        <svg
          className="block h-full w-full"
          viewBox="0 0 952 520"
          fill="none"
          role="img"
          aria-label="Illustrative indoor floor plan with a flying camera following a dashed airborne route and a rolling camera following a solid floor route."
        >
          {/* Architectural floor plate and exposed perimeter walls. */}
          <path
            d="M76 233 590 107 878 314 364 463Z"
            fill="var(--surface)"
            stroke="var(--border)"
            strokeWidth="2"
          />
          <path
            d="M76 233V169L590 43V107Z"
            fill="var(--surface)"
            stroke="var(--border)"
            strokeWidth="2"
          />
          <path
            d="M590 43 878 250V314L590 107Z"
            fill="var(--paper)"
            stroke="var(--border)"
            strokeWidth="2"
          />
          <path
            d="M76 169 590 43 878 250"
            stroke="var(--ink)"
            strokeOpacity=".42"
            strokeWidth="3"
            strokeLinejoin="round"
          />

          {/* Open doorways break the interior partitions. */}
          <g
            stroke="var(--border)"
            strokeWidth="3"
            strokeLinejoin="round"
          >
            <path d="M336 169 411 222V176L336 123Z" fill="var(--paper)" />
            <path d="M450 250 544 318V272L450 204Z" fill="var(--paper)" />
            <path d="M544 318 610 299V253L544 272Z" fill="var(--surface)" />
            <path d="M665 283 752 258V212L665 237Z" fill="var(--surface)" />
          </g>
          <g stroke="var(--ink)" strokeOpacity=".3" strokeWidth="2">
            <path d="M336 123 411 176" />
            <path d="M450 204 544 272 610 253" />
            <path d="M665 237 752 212" />
          </g>

          {/* Restrained furniture outlines establish an indoor setting. */}
          <g
            stroke="var(--border)"
            strokeWidth="2"
            strokeLinejoin="round"
          >
            <path d="M147 224 247 199 298 235 198 262Z" />
            <path d="M147 224V243L198 281 298 254V235" />
            <path d="M198 262V281" />
            <path d="M619 134 683 118 753 168 689 186Z" />
            <path d="M619 134V153L689 205 753 187V168" />
            <path d="M689 186V205" />
            <path d="M335 356 407 336 461 374 388 396Z" />
            <path d="M335 356V368L388 408 461 386V374" />
          </g>

          {/* Solid floor route: deliberately unmeasured and unlabelled. */}
          <path
            d="M279 302 376 278Q392 274 406 284L529 372Q542 382 559 377L705 335"
            stroke="var(--accent)"
            strokeOpacity=".12"
            strokeWidth="18"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M279 302 376 278Q392 274 406 284L529 372Q542 382 559 377L705 335"
            stroke="var(--accent)"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle
            cx="279"
            cy="302"
            r="7"
            fill="var(--paper)"
            stroke="var(--accent)"
            strokeWidth="3"
          />
          <path
            d="m570 364 15 5-9 12"
            stroke="var(--accent)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Dashed airborne route floats above the architecture. */}
          <path
            d="M163 154C187 87 302 77 383 118S514 209 609 167 737 150 786 209"
            stroke="var(--accent)"
            strokeWidth="3"
            strokeDasharray="11 12"
            strokeLinecap="round"
          />
          <circle
            cx="163"
            cy="154"
            r="7"
            fill="var(--paper)"
            stroke="var(--accent)"
            strokeWidth="2"
          />
          <path
            d="m773 205 15 7 1-17"
            stroke="var(--accent)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Drone projection: height cue, not a measurement. */}
          <ellipse
            cx="382"
            cy="246"
            rx="66"
            ry="21"
            fill="var(--paper)"
            fillOpacity=".7"
          />
          <path
            d="M382 174V224"
            stroke="var(--ink)"
            strokeOpacity=".25"
            strokeWidth="2"
            strokeDasharray="3 7"
          />

          {/* Schematic flying camera with four guarded rotors. */}
          <g transform="translate(382 122)">
            <g
              stroke="var(--ink)"
              strokeWidth="8"
              strokeLinecap="round"
            >
              <path d="M-26-9-66-29M26-9 66-29M-26 12-66 30M26 12 66 30" />
            </g>
            <g
              fill="var(--paper)"
              stroke="var(--ink)"
              strokeWidth="3"
            >
              <ellipse cx="-70" cy="-32" rx="40" ry="20" />
              <ellipse cx="70" cy="-32" rx="40" ry="20" />
              <ellipse cx="-70" cy="32" rx="40" ry="20" />
              <ellipse cx="70" cy="32" rx="40" ry="20" />
            </g>
            <g
              stroke="var(--accent)"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <path d="M-94-32H-46M-70-42V-22" />
              <path d="M46-32H94M70-42V-22" />
              <path d="M-94 32H-46M-70 22V42" />
              <path d="M46 32H94M70 22V42" />
            </g>
            <path
              d="M-34-18 0-29 34-18V20L0 34-34 20Z"
              fill="var(--surface)"
              stroke="var(--ink)"
              strokeWidth="3"
              strokeLinejoin="round"
            />
            <path
              d="M-34-18 0-5 34-18M0-5V34"
              stroke="var(--ink)"
              strokeOpacity=".5"
              strokeWidth="2"
            />
            <path
              d="M-15 28V48Q0 59 15 48V28"
              fill="var(--paper)"
              stroke="var(--ink)"
              strokeWidth="3"
            />
            <circle cx="0" cy="42" r="7" fill="var(--accent)" />
          </g>

          {/* Schematic rover with visible wheels and raised camera. */}
          <g transform="translate(711 305)">
            <ellipse
              cx="0"
              cy="46"
              rx="66"
              ry="21"
              fill="var(--paper)"
              fillOpacity=".85"
            />
            <g fill="var(--paper)" stroke="var(--ink)" strokeWidth="3">
              <ellipse cx="-43" cy="30" rx="12" ry="23" />
              <ellipse cx="43" cy="30" rx="12" ry="23" />
            </g>
            <path
              d="M-45-3Q0-26 45-3V31Q0 58-45 31Z"
              fill="var(--surface)"
              stroke="var(--ink)"
              strokeWidth="3"
            />
            <ellipse
              cx="0"
              cy="-3"
              rx="45"
              ry="19"
              fill="var(--paper)"
              stroke="var(--ink)"
              strokeWidth="3"
            />
            <path
              d="M-6-9V-51H6V-9"
              fill="var(--ink)"
              stroke="var(--ink)"
              strokeWidth="2"
            />
            <rect
              x="-26"
              y="-78"
              width="52"
              height="38"
              rx="11"
              fill="var(--surface)"
              stroke="var(--ink)"
              strokeWidth="3"
            />
            <circle
              cx="0"
              cy="-59"
              r="11"
              stroke="var(--accent)"
              strokeWidth="3"
            />
            <circle cx="0" cy="-59" r="4" fill="var(--accent)" />
            <path
              d="M-20 25Q0 33 20 25"
              stroke="var(--accent)"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </g>

          {/* Fine leaders connect the illustration to its caption rail. */}
          <g
            stroke="var(--ink)"
            strokeOpacity=".3"
            strokeWidth="1.5"
            strokeLinejoin="round"
          >
            <path d="M273 153H118V492H214" />
            <path d="M771 329H842V492H740" />
          </g>
          <g fill="var(--accent)">
            <circle cx="214" cy="492" r="4" />
            <circle cx="740" cy="492" r="4" />
          </g>
        </svg>
      </div>

      <div className="grid h-[180px] shrink-0 grid-cols-2 border-t border-[var(--border)]">
        <div className="pr-8 pt-5">
          <div className="mb-2 flex items-center gap-4">
            <svg
              className="h-5 w-12 shrink-0 text-[var(--accent)]"
              viewBox="0 0 48 20"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M2 10H46"
                stroke="currentColor"
                strokeWidth="3"
                strokeDasharray="7 6"
                strokeLinecap="round"
              />
            </svg>
            <h2 className="font-[var(--font-headline)] text-[32px] font-semibold leading-[40px] tracking-[-0.025em]">
              Ring Drone Cam
            </h2>
          </div>
          <p className="max-w-[395px] font-[var(--font-body)] text-[26px] leading-[34px]">
            Flies indoor routes using AI Pilot.
          </p>
        </div>

        <div className="border-l border-[var(--border)] pl-8 pt-5">
          <div className="mb-2 flex items-center gap-4">
            <svg
              className="h-5 w-12 shrink-0 text-[var(--accent)]"
              viewBox="0 0 48 20"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M2 10H46"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>
            <h2 className="font-[var(--font-headline)] text-[32px] font-semibold leading-[40px] tracking-[-0.025em]">
              Ring Rover Cam
            </h2>
          </div>
          <p className="max-w-[410px] font-[var(--font-body)] text-[26px] leading-[34px]">
            Patrols a single indoor floor using AI Pilot.
          </p>
        </div>
      </div>
    </section>
  );
}
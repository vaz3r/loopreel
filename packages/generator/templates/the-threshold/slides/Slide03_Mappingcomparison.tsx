import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

export default function Slide03({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  void brand;
  void totalSlides;

  return (
    <section
      className="flex flex-col h-full min-h-0 w-full text-[var(--ink)]"
      data-slide-id={slide.id}
    >
      <header className="shrink-0">
        <p className="font-[var(--font-mono)] text-[20px] tracking-[0.16em] text-[var(--accent)]">
          INSIDE AI PILOT
        </p>

        <h1 className="mt-5 font-[var(--font-headline)] text-[60px] font-bold leading-[1.05] tracking-[-0.035em]">
          Different Mapping,
          <br />
          Shared Cloud Processing
        </h1>

        <p className="mt-5 max-w-[900px] font-[var(--font-body)] text-[26px] leading-snug">
          AI Pilot combines device cameras, specialized vision models, on-device
          sensors and cloud processing.
        </p>
      </header>

      <div className="mt-9 grid shrink-0 grid-cols-2 gap-12">
        <div className="border-t-2 border-[var(--accent)] pt-5">
          <h2 className="font-[var(--font-headline)] text-[36px] font-semibold leading-tight tracking-[-0.025em]">
            Ring Drone Cam
          </h2>
          <p className="mt-3 font-[var(--font-body)] text-[26px] leading-snug">
            Customers carry the drone through indoor spaces to map floor plans.
          </p>
        </div>

        <div className="border-t-2 border-[var(--accent)] pt-5">
          <h2 className="font-[var(--font-headline)] text-[36px] font-semibold leading-tight tracking-[-0.025em]">
            Ring Rover Cam
          </h2>
          <p className="mt-3 font-[var(--font-body)] text-[26px] leading-snug">
            Autonomous exploration maps indoor floor plans.
          </p>
        </div>
      </div>

      <figure className="m-0 mt-5 w-full shrink-0">
        <svg
          viewBox="0 0 952 490"
          className="block h-auto w-full"
          role="img"
          aria-label="Two schematic floor plans: a hand carrying a drone along a dotted setup path on the left, and a rover tracing an exploration path on the right. Both connect without arrows to one shared cloud-processing node."
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Open architectural drawings, rather than enclosing UI cards. */}
          <g transform="translate(12 18)">
            <path
              d="M0 0H428V286H0Z"
              fill="var(--surface)"
              fillOpacity="0.55"
            />

            <g
              fill="none"
              stroke="var(--ink)"
              strokeWidth="3"
              strokeLinecap="square"
              strokeLinejoin="miter"
            >
              <path d="M0 286V0H428V286H260 M196 286H0" />
              <path d="M204 0V76 M204 126V168H288 M344 168H428" />
              <path d="M0 168H70 M126 168H204V222" />
            </g>

            <g
              fill="none"
              stroke="var(--border)"
              strokeWidth="2"
            >
              <path d="M204 76H254A50 50 0 0 1 204 126" />
              <path d="M70 168V112A56 56 0 0 1 126 168" />
              <path d="M288 168V112A56 56 0 0 1 344 168" />
              <path d="M196 286V222A64 64 0 0 1 260 286" />
            </g>

            <path
              d="M228 275V245H155V212H96V104
                 Q96 65 135 65H166
                 M167 104H238Q280 104 280 65H366V221H310"
              fill="none"
              stroke="var(--accent)"
              strokeWidth="4"
              strokeDasharray="2 12"
              strokeLinecap="round"
            />

            {/* Drone above an open carrying hand. */}
            <g transform="translate(94 96)">
              <path
                d="M-31-13L31 13M-31 13L31-13"
                fill="none"
                stroke="var(--ink)"
                strokeWidth="4"
              />
              <g
                fill="var(--surface)"
                stroke="var(--ink)"
                strokeWidth="3"
              >
                <ellipse cx="-33" cy="-15" rx="16" ry="9" />
                <ellipse cx="33" cy="-15" rx="16" ry="9" />
                <ellipse cx="-33" cy="15" rx="16" ry="9" />
                <ellipse cx="33" cy="15" rx="16" ry="9" />
                <rect x="-17" y="-15" width="34" height="31" rx="8" />
              </g>
              <circle cx="0" cy="2" r="5" fill="var(--accent)" />

              <path
                d="M-23 77L-32 55
                   Q-36 46-30 43
                   Q-25 40-21 47
                   L-15 55V30
                   Q-15 22-9 22
                   Q-3 22-3 30V44
                   L16 40Q28 38 29 50
                   L28 64L18 77V88H-18V77Z"
                fill="var(--surface)"
                stroke="var(--accent)"
                strokeWidth="3"
                strokeLinejoin="round"
              />
            </g>
          </g>

          <g transform="translate(512 18)">
            <path
              d="M0 0H428V286H0Z"
              fill="var(--surface)"
              fillOpacity="0.55"
            />

            <g
              fill="none"
              stroke="var(--ink)"
              strokeWidth="3"
              strokeLinecap="square"
              strokeLinejoin="miter"
            >
              <path d="M0 286V0H428V286H232 M168 286H0" />
              <path d="M224 0V76 M224 126V168H358 M414 168H428" />
              <path d="M0 168H84 M140 168H224V222" />
            </g>

            <g
              fill="none"
              stroke="var(--border)"
              strokeWidth="2"
            >
              <path d="M224 76H274A50 50 0 0 1 224 126" />
              <path d="M84 168V112A56 56 0 0 1 140 168" />
              <path d="M358 168V112A56 56 0 0 1 414 168" />
              <path d="M168 286V222A64 64 0 0 1 232 286" />
            </g>

            <path
              d="M200 275V243H111V204
                 M111 142V64H54V118H174V48
                 H190V103H302V54H373V127H387V237H300"
              fill="none"
              stroke="var(--accent)"
              strokeWidth="4"
              strokeDasharray="8 9"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Top-down rover, with wheels and a camera mast. */}
            <g transform="translate(111 172)">
              <rect
                x="-39"
                y="-21"
                width="12"
                height="42"
                rx="5"
                fill="var(--ink)"
              />
              <rect
                x="27"
                y="-21"
                width="12"
                height="42"
                rx="5"
                fill="var(--ink)"
              />
              <rect
                x="-28"
                y="-31"
                width="56"
                height="62"
                rx="16"
                fill="var(--surface)"
                stroke="var(--ink)"
                strokeWidth="3"
              />
              <path
                d="M-15-16H15"
                stroke="var(--accent)"
                strokeWidth="4"
                strokeLinecap="round"
              />
              <circle
                cx="0"
                cy="3"
                r="10"
                fill="none"
                stroke="var(--ink)"
                strokeWidth="3"
              />
              <circle cx="0" cy="3" r="4" fill="var(--accent)" />
            </g>
          </g>

          {/* Non-directional connections: no upload or sequence claims. */}
          <g
            fill="none"
            stroke="var(--border)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M240 310V342Q240 354 252 354H464Q476 354 476 366V384" />
            <path d="M712 310V342Q712 354 700 354H488Q476 354 476 366" />
          </g>

          <circle cx="240" cy="310" r="5" fill="var(--accent)" />
          <circle cx="712" cy="310" r="5" fill="var(--accent)" />

          {/* One shared processing node, visually distinct from the plans. */}
          <path
            d="M388 454
               C366 454 352 442 352 424
               C352 406 366 392 386 392
               C390 370 409 357 432 363
               C447 344 478 345 494 364
               C517 359 539 371 545 392
               C568 392 584 406 584 424
               C584 442 568 454 548 454Z"
            fill="var(--surface)"
            stroke="var(--accent)"
            strokeWidth="3"
          />

          <text
            x="468"
            y="423"
            textAnchor="middle"
            fill="var(--ink)"
            className="font-[var(--font-body)] text-[24px] font-semibold"
          >
            cloud processing
          </text>
        </svg>
      </figure>
    </section>
  );
}
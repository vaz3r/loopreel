import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

export default function Slide05({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  void brand;
  void totalSlides;

  const titleId = `${slide.id}-headline`;
  const diagramId = `${slide.id}-diagram`;

  return (
    <section
      aria-labelledby={titleId}
      className="flex flex-col h-full min-h-0 w-full text-[var(--ink)]"
    >
      <div className="shrink-0">
        <p className="font-[var(--font-mono)] text-[22px] uppercase tracking-[0.16em] text-[var(--accent)]">
          TEACHING THE SPACE
        </p>

        <h2
          id={titleId}
          className="mt-5 max-w-[900px] font-[var(--font-headline)] text-[64px] font-bold leading-[1.04] tracking-[-0.045em]"
        >
          Two Different Ways
          <br />
          To Map Indoors
        </h2>

        <p className="mt-6 max-w-[820px] font-[var(--font-body)] text-[28px] leading-snug">
          Both devices build digital floor plans, but their setup workflows
          differ.
        </p>
      </div>

      <div className="mt-9 flex min-h-0 flex-1 flex-col justify-center">
        {/* The annotations belong to one shared map, not separate cards. */}
        <div className="relative shrink-0 border-t border-[var(--border)] pt-6">
          <div className="flex items-center gap-5">
            <svg
              aria-hidden="true"
              viewBox="0 0 88 32"
              className="h-8 w-[88px] shrink-0 text-[var(--ink)]"
              fill="none"
            >
              <path
                d="M2 16H62"
                stroke="currentColor"
                strokeWidth="3"
                strokeDasharray="9 8"
              />
              <circle
                cx="74"
                cy="16"
                r="10"
                stroke="currentColor"
                strokeWidth="3"
              />
            </svg>

            <h3 className="font-[var(--font-headline)] text-[34px] font-semibold leading-tight tracking-[-0.025em]">
              Drone: customer-carried mapping
            </h3>
          </div>

          <p className="mt-4 max-w-[820px] pl-[108px] font-[var(--font-body)] text-[28px] leading-snug">
            The customer carries the drone through indoor spaces to support
            mapping.
          </p>
        </div>

        <svg
          role="img"
          aria-labelledby={diagramId}
          viewBox="0 0 952 744"
          className="block h-[744px] w-full shrink-0"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title id={diagramId}>
            Schematic shared floor plan with a dashed customer-carried Drone
            route and an opposing solid autonomous Rover route.
          </title>

          {/* Annotation leaders terminate on their respective routes. */}
          <path
            d="M152 0V81L216 145V250"
            stroke="var(--ink)"
            strokeOpacity="0.45"
            strokeWidth="2"
          />

          {/* One unmeasured outline; no room partitions or floor transitions. */}
          <path
            d="M126 156H524V116H792V276H842V532H668V604H342V560H126Z"
            fill="var(--surface)"
            stroke="var(--ink)"
            strokeOpacity="0.65"
            strokeWidth="3"
            strokeLinejoin="miter"
          />

          {/* Small registration marks reinforce the cartographic treatment. */}
          <g
            stroke="var(--border)"
            strokeWidth="2"
            strokeLinecap="square"
          >
            <path d="M88 172V118H142" />
            <path d="M776 78H830V132" />
            <path d="M880 516V570H826" />
            <path d="M326 642H272V588" />
          </g>

          {/* Hand-carried route: dashed, moving left to right, circular ends. */}
          <path
            d="M216 282V234H398Q426 234 426 262V342Q426 370 454 370H574Q602 370 602 342V226Q602 198 630 198H704Q732 198 732 226V304"
            stroke="var(--ink)"
            strokeWidth="5"
            strokeDasharray="13 12"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          <g
            fill="var(--surface)"
            stroke="var(--ink)"
            strokeWidth="4"
          >
            <circle cx="216" cy="282" r="13" />
            <circle cx="732" cy="304" r="13" />
          </g>

          <path
            d="M326 224L338 234L326 244M722 264L732 276L742 264"
            stroke="var(--ink)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Autonomous route: solid, moving right to left, diamond ends. */}
          <path
            d="M764 440H672Q646 440 646 466V498Q646 524 620 524H518Q492 524 492 498V322Q492 294 464 294H356Q328 294 328 322V452Q328 480 300 480H220"
            stroke="var(--surface)"
            strokeWidth="13"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M764 440H672Q646 440 646 466V498Q646 524 620 524H518Q492 524 492 498V322Q492 294 464 294H356Q328 294 328 322V452Q328 480 300 480H220"
            stroke="var(--accent)"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          <g
            fill="var(--surface)"
            stroke="var(--accent)"
            strokeWidth="4"
            strokeLinejoin="round"
          >
            <path d="M764 425L779 440L764 455L749 440Z" />
            <path d="M220 465L235 480L220 495L205 480Z" />
          </g>

          <path
            d="M714 430L702 440L714 450M502 412L492 400L482 412M278 470L266 480L278 490"
            stroke="var(--accent)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          <path
            d="M600 524V628L664 692V744"
            stroke="var(--accent)"
            strokeOpacity="0.7"
            strokeWidth="2"
          />
          <circle cx="600" cy="524" r="5" fill="var(--accent)" />

          <text
            x="126"
            y="690"
            fill="var(--ink)"
            className="font-[var(--font-mono)] text-[22px] uppercase tracking-[0.16em]"
          >
            SCHEMATIC
          </text>
        </svg>

        <div className="shrink-0 border-b border-[var(--border)] pb-7">
          <div className="flex items-center gap-5">
            <svg
              aria-hidden="true"
              viewBox="0 0 88 32"
              className="h-8 w-[88px] shrink-0 text-[var(--accent)]"
              fill="none"
            >
              <path
                d="M2 16H62"
                stroke="currentColor"
                strokeWidth="3"
              />
              <path
                d="M74 5L85 16L74 27L63 16Z"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinejoin="round"
              />
            </svg>

            <h3 className="font-[var(--font-headline)] text-[34px] font-semibold leading-tight tracking-[-0.025em]">
              Rover: autonomous exploration
            </h3>
          </div>

          <p className="mt-4 max-w-[860px] pl-[108px] font-[var(--font-body)] text-[28px] leading-snug">
            Autonomous exploration supports digital floor-plan mapping and
            suggested patrol points.
          </p>
        </div>
      </div>
    </section>
  );
}
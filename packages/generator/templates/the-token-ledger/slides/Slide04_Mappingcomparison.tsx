import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

export default function Slide04({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  void brand;
  void totalSlides;

  const diagramId = React.useId();

  return (
    <section
      className="flex flex-col h-full min-h-0 w-full text-[var(--ink)]"
      aria-labelledby={`${diagramId}-headline`}
      data-slide={slide.id}
    >
      <header className="shrink-0">
        <p className="font-[var(--font-mono)] text-[20px] leading-[26px] tracking-[0.16em] text-[var(--accent)]">
          BEFORE THE PATROL
        </p>

        <h2
          id={`${diagramId}-headline`}
          className="mt-4 max-w-[920px] font-[var(--font-headline)] text-[64px] font-bold leading-[1.04] tracking-[-0.035em]"
        >
          Both Map Interiors,
          <br />
          But Differently
        </h2>

        <p className="mt-4 max-w-[870px] font-[var(--font-body)] text-[26px] leading-[34px]">
          The drone needs a carried walkthrough; the Rover explores autonomously.
        </p>
      </header>

      <div className="relative mt-6 h-[720px] w-full shrink-0">
        <svg
          viewBox="0 0 952 720"
          className="absolute inset-0 h-full w-full"
          role="img"
          aria-labelledby={`${diagramId}-title ${diagramId}-description`}
        >
          <title id={`${diagramId}-title`}>
            Illustrative indoor floor plan comparing two mapping methods
          </title>
          <desc id={`${diagramId}-description`}>
            An illustrative schematic without dimensions. Long dashes represent
            the drone’s carried walkthrough; round dots represent the Rover’s
            autonomous exploration. The traces are separate conceptual examples,
            not simultaneous operation, a shared map, or measured coverage.
          </desc>

          {/* Open-ended registration marks keep the drawing schematic. */}
          <g
            fill="none"
            stroke="var(--border)"
            strokeWidth="2"
            aria-hidden="true"
          >
            <path d="M102 190v-24h24 M826 166h24v24" />
            <path d="M102 530v24h24 M826 554h24v-24" />
          </g>

          {/* One shared illustrative architectural outline. */}
          <path
            d="M146 184H806V528H146Z"
            fill="var(--surface)"
            stroke="none"
          />

          {/* Interior partitions include generous doorway gaps. */}
          <g
            fill="none"
            stroke="var(--ink)"
            strokeOpacity="0.65"
            strokeWidth="5"
            strokeLinecap="square"
            strokeLinejoin="miter"
          >
            <path d="M146 184H806V528H146V184Z" />
            <path d="M360 184V268 M360 322V354" />
            <path d="M146 354H248 M308 354H450" />
            <path d="M510 354H590" />
            <path d="M590 184V244 M590 306V420 M590 478V528" />
            <path d="M590 354H660 M724 354H806" />
            <path d="M450 354V412 M450 474V528" />
          </g>

          {/* Door swings: architectural cues, never measurements. */}
          <g
            fill="none"
            stroke="var(--border)"
            strokeWidth="2"
          >
            <path d="M360 268h54a54 54 0 0 1-54 54" />
            <path d="M248 354v-60a60 60 0 0 1 60 60" />
            <path d="M590 244h62a62 62 0 0 1-62 62" />
            <path d="M660 354v-64a64 64 0 0 1 64 64" />
            <path d="M450 412h62a62 62 0 0 1-62 62" />
          </g>

          {/* Carried walkthrough: restrained, angular long-dash trace. */}
          <path
            d="M210 466V400Q210 380 230 380H278V310H232
               Q212 310 212 290V250H312V294H414
               Q434 294 434 274V230H522"
            fill="none"
            stroke="var(--ink)"
            strokeWidth="5"
            strokeDasharray="17 12"
            strokeLinecap="butt"
            strokeLinejoin="round"
          />

          {/* Autonomous exploration: curved round-dot trace. */}
          <path
            d="M514 488V412Q514 390 540 390H616
               Q636 390 636 418V462Q636 490 670 490H738
               Q764 490 764 462V414Q764 390 738 390H692V316
               Q692 294 720 294H748V236H652
               Q624 236 624 268V282H550"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="6"
            strokeDasharray="0.1 15"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Opposed leaders connect each explanation to its own trace. */}
          <g fill="none" strokeWidth="2">
            <path
              d="M62 132V152H190V222L210 242"
              stroke="var(--ink)"
              strokeOpacity="0.7"
            />
            <path
              d="M740 490L780 548H886V590H416"
              stroke="var(--accent)"
            />
          </g>

          <circle
            cx="212"
            cy="250"
            r="8"
            fill="var(--surface)"
            stroke="var(--ink)"
            strokeWidth="3"
          />
          <circle
            cx="738"
            cy="490"
            r="8"
            fill="var(--surface)"
            stroke="var(--accent)"
            strokeWidth="3"
          />
        </svg>

        {/* Above-left annotation; no card enclosure. */}
        <div className="absolute left-0 top-0 w-[590px]">
          <div className="flex items-center gap-5">
            <svg
              viewBox="0 0 64 20"
              className="h-5 w-16 shrink-0 text-[var(--ink)]"
              aria-hidden="true"
            >
              <path
                d="M0 10H64"
                fill="none"
                stroke="currentColor"
                strokeWidth="4"
                strokeDasharray="15 10"
              />
            </svg>
            <h3 className="font-[var(--font-headline)] text-[34px] font-semibold leading-[42px] tracking-[-0.02em]">
              Ring Drone Cam
            </h3>
          </div>
          <p className="mt-2 pl-[84px] font-[var(--font-body)] text-[25px] leading-[33px]">
            Maps indoor floor plans after customers carry it through the spaces.
          </p>
        </div>

        {/* Below-right annotation mirrors the leader, not a second card. */}
        <div className="absolute right-0 top-[608px] w-[536px]">
          <div className="flex items-center gap-5">
            <svg
              viewBox="0 0 64 20"
              className="h-5 w-16 shrink-0 text-[var(--accent)]"
              aria-hidden="true"
            >
              <path
                d="M4 10H60"
                fill="none"
                stroke="currentColor"
                strokeWidth="6"
                strokeDasharray="0.1 14"
                strokeLinecap="round"
              />
            </svg>
            <h3 className="font-[var(--font-headline)] text-[34px] font-semibold leading-[42px] tracking-[-0.02em] text-[var(--accent)]">
              Ring Rover Cam
            </h3>
          </div>
          <p className="mt-2 pl-[84px] font-[var(--font-body)] text-[25px] leading-[33px]">
            Maps indoor floor plans through autonomous exploration.
          </p>
        </div>
      </div>
    </section>
  );
}
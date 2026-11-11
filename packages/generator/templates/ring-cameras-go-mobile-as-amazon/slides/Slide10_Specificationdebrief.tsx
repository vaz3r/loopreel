import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

export default function Slide10({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  return (
    <section className="flex flex-col h-full min-h-0 w-full text-[var(--ink)]">
      <header className="shrink-0">
        <p className="font-[var(--font-mono)] text-[22px] uppercase tracking-[0.14em] text-[var(--accent)]">
          {slide.kicker}
        </p>

        <h1 className="mt-7 max-w-[920px] font-[var(--font-headline)] text-[68px] font-bold leading-[1.04] tracking-[-0.045em]">
          {slide.headline}
        </h1>

        <p className="mt-7 max-w-[850px] font-[var(--font-body)] text-[28px] leading-snug">
          {slide.subheadline}
        </p>
      </header>

      <div className="relative mt-10 h-[1080px] w-full shrink-0">
        <svg
          className="pointer-events-none absolute inset-0 h-full w-full"
          viewBox="0 0 952 1080"
          fill="none"
          aria-hidden="true"
        >
          {/* Upper-left abstract drone: intentionally schematic, not to scale. */}
          <g
            stroke="var(--ink)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path
              d="M128 167 88 125M188 167 228 125M128 207 88 249M188 207 228 249"
              strokeWidth="9"
              stroke="var(--surface)"
            />
            <path d="M128 167 88 125M188 167 228 125M128 207 88 249M188 207 228 249" />

            <ellipse cx="79" cy="116" rx="49" ry="24" />
            <ellipse cx="237" cy="116" rx="49" ry="24" />
            <ellipse cx="79" cy="258" rx="49" ry="24" />
            <ellipse cx="237" cy="258" rx="49" ry="24" />

            <path
              d="M133 151H183L202 175V210L181 230H135L114 210V175Z"
              fill="var(--surface)"
            />
            <path d="M137 175H179V205H137Z" stroke="var(--border)" />
            <circle cx="158" cy="190" r="10" />
            <path d="M145 230V245H171V230" />
          </g>

          {/* Open specification bracket; neither end is closed or capped. */}
          <path
            d="M239 190H322V132H918V492H844"
            stroke="var(--accent)"
            strokeWidth="4"
            strokeLinejoin="miter"
          />

          {/* A second unclosed bracket reaches back from the lower-right rover. */}
          <path
            d="M710 843H626V644H34V967H110"
            stroke="var(--accent)"
            strokeWidth="4"
            strokeLinejoin="miter"
          />

          {/* Lower-right abstract rover with a camera mast. */}
          <g
            stroke="var(--ink)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path
              d="M779 822V737H795V822"
              fill="var(--surface)"
            />
            <path
              d="M756 700H818L831 713V744H756Z"
              fill="var(--surface)"
            />
            <circle cx="803" cy="721" r="10" />
            <path d="M769 713H781" stroke="var(--border)" />

            <path
              d="M727 817H837L871 850V900H707V848Z"
              fill="var(--surface)"
            />
            <path d="M727 817 751 850H871M751 850V900" />
            <path d="M767 869H839" stroke="var(--border)" />

            <rect
              x="714"
              y="882"
              width="37"
              height="63"
              rx="17"
              fill="var(--surface)"
            />
            <rect
              x="829"
              y="882"
              width="37"
              height="63"
              rx="17"
              fill="var(--surface)"
            />
            <path d="M752 917H828" />
          </g>
        </svg>

        <div className="absolute left-[370px] top-[222px] w-[496px]">
          <h2 className="font-[var(--font-headline)] text-[38px] font-semibold leading-tight tracking-[-0.025em]">
            Ring Drone Cam
          </h2>
          <p className="mt-5 font-[var(--font-body)] text-[28px] leading-normal">
            Dimensions, coverage area, charging duration and floor-transition
            capabilities are not stated.
          </p>
        </div>

        <div className="absolute left-[76px] top-[706px] w-[488px]">
          <h2 className="font-[var(--font-headline)] text-[38px] font-semibold leading-tight tracking-[-0.025em]">
            Ring Rover Cam
          </h2>
          <p className="mt-5 font-[var(--font-body)] text-[28px] leading-normal">
            Dimensions, mast height, battery life and charging duration are not
            stated.
          </p>
        </div>
      </div>
    </section>
  );
}
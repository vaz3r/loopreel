import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

export default function Slide04({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  const arrowId = `rotation-${React.useId().replace(/:/g, '')}`;
  void brand;
  void totalSlides;

  return (
    <section className="flex flex-col h-full min-h-0 w-full text-[var(--ink)]">
      <header className="shrink-0">
        <div className="flex items-center gap-4">
          <span
            aria-hidden="true"
            className="h-3 w-3 bg-[var(--accent)]"
          />
          <p className="font-[var(--font-mono)] text-[22px] tracking-[0.16em] text-[var(--accent)]">
            {slide.kicker}
          </p>
        </div>

        <h1 className="mt-7 max-w-[920px] font-[var(--font-headline)] text-[64px] font-bold leading-[1.06] tracking-[-0.035em]">
          {slide.headline}
        </h1>
      </header>

      <div className="mt-8 w-full shrink-0">
        <svg
          viewBox="0 0 952 900"
          className="block h-auto w-full"
          role="img"
          aria-labelledby={`${arrowId}-title ${arrowId}-description`}
        >
          <title id={`${arrowId}-title`}>Drone capabilities</title>
          <desc id={`${arrowId}-description`}>
            Eight minutes of flight time, a 148-degree field of view,
            and 360-degree rotation. The shaded wedge indicates viewing
            angle, not flight range.
          </desc>

          <defs>
            <marker
              id={arrowId}
              viewBox="0 0 12 12"
              markerWidth="12"
              markerHeight="12"
              refX="9"
              refY="6"
              orient="auto"
              markerUnits="userSpaceOnUse"
            >
              <path d="M 1 1 L 10 6 L 1 11 Z" fill="var(--accent)" />
            </marker>
          </defs>

          {/* Three numerical anchors orbit one central instrument. */}
          <circle
            cx="476"
            cy="101"
            r="79"
            fill="var(--surface)"
            stroke="var(--border)"
          />
          <text
            x="476"
            y="135"
            textAnchor="middle"
            fill="var(--accent)"
            className="font-[var(--font-mono)] text-[112px] font-bold"
          >
            8
          </text>
          <text
            x="476"
            y="218"
            textAnchor="middle"
            fill="var(--ink)"
            className="font-[var(--font-body)] text-[26px]"
          >
            Minutes of flight time
          </text>

          <g fill="none" stroke="var(--border)" strokeWidth="2">
            <path d="M476 235 V257" />
            <path d="M300 647 L254 693 H196 V716" />
            <path d="M652 647 L698 693 H756 V716" />
          </g>

          {/* Radial instrument: no distance scale or range markings. */}
          <g transform="translate(476 495)">
            <circle
              r="244"
              fill="var(--surface)"
              stroke="var(--border)"
              strokeWidth="2"
            />

            {Array.from({ length: 60 }, (_, index) => (
              <line
                key={index}
                x1="0"
                y1={index % 5 === 0 ? -225 : -234}
                x2="0"
                y2="-243"
                transform={`rotate(${index * 6})`}
                stroke={index % 5 === 0 ? 'var(--ink)' : 'var(--border)'}
                strokeOpacity={index % 5 === 0 ? 0.55 : 1}
                strokeWidth={index % 5 === 0 ? 2 : 1}
              />
            ))}

            <circle
              r="203"
              fill="none"
              stroke="var(--border)"
              strokeWidth="1"
            />

            <g stroke="var(--border)" strokeWidth="1">
              <path d="M-280 0 H-114 M114 0 H280" />
              <path d="M0 -211 V-116 M0 116 V270" />
            </g>

            {/* 148° wedge: endpoints at −164° and −16°, radius 203. */}
            <path
              d="M0 0 L-195.136 -55.955 A203 203 0 0 1 195.136 -55.955 Z"
              fill="var(--accent)"
              fillOpacity="0.13"
            />
            <path
              d="M-195.136 -55.955 A203 203 0 0 1 195.136 -55.955"
              fill="none"
              stroke="var(--accent)"
              strokeWidth="3"
            />
            <path
              d="M-195.136 -55.955 L0 0 L195.136 -55.955"
              fill="none"
              stroke="var(--accent)"
              strokeOpacity="0.5"
              strokeWidth="1.5"
            />

            {/* Nearly complete circular arrow communicates rotation. */}
            <path
              d="M85 -147.224 A170 170 0 1 1 29.520 -167.417"
              fill="none"
              stroke="var(--accent)"
              strokeWidth="3"
              markerEnd={`url(#${arrowId})`}
            />

            <circle
              r="110"
              fill="var(--surface)"
              stroke="var(--border)"
              strokeWidth="1.5"
            />

            {/* Abstract top-down drone glyph. */}
            <g
              fill="none"
              stroke="var(--ink)"
              strokeWidth="5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M-24 -26 L-56 -56 M24 -26 L56 -56" />
              <path d="M-24 26 L-56 56 M24 26 L56 56" />

              <circle cx="-58" cy="-58" r="25" />
              <circle cx="58" cy="-58" r="25" />
              <circle cx="-58" cy="58" r="25" />
              <circle cx="58" cy="58" r="25" />

              <path d="M-73 -58 H-43 M43 -58 H73" />
              <path d="M-73 58 H-43 M43 58 H73" />

              <path
                d="M-19 -43 H19 L32 -24 V28 L18 43 H-18 L-32 28 V-24 Z"
                fill="var(--surface)"
              />
            </g>

            <path d="M-10 -28 L0 -40 L10 -28" fill="var(--accent)" />
            <circle
              cy="8"
              r="13"
              fill="none"
              stroke="var(--accent)"
              strokeWidth="3"
            />
            <circle cy="8" r="4" fill="var(--accent)" />
          </g>

          <g fill="var(--accent)">
            <circle cx="476" cy="257" r="4" />
            <circle cx="300" cy="647" r="4" />
            <circle cx="652" cy="647" r="4" />
          </g>

          <g textAnchor="middle">
            <text
              x="196"
              y="799"
              fill="var(--ink)"
              className="font-[var(--font-mono)] text-[96px] font-bold"
            >
              148
            </text>
            <text
              x="196"
              y="845"
              fill="var(--ink)"
              className="font-[var(--font-body)] text-[26px]"
            >
              Degree field of view
            </text>

            <text
              x="756"
              y="799"
              fill="var(--ink)"
              className="font-[var(--font-mono)] text-[96px] font-bold"
            >
              360
            </text>
            <text
              x="756"
              y="845"
              fill="var(--ink)"
              className="font-[var(--font-body)] text-[26px]"
            >
              Degree rotation
            </text>
          </g>
        </svg>
      </div>

      <div className="mt-6 flex shrink-0 items-start gap-6 border-t border-[var(--border)] py-7">
        <svg
          viewBox="0 0 48 48"
          className="mt-1 h-12 w-12 shrink-0 text-[var(--accent)]"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden="true"
        >
          <rect x="5" y="12" width="34" height="24" rx="3" />
          <path d="M40 19 H44 V29 H40" />
          <path d="M12 18 V30 M20 18 V30 M28 18 V30" />
        </svg>
        <p className="max-w-[820px] font-[var(--font-body)] text-[28px] leading-snug">
          {slide.subheadline}
        </p>
      </div>
    </section>
  );
}
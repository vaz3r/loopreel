import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

export default function Slide03({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  const titleId = React.useId();

  return (
    <section
      aria-labelledby={titleId}
      className="flex flex-col h-full min-h-0 w-full text-[var(--ink)]"
      style={
        {
          '--ink': '#182923',
          '--accent': '#9B254D',
          '--surface': '#D6DFD5',
          '--border': '#A0AFA3',
          backgroundColor: '#E7ECE5',
        } as React.CSSProperties
      }
    >
      <header className="shrink-0">
        <p className="font-[var(--font-mono)] text-[20px] leading-[28px] tracking-[0.16em] text-[var(--accent)]">
          THE CAMERA PAYLOAD
        </p>

        <h2
          id={titleId}
          className="mt-4 max-w-[880px] font-[var(--font-headline)] text-[64px] font-bold leading-[1.04] tracking-[-0.045em]"
        >
          Different Ways
          <br />
          To Look Around
        </h2>

        <p className="mt-5 max-w-[900px] font-[var(--font-body)] text-[26px] leading-[1.35]">
          Drone combines a wide view with rotation; Rover scans designated
          locations.
        </p>
      </header>

      <div className="mt-8 grid grid-cols-2 gap-10">
        <article className="flex min-w-0 flex-col">
          <h3 className="font-[var(--font-headline)] text-[34px] font-semibold leading-[42px] tracking-[-0.025em]">
            Ring Drone Cam
          </h3>

          <svg
            viewBox="0 0 448 370"
            role="img"
            aria-label="Drone: a 148-degree viewing sector inside a full-rotation arrow, with exactly two low-light LED marks."
            className="mt-3 h-[370px] w-full shrink-0"
          >
            {/* The sector spans precisely 148°, from −164° to −16°. */}
            <path
              d="M224 184 L106.725921 150.372392 A122 122 0 0 1 341.274079 150.372392 Z"
              fill="var(--accent)"
              fillOpacity="0.13"
            />
            <path
              d="M106.725921 150.372392 A122 122 0 0 1 341.274079 150.372392"
              fill="none"
              stroke="var(--accent)"
              strokeWidth="3"
            />
            <path
              d="M106.725921 150.372392 L224 184 L341.274079 150.372392"
              fill="none"
              stroke="var(--accent)"
              strokeWidth="2"
            />

            <circle
              cx="224"
              cy="184"
              r="156"
              fill="none"
              stroke="var(--ink)"
              strokeWidth="2.5"
            />
            <path
              d="M222 18 L242 28 L222 38"
              fill="var(--ink)"
            />

            <text
              x="224"
              y="113"
              textAnchor="middle"
              fill="var(--accent)"
              className="font-[var(--font-mono)] text-[36px] font-semibold"
            >
              148°
            </text>

            <rect
              x="185"
              y="169"
              width="78"
              height="62"
              rx="12"
              fill="var(--surface)"
              stroke="var(--ink)"
              strokeWidth="3"
            />
            <circle
              cx="224"
              cy="193"
              r="14"
              fill="#E7ECE5"
              stroke="var(--ink)"
              strokeWidth="3"
            />

            {/* Exactly two LED marks. */}
            <rect
              x="198"
              y="216"
              width="10"
              height="5"
              rx="2.5"
              fill="var(--accent)"
            />
            <rect
              x="240"
              y="216"
              width="10"
              height="5"
              rx="2.5"
              fill="var(--accent)"
            />

            <text
              x="224"
              y="291"
              textAnchor="middle"
              fill="var(--ink)"
              className="font-[var(--font-mono)] text-[20px]"
            >
              360-degree rotation
            </text>
          </svg>

          <div className="mt-2 border-t border-[var(--border)] pt-4">
            <p className="font-[var(--font-mono)] text-[36px] font-semibold leading-[44px] tracking-[-0.035em] text-[var(--accent)]">
              2K video
            </p>
            <p className="mt-3 font-[var(--font-body)] text-[26px] leading-[1.38]">
              148-degree field of view; 360-degree rotation; 2K video; two
              low-light LEDs.
            </p>
          </div>
        </article>

        <article className="flex min-w-0 flex-col">
          <h3 className="font-[var(--font-headline)] text-[34px] font-semibold leading-[42px] tracking-[-0.025em]">
            Ring Rover Cam
          </h3>

          <svg
            viewBox="0 0 448 370"
            role="img"
            aria-label="Rover: a full-circle location-scan ring surrounding a stationary camera glyph."
            className="mt-3 h-[370px] w-full shrink-0"
          >
            {/* One scan ring: no range rings or panoramic image field. */}
            <circle
              cx="224"
              cy="184"
              r="156"
              fill="none"
              stroke="var(--accent)"
              strokeWidth="2.5"
            />
            <path
              d="M222 18 L242 28 L222 38"
              fill="var(--accent)"
            />

            <g
              fill="none"
              stroke="var(--ink)"
              strokeWidth="2"
              strokeLinecap="square"
            >
              <path d="M224 47 V61 M224 307 V321" />
              <path d="M87 184 H101 M347 184 H361" />
              <path d="M165 151 V139 H177" />
              <path d="M271 139 H283 V151" />
              <path d="M165 217 V229 H177" />
              <path d="M271 229 H283 V217" />
            </g>

            {/* The camera remains upright and centered within the scan ring. */}
            <rect
              x="188"
              y="155"
              width="72"
              height="58"
              rx="12"
              fill="var(--surface)"
              stroke="var(--ink)"
              strokeWidth="3"
            />
            <circle
              cx="224"
              cy="184"
              r="17"
              fill="#E7ECE5"
              stroke="var(--ink)"
              strokeWidth="3"
            />
            <circle
              cx="224"
              cy="184"
              r="6"
              fill="var(--ink)"
            />
            <path
              d="M224 214 V242 M204 242 H244"
              fill="none"
              stroke="var(--ink)"
              strokeWidth="3"
              strokeLinecap="round"
            />

            <text
              x="224"
              y="291"
              textAnchor="middle"
              fill="var(--ink)"
              className="font-[var(--font-mono)] text-[20px]"
            >
              360-degree location scan
            </text>
          </svg>

          <div className="mt-2 border-t border-[var(--border)] pt-4">
            <p className="font-[var(--font-mono)] text-[36px] font-semibold leading-[44px] tracking-[-0.035em] text-[var(--accent)]">
              up to 4K
            </p>
            <p className="mt-3 font-[var(--font-body)] text-[26px] leading-[1.38]">
              Livestreams and records in up to 4K; performs a 360-degree
              location scan.
            </p>
          </div>
        </article>
      </div>
    </section>
  );
}
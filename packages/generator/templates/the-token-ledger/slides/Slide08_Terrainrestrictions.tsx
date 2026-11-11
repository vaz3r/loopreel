import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

export default function Slide08({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  const hatchId = `floor-hatch-${React.useId().replace(/:/g, '')}`;

  const annotations = [
    {
      title: 'Single Floor',
      body: 'Indoor operation only; Rover cannot climb stairs.',
    },
    {
      title: 'Flooring Transitions',
      body: 'Transitions greater than 1.375 inches (3.5 centimeters) are incompatible.',
    },
    {
      title: 'Other Incompatibilities',
      body: 'Curved edges, sunken areas, and black glossy floors are incompatible.',
    },
  ];

  const floorProfile =
    'M 0 320 H 188 V 282 H 226 V 244 H 264 V 206 H 462 V 160 H 660 ' +
    'C 686 160 696 174 706 188 ' +
    'C 720 208 736 188 748 160 ' +
    'H 770 V 250 H 826 V 160 H 952';

  return (
    <section className="flex flex-col h-full min-h-0 w-full text-[var(--ink)]">
      <div className="shrink-0">
        <p className="font-[var(--font-mono)] text-[20px] leading-[28px] tracking-[0.16em] text-[var(--accent)]">
          {slide.kicker}
        </p>

        <h2 className="mt-[14px] max-w-[920px] font-[var(--font-headline)] text-[64px] font-bold leading-[1.03] tracking-[-0.035em]">
          {slide.headline}
        </h2>

        <p className="mt-4 max-w-[890px] font-[var(--font-body)] text-[26px] leading-[34px]">
          {slide.subheadline}
        </p>
      </div>

      <figure className="m-0 mt-5 h-[430px] w-full shrink-0">
        <svg
          viewBox="0 0 952 430"
          width="952"
          height="430"
          className="block h-full w-full"
          role="img"
          aria-label="Schematic floor cross-section showing stairs, a transition greater than 1.375 inches (3.5 centimeters), curved edges, a sunken area, and black glossy flooring. The Rover path stops before the stairs."
        >
          <defs>
            <pattern
              id={hatchId}
              width="16"
              height="16"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M -4 4 L 4 -4 M 0 16 L 16 0 M 12 20 L 20 12"
                fill="none"
                stroke="var(--border)"
                strokeWidth="1.5"
              />
            </pattern>
          </defs>

          {/* Three annotation bays within one continuous section. */}
          <g
            fill="none"
            stroke="var(--border)"
            strokeWidth="1.5"
          >
            <path d="M 0 24 H 952" />
            <path d="M 312 24 V 410 M 634 24 V 410" strokeDasharray="5 9" />
            <path d="M 0 410 H 952" />
          </g>

          <path
            d={`${floorProfile} V 394 H 0 Z`}
            fill="var(--surface)"
          />
          <path
            d={`${floorProfile} V 394 H 0 Z`}
            fill={`url(#${hatchId})`}
          />
          <path
            d={floorProfile}
            fill="none"
            stroke="var(--ink)"
            strokeWidth="3"
            strokeLinejoin="miter"
          />

          {/* Stair interruption. */}
          <path
            d="M 188 320 V 282 H 226 V 244 H 264 V 206"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="4"
          />

          {/* Schematic Rover silhouette, entirely before the obstacle. */}
          <g
            fill="var(--surface)"
            stroke="var(--ink)"
            strokeWidth="3"
            strokeLinejoin="round"
          >
            <path d="M 39 298 L 45 274 H 92 L 106 286 V 303 H 39 Z" />
            <path d="M 54 274 V 259 H 80 V 274" />
            <path d="M 80 265 H 91" />
            <circle cx="52" cy="310" r="9" />
            <circle cx="92" cy="310" r="9" />
          </g>
          <circle cx="87" cy="285" r="4" fill="var(--accent)" />

          {/* The travel path terminates before the first obstruction. */}
          <path
            d="M 114 298 H 158"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="3"
            strokeDasharray="7 6"
          />
          <path
            d="M 159 290 L 175 306 M 175 290 L 159 306"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="3"
          />

          {/* Exact incompatible-transition threshold; not a safe-height claim. */}
          <g
            fill="var(--accent)"
            className="font-[var(--font-mono)] text-[22px]"
          >
            <text x="334" y="77">&gt; 1.375 inches</text>
            <text x="334" y="108">(3.5 centimeters)</text>
          </g>

          <g fill="none" stroke="var(--accent)" strokeWidth="2">
            <path d="M 462 206 V 160" strokeWidth="4" />
            <path d="M 474 160 H 518 M 474 206 H 518" />
            <path d="M 504 160 V 206" />
            <path d="M 498 166 L 510 154 M 498 212 L 510 200" />
            <path d="M 504 132 V 146" strokeDasharray="3 4" />
          </g>

          {/* Composite region: curved edge, sunken area, glossy floor. */}
          <path
            d="M 660 160 C 686 160 696 174 706 188 C 720 208 736 188 748 160"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="4"
          />
          <path
            d="M 770 160 V 250 H 826 V 160"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="4"
          />

          <path
            d="M 846 161 H 951 V 184 H 846 Z"
            fill="#050608"
            stroke="var(--border)"
            strokeWidth="1.5"
          />
          <g fill="none" stroke="var(--ink)" strokeWidth="2">
            <path d="M 861 180 L 878 165 M 884 180 L 901 165" />
          </g>
          <path
            d="M 846 160 H 952"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="4"
          />

          {/* Architectural projection lines connect geometry to its annotation bay. */}
          <g
            fill="none"
            stroke="var(--accent)"
            strokeWidth="1.5"
            strokeDasharray="3 6"
            opacity="0.65"
          >
            <path d="M 226 254 V 382" />
            <path d="M 462 218 V 382" />
            <path d="M 798 262 V 382" />
          </g>
          <g fill="var(--accent)">
            <circle cx="226" cy="388" r="4" />
            <circle cx="462" cy="388" r="4" />
            <circle cx="798" cy="388" r="4" />
          </g>
        </svg>
      </figure>

      <div className="mt-5 grid shrink-0 grid-cols-3 gap-6">
        {annotations.map((annotation) => (
          <div
            key={annotation.title}
            className="min-w-0 border-t border-[var(--border)] pt-4"
          >
            <h3 className="min-h-[80px] font-[var(--font-headline)] text-[32px] font-semibold leading-[38px] tracking-[-0.025em]">
              {annotation.title}
            </h3>
            <p className="mt-3 font-[var(--font-body)] text-[24px] leading-[31px]">
              {annotation.body}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
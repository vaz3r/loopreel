import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

export default function Slide04({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  void brand;
  void totalSlides;

  const id = React.useId().replace(/:/g, '');
  const arrowId = `rotation-arrow-${id}`;

  const cx = 476;
  const cy = 338;
  const radius = 250;
  const halfAngle = (74 * Math.PI) / 180;
  const leftX = cx - radius * Math.sin(halfAngle);
  const rightX = cx + radius * Math.sin(halfAngle);
  const edgeY = cy - radius * Math.cos(halfAngle);

  const viewingWedge = [
    `M ${cx} ${cy}`,
    `L ${leftX} ${edgeY}`,
    `A ${radius} ${radius} 0 0 1 ${rightX} ${edgeY}`,
    'Z',
  ].join(' ');

  return (
    <section className="flex flex-col h-full min-h-0 w-full text-[var(--ink)]">
      <header className="flex shrink-0 flex-col gap-4">
        <div className="flex items-center gap-4">
          <span
            aria-hidden="true"
            className="h-[10px] w-[10px] bg-[var(--accent)]"
          />
          <p className="font-[var(--font-mono)] text-[22px] leading-7 tracking-[0.16em] text-[var(--accent)]">
            {slide.kicker}
          </p>
        </div>

        <h2 className="max-w-[900px] font-[var(--font-headline)] text-[64px] font-bold leading-[1.06] tracking-[-0.045em]">
          {slide.headline}
        </h2>

        <p className="max-w-[870px] font-[var(--font-body)] text-[26px] leading-[1.3]">
          {slide.subheadline}
        </p>
      </header>

      <svg
        viewBox="0 0 952 680"
        className="mt-6 h-[680px] w-full shrink-0"
        role="img"
        aria-label="148 degrees field of view, 360 degrees rotation, 2K video resolution"
      >
        <defs>
          <marker
            id={arrowId}
            viewBox="0 0 12 12"
            refX="10"
            refY="6"
            markerWidth="12"
            markerHeight="12"
            markerUnits="userSpaceOnUse"
            orient="auto"
          >
            <path
              d="M 1 1 L 10 6 L 1 11"
              fill="none"
              stroke="var(--ink)"
              strokeWidth="2"
              strokeLinecap="square"
              strokeLinejoin="miter"
            />
          </marker>
        </defs>

        {/* Angular field of view: exactly 148°, without a distance scale. */}
        <path
          d={viewingWedge}
          fill="var(--accent)"
          fillOpacity="0.13"
        />
        <path
          d={`M ${leftX} ${edgeY} A ${radius} ${radius} 0 0 1 ${rightX} ${edgeY}`}
          fill="none"
          stroke="var(--accent)"
          strokeWidth="2.5"
        />
        <path
          d={`M ${leftX} ${edgeY} L ${cx} ${cy} L ${rightX} ${edgeY}`}
          fill="none"
          stroke="var(--accent)"
          strokeWidth="2"
        />
        <path
          d="M 476 88 V 242"
          fill="none"
          stroke="var(--accent)"
          strokeOpacity="0.5"
          strokeWidth="1.5"
          strokeDasharray="5 8"
        />

        {/* Sparse optical reticle. */}
        <g
          fill="none"
          stroke="var(--border)"
          strokeWidth="1.5"
        >
          <path d="M 304 338 H 326 M 626 338 H 648" />
          <path d="M 476 166 V 188" />
          <path d="M 358 214 L 370 226 M 582 450 L 594 462" />
          <path d="M 358 462 L 370 450 M 582 226 L 594 214" />
        </g>

        {/* Circular rotation arrow; its lower opening admits the lens leader. */}
        <path
          d="M 426.747 473.316 A 144 144 0 1 1 525.253 473.316"
          fill="none"
          stroke="var(--ink)"
          strokeWidth="2.5"
          markerEnd={`url(#${arrowId})`}
        />

        {/* Abstract camera lens. */}
        <circle
          cx={cx}
          cy={cy}
          r="91"
          fill="var(--surface)"
          stroke="var(--ink)"
          strokeWidth="2"
        />
        <circle
          cx={cx}
          cy={cy}
          r="76"
          fill="none"
          stroke="var(--border)"
          strokeWidth="1.5"
        />
        <circle
          cx={cx}
          cy={cy}
          r="61"
          fill="var(--ink)"
        />

        <g
          fill="none"
          stroke="var(--surface)"
          strokeOpacity="0.65"
          strokeWidth="1.5"
        >
          <path d="M 455 302 L 497 302 L 518 338 L 497 374 L 455 374 L 434 338 Z" />
          <path d="M 455 302 L 475 278" />
          <path d="M 497 302 L 529 309" />
          <path d="M 518 338 L 529 366" />
          <path d="M 497 374 L 477 398" />
          <path d="M 455 374 L 423 367" />
          <path d="M 434 338 L 423 310" />
        </g>

        <circle
          cx={cx}
          cy={cy}
          r="21"
          fill="var(--accent)"
        />
        <circle
          cx="469"
          cy="331"
          r="5"
          fill="var(--surface)"
          fillOpacity="0.8"
        />

        {/* Three short, independent perimeter leaders. */}
        <g
          fill="none"
          stroke="var(--border)"
          strokeWidth="2"
          strokeLinejoin="miter"
        >
          <path d="M 181 194 H 218 V 223 H 254" />
          <path d="M 620 338 H 724" />
          <path d="M 476 429 V 515" />
        </g>

        <g fill="var(--accent)">
          <circle cx="254" cy="223" r="4" />
          <circle cx="620" cy="338" r="4" />
          <circle cx="476" cy="429" r="4" />
        </g>

        <g>
          <text
            x="8"
            y="110"
            fill="var(--accent)"
            className="font-[var(--font-mono)] text-[88px] font-bold tracking-[-0.06em]"
          >
            148
          </text>
          <text
            x="12"
            y="151"
            fill="var(--ink)"
            className="font-[var(--font-body)] text-[26px]"
          >
            <tspan x="12">Field of view,</tspan>
            <tspan x="12" dy="32">degrees</tspan>
          </text>
        </g>

        <g>
          <text
            x="744"
            y="360"
            fill="var(--ink)"
            className="font-[var(--font-mono)] text-[88px] font-bold tracking-[-0.06em]"
          >
            360
          </text>
          <text
            x="748"
            y="402"
            fill="var(--ink)"
            className="font-[var(--font-body)] text-[26px]"
          >
            <tspan x="748">Rotation,</tspan>
            <tspan x="748" dy="32">degrees</tspan>
          </text>
        </g>

        <g textAnchor="middle">
          <text
            x="476"
            y="608"
            fill="var(--ink)"
            className="font-[var(--font-mono)] text-[96px] font-bold tracking-[-0.06em]"
          >
            2K
          </text>
          <text
            x="476"
            y="650"
            fill="var(--ink)"
            className="font-[var(--font-body)] text-[26px]"
          >
            Video resolution
          </text>
        </g>
      </svg>
    </section>
  );
}
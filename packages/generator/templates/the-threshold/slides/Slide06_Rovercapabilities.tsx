import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

export default function Slide06({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  const scanArrowId = `${slide.id}-scan-arrow`;

  const metrics = [
    {
      value: '5,000',
      label: 'Up to square feet',
      body: "Amazon's claimed coverage: 465 square meters.",
    },
    {
      value: '4K',
      label: 'Up to video resolution',
      body: 'Livestreaming and recording while patrolling or scanning.',
    },
    {
      value: '360',
      label: 'Scan, degrees',
      body: 'Performed at a designated location.',
    },
  ];

  return (
    <section className="flex flex-col h-full min-h-0 w-full text-[var(--ink)]">
      <header className="shrink-0">
        <p className="font-[var(--font-mono)] text-[20px] leading-[26px] tracking-[0.16em] text-[var(--accent)]">
          BUSINESS PATROL
        </p>

        <h1 className="mt-3 font-[var(--font-headline)] text-[60px] font-bold leading-[1.04] tracking-[-0.035em]">
          Rover Trades Flight
          <br />
          for Floor Coverage
        </h1>

        <p className="mt-4 max-w-[900px] font-[var(--font-body)] text-[26px] leading-[34px]">
          Amazon claims indoor coverage alongside high-resolution video and
          stationary scanning.
        </p>
      </header>

      <figure className="mt-6 h-[400px] w-full shrink-0">
        <svg
          viewBox="0 0 952 400"
          className="block h-full w-full"
          role="img"
          aria-label="Schematic business floor plan, not to scale. A rover at a designated scan point has a complete circular sweep contained within an open room. No coverage area or visibility through walls is depicted."
        >
          <defs>
            <marker
              id={scanArrowId}
              markerWidth="10"
              markerHeight="10"
              refX="7"
              refY="4"
              orient="auto"
              markerUnits="userSpaceOnUse"
            >
              <path d="M0 0 8 4 0 8" fill="var(--accent)" />
            </marker>
          </defs>

          <text
            x="40"
            y="24"
            fill="var(--ink)"
            className="font-[var(--font-mono)] text-[20px] tracking-[0.08em]"
          >
            SCHEMATIC · NOT TO SCALE
          </text>

          {/* Architectural walls; openings remain visibly unobstructed. */}
          <g
            fill="none"
            stroke="var(--ink)"
            strokeWidth="4"
            strokeLinecap="square"
            strokeLinejoin="miter"
          >
            <path d="M40 58H912V358H550M450 358H40V58" />
            <path d="M330 58V146M330 220V358" />
            <path d="M670 58V244M670 318V358" />
            <path d="M40 208H170M244 208H330" />
            <path d="M670 174H760M834 174H912" />
          </g>

          {/* Door leaves and swing arcs describe access, not camera rays. */}
          <g
            fill="none"
            stroke="var(--border)"
            strokeWidth="2"
          >
            <path d="M330 146H256M256 146A74 74 0 0 0 330 220" />
            <path d="M670 318H744M744 318A74 74 0 0 0 670 244" />
            <path d="M170 208V282M170 282A74 74 0 0 0 244 208" />
            <path d="M834 174V100M834 100A74 74 0 0 0 760 174" />
            <path d="M450 358V258M450 258A100 100 0 0 1 550 358" />
          </g>

          {/* Sparse furnishings establish the business-plan context. */}
          <g
            fill="none"
            stroke="var(--border)"
            strokeWidth="2"
          >
            <rect x="76" y="92" width="126" height="54" />
            <path d="M96 157H130M96 163H130M150 157H184M150 163H184" />
            <rect x="78" y="270" width="52" height="54" />
            <rect x="252" y="270" width="42" height="54" />
            <rect x="704" y="88" width="40" height="48" />
            <rect x="854" y="88" width="30" height="48" />
            <rect x="784" y="230" width="88" height="90" rx="12" />
            <path d="M772 246V270M772 284V308M884 246V270M884 284V308" />
          </g>

          {/* A complete rotational sweep, entirely inside the central room. */}
          <circle
            cx="500"
            cy="188"
            r="100"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="2.5"
          />

          <path
            d="M576.6 123.7A100 100 0 0 1 600 188"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="3"
            markerEnd={`url(#${scanArrowId})`}
          />

          <g stroke="var(--accent)" strokeWidth="2">
            <path d="M500 80V96M500 280V296M392 188H408M592 188H608" />
          </g>

          {/* Top-down rover: chassis, wheels, mast and camera. */}
          <g>
            <rect
              x="458"
              y="171"
              width="12"
              height="44"
              rx="4"
              fill="var(--ink)"
            />
            <rect
              x="530"
              y="171"
              width="12"
              height="44"
              rx="4"
              fill="var(--ink)"
            />
            <rect
              x="469"
              y="160"
              width="62"
              height="65"
              rx="19"
              fill="var(--surface)"
              stroke="var(--ink)"
              strokeWidth="2.5"
            />
            <path
              d="M500 181V148"
              stroke="var(--ink)"
              strokeWidth="6"
              strokeLinecap="round"
            />
            <rect
              x="478"
              y="138"
              width="44"
              height="23"
              rx="7"
              fill="var(--ink)"
            />
            <circle cx="500" cy="149.5" r="5" fill="var(--accent)" />
            <circle
              cx="500"
              cy="195"
              r="9"
              fill="none"
              stroke="var(--accent)"
              strokeWidth="2"
            />
            <circle cx="500" cy="195" r="3" fill="var(--accent)" />
          </g>

          <path
            d="M585 242L631 274V376H610"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="1.5"
          />
          <circle cx="585" cy="242" r="3.5" fill="var(--accent)" />

          <text
            x="598"
            y="383"
            textAnchor="end"
            fill="var(--accent)"
            className="font-[var(--font-mono)] text-[20px]"
          >
            Designated location
          </text>
        </svg>
      </figure>

      <div className="mt-6 grid shrink-0 grid-cols-3 border-t-2 border-[var(--ink)] pt-5">
        {metrics.map((metric, index) => (
          <div
            key={metric.value}
            className={
              index === 0
                ? 'min-w-0 pr-6'
                : 'min-w-0 border-l border-[var(--border)] px-6 last:pr-0'
            }
          >
            <p className="whitespace-nowrap font-[var(--font-mono)] text-[88px] font-bold leading-[96px] tracking-[-0.065em] text-[var(--accent)]">
              {metric.value}
            </p>

            <p className="mt-2 min-h-[56px] font-[var(--font-mono)] text-[22px] leading-[28px]">
              {metric.label}
            </p>

            <p className="mt-2 font-[var(--font-body)] text-[24px] leading-[32px]">
              {metric.body}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
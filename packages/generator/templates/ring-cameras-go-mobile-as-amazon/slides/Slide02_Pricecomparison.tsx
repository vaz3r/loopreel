import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

export default function Slide02({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  void brand;

  return (
    <section
      className="flex flex-col h-full min-h-0 w-full text-[var(--ink)]"
      data-slide-id={slide.id}
      data-total-slides={totalSlides}
      aria-labelledby="slide02-headline"
    >
      <div className="shrink-0">
        <p className="font-[var(--font-mono)] text-[22px] tracking-[0.16em] text-[var(--accent)]">
          THE HARDWARE BILL
        </p>

        <h2
          id="slide02-headline"
          className="mt-7 max-w-[920px] font-[var(--font-headline)] text-[68px] font-bold leading-[1.04] tracking-[-0.045em]"
        >
          Flight And Wheels,
          <br />
          Different Prices
        </h2>

        <p className="mt-8 max-w-[760px] font-[var(--font-body)] text-[28px] leading-snug">
          Drone targets home monitoring; Rover is designed for business.
        </p>
      </div>

      <svg
        viewBox="0 0 952 1000"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-labelledby="slide02-ledger-title slide02-ledger-description"
        className="mt-16 block w-full shrink-0"
        fill="none"
      >
        <title id="slide02-ledger-title">The hardware bill</title>
        <desc id="slide02-ledger-description">
          Ring Drone Cam starting price: $250. Ring Rover Cam price: $1,000.
        </desc>

        {/* Equal-height, edge-to-edge ledger bands; no rounded cards. */}
        <path
          d="M0 0H952V500H0Z M0 500H952V1000H0Z"
          fill="var(--surface)"
        />

        <g stroke="var(--border)" strokeWidth="2">
          <path d="M0 1H952M0 999H952" />
          <path d="M44 128H908M44 628H908" />
          <path d="M44 414H908M44 914H908" />
        </g>

        <path d="M0 500H952" stroke="#FF4D00" strokeWidth="4" />

        {/* Flight-path glyph: dotted approach, orbit, directional tip. */}
        <g
          transform="translate(44 38)"
          stroke="var(--accent)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path
            d="M3 62C24 62 29 22 61 22"
            strokeDasharray="3 9"
          />
          <path d="M61 22C88 22 107 51 88 65C69 79 44 54 61 38C75 25 101 32 128 12" />
          <path d="M110 12H128V30" />
          <circle cx="3" cy="62" r="4" fill="var(--accent)" stroke="none" />
        </g>

        <g fill="var(--ink)">
          <text
            x="44"
            y="244"
            className="font-[var(--font-headline)] text-[36px] font-semibold"
          >
            Ring Drone Cam
          </text>
          <text
            x="44"
            y="290"
            className="font-[var(--font-body)] text-[26px]"
          >
            starting price
          </text>
        </g>

        <text
          x="908"
          y="290"
          textAnchor="end"
          fill="var(--accent)"
          className="font-[var(--font-mono)] text-[112px] font-bold tracking-[-0.06em]"
        >
          $250
        </text>

        {/* Wheel-track glyph: paired treads and a compact wheel axle. */}
        <g
          transform="translate(44 538)"
          stroke="var(--accent)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M3 23H83M3 59H83" strokeDasharray="3 10" />
          <path d="M105 27V55" />
          <rect x="93" y="11" width="25" height="16" rx="4" />
          <rect x="93" y="55" width="25" height="16" rx="4" />
          <path d="M105 41H133M125 33L133 41L125 49" />
        </g>

        <g fill="var(--ink)">
          <text
            x="44"
            y="744"
            className="font-[var(--font-headline)] text-[36px] font-semibold"
          >
            Ring Rover Cam
          </text>
          <text
            x="44"
            y="790"
            className="font-[var(--font-body)] text-[26px]"
          >
            price
          </text>
        </g>

        <text
          x="908"
          y="790"
          textAnchor="end"
          fill="var(--accent)"
          className="font-[var(--font-mono)] text-[112px] font-bold tracking-[-0.06em]"
        >
          $1,000
        </text>

        {/* Matching ledger registration ticks maintain visual parity. */}
        <g stroke="var(--accent)" strokeWidth="3">
          <path d="M44 414H92M860 414H908" />
          <path d="M44 914H92M860 914H908" />
        </g>
      </svg>
    </section>
  );
}
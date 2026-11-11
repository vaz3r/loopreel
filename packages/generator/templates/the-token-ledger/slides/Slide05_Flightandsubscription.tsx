import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

export default function Slide05({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  void brand;

  return (
    <section
      className="flex flex-col h-full min-h-0 w-full text-[var(--ink)]"
      aria-labelledby="slide-05-headline"
      data-slide-id={slide.id}
      data-total-slides={totalSlides}
    >
      <header className="shrink-0">
        <div className="flex items-center gap-4">
          <span
            aria-hidden="true"
            className="h-[3px] w-12 bg-[var(--accent)]"
          />
          <p className="font-[var(--font-mono)] text-[20px] leading-7 tracking-[0.16em] text-[var(--accent)]">
            THE FLIGHT CONDITIONS
          </p>
        </div>

        <h2
          id="slide-05-headline"
          className="mt-5 max-w-[920px] font-[var(--font-headline)] text-[64px] font-bold leading-[1.04] tracking-[-0.045em]"
        >
          Eight Minutes, With
          <br />
          Conditions Attached
        </h2>

        <p className="mt-5 max-w-[900px] font-[var(--font-body)] text-[26px] leading-[1.35]">
          Flight duration is conditional; scheduled routes require an Amazon
          Ring Protect subscription.
        </p>
      </header>

      <figure className="mt-7 shrink-0 border-t border-[var(--border)] pt-5">
        <svg
          viewBox="0 0 952 374"
          className="block h-[374px] w-full"
          role="img"
          aria-labelledby="slide-05-duration"
        >
          <title id="slide-05-duration">8 minutes</title>

          {/* A single, custom outlined numeral with two open counters. */}
          <path
            fill="var(--accent)"
            fillRule="evenodd"
            d="
              M 169 8
              C 252 8 304 44 304 105
              C 304 139 288 162 259 178
              C 297 195 318 223 318 262
              C 318 330 260 366 169 366
              C 78 366 20 330 20 262
              C 20 223 41 195 79 178
              C 50 162 34 139 34 105
              C 34 44 86 8 169 8
              Z

              M 169 68
              C 130 68 109 83 109 109
              C 109 135 130 150 169 150
              C 208 150 229 135 229 109
              C 229 83 208 68 169 68
              Z

              M 169 210
              C 124 210 100 227 100 257
              C 100 288 124 306 169 306
              C 214 306 238 288 238 257
              C 238 227 214 210 169 210
              Z
            "
          />

          <text
            x="374"
            y="174"
            fill="var(--ink)"
            className="font-[var(--font-headline)] text-[64px] font-bold tracking-[-0.035em]"
          >
            minutes
          </text>

          {/* A short flight trace terminates inside an unadorned dock. */}
          <g
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path
              d="M 378 260 C 442 260 455 222 509 222 C 563 222 575 282 632 282 H 814"
              stroke="var(--accent)"
              strokeWidth="3"
            />
            <circle
              cx="378"
              cy="260"
              r="6"
              fill="var(--accent)"
              stroke="none"
            />
            <path
              d="M 766 270 V 305 H 862 V 270
                 M 752 305 H 876 V 322 H 752 Z"
              stroke="var(--ink)"
              strokeWidth="3"
            />
            <path
              d="M 814 262 V 282"
              stroke="var(--accent)"
              strokeWidth="3"
            />
          </g>
        </svg>

        <figcaption className="mt-5 max-w-[850px] border-l-[3px] border-[var(--accent)] pl-6 font-[var(--font-body)] text-[28px] leading-[1.35]">
          Flight limit: new, fully-charged battery under controlled conditions.
        </figcaption>
      </figure>

      <aside className="mt-auto shrink-0 pt-7">
        <div className="grid grid-cols-[290px_minmax(0,1fr)] gap-6 border-y border-[var(--border)] bg-[var(--surface)] px-8 py-7">
          <h3 className="font-[var(--font-headline)] text-[34px] font-semibold leading-[1.12] tracking-[-0.025em]">
            Scheduled
            <br />
            Routes
          </h3>

          <p className="border-l border-[var(--border)] pl-7 font-[var(--font-body)] text-[26px] leading-[1.35]">
            Set-route and scheduled patrol capability requires an{' '}
            <span className="text-[var(--accent)]">
              Amazon Ring Protect subscription.
            </span>
          </p>
        </div>
      </aside>
    </section>
  );
}
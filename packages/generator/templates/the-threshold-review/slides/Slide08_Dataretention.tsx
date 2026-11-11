import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

export default function Slide08({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  void brand;
  void totalSlides;

  return (
    <section className="flex flex-col h-full min-h-0 w-full text-[var(--ink)]">
      <header className="shrink-0">
        <p className="font-[var(--font-mono)] text-[20px] uppercase tracking-[0.14em] text-[var(--accent)]">
          {slide.kicker}
        </p>

        <h1 className="mt-5 max-w-[920px] font-[var(--font-headline)] text-[64px] font-bold leading-[1.04] tracking-[-0.035em]">
          {slide.headline}
        </h1>

        <p className="mt-5 max-w-[900px] font-[var(--font-body)] text-[26px] leading-snug">
          {slide.subheadline}
        </p>
      </header>

      <figure className="mt-7 shrink-0 border-t border-[var(--border)] pt-5">
        <figcaption className="font-[var(--font-headline)] text-[34px] font-semibold leading-tight">
          {slide.items?.[0]?.title ?? 'Rover event retention'}
        </figcaption>

        <svg
          viewBox="0 0 952 420"
          className="mt-3 block h-[420px] w-full text-[var(--ink)]"
          role="img"
          aria-label="Doorbell-ring, motion-event and Live View videos: cloud storage up to 180 days."
        >
          {/* One source, with all three event types grouped together. */}
          <g
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect
              x="392"
              y="24"
              width="112"
              height="100"
              rx="16"
              fill="var(--surface, #D6DFD5)"
            />
            <circle cx="448" cy="65" r="25" />
            <circle cx="448" cy="65" r="11" />
            <path d="M430 106H466M448 125V141M416 142H480" />

            <path d="M505 74H540" stroke="var(--border, #A0AFA3)" />

            <path d="M448 157V213" />
            <path d="M440 204L448 213L456 204" />
          </g>

          <text
            x="562"
            y="49"
            fill="currentColor"
            className="font-[var(--font-body)] text-[26px]"
          >
            <tspan x="562" dy="0">
              Doorbell-ring, motion-event
            </tspan>
            <tspan x="562" dy="34">
              and Live View videos:
            </tspan>
          </text>

          {/* The archive is a destination, not a deletion countdown. */}
          <path
            d="
              M322 354
              C281 354 256 330 256 299
              C256 270 276 247 305 243
              C312 205 343 181 380 187
              C405 154 454 150 483 179
              C514 172 548 192 556 225
              C594 221 625 249 625 284
              C653 291 670 313 661 334
              C655 348 640 354 619 354
              Z
            "
            fill="var(--surface, #D6DFD5)"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinejoin="round"
          />

          <g
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M411 229H485V265H411Z" />
            <path d="M405 229H491V239H405Z" />
            <path d="M437 251H459" />
          </g>

          <text
            x="448"
            y="313"
            textAnchor="middle"
            fill="currentColor"
            className="font-[var(--font-body)] text-[28px]"
          >
            cloud storage
          </text>

          {/* A bounded retention annotation, without a deletion endpoint. */}
          <path
            d="M681 226H700V354H681M700 290H721"
            fill="none"
            stroke="var(--accent, #9B254D)"
            strokeWidth="3"
            strokeLinecap="square"
          />

          <text
            x="741"
            y="270"
            fill="var(--accent, #9B254D)"
            className="font-[var(--font-mono)] text-[24px]"
          >
            <tspan x="741">up to</tspan>
            <tspan
              x="741"
              dy="40"
              className="text-[32px] font-semibold"
            >
              180 days.
            </tspan>
          </text>

          {/* No outgoing flow: the unspecified ledger is not a lifecycle step. */}
          <path
            d="M256 393H670"
            stroke="var(--border, #A0AFA3)"
            strokeWidth="1.5"
          />
        </svg>
      </figure>

      <div className="relative mt-1 shrink-0 pl-8 pr-7 pb-5 pt-6">
        {/* Intentionally open along the bottom and right edges. */}
        <svg
          viewBox="0 0 952 202"
          preserveAspectRatio="none"
          className="pointer-events-none absolute inset-0 h-full w-full"
          aria-hidden="true"
        >
          <path
            d="M1 201V1H951"
            fill="none"
            stroke="var(--border, #A0AFA3)"
            strokeWidth="2"
            vectorEffect="non-scaling-stroke"
          />
          <path
            d="M1 1H75"
            fill="none"
            stroke="var(--accent, #9B254D)"
            strokeWidth="3"
            vectorEffect="non-scaling-stroke"
          />
        </svg>

        <h2 className="relative font-[var(--font-headline)] text-[34px] font-semibold leading-tight">
          {slide.items?.[1]?.title ?? slide.items?.[0]?.title ?? 'Unspecified schedules'}
        </h2>

        <p className="relative mt-4 max-w-[850px] font-[var(--font-body)] text-[26px] leading-snug">
          {slide.items?.[1]?.body ?? slide.items?.[0]?.body ?? slide.subheadline}
        </p>
      </div>
    </section>
  );
}
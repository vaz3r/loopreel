import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

export default function Slide10({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  return (
    <section className="flex h-full max-h-[1028px] w-full min-w-0 flex-col justify-between gap-6 text-[var(--ink)]">
      <header className="shrink-0">
        <div className="mb-6 flex items-center gap-3">
          <span className="h-2.5 w-2.5 bg-[var(--accent)]" />
          <p className="font-[var(--font-mono)] text-sm font-medium tracking-[0.2em] text-[var(--accent)]">
            THE BUYING TEST
          </p>
          <span className="h-px flex-1 bg-[var(--border)]" />
        </div>

        <h1 className="max-w-[850px] font-[var(--font-headline)] text-[48px] font-semibold leading-[1.05] tracking-[-0.045em]">
          Buy The Benefits,
          <br />
          <span className="text-[var(--accent)]">Not The Badge</span>
        </h1>

        <p className="mt-5 max-w-[760px] font-[var(--font-body)] text-[22px] leading-[1.4]">
          Choose this Pro for its display, ports, and sustained
          performance—not for Apple’s newest design.
        </p>
      </header>

      <figure
        aria-hidden="true"
        className="relative h-[280px] shrink-0 border-y border-[var(--border)]"
      >
        <svg
          viewBox="0 0 952 280"
          fill="none"
          className="h-full w-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Quiet construction grid. */}
          <g
            stroke="var(--border)"
            strokeWidth="1"
            strokeDasharray="3 7"
            opacity="0.6"
          >
            <path d="M80 24V256M872 24V256M476 18V262" />
            <path d="M24 140H928" />
          </g>

          {/* Display, seen as an industrial object rather than a badge. */}
          <path
            d="M282 38H670C678 38 684 44 684 52V214H268V52C268 44 274 38 282 38Z"
            fill="var(--surface)"
            stroke="var(--ink)"
            strokeWidth="2"
          />
          <path
            d="M282 53H435V59C435 63 438 66 442 66H510C514 66 517 63 517 59V53H670V200H282V53Z"
            fill="var(--ink)"
          />

          {/* Smooth cadence expressed as an original vector study. */}
          <g stroke="var(--surface)" strokeWidth="1.2" opacity="0.32">
            <path d="M302 177C365 177 368 83 431 83S497 177 560 177S610 83 650 83" />
            <path d="M302 167C365 167 368 93 431 93S497 167 560 167S610 93 650 93" />
            <path d="M302 157C365 157 368 103 431 103S497 157 560 157S610 103 650 103" />
            <path d="M302 147C365 147 368 113 431 113S497 147 560 147S610 113 650 113" />
          </g>
          <path
            d="M302 137C365 137 368 123 431 123S497 137 560 137S610 123 650 123"
            stroke="var(--accent)"
            strokeWidth="3"
          />

          {/* Machined base and port details. */}
          <path
            d="M268 214H684L752 237H200L268 214Z"
            fill="var(--surface)"
            stroke="var(--ink)"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <path
            d="M200 237H752L742 246H210L200 237Z"
            fill="var(--border)"
            stroke="var(--ink)"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <path
            d="M427 214H525L540 225H412L427 214Z"
            stroke="var(--border)"
            strokeWidth="1.5"
          />
          <g stroke="var(--ink)" strokeWidth="2" strokeLinecap="round">
            <path d="M250 241H268M278 241H296M307 241H320" />
          </g>

          {/* Callout geometry without adding unlocked labels. */}
          <g stroke="var(--accent)" strokeWidth="1.5">
            <path d="M637 106H770L806 70H850" />
            <path d="M286 241H148L112 205H80" />
            <circle cx="637" cy="106" r="5" fill="var(--ink)" />
            <circle cx="286" cy="241" r="5" fill="var(--surface)" />
            <path d="M841 61L850 70L841 79M89 196L80 205L89 214" />
          </g>
        </svg>
      </figure>

      <div className="grid shrink-0 grid-cols-2 gap-5">
        <article className="min-w-0 border-t-2 border-[var(--accent)] bg-[var(--surface)] px-6 py-5">
          <div className="mb-3 flex items-center justify-between gap-4">
            <h2 className="font-[var(--font-headline)] text-[25px] font-semibold leading-tight tracking-[-0.025em]">
              The strongest fit
            </h2>
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
              className="h-6 w-6 shrink-0 text-[var(--accent)]"
            >
              <path
                d="m5 12 4.5 4.5L19 7"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="square"
              />
            </svg>
          </div>
          <p className="font-[var(--font-body)] text-lg leading-snug">
            Buyers seeking Apple’s cheapest laptop with 120 Hz ProMotion or
            optional $150 nano-texture.
          </p>
        </article>

        <article className="min-w-0 border-t-2 border-[var(--border)] bg-[var(--surface)] px-6 py-5">
          <div className="mb-3 flex items-center justify-between gap-4">
            <h2 className="font-[var(--font-headline)] text-[25px] font-semibold leading-tight tracking-[-0.025em]">
              The weakest fit
            </h2>
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
              className="h-6 w-6 shrink-0"
            >
              <path
                d="M6 6L18 18M18 6L6 18"
                stroke="currentColor"
                strokeWidth="1.5"
              />
            </svg>
          </div>
          <p className="font-[var(--font-body)] text-lg leading-snug">
            Buyers who do not need mandatory 1TB storage or expect OLED and
            touch.
          </p>
        </article>
      </div>

      <div className="flex shrink-0 items-center justify-between gap-8 border-t border-[var(--border)] pt-6">
        <p className="max-w-[770px] font-[var(--font-headline)] text-[38px] font-medium leading-[1.12] tracking-[-0.035em]">
          Are those Pro benefits worth{' '}
          <span className="whitespace-nowrap text-[var(--accent)]">$1,999</span>{' '}
          to you?
        </p>
        <div
          aria-hidden="true"
          className="flex h-[72px] w-[72px] shrink-0 items-center justify-center rounded-full border border-[var(--accent)] text-[var(--accent)]"
        >
          <svg viewBox="0 0 40 40" fill="none" className="h-10 w-10">
            <path
              d="M9 31L31 9M10 9H31V30"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="square"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}
import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

export default function Slide01({ slide }: SlideComponentProps) {
  const palette = {
    '--paper': '#101923',
    '--ink': '#EEF0EB',
    '--accent': '#D9B45B',
    '--surface': '#1C2A36',
    '--border': '#445563',
  } as React.CSSProperties;

  return (
    <section
      className="flex flex-col h-full min-h-0 w-full text-[var(--ink)]"
      style={palette}
    >
      <div className="flex h-full min-h-0 flex-col bg-[var(--paper)]">
        <div className="relative z-10 flex min-h-[340px] shrink-0 flex-col">
          <div className="mb-6 flex items-center gap-4">
            <span
              aria-hidden="true"
              className="h-[2px] w-12 bg-[var(--accent)]"
            />
            <p className="font-[var(--font-mono)] text-[22px] leading-tight tracking-[0.16em] text-[var(--accent)]">
              {slide.kicker}
            </p>
          </div>

          <h1 className="max-w-[920px] font-[var(--font-headline)] text-[64px] font-bold leading-[1.04] tracking-[-0.035em]">
            {slide.headline}
          </h1>

          <p className="mt-6 max-w-[840px] font-[var(--font-body)] text-[26px] leading-snug">
            {slide.subheadline}
          </p>
        </div>

        <div className="relative mt-6 min-h-0 flex-1">
          <svg
            className="pointer-events-none absolute inset-0 h-full w-full"
            viewBox="0 0 952 640"
            preserveAspectRatio="none"
            fill="none"
            aria-hidden="true"
          >
            {/* A fractured diplomatic seam, not a quantitative plot. */}
            <path
              d="M0 256H394L426 280L405 306L438 332L416 358H0Z"
              fill="var(--surface)"
            />
            <path
              d="M952 256H544L522 280L551 305L528 333L551 358H952Z"
              fill="var(--surface)"
            />

            <path
              d="M0 256H394M0 358H416M544 256H952M551 358H952"
              stroke="var(--border)"
              strokeWidth="1"
            />

            <path
              d="M0 306H345L373 294L396 318L414 306"
              stroke="var(--ink)"
              strokeWidth="3"
              strokeLinejoin="miter"
            />
            <path
              d="M548 306L566 294L588 318L609 306H952"
              stroke="var(--ink)"
              strokeWidth="3"
              strokeLinejoin="miter"
            />

            <path
              d="M442 220L422 255L449 281L428 306L460 332L439 360L457 391"
              stroke="var(--accent)"
              strokeWidth="3"
              strokeLinejoin="miter"
            />
            <path
              d="M507 220L491 253L518 280L497 306L529 333L509 361L525 391"
              stroke="var(--accent)"
              strokeWidth="3"
              strokeLinejoin="miter"
            />

            {/* Edge annotations connect without entering their text zones. */}
            <path
              d="M38 190V222H220L304 306"
              stroke="var(--border)"
              strokeWidth="2"
            />
            <circle cx="304" cy="306" r="7" fill="var(--accent)" />
            <circle
              cx="304"
              cy="306"
              r="15"
              stroke="var(--accent)"
              strokeWidth="1"
            />

            <path
              d="M648 306L728 390H914V426"
              stroke="var(--border)"
              strokeWidth="2"
            />
            <circle cx="648" cy="306" r="7" fill="var(--accent)" />
            <circle
              cx="648"
              cy="306"
              r="15"
              stroke="var(--accent)"
              strokeWidth="1"
            />

            <path
              d="M0 290V322M952 290V322"
              stroke="var(--accent)"
              strokeWidth="4"
            />
          </svg>

          <div className="absolute left-0 top-0 w-[440px] border-l-2 border-[var(--accent)] pl-6">
            <h2 className="font-[var(--font-mono)] text-[32px] font-semibold leading-tight tracking-[-0.035em] text-[var(--accent)]">
              28 February 2026
            </h2>
            <p className="mt-3 font-[var(--font-body)] text-[26px] leading-snug">
              Reported start of US–Israeli strikes and war with Iran and
              regional allies.
            </p>
          </div>

          <div className="absolute bottom-6 right-0 w-[440px] border-r-2 border-[var(--accent)] pr-6 text-right">
            <h2 className="font-[var(--font-headline)] text-[34px] font-semibold leading-tight">
              Opening strikes
            </h2>
            <p className="mt-3 font-[var(--font-body)] text-[26px] leading-snug">
              Hundreds of air strikes across Iran; no exact count supplied.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
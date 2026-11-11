import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

export default function Slide08({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  const headingId = React.useId();

  void slide;
  void brand;
  void totalSlides;

  return (
    <section
      aria-labelledby={headingId}
      className="flex flex-col h-full min-h-0 w-full text-[var(--ink)]"
    >
      <header className="shrink-0">
        <p className="font-[var(--font-mono)] text-[22px] uppercase tracking-[0.16em] text-[var(--accent)]">
          AFTER THE PATROL
        </p>

        <h2
          id={headingId}
          className="mt-5 max-w-[900px] font-[var(--font-headline)] text-[68px] font-bold leading-[1.04] tracking-[-0.045em]"
        >
          Recording Outlasts
          <br />
          the Patrol
        </h2>

        <p className="mt-6 max-w-[870px] font-[var(--font-body)] text-[28px] leading-snug">
          Rover cloud retention is specified; a separate drone retention period
          is not.
        </p>
      </header>

      <div className="mt-9 flex min-h-0 flex-1 flex-col border-t-2 border-[var(--ink)]">
        <article className="flex flex-1 flex-col justify-center border-b border-[var(--border)] bg-[var(--surface)] px-8 py-6">
          <h3 className="font-[var(--font-headline)] text-[36px] font-semibold leading-tight tracking-[-0.025em]">
            Rover: up to 180 days
          </h3>

          <svg
            viewBox="0 0 888 160"
            className="my-3 block h-[160px] w-full shrink-0"
            role="img"
            aria-label="Cloud archive with a retention bar labeled up to 180 days."
          >
            <g
              fill="none"
              stroke="var(--ink)"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M38 88H105C123 88 134 77 134 62C134 47 123 36 108 36C103 18 89 11 74 15C60 18 51 29 49 43C31 40 18 50 18 65C18 79 26 88 38 88Z" />
              <path d="M48 102H111V140H48Z" />
              <path d="M42 96H117V107H42Z" fill="var(--surface)" />
              <path d="M71 119H88" />
            </g>

            <path
              d="M150 113H189"
              fill="none"
              stroke="var(--border)"
              strokeWidth="2"
            />

            <text
              x="210"
              y="65"
              fill="var(--accent)"
              fontSize="34"
              fontWeight="700"
              className="font-[var(--font-mono)]"
            >
              up to 180 days
            </text>

            <rect
              x="210"
              y="96"
              width="650"
              height="34"
              fill="var(--accent)"
            />

            <g
              stroke="var(--surface)"
              strokeWidth="2"
              opacity="0.65"
            >
              <path d="M318 96V130" />
              <path d="M426 96V130" />
              <path d="M534 96V130" />
              <path d="M642 96V130" />
              <path d="M750 96V130" />
            </g>

            <path
              d="M860 85V141"
              stroke="var(--accent)"
              strokeWidth="3"
            />
          </svg>

          <p className="max-w-[800px] font-[var(--font-body)] text-[26px] leading-snug">
            Cloud-stored videos: doorbell rings, motion events and Live View
            events.
          </p>
        </article>

        <article className="flex flex-1 flex-col justify-center border-b-2 border-[var(--ink)] px-8 py-6">
          <h3 className="font-[var(--font-headline)] text-[36px] font-semibold leading-tight tracking-[-0.025em]">
            Drone: retention not stated
          </h3>

          <div className="mt-6 flex items-center gap-8">
            <svg
              viewBox="0 0 160 180"
              className="block h-[180px] w-[160px] shrink-0"
              role="img"
              aria-label="Outlined document with an em dash indicating that retention is not stated."
            >
              <g
                fill="none"
                stroke="var(--ink)"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M29 15H96L132 51V165H29Z" />
                <path d="M96 15V51H132" />
              </g>

              <path
                d="M53 103H108"
                fill="none"
                stroke="var(--ink)"
                strokeWidth="5"
              />
            </svg>

            <div className="border-l border-dashed border-[var(--border)] py-5 pl-8">
              <p className="max-w-[590px] font-[var(--font-body)] text-[28px] leading-snug">
                The supplied article gives no separate cloud video retention
                period.
              </p>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
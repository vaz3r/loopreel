import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

const milestones = [
  {
    value: '2028',
    label:
      'SpaceX stopped accepting commercial Falcon 9 launch orders for after 2028.',
  },
  {
    value: '2029',
    label: 'Space Force can order Falcon 9 and Falcon Heavy through 2029.',
  },
  {
    value: '2033',
    label:
      'Actual launches under the Space Force contract extend through 2033.',
  },
];

export default function Slide04({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  return (
    <section className="flex flex-col h-full min-h-0 w-full text-[var(--ink)]">
      <header className="shrink-0">
        <div
          aria-hidden="true"
          className="mb-7 flex items-center gap-3"
        >
          <span className="h-[6px] w-20 bg-[var(--accent)]" />
          <span className="h-px flex-1 bg-[var(--border)]" />
        </div>

        <h1 className="max-w-[940px] font-[var(--font-headline)] text-[64px] font-bold leading-[1.04] tracking-[-0.045em]">
          Falcon&apos;s Commercial
          <br />
          Cutoff Isn&apos;t Its End
        </h1>

        <p className="mt-6 max-w-[820px] font-[var(--font-body)] text-[28px] leading-snug">
          Military orders and launches extend beyond the commercial booking
          cutoff.
        </p>
      </header>

      <div className="relative mt-10 shrink-0">
        <svg
          aria-hidden="true"
          focusable="false"
          viewBox="0 0 64 602"
          className="pointer-events-none absolute left-0 top-0 h-[602px] w-16"
          fill="none"
        >
          <path
            d="M32 95V507"
            stroke="var(--border)"
            strokeWidth="2"
          />
          <path
            d="M32 95V301"
            stroke="var(--ink)"
            strokeWidth="3"
            strokeDasharray="5 9"
          />
          <path
            d="M32 301V507"
            stroke="var(--accent)"
            strokeWidth="4"
          />

          <path
            d="M17 95H47"
            stroke="var(--ink)"
            strokeWidth="4"
          />
          <path
            d="M32 83V107"
            stroke="var(--ink)"
            strokeWidth="4"
          />

          <circle
            cx="32"
            cy="301"
            r="12"
            fill="var(--surface)"
            stroke="var(--accent)"
            strokeWidth="3"
          />
          <circle cx="32" cy="301" r="4" fill="var(--accent)" />

          <circle
            cx="32"
            cy="507"
            r="22"
            stroke="var(--accent)"
            strokeWidth="2"
          />
          <circle cx="32" cy="507" r="12" fill="var(--accent)" />

          <path
            d="M48 95H64M48 301H64M54 507H64"
            stroke="var(--border)"
            strokeWidth="2"
          />
        </svg>

        <ol className="m-0 flex list-none flex-col gap-4 p-0">
          {milestones.map((milestone, index) => (
            <li
              key={milestone.value}
              className="grid h-[190px] grid-cols-[64px_minmax(0,1fr)] gap-6"
            >
              <div aria-hidden="true" />

              <div
                className={[
                  'relative grid min-w-0 grid-cols-[236px_minmax(0,1fr)]',
                  'items-center gap-6 border px-7 py-6',
                  index === 2
                    ? 'border-[var(--accent)] bg-[var(--surface)]'
                    : 'border-[var(--border)]',
                ].join(' ')}
              >
                {index === 2 && (
                  <span
                    aria-hidden="true"
                    className="absolute bottom-0 left-0 top-0 w-[5px] bg-[var(--accent)]"
                  />
                )}

                <span
                  className={[
                    'font-[var(--font-mono)] text-[84px] font-bold',
                    'leading-none tracking-[-0.065em] tabular-nums',
                    index === 2
                      ? 'text-[var(--accent)]'
                      : 'text-[var(--ink)]',
                  ].join(' ')}
                >
                  {milestone.value}
                </span>

                <p className="min-w-0 border-l border-[var(--border)] pl-6 font-[var(--font-body)] text-[26px] leading-snug">
                  {milestone.label}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
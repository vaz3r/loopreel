import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

const checks = [
  {
    title: 'Check the Rover’s operating footprint',
    body: 'It is designed for single-floor indoor use, cannot climb stairs and is claimed to cover up to 5,000 square feet (465 square meters).',
    tag: 'Operating footprint',
  },
  {
    title: 'Inspect floor hazards',
    body: 'Amazon lists Rover incompatibilities including curved edges, sunken areas, flooring transitions greater than 1.375 inches (3.5 centimeters), and black glossy floors.',
    tag: 'Floor compatibility',
  },
  {
    title: 'Audit surfaces along drone routes',
    body: 'Drone navigation may degrade around polished marble, wet tile, featureless matte walls, frameless glass and mirrors.',
    tag: 'Navigation conditions',
  },
  {
    title: 'Test the flight-time assumption',
    body: 'The drone’s stated 8 minutes of flight time applies to a new, fully-charged battery under controlled conditions. A docking station provides charging.',
    tag: 'Battery conditions',
  },
];

export default function Slide16({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  return (
    <section
      aria-label={`Slide 16 of ${totalSlides}: Building inspection checklist`}
      data-slide-id={slide.id}
      data-branded={Boolean(brand)}
      className="flex h-full min-h-0 flex-col gap-7 text-[var(--ink)] font-[var(--font-body)]"
    >
      <div className="shrink-0">
        <div className="mb-5 flex items-center gap-3">
          <span className="h-2 w-2 bg-[var(--accent)]" />
          <span className="font-[var(--font-mono)] text-sm font-medium uppercase tracking-[0.2em] text-[var(--accent)]">
            Preflight / Site checklist
          </span>
          <span className="h-px flex-1 bg-[var(--border)]" />
          <span className="font-[var(--font-mono)] text-sm tabular-nums opacity-60">
            04 checks
          </span>
        </div>

        <h1 className="max-w-[920px] font-[var(--font-headline)] text-[64px] font-bold leading-[1.02] tracking-[-0.045em]">
          Inspect the building
          <br />
          before trusting
          <br />
          <span className="text-[var(--accent)]">the patrol</span>
        </h1>
      </div>

      <ol className="m-0 grid min-h-0 flex-1 auto-rows-fr list-none gap-4 p-0">
        {checks.map((check, index) => (
          <li
            key={check.tag}
            className="relative flex items-center gap-6 rounded-xl border border-[var(--border)] bg-[var(--surface)] px-7 py-5 shadow-sm"
          >
            <div
              aria-hidden="true"
              className="flex w-12 shrink-0 flex-col items-center gap-3 self-stretch pt-1"
            >
              <span className="font-[var(--font-mono)] text-sm tabular-nums tracking-widest text-[var(--accent)]">
                {String(index + 1).padStart(2, '0')}
              </span>
              <svg
                viewBox="0 0 40 40"
                fill="none"
                className="h-10 w-10 text-[var(--accent)]"
              >
                <rect
                  x="5"
                  y="5"
                  width="30"
                  height="30"
                  rx="6"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  opacity="0.65"
                />
                <path
                  d="M12 20.5L17.5 26L28 14.5"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="min-h-3 w-px flex-1 bg-[var(--border)]" />
            </div>

            <div className="min-w-0 flex-1">
              <div className="mb-2 font-[var(--font-mono)] text-[11px] font-medium uppercase tracking-[0.18em] text-[var(--accent)]">
                {check.tag}
              </div>
              <h2 className="font-[var(--font-headline)] text-[27px] font-bold leading-[1.12] tracking-[-0.025em]">
                {check.title}
              </h2>
              <p className="mt-2.5 text-[21px] leading-[1.4] opacity-85">
                {check.body}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
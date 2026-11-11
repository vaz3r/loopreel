import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

type Phase = {
  date: string;
  title: string;
  body: string;
};

const defaultPhases: Phase[] = [
  {
    date: 'September 2021',
    title: 'The invitation-only predecessor',
    body: 'Ring’s Always Home Cam briefly became available as a “Day 1 Edition” product. Its $250 starting price matches the forthcoming Ring Drone Cam.',
  },
  {
    date: '2023',
    title: 'The safeguards face scrutiny',
    body: 'The Federal Trade Commission charged Ring with allowing employees and contractors to watch recordings of customers’ private spaces. It also described safeguards that allowed hackers to access 55,000 US customers’ accounts.',
  },
  {
    date: 'November 10',
    title: 'Amazon announces mobile patrols',
    body: 'Amazon introduces the Ring Rover Cam and Ring Drone Cam. Rover shipments are scheduled for December 16, 2026; the drone is targeted for January 27, 2027, pending Federal Communications Commission authorization.',
  },
];

export default function Slide10({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  void brand;

  const content = slide as unknown as {
    headline?: string;
    phases?: Phase[];
  };

  const phases = content.phases?.length ? content.phases : defaultPhases;

  return (
    <section
      aria-label={`Slide 10 of ${totalSlides}: product and privacy timeline`}
      className="flex h-full min-h-0 flex-col justify-between gap-10 text-[var(--ink)]"
    >
      <div className="shrink-0">
        <div className="mb-6 flex items-center gap-4">
          <span className="rounded-full border border-[var(--border)] bg-[var(--surface)] px-4 py-2 font-[var(--font-mono)] text-sm uppercase tracking-[0.18em] text-[var(--accent)]">
            Product / Privacy
          </span>
          <span
            aria-hidden="true"
            className="h-px flex-1 bg-[var(--border)]"
          />
          <svg
            aria-hidden="true"
            viewBox="0 0 48 24"
            fill="none"
            className="h-6 w-12 text-[var(--accent)]"
          >
            <path
              d="M2 12h44M35 3l9 9-9 9"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <circle
              cx="12"
              cy="12"
              r="4"
              className="fill-[var(--surface)]"
              stroke="currentColor"
              strokeWidth="1.5"
            />
          </svg>
        </div>

        <h1 className="max-w-[920px] font-[var(--font-headline)] text-6xl font-bold leading-[1.04] tracking-tight [text-wrap:balance]">
          {content.headline ||
            'A flying camera returns with a privacy history'}
        </h1>
      </div>

      <ol className="relative isolate m-0 flex flex-1 list-none flex-col justify-between gap-6 p-0">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-9 left-[23px] top-9 -z-10 w-px bg-[var(--border)]"
        />

        {phases.map((phase, index) => (
          <li
            key={`${phase.date}-${index}`}
            className="relative grid grid-cols-[48px_minmax(0,1fr)] gap-6"
          >
            <div className="relative flex justify-center pt-8">
              <span
                aria-hidden="true"
                className={`flex h-12 w-12 items-center justify-center rounded-full border font-[var(--font-mono)] text-sm font-bold ${
                  index === phases.length - 1
                    ? 'border-[var(--accent)] bg-[var(--accent)] text-[var(--surface)]'
                    : 'border-[var(--border)] bg-[var(--surface)] text-[var(--accent)]'
                }`}
              >
                {String(index + 1).padStart(2, '0')}
              </span>
            </div>

            <article className="relative overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--surface)] p-8 shadow-sm">
              {index === phases.length - 1 && (
                <span
                  aria-hidden="true"
                  className="absolute inset-y-0 left-0 w-1 bg-[var(--accent)]"
                />
              )}

              <p className="mb-3 font-[var(--font-mono)] text-base font-semibold uppercase tracking-[0.12em] text-[var(--accent)]">
                {phase.date}
              </p>

              <h2 className="mb-3 font-[var(--font-headline)] text-[30px] font-bold leading-tight tracking-tight">
                {phase.title}
              </h2>

              <p className="max-w-[760px] font-[var(--font-body)] text-[22px] leading-[1.5]">
                {phase.body}
              </p>
            </article>
          </li>
        ))}
      </ol>
    </section>
  );
}
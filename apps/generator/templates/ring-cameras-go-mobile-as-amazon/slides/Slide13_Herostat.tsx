import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

export default function Slide13({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  const headingId = React.useId();

  return (
    <section
      aria-labelledby={headingId}
      className="flex h-full flex-col justify-between gap-10 text-[var(--ink)]"
    >
      <div className="space-y-6">
        <div className="inline-flex items-center gap-3 rounded-full border border-[var(--border)] bg-[var(--surface)] px-5 py-2.5">
          <span
            aria-hidden="true"
            className="h-2 w-2 rounded-full bg-[var(--accent)]"
          />
          <span className="font-[var(--font-mono)] text-sm uppercase tracking-[0.18em] text-[var(--accent)]">
            Privacy / The record
          </span>
        </div>

        <h2
          id={headingId}
          className="max-w-[850px] font-[var(--font-headline)] text-5xl font-bold leading-[1.08] tracking-tight"
        >
          The security record behind the security pitch
        </h2>
      </div>

      <div className="relative overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--surface)] p-9 shadow-sm">
        <svg
          aria-hidden="true"
          viewBox="0 0 240 240"
          fill="none"
          className="pointer-events-none absolute -right-12 -top-12 h-64 w-64 text-[var(--accent)] opacity-[0.12]"
        >
          <circle cx="120" cy="120" r="54" stroke="currentColor" />
          <circle cx="120" cy="120" r="84" stroke="currentColor" />
          <circle cx="120" cy="120" r="114" stroke="currentColor" />
          <path
            d="M120 0v240M0 120h240"
            stroke="currentColor"
            strokeDasharray="4 8"
          />
        </svg>

        <div className="relative flex flex-col gap-7">
          <p className="font-[var(--font-mono)] text-sm uppercase tracking-[0.18em] text-[var(--accent)]">
            Ring / FTC investigation / 2023
          </p>

          <p className="whitespace-nowrap font-[var(--font-mono)] text-[154px] font-bold leading-none tracking-[-0.075em] text-[var(--accent)] tabular-nums">
            55,000
          </p>

          <p className="max-w-[660px] font-[var(--font-headline)] text-4xl font-semibold leading-[1.15] tracking-tight">
            US customer accounts
            <br />
            accessed by hackers
          </p>
        </div>
      </div>

      <div className="space-y-7">
        <div className="flex items-center gap-4">
          <span
            aria-hidden="true"
            className="h-px w-12 bg-[var(--accent)]"
          />
          <h3 className="font-[var(--font-mono)] text-sm uppercase tracking-[0.18em] text-[var(--accent)]">
            Why this history matters
          </h3>
        </div>

        <p className="font-[var(--font-body)] text-[28px] leading-[1.5]">
          The FTC’s 2023 investigation described Ring’s lackluster safeguards
          as allowing this access. That history matters as Amazon asks
          customers to admit cameras that can move through—and digitally
          map—their private spaces.
        </p>

        <aside className="rounded-r-xl border-l-4 border-[var(--accent)] bg-[var(--surface)] px-6 py-5">
          <p className="mb-2 font-[var(--font-mono)] text-xs uppercase tracking-[0.16em] text-[var(--accent)]">
            Important distinction
          </p>
          <p className="font-[var(--font-body)] text-xl leading-relaxed">
            This figure concerns Ring’s earlier safeguards, not a reported
            breach of the new Drone Cam or Rover Cam.
          </p>
        </aside>
      </div>
    </section>
  );
}
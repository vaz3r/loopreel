import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

export default function Slide15({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  return (
    <section
      aria-labelledby="slide-15-headline"
      className="flex h-full min-h-0 flex-col gap-8 text-[var(--ink)] font-[var(--font-body)]"
    >
      <div className="shrink-0">
        <div className="mb-6 flex items-center gap-3">
          <span className="h-2 w-2 rounded-full bg-[var(--accent)]" />
          <span className="font-[var(--font-mono)] text-sm uppercase tracking-[0.22em]">
            Principles / Practice
          </span>
        </div>

        <h1
          id="slide-15-headline"
          className="max-w-[900px] font-[var(--font-headline)] text-7xl font-bold leading-[1.02] tracking-[-0.045em]"
        >
          Borrow the function,
          <br />
          <span className="text-[var(--accent)]">not the costume.</span>
        </h1>
      </div>

      <div className="grid min-h-0 flex-1 grid-rows-2 gap-6">
        <article className="flex flex-col justify-between gap-6 rounded-xl border border-[var(--border)] bg-[var(--surface)] p-8 shadow-sm">
          <div className="flex items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[var(--accent)] text-[var(--surface)]">
                <svg
                  aria-hidden="true"
                  width="26"
                  height="26"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="m5 12 4 4L19 6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <h2 className="font-[var(--font-mono)] text-lg font-bold uppercase tracking-[0.18em] text-[var(--accent)]">
                Recommended
              </h2>
            </div>
            <span
              aria-hidden="true"
              className="font-[var(--font-mono)] text-sm opacity-50"
            >
              01
            </span>
          </div>

          <p className="max-w-[800px] text-[29px] leading-[1.45] tracking-[-0.015em]">
            <strong className="font-semibold">
              Specify what each element must accomplish:
            </strong>{' '}
            a screen filters daylight; a partition changes enclosure; an eave
            shelters the opening. These are working relationships, not
            decorative motifs.
          </p>

          <div
            aria-hidden="true"
            className="h-1 w-20 rounded-full bg-[var(--accent)]"
          />
        </article>

        <article className="flex flex-col justify-between gap-6 rounded-xl border border-[var(--border)] bg-[var(--surface)] p-8 shadow-sm">
          <div className="flex items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[var(--border)]">
                <svg
                  aria-hidden="true"
                  width="26"
                  height="26"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="m7 7 10 10M17 7 7 17"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
              <h2 className="font-[var(--font-mono)] text-lg font-bold uppercase tracking-[0.18em]">
                Avoid
              </h2>
            </div>
            <span
              aria-hidden="true"
              className="font-[var(--font-mono)] text-sm opacity-50"
            >
              02
            </span>
          </div>

          <p className="max-w-[800px] text-[29px] leading-[1.45] tracking-[-0.015em]">
            <strong className="font-semibold">
              Do not add a timber platform and call the boundary resolved.
            </strong>{' '}
            An <em>engawa</em> also depends on shelter, exposure-appropriate
            finishes, and drainage away from the building.
          </p>

          <div
            aria-hidden="true"
            className="h-1 w-20 rounded-full bg-[var(--border)]"
          />
        </article>
      </div>
    </section>
  );
}
import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

export default function Slide08({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  const data = slide as unknown as {
    headline: string;
    misconception: { title: string; body: string };
    reality: { title: string; body: string };
    context: string;
  };

  return (
    <section className="flex h-full flex-col justify-between gap-8 text-[var(--ink)] font-[var(--font-body)]">
      <header className="space-y-6">
        <div className="inline-flex items-center gap-3 rounded-full border border-[var(--border)] bg-[var(--surface)] px-4 py-2">
          <span className="h-2 w-2 rounded-full bg-[var(--accent)]" />
          <span className="font-[var(--font-mono)] text-sm uppercase tracking-[0.18em]">
            Capability check
          </span>
        </div>

        <h1 className="max-w-[940px] font-[var(--font-headline)] text-[62px] font-bold leading-[1.05] tracking-[-0.045em]">
          {data.headline}
        </h1>

        <div className="flex items-center gap-4" aria-hidden="true">
          <span className="h-1 w-20 bg-[var(--accent)]" />
          <span className="h-px flex-1 bg-[var(--border)]" />
        </div>
      </header>

      <div className="grid flex-1 grid-cols-2 gap-6">
        <article className="flex flex-col justify-between gap-8 rounded-xl border border-[var(--border)] bg-[var(--surface)] p-8 shadow-sm">
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <span className="font-[var(--font-mono)] text-sm uppercase tracking-[0.2em] opacity-65">
                Myth
              </span>
              <svg
                viewBox="0 0 40 40"
                fill="none"
                className="h-10 w-10 opacity-45"
                aria-hidden="true"
              >
                <circle cx="20" cy="20" r="17" stroke="currentColor" />
                <path
                  d="m14 14 12 12m0-12L14 26"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            <h2 className="font-[var(--font-headline)] text-[34px] font-bold leading-[1.13] tracking-[-0.025em]">
              {data.misconception.title}
            </h2>
          </div>

          <div className="space-y-5 border-t border-[var(--border)] pt-6">
            <span className="inline-block rounded-md border border-[var(--border)] px-3 py-1.5 font-[var(--font-mono)] text-xs uppercase tracking-[0.12em]">
              Unsupported inference
            </span>
            <p className="text-[23px] leading-[1.45] opacity-75">
              {data.misconception.body}
            </p>
          </div>
        </article>

        <article className="relative flex flex-col justify-between gap-8 overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--surface)] p-8 shadow-sm">
          <div
            className="absolute inset-x-0 top-0 h-1 bg-[var(--accent)]"
            aria-hidden="true"
          />

          <div className="space-y-8">
            <div className="flex items-center justify-between text-[var(--accent)]">
              <span className="font-[var(--font-mono)] text-sm uppercase tracking-[0.2em]">
                Reality
              </span>
              <svg
                viewBox="0 0 40 40"
                fill="none"
                className="h-10 w-10"
                aria-hidden="true"
              >
                <circle cx="20" cy="20" r="17" stroke="currentColor" />
                <path
                  d="m12 20 5 5 11-11"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            <h2 className="font-[var(--font-headline)] text-[34px] font-bold leading-[1.13] tracking-[-0.025em]">
              {data.reality.title}
            </h2>
          </div>

          <div className="space-y-5 border-t border-[var(--border)] pt-6">
            <span className="inline-block rounded-md border border-[var(--accent)] px-3 py-1.5 font-[var(--font-mono)] text-xs uppercase tracking-[0.12em] text-[var(--accent)]">
              Reported capabilities
            </span>
            <p className="text-[23px] leading-[1.45] opacity-90">
              {data.reality.body}
            </p>
          </div>
        </article>
      </div>

      <aside className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-8 shadow-sm">
        <div className="border-l-4 border-[var(--accent)] pl-6">
          <h2 className="mb-4 font-[var(--font-mono)] text-sm uppercase tracking-[0.18em] text-[var(--accent)]">
            Separate product. Separate feature.
          </h2>
          <p className="text-[23px] leading-[1.5]">
            {data.context}
          </p>
        </div>
      </aside>
    </section>
  );
}
import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

type DebunkContent = {
  headline?: string;
  myth?: { title?: string; text?: string };
  reality?: { title?: string; text?: string };
};

export default function Slide08({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  const content = slide as unknown as DebunkContent;

  const headline = content.headline ?? 'White walls do not explain the house';
  const myth = {
    title: content.myth?.title ?? 'THE MYTH',
    text:
      content.myth?.text ??
      'A restrained Japanese interior is principally a visual formula: pale surfaces, sparse furniture and nothing out of place.',
  };
  const reality = {
    title: content.reality?.title ?? 'THE REALITY',
    text:
      content.reality?.text ??
      'At Moriyama House, ten white volumes contain a life of films, music, books and informal gatherings. Windows avoid directly facing neighboring windows. The lesson is not compulsory emptiness; it is careful separation that permits both privacy and company.',
  };

  return (
    <section
      aria-label={`Slide 8 of ${totalSlides}: ${headline}`}
      data-brand-context={brand ? 'provided' : undefined}
      className="flex h-full min-h-0 flex-col gap-8 text-[var(--ink)]"
    >
      <div className="shrink-0">
        <div className="mb-6 flex items-center gap-3">
          <span
            aria-hidden="true"
            className="h-2 w-2 rounded-full bg-[var(--accent)]"
          />
          <span className="font-[var(--font-mono)] text-sm uppercase tracking-[0.22em]">
            Beyond the aesthetic
          </span>
        </div>

        <h1 className="max-w-[850px] text-balance font-[var(--font-headline)] text-6xl font-bold leading-[1.04] tracking-[-0.045em]">
          {headline}
        </h1>
      </div>

      <div className="grid min-h-0 flex-1 grid-rows-[0.85fr_1.65fr] gap-6">
        <article className="relative flex flex-col justify-center gap-5 overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--surface)] p-8 shadow-sm">
          <div className="flex items-center justify-between gap-6">
            <h2 className="inline-flex items-center gap-3 font-[var(--font-mono)] text-sm font-bold tracking-[0.2em]">
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                fill="none"
                className="h-6 w-6 text-[var(--accent)]"
              >
                <path
                  d="m7 7 10 10M17 7 7 17"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
              {myth.title}
            </h2>
            <span className="font-[var(--font-mono)] text-xs uppercase tracking-[0.16em] opacity-50">
              Appearance
            </span>
          </div>

          <p className="max-w-[740px] font-[var(--font-body)] text-[28px] leading-[1.45] opacity-65">
            {myth.text}
          </p>
        </article>

        <article className="relative flex flex-col justify-between gap-7 overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--surface)] p-8 shadow-sm">
          <div
            aria-hidden="true"
            className="absolute inset-y-0 left-0 w-1 bg-[var(--accent)]"
          />

          <div className="flex items-center justify-between gap-6">
            <h2 className="inline-flex items-center gap-3 font-[var(--font-mono)] text-sm font-bold tracking-[0.2em] text-[var(--accent)]">
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                fill="none"
                className="h-6 w-6"
              >
                <path
                  d="m5 12 4 4L19 6"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {reality.title}
            </h2>
            <span className="font-[var(--font-mono)] text-xs uppercase tracking-[0.16em] opacity-50">
              Lived experience
            </span>
          </div>

          <p className="max-w-[760px] font-[var(--font-body)] text-[29px] leading-[1.45]">
            {reality.text}
          </p>

          <div className="flex items-center justify-between gap-6 border-t border-[var(--border)] pt-6">
            <span className="font-[var(--font-mono)] text-xs uppercase tracking-[0.18em] opacity-60">
              Moriyama House
            </span>
            <span className="font-[var(--font-headline)] text-2xl italic tracking-tight text-[var(--accent)]">
              Privacy and company.
            </span>
          </div>
        </article>
      </div>
    </section>
  );
}
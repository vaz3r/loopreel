import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

export default function Slide11({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  const content = slide as typeof slide & {
    quote?: string;
    attribution?: string;
    role?: string;
  };

  const quote =
    content.quote ??
    'Before removing another object, draw where someone will sit, what they will see, and where their belongings will go.';

  return (
    <section
      aria-label="An editorial principle from The Tokyo Review"
      className="flex h-full flex-col justify-between gap-12 py-8 text-[var(--ink)]"
    >
      <div className="flex items-center gap-4">
        <span
          aria-hidden="true"
          className="h-2 w-2 rounded-full bg-[var(--accent)]"
        />
        <p className="font-[var(--font-mono)] text-sm uppercase tracking-[0.22em]">
          A principle for living
        </p>
        <div
          aria-hidden="true"
          className="h-px flex-1 bg-[var(--border)]"
        />
      </div>

      <figure className="relative m-0 flex flex-1 flex-col justify-center">
        <span
          aria-hidden="true"
          className="mb-2 block h-28 font-[var(--font-headline)] text-[180px] leading-none text-[var(--accent)]"
        >
          “
        </span>

        <blockquote className="m-0 border-l-4 border-[var(--accent)] pl-8">
          <p className="max-w-[880px] text-balance font-[var(--font-headline)] text-[64px] font-medium italic leading-[1.16] tracking-[-0.035em]">
            {quote}
          </p>
        </blockquote>

        <figcaption className="mt-12 pl-9">
          <p className="font-[var(--font-body)] text-2xl font-semibold tracking-tight">
            {content.attribution ?? 'The Tokyo Review'}
          </p>
          <p className="mt-3 font-[var(--font-mono)] text-sm uppercase tracking-[0.16em] opacity-65">
            {content.role ?? 'Original editorial principle'}
          </p>
        </figcaption>
      </figure>

      <div
        aria-hidden="true"
        className="grid grid-cols-3 divide-x divide-[var(--border)] rounded-xl border border-[var(--border)] bg-[var(--surface)] py-7 shadow-sm"
      >
        {['Sit', 'See', 'Belong'].map((word, index) => (
          <div key={word} className="flex items-center gap-4 px-7">
            <span className="font-[var(--font-mono)] text-sm text-[var(--accent)]">
              {String(index + 1).padStart(2, '0')}
            </span>
            <span className="font-[var(--font-headline)] text-3xl tracking-tight">
              {word}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
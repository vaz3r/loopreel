import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

export default function Slide11({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  void brand;
  void totalSlides;

  const content = slide as {
    headline?: string;
    quote?: string;
    speaker?: string;
    attribution?: string;
    body?: string;
  };

  const headline =
    content.headline ?? 'The promise is absolute. The protection is not.';
  const quote = content.quote ?? 'privacy and security without compromise';
  const speaker = content.speaker ?? 'Amazon';
  const attribution =
    content.attribution ?? 'Describing its new Ring Robotics products';
  const body =
    content.body ??
    'The Electronic Frontier Foundation describes Ring’s Throw Away the Key Encryption as an improvement over its former defaults—but still well short of end-to-end encryption. Amazon’s assurance goes further than that assessment.';

  return (
    <section
      aria-label={headline}
      className="flex h-full min-h-0 flex-col justify-between gap-10 text-[var(--ink)] font-[var(--font-body)]"
    >
      <div className="space-y-7">
        <div className="flex items-center gap-4">
          <span className="h-2 w-2 rounded-full bg-[var(--accent)]" />
          <span className="font-[var(--font-mono)] text-sm uppercase tracking-[0.2em] text-[var(--accent)]">
            Privacy / The promise
          </span>
          <div className="h-px flex-1 bg-[var(--border)]" />
        </div>

        <h1 className="max-w-[900px] font-[var(--font-headline)] text-6xl font-bold leading-[1.05] tracking-[-0.045em]">
          {headline}
        </h1>
      </div>

      <figure className="relative flex flex-1 flex-col justify-center rounded-xl border border-[var(--border)] bg-[var(--surface)] px-10 py-12 shadow-sm">
        <div className="mb-7 flex items-center justify-between">
          <span className="font-[var(--font-mono)] text-xs uppercase tracking-[0.2em] opacity-60">
            In Amazon’s words
          </span>
          <svg
            aria-hidden="true"
            viewBox="0 0 48 36"
            fill="currentColor"
            className="h-9 w-12 text-[var(--accent)]"
          >
            <path d="M0 36V20C0 8 7 1 20 0v7C12 8 9 12 9 18h11v18H0Zm28 0V20C28 8 35 1 48 0v7c-8 1-11 5-11 11h11v18H28Z" />
          </svg>
        </div>

        <blockquote className="border-l-4 border-[var(--accent)] pl-8">
          <p className="max-w-[760px] font-[var(--font-headline)] text-[80px] font-medium italic leading-[1.08] tracking-[-0.045em] [overflow-wrap:anywhere]">
            {quote}
          </p>
        </blockquote>

        <figcaption className="mt-10 flex items-start gap-4 pl-9">
          <span className="mt-3 h-px w-8 shrink-0 bg-[var(--accent)]" />
          <div className="space-y-2">
            <p className="text-2xl font-semibold">{speaker}</p>
            <p className="max-w-[560px] text-lg leading-relaxed opacity-65">
              {attribution}
            </p>
          </div>
        </figcaption>
      </figure>

      <aside className="grid grid-cols-[150px_1fr] gap-7 border-t border-[var(--border)] pt-8">
        <div className="flex items-start gap-3 pt-2">
          <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[var(--accent)]" />
          <h2 className="font-[var(--font-mono)] text-xs uppercase leading-6 tracking-[0.16em] text-[var(--accent)]">
            The
            <br />
            distinction
          </h2>
        </div>
        <p className="text-[25px] leading-[1.5] tracking-[-0.015em]">
          {body}
        </p>
      </aside>
    </section>
  );
}
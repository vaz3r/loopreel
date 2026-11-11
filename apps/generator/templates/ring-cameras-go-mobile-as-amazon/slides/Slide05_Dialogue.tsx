import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

export default function Slide05({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  void brand;

  return (
    <section
      data-slide-id={slide.id}
      aria-label={`Slide 5 of ${totalSlides}: The privacy promise meets the encryption critique`}
      className="flex h-full min-h-0 flex-col justify-between gap-7 font-[var(--font-body)] text-[var(--ink)]"
    >
      <header className="space-y-5">
        <div className="flex items-center gap-3">
          <span className="h-2 w-2 rounded-full bg-[var(--accent)]" />
          <span className="font-[var(--font-mono)] text-sm uppercase tracking-[0.2em] text-[var(--accent)]">
            Privacy / Published positions
          </span>
        </div>

        <h1 className="max-w-[880px] font-[var(--font-headline)] text-6xl font-bold leading-[1.02] tracking-tight">
          The privacy promise
          <br />
          meets the
          <br />
          <span className="text-[var(--accent)]">encryption critique</span>
        </h1>

        <p className="text-xl leading-relaxed opacity-70">
          Contrasting published positions—not a direct conversation.
        </p>
      </header>

      <div className="grid flex-1 grid-rows-[0.9fr_1.1fr] gap-5">
        <article
          aria-labelledby="slide05-amazon"
          className="relative flex flex-col justify-between gap-5 overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--surface)] p-8 shadow-sm"
        >
          <div
            aria-hidden="true"
            className="absolute inset-y-0 left-0 w-1 bg-[var(--accent)]"
          />

          <div className="flex items-center justify-between gap-4">
            <h2
              id="slide05-amazon"
              className="font-[var(--font-headline)] text-2xl font-bold tracking-tight"
            >
              Amazon
            </h2>
            <span className="shrink-0 rounded-full border border-[var(--border)] px-3 py-1 font-[var(--font-mono)] text-xs uppercase tracking-[0.14em] text-[var(--accent)]">
              Direct quote
            </span>
          </div>

          <blockquote className="flex items-start gap-4">
            <span
              aria-hidden="true"
              className="shrink-0 font-[var(--font-headline)] text-8xl leading-[0.85] text-[var(--accent)]"
            >
              “
            </span>
            <p className="max-w-[680px] font-[var(--font-headline)] text-[44px] font-bold leading-[1.08] tracking-tight">
              privacy and security without compromise
            </p>
          </blockquote>

          <p className="border-t border-[var(--border)] pt-4 text-xl leading-relaxed opacity-75">
            Amazon’s description of the new Ring Robotics products points to
            recording indicators and notifications.
          </p>
        </article>

        <article
          aria-labelledby="slide05-eff"
          className="flex flex-col justify-between gap-5 rounded-xl border border-[var(--border)] bg-[var(--surface)] p-8 shadow-sm"
        >
          <div className="flex items-start justify-between gap-4">
            <h2
              id="slide05-eff"
              className="max-w-[520px] font-[var(--font-headline)] text-2xl font-bold leading-tight tracking-tight"
            >
              Electronic Frontier Foundation
            </h2>
            <span className="shrink-0 rounded-full border border-[var(--border)] px-3 py-1 font-[var(--font-mono)] text-xs uppercase tracking-[0.14em] opacity-70">
              Paraphrase
            </span>
          </div>

          <p className="font-[var(--font-headline)] text-[32px] font-medium leading-[1.24] tracking-tight">
            Ring’s Throw Away the Key Encryption improves on its former default
            settings, but{' '}
            <span className="font-bold text-[var(--accent)]">
              remains well short of end-to-end encryption.
            </span>
          </p>

          <p className="border-t border-[var(--border)] pt-4 text-xl leading-relaxed opacity-75">
            Amazon says the new devices’ videos will use this encryption,
            introduced in September 2026.
          </p>
        </article>
      </div>

      <aside
        aria-labelledby="slide05-takeaway"
        className="border-l-4 border-[var(--accent)] py-1 pl-6"
      >
        <h2
          id="slide05-takeaway"
          className="mb-3 font-[var(--font-mono)] text-sm uppercase tracking-[0.18em] text-[var(--accent)]"
        >
          The distinction
        </h2>
        <p className="text-[25px] leading-[1.4] tracking-tight">
          An indicator tells people when recording is active. It does not resolve
          the separate question of{' '}
          <strong className="font-bold">who can access the recording.</strong>
        </p>
      </aside>
    </section>
  );
}
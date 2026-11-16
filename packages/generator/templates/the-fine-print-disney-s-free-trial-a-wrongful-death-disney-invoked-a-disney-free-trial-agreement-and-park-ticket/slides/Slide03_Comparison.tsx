import React from 'react';
import { Building2, FileText, MousePointer2, Tv } from 'lucide-react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

export default function Slide03({ slide, brand, totalSlides }: SlideComponentProps) {
  const items = slide.items ?? [];
  void brand;
  void totalSlides;

  return (
    <section className="flex h-full min-h-0 w-full flex-col justify-between px-1 py-5 text-[var(--ink)]">
      <header className="mb-3 shrink-0">
        <div className="mb-5 flex items-center gap-3">
          <span
            aria-hidden="true"
            className="h-3 w-3 shrink-0 bg-[var(--accent)]"
          />
          <p className="font-[var(--font-mono)] text-[20px] uppercase tracking-[0.16em]">
            {slide.kicker ?? 'THE HIDDEN REACH'}
          </p>
        </div>

        <h1 className="max-w-[900px] font-[var(--font-headline)] text-[58px] font-bold leading-[1.04] tracking-tight">
          {slide.headline ?? 'One Click. More Than Streaming.'}
        </h1>

        <p className="mt-5 max-w-[860px] font-[var(--font-body)] text-[26px] leading-snug line-clamp-2">
          {slide.subheadline ??
            'Disney said “Agree & Continue” accepted linked, broader terms.'}
        </p>
      </header>

      <div className="relative my-3 flex min-h-0 flex-1 items-center justify-center overflow-hidden">
        <div className="relative h-[420px] max-h-full w-full">
          <svg
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 h-full w-full"
            viewBox="0 0 952 420"
            fill="none"
            preserveAspectRatio="xMidYMid meet"
          >
            {/* A red editorial leader follows the linked terms outward. */}
            <path
              d="M 483 248 C 610 248 620 300 716 300"
              stroke="var(--accent)"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="m 704 292 12 8-12 8"
              stroke="var(--accent)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Proofreader’s bracket, not a flowchart container. */}
            <path
              d="M 586 92 h 13 v 227 h -13"
              stroke="var(--accent)"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M 10 35 h 16 M 18 27 v 16 M 620 373 h 16 M 628 365 v 16"
              stroke="var(--border)"
              strokeWidth="1.5"
            />
          </svg>

          <div className="relative grid h-full grid-cols-[64%_36%] items-center">
            <article className="relative ml-8 mr-7 -rotate-[1deg] border-l-2 border-[var(--border)] bg-[var(--surface)] px-8 py-7">
              <div className="mb-7 flex items-center justify-between gap-4 text-[var(--ink)]/65">
                <span className="font-[var(--font-mono)] text-[20px] uppercase tracking-[0.08em]">
                  [§] Consent
                </span>
                <FileText
                  aria-hidden="true"
                  className="h-7 w-7"
                  strokeWidth={1.5}
                />
              </div>

              <p className="font-[var(--font-body)] text-[30px] leading-[1.6]">
                <mark className="bg-[#FEF08A] px-1.5 py-0.5 font-mono font-medium text-[#121212]">
                  Agree &amp; Continue
                </mark>
              </p>

              <div className="mt-6 flex items-start gap-4">
                <MousePointer2
                  aria-hidden="true"
                  className="mt-1 h-8 w-8 shrink-0 text-[var(--accent)]"
                  strokeWidth={1.5}
                />
                <p className="max-w-[340px] font-[var(--font-body)] text-[28px] leading-snug">
                  Linked,{' '}
                  <span className="underline decoration-[var(--accent)] decoration-2 underline-offset-[7px]">
                    broader terms
                  </span>
                </p>
              </div>

              <p className="mt-8 font-[var(--font-mono)] text-[20px] leading-snug text-[var(--ink)]/60">
                Argument schematic
                <br />
                Not a contract reproduction
              </p>
            </article>

            <aside
              aria-label="The asserted reach beyond streaming"
              className="flex h-full flex-col justify-center gap-12 pl-12 pr-3"
            >
              <div className="flex items-center gap-4">
                <Tv
                  aria-hidden="true"
                  className="h-12 w-12 shrink-0 text-[var(--ink)]/70"
                  strokeWidth={1.4}
                />
                <span className="font-[var(--font-mono)] text-[20px] uppercase tracking-[0.06em] text-[var(--ink)]/70">
                  Streaming
                </span>
              </div>

              <div className="relative pl-3">
                <span
                  aria-hidden="true"
                  className="absolute -left-4 top-1 h-full w-px bg-[var(--accent)]"
                />
                <Building2
                  aria-hidden="true"
                  className="mb-4 h-16 w-16 text-[var(--accent)]"
                  strokeWidth={1.3}
                />
                <p className="font-[var(--font-mono)] text-[20px] uppercase leading-snug tracking-[0.06em]">
                  Disney
                  <br />
                  affiliates
                </p>
                <p className="mt-3 font-[var(--font-body)] text-[22px] italic leading-snug text-[var(--ink)]/65">
                  The asserted reach
                </p>
              </div>
            </aside>
          </div>
        </div>
      </div>

      <div className="shrink-0 border-t border-[var(--border)] pt-4">
        <div className="grid grid-cols-[300px_minmax(0,1fr)] items-baseline gap-8 pb-5">
          <h2 className="font-[var(--font-headline)] text-[28px] font-semibold leading-tight">
            {items[0]?.label ?? 'Expected scope'}
          </h2>
          <p className="font-[var(--font-body)] text-[24px] leading-snug line-clamp-2">
            {items[0]?.body ?? 'A streaming account.'}
          </p>
        </div>

        <div className="grid grid-cols-[300px_minmax(0,1fr)] items-baseline gap-8 border-t border-[var(--border)] pt-5">
          <h2 className="font-[var(--font-headline)] text-[28px] font-semibold leading-tight text-[var(--accent)]">
            {items[1]?.label ?? 'Disney’s argument'}
          </h2>
          <p className="font-[var(--font-body)] text-[24px] leading-snug line-clamp-3">
            {items[1]?.body ??
              'Terms reaching related disputes involving Disney affiliates.'}
          </p>
        </div>
      </div>
    </section>
  );
}
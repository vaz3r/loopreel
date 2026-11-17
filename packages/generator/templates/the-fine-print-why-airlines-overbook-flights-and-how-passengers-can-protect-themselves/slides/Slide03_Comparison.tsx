import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';
import { FilePenLine, Plane, Check, ArrowUpRight } from 'lucide-react';

export default function Slide03({ slide, brand, totalSlides }: SlideComponentProps) {
  const items = slide.items ?? [];

  return (
    <section className="flex h-full min-h-0 w-full flex-col justify-between px-1 py-5 text-[var(--ink)]">
      <header className="mb-3 shrink-0">
        <div className="mb-5 flex items-center gap-3">
          <span
            aria-hidden="true"
            className="h-3 w-3 bg-[var(--accent)]"
          />
          <p className="font-[var(--font-mono)] text-[20px] uppercase tracking-[0.16em]">
            {slide.kicker ?? 'THE VOLUNTEER SWITCH'}
          </p>
        </div>

        <h1 className="max-w-[880px] font-[var(--font-headline)] text-[58px] font-bold leading-[1.04] tracking-tight">
          {slide.headline ?? 'Volunteer? Name your terms.'}
        </h1>

        <p className="mt-5 max-w-[850px] font-[var(--font-body)] text-[26px] leading-snug line-clamp-2">
          {slide.subheadline ??
            "You're negotiating a deal—not claiming automatic bumping compensation."}
        </p>
      </header>

      <div className="relative my-3 flex min-h-0 flex-1 items-center justify-center overflow-hidden">
        <div className="relative h-full max-h-[420px] w-full">
          <svg
            aria-hidden="true"
            viewBox="0 0 952 420"
            preserveAspectRatio="xMidYMid meet"
            className="pointer-events-none absolute inset-0 h-full w-full"
            fill="none"
          >
            <path
              d="M14 49V23H40 M14 371v26h26 M912 23h26v26 M912 397h26v-26"
              stroke="var(--border)"
              strokeWidth="2"
            />
            <path
              d="M586 237C637 237 636 170 687 170"
              stroke="var(--accent)"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <path
              d="m675 162 12 8-12 8"
              stroke="var(--accent)"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M62 350C206 343 369 355 552 346"
              stroke="var(--accent)"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>

          <div className="absolute inset-x-8 inset-y-7 grid grid-cols-[minmax(0,1.8fr)_minmax(0,1fr)] items-center gap-16">
            <article className="relative bg-[var(--surface)] px-7 py-7">
              <div className="mb-6 flex items-center justify-between gap-3">
                <p className="font-[var(--font-mono)] text-[20px] uppercase tracking-[0.08em]">
                  Negotiation draft
                </p>
                <FilePenLine
                  aria-hidden="true"
                  className="h-8 w-8 shrink-0 text-[var(--accent)]"
                  strokeWidth={1.5}
                />
              </div>

              <div className="flex items-start gap-4">
                <span className="pt-1 font-[var(--font-mono)] text-[20px] text-[var(--accent)]">
                  [§ 1]
                </span>

                <div className="font-[var(--font-body)] text-[28px] leading-[1.65]">
                  <p>I volunteer</p>
                  <p className="text-[24px] line-through decoration-[var(--accent)] decoration-2">
                    on any terms.
                  </p>
                  <p className="mt-2">
                    <mark className="bg-[#FEF08A] px-1.5 py-0.5 font-mono font-medium text-[#121212]">
                      only on agreed
                    </mark>
                    <br />
                    <mark className="bg-[#FEF08A] px-1.5 py-0.5 font-mono font-medium text-[#121212]">
                      terms.
                    </mark>
                  </p>
                </div>
              </div>

              <p className="mt-6 font-[var(--font-mono)] text-[20px] leading-snug opacity-70">
                Illustrative—not contract text.
              </p>
            </article>

            <aside className="pl-1">
              <Plane
                aria-hidden="true"
                className="mb-5 h-12 w-12 text-[var(--accent)]"
                strokeWidth={1.5}
              />

              <p className="mb-3 font-[var(--font-mono)] text-[20px] uppercase tracking-[0.1em] text-[var(--accent)]">
                Margin note
              </p>

              <h2 className="font-[var(--font-headline)] text-[30px] font-semibold leading-tight">
                The offer is only{' '}
                <span className="underline decoration-[var(--accent)] decoration-2 underline-offset-8">
                  part of the deal.
                </span>
              </h2>

              <p className="mt-5 font-[var(--font-body)] text-[23px] leading-snug">
                Confirm what comes with it before you say yes.
              </p>
            </aside>
          </div>
        </div>
      </div>

      <div className="shrink-0 border-t border-[var(--border)] pt-4">
        <article className="grid grid-cols-[42px_290px_minmax(0,1fr)] items-start gap-5 pb-5">
          <ArrowUpRight
            aria-hidden="true"
            className="mt-1 h-8 w-8 text-[var(--accent)]"
            strokeWidth={1.5}
          />
          <h2 className="font-[var(--font-headline)] text-[28px] font-semibold leading-tight">
            {items[0]?.label ?? 'No federal ceiling'}
          </h2>
          <p className="font-[var(--font-body)] text-[24px] leading-snug line-clamp-3">
            {items[0]?.body ??
              'Volunteer offers have no federal maximum.'}
          </p>
        </article>

        <article className="grid grid-cols-[42px_290px_minmax(0,1fr)] items-start gap-5 border-t border-[var(--border)] pt-5">
          <Check
            aria-hidden="true"
            className="mt-1 h-8 w-8 text-[var(--accent)]"
            strokeWidth={1.5}
          />
          <h2 className="font-[var(--font-headline)] text-[28px] font-semibold leading-tight">
            {items[1]?.label ?? 'Before accepting'}
          </h2>
          <p className="font-[var(--font-body)] text-[24px] leading-snug line-clamp-3">
            {items[1]?.body ??
              'Confirm your next flight, meals, hotel, transfers, voucher limits.'}
          </p>
        </article>
      </div>
    </section>
  );
}
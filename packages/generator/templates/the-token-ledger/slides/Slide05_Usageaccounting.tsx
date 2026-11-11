import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

export default function Slide05({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  return (
    <section className="flex flex-col h-full min-h-0 w-full text-[var(--ink)]">
      <header className="shrink-0">
        <p className="font-[var(--font-mono)] text-[22px] leading-normal tracking-[0.16em] text-[var(--accent)]">
          ACTUAL PROCESSING
        </p>

        <h1 className="mt-4 font-[var(--font-headline)] text-[64px] font-bold leading-[1.06] tracking-[-0.045em]">
          Read The Returned Usage
        </h1>

        <p className="mt-5 max-w-[840px] font-[var(--font-body)] text-[28px] leading-snug">
          The actual processed token count is based on the model’s return.
        </p>
      </header>

      <div className="relative mt-10 h-[680px] w-full shrink-0 bg-[var(--paper,#EAF2EC)]">
        <svg
          className="pointer-events-none absolute inset-0 h-full w-full"
          viewBox="0 0 952 680"
          fill="none"
          aria-hidden="true"
        >
          {/* One continuous receipt, with a perforated lower edge. */}
          <path
            d="
              M 8 8
              H 548
              V 646
              L 533 660 L 518 646 L 503 660 L 488 646
              L 473 660 L 458 646 L 443 660 L 428 646
              L 413 660 L 398 646 L 383 660 L 368 646
              L 353 660 L 338 646 L 323 660 L 308 646
              L 293 660 L 278 646 L 263 660 L 248 646
              L 233 660 L 218 646 L 203 660 L 188 646
              L 173 660 L 158 646 L 143 660 L 128 646
              L 113 660 L 98 646 L 83 660 L 68 646
              L 53 660 L 38 646 L 23 660 L 8 646
              Z
            "
            className="fill-[var(--surface,#DCE8DF)] stroke-[var(--border,#A4B5A9)]"
            strokeWidth="1"
          />

          {/* Ink rules establish exactly two editorial sections. */}
          <path
            d="M 48 66 H 508 M 48 332 H 508 M 48 610 H 508"
            className="stroke-[var(--ink,#291D35)]"
            strokeWidth="2"
          />

          {/* A single margin connector links both returned-usage notes. */}
          <path
            d="M 548 148 H 588 V 424 H 548 M 588 148 H 620 M 588 424 H 620"
            className="stroke-[var(--accent,#6534BC)]"
            strokeWidth="3"
            strokeLinecap="square"
          />
          <circle
            cx="588"
            cy="148"
            r="6"
            className="fill-[var(--accent,#6534BC)]"
          />
          <circle
            cx="588"
            cy="424"
            r="6"
            className="fill-[var(--accent,#6534BC)]"
          />
        </svg>

        <div className="relative grid h-full grid-rows-[276px_276px] pt-[96px]">
          <div className="grid grid-cols-[548px_1fr] gap-[80px]">
            <div className="px-12 pt-7">
              <h2 className="font-[var(--font-headline)] text-[38px] font-semibold leading-tight tracking-[-0.025em]">
                Model return
              </h2>
            </div>

            <aside className="pr-2 pt-7">
              <p className="font-[var(--font-body)] text-[26px] leading-snug">
                The actual processed token count is based on the model’s return.
              </p>
            </aside>
          </div>

          <div className="grid grid-cols-[548px_1fr] gap-[80px]">
            <div className="px-12 pt-7">
              <h2 className="font-[var(--font-headline)] text-[38px] font-semibold leading-tight tracking-[-0.025em]">
                Usage results
              </h2>
            </div>

            <aside className="pr-2 pt-7">
              <p className="font-[var(--font-body)] text-[26px] leading-snug">
                The actual number of processed tokens appears in usage results.
              </p>
            </aside>
          </div>
        </div>
      </div>
    </section>
  );
}
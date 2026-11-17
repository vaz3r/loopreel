import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';
import { FileText, Banknote, PenLine, Check } from 'lucide-react';

export default function Slide06({ slide, brand, totalSlides }: SlideComponentProps) {
  const items = slide.items ?? [];
  void brand;
  void totalSlides;

  return (
    <section className="flex h-full min-h-0 w-full flex-col justify-between py-5 px-1 text-[var(--ink)]">
      <header className="shrink-0 mb-3">
        <div className="mb-5 flex items-center gap-3">
          <span
            aria-hidden="true"
            className="h-3 w-3 shrink-0 bg-[var(--accent)]"
          />
          <p className="font-[var(--font-mono)] text-[20px] uppercase tracking-[0.14em]">
            THE REQUIRED RECEIPTS
          </p>
        </div>

        <h1 className="max-w-[900px] font-[var(--font-headline)] text-[58px] font-bold leading-[1.04] tracking-tight">
          Written rights.
          <br />
          Cash or check.
        </h1>

        <p className="mt-5 max-w-[850px] font-[var(--font-body)] text-[26px] leading-snug line-clamp-2">
          These are enforceable duties—not favors you must beg airlines to grant.
        </p>
      </header>

      <div className="flex-1 min-h-0 relative flex items-center justify-center my-3 overflow-hidden">
        <div className="relative h-[420px] max-h-full w-full">
          <div className="absolute inset-y-4 left-2 w-[68%] rotate-[-1deg] bg-[var(--surface)] px-8 py-6">
            <div className="flex items-center justify-between gap-4 border-b border-[var(--border)] pb-4">
              <div className="flex items-center gap-3">
                <FileText
                  aria-hidden="true"
                  className="h-7 w-7 text-[var(--accent)]"
                  strokeWidth={1.5}
                />
                <span className="font-[var(--font-mono)] text-[20px] uppercase tracking-[0.08em]">
                  Rights abstract
                </span>
              </div>
              <PenLine
                aria-hidden="true"
                className="h-6 w-6 text-[var(--accent)]"
                strokeWidth={1.5}
              />
            </div>

            <p className="mt-3 font-[var(--font-mono)] text-[20px] text-[var(--ink)]/60">
              Plain-language summary
            </p>

            <div className="mt-5">
              <p className="mb-2 font-[var(--font-mono)] text-[20px] text-[var(--ink)]/60">
                [§ NOTICE]
              </p>
              <p className="font-[var(--font-body)] text-[29px] leading-[1.55]">
                <mark className="bg-[#FEF08A] text-[#121212] px-1.5 py-0.5 font-mono font-medium">
                  Written rights
                </mark>
                <br />
                <span className="underline decoration-[var(--accent)] decoration-2 underline-offset-[7px]">
                  + boarding rules.
                </span>
              </p>
            </div>

            <div className="mt-5">
              <p className="mb-2 font-[var(--font-mono)] text-[20px] text-[var(--ink)]/60">
                [§ PAYMENT]
              </p>
              <p className="font-[var(--font-body)] text-[29px] leading-[1.55]">
                <mark className="bg-[#FEF08A] text-[#121212] px-1.5 py-0.5 font-mono font-medium">
                  Cash or check.
                </mark>
              </p>
            </div>
          </div>

          <aside className="absolute right-2 top-10 w-[25%]">
            <span className="font-[var(--font-mono)] text-[20px] uppercase tracking-[0.1em] text-[var(--accent)]">
              Margin note
            </span>

            <p className="mt-5 font-[var(--font-headline)] text-[32px] leading-tight text-[var(--ink)]/60">
              <span className="line-through decoration-[var(--accent)] decoration-2">
                A favor.
              </span>
            </p>
            <p className="mt-2 font-[var(--font-headline)] text-[34px] font-bold leading-tight">
              A duty.
            </p>

            <div className="mt-14 flex items-center gap-3 text-[var(--accent)]">
              <Banknote
                aria-hidden="true"
                className="h-10 w-10 shrink-0"
                strokeWidth={1.5}
              />
              <span className="font-[var(--font-mono)] text-[20px] uppercase leading-snug">
                If
                <br />
                eligible
              </span>
            </div>
          </aside>

          <svg
            aria-hidden="true"
            viewBox="0 0 952 420"
            fill="none"
            preserveAspectRatio="xMidYMid meet"
            className="pointer-events-none absolute inset-0 h-full w-full text-[var(--accent)]"
          >
            <path
              d="M 614 107 C 650 100 660 119 651 141 L 638 173 C 632 188 638 200 656 204 C 638 209 632 221 639 236 L 650 266 C 659 289 647 306 621 302"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M 662 204 C 691 204 701 181 721 179"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M 711 173 L 722 179 L 713 188"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M 46 364 C 137 356 260 362 343 356"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </div>

      <div className="shrink-0 border-t border-[var(--border)] pt-4">
        <div className="grid grid-cols-[48px_250px_1fr] items-start gap-5 pb-5">
          <FileText
            aria-hidden="true"
            className="mt-1 h-8 w-8 text-[var(--accent)]"
            strokeWidth={1.5}
          />
          <h2 className="font-[var(--font-headline)] text-[28px] font-semibold leading-tight">
            {items[0]?.label ?? 'Immediate notice'}
          </h2>
          <p className="font-[var(--font-body)] text-[24px] leading-snug line-clamp-3">
            {items[0]?.body ??
              'If bumped involuntarily, receive written rights and boarding rules.'}
          </p>
        </div>

        <div className="grid grid-cols-[48px_250px_1fr] items-start gap-5 border-t border-[var(--border)] pt-5">
          <Check
            aria-hidden="true"
            className="mt-1 h-8 w-8 text-[var(--accent)]"
            strokeWidth={1.5}
          />
          <h2 className="font-[var(--font-headline)] text-[28px] font-semibold leading-tight">
            {items[1]?.label ?? 'Eligible payment'}
          </h2>
          <p className="font-[var(--font-body)] text-[24px] leading-snug line-clamp-3">
            {items[1]?.body ??
              'Airlines must offer payment; you can insist on cash or check.'}
          </p>
        </div>
      </div>
    </section>
  );
}
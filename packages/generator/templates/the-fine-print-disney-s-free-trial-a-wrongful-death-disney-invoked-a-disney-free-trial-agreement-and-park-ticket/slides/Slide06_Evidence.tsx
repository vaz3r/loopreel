import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';
import { FileText, FileX2, ArrowUpLeft, ArrowRight } from 'lucide-react';

export default function Slide06({ slide, brand, totalSlides }: SlideComponentProps) {
  const items = slide.items ?? [];

  return (
    <section className="flex h-full min-h-0 w-full flex-col justify-between px-2 py-8 text-[var(--ink)]">
      <header className="shrink-0">
        <div className="mb-7 flex items-center gap-4">
          <span className="h-2 w-2 shrink-0 bg-[var(--accent)]" />
          <p className="font-[var(--font-mono)] text-[20px] font-medium uppercase tracking-[0.16em] text-[var(--accent)]">
            TWO SEPARATE DEVELOPMENTS
          </p>
        </div>

        <h1 className="max-w-[900px] font-[var(--font-headline)] text-[58px] font-bold leading-[1.04] tracking-tight">
          First Retreat.
          <br />
          Then Dismissal.
        </h1>

        <p className="mt-6 max-w-[800px] font-[var(--font-body)] text-[28px] leading-snug">
          The later dismissal was{' '}
          <span className="underline decoration-[var(--accent)] decoration-2 underline-offset-8">
            not an arbitration victory.
          </span>
        </p>
      </header>

      <div className="relative flex min-h-0 flex-1 items-center justify-center overflow-hidden">
        <svg
          viewBox="0 0 952 420"
          className="block max-h-full w-full"
          role="img"
          aria-label="Timeline: Disney dropped its arbitration bid in August 2024. Piccolo permanently dismissed the lawsuit on February 27, 2026."
        >
          <text
            x="84"
            y="57"
            fill="var(--accent)"
            fontFamily="var(--font-mono)"
            fontSize="25"
          >
            AUGUST 2024
          </text>
          <text
            x="560"
            y="57"
            fill="var(--ink)"
            fontFamily="var(--font-mono)"
            fontSize="25"
          >
            FEBRUARY 27, 2026
          </text>

          {/* The two filings occupy distinct points on one chronological rail. */}
          <path
            d="M 84 242 H 888"
            fill="none"
            stroke="var(--border)"
            strokeWidth="3"
          />
          <path
            d="M 84 242 H 170"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="3"
          />
          <ArrowRight
            x={862}
            y={226}
            width={32}
            height={32}
            stroke="var(--ink)"
            strokeWidth={1.5}
          />

          {/* Withdrawal: a document with an outward-pointing arrow. */}
          <FileText
            x={130}
            y={112}
            width={76}
            height={88}
            stroke="var(--ink)"
            strokeWidth={1.35}
          />
          <ArrowUpLeft
            x={205}
            y={100}
            width={46}
            height={46}
            stroke="var(--accent)"
            strokeWidth={1.7}
          />
          <path
            d="M 168 205 V 231"
            stroke="var(--accent)"
            strokeWidth="2"
          />
          <circle
            cx="168"
            cy="242"
            r="10"
            fill="var(--accent)"
            stroke="var(--paper, #0B0E14)"
            strokeWidth="4"
          />

          {/* Dismissal: a closed-out filing, not a victory trophy or gavel. */}
          <FileX2
            x={606}
            y={112}
            width={76}
            height={88}
            stroke="var(--ink)"
            strokeWidth={1.35}
          />
          <path
            d="M 644 205 V 231"
            stroke="var(--ink)"
            strokeWidth="2"
          />
          <circle
            cx="644"
            cy="242"
            r="10"
            fill="var(--ink)"
            stroke="var(--paper, #0B0E14)"
            strokeWidth="4"
          />

          <text
            x="84"
            y="307"
            fill="var(--ink)"
            fontFamily="var(--font-headline)"
            fontSize="32"
            fontWeight="600"
          >
            {items[0]?.label ?? 'Disney Retreats'}
          </text>
          <text
            x="560"
            y="307"
            fill="var(--ink)"
            fontFamily="var(--font-headline)"
            fontSize="32"
            fontWeight="600"
          >
            {items[0]?.label ?? 'Piccolo Dismisses'}
          </text>

          <text
            x="84"
            y="353"
            fill="var(--accent)"
            fontFamily="var(--font-mono)"
            fontSize="22"
          >
            01 / ARBITRATION BID
          </text>
          <text
            x="560"
            y="353"
            fill="var(--ink)"
            fontFamily="var(--font-mono)"
            fontSize="22"
          >
            02 / LAWSUIT
          </text>
        </svg>
      </div>

      <footer className="shrink-0 border-t border-[var(--border)]">
        <div className="flex items-start gap-7 border-b border-[var(--border)] py-6">
          <span className="w-12 shrink-0 pt-1 font-[var(--font-mono)] text-[22px] text-[var(--accent)]">
            01
          </span>
          <p className="max-w-[790px] font-[var(--font-body)] text-[24px] leading-snug">
            {items[0]?.body ??
              'Disney dropped its arbitration bid in August 2024 after backlash.'}
          </p>
        </div>

        <div className="flex items-start gap-7 py-6">
          <span className="w-12 shrink-0 pt-1 font-[var(--font-mono)] text-[22px] text-[var(--accent)]">
            02
          </span>
          <p className="max-w-[790px] font-[var(--font-body)] text-[24px] leading-snug">
            {items[0]?.body ??
              'Piccolo permanently dismissed the lawsuit on February 27, 2026.'}
          </p>
        </div>
      </footer>
    </section>
  );
}
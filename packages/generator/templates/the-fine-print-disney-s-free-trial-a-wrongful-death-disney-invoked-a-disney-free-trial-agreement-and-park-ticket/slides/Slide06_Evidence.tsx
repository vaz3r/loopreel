import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';
import { FileX2, FolderCheck, ArrowDownRight } from 'lucide-react';

export default function Slide06({ slide, brand, totalSlides }: SlideComponentProps) {
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
            THE ACTUAL OUTCOME
          </p>
        </div>

        <h1 className="max-w-[920px] font-[var(--font-headline)] text-[58px] font-bold leading-[1.04] tracking-tight">
          Disney Backed Down.
          <br />
          The Case Ended.
        </h1>

        <p className="mt-5 max-w-[850px] font-[var(--font-body)] text-[26px] leading-snug">
          Disney abandoned its arbitration demand after public backlash.
        </p>
      </header>

      <div className="relative my-3 flex min-h-0 flex-1 items-center justify-center overflow-hidden">
        <svg
          viewBox="0 0 952 420"
          preserveAspectRatio="xMidYMid meet"
          className="h-full w-full"
          role="img"
          aria-label="A continuous timeline links a withdrawn arbitration demand to a closed lawsuit."
        >
          {/* Quiet registration marks frame the evidence, not the slide. */}
          <g
            fill="none"
            stroke="var(--border)"
            strokeWidth="1"
            aria-hidden="true"
          >
            <path d="M64 94h22M75 83v22M866 94h22M877 83v22" />
            <path d="M64 346h22M75 335v22M866 346h22M877 335v22" />
          </g>

          {/* Legal-document silhouette: first action withdrawn. */}
          <path
            d="M170 75h73l35 35v111H170Z"
            fill="var(--surface)"
          />
          <path
            d="M243 75v35h35"
            fill="none"
            stroke="var(--border)"
            strokeWidth="2"
          />
          <FileX2
            x={183}
            y={112}
            width={80}
            height={80}
            stroke="var(--ink)"
            strokeWidth={1.3}
          />
          <path
            d="M153 205L291 182"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="4"
            strokeLinecap="round"
          />

          {/* Closed case file: a distinct, final procedural milestone. */}
          <path
            d="M669 119V98h58l20 21h64v103H669Z"
            fill="var(--surface)"
          />
          <FolderCheck
            x={687}
            y={120}
            width={106}
            height={86}
            stroke="var(--ink)"
            strokeWidth={1.25}
          />

          {/* Continuous chronological rail with document-to-node leaders. */}
          <g fill="none" strokeWidth="2">
            <path
              d="M223 229v49M740 230v48"
              stroke="var(--border)"
            />
            <path d="M75 284H877" stroke="var(--border)" />
            <path d="M223 284H740" stroke="var(--accent)" />
            <path
              d="M484 277l9 7-9 7"
              stroke="var(--accent)"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>

          <circle cx="223" cy="284" r="16" fill="var(--surface)" />
          <circle
            cx="223"
            cy="284"
            r="10"
            fill="var(--surface)"
            stroke="var(--accent)"
            strokeWidth="3"
          />

          <circle
            cx="740"
            cy="284"
            r="23"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="1"
            opacity="0.35"
          />
          <circle cx="740" cy="284" r="11" fill="var(--accent)" />

          <g
            fill="var(--ink)"
            textAnchor="middle"
            className="font-[var(--font-mono)] text-[22px]"
          >
            <text x="223" y="340">01</text>
            <text x="740" y="340">02</text>
          </g>
        </svg>
      </div>

      <div className="shrink-0 border-t border-[var(--border)] pt-4">
        <div className="grid grid-cols-[56px_270px_minmax(0,1fr)] items-start gap-x-5 pb-6 pt-2">
          <span className="pt-1 font-[var(--font-mono)] text-[20px] text-[var(--accent)]">
            01
          </span>
          <h2 className="font-[var(--font-headline)] text-[28px] font-semibold leading-tight">
            {items[0]?.label ?? 'August 2024'}
          </h2>
          <p className="font-[var(--font-body)] text-[24px] leading-snug">
            {items[0]?.body ?? 'Disney dropped its demand for arbitration.'}
          </p>
        </div>

        <div className="grid grid-cols-[56px_270px_minmax(0,1fr)] items-start gap-x-5 border-t border-[var(--border)] pb-2 pt-6">
          <span className="pt-1 font-[var(--font-mono)] text-[20px] text-[var(--accent)]">
            02
          </span>
          <h2 className="font-[var(--font-headline)] text-[28px] font-semibold leading-tight">
            {items[1]?.label ?? 'February 27, 2026'}
          </h2>
          <div className="flex items-start gap-4">
            <p className="min-w-0 flex-1 font-[var(--font-body)] text-[24px] leading-snug">
              {items[1]?.body ??
                'Piccolo voluntarily dropped the lawsuit; it cannot be refiled.'}
            </p>
            <ArrowDownRight
              aria-hidden="true"
              className="mt-1 h-7 w-7 shrink-0 text-[var(--accent)]"
              strokeWidth={1.5}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

export default function Slide10({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  return (
    <section
      className="flex flex-col h-full min-h-0 w-full text-[var(--ink)]"
      aria-labelledby="slide-10-headline"
    >
      <header className="shrink-0 pb-10">
        <p className="font-[var(--font-mono)] text-[20px] leading-normal tracking-wider text-[var(--accent)]">
          THE TOKEN LEDGER · ACCOUNTABILITY
        </p>

        <h2
          id="slide-10-headline"
          className="mt-5 max-w-[900px] font-[var(--font-headline)] text-[64px] font-bold leading-[1.04] tracking-[-0.035em]"
        >
          New Mobility,
          <br />
          An Old Trust Question
        </h2>

        <p className="mt-6 max-w-[850px] font-[var(--font-body)] text-[28px] leading-snug">
          Ring’s new privacy promises arrive against a documented record of
          security failures.
        </p>
      </header>

      <div className="relative grid min-h-0 flex-1 grid-rows-2">
        <svg
          className="pointer-events-none absolute inset-0 h-full w-full"
          viewBox="0 0 952 600"
          preserveAspectRatio="none"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M0 1H952 M0 300H952 M414 1V599 M0 599H952"
            stroke="var(--border)"
            strokeWidth="1.5"
            vectorEffect="non-scaling-stroke"
          />
          <path
            d="M0 1H94 M402 300H426 M858 599H952"
            stroke="var(--accent)"
            strokeWidth="2"
            vectorEffect="non-scaling-stroke"
          />
        </svg>

        <div className="relative grid grid-cols-[390px_minmax(0,1fr)] items-start gap-12 py-10">
          <p className="font-[var(--font-mono)] text-[112px] font-bold leading-none tracking-[-0.06em] tabular-nums text-[var(--accent)]">
            2023
          </p>

          <div className="pt-1">
            <h3 className="font-[var(--font-headline)] text-[32px] font-semibold leading-tight tracking-[-0.02em]">
              FTC investigation year
            </h3>
            <p className="mt-5 font-[var(--font-body)] text-[26px] leading-snug">
              FTC charged Ring with allowing employees and contractors to watch
              private-space recordings.
            </p>
          </div>
        </div>

        <div className="relative grid grid-cols-[390px_minmax(0,1fr)] items-end gap-12 py-10">
          <p className="font-[var(--font-mono)] text-[104px] font-bold leading-none tracking-[-0.065em] tabular-nums">
            55,000
          </p>

          <div>
            <h3 className="font-[var(--font-headline)] text-[32px] font-semibold leading-tight tracking-[-0.02em]">
              US customers’ accounts accessed by hackers
            </h3>
            <p className="mt-5 font-[var(--font-body)] text-[26px] leading-snug">
              The FTC attributed this access to Ring’s lackluster safeguards.
            </p>
          </div>
        </div>
      </div>

      <p className="shrink-0 pt-6 text-right font-[var(--font-mono)] text-[22px] leading-normal tracking-wider text-[var(--accent)]">
        tokenledger.ai
      </p>
    </section>
  );
}
import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

export default function Slide08({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  return (
    <section className="flex flex-col h-full min-h-0 w-full text-[var(--ink)]">
      <header className="shrink-0">
        <p className="font-[var(--font-mono)] text-[22px] uppercase tracking-[0.16em] text-[var(--accent)]">
          THE ECONOMIC BILL
        </p>

        <h2 className="mt-7 max-w-[900px] font-[var(--font-headline)] text-[68px] font-bold leading-[1.04] tracking-[-0.045em]">
          One Estimate Is
          <br />
          Not Every Cost
        </h2>

        <p className="mt-8 max-w-[800px] font-[var(--font-body)] text-[28px] leading-normal">
          US military spending is one estimate; the article also lists broader
          disruption.
        </p>
      </header>

      <div className="flex flex-1 flex-col justify-center py-16">
        <article className="border-y border-[var(--border)] bg-[var(--surface)] px-10 py-14">
          <h3 className="max-w-[720px] font-[var(--font-headline)] text-[34px] font-semibold leading-snug tracking-[-0.025em]">
            US Department of Defense estimate
          </h3>

          <p className="mt-10 whitespace-nowrap font-[var(--font-mono)] text-[112px] font-bold leading-none tracking-[-0.065em]">
            $47.1 billion
          </p>

          <div className="mt-8 border-l-[4px] border-[var(--accent)] pl-6">
            <p className="font-[var(--font-body)] text-[28px] leading-normal">
              as of October 2026;
            </p>
            <p className="mt-2 font-[var(--font-body)] text-[28px] leading-normal">
              US military spending only; marked{' '}
              <span className="font-[var(--font-mono)] text-[22px] text-[var(--accent)]">
                [update].
              </span>
            </p>
          </div>
        </article>
      </div>

      <div className="shrink-0 pb-14">
        <svg
          className="block h-[8px] w-full text-[var(--accent)]"
          viewBox="0 0 952 8"
          preserveAspectRatio="none"
          fill="none"
          aria-hidden="true"
        >
          <path d="M0 4H952" stroke="currentColor" strokeWidth="8" />
        </svg>

        <h3 className="mt-9 font-[var(--font-headline)] text-[38px] font-semibold leading-snug tracking-[-0.025em]">
          Disrupted sectors
        </h3>

        <p className="mt-5 max-w-[870px] font-[var(--font-body)] text-[28px] leading-normal">
          Oil supply, financial markets, natural gas, fertilizer, aviation,
          tourism, and shipping.
        </p>
      </div>
    </section>
  );
}
import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

export default function Slide07({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  void slide;
  void brand;
  void totalSlides;

  return (
    <section className="flex flex-col h-full min-h-0 w-full text-[var(--ink)]">
      <header className="shrink-0">
        <h1 className="max-w-[920px] font-[var(--font-headline)] text-[64px] font-bold leading-[1.04] tracking-[-0.045em]">
          Neutron&apos;s Price Rises Before Its Debut
        </h1>
        <p className="mt-6 max-w-[800px] font-[var(--font-body)] text-[28px] leading-snug">
          Rocket Lab attributes the increase to a surge in bookings.
        </p>
      </header>

      <div className="mt-9 grid shrink-0 grid-cols-2 gap-6">
        <article className="flex flex-col border-t border-[var(--border)] px-7 pb-7 pt-6">
          <svg
            viewBox="0 0 380 80"
            className="h-[80px] w-full text-[var(--border)]"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M1 65H379 M1 59V71 M379 59V71"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <path
              d="M8 42H292"
              stroke="var(--ink)"
              strokeWidth="12"
              strokeLinecap="square"
            />
            <path
              d="M298 22V59"
              stroke="var(--ink)"
              strokeWidth="2"
            />
            <path
              d="M310 42H373"
              stroke="currentColor"
              strokeWidth="2"
              strokeDasharray="4 7"
            />
          </svg>

          <div className="mt-5 font-[var(--font-mono)]">
            <div className="text-[104px] font-bold leading-none tracking-[-0.075em]">
              $55
            </div>
            <div className="mt-2 text-[34px] font-semibold leading-tight tracking-[-0.025em]">
              million
            </div>
          </div>

          <p className="mt-7 max-w-[320px] font-[var(--font-body)] text-[26px] leading-snug">
            Previous Neutron price per launch
          </p>
        </article>

        <article className="relative flex flex-col border-t-4 border-[var(--accent)] bg-[var(--surface)] px-7 pb-7 pt-[21px]">
          <svg
            viewBox="0 0 380 80"
            className="h-[80px] w-full text-[var(--accent)]"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M1 65H379 M1 59V71 M379 59V71"
              stroke="var(--border)"
              strokeWidth="1.5"
            />
            <path
              d="M8 42H366"
              stroke="currentColor"
              strokeWidth="12"
              strokeLinecap="square"
            />
            <path
              d="M372 22V59"
              stroke="currentColor"
              strokeWidth="2"
            />
            <path
              d="M298 12H372 M359 2L372 12L359 22"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinejoin="round"
            />
          </svg>

          <div className="mt-5 font-[var(--font-mono)] text-[var(--accent)]">
            <div className="text-[104px] font-bold leading-none tracking-[-0.075em]">
              $70
            </div>
            <div className="mt-2 text-[34px] font-semibold leading-tight tracking-[-0.025em]">
              million
            </div>
          </div>

          <p className="mt-7 max-w-[320px] font-[var(--font-body)] text-[26px] leading-snug">
            New Neutron price per launch
          </p>
        </article>
      </div>

      <aside className="mt-8 grid shrink-0 grid-cols-[0.82fr_1.18fr] items-center gap-8 border-y border-[var(--border)] py-7">
        <div className="flex items-center gap-6">
          <svg
            viewBox="0 0 48 104"
            className="h-[104px] w-[48px] shrink-0 text-[var(--accent)]"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M3 15H19V89H3 M19 52H45"
              stroke="currentColor"
              strokeWidth="2"
            />
            <circle cx="3" cy="15" r="3" fill="currentColor" />
            <circle cx="3" cy="89" r="3" fill="currentColor" />
          </svg>

          <div className="font-[var(--font-mono)] text-[104px] font-bold leading-none tracking-[-0.075em]">
            117
          </div>
        </div>

        <p className="max-w-[460px] font-[var(--font-body)] text-[28px] leading-snug">
          Contracted launches across Neutron and Electron
          <span className="font-semibold text-[var(--accent)]">
            —not Neutron alone
          </span>
        </p>
      </aside>
    </section>
  );
}
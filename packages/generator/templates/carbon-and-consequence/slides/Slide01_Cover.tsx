import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

export default function Slide01({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  void brand;
  void totalSlides;

  const titleId = `${slide.id}-title`;

  const palette = {
    '--paper': '#EBD4C3',
    '--ink': '#202B27',
    '--accent': '#21664D',
    '--surface': '#DCC1AA',
    '--border': '#A58D7D',
    backgroundColor: 'var(--paper)',
  } as React.CSSProperties;

  return (
    <section
      className="flex flex-col h-full min-h-0 w-full text-[var(--ink)]"
      style={palette}
      aria-labelledby={titleId}
    >
      <div className="shrink-0 border-b border-[var(--border)] pb-7">
        <p className="font-[var(--font-mono)] text-[22px] leading-none tracking-[0.16em] text-[var(--accent)]">
          CARBON &amp; CONSEQUENCE
        </p>

        <h1
          id={titleId}
          className="mt-6 font-[var(--font-headline)] text-[68px] font-bold leading-[1.04] tracking-[-0.045em]"
        >
          Emissions Dip.
          <br />
          A Turning Point?
        </h1>
      </div>

      <div className="flex min-h-0 flex-1 flex-col justify-center py-6">
        <div className="text-center">
          <p className="font-[var(--font-mono)] text-[112px] font-bold leading-none tracking-[-0.07em]">
            2026
          </p>
          <p className="mt-3 font-[var(--font-mono)] text-[22px] leading-snug tracking-[0.04em]">
            Estimated decline year
          </p>
        </div>

        <div className="mt-9 grid grid-cols-[200px_minmax(0,1fr)] items-start gap-8 px-12">
          <svg
            viewBox="0 0 200 220"
            className="mt-8 h-[220px] w-[200px] text-[var(--accent)]"
            fill="none"
            aria-hidden="true"
            focusable="false"
          >
            <path
              d="M78 14H122V125H174L100 204L26 125H78V14Z"
              fill="currentColor"
            />
            <path
              d="M26 217H174"
              stroke="currentColor"
              strokeWidth="2"
            />
          </svg>

          <div className="min-w-0">
            <p className="mb-3 font-[var(--font-mono)] text-[22px] leading-snug tracking-[0.025em]">
              Fossil fuel emissions
            </p>

            <div className="inline-flex border border-[var(--accent)] bg-[var(--accent)] px-7 py-4 text-[var(--paper)]">
              <p className="whitespace-nowrap font-[var(--font-mono)] text-[104px] font-bold leading-none tracking-[-0.065em]">
                -0.4%
              </p>
            </div>

            <p className="mt-3 max-w-[480px] font-[var(--font-body)] text-[24px] leading-snug">
              Estimated decrease: about 0.4 percent
            </p>
          </div>
        </div>
      </div>

      <div className="relative flex h-[257px] shrink-0 items-center border-t border-[var(--border)] bg-[var(--surface)] px-10 py-8">
        <span
          className="absolute left-10 top-0 h-[5px] w-24 bg-[var(--accent)]"
          aria-hidden="true"
        />
        <p className="max-w-[730px] font-[var(--font-body)] text-[28px] leading-normal">
          An estimated decline offers hope, not proof of a sustained peak.
        </p>
      </div>
    </section>
  );
}
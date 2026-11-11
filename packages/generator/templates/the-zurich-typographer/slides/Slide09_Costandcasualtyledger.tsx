import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

export default function Slide09({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  void slide;
  void brand;
  void totalSlides;

  const LedgerRule = () => (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 952 2"
      preserveAspectRatio="none"
      className="block h-[2px] w-full shrink-0"
    >
      <line
        x1="0"
        y1="1"
        x2="952"
        y2="1"
        stroke="#000000"
        strokeWidth="1"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );

  return (
    <section className="flex flex-col h-full min-h-0 w-full text-[var(--ink)]">
      <header className="shrink-0 pb-16">
        <p className="font-[var(--font-mono)] text-[22px] leading-normal tracking-wider">
          THE LIMITS OF THE NUMBERS
        </p>

        <h1 className="mt-9 max-w-[900px] font-[var(--font-headline)] text-[68px] font-bold leading-[1.04] tracking-[-0.035em]">
          An Estimate And An Uncounted Toll
        </h1>

        <p className="mt-8 max-w-[800px] font-[var(--font-body)] text-[28px] leading-normal">
          The spending figure is not a worldwide cost; casualties lack an exact
          total.
        </p>
      </header>

      <div className="flex min-h-0 flex-1 flex-col">
        <LedgerRule />

        <article className="flex flex-1 items-center py-12">
          <div className="w-full font-[var(--font-body)] text-[28px] leading-[1.65]">
            <h2 className="inline font-[var(--font-headline)] text-[38px] font-semibold leading-snug tracking-[-0.02em]">
              US military spending
            </h2>{' '}
            <p className="inline">
              <strong className="whitespace-nowrap font-[var(--font-mono)] text-[28px] font-bold text-[#E60000]">
                $47.1 billion
              </strong>{' '}
              estimated as of{' '}
              <span className="whitespace-nowrap">October 2026;</span> attributed
              to Defense Department;{' '}
              <span className="font-[var(--font-mono)]">[update]</span> marker.
            </p>
          </div>
        </article>

        <LedgerRule />

        <article className="flex flex-1 items-center py-12">
          <div className="w-full font-[var(--font-body)] text-[28px] leading-[1.65]">
            <h2 className="inline font-[var(--font-headline)] text-[38px] font-semibold leading-snug tracking-[-0.02em]">
              Civilian and military casualties
            </h2>{' '}
            <p className="inline">
              Described as{' '}
              <strong className="font-[var(--font-headline)] text-[28px] font-bold italic">
                thousands;
              </strong>{' '}
              the supplied text provides no exact casualty total.
            </p>
          </div>
        </article>

        <LedgerRule />
      </div>
    </section>
  );
}
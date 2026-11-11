import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

export default function Slide08({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  void slide;
  void brand;
  void totalSlides;

  const sectors = [
    {
      label: 'Disrupted sectors',
      body: 'Natural gas, fertilizer, aviation, tourism, and shipping faced disruption.',
      symbol: (
        <>
          <path d="M12 34H43M65 34H100M12 56H35M73 56H100M12 78H43M65 78H100" />
          <path
            d="M59 20L47 44L65 64L53 92"
            stroke="var(--accent)"
          />
        </>
      ),
    },
    {
      label: 'Financial pressures',
      body: 'Financial-market volatility, inflation, lower economic growth, and higher borrowing costs.',
      symbol: (
        <path
          d="M10 56C18 56 19 32 28 32S39 80 48 80S59 32 68 32S79 80 88 80S96 56 102 56"
          stroke="var(--accent)"
        />
      ),
    },
    {
      label: 'Household consequences',
      body: 'Higher fuel and energy prices; global cost-of-living crisis; protests in Europe and elsewhere.',
      symbol: (
        <>
          <path d="M15 51L56 18L97 51" stroke="var(--accent)" />
          <path d="M25 44V94H87V44M46 94V66H66V94" />
        </>
      ),
    },
  ];

  return (
    <section className="flex flex-col h-full min-h-0 w-full text-[var(--ink)]">
      <header className="shrink-0">
        <div className="flex items-center gap-4">
          <span
            aria-hidden="true"
            className="h-[3px] w-10 shrink-0 bg-[var(--accent)]"
          />
          <p className="font-[var(--font-mono)] text-[21px] leading-[28px] tracking-[0.14em] text-[var(--accent)]">
            THE ECONOMIC FALLOUT
          </p>
        </div>

        <h2 className="mt-5 max-w-[930px] font-[var(--font-headline)] text-[64px] font-bold leading-[1.04] tracking-[-0.035em]">
          Disruption Spread Beyond the Battlefield
        </h2>

        <p className="mt-5 max-w-[900px] font-[var(--font-body)] text-[27px] leading-snug">
          The article calls oil disruption the largest ever, without volumes or
          comparative data.
        </p>
      </header>

      <div className="mt-8 grid min-h-0 flex-1 grid-rows-3 gap-6">
        {sectors.map(({ label, body, symbol }) => (
          <article
            key={label}
            className="grid min-h-0 grid-cols-[112px_minmax(0,1fr)] items-center gap-8 border-y border-[var(--border)] bg-[var(--surface)] px-8 py-6"
          >
            <svg
              aria-hidden="true"
              focusable="false"
              viewBox="0 0 112 112"
              fill="none"
              className="h-[112px] w-[112px] text-[var(--ink)]"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="square"
              strokeLinejoin="miter"
            >
              {symbol}
            </svg>

            <div className="min-w-0 border-l border-[var(--border)] pl-8">
              <h3 className="font-[var(--font-headline)] text-[34px] font-semibold leading-[1.15] tracking-[-0.02em]">
                {label}
              </h3>
              <p className="mt-3 font-[var(--font-body)] text-[26px] leading-snug">
                {body}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
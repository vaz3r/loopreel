import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

export default function Slide03({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  void brand;
  void totalSlides;

  const annotations = [
    {
      month: null,
      year: '2018',
      side: 'left',
      body: (
        <>
          Trump withdrew from JCPOA, reimposed sanctions, and adopted maximum
          pressure.
        </>
      ),
    },
    {
      month: 'September',
      year: '2025',
      side: 'right',
      body: (
        <>
          UN sanctions weakened Iran’s currency, increased food prices, and
          froze overseas assets.
        </>
      ),
    },
    {
      month: 'December',
      year: '2025',
      side: 'left',
      body: (
        <>
          Treasury Secretary Scott Bessent called the currency collapse the{' '}
          <strong className="font-semibold text-[var(--accent)]">
            “grand culmination.”
          </strong>
        </>
      ),
    },
  ];

  return (
    <section className="flex flex-col h-full min-h-0 w-full text-[var(--ink)]">
      <header className="shrink-0 border-t-2 border-[var(--ink)] pt-7">
        <p className="font-[var(--font-mono)] text-[22px] leading-normal tracking-[0.16em] text-[var(--accent)]">
          {slide.kicker}
        </p>

        <h1 className="mt-8 max-w-[880px] font-[var(--font-headline)] text-[68px] font-bold leading-[1.04] tracking-[-0.045em]">
          {slide.headline}
        </h1>

        <p className="mt-7 max-w-[770px] font-[var(--font-body)] text-[28px] leading-snug">
          {slide.subheadline}
        </p>
      </header>

      <div className="relative mt-12 h-[1080px] w-full shrink-0">
        <svg
          className="pointer-events-none absolute inset-0 h-full w-full"
          viewBox="0 0 952 1080"
          fill="none"
          preserveAspectRatio="none"
          aria-hidden="true"
          focusable="false"
        >
          <path
            d="M476 0V1080"
            stroke="#000000"
            strokeWidth="2"
            vectorEffect="non-scaling-stroke"
          />

          <path
            d="M476 180H436M476 540H516M476 900H436"
            stroke="#000000"
            strokeWidth="2"
            vectorEffect="non-scaling-stroke"
          />

          <path
            d="M466 0H486M466 1080H486"
            stroke="#000000"
            strokeWidth="2"
            vectorEffect="non-scaling-stroke"
          />

          {[180, 540, 900].map((y) => (
            <rect
              key={y}
              x="466"
              y={y - 10}
              width="20"
              height="20"
              fill="var(--accent, #E60000)"
            />
          ))}
        </svg>

        <ol className="relative m-0 grid h-full list-none grid-rows-3 p-0">
          {annotations.map((annotation) => (
            <li
              key={`${annotation.month ?? ''}-${annotation.year}`}
              className="grid grid-cols-[minmax(0,1fr)_104px_minmax(0,1fr)] items-center"
            >
              <div
                className={[
                  'grid min-w-0 grid-cols-[124px_minmax(0,1fr)] items-start gap-5',
                  annotation.side === 'left' ? 'col-start-1' : 'col-start-3',
                ].join(' ')}
              >
                <div className="border-t-2 border-[var(--accent)] pt-4 font-[var(--font-mono)]">
                  {annotation.month && (
                    <span className="block text-[22px] leading-snug">
                      {annotation.month}
                    </span>
                  )}
                  <span
                    className={[
                      'block text-[38px] font-semibold leading-tight tracking-[-0.04em]',
                      annotation.month ? 'mt-2' : '',
                    ].join(' ')}
                  >
                    {annotation.year}
                  </span>
                </div>

                <p className="m-0 border-t border-[var(--border)] pt-4 font-[var(--font-body)] text-[28px] leading-snug">
                  {annotation.body}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
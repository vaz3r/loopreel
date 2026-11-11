import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

export default function Slide03({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  const metrics = [
    {
      value: '$1,999',
      label: 'M6 MacBook Pro starting price',
    },
    {
      value: '+$400',
      label: 'Above the M5’s original starting price',
    },
    {
      value: '+$700',
      label: 'Above the basic M1 MacBook Pro from 2020',
    },
  ];

  return (
    <section className="flex flex-col h-full min-h-0 w-full text-[var(--ink)]">
      <header className="shrink-0">
        <div
          aria-hidden="true"
          className="mb-7 h-[6px] w-20 bg-[var(--accent)]"
        />

        <h1 className="max-w-[880px] font-[var(--font-headline)] text-[64px] font-bold leading-[1.04] tracking-[-0.045em]">
          The Entry Price
          <br />
          Keeps Climbing
        </h1>

        <p className="mt-6 font-[var(--font-body)] text-[28px] leading-snug">
          Three numbers frame the value problem.
        </p>
      </header>

      <div className="mt-12 flex min-h-0 flex-1 flex-col justify-center">
        <div className="relative">
          <svg
            aria-hidden="true"
            focusable="false"
            viewBox="0 0 952 636"
            fill="none"
            className="pointer-events-none absolute inset-0 h-full w-full text-[var(--accent)]"
          >
            <path
              d="M14 612V440H46V220H78V12"
              stroke="var(--border)"
              strokeWidth="2"
              strokeDasharray="5 7"
            />
            <path
              d="M46 220H78V12"
              stroke="currentColor"
              strokeWidth="3"
            />
            <path
              d="M68 23L78 12L88 23"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="square"
              strokeLinejoin="miter"
            />
            <circle cx="14" cy="538" r="6" fill="var(--ink)" />
            <circle cx="46" cy="318" r="6" fill="var(--ink)" />
            <circle cx="78" cy="98" r="7" fill="currentColor" />
            <path
              d="M21 538H32M53 318H64M86 98H96"
              stroke="currentColor"
              strokeWidth="2"
            />
          </svg>

          <ol className="relative flex list-none flex-col gap-6 p-0">
            {metrics.map((metric, index) => (
              <li
                key={metric.value}
                className={[
                  'grid h-[196px] shrink-0 grid-cols-[350px_1fr]',
                  'items-center gap-6 border px-7 py-6',
                  'border-[var(--border)] bg-[var(--surface)]',
                  index === 0
                    ? 'ml-24 border-t-[5px] border-t-[var(--accent)]'
                    : index === 1
                      ? 'ml-16'
                      : 'ml-8',
                ].join(' ')}
              >
                <p
                  className={[
                    'whitespace-nowrap font-[var(--font-mono)]',
                    'text-[94px] font-bold leading-none tracking-[-0.065em]',
                    'tabular-nums',
                    index === 0
                      ? 'text-[var(--accent)]'
                      : 'text-[var(--ink)]',
                  ].join(' ')}
                >
                  {metric.value}
                </p>

                <p className="border-l border-[var(--border)] pl-6 font-[var(--font-body)] text-[26px] leading-snug">
                  {metric.label}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
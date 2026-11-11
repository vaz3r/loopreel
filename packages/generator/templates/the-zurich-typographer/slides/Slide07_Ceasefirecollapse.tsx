import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

const events = [
  {
    label: '17 June',
    body: 'United States and Iran signed a war-ending memorandum, lifting the dual blockade.',
    position: 'ml-0 w-[600px]',
  },
  {
    label: '28 June',
    body: 'United States and Iran agreed to resume the ceasefire after renewed tensions.',
    position: 'ml-[160px] w-[600px]',
  },
  {
    label: '8 July',
    body: 'Ceasefire collapsed after Iran attacked commercial vessels in the Strait of Hormuz.',
    position: 'ml-[320px] w-[632px]',
  },
];

export default function Slide07({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  return (
    <section className="flex flex-col h-full min-h-0 w-full text-[var(--ink)]">
      <header className="flex shrink-0 flex-col items-start">
        <p className="font-[var(--font-mono)] text-[22px] leading-normal tracking-[0.16em] text-[var(--accent)]">
          JUNE TO JULY
        </p>

        <h2 className="mt-6 max-w-[900px] font-[var(--font-headline)] text-[68px] font-bold leading-[1.04] tracking-[-0.045em]">
          The Agreement
          <br />
          Did Not Hold
        </h2>

        <p className="mt-7 max-w-[820px] font-[var(--font-body)] text-[28px] leading-snug">
          A memorandum lifted the dual blockade, but hostilities did not
          durably end.
        </p>
      </header>

      <div className="relative mt-[56px] h-[1050px] w-full shrink-0">
        <svg
          viewBox="0 0 952 1050"
          fill="none"
          aria-hidden="true"
          focusable="false"
          className="pointer-events-none absolute inset-0 h-full w-full"
        >
          {/* Orthogonal connections describe order, not elapsed time. */}
          <g
            stroke="#000000"
            strokeWidth="5"
            strokeLinecap="square"
            strokeLinejoin="miter"
          >
            <path d="M20 220 V286 H180 V330" />
            <path d="M180 550 V616 H340 V660" />
            <path d="M340 880 V978 H798" />
          </g>

          <g fill="#000000">
            <rect x="13" y="213" width="14" height="14" />
            <rect x="173" y="543" width="14" height="14" />
            <rect x="333" y="873" width="14" height="14" />
          </g>

          {/* The final connection terminates at a conspicuous rupture. */}
          <g
            stroke="var(--accent, #E60000)"
            strokeWidth="12"
            strokeLinecap="square"
          >
            <path d="M816 1004 L840 952" />
            <path d="M850 1004 L874 952" />
          </g>
        </svg>

        <ol className="relative grid h-full list-none grid-rows-[330px_330px_390px] p-0">
          {events.map((event, index) => (
            <li
              key={event.label}
              className={`${event.position} self-start`}
            >
              <div
                className={
                  index === 2
                    ? 'border-t-[5px] border-[var(--accent)] bg-white px-0 pb-5 pt-6'
                    : 'border-t-[5px] border-black bg-white px-0 pb-5 pt-6'
                }
              >
                <h3
                  className={`font-[var(--font-mono)] text-[38px] font-semibold leading-tight tracking-[-0.035em] ${
                    index === 2
                      ? 'text-[var(--accent)]'
                      : 'text-[var(--ink)]'
                  }`}
                >
                  {event.label}
                </h3>

                <p className="mt-5 max-w-[590px] font-[var(--font-body)] text-[28px] leading-snug">
                  {event.body}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
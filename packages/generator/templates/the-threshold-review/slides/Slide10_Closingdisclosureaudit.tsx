import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

export default function Slide10({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  const items = [
    {
      title: 'Both devices',
      body: 'Physical dimensions, battery capacity and charging duration are not stated.',
    },
    {
      title: 'Rover endurance',
      body: 'Battery life is not stated.',
    },
    {
      title: 'Subscription terms',
      body: 'Ring Protect pricing and any Rover-specific subscription requirement are not specified.',
    },
  ];

  const theme = {
    '--ink': '#182923',
    '--accent': '#9B254D',
    '--paper': '#E7ECE5',
    '--surface': '#D6DFD5',
    '--border': '#A0AFA3',
  } as React.CSSProperties;

  void slide;
  void brand;
  void totalSlides;

  return (
    <section
      className="flex flex-col h-full min-h-0 w-full text-[var(--ink)]"
      style={theme}
      aria-labelledby="slide-10-headline"
    >
      <div className="grid h-full min-h-0 w-full grid-cols-[400px_minmax(0,1fr)] gap-10 bg-[var(--paper)]">
        <div className="flex min-h-0 flex-col border-l-2 border-[var(--border)] py-8 pl-7">
          <p className="font-[var(--font-mono)] text-[20px] font-medium leading-normal tracking-wider text-[var(--accent)]">
            THE THRESHOLD REVIEW / BOTTOM LINE
          </p>

          <h2
            id="slide-10-headline"
            className="mt-14 font-[var(--font-headline)] text-[58px] font-bold leading-[1.06] tracking-[-0.035em]"
          >
            The
            <br />
            Specification
            <br />
            Sheet Still
            <br />
            Has Gaps
          </h2>

          <div
            aria-hidden="true"
            className="my-10 h-[3px] w-16 shrink-0 bg-[var(--accent)]"
          />

          <p className="max-w-[340px] font-[var(--font-body)] text-[26px] leading-snug">
            The supplied article leaves practical hardware and subscription
            questions unanswered.
          </p>

          <div
            aria-hidden="true"
            className="mt-auto pt-12"
          >
            <div className="h-px w-24 bg-[var(--border)]" />
          </div>
        </div>

        <div className="grid min-h-0 grid-rows-3 py-8">
          {items.map((item) => (
            <article
              key={item.title}
              className="relative flex min-h-0 flex-col justify-center border-t-2 border-[var(--surface)] py-7 pr-14 last:border-b-2"
            >
              <h3 className="font-[var(--font-headline)] text-[34px] font-semibold leading-tight tracking-[-0.02em]">
                {item.title}
              </h3>

              <p className="mt-5 font-[var(--font-body)] text-[26px] leading-snug">
                {item.body}
              </p>

              <svg
                aria-hidden="true"
                focusable="false"
                viewBox="0 0 28 112"
                fill="none"
                className="absolute right-1 top-1/2 h-28 w-7 -translate-y-1/2 text-[var(--accent)]"
              >
                <path
                  d="M4 4H23V108H4"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="square"
                  strokeLinejoin="miter"
                />
              </svg>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
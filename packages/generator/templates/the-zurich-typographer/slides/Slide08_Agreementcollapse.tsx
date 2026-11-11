import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

export default function Slide08({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  const events = [
    { item: slide.items?.[0], top: 80, reversed: false },
    { item: slide.items?.[1], top: 440, reversed: true },
    { item: slide.items?.[2], top: 800, reversed: false },
  ];

  return (
    <section className="flex flex-col h-full min-h-0 w-full text-[var(--ink)]">
      <div className="shrink-0 border-t-[6px] border-[var(--accent)] pt-7">
        <p className="font-[var(--font-mono)] text-[22px] leading-normal tracking-[0.16em] text-[var(--accent)]">
          {slide.kicker}
        </p>

        <h1 className="mt-6 max-w-[920px] font-[var(--font-headline)] text-[68px] font-bold leading-[1.04] tracking-[-0.045em]">
          {slide.headline}
        </h1>

        <p className="mt-7 max-w-[800px] font-[var(--font-body)] text-[28px] leading-snug">
          {slide.subheadline}
        </p>
      </div>

      <div className="relative mt-12 h-[1040px] w-full shrink-0">
        <svg
          className="pointer-events-none absolute inset-0 h-full w-full"
          viewBox="0 0 952 1040"
          fill="none"
          aria-hidden="true"
        >
          {/* Uniform ribbon geometry indicates chronology only. */}
          <path
            d="M200 224 V268 L752 396 V440"
            stroke="#000000"
            strokeWidth="18"
            strokeLinejoin="miter"
            strokeLinecap="butt"
          />

          {/* The final connector is visibly interrupted before 8 July. */}
          <path
            d="M752 584 V628 L504 685.5"
            stroke="#E60000"
            strokeWidth="18"
            strokeLinejoin="miter"
            strokeLinecap="butt"
          />
          <path
            d="M448 698.5 L200 756 V800"
            stroke="#E60000"
            strokeWidth="18"
            strokeLinejoin="miter"
            strokeLinecap="butt"
          />

          {/* Exactly three equal-sized date shelves. */}
          <rect x="0" y="80" width="400" height="144" fill="#F5F5F5" />
          <rect x="552" y="440" width="400" height="144" fill="#F5F5F5" />
          <rect x="0" y="800" width="400" height="144" fill="#F5F5F5" />

          <path d="M0 80 H400" stroke="#000000" strokeWidth="4" />
          <path d="M552 440 H952" stroke="#000000" strokeWidth="4" />
          <path d="M0 800 H400" stroke="#E60000" strokeWidth="4" />
        </svg>

        <ol className="relative m-0 h-full w-full list-none p-0">
          {events.map(({ item, top, reversed }, index) => (
            <li
              key={index}
              className="absolute left-0 grid min-h-[144px] w-full grid-cols-[minmax(0,1fr)_minmax(0,1fr)] items-center gap-[152px]"
              style={{ top }}
            >
              <h2
                className={[
                  'row-start-1 flex min-h-[144px] items-center px-8',
                  'font-[var(--font-mono)] text-[38px] font-semibold leading-tight tracking-[-0.035em]',
                  reversed ? 'col-start-2' : 'col-start-1',
                  index === 2 ? 'text-[var(--accent)]' : '',
                ].join(' ')}
              >
                {item?.title}
              </h2>

              <p
                className={[
                  'row-start-1 font-[var(--font-body)] text-[28px] leading-snug',
                  reversed ? 'col-start-1' : 'col-start-2',
                ].join(' ')}
              >
                {item?.body}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
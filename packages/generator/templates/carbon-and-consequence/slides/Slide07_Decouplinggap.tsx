import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

export default function Slide07({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  void brand;
  void totalSlides;

  return (
    <section className="flex flex-col h-full min-h-0 w-full text-[var(--ink)]">
      <header className="flex flex-col gap-5">
        <p className="font-[var(--font-mono)] text-[20px] leading-7 tracking-wider text-[var(--accent)]">
          {slide.kicker}
        </p>

        <h1 className="max-w-[940px] font-[var(--font-headline)] text-[64px] font-bold leading-[1.04] tracking-[-0.035em]">
          {slide.headline}
        </h1>

        <p className="max-w-[860px] font-[var(--font-body)] text-[28px] leading-snug">
          {slide.subheadline}
        </p>
      </header>

      <div className="mt-10 flex flex-col">
        <div className="grid h-[300px] grid-cols-[minmax(0,1fr)_304px] items-center gap-10">
          <svg
            viewBox="0 0 560 252"
            className="block h-auto w-full text-[var(--accent)]"
            role="img"
            aria-label="59 countries"
          >
            {Array.from({ length: 59 }, (_, index) => {
              const column = index % 10;
              const row = Math.floor(index / 10);

              return (
                <circle
                  key={index}
                  cx={24 + column * 51 + Math.floor(column / 5) * 22}
                  cy={24 + row * 38 + Math.floor(row / 3) * 18}
                  r={6}
                  fill="currentColor"
                />
              );
            })}
          </svg>

          <div className="flex min-w-0 flex-col items-start border-l border-[var(--border)] py-5 pl-8">
            <p className="font-[var(--font-mono)] text-[112px] font-bold leading-none tracking-[-0.075em] text-[var(--accent)]">
              59
            </p>
            <p className="mt-5 font-[var(--font-body)] text-[26px] leading-snug">
              Countries cutting emissions while economies grew
            </p>
          </div>
        </div>

        <div className="mt-8 border-t-2 border-[var(--ink)] bg-[var(--surface)] px-8 py-10">
          <div className="grid grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] items-center gap-10">
            <p className="whitespace-nowrap font-[var(--font-mono)] text-[112px] font-bold leading-none tracking-[-0.075em]">
              +0.8%
            </p>

            <p className="border-l border-[var(--border)] py-3 pl-8 font-[var(--font-body)] text-[28px] leading-snug">
              Global average annual emissions growth
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
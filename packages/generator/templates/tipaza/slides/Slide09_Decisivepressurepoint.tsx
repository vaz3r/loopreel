import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

export default function Slide09({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  void brand;
  void totalSlides;

  const items = slide.items ?? [];
  const returnItem = items[0];
  const foundationItem = items[1];

  return (
    <section className="flex flex-col h-full min-h-0 w-full text-[var(--ink)]">
      <div className="flex h-full min-h-0 flex-col gap-10 bg-white">
        <header className="flex shrink-0 flex-col gap-8">
          <div className="h-[2px] w-full bg-[var(--ink)]" />

          <p className="font-[var(--font-mono)] text-[20px] uppercase leading-snug tracking-[0.16em] text-[var(--accent)]">
            {slide.kicker}
          </p>

          <h1 className="max-w-[900px] font-[var(--font-headline)] text-[58px] font-bold leading-[1.02] tracking-[-0.04em]">
            {slide.headline}
          </h1>

          <p className="max-w-[790px] font-[var(--font-body)] text-[28px] leading-snug">
            {slide.subheadline}
          </p>
        </header>

        <main className="flex min-h-[600px] flex-1 flex-col justify-center">
          <div className="flex flex-col items-center text-center">
            <p className="font-[var(--font-mono)] text-[160px] font-bold leading-none tracking-[-0.07em] text-[var(--accent)]">
              {foundationItem?.badge}
            </p>

            <svg
              aria-hidden="true"
              focusable="false"
              viewBox="0 0 952 36"
              className="mt-7 block h-[36px] w-full shrink-0 text-[var(--ink)]"
              fill="none"
            >
              <path
                d="M0 18H952"
                stroke="currentColor"
                strokeWidth="6"
              />
              <path
                d="M3 18V36M949 18V36"
                stroke="currentColor"
                strokeWidth="6"
              />
            </svg>

            <h2 className="mt-7 font-[var(--font-headline)] text-[38px] font-semibold leading-tight tracking-[-0.02em]">
              {foundationItem?.label || foundationItem?.title}
            </h2>

            <p className="mt-5 max-w-[760px] font-[var(--font-body)] text-[28px] leading-normal">
              {foundationItem?.body}
            </p>
          </div>
        </main>

        <aside className="flex shrink-0 flex-col gap-6 border-t border-[var(--border)] bg-[var(--surface)] px-10 py-9">
          <p className="font-[var(--font-mono)] text-[34px] font-semibold leading-tight tracking-[-0.035em]">
            {returnItem?.badge}
          </p>

          <div className="grid grid-cols-[320px_minmax(0,1fr)] gap-8 border-t border-[var(--border)] pt-6">
            <h2 className="font-[var(--font-headline)] text-[32px] font-semibold leading-tight tracking-[-0.02em]">
              {returnItem?.label || returnItem?.title}
            </h2>

            <p className="min-w-0 font-[var(--font-body)] text-[28px] leading-snug">
              {returnItem?.body}
            </p>
          </div>
        </aside>
      </div>
    </section>
  );
}
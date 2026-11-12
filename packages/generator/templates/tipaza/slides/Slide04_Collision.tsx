import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

export default function Slide04({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  const items = slide.items ?? [];
  const item0 = items[0];
  const item1 = items[1];

  void brand;
  void totalSlides;

  return (
    <section className="flex flex-col h-full min-h-0 w-full text-[var(--ink)]">
      <header className="shrink-0 bg-white px-8 pb-12 pt-6 [--ink:#000000]">
        <div className="mb-8 flex items-center gap-5">
          <span
            aria-hidden="true"
            className="h-[6px] w-10 shrink-0 bg-[var(--accent)]"
          />
          <p className="font-[var(--font-mono)] text-[20px] font-medium uppercase leading-snug tracking-[0.12em] text-[var(--accent)]">
            {slide.kicker}
          </p>
        </div>

        <h1 className="max-w-[820px] font-[var(--font-headline)] text-[58px] font-bold leading-[1.02] tracking-[-0.04em] text-[var(--ink)]">
          {slide.headline}
        </h1>

        <p className="mt-7 max-w-[820px] font-[var(--font-body)] text-[30px] leading-snug text-[var(--ink)]">
          {slide.subheadline}
        </p>
      </header>

      <div className="relative grid min-h-0 flex-1 grid-cols-[minmax(0,1fr)_6px_minmax(0,1fr)] border-t border-[var(--border)]">
        <article className="grid min-w-0 grid-rows-2 bg-white text-[var(--ink)] [--ink:#000000]">
          <div className="flex min-h-0 flex-col justify-center px-8 pb-14 pt-10">
            <p className="font-[var(--font-mono)] text-[42px] font-bold leading-[1.12] tracking-[-0.045em]">
              {item0?.badge}
            </p>

            <h2 className="mt-12 max-w-[350px] font-[var(--font-headline)] text-[36px] font-semibold leading-[1.08] tracking-[-0.025em]">
              {item0?.label || item0?.title}
            </h2>
          </div>

          <div className="flex min-h-0 flex-col justify-center px-8 pb-14 pt-14">
            <p className="max-w-[365px] font-[var(--font-body)] text-[28px] leading-normal">
              {item0?.body}
            </p>
          </div>
        </article>

        <div
          aria-hidden="true"
          className="h-full bg-[var(--accent)]"
        />

        <article className="grid min-w-0 grid-rows-2 bg-black text-[var(--ink)] [--ink:#FFFFFF]">
          <div className="flex min-h-0 flex-col justify-center px-8 pb-14 pt-10">
            <p className="font-[var(--font-mono)] text-[42px] font-bold leading-[1.12] tracking-[-0.045em]">
              {item1?.badge}
            </p>

            <h2 className="mt-12 max-w-[350px] font-[var(--font-headline)] text-[36px] font-semibold leading-[1.08] tracking-[-0.025em]">
              {item1?.label || item1?.title}
            </h2>
          </div>

          <div className="flex min-h-0 flex-col justify-center px-8 pb-14 pt-14">
            <p className="max-w-[365px] font-[var(--font-body)] text-[28px] leading-normal">
              {item1?.body}
            </p>
          </div>
        </article>

        <svg
          aria-hidden="true"
          focusable="false"
          viewBox="0 0 952 80"
          preserveAspectRatio="none"
          className="pointer-events-none absolute left-0 top-1/2 h-20 w-full -translate-y-1/2"
          fill="none"
        >
          <path
            d="M32 40H448"
            stroke="#000000"
            strokeWidth="3"
            vectorEffect="non-scaling-stroke"
          />
          <path
            d="M504 40H920"
            stroke="#FFFFFF"
            strokeWidth="3"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
      </div>
    </section>
  );
}
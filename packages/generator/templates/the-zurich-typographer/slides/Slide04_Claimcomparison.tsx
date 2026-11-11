import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

export default function Slide04({ slide }: SlideComponentProps) {
  const items = slide.items ?? [];

  return (
    <section className="flex flex-col h-full min-h-0 w-full text-[var(--ink)]">
      <div className="relative flex min-h-0 w-full flex-1 flex-col">
        <svg
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 h-full w-full"
          viewBox="0 0 952 1596"
          preserveAspectRatio="none"
        >
          <path d="M0 0H476V1596H0Z" fill="#FFFFFF" />
          <path d="M476 0H952V1596H476Z" fill="#F5F5F5" />
          <path
            d="M476 0V1596"
            stroke="#E60000"
            strokeWidth="2"
            vectorEffect="non-scaling-stroke"
          />
        </svg>

        <div className="relative z-10 px-7 pt-10">
          <p className="font-[var(--font-mono)] text-[22px] leading-snug tracking-[0.12em] text-[var(--accent)]">
            {slide.kicker}
          </p>

          <h1 className="mt-9 max-w-[860px] font-[var(--font-headline)] text-[68px] font-bold leading-[1.04] tracking-[-0.045em]">
            {slide.headline}
          </h1>

          <p className="mt-8 max-w-[820px] font-[var(--font-body)] text-[28px] leading-snug">
            {slide.subheadline}
          </p>
        </div>

        <div className="relative z-10 mt-24 grid min-h-0 flex-1 grid-cols-2">
          <article className="flex min-w-0 flex-col px-7 pb-12">
            <div className="flex h-[220px] shrink-0 flex-col justify-end">
              <p className="font-[var(--font-headline)] text-[52px] font-bold leading-[1.12] tracking-[-0.035em]">
                February
              </p>
              <p className="mt-3 font-[var(--font-mono)] text-[112px] font-bold leading-none tracking-[-0.065em]">
                2026
              </p>
            </div>

            <div className="mt-12 border-t border-[var(--border)] pt-7">
              <h2 className="min-h-[96px] font-[var(--font-headline)] text-[32px] font-semibold leading-snug tracking-[-0.02em]">
                {items?.label}
              </h2>
              <p className="mt-7 font-[var(--font-body)] text-[28px] leading-normal">
                {items?.body}
              </p>
            </div>
          </article>

          <article className="flex min-w-0 flex-col px-7 pb-12">
            <div className="flex h-[220px] shrink-0 flex-col justify-end">
              <p className="font-[var(--font-mono)] text-[112px] font-bold leading-none tracking-[-0.065em] text-[var(--accent)]">
                2035
              </p>
            </div>

            <div className="mt-12 border-t border-[var(--border)] pt-7">
              <h2 className="min-h-[96px] font-[var(--font-headline)] text-[32px] font-semibold leading-snug tracking-[-0.02em]">
                {items?.label}
              </h2>
              <p className="mt-7 font-[var(--font-body)] text-[28px] leading-normal">
                {items?.body}
              </p>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
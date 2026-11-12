import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

export default function Slide03({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  void brand;
  void totalSlides;

  const items = slide.items ?? [];
  const assurance = items[0];
  const architecture = items[1];
  const subscription = items[2];

  return (
    <section className="flex flex-col h-full min-h-0 w-full text-[var(--ink)]">
      <header className="shrink-0">
        <div className="mb-7 flex items-center gap-4">
          <span
            aria-hidden="true"
            className="h-[12px] w-[12px] shrink-0 bg-[var(--accent)]"
          />
          <p className="font-[var(--font-mono)] text-[20px] uppercase leading-snug tracking-[0.12em] text-[var(--accent)]">
            {slide.kicker}
          </p>
        </div>

        <h1 className="max-w-[920px] font-[var(--font-headline)] text-[60px] font-bold leading-[1.04] tracking-[-0.04em] [text-wrap:balance]">
          {slide.headline}
        </h1>

        <p className="mt-7 max-w-[880px] font-[var(--font-body)] text-[28px] leading-snug">
          {slide.subheadline}
        </p>

        <div className="mt-8 h-px w-full bg-[var(--border)]" />
      </header>

      <div className="flex min-h-0 flex-1 flex-col justify-evenly gap-8 py-8">
        <article className="relative flex min-h-[280px] w-full shrink-0 flex-col justify-center border border-[var(--border)] bg-[var(--surface)] px-10 py-9">
          <span
            aria-hidden="true"
            className="absolute -left-px top-9 h-[58px] w-[5px] bg-[var(--accent)]"
          />

          <div className="mb-6 flex items-center justify-between gap-6">
            <h2 className="font-[var(--font-headline)] text-[34px] font-semibold leading-tight tracking-[-0.02em]">
              {assurance?.title}
            </h2>
            <svg
              aria-hidden="true"
              viewBox="0 0 64 40"
              className="h-[40px] w-[64px] shrink-0 text-[var(--accent)]"
              fill="none"
            >
              <path
                d="M2 2H22V38H2M42 2H62V38H42"
                stroke="currentColor"
                strokeWidth="2"
              />
              <path d="M27 20H37" stroke="currentColor" strokeWidth="2" />
            </svg>
          </div>

          <p className="max-w-[840px] font-[var(--font-body)] text-[30px] leading-[1.4]">
            {assurance?.body}
          </p>
        </article>

        <article className="relative ml-[80px] flex min-h-[350px] w-[calc(100%-80px)] shrink-0 flex-col justify-center border border-[var(--border)] bg-[var(--surface)] px-10 py-9">
          <svg
            aria-hidden="true"
            viewBox="0 0 460 280"
            className="pointer-events-none absolute right-3 top-5 h-[280px] w-[460px] text-[var(--ink)] opacity-[0.07]"
            fill="none"
          >
            <path
              d="M102 218C58 218 30 190 30 154C30 118 57 89 94 87C105 45 142 20 186 20C235 20 275 52 285 96C296 90 311 86 326 86C365 86 397 114 401 151C419 156 432 172 432 191C432 214 414 232 391 232H143"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinejoin="round"
            />
            <path
              d="M158 250H274M192 265H240"
              stroke="currentColor"
              strokeWidth="2"
            />
          </svg>

          <span
            aria-hidden="true"
            className="absolute -left-px top-9 h-[58px] w-[5px] bg-[var(--accent)]"
          />

          <div className="relative">
            <div
              aria-hidden="true"
              className="mb-6 h-[3px] w-[48px] bg-[var(--accent)]"
            />
            <h2 className="mb-6 font-[var(--font-headline)] text-[34px] font-semibold leading-tight tracking-[-0.02em]">
              {architecture?.title}
            </h2>
            <p className="font-[var(--font-body)] text-[30px] leading-[1.4]">
              {architecture?.body}
            </p>
          </div>
        </article>

        <article className="relative mr-[128px] flex min-h-[300px] w-[calc(100%-128px)] shrink-0 flex-col justify-center border border-[var(--border)] bg-[var(--surface)] px-10 py-9">
          <span
            aria-hidden="true"
            className="absolute -left-px top-9 h-[58px] w-[5px] bg-[var(--accent)]"
          />

          <div className="mb-6 flex items-center justify-between gap-6">
            <h2 className="font-[var(--font-headline)] text-[34px] font-semibold leading-tight tracking-[-0.02em]">
              {subscription?.title}
            </h2>

            <svg
              aria-hidden="true"
              viewBox="0 0 72 76"
              className="h-[76px] w-[72px] shrink-0 text-[var(--accent)]"
              fill="none"
            >
              <path
                d="M9 17H63V67H9V17ZM9 32H63M23 8V24M49 8V24"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="square"
              />
              <path
                d="M22 44H28M43 44H49M22 55H28M43 55H49"
                stroke="currentColor"
                strokeWidth="3"
              />
            </svg>
          </div>

          <p className="font-[var(--font-body)] text-[30px] leading-[1.4]">
            {subscription?.body}
          </p>
        </article>
      </div>
    </section>
  );
}
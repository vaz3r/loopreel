import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

export default function Slide02({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  const items = slide.items ?? [];
  const item0 = items[0];
  const item1 = items[1];

  const pixelRows = [
    [0, 1, 2, 4, 5, 7, 9],
    [0, 2, 3, 5, 6, 8],
    [1, 2, 4, 6, 7, 9],
    [0, 1, 3, 4, 6, 8],
  ];

  return (
    <section className="flex flex-col h-full min-h-0 w-full text-[var(--ink)]">
      <header className="shrink-0">
        <p className="font-[var(--font-mono)] text-[20px] leading-[28px] tracking-[0.12em] uppercase">
          {slide.kicker}
        </p>

        <h1 className="mt-4 max-w-[900px] font-[var(--font-headline)] text-[54px] font-bold leading-[1.05] tracking-[-0.04em]">
          {slide.headline}
        </h1>

        <p className="mt-4 max-w-[880px] font-[var(--font-body)] text-[28px] leading-[36px]">
          {slide.subheadline}
        </p>
      </header>

      <div className="mt-7 flex shrink-0 flex-col gap-6">
        <article className="mr-[64px] border border-[var(--border)] bg-[var(--surface)] px-7 py-6">
          <svg
            viewBox="0 0 832 64"
            fill="none"
            aria-hidden="true"
            className="block h-[64px] w-full text-[var(--ink)]"
          >
            <g fill="currentColor">
              {pixelRows.map((columns, row) =>
                columns.map((column) => (
                  <rect
                    key={`${row}-${column}`}
                    x={column * 21}
                    y={row * 16}
                    width="11"
                    height="11"
                    opacity={0.12 + ((column + row) % 3) * 0.08}
                  />
                )),
              )}
              <rect x="229" y="5" width="8" height="8" opacity=".26" />
              <rect x="248" y="24" width="6" height="6" opacity=".2" />
              <rect x="232" y="46" width="9" height="9" opacity=".16" />
              <rect x="274" y="13" width="4" height="4" opacity=".3" />
              <rect x="283" y="45" width="4" height="4" opacity=".2" />
            </g>

            <g stroke="currentColor" strokeWidth="1.5" opacity=".3">
              <path d="M310 10H438L462 25H832" />
              <path d="M310 31H540L564 12H832" />
              <path d="M310 53H466L489 42H832" />
            </g>

            <path
              d="M310 1V63"
              stroke="var(--accent)"
              strokeWidth="3"
            />
            <g fill="currentColor" opacity=".5">
              <circle cx="462" cy="25" r="3" />
              <circle cx="564" cy="12" r="3" />
              <circle cx="489" cy="42" r="3" />
            </g>
          </svg>

          <div className="mt-4 flex items-center gap-7">
            <p className="shrink-0 font-[var(--font-mono)] text-[52px] font-bold leading-[62px] tracking-[-0.05em]">
              {item0?.badge}
            </p>
            <div className="h-[44px] w-px shrink-0 bg-[var(--border)]" />
            <h2 className="min-w-0 font-[var(--font-headline)] text-[32px] font-semibold leading-[38px] tracking-[-0.025em]">
              {item0?.title || item0?.label}
            </h2>
          </div>

          <p className="mt-3 font-[var(--font-body)] text-[28px] leading-[36px]">
            {item0?.body}
          </p>
        </article>

        <article className="ml-[64px] border border-[var(--border)] bg-[var(--surface)] px-7 py-6">
          <svg
            viewBox="0 0 832 56"
            fill="none"
            aria-hidden="true"
            className="block h-[56px] w-full text-[var(--ink)]"
          >
            <g stroke="currentColor" strokeWidth="1" opacity=".12">
              <path d="M0 8H832M0 18H832M0 28H832M0 38H832M0 48H832" />
              <path d="M104 0V56M312 0V56M520 0V56M728 0V56" />
            </g>

            <g stroke="currentColor" strokeLinecap="round">
              <path
                d="M0 28C50 28 64 25 88 28S122 45 147 28S180 2 205 28S236 52 260 28S291 10 316 28S345 45 370 28S403 1 429 28S459 53 484 28S517 8 544 28S576 44 604 28S636 15 665 28S705 34 735 28S790 28 832 28"
                strokeWidth="2"
                opacity=".65"
              />
              <path
                d="M0 28C90 28 96 33 122 28S155 11 181 28S210 43 238 28S268 3 295 28S324 53 351 28S384 11 411 28S442 45 470 28S502 2 530 28S560 51 589 28S619 14 647 28S683 39 714 28S786 28 832 28"
                strokeWidth="1.5"
                opacity=".3"
              />
            </g>
          </svg>

          <div className="mt-4 flex items-center gap-7">
            <p className="relative shrink-0 font-[var(--font-mono)] text-[52px] font-bold leading-[62px] tracking-[-0.05em]">
              {item1?.badge}
              <span
                aria-hidden="true"
                className="absolute inset-x-0 bottom-0 h-[3px] bg-[var(--accent)]"
              />
            </p>
            <div className="h-[44px] w-px shrink-0 bg-[var(--border)]" />
            <h2 className="min-w-0 font-[var(--font-headline)] text-[32px] font-semibold leading-[38px] tracking-[-0.025em]">
              {item1?.title || item1?.label}
            </h2>
          </div>

          <p className="mt-3 font-[var(--font-body)] text-[28px] leading-[36px]">
            {item1?.body}
          </p>
        </article>
      </div>

      {/* Reserved source-footnote space; no source copy was supplied. */}
      <div aria-hidden="true" className="mt-auto shrink-0 pt-6">
        <div className="h-[48px] border-t border-[var(--border)]" />
      </div>
    </section>
  );
}
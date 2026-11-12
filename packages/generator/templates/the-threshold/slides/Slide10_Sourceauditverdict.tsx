import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

export default function Slide10({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  return (
    <section className="flex flex-col h-full min-h-0 w-full text-[var(--ink)]">
      <div className="shrink-0 border-t-2 border-[var(--accent)] pt-6">
        <p className="font-[var(--font-mono)] text-[20px] leading-[28px] tracking-[0.12em] text-[var(--accent)]">
          {slide.kicker}
        </p>

        <h1 className="mt-6 max-w-[920px] font-[var(--font-headline)] text-[68px] font-bold leading-[1.04] tracking-[-0.035em]">
          {slide.headline}
        </h1>

        <p className="mt-6 max-w-[900px] font-[var(--font-body)] text-[28px] leading-[1.35]">
          {slide.subheadline}
        </p>
      </div>

      <ul className="mt-9 flex min-h-0 flex-1 list-none flex-col border-t border-[var(--border)] p-0">
        {(slide.items ?? []).map((item: any, index: number) => (
          <li
            key={`${index}-${item.label}`}
            className="flex flex-1 items-center gap-7 border-b border-[var(--border)] py-6"
          >
            <div className="w-[36px] shrink-0 self-start pt-2">
              <svg
                aria-hidden="true"
                focusable="false"
                viewBox="0 0 36 36"
                className="h-[36px] w-[36px] text-[var(--ink)]"
                fill="none"
              >
                <rect
                  x="5"
                  y="5"
                  width="26"
                  height="26"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </svg>
            </div>

            <div className="min-w-0 flex-1">
              <h2 className="font-[var(--font-headline)] text-[34px] font-semibold leading-[1.15] tracking-[-0.015em]">
                {item.label}
              </h2>

              <svg
                aria-hidden="true"
                focusable="false"
                viewBox="0 0 104 6"
                className="mt-3 h-[6px] w-[104px] text-[var(--accent)]"
                fill="none"
              >
                <path
                  d="M1 3H103"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </svg>

              <p className="mt-3 max-w-[850px] font-[var(--font-body)] text-[26px] leading-[1.35]">
                {item.body}
              </p>
            </div>
          </li>
        ))}
      </ul>

      <div className="flex shrink-0 justify-end pt-6">
        <span className="font-[var(--font-mono)] text-[20px] leading-[28px] tracking-[0.04em]">
          thethreshold.tech
        </span>
      </div>
    </section>
  );
}
import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

export default function Slide03({ slide }: SlideComponentProps) {
  const items = slide.items ?? [];
  const decemberBody = items?.body ?? '';
  const quotationIndex = decemberBody.indexOf('“');
  const introduction =
    quotationIndex >= 0
      ? decemberBody.slice(0, quotationIndex).trim()
      : decemberBody;
  const quotation =
    quotationIndex >= 0 ? decemberBody.slice(quotationIndex) : '';

  return (
    <section className="flex flex-col h-full min-h-0 w-full text-[var(--ink)]">
      <header className="shrink-0">
        <div
          aria-hidden="true"
          className="mb-7 h-[8px] w-[88px] bg-[var(--accent)]"
        />

        <p className="font-[var(--font-mono)] text-[22px] font-semibold uppercase leading-[1.3] tracking-[0.14em] text-[var(--accent)]">
          {slide.kicker}
        </p>

        <h1 className="mt-7 max-w-[920px] font-[var(--font-headline)] text-[68px] font-bold leading-[1.04] tracking-[-0.045em]">
          {slide.headline}
        </h1>

        <p className="mt-8 max-w-[780px] font-[var(--font-body)] text-[28px] leading-[1.4]">
          {slide.subheadline}
        </p>
      </header>

      <div className="relative mt-16 h-[1000px] shrink-0">
        <svg
          aria-hidden="true"
          focusable="false"
          className="pointer-events-none absolute left-0 top-0 h-[1000px] w-[40px]"
          viewBox="0 0 40 1000"
          fill="none"
        >
          <path
            d="M20 24V980"
            stroke="#000000"
            strokeWidth="2"
            vectorEffect="non-scaling-stroke"
          />
          <rect x="12" y="16" width="16" height="16" fill="#E60000" />
          <rect x="12" y="436" width="16" height="16" fill="#E60000" />
          <path
            d="M12 980H28"
            stroke="#000000"
            strokeWidth="2"
            vectorEffect="non-scaling-stroke"
          />
        </svg>

        <div className="grid h-full grid-rows-[420px_580px] pl-[76px]">
          <article className="flex min-h-0 flex-col pr-6">
            <h2 className="font-[var(--font-headline)] text-[36px] font-semibold leading-[48px] tracking-[-0.025em]">
              {items?.label}
            </h2>

            <div className="mt-7 border-t border-[var(--border)] pt-8">
              <p className="max-w-[700px] font-[var(--font-body)] text-[28px] leading-[1.5]">
                {items?.body}
              </p>
            </div>
          </article>

          <article className="flex min-h-0 flex-col pr-6">
            <h2 className="font-[var(--font-headline)] text-[36px] font-semibold leading-[48px] tracking-[-0.025em]">
              {items?.label}
            </h2>

            <div className="mt-7 border-t border-[var(--border)] pt-8">
              <p className="max-w-[700px] font-[var(--font-body)] text-[28px] leading-[1.5]">
                {introduction}
              </p>
            </div>

            {quotation && (
              <blockquote className="mt-auto border-t border-[var(--border)] pb-7 pt-10">
                <p className="max-w-[790px] font-[var(--font-headline)] text-[68px] font-bold leading-[1.08] tracking-[-0.04em] text-[var(--accent)]">
                  {quotation}
                </p>
              </blockquote>
            )}
          </article>
        </div>
      </div>
    </section>
  );
}
import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

type ExposureCard = {
  title?: string;
  label?: string;
  body?: string;
};

type ExposureTelemetry = {
  value: string;
  label: string;
};

export default function Slide08({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  void brand;
  void totalSlides;

  const data = slide as typeof slide & {
    kicker?: string;
    headline?: string;
    subheadline?: string;
    cards?: ExposureCard[];
    items?: ExposureCard[];
    telemetry?: ExposureTelemetry[];
  };

  const items = data.cards ?? data.items ?? [];
  const item0 = items[0];
  const item1 = items[1];

  const oilMetric = data.telemetry?.[0];
  const fertilizerMetric = data.telemetry?.[1];

  return (
    <section className="flex flex-col h-full min-h-0 w-full text-[var(--ink)]">
      <header className="shrink-0">
        <div className="flex items-center gap-5 border-t border-[var(--border)] pt-6">
          <span
            aria-hidden="true"
            className="h-3 w-3 shrink-0 bg-[var(--accent)]"
          />
          <p className="font-[var(--font-mono)] text-[20px] uppercase leading-normal tracking-[0.12em] text-[var(--accent)]">
            {data.kicker}
          </p>
        </div>

        <h1 className="mt-8 max-w-[900px] font-[var(--font-headline)] text-[68px] font-bold leading-[1.02] tracking-[-0.04em]">
          {data.headline}
        </h1>

        <p className="mt-6 max-w-[850px] font-[var(--font-body)] text-[28px] leading-snug">
          {data.subheadline}
        </p>
      </header>

      <div className="mt-10 flex min-h-0 flex-1 flex-col justify-center gap-9 pb-6">
        <article className="relative w-[calc(100%-88px)] shrink-0 self-start border border-[var(--border)] bg-white px-9 py-8">
          <div className="flex items-center justify-between gap-6">
            <h2 className="font-[var(--font-headline)] text-[36px] font-semibold leading-tight tracking-[-0.025em]">
              {item0?.title || item0?.label}
            </h2>

            <svg
              aria-hidden="true"
              viewBox="0 0 64 64"
              className="h-16 w-16 shrink-0 text-[var(--ink)]"
              fill="none"
            >
              <path
                d="M32 7C27 17 15 29 15 40a17 17 0 0 0 34 0C49 29 37 17 32 7Z"
                stroke="currentColor"
                strokeWidth="2"
              />
              <path
                d="M23 40a9 9 0 0 0 9 9"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </div>

          <p
            aria-label={oilMetric?.label}
            className="mt-8 font-[var(--font-mono)] text-[88px] font-bold leading-[1.02] tracking-[-0.065em] text-[var(--ink)]"
          >
            {oilMetric?.value ?? '25 per cent'}
          </p>

          <div className="mt-5 flex items-center gap-4">
            <span
              aria-hidden="true"
              className="h-px w-12 bg-[var(--ink)]"
            />
            <p className="font-[var(--font-mono)] text-[21px] uppercase leading-normal tracking-[0.12em]">
              2024 baseline
            </p>
          </div>

          <div className="mt-8 border-t border-[var(--border)] pt-6">
            <p className="max-w-[710px] font-[var(--font-body)] text-[28px] leading-snug">
              {item0?.body}
            </p>
          </div>
        </article>

        <article className="relative w-[calc(100%-88px)] shrink-0 self-end border border-[var(--border)] bg-[var(--surface)] px-9 py-8">
          <div className="flex items-center justify-between gap-6">
            <h2 className="font-[var(--font-headline)] text-[36px] font-semibold leading-tight tracking-[-0.025em]">
              {item1?.title || item1?.label}
            </h2>

            <svg
              aria-hidden="true"
              viewBox="0 0 64 64"
              className="h-16 w-16 shrink-0 text-[var(--accent)]"
              fill="none"
            >
              <path
                d="M32 57V14M32 14V6"
                stroke="currentColor"
                strokeWidth="2"
              />
              <path
                d="M32 27C21 27 16 21 16 13C26 13 32 19 32 27ZM32 40C21 40 16 34 16 26C26 26 32 32 32 40ZM32 27C43 27 48 21 48 13C38 13 32 19 32 27ZM32 40C43 40 48 34 48 26C38 26 32 32 32 40Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinejoin="round"
              />
              <path
                d="M23 57H41"
                stroke="currentColor"
                strokeWidth="2"
              />
            </svg>
          </div>

          <p
            aria-label={fertilizerMetric?.label}
            className="mt-8 font-[var(--font-mono)] text-[88px] font-bold leading-[1.02] tracking-[-0.065em] text-[var(--accent)]"
          >
            {(fertilizerMetric?.value ?? '16 million tonnes') ===
            '16 million tonnes' ? (
              <>
                <span className="block">16 million</span>
                <span className="block">tonnes</span>
              </>
            ) : (
              fertilizerMetric?.value
            )}
          </p>

          <div className="mt-5 flex items-center gap-4">
            <span
              aria-hidden="true"
              className="h-px w-12 bg-[var(--ink)]"
            />
            <p className="font-[var(--font-mono)] text-[21px] uppercase leading-normal tracking-[0.12em]">
              2024 baseline
            </p>
          </div>

          <div className="mt-8 border-t border-[var(--border)] pt-6">
            <p className="max-w-[710px] font-[var(--font-body)] text-[28px] leading-snug">
              {item1?.body}
            </p>
          </div>
        </article>
      </div>
    </section>
  );
}
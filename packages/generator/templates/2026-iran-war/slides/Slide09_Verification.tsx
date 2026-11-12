import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

type TelemetryEntry = {
  badge: string;
  label: string;
  body: string;
};

type LedgerCard = {
  title: string;
  body: string;
};

function SignalMargin({ interrupted = false }: { interrupted?: boolean }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 48 160"
      className="h-[160px] w-[48px] text-[var(--accent)]"
      fill="none"
    >
      <path
        d="M24 0V160"
        stroke="var(--border)"
        strokeWidth="1"
        strokeDasharray="2 7"
      />
      <path
        d={
          interrupted
            ? 'M24 0V20L17 27L32 35L9 44L39 54L17 64L24 71V87'
            : 'M24 0V20L18 28L31 36L10 46L38 57L15 68L29 78L24 86V105L17 113L32 122L13 132L30 142L24 149V160'
        }
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      {interrupted && (
        <>
          <path
            d="M16 97L32 89M16 109L32 101"
            stroke="currentColor"
            strokeWidth="2"
          />
          <path
            d="M24 121V160"
            stroke="var(--border)"
            strokeWidth="2"
            strokeDasharray="4 7"
          />
        </>
      )}
    </svg>
  );
}

export default function Slide09({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  const content = slide as typeof slide & {
    telemetry?: TelemetryEntry[];
    cards?: LedgerCard[];
  };

  const telemetry = content.telemetry ?? [];
  const cards = content.cards ?? [];
  const outage = telemetry[0];
  const reportedReturn = telemetry[1];
  const caution = cards[0];

  void brand;
  void totalSlides;

  return (
    <section className="flex flex-col h-full min-h-0 w-full text-[var(--ink)]">
      <header className="shrink-0">
        <div className="mb-6 flex items-center gap-4">
          <span
            aria-hidden="true"
            className="h-[10px] w-[10px] shrink-0 bg-[var(--accent)]"
          />
          <p className="font-[var(--font-mono)] text-[20px] leading-[28px] tracking-[0.12em] text-[var(--accent)]">
            {slide.kicker}
          </p>
        </div>

        <h1 className="max-w-[850px] font-[var(--font-headline)] text-[64px] font-bold leading-[1.02] tracking-[-0.04em]">
          {slide.headline}
        </h1>

        <p className="mt-5 max-w-[820px] font-[var(--font-body)] text-[28px] leading-snug">
          {slide.subheadline}
        </p>
      </header>

      <div className="mt-8 grid min-h-0 flex-1 grid-rows-[1fr_1.12fr_0.92fr] border-y border-[var(--border)]">
        <article className="grid grid-cols-[48px_minmax(0,1fr)_204px] items-center gap-6 border-b border-[var(--border)] px-6 py-6">
          <div className="flex justify-center self-stretch">
            <SignalMargin interrupted />
          </div>

          <div className="min-w-0">
            <h2 className="font-[var(--font-headline)] text-[34px] font-semibold leading-[1.12] tracking-[-0.025em]">
              {outage?.label}
            </h2>
            <p className="mt-3 font-[var(--font-body)] text-[24px] leading-[32px]">
              {outage?.body}
            </p>
          </div>

          <div className="self-start border-l-2 border-[var(--accent)] bg-[var(--surface)] px-4 py-4">
            <p className="whitespace-pre-line font-[var(--font-mono)] text-[34px] font-semibold leading-[1.15] tracking-[-0.04em] text-[var(--accent)]">
              {outage?.badge.replace(', ', ',\n')}
            </p>
          </div>
        </article>

        <article className="grid grid-cols-[48px_minmax(0,1fr)_204px] items-center gap-6 border-b border-[var(--border)] px-6 py-6">
          <div className="flex justify-center self-stretch">
            <SignalMargin />
          </div>

          <div className="min-w-0">
            <h2 className="font-[var(--font-headline)] text-[34px] font-semibold leading-[1.12] tracking-[-0.025em]">
              {reportedReturn?.label}
            </h2>
            <p className="mt-3 font-[var(--font-body)] text-[24px] leading-[32px]">
              {reportedReturn?.body}
            </p>
          </div>

          <div className="self-start border-l-2 border-[var(--accent)] bg-[var(--surface)] px-4 py-4">
            <p className="whitespace-nowrap font-[var(--font-mono)] text-[34px] font-semibold leading-[1.15] tracking-[-0.04em] text-[var(--accent)]">
              {reportedReturn?.badge}
            </p>
          </div>
        </article>

        <article className="grid grid-cols-[48px_minmax(0,1fr)] items-center gap-6 bg-[var(--surface)] px-6 py-6">
          <svg
            aria-hidden="true"
            viewBox="0 0 48 64"
            className="h-[64px] w-[48px] self-start text-[var(--accent)]"
            fill="none"
          >
            <path
              d="M8 8H40V48H8V8Z"
              stroke="currentColor"
              strokeWidth="2"
            />
            <path
              d="M24 18V32M24 38V40"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="square"
            />
          </svg>

          <div className="min-w-0">
            <h2 className="font-[var(--font-headline)] text-[34px] font-semibold leading-[1.12] tracking-[-0.025em]">
              {caution?.title}
            </h2>
            <p className="mt-3 max-w-[720px] font-[var(--font-body)] text-[24px] leading-[32px]">
              {caution?.body}
            </p>
          </div>
        </article>
      </div>
    </section>
  );
}
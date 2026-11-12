import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

type CoverData = {
  publication?: string;
  kicker?: string;
  headline?: string;
  subheadline?: string;
  issueBadge?: string;
  telemetry?: Array<{
    value: string;
    label: string;
  }>;
};

export default function Slide01({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  void brand;
  void totalSlides;

  const cover = slide as unknown as CoverData;
  const headline = cover.headline ?? 'The War That Outgrew Its Targets';
  const headlineLines =
    headline === 'The War That Outgrew Its Targets'
      ? ['The War', 'That Outgrew', 'Its', 'Targets']
      : [headline];

  const telemetry = cover.telemetry ?? [
    {
      value: '28 February 2026',
      label: 'Opening US–Israeli strikes',
    },
    {
      value: '$47.1 billion',
      label: 'Estimated US spending through Oct. 16',
    },
  ];

  return (
    <section className="flex flex-col h-full min-h-0 w-full text-[var(--ink)]">
      <div className="relative isolate flex h-full min-h-0 w-full flex-col bg-[var(--paper)] [--paper:#FFFFFF] [--ink:#000000] [--accent:#E60000] [--surface:#F5F5F5] [--border:#000000]">
        <svg
          aria-hidden="true"
          viewBox="0 0 540 960"
          preserveAspectRatio="xMidYMid meet"
          className="pointer-events-none absolute inset-0 -z-10 h-full w-full text-[var(--accent)]"
          fill="none"
        >
          <circle
            cx="270"
            cy="624"
            r="112"
            stroke="currentColor"
            strokeWidth="5"
            strokeDasharray="610 94"
            transform="rotate(-44 270 624)"
          />
        </svg>

        <div className="flex shrink-0 items-center justify-between gap-8 border-b border-[var(--border)] pb-7 pt-9">
          <p className="font-[var(--font-headline)] text-[32px] font-semibold leading-tight tracking-[-0.045em]">
            {cover.publication ?? 'The Zurich Typographer'}
          </p>
          <span
            aria-hidden="true"
            className="h-5 w-5 shrink-0 bg-[var(--accent)]"
          />
        </div>

        <div className="mt-12 flex shrink-0 flex-col items-start">
          <p className="font-[var(--font-mono)] text-[22px] font-medium uppercase leading-normal tracking-[0.16em] text-[var(--accent)]">
            {cover.kicker ?? 'GEOPOLITICS / SPECIAL REPORT'}
          </p>

          <h1
            aria-label={headline}
            className="mt-9 max-w-full font-[var(--font-headline)] text-[68px] font-bold leading-[1.02] tracking-[-0.04em]"
          >
            {headlineLines.map((line, index) => (
              <span key={index} aria-hidden="true" className="block">
                {line}
              </span>
            ))}
          </h1>

          <p className="mt-9 max-w-[760px] text-pretty font-[var(--font-body)] text-[28px] leading-snug tracking-[-0.015em]">
            {cover.subheadline ??
              'Nuclear talks gave way to strikes, maritime blockades and global economic disruption.'}
          </p>
        </div>

        <div aria-hidden="true" className="min-h-[400px] flex-1" />

        <div className="flex shrink-0 flex-col gap-8 pb-10">
          <dl className="flex flex-col gap-6 border-t border-[var(--border)] pt-7">
            {telemetry.slice(0, 2).map((item, index) => (
              <div
                key={`${item.value}-${index}`}
                className="grid grid-cols-[310px_minmax(0,1fr)] items-baseline gap-7"
              >
                <dt className="col-start-2 row-start-1 font-[var(--font-body)] text-[24px] leading-snug">
                  {item.label}
                </dt>
                <dd className="col-start-1 row-start-1 font-[var(--font-mono)] text-[26px] font-semibold leading-snug tracking-[-0.04em]">
                  {item.value}
                </dd>
              </div>
            ))}
          </dl>

          <p className="self-start border-l-[5px] border-[var(--accent)] bg-[var(--surface)] px-6 py-4 font-[var(--font-mono)] text-[22px] uppercase leading-normal tracking-[0.12em]">
            {cover.issueBadge ?? 'SPECIAL REPORT · 10 SLIDES'}
          </p>
        </div>
      </div>
    </section>
  );
}
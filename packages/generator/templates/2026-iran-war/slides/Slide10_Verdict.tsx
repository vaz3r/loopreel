import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

type TelemetryItem = {
  badge: string;
  label: string;
  body: string;
};

export default function Slide10({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  const telemetry =
    (slide as typeof slide & { telemetry?: TelemetryItem[] }).telemetry ?? [];

  const left = telemetry[0];
  const right = telemetry[1];
  const publication =
    (brand as { name?: string } | undefined)?.name || 'Custom Brand';

  return (
    <section
      className="flex flex-col h-full min-h-0 w-full text-[var(--ink)]"
      data-total-slides={totalSlides}
    >
      <header className="shrink-0">
        <p className="font-[var(--font-mono)] text-[20px] uppercase tracking-[0.16em] text-[var(--accent)]">
          {slide.kicker}
        </p>

        <h1 className="mt-5 font-[var(--font-headline)] text-[46px] font-bold leading-[1.04] tracking-[-0.04em]">
          {slide.headline}
        </h1>

        <p className="mt-5 max-w-[900px] font-[var(--font-body)] text-[26px] leading-snug">
          {slide.subheadline}
        </p>
      </header>

      <div className="relative mt-8 flex min-h-0 flex-1 flex-col border-y border-[var(--border)]">
        {/* Continuous architectural fields, not individual cards. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 grid grid-cols-2"
        >
          <div className="bg-[var(--surface)]" />
          <div className="border-l border-[var(--border)]" />
        </div>

        <div className="relative grid shrink-0 grid-cols-2 pt-9">
          <div className="min-w-0 px-8">
            <p className="whitespace-nowrap font-[var(--font-mono)] text-[84px] font-bold leading-none tracking-[-0.06em]">
              {left?.badge}
            </p>
          </div>

          <div className="min-w-0 px-8">
            <p className="whitespace-nowrap font-[var(--font-mono)] text-[84px] font-bold leading-none tracking-[-0.06em] text-[var(--accent)]">
              {right?.badge}
            </p>
          </div>
        </div>

        {/* One coordinate system connects both silhouettes to one horizon. */}
        <div className="relative flex min-h-[260px] flex-1 items-center">
          <svg
            viewBox="0 0 952 290"
            fill="none"
            aria-hidden="true"
            className="block h-[290px] w-full"
          >
            {/* Broken stone column. */}
            <path
              d="M180 239V112L193 99L207 109L221 83L237 96L252 77L266 95L279 89V239Z"
              fill="var(--ink)"
              fillOpacity="0.12"
              stroke="var(--ink)"
              strokeWidth="2.5"
              strokeLinejoin="round"
            />
            <path
              d="M198 126V222M220 113V222M242 112V222M262 115V222"
              stroke="var(--ink)"
              strokeOpacity="0.45"
              strokeWidth="2"
            />
            <path
              d="M168 239H291V253H168Z"
              fill="var(--ink)"
              fillOpacity="0.2"
              stroke="var(--ink)"
              strokeWidth="2"
            />
            <path
              d="M157 253H302V267H157Z"
              fill="var(--ink)"
              fillOpacity="0.12"
              stroke="var(--ink)"
              strokeWidth="2"
            />
            <path
              d="M310 267L320 248L339 255L348 267"
              stroke="var(--ink)"
              strokeOpacity="0.6"
              strokeWidth="2"
              strokeLinejoin="round"
            />

            {/* A single wave arc rises from the same ground line. */}
            <path
              d="M566 267C566 52 862 52 862 267"
              stroke="var(--accent)"
              strokeWidth="5"
              strokeLinecap="round"
            />
            <circle cx="714" cy="267" r="6" fill="var(--accent)" />

            {/* Shared horizon: no arrow, no detached callouts. */}
            <path
              d="M32 267H920"
              stroke="var(--ink)"
              strokeOpacity="0.45"
              strokeWidth="2"
            />
          </svg>
        </div>

        <div className="relative grid shrink-0 grid-cols-2 pb-9">
          <div className="min-w-0 px-8">
            <h2 className="min-h-[76px] font-[var(--font-headline)] text-[32px] font-semibold leading-[1.15] tracking-[-0.025em]">
              {left?.label}
            </h2>
            <p className="mt-4 font-[var(--font-body)] text-[24px] leading-snug">
              {left?.body}
            </p>
          </div>

          <div className="min-w-0 px-8">
            <h2 className="min-h-[76px] font-[var(--font-headline)] text-[32px] font-semibold leading-[1.15] tracking-[-0.025em]">
              {right?.label}
            </h2>
            <p className="mt-4 font-[var(--font-body)] text-[24px] leading-snug">
              {right?.body}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-6 flex shrink-0 items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <span
            aria-hidden="true"
            className="h-3 w-3 bg-[var(--accent)]"
          />
          <p className="font-[var(--font-headline)] text-[24px] font-semibold">
            {publication}
          </p>
        </div>

        <p className="font-[var(--font-mono)] text-[20px] tracking-[0.04em]">
          2026-iran-war.pub
        </p>
      </div>
    </section>
  );
}
import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

export default function Slide03({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  const items = slide.items ?? [];
  const item0 = items[0];
  const item1 = items[1];
  const telemetry = slide.telemetry ?? [];
  const founding = telemetry[0];
  const destruction = telemetry[1];

  return (
    <section className="flex flex-col h-full min-h-0 w-full text-[var(--ink)]">
      <header className="flex shrink-0 flex-col gap-7">
        <p className="font-[var(--font-mono)] text-[20px] uppercase leading-normal tracking-[0.14em] text-[var(--accent)]">
          {slide.kicker}
        </p>

        <div className="h-px w-full bg-[var(--border)]" />

        <h1 className="max-w-[880px] font-[var(--font-headline)] text-[60px] font-bold leading-[1.03] tracking-[-0.04em]">
          {slide.headline}
        </h1>

        <p className="max-w-[850px] font-[var(--font-body)] text-[28px] leading-snug">
          {slide.subheadline}
        </p>
      </header>

      <div className="mt-10 flex min-h-[490px] flex-1 flex-col">
        <div className="flex shrink-0 flex-col items-center gap-4 py-9 text-center">
          <p className="font-[var(--font-mono)] text-[84px] font-bold leading-none tracking-[-0.06em] text-[var(--accent)]">
            {founding?.badge}
          </p>
          <p className="font-[var(--font-mono)] text-[22px] leading-snug tracking-[0.04em]">
            {founding?.label}
          </p>
        </div>

        {/* Deliberate absence: no line connects the modern date to the ruins. */}
        <div className="min-h-[190px] flex-1" aria-hidden="true" />

        <svg
          viewBox="0 0 952 112"
          className="block h-[112px] w-full shrink-0 text-[var(--ink)]"
          fill="none"
          aria-hidden="true"
          focusable="false"
        >
          <g
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="square"
            opacity="0.19"
          >
            <path d="M0 83H165 M184 83H378 M406 83H664 M695 83H952" />
            <path d="M47 83V69H108V83 M52 69V57H100V69" />
            <path d="M205 83V47H223V83 M202 47H228 M208 41H222" />
            <path d="M253 83V60H271V83 M249 60H276" />
            <path d="M310 83V73H352V83" />
            <path d="M464 83V65H498V50H526V65H554V83" />
            <path d="M473 65H489 M505 61H519 M532 75H547" />
            <path d="M590 83V72H635V83" />
            <path d="M731 83V42H750V83 M727 42H755 M733 36H748" />
            <path d="M789 83V59H807V83 M785 59H812" />
            <path d="M855 83V71H911V83" />
          </g>
          <g stroke="currentColor" strokeWidth="1" opacity="0.09">
            <path d="M24 96H126 M207 100H338 M442 96H582 M725 99H906" />
            <path d="M67 106H149 M476 105H539 M818 108H928" />
          </g>
        </svg>
      </div>

      <div className="mt-7 flex shrink-0 flex-col gap-6">
        <article className="border-t border-[var(--border)] bg-[var(--surface)] px-8 py-7">
          <h2 className="font-[var(--font-headline)] text-[34px] font-semibold leading-tight tracking-[-0.025em]">
            {item0?.title || item0?.label}
          </h2>
          <p className="mt-4 max-w-[840px] font-[var(--font-body)] text-[28px] leading-snug">
            {item0?.body}
          </p>
        </article>

        <article className="border-t border-[var(--border)] bg-[var(--surface)] px-8 py-7">
          <div className="mb-6 flex items-center gap-6 border-b border-[var(--border)] pb-6">
            <span className="shrink-0 font-[var(--font-mono)] text-[40px] font-semibold leading-none tracking-[-0.04em]">
              {destruction?.badge}
            </span>
            <span
              className="h-9 w-px shrink-0 bg-[var(--border)]"
              aria-hidden="true"
            />
            <p className="font-[var(--font-mono)] text-[20px] leading-snug tracking-[0.02em]">
              {destruction?.label}
            </p>
          </div>

          <h2 className="font-[var(--font-headline)] text-[34px] font-semibold leading-tight tracking-[-0.025em]">
            {item1?.title || item1?.label}
          </h2>
          <p className="mt-4 max-w-[840px] font-[var(--font-body)] text-[28px] leading-snug">
            {item1?.body}
          </p>
        </article>
      </div>
    </section>
  );
}
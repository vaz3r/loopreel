import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

export default function Slide06({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  const items = slide.items ?? [];
  const item0 = items[0]!;
  const item1 = items[0]!;
  const artId = React.useId();

  return (
    <section className="flex h-full min-h-0 w-full flex-col justify-between gap-7 py-8 text-[var(--ink)]">
      {/* Zone 1 — Editorial header */}
      <header className="shrink-0">
        <div className="mb-5 flex items-center gap-4">
          <span
            aria-hidden="true"
            className="h-5 w-5 shrink-0 bg-[var(--accent)]"
          />
          <p className="font-[var(--font-headline)] text-[24px] font-bold tracking-[0.12em]">
            {slide.kicker ?? '14 CFR PART 250'}
          </p>
        </div>

        <h1 className="font-[var(--font-headline)] text-[60px] font-bold leading-[1.02] tracking-tight">
          {slide.headline ?? '400% Is Not Automatic'}
        </h1>

        <p className="mt-5 max-w-[900px] font-[var(--font-body)] text-[26px] leading-snug line-clamp-2">
          {slide.subheadline ??
            'Eligible involuntary denials: planned arrival delay matters.'}
        </p>
      </header>

      {/* Zone 2 — Dedicated vector canvas */}
      <div className="relative flex min-h-0 max-h-[500px] flex-1 basis-[460px] items-center justify-center">
        <svg
          viewBox="0 0 952 460"
          preserveAspectRatio="xMidYMid meet"
          role="img"
          aria-labelledby={`${artId}-title ${artId}-description`}
          className="block h-full w-full"
        >
          <title id={`${artId}-title`}>
            Arrival-delay triggers and compensation calculation
          </title>
          <desc id={`${artId}-description`}>
            Domestic planned arrival delays of 2+ hours and international
            planned arrival delays of 4+ hours lead to compensation of at
            least the lower of 400% of the applicable fare and $2,150,
            for eligible involuntary denials.
          </desc>

          {/* Structural rules */}
          <path
            d="M0 1H952 M0 459H952"
            fill="none"
            stroke="var(--border)"
            strokeWidth="2"
          />

          {/* Directional conduits */}
          <path
            d="M54 150H352L432 230H514 M54 330H332L432 230"
            fill="none"
            stroke="var(--ink)"
            strokeWidth="4"
            strokeLinejoin="miter"
          />

          {/* Geometric origin nodes */}
          <rect
            x="40"
            y="136"
            width="28"
            height="28"
            fill="var(--ink)"
          />
          <rect
            x="40"
            y="316"
            width="28"
            height="28"
            fill="var(--ink)"
          />

          {/* Domestic branch */}
          <text
            x="40"
            y="94"
            fill="var(--ink)"
            className="font-[var(--font-headline)] text-[28px] font-semibold"
          >
            Domestic
          </text>

          <path
            d="M94 114H294L320 150L294 186H94Z"
            fill="var(--accent)"
          />
          <text
            x="198"
            y="150"
            textAnchor="middle"
            dominantBaseline="central"
            fill="var(--surface)"
            className="font-[var(--font-mono)] text-[32px] font-bold"
          >
            2+ hours
          </text>

          {/* International branch */}
          <text
            x="40"
            y="274"
            fill="var(--ink)"
            className="font-[var(--font-headline)] text-[28px] font-semibold"
          >
            International
          </text>

          <path
            d="M94 294H294L320 330L294 366H94Z"
            fill="var(--accent)"
          />
          <text
            x="198"
            y="330"
            textAnchor="middle"
            dominantBaseline="central"
            fill="var(--surface)"
            className="font-[var(--font-mono)] text-[32px] font-bold"
          >
            4+ hours
          </text>

          {/* Shared threshold junction */}
          <path
            d="M432 214L448 230L432 246L416 230Z"
            fill="var(--accent)"
          />
          <path
            d="M487 219L500 230L487 241"
            fill="none"
            stroke="var(--ink)"
            strokeWidth="4"
          />

          <text
            x="40"
            y="424"
            fill="var(--ink)"
            className="font-[var(--font-mono)] text-[22px]"
          >
            PLANNED ARRIVAL DELAY
          </text>

          {/* Compensation comparator */}
          <rect
            x="514"
            y="36"
            width="408"
            height="388"
            fill="var(--surface)"
            stroke="var(--border)"
            strokeWidth="2"
          />
          <rect
            x="514"
            y="36"
            width="408"
            height="6"
            fill="var(--accent)"
          />

          <text
            x="718"
            y="84"
            textAnchor="middle"
            fill="var(--ink)"
            className="font-[var(--font-headline)] text-[24px] font-bold"
          >
            AT LEAST THE LOWER OF
          </text>

          <text
            x="718"
            y="184"
            textAnchor="middle"
            fill="var(--accent)"
            className="font-[var(--font-mono)] text-[96px] font-bold"
          >
            400%
          </text>
          <text
            x="718"
            y="222"
            textAnchor="middle"
            fill="var(--ink)"
            className="font-[var(--font-body)] text-[26px]"
          >
            × applicable fare
          </text>

          <path
            d="M546 253H890"
            stroke="var(--border)"
            strokeWidth="2"
          />

          <text
            x="718"
            y="344"
            textAnchor="middle"
            fill="var(--ink)"
            className="font-[var(--font-mono)] text-[80px] font-bold"
          >
            $2,150
          </text>
          <text
            x="718"
            y="388"
            textAnchor="middle"
            fill="var(--ink)"
            className="font-[var(--font-mono)] text-[22px]"
          >
            COMPENSATION CAP
          </text>
        </svg>
      </div>

      {/* Zone 3 — Non-overlapping evidence cards */}
      <div className="grid shrink-0 grid-cols-2 gap-5">
        <article className="border-t-2 border-[var(--border)] bg-[var(--surface)] px-6 py-6">
          <h2 className="font-[var(--font-headline)] text-[28px] font-semibold leading-tight">
            {item0?.label ?? 'Domestic trigger'}
          </h2>
          <p className="mt-3 font-[var(--font-body)] text-[24px] leading-snug line-clamp-3">
            {item0?.body ??
              '2+ hours: at least min(400% × applicable fare, $2,150).'}
          </p>
        </article>

        <article className="border-t-2 border-[var(--border)] bg-[var(--surface)] px-6 py-6">
          <h2 className="font-[var(--font-headline)] text-[28px] font-semibold leading-tight">
            {item1?.label ?? 'International trigger'}
          </h2>
          <p className="mt-3 font-[var(--font-body)] text-[24px] leading-snug line-clamp-3">
            {item1?.body ??
              '4+ hours: at least min(400% × applicable fare, $2,150).'}
          </p>
        </article>
      </div>
    </section>
  );
}
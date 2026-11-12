import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

export default function Slide06({ slide }: SlideComponentProps) {
  const items = slide.items ?? [];

  return (
    <section className="flex flex-col h-full min-h-0 w-full text-[var(--ink)]">
      <div className="shrink-0 border-t-[4px] border-[var(--border)] pt-7">
        <p className="font-[var(--font-mono)] text-[22px] font-semibold tracking-[0.16em] text-[var(--accent)]">
          {slide.kicker}
        </p>

        <h1 className="mt-7 max-w-[920px] font-[var(--font-headline)] text-[68px] font-bold leading-[1.04] tracking-[-0.045em]">
          {slide.headline}
        </h1>

        <p className="mt-7 max-w-[810px] font-[var(--font-body)] text-[28px] leading-snug">
          {slide.subheadline}
        </p>
      </div>

      <div className="relative mt-12 h-[1040px] w-full shrink-0">
        <svg
          className="pointer-events-none absolute inset-0 h-full w-full"
          viewBox="0 0 952 1040"
          fill="none"
          aria-hidden="true"
        >
          {/* Central spine and opposed connections. */}
          <path d="M476 20V1020" stroke="#000000" strokeWidth="5" />
          <path d="M458 20H494M458 1020H494" stroke="#000000" strokeWidth="5" />

          <path d="M476 185H280" stroke="#000000" strokeWidth="4" />
          <path d="M476 705H626" stroke="#000000" strokeWidth="4" />

          <circle cx="476" cy="185" r="12" fill="#000000" />
          <circle cx="476" cy="705" r="12" fill="#000000" />
          <circle cx="280" cy="185" r="6" fill="#000000" />
          <circle cx="626" cy="705" r="6" fill="#000000" />

          {/* Abstract land boundary: deliberately not a geographic outline. */}
          <path
            d="M48 60H246M48 60V82M246 60V82"
            stroke="#000000"
            strokeWidth="2"
          />
          <path
            d="M48 307H246M48 285V307M246 285V307"
            stroke="#000000"
            strokeWidth="2"
          />

          <path
            d="M129 79L173 112L148 157"
            stroke="#000000"
            strokeWidth="5"
            strokeLinejoin="miter"
          />
          <path
            d="M171 211L204 247L175 287"
            stroke="#000000"
            strokeWidth="5"
            strokeLinejoin="miter"
          />

          <path
            d="M65 109L92 126M58 154L86 171M80 222L108 239M99 265L126 282"
            stroke="#000000"
            strokeWidth="2"
          />
          <path
            d="M200 92L226 109M204 144L232 161M225 215L251 232"
            stroke="#000000"
            strokeWidth="2"
          />

          <path
            d="M148 157L158 174M164 194L171 211"
            stroke="#E60000"
            strokeWidth="6"
          />
          <path
            d="M116 180H205M116 192H205"
            stroke="#E60000"
            strokeWidth="6"
          />

          {/* Narrow passage: schematic edges without vessels or volume cues. */}
          <path
            d="M652 570L680 624V774L652 824H616V570Z"
            fill="var(--surface)"
          />
          <path
            d="M828 570L800 624V774L828 824H864V570Z"
            fill="var(--surface)"
          />

          <path
            d="M652 570L680 624V774L652 824"
            stroke="#000000"
            strokeWidth="5"
            strokeLinejoin="miter"
          />
          <path
            d="M828 570L800 624V774L828 824"
            stroke="#000000"
            strokeWidth="5"
            strokeLinejoin="miter"
          />

          <path
            d="M740 570V677M740 733V824"
            stroke="#000000"
            strokeWidth="2"
            strokeDasharray="10 12"
          />

          <rect x="668" y="691" width="144" height="28" fill="#E60000" />
          <path
            d="M668 679V731M812 679V731"
            stroke="#E60000"
            strokeWidth="5"
          />

          <path
            d="M616 550H864M616 550V568M864 550V568"
            stroke="#000000"
            strokeWidth="2"
          />
          <path
            d="M616 844H864M616 826V844M864 826V844"
            stroke="#000000"
            strokeWidth="2"
          />
        </svg>

        <div className="relative grid h-full grid-cols-[1fr_112px_1fr] grid-rows-2">
          <div className="col-start-1 row-start-1 flex flex-col justify-end pb-6">
            <div className="mb-5 h-[4px] w-14 bg-[var(--accent)]" />
            <h2 className="font-[var(--font-headline)] text-[36px] font-semibold leading-tight tracking-[-0.025em]">
              {items?.[0]?.label}
            </h2>
            <p className="mt-4 font-[var(--font-body)] text-[28px] leading-snug">
              {items?.[0]?.body}
            </p>
          </div>

          <div className="col-start-3 row-start-2 flex flex-col justify-end">
            <div className="mb-5 h-[4px] w-14 bg-[var(--accent)]" />
            <h2 className="font-[var(--font-headline)] text-[36px] font-semibold leading-tight tracking-[-0.025em]">
              {items?.[1]?.label}
            </h2>
            <p className="mt-4 font-[var(--font-body)] text-[28px] leading-snug">
              {items?.[1]?.body}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
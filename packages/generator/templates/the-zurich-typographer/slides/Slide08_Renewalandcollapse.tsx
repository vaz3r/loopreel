import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

export default function Slide08({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  void brand;
  void totalSlides;

  const items = slide.items ?? [];

  return (
    <section className="flex flex-col h-full min-h-0 w-full text-[var(--ink)]">
      <div className="shrink-0">
        <p className="font-[var(--font-mono)] text-[22px] uppercase tracking-[0.18em] text-[var(--accent)]">
          {slide.kicker}
        </p>

        <h1 className="mt-6 max-w-[850px] font-[var(--font-headline)] text-[68px] font-bold leading-[1.04] tracking-[-0.045em]">
          {slide.headline}
        </h1>

        <p className="mt-7 max-w-[820px] font-[var(--font-body)] text-[28px] leading-snug">
          {slide.subheadline}
        </p>
      </div>

      <div className="relative mt-12 h-[1140px] w-full shrink-0">
        <svg
          className="pointer-events-none absolute inset-0 z-10 h-full w-full"
          viewBox="0 0 952 1140"
          fill="none"
          aria-hidden="true"
        >
          {/* Open switchback: the first agreement descends to the second. */}
          <path
            d="M104 192 V364 H848 V544"
            stroke="#000000"
            strokeWidth="14"
            strokeLinejoin="miter"
            strokeLinecap="butt"
          />

          {/* The second connection reverses direction, then fractures. */}
          <path
            d="M848 544 V746 H104 V784"
            stroke="#000000"
            strokeWidth="14"
            strokeLinejoin="miter"
            strokeLinecap="butt"
          />

          <path
            d="M104 784 V800 L117 811 L96 824"
            stroke="#E60000"
            strokeWidth="14"
            strokeLinejoin="miter"
            strokeLinecap="butt"
          />
          <path
            d="M112 850 L91 863 L104 875 V976"
            stroke="#E60000"
            strokeWidth="14"
            strokeLinejoin="miter"
            strokeLinecap="butt"
          />

          {/* Detached splinters emphasize a break, not another renewal. */}
          <path
            d="M66 825 L49 815 M141 840 L159 831"
            stroke="#E60000"
            strokeWidth="4"
            strokeLinecap="butt"
          />

          <circle cx="104" cy="192" r="27" fill="#F5F5F5" />
          <circle
            cx="104"
            cy="192"
            r="20"
            fill="#F5F5F5"
            stroke="#000000"
            strokeWidth="7"
          />
          <circle cx="104" cy="192" r="6" fill="#000000" />

          <circle cx="848" cy="544" r="27" fill="#F5F5F5" />
          <circle
            cx="848"
            cy="544"
            r="20"
            fill="#F5F5F5"
            stroke="#000000"
            strokeWidth="7"
          />
          <circle cx="848" cy="544" r="6" fill="#000000" />

          <rect
            x="82"
            y="954"
            width="44"
            height="44"
            fill="#E60000"
          />
          <path
            d="M94 966 L114 986 M114 966 L94 986"
            stroke="#FFFFFF"
            strokeWidth="5"
          />
        </svg>

        <ol className="m-0 flex list-none flex-col p-0 pt-[68px]">
          <li className="flex h-[248px] shrink-0 flex-col justify-center bg-[var(--surface)] py-6 pl-[220px] pr-[64px]">
            <h2 className="font-[var(--font-mono)] text-[36px] font-semibold leading-tight tracking-[-0.035em]">
              {items?.label}
            </h2>
            <p className="mt-5 font-[var(--font-body)] text-[28px] leading-snug">
              {items?.body}
            </p>
          </li>

          <li className="mt-[104px] flex h-[248px] shrink-0 flex-col justify-center bg-[var(--surface)] py-6 pl-[64px] pr-[220px]">
            <h2 className="font-[var(--font-mono)] text-[36px] font-semibold leading-tight tracking-[-0.035em]">
              {items?.label}
            </h2>
            <p className="mt-5 font-[var(--font-body)] text-[28px] leading-snug">
              {items?.body}
            </p>
          </li>

          <li className="mt-[184px] flex h-[260px] shrink-0 flex-col justify-center bg-[var(--surface)] py-6 pl-[220px] pr-[64px]">
            <h2 className="font-[var(--font-mono)] text-[36px] font-semibold leading-tight tracking-[-0.035em] text-[var(--accent)]">
              {items?.label}
            </h2>
            <p className="mt-5 font-[var(--font-body)] text-[28px] leading-snug">
              {items?.body}
            </p>
          </li>
        </ol>
      </div>
    </section>
  );
}
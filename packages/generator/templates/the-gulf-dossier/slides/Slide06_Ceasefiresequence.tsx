import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

export default function Slide06({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  return (
    <section className="flex flex-col h-full min-h-0 w-full text-[var(--ink)]">
      <div className="flex flex-col items-start">
        <p className="font-[var(--font-mono)] text-[22px] uppercase tracking-[0.16em] text-[var(--accent)]">
          {slide.kicker}
        </p>

        <h1 className="mt-6 max-w-[900px] font-[var(--font-headline)] text-[68px] font-bold leading-[1.04] tracking-[-0.035em]">
          {slide.headline}
        </h1>

        <p className="mt-7 max-w-[780px] font-[var(--font-body)] text-[28px] leading-snug">
          {slide.subheadline}
        </p>
      </div>

      <div className="mt-[76px]">
        <div className="grid grid-cols-3 gap-6">
          {slide.items?.map((item: any, index: number) => (
            <h2
              key={`${item.label}-${index}`}
              className="text-center font-[var(--font-mono)] text-[32px] font-semibold leading-tight tracking-[-0.025em] text-[var(--accent)]"
            >
              {item.label}
            </h2>
          ))}
        </div>

        <svg
          className="mt-4 block h-[164px] w-full"
          viewBox="0 0 952 164"
          fill="none"
          aria-hidden="true"
        >
          {/* Equal intervals are schematic, not a measure of elapsed time. */}
          <path
            d="M150.667 20V142 M476 20V142 M801.333 20V142"
            stroke="var(--border)"
            strokeWidth="1"
            strokeDasharray="3 9"
          />

          {/* The talks node interrupts the otherwise continuous accent rail. */}
          <path
            d="M150.667 62H452 M500 62H801.333"
            stroke="var(--accent)"
            strokeWidth="5"
          />

          <circle
            cx="150.667"
            cy="62"
            r="25"
            stroke="var(--accent)"
            strokeWidth="1"
            opacity="0.45"
          />
          <circle
            cx="150.667"
            cy="62"
            r="11"
            fill="var(--accent)"
          />

          <path
            d="M476 47L491 62L476 77L461 62Z"
            fill="var(--surface)"
            stroke="var(--accent)"
            strokeWidth="3"
          />

          <circle
            cx="801.333"
            cy="62"
            r="25"
            stroke="var(--accent)"
            strokeWidth="1"
            opacity="0.45"
          />
          <circle
            cx="801.333"
            cy="62"
            r="11"
            fill="var(--accent)"
          />

          <path
            d="M150.667 90V142 M476 90V142 M801.333 90V142"
            stroke="var(--border)"
            strokeWidth="2"
          />
          <path
            d="M138.667 142H162.667 M464 142H488 M789.333 142H813.333"
            stroke="var(--accent)"
            strokeWidth="2"
          />
        </svg>

        <div className="grid grid-cols-3 gap-6">
          {slide.items?.map((item: any, index: number) => (
            <div
              key={`${item.label}-body-${index}`}
              className="min-w-0 border-t border-[var(--border)] pt-6"
            >
              <p className="font-[var(--font-body)] text-[28px] leading-[1.35]">
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
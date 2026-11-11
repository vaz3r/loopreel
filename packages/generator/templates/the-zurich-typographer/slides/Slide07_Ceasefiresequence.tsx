import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

export default function Slide07({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  const items = (slide.items ?? []).slice(0, 3);

  return (
    <section className="flex flex-col h-full min-h-0 w-full text-[var(--ink)]">
      <div className="flex h-full min-h-0 flex-col bg-[#FFFFFF]">
        <header className="shrink-0 pt-10">
          <div className="mb-9 h-[6px] w-20 bg-[var(--accent)]" />

          <p className="font-[var(--font-mono)] text-[22px] uppercase leading-normal tracking-[0.16em] text-[var(--accent)]">
            {slide.kicker}
          </p>

          <h1 className="mt-7 max-w-[900px] font-[var(--font-headline)] text-[68px] font-bold leading-[1.04] tracking-[-0.045em]">
            {slide.headline}
          </h1>

          <p className="mt-9 max-w-[800px] font-[var(--font-body)] text-[28px] leading-normal">
            {slide.subheadline}
          </p>
        </header>

        <div className="flex min-h-0 flex-1 flex-col justify-center pb-24 pt-20">
          <div className="grid grid-cols-3">
            {items.map((item: any, index: number) => (
              <h2
                key={`date-${index}`}
                className="px-6 text-center font-[var(--font-mono)] text-[32px] font-semibold leading-snug tracking-[-0.035em]"
              >
                {item.label}
              </h2>
            ))}
          </div>

          <svg
            viewBox="0 0 952 220"
            className="block h-[220px] w-full shrink-0"
            fill="none"
            aria-hidden="true"
          >
            {/* Equal schematic spacing, not elapsed-time spacing. */}
            <path
              d="M158.667 100H290 M344 100H476 M476 100H608 M662 100H793.333"
              stroke="#000000"
              strokeWidth="2"
            />

            {/* Open intervals and red rupture marks interrupt the truce. */}
            <path
              d="M303 112L315 88 M319 112L331 88
                 M621 112L633 88 M637 112L649 88"
              stroke="#E60000"
              strokeWidth="4"
              strokeLinecap="square"
            />

            <path
              d="M158.667 36V77 M476 36V77 M793.333 36V77"
              stroke="#000000"
              strokeWidth="1"
            />

            <circle
              cx="158.667"
              cy="100"
              r="17"
              fill="#FFFFFF"
              stroke="#000000"
              strokeWidth="2"
            />
            <circle
              cx="476"
              cy="100"
              r="17"
              fill="#FFFFFF"
              stroke="#000000"
              strokeWidth="2"
            />
            <circle
              cx="793.333"
              cy="100"
              r="17"
              fill="#FFFFFF"
              stroke="#000000"
              strokeWidth="2"
            />

            <circle cx="158.667" cy="100" r="5" fill="#E60000" />
            <circle cx="476" cy="100" r="5" fill="#E60000" />
            <circle cx="793.333" cy="100" r="5" fill="#E60000" />

            <path
              d="M158.667 123V194 M476 123V194 M793.333 123V194"
              stroke="#000000"
              strokeWidth="1"
            />
            <path
              d="M146.667 194H170.667 M464 194H488 M781.333 194H805.333"
              stroke="#000000"
              strokeWidth="2"
            />
          </svg>

          <div className="grid grid-cols-3">
            {items.map((item: any, index: number) => (
              <div key={`copy-${index}`} className="min-w-0 px-7">
                <p className="font-[var(--font-body)] text-[28px] leading-[1.5] tracking-[-0.015em]">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
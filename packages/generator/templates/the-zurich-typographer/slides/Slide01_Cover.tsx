import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

export default function Slide01({ slide }: SlideComponentProps) {
  const items = slide.items ?? [];

  return (
    <section className="flex flex-col h-full min-h-0 w-full text-[var(--ink)]">
      <div className="flex h-[420px] shrink-0 flex-col items-start">
        <div className="flex items-center gap-5">
          <span
            aria-hidden="true"
            className="h-[18px] w-[18px] bg-[var(--accent)]"
          />
          <p className="font-[var(--font-mono)] text-[22px] font-medium uppercase leading-normal tracking-[0.14em]">
            {slide.kicker}
          </p>
        </div>

        <h1 className="mt-12 max-w-[800px] font-[var(--font-headline)] text-[68px] font-bold leading-[1.04] tracking-[-0.045em]">
          {slide.headline}
        </h1>

        <p className="mt-8 max-w-[710px] border-l-[3px] border-[var(--border)] pl-6 font-[var(--font-body)] text-[26px] leading-snug">
          {slide.subheadline}
        </p>
      </div>

      <div className="relative mt-10 h-[940px] w-full shrink-0 bg-[#FFFFFF]">
        <svg
          aria-hidden="true"
          className="absolute inset-0 h-full w-full"
          viewBox="0 0 952 940"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Negotiation line: deliberately broken at the interruption. */}
          <path
            d="M 0 470 H 445 M 507 470 H 952"
            stroke="#000000"
            strokeWidth="2"
            vectorEffect="non-scaling-stroke"
          />

          {/* Open endpoints keep the diagram conceptual, not quantitative. */}
          <circle cx="24" cy="470" r="7" fill="#FFFFFF" stroke="#000000" strokeWidth="2" />
          <circle cx="928" cy="470" r="7" fill="#FFFFFF" stroke="#000000" strokeWidth="2" />

          {/* Callout leaders converge on opposite sides of the rupture. */}
          <path
            d="M 344 344 V 388 L 438 438"
            stroke="#000000"
            strokeWidth="2"
            strokeLinejoin="miter"
          />
          <circle cx="438" cy="438" r="5" fill="#000000" />

          <path
            d="M 608 604 V 554 L 514 502"
            stroke="#000000"
            strokeWidth="2"
            strokeLinejoin="miter"
          />
          <circle cx="514" cy="502" r="5" fill="#000000" />

          {/* The single red interruption is the visual focal point. */}
          <path
            d="M 476 376 V 564"
            stroke="#E60000"
            strokeWidth="18"
            strokeLinecap="square"
          />
        </svg>

        <div className="absolute left-[64px] right-[248px] top-[112px] min-h-[232px] border-t-2 border-[var(--border)] bg-[var(--surface)] px-8 py-7">
          <p className="font-[var(--font-mono)] text-[22px] font-medium leading-normal tracking-[0.04em]">
            {items?.label}
          </p>
          <p className="mt-4 font-[var(--font-body)] text-[28px] leading-snug">
            {items?.body}
          </p>
        </div>

        <div className="absolute left-[248px] right-[64px] top-[604px] min-h-[216px] border-t-2 border-[var(--border)] bg-[var(--surface)] px-8 py-7">
          <p className="font-[var(--font-mono)] text-[22px] font-medium leading-normal tracking-[0.04em]">
            {items?.label}
          </p>
          <p className="mt-4 font-[var(--font-body)] text-[28px] leading-snug">
            {items?.body}
          </p>
        </div>
      </div>
    </section>
  );
}
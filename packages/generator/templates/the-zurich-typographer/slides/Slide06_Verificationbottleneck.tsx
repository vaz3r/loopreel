import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

export default function Slide06({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  void brand;
  void totalSlides;

  const headlineId = `${slide.id}-headline`;

  return (
    <section
      aria-labelledby={headlineId}
      className="flex flex-col h-full min-h-0 w-full text-[var(--ink)]"
    >
      <div className="shrink-0">
        <p className="font-[var(--font-mono)] text-[22px] leading-[30px] tracking-[0.12em] text-[var(--accent)]">
          THE NUCLEAR EVIDENCE GAP
        </p>

        <h2
          id={headlineId}
          className="mt-6 max-w-[920px] font-[var(--font-headline)] text-[68px] font-bold leading-[1.06] tracking-[-0.045em]"
        >
          No Evidence Is Not
          <br />
          Full Verification
        </h2>

        <p className="mt-7 max-w-[800px] font-[var(--font-body)] text-[28px] leading-[1.4]">
          The article pairs a reported finding with unresolved verification
          limits.
        </p>
      </div>

      <div className="relative mt-10 h-[1080px] w-full shrink-0 bg-[#FFFFFF]">
        <svg
          aria-hidden="true"
          focusable="false"
          viewBox="0 0 952 1080"
          className="absolute inset-0 h-full w-full"
          fill="none"
        >
          {/* An incomplete circuit: no ticks, scale, or quantitative encoding. */}
          <path
            d="M 681.061 745.061 A 290 290 0 1 1 748.511 440.814"
            stroke="#000000"
            strokeWidth="18"
            strokeLinecap="butt"
          />

          {/* Exactly two evidence connectors. */}
          <path
            d="M 280 176 V 224 L 353.441 277.171"
            stroke="#000000"
            strokeWidth="2"
            strokeLinejoin="miter"
          />
          <circle cx="353.441" cy="277.171" r="6" fill="#000000" />

          <path
            d="M 681.061 745.061 L 750 814 V 858"
            stroke="#000000"
            strokeWidth="2"
            strokeLinejoin="miter"
          />

          {/* Red terminals make the missing circuit segment explicit. */}
          <circle
            cx="748.511"
            cy="440.814"
            r="17"
            fill="#E60000"
            stroke="#FFFFFF"
            strokeWidth="5"
          />
          <circle
            cx="681.061"
            cy="745.061"
            r="17"
            fill="#E60000"
            stroke="#FFFFFF"
            strokeWidth="5"
          />
        </svg>

        <div className="absolute left-0 top-[16px] w-[430px]">
          <h3 className="font-[var(--font-headline)] text-[36px] font-semibold leading-[1.15] tracking-[-0.025em]">
            Reported finding
          </h3>
          <p className="mt-4 max-w-[410px] font-[var(--font-body)] text-[28px] leading-[1.4]">
            The IAEA reportedly lacked evidence of weaponization.
          </p>
        </div>

        <div className="absolute right-0 top-[858px] w-[472px] border-t-2 border-[var(--accent)] bg-[var(--surface)] px-8 py-6">
          <h3 className="font-[var(--font-headline)] text-[36px] font-semibold leading-[1.15] tracking-[-0.025em]">
            Verification limit
          </h3>
          <p className="mt-4 font-[var(--font-body)] text-[28px] leading-[1.4]">
            It could not verify enrichment suspension or confirm Iran’s
            stockpile status.
          </p>
        </div>
      </div>
    </section>
  );
}
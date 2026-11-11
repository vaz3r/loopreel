import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

export default function Slide09({
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
      <header className="shrink-0">
        <p className="font-[var(--font-mono)] text-[20px] leading-normal tracking-[0.16em] text-[var(--accent)]">
          THE TRUST BACKDROP
        </p>

        <h2
          id={headlineId}
          className="mt-5 max-w-[920px] font-[var(--font-headline)] text-[64px] font-bold leading-[1.05] tracking-[-0.035em]"
        >
          Ring&apos;s Privacy Record
          <br />
          Follows It Indoors
        </h2>

        <p className="mt-5 max-w-[850px] font-[var(--font-body)] text-[26px] leading-snug">
          The FTC&apos;s earlier case concerned private recordings and safeguards
          against hackers.
        </p>
      </header>

      <div className="relative mt-8 grid min-h-0 flex-1 grid-cols-[300px_minmax(0,1fr)] gap-[44px] border-t border-[var(--border)]">
        <svg
          aria-hidden="true"
          focusable="false"
          viewBox="0 0 952 650"
          preserveAspectRatio="none"
          className="pointer-events-none absolute inset-0 h-full w-full"
          fill="none"
        >
          {/* A restrained folded-page outline, not a product illustration. */}
          <path
            d="M344 80H886L951 145V520H344Z"
            fill="var(--surface)"
            stroke="var(--border)"
            strokeWidth="1.5"
            vectorEffect="non-scaling-stroke"
          />
          <path
            d="M886 80V145H951"
            stroke="var(--border)"
            strokeWidth="1.5"
            vectorEffect="non-scaling-stroke"
          />
          <path
            d="M300 270H344"
            stroke="var(--accent)"
            strokeWidth="2"
            vectorEffect="non-scaling-stroke"
          />
          <circle cx="300" cy="270" r="4" fill="var(--accent)" />
          <path
            d="M384 470H450M384 482H420"
            stroke="var(--border)"
            strokeWidth="1.5"
            vectorEffect="non-scaling-stroke"
          />
          <path
            d="M0 620H952"
            stroke="var(--border)"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
          />
        </svg>

        <div className="relative flex min-w-0 flex-col pt-6">
          <div className="relative h-[320px] shrink-0 border-l-2 border-[var(--accent)]">
            <p className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-90 whitespace-nowrap font-[var(--font-mono)] text-[112px] font-bold leading-none tracking-[-0.06em] text-[var(--accent)]">
              2023
            </p>
          </div>

          <h3 className="mt-5 font-[var(--font-headline)] text-[32px] font-semibold leading-tight tracking-[-0.02em]">
            FTC investigation
          </h3>

          <p className="mt-4 font-[var(--font-body)] text-[24px] leading-snug">
            Ring charged with allowing employees and contractors to watch
            customers&apos; private-space recordings.
          </p>
        </div>

        <div className="relative min-w-0 px-10 pt-[144px]">
          <p className="whitespace-nowrap font-[var(--font-mono)] text-[112px] font-bold leading-none tracking-[-0.065em]">
            55,000
          </p>

          <h3 className="mt-5 font-[var(--font-headline)] text-[32px] font-semibold leading-tight tracking-[-0.02em]">
            US customer accounts
          </h3>

          <div className="mt-7 h-[2px] w-16 bg-[var(--accent)]" />

          <p className="mt-6 max-w-[480px] font-[var(--font-body)] text-[26px] leading-snug">
            FTC said Ring&apos;s safeguards allowed hackers to access these
            accounts.
          </p>
        </div>
      </div>
    </section>
  );
}
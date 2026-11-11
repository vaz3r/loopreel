import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

export default function Slide12({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  const content = slide as typeof slide & {
    headline?: string;
    body?: string;
    cta?: string;
    handle?: string;
  };

  const headline =
    content.headline ?? 'A moving camera expands the privacy perimeter';
  const body =
    content.body ??
    'Ring’s new devices do more than watch a doorway: they map interiors and travel through them. University of Washington researcher Ryan Calo previously warned that flying security cameras create new ways to surveil people indoors and give companies greater access to sensitive details of homes and businesses.';
  const cta =
    content.cta ??
    'Evaluate the access these patrols create—not just the security they promise.';

  return (
    <article
      aria-label={headline}
      className="relative flex h-full min-h-0 flex-col justify-between gap-8 text-[var(--ink)]"
    >
      <section className="space-y-6">
        <div className="inline-flex items-center gap-3 rounded-full border border-[var(--border)] bg-[var(--surface)] px-4 py-2">
          <span className="h-2 w-2 rounded-full bg-[var(--accent)]" />
          <span className="font-[var(--font-mono)] text-xs uppercase tracking-[0.2em]">
            Privacy / In motion
          </span>
        </div>

        <h1 className="max-w-[920px] font-[var(--font-headline)] text-[68px] font-bold leading-[1.02] tracking-[-0.055em] [text-wrap:balance]">
          {headline}
        </h1>
      </section>

      <section className="grid grid-cols-[0.85fr_1.65fr] items-center gap-8">
        <div className="relative flex aspect-square items-center justify-center overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5 shadow-sm">
          <svg
            viewBox="0 0 280 280"
            fill="none"
            aria-hidden="true"
            className="h-full w-full"
          >
            <rect
              x="17"
              y="17"
              width="246"
              height="246"
              rx="26"
              stroke="var(--accent)"
              strokeOpacity="0.45"
              strokeDasharray="4 8"
            />
            <circle
              cx="154"
              cy="133"
              r="93"
              fill="var(--accent)"
              fillOpacity="0.06"
            />
            <circle
              cx="154"
              cy="133"
              r="64"
              stroke="var(--accent)"
              strokeOpacity="0.22"
            />

            <path
              d="M45 226V54H235V226H173M45 226H119"
              stroke="var(--ink)"
              strokeOpacity="0.65"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <path
              d="M45 126H101M139 54V99M184 165H235M139 184V226"
              stroke="var(--border)"
              strokeWidth="3"
              strokeLinecap="round"
            />

            <path
              d="M145 245V201C145 181 92 190 92 159C92 126 154 171 154 133"
              stroke="var(--accent)"
              strokeWidth="2"
              strokeDasharray="5 7"
              strokeLinecap="round"
            />
            <path
              d="M154 133L193 78L220 113Z"
              fill="var(--accent)"
              fillOpacity="0.14"
            />
            <circle
              cx="154"
              cy="133"
              r="17"
              fill="var(--surface)"
              stroke="var(--accent)"
              strokeWidth="2"
            />
            <circle cx="154" cy="133" r="6" fill="var(--accent)" />
            <circle
              cx="145"
              cy="245"
              r="4"
              fill="var(--ink)"
              fillOpacity="0.6"
            />
          </svg>

          <span className="absolute bottom-3 left-4 font-[var(--font-mono)] text-[10px] uppercase tracking-[0.18em] opacity-50">
            Conceptual schematic
          </span>
        </div>

        <div className="space-y-4">
          <div className="h-1 w-12 rounded-full bg-[var(--accent)]" />
          <p className="font-[var(--font-body)] text-[25px] leading-[1.5] tracking-[-0.015em]">
            {body}
          </p>
        </div>
      </section>

      <section className="relative overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--surface)] p-8 shadow-sm">
        <div className="absolute inset-y-0 left-0 w-1 bg-[var(--accent)]" />

        <div className="mb-5 flex items-center justify-between gap-4">
          <span className="font-[var(--font-mono)] text-xs uppercase tracking-[0.22em] text-[var(--accent)]">
            The privacy test
          </span>
          <svg
            viewBox="0 0 32 32"
            fill="none"
            aria-hidden="true"
            className="h-8 w-8 shrink-0 text-[var(--accent)]"
          >
            <path
              d="M7 25L25 7M7 7H25V25"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <p className="max-w-[830px] font-[var(--font-headline)] text-[39px] font-bold leading-[1.16] tracking-[-0.035em] [text-wrap:balance]">
          {cta}
        </p>

        <p className="mt-6 font-[var(--font-mono)] text-sm text-[var(--accent)]">
          {content.handle ?? '@arstechnica'}
        </p>
      </section>
    </article>
  );
}
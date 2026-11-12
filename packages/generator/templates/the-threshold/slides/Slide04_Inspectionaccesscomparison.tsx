import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

export default function Slide04({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  const items = slide.items ?? [];

  return (
    <section className="flex flex-col h-full min-h-0 w-full text-[var(--ink)]">
      <header className="shrink-0">
        <p className="font-[var(--font-mono)] text-[22px] leading-normal tracking-[0.16em] text-[var(--accent)]">
          {slide.kicker}
        </p>

        <h1 className="mt-6 max-w-[900px] font-[var(--font-headline)] text-[64px] font-bold leading-[1.04] tracking-[-0.045em]">
          {slide.headline}
        </h1>

        <p className="mt-6 max-w-[790px] font-[var(--font-body)] text-[28px] leading-snug">
          {slide.subheadline}
        </p>
      </header>

      <div className="relative mt-10 h-[600px] w-full shrink-0 border-y border-[var(--border)]">
        <svg
          viewBox="0 0 952 600"
          fill="none"
          aria-hidden="true"
          className="absolute inset-0 h-full w-full"
        >
          {/* A shared inspection inlet divides into two distinct routes. */}
          <path
            d="M24 300H116"
            stroke="var(--ink)"
            strokeWidth="5"
          />
          <path
            d="M67 290L79 300L67 310"
            stroke="var(--ink)"
            strokeWidth="3"
            strokeLinecap="square"
          />

          <path
            d="M116 300V184Q116 160 140 160H288"
            stroke="var(--accent)"
            strokeWidth="5"
            strokeLinejoin="round"
          />
          <path
            d="M116 300V416Q116 440 140 440H402"
            stroke="var(--ink)"
            strokeWidth="5"
            strokeLinejoin="round"
          />

          <circle
            cx="116"
            cy="300"
            r="10"
            fill="var(--surface)"
            stroke="var(--ink)"
            strokeWidth="3"
          />

          {/* Abstract facility outlines—not geographic site markers. */}
          <path
            d="M320 213V118L348 102L376 118V132H410V213H320Z"
            fill="var(--surface)"
            stroke="var(--border)"
            strokeWidth="2"
          />
          <path
            d="M336 135H360M336 151H360M384 151H396M336 189H396"
            stroke="var(--border)"
            strokeWidth="2"
          />

          <path
            d="M320 493V398L348 382L376 398V412H410V493H320Z"
            fill="var(--surface)"
            stroke="var(--border)"
            strokeWidth="2"
          />
          <path
            d="M336 415H360M384 427H396M336 469H396"
            stroke="var(--border)"
            strokeWidth="2"
          />

          {/* Closed orange gate: the upper route stops here. */}
          <path
            d="M288 118V202M278 118H298M278 202H298"
            stroke="var(--accent)"
            strokeWidth="5"
          />
          <path
            d="M288 128L307 139M288 148L307 159M288 168L307 179M288 188L307 199"
            stroke="var(--accent)"
            strokeWidth="3"
          />
          <path
            d="M228 150L240 160L228 170"
            stroke="var(--accent)"
            strokeWidth="3"
          />

          {/* Open ink gate: the lower route continues into the facility. */}
          <path
            d="M320 440H402"
            stroke="var(--ink)"
            strokeWidth="5"
          />
          <path
            d="M288 398V414M288 466V482"
            stroke="var(--ink)"
            strokeWidth="5"
          />
          <path
            d="M288 414L319 389M288 466L319 491"
            stroke="var(--ink)"
            strokeWidth="4"
          />
          <circle cx="288" cy="414" r="4" fill="var(--ink)" />
          <circle cx="288" cy="466" r="4" fill="var(--ink)" />
          <path
            d="M387 430L402 440L387 450"
            stroke="var(--ink)"
            strokeWidth="3"
          />

          {/* Two endpoint leaders connect the schematic to its annotations. */}
          <path
            d="M303 118V80H452V106"
            stroke="var(--accent)"
            strokeWidth="2"
          />
          <circle cx="303" cy="118" r="4" fill="var(--accent)" />

          <path
            d="M410 440H432V386H452"
            stroke="var(--ink)"
            strokeWidth="2"
          />
          <circle cx="410" cy="440" r="4" fill="var(--ink)" />
        </svg>

        <div className="absolute left-[480px] right-0 top-[102px]">
          <h2 className="font-[var(--font-headline)] text-[34px] font-semibold leading-tight tracking-[-0.025em] text-[var(--accent)]">
            {items?.label}
          </h2>
          <p className="mt-4 max-w-[440px] font-[var(--font-body)] text-[28px] leading-snug">
            {items?.body}
          </p>
        </div>

        <div className="absolute left-[480px] right-0 top-[382px]">
          <h2 className="font-[var(--font-headline)] text-[34px] font-semibold leading-tight tracking-[-0.025em]">
            {items?.label}
          </h2>
          <p className="mt-4 max-w-[440px] font-[var(--font-body)] text-[28px] leading-snug">
            {items?.body}
          </p>
        </div>
      </div>
    </section>
  );
}
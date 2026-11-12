import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

export default function Slide07({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  const items = slide.items ?? [];
  void brand;
  void totalSlides;

  return (
    <section className="flex flex-col h-full min-h-0 w-full text-[var(--ink)]">
      <header className="shrink-0">
        <p className="font-[var(--font-mono)] text-[22px] leading-[28px] tracking-[0.16em] text-[var(--accent)]">
          {slide.kicker}
        </p>

        <h1 className="mt-4 max-w-[900px] font-[var(--font-headline)] text-[64px] font-bold leading-[1.04] tracking-[-0.035em]">
          {slide.headline}
        </h1>

        <p className="mt-5 max-w-[860px] font-[var(--font-body)] text-[26px] leading-[35px]">
          {slide.subheadline}
        </p>
      </header>

      <div className="relative mt-5 h-[700px] w-full shrink-0">
        <svg
          viewBox="0 0 952 700"
          fill="none"
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 h-full w-full"
        >
          {/* One open clockwise sequence; the center stays empty. */}
          <path
            d="M 345 134 A 214 214 0 1 1 397 526"
            stroke="var(--border)"
            strokeWidth="3"
          />

          {/* A restrained second hairline gives the route editorial depth. */}
          <path
            d="M 381 123 A 208 208 0 0 1 647 246"
            stroke="var(--ink)"
            strokeOpacity="0.18"
            strokeWidth="1"
          />

          {/* Clockwise directional arrows, positioned along the route. */}
          <path
            d="M 477 102 L 490 109 L 476 115"
            stroke="var(--ink)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M 641 404 L 637 419 L 628 408"
            stroke="var(--ink)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* First event: a short horizontal annotation leader. */}
          <path
            d="M 322 134 H 337"
            stroke="var(--border)"
            strokeWidth="2"
          />
          <circle
            cx="345"
            cy="134"
            r="8"
            fill="var(--surface)"
            stroke="var(--ink)"
            strokeWidth="2"
          />
          <circle cx="345" cy="134" r="2.5" fill="var(--ink)" />

          {/* Second event sits on the right-hand side of the sequence. */}
          <path
            d="M 674 319 H 696"
            stroke="var(--border)"
            strokeWidth="2"
          />
          <circle
            cx="666"
            cy="319"
            r="8"
            fill="var(--surface)"
            stroke="var(--ink)"
            strokeWidth="2"
          />
          <circle cx="666" cy="319" r="2.5" fill="var(--ink)" />

          {/* The terminal segment breaks rather than closing the circle. */}
          <path
            d="M 397 526 Q 384 523 372 518"
            stroke="var(--accent)"
            strokeWidth="4"
            strokeLinecap="round"
          />
          <path
            d="M 350 507 L 345 504"
            stroke="var(--accent)"
            strokeWidth="4"
            strokeLinecap="round"
          />
          <path
            d="M 358 502 L 350 520 M 370 507 L 362 525"
            stroke="var(--accent)"
            strokeWidth="3"
            strokeLinecap="round"
          />

          {/* Final event leader terminates above its annotation. */}
          <path
            d="M 337 504 H 318 L 302 524"
            stroke="var(--accent)"
            strokeOpacity="0.65"
            strokeWidth="2"
          />
          <circle
            cx="345"
            cy="504"
            r="8"
            fill="var(--surface)"
            stroke="var(--accent)"
            strokeWidth="2"
          />
          <circle cx="345" cy="504" r="3" fill="var(--accent)" />
        </svg>

        <ol className="relative m-0 h-full w-full list-none p-0">
          <li className="absolute left-0 top-[22px] w-[310px]">
            <h2 className="font-[var(--font-mono)] text-[34px] font-semibold leading-[42px] tracking-[-0.04em]">
              {items?.label}
            </h2>
            <p className="mt-3 font-[var(--font-body)] text-[26px] leading-[34px]">
              {items?.body}
            </p>
          </li>

          <li className="absolute left-[710px] top-[236px] w-[242px]">
            <h2 className="font-[var(--font-mono)] text-[34px] font-semibold leading-[42px] tracking-[-0.04em]">
              {items?.label}
            </h2>
            <p className="mt-3 font-[var(--font-body)] text-[26px] leading-[34px]">
              {items?.body}
            </p>
          </li>

          <li className="absolute left-[64px] top-[534px] w-[540px] border-l-2 border-[var(--accent)] pl-6">
            <h2 className="font-[var(--font-mono)] text-[34px] font-semibold leading-[42px] tracking-[-0.04em] text-[var(--accent)]">
              {items?.label}
            </h2>
            <p className="mt-3 font-[var(--font-body)] text-[26px] leading-[34px]">
              {items?.body}
            </p>
          </li>
        </ol>
      </div>
    </section>
  );
}
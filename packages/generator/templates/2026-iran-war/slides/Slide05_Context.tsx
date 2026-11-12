import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

export default function Slide05({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  const telemetry = slide.telemetry ?? [];
  const foundation = telemetry[0];
  const population = telemetry[1];

  return (
    <section className="flex flex-col h-full min-h-0 w-full text-[var(--ink)]">
      <header className="shrink-0">
        <p className="font-[var(--font-mono)] text-[22px] uppercase leading-snug tracking-[0.16em] text-[var(--accent)]">
          {slide.kicker}
        </p>

        <h1 className="mt-5 max-w-[880px] font-[var(--font-headline)] text-[68px] font-bold leading-[1.02] tracking-[-0.04em]">
          {slide.headline}
        </h1>

        <p className="mt-5 max-w-[850px] font-[var(--font-body)] text-[28px] leading-snug">
          {slide.subheadline}
        </p>
      </header>

      <div className="mt-8 flex min-h-0 flex-1 flex-col gap-8">
        <article className="relative flex shrink-0 flex-col items-center border-y border-[var(--border)] px-8 py-6 text-center">
          <svg
            aria-hidden="true"
            viewBox="0 0 952 16"
            preserveAspectRatio="none"
            className="pointer-events-none absolute inset-x-0 top-0 h-4 w-full text-[var(--accent)]"
            fill="none"
          >
            <path
              d="M1 16V1H49 M903 1H951V16 M476 1V12"
              stroke="currentColor"
              strokeWidth="2"
            />
          </svg>

          <p className="font-[var(--font-mono)] text-[22px] uppercase leading-snug tracking-[0.12em]">
            {foundation?.label}
          </p>

          <p className="mt-2 font-[var(--font-mono)] text-[112px] font-bold leading-none tracking-[-0.06em] text-[var(--accent)]">
            {foundation?.badge}
          </p>

          <p className="mt-4 max-w-[760px] font-[var(--font-body)] text-[25px] leading-snug">
            {foundation?.body}
          </p>

          <svg
            aria-hidden="true"
            viewBox="0 0 952 16"
            preserveAspectRatio="none"
            className="pointer-events-none absolute inset-x-0 bottom-0 h-4 w-full text-[var(--accent)]"
            fill="none"
          >
            <path
              d="M1 0V15H49 M903 15H951V0 M476 4V15"
              stroke="currentColor"
              strokeWidth="2"
            />
          </svg>
        </article>

        <article className="relative isolate flex min-h-[320px] flex-1 flex-col justify-center border border-[var(--border)] bg-[var(--surface)] px-10 py-8">
          <svg
            aria-hidden="true"
            viewBox="0 0 952 340"
            preserveAspectRatio="xMaxYMax meet"
            className="pointer-events-none absolute inset-0 -z-10 h-full w-full text-[var(--ink)] opacity-[0.07]"
            fill="none"
          >
            <g
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="square"
              strokeLinejoin="miter"
            >
              <path d="M380 314H926 M412 326H940" />
              <path d="M470 313V181L482 168H508L520 181V313" />
              <path d="M462 181H528 M466 195H524 M462 302H528" />
              <path d="M482 203V291 M495 203V291 M508 203V291" />
              <path d="M758 313V143H812V313 M749 143H821 M753 157H817" />
              <path d="M770 169V297 M785 169V297 M800 169V297" />
              <path d="M746 303H824" />
              <path d="M520 231H551V204C551 157 590 119 637 119C684 119 723 157 723 204V231H758" />
              <path d="M571 313V205C571 168 600 139 637 139C674 139 703 168 703 205V313" />
              <path d="M551 231V313 M723 231V313" />
              <path d="M539 104H604L616 94H655L669 105H734 M548 113H728" />
              <path d="M637 119V139 M590 132L603 148 M684 132L671 148" />
              <path d="M437 313V269H458 M835 313V250H856V229H883V313" />
            </g>
          </svg>

          <div className="mb-6 h-[3px] w-16 bg-[var(--accent)]" />

          <p className="font-[var(--font-mono)] text-[20px] uppercase leading-snug tracking-[0.1em]">
            {population?.label}
          </p>

          <h2 className="mt-4 font-[var(--font-headline)] text-[52px] font-bold leading-[1.08] tracking-[-0.035em]">
            {population?.badge}
          </h2>

          <p className="mt-6 max-w-[800px] font-[var(--font-body)] text-[25px] leading-snug">
            {population?.body}
          </p>
        </article>
      </div>
    </section>
  );
}
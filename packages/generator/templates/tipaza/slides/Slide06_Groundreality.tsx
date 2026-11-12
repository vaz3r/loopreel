import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

export default function Slide06({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  const items = slide.items ?? [];
  const reconstruction = items[0];
  const demolition = items[1];

  const demolitionWords = (demolition?.badge ?? '').trim().split(/\s+/);
  const demolitionBadgeLines = [
    demolitionWords.slice(0, 3).join(' '),
    demolitionWords.slice(3, 5).join(' '),
    demolitionWords.slice(5).join(' '),
  ];

  return (
    <section className="flex flex-col h-full min-h-0 w-full text-[var(--ink)]">
      <header className="flex shrink-0 flex-col gap-6">
        <div className="flex items-center gap-5">
          <span
            aria-hidden="true"
            className="h-[14px] w-[14px] shrink-0 bg-[var(--accent)]"
          />
          <p className="font-[var(--font-mono)] text-[20px] uppercase leading-[1.4] tracking-[0.12em] text-[var(--accent)]">
            {slide.kicker}
          </p>
        </div>

        <h1 className="max-w-[870px] font-[var(--font-headline)] text-[58px] font-bold leading-[1.02] tracking-[-0.04em]">
          {slide.headline}
        </h1>

        <p className="max-w-[850px] font-[var(--font-body)] text-[30px] leading-[1.3]">
          {slide.subheadline}
        </p>

        <div
          aria-hidden="true"
          className="h-px w-full bg-[var(--border)]"
        />
      </header>

      <div className="flex min-h-0 flex-1 flex-col justify-between gap-8 pt-9 pb-8">
        <article className="w-[690px] shrink-0 self-end border border-[var(--border)] bg-[var(--surface)] px-8 py-7">
          <p className="mb-5 font-[var(--font-mono)] text-[22px] leading-[1.3] tracking-[0.04em] text-[var(--accent)]">
            {reconstruction?.badge}
          </p>

          <h2 className="font-[var(--font-headline)] text-[32px] font-semibold leading-[1.12] tracking-[-0.02em]">
            {reconstruction?.label}
          </h2>

          <p className="mt-5 font-[var(--font-body)] text-[28px] leading-snug">
            {reconstruction?.body}
          </p>
        </article>

        <figure
          aria-hidden="true"
          className="m-0 h-[260px] w-full shrink-0"
        >
          <svg
            viewBox="0 0 952 260"
            fill="none"
            className="block h-full w-full"
          >
            {/* A reconstructed mass, severed into architectural remnants. */}
            <path
              d="M224 117V61H298V32H472V61H574V13H680V61H754V117Z"
              fill="var(--ink)"
            />

            <path
              d="M247 61H298M472 61H552M600 34H654"
              stroke="var(--surface)"
              strokeWidth="2"
            />

            <path
              d="M224 154H298V225H224Z
                 M321 154H379V225H321Z
                 M402 174H470V225H402Z
                 M494 154H549V225H494Z
                 M574 188L627 165L650 225H574Z
                 M680 178H727V225H680Z"
              fill="var(--ink)"
            />

            <path
              d="M752 209L780 188L809 225H752Z
                 M177 225L194 203L211 225Z
                 M434 160L452 147L469 160Z"
              fill="var(--ink)"
            />

            <path
              d="M112 136H866"
              stroke="var(--accent)"
              strokeWidth="7"
              strokeLinecap="butt"
            />

            <path
              d="M144 226H836"
              stroke="var(--border)"
              strokeWidth="2"
            />
          </svg>
        </figure>

        <article className="relative w-[820px] shrink-0 self-start border-2 border-[var(--ink)] bg-white px-9 py-8">
          <span
            aria-hidden="true"
            className="absolute -left-[2px] top-8 h-[116px] w-[7px] bg-[var(--accent)]"
          />

          <p className="font-[var(--font-mono)] text-[34px] leading-[1.12] tracking-[-0.025em] text-[var(--accent)]">
            {demolitionBadgeLines.map((line, index) => (
              <span key={index} className="block">
                {line}
              </span>
            ))}
          </p>

          <div
            aria-hidden="true"
            className="my-7 h-px w-full bg-[var(--border)]"
          />

          <h2 className="font-[var(--font-headline)] text-[38px] font-semibold leading-[1.1] tracking-[-0.025em]">
            {demolition?.label}
          </h2>

          <p className="mt-5 max-w-[680px] font-[var(--font-body)] text-[28px] leading-snug">
            {demolition?.body}
          </p>
        </article>
      </div>
    </section>
  );
}
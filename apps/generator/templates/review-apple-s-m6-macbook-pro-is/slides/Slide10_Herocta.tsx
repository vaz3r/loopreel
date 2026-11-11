import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

export default function Slide10({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  const copy = {
    headline: 'A Capable Laptop. A Difficult Value Argument.',
    verdict:
      "Best suited to buyers prioritizing 120 Hz ProMotion, extra ports, and active cooling—not Apple's newest flagship features.",
    question:
      'Are those advantages worth $500 to $700 over the 13- or 15-inch MacBook Air?',
    actionText: 'Where do you draw the line?',
  };

  return (
    <section
      aria-label={copy.headline}
      data-slide-id={slide.id}
      className="flex h-full min-h-0 w-full flex-col justify-center gap-9 text-[var(--ink)]"
    >
      <div className="h-1.5 w-20 shrink-0 bg-[var(--accent)]" />

      <h1 className="m-0 font-[var(--font-headline)] text-[76px] font-semibold leading-[1.02] tracking-[-0.055em]">
        <span className="block">A Capable Laptop.</span>
        <span className="block">A Difficult</span>
        <span className="block text-[var(--accent)]">Value Argument.</span>
      </h1>

      <div className="grid grid-cols-[1.4fr_1fr] items-center gap-10 border-t border-[var(--border)] pt-7">
        <p className="m-0 font-[var(--font-body)] text-[28px] leading-[1.42] tracking-[-0.018em]">
          {copy.verdict}
        </p>

        <svg
          viewBox="0 0 360 230"
          fill="none"
          aria-hidden="true"
          className="h-[230px] w-full text-[var(--accent)]"
        >
          {/* A deliberately unresolved balance: capability versus cost. */}
          <path
            d="M20 196H340"
            stroke="var(--border)"
            strokeWidth="1"
          />
          <path
            d="M180 151L151 195H209L180 151Z"
            fill="var(--surface)"
            stroke="var(--border)"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          <path
            d="M32 155L329 128"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <circle cx="180" cy="142" r="5" fill="currentColor" />

          {/* Actively cooled laptop silhouette. */}
          <g transform="translate(33 48) rotate(-5 72 90)">
            <rect
              x="17"
              y="3"
              width="119"
              height="78"
              rx="6"
              fill="var(--surface)"
              stroke="var(--ink)"
              strokeWidth="2"
            />
            <rect
              x="24"
              y="10"
              width="105"
              height="63"
              rx="2"
              stroke="var(--border)"
            />
            <path
              d="M17 81L2 94V100H151V94L136 81H17Z"
              fill="var(--surface)"
              stroke="var(--ink)"
              strokeWidth="2"
              strokeLinejoin="round"
            />
            <path d="M2 94H151" stroke="var(--border)" />
            <path
              d="M62 84H91L96 89H57L62 84Z"
              stroke="var(--border)"
            />
            <path
              d="M13 97H25M31 97H37"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M40 51L60 34L79 44L111 23"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>

          {/* Abstract counterweight; no invented specification labels. */}
          <g transform="translate(252 67)">
            <rect
              x="0"
              y="17"
              width="57"
              height="40"
              rx="3"
              fill="var(--surface)"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <path
              d="M8 10H49V17M16 3H41V10"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
            <circle
              cx="28.5"
              cy="37"
              r="9"
              stroke="currentColor"
              strokeWidth="1.5"
            />
          </g>

          <path
            d="M180 17V115"
            stroke="var(--border)"
            strokeDasharray="3 7"
          />
          <path
            d="M175 22L180 17L185 22"
            stroke="var(--border)"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      <div className="relative overflow-hidden border border-[var(--border)] bg-[var(--surface)] px-9 py-8">
        <div className="absolute inset-y-0 left-0 w-1 bg-[var(--accent)]" />

        <p className="m-0 max-w-[820px] font-[var(--font-headline)] text-[38px] font-medium leading-[1.22] tracking-[-0.03em]">
          Are those advantages worth{' '}
          <span className="whitespace-nowrap text-[var(--accent)]">
            $500 to $700
          </span>{' '}
          over the 13- or 15-inch MacBook Air?
        </p>
      </div>

      <div className="flex items-center gap-6">
        <p className="m-0 shrink-0 font-[var(--font-body)] text-[29px] font-medium leading-tight tracking-[-0.025em]">
          {copy.actionText}
        </p>

        <div className="relative h-px flex-1 bg-[var(--border)]">
          <span className="absolute -top-2 right-8 h-4 w-0.5 rotate-[24deg] bg-[var(--accent)]" />
        </div>

        <svg
          viewBox="0 0 32 32"
          fill="none"
          aria-hidden="true"
          className="h-8 w-8 shrink-0 text-[var(--accent)]"
        >
          <path
            d="M5 16H26M17 7L26 16L17 25"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </section>
  );
}
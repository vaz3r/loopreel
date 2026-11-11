import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

export default function Slide06({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  void brand;
  void totalSlides;

  return (
    <section className="flex flex-col h-full min-h-0 w-full text-[var(--ink)]">
      <header className="flex flex-col items-start border-t-[4px] border-[var(--ink)] pt-7">
        <p className="font-[var(--font-mono)] text-[22px] tracking-[0.2em] text-[var(--accent)]">
          {slide.kicker}
        </p>

        <h1 className="mt-9 max-w-[920px] font-[var(--font-headline)] text-[68px] font-bold leading-[1.04] tracking-[-0.045em]">
          {slide.headline}
        </h1>

        <p className="mt-8 max-w-[790px] font-[var(--font-body)] text-[28px] leading-snug">
          {slide.subheadline}
        </p>
      </header>

      <div className="flex min-h-0 flex-1 flex-col justify-center pb-20">
        <figure className="m-0 w-full">
          <svg
            viewBox="0 0 952 320"
            className="block h-[320px] w-full"
            fill="none"
            aria-hidden="true"
          >
            {/* Equal station spacing expresses order, not elapsed time. */}
            <path
              d="M0 230H126 M174 230H440 M512 230H778 M826 230H952"
              stroke="#000000"
              strokeWidth="4"
            />

            {/* Initial ceasefire: an unfilled circular station. */}
            <circle
              cx="150"
              cy="230"
              r="24"
              stroke="#000000"
              strokeWidth="4"
            />
            <path
              d="M150 254V302"
              stroke="var(--border)"
              strokeWidth="2"
            />

            {/* Failed talks: the sequence is visibly broken, not bridged. */}
            <path
              d="M456 248L474 212 M478 248L496 212"
              stroke="var(--accent, #E60000)"
              strokeWidth="7"
              strokeLinecap="square"
            />
            <path
              d="M476 266V302"
              stroke="var(--accent, #E60000)"
              strokeWidth="2"
            />

            {/* Announcement: an open square, without a completion fill. */}
            <rect
              x="778"
              y="206"
              width="48"
              height="48"
              stroke="#000000"
              strokeWidth="4"
            />
            <path
              d="M802 254V302"
              stroke="var(--border)"
              strokeWidth="2"
            />
          </svg>

          <ol className="m-0 grid list-none grid-cols-3 gap-[26px] p-0">
            {(slide.points ?? []).map((point: any, index: number) => (
              <li key={point.label} className="min-w-0">
                <h2
                  className={`text-center font-[var(--font-mono)] text-[36px] font-semibold leading-tight tracking-[-0.04em] ${
                    index === 1
                      ? 'text-[var(--accent)]'
                      : 'text-[var(--ink)]'
                  }`}
                >
                  {point.label}
                </h2>

                <div
                  className={`mt-7 border-t pt-6 ${
                    index === 1
                      ? 'border-[var(--accent)]'
                      : 'border-[var(--border)]'
                  }`}
                >
                  <p className="font-[var(--font-body)] text-[28px] leading-[1.4] tracking-[-0.015em]">
                    {point.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </figure>
      </div>
    </section>
  );
}
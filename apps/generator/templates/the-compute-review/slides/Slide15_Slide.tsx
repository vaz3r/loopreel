import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

export default function Slide15({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  const parameterField = (active: boolean) => (
    <svg
      viewBox="0 0 352 244"
      className="w-full"
      fill="none"
      aria-hidden="true"
    >
      {Array.from({ length: 117 }, (_, index) => {
        const x = 13 + (index % 13) * 26;
        const y = 11 + Math.floor(index / 13) * 26;

        return (
          <g key={index}>
            <rect
              x={x}
              y={y}
              width="14"
              height="14"
              rx="2"
              fill={
                active
                  ? index < 5
                    ? 'var(--accent)'
                    : 'var(--border)'
                  : 'var(--ink)'
              }
              opacity={active ? (index < 5 ? 1 : 0.55) : 0.72}
            />
            {active && index === 5 && (
              <rect
                x={x}
                y={y}
                width="1.4"
                height="14"
                fill="var(--accent)"
              />
            )}
          </g>
        );
      })}
      <path
        d="M5 4H24M5 4V23M347 4H328M347 4V23M5 240H24M5 240V221M347 240H328M347 240V221"
        stroke="var(--border)"
        strokeWidth="1"
      />
    </svg>
  );

  return (
    <section className="flex h-full min-h-0 flex-col justify-center gap-11 text-[var(--ink)] font-[var(--font-body)]">
      <h1 className="max-w-[880px] text-[82px] font-[var(--font-headline)] font-semibold leading-[0.98] tracking-[-0.055em]">
        Read beyond
        <br />
        the model name
      </h1>

      <div className="flex items-center gap-5 border-t border-[var(--border)] pt-7">
        <span className="inline-flex shrink-0 items-center gap-3 bg-[var(--accent)] px-4 py-2 text-[22px] font-[var(--font-mono)] font-bold text-[var(--surface)]">
          <svg
            viewBox="0 0 24 24"
            className="h-6 w-6"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="m5 12 4 4L19 6"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="square"
            />
          </svg>
          DO
        </span>
        <p className="text-[31px] leading-[1.2] tracking-[-0.025em]">
          distinguish gpt-oss-120b’s
        </p>
      </div>

      <div className="relative grid grid-cols-2 gap-10">
        <div className="flex min-w-0 flex-col border border-[var(--border)] bg-[var(--surface)] p-7">
          <div className="text-[104px] font-[var(--font-headline)] font-semibold leading-none tracking-[-0.065em]">
            117B
          </div>
          <p className="mt-3 text-[25px] leading-tight tracking-[-0.02em]">
            total parameters
          </p>
          <div className="mt-8 border-t border-[var(--border)] pt-6">
            {parameterField(false)}
          </div>
        </div>

        <span className="absolute left-1/2 top-[164px] z-10 -translate-x-1/2 border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-[17px] font-[var(--font-mono)] leading-none">
          from
        </span>

        <div className="flex min-w-0 flex-col border border-[var(--border)] border-t-[3px] border-t-[var(--accent)] bg-[var(--surface)] p-7 pt-[26px]">
          <div className="text-[104px] font-[var(--font-headline)] font-semibold leading-none tracking-[-0.065em] text-[var(--accent)]">
            5.1B
          </div>
          <p className="mt-3 text-[25px] leading-tight tracking-[-0.02em]">
            active per token.
          </p>
          <div className="mt-8 border-t border-[var(--border)] pt-6">
            {parameterField(true)}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-[64px_1fr] items-center gap-6 border-t border-[var(--border)] pt-7">
        <svg
          viewBox="0 0 64 64"
          className="h-16 w-16 text-[var(--accent)]"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M12 24H52M12 40H52"
            stroke="var(--ink)"
            strokeWidth="3"
          />
          <path
            d="M43 9 21 55"
            stroke="currentColor"
            strokeWidth="4"
          />
        </svg>
        <p className="max-w-[740px] text-[34px] leading-[1.2] tracking-[-0.03em]">
          <span className="font-semibold">DON&apos;T</span> treat them as
          interchangeable.
        </p>
      </div>
    </section>
  );
}
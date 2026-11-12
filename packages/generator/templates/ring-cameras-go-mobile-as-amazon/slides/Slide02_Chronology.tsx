import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

export default function Slide02({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  const items = (slide.items ?? []).slice(0, 3);

  return (
    <section className="flex flex-col h-full min-h-0 w-full text-[var(--ink)]">
      <header className="flex shrink-0 flex-col gap-7 pb-10">
        <div className="flex items-center gap-5">
          <span
            aria-hidden="true"
            className="h-[12px] w-[12px] shrink-0 bg-[var(--accent)]"
          />
          <p className="font-[var(--font-mono)] text-[20px] leading-normal tracking-[0.12em] text-[var(--accent)]">
            {slide.kicker}
          </p>
        </div>

        <h1 className="max-w-[900px] font-[var(--font-headline)] text-[60px] font-bold leading-[1.04] tracking-[-0.04em] [text-wrap:balance]">
          {slide.headline}
        </h1>

        <p className="max-w-[840px] font-[var(--font-body)] text-[28px] leading-snug opacity-80">
          {slide.subheadline}
        </p>

        <div
          aria-hidden="true"
          className="flex h-px w-full bg-[var(--border)]"
        >
          <span className="h-px w-[112px] bg-[var(--accent)]" />
        </div>
      </header>

      <ol className="m-0 flex min-h-0 flex-1 list-none flex-col p-0">
        {items.map((item, index) => {
          const isAnnouncement = index === 0;
          const isLast = index === items.length - 1;

          return (
            <li
              key={`${index}-${item.badge}`}
              className="grid min-h-0 flex-1 grid-cols-[64px_minmax(0,1fr)] gap-8"
            >
              <div aria-hidden="true" className="relative h-full">
                {!isLast && (
                  <svg
                    className="absolute left-0 top-[32px] h-full w-[64px] text-[var(--border)]"
                    viewBox="0 0 64 100"
                    preserveAspectRatio="none"
                    fill="none"
                  >
                    <path
                      d="M32 0V100"
                      stroke="currentColor"
                      strokeWidth="2"
                      vectorEffect="non-scaling-stroke"
                    />
                  </svg>
                )}

                <svg
                  className="relative block h-[64px] w-[64px] text-[var(--accent)]"
                  viewBox="0 0 64 64"
                  fill="none"
                >
                  <path
                    d="M6 32H17M47 32H58"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <circle
                    cx="32"
                    cy="32"
                    r="14"
                    fill={isAnnouncement ? 'currentColor' : 'var(--paper, #0D0E12)'}
                    stroke="currentColor"
                    strokeWidth="3"
                  />
                  {isAnnouncement && (
                    <circle
                      cx="32"
                      cy="32"
                      r="23"
                      stroke="currentColor"
                      strokeWidth="1"
                      opacity="0.35"
                    />
                  )}
                </svg>
              </div>

              <div
                className={`flex min-w-0 flex-col items-start gap-6 pt-[9px] ${
                  isLast
                    ? 'pb-8'
                    : 'mb-8 border-b border-[var(--border)] pb-9'
                }`}
              >
                <p
                  className={`font-[var(--font-mono)] text-[36px] font-semibold leading-[1.3] tracking-[-0.035em] tabular-nums ${
                    isAnnouncement
                      ? 'text-[var(--accent)]'
                      : 'text-[var(--ink)]'
                  }`}
                >
                  {item.badge}
                </p>

                <h2 className="font-[var(--font-headline)] text-[32px] font-semibold leading-tight tracking-[-0.015em]">
                  {item.title}
                </h2>

                <p className="max-w-[760px] font-[var(--font-body)] text-[30px] leading-snug opacity-80">
                  {item.body}
                </p>

                {index === 2 && (
                  <svg
                    aria-hidden="true"
                    className="mt-1 h-[64px] w-[96px] shrink-0 text-[var(--accent)]"
                    viewBox="0 0 96 64"
                    fill="none"
                  >
                    <path
                      d="M16 54V12H80V54M10 54H24M72 54H86"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                    <rect
                      x="24"
                      y="22"
                      width="48"
                      height="22"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                    <path
                      d="M36 23V43M48 23V43M60 23V43"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                  </svg>
                )}
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
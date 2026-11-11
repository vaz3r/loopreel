import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

export default function Slide09({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  const theme = {
    '--ink': '#291D35',
    '--accent': '#6534BC',
    '--paper': '#EAF2EC',
    '--surface': '#DCE8DF',
    '--border': '#A4B5A9',
  } as React.CSSProperties;

  return (
    <section
      className="flex flex-col h-full min-h-0 w-full text-[var(--ink)]"
      style={theme}
      aria-labelledby="slide-09-title"
    >
      <div className="flex h-full min-h-0 flex-col bg-[var(--paper)]">
        <header className="shrink-0">
          <p className="font-[var(--font-mono)] text-[22px] font-medium uppercase tracking-[0.16em] text-[var(--accent)]">
            {slide.kicker}
          </p>

          <h1
            id="slide-09-title"
            className="mt-6 max-w-[900px] font-[var(--font-headline)] text-[64px] font-bold leading-[1.06] tracking-[-0.035em]"
          >
            {slide.headline}
          </h1>

          <p className="mt-7 max-w-[850px] font-[var(--font-body)] text-[28px] leading-snug">
            {slide.subheadline}
          </p>
        </header>

        <div className="relative mt-14 h-[512px] w-full shrink-0">
          <svg
            className="pointer-events-none absolute inset-0 h-full w-full"
            viewBox="0 0 952 512"
            fill="none"
            aria-hidden="true"
          >
            <rect
              x="0"
              y="0"
              width="688"
              height="224"
              fill="var(--surface)"
            />
            <rect
              x="40"
              y="288"
              width="648"
              height="224"
              fill="var(--surface)"
            />

            <path
              d="M0 1H688 M0 223H688 M40 289H688 M40 511H688"
              stroke="var(--border)"
              strokeWidth="2"
            />

            <path
              d="M728 72H714V152H728 M934 72H948V152H934
                 M728 360H714V440H728 M934 360H948V440H934"
              stroke="var(--accent)"
              strokeWidth="3"
              strokeLinecap="square"
            />
          </svg>

          <ol className="relative m-0 flex list-none flex-col gap-16 p-0">
            <li className="grid h-[224px] grid-cols-[minmax(0,1fr)_240px] gap-6">
              <div className="flex min-w-0 flex-col justify-center px-8 py-6">
                <h2 className="font-[var(--font-headline)] text-[36px] font-semibold leading-tight tracking-[-0.02em]">
                  Conversion ratios
                </h2>
                <p className="mt-4 max-w-[600px] font-[var(--font-body)] text-[26px] leading-snug">
                  No numerical token-to-character conversion ratios appear in
                  the supplied text.
                </p>
              </div>

              <div className="flex items-center justify-center px-4">
                <span className="whitespace-nowrap font-[var(--font-mono)] text-[22px] font-medium tracking-wide text-[var(--accent)]">
                  Not supplied
                </span>
              </div>
            </li>

            <li className="ml-10 grid h-[224px] grid-cols-[minmax(0,1fr)_240px] gap-6">
              <div className="flex min-w-0 flex-col justify-center px-8 py-6">
                <h2 className="font-[var(--font-headline)] text-[36px] font-semibold leading-tight tracking-[-0.02em]">
                  Image token ceiling
                </h2>
                <p className="mt-4 max-w-[560px] font-[var(--font-body)] text-[26px] leading-snug">
                  The supplied text gives no numerical per-image token limit.
                </p>
              </div>

              <div className="flex items-center justify-center px-4">
                <span className="whitespace-nowrap font-[var(--font-mono)] text-[22px] font-medium tracking-wide text-[var(--accent)]">
                  Not supplied
                </span>
              </div>
            </li>
          </ol>
        </div>
      </div>
    </section>
  );
}
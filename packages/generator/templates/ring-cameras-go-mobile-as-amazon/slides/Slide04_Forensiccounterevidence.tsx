import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

export default function Slide04({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  const items = slide.items ?? [];
  const item0 = items[0];
  const item1 = items[1];

  const cloudPath =
    'M104 240C65 240 42 215 42 183C42 153 63 129 93 125C98 83 130 57 168 57C207 57 237 80 249 114C255 112 263 111 270 111C308 111 338 140 338 177C338 213 311 240 274 240Z';

  const keyGraphic = (
    <g
      fill="none"
      stroke="currentColor"
      strokeWidth="9"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="0" cy="0" r="23" />
      <path d="M23 0H105M76 0V22M102 0V16" />
    </g>
  );

  return (
    <section className="flex flex-col h-full min-h-0 w-full text-[var(--ink)]">
      <header className="shrink-0 pb-10">
        <div className="mb-8 flex items-center gap-5">
          <span
            aria-hidden="true"
            className="h-3 w-3 shrink-0 bg-[var(--accent)]"
          />
          <p className="font-[var(--font-mono)] text-[20px] uppercase leading-normal tracking-[0.12em] text-[var(--accent)]">
            {slide.kicker}
          </p>
        </div>

        <h1 className="max-w-[920px] font-[var(--font-headline)] text-[60px] font-bold leading-[1.04] tracking-[-0.045em]">
          {slide.headline}
        </h1>

        <p className="mt-7 max-w-[850px] font-[var(--font-body)] text-[28px] leading-snug">
          {slide.subheadline}
        </p>
      </header>

      <div className="grid min-h-0 flex-1 grid-cols-2 border-y border-[var(--border)]">
        <article className="flex min-w-0 flex-col border-r-2 border-[var(--accent)] px-8 pb-10 pt-9">
          <h2 className="min-h-[90px] font-[var(--font-headline)] text-[34px] font-semibold leading-[1.12] tracking-[-0.025em]">
            {item0?.title || item0?.label}
          </h2>

          <div className="flex min-h-[460px] flex-1 items-center">
            <svg
              viewBox="0 0 380 500"
              role="img"
              aria-label="A video key inside a cloud contour."
              className="h-[500px] w-full text-[var(--ink)]"
            >
              <g
                fill="none"
                stroke="var(--border)"
                strokeWidth="1"
              >
                <path d="M18 26H54M18 26V62M326 26H362M362 26V62" />
                <path d="M18 438V474H54M326 474H362V438" />
                <path d="M190 26V62M190 438V474" />
              </g>

              <g transform="translate(0 78)">
                <path
                  d={cloudPath}
                  fill="var(--surface)"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinejoin="round"
                />
                <g
                  transform="translate(143 170)"
                  className="text-[var(--accent)]"
                >
                  {keyGraphic}
                </g>
              </g>

              <path
                d="M97 376H283"
                fill="none"
                stroke="var(--border)"
                strokeWidth="2"
              />
              <circle cx="190" cy="376" r="5" fill="var(--accent)" />
            </svg>
          </div>

          <div className="min-h-[345px] border-t border-[var(--border)] pt-7">
            <p className="mb-6 font-[var(--font-mono)] text-[52px] font-bold leading-none tracking-[-0.055em] text-[var(--accent)]">
              {item0?.badge}
            </p>
            <p className="font-[var(--font-body)] text-[30px] leading-snug">
              {item0?.body}
            </p>
          </div>
        </article>

        <article className="flex min-w-0 flex-col bg-[var(--surface)] px-8 pb-10 pt-9">
          <h2 className="min-h-[90px] font-[var(--font-headline)] text-[34px] font-semibold leading-[1.12] tracking-[-0.025em]">
            {item1?.title || item1?.label}
          </h2>

          <div className="flex min-h-[460px] flex-1 items-center">
            <svg
              viewBox="0 0 380 500"
              role="img"
              aria-label="A returning path carries the same video key back toward the cloud."
              className="h-[500px] w-full text-[var(--ink)]"
            >
              <g
                fill="none"
                stroke="var(--border)"
                strokeWidth="1"
              >
                <path d="M18 26H54M18 26V62M326 26H362M362 26V62" />
                <path d="M18 438V474H54M326 474H362V438" />
                <path d="M190 26V62M190 438V474" />
              </g>

              <path
                d={cloudPath}
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinejoin="round"
              />

              <path
                d="M94 255C56 288 50 344 78 388C111 439 190 456 252 425C312 395 332 331 304 278L281 240"
                fill="none"
                stroke="var(--accent)"
                strokeWidth="5"
                strokeLinecap="round"
              />
              <path
                d="M278 268L281 240L307 252"
                fill="none"
                stroke="var(--accent)"
                strokeWidth="5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              <g
                transform="translate(142 351)"
                className="text-[var(--accent)]"
              >
                {keyGraphic}
              </g>

              <path
                d="M165 174H215M190 149V199"
                fill="none"
                stroke="var(--border)"
                strokeWidth="2"
              />
            </svg>
          </div>

          <div className="min-h-[345px] border-t border-[var(--border)] pt-7">
            <p className="font-[var(--font-body)] text-[30px] leading-snug">
              {item1?.body}
            </p>
          </div>
        </article>
      </div>
    </section>
  );
}
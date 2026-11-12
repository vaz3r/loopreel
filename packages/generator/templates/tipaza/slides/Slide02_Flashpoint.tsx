import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

export default function Slide02({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  const items = slide.items ?? [];
  const telemetry = slide.telemetry ?? [];

  const cards = [
    { item: items[0], metric: telemetry[0], military: true },
    { item: items[1], metric: telemetry[1], military: false },
  ];

  return (
    <section className="flex flex-col h-full min-h-0 w-full text-[var(--ink)]">
      <header className="flex shrink-0 flex-col gap-7">
        <div className="flex items-center gap-5">
          <span
            aria-hidden="true"
            className="h-3 w-3 shrink-0 bg-[var(--accent)]"
          />
          <p className="font-[var(--font-mono)] text-[20px] uppercase leading-normal tracking-[0.12em] text-[var(--accent)]">
            {slide.kicker}
          </p>
        </div>

        <h1 className="max-w-[900px] font-[var(--font-headline)] text-[60px] font-bold leading-[1.04] tracking-[-0.04em]">
          {slide.headline}
        </h1>

        <p className="max-w-[860px] font-[var(--font-body)] text-[30px] leading-snug">
          {slide.subheadline}
        </p>
      </header>

      <div className="my-8 h-[144px] shrink-0">
        <svg
          viewBox="0 0 952 144"
          className="h-full w-full"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M0 113L98 102L161 111L222 86L293 90L348 64L422 76L493 48L562 64L624 41L695 51L756 26L824 39L896 17L952 24V144H0Z"
            fill="var(--surface)"
          />
          <path
            d="M0 113L98 102L161 111L222 86L293 90L348 64L422 76L493 48L562 64L624 41L695 51L756 26L824 39L896 17L952 24"
            stroke="var(--border)"
            strokeWidth="2"
            strokeLinejoin="miter"
          />
          <path
            d="M0 37H231M721 107H952M64 25V49M888 95V119"
            stroke="var(--border)"
            strokeWidth="2"
          />
          <path
            d="M422 76L493 48L562 64"
            stroke="var(--accent)"
            strokeWidth="3"
          />
          <circle cx="493" cy="48" r="7" fill="var(--accent)" />
          <circle
            cx="493"
            cy="48"
            r="20"
            stroke="var(--accent)"
            strokeWidth="2"
            opacity="0.35"
          />
        </svg>
      </div>

      <div className="flex flex-1 flex-col justify-evenly gap-9 pb-8">
        {cards.map(({ item, metric, military }, index) => {
          const [value, ...unitWords] = (metric?.badge ?? '').split(/\s+/);
          const unit = unitWords.join(' ');

          return (
            <article
              key={index}
              className={`relative flex min-h-[378px] w-[calc(100%-64px)] shrink-0 flex-col border border-[var(--border)] bg-[var(--surface)] ${
                military ? 'ml-16' : 'mr-16'
              }`}
            >
              <span
                aria-hidden="true"
                className={`absolute -left-px top-8 h-20 w-[3px] ${
                  military ? 'bg-[var(--accent)]' : 'bg-[var(--ink)]'
                }`}
              />

              <div className="flex flex-1 flex-col gap-5 px-8 pb-7 pt-7">
                <div className="flex items-center gap-6">
                  {military ? (
                    <svg
                      viewBox="0 0 72 80"
                      className="h-20 w-[72px] shrink-0 text-[var(--accent)]"
                      fill="none"
                      aria-hidden="true"
                    >
                      <path
                        d="M34 5L39 12L34 19L29 12Z"
                        fill="currentColor"
                      />
                      <path
                        d="M34 18V74M14 25H58M24 74H44"
                        stroke="currentColor"
                        strokeWidth="4"
                        strokeLinecap="square"
                      />
                      <path
                        d="M19 27H53V54L36 65L19 54Z"
                        fill="currentColor"
                      />
                      <path
                        d="M29 36H43M36 36V51"
                        stroke="var(--surface)"
                        strokeWidth="3"
                      />
                    </svg>
                  ) : (
                    <svg
                      viewBox="0 0 72 80"
                      className="h-20 w-[72px] shrink-0 text-[var(--ink)]"
                      fill="none"
                      aria-hidden="true"
                    >
                      <path
                        d="M8 73H64M15 72V36L36 19L57 36V72"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinejoin="miter"
                      />
                      <path
                        d="M25 72V47C25 32 47 32 47 47V72"
                        stroke="currentColor"
                        strokeWidth="3"
                      />
                      <path
                        d="M36 5V19M29 11H43"
                        stroke="var(--accent)"
                        strokeWidth="3"
                      />
                    </svg>
                  )}

                  <h2 className="min-w-0 font-[var(--font-headline)] text-[36px] font-semibold leading-tight tracking-[-0.025em]">
                    {item?.title || item?.label}
                  </h2>
                </div>

                <p className="font-[var(--font-body)] text-[28px] leading-[1.3]">
                  {item?.body}
                </p>
              </div>

              <div className="border-t border-[var(--border)] px-8 py-6">
                <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                  <span
                    className={`font-[var(--font-mono)] text-[48px] font-bold leading-none tracking-[-0.04em] ${
                      military ? 'text-[var(--accent)]' : ''
                    }`}
                  >
                    {value}
                  </span>
                  {unit && (
                    <span className="font-[var(--font-body)] text-[26px] leading-snug">
                      {unit}
                    </span>
                  )}
                </div>

                <p className="mt-3 font-[var(--font-mono)] text-[20px] leading-normal tracking-[0.015em]">
                  {metric?.label}
                </p>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
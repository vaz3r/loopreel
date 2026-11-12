import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

export default function Slide02({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  void brand;
  void totalSlides;

  const items = slide.items ?? [];
  const positions = [
    { left: 0, bottom: 70 },
    { left: 324, bottom: 280 },
    { left: 648, bottom: 490 },
  ];

  return (
    <section className="flex flex-col h-full min-h-0 w-full text-[var(--ink)]">
      <header className="shrink-0">
        <p className="font-[var(--font-mono)] text-[20px] leading-[28px] tracking-[0.16em]">
          {slide.kicker}
        </p>

        <h1 className="mt-4 max-w-[920px] font-[var(--font-headline)] text-[64px] font-bold leading-[1.04] tracking-[-0.045em]">
          {slide.headline}
        </h1>

        <p className="mt-4 max-w-[900px] font-[var(--font-body)] text-[26px] leading-[34px]">
          {slide.subheadline}
        </p>
      </header>

      <div className="relative mt-6 h-[700px] w-full shrink-0">
        <svg
          className="pointer-events-none absolute inset-0 h-full w-full"
          viewBox="0 0 952 700"
          fill="none"
          aria-hidden="true"
        >
          {/* Schematic chronology: deliberately no quantitative axes. */}
          <path
            d="M286 630 H302 L324 420"
            stroke="var(--ink)"
            strokeWidth="1.5"
            strokeOpacity="0.65"
            strokeLinejoin="round"
          />
          <path
            d="M610 420 H626 L648 210"
            stroke="var(--ink)"
            strokeWidth="1.5"
            strokeOpacity="0.65"
            strokeLinejoin="round"
          />

          {/* First platform */}
          <path d="M0 630 H286 V646 H0 Z" fill="var(--surface)" />
          <path
            d="M0 630 H286"
            stroke="var(--ink)"
            strokeWidth="2"
          />
          <path
            d="M0 646 H286"
            stroke="var(--border)"
            strokeWidth="1"
          />
          <circle cx="0" cy="630" r="4" fill="var(--ink)" />

          {/* Second platform */}
          <path
            d="M324 420 H610 V436 H324 Z"
            fill="var(--surface)"
          />
          <path
            d="M324 420 H610"
            stroke="var(--ink)"
            strokeWidth="2"
          />
          <path
            d="M324 436 H610"
            stroke="var(--border)"
            strokeWidth="1"
          />
          <circle cx="324" cy="420" r="4" fill="var(--ink)" />

          {/* Only the final platform receives the orange accent. */}
          <path
            d="M648 210 H952 V226 H648 Z"
            fill="var(--accent)"
            fillOpacity="0.16"
          />
          <path
            d="M648 210 H952"
            stroke="var(--accent)"
            strokeWidth="3"
          />
          <path
            d="M648 226 H952"
            stroke="var(--accent)"
            strokeWidth="1"
            strokeOpacity="0.45"
          />
          <circle cx="648" cy="210" r="5" fill="var(--accent)" />
        </svg>

        <ol className="m-0 list-none p-0">
          {items.slice(0, 3).map((item: any, index: number) => {
            const position = positions[index]!;
            const isFinal = index === 2;

            return (
              <li
                key={`${item.label}-${index}`}
                className="absolute w-[304px] pb-6 pr-3"
                style={{
                  left: `${position.left}px`,
                  bottom: `${position.bottom}px`,
                }}
              >
                <h2
                  className={`font-[var(--font-mono)] text-[22px] font-semibold leading-[28px] tracking-[-0.025em] ${
                    isFinal
                      ? 'text-[var(--accent)]'
                      : 'text-[var(--ink)]'
                  }`}
                >
                  {item.label}
                </h2>

                <p className="mt-3 font-[var(--font-body)] text-[26px] leading-[33px] tracking-[-0.015em]">
                  {item.body}
                </p>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
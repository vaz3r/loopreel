import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

export default function Slide06({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  const items = slide.items ?? [];
  void brand;
  void totalSlides;

  return (
    <section className="flex flex-col h-full min-h-0 w-full text-[var(--ink)]">
      <header className="shrink-0">
        <div className="flex items-center gap-4">
          <span
            aria-hidden="true"
            className="h-[3px] w-12 bg-[var(--accent)]"
          />
          <p className="font-[var(--font-mono)] text-[22px] uppercase leading-none tracking-[0.14em] text-[var(--accent)]">
            {slide.kicker}
          </p>
        </div>

        <h1 className="mt-7 max-w-[920px] font-[var(--font-headline)] text-[68px] font-bold leading-[1.04] tracking-[-0.045em]">
          {slide.headline}
        </h1>

        <p className="mt-6 max-w-[850px] font-[var(--font-body)] text-[28px] leading-[1.4]">
          {slide.subheadline}
        </p>
      </header>

      <figure
        className="m-0 mt-16 flex w-full flex-col"
        aria-label="Three events in sequence. Equal spacing is schematic, not proportional to elapsed time."
      >
        <div className="grid grid-cols-3 gap-8">
          {items.slice(0, 3).map((item: any, index: number) => (
            <div
              key={`heading-${index}`}
              className="flex min-h-[132px] items-end border-t border-[var(--border)] pt-5"
            >
              <h2
                id={`slide-06-event-${index}`}
                className={`max-w-[290px] font-[var(--font-headline)] text-[32px] font-semibold leading-[1.2] tracking-[-0.025em] ${
                  index === 1
                    ? 'text-[var(--accent)]'
                    : 'text-[var(--ink)]'
                }`}
              >
                {item.label}
              </h2>
            </div>
          ))}
        </div>

        <svg
          className="mt-5 block h-[144px] w-full shrink-0"
          viewBox="0 0 952 144"
          fill="none"
          aria-hidden="true"
        >
          {/* The rail is deliberately schematic rather than a time axis. */}
          <g stroke="var(--border)" strokeWidth="3">
            <path d="M0 82H122" />
            <path d="M174 82H451" />
            <path d="M501 82H952" />
          </g>

          {/* Identically spaced event stems. */}
          <g stroke="var(--ink)" strokeWidth="2">
            <path d="M148 55V69" />
            <path d="M804 55V82" />
          </g>
          <path
            d="M476 55V65"
            stroke="var(--accent)"
            strokeWidth="2"
          />

          {/* First stop: an open gap directly beneath the event. */}
          <circle
            cx="148"
            cy="43"
            r="12"
            fill="var(--surface)"
            stroke="var(--ink)"
            strokeWidth="3"
          />
          <g stroke="var(--ink)" strokeWidth="2">
            <path d="M116 89L128 75" />
            <path d="M168 89L180 75" />
          </g>

          {/* Second stop: a conspicuous orange interruption. */}
          <circle
            cx="476"
            cy="43"
            r="12"
            fill="var(--accent)"
          />
          <g
            stroke="var(--accent)"
            strokeWidth="5"
            strokeLinecap="square"
          >
            <path d="M460 96L474 70" />
            <path d="M480 96L494 70" />
          </g>

          {/* Third stop: the rail continues beyond the announcement. */}
          <circle
            cx="804"
            cy="43"
            r="12"
            fill="var(--surface)"
            stroke="var(--ink)"
            strokeWidth="3"
          />
          <circle cx="804" cy="43" r="4" fill="var(--ink)" />

          <g stroke="var(--border)" strokeWidth="2">
            <path d="M148 107V136" />
            <path d="M476 107V136" />
            <path d="M804 107V136" />
          </g>
        </svg>

        <div className="grid grid-cols-3 gap-8">
          {items.slice(0, 3).map((item: any, index: number) => (
            <div
              key={`body-${index}`}
              aria-labelledby={`slide-06-event-${index}`}
              className="pt-3"
            >
              <p className="font-[var(--font-body)] text-[28px] leading-[1.4] tracking-[-0.015em]">
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </figure>
    </section>
  );
}
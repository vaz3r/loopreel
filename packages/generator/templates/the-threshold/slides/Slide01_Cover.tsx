import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

export default function Slide01({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  const items = (slide.items ?? []).slice(0, 2);

  const theme = {
    '--ink': '#F1F3F9',
    '--accent': '#FF4D00',
    '--surface': '#161820',
    '--border': '#2A2D3A',
    backgroundColor: '#0D0E12',
  } as React.CSSProperties;

  return (
    <section
      className="flex flex-col h-full min-h-0 w-full text-[var(--ink)]"
      style={theme}
    >
      <header className="shrink-0">
        <div className="flex items-center gap-4">
          <span
            aria-hidden="true"
            className="h-[3px] w-12 bg-[var(--accent)]"
          />
          <p className="font-[var(--font-mono)] text-[22px] font-medium uppercase leading-none tracking-[0.18em] text-[var(--accent)]">
            {slide.kicker}
          </p>
        </div>

        <h1 className="mt-7 max-w-[900px] font-[var(--font-headline)] text-[68px] font-bold leading-[1.04] tracking-[-0.045em]">
          {slide.headline}
        </h1>

        <p className="mt-6 max-w-[800px] font-[var(--font-body)] text-[28px] leading-snug">
          {slide.subheadline}
        </p>
      </header>

      <div className="relative mt-9 min-h-[540px] flex-1">
        <svg
          aria-hidden="true"
          focusable="false"
          className="absolute inset-0 h-full w-full"
          viewBox="0 0 952 620"
          preserveAspectRatio="none"
          fill="none"
        >
          {/* Two abstract editorial fields, interrupted rather than bordered. */}
          <path
            d="M0 26H402L431 91L401 159L428 223L389 296L420 355L390 436L415 512L379 594H0Z"
            fill="var(--surface)"
          />
          <path
            d="M570 26H952V594H551L578 515L548 445L577 365L546 298L577 224L550 151L578 88Z"
            fill="var(--surface)"
          />

          <path
            d="M0 26H333M619 26H952M0 594H310M642 594H952"
            stroke="var(--border)"
            strokeWidth="2"
          />

          {/* A broken typographic seam: deliberately not a mapped boundary. */}
          <path
            d="M476 0V47L497 82L463 131L482 174"
            stroke="var(--ink)"
            strokeWidth="3"
            strokeLinecap="square"
          />
          <path
            d="M470 203L448 244L488 287L461 333"
            stroke="var(--accent)"
            strokeWidth="6"
            strokeLinecap="square"
          />
          <path
            d="M483 365L505 403L469 453L490 492"
            stroke="var(--ink)"
            strokeWidth="3"
            strokeLinecap="square"
          />
          <path
            d="M477 525L454 563L476 594V620"
            stroke="var(--ink)"
            strokeWidth="3"
            strokeLinecap="square"
          />

          {/* Opposing annotation leaders terminate before the fracture. */}
          <path
            d="M336 135H393L425 166H447"
            stroke="var(--accent)"
            strokeWidth="2"
          />
          <circle cx="447" cy="166" r="5" fill="var(--accent)" />

          <path
            d="M616 359H563L536 389H524"
            stroke="var(--accent)"
            strokeWidth="2"
          />
          <circle cx="524" cy="389" r="5" fill="var(--accent)" />

          <path
            d="M20 46H54M20 46V80M932 574H898M932 574V540"
            stroke="var(--border)"
            strokeWidth="2"
          />
        </svg>

        <div className="relative grid h-full min-h-[540px] grid-cols-[1fr_180px_1fr] grid-rows-2">
          {items.map((item: any, index: number) => (
            <article
              key={`${slide.id}-${index}`}
              className={
                index === 0
                  ? 'col-start-1 row-start-1 self-center px-7 py-6'
                  : 'col-start-3 row-start-2 self-center px-7 py-6'
              }
            >
              <div
                aria-hidden="true"
                className="mb-5 h-[4px] w-10 bg-[var(--accent)]"
              />
              <h2 className="font-[var(--font-headline)] text-[34px] font-semibold leading-[1.08] tracking-[-0.025em]">
                {item.label}
              </h2>
              <p className="mt-5 font-[var(--font-body)] text-[26px] leading-snug">
                {item.body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
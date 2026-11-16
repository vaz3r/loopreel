import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

export default function Slide07({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  const items = slide.items ?? [];
  const item0 = items[0]!;
  const item1 = items[0]!;
  const artId = React.useId();

  return (
    <section className="flex h-full min-h-0 w-full flex-col justify-between text-[var(--ink)]">
      <header className="shrink-0 border-t-2 border-[var(--ink)] pt-6">
        <div className="mb-6 flex items-center gap-4">
          <span
            aria-hidden="true"
            className="h-4 w-4 shrink-0 bg-[var(--accent)]"
          />
          <p className="font-[var(--font-headline)] text-[22px] font-bold tracking-[0.12em]">
            THE STRATEGIC VERDICT
          </p>
        </div>

        <h1 className="max-w-[900px] font-[var(--font-headline)] text-[60px] font-bold leading-[1.02] tracking-tight">
          Extra Revenue Must
          <br />
          Survive Costs
        </h1>

        <p className="mt-5 max-w-[820px] font-[var(--font-body)] text-[26px] leading-snug line-clamp-2">
          Optimize retained revenue—not the number of extra tickets.
        </p>
      </header>

      <div className="relative flex min-h-0 flex-1 items-center justify-center py-5">
        <svg
          viewBox="0 0 952 460"
          className="block h-full max-h-[500px] w-full"
          preserveAspectRatio="xMidYMid meet"
          role="img"
          aria-labelledby={`${artId}-title ${artId}-description`}
        >
          <title id={`${artId}-title`}>
            Revenue must pass through the cost gate
          </title>
          <desc id={`${artId}-description`}>
            An incoming revenue pathway passes through a monumental gate.
            Costs branch downward while retained revenue continues right.
            The diagram is conceptual, not a quantitative comparison.
          </desc>

          {/* Architectural registration lines. */}
          <g fill="none" stroke="var(--border)" strokeWidth="1.5">
            <path d="M24 72H928M24 364H928" />
            <path d="M288 28V430M664 28V430" />
            <path d="M24 64V80M928 64V80M24 356V372M928 356V372" />
          </g>

          {/* Monumental threshold, with recessed interior faces. */}
          <path
            d="M324 344V100H628V344"
            fill="none"
            stroke="var(--border)"
            strokeWidth="56"
          />
          <path
            d="M304 344V80H608V344"
            fill="none"
            stroke="var(--ink)"
            strokeWidth="56"
          />
          <path
            d="M332 108H580V344"
            fill="none"
            stroke="var(--surface)"
            strokeWidth="3"
          />

          {/* Accent flag: the threshold is a decision, not a finish line. */}
          <path d="M580 34H674V78H580Z" fill="var(--accent)" />
          <path
            d="M598 56H653M643 46L653 56L643 66"
            fill="none"
            stroke="var(--surface)"
            strokeWidth="3"
            strokeLinecap="square"
            strokeLinejoin="miter"
          />

          {/* Incoming conduit and geometric source node. */}
          <path
            d="M72 226H421"
            fill="none"
            stroke="var(--ink)"
            strokeWidth="8"
          />
          <rect x="44" y="210" width="32" height="32" fill="var(--ink)" />
          <path
            d="M207 214L219 226L207 238"
            fill="none"
            stroke="var(--ink)"
            strokeWidth="4"
          />

          {/* Cost branch exits into a separate lower channel. */}
          <path
            d="M456 249V394H564"
            fill="none"
            stroke="var(--ink)"
            strokeWidth="4"
          />
          <path
            d="M551 382L564 394L551 406"
            fill="none"
            stroke="var(--ink)"
            strokeWidth="4"
          />
          <rect
            x="584"
            y="380"
            width="28"
            height="28"
            fill="var(--surface)"
            stroke="var(--ink)"
            strokeWidth="3"
          />

          {/* Retained-revenue pathway clears the gate. */}
          <path
            d="M490 226H873"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="8"
          />
          <path
            d="M753 211L768 226L753 241"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="5"
          />
          <circle cx="891" cy="226" r="20" fill="var(--accent)" />
          <circle cx="891" cy="226" r="6" fill="var(--surface)" />

          {/* Central audit junction. */}
          <path
            d="M456 192L490 226L456 260L422 226Z"
            fill="var(--surface)"
            stroke="var(--ink)"
            strokeWidth="4"
          />
          <path
            d="M442 226L452 236L471 215"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="5"
            strokeLinejoin="miter"
          />

          {/* Labels belong to the vector diagram, never HTML overlays. */}
          <g className="font-[var(--font-mono)] text-[22px] font-medium">
            <text x="44" y="182" fill="var(--ink)" letterSpacing="2">
              REVENUE
            </text>
            <text
              x="912"
              y="182"
              fill="var(--accent)"
              textAnchor="end"
              letterSpacing="2"
            >
              RETAINED
            </text>
            <text x="638" y="402" fill="var(--ink)" letterSpacing="2">
              COSTS
            </text>
          </g>
        </svg>
      </div>

      <footer className="shrink-0 border-t-2 border-[var(--ink)] bg-[var(--surface)]">
        <div className="flex">
          <div
            aria-hidden="true"
            className="w-2 shrink-0 bg-[var(--accent)]"
          />

          <div className="grid flex-1 grid-cols-2 gap-5 px-7 py-7">
            <article className="min-w-0 pr-4">
              <h2 className="font-[var(--font-headline)] text-[28px] font-semibold leading-tight">
                {item0?.label ?? 'Net economics'}
              </h2>
              <p className="mt-3 font-[var(--font-body)] text-[24px] leading-snug line-clamp-3">
                {item0?.body ??
                  'Subtract compensation, transport and recovery costs.'}
              </p>
            </article>

            <article className="min-w-0 border-l border-[var(--border)] pl-6">
              <h2 className="font-[var(--font-headline)] text-[28px] font-semibold leading-tight">
                {item1?.label ?? 'Audit together'}
              </h2>
              <p className="mt-3 font-[var(--font-body)] text-[24px] leading-snug line-clamp-3">
                {item1?.body ??
                  'Forecasts, volunteer deals, rights and outcome reporting.'}
              </p>
            </article>
          </div>
        </div>
      </footer>
    </section>
  );
}
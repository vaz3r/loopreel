import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

export default function Slide01({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  const items = slide.items ?? [];
  const artId = React.useId();

  return (
    <section className="flex h-full min-h-0 w-full flex-col justify-between gap-6 text-[var(--ink)]">
      {/* Zone 1 — Editorial header */}
      <header className="shrink-0">
        <div className="mb-5 flex items-center gap-4">
          <span
            aria-hidden="true"
            className="h-3 w-3 shrink-0 bg-[var(--accent)]"
          />
          <p className="font-[var(--font-headline)] text-[22px] font-bold uppercase tracking-[0.14em] text-[var(--accent)]">
            CONSENT WITHOUT BORDERS
          </p>
        </div>

        <h1 className="max-w-[900px] font-[var(--font-headline)] text-[60px] font-bold leading-[1.02] tracking-tight">
          Streaming Consent
          <br />
          After a Death
        </h1>

        <p className="mt-5 max-w-[850px] font-[var(--font-body)] text-[26px] leading-snug line-clamp-2">
          Disney invoked account terms to seek wrongful-death arbitration.
        </p>
      </header>

      {/* Zone 2 — Dedicated vector canvas */}
      <div className="relative flex min-h-[440px] max-h-[500px] flex-1 items-center justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 952 460"
          className="block h-full max-h-[500px] w-full"
          role="img"
          aria-labelledby={`${artId}-title ${artId}-description`}
        >
          <title id={`${artId}-title`}>
            From streaming consent to attempted arbitration
          </title>
          <desc id={`${artId}-description`}>
            A Disney+ trial connects to account terms. A dashed red arrow
            represents Disney’s attempt to extend those terms to wrongful-death
            arbitration.
          </desc>

          <defs>
            <marker
              id={`${artId}-arrow`}
              viewBox="0 0 12 12"
              refX="10"
              refY="6"
              markerWidth="10"
              markerHeight="10"
              orient="auto"
              markerUnits="userSpaceOnUse"
            >
              <path d="M2 2 L10 6 L2 10" fill="none" stroke="var(--accent)" strokeWidth="2" />
            </marker>
          </defs>

          {/* Diagram registration lines */}
          <g fill="none" stroke="var(--border)" strokeWidth="1">
            <path d="M16 52 H936 M16 412 H936" />
            <path d="M16 44 V60 M476 44 V60 M936 44 V60" />
            <path d="M16 404 V420 M476 404 V420 M936 404 V420" />
          </g>

          {/* Conduits remain behind, and outside, the node interiors */}
          <path
            d="M256 226 H346"
            fill="none"
            stroke="var(--ink)"
            strokeWidth="2"
          />
          <path
            d="M606 226 H696"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="3"
            strokeDasharray="8 7"
            markerEnd={`url(#${artId}-arrow)`}
          />

          <circle cx="256" cy="226" r="5" fill="var(--ink)" />
          <circle cx="606" cy="226" r="5" fill="var(--accent)" />

          {/* Node 1 — Streaming origin */}
          <rect
            x="16"
            y="108"
            width="240"
            height="246"
            rx="14"
            fill="var(--surface)"
            stroke="var(--border)"
            strokeWidth="2"
          />
          <path
            d="M16 158 H256"
            fill="none"
            stroke="var(--border)"
            strokeWidth="2"
          />
          <circle cx="40" cy="133" r="4" fill="var(--accent)" />
          <text
            x="60"
            y="141"
            fill="var(--ink)"
            className="font-[var(--font-mono)] text-[22px]"
          >
            DISNEY+
          </text>

          <rect
            x="108"
            y="178"
            width="56"
            height="40"
            rx="7"
            fill="none"
            stroke="var(--ink)"
            strokeWidth="2"
          />
          <path d="M130 188 L145 198 L130 208 Z" fill="var(--accent)" />

          <text
            x="136"
            y="294"
            textAnchor="middle"
            fill="var(--ink)"
            className="font-[var(--font-mono)] text-[80px] font-bold"
          >
            2019
          </text>
          <text
            x="136"
            y="330"
            textAnchor="middle"
            fill="var(--ink)"
            className="font-[var(--font-mono)] text-[22px]"
          >
            ONE-MONTH TRIAL
          </text>

          {/* Node 2 — Account terms */}
          <path
            d="M346 82 H550 L606 138 V366 H346 Z"
            fill="var(--surface)"
            stroke="var(--border)"
            strokeWidth="2"
          />
          <path
            d="M550 82 V138 H606"
            fill="none"
            stroke="var(--ink)"
            strokeWidth="2"
          />
          <path
            d="M378 150 H507 M378 174 H550 M378 198 H524"
            fill="none"
            stroke="var(--border)"
            strokeWidth="4"
          />

          <rect x="378" y="222" width="196" height="50" fill="var(--accent)" />
          <path
            d="M393 247 L402 256 L418 238"
            fill="none"
            stroke="var(--paper, #0A0A0C)"
            strokeWidth="3"
          />
          <text
            x="433"
            y="255"
            fill="var(--paper, #0A0A0C)"
            className="font-[var(--font-mono)] text-[22px] font-bold"
          >
            CONSENT
          </text>
          <text
            x="476"
            y="314"
            textAnchor="middle"
            fill="var(--ink)"
            className="font-[var(--font-headline)] text-[26px] font-semibold"
          >
            Account terms
          </text>
          <path
            d="M378 338 H574"
            fill="none"
            stroke="var(--border)"
            strokeWidth="2"
          />

          {/* Node 3 — Attempted legal reach */}
          <path
            d="M696 354 V128 H936 V354"
            fill="none"
            stroke="var(--border)"
            strokeWidth="2"
          />
          <path
            d="M722 354 V154 H910 V354"
            fill="none"
            stroke="var(--ink)"
            strokeWidth="3"
          />
          <path
            d="M722 154 H910"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="7"
          />
          <path
            d="M816 154 V104"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="2"
          />
          <path d="M816 84 H902 L888 104 H816 Z" fill="var(--accent)" />

          <path
            d="M744 226 H888"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="2"
            strokeDasharray="8 7"
            markerEnd={`url(#${artId}-arrow)`}
          />

          <text
            x="816"
            y="280"
            textAnchor="middle"
            fill="var(--ink)"
            className="font-[var(--font-headline)] text-[26px] font-semibold"
          >
            Arbitration
          </text>
          <text
            x="816"
            y="316"
            textAnchor="middle"
            fill="var(--accent)"
            className="font-[var(--font-mono)] text-[22px]"
          >
            SOUGHT
          </text>
          <path
            d="M684 354 H948"
            fill="none"
            stroke="var(--border)"
            strokeWidth="2"
          />
        </svg>
      </div>

      {/* Zone 3 — Separate, non-overlapping cards */}
      <div className="grid shrink-0 grid-cols-2 gap-5">
        <article className="border-t-2 border-[var(--border)] bg-[var(--surface)] px-6 py-6">
          <h2 className="font-[var(--font-headline)] text-[28px] font-semibold leading-tight">
            {items[0]?.label ?? 'Streaming origin'}
          </h2>
          <p className="mt-3 font-[var(--font-body)] text-[24px] leading-snug line-clamp-3">
            {items[0]?.body ??
              'Disney cited Piccolo’s one-month Disney+ trial in 2019.'}
          </p>
        </article>

        <article className="border-t-2 border-[var(--accent)] bg-[var(--surface)] px-6 py-6">
          <h2 className="font-[var(--font-headline)] text-[28px] font-semibold leading-tight">
            {items[0]?.label ?? 'Attempted reach'}
          </h2>
          <p className="mt-3 font-[var(--font-body)] text-[24px] leading-snug line-clamp-3">
            {items[0]?.body ??
              'The claims arose from his wife’s restaurant death.'}
          </p>
        </article>
      </div>
    </section>
  );
}
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
  const diagramId = React.useId();

  return (
    <section className="flex h-full min-h-0 w-full flex-col justify-between gap-6 py-10 text-[var(--ink)]">
      {/* Zone 1 — Editorial header */}
      <header className="shrink-0">
        <div className="mb-4 flex items-center gap-4">
          <span
            aria-hidden="true"
            className="h-3 w-3 shrink-0 bg-[var(--accent)]"
          />
          <p className="font-[var(--font-headline)] text-[22px] font-bold uppercase tracking-[0.16em]">
            THE FINE PRINT
          </p>
          <span
            aria-hidden="true"
            className="h-px flex-1 bg-[var(--border)]"
          />
        </div>

        <h1 className="max-w-[920px] font-[var(--font-headline)] text-[60px] font-bold leading-[1.02] tracking-tight">
          Audit Consent Across Product Boundaries
        </h1>

        <p className="mt-4 max-w-[860px] font-[var(--font-body)] text-[26px] leading-snug line-clamp-2">
          A shared account is not uncontested cross-product permission.
        </p>
      </header>

      {/* Zone 2 — Dedicated architectural vector canvas */}
      <div className="relative flex min-h-0 flex-1 items-center justify-center">
        <svg
          viewBox="0 0 952 460"
          role="img"
          aria-labelledby={`${diagramId}-title ${diagramId}-description`}
          className="block h-full max-h-[500px] w-full"
          preserveAspectRatio="xMidYMid meet"
        >
          <title id={`${diagramId}-title`}>
            Audit consent at the product boundary
          </title>
          <desc id={`${diagramId}-description`}>
            Two product nodes sit on opposite sides of a monumental gate.
            Directional conduits approach the threshold, where an accent
            checkpoint interrupts the connection.
          </desc>

          {/* Baseline and architectural construction lines */}
          <g
            fill="none"
            stroke="var(--border)"
            strokeWidth="2"
          >
            <path d="M24 396H928" />
            <path d="M294 52V420M658 52V420" strokeDasharray="5 9" />
            <path d="M272 396L324 352H628L680 396" />
            <path d="M318 420H634" />
            <path d="M24 184H248M704 184H928" />
          </g>

          {/* Monumental threshold: extruded lintel and substantial piers */}
          <path
            d="M326 78L350 54H650L626 78Z"
            fill="var(--surface)"
            stroke="var(--border)"
            strokeWidth="2"
          />
          <path
            d="M626 78L650 54V352L626 376Z"
            fill="var(--surface)"
            stroke="var(--border)"
            strokeWidth="2"
          />
          <path
            d="M326 376V78H626V376H566V138H386V376Z"
            fill="var(--surface)"
            stroke="var(--ink)"
            strokeWidth="3"
          />
          <path
            d="M338 364V90H614"
            fill="none"
            stroke="var(--border)"
            strokeWidth="2"
          />
          <path
            d="M386 138L402 122H580M566 138L580 122V360"
            fill="none"
            stroke="var(--border)"
            strokeWidth="2"
          />

          <text
            x="476"
            y="116"
            textAnchor="middle"
            fill="var(--ink)"
            className="font-[var(--font-headline)] text-[24px] font-bold tracking-[0.14em]"
          >
            CONSENT
          </text>

          {/* Product endpoints */}
          <g fill="var(--surface)" stroke="var(--ink)" strokeWidth="2">
            <rect x="66" y="226" width="68" height="68" rx="12" />
            <path d="M852 218L894 260L852 302L810 260Z" />
          </g>
          <circle cx="100" cy="260" r="10" fill="var(--ink)" />
          <circle cx="852" cy="260" r="10" fill="var(--ink)" />

          <g
            fill="var(--ink)"
            textAnchor="middle"
            className="font-[var(--font-mono)] text-[22px]"
          >
            <text x="130" y="165">PRODUCT A</text>
            <text x="822" y="165">PRODUCT B</text>
          </g>

          {/* Directional conduits deliberately stop at the checkpoint */}
          <path
            d="M134 260H432"
            fill="none"
            stroke="var(--ink)"
            strokeWidth="4"
          />
          <path
            d="M417 248L432 260L417 272"
            fill="none"
            stroke="var(--ink)"
            strokeWidth="4"
          />

          <path
            d="M520 260H802"
            fill="none"
            stroke="var(--ink)"
            strokeWidth="3"
            strokeDasharray="10 10"
            opacity="0.6"
          />
          <path
            d="M787 248L802 260L787 272"
            fill="none"
            stroke="var(--ink)"
            strokeWidth="3"
          />

          {/* Accent audit flag and interrupted boundary */}
          <path
            d="M476 156V354"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="3"
            strokeDasharray="7 7"
          />
          <path
            d="M476 158H550L536 177L550 196H476Z"
            fill="var(--accent)"
          />
          <rect
            x="452"
            y="236"
            width="48"
            height="48"
            fill="var(--surface)"
            stroke="var(--accent)"
            strokeWidth="3"
            transform="rotate(45 476 260)"
          />
          <path
            d="M476 247V264"
            stroke="var(--accent)"
            strokeWidth="4"
            strokeLinecap="round"
          />
          <circle cx="476" cy="273" r="2.5" fill="var(--accent)" />

          <g fill="var(--accent)">
            <rect x="320" y="370" width="72" height="6" />
            <rect x="560" y="370" width="72" height="6" />
          </g>

          <text
            x="476"
            y="450"
            textAnchor="middle"
            fill="var(--ink)"
            className="font-[var(--font-mono)] text-[22px] tracking-[0.1em]"
          >
            PRODUCT BOUNDARY
          </text>
        </svg>
      </div>

      {/* Zone 3 — Strategic takeaway with a dedicated indicator rail */}
      <footer className="shrink-0 border-t border-[var(--border)] bg-[var(--surface)]">
        <div className="flex">
          <span
            aria-hidden="true"
            className="w-[6px] shrink-0 bg-[var(--accent)]"
          />

          <div className="grid flex-1 grid-cols-2 gap-6 px-7 py-6">
            <article>
              <h2 className="font-[var(--font-headline)] text-[28px] font-semibold leading-tight">
                {item0?.label ?? 'Motion withdrawn'}
              </h2>
              <p className="mt-3 font-[var(--font-body)] text-[24px] leading-snug line-clamp-3">
                {item0?.body ??
                  'August 20, 2024: the dispute could proceed in court.'}
              </p>
            </article>

            <article className="border-l border-[var(--border)] pl-6">
              <h2 className="font-[var(--font-headline)] text-[28px] font-semibold leading-tight">
                {item1?.label ?? 'Still unresolved'}
              </h2>
              <p className="mt-3 font-[var(--font-body)] text-[24px] leading-snug line-clamp-3">
                {item1?.body ??
                  'No negligence finding; no settled contract interpretation.'}
              </p>
            </article>
          </div>
        </div>
      </footer>
    </section>
  );
}
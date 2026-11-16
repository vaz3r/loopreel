import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

export default function Slide07({ slide, brand, totalSlides }: SlideComponentProps) {
  const items = slide.items ?? [];
  const item0 = items[0]!;
  const item1 = items[0]!;
  const artworkId = React.useId();

  return (
    <section
      aria-label={`Slide 7 of ${totalSlides}`}
      className="flex flex-col h-full min-h-0 w-full justify-between gap-7 text-[var(--ink)]"
    >
      {/* Zone 1 — Editorial header */}
      <header className="shrink-0">
        <div className="mb-6 flex items-center gap-4">
          <span
            aria-hidden="true"
            className="h-3 w-3 shrink-0 bg-[var(--accent)]"
          />
          <p className="font-[var(--font-headline)] text-[22px] font-semibold leading-tight tracking-[0.08em]">
            THE FINE PRINT · THEFINEPRINT.CO
          </p>
        </div>

        <h1 className="font-[var(--font-headline)] text-[60px] font-bold leading-[1.02] tracking-tight">
          Audit Consent Before
          <br />
          Claiming Cover
        </h1>

        <p className="mt-5 max-w-[870px] font-[var(--font-body)] text-[26px] leading-snug line-clamp-2">
          Public backlash preceded Disney’s retreat—not a merits ruling.
        </p>
      </header>

      {/* Zone 2 — Dedicated architectural SVG canvas */}
      <div className="relative flex flex-1 min-h-0 items-center justify-center">
        <svg
          viewBox="0 0 952 460"
          preserveAspectRatio="xMidYMid meet"
          role="img"
          aria-labelledby={`${artworkId}-title ${artworkId}-description`}
          className="block h-full max-h-[500px] w-full"
          fill="none"
        >
          <title id={`${artworkId}-title`}>
            Consent is the threshold, not automatic cover
          </title>
          <desc id={`${artworkId}-description`}>
            A monumental gate separates an assent node from a claims node.
            Directional conduits approach the threshold, while a dashed exit
            indicates that passage is not guaranteed. Terms and decision-making
            authority frame the gate.
          </desc>

          {/* Architectural drafting field */}
          <g stroke="var(--border)" strokeWidth="1">
            <path d="M24 42H928M24 364H928M24 438H928" />
            <path d="M300 24V438M652 24V438" strokeDasharray="3 9" />
            <path d="M24 32V52M928 32V52M24 354V374M928 354V374" />
            <path d="M324 380H628M348 392H604" />
          </g>

          {/* Directional conduit: assent approaches the gate */}
          <path
            d="M130 236H338"
            stroke="var(--ink)"
            strokeWidth="3"
          />
          <path
            d="M292 226L304 236L292 246"
            stroke="var(--accent)"
            strokeWidth="3"
            strokeLinejoin="miter"
          />
          <circle
            cx="108"
            cy="236"
            r="22"
            fill="var(--surface)"
            stroke="var(--ink)"
            strokeWidth="3"
          />
          <circle cx="108" cy="236" r="6" fill="var(--accent)" />

          <text
            x="108"
            y="298"
            textAnchor="middle"
            fill="var(--ink)"
            className="font-[var(--font-mono)] text-[22px]"
          >
            ASSENT
          </text>

          {/* Monumental gate: offset depth, lintel, and pillars */}
          <path
            d="M338 108L362 84H638L614 108Z"
            fill="var(--surface)"
            stroke="var(--border)"
            strokeWidth="2"
          />
          <path
            d="M614 108L638 84V340L614 364Z"
            fill="var(--surface)"
            stroke="var(--border)"
            strokeWidth="2"
          />
          <path
            d="M338 108H614V364H554V166H398V364H338Z"
            fill="var(--surface)"
            stroke="var(--ink)"
            strokeWidth="2"
          />

          {/* Accent threshold and lintel registration */}
          <path
            d="M338 108H614"
            stroke="var(--accent)"
            strokeWidth="7"
          />
          <path
            d="M398 364H554"
            stroke="var(--accent)"
            strokeWidth="5"
          />
          <path
            d="M398 166H554"
            stroke="var(--border)"
            strokeWidth="2"
          />
          <path
            d="M368 190V334M584 190V334"
            stroke="var(--border)"
            strokeWidth="2"
          />

          <text
            x="476"
            y="67"
            textAnchor="middle"
            fill="var(--ink)"
            className="font-[var(--font-mono)] text-[22px]"
          >
            TERMS
          </text>

          {/* Interior decision node */}
          <path
            d="M476 201L511 236L476 271L441 236Z"
            fill="var(--surface)"
            stroke="var(--accent)"
            strokeWidth="3"
          />
          <path
            d="M464 236H488M476 224V248"
            stroke="var(--ink)"
            strokeWidth="2"
          />
          <path
            d="M398 236H441M511 236H554"
            stroke="var(--border)"
            strokeWidth="2"
          />
          <path
            d="M476 271V346"
            stroke="var(--accent)"
            strokeWidth="2"
            strokeDasharray="4 7"
          />

          {/* Unresolved outward path */}
          <path
            d="M614 236H822"
            stroke="var(--ink)"
            strokeWidth="2"
            strokeDasharray="8 9"
            opacity="0.65"
          />
          <path
            d="M782 226L794 236L782 246"
            stroke="var(--ink)"
            strokeWidth="2"
          />
          <path
            d="M844 214L866 236L844 258L822 236Z"
            fill="var(--surface)"
            stroke="var(--ink)"
            strokeWidth="2"
          />

          {/* Accent flag marks the conditional pathway */}
          <path
            d="M710 236V155"
            stroke="var(--accent)"
            strokeWidth="2"
          />
          <path
            d="M710 155H752L741 169L752 183H710Z"
            fill="var(--accent)"
          />

          <text
            x="844"
            y="298"
            textAnchor="middle"
            fill="var(--ink)"
            className="font-[var(--font-mono)] text-[22px]"
          >
            CLAIMS
          </text>

          <text
            x="476"
            y="424"
            textAnchor="middle"
            fill="var(--ink)"
            className="font-[var(--font-mono)] text-[24px]"
          >
            WHO DECIDES?
          </text>
        </svg>
      </div>

      {/* Zone 3 — Strategic takeaways, separate from the artwork */}
      <footer className="grid shrink-0 grid-cols-2 gap-5">
        <article className="border-t-2 border-[var(--border)] bg-[var(--surface)] px-6 py-6">
          <div className="mb-4 h-1.5 w-12 bg-[var(--accent)]" aria-hidden="true" />
          <h2 className="font-[var(--font-headline)] text-[28px] font-semibold leading-tight">
            {item0?.label ?? 'Consent audit'}
          </h2>
          <p className="mt-3 font-[var(--font-body)] text-[24px] leading-snug line-clamp-3">
            {item0?.body ??
              'Check who assented, governing terms, claims, and who decides.'}
          </p>
        </article>

        <article className="border-t-2 border-[var(--border)] bg-[var(--surface)] px-6 py-6">
          <div className="mb-4 h-1.5 w-12 bg-[var(--ink)]" aria-hidden="true" />
          <h2 className="font-[var(--font-headline)] text-[28px] font-semibold leading-tight">
            {item1?.label ?? 'Unrealized advantage'}
          </h2>
          <p className="mt-3 font-[var(--font-body)] text-[24px] leading-snug line-clamp-3">
            {item1?.body ??
              'Disney withdrew without securing the requested arbitration.'}
          </p>
        </article>
      </footer>
    </section>
  );
}
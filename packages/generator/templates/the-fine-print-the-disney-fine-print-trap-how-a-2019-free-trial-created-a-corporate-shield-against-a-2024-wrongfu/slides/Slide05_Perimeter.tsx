import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

export default function Slide05({ slide, brand, totalSlides }: SlideComponentProps) {
  const items = slide.items ?? [];
  const artId = React.useId().replace(/:/g, '');

  return (
    <section className="flex h-full min-h-0 w-full flex-col justify-between gap-6 text-[var(--ink)]">
      {/* Zone 1 — Editorial header */}
      <header className="shrink-0">
        <div className="mb-4 flex items-center gap-4">
          <span
            aria-hidden="true"
            className="h-3 w-3 shrink-0 bg-[var(--accent)]"
          />
          <p className="font-[var(--font-headline)] text-[22px] font-bold tracking-[0.14em] text-[var(--accent)]">
            THE MISSING CONNECTIONS
          </p>
        </div>

        <h1 className="max-w-[920px] font-[var(--font-headline)] text-[60px] font-bold leading-[1.02] tracking-tight">
          The Clicker Was Not the Estate
        </h1>

        <p className="mt-5 max-w-[880px] font-[var(--font-body)] text-[26px] leading-snug line-clamp-2">
          Guest-consent language did not establish authority to bind it.
        </p>
      </header>

      {/* Zone 2 — Dedicated, uninterrupted vector canvas */}
      <div className="relative flex min-h-[440px] max-h-[500px] flex-1 items-center justify-center">
        <svg
          viewBox="0 0 952 460"
          className="block h-full max-h-[500px] w-full"
          fill="none"
          role="img"
          aria-labelledby={`${artId}-title ${artId}-description`}
        >
          <title id={`${artId}-title`}>
            Consent stops short of the estate perimeter
          </title>
          <desc id={`${artId}-description`}>
            A consent node and an estate enclosure sit on opposite sides of a
            broken directional conduit. Red interruption marks identify the
            missing authority to bind the estate.
          </desc>

          <defs>
            <marker
              id={`${artId}-arrow`}
              markerWidth="10"
              markerHeight="10"
              refX="8"
              refY="5"
              orient="auto"
              markerUnits="userSpaceOnUse"
            >
              <path
                d="M1 1L8 5L1 9"
                stroke="var(--ink)"
                strokeWidth="2"
                strokeLinecap="square"
              />
            </marker>
          </defs>

          {/* Registration rules establish an architectural drawing field. */}
          <path
            d="M0 28H952M0 436H952"
            stroke="var(--border)"
            strokeWidth="2"
          />
          <path
            d="M0 28V42M952 28V42M0 422V436M952 422V436"
            stroke="var(--ink)"
            strokeOpacity="0.45"
            strokeWidth="2"
          />

          {/* Consent node */}
          <text
            x="154"
            y="86"
            textAnchor="middle"
            fill="var(--ink)"
            className="font-[var(--font-mono)] text-[22px] font-bold tracking-[0.12em]"
          >
            CONSENT
          </text>

          <rect
            x="48"
            y="132"
            width="212"
            height="212"
            rx="2"
            fill="var(--surface)"
            stroke="var(--border)"
            strokeWidth="2"
          />
          <path
            d="M48 164V132H80M228 132H260V164M48 312V344H80M228 344H260V312"
            stroke="var(--ink)"
            strokeWidth="3"
          />

          {/* Bespoke click-pointer geometry */}
          <path
            d="M120 181V271L145 248L169 292L191 280L168 238L202 233Z"
            fill="var(--ink)"
          />
          <path
            d="M103 176L89 162M122 160V141M143 167L157 153"
            stroke="var(--accent)"
            strokeWidth="4"
          />

          <text
            x="154"
            y="389"
            textAnchor="middle"
            fill="var(--ink)"
            className="font-[var(--font-body)] text-[24px]"
          >
            Piccolo’s assent
          </text>

          {/* Directional conduit deliberately terminates before the estate. */}
          <path
            d="M260 238H379"
            stroke="var(--ink)"
            strokeWidth="3"
            markerEnd={`url(#${artId}-arrow)`}
          />
          <circle cx="260" cy="238" r="6" fill="var(--ink)" />

          <path
            d="M405 238H538"
            stroke="var(--border)"
            strokeWidth="2"
            strokeDasharray="6 10"
          />

          {/* Accent interruption flags — no completed bridge */}
          <path
            d="M424 211L405 265M463 211L444 265"
            stroke="var(--accent)"
            strokeWidth="7"
          />

          <path
            d="M486 178V121H596"
            stroke="var(--accent)"
            strokeWidth="2"
          />
          <rect
            x="480"
            y="172"
            width="12"
            height="12"
            fill="var(--accent)"
          />
          <text
            x="326"
            y="86"
            fill="var(--accent)"
            className="font-[var(--font-mono)] text-[22px] font-bold"
          >
            AUTHORITY TO BIND
          </text>

          <path
            d="M554 238H652"
            stroke="var(--border)"
            strokeWidth="3"
          />
          <path
            d="M554 225V251"
            stroke="var(--accent)"
            strokeWidth="3"
          />

          {/* Estate perimeter: distinct from the individual consent node. */}
          <text
            x="788"
            y="86"
            textAnchor="middle"
            fill="var(--ink)"
            className="font-[var(--font-mono)] text-[22px] font-bold tracking-[0.12em]"
          >
            ESTATE
          </text>

          <rect
            x="652"
            y="114"
            width="272"
            height="248"
            fill="var(--surface)"
            stroke="var(--ink)"
            strokeWidth="2"
          />
          <rect
            x="673"
            y="135"
            width="230"
            height="206"
            stroke="var(--border)"
            strokeWidth="2"
          />
          <path
            d="M652 216V260"
            stroke="var(--accent)"
            strokeWidth="6"
          />

          {/* Enclosed geometric node */}
          <path
            d="M788 174L851 210V266L788 302L725 266V210Z"
            stroke="var(--ink)"
            strokeWidth="3"
          />
          <path
            d="M725 210L788 247L851 210M788 247V302"
            stroke="var(--border)"
            strokeWidth="2"
          />
          <rect
            x="779"
            y="229"
            width="18"
            height="18"
            fill="var(--ink)"
          />

          <text
            x="788"
            y="400"
            textAnchor="middle"
            fill="var(--ink)"
            className="font-[var(--font-body)] text-[24px]"
          >
            Separate perimeter
          </text>

          <text
            x="455"
            y="323"
            textAnchor="middle"
            fill="var(--accent)"
            className="font-[var(--font-mono)] text-[22px] font-bold"
          >
            NOT ESTABLISHED
          </text>
        </svg>
      </div>

      {/* Zone 3 — Dedicated surface / border-top cards */}
      <div className="grid shrink-0 grid-cols-2 gap-5">
        {[items, items].map((item, index) => (
          <article
            key={index}
            className="border-t-2 border-[var(--border)] bg-[var(--surface)] px-6 py-6"
          >
            <h2 className="mb-3 font-[var(--font-headline)] text-[28px] font-semibold leading-tight">
              {item?.label ??
                (index === 0 ? 'Whose consent?' : 'Which claims?')}
            </h2>
            <p className="font-[var(--font-body)] text-[24px] leading-snug line-clamp-3">
              {item?.body ??
                (index === 0
                  ? 'Piccolo’s assent did not establish estate-binding authority.'
                  : 'Disney used website allergy claims as its proposed bridge.')}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
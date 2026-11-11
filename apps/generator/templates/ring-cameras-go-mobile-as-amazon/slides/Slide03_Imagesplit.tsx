import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

export default function Slide03({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  const content = slide as unknown as {
    headline: string;
    image: { concept: string; caption: string };
    sections: { title: string; body: string }[];
  };

  const diagramId = React.useId();
  const titles = ['GUIDED TOUR', 'PATROL POINTS', 'CONNECTED RESPONSE'];

  return (
    <article className="flex h-full min-h-0 flex-col gap-9 font-[var(--font-body)] text-[var(--ink)]">
      <header className="shrink-0">
        <div className="mb-5 flex items-center gap-3">
          <span className="h-2 w-2 rounded-full bg-[var(--accent)]" />
          <span className="font-[var(--font-mono)] text-sm uppercase tracking-[0.22em] text-[var(--accent)]">
            Mapping before monitoring
          </span>
        </div>
        <h1 className="max-w-[850px] font-[var(--font-headline)] text-[66px] font-bold leading-[1.02] tracking-[-0.045em]">
          {content.headline}
        </h1>
      </header>

      <div className="grid min-h-0 flex-1 grid-cols-[0.95fr_1.05fr] gap-8">
        <figure className="flex h-full min-h-0 flex-col justify-between overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-sm">
          <div className="flex items-center justify-between border-b border-[var(--border)] pb-5">
            <span className="font-[var(--font-mono)] text-xs uppercase tracking-[0.18em]">
              Spatial model
            </span>
            <span className="rounded-full border border-[var(--border)] px-2.5 py-1 font-[var(--font-mono)] text-[10px] uppercase tracking-widest text-[var(--accent)]">
              Concept
            </span>
          </div>

          <svg
            viewBox="0 0 380 540"
            role="img"
            aria-labelledby={`${diagramId}-title ${diagramId}-description`}
            className="my-5 w-full min-h-0 flex-1"
            fill="none"
          >
            <title id={`${diagramId}-title`}>
              Guided drone and autonomous rover mapping routes
            </title>
            <desc id={`${diagramId}-description`}>
              {content.image.concept} Dashed cyan marks the guided drone
              route; the solid light route represents autonomous rover
              exploration. Rings mark illustrative patrol points.
            </desc>

            <defs>
              <pattern
                id={`${diagramId}-grid`}
                width="20"
                height="20"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M20 0H0V20"
                  stroke="var(--border)"
                  strokeWidth="0.65"
                  opacity="0.45"
                />
              </pattern>
            </defs>

            <rect
              x="0"
              y="0"
              width="380"
              height="540"
              fill={`url(#${diagramId}-grid)`}
            />

            {/* Architectural shell with an entry opening at the bottom. */}
            <path
              d="M156 474H30V66H350V474H220"
              stroke="var(--ink)"
              strokeOpacity="0.75"
              strokeWidth="5"
              strokeLinecap="square"
            />
            <path
              d="M196 66V169M196 229V306M30 306H99M154 306H350"
              stroke="var(--ink)"
              strokeOpacity="0.5"
              strokeWidth="4"
            />

            {/* Door swings and restrained furniture outlines. */}
            <g stroke="var(--border)" strokeWidth="1.5">
              <path d="M196 169H252M252 169A56 56 0 0 1 196 225" />
              <path d="M99 306V361M99 361A55 55 0 0 0 154 306" />
              <path d="M156 474V410M156 410A64 64 0 0 1 220 474" />
              <rect x="49" y="116" width="44" height="108" rx="5" />
              <rect x="112" y="143" width="40" height="60" rx="5" />
              <rect x="272" y="111" width="53" height="82" rx="4" />
              <rect x="253" y="341" width="72" height="35" rx="4" />
              <path d="M263 352H315M263 364H299" />
            </g>

            {/* Windows highlighted along the external wall. */}
            <g stroke="var(--accent)" strokeWidth="4">
              <path d="M77 66H142M350 220V270" />
            </g>

            <g
              fill="var(--ink)"
              fillOpacity="0.65"
              className="font-[var(--font-mono)]"
              fontSize="10"
              letterSpacing="1.7"
            >
              <text x="49" y="94">ROOM A</text>
              <text x="216" y="94">ROOM B</text>
              <text x="49" y="334">ENTRY</text>
            </g>

            {/* Human-guided drone tour. */}
            <path
              d="M184 452V391C184 363 128 368 128 338V263C128 239 168 245 168 218V129C168 112 145 109 111 109"
              stroke="var(--accent)"
              strokeWidth="3"
              strokeDasharray="7 8"
              strokeLinecap="round"
            />
            <path
              d="M168 218C168 198 221 200 242 215S287 245 322 245"
              stroke="var(--accent)"
              strokeWidth="3"
              strokeDasharray="7 8"
              strokeLinecap="round"
            />

            {/* Autonomous rover exploration. */}
            <path
              d="M201 450V403Q201 389 220 389H311Q327 389 327 408V430Q327 445 310 445H250Q236 445 236 429V336Q236 321 218 321H178Q162 321 162 304V273Q162 257 183 257H265Q284 257 284 235"
              stroke="var(--ink)"
              strokeOpacity="0.8"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Candidate patrol points, not literal product UI. */}
            <g stroke="var(--accent)">
              <circle cx="111" cy="109" r="12" strokeOpacity="0.4" />
              <circle cx="111" cy="109" r="4" fill="var(--accent)" />
              <circle cx="322" cy="245" r="12" strokeOpacity="0.4" />
              <circle cx="322" cy="245" r="4" fill="var(--accent)" />
            </g>

            {/* Drone glyph. */}
            <g
              transform="translate(168 183)"
              stroke="var(--accent)"
              strokeWidth="2"
            >
              <circle r="21" fill="var(--surface)" strokeOpacity="0.3" />
              <path d="M-8-8L8 8M8-8L-8 8" />
              <circle cx="-9" cy="-9" r="4" />
              <circle cx="9" cy="-9" r="4" />
              <circle cx="-9" cy="9" r="4" />
              <circle cx="9" cy="9" r="4" />
              <rect x="-4" y="-4" width="8" height="8" rx="2" fill="var(--surface)" />
            </g>

            {/* Rover glyph. */}
            <g
              transform="translate(286 389)"
              stroke="var(--ink)"
              strokeWidth="2"
            >
              <circle r="21" fill="var(--surface)" strokeOpacity="0.25" />
              <rect x="-10" y="-8" width="20" height="16" rx="5" />
              <path d="M-13-5V5M13-5V5" strokeWidth="3" strokeLinecap="round" />
              <circle cx="3" cy="0" r="2" fill="var(--ink)" stroke="none" />
            </g>

            <text
              x="190"
              y="513"
              textAnchor="middle"
              fill="var(--ink)"
              fillOpacity="0.55"
              fontSize="10"
              letterSpacing="2"
              className="font-[var(--font-mono)]"
            >
              ILLUSTRATIVE FLOOR PLAN
            </text>
          </svg>

          <figcaption className="shrink-0 border-t border-[var(--border)] pt-5">
            <div className="mb-4 flex flex-col gap-3 font-[var(--font-mono)] text-xs">
              <div className="flex items-center gap-3">
                <span className="w-8 border-t-2 border-dashed border-[var(--accent)]" />
                <span>Drone · guided tour</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-8 border-t-2 border-[var(--ink)] opacity-80" />
                <span>Rover · autonomous exploration</span>
              </div>
            </div>
            <p className="text-sm leading-relaxed opacity-60">
              {content.image.caption}
            </p>
          </figcaption>
        </figure>

        <div className="flex h-full flex-col justify-between gap-7 py-1">
          {content.sections.map((section, index) => (
            <section
              key={section.title}
              className="border-t border-[var(--border)] pt-5"
            >
              <div className="mb-4 flex items-center gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface)] font-[var(--font-mono)] text-sm text-[var(--accent)]">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="font-[var(--font-mono)] text-[11px] uppercase tracking-[0.15em] text-[var(--accent)]">
                  {titles[index]}
                </span>
              </div>

              <h2 className="mb-3 font-[var(--font-headline)] text-[31px] font-bold leading-[1.1] tracking-[-0.025em]">
                {section.title}
              </h2>
              <p className="text-[21px] leading-[1.48] opacity-80">
                {section.body}
              </p>
            </section>
          ))}
        </div>
      </div>
    </article>
  );
}
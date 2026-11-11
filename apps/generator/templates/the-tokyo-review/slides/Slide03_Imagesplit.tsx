import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

export default function Slide03({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  const content = slide as {
    headline?: string;
    label?: string;
    observation?: string;
    notes?: string[];
  };

  const headline = content.headline ?? 'A house interrupted by sky';
  const label = content.label ?? 'AZUMA HOUSE · OSAKA · 1976';
  const observation =
    content.observation ??
    'The street-facing concrete façade has no windows; the open courtyard brings light and weather into the interior world. Privacy is gained at the perimeter, exposure accepted at the center.';
  const notes = content.notes ?? [
    'Read the courtyard as circulation, not scenery: crossing it is part of moving through the house.',
    'Editorial reading: the compelling image is not empty concrete, but the resident’s passage between shelter and rain.',
  ];

  // The surrounding SlideFrame supplies branding and pagination.
  void brand;
  void totalSlides;

  return (
    <section
      aria-label={headline}
      className="flex h-full min-h-0 flex-col gap-10 text-[var(--ink)]"
    >
      <header className="shrink-0 space-y-6">
        <div className="inline-flex items-center gap-3 rounded-full border border-[var(--border)] px-4 py-2">
          <span className="h-2 w-2 rounded-full bg-[var(--accent)]" />
          <p className="font-[var(--font-mono)] text-xs tracking-[0.15em]">
            {label}
          </p>
        </div>

        <h1 className="max-w-[850px] font-[var(--font-headline)] text-7xl font-bold leading-[0.98] tracking-[-0.055em]">
          {headline}
          <span className="text-[var(--accent)]">.</span>
        </h1>
      </header>

      <div className="grid min-h-0 flex-1 grid-cols-[1.12fr_1fr] gap-8">
        <figure className="flex min-h-0 flex-col overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--surface)] shadow-[0_4px_18px_rgba(0,0,0,0.035)]">
          <div className="flex items-center justify-between border-b border-[var(--border)] px-6 py-5 font-[var(--font-mono)] text-[11px] uppercase tracking-[0.14em]">
            <span>Spatial reading</span>
            <span className="text-[var(--accent)]">01 / Courtyard</span>
          </div>

          <div className="relative min-h-0 flex-1 px-5 py-6">
            <svg
              viewBox="0 0 440 650"
              role="img"
              aria-label="Conceptual diagram of sheltered spaces separated by an open courtyard, with a walking route crossing beneath rain."
              preserveAspectRatio="xMidYMid meet"
              className="h-full w-full"
            >
              <text
                x="220"
                y="32"
                textAnchor="middle"
                fill="var(--accent)"
                className="font-[var(--font-mono)] text-[12px] tracking-[4px]"
              >
                OPEN TO SKY
              </text>

              <path
                d="M220 48V92M214 84L220 92L226 84"
                fill="none"
                stroke="var(--accent)"
                strokeWidth="1.5"
              />

              {/* Abstract spatial sequence, deliberately not a measured plan. */}
              <rect
                x="72"
                y="112"
                width="296"
                height="440"
                fill="none"
                stroke="var(--ink)"
                strokeWidth="3"
              />

              <rect
                x="86"
                y="126"
                width="268"
                height="118"
                fill="var(--ink)"
                fillOpacity="0.075"
              />
              <rect
                x="86"
                y="420"
                width="268"
                height="118"
                fill="var(--ink)"
                fillOpacity="0.075"
              />

              <rect
                x="86"
                y="258"
                width="268"
                height="148"
                fill="var(--accent)"
                fillOpacity="0.085"
              />

              <path
                d="M72 251H368M72 413H368"
                stroke="var(--ink)"
                strokeWidth="2"
              />

              <g
                fill="var(--ink)"
                textAnchor="middle"
                className="font-[var(--font-mono)] text-[12px] tracking-[3px]"
              >
                <text x="220" y="169">SHELTER</text>
                <text x="220" y="502">SHELTER</text>
              </g>

              <g
                stroke="var(--accent)"
                strokeWidth="1.5"
                strokeLinecap="round"
                opacity="0.55"
              >
                <path d="M112 277L105 293M153 270L146 286M194 279L187 295" />
                <path d="M263 271L256 287M306 280L299 296M337 269L330 285" />
                <path d="M117 363L110 379M156 376L149 392M293 369L286 385M332 377L325 393" />
              </g>

              <text
                x="220"
                y="330"
                textAnchor="middle"
                fill="var(--accent)"
                className="font-[var(--font-headline)] text-[28px]"
              >
                Courtyard
              </text>
              <text
                x="220"
                y="351"
                textAnchor="middle"
                fill="var(--ink)"
                className="font-[var(--font-mono)] text-[10px] tracking-[2px]"
              >
                LIGHT + WEATHER
              </text>

              {/* The offset route keeps the courtyard label unobstructed. */}
              <path
                d="M220 195V225H250V451H220V471"
                fill="none"
                stroke="var(--accent)"
                strokeWidth="2"
                strokeDasharray="5 6"
              />
              <circle cx="220" cy="195" r="4" fill="var(--accent)" />
              <path
                d="M214 463L220 471L226 463"
                fill="none"
                stroke="var(--accent)"
                strokeWidth="2"
              />

              <path
                d="M72 552H368"
                stroke="var(--ink)"
                strokeWidth="9"
              />
              <path
                d="M220 566V589"
                stroke="var(--ink)"
                strokeOpacity="0.4"
              />
              <text
                x="220"
                y="612"
                textAnchor="middle"
                fill="var(--ink)"
                className="font-[var(--font-mono)] text-[11px] tracking-[2px]"
              >
                WINDOWLESS STREET FAÇADE
              </text>
            </svg>
          </div>

          <figcaption className="space-y-3 border-t border-[var(--border)] px-6 py-5">
            <div className="flex items-center gap-3">
              <span className="w-8 border-t-2 border-dashed border-[var(--accent)]" />
              <span className="font-[var(--font-body)] text-sm">
                Passage through exposure
              </span>
            </div>
            <p className="font-[var(--font-mono)] text-[10px] uppercase tracking-[0.12em] opacity-60">
              Conceptual diagram · Not to scale
            </p>
          </figcaption>
        </figure>

        <aside className="flex h-full flex-col justify-between gap-8 py-2">
          <div>
            <p className="mb-5 font-[var(--font-mono)] text-xs uppercase tracking-[0.18em] text-[var(--accent)]">
              The observation
            </p>
            <p className="font-[var(--font-body)] text-[25px] leading-[1.42] tracking-[-0.02em]">
              {observation}
            </p>
          </div>

          <div className="space-y-6">
            {notes.map((note, index) => (
              <article
                key={`${index}-${note}`}
                className="border-t border-[var(--border)] pt-5"
              >
                <div className="mb-3 flex items-center gap-3">
                  <span className="font-[var(--font-mono)] text-xs text-[var(--accent)]">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <h2 className="font-[var(--font-mono)] text-[11px] uppercase tracking-[0.12em]">
                    {index === 0
                      ? 'Movement, not scenery'
                      : index === 1
                        ? 'The human reading'
                        : 'Reading note'}
                  </h2>
                </div>
                <p className="font-[var(--font-body)] text-lg leading-relaxed">
                  {note}
                </p>
              </article>
            ))}
          </div>

          <div className="border-l-4 border-[var(--accent)] py-1 pl-5">
            <p className="font-[var(--font-headline)] text-[30px] italic leading-tight tracking-[-0.025em]">
              Privacy at the edge.
              <br />
              Weather at the center.
            </p>
          </div>
        </aside>
      </div>
    </section>
  );
}
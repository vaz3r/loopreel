import React from 'react';
import { Check, Pause } from 'lucide-react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

export default function Slide06({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  const items = slide.items ?? [];

  return (
    <section className="flex h-full min-h-0 w-full flex-col justify-between px-1 py-5 text-[var(--ink)]">
      <header className="mb-3 shrink-0">
        <div className="mb-5 flex items-center gap-3">
          <span
            aria-hidden="true"
            className="h-2.5 w-2.5 shrink-0 bg-[var(--accent)]"
          />
          <p className="font-[var(--font-mono)] text-[20px] font-medium uppercase tracking-[0.14em]">
            {slide.kicker ?? 'THE DOCUMENTED RESPONSE'}
          </p>
        </div>

        <h1 className="max-w-[880px] font-[var(--font-headline)] text-[58px] font-bold leading-[1.04] tracking-tight">
          {slide.headline ?? 'Two Cases. Two Different Outcomes.'}
        </h1>

        <p className="mt-5 max-w-[830px] font-[var(--font-body)] text-[26px] leading-snug line-clamp-2">
          {slide.subheadline ??
            'The FTC’s Genesis Tech allegations remained for the court to decide.'}
        </p>
      </header>

      <div className="relative my-3 flex min-h-0 flex-1 items-center justify-center overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-[40%] border-l border-[var(--border)]"
        />

        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 952 420"
          preserveAspectRatio="xMidYMid meet"
          role="img"
          aria-label="Separate case records: a checked settlement document and a paused court proceeding."
          className="relative h-full max-h-[520px] w-full"
        >
          {/* Left dossier: closed settlement record. */}
          <g transform="translate(38 34) rotate(-4 145 175)">
            <path
              d="M15 58V24H104L128 48H284V338H15Z"
              fill="var(--surface)"
              stroke="var(--ink)"
              strokeOpacity="0.5"
              strokeWidth="2"
              strokeLinejoin="round"
            />
            <path
              d="M36 69H245L265 89V312H36Z"
              fill="var(--surface)"
              stroke="var(--ink)"
              strokeWidth="2"
            />
            <path
              d="M245 69V89H265"
              fill="none"
              stroke="var(--ink)"
              strokeWidth="2"
            />

            <path
              d="M63 111H154"
              stroke="var(--ink)"
              strokeWidth="5"
            />
            <path
              d="M63 139H231M63 156H214M63 173H231M63 190H177"
              stroke="var(--ink)"
              strokeOpacity="0.35"
              strokeWidth="3"
            />

            <path
              d="M57 181L185 179"
              stroke="var(--accent)"
              strokeWidth="3"
              strokeLinecap="round"
            />

            <circle
              cx="153"
              cy="253"
              r="39"
              fill="none"
              stroke="var(--accent)"
              strokeWidth="2"
            />
            <circle
              cx="153"
              cy="253"
              r="45"
              fill="none"
              stroke="var(--accent)"
              strokeOpacity="0.35"
              strokeWidth="1"
              strokeDasharray="3 5"
            />
            <Check
              x={126}
              y={226}
              width={54}
              height={54}
              stroke="var(--accent)"
              strokeWidth={2.5}
              aria-hidden="true"
            />
          </g>

          {/* Right dossier: proceeding paused, not resolved. */}
          <g transform="translate(480 34) rotate(3 190 178)">
            <path
              d="M15 74V39H116L143 65H355V355H15Z"
              fill="var(--surface)"
              stroke="var(--ink)"
              strokeOpacity="0.5"
              strokeWidth="2"
              strokeLinejoin="round"
            />
            <path
              d="M48 53H302L325 76V329H48Z"
              fill="var(--surface)"
              stroke="var(--ink)"
              strokeWidth="2"
            />
            <path
              d="M302 53V76H325"
              fill="none"
              stroke="var(--ink)"
              strokeWidth="2"
            />

            <path
              d="M77 104H191"
              stroke="var(--ink)"
              strokeWidth="5"
            />
            <path
              d="M77 134H295M77 151H267M77 168H295M77 185H233"
              stroke="var(--ink)"
              strokeOpacity="0.35"
              strokeWidth="3"
            />

            <path
              d="M67 196C131 190 219 191 294 194"
              fill="none"
              stroke="var(--accent)"
              strokeWidth="3"
              strokeLinecap="round"
            />

            <path
              d="M151 226H137V294H151M222 226H236V294H222"
              fill="none"
              stroke="var(--accent)"
              strokeWidth="2"
            />
            <Pause
              x={158}
              y={231}
              width={58}
              height={58}
              stroke="var(--accent)"
              strokeWidth={3}
              aria-hidden="true"
            />
          </g>
        </svg>
      </div>

      <div className="shrink-0 border-t border-[var(--border)] pt-4">
        <div className="grid grid-cols-[2fr_3fr]">
          <article className="border-r border-[var(--border)] py-2 pr-8">
            <div
              aria-hidden="true"
              className="mb-4 h-1 w-9 bg-[var(--accent)]"
            />
            <h2 className="font-[var(--font-headline)] text-[28px] font-semibold leading-tight">
              {items[0]?.label ?? 'Noom Settlement'}
            </h2>
            <p className="mt-3 font-[var(--font-body)] text-[24px] leading-snug">
              {items[0]?.body ?? '$62 million settlement in July 2022.'}
            </p>
          </article>

          <article className="py-2 pl-8">
            <div aria-hidden="true" className="mb-4 flex h-1 gap-1.5">
              <span className="w-3 bg-[var(--accent)]" />
              <span className="w-3 bg-[var(--accent)]" />
            </div>
            <h2 className="font-[var(--font-headline)] text-[28px] font-semibold leading-tight">
              {items[1]?.label ?? 'Genesis Tech'}
            </h2>
            <p className="mt-3 font-[var(--font-body)] text-[24px] leading-snug">
              {items[1]?.body ??
                'FTC announced a temporary court halt on June 17, 2026.'}
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}
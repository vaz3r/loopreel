import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';
import {
  FileText,
  Gavel,
  ShieldCheck,
  CheckCircle2,
  Bookmark,
} from 'lucide-react';

export default function Slide07({ slide, brand, totalSlides }: SlideComponentProps) {
  const items = slide.items ?? [];

  return (
    <section className="flex h-full min-h-0 w-full flex-col justify-between px-1 py-5 text-[var(--ink)]">
      <header className="mb-3 shrink-0">
        <div className="mb-5 flex items-center gap-3">
          <span
            aria-hidden="true"
            className="h-3 w-3 bg-[var(--accent)]"
          />
          <p className="font-[var(--font-mono)] text-[20px] uppercase tracking-[0.18em]">
            YOUR DEFENSE
          </p>
        </div>

        <h1 className="max-w-[880px] font-[var(--font-headline)] text-[58px] font-bold leading-[1.04] tracking-tight">
          A Demand Is Not a Ruling
        </h1>

        <p className="mt-5 max-w-[820px] font-[var(--font-body)] text-[26px] leading-snug">
          Spot when account terms reach beyond the service you bought.
        </p>
      </header>

      <div className="relative my-3 flex min-h-0 flex-1 items-center justify-center overflow-hidden">
        <svg
          viewBox="0 0 952 420"
          preserveAspectRatio="xMidYMid meet"
          role="img"
          aria-label="An account document and a court gavel separated by a protective shield."
          className="h-full max-h-[460px] w-full"
          fill="none"
        >
          {/* Registration marks frame the illustration, not the slide. */}
          <path
            d="M48 85V65H68 M884 65H904V85 M48 285V305H68 M884 305H904V285"
            stroke="var(--border)"
            strokeWidth="2"
          />

          {/* Account document: a physical sheet with a folded corner. */}
          <g transform="rotate(-7 207 178)">
            <path
              d="M132 66H237L281 110V283H132Z"
              fill="var(--surface)"
              stroke="var(--ink)"
              strokeOpacity="0.65"
              strokeWidth="2"
            />
            <path
              d="M237 66V110H281"
              stroke="var(--ink)"
              strokeOpacity="0.65"
              strokeWidth="2"
            />
            <FileText
              x={151}
              y={88}
              width={39}
              height={39}
              color="var(--accent)"
              strokeWidth={1.5}
            />
            <path
              d="M156 155H253 M156 178H240 M156 201H252 M156 247H222"
              stroke="var(--ink)"
              strokeOpacity="0.4"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M151 211C184 207 221 207 257 210"
              stroke="var(--accent)"
              strokeWidth="4"
              strokeLinecap="round"
            />
          </g>

          {/* The asserted reach stops at the shield. */}
          <path
            d="M300 183C338 183 355 183 388 183"
            stroke="var(--accent)"
            strokeWidth="2"
            strokeDasharray="6 8"
          />
          <path
            d="M379 174L388 183L379 192"
            stroke="var(--accent)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          <path
            d="M476 69L550 96V164C550 224 519 263 476 288C433 263 402 224 402 164V96Z"
            fill="var(--surface)"
            stroke="var(--accent)"
            strokeWidth="2"
          />
          <ShieldCheck
            x={430}
            y={124}
            width={92}
            height={92}
            color="var(--ink)"
            strokeWidth={1.25}
          />

          {/* A separate court instrument, never joined to the demand. */}
          <Gavel
            x={683}
            y={94}
            width={132}
            height={132}
            color="var(--ink)"
            strokeWidth={1.2}
          />
          <path
            d="M686 251H818 M699 242H805"
            stroke="var(--ink)"
            strokeOpacity="0.6"
            strokeWidth="3"
            strokeLinecap="round"
          />

          <g
            fill="var(--ink)"
            fontSize="20"
            fontFamily="var(--font-mono)"
            letterSpacing="3"
            textAnchor="middle"
          >
            <text x="207" y="336">TERMS</text>
            <text x="752" y="336">COURT</text>
          </g>
        </svg>

        <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
          <p className="rotate-[-2deg] whitespace-nowrap border-2 border-[var(--accent)] bg-[var(--surface)] px-5 py-2 font-[var(--font-mono)] text-[24px] font-bold uppercase tracking-[0.1em] text-[var(--accent)]">
            [NOT A RULING]
          </p>
        </div>
      </div>

      <div className="shrink-0 border-t border-[var(--border)] pt-4">
        <div className="flex items-start gap-5 pb-5">
          <CheckCircle2
            aria-hidden="true"
            className="mt-1 h-7 w-7 shrink-0 text-[var(--accent)]"
            strokeWidth={1.6}
          />
          <div className="min-w-0">
            <h2 className="font-[var(--font-headline)] text-[28px] font-semibold leading-tight">
              {items[0]?.label ?? 'Save the record'}
            </h2>
            <p className="mt-2 font-[var(--font-body)] text-[24px] leading-snug">
              {items[0]?.body ??
                'Keep terms and signup screens; inspect linked agreements.'}
            </p>
          </div>
        </div>

        <div className="flex items-start gap-5 border-t border-[var(--border)] pt-5">
          <CheckCircle2
            aria-hidden="true"
            className="mt-1 h-7 w-7 shrink-0 text-[var(--accent)]"
            strokeWidth={1.6}
          />
          <div className="min-w-0">
            <h2 className="font-[var(--font-headline)] text-[28px] font-semibold leading-tight">
              {items[1]?.label ?? 'Check the reach'}
            </h2>
            <p className="mt-2 font-[var(--font-body)] text-[24px] leading-snug">
              {items[1]?.body ??
                'Check affiliate language; get legal advice before conceding.'}
            </p>
          </div>
        </div>

        <p className="mt-6 flex items-center gap-3 font-[var(--font-mono)] text-[20px] uppercase tracking-[0.08em] text-[var(--accent)]">
          <Bookmark aria-hidden="true" className="h-5 w-5 shrink-0" />
          Bookmark this checklist
        </p>
      </div>
    </section>
  );
}
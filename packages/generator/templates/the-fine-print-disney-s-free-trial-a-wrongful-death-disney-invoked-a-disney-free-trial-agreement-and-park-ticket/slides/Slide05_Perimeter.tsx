import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';
import { FileText, Landmark, Scale, ArrowUpRight } from 'lucide-react';

export default function Slide05({ slide, brand, totalSlides }: SlideComponentProps) {
  const items = slide.items ?? [];

  return (
    <section className="flex h-full min-h-0 w-full flex-col justify-between py-5 px-1 text-[var(--ink)]">
      <header className="mb-3 shrink-0">
        <p className="mb-5 flex items-center gap-3 font-[var(--font-mono)] text-[20px] uppercase tracking-[0.18em]">
          <span
            aria-hidden="true"
            className="h-2.5 w-2.5 bg-[var(--accent)]"
          />
          WHY IT MATTERS
        </p>

        <h1 className="max-w-[900px] font-[var(--font-headline)] text-[58px] font-bold leading-[1.04] tracking-tight">
          A Different Referee.
          <br />
          Not Immunity.
        </h1>

        <p className="mt-5 max-w-[830px] font-[var(--font-body)] text-[26px] leading-snug line-clamp-2">
          The danger: account terms invoked far beyond their apparent purpose.
        </p>
      </header>

      <div className="relative my-3 flex min-h-0 flex-1 items-center justify-center overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-6 left-0 w-[40%] border-r border-[var(--border)] pr-8"
        />

        <svg
          viewBox="0 0 952 420"
          role="img"
          aria-label="Account terms within a marked perimeter, with a disputed route extending toward arbitration rather than court."
          className="relative h-full max-h-[480px] w-full"
          preserveAspectRatio="xMidYMid meet"
        >
          {/* A document perimeter, deliberately breached on its right edge. */}
          <path
            d="M286 95 C250 56 157 48 106 92
               C46 144 48 269 103 319
               C157 368 249 358 289 314"
            fill="none"
            stroke="var(--border)"
            strokeWidth="2"
            strokeDasharray="7 9"
          />

          <path
            d="M62 64 H84 M73 53 V75
               M294 64 H316 M305 53 V75
               M62 356 H84 M73 345 V367"
            fill="none"
            stroke="var(--border)"
            strokeWidth="2"
          />

          <FileText
            x={132}
            y={137}
            width={112}
            height={136}
            stroke="var(--ink)"
            strokeWidth={1.1}
          />

          {/* A crimson annotation on the document, not another text block. */}
          <path
            d="M163 219 L212 215 M164 230 L198 227"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="3"
            strokeLinecap="round"
          />

          <text
            x="188"
            y="307"
            textAnchor="middle"
            fill="var(--ink)"
            fontSize="20"
            className="font-[var(--font-mono)] tracking-[0.12em]"
          >
            ACCOUNT
          </text>

          {/* The ordinary courtroom route remains visible. */}
          <path
            d="M258 194 C444 194 467 110 660 110"
            fill="none"
            stroke="var(--ink)"
            strokeOpacity="0.3"
            strokeWidth="2"
          />
          <path
            d="M648 103 L660 110 L648 117"
            fill="none"
            stroke="var(--ink)"
            strokeOpacity="0.3"
            strokeWidth="2"
          />

          {/* A broken route communicates a contested demand, not a ruling. */}
          <path
            d="M258 221 C352 221 390 295 491 295"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="3"
          />
          <path
            d="M555 295 H660"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="3"
            strokeDasharray="9 9"
          />
          <path
            d="M648 287 L660 295 L648 303"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="3"
          />
          <path
            d="M508 278 L501 311 M538 278 L531 311"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="3"
            strokeLinecap="round"
          />

          <Landmark
            x={710}
            y={61}
            width={84}
            height={84}
            stroke="var(--ink)"
            strokeWidth={1.25}
            opacity={0.55}
          />
          <text
            x="752"
            y="179"
            textAnchor="middle"
            fill="var(--ink)"
            fillOpacity="0.65"
            fontSize="20"
            className="font-[var(--font-mono)] tracking-[0.12em]"
          >
            COURT
          </text>

          <Scale
            x={702}
            y={245}
            width={100}
            height={100}
            stroke="var(--accent)"
            strokeWidth={1.25}
          />
          <text
            x="752"
            y="382"
            textAnchor="middle"
            fill="var(--ink)"
            fontSize="20"
            className="font-[var(--font-mono)] tracking-[0.1em]"
          >
            ARBITRATION
          </text>
        </svg>
      </div>

      <div className="shrink-0 border-t border-[var(--border)] pt-4">
        <div className="grid grid-cols-[40%_60%] py-4">
          <div className="border-r border-[var(--border)] pr-8">
            <h2 className="flex items-start gap-3 font-[var(--font-headline)] text-[28px] font-semibold leading-tight">
              <ArrowUpRight
                aria-hidden="true"
                className="mt-1 h-6 w-6 shrink-0 text-[var(--accent)]"
                strokeWidth={1.5}
              />
              {items[0]?.label ?? 'Disney’s demand'}
            </h2>
          </div>
          <p className="pl-8 font-[var(--font-body)] text-[24px] leading-snug line-clamp-3">
            {items[0]?.body ??
              'Individual arbitration instead of a courtroom hearing.'}
          </p>
        </div>

        <div className="grid grid-cols-[40%_60%] border-t border-[var(--border)] pb-2 pt-6">
          <div className="border-r border-[var(--border)] pr-8">
            <h2 className="font-[var(--font-headline)] text-[28px] font-semibold leading-tight">
              {items[1]?.label ?? 'Contested reach'}
            </h2>
          </div>
          <p className="pl-8 font-[var(--font-body)] text-[24px] leading-snug line-clamp-3">
            {items[1]?.body ??
              'Piccolo disputed coverage; no ruling endorsed Disney’s theory.'}
          </p>
        </div>
      </div>
    </section>
  );
}
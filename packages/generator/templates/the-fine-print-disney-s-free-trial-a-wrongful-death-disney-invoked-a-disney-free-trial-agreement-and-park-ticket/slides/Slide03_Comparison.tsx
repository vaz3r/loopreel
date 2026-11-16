import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

export default function Slide03({ slide, brand, totalSlides }: SlideComponentProps) {
  const items = slide.items ?? [];
  const item0 = items[0]!;
  const item1 = items[0]!;

  void brand;

  return (
    <section className="flex h-full min-h-0 w-full flex-col justify-between text-[var(--ink)]">
      <header className="shrink-0">
        <p className="mb-5 font-[var(--font-headline)] text-[22px] font-bold tracking-[0.12em] text-[var(--accent)]">
          THE DOCUMENT COLLISION
        </p>

        <h1 className="max-w-[900px] font-[var(--font-headline)] text-[60px] font-bold leading-[1.02] tracking-tight">
          Two Documents,
          <br />
          Competing Forums
        </h1>

        <p className="mt-5 max-w-[840px] font-[var(--font-body)] text-[26px] leading-snug">
          Piccolo argued conflicting parks terms defeated enforcement.
        </p>
      </header>

      <div className="relative flex min-h-0 flex-1 items-center justify-center py-3">
        <svg
          viewBox="0 0 952 460"
          className="h-full max-h-[460px] w-full"
          role="img"
          aria-labelledby="slide03-diagram-title slide03-diagram-description"
        >
          <title id="slide03-diagram-title">
            Two documents point toward competing forums
          </title>
          <desc id="slide03-diagram-description">
            Individual arbitration and Orange County, Florida, courts are
            connected by opposing directional lines that collide at the center.
          </desc>

          {/* Document silhouettes: folded sheets, not interface containers. */}
          <g
            fill="var(--surface)"
            stroke="var(--border)"
            strokeWidth="2"
            strokeLinejoin="round"
          >
            <path d="M116 48 H282 L318 84 V240 H116 Z" />
            <path d="M282 48 V84 H318" />
            <path d="M634 48 H800 L836 84 V240 H634 Z" />
            <path d="M800 48 V84 H836" />
          </g>

          <g
            fill="none"
            stroke="var(--border)"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <path d="M146 105 H270 M146 130 H288 M146 180 H274 M146 205 H251" />
            <path d="M664 105 H788 M664 130 H806 M664 180 H792 M664 205 H769" />
          </g>

          {/* Highlighter strokes and red-pen annotations. */}
          <path
            d="M146 155 H286 M664 155 H804"
            stroke="#FEF08A"
            strokeWidth="16"
          />
          <path
            d="M146 155 H286 M664 155 H804"
            stroke="var(--ink)"
            strokeWidth="2"
          />
          <path
            d="M660 167 Q729 173 810 166"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="3"
            strokeLinecap="round"
          />

          {/* Opposing conduits terminate at one unresolved collision. */}
          <g fill="none" stroke="var(--ink)" strokeWidth="2">
            <path d="M217 240 V278 H441" />
            <path d="M735 240 V278 H511" />
            <path d="M430 269 L441 278 L430 287" />
            <path d="M522 269 L511 278 L522 287" />
          </g>

          <g fill="var(--surface)" stroke="var(--ink)" strokeWidth="2">
            <circle cx="217" cy="278" r="6" />
            <circle cx="735" cy="278" r="6" />
          </g>

          <circle
            cx="476"
            cy="278"
            r="22"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="2"
          />
          <path
            d="M467 269 L485 287 M485 269 L467 287"
            stroke="var(--accent)"
            strokeWidth="3"
            strokeLinecap="round"
          />

          {/* Small editorial flags, rather than boxed badges. */}
          <g fill="var(--accent)">
            <path d="M116 48 H147 V79 L131.5 69 L116 79 Z" />
            <path d="M634 48 H665 V79 L649.5 69 L634 79 Z" />
          </g>

          <g
            fill="var(--ink)"
            textAnchor="middle"
            className="font-[var(--font-headline)] text-[30px] font-semibold"
          >
            <text x="217" y="337">Individual</text>
            <text x="217" y="374">arbitration</text>
            <text x="735" y="337">Orange County,</text>
            <text x="735" y="374">Florida, courts</text>
          </g>

          <text
            x="476"
            y="424"
            textAnchor="middle"
            fill="var(--accent)"
            className="font-[var(--font-mono)] text-[20px] tracking-[0.12em]"
          >
            COMPETING FORUMS
          </text>
        </svg>
      </div>

      <div className="shrink-0 border-t border-[var(--border)] bg-[var(--surface)] px-7 py-5">
        <div className="mb-5 flex items-baseline justify-between gap-5 border-b border-[var(--border)] pb-3">
          <p className="font-[var(--font-mono)] text-[20px] uppercase tracking-[0.06em]">
            Terms summary · not verbatim
          </p>
          <span
            aria-label="Section references are unspecified"
            className="font-[var(--font-mono)] text-[20px] text-[var(--accent)]"
          >
            [§ —]
          </span>
        </div>

        <article className="grid grid-cols-[230px_1fr] gap-7 pb-5">
          <aside className="border-r border-[var(--border)] pr-6">
            <h2 className="font-[var(--font-headline)] text-[26px] font-semibold leading-tight">
              {item0?.label ?? 'Broader Terms'}
            </h2>
          </aside>

          <p className="font-[var(--font-mono)] text-[23px] leading-relaxed">
            <mark className="bg-[#FEF08A] px-1 py-0.5 font-mono text-[#121212]">
              {item0?.body ?? 'Prescribed individual arbitration.'}
            </mark>
          </p>
        </article>

        <article className="grid grid-cols-[230px_1fr] gap-7 border-t border-[var(--border)] pt-5">
          <aside className="border-r border-[var(--border)] pr-6">
            <h2 className="font-[var(--font-headline)] text-[26px] font-semibold leading-tight">
              {item1?.label ?? 'Parks Terms'}
            </h2>
          </aside>

          <p className="font-[var(--font-mono)] text-[23px] leading-relaxed">
            <span className="underline decoration-[var(--accent)] decoration-2 underline-offset-[6px]">
              {item1?.body ??
                'Specified Orange County, Florida, courts; claimed priority.'}
            </span>
          </p>
        </article>
      </div>

      <footer className="mt-5 flex shrink-0 items-center justify-between border-t border-[var(--border)] pt-3 font-[var(--font-mono)] text-[20px]">
        <span>THE FINE PRINT</span>
        <span>
          03 / {String(totalSlides).padStart(2, '0')}
        </span>
      </footer>
    </section>
  );
}
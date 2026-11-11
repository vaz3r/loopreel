import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

export default function Slide10({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  void brand;

  const titleId = `${slide.id}-title`;

  return (
    <section
      aria-labelledby={titleId}
      data-total-slides={totalSlides}
      className="flex flex-col h-full min-h-0 w-full text-[var(--ink)]"
    >
      <header className="shrink-0">
        <p className="font-[var(--font-mono)] text-[22px] leading-7 tracking-wider text-[var(--accent)]">
          THE EVIDENCE BOUNDARY
        </p>

        <h1
          id={titleId}
          className="mt-5 max-w-[920px] font-[var(--font-headline)] text-[60px] font-bold leading-[1.06] tracking-tight"
        >
          An Article Is Not
          <br />
          Independent Verification
        </h1>

        <p className="mt-5 max-w-[900px] font-[var(--font-body)] text-[26px] leading-snug">
          The dossier records reported claims; its underlying cited documents
          were not supplied.
        </p>
      </header>

      <div className="relative mt-8 h-[650px] w-full shrink-0">
        <svg
          aria-hidden="true"
          viewBox="0 0 952 650"
          fill="none"
          className="pointer-events-none absolute inset-0 h-full w-full"
        >
          {/* Open-ended document silhouette and folded corner. */}
          <path
            d="M18 620 V20 H382 L474 112 V620
               L451 610 L430 626 L408 614"
            fill="var(--surface)"
          />
          <path
            d="M18 620 V20 H382 L474 112 V620
               L451 610 L430 626 L408 614"
            stroke="var(--border)"
            strokeWidth="3"
            strokeLinejoin="miter"
          />
          <path
            d="M382 20 V112 H474"
            stroke="var(--border)"
            strokeWidth="3"
          />
          <path
            d="M18 620 L42 610 L65 626 L88 614 H167"
            stroke="var(--border)"
            strokeWidth="3"
          />

          {/* Generic editorial marks, not fabricated source text. */}
          <path
            d="M58 74 H161"
            stroke="var(--accent)"
            strokeWidth="6"
          />
          <path
            d="M58 120 H312 M58 143 H257"
            stroke="var(--ink)"
            strokeOpacity=".7"
            strokeWidth="9"
          />
          <path
            d="M58 190 H280
               M58 217 H324
               M58 244 H293"
            stroke="var(--border)"
            strokeWidth="5"
          />

          {/* Empty citation placeholder with first margin leader. */}
          <path
            d="M355 176 H345 V202 H355
               M387 176 H397 V202 H387"
            stroke="var(--accent)"
            strokeWidth="3"
          />
          <circle cx="371" cy="189" r="3" fill="var(--accent)" />
          <path
            d="M407 189 H510 V119 H552"
            stroke="var(--accent)"
            strokeWidth="2"
          />
          <circle cx="407" cy="189" r="4" fill="var(--accent)" />

          <path
            d="M58 286 H432"
            stroke="var(--border)"
            strokeWidth="2"
          />
          <path
            d="M58 325 H390
               M58 352 H416
               M58 379 H342
               M58 406 H397
               M58 433 H280"
            stroke="var(--border)"
            strokeWidth="5"
          />
          <path
            d="M58 480 H432"
            stroke="var(--border)"
            strokeWidth="2"
          />
          <path
            d="M58 519 H395
               M58 546 H348
               M58 573 H280"
            stroke="var(--border)"
            strokeWidth="5"
          />

          {/* Unclosed citation and visibly missing bottom boundary. */}
          <path
            d="M316 560 H306 V586 H316"
            stroke="var(--accent)"
            strokeWidth="3"
          />
          <circle cx="333" cy="573" r="3" fill="var(--accent)" />
          <path
            d="M187 609 L177 633 M204 609 L194 633
               M373 609 L363 633 M390 609 L380 633"
            stroke="var(--accent)"
            strokeWidth="2.5"
          />

          {/* Second margin leader terminates at the interrupted edge. */}
          <path
            d="M408 614 H522 V419 H552"
            stroke="var(--accent)"
            strokeWidth="2"
          />
          <circle cx="408" cy="614" r="4" fill="var(--accent)" />
        </svg>

        <aside
          aria-label="Missing source documents"
          className="absolute left-[572px] right-0 top-[94px]"
        >
          <h2 className="font-[var(--font-headline)] text-[34px] font-semibold leading-[1.12] tracking-tight">
            Missing source
            <br />
            documents
          </h2>
          <p className="mt-4 font-[var(--font-body)] text-[26px] leading-snug">
            Bracketed references appear, but their underlying source documents
            are not included.
          </p>
        </aside>

        <aside
          aria-label="Incomplete excerpt"
          className="absolute left-[572px] right-0 top-[394px]"
        >
          <h2 className="font-[var(--font-headline)] text-[34px] font-semibold leading-[1.12] tracking-tight">
            Incomplete excerpt
          </h2>
          <p className="mt-4 font-[var(--font-body)] text-[26px] leading-snug">
            The supplied excerpt ends mid-citation after its final reference to
            Operation Roaring Lion.
          </p>
        </aside>
      </div>
    </section>
  );
}
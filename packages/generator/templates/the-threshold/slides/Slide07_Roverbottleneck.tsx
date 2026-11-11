import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

export default function Slide07({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  return (
    <section className="flex flex-col h-full min-h-0 w-full text-[var(--ink)]">
      <div className="shrink-0 border-b border-[var(--border)] pb-7">
        <p className="font-[var(--font-mono)] text-[22px] leading-[28px] tracking-[0.12em] text-[var(--accent)]">
          THE FLOOR IS THE LIMIT
        </p>

        <h2 className="mt-4 max-w-[900px] font-[var(--font-headline)] text-[64px] font-bold leading-[1.04] tracking-[-0.035em]">
          Rover Cannot Patrol Every Floor
        </h2>

        <p className="mt-5 max-w-[830px] font-[var(--font-body)] text-[28px] leading-snug">
          Indoor, single-floor operation comes with explicit terrain exclusions.
        </p>
      </div>

      <div className="relative mt-7 h-[664px] w-full shrink-0">
        <svg
          className="pointer-events-none absolute inset-0 h-full w-full"
          viewBox="0 0 952 664"
          fill="none"
          preserveAspectRatio="xMidYMid meet"
          aria-hidden="true"
        >
          {/* One continuous architectural floor section. */}
          <path
            d="
              M 0 282
              H 112 V 314
              H 152 V 346
              H 192 V 378
              H 360
              Q 384 378 396 398
              L 408 418
              Q 412 426 428 426
              H 554
              Q 570 426 574 412
              L 584 378
              H 728
              V 340
              H 952
              V 456
              H 0 Z
            "
            fill="var(--surface)"
          />

          {/* Section hatching: quiet, technical, and subordinate to the floor. */}
          <g stroke="var(--border)" strokeWidth="1.5">
            <path d="M 20 436 L 40 416 M 58 436 L 78 416" />
            <path d="M 96 436 L 116 416 M 134 436 L 154 416" />
            <path d="M 172 436 L 192 416 M 210 436 L 230 416" />
            <path d="M 248 436 L 268 416 M 286 436 L 306 416" />
            <path d="M 324 436 L 344 416 M 362 436 L 378 420" />
            <path d="M 610 436 L 630 416 M 648 436 L 668 416" />
            <path d="M 686 436 L 706 416 M 724 436 L 744 416" />
            <path d="M 762 436 L 782 416 M 800 436 L 820 416" />
            <path d="M 838 436 L 858 416 M 876 436 L 896 416" />
            <path d="M 914 436 L 934 416" />
            <path d="M 0 456 H 952" />
          </g>

          <path
            d="
              M 0 282
              H 112 V 314
              H 152 V 346
              H 192 V 378
              H 360
              Q 384 378 396 398
              L 408 418
              Q 412 426 428 426
              H 554
              Q 570 426 574 412
              L 584 378
              H 728
              V 340
              H 952
            "
            stroke="var(--ink)"
            strokeWidth="3"
            strokeLinejoin="round"
          />

          {/* Abstract glossy inset, without implied terrain specifications. */}
          <path
            d="M 424 426 H 554"
            stroke="var(--ink)"
            strokeWidth="12"
          />
          <g stroke="var(--surface)" strokeWidth="2">
            <path d="M 446 431 L 460 421" />
            <path d="M 470 431 L 484 421" />
            <path d="M 494 431 L 508 421" />
            <path d="M 518 431 L 532 421" />
          </g>

          {/* Callout leaders connect directly to their architectural features. */}
          <g
            stroke="var(--border)"
            strokeWidth="2"
            strokeLinecap="square"
          >
            <path d="M 28 176 V 224 H 152 V 326" />
            <path d="M 650 176 V 226 H 490 V 398" />
            <path d="M 746 359 H 812 V 488 H 438 V 514" />
          </g>

          {/* Accent stop bars mark all three incompatibilities. */}
          <g stroke="var(--accent)" strokeWidth="8" strokeLinecap="square">
            <path d="M 136 332 H 168" />
            <path d="M 474 404 H 506" />
            <path d="M 712 354 H 744" />
          </g>

          {/* Unnumbered threshold bracket; the supplied value appears below. */}
          <g stroke="var(--accent)" strokeWidth="2">
            <path d="M 774 340 V 378" />
            <path d="M 766 340 H 782 M 766 378 H 782" />
          </g>
        </svg>

        <div className="absolute left-0 top-0 w-[330px]">
          <h3 className="font-[var(--font-headline)] text-[34px] font-semibold leading-[1.15] tracking-[-0.02em]">
            Single-floor only
          </h3>
          <p className="mt-3 font-[var(--font-body)] text-[27px] leading-snug">
            Indoor operation; no stair-climbing capability.
          </p>
        </div>

        <div className="absolute right-0 top-0 w-[420px]">
          <h3 className="font-[var(--font-headline)] text-[34px] font-semibold leading-[1.15] tracking-[-0.02em]">
            Incompatible terrain
          </h3>
          <p className="mt-3 font-[var(--font-body)] text-[27px] leading-snug">
            Curved edges, sunken areas and black glossy floors.
          </p>
        </div>

        <div className="absolute left-[438px] right-0 top-[526px]">
          <h3 className="max-w-[460px] font-[var(--font-headline)] text-[34px] font-semibold leading-[1.15] tracking-[-0.02em]">
            Incompatible flooring transitions
          </h3>
          <p className="mt-3 font-[var(--font-body)] text-[27px] leading-snug text-[var(--accent)]">
            Greater than 1.375 inches (3.5 centimeters).
          </p>
        </div>
      </div>
    </section>
  );
}
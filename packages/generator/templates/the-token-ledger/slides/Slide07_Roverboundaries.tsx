import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

export default function Slide07({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  const zones = [
    {
      title: 'Indoor, single-floor operation',
      body: 'The rover cannot climb stairs.',
    },
    {
      title: 'Incompatible terrain',
      body: 'Curved edges, sunken areas and black glossy floors are incompatible.',
    },
    {
      title: 'Flooring transitions',
      body: 'Transitions greater than 1.375 inches (3.5 centimeters) are incompatible.',
    },
  ];

  return (
    <section className="flex flex-col h-full min-h-0 w-full text-[var(--ink)]">
      <header className="shrink-0">
        <p className="font-[var(--font-mono)] text-[22px] leading-[28px] tracking-[0.14em] text-[var(--accent)]">
          {slide.kicker}
        </p>

        <h1 className="mt-4 max-w-[900px] font-[var(--font-headline)] text-[64px] font-bold leading-[1.04] tracking-[-0.045em]">
          {slide.headline}
        </h1>

        <p className="mt-5 max-w-[820px] font-[var(--font-body)] text-[28px] leading-snug">
          {slide.subheadline}
        </p>
      </header>

      <figure className="mt-6 flex min-h-0 flex-col">
        <svg
          viewBox="0 0 952 380"
          className="block h-[380px] w-full shrink-0"
          role="img"
          aria-label="Schematic architectural cross-section showing incompatible stairs, curved edges, sunken areas, black glossy flooring, and a raised flooring transition greater than 1.375 inches (3.5 centimeters)."
        >
          {/* Architectural reference lines, not a scale or tolerance grid. */}
          <g
            fill="none"
            stroke="var(--border)"
            strokeWidth="1"
            strokeDasharray="5 9"
          >
            <path d="M0 80H952 M0 150H952 M0 220H952" />
            <path d="M310 24V302 M642 24V302" />
          </g>

          {/* One uninterrupted section through all three obstacle zones. */}
          <path
            d="
              M0 220
              H100 V188 H136 V156 H172 V124 H218
              V220 H332
              C344 220 346 188 363 188
              C380 188 382 220 398 220
              H428 V264 H484 V220
              H748 V174 H952
              V302 H0 Z
            "
            fill="var(--surface)"
          />

          <g
            stroke="var(--border)"
            strokeWidth="2"
            fill="none"
          >
            <path d="M0 302H952" />
            <path d="M12 300L35 277 M54 300L77 277 M96 300L119 277" />
            <path d="M138 300L161 277 M180 300L203 277 M222 300L245 277" />
            <path d="M264 300L287 277 M306 300L329 277 M348 300L371 277" />
            <path d="M390 300L413 277 M432 300L455 277 M474 300L497 277" />
            <path d="M516 300L539 277 M558 300L581 277 M600 300L623 277" />
            <path d="M642 300L665 277 M684 300L707 277 M726 300L749 277" />
            <path d="M768 300L791 277 M810 300L833 277 M852 300L875 277" />
            <path d="M894 300L917 277 M936 300L952 284" />
          </g>

          <path
            d="
              M0 220
              H100 V188 H136 V156 H172 V124 H218
              V220 H332
              C344 220 346 188 363 188
              C380 188 382 220 398 220
              H428 V264 H484 V220
              H748 V174 H952
            "
            fill="none"
            stroke="var(--ink)"
            strokeWidth="3"
            strokeLinejoin="miter"
          />

          {/* Small rover silhouette establishes the floor-level viewpoint. */}
          <g
            fill="var(--surface)"
            stroke="var(--ink)"
            strokeWidth="2.5"
          >
            <path d="M20 200V182Q20 174 28 174H65Q73 174 73 182V200Z" />
            <path d="M29 174V165H58V174" fill="none" />
            <circle cx="31" cy="208" r="10" />
            <circle cx="63" cy="208" r="10" />
            <path d="M34 185H58" fill="none" />
          </g>

          {/* Black glossy flooring is part of the grouped terrain vignette. */}
          <path d="M524 220H614V234H524Z" fill="#000000" />
          <path
            d="M534 225H576 M586 225H603"
            stroke="var(--ink)"
            strokeWidth="2"
            opacity="0.7"
          />

          {/* Accent slashes identify incompatible features. */}
          <g
            fill="none"
            stroke="var(--accent)"
            strokeWidth="5"
            strokeLinecap="square"
          >
            <path d="M122 174L151 145" />
            <path d="M349 200L377 172" />
            <path d="M443 249L469 223" />
            <path d="M552 211L578 185" />
            <path d="M734 210L762 182" />
          </g>

          {/* Exact threshold beside the raised-transition dimension bracket. */}
          <g
            fill="none"
            stroke="var(--accent)"
            strokeWidth="2"
          >
            <path d="M758 174H817 M758 220H817" strokeDasharray="4 5" />
            <path d="M807 174V220 M799 174H815 M799 220H815" />
            <path d="M807 166V128H729V111" />
          </g>

          <text
            x="680"
            y="65"
            fill="var(--accent)"
            className="font-[var(--font-mono)] text-[24px]"
          >
            <tspan x="680" dy="0">
              &gt; 1.375 inches
            </tspan>
            <tspan x="680" dy="32">
              (3.5 centimeters)
            </tspan>
          </text>

          {/* Three annotation leaders connect the section to the copy below. */}
          <g
            fill="none"
            stroke="var(--border)"
            strokeWidth="2"
          >
            <path d="M172 243V350H18V376" />
            <path d="M456 278V350H336V376" />
            <path d="M854 244V350H664V376" />
          </g>
          <g fill="var(--accent)">
            <circle cx="172" cy="243" r="4" />
            <circle cx="456" cy="278" r="4" />
            <circle cx="854" cy="244" r="4" />
          </g>
        </svg>

        <div className="grid grid-cols-3 items-start gap-6">
          {zones.map((zone) => (
            <div
              key={zone.title}
              className="min-w-0 border-t border-[var(--border)] pt-5"
            >
              <h2 className="font-[var(--font-headline)] text-[32px] font-semibold leading-[1.15] tracking-[-0.025em]">
                {zone.title}
              </h2>
              <p className="mt-3 font-[var(--font-body)] text-[26px] leading-snug">
                {zone.body}
              </p>
            </div>
          ))}
        </div>

        <figcaption className="mt-6 flex items-center gap-3 font-[var(--font-mono)] text-[20px] leading-[26px] tracking-[0.06em]">
          <span
            aria-hidden="true"
            className="h-px w-8 bg-[var(--accent)]"
          />
          Schematic drawing.
        </figcaption>
      </figure>
    </section>
  );
}
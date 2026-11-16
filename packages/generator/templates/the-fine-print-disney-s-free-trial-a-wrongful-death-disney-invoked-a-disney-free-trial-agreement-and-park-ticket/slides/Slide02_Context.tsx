import React from 'react';
import { Utensils, Scale } from 'lucide-react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

export default function Slide02({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  const items = slide.items ?? [];
  void brand;

  return (
    <section className="flex h-full min-h-0 w-full flex-col justify-between px-2 py-8 text-[var(--ink)]">
      <header className="shrink-0">
        <div className="mb-7 flex items-center justify-between border-b border-[var(--border)] pb-4">
          <p className="font-[var(--font-mono)] text-[20px] uppercase tracking-[0.18em] text-[var(--accent)]">
            THE HUMAN COST
          </p>
          <span className="font-[var(--font-mono)] text-[20px] uppercase tracking-[0.1em]">
            The Fine Print
          </span>
        </div>

        <h1 className="max-w-[900px] font-[var(--font-headline)] text-[58px] font-bold leading-[1.04] tracking-tight">
          A Dinner. A Death.
          <br />
          A Lawsuit.
        </h1>

        <p className="mt-5 font-[var(--font-body)] text-[28px] leading-snug">
          She ate at Raglan Road in Disney Springs.
        </p>
      </header>

      <div className="relative flex min-h-0 flex-1 items-center justify-center overflow-hidden">
        <svg
          viewBox="0 0 952 420"
          className="absolute inset-0 h-full w-full"
          preserveAspectRatio="xMidYMid meet"
          role="img"
          aria-labelledby="slide02-scene-title slide02-scene-description"
        >
          <title id="slide02-scene-title">From a dinner to a lawsuit</title>
          <desc id="slide02-scene-description">
            An empty dinner plate and utensils lead toward scales of justice.
            A broken plate rim marks the loss at the center of the story.
          </desc>

          {/* An actual place setting, not a diagram node. */}
          <ellipse
            cx="255"
            cy="205"
            rx="112"
            ry="115"
            fill="var(--surface)"
          />
          <path
            d="M 284 95 A 114 114 0 1 0 352 265"
            fill="none"
            stroke="var(--ink)"
            strokeWidth="2"
            opacity="0.65"
          />
          <path
            d="M 307 103 A 114 114 0 0 1 366 232"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="3"
          />
          <ellipse
            cx="255"
            cy="205"
            rx="79"
            ry="81"
            fill="none"
            stroke="var(--border)"
            strokeWidth="2"
          />
          <path
            d="M 309 107 L 291 140 L 309 158 L 283 187"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="2"
            strokeLinecap="round"
          />

          <Utensils
            x={56}
            y={155}
            width={86}
            height={100}
            stroke="var(--ink)"
            strokeWidth={1.2}
          />

          {/* A restrained narrative arrow connects dinner and legal action. */}
          <path
            d="M 405 205 C 462 205 490 205 553 205"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="2"
          />
          <path
            d="M 542 197 L 554 205 L 542 213"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          <Scale
            x={628}
            y={111}
            width={190}
            height={190}
            stroke="var(--ink)"
            strokeWidth={1}
          />

          <path
            d="M 618 320 H 830"
            fill="none"
            stroke="var(--border)"
            strokeWidth="2"
          />

          <g
            fill="var(--ink)"
            className="font-[var(--font-mono)] text-[20px]"
            letterSpacing="3"
            textAnchor="middle"
          >
            <text x="255" y="369">
              DINNER
            </text>
            <text x="723" y="369">
              LAWSUIT
            </text>
          </g>
        </svg>
      </div>

      <div className="shrink-0">
        <div className="grid grid-cols-2 divide-x divide-[var(--border)] border-y border-[var(--border)] py-7">
          <article className="pr-9">
            <h2 className="mb-5 font-[var(--font-headline)] text-[28px] font-semibold leading-tight">
              {items[0]?.label ?? 'Her Death'}
            </h2>
            <p className="flow-root font-[var(--font-body)] text-[24px] leading-snug first-letter:float-left first-letter:mr-3 first-letter:font-[var(--font-headline)] first-letter:text-[76px] first-letter:font-bold first-letter:leading-none first-letter:text-[var(--accent)]">
              {items[0]?.body ??
                'Dr. Kanokporn Tangsuan died on October 5, 2023.'}
            </p>
          </article>

          <article className="pl-9">
            <h2 className="mb-5 font-[var(--font-headline)] text-[28px] font-semibold leading-tight">
              {items[0]?.label ?? 'Husband’s Allegations'}
            </h2>
            <p className="font-[var(--font-body)] text-[24px] leading-snug">
              {items[0]?.body ??
                'Staff repeatedly assured them food would suit her allergies.'}
            </p>
          </article>
        </div>

        <footer className="flex items-center justify-between pt-5 font-[var(--font-mono)] text-[20px]">
          <span>thefineprint.pub</span>
          <span>
            <span className="text-[var(--accent)]">02</span>
            <span className="mx-3 opacity-50">/</span>
            {String(totalSlides).padStart(2, '0')}
          </span>
        </footer>
      </div>
    </section>
  );
}
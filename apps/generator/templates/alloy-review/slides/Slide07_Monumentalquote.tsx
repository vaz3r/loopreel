import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

export default function Slide07({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  void slide;
  void brand;
  void totalSlides;

  return (
    <section className="flex flex-col h-full min-h-0 w-full text-[var(--ink)]">
      <header className="border-t-2 border-[var(--ink)] pt-7">
        <h1 className="max-w-[880px] font-[var(--font-headline)] text-[64px] font-bold leading-[1.04] tracking-[-0.045em]">
          Good Laptop.
          <br />
          <span className="text-[var(--accent)]">Awkward Position.</span>
        </h1>
      </header>

      <div className="relative mt-8 h-[206px] shrink-0">
        <svg
          viewBox="0 0 952 206"
          fill="none"
          aria-hidden="true"
          className="h-full w-full"
        >
          {/* A stable editorial grid; a machine displaced from its center. */}
          <path
            d="M0 171H952"
            stroke="var(--border)"
            strokeWidth="2"
          />
          <path
            d="M476 7V196"
            stroke="var(--border)"
            strokeWidth="2"
            strokeDasharray="5 8"
          />
          <path
            d="M286 22H666M286 16V28M666 16V28"
            stroke="var(--border)"
            strokeWidth="2"
          />

          <path
            d="M306 151V53C306 45.268 312.268 39 320 39H632C639.732 39 646 45.268 646 53V151"
            stroke="var(--border)"
            strokeWidth="2"
            strokeDasharray="7 7"
          />

          <path
            d="M461 147V52C461 44.268 467.268 38 475 38H783C790.732 38 797 44.268 797 52V147"
            fill="var(--surface)"
            stroke="var(--ink)"
            strokeWidth="3"
          />
          <path
            d="M475 52H783V136H475V52Z"
            fill="var(--paper, #F5F5F7)"
            stroke="var(--border)"
            strokeWidth="2"
          />
          <path
            d="M475 136L783 52V136H475Z"
            fill="var(--surface)"
          />
          <path
            d="M439 148H819L838 163C840 166 837 171 832 171H426C421 171 418 166 420 163L439 148Z"
            fill="var(--surface)"
            stroke="var(--ink)"
            strokeWidth="3"
            strokeLinejoin="round"
          />
          <path
            d="M595 149H663L659 155H599L595 149Z"
            fill="var(--border)"
          />

          <circle cx="476" cy="188" r="5" fill="var(--border)" />
          <path
            d="M491 188H629M620 180L629 188L620 196"
            stroke="var(--accent)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="629" cy="22" r="6" fill="var(--accent)" />
        </svg>
      </div>

      <figure className="m-0 mt-9 grid grid-cols-[90px_1fr] gap-x-6">
        <svg
          viewBox="0 0 90 76"
          fill="none"
          aria-hidden="true"
          className="mt-2 h-[76px] w-[90px] text-[var(--accent)]"
        >
          <path
            d="M36 3C15 12 3 29 3 51V72H37V38H20C22 27 29 18 42 11L36 3ZM83 3C62 12 50 29 50 51V72H84V38H67C69 27 76 18 89 11L83 3Z"
            fill="currentColor"
          />
        </svg>

        <blockquote className="m-0 font-[var(--font-headline)] text-[64px] font-bold leading-[1.1] tracking-[-0.035em]">
          this isn’t a bad laptop,
          <br />
          but it is an
          <br />
          <span className="text-[var(--accent)]">
            awkwardly positioned
          </span>
          <br />
          one.
        </blockquote>

        <figcaption className="col-start-2 mt-9 border-t border-[var(--border)] pt-6">
          <p className="m-0 font-[var(--font-mono)] text-[22px] font-medium tracking-[0.06em]">
            Staff Bureau
          </p>
          <p className="mb-0 mt-3 max-w-[680px] font-[var(--font-body)] text-[26px] leading-snug">
            Excerpt from the review’s overall assessment.
          </p>
        </figcaption>
      </figure>
    </section>
  );
}
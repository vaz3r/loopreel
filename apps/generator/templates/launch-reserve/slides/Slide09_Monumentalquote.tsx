import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

export default function Slide09({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  void slide;
  void brand;
  void totalSlides;

  return (
    <section className="flex flex-col h-full min-h-0 w-full text-[var(--ink)]">
      <header className="border-t-2 border-[var(--border)] pt-7">
        <h1 className="max-w-[920px] font-[var(--font-headline)] text-[60px] font-bold leading-[1.06] tracking-[-0.035em]">
          The Business Case
          <br />
          Is Constrained Supply
        </h1>
      </header>

      <figure className="m-0 mt-12 grid grid-cols-[64px_minmax(0,1fr)] gap-x-6">
        <svg
          aria-hidden="true"
          viewBox="0 0 64 64"
          className="mt-2 h-16 w-16 text-[var(--accent)]"
          fill="currentColor"
        >
          <path d="M28 8C13 13 4 24 4 41v15h24V32H15c1-7 5-12 13-16V8Zm32 0C45 13 36 24 36 41v15h24V32H47c1-7 5-12 13-16V8Z" />
        </svg>

        <blockquote className="m-0 font-[var(--font-headline)] text-[64px] font-bold leading-[1.12] tracking-[-0.035em]">
          <span className="block">Launch is extremely</span>
          <span className="block">
            <span className="text-[var(--accent)]">constrained,</span> and that is
          </span>
          <span className="block">exactly the situation</span>
          <span className="block">we predicted,</span>
        </blockquote>

        <figcaption className="col-start-2 mt-9 border-l-2 border-[var(--accent)] pl-6">
          <p className="font-[var(--font-headline)] text-[34px] font-semibold leading-tight tracking-[-0.02em]">
            Peter Beck
          </p>
          <p className="mt-2 font-[var(--font-body)] text-[26px] leading-snug">
            Rocket Lab’s founder and CEO
          </p>
        </figcaption>
      </figure>

      <div className="mt-10 flex min-h-[140px] flex-1 items-center">
        <svg
          aria-hidden="true"
          viewBox="0 0 952 140"
          className="h-[140px] w-full"
          fill="none"
        >
          <path
            d="M0 70H952"
            stroke="var(--border)"
            strokeWidth="1"
            strokeDasharray="4 10"
          />

          <g stroke="var(--border)" strokeWidth="2">
            <path d="M0 14H235C330 14 360 56 452 56" />
            <path d="M0 42H225C325 42 365 63 452 63" />
            <path d="M0 98H225C325 98 365 77 452 77" />
            <path d="M0 126H235C330 126 360 84 452 84" />
          </g>

          <path
            d="M476 0V47M476 93V140"
            stroke="var(--ink)"
            strokeWidth="3"
          />
          <path
            d="M492 0V47M492 93V140"
            stroke="var(--border)"
            strokeWidth="1"
          />

          <rect
            x="456"
            y="48"
            width="56"
            height="44"
            rx="22"
            fill="var(--surface)"
          />

          <path
            d="M0 70H862"
            stroke="var(--accent)"
            strokeWidth="4"
          />
          <path
            d="M846 58L864 70L846 82"
            stroke="var(--accent)"
            strokeWidth="4"
            strokeLinejoin="miter"
          />

          <circle cx="484" cy="70" r="7" fill="var(--accent)" />

          <g stroke="var(--border)" strokeWidth="1">
            <path d="M80 132V140M160 132V140M240 132V140M320 132V140" />
            <path d="M632 132V140M712 132V140M792 132V140M872 132V140" />
          </g>
        </svg>
      </div>

      <div className="mt-6 grid grid-cols-[64px_minmax(0,1fr)] gap-6 border-t border-[var(--border)] pt-6">
        <div
          aria-hidden="true"
          className="mt-3 h-[3px] w-12 bg-[var(--accent)]"
        />
        <p className="max-w-[790px] font-[var(--font-body)] text-[28px] leading-snug">
          His assessment follows higher Neutron pricing and Rocket Lab’s launch
          backlog.
        </p>
      </div>
    </section>
  );
}
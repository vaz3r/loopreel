import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

export default function Slide07({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  return (
    <section
      data-slide-id={slide.id}
      className="relative flex h-[1028px] w-full max-w-[952px] flex-col text-[var(--ink)]"
    >
      <header className="border-b border-[var(--border)] pb-7">
        <h1 className="max-w-[880px] font-[var(--font-headline)] text-5xl font-semibold leading-[1.08] tracking-[-0.045em]">
          Good Laptop. Awkward Position.
        </h1>
      </header>

      <figure className="m-0 flex flex-1 flex-col justify-center py-10">
        <div className="grid grid-cols-[72px_1fr] gap-5">
          <svg
            aria-hidden="true"
            viewBox="0 0 72 72"
            fill="currentColor"
            className="mt-2 h-[72px] w-[72px] text-[var(--accent)]"
          >
            <path d="M6 58V36C6 20 14 10 29 6v10c-9 4-13 10-13 19h15v23H6Zm36 0V36C42 20 50 10 65 6v10c-9 4-13 10-13 19h15v23H42Z" />
          </svg>

          <div>
            <blockquote className="m-0 font-[var(--font-headline)] text-[76px] font-medium leading-[1.055] tracking-[-0.055em]">
              <span className="block">this isn’t a bad</span>
              <span className="block">laptop, but it is an</span>
              <span className="block text-[var(--accent)]">awkwardly</span>
              <span className="block text-[var(--accent)]">
                positioned one.
              </span>
            </blockquote>

            <figcaption className="mt-9 flex items-center gap-5">
              <span
                aria-hidden="true"
                className="h-px w-12 bg-[var(--accent)]"
              />
              <div className="flex flex-col gap-1">
                <span className="font-[var(--font-body)] text-xl font-semibold leading-tight">
                  Staff Bureau
                </span>
                <span className="font-[var(--font-mono)] text-sm leading-normal">
                  Review author
                </span>
              </div>
            </figcaption>
          </div>
        </div>
      </figure>

      <div className="grid min-h-[236px] grid-cols-[1.15fr_0.85fr] items-center gap-8 border-t border-[var(--border)] py-6">
        <p className="m-0 max-w-[500px] font-[var(--font-body)] text-[26px] leading-[1.35] tracking-[-0.025em]">
          The reviewer questions whether the Pro delivers{' '}
          <span className="font-semibold text-[var(--accent)]">
            $500 to $700
          </span>{' '}
          more value than the Air.
        </p>

        <svg
          aria-hidden="true"
          viewBox="0 0 360 188"
          fill="none"
          className="h-[188px] w-full"
        >
          {/* An intentionally off-center machine on a narrow plinth. */}
          <path
            d="M12 164H348"
            stroke="var(--border)"
            strokeWidth="1"
          />
          <path
            d="M182 119H284V164H182Z"
            fill="var(--surface)"
            stroke="var(--border)"
            strokeWidth="1.5"
          />
          <path
            d="M194 130H272M194 140H272M194 150H272"
            stroke="var(--border)"
            strokeWidth="1"
          />

          {/* Ghosted alignment establishes the awkward displacement. */}
          <path
            d="M233 13V177"
            stroke="var(--border)"
            strokeWidth="1"
            strokeDasharray="3 6"
          />
          <path
            d="M70 119V157M70 151H174"
            stroke="var(--accent)"
            strokeWidth="1.5"
            strokeDasharray="4 5"
          />
          <circle cx="70" cy="119" r="3.5" fill="var(--accent)" />

          {/* Laptop elevation, drawn with restrained industrial detail. */}
          <path
            d="M53 22H239C243.418 22 247 25.582 247 30V105H45V30C45 25.582 48.582 22 53 22Z"
            fill="var(--surface)"
            stroke="var(--ink)"
            strokeWidth="2"
          />
          <path
            d="M54 31H238V96H54Z"
            stroke="var(--border)"
            strokeWidth="1"
          />
          <path
            d="M130 31H162V35H130Z"
            fill="var(--ink)"
          />
          <path
            d="M27 105H265L257 114C254.5 117 251 119 247 119H45C41 119 37.5 117 35 114L27 105Z"
            fill="var(--surface)"
            stroke="var(--ink)"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <path
            d="M124 105V109H168V105"
            stroke="var(--ink)"
            strokeWidth="1.5"
          />
          <path
            d="M182 119H264"
            stroke="var(--accent)"
            strokeWidth="3"
          />
        </svg>
      </div>
    </section>
  );
}
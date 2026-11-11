import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

export default function Slide05({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  void brand;
  void totalSlides;

  return (
    <section
      data-slide-id={slide.id}
      className="flex h-full min-h-0 flex-col justify-center gap-9 text-[var(--ink)]"
    >
      <div className="flex items-center gap-6" aria-hidden="true">
        <svg
          viewBox="0 0 64 48"
          className="h-12 w-16 shrink-0 text-[var(--accent)]"
          fill="currentColor"
        >
          <path d="M0 48V28C0 11 9 2 26 0v10C16 12 12 17 12 25h14v23H0Zm38 0V28C38 11 47 2 64 0v10C54 12 50 17 50 25h14v23H38Z" />
        </svg>
        <div className="h-px flex-1 bg-[var(--border)]" />
      </div>

      <figure className="m-0 flex min-h-0 flex-col gap-8">
        <blockquote className="m-0 max-w-[920px] font-[var(--font-headline)] text-[82px] font-semibold leading-[1.04] tracking-[-0.055em]">
          <span className="block">It’s an exciting year</span>
          <span className="block">for the MacBook Pro!</span>
          <span className="mt-5 block text-[var(--accent)]">
            Just not for this
          </span>
          <span className="block text-[var(--accent)]">MacBook Pro.</span>
        </blockquote>

        <figcaption className="grid grid-cols-[5px_1fr] gap-5">
          <div className="bg-[var(--accent)]" aria-hidden="true" />
          <div className="flex flex-col gap-2">
            <p className="m-0 font-[var(--font-body)] text-[28px] font-semibold leading-tight">
              Staff Bureau
            </p>
            <p className="m-0 font-[var(--font-mono)] text-[17px] leading-relaxed opacity-65">
              Reviewer, according to the supplied byline
            </p>
          </div>
        </figcaption>
      </figure>

      <div className="grid grid-cols-[1.1fr_0.9fr] items-center gap-9 border-t border-[var(--border)] pt-7">
        <svg
          viewBox="0 0 500 230"
          fill="none"
          aria-hidden="true"
          className="block w-full text-[var(--ink)]"
        >
          {/* A second silhouette sits beyond the foreground machine. */}
          <g stroke="var(--accent)" strokeWidth="1.5" opacity="0.5">
            <rect x="186" y="15" width="264" height="161" rx="9" />
            <rect
              x="197"
              y="26"
              width="242"
              height="139"
              rx="3"
              strokeDasharray="4 6"
            />
            <path d="M177 176H460L482 191H303" />
            <path d="M450 15L478 1M450 176L478 204" strokeDasharray="3 5" />
          </g>

          {/* Foreground device: deliberately solid and visually earthbound. */}
          <rect
            x="35"
            y="57"
            width="286"
            height="164"
            rx="10"
            fill="var(--surface)"
            stroke="var(--border)"
            strokeWidth="2"
          />
          <rect
            x="47"
            y="69"
            width="262"
            height="139"
            rx="3"
            fill="var(--paper, #0A0E17)"
            stroke="var(--border)"
          />
          <circle cx="178" cy="63" r="2" fill="var(--border)" />

          <g stroke="var(--border)" strokeWidth="1">
            <path d="M47 115H309M47 162H309M112 69V208M178 69V208M244 69V208" />
            <path d="M47 208L309 69" strokeDasharray="3 6" />
          </g>

          <path
            d="M35 221H321L345 229H11L35 221Z"
            fill="var(--surface)"
            stroke="var(--border)"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          <path d="M151 221H205" stroke="currentColor" strokeOpacity="0.4" />

          <circle cx="244" cy="115" r="17" fill="var(--accent)" />
          <path
            d="M237 115H251"
            stroke="var(--paper, #0A0E17)"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>

        <p className="m-0 max-w-[360px] font-[var(--font-body)] text-[25px] leading-[1.4] tracking-[-0.015em] opacity-75">
          The reviewer contrasts this entry-level refresh with newer flagship
          models.
        </p>
      </div>
    </section>
  );
}
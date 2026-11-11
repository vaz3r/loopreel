import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

export default function Slide11({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  return (
    <section className="flex h-full min-h-0 w-full flex-col justify-center text-[var(--ink)]">
      <div className="relative flex w-full flex-col py-8">
        <div className="mb-14 flex items-center gap-5">
          <span
            aria-hidden="true"
            className="h-3 w-3 shrink-0 bg-[var(--accent)]"
          />
          <h1 className="font-[var(--font-headline)] text-[44px] font-medium leading-[1.12] tracking-[-0.035em]">
            Access is not infrastructure
          </h1>
        </div>

        <figure className="m-0">
          <blockquote className="relative m-0 border-l-2 border-[var(--accent)] py-2 pl-12">
            <p className="max-w-[850px] font-[var(--font-headline)] text-[78px] font-medium leading-[1.1] tracking-[-0.045em]">
              <span className="block">“Open weights</span>
              <span className="block">change who</span>
              <span className="block">can deploy.</span>
              <span className="block text-[var(--accent)]">
                They do not erase
              </span>
              <span className="block text-[var(--accent)]">
                the compute bill.”
              </span>
            </p>
          </blockquote>

          <figcaption className="mt-9 pl-12 font-[var(--font-mono)] text-[20px] leading-[1.5] tracking-[-0.025em]">
            The Compute Review — editorial
          </figcaption>
        </figure>

        <div
          aria-hidden="true"
          className="mt-14 border-t border-[var(--border)] pt-7"
        >
          <svg
            viewBox="0 0 952 140"
            fill="none"
            className="block h-[140px] w-full"
          >
            {/* An open access point; the physical infrastructure persists. */}
            <path
              d="M18 110V28H106M18 110H106"
              stroke="var(--accent)"
              strokeWidth="2"
            />
            <path
              d="M56 69H242"
              stroke="var(--accent)"
              strokeWidth="2"
            />
            <path
              d="M229 56L242 69L229 82"
              stroke="var(--accent)"
              strokeWidth="2"
            />
            <circle cx="56" cy="69" r="5" fill="var(--accent)" />

            <path
              d="M264 69H310M310 69V27H348M310 69H348M310 69V111H348"
              stroke="var(--border)"
              strokeWidth="2"
            />

            {[348, 500, 652, 804].map((x) => (
              <g key={x}>
                <rect
                  x={x}
                  y="12"
                  width="128"
                  height="114"
                  rx="3"
                  fill="var(--surface)"
                  stroke="var(--border)"
                />
                {[27, 55, 83].map((y) => (
                  <g key={y}>
                    <rect
                      x={x + 12}
                      y={y}
                      width="104"
                      height="22"
                      stroke="var(--border)"
                    />
                    <path
                      d={`M${x + 23} ${y + 8}H${x + 65}M${x + 23} ${y + 14}H${x + 50}`}
                      stroke="var(--border)"
                    />
                    <circle
                      cx={x + 103}
                      cy={y + 11}
                      r="2"
                      fill="var(--accent)"
                    />
                  </g>
                ))}
              </g>
            ))}

            <path
              d="M476 69H500M628 69H652M780 69H804"
              stroke="var(--border)"
              strokeWidth="2"
            />
            <path
              d="M348 139H932"
              stroke="var(--border)"
              strokeWidth="2"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}
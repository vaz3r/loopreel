import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

export default function Slide05({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  return (
    <section className="flex h-full min-h-0 flex-col justify-center gap-9 text-[var(--ink)]">
      <figure className="relative m-0 border-l-2 border-[var(--accent)] pl-10">
        <svg
          aria-hidden="true"
          viewBox="0 0 80 60"
          className="mb-5 h-12 w-16 text-[var(--accent)]"
          fill="currentColor"
        >
          <path d="M0 60V34C0 15 10 4 30 0v12C19 16 14 22 14 31h18v29H0Zm46 0V34C46 15 56 4 76 0v12C65 16 60 22 60 31h18v29H46Z" />
        </svg>

        <blockquote className="m-0 max-w-[850px] font-[var(--font-headline)] text-[86px] font-semibold leading-[0.99] tracking-[-0.055em]">
          <span className="block">privacy and</span>
          <span className="block">security without</span>
          <span className="block text-[var(--accent)]">compromise</span>
        </blockquote>

        <figcaption className="mt-7 flex items-center gap-5">
          <span className="font-[var(--font-body)] text-[26px] font-semibold">
            Amazon
          </span>
          <span
            aria-hidden="true"
            className="h-5 w-px bg-[var(--border)]"
          />
          <span className="font-[var(--font-mono)] text-[18px] text-[var(--ink)] opacity-60">
            Product promoter
          </span>
        </figcaption>
      </figure>

      <div className="relative border-y border-[var(--border)] bg-[var(--surface)] px-7 py-3">
        <svg
          aria-hidden="true"
          viewBox="0 0 880 190"
          className="block h-[190px] w-full"
          fill="none"
        >
          {/* Endpoint brackets establish the promised private connection. */}
          <g stroke="var(--border)" strokeWidth="1.5">
            <path d="M40 35H20v120h20M840 35h20v120h-20" />
            <path d="M20 95h840" strokeDasharray="2 10" />
            <path d="M440 12v166" strokeDasharray="2 8" />
            <circle cx="440" cy="95" r="77" />
          </g>

          {/* Two endpoints, deliberately separated by an interrupted route. */}
          <g
            stroke="var(--ink)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="67" y="62" width="74" height="54" rx="6" />
            <path d="M104 116v14m-22 0h44" />
            <circle cx="104" cy="88" r="7" />

            <rect x="739" y="62" width="74" height="54" rx="6" />
            <path d="M776 116v14m-22 0h44" />
            <circle cx="776" cy="88" r="7" />
          </g>

          <g stroke="var(--accent)" strokeWidth="2.5">
            <path d="M159 89h172" />
            <path d="M549 89h172" strokeDasharray="7 9" />
            <circle cx="159" cy="89" r="4" fill="var(--accent)" />
            <circle cx="721" cy="89" r="4" fill="var(--accent)" />
          </g>

          {/* The displaced halves make the visual contradiction explicit. */}
          <g
            stroke="var(--accent)"
            strokeWidth="3"
            strokeLinecap="square"
            strokeLinejoin="miter"
          >
            <path d="M425 51h-4c-16 0-28 12-28 28v9h-14v51h45" />
            <path d="M450 57h4c16 0 28 12 28 28v9h14v51h-45" />
            <path d="M393 88h31m27 6h31" />
          </g>

          <path
            d="m446 32-17 44 19 20-20 62"
            stroke="var(--ink)"
            strokeWidth="2"
          />

          <g stroke="var(--border)" strokeWidth="1.5">
            <path d="M338 80v18m204-18v18" />
            <path d="M60 160h260m240 0h260" />
          </g>
        </svg>
      </div>

      <div className="grid grid-cols-[40px_1fr] items-start gap-6">
        <svg
          aria-hidden="true"
          viewBox="0 0 40 40"
          className="mt-1 h-10 w-10 text-[var(--accent)]"
          fill="none"
        >
          <path
            d="M7 10h23v23M30 10 8 32"
            stroke="currentColor"
            strokeWidth="2"
          />
        </svg>

        <p className="m-0 max-w-[820px] font-[var(--font-body)] text-[35px] leading-[1.28] tracking-[-0.025em]">
          EFF says Throw Away the Key Encryption{' '}
          <span className="underline decoration-[var(--accent)] decoration-[2px] underline-offset-[7px]">
            falls well short
          </span>{' '}
          of end-to-end encryption.
        </p>
      </div>
    </section>
  );
}
import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

export default function Slide09({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  return (
    <section className="flex flex-col h-full min-h-0 w-full text-[var(--ink)]">
      <header className="shrink-0">
        <div className="mb-7 h-[6px] w-20 bg-[var(--accent)]" />

        <h1 className="font-[var(--font-headline)] text-[64px] font-bold leading-[1.04] tracking-[-0.045em]">
          The Next Air
          <br />
          Complicates Everything
        </h1>

        <p className="mt-6 max-w-[870px] font-[var(--font-body)] text-[28px] leading-snug">
          An M6 MacBook Air is expected, not announced in the supplied
          review.
        </p>
      </header>

      <div className="mt-9 grid min-h-0 flex-1 grid-rows-2 gap-6">
        <article className="grid grid-cols-[220px_minmax(0,1fr)] items-center gap-8 border border-[var(--border)] bg-[var(--surface)] px-8 py-6">
          <div className="flex h-full items-center justify-center border-r border-[var(--border)] pr-7">
            <svg
              viewBox="0 0 200 280"
              className="h-[280px] w-full text-[var(--ink)]"
              fill="none"
              aria-hidden="true"
              focusable="false"
            >
              <path
                d="M49 92V31M100 76V15M151 92V31"
                stroke="var(--accent)"
                strokeWidth="3"
                strokeLinecap="round"
                strokeDasharray="5 8"
              />
              <path
                d="m42 39 7-8 7 8M93 23l7-8 7 8m44 16 7-8 7 8"
                stroke="var(--accent)"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              <rect
                x="19"
                y="104"
                width="162"
                height="113"
                rx="12"
                stroke="currentColor"
                strokeWidth="2"
              />
              <rect
                x="29"
                y="114"
                width="142"
                height="93"
                rx="6"
                stroke="var(--border)"
                strokeWidth="2"
              />

              <circle
                cx="100"
                cy="160"
                r="35"
                stroke="currentColor"
                strokeWidth="2"
              />
              <circle
                cx="100"
                cy="160"
                r="9"
                fill="var(--accent)"
              />

              {[0, 60, 120, 180, 240, 300].map((rotation) => (
                <path
                  key={rotation}
                  d="M104 148C119 126 130 139 127 151C120 155 113 154 108 153"
                  transform={`rotate(${rotation} 100 160)`}
                  fill="var(--accent)"
                  fillOpacity="0.16"
                  stroke="var(--accent)"
                  strokeWidth="1.5"
                />
              ))}

              <path
                d="M19 230h162M30 242h140M42 254h116"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M38 128v64m124-64v64"
                stroke="var(--border)"
                strokeWidth="3"
                strokeDasharray="2 6"
              />
            </svg>
          </div>

          <div className="min-w-0">
            <h2 className="font-[var(--font-headline)] text-[36px] font-semibold leading-[1.12] tracking-[-0.025em]">
              Cooling could preserve an advantage
            </h2>

            <div className="my-5 h-[3px] w-12 bg-[var(--accent)]" />

            <p className="font-[var(--font-body)] text-[27px] leading-snug">
              The reviewer expects Pro leadership in sustained workloads;
              comparison remains prospective.
            </p>
          </div>
        </article>

        <article className="grid grid-cols-[220px_minmax(0,1fr)] items-center gap-8 border border-[var(--border)] px-8 py-6">
          <div className="flex h-full items-center justify-center border-r border-[var(--border)] pr-7">
            <svg
              viewBox="0 0 200 280"
              className="h-[280px] w-full text-[var(--ink)]"
              fill="none"
              aria-hidden="true"
              focusable="false"
            >
              <rect
                x="27"
                y="27"
                width="126"
                height="76"
                rx="5"
                fill="var(--surface)"
                stroke="currentColor"
                strokeWidth="2"
              />
              <path
                d="M35 35h110v59H35z"
                stroke="var(--border)"
                strokeWidth="1.5"
              />
              <path
                d="M15 111h150l-9 9H24l-9-9Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinejoin="round"
              />

              <path
                d="M175 124v48m-6-40 6-8 6 8m-12 32 6 8 6-8"
                stroke="var(--accent)"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M25 146h126"
                stroke="var(--border)"
                strokeWidth="1.5"
                strokeDasharray="4 7"
              />

              <rect
                x="27"
                y="184"
                width="126"
                height="64"
                rx="5"
                stroke="currentColor"
                strokeWidth="2"
              />
              <path
                d="M35 192h110v48H35z"
                stroke="var(--border)"
                strokeWidth="1.5"
              />
              <path
                d="M15 256h150l-9 5H24l-9-5Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinejoin="round"
              />

              <path
                d="M52 66h76"
                stroke="var(--accent)"
                strokeWidth="4"
                strokeLinecap="round"
              />
              <path
                d="M68 216h44"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>
          </div>

          <div className="min-w-0">
            <h2 className="font-[var(--font-headline)] text-[36px] font-semibold leading-[1.12] tracking-[-0.025em]">
              The premium already faces scrutiny
            </h2>

            <div className="my-5 h-[3px] w-12 bg-[var(--accent)]" />

            <p className="font-[var(--font-body)] text-[27px] leading-snug">
              The reviewer questions{' '}
              <span className="font-semibold text-[var(--accent)]">
                $500 to $700 extra
              </span>{' '}
              over current Air models.
            </p>
          </div>
        </article>
      </div>
    </section>
  );
}
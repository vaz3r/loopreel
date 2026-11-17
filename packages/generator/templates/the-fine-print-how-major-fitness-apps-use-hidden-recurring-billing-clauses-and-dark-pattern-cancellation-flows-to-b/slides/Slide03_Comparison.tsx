import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';
import { Tag, Repeat2, Search } from 'lucide-react';

export default function Slide03({ slide, brand, totalSlides }: SlideComponentProps) {
  const items = slide.items ?? [];

  return (
    <section className="flex h-full min-h-0 w-full flex-col justify-between py-5 px-1 text-[var(--ink)]">
      <header className="mb-3 shrink-0">
        <div className="mb-5 flex items-center gap-3">
          <span
            aria-hidden="true"
            className="h-3 w-3 shrink-0 bg-[var(--accent)]"
          />
          <p className="font-[var(--font-mono)] text-[20px] uppercase tracking-[0.16em]">
            THE HIDDEN COMMITMENT
          </p>
        </div>

        <h1 className="max-w-[900px] font-[var(--font-headline)] text-[58px] font-bold leading-[1.04] tracking-tight">
          One-Time Offer.
          <br />
          Recurring Payments.
        </h1>

        <p className="mt-5 max-w-[860px] font-[var(--font-body)] text-[26px] leading-snug">
          The FTC alleged Genesis Tech buried the continuing payment commitment.
        </p>
      </header>

      <div className="relative my-3 flex min-h-0 flex-1 items-center justify-center overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-5 left-[40%] top-5 border-r border-[var(--border)]"
        />

        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 952 420"
          role="img"
          aria-label="Conceptual comparison: a prominent offer on the left, with a magnifying glass exposing recurring-payment fine print on the right."
          className="block h-full max-h-[470px] w-full"
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Registration marks frame the evidence, not the slide. */}
          <g
            fill="none"
            stroke="var(--border)"
            strokeWidth="2"
            aria-hidden="true"
          >
            <path d="M22 45V25h20M330 25h20v20M22 375v20h20" />
            <path d="M430 45V25h20M910 25h20v20M910 395h20v-20" />
          </g>

          {/* A physical offer sheet, with oversized typographic marks. */}
          <g transform="rotate(-4 190 215)">
            <path
              d="M64 58H270L312 100V358H64Z"
              fill="var(--surface)"
            />
            <path
              d="M270 58V100H312"
              fill="none"
              stroke="var(--border)"
              strokeWidth="2"
            />

            <Tag
              x={88}
              y={82}
              width={64}
              height={64}
              stroke="var(--accent)"
              strokeWidth={1.5}
              aria-hidden="true"
            />

            <g fill="var(--ink)">
              <path d="M88 174H285V202H88Z" />
              <path d="M88 216H245V244H88Z" />
            </g>

            <path
              d="M87 263Q180 254 287 260"
              fill="none"
              stroke="var(--accent)"
              strokeWidth="4"
              strokeLinecap="round"
            />

            <g
              stroke="var(--ink)"
              strokeOpacity="0.4"
              strokeWidth="3"
            >
              <path d="M88 308H263M88 321H223" />
            </g>
          </g>

          {/* The reverse-side terms: visually quiet, not readable microcopy. */}
          <path
            d="M460 58H818L860 100V358H460Z"
            fill="var(--surface)"
          />
          <path
            d="M818 58V100H860"
            fill="none"
            stroke="var(--border)"
            strokeWidth="2"
          />

          <g
            fill="none"
            stroke="var(--ink)"
            strokeOpacity="0.18"
            strokeWidth="3"
          >
            <path d="M490 103H735M490 118H690" />
            <path d="M490 164H820M490 179H795M490 194H810" />
            <path d="M490 209H755M490 224H804" />
          </g>

          <g
            fill="none"
            stroke="var(--ink)"
            strokeOpacity="0.55"
            strokeWidth="2"
          >
            <path d="M490 288H665M490 297H650M490 306H671" />
            <path d="M490 315H635M490 324H662" />
          </g>

          {/* An investigative lens reveals the repeating obligation. */}
          <circle cx="755" cy="283" r="77" fill="var(--surface)" />
          <Search
            x={654}
            y={182}
            width={235}
            height={235}
            stroke="var(--accent)"
            strokeWidth={1.25}
            aria-hidden="true"
          />
          <Repeat2
            x={713}
            y={242}
            width={82}
            height={82}
            stroke="var(--ink)"
            strokeWidth={1.5}
            aria-hidden="true"
          />

          <path
            d="M615 339Q649 354 684 336"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </div>

      <div className="shrink-0 border-t border-[var(--border)] pt-4">
        <div className="grid grid-cols-[2fr_3fr]">
          <article className="border-r border-[var(--border)] pr-8">
            <div className="mb-3 flex items-center gap-3">
              <Tag
                aria-hidden="true"
                className="h-6 w-6 shrink-0 text-[var(--ink)]"
                strokeWidth={1.5}
              />
              <h2 className="font-[var(--font-headline)] text-[28px] font-semibold leading-tight">
                {items[0]?.label ?? 'Prominent Promise'}
              </h2>
            </div>
            <p className="font-[var(--font-body)] text-[24px] leading-snug">
              {items[0]?.body ??
                'Free or low, one-time-cost offers drew customers in.'}
            </p>
          </article>

          <article className="pl-8">
            <div className="mb-3 flex items-center gap-3">
              <Repeat2
                aria-hidden="true"
                className="h-7 w-7 shrink-0 text-[var(--accent)]"
                strokeWidth={1.5}
              />
              <h2 className="font-[var(--font-headline)] text-[28px] font-semibold leading-tight">
                {items[1]?.label ?? 'Smallest Print'}
              </h2>
            </div>
            <p className="font-[var(--font-body)] text-[24px] leading-snug">
              {items[1]?.body ??
                'Recurring-payment terms appeared in the smallest print, the FTC alleged.'}
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}
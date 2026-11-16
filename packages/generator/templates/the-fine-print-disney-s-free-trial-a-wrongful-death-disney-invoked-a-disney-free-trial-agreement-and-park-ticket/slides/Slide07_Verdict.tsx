import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';
import {
  ArrowDownToLine,
  Bookmark,
  Check,
  FileText,
  Scale,
} from 'lucide-react';

export default function Slide07({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  const items = slide.items ?? [];

  return (
    <section className="flex h-full min-h-0 w-full flex-col justify-between py-8 px-2 text-[var(--ink)]">
      <header className="shrink-0">
        <div className="mb-5 flex items-center justify-between border-b border-[var(--border)] pb-4">
          <p className="font-[var(--font-mono)] text-[20px] font-medium uppercase tracking-[0.14em] text-[var(--accent)]">
            THE CONSUMER PLAYBOOK
          </p>
          <span className="font-[var(--font-mono)] text-[20px] tabular-nums">
            07 / {String(totalSlides).padStart(2, '0')}
          </span>
        </div>

        <h1 className="max-w-[880px] font-[var(--font-headline)] text-[58px] font-bold leading-[1.04] tracking-tight">
          Save the Click.
          <br />
          Question Its Reach.
        </h1>

        <p className="mt-5 max-w-[820px] font-[var(--font-body)] text-[26px] leading-snug">
          Scrutinize the route to accountability, not just possible damages.
        </p>
      </header>

      <div className="relative flex min-h-0 flex-1 items-center justify-center overflow-hidden">
        <svg
          viewBox="0 0 952 420"
          preserveAspectRatio="xMidYMid meet"
          className="h-full max-h-[420px] w-full"
          fill="none"
          role="img"
          aria-label="A preserved agreement leads to scrutiny of the legal process, represented by balanced scales."
        >
          {/* A folded agreement, with a retained copy underneath. */}
          <g transform="rotate(-6 245 175)">
            <path
              d="M143 74H312L355 117V300H143Z"
              className="stroke-[var(--border)]"
              strokeWidth="2"
            />
            <path
              d="M159 57H323L368 102V284H159Z"
              className="fill-[var(--surface)] stroke-[var(--ink)]"
              strokeWidth="2"
              strokeLinejoin="round"
            />
            <path
              d="M323 57V102H368"
              className="stroke-[var(--ink)]"
              strokeWidth="2"
              strokeLinejoin="round"
            />

            <FileText
              x={185}
              y={83}
              width={48}
              height={48}
              strokeWidth={1.5}
              className="text-[var(--ink)]"
            />

            <path
              d="M185 157H338M185 181H323M185 229H306M185 253H278"
              className="stroke-[var(--border)]"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <path
              d="M182 205H329"
              className="stroke-[var(--accent)]"
              strokeWidth="13"
              opacity="0.2"
            />
            <path
              d="M185 205H326"
              className="stroke-[var(--accent)]"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </g>

          {/* The evidence is retained; its legal reach is questioned. */}
          <ArrowDownToLine
            x={308}
            y={249}
            width={54}
            height={54}
            strokeWidth={1.5}
            className="text-[var(--accent)]"
          />

          <path
            d="M410 173C464 140 508 140 558 173"
            className="stroke-[var(--accent)]"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M544 156L559 174L537 179"
            className="stroke-[var(--accent)]"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          <Scale
            x={612}
            y={76}
            width={190}
            height={190}
            strokeWidth={1.15}
            className="text-[var(--ink)]"
          />
          <path
            d="M611 287H803"
            className="stroke-[var(--border)]"
            strokeWidth="2"
          />
          <path
            d="M679 287H735"
            className="stroke-[var(--accent)]"
            strokeWidth="3"
          />
        </svg>

        <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
          <div className="rotate-[-2deg] whitespace-nowrap border-2 border-[var(--accent)] bg-[var(--paper,#0B0E14)] px-5 py-2 font-[var(--font-mono)] text-[24px] font-semibold uppercase tracking-[0.12em] text-[var(--accent)]">
            Question the reach
          </div>
        </div>
      </div>

      <footer className="shrink-0">
        <div className="border-t border-[var(--border)]">
          {items.map((item, index) => (
            <div
              key={`${index}-${item.label}`}
              className="grid grid-cols-[36px_210px_minmax(0,1fr)] items-start gap-x-5 border-b border-[var(--border)] py-5"
            >
              <Check
                aria-hidden="true"
                className="mt-1 h-7 w-7 text-[var(--accent)]"
                strokeWidth={1.75}
              />
              <h2 className="font-[var(--font-headline)] text-[28px] font-semibold leading-tight">
                {item.label}
              </h2>
              <p className="font-[var(--font-body)] text-[24px] leading-snug">
                {item.body}
              </p>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between gap-5 pt-5">
          <div className="flex items-center gap-3">
            <Bookmark
              aria-hidden="true"
              className="h-6 w-6 shrink-0 text-[var(--accent)]"
              strokeWidth={1.75}
            />
            <span className="font-[var(--font-mono)] text-[20px] uppercase tracking-[0.06em]">
              Save this playbook
            </span>
          </div>
          <span className="font-[var(--font-mono)] text-[20px]">
            thefineprint.pub
          </span>
        </div>
      </footer>
    </section>
  );
}
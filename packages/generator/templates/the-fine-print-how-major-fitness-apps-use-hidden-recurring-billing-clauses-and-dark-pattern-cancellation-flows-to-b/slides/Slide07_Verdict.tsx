import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';
import { Bookmark, CreditCard, Flag } from 'lucide-react';

export default function Slide07({ slide, brand, totalSlides }: SlideComponentProps) {
  const items = slide.items ?? [];
  void brand;
  void totalSlides;

  return (
    <section className="flex h-full min-h-0 w-full flex-col justify-between px-1 py-5 text-[var(--ink)]">
      <header className="mb-3 shrink-0">
        <div className="mb-5 flex items-center gap-3">
          <span
            aria-hidden="true"
            className="h-3 w-3 shrink-0 bg-[var(--accent)]"
          />
          <p className="font-[var(--font-mono)] text-[20px] font-medium uppercase tracking-[0.16em]">
            {slide.kicker ?? 'YOUR EXIT PLAYBOOK'}
          </p>
        </div>

        <h1 className="max-w-[900px] font-[var(--font-headline)] text-[58px] font-bold leading-[1.04] tracking-tight">
          {slide.headline ?? 'Cancel. Save Proof. Check Again.'}
        </h1>

        <p className="mt-5 max-w-[890px] font-[var(--font-body)] text-[26px] leading-snug">
          {slide.subheadline ??
            'Follow exit instructions. Save requests and chats. Check statements.'}
        </p>
      </header>

      <div className="relative my-3 flex min-h-0 flex-1 items-center justify-center overflow-hidden">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 952 420"
          preserveAspectRatio="xMidYMid meet"
          role="img"
          aria-label="Preserve cancellation evidence and inspect later account statements."
          className="block h-full max-h-[420px] w-full"
        >
          {/* Folded evidence sheet: a physical document, not a UI card. */}
          <g transform="rotate(-5 300 210)">
            <path
              d="M155 30H376L435 89V385H155Z"
              fill="var(--surface)"
              stroke="var(--ink)"
              strokeWidth="2.5"
            />
            <path
              d="M376 30V89H435"
              fill="none"
              stroke="var(--ink)"
              strokeWidth="2.5"
            />

            <path
              d="M194 112L213 131L254 87"
              fill="none"
              stroke="var(--ink)"
              strokeWidth="7"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            <g
              fill="none"
              stroke="var(--ink)"
              strokeWidth="4"
              strokeLinecap="square"
            >
              <path d="M194 177H389" opacity="0.85" />
              <path d="M194 210H389" opacity="0.65" />
              <path d="M194 243H352" opacity="0.65" />
              <path d="M194 276H370" opacity="0.65" />
              <path d="M194 329H272" opacity="0.4" />
            </g>

            <path
              d="M187 287Q278 282 374 287"
              fill="none"
              stroke="var(--accent)"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </g>

          {/* Magnifier isolates the statement lines for a second check. */}
          <path
            d="M502 324L571 391"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="19"
            strokeLinecap="round"
          />
          <circle
            cx="439"
            cy="260"
            r="91"
            fill="var(--surface)"
            stroke="var(--accent)"
            strokeWidth="8"
          />
          <g
            fill="none"
            stroke="var(--ink)"
            strokeWidth="5"
            strokeLinecap="square"
          >
            <path d="M386 230H493" />
            <path d="M386 260H493" />
            <path d="M386 290H458" />
          </g>
          <path
            d="M379 302Q418 298 466 302"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="3"
            strokeLinecap="round"
          />

          {/* A restrained annotation leader ties the seal to the evidence. */}
          <path
            d="M534 167C568 135 593 126 625 126"
            fill="none"
            stroke="var(--border)"
            strokeWidth="2"
          />
        </svg>

        <div className="absolute right-[5%] top-[22%] flex rotate-[-2deg] items-center gap-3 border-2 border-[var(--accent)] px-4 py-3 text-[var(--accent)]">
          <Bookmark
            aria-hidden="true"
            className="h-7 w-7 shrink-0"
            strokeWidth={1.8}
          />
          <span className="font-[var(--font-mono)] text-[22px] font-bold uppercase tracking-[0.08em]">
            Save proof
          </span>
        </div>
      </div>

      <div className="shrink-0 border-t border-[var(--border)] pt-4">
        <article className="grid grid-cols-[44px_260px_minmax(0,1fr)] items-start gap-x-5 pb-5">
          <CreditCard
            aria-hidden="true"
            className="mt-1 h-8 w-8 text-[var(--accent)]"
            strokeWidth={1.6}
          />
          <h2 className="font-[var(--font-headline)] text-[28px] font-semibold leading-tight">
            {items[0]?.label ?? 'Dispute Charges'}
          </h2>
          <p className="font-[var(--font-body)] text-[24px] leading-snug">
            {items[0]?.body ??
              'Contact your card issuer online or by phone; follow up in writing.'}
          </p>
        </article>

        <article className="grid grid-cols-[44px_260px_minmax(0,1fr)] items-start gap-x-5 border-t border-[var(--border)] pt-5">
          <Flag
            aria-hidden="true"
            className="mt-1 h-8 w-8 text-[var(--accent)]"
            strokeWidth={1.6}
          />
          <h2 className="font-[var(--font-headline)] text-[28px] font-semibold leading-tight">
            {items[1]?.label ?? 'Report Subscriptions'}
          </h2>
          <p className="font-[var(--font-body)] text-[24px] leading-snug">
            {items[1]?.body ??
              'Report: ReportFraud.ftc.gov or your state attorney general.'}
          </p>
        </article>
      </div>
    </section>
  );
}
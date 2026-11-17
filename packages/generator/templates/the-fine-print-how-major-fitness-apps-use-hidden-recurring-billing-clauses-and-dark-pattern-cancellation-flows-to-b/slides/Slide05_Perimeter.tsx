import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';
import { CheckCheck, CreditCard, LogOut } from 'lucide-react';

export default function Slide05({ slide, brand, totalSlides }: SlideComponentProps) {
  const items = slide.items ?? [];
  void brand;
  void totalSlides;

  return (
    <section className="flex h-full min-h-0 w-full flex-col justify-between py-5 px-1 text-[var(--ink)]">
      <header className="mb-3 shrink-0">
        <div className="mb-5 flex items-center gap-3">
          <span
            aria-hidden="true"
            className="h-3 w-3 shrink-0 bg-[var(--accent)]"
          />
          <p className="font-[var(--font-mono)] text-[20px] uppercase tracking-[0.12em]">
            THE RECURRING-PAYMENT RISK
          </p>
        </div>

        <h1 className="max-w-[920px] font-[var(--font-headline)] text-[58px] font-bold leading-[1.04] tracking-tight">
          Small Purchases Can Become Long Commitments
        </h1>

        <p className="mt-5 max-w-[880px] font-[var(--font-body)] text-[26px] leading-snug line-clamp-2">
          Beachbody’s permanent court order required safeguards around joining
          and leaving.
        </p>
      </header>

      <div className="relative my-3 flex min-h-0 flex-1 items-center justify-center overflow-hidden">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 952 420"
          preserveAspectRatio="xMidYMid meet"
          role="img"
          aria-label="A continuous payment timeline passes through a consent gate, a recurring-payment cycle, and a cancellation gate."
          className="block h-full max-h-[420px] w-full"
        >
          {/* A meaningful perimeter: safeguards surround the payment cycle. */}
          <circle
            cx="476"
            cy="210"
            r="150"
            fill="var(--surface)"
          />

          <g
            fill="none"
            stroke="var(--ink)"
            strokeWidth="2"
            opacity="0.55"
          >
            <path d="M310 104 A198 198 0 0 1 642 104" />
            <path d="M642 316 A198 198 0 0 1 310 316" />
          </g>

          {/* One continuous chronological rail connects every milestone. */}
          <path
            d="M48 210 H902"
            fill="none"
            stroke="var(--ink)"
            strokeWidth="2"
            opacity="0.55"
          />
          <path
            d="M888 200 L902 210 L888 220"
            fill="none"
            stroke="var(--ink)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Physical gate posts, rather than UI containers. */}
          <g
            fill="none"
            stroke="var(--accent)"
            strokeWidth="7"
            strokeLinecap="square"
          >
            <path d="M280 126 V294" />
            <path d="M672 126 V294" />
          </g>

          <g
            fill="none"
            stroke="var(--accent)"
            strokeWidth="2"
            opacity="0.65"
          >
            <path d="M266 126 H294 M266 294 H294" />
            <path d="M658 126 H686 M658 294 H686" />
          </g>

          {/* Recurring-payment arrows enclose a real-world billing anchor. */}
          <g
            fill="none"
            stroke="var(--accent)"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M400 173 A85 85 0 0 1 552 173" />
            <path d="M531 166 L552 173 L558 151" />
            <path d="M552 247 A85 85 0 0 1 400 247" />
            <path d="M421 254 L400 247 L394 269" />
          </g>

          <g fill="var(--surface)">
            <circle cx="146" cy="210" r="39" />
            <circle cx="476" cy="210" r="39" />
            <circle cx="806" cy="210" r="39" />
          </g>

          <CheckCheck
            x={123}
            y={187}
            width={46}
            height={46}
            stroke="var(--ink)"
            strokeWidth={1.6}
            aria-hidden="true"
          />
          <CreditCard
            x={451}
            y={185}
            width={50}
            height={50}
            stroke="var(--ink)"
            strokeWidth={1.6}
            aria-hidden="true"
          />
          <LogOut
            x={783}
            y={187}
            width={46}
            height={46}
            stroke="var(--ink)"
            strokeWidth={1.6}
            aria-hidden="true"
          />

          <g fill="var(--accent)">
            <circle cx="146" cy="270" r="4" />
            <circle cx="476" cy="322" r="4" />
            <circle cx="806" cy="270" r="4" />
          </g>

          <g
            fill="var(--ink)"
            textAnchor="middle"
            className="font-[var(--font-mono)] text-[20px] tracking-[0.12em]"
          >
            <text x="146" y="308">CONSENT</text>
            <text x="476" y="360">RENEWAL</text>
            <text x="806" y="308">EXIT</text>
          </g>
        </svg>
      </div>

      <div className="shrink-0 border-t border-[var(--border)] pt-4">
        <div className="grid grid-cols-[56px_240px_minmax(0,1fr)] items-start gap-x-5 pb-6 pt-2">
          <span className="pt-1 font-[var(--font-mono)] text-[22px] text-[var(--accent)]">
            01
          </span>
          <h2 className="font-[var(--font-headline)] text-[28px] font-semibold leading-tight">
            {items[0]?.label ?? 'Before Billing'}
          </h2>
          <p className="font-[var(--font-body)] text-[24px] leading-snug">
            {items[0]?.body ??
              'Clear renewal terms, separate consent, and a post-payment summary.'}
          </p>
        </div>

        <div className="grid grid-cols-[56px_240px_minmax(0,1fr)] items-start gap-x-5 border-t border-[var(--border)] pb-2 pt-6">
          <span className="pt-1 font-[var(--font-mono)] text-[22px] text-[var(--accent)]">
            02
          </span>
          <h2 className="font-[var(--font-headline)] text-[28px] font-semibold leading-tight">
            {items[1]?.label ?? 'After Joining'}
          </h2>
          <p className="font-[var(--font-body)] text-[24px] leading-snug">
            {items[1]?.body ??
              'Easy online/phone exits; reminders for plans 6 months or longer.'}
          </p>
        </div>
      </div>
    </section>
  );
}
import React from 'react';
import { Armchair, Bookmark, Check, Handshake } from 'lucide-react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

export default function Slide07({ slide, brand, totalSlides }: SlideComponentProps) {
  const items = slide.items ?? [];

  return (
    <section className="flex h-full min-h-0 w-full flex-col justify-between px-1 py-5 text-[var(--ink)]">
      <header className="mb-3 shrink-0">
        <div className="mb-6 flex items-center gap-3">
          <span
            aria-hidden="true"
            className="h-3 w-3 shrink-0 bg-[var(--accent)]"
          />
          <p className="font-[var(--font-mono)] text-[20px] uppercase tracking-[0.14em]">
            {slide.kicker ?? 'YOUR GATE-SIDE PLAYBOOK'}
          </p>
        </div>

        <h1 className="max-w-[900px] font-[var(--font-headline)] text-[58px] font-bold leading-[1.04] tracking-tight">
          {slide.headline ?? "Don't surrender. Negotiate."}
        </h1>

        <p className="mt-5 max-w-[810px] font-[var(--font-body)] text-[26px] leading-snug">
          {slide.subheadline ??
            'Identify the deal before you trade away your confirmed seat.'}
        </p>
      </header>

      <div className="relative my-3 flex min-h-0 flex-1 items-center justify-center overflow-hidden">
        <div className="relative aspect-[952/420] max-h-full w-full">
          <svg
            viewBox="0 0 952 420"
            fill="none"
            role="img"
            aria-label="A confirmed seat and a negotiated agreement, connected around a negotiation stamp."
            className="absolute inset-0 h-full w-full"
          >
            {/* Registration marks bracket the editorial illustration. */}
            <g
              stroke="var(--border)"
              strokeWidth="1.5"
              aria-hidden="true"
            >
              <path d="M40 96V72H64 M888 72H912V96" />
              <path d="M40 302V326H64 M888 326H912V302" />
              <path d="M116 270H260 M692 270H836" />
            </g>

            {/* A deliberate exchange, rather than an automatic surrender. */}
            <g
              stroke="var(--accent)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M246 142C338 40 614 40 706 142" />
              <path d="M690 138L706 142L704 125" />
              <path d="M706 278C614 380 338 380 246 278" />
              <path d="M262 282L246 278L248 295" />
            </g>

            <Armchair
              x={138}
              y={146}
              width={100}
              height={100}
              stroke="var(--ink)"
              strokeWidth={1.35}
              aria-hidden="true"
            />
            <Handshake
              x={714}
              y={146}
              width={100}
              height={100}
              stroke="var(--ink)"
              strokeWidth={1.35}
              aria-hidden="true"
            />

            <g
              fill="var(--ink)"
              fontFamily="var(--font-mono)"
              fontSize="20"
              letterSpacing="3"
              textAnchor="middle"
            >
              <text x="188" y="306">SEAT</text>
              <text x="764" y="306">DEAL</text>
            </g>
          </svg>

          <div className="absolute inset-0 flex items-center justify-center">
            <div className="rotate-[-2deg] border-2 border-[var(--accent)] bg-[var(--surface)] px-7 py-5 text-center text-[var(--accent)]">
              <p className="font-[var(--font-mono)] text-[34px] font-bold uppercase tracking-[0.08em]">
                Negotiate
              </p>
              <div
                aria-hidden="true"
                className="mx-auto mt-3 h-0.5 w-16 bg-[var(--accent)]"
              />
            </div>
          </div>

          <div className="absolute inset-x-0 bottom-0 flex items-center justify-center gap-3">
            <Bookmark
              aria-hidden="true"
              className="h-6 w-6 text-[var(--accent)]"
              strokeWidth={1.6}
            />
            <p className="font-[var(--font-mono)] text-[20px] uppercase tracking-[0.08em]">
              Save this playbook
            </p>
          </div>
        </div>
      </div>

      <div className="shrink-0 border-t border-[var(--border)] pt-4">
        <div className="flex gap-5 pb-6 pt-2">
          <Check
            aria-hidden="true"
            className="mt-1 h-7 w-7 shrink-0 text-[var(--accent)]"
            strokeWidth={2}
          />
          <div className="min-w-0">
            <h2 className="font-[var(--font-headline)] text-[28px] font-semibold leading-tight">
              {items[0]?.label ?? 'Protect eligibility'}
            </h2>
            <p className="mt-2 max-w-[810px] font-[var(--font-body)] text-[24px] leading-snug">
              {items[0]?.body ??
                "Meet check-in and gate deadlines. Ask why you're displaced."}
            </p>
          </div>
        </div>

        <div className="flex gap-5 border-t border-[var(--border)] pb-1 pt-6">
          <Check
            aria-hidden="true"
            className="mt-1 h-7 w-7 shrink-0 text-[var(--accent)]"
            strokeWidth={2}
          />
          <div className="min-w-0">
            <h2 className="font-[var(--font-headline)] text-[28px] font-semibold leading-tight">
              {items[1]?.label ?? 'Before accepting'}
            </h2>
            <p className="mt-2 max-w-[810px] font-[var(--font-body)] text-[24px] leading-snug">
              {items[1]?.body ??
                'Check fees, advance-booking rules, seat limits and blackout dates.'}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
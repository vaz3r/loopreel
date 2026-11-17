import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';
import { Armchair, DoorClosed, Plane, UserRound } from 'lucide-react';

export default function Slide01({ slide, brand, totalSlides }: SlideComponentProps) {
  const items = slide.items ?? [];
  void brand;
  void totalSlides;

  return (
    <section className="flex h-full min-h-0 w-full flex-col justify-between px-1 py-5 text-[var(--ink)]">
      <header className="mb-3 shrink-0">
        <div className="mb-6 flex items-center gap-3">
          <span
            aria-hidden="true"
            className="h-3 w-3 shrink-0 bg-[var(--accent)]"
          />
          <p className="font-[var(--font-mono)] text-[20px] font-medium uppercase tracking-[0.18em]">
            OVERBOOKING AUTOPSY
          </p>
        </div>

        <h1 className="max-w-[900px] font-[var(--font-headline)] text-[58px] font-bold leading-[1.04] tracking-tight">
          Your Confirmed Flight
          <br />
          Can Leave{' '}
          <span className="underline decoration-[var(--accent)] decoration-[3px] underline-offset-[9px]">
            Without You
          </span>
        </h1>

        <p className="mt-6 max-w-[820px] font-[var(--font-body)] text-[26px] leading-snug line-clamp-2">
          Know when to negotiate—and when the airline owes you cash.
        </p>
      </header>

      <div className="relative my-3 flex min-h-0 flex-1 items-center justify-center overflow-hidden">
        <svg
          viewBox="0 0 952 420"
          preserveAspectRatio="xMidYMid meet"
          role="img"
          aria-label="A passenger remains behind a closed boarding gate as an airplane departs."
          className="block h-full max-h-[420px] w-full"
          fill="none"
        >
          {/* Quiet airport seating anchors the scene in a real place. */}
          <g className="text-[var(--ink)]" opacity="0.3">
            <Armchair
              x={44}
              y={220}
              width={68}
              height={68}
              strokeWidth={1.25}
            />
            <Armchair
              x={120}
              y={220}
              width={68}
              height={68}
              strokeWidth={1.25}
            />
          </g>

          <path
            d="M32 302H374"
            stroke="var(--border)"
            strokeWidth="2"
          />

          {/* The stranded passenger and the hard boarding cutoff. */}
          <UserRound
            x={228}
            y={180}
            width={108}
            height={108}
            stroke="var(--ink)"
            strokeWidth={1.2}
          />

          <path
            d="M398 84V322"
            stroke="var(--accent)"
            strokeWidth="3"
          />
          <path
            d="M388 84H408M388 322H408"
            stroke="var(--accent)"
            strokeWidth="2"
          />

          <DoorClosed
            x={435}
            y={211}
            width={76}
            height={76}
            stroke="var(--accent)"
            strokeWidth={1.25}
          />

          <text
            x="398"
            y="365"
            textAnchor="middle"
            fill="var(--accent)"
            className="font-[var(--font-mono)] text-[20px] tracking-[0.18em]"
          >
            GATE
          </text>

          {/* A departing flight pulls away from the passenger. */}
          <path
            d="M521 258C624 255 672 211 742 151"
            stroke="var(--ink)"
            strokeWidth="2"
            strokeDasharray="7 12"
            opacity="0.45"
          />
          <path
            d="M563 300C670 295 735 254 805 197"
            stroke="var(--border)"
            strokeWidth="1.5"
          />
          <path
            d="M592 319C699 314 763 272 832 215"
            stroke="var(--border)"
            strokeWidth="1.5"
          />

          <Plane
            x={739}
            y={46}
            width={154}
            height={154}
            stroke="var(--ink)"
            strokeWidth={1.1}
          />

          <text
            x="814"
            y="253"
            textAnchor="middle"
            fill="var(--ink)"
            className="font-[var(--font-mono)] text-[20px] tracking-[0.15em]"
          >
            DEPARTURE
          </text>
        </svg>
      </div>

      <div className="shrink-0 border-t border-[var(--border)] pt-4">
        <div className="grid grid-cols-2 divide-x divide-[var(--border)]">
          <article className="pr-8">
            <h2 className="mb-3 font-[var(--font-headline)] text-[28px] font-semibold leading-tight">
              {items[0]?.label ?? 'Their bet'}
            </h2>
            <p className="flow-root font-[var(--font-body)] text-[24px] leading-snug first-letter:float-left first-letter:mr-3 first-letter:font-[var(--font-headline)] first-letter:text-[76px] first-letter:font-bold first-letter:leading-none first-letter:text-[var(--accent)]">
              {items[0]?.body ??
                'Airlines sell beyond seat counts, expecting passengers not to show.'}
            </p>
          </article>

          <article className="pl-8">
            <h2 className="mb-3 font-[var(--font-headline)] text-[28px] font-semibold leading-tight">
              {items[1]?.label ?? 'Your risk'}
            </h2>
            <p className="font-[var(--font-body)] text-[24px] leading-snug">
              {items[1]?.body ??
                'Your confirmed reservation can still leave you at the gate.'}
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}
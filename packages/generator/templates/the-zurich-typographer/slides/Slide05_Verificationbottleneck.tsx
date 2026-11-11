import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

export default function Slide05({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  return (
    <section className="flex flex-col h-full min-h-0 w-full text-[var(--ink)]">
      <header className="flex shrink-0 flex-col items-start">
        <p className="font-[var(--font-mono)] text-[22px] tracking-[0.16em] text-[var(--accent)]">
          THE NUCLEAR RECORD
        </p>

        <h2 className="mt-6 max-w-[920px] font-[var(--font-headline)] text-[68px] font-bold leading-[1.04] tracking-[-0.045em]">
          Unverified Does Not
          <br />
          Mean Weaponized
        </h2>

        <p className="mt-6 max-w-[870px] font-[var(--font-body)] text-[28px] leading-snug">
          The dossier separates inspection access, verification limits, and
          evidence of weaponization.
        </p>
      </header>

      <div className="relative mt-10 h-[1080px] w-full shrink-0">
        <svg
          className="pointer-events-none absolute inset-0 h-full w-full"
          viewBox="0 0 952 1080"
          fill="none"
          aria-hidden="true"
        >
          {/* Three equally spaced connection points around the open ring. */}
          <g
            stroke="var(--ink)"
            strokeWidth="2"
            strokeLinejoin="miter"
          >
            <path d="M476 270V222H440V194" />
            <path d="M276.8 615H238V716H188V754" />
            <path d="M675.2 615H714V716H764V754" />
          </g>

          {/* The missing upper-right segment is deliberately left open. */}
          <path
            d="M607.92 311.60 A230 230 0 1 0 684.45 402.80"
            stroke="#000000"
            strokeWidth="20"
            strokeLinecap="butt"
          />

          {/* A broken red connection marks the verification interruption. */}
          <path
            d="M616.07 317.06 A230 230 0 0 1 680.93 395.58"
            stroke="var(--accent, #E60000)"
            strokeWidth="4"
            strokeDasharray="8 12"
            strokeLinecap="butt"
          />

          <g
            stroke="var(--accent, #E60000)"
            strokeWidth="5"
            strokeLinecap="square"
          >
            <path d="M595.87 328.81L619.97 294.40" />
            <path d="M665.42 411.68L703.49 393.93" />
          </g>

          <g
            fill="var(--accent, #E60000)"
            stroke="var(--surface, #F5F5F5)"
            strokeWidth="4"
          >
            <circle cx="476" cy="270" r="9" />
            <circle cx="276.8" cy="615" r="9" />
            <circle cx="675.2" cy="615" r="9" />
          </g>

          <g stroke="var(--border)" strokeWidth="2">
            <path d="M176 754H200" />
            <path d="M752 754H776" />
          </g>
        </svg>

        <article className="absolute left-[176px] top-[18px] w-[600px] text-center">
          <h3 className="font-[var(--font-headline)] text-[34px] font-semibold leading-tight tracking-[-0.025em]">
            February 2026
          </h3>
          <p className="mt-4 font-[var(--font-body)] text-[28px] leading-snug">
            IAEA could neither verify suspended enrichment nor confirm Iran’s
            stockpile status.
          </p>
        </article>

        <article className="absolute left-0 top-[780px] w-[416px] border-t-2 border-[var(--border)] pt-6">
          <h3 className="font-[var(--font-headline)] text-[34px] font-semibold leading-tight tracking-[-0.025em]">
            Weaponization evidence
          </h3>
          <p className="mt-5 font-[var(--font-body)] text-[28px] leading-snug">
            The article says the IAEA found no evidence of weaponization.
          </p>
        </article>

        <article className="absolute right-0 top-[780px] w-[416px] border-t-2 border-[var(--border)] pt-6">
          <h3 className="font-[var(--font-headline)] text-[34px] font-semibold leading-tight tracking-[-0.025em]">
            Inspection access
          </h3>
          <p className="mt-5 font-[var(--font-body)] text-[28px] leading-snug">
            Iran denied access to bombed facilities while allowing access to all
            unaffected facilities.
          </p>
        </article>
      </div>
    </section>
  );
}
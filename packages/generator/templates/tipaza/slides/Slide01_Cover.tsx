import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

type CoverFields = {
  publication?: string;
  domain?: string;
  kicker?: string;
  headline?: string;
  subheadline?: string;
  issueBadge?: string;
  telemetry?: Array<{ badge?: string; label?: string }>;
};

export default function Slide01({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  void brand;
  void totalSlides;

  const cover = slide as typeof slide & CoverFields;
  const headline =
    cover.headline ?? 'Rome Claimed Tipasa. Ruins Outlasted Empires.';
  const headlineLines =
    headline === 'Rome Claimed Tipasa. Ruins Outlasted Empires.'
      ? ['Rome Claimed Tipasa.', 'Ruins Outlasted', 'Empires.']
      : [headline];

  const telemetry = cover.telemetry ?? [
    { badge: '430 CE', label: 'Vandal destruction' },
    { badge: '1857', label: 'Modern town founded' },
  ];

  return (
    <section className="flex flex-col h-full min-h-0 w-full text-[var(--ink)]">
      <div className="flex h-full min-h-0 flex-col px-4 py-4">
        <div className="flex shrink-0 items-center justify-between border-b border-[var(--border)] pb-6">
          <p className="font-[var(--font-headline)] text-[36px] font-semibold leading-none tracking-[-0.04em]">
            {cover.publication ?? 'Custom Brand'}
          </p>

          <svg
            aria-hidden="true"
            viewBox="0 0 64 40"
            className="h-[40px] w-[64px] text-[var(--accent)]"
            fill="none"
          >
            <path d="M1 1H63V39H1Z" stroke="currentColor" />
            <path d="M20 1V39M44 1V39" stroke="currentColor" />
            <path d="M20 27L32 15L44 27" stroke="currentColor" strokeWidth="3" />
          </svg>
        </div>

        <div className="mt-8 flex shrink-0 flex-col items-start">
          <p className="rounded-full bg-[var(--accent)] px-6 py-3 font-[var(--font-mono)] text-[20px] font-semibold uppercase leading-normal tracking-[0.16em] text-[var(--paper,#0D0E12)]">
            {cover.kicker ?? 'IMPERIAL AMBITION / URBAN SURVIVAL'}
          </p>

          <h1 className="mt-7 w-full font-[var(--font-headline)] text-[72px] font-bold leading-[1.02] tracking-[-0.04em]">
            {headlineLines.map((line, index) => (
              <span key={index} className="block">
                {line}
              </span>
            ))}
          </h1>

          <p className="mt-7 max-w-[840px] font-[var(--font-body)] text-[30px] leading-snug">
            {cover.subheadline ??
              'Conquest built an imperial outpost. Destruction separates its ruins from modern Tipaza.'}
          </p>
        </div>

        <div className="relative mt-7 flex min-h-[580px] flex-1 items-center justify-center">
          <svg
            aria-hidden="true"
            focusable="false"
            viewBox="0 0 1080 1350"
            preserveAspectRatio="xMidYMid meet"
            className="absolute inset-0 h-full w-full text-[var(--ink)]"
          >
            {/* A single architectural relic, suspended above its broken base. */}
            <path
              d="M80 1238H1000"
              fill="none"
              stroke="var(--border)"
              strokeWidth="2"
            />

            <g transform="rotate(-8 540 400)">
              <path
                d="M185 115H895V183H855V244H225V183H185Z"
                fill="currentColor"
              />
              <path
                d="M225 244H855L815 294H265Z"
                fill="currentColor"
              />
              <path
                d="M294 294H786V634L690 604L624 690L536 638L451 721L370 665L294 702Z"
                fill="currentColor"
              />

              <g
                fill="none"
                stroke="var(--paper, #0D0E12)"
                strokeWidth="14"
                strokeLinecap="square"
              >
                <path d="M368 325V632" />
                <path d="M454 325V663" />
                <path d="M540 325V590" />
                <path d="M626 325V630" />
                <path d="M712 325V557" />
              </g>

              <path
                d="M225 183H855"
                fill="none"
                stroke="var(--paper, #0D0E12)"
                strokeWidth="9"
              />
            </g>

            <path
              d="M294 792L370 755L451 811L536 728L624 780L690 694L786 724V1107H294Z"
              fill="currentColor"
            />

            <g
              fill="none"
              stroke="var(--paper, #0D0E12)"
              strokeWidth="14"
            >
              <path d="M368 814V1072" />
              <path d="M454 850V1072" />
              <path d="M540 793V1072" />
              <path d="M626 832V1072" />
              <path d="M712 777V1072" />
            </g>

            <path
              d="M294 1107H786L824 1150H256Z"
              fill="currentColor"
            />
            <path d="M230 1150H850V1193H230Z" fill="currentColor" />
            <path d="M185 1193H895V1238H185Z" fill="currentColor" />

            {/* Orange appears only at the rupture and its fallen fragment. */}
            <path
              d="M294 792L370 755L451 811L536 728L624 780L690 694L786 724"
              fill="none"
              stroke="var(--accent)"
              strokeWidth="13"
              strokeLinejoin="miter"
            />
            <path
              d="M838 943L902 975L860 1034L818 1001Z"
              fill="var(--accent)"
            />
            <path
              d="M107 1209L151 1178L167 1238H112Z"
              fill="var(--surface)"
              stroke="var(--border)"
              strokeWidth="2"
            />
          </svg>
        </div>

        <div className="mt-7 shrink-0 border-t border-[var(--border)] pt-7">
          <div className="grid grid-cols-2 gap-6">
            {telemetry.slice(0, 2).map((item, index) => (
              <div
                key={`${item.badge}-${index}`}
                className="min-w-0 border-l-2 border-[var(--accent)] pl-6"
              >
                <p className="font-[var(--font-mono)] text-[38px] font-semibold leading-none tracking-[-0.04em]">
                  {item.badge}
                </p>
                <p className="mt-3 font-[var(--font-body)] text-[24px] leading-snug">
                  {item.label}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8 flex items-center justify-between gap-6 border-t border-[var(--border)] pt-6">
            <p className="bg-[var(--surface)] px-4 py-3 font-[var(--font-mono)] text-[20px] leading-none tracking-[0.08em]">
              {cover.issueBadge ?? 'SPECIAL REPORT · 5 SLIDES'}
            </p>
            <p className="font-[var(--font-mono)] text-[22px] leading-none tracking-[0.04em] text-[var(--accent)]">
              {cover.domain ?? 'tipaza.pub'}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
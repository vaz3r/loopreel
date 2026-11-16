import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

export default function Slide02({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  const items = slide.items ?? [];
  const item0 = items[0]!;
  const item1 = items[0]!;

  const voluntary = 69566;
  const involuntary = 5542;
  const channelWidth = 780;
  const involuntaryWidth = channelWidth * (involuntary / voluntary);
  const difference = voluntary - involuntary;

  return (
    <section className="flex h-full min-h-0 w-full flex-col justify-between gap-7 py-[42px] text-[var(--ink)]">
      <header className="shrink-0">
        <div className="mb-6 flex items-center gap-4">
          <span
            aria-hidden="true"
            className="h-4 w-4 shrink-0 bg-[var(--accent)]"
          />
          <p className="font-[var(--font-headline)] text-[22px] font-bold tracking-[0.14em]">
            {slide.kicker}
          </p>
        </div>

        <h1 className="max-w-[820px] font-[var(--font-headline)] text-[60px] font-bold leading-[1.02] tracking-tight">
          {slide.headline}
        </h1>

        <p className="mt-5 line-clamp-2 font-[var(--font-body)] text-[24px] leading-snug">
          {slide.subheadline}
        </p>
      </header>

      <div className="relative flex min-h-0 flex-1 items-center justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 952 460"
          className="block h-full max-h-[500px] w-full"
          role="img"
          aria-label="Voluntary: 69,566 recorded denied-boardings. Involuntary: 5,542 recorded denied-boardings. Channel lengths share the same scale."
          preserveAspectRatio="xMidYMid meet"
        >
          <title>Two ledgers of recorded displacement</title>
          <desc>
            Proportional horizontal channels compare voluntary and involuntary
            denied-boardings. The involuntary count is 64,024 lower than the
            voluntary count.
          </desc>

          <path
            d="M0 1H952 M0 224H952 M0 459H952"
            stroke="var(--border)"
            strokeWidth="2"
          />

          {/* First ledger: reference channel. */}
          <text
            x="0"
            y="43"
            fill="var(--ink)"
            className="font-[var(--font-headline)] text-[28px] font-semibold"
          >
            {item0?.label ?? 'Voluntary'}
          </text>

          <text
            x="0"
            y="139"
            fill="var(--ink)"
            className="font-[var(--font-mono)] text-[88px] font-bold tracking-tight"
          >
            69,566
          </text>

          <text
            x="950"
            y="43"
            textAnchor="end"
            fill="var(--ink)"
            className="font-[var(--font-mono)] text-[22px]"
          >
            RECORDED / 01
          </text>

          <path
            d="M28 181H908"
            stroke="var(--border)"
            strokeWidth="2"
          />
          <rect
            x="28"
            y="162"
            width={channelWidth}
            height="38"
            fill="var(--ink)"
          />
          <rect
            x="16"
            y="169"
            width="24"
            height="24"
            fill="var(--surface)"
            stroke="var(--ink)"
            strokeWidth="3"
          />
          <path
            d="M808 151V211"
            stroke="var(--ink)"
            strokeWidth="3"
          />
          <path
            d="M808 151H842L831 163H808Z"
            fill="var(--accent)"
          />
          <path
            d="M894 172L908 181L894 190"
            fill="none"
            stroke="var(--ink)"
            strokeWidth="2"
          />

          {/* Second ledger: identical units and proportional bar width. */}
          <text
            x="0"
            y="267"
            fill="var(--ink)"
            className="font-[var(--font-headline)] text-[28px] font-semibold"
          >
            {item1?.label ?? 'Involuntary'}
          </text>

          <text
            x="0"
            y="363"
            fill="var(--accent)"
            className="font-[var(--font-mono)] text-[88px] font-bold tracking-tight"
          >
            5,542
          </text>

          <text
            x="950"
            y="267"
            textAnchor="end"
            fill="var(--ink)"
            className="font-[var(--font-mono)] text-[22px]"
          >
            RECORDED / 02
          </text>

          <path
            d="M28 405H908"
            stroke="var(--border)"
            strokeWidth="2"
          />
          <rect
            x="28"
            y="386"
            width={involuntaryWidth}
            height="38"
            fill="var(--accent)"
          />
          <rect
            x="16"
            y="393"
            width="24"
            height="24"
            fill="var(--surface)"
            stroke="var(--accent)"
            strokeWidth="3"
          />
          <path
            d={`M${28 + involuntaryWidth} 375V435`}
            stroke="var(--accent)"
            strokeWidth="3"
          />
          <path
            d={`M${28 + involuntaryWidth} 375h34l-11 12h-23Z`}
            fill="var(--accent)"
          />
          <path
            d="M894 396L908 405L894 414"
            fill="none"
            stroke="var(--ink)"
            strokeWidth="2"
          />

          {/* Comparison flag occupies its own clear SVG region. */}
          <path
            d="M526 307H952V365H526L510 336Z"
            fill="var(--surface)"
          />
          <path
            d="M526 307H952"
            stroke="var(--accent)"
            strokeWidth="3"
          />
          <text
            x="546"
            y="344"
            fill="var(--ink)"
            className="font-[var(--font-mono)] text-[22px]"
          >
            −{difference.toLocaleString('en-US')} vs voluntary
          </text>
        </svg>
      </div>

      <footer className="grid shrink-0 grid-cols-2 gap-7 border-t-2 border-[var(--border)] bg-[var(--surface)] px-7 py-6">
        <div>
          <h2 className="mb-3 font-[var(--font-headline)] text-[26px] font-semibold leading-tight">
            {item0?.label ?? 'Voluntary'}
          </h2>
          <p className="line-clamp-3 font-[var(--font-body)] text-[22px] leading-snug">
            {item0?.body ??
              '69,566 recorded voluntary denied-boardings.'}
          </p>
        </div>

        <div className="border-l border-[var(--border)] pl-7">
          <h2 className="mb-3 font-[var(--font-headline)] text-[26px] font-semibold leading-tight text-[var(--accent)]">
            {item1?.label ?? 'Involuntary'}
          </h2>
          <p className="line-clamp-3 font-[var(--font-body)] text-[22px] leading-snug">
            {item1?.body ??
              '5,542 recorded involuntary denied-boardings.'}
          </p>
        </div>
      </footer>
    </section>
  );
}
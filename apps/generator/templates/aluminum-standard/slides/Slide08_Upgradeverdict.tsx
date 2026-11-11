import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

const verdicts = [
  {
    title: 'Consider: M1 or M2 owners',
    body: 'Air or Pro users should notice a sizable day-to-day upgrade, according to the reviewer.',
    kind: 'upgrade',
  },
  {
    title: 'Hold: M4 or M5 owners',
    body: 'The reviewer expects noticeable gains, but nothing staggeringly large.',
    kind: 'hold',
  },
  {
    title: 'Consider: sustained workloads',
    body: 'Active cooling and additional ports strengthen the case against a fanless Air.',
    kind: 'cooling',
  },
  {
    title: 'Reconsider: flagship-screen shoppers',
    body: 'At $1,999, this model still lacks OLED and touch.',
    kind: 'screen',
  },
] as const;

type VerdictKind = (typeof verdicts)[number]['kind'];

function VerdictGraphic({ kind }: { kind: VerdictKind }) {
  return (
    <svg
      viewBox="0 0 120 120"
      fill="none"
      aria-hidden="true"
      className="h-[112px] w-[112px] shrink-0 text-[var(--ink)]"
    >
      <g
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {kind === 'upgrade' && (
          <>
            <rect x="17" y="48" width="45" height="45" rx="5" />
            <rect x="26" y="57" width="27" height="27" rx="2" />
            {[26, 38, 50].map((position) => (
              <g key={position}>
                <path d={`M${position} 42v6 M${position} 93v6`} />
                <path d={`M11 ${position + 31}h6`} />
              </g>
            ))}
            <path
              d="M56 65 97 24M73 24h24v24"
              stroke="var(--accent)"
              strokeWidth="4"
            />
            <path
              d="M72 78h25M72 89h17M72 100h9"
              stroke="var(--border)"
            />
          </>
        )}

        {kind === 'hold' && (
          <>
            <rect x="16" y="35" width="88" height="58" rx="6" />
            <path d="M27 46h66M27 82h66" stroke="var(--border)" />
            <path d="M46 55v18M73 55v18" strokeWidth="5" />
            <path
              d="M33 22h54M80 16l7 6-7 6"
              stroke="var(--accent)"
              strokeWidth="2"
            />
            <path d="M38 100h44" stroke="var(--border)" />
          </>
        )}

        {kind === 'cooling' && (
          <>
            <rect x="13" y="18" width="94" height="84" rx="7" />
            <circle cx="56" cy="57" r="28" stroke="var(--border)" />
            {[0, 60, 120, 180, 240, 300].map((rotation) => (
              <path
                key={rotation}
                d="M57 50C46 39 51 29 63 34C71 38 71 45 62 53Z"
                transform={`rotate(${rotation} 56 57)`}
                fill="var(--accent)"
                fillOpacity="0.14"
                stroke="var(--accent)"
                strokeWidth="1.4"
              />
            ))}
            <circle cx="56" cy="57" r="6" fill="var(--surface)" />
            <path d="M92 36v15M92 61v15" strokeWidth="3" />
            <rect x="26" y="89" width="17" height="5" rx="2" />
            <rect x="49" y="89" width="11" height="5" rx="2" />
            <path d="M72 91.5h17" stroke="var(--border)" />
          </>
        )}

        {kind === 'screen' && (
          <>
            <rect x="14" y="22" width="92" height="65" rx="5" />
            <rect
              x="21"
              y="29"
              width="78"
              height="50"
              rx="1"
              stroke="var(--border)"
            />
            <path d="M51 87v12M69 87v12M39 100h42" />
            <path d="m28 69 34-34M43 73l26-26" stroke="var(--border)" />
            <circle
              cx="88"
              cy="32"
              r="14"
              fill="var(--surface)"
              stroke="var(--accent)"
            />
            <path
              d="M88 25v8M88 38v.5"
              stroke="var(--accent)"
              strokeWidth="2.5"
            />
          </>
        )}
      </g>
    </svg>
  );
}

export default function Slide08({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  return (
    <section
      aria-label="Your Current Mac Changes The Verdict"
      className="grid h-[1028px] w-full max-w-[952px] grid-rows-[228px_minmax(0,1fr)] gap-8 text-[var(--ink)]"
    >
      <header className="relative min-w-0 border-t-2 border-[var(--ink)] pt-7">
        <div
          aria-hidden="true"
          className="absolute -top-[2px] left-0 h-[2px] w-24 bg-[var(--accent)]"
        />

        <h1 className="max-w-[850px] font-[var(--font-headline)] text-5xl font-semibold leading-[1.06] tracking-[-0.045em]">
          Your Current Mac
          <br />
          Changes The Verdict
        </h1>

        <p className="mt-5 max-w-[790px] font-[var(--font-body)] text-xl leading-[1.4]">
          Older machines strengthen the upgrade case. Recent owners face a less
          compelling performance jump.
        </p>
      </header>

      <div className="grid min-h-0 grid-rows-4 gap-4">
        {verdicts.map((verdict) => {
          const isConsider =
            verdict.kind === 'upgrade' || verdict.kind === 'cooling';
          const separator = verdict.title.indexOf(':');
          const decision = verdict.title.slice(0, separator + 1);
          const audience = verdict.title.slice(separator + 1);

          return (
            <article
              key={verdict.kind}
              className="relative grid min-h-0 grid-cols-[136px_minmax(0,1fr)] items-center gap-6 border border-[var(--border)] bg-[var(--surface)] px-6 py-5"
            >
              <span
                aria-hidden="true"
                className={`absolute inset-y-0 left-0 w-[3px] ${
                  isConsider ? 'bg-[var(--accent)]' : 'bg-[var(--border)]'
                }`}
              />

              <div className="flex h-full items-center border-r border-[var(--border)] pr-6">
                <VerdictGraphic kind={verdict.kind} />
              </div>

              <div className="min-w-0">
                <h2 className="font-[var(--font-headline)] text-[26px] font-semibold leading-[1.18] tracking-[-0.025em]">
                  <span
                    className={
                      isConsider
                        ? 'text-[var(--accent)]'
                        : 'text-[var(--ink)]'
                    }
                  >
                    {decision}
                  </span>
                  {audience}
                </h2>

                <p className="mt-3 max-w-[650px] font-[var(--font-body)] text-lg leading-snug">
                  {verdict.body}
                </p>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
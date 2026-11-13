import React from 'react';
import {
  parseMetricBadge,
  type SlideComponentProps,
} from '../../../src/skeleton/types';

type CoverData = {
  publication: string;
  domain: string;
  kicker: string;
  headline: string;
  subheadline: string;
  issueBadge: string;
  telemetry?: {
    badge: string;
    unit?: string;
    label: string;
  }[];
};

export default function Slide01({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  const copy = slide as unknown as CoverData;
  const telemetry = (copy.telemetry ?? []).slice(0, 2);

  const headlineMatch = copy.headline.match(
    /^(Cards Never) (Expire\. Starbucks) (Still Books) (Breakage\.)$/,
  );
  const headlineLines = headlineMatch
    ? [
        headlineMatch,
        headlineMatch,
        headlineMatch,
        headlineMatch,
      ]
    : [copy.headline];

  const palette = {
    '--paper': '#0A0A0C',
    '--ink': '#F5F5F7',
    '--accent': '#FF2A2A',
    '--surface': '#141418',
    '--border': '#26262E',
    backgroundColor: 'var(--paper)',
  } as React.CSSProperties;

  void brand;
  void totalSlides;

  return (
    <section
      style={palette}
      aria-label={copy.headline}
      className="flex flex-col h-full min-h-0 w-full text-[var(--ink)]"
    >
      <div className="flex shrink-0 items-baseline justify-between gap-6 border-b border-[var(--border)] pb-5">
        <p className="font-[var(--font-headline)] text-[38px] font-bold leading-none tracking-[-0.04em]">
          {copy.publication}
        </p>
        <p className="font-[var(--font-mono)] text-[20px] leading-none tracking-[0.04em]">
          {copy.domain}
        </p>
      </div>

      <div className="mt-7 flex shrink-0">
        <p className="rounded-full border border-[var(--accent)] bg-[var(--surface)] px-5 py-3 font-[var(--font-mono)] text-[20px] uppercase leading-none tracking-[0.16em] text-[var(--accent)]">
          {copy.kicker}
        </p>
      </div>

      <div className="relative mt-11 shrink-0">
        <svg
          aria-hidden="true"
          focusable="false"
          viewBox="0 0 540 800"
          className="pointer-events-none absolute -top-[145px] right-0 h-[620px] w-[419px] text-[var(--ink)] opacity-[0.07]"
          fill="none"
        >
          <g transform="rotate(-14 270 460)">
            <rect
              x="36"
              y="302"
              width="468"
              height="300"
              rx="24"
              stroke="currentColor"
              strokeWidth="3"
            />
            <path
              d="M36 374H504M36 410H504"
              stroke="currentColor"
              strokeWidth="2"
            />
            <rect
              x="77"
              y="454"
              width="66"
              height="48"
              rx="9"
              stroke="currentColor"
              strokeWidth="2"
            />
            <path
              d="M99 454V502M121 454V502M77 478H143M78 550H219"
              stroke="currentColor"
              strokeWidth="2"
            />
          </g>
        </svg>

        <h1 className="relative font-[var(--font-headline)] text-[64px] font-bold leading-[1.12] tracking-[-0.04em]">
          {headlineLines.map((line, index) => (
            <span key={`${index}-${line}`} className="block">
              <span
                className={
                  headlineMatch && index >= 2
                    ? 'underline decoration-[var(--accent)] decoration-[4px] underline-offset-[10px]'
                    : undefined
                }
              >
                {line}
              </span>
            </span>
          ))}
        </h1>

        <p className="relative mt-9 max-w-[790px] font-[var(--font-body)] text-[28px] leading-snug">
          {copy.subheadline}
        </p>
      </div>

      <div className="relative mt-auto shrink-0 pt-10">
        <div className="grid grid-cols-2 gap-8 border-t border-[var(--border)] pt-6">
          {telemetry.map((item, index) => {
            const { qualifier, value: metric, unit } = parseMetricBadge(
              item.badge,
            );
            const displayUnit = item.unit || unit;

            return (
              <div
                key={`${index}-${item.badge}`}
                className={`min-w-0 ${
                  index === 1
                    ? 'border-l border-[var(--border)] pl-8'
                    : ''
                }`}
              >
                <div className="flex items-baseline gap-2">
                  {qualifier && (
                    <span className="font-[var(--font-body)] text-[22px]">
                      {qualifier}
                    </span>
                  )}
                  <span className="font-[var(--font-mono)] text-[48px] font-bold leading-none tracking-[-0.05em] tabular-nums">
                    {metric}
                  </span>
                  {displayUnit && (
                    <span className="font-[var(--font-body)] text-[22px]">
                      {displayUnit}
                    </span>
                  )}
                </div>
                <p className="mt-3 max-w-[390px] font-[var(--font-body)] text-[24px] leading-snug">
                  {item.label}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mt-8 flex items-center justify-between gap-6 border-t-2 border-[var(--accent)] bg-[var(--surface)] px-5 py-5">
          <p className="font-[var(--font-mono)] text-[20px] uppercase leading-none tracking-[0.16em]">
            {copy.issueBadge}
          </p>
          <svg
            aria-hidden="true"
            focusable="false"
            viewBox="0 0 52 24"
            className="h-6 w-[52px] shrink-0 text-[var(--accent)]"
            fill="currentColor"
          >
            <rect width="8" height="24" />
            <rect x="14" width="8" height="24" />
            <rect x="28" width="24" height="24" />
          </svg>
        </div>
      </div>
    </section>
  );
}
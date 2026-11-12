import React from 'react';
import {
  parseMetricBadge,
  type SlideComponentProps,
} from '../../../src/skeleton/types';

type CoverFields = {
  publication?: string;
  kicker?: string;
  headline?: string;
  subheadline?: string;
  issueBadge?: string;
  metrics?: Array<{
    badge: string;
    unit?: string;
    label: string;
  }>;
};

export default function Slide01({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  const cover = slide as typeof slide & CoverFields;
  const words = (
    cover.headline ??
    'Starbucks Cards Never Expire. Nonredemption Pays.'
  ).split(/\s+/);

  const headlineLines = [
    words.slice(0, 2).join(' '),
    words.slice(2, 4).join(' '),
    words.slice(4, 5).join(' '),
    words.slice(5).join(' '),
  ];

  const metrics = cover.metrics ?? [
    { badge: '2025', label: 'Fiscal-year evidence' },
    {
      badge: '$222.4',
      unit: 'million',
      label: 'Calculated card breakage revenue',
    },
  ];

  // The surrounding SlideFrame owns the canvas and external header/footer.
  void brand;

  return (
    <section className="flex flex-col h-full min-h-0 w-full text-[var(--ink)]">
      <div className="shrink-0">
        <div className="font-[var(--font-headline)] text-[32px] font-semibold leading-[38px] tracking-[-0.035em]">
          {cover.publication ?? 'The Fine Print'}
        </div>

        <div className="mt-3 h-[2px] w-full bg-[var(--accent)]" />

        <p className="mt-[14px] font-[var(--font-mono)] text-[20px] uppercase leading-[28px] tracking-[0.16em] text-[var(--accent)]">
          {cover.kicker ??
            'CONSUMER FINANCE / CONVENIENCE VS. CONTROL'}
        </p>
      </div>

      <h1 className="mt-[18px] shrink-0 font-[var(--font-headline)] text-[72px] font-bold leading-[1.02] tracking-[-0.04em]">
        {headlineLines.map((line, index) => (
          <span
            key={index}
            className={`block ${
              index >= 2 ? 'text-[var(--accent)]' : ''
            }`}
          >
            {line}
          </span>
        ))}
      </h1>

      <figure className="mt-[18px] flex h-[246px] shrink-0 items-center justify-center">
        <svg
          viewBox="0 0 952 246"
          className="block h-full w-full"
          fill="none"
          aria-hidden="true"
        >
          <rect
            x="282"
            y="3"
            width="388"
            height="240"
            rx="19"
            fill="var(--surface)"
            stroke="var(--ink)"
            strokeWidth="3"
          />
        </svg>
      </figure>

      <p className="mt-[18px] max-w-[930px] shrink-0 font-[var(--font-body)] text-[30px] leading-[1.25] tracking-[-0.015em]">
        {cover.subheadline ??
          'Follow customer prepayments into interest-free financing—and separate nonredemption revenue from profit.'}
      </p>

      <div className="mt-[22px] grid shrink-0 grid-cols-[300px_minmax(0,1fr)] gap-8 border-t border-[var(--border)] pt-[14px]">
        {metrics.slice(0, 2).map((item, index) => {
          const { qualifier, value: metric, unit } = parseMetricBadge(
            item.badge,
          );
          const displayUnit = item.unit || unit;

          return (
            <div
              key={`${item.badge}-${index}`}
              className="flex min-w-0 flex-col gap-[6px]"
            >
              <div className="flex shrink-0 items-baseline gap-2 whitespace-nowrap">
                {qualifier && (
                  <span className="font-[var(--font-body)] text-[22px] leading-snug">
                    {qualifier}
                  </span>
                )}
                <span className="font-[var(--font-mono)] text-[48px] font-bold leading-none tracking-[-0.04em] tabular-nums">
                  {metric}
                </span>
                {displayUnit && (
                  <span className="font-[var(--font-body)] text-[22px] leading-snug">
                    {displayUnit}
                  </span>
                )}
              </div>

              <p className="font-[var(--font-body)] text-[24px] leading-[30px]">
                {item.label}
              </p>
            </div>
          );
        })}
      </div>

      <div className="mt-auto flex shrink-0 items-center gap-3 pt-[18px]">
        <span
          aria-hidden="true"
          className="h-[10px] w-[10px] shrink-0 bg-[var(--accent)]"
        />
        <p className="font-[var(--font-mono)] text-[20px] uppercase leading-[28px] tracking-[0.12em]">
          {cover.issueBadge ?? `SPECIAL REPORT · ${totalSlides} SLIDES`}
        </p>
      </div>
    </section>
  );
}
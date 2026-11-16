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
  const titleId = React.useId();
  const descriptionId = React.useId();

  const channels = [
    {
      label: item0?.label ?? 'Disney+ Core',
      body: item0?.body ?? '118.3 million paid subscribers.',
      value: 118.3,
      y: 0,
    },
    {
      label: item1?.label ?? 'Disney+ Hotstar',
      body: item1?.body ?? '35.5 million paid subscribers.',
      value: 35.5,
      y: 230,
    },
  ];

  return (
    <section className="flex h-full min-h-0 w-full flex-col justify-between text-[var(--ink)]">
      {/* Zone 1: Editorial header */}
      <header className="shrink-0 pb-8">
        <div className="mb-7 flex items-center gap-4">
          <span
            aria-hidden="true"
            className="h-3 w-3 bg-[var(--accent)]"
          />
          <p className="font-[var(--font-headline)] text-[22px] font-bold uppercase tracking-[0.16em] text-[var(--accent)]">
            {slide.kicker ?? 'PLATFORM SCALE'}
          </p>
          <span
            aria-hidden="true"
            className="h-px flex-1 bg-[var(--border)]"
          />
        </div>

        <h1 className="max-w-[900px] font-[var(--font-headline)] text-[60px] font-bold leading-[1.02] tracking-tight">
          {slide.headline ?? 'Scale Does Not Establish Consent'}
        </h1>

        <p className="mt-6 max-w-[880px] font-[var(--font-body)] text-[26px] leading-snug line-clamp-2">
          {slide.subheadline ??
            'Paid subscribers as of June 29, 2024—not proof of enforceability.'}
        </p>
      </header>

      {/* Zone 2: Dedicated proportional comparison ledger */}
      <div className="relative flex min-h-0 flex-1 items-center justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 952 460"
          preserveAspectRatio="xMidYMid meet"
          role="img"
          aria-labelledby={`${titleId} ${descriptionId}`}
          className="block h-full max-h-[540px] w-full"
        >
          <title id={titleId}>Disney paid subscriber comparison</title>
          <desc id={descriptionId}>
            Disney+ Core: 118.3 million paid subscribers. Disney+ Hotstar:
            35.5 million paid subscribers. Bar lengths share the same scale.
            Paid subscribers as of June 29, 2024—not proof of enforceability.
          </desc>

          {/* A shared datum and quiet alignment rails */}
          <path
            d="M48 24V429"
            fill="none"
            stroke="var(--border)"
            strokeWidth="2"
          />
          {[92, 292, 492, 692, 892].map((x) => (
            <path
              key={x}
              d={`M${x} 122V181 M${x} 352V411`}
              fill="none"
              stroke="var(--border)"
              strokeWidth="1"
              strokeDasharray="3 7"
            />
          ))}

          {channels.map((channel, index) => {
            const width = (channel.value / 118.3) * 800;
            const end = 92 + width;

            return (
              <g
                key={channel.label}
                transform={`translate(0 ${channel.y})`}
              >
                <text
                  x="92"
                  y="46"
                  fill="var(--ink)"
                  className="font-[var(--font-headline)] text-[30px] font-semibold"
                >
                  {channel.label}
                </text>

                <text
                  x="892"
                  y="106"
                  textAnchor="end"
                  fill={index === 0 ? 'var(--accent)' : 'var(--ink)'}
                  className="font-[var(--font-mono)] text-[88px] font-bold tracking-tight"
                  style={{ fontVariantNumeric: 'tabular-nums' }}
                >
                  {channel.value.toFixed(1)}
                </text>

                <text
                  x="92"
                  y="94"
                  fill="var(--ink)"
                  className="font-[var(--font-mono)] text-[22px]"
                >
                  {String(index + 1).padStart(2, '0')}
                </text>

                {/* Geometric source node and directional conduit */}
                <path
                  d="M48 137L62 151L48 165L34 151Z"
                  fill="var(--surface)"
                  stroke="var(--accent)"
                  strokeWidth="2"
                />
                <path
                  d="M62 151H84"
                  fill="none"
                  stroke="var(--ink)"
                  strokeWidth="2"
                />
                <path
                  d="M78 145L84 151L78 157"
                  fill="none"
                  stroke="var(--ink)"
                  strokeWidth="2"
                />

                {/* Equal baselines; strictly proportional channel lengths */}
                <rect
                  x="92"
                  y="133"
                  width="800"
                  height="36"
                  fill="var(--surface)"
                  stroke="var(--border)"
                />
                <rect
                  x="92"
                  y="133"
                  width={width}
                  height="36"
                  fill={index === 0 ? 'var(--accent)' : 'var(--ink)'}
                />

                {/* Endpoint flags identify measured extent, not growth */}
                <path
                  d={`M${end} 123V179`}
                  fill="none"
                  stroke="var(--accent)"
                  strokeWidth="2"
                />
                <path
                  d={`M${end} 123H${end + 19}L${end + 12} 133H${end}Z`}
                  fill="var(--accent)"
                />

                <text
                  x="92"
                  y="208"
                  fill="var(--ink)"
                  className="font-[var(--font-body)] text-[23px]"
                >
                  {channel.body}
                </text>
              </g>
            );
          })}

          <path
            d="M92 228H920"
            fill="none"
            stroke="var(--border)"
            strokeWidth="1"
          />
        </svg>
      </div>

      {/* Zone 3: Full-width scope placard, outside the vector canvas */}
      <footer className="mt-8 shrink-0 border-t border-[var(--border)] bg-[var(--surface)] px-7 py-7">
        <div className="grid grid-cols-[1fr_1.15fr] items-center gap-8">
          <p className="font-[var(--font-body)] text-[24px] leading-snug">
            Paid subscribers as of
            <br />
            <span className="font-[var(--font-mono)]">
              June 29, 2024
            </span>
          </p>

          <p className="border-l-2 border-[var(--accent)] pl-7 font-[var(--font-headline)] text-[28px] font-semibold leading-tight">
            —not proof of enforceability.
          </p>
        </div>
      </footer>
    </section>
  );
}
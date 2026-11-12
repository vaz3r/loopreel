import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

export default function Slide01({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  const cover = slide as typeof slide & {
    publication?: string;
    issueBadge?: string;
    kicker?: string;
    headline?: string;
    subheadline?: string;
    telemetry?: Array<{ badge: string; label: string }>;
  };

  const words = (cover.headline ?? '').trim().split(/\s+/);
  const headlineLines = [
    words.slice(0, 1).join(' '),
    words.slice(1, 3).join(' '),
    words.slice(3).join(' '),
  ];
  const telemetry = cover.telemetry ?? [];

  const palette = {
    '--paper': '#0D0E12',
    '--ink': '#F1F3F9',
    '--accent': '#FF4D00',
    '--surface': '#161820',
    '--border': '#F1F3F925',
  } as React.CSSProperties;

  return (
    <section
      className="flex flex-col h-full min-h-0 w-full text-[var(--ink)]"
      style={palette}
      aria-label={cover.headline}
    >
      <div className="flex h-full min-h-0 flex-col bg-[var(--paper)]">
        <div className="shrink-0">
          <div className="flex items-center gap-6">
            <p className="font-[var(--font-headline)] text-[28px] font-semibold leading-none tracking-[-0.03em]">
              {cover.publication}
            </p>
            <div
              className="h-px flex-1 bg-[var(--border)]"
              aria-hidden="true"
            />
            <svg
              className="h-7 w-7 shrink-0 text-[var(--accent)]"
              viewBox="0 0 28 28"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M1 27V1H27M8 27V8H27"
                stroke="currentColor"
                strokeWidth="2"
              />
            </svg>
          </div>

          <div className="mt-6 inline-flex rounded-full border border-[var(--accent)] bg-[var(--surface)] px-5 py-2">
            <p className="font-[var(--font-mono)] text-[20px] font-medium uppercase leading-[28px] tracking-[0.16em] text-[var(--accent)]">
              {cover.kicker}
            </p>
          </div>

          <h1 className="mt-6 font-[var(--font-headline)] text-[68px] font-bold leading-[1.02] tracking-[-0.04em]">
            {headlineLines.map((line, index) => (
              <span key={index} className="block">
                {line}
              </span>
            ))}
          </h1>

          <p className="mt-5 max-w-[760px] font-[var(--font-body)] text-[25px] leading-snug">
            {cover.subheadline}
          </p>
        </div>

        <div className="relative my-5 min-h-[290px] flex-1">
          <svg
            className="absolute inset-0 h-full w-full"
            viewBox="0 0 540 960"
            preserveAspectRatio="none"
            fill="none"
            aria-hidden="true"
          >
            {/* A single fractured column, not a technical diagram. */}
            <path
              d="M179 190
                 L214 158
                 L242 184
                 L270 139
                 L302 171
                 L337 152
                 L354 200
                 L338 242
                 L331 729
                 L350 759
                 L350 809
                 L366 809
                 L366 854
                 L166 854
                 L166 809
                 L183 809
                 L183 759
                 L201 729
                 L194 245
                 Z"
              fill="var(--surface)"
              stroke="var(--border)"
              strokeWidth="1.5"
              vectorEffect="non-scaling-stroke"
            />

            <path
              d="M179 190
                 L214 158
                 L242 184
                 L270 139
                 L302 171
                 L337 152
                 L354 200
                 L338 242
                 L194 245
                 Z"
              fill="var(--ink)"
              fillOpacity="0.88"
            />

            <path
              d="M219 262L224 716
                 M248 253L250 716
                 M280 252L279 716
                 M311 251L306 716"
              stroke="var(--ink)"
              strokeOpacity="0.22"
              strokeWidth="2"
              vectorEffect="non-scaling-stroke"
            />

            <path
              d="M195 383L256 418L239 466L300 505L334 483"
              stroke="var(--paper)"
              strokeWidth="5"
              vectorEffect="non-scaling-stroke"
            />

            <path
              d="M183 759H350M166 809H366"
              stroke="var(--ink)"
              strokeOpacity="0.3"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
            />

            {/* One uninterrupted wave intersects the ancient silhouette. */}
            <path
              d="M40 529
                 C99 529 115 529 143 529
                 C174 529 177 341 207 341
                 C237 341 239 702 269 702
                 C299 702 300 388 330 388
                 C360 388 362 529 394 529
                 C427 529 457 529 500 529"
              stroke="var(--accent)"
              strokeWidth="4"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
        </div>

        <div className="grid shrink-0 grid-cols-2 gap-6 border-t border-[var(--border)] pt-5">
          {telemetry.slice(0, 2).map((item, index) => (
            <div
              key={`${item.badge}-${index}`}
              className="flex items-start gap-4"
            >
              <span
                className="mt-3 h-2 w-2 shrink-0 bg-[var(--accent)]"
                aria-hidden="true"
              />
              <div>
                <p className="font-[var(--font-mono)] text-[36px] font-semibold leading-none tracking-[-0.04em]">
                  {item.badge}
                </p>
                <p className="mt-2 font-[var(--font-body)] text-[24px] leading-snug">
                  {item.label}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 shrink-0">
          <p className="font-[var(--font-mono)] text-[20px] leading-[28px] tracking-[0.12em] text-[var(--accent)]">
            {cover.issueBadge}
          </p>

          {/* Reserved citation strip; no source markers were supplied. */}
          <div
            className="mt-4 h-6 border-t border-[var(--border)]"
            data-source-strip=""
          />
        </div>
      </div>
    </section>
  );
}
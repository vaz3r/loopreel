import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

export default function Slide04({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  const items = slide.items ?? [];

  return (
    <section className="flex h-full min-h-0 w-full flex-col justify-between gap-7 text-[var(--ink)]">
      <header className="shrink-0">
        <p className="mb-5 flex items-center gap-4 font-[var(--font-headline)] text-[22px] font-bold tracking-[0.12em]">
          <span
            aria-hidden="true"
            className="h-5 w-5 shrink-0 bg-[var(--accent)]"
          />
          THE OPERATING SEQUENCE
        </p>

        <h1 className="font-[var(--font-headline)] text-[60px] font-bold leading-[1.02] tracking-tight">
          Forecast First.
          <br />
          Resolve at Boarding.
        </h1>

        <p className="mt-5 font-[var(--font-body)] text-[26px] leading-snug line-clamp-2">
          A booking forecast becomes a capacity decision.
        </p>
      </header>

      <div className="relative flex min-h-[440px] max-h-[500px] flex-1 items-center justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 952 460"
          role="img"
          aria-label="Operating sequence: sell reservations, forecast no-shows, accept extra bookings, then at boarding check attendance, seek volunteers, and apply fair priorities."
          className="block h-full max-h-[500px] w-full text-[var(--ink)]"
          preserveAspectRatio="xMidYMid meet"
        >
          <title>From reservation forecast to boarding decision</title>

          {/* Phase flags occupy their own space within the vector canvas. */}
          <path d="M20 8H28V37H20Z" fill="var(--accent)" />
          <text
            x="42"
            y="31"
            fill="currentColor"
            className="font-[var(--font-mono)] text-[22px] font-bold"
            letterSpacing="2"
          >
            BEFORE DEPARTURE
          </text>

          <path d="M20 241H28V270H20Z" fill="var(--accent)" />
          <text
            x="42"
            y="264"
            fill="currentColor"
            className="font-[var(--font-mono)] text-[22px] font-bold"
            letterSpacing="2"
          >
            AT BOARDING
          </text>

          {/* Continuous stepped conduit: left to right, down, right to left. */}
          <g
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="square"
          >
            <path d="M176 108H390" />
            <path d="M502 108H716" />
            <path d="M828 108H916V338H828" />
            <path d="M716 338H502" />
            <path d="M390 338H176" />
          </g>

          <g fill="var(--accent)">
            <path d="M370 98L390 108L370 118Z" />
            <path d="M696 98L716 108L696 118Z" />
            <path d="M906 221L916 241L926 221Z" />
            <path d="M848 328L828 338L848 348Z" />
            <path d="M522 328L502 338L522 348Z" />
            <path d="M196 328L176 338L196 348Z" />
          </g>

          {/* Geometric nodes; all labels remain native SVG text. */}
          {[
            {
              number: '1',
              x: 120,
              y: 108,
              first: 'Sell',
              second: 'reservations',
              accent: false,
            },
            {
              number: '2',
              x: 446,
              y: 108,
              first: 'Forecast',
              second: 'no-shows',
              accent: false,
            },
            {
              number: '3',
              x: 772,
              y: 108,
              first: 'Accept extra',
              second: 'bookings',
              accent: false,
            },
            {
              number: '4',
              x: 772,
              y: 338,
              first: 'Check',
              second: 'attendance',
              accent: false,
            },
            {
              number: '5',
              x: 446,
              y: 338,
              first: 'Seek',
              second: 'volunteers',
              accent: false,
            },
            {
              number: '6',
              x: 120,
              y: 338,
              first: 'Apply fair',
              second: 'priorities',
              accent: true,
            },
          ].map((node) => (
            <g key={node.number}>
              <rect
                x={node.x - 56}
                y={node.y - 56}
                width="112"
                height="112"
                fill={node.accent ? 'var(--accent)' : 'var(--surface)'}
                stroke={node.accent ? 'var(--accent)' : 'currentColor'}
                strokeWidth="2"
              />

              <text
                x={node.x}
                y={node.y + 28}
                textAnchor="middle"
                fill={node.accent ? 'var(--surface)' : 'currentColor'}
                className="font-[var(--font-mono)] text-[80px] font-bold"
              >
                {node.number}
              </text>

              <text
                x={node.x}
                y={node.y + 87}
                textAnchor="middle"
                fill="currentColor"
                className="font-[var(--font-body)] text-[24px] font-medium"
              >
                <tspan x={node.x}>{node.first}</tspan>
                <tspan x={node.x} dy="28">
                  {node.second}
                </tspan>
              </text>
            </g>
          ))}
        </svg>
      </div>

      <div className="grid shrink-0 grid-cols-2 gap-5">
        <article className="border-t-2 border-[var(--border)] bg-[var(--surface)] px-7 py-6">
          <h2 className="font-[var(--font-headline)] text-[28px] font-semibold leading-tight">
            {items[0]?.label ?? 'Before departure'}
          </h2>
          <p className="mt-3 font-[var(--font-body)] text-[24px] leading-snug line-clamp-3">
            {items[0]?.body ??
              'Sell reservations; forecast no-shows; accept extra bookings.'}
          </p>
        </article>

        <article className="border-t-2 border-[var(--accent)] bg-[var(--surface)] px-7 py-6">
          <h2 className="font-[var(--font-headline)] text-[28px] font-semibold leading-tight">
            {items[0]?.label ?? 'At boarding'}
          </h2>
          <p className="mt-3 font-[var(--font-body)] text-[24px] leading-snug line-clamp-3">
            {items[0]?.body ??
              'Check attendance; seek volunteers; apply fair priorities.'}
          </p>
        </article>
      </div>
    </section>
  );
}
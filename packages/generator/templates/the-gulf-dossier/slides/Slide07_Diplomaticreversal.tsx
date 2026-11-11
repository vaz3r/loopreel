import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

export default function Slide07({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  void slide;
  void brand;
  void totalSlides;

  const events = [
    {
      label: '17 June',
      body: 'The United States and Iran signed a memorandum and lifted the dual blockade.',
    },
    {
      label: '28 June',
      body: 'The United States and Iran agreed to resume the ceasefire after brief escalation.',
    },
    {
      label: '8 July',
      body: 'Article attributes ceasefire collapse to Iranian attacks on commercial vessels in Hormuz.',
    },
  ];

  return (
    <section className="flex flex-col h-full min-h-0 w-full text-[var(--ink)]">
      <div className="shrink-0">
        <p className="font-[var(--font-mono)] text-[22px] leading-[28px] tracking-[0.16em] text-[var(--accent)]">
          JUNE TO JULY
        </p>

        <h1 className="mt-4 font-[var(--font-headline)] text-[64px] font-bold leading-[1.06] tracking-[-0.045em]">
          Agreements Did Not Hold
        </h1>

        <p className="mt-5 max-w-[850px] font-[var(--font-body)] text-[28px] leading-[1.35]">
          The article reports a memorandum, renewed ceasefire, and another
          collapse.
        </p>
      </div>

      <div className="relative mt-8 h-[690px] w-full shrink-0">
        <svg
          className="pointer-events-none absolute inset-0 h-full w-full"
          viewBox="0 0 952 690"
          fill="none"
          aria-hidden="true"
        >
          {/* A constant-width ribbon: sequence, not magnitude. */}
          <path
            d="M156 16 L72 115 L248 345 L72 575 L96 607"
            stroke="var(--surface)"
            strokeWidth="38"
            strokeLinejoin="miter"
            strokeLinecap="butt"
          />
          <path
            d="M156 16 L72 115 L248 345 L72 575 L96 607"
            stroke="var(--accent)"
            strokeWidth="22"
            strokeLinejoin="miter"
            strokeLinecap="butt"
          />

          {/* Fold seams establish the alternating ribbon faces. */}
          <path
            d="M61 107 L83 123 M237 337 L259 353 M61 567 L83 583"
            stroke="var(--surface)"
            strokeWidth="3"
          />
          <path
            d="M82 128 L238 332 M238 358 L82 562"
            stroke="var(--ink)"
            strokeOpacity="0.18"
            strokeWidth="2"
          />

          {/* Identical leaders and markers connect each bend to its event. */}
          {[{ x: 72, y: 115 }, { x: 248, y: 345 }, { x: 72, y: 575 }].map(
            ({ x, y }) => (
              <g key={y}>
                <path
                  d={`M${x + 15} ${y} H316`}
                  stroke="var(--border)"
                  strokeWidth="2"
                />
                <path
                  d={`M316 ${y - 10} V${y + 10}`}
                  stroke="var(--accent)"
                  strokeWidth="2"
                />
                <circle
                  cx={x}
                  cy={y}
                  r="15"
                  fill="var(--surface)"
                  stroke="var(--accent)"
                  strokeWidth="3"
                />
                <circle
                  cx={x}
                  cy={y}
                  r="5"
                  fill="var(--accent)"
                />
              </g>
            ),
          )}

          {/* An actual open gap terminates the final fold. */}
          <path
            d="M115 632 L139 664"
            stroke="var(--surface)"
            strokeWidth="38"
            strokeLinecap="butt"
          />
          <path
            d="M115 632 L139 664"
            stroke="var(--accent)"
            strokeWidth="22"
            strokeLinecap="butt"
          />
          <path
            d="M85 614 L107 598 M104 639 L126 623"
            stroke="var(--ink)"
            strokeWidth="2"
          />
        </svg>

        <ol className="relative m-0 grid h-full list-none grid-rows-3 p-0 pl-[348px]">
          {events.map((event) => (
            <li
              key={event.label}
              className="flex min-h-0 flex-col justify-center pr-2"
            >
              <h2 className="font-[var(--font-mono)] text-[36px] font-semibold leading-[44px] tracking-[-0.035em] text-[var(--accent)]">
                {event.label}
              </h2>
              <p className="mt-3 max-w-[588px] font-[var(--font-body)] text-[28px] leading-[1.3]">
                {event.body}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
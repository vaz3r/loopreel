import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

const items = [
  {
    index: 1,
    tag: 'KEY DELETION',
    title: 'No timetable provided',
    body: 'The supplied article specifies no encryption-key retention or deletion periods.',
  },
  {
    index: 2,
    tag: 'SUBSCRIPTION',
    title: 'Drone scheduling costs extra',
    body: 'Set routes and schedules require Amazon Ring Protect; the article states no explicit Rover subscription requirement.',
  },
  {
    index: 3,
    tag: 'FLIGHT TIME',
    title: 'A conditional endurance claim',
    body: 'Amazon specifies 8 minutes on a “new, fully-charged battery under controlled conditions.”',
  },
  {
    index: 4,
    tag: 'NAVIGATION',
    title: 'Ordinary surfaces can interfere',
    body: 'Drone navigation may degrade around reflective surfaces, featureless blank matte walls, frameless glass and mirrors.',
  },
];

function PatrolDetail({ index }: { index: number }) {
  return (
    <svg
      viewBox="0 0 132 132"
      fill="none"
      aria-hidden="true"
      className="h-[132px] w-[132px] shrink-0 text-[var(--accent)]"
    >
      <g stroke="var(--border)" strokeWidth="1">
        <path d="M8 26V8h18M106 8h18v18M124 106v18h-18M26 124H8v-18" />
        <path d="M8 66h8M116 66h8M66 8v8M66 116v8" />
      </g>

      {index === 1 && (
        <>
          <circle
            cx="67"
            cy="66"
            r="39"
            stroke="var(--border)"
            strokeWidth="1.5"
            strokeDasharray="3 6"
          />
          <path
            d="M67 27a39 39 0 0 1 39 39"
            stroke="currentColor"
            strokeWidth="2"
          />
          <path
            d="M67 35v6M97 66h-6M67 97v-6M36 66h6"
            stroke="var(--border)"
            strokeWidth="1.5"
          />
          <circle
            cx="56"
            cy="65"
            r="10"
            stroke="currentColor"
            strokeWidth="2"
          />
          <path
            d="M66 65h25M81 65v9M89 65v6"
            stroke="currentColor"
            strokeWidth="2"
          />
          <circle cx="106" cy="66" r="3" fill="currentColor" />
          <path
            d="M43 103h48"
            stroke="var(--border)"
            strokeDasharray="2 5"
          />
        </>
      )}

      {index === 2 && (
        <>
          <path
            d="M27 99V35h34M74 35h30v64H78"
            stroke="var(--border)"
            strokeWidth="1.5"
          />
          <path
            d="M27 72h22V53h34v22h21"
            stroke="var(--border)"
            strokeWidth="1.5"
          />
          <path
            d="M39 91V44h54v47H69"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeDasharray="4 5"
          />
          <circle cx="39" cy="91" r="4" fill="currentColor" />
          <path
            d="m73 87-4 4 4 4"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <rect
            x="54"
            y="72"
            width="25"
            height="24"
            rx="3"
            fill="var(--surface)"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <path
            d="M60 72v-7a6.5 6.5 0 0 1 13 0v7"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <circle cx="66.5" cy="83" r="2" fill="currentColor" />
          <path d="M66.5 85v4" stroke="currentColor" strokeWidth="1.5" />
        </>
      )}

      {index === 3 && (
        <>
          <path
            d="M34 26h64M34 106h64M40 21v10M92 21v10M40 101v10M92 101v10"
            stroke="var(--border)"
            strokeWidth="1.5"
          />
          <rect
            x="25"
            y="47"
            width="77"
            height="38"
            rx="5"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <path
            d="M103 59h6v14h-6"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <rect
            x="32"
            y="54"
            width="63"
            height="24"
            rx="1"
            fill="currentColor"
            fillOpacity="0.12"
          />
          <path
            d="M46 54v24M62 54v24M78 54v24"
            stroke="currentColor"
            strokeOpacity="0.45"
          />
          <path
            d="M40 35v8M92 35v8M40 89v8M92 89v8"
            stroke="var(--border)"
            strokeDasharray="2 3"
          />
        </>
      )}

      {index === 4 && (
        <>
          <path
            d="M26 104V28h37M77 28h29v76H26Z"
            stroke="var(--border)"
            strokeWidth="1.5"
          />
          <path
            d="m85 38 12 12M81 49l16 16M81 64l16 16M81 79l12 12"
            stroke="var(--border)"
            strokeWidth="1.5"
          />
          <path
            d="M81 37v57"
            stroke="currentColor"
            strokeWidth="2"
          />
          <path
            d="m43 87 38-31-33-13"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeDasharray="4 4"
          />
          <path
            d="m43 87 38-12-24 23"
            stroke="currentColor"
            strokeOpacity="0.4"
            strokeWidth="1.5"
            strokeDasharray="3 5"
          />
          <circle
            cx="43"
            cy="87"
            r="8"
            fill="var(--surface)"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <circle cx="43" cy="87" r="2.5" fill="currentColor" />
          <circle cx="81" cy="56" r="3" fill="currentColor" />
        </>
      )}
    </svg>
  );
}

export default function Slide06({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  return (
    <section className="flex h-full min-h-0 w-full flex-col text-[var(--ink)]">
      <div className="mb-7 shrink-0">
        <div className="mb-5 h-[4px] w-16 bg-[var(--accent)]" />
        <h1 className="max-w-[880px] font-[var(--font-headline)] text-[64px] font-semibold leading-[1.02] tracking-[-0.045em]">
          The Fine Print
          <br />
          Shapes the Patrol
        </h1>
      </div>

      <ol className="grid min-h-0 flex-1 grid-rows-4 gap-3">
        {items.map((item) => (
          <li
            key={item.index}
            className="relative grid min-h-0 grid-cols-[30px_minmax(0,1fr)_132px] items-center gap-x-5 border border-[var(--border)] bg-[var(--surface)] px-5 py-4"
          >
            <span
              aria-hidden="true"
              className="absolute -left-px top-5 h-7 w-[2px] bg-[var(--accent)]"
            />

            <span className="self-start pt-[1px] font-[var(--font-mono)] text-[15px] leading-5 text-[var(--accent)]">
              {String(item.index).padStart(2, '0')}
            </span>

            <div className="min-w-0">
              <p className="mb-2 font-[var(--font-mono)] text-[12px] font-medium leading-4 tracking-[0.18em] text-[var(--accent)]">
                {item.tag}
              </p>
              <h2 className="mb-2 font-[var(--font-headline)] text-[29px] font-semibold leading-[1.12] tracking-[-0.025em]">
                {item.title}
              </h2>
              <p className="font-[var(--font-body)] text-[20px] leading-[1.35] text-[var(--ink)] opacity-80">
                {item.body}
              </p>
            </div>

            <PatrolDetail index={item.index} />
          </li>
        ))}
      </ol>
    </section>
  );
}
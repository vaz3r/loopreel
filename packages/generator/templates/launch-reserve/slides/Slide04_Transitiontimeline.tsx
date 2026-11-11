import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

const milestones = [
  {
    date: 'after 2028',
    title: 'Commercial Falcon 9',
    lines: [
      'SpaceX has stopped taking commercial orders',
      'for launches after 2028.',
    ],
    pattern: undefined,
  },
  {
    date: 'through 2029',
    title: 'Military ordering',
    lines: [
      'Space Force can order Falcon 9 and',
      'Falcon Heavy missions.',
    ],
    pattern: '16 10',
  },
  {
    date: 'through 2033',
    title: 'Military launches',
    lines: [
      'Actual launches under the Space Force contract',
      'can extend through 2033.',
    ],
    pattern: '2 10',
  },
];

export default function Slide04({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  void brand;

  return (
    <section
      className="flex flex-col h-full min-h-0 w-full text-[var(--ink)]"
      data-slide-id={slide.id}
      data-total-slides={totalSlides}
      aria-label="Falcon transition timeline"
    >
      <div className="flex items-center gap-4">
        <span
          aria-hidden="true"
          className="h-[10px] w-[10px] shrink-0 bg-[var(--accent)]"
        />
        <p className="font-[var(--font-mono)] text-[22px] leading-[28px] tracking-[0.16em] text-[var(--accent)]">
          FALCON TRANSITION
        </p>
      </div>

      <h2 className="mt-5 font-[var(--font-headline)] text-[62px] font-bold leading-[1.06] tracking-[-0.035em]">
        <span className="block">An Ordering Cutoff,</span>
        <span className="block">Not Immediate Retirement</span>
      </h2>

      <p className="mt-5 max-w-[900px] font-[var(--font-body)] text-[28px] leading-[1.35]">
        Commercial restrictions and military contract windows describe different
        milestones.
      </p>

      <figure
        className="mt-8 w-full shrink-0 border-y border-[var(--border)] py-4"
        aria-label="Schematic timeline of commercial restrictions, military ordering, and military launches."
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 952 630"
          width="952"
          height="630"
          className="block h-[630px] w-full"
          role="img"
          aria-label="Three separate milestone lanes: commercial launches after 2028, military ordering through 2029, and military launches through 2033. Spacing is schematic, not proportional."
        >
          <defs>
            <pattern
              id="slide04-grid"
              width="32"
              height="32"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 32 0 H 0 V 32"
                fill="none"
                stroke="var(--border)"
                strokeWidth="1"
                opacity="0.18"
              />
            </pattern>
          </defs>

          {milestones.map((milestone, index) => (
            <g
              key={milestone.title}
              transform={`translate(0 ${index * 210})`}
            >
              <rect
                x="0"
                y="54"
                width="952"
                height="68"
                fill="var(--surface)"
                opacity="0.5"
              />
              <rect
                x="0"
                y="54"
                width="952"
                height="68"
                fill="url(#slide04-grid)"
              />

              <text
                x="24"
                y="37"
                fill="var(--ink)"
                className="font-[var(--font-headline)] text-[34px] font-semibold tracking-[-0.02em]"
              >
                {milestone.title}
              </text>

              <text
                x="916"
                y="77"
                textAnchor="end"
                fill="var(--accent)"
                className="font-[var(--font-mono)] text-[26px] font-semibold"
              >
                {milestone.date}
              </text>

              <path
                d="M 24 86 V 110 M 24 98 H 916"
                fill="none"
                stroke="var(--border)"
                strokeWidth="2"
              />

              <path
                d="M 24 98 H 904"
                fill="none"
                stroke={index === 0 ? 'var(--accent)' : 'var(--ink)'}
                strokeWidth="4"
                strokeDasharray={milestone.pattern}
                strokeLinecap={index === 2 ? 'round' : 'butt'}
              />

              <circle
                cx="910"
                cy="98"
                r="7"
                fill="var(--surface)"
                stroke="var(--accent)"
                strokeWidth="3"
              />

              <path
                d="M 910 110 V 119"
                fill="none"
                stroke="var(--accent)"
                strokeWidth="2"
              />

              <circle
                cx="56"
                cy="98"
                r="4"
                fill="var(--accent)"
              />
              <path
                d="M 56 106 V 148 H 80"
                fill="none"
                stroke="var(--border)"
                strokeWidth="2"
              />

              <text
                x="96"
                y="155"
                fill="var(--ink)"
                className="font-[var(--font-body)] text-[26px]"
              >
                {milestone.lines.map((line, lineIndex) => (
                  <tspan
                    key={line}
                    x="96"
                    dy={lineIndex === 0 ? 0 : 34}
                  >
                    {line}
                  </tspan>
                ))}
              </text>

              {index < milestones.length - 1 && (
                <path
                  d="M 24 207 H 928"
                  fill="none"
                  stroke="var(--border)"
                  strokeWidth="1"
                  opacity="0.55"
                />
              )}
            </g>
          ))}
        </svg>
      </figure>
    </section>
  );
}
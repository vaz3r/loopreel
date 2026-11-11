import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

export default function Slide12({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  const content = slide as unknown as {
    headline?: string;
    kicker?: string;
    action?: string;
    handle?: string;
  };

  const headline = content.headline ?? 'Draw the pause before the room.';
  const kicker =
    content.kicker ??
    'A spatial exercise: trace your arrival from the front door to your usual seat. Mark the place for shoes, the first sheltered view, and every obstruction.';
  const action = content.action ?? 'Save this exercise. Redraw your arrival.';
  const handle = content.handle ?? '@thetokyoreview';

  return (
    <section
      aria-label={headline}
      className="flex h-full min-h-0 flex-col justify-between gap-8 text-[var(--ink)] font-[var(--font-body)]"
    >
      <div className="flex flex-col gap-7">
        <div className="flex items-center gap-3">
          <span className="h-2.5 w-2.5 rounded-full bg-[var(--accent)]" />
          <span className="font-[var(--font-mono)] text-sm uppercase tracking-[0.24em]">
            A spatial exercise
          </span>
        </div>

        <h1 className="max-w-[900px] text-balance font-[var(--font-headline)] text-[88px] font-bold leading-[0.98] tracking-[-0.055em]">
          {headline}
        </h1>

        <p className="max-w-[820px] text-[25px] leading-[1.5]">
          {kicker}
        </p>
      </div>

      <div className="overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--surface)] p-8 shadow-sm">
        <div className="mb-5 flex items-center justify-between gap-4 font-[var(--font-mono)] text-xs uppercase tracking-[0.18em]">
          <span>Arrival / trace study</span>
          <span className="text-[var(--accent)]">Not to scale</span>
        </div>

        <svg
          viewBox="0 0 800 260"
          role="img"
          aria-label="An arrival path from the front door to a seat, with places to mark shoes, a sheltered view, and an obstruction."
          className="block w-full text-[var(--ink)]"
          fill="none"
        >
          {/* Architectural envelope with an opening at the entrance. */}
          <path
            d="M48 94V30H752V222H48V166"
            stroke="currentColor"
            strokeWidth="2"
            opacity="0.35"
          />
          <path
            d="M48 166H120M48 94A72 72 0 0 1 120 166"
            stroke="var(--border)"
            strokeWidth="2"
          />

          {/* A partition shelters the first view into the room. */}
          <path
            d="M350 30V106M350 106H440"
            stroke="currentColor"
            strokeWidth="5"
            strokeLinecap="square"
            opacity="0.55"
          />

          {/* The route bends deliberately around an obstruction. */}
          <path
            d="M24 130H202C248 130 250 176 304 176H458C512 176 508 104 564 104H674"
            stroke="var(--accent)"
            strokeWidth="3"
            strokeDasharray="7 8"
            strokeLinecap="round"
          />
          <path
            d="M662 96L674 104L662 112"
            stroke="var(--accent)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Shoe storage. */}
          <rect
            x="166"
            y="48"
            width="80"
            height="34"
            rx="5"
            stroke="currentColor"
            strokeWidth="1.5"
            opacity="0.5"
          />
          <path
            d="M183 58V72H199V58M213 58V72H229V58"
            stroke="currentColor"
            strokeWidth="1.5"
            opacity="0.5"
          />

          {/* Obstruction and destination seat. */}
          <rect
            x="472"
            y="112"
            width="38"
            height="38"
            stroke="currentColor"
            strokeWidth="1.5"
            opacity="0.45"
          />
          <path
            d="M480 120L502 142M502 120L480 142"
            stroke="currentColor"
            strokeWidth="1.5"
            opacity="0.45"
          />
          <rect
            x="684"
            y="80"
            width="42"
            height="48"
            rx="7"
            stroke="currentColor"
            strokeWidth="2"
          />
          <path
            d="M691 116H719M691 88V108M719 88V108"
            stroke="currentColor"
            strokeWidth="1.5"
          />

          {[
            { x: 206, y: 130, label: '01' },
            { x: 380, y: 176, label: '02' },
            { x: 550, y: 107, label: '03' },
          ].map((marker) => (
            <g key={marker.label}>
              <circle
                cx={marker.x}
                cy={marker.y}
                r="17"
                fill="var(--surface)"
                stroke="var(--accent)"
                strokeWidth="2"
              />
              <text
                x={marker.x}
                y={marker.y + 4}
                textAnchor="middle"
                fill="var(--accent)"
                stroke="none"
                fontSize="11"
                fontFamily="var(--font-mono)"
                fontWeight="700"
              >
                {marker.label}
              </text>
            </g>
          ))}

          <g
            fill="currentColor"
            fontSize="11"
            fontFamily="var(--font-mono)"
            letterSpacing="1.5"
            opacity="0.7"
          >
            <text x="48" y="247">FRONT DOOR</text>
            <text x="752" y="247" textAnchor="end">USUAL SEAT</text>
          </g>
        </svg>

        <div className="mt-5 grid grid-cols-3 gap-5 border-t border-[var(--border)] pt-5">
          {[
            ['01', 'Place for shoes'],
            ['02', 'Sheltered view'],
            ['03', 'Every obstruction'],
          ].map(([number, label]) => (
            <div key={number} className="flex items-start gap-3">
              <span className="pt-0.5 font-[var(--font-mono)] text-sm text-[var(--accent)]">
                {number}
              </span>
              <span className="text-base leading-snug">{label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-7 border-t border-[var(--border)] pt-7">
        <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl border border-[var(--accent)] text-[var(--accent)]">
          <svg
            viewBox="0 0 32 32"
            fill="none"
            aria-hidden="true"
            className="h-8 w-8"
          >
            <path
              d="M9 5H23V27L16 22L9 27V5Z"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinejoin="round"
            />
          </svg>
        </span>

        <div className="flex flex-col gap-3">
          <p className="max-w-[680px] text-balance font-[var(--font-headline)] text-[34px] font-bold leading-[1.15] tracking-tight">
            {action}
          </p>
          <p className="font-[var(--font-mono)] text-sm tracking-[0.08em] text-[var(--accent)]">
            {handle}
          </p>
        </div>
      </div>
    </section>
  );
}
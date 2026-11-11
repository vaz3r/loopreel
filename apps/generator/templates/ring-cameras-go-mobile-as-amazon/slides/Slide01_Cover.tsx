import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

export default function Slide01({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  return (
    <div className="flex h-full flex-col justify-between gap-8 text-[var(--ink)]">
      <div className="flex items-center gap-4">
        <span className="rounded-full border border-[var(--border)] bg-[var(--surface)] px-4 py-2 font-[var(--font-mono)] text-xs uppercase tracking-[0.2em] text-[var(--accent)]">
          Robotics / Privacy
        </span>
        <span className="h-px flex-1 bg-[var(--border)]" />
        <span className="font-[var(--font-mono)] text-xs uppercase tracking-[0.2em] opacity-60">
          In focus
        </span>
      </div>

      <section className="flex flex-col gap-6">
        <div className="flex items-center gap-3 font-[var(--font-mono)] text-xs uppercase tracking-[0.24em] text-[var(--accent)]">
          <span className="h-2 w-2 rounded-full bg-[var(--accent)]" />
          The camera gets moving
        </div>

        <h1 className="max-w-[900px] text-balance font-[var(--font-headline)] text-7xl font-bold leading-[0.98] tracking-[-0.055em]">
          {slide.headline ?? 'Amazon puts Ring cameras on patrol'}
        </h1>

        <p className="max-w-[820px] text-pretty font-[var(--font-body)] text-2xl leading-relaxed opacity-80">
          {slide.subheadline ??
            'An indoor drone and a wheeled security robot promise cameras that move toward alerts. They also bring Ring’s privacy questions deeper inside.'}
        </p>
      </section>

      <figure className="relative overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-sm">
        <div className="flex items-center justify-between gap-4 font-[var(--font-mono)] text-[11px] uppercase tracking-[0.18em]">
          <span className="opacity-60">Inside the perimeter</span>
          <span className="text-[var(--accent)]">Concept schematic</span>
        </div>

        <svg
          viewBox="0 0 800 300"
          className="my-3 block h-[300px] w-full text-[var(--accent)]"
          role="img"
          aria-label="Conceptual floor plan showing an indoor drone and a wheeled security robot moving toward an alert."
        >
          <g
            fill="none"
            stroke="var(--border)"
            strokeWidth="2"
            strokeLinecap="square"
          >
            <path d="M35 55V20H765V280H35V110" />
            <path d="M290 20V100M290 160V280" />
            <path d="M540 20V100M540 160V280" />
            <path d="M35 210H140M205 210H290" />
            <path d="M540 210H625M690 210H765" />
            <path d="M55 40H130V70H55ZM670 40H745V70H670Z" />
          </g>

          <g fill="currentColor" opacity="0.035">
            <path d="M190 127L425 40V250Z" />
            <path d="M635 178L425 55V250Z" />
          </g>

          <g
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeDasharray="5 8"
            opacity="0.55"
          >
            <path d="M205 127H330Q355 127 380 143L406 158" />
            <path d="M622 178H495Q470 178 446 168" />
          </g>

          <g transform="translate(190 127)">
            <g
              fill="var(--surface)"
              stroke="currentColor"
              strokeWidth="2"
            >
              <rect x="-70" y="-35" width="140" height="70" rx="27" />
              <ellipse cx="-39" cy="0" rx="23" ry="25" />
              <ellipse cx="39" cy="0" rx="23" ry="25" />
              <path d="M-39-15V15M-54 0H-24M39-15V15M24 0H54" opacity="0.5" />
              <rect x="-20" y="-22" width="40" height="49" rx="11" />
              <path d="M-13 27V45H13V27" />
              <circle cx="0" cy="35" r="5" />
            </g>
          </g>

          <g transform="translate(635 169)">
            <g
              fill="var(--surface)"
              stroke="currentColor"
              strokeWidth="2"
            >
              <rect x="-49" y="8" width="17" height="43" rx="7" />
              <rect x="32" y="8" width="17" height="43" rx="7" />
              <rect x="-38" y="-4" width="76" height="49" rx="16" />
              <path d="M0-4V-31" />
              <rect x="-29" y="-66" width="58" height="39" rx="9" />
              <circle cx="0" cy="-47" r="10" />
              <circle cx="0" cy="-47" r="3" fill="currentColor" />
              <path d="M-17 23H17" opacity="0.6" />
            </g>
          </g>

          <g transform="translate(426 162)">
            <circle r="32" fill="none" stroke="currentColor" opacity="0.15" />
            <circle r="21" fill="none" stroke="currentColor" opacity="0.4" />
            <circle r="8" fill="currentColor" />
          </g>

          <g
            fill="currentColor"
            fontFamily="var(--font-mono)"
            fontSize="10"
            letterSpacing="2"
          >
            <text x="426" y="111" textAnchor="middle">
              ALERT
            </text>
            <text x="190" y="254" textAnchor="middle">
              01 / AIR
            </text>
            <text x="635" y="254" textAnchor="middle">
              02 / GROUND
            </text>
          </g>
        </svg>

        <figcaption className="grid grid-cols-2 gap-6 border-t border-[var(--border)] pt-4 font-[var(--font-body)] text-sm">
          <span>
            <span className="mr-3 font-[var(--font-mono)] text-xs text-[var(--accent)]">
              01
            </span>
            Indoor drone
          </span>
          <span>
            <span className="mr-3 font-[var(--font-mono)] text-xs text-[var(--accent)]">
              02
            </span>
            Wheeled security robot
          </span>
        </figcaption>
      </figure>

      <div className="flex items-center gap-4">
        <span className="h-11 w-1 rounded-full bg-[var(--accent)]" />
        <div className="flex flex-col gap-1">
          <span className="font-[var(--font-body)] text-base font-semibold">
            {slide.author ?? 'Staff Bureau'}
          </span>
          <span className="font-[var(--font-mono)] text-xs uppercase tracking-[0.18em] opacity-60">
            {slide.publisher ?? 'Ars Technica'}
          </span>
        </div>
      </div>
    </div>
  );
}
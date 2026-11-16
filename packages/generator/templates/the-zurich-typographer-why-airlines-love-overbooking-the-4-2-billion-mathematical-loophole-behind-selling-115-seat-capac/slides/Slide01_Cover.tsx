import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

export default function Slide01({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  const items = slide.items ?? [];
  const titleId = React.useId();
  const descriptionId = React.useId();

  return (
    <section className="flex h-full min-h-0 w-full flex-col justify-between gap-6 text-[var(--ink)]">
      <header className="shrink-0">
        <div className="mb-5 flex items-center gap-4">
          <span
            aria-hidden="true"
            className="h-5 w-5 shrink-0 bg-[var(--accent)]"
          />
          <p className="font-[var(--font-headline)] text-[22px] font-bold tracking-[0.14em]">
            {slide.kicker ?? 'OVERBOOKING ECONOMICS'}
          </p>
        </div>

        <h1 className="max-w-[820px] font-[var(--font-headline)] text-[60px] font-bold leading-[1.02] tracking-tight">
          {slide.headline ?? 'Airlines Pay You Not to Fly'}
        </h1>

        <p className="mt-5 max-w-[850px] font-[var(--font-body)] text-[26px] leading-snug line-clamp-2">
          {slide.subheadline ??
            'Extra reservations earn revenue—until too many passengers show.'}
        </p>
      </header>

      <div className="relative flex min-h-[440px] max-h-[500px] flex-1 items-center justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 952 460"
          className="block h-full max-h-[500px] w-full"
          role="img"
          aria-labelledby={`${titleId} ${descriptionId}`}
          preserveAspectRatio="xMidYMid meet"
        >
          <title id={titleId}>Reservations meet limited aircraft capacity</title>
          <desc id={descriptionId}>
            An abstract flow diagram: reservation nodes feed an aircraft cabin.
            A red branch diverts excess arrivals toward displacement. Symbols
            are illustrative, not numerical data.
          </desc>

          <g fill="none" stroke="var(--border)" strokeWidth="2">
            <path d="M0 52H952" />
            <path d="M0 426H952" />
            <path d="M312 72V404" strokeDasharray="4 10" />
          </g>

          <g
            fill="var(--ink)"
            className="font-[var(--font-mono)] text-[22px]"
          >
            <text x="20" y="32">RESERVATIONS</text>
            <text x="544" y="32">SEAT CAPACITY</text>
          </g>

          {/* Reservation nodes occupy their own input field. */}
          <g>
            {[112, 202, 292].map((y) =>
              [48, 130, 212].map((x) => (
                <g key={`${x}-${y}`}>
                  <rect
                    x={x - 25}
                    y={y - 25}
                    width="50"
                    height="50"
                    fill="var(--surface)"
                    stroke="var(--ink)"
                    strokeWidth="2"
                  />
                  <circle cx={x} cy={y} r="10" fill="var(--ink)" />
                </g>
              )),
            )}

            <g fill="var(--accent)">
              <rect x="23" y="357" width="50" height="50" />
              <rect x="105" y="357" width="50" height="50" />
            </g>
            <g stroke="var(--surface)" strokeWidth="3">
              <path d="M36 382H60M48 370V394" />
              <path d="M118 382H142M130 370V394" />
            </g>
          </g>

          {/* Directional conduits converge before the capacity threshold. */}
          <g
            fill="none"
            stroke="var(--ink)"
            strokeWidth="5"
            strokeLinejoin="miter"
          >
            <path d="M237 112H275V202H407" />
            <path d="M237 202H407" />
            <path d="M237 292H275V202" />
            <path d="M407 202H535" />
          </g>
          <path d="M516 191L535 202L516 213Z" fill="var(--ink)" />

          {/* Aircraft cabin: a bounded destination, not a data chart. */}
          <path
            d="M554 88H766C830 88 886 130 911 202C886 274 830 316 766 316H554Z"
            fill="var(--surface)"
            stroke="var(--ink)"
            strokeWidth="4"
          />
          <path
            d="M574 202H853"
            fill="none"
            stroke="var(--border)"
            strokeWidth="2"
            strokeDasharray="8 8"
          />

          {[120, 232].map((y) =>
            [588, 664, 740].map((x) => (
              <g key={`${x}-${y}`} fill="none" stroke="var(--ink)">
                <rect
                  x={x}
                  y={y}
                  width="48"
                  height="52"
                  rx="6"
                  strokeWidth="3"
                />
                <path
                  d={`M${x + 8} ${y + 39}H${x + 40}`}
                  strokeWidth="4"
                />
              </g>
            )),
          )}

          <g fill="var(--ink)">
            <path d="M840 139L862 155L850 170L832 158Z" />
            <path d="M850 234L862 249L840 265L832 246Z" />
          </g>

          {/* Excess demand follows a distinct red diversion. */}
          <path
            d="M155 382H348V202H407V375H684"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="6"
            strokeLinejoin="miter"
          />
          <circle
            cx="407"
            cy="202"
            r="13"
            fill="var(--accent)"
            stroke="var(--surface)"
            strokeWidth="4"
          />
          <path d="M665 363L686 375L665 387Z" fill="var(--accent)" />

          <path
            d="M707 341H925L909 375L925 409H707Z"
            fill="var(--accent)"
          />
          <text
            x="815"
            y="383"
            textAnchor="middle"
            fill="var(--surface)"
            className="font-[var(--font-mono)] text-[22px] font-bold"
          >
            DISPLACEMENT
          </text>
        </svg>
      </div>

      <div className="grid shrink-0 grid-cols-2 gap-5">
        {[items, items].map((item, index) => (
          <article
            key={index}
            className={`border-t-[3px] bg-[var(--surface)] px-6 pb-6 pt-5 ${
              index === 0
                ? 'border-[var(--ink)]'
                : 'border-[var(--accent)]'
            }`}
          >
            <h2 className="font-[var(--font-headline)] text-[28px] font-semibold leading-tight">
              {item?.label ??
                (index === 0 ? 'Revenue opportunity' : 'Capacity shortfall')}
            </h2>
            <p className="mt-3 font-[var(--font-body)] text-[24px] leading-snug line-clamp-3">
              {item?.body ??
                (index === 0
                  ? 'Extra reservations can fill seats no-shows leave empty.'
                  : 'Too many arrivals turn extra bookings into displacement.')}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

export default function Slide01({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  return (
    <section className="flex flex-col h-full min-h-0 w-full text-[var(--ink)]">
      <div className="flex items-center gap-4">
        <span
          aria-hidden="true"
          className="h-3 w-3 shrink-0 bg-[var(--accent)]"
        />
        <p className="font-[var(--font-mono)] text-[22px] leading-none tracking-[0.16em] text-[var(--accent)]">
          {slide.kicker}
        </p>
        <div
          aria-hidden="true"
          className="h-px flex-1 bg-[var(--border)]"
        />
      </div>

      <h1 className="mt-9 max-w-[900px] font-[var(--font-headline)] text-[68px] font-bold leading-[1.04] tracking-[-0.045em]">
        {slide.headline}
      </h1>

      <div className="mt-8 grid grid-cols-[8px_1fr] gap-6">
        <div aria-hidden="true" className="bg-[var(--accent)]" />
        <p className="max-w-[800px] font-[var(--font-body)] text-[28px] leading-[1.4] tracking-[-0.015em]">
          {slide.subheadline}
        </p>
      </div>

      <div className="relative mt-9 min-h-0 flex-1">
        <svg
          aria-hidden="true"
          focusable="false"
          viewBox="0 0 952 480"
          preserveAspectRatio="xMidYMid meet"
          className="h-full w-full"
          fill="none"
        >
          {/* Survey field: deliberately open, with no enclosing card. */}
          <path
            d="M0 424H952M0 456H952M112 0V456M336 0V456M560 0V456M784 0V456"
            stroke="var(--border)"
            strokeWidth="1"
            opacity="0.45"
          />
          <path
            d="M0 104H952M0 264H952"
            stroke="var(--border)"
            strokeWidth="1"
            strokeDasharray="3 10"
            opacity="0.55"
          />

          {/* Broad launch corridor and alternative ascent paths. */}
          <path
            d="M540 424C540 274 612 133 779 12H912C703 154 620 282 620 424Z"
            fill="var(--surface)"
          />
          <path
            d="M184 406C184 288 158 208 67 111"
            stroke="var(--border)"
            strokeWidth="2"
            strokeDasharray="9 10"
          />
          <path
            d="M386 406C386 235 405 146 491 31"
            stroke="var(--ink)"
            strokeWidth="2"
            strokeDasharray="9 10"
            opacity="0.4"
          />
          <path
            d="M580 406C580 274 651 139 842 20"
            stroke="var(--accent)"
            strokeWidth="3"
          />
          <path
            d="M819 20H842L833 42"
            stroke="var(--accent)"
            strokeWidth="3"
            strokeLinecap="square"
          />

          {/* Quiet registration marks. */}
          <g stroke="var(--border)" strokeWidth="2">
            <path d="M52 104H82M67 89V119" />
            <path d="M476 31H506M491 16V46" />
            <path d="M897 264H927M912 249V279" />
          </g>

          {/* Reserve vehicle: technical elevation. */}
          <g transform="translate(184 298)">
            <path
              d="M-15 79V-10C-15-34-9-48 0-59C9-48 15-34 15-10V79Z"
              fill="var(--surface)"
              stroke="var(--ink)"
              strokeWidth="2"
            />
            <path
              d="M-15 42L-29 77V88L-15 79M15 42L29 77V88L15 79"
              fill="var(--surface)"
              stroke="var(--ink)"
              strokeWidth="2"
            />
            <path
              d="M-15-7H15M-15 43H15M-10 79L-13 91H13L10 79"
              stroke="var(--ink)"
              strokeWidth="2"
            />
            <path
              d="M0-37V19"
              stroke="var(--border)"
              strokeWidth="2"
            />
          </g>

          {/* Second vehicle: a distinct silhouette, not a duplicate. */}
          <g transform="translate(386 274)">
            <path
              d="M-19 102V-18L-12-43L0-60L12-43L19-18V102Z"
              fill="var(--surface)"
              stroke="var(--ink)"
              strokeWidth="2"
            />
            <path
              d="M-19 42H-30V102H-19M19 42H30V102H19"
              fill="var(--surface)"
              stroke="var(--ink)"
              strokeWidth="2"
            />
            <path
              d="M-19-8H19M-19 18H19M-19 79H19M-12 102L-15 115H15L12 102"
              stroke="var(--ink)"
              strokeWidth="2"
            />
            <path
              d="M0-34V60"
              stroke="var(--border)"
              strokeWidth="2"
            />
          </g>

          {/* Focal vehicle follows the ascending trajectory. */}
          <g transform="translate(666 189) rotate(35)">
            <path
              d="M-20 49V-48C-20-78-10-99 0-113C10-99 20-78 20-48V49Z"
              fill="var(--accent)"
            />
            <path
              d="M-20 8L-39 50V65L-20 49M20 8L39 50V65L20 49"
              fill="var(--accent)"
            />
            <path
              d="M-12 49L-16 65H16L12 49"
              fill="var(--ink)"
            />
            <path
              d="M-19-43H19M-20 9H20"
              stroke="var(--surface)"
              strokeWidth="2"
            />
            <path
              d="M0-86V-57"
              stroke="var(--surface)"
              strokeWidth="3"
            />
            <path
              d="M-9 77L0 122L9 77M0 137V159"
              stroke="var(--accent)"
              strokeWidth="3"
            />
          </g>

          {/* Ground infrastructure anchors the comparison. */}
          <g stroke="var(--ink)" strokeWidth="2">
            <path d="M137 405H231V424H137ZM339 405H433V424H339Z" />
            <path d="M145 405V389H223V405M347 405V389H425V405" />
            <path d="M152 424V456M216 424V456M354 424V456M418 424V456" />
          </g>
          <path
            d="M533 405H627V424H533ZM541 405V389H619V405"
            stroke="var(--accent)"
            strokeWidth="2"
          />
          <path
            d="M548 424V456M612 424V456"
            stroke="var(--accent)"
            strokeWidth="2"
          />
          <g fill="var(--border)">
            <circle cx="112" cy="456" r="4" />
            <circle cx="336" cy="456" r="4" />
            <circle cx="784" cy="456" r="4" />
          </g>
          <circle cx="560" cy="456" r="5" fill="var(--accent)" />
        </svg>
      </div>
    </section>
  );
}
import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

export default function Slide05({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  const items = slide.items ?? [];
  const item0 = items[0]!;
  const item1 = items[0]!;
  const artId = React.useId();

  return (
    <section className="flex h-full min-h-0 w-full flex-col justify-between gap-5 text-[var(--ink)]">
      <header className="shrink-0">
        <div className="mb-5 flex items-center gap-4">
          <span
            aria-hidden="true"
            className="h-5 w-5 shrink-0 bg-[var(--accent)]"
          />
          <p className="font-[var(--font-headline)] text-[22px] font-bold uppercase leading-tight tracking-[0.12em]">
            THE HIDDEN DISPLACEMENT
          </p>
        </div>

        <h1 className="max-w-[920px] font-[var(--font-headline)] text-[60px] font-bold leading-[1.02] tracking-tight">
          Zero Bumping Can
          <br />
          Hide Displacement
        </h1>

        <p className="mt-5 line-clamp-2 font-[var(--font-body)] text-[26px] leading-snug">
          Delta Air Lines Network · January–March 2024
        </p>
      </header>

      <div className="relative flex max-h-[500px] min-h-[440px] flex-1 items-center justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 952 460"
          role="img"
          aria-labelledby={`${artId}-title ${artId}-description`}
          className="block h-full max-h-[500px] w-full"
          preserveAspectRatio="xMidYMid meet"
        >
          <title id={`${artId}-title`}>
            Zero involuntary denied-boardings does not mean zero displacement
          </title>
          <desc id={`${artId}-description`}>
            A schematic network perimeter contrasts 23,699 voluntary
            denied-boardings with 0 involuntary denied-boardings. A red
            directional conduit crosses the perimeter beside the voluntary
            count. Path geometry is illustrative, not proportional.
          </desc>

          {/* Architectural perimeter and internal division. */}
          <rect
            x="32"
            y="78"
            width="888"
            height="322"
            fill="var(--surface)"
            stroke="var(--border)"
            strokeWidth="2"
          />
          <path
            d="M32 110V78H64 M888 78H920V110 M32 368V400H64 M888 400H920V368"
            fill="none"
            stroke="var(--ink)"
            strokeWidth="3"
          />
          <path
            d="M568 110V368"
            fill="none"
            stroke="var(--border)"
            strokeWidth="2"
            strokeDasharray="6 9"
          />

          <text
            x="32"
            y="44"
            fill="var(--ink)"
            className="font-[var(--font-mono)] text-[22px] font-medium tracking-[0.08em]"
          >
            DENIED-BOARDINGS
          </text>

          {/* The red bypass crosses the network boundary. */}
          <path
            d="M72 350H112V126H500V30"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="8"
            strokeLinejoin="miter"
          />
          <path
            d="M487 40L500 18L513 40Z"
            fill="var(--accent)"
          />
          <rect
            x="60"
            y="338"
            width="24"
            height="24"
            fill="var(--accent)"
          />
          <rect
            x="102"
            y="116"
            width="20"
            height="20"
            fill="var(--surface)"
            stroke="var(--accent)"
            strokeWidth="4"
          />
          <rect
            x="489"
            y="115"
            width="22"
            height="22"
            fill="var(--accent)"
          />

          {/* Accent flag marks the perimeter crossing. */}
          <path
            d="M500 58H548L536 78H500Z"
            fill="var(--accent)"
          />

          <text
            x="152"
            y="244"
            fill="var(--accent)"
            className="font-[var(--font-mono)] text-[88px] font-bold tracking-[-0.06em]"
          >
            23,699
          </text>
          <text
            x="156"
            y="286"
            fill="var(--ink)"
            className="font-[var(--font-body)] text-[26px] font-semibold"
          >
            Voluntary
          </text>

          <path
            d="M156 350H508"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="2"
          />
          <path
            d="M496 343L508 350L496 357"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="2"
          />

          {/* The zero sits in a separate, contained channel. */}
          <path
            d="M616 126H872"
            fill="none"
            stroke="var(--ink)"
            strokeWidth="2"
          />
          <circle
            cx="616"
            cy="126"
            r="8"
            fill="var(--surface)"
            stroke="var(--ink)"
            strokeWidth="3"
          />
          <rect
            x="864"
            y="118"
            width="16"
            height="16"
            fill="var(--ink)"
          />

          <text
            x="744"
            y="244"
            textAnchor="middle"
            fill="var(--ink)"
            className="font-[var(--font-mono)] text-[100px] font-bold"
          >
            0
          </text>
          <text
            x="744"
            y="286"
            textAnchor="middle"
            fill="var(--ink)"
            className="font-[var(--font-body)] text-[26px] font-semibold"
          >
            Involuntary
          </text>

          <path
            d="M616 350H872 M872 340V360"
            fill="none"
            stroke="var(--ink)"
            strokeWidth="2"
          />

          <path
            d="M32 428H920"
            fill="none"
            stroke="var(--border)"
            strokeWidth="2"
          />
          <rect
            x="32"
            y="424"
            width="56"
            height="8"
            fill="var(--accent)"
          />
        </svg>
      </div>

      <div className="grid shrink-0 grid-cols-2 gap-5">
        <article className="min-h-[218px] border-t-[3px] border-[var(--accent)] bg-[var(--surface)] px-6 py-6">
          <h2 className="font-[var(--font-headline)] text-[28px] font-semibold leading-tight tracking-tight">
            {item0?.label ?? 'Recorded displacement'}
          </h2>
          <p className="mt-4 line-clamp-3 font-[var(--font-body)] text-[24px] leading-snug">
            {item0?.body ??
              '23,699 voluntary; 0 involuntary denied-boardings.'}
          </p>
        </article>

        <article className="min-h-[218px] border-t-[3px] border-[var(--border)] bg-[var(--surface)] px-6 py-6">
          <h2 className="font-[var(--font-headline)] text-[28px] font-semibold leading-tight tracking-tight">
            {item1?.label ?? 'Volunteer terms'}
          </h2>
          <p className="mt-4 line-clamp-3 font-[var(--font-body)] text-[24px] leading-snug">
            {item1?.body ??
              'No offer ceiling; voucher restrictions must be disclosed.'}
          </p>
        </article>
      </div>
    </section>
  );
}
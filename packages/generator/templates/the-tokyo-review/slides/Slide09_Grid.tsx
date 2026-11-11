import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

type GridCard = {
  index: string;
  title: string;
  desc: string;
};

function SpatialDiagram({ variant }: { variant: number }) {
  return (
    <svg
      viewBox="0 0 160 140"
      fill="none"
      className="h-full w-full"
      aria-hidden="true"
    >
      <g stroke="var(--border)" strokeWidth="2">
        <path d="M16 16H144V124H16Z" />
        <path d="M80 16V48M80 92V124M16 70H48M112 70H144" />
      </g>

      {variant === 0 && (
        <>
          <g
            stroke="var(--ink)"
            strokeWidth="1.5"
            strokeLinecap="round"
            opacity=".25"
          >
            <path d="M61 27L57 36M76 27L72 36M91 27L87 36M106 27L102 36" />
            <path d="M61 105L57 114M76 105L72 114M91 105L87 114" />
          </g>
          <path
            d="M35 45V88H124V45"
            stroke="var(--accent)"
            strokeWidth="3"
            strokeDasharray="5 5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="35" cy="45" r="5" fill="var(--accent)" />
          <path
            d="M117 53L124 45L131 53"
            stroke="var(--accent)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </>
      )}

      {variant === 1 && (
        <>
          <path
            d="M30 70L130 33V107Z"
            fill="var(--accent)"
            opacity=".08"
          />
          <path
            d="M130 70L30 33V107Z"
            fill="var(--accent)"
            opacity=".08"
          />
          <path
            d="M30 70H130M38 62L30 70L38 78M122 62L130 70L122 78"
            stroke="var(--accent)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M76 48V92M84 48V92"
            stroke="var(--ink)"
            strokeWidth="2"
          />
        </>
      )}

      {variant === 2 && (
        <>
          <rect
            x="47"
            y="37"
            width="66"
            height="66"
            rx="33"
            fill="var(--accent)"
            fillOpacity=".06"
            stroke="var(--accent)"
            strokeWidth="2"
            strokeDasharray="4 6"
          />
          <path
            d="M71 70H89M80 61V79"
            stroke="var(--accent)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <g fill="var(--ink)" opacity=".45">
            <circle cx="32" cy="37" r="3" />
            <circle cx="128" cy="103" r="3" />
          </g>
        </>
      )}
    </svg>
  );
}

export default function Slide09({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  const { headline, cards } = slide as typeof slide & {
    headline: string;
    cards: GridCard[];
  };

  return (
    <section className="flex h-full min-h-0 flex-col gap-8 text-[var(--ink)]">
      <div className="shrink-0">
        <div className="mb-6 flex items-center gap-3">
          <span className="h-2 w-2 rounded-full bg-[var(--accent)]" />
          <span className="font-[var(--font-mono)] text-sm uppercase tracking-[0.2em]">
            Three drawing exercises
          </span>
        </div>

        <h1 className="max-w-[850px] font-[var(--font-headline)] text-6xl font-bold leading-[1.04] tracking-[-0.045em]">
          {headline}
          <span className="text-[var(--accent)]">.</span>
        </h1>

        <div className="mt-7 h-px w-full bg-[var(--border)]" />
      </div>

      <div className="grid min-h-0 flex-1 grid-rows-3 gap-5">
        {cards.map((card, index) => (
          <article
            key={card.index}
            className="grid h-full grid-cols-[minmax(0,1fr)_156px] items-center gap-6 rounded-xl border border-[var(--border)] bg-[var(--surface)] p-7 shadow-[0_2px_8px_rgba(0,0,0,0.025)]"
          >
            <div className="flex flex-col gap-3">
              <span className="inline-flex w-fit items-center rounded-md border border-[var(--accent)] px-2.5 py-1 font-[var(--font-mono)] text-sm font-bold leading-none tracking-wider text-[var(--accent)]">
                {card.index}
              </span>

              <h2 className="font-[var(--font-headline)] text-[32px] font-bold leading-[1.1] tracking-[-0.025em]">
                {card.title}
              </h2>

              <p className="max-w-[590px] font-[var(--font-body)] text-[22px] leading-[1.45]">
                {card.desc}
              </p>
            </div>

            <div className="flex h-full items-center border-l border-[var(--border)] pl-5">
              <div className="aspect-[8/7] w-full">
                <SpatialDiagram variant={index} />
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
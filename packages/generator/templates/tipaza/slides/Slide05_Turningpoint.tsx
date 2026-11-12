import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

export default function Slide05({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  const items = slide.items ?? [];
  const item0 = items[0];
  const item1 = items[1];

  return (
    <section className="flex flex-col h-full min-h-0 w-full text-[var(--ink)]">
      <div className="flex h-full min-h-0 flex-col gap-9 bg-white">
        <header className="shrink-0 border-t border-[var(--ink)] pt-7">
          <p className="font-[var(--font-mono)] text-[20px] uppercase leading-normal tracking-[0.16em] text-[var(--accent)]">
            {slide.kicker}
          </p>

          <h1 className="mt-7 max-w-[880px] font-[var(--font-headline)] text-[58px] font-bold leading-[1.02] tracking-[-0.04em]">
            {slide.headline}
          </h1>

          <p className="mt-6 max-w-[850px] font-[var(--font-body)] text-[28px] leading-snug">
            {slide.subheadline}
          </p>
        </header>

        <div className="relative grid aspect-[1080/1350] w-full shrink-0 grid-rows-[480fr_870fr]">
          <svg
            aria-hidden="true"
            viewBox="0 0 1080 1350"
            fill="none"
            className="pointer-events-none absolute inset-0 h-full w-full"
          >
            {/* Exploded rectilinear blocks: a schematic repair drawing. */}
            <g
              stroke="var(--border)"
              strokeWidth="2"
              strokeLinejoin="miter"
            >
              <path d="M24 520H136V640H24Z" />
              <path d="M148 532H256V640H148Z" />
              <path d="M36 652H144V772H36Z" />
              <path d="M156 652H276V772H156Z" />

              <path d="M80 920H280V1040H80Z" />
              <path d="M292 920H492V1040H292Z" />
              <path d="M504 920H704V1040H504Z" />
              <path d="M716 920H916V1040H716Z" />

              <path d="M80 1052H174V1172H80Z" />
              <path d="M186 1052H386V1172H186Z" />
              <path d="M398 1052H598V1172H398Z" />
              <path d="M610 1052H810V1172H610Z" />
              <path d="M822 1052H916V1172H822Z" />

              <path d="M80 1184H280V1304H80Z" />
              <path d="M292 1184H492V1304H292Z" />
              <path d="M504 1184H704V1304H504Z" />
              <path d="M716 1184H916V1304H716Z" />
            </g>

            <g
              stroke="var(--border)"
              strokeWidth="1"
              strokeDasharray="7 9"
            >
              <path d="M280 870V1324" />
              <path d="M704 870V1324" />
              <path d="M48 908H948" />
              <path d="M48 1316H948" />
            </g>

            {/* One spine; exactly two milestone nodes. */}
            <g stroke="var(--ink)" strokeWidth="2">
              <path d="M80 0V70" />
              <path d="M80 130V568" />
              <path d="M80 592V1350" />
            </g>

            {/* Red fracture interrupts the first milestone. */}
            <g stroke="var(--accent)" strokeWidth="3">
              <path d="M66 70L94 64" />
              <path d="M66 136L94 130" />
            </g>

            <circle
              cx="80"
              cy="100"
              r="12"
              fill="white"
              stroke="var(--accent)"
              strokeWidth="3"
            />
            <circle
              cx="80"
              cy="580"
              r="12"
              fill="var(--ink)"
              stroke="white"
              strokeWidth="3"
            />
          </svg>

          <article className="relative z-10 pl-[156px] pr-[70px] pt-[64px]">
            <p className="font-[var(--font-mono)] text-[40px] font-semibold leading-[48px] tracking-[-0.04em] text-[var(--accent)]">
              {item0?.badge}
            </p>

            <h2 className="mt-8 font-[var(--font-headline)] text-[34px] font-semibold leading-tight tracking-[-0.02em]">
              {item0?.label || item0?.title}
            </h2>

            <p className="mt-5 max-w-[620px] font-[var(--font-body)] text-[28px] leading-snug">
              {item0?.body}
            </p>
          </article>

          <article className="relative z-10 pl-[156px] pr-[70px] pt-[64px]">
            <p className="font-[var(--font-mono)] text-[40px] font-semibold leading-[48px] tracking-[-0.04em]">
              {item1?.badge}
            </p>

            <h2 className="mt-8 font-[var(--font-headline)] text-[34px] font-semibold leading-tight tracking-[-0.02em]">
              {item1?.label || item1?.title}
            </h2>

            <p className="mt-5 max-w-[620px] font-[var(--font-body)] text-[28px] leading-snug">
              {item1?.body}
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}
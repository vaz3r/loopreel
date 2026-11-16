import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

export default function Slide03({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  const items = slide.items ?? [];
  const item0 = items[0]!;
  const item1 = items[0]!;
  const artId = React.useId();

  return (
    <section className="flex h-full min-h-0 w-full flex-col justify-between py-[42px] text-[var(--ink)]">
      <div className="flex h-full min-h-0 w-full flex-row gap-8">
        <div className="flex h-full w-[420px] shrink-0 flex-col justify-between gap-8">
          <header className="shrink-0">
            <div className="mb-7 h-[6px] w-16 bg-[var(--accent)]" />

            <p className="mb-6 font-[var(--font-headline)] text-[22px] font-bold tracking-[0.08em] text-[var(--accent)]">
              BENCHMARK THE RATE
            </p>

            <h1 className="font-[var(--font-headline)] text-[60px] font-bold leading-[1.02] tracking-tight">
              Compare Exposure, Not Raw Counts
            </h1>

            <p className="mt-7 line-clamp-2 font-[var(--font-body)] text-[24px] leading-snug tracking-tight">
              January–March 2024 · Involuntary denials per 10,000 passengers
            </p>
          </header>

          <div className="shrink-0 border-t-2 border-[var(--border)] bg-[var(--surface)] px-6 py-6">
            <div className="border-l-[5px] border-[var(--accent)] pl-5">
              <h2 className="font-[var(--font-headline)] text-[26px] font-semibold leading-tight">
                {item0?.label ?? 'Frontier Airlines'}
              </h2>

              <p className="mt-2 font-[var(--font-mono)] text-[80px] font-bold leading-none tracking-[-0.06em] text-[var(--accent)]">
                1.66
              </p>

              <p className="mt-3 line-clamp-2 font-[var(--font-body)] text-[22px] leading-snug">
                {item0?.body ?? '1.66 per 10,000 enplaned passengers.'}
              </p>
            </div>

            <div className="my-6 h-px bg-[var(--border)]" />

            <div className="border-l-[5px] border-[var(--ink)] pl-5">
              <h2 className="font-[var(--font-headline)] text-[26px] font-semibold leading-tight">
                {item1?.label ?? 'American Airlines Network'}
              </h2>

              <p className="mt-2 font-[var(--font-mono)] text-[80px] font-bold leading-none tracking-[-0.06em]">
                0.64
              </p>

              <p className="mt-3 line-clamp-2 font-[var(--font-body)] text-[22px] leading-snug">
                {item1?.body ?? '0.64 per 10,000 enplaned passengers.'}
              </p>
            </div>
          </div>
        </div>

        <div className="relative min-h-0 flex-1">
          <svg
            className="block h-full w-full"
            viewBox="0 0 952 460"
            preserveAspectRatio="none"
            role="img"
            aria-labelledby={`${artId}-title ${artId}-description`}
          >
            <title id={`${artId}-title`}>
              Involuntary denial rates compared on a shared baseline
            </title>
            <desc id={`${artId}-description`}>
              January–March 2024. Frontier Airlines: 1.66 involuntary
              denials per 10,000 enplaned passengers, shown in red.
              American Airlines Network: 0.64, shown in black.
              Equal-width columns use proportional heights on the same
              scale, with a shared zero baseline.
            </desc>

            {/* A dedicated architectural field; no overlaid HTML. */}
            <rect
              x="0"
              y="0"
              width="952"
              height="460"
              fill="var(--surface)"
            />

            <g
              fill="none"
              stroke="var(--border)"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
            >
              <path d="M64 76H888 M64 156H888 M64 236H888 M64 316H888" />
              <path d="M120 30V430 M476 30V430 M832 30V430" />
            </g>

            {/* Directional conduits from the top registration rail. */}
            <g fill="none" strokeWidth="2">
              <path
                d="M64 30H280V48"
                stroke="var(--accent)"
                vectorEffect="non-scaling-stroke"
              />
              <path
                d="M888 30H672V248"
                stroke="var(--ink)"
                vectorEffect="non-scaling-stroke"
              />
            </g>

            <path d="M269 45L280 51L291 45Z" fill="var(--accent)" />
            <path d="M661 245L672 251L683 245Z" fill="var(--ink)" />

            {/* Heights: 332 / 128 = 1.66 / 0.64. */}
            <rect
              x="184"
              y="64"
              width="192"
              height="332"
              fill="var(--accent)"
            />
            <rect
              x="576"
              y="268"
              width="192"
              height="128"
              fill="var(--ink)"
            />

            {/* Folded flags articulate each measured endpoint. */}
            <path
              d="M376 64H446L425 77H376Z"
              fill="var(--accent)"
            />
            <path
              d="M768 268H838L817 281H768Z"
              fill="var(--ink)"
            />

            {/* Geometric registration nodes. */}
            <rect
              x="270"
              y="59"
              width="20"
              height="10"
              fill="var(--surface)"
              stroke="var(--accent)"
              strokeWidth="2"
              vectorEffect="non-scaling-stroke"
            />
            <rect
              x="662"
              y="263"
              width="20"
              height="10"
              fill="var(--surface)"
              stroke="var(--ink)"
              strokeWidth="2"
              vectorEffect="non-scaling-stroke"
            />

            <path
              d="M64 396H888"
              stroke="var(--ink)"
              strokeWidth="2"
              vectorEffect="non-scaling-stroke"
            />

            <g
              fill="none"
              stroke="var(--ink)"
              strokeWidth="2"
            >
              <path
                d="M280 396V426H672V396"
                vectorEffect="non-scaling-stroke"
              />
              <path
                d="M476 426V443"
                vectorEffect="non-scaling-stroke"
              />
            </g>

            <rect
              x="466"
              y="438"
              width="20"
              height="10"
              fill="var(--accent)"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}
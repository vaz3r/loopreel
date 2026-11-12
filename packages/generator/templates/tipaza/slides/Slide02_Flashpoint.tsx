import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

export default function Slide02({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  const items = slide.items ?? [];
  const item0 = items[0];
  const item1 = items[1];
  const arrowId = `terrace-arrow-${React.useId().replace(/:/g, '')}`;

  const populationBadge = item0?.badge ?? '';
  const [population, ...populationUnit] = populationBadge.split(' ');

  return (
    <section className="flex flex-col h-full min-h-0 w-full text-[var(--ink)]">
      <div className="flex flex-col gap-10 py-10">
        <header className="flex flex-col gap-7">
          <div className="flex items-center gap-5">
            <span
              aria-hidden="true"
              className="h-5 w-5 shrink-0 bg-[var(--accent)]"
            />
            <p className="font-[var(--font-mono)] text-[22px] uppercase leading-snug tracking-[0.12em] text-[var(--accent)]">
              {slide.kicker}
            </p>
          </div>

          <h1 className="max-w-[900px] font-[var(--font-headline)] text-[58px] font-bold leading-[1.02] tracking-[-0.04em]">
            {slide.headline}
          </h1>

          <p className="max-w-[860px] font-[var(--font-body)] text-[30px] leading-snug">
            {slide.subheadline}
          </p>

          <div className="h-px w-full bg-[var(--border)]" />
        </header>

        <figure className="m-0 flex flex-col">
          <svg
            viewBox="0 0 952 560"
            width="952"
            height="560"
            role="img"
            aria-label="PUNIC TRADE → ROMAN MILITARY COLONY"
            className="block h-[560px] w-full shrink-0"
          >
            <defs>
              <marker
                id={arrowId}
                viewBox="0 0 12 12"
                refX="10"
                refY="6"
                markerWidth="12"
                markerHeight="12"
                orient="auto"
                markerUnits="userSpaceOnUse"
              >
                <path
                  d="M1 1L10 6L1 11"
                  fill="none"
                  stroke="var(--accent)"
                  strokeWidth="2.5"
                  strokeLinecap="square"
                />
              </marker>
            </defs>

            <path
              d="M0 560V280H476V72H952V560Z"
              fill="var(--surface)"
            />

            <path
              d="M0 280H476V72H952"
              fill="none"
              stroke="var(--ink)"
              strokeWidth="3"
            />

            <path
              d="M476 280V560"
              fill="none"
              stroke="var(--border)"
              strokeWidth="2"
            />

            <path
              d="M64 238H382L590 30H884"
              fill="none"
              stroke="var(--accent)"
              strokeWidth="7"
              strokeLinejoin="miter"
              markerEnd={`url(#${arrowId})`}
            />

            <circle cx="64" cy="238" r="8" fill="var(--accent)" />

            <g
              fill="var(--ink)"
              className="font-[var(--font-headline)] text-[38px] font-semibold tracking-[-0.025em]"
            >
              <text x="32" y="353">
                <tspan x="32">PUNIC</tspan>
                <tspan x="32" dy="43">
                  TRADE
                </tspan>
              </text>

              <text x="508" y="145">
                <tspan x="508">ROMAN</tspan>
                <tspan x="508" dy="43">
                  MILITARY
                </tspan>
                <tspan x="508" dy="43">
                  COLONY
                </tspan>
              </text>
            </g>

            <g fill="var(--accent)">
              <rect x="32" y="512" width="56" height="8" />
              <rect x="508" y="512" width="56" height="8" />
            </g>
          </svg>

          <div className="grid grid-cols-2 bg-[var(--surface)]">
            <article className="flex min-w-0 flex-col gap-6 border-r border-[var(--border)] px-8 pb-10 pt-7">
              <h2 className="font-[var(--font-mono)] text-[20px] font-medium uppercase leading-snug tracking-[0.1em]">
                {item0?.label || item0?.title}
              </h2>

              <div className="flex min-h-[132px] flex-col justify-start">
                <p className="whitespace-nowrap font-[var(--font-mono)] text-[84px] font-bold leading-none tracking-[-0.06em]">
                  {population}
                </p>
                {populationUnit.length > 0 && (
                  <p className="mt-3 font-[var(--font-body)] text-[26px] leading-snug">
                    {populationUnit.join(' ')}
                  </p>
                )}
              </div>

              <p className="font-[var(--font-body)] text-[26px] leading-snug">
                {item0?.body}
              </p>
            </article>

            <article className="flex min-w-0 flex-col gap-6 px-8 pb-10 pt-7">
              <h2 className="font-[var(--font-mono)] text-[20px] font-medium uppercase leading-snug tracking-[0.1em]">
                {item1?.label || item1?.title}
              </h2>

              <div className="flex min-h-[132px] flex-col justify-start">
                <p className="whitespace-nowrap font-[var(--font-mono)] text-[84px] font-bold leading-none tracking-[-0.06em] text-[var(--accent)]">
                  {item1?.badge}
                </p>
              </div>

              <p className="font-[var(--font-body)] text-[26px] leading-snug">
                {item1?.body}
              </p>
            </article>
          </div>

          <div
            aria-hidden="true"
            className="h-[3px] w-full bg-[var(--ink)]"
          />
        </figure>
      </div>
    </section>
  );
}
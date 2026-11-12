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
  const [metric, ...unitWords] = (item1?.badge ?? '').split(/\s+/);
  const unit = unitWords.join(' ');

  return (
    <section className="flex flex-col h-full min-h-0 w-full text-[var(--ink)]">
      <div className="flex h-full min-h-0 flex-col justify-between gap-9">
        <header className="flex flex-col gap-7">
          <div className="flex items-center gap-5">
            <span
              aria-hidden="true"
              className="h-[12px] w-[12px] shrink-0 bg-[var(--accent)]"
            />
            <p className="font-[var(--font-mono)] text-[20px] uppercase leading-normal tracking-[0.16em] text-[var(--accent)]">
              {slide.kicker}
            </p>
          </div>

          <h1 className="max-w-[850px] font-[var(--font-headline)] text-[58px] font-bold leading-[1.02] tracking-[-0.04em]">
            {slide.headline}
          </h1>

          <p className="max-w-[820px] font-[var(--font-body)] text-[28px] leading-snug">
            {slide.subheadline}
          </p>
        </header>

        <div className="relative h-[660px] shrink-0 border-y border-[var(--border)]">
          <svg
            aria-hidden="true"
            focusable="false"
            viewBox="0 0 1080 1350"
            preserveAspectRatio="none"
            className="pointer-events-none absolute inset-0 h-full w-full"
            fill="none"
          >
            <g stroke="var(--border)" strokeWidth="1.5">
              <path d="M80 80V390M1000 80V390M80 610V1270M1000 610V1270" />
              <path d="M80 80H180M900 80H1000M80 1270H310M770 1270H1000" />
              <path d="M80 1070H360L424 1160H650L714 1070H1000" />
              <path d="M80 1120H290M790 1120H1000" />
              <path d="M540 1160V1270" />
            </g>

            <path
              d="M80 443H348L382 465L414 414L455 482L491 443H650L682 465L718 430L748 443H1000"
              stroke="var(--accent)"
              strokeWidth="5"
              strokeLinejoin="miter"
              vectorEffect="non-scaling-stroke"
            />

            <path
              d="M455 482L473 536L445 580"
              stroke="var(--accent)"
              strokeWidth="2"
              vectorEffect="non-scaling-stroke"
            />

            <g fill="var(--accent)">
              <rect x="76" y="439" width="8" height="8" />
              <rect x="996" y="439" width="8" height="8" />
            </g>
          </svg>

          <div className="relative flex h-full flex-col px-[72px] pt-[76px]">
            <p className="font-[var(--font-mono)] text-[84px] font-bold leading-none tracking-[-0.06em]">
              {item0?.badge}
            </p>

            <div className="mt-[115px] flex max-w-[760px] flex-col gap-6">
              <h2 className="font-[var(--font-headline)] text-[36px] font-semibold leading-tight tracking-[-0.025em]">
                {item0?.label || item0?.title}
              </h2>
              <p className="font-[var(--font-body)] text-[28px] leading-normal">
                {item0?.body}
              </p>
            </div>
          </div>
        </div>

        <div className="relative flex min-h-[370px] shrink-0 flex-col justify-center gap-7 border border-[var(--border)] bg-[var(--surface)] px-10 py-10">
          <span
            aria-hidden="true"
            className="absolute left-0 top-10 h-[64px] w-[4px] bg-[var(--accent)]"
          />

          <p className="flex flex-wrap items-baseline gap-x-5 gap-y-2 font-[var(--font-mono)]">
            <span className="text-[48px] font-bold leading-none tracking-[-0.045em]">
              {metric}
            </span>
            {unit && (
              <span className="text-[24px] leading-snug">{unit}</span>
            )}
          </p>

          <div className="h-px w-full bg-[var(--border)]" aria-hidden="true" />

          <div className="flex flex-col gap-4">
            <h2 className="font-[var(--font-headline)] text-[32px] font-semibold leading-tight tracking-[-0.025em]">
              {item1?.label || item1?.title}
            </h2>
            <p className="max-w-[820px] font-[var(--font-body)] text-[28px] leading-snug">
              {item1?.body}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
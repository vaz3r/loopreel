import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

export default function Slide02({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  const telemetry = slide.telemetry ?? [];
  const population = telemetry[0];
  const basilicas = telemetry[1];

  const populationBadge = population?.badge ?? '';
  const separator = populationBadge.indexOf(' ');
  const populationValue =
    separator === -1 ? populationBadge : populationBadge.slice(0, separator);
  const populationUnit =
    separator === -1 ? '' : populationBadge.slice(separator + 1);

  return (
    <section className="flex flex-col h-full min-h-0 w-full text-[var(--ink)]">
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-5">
          <span
            aria-hidden="true"
            className="h-[3px] w-12 shrink-0 bg-[var(--accent)]"
          />
          <p className="font-[var(--font-mono)] text-[20px] uppercase leading-normal tracking-[0.16em] text-[var(--accent)]">
            {slide.kicker}
          </p>
        </div>

        <h1 className="max-w-[900px] font-[var(--font-headline)] text-[44px] font-bold leading-[1.08] tracking-[-0.04em]">
          {slide.headline}
        </h1>

        <p className="max-w-[800px] font-[var(--font-body)] text-[28px] leading-snug">
          {slide.subheadline}
        </p>
      </div>

      <div className="flex min-h-0 flex-1 flex-col justify-center gap-10 py-10">
        <article className="relative border-y border-[var(--border)] py-9">
          <div
            aria-hidden="true"
            className="absolute -top-px left-0 h-[3px] w-24 bg-[var(--accent)]"
          />

          <p className="font-[var(--font-mono)] text-[22px] leading-normal tracking-[0.06em]">
            {population?.label}
          </p>

          <div className="mt-7 border-l-[3px] border-[var(--accent)] pl-8">
            <p className="font-[var(--font-mono)] text-[84px] font-bold leading-none tracking-[-0.065em] text-[var(--accent)] tabular-nums">
              {populationValue}
            </p>
            <p className="mt-3 font-[var(--font-body)] text-[24px] leading-snug">
              {populationUnit}
            </p>
          </div>

          <p className="mt-7 max-w-[790px] font-[var(--font-body)] text-[24px] leading-snug opacity-80">
            {population?.body}
          </p>
        </article>

        <article className="border border-[var(--border)] bg-[var(--surface)] px-8 py-7">
          <div className="grid grid-cols-[1fr_224px] items-center gap-8">
            <div className="min-w-0">
              <p className="font-[var(--font-mono)] text-[20px] leading-normal tracking-[0.06em] opacity-80">
                {basilicas?.label}
              </p>
              <h2 className="mt-3 font-[var(--font-headline)] text-[38px] font-semibold leading-tight tracking-[-0.03em]">
                {basilicas?.badge}
              </h2>
            </div>

            <svg
              viewBox="0 0 224 132"
              fill="none"
              aria-hidden="true"
              className="h-[132px] w-[224px] text-[var(--accent)]"
            >
              <path
                d="M8 118H216M8 126H216"
                stroke="var(--border)"
                strokeWidth="2"
              />
              <g
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="square"
                strokeLinejoin="miter"
              >
                <path d="M16 118V59A24 24 0 0 1 64 59V118" />
                <path d="M88 118V59A24 24 0 0 1 136 59V118" />
                <path d="M160 118V59A24 24 0 0 1 208 59V118" />
              </g>
              <g stroke="currentColor" strokeWidth="2" opacity="0.45">
                <path d="M24 118V59A16 16 0 0 1 56 59V118" />
                <path d="M96 118V59A16 16 0 0 1 128 59V118" />
                <path d="M168 118V59A16 16 0 0 1 200 59V118" />
                <path d="M12 118H28M52 118H68M84 118H100M124 118H140M156 118H172M196 118H212" />
              </g>
            </svg>
          </div>

          <p className="mt-5 border-t border-[var(--border)] pt-5 font-[var(--font-body)] text-[24px] leading-snug">
            {basilicas?.body}
          </p>
        </article>
      </div>
    </section>
  );
}
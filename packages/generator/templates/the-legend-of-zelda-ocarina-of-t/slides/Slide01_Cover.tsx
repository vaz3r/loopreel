import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

export default function Slide01({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  const headlineWords = (slide.headline ?? '').split(/\s+/);
  const headlineLines = [
    headlineWords.slice(0, 2).join(' '),
    headlineWords.slice(2, 4).join(' '),
    headlineWords.slice(4).join(' '),
  ];
  const telemetry = (slide.telemetry ?? []).slice(0, 2);

  void brand;
  void totalSlides;

  return (
    <section className="flex flex-col h-full min-h-0 w-full text-[var(--ink)]">
      <div className="flex shrink-0 items-center gap-5">
        <span
          aria-hidden="true"
          className="h-[12px] w-[12px] shrink-0 bg-[var(--accent)]"
        />
        <p className="font-[var(--font-mono)] text-[20px] leading-[28px] tracking-[0.16em] text-[var(--accent)] uppercase">
          {slide.kicker}
        </p>
      </div>

      <header className="mt-7 shrink-0">
        <h1 className="font-[var(--font-headline)] text-[68px] leading-[1.02] font-bold tracking-[-0.04em]">
          {headlineLines.map((line, index) => (
            <span key={index} className="block">
              {line}
            </span>
          ))}
        </h1>

        <p className="mt-6 max-w-[850px] font-[var(--font-body)] text-[30px] leading-[1.3]">
          {slide.subheadline}
        </p>
      </header>

      <div className="relative my-6 min-h-[260px] flex-1">
        <svg
          aria-hidden="true"
          focusable="false"
          viewBox="0 0 952 300"
          preserveAspectRatio="xMidYMid meet"
          className="absolute inset-0 h-full w-full"
          fill="none"
        >
          <g
            stroke="var(--ink)"
            strokeWidth="2"
            strokeLinejoin="miter"
            opacity="0.18"
          >
            <path d="M242 224 192 66 357 135 476 24 595 135 760 66 710 224Z" />
            <path d="M242 224H710V259H242Z" />
          </g>

          <g
            stroke="var(--accent)"
            strokeWidth="9"
            strokeLinecap="square"
          >
            <path d="M476 121V177" />
            <path d="M451.75 135 500.25 163" />
            <path d="M451.75 163 500.25 135" />
          </g>
        </svg>
      </div>

      <div className="shrink-0 border-t border-[var(--border)] pt-6">
        <div className="grid grid-cols-2 gap-8">
          {telemetry.map((item, index) => (
            <div
              key={index}
              className="min-w-0 border-l-2 border-[var(--accent)] pl-5"
            >
              <p className="font-[var(--font-mono)] text-[32px] leading-[1.15] font-semibold tracking-[-0.04em]">
                {item.badge}
              </p>
              <p className="mt-3 font-[var(--font-body)] text-[24px] leading-snug">
                {item.label}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-7 flex items-center gap-6 border-t border-[var(--border)] pt-5">
          <p className="shrink-0 font-[var(--font-mono)] text-[20px] leading-[28px] tracking-[0.12em]">
            {slide.issueBadge}
          </p>
          <span
            aria-hidden="true"
            className="h-px flex-1 bg-[var(--border)]"
          />
          <span
            aria-hidden="true"
            className="h-[12px] w-[12px] shrink-0 bg-[var(--accent)]"
          />
        </div>
      </div>
    </section>
  );
}
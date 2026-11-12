import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

export default function Slide05({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  const items = slide.items ?? [];
  const ancient = items[0];
  const modern = items[1];

  const ancientWords = (ancient?.badge ?? '').trim().split(/\s+/);
  const ancientPeriod = [
    ancientWords.slice(0, 2).join(' '),
    ancientWords.slice(2, 4).join(' '),
    ancientWords.slice(4).join(' '),
  ];

  void brand;
  void totalSlides;

  return (
    <section className="flex flex-col h-full min-h-0 w-full text-[var(--ink)]">
      <header className="shrink-0">
        <div className="mb-7 flex items-center gap-5">
          <span
            aria-hidden="true"
            className="h-[3px] w-14 shrink-0 bg-[var(--accent)]"
          />
          <p className="font-[var(--font-mono)] text-[22px] uppercase tracking-[0.16em] text-[var(--accent)]">
            {slide.kicker}
          </p>
        </div>

        <h1 className="max-w-[900px] font-[var(--font-headline)] text-[68px] font-bold leading-[1.02] tracking-[-0.04em] [text-wrap:balance]">
          {slide.headline}
        </h1>

        <p className="mt-7 max-w-[840px] font-[var(--font-body)] text-[28px] leading-snug">
          {slide.subheadline}
        </p>

        <div
          aria-hidden="true"
          className="mt-8 h-px w-full bg-[var(--border)]"
        />
      </header>

      <div className="mt-9 grid min-h-0 flex-1 grid-cols-2 grid-rows-[minmax(410px,1fr)_240px_minmax(410px,1fr)] gap-x-16 pb-5">
        {/* Source order remains ancient → modern; placement climbs upward. */}
        <article className="relative col-start-1 row-start-3 self-start bg-[var(--surface)] px-8 py-8">
          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-0 h-[3px] bg-[var(--ink)]"
          />

          <p className="font-[var(--font-mono)] text-[28px] leading-[1.25]">
            {ancientPeriod.map((line, index) => (
              <span key={index} className="block">
                {line}
              </span>
            ))}
          </p>

          <h2 className="mt-6 font-[var(--font-headline)] text-[34px] font-semibold leading-[1.12] tracking-[-0.025em]">
            {ancient?.label || ancient?.title}
          </h2>

          <p className="mt-5 font-[var(--font-body)] text-[28px] leading-snug">
            {ancient?.body}
          </p>

          <div
            aria-hidden="true"
            className="absolute -bottom-4 left-0 right-8 h-4 border-b border-r border-[var(--border)] bg-[var(--surface)]"
          />
          <div
            aria-hidden="true"
            className="absolute -bottom-5 left-0 right-16 h-px bg-[var(--border)]"
          />
        </article>

        <article className="relative col-start-2 row-start-1 self-end border-l border-t border-[var(--border)] bg-[var(--paper,#f5f5f7)] px-8 py-8">
          <div
            aria-hidden="true"
            className="absolute -top-px left-0 h-[3px] w-20 bg-[var(--accent)]"
          />

          <p className="font-[var(--font-mono)] text-[56px] font-bold leading-none tracking-[-0.045em] text-[var(--accent)]">
            {modern?.badge}
          </p>

          <h2 className="mt-6 font-[var(--font-headline)] text-[34px] font-semibold leading-[1.12] tracking-[-0.025em]">
            {modern?.label || modern?.title}
          </h2>

          <p className="mt-5 font-[var(--font-body)] text-[28px] leading-snug">
            {modern?.body}
          </p>

          <div
            aria-hidden="true"
            className="absolute -bottom-4 left-8 right-0 h-4 border-b border-l border-[var(--border)] bg-[var(--paper,#f5f5f7)]"
          />
        </article>

        {/* The connector, strata, endpoints and arrow share SVG coordinates. */}
        <svg
          className="col-span-2 col-start-1 row-start-2 h-[240px] w-full"
          viewBox="0 0 952 240"
          role="img"
          aria-label="CHRONOLOGY, NOT TO SCALE"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g
            fill="none"
            stroke="var(--border)"
            strokeWidth="2"
            vectorEffect="non-scaling-stroke"
          >
            <path d="M32 214H176V188H278" />
            <path d="M32 226H192V202H250" />
            <path d="M674 50H778V24H920" />
            <path d="M704 64H794V38H920" />
          </g>

          <g
            fill="none"
            stroke="var(--accent)"
            strokeWidth="3"
            strokeLinecap="square"
            strokeLinejoin="miter"
          >
            <path d="M278 188L386 154L399 160L408 146" />
            <path d="M552 100L562 86L575 92L674 50" />
          </g>

          <g fill="var(--accent)">
            <circle cx="278" cy="188" r="5" />
            <circle cx="674" cy="50" r="5" />
          </g>

          <g
            fill="none"
            stroke="var(--ink)"
            strokeWidth="2"
            opacity="0.45"
          >
            <path d="M724 148L774 98" />
            <path d="M756 98H774V116" />
          </g>

          <text
            x="476"
            y="225"
            textAnchor="middle"
            fill="var(--ink)"
            fontSize="20"
            letterSpacing="2"
            className="font-[var(--font-mono)]"
          >
            CHRONOLOGY, NOT TO SCALE
          </text>
        </svg>
      </div>
    </section>
  );
}
import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

export default function Slide09({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  void brand;
  void totalSlides;

  const items = slide.items ?? [];

  return (
    <section className="flex flex-col h-full min-h-0 w-full text-[var(--ink)]">
      <header className="shrink-0">
        <div className="flex items-center gap-4">
          <span
            aria-hidden="true"
            className="h-[3px] w-10 bg-[var(--accent)]"
          />
          <p className="font-[var(--font-mono)] text-[20px] leading-[28px] tracking-[0.14em] text-[var(--accent)]">
            {slide.kicker}
          </p>
        </div>

        <h1 className="mt-5 max-w-[940px] font-[var(--font-headline)] text-[64px] font-bold leading-[1.04] tracking-[-0.045em]">
          {slide.headline}
        </h1>

        <p className="mt-6 max-w-[860px] font-[var(--font-body)] text-[26px] leading-[1.4]">
          {slide.subheadline}
        </p>
      </header>

      <div className="relative mt-9 grid min-h-0 flex-1 grid-rows-2 border-y border-[var(--border)]">
        {/* A continuous register spine; symbols carry no quantitative scale. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-1/2 w-[240px] -translate-x-1/2 bg-[var(--surface)]"
        >
          <svg
            viewBox="0 0 240 640"
            preserveAspectRatio="xMidYMid meet"
            className="h-full w-full"
            fill="none"
          >
            <g stroke="var(--border)" strokeWidth="1.5">
              <path d="M120 0V84M120 236V404M120 556V640" />
              <path d="M108 24H132M108 616H132" />
              <path d="M18 0V640M222 0V640" />
            </g>

            {/* Open ledger: deliberately abstract, without totals or tallies. */}
            <g strokeLinejoin="round" strokeLinecap="round">
              <path
                d="M120 115C96 99 69 99 40 107V205C70 197 96 200 120 216C144 200 170 197 200 205V107C171 99 144 99 120 115Z"
                fill="var(--surface)"
                stroke="var(--ink)"
                strokeWidth="2.5"
              />
              <path
                d="M120 115V216"
                stroke="var(--accent)"
                strokeWidth="3"
              />
              <path
                d="M53 120C74 117 91 120 105 127M53 137C74 134 91 137 105 144M53 154C74 151 91 154 105 161"
                stroke="var(--border)"
                strokeWidth="2"
              />
              <path
                d="M135 127C150 120 167 117 187 120M135 144C150 137 167 134 187 137M135 161C150 154 167 151 187 154"
                stroke="var(--border)"
                strokeWidth="2"
              />
              <path
                d="M40 214C70 206 96 209 120 225C144 209 170 206 200 214"
                stroke="var(--border)"
                strokeWidth="2"
              />
            </g>

            <g stroke="var(--accent)" strokeWidth="2">
              <path d="M0 160H28M212 160H240" />
            </g>

            {/* Broken flow: identical stroke weights, no proportional encoding. */}
            <g strokeLinecap="square" strokeLinejoin="miter">
              <path
                d="M28 480H76L95 461"
                stroke="var(--ink)"
                strokeWidth="3"
              />
              <path
                d="M145 499L164 480H211"
                stroke="var(--ink)"
                strokeWidth="3"
              />
              <path
                d="M199 468L211 480L199 492"
                stroke="var(--ink)"
                strokeWidth="3"
              />
              <path
                d="M109 454L98 506M142 454L131 506"
                stroke="var(--accent)"
                strokeWidth="3"
              />
              <path
                d="M28 442V430H58M182 530H212V518"
                stroke="var(--border)"
                strokeWidth="2"
              />
            </g>

            <g stroke="var(--accent)" strokeWidth="2">
              <path d="M0 480H16M224 480H240" />
            </g>
          </svg>
        </div>

        <article className="relative grid min-h-0 grid-cols-[minmax(0,1fr)_240px_minmax(0,1fr)] items-center gap-x-6 border-b border-[var(--border)] py-6">
          <h2 className="col-start-1 font-[var(--font-headline)] text-[34px] font-semibold leading-[1.12] tracking-[-0.025em]">
            {items?.label}
          </h2>

          <div className="col-start-3">
            <div
              aria-hidden="true"
              className="mb-5 h-[3px] w-10 bg-[var(--accent)]"
            />
            <p className="font-[var(--font-body)] text-[26px] leading-[1.4]">
              {items?.body}
            </p>
          </div>
        </article>

        <article className="relative grid min-h-0 grid-cols-[minmax(0,1fr)_240px_minmax(0,1fr)] items-center gap-x-6 py-6">
          <h2 className="col-start-3 row-start-1 text-right font-[var(--font-headline)] text-[34px] font-semibold leading-[1.12] tracking-[-0.025em]">
            {items?.label}
          </h2>

          <div className="col-start-1 row-start-1 text-right">
            <div
              aria-hidden="true"
              className="mb-5 ml-auto h-[3px] w-10 bg-[var(--accent)]"
            />
            <p className="font-[var(--font-body)] text-[26px] leading-[1.4]">
              {items?.body}
            </p>
          </div>
        </article>
      </div>
    </section>
  );
}
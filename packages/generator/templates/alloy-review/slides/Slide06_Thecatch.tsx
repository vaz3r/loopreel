import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

export default function Slide06({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  return (
    <section
      className="flex flex-col h-full min-h-0 w-full text-[var(--ink)]"
      aria-labelledby={`${slide.id}-headline`}
    >
      <div className="mb-7 h-2 w-24 shrink-0 bg-[var(--accent)]" />

      <h2
        id={`${slide.id}-headline`}
        className="max-w-[940px] font-[var(--font-headline)] text-[64px] font-bold leading-[1.02] tracking-[-0.045em]"
      >
        Mandatory Storage.
        <br />
        Missing Flagship
        <br />
        <span className="text-[var(--accent)]">Features.</span>
      </h2>

      <p className="mt-6 max-w-[820px] font-[var(--font-body)] text-[28px] leading-snug">
        The higher entry price does not buy Apple’s newest laptop experience.
      </p>

      <div className="mt-9 grid grid-cols-1 gap-6">
        <article className="grid min-h-[254px] grid-cols-[240px_1fr] items-center gap-8 border border-[var(--border)] bg-[var(--surface)] px-7 py-6">
          <div className="flex h-[204px] items-center justify-center border-r border-[var(--border)] pr-7">
            <svg
              viewBox="0 0 224 204"
              className="h-full w-full"
              fill="none"
              aria-hidden="true"
              focusable="false"
            >
              <path
                d="M21 28H175L195 48V176H21V28Z"
                stroke="var(--ink)"
                strokeWidth="2.5"
              />
              <path
                d="M175 28V48H195"
                stroke="var(--ink)"
                strokeWidth="2.5"
              />

              <g
                fill="var(--accent)"
                fillOpacity=".1"
                stroke="var(--accent)"
                strokeWidth="2"
              >
                <rect x="39" y="50" width="54" height="40" rx="3" />
                <rect x="107" y="50" width="54" height="40" rx="3" />
                <rect x="39" y="104" width="54" height="40" rx="3" />
                <rect x="107" y="104" width="54" height="40" rx="3" />
              </g>

              <g stroke="var(--ink)" strokeWidth="2">
                <path d="M40 176V187M54 176V187M68 176V187M82 176V187M96 176V187M110 176V187" />
                <path d="M39 159H85" />
              </g>

              <circle
                cx="176"
                cy="150"
                r="36"
                fill="var(--surface)"
                stroke="var(--accent)"
                strokeWidth="2.5"
              />
              <path
                d="M164 147V138C164 131.4 169.4 126 176 126C182.6 126 188 131.4 188 138V147"
                stroke="var(--accent)"
                strokeWidth="3"
              />
              <rect
                x="158"
                y="145"
                width="36"
                height="28"
                rx="4"
                fill="var(--accent)"
              />
              <path
                d="M176 154V164"
                stroke="var(--surface)"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>
          </div>

          <div>
            <h3 className="font-[var(--font-headline)] text-[36px] font-semibold leading-tight tracking-[-0.025em]">
              <span className="text-[var(--accent)]">1TB</span> is mandatory
            </h3>
            <p className="mt-4 max-w-[530px] font-[var(--font-body)] text-[27px] leading-snug">
              You pay for that capacity even when you don’t need it.
            </p>
          </div>
        </article>

        <article className="grid min-h-[254px] grid-cols-[240px_1fr] items-center gap-8 border border-[var(--border)] px-7 py-6">
          <div className="flex h-[204px] items-center justify-center border-r border-[var(--border)] pr-7">
            <svg
              viewBox="0 0 224 204"
              className="h-full w-full"
              fill="none"
              aria-hidden="true"
              focusable="false"
            >
              <path
                d="M31 150V51C31 45.5 35.5 41 41 41H183C188.5 41 193 45.5 193 51V150"
                stroke="var(--ink)"
                strokeWidth="2.5"
              />
              <path
                d="M41 140V52H92V58H132V52H183V140H41Z"
                fill="var(--surface)"
                stroke="var(--ink)"
                strokeWidth="2"
              />

              <path
                d="M13 151H211L201 166C199.5 168.5 197 170 194 170H30C27 170 24.5 168.5 23 166L13 151Z"
                stroke="var(--ink)"
                strokeWidth="2.5"
              />
              <path
                d="M86 151L90 157H134L138 151"
                stroke="var(--ink)"
                strokeWidth="2"
              />

              <path
                d="M58 115L84 89L110 115L151 74L168 91"
                stroke="var(--border)"
                strokeWidth="2"
              />

              <circle
                cx="112"
                cy="96"
                r="26"
                fill="var(--surface)"
                stroke="var(--accent)"
                strokeWidth="2.5"
              />
              <path
                d="M94 114L130 78"
                stroke="var(--accent)"
                strokeWidth="3"
              />

              <path
                d="M31 185H193"
                stroke="var(--border)"
                strokeWidth="1.5"
                strokeDasharray="4 5"
              />
            </svg>
          </div>

          <div>
            <h3 className="font-[var(--font-headline)] text-[36px] font-semibold leading-tight tracking-[-0.025em]">
              The 2021 design remains
            </h3>
            <p className="mt-4 max-w-[530px] font-[var(--font-body)] text-[27px] leading-snug">
              No OLED panel or touchscreen accompanies the{' '}
              <span className="font-semibold text-[var(--accent)]">
                $1,999
              </span>{' '}
              starting price.
            </p>
          </div>
        </article>
      </div>
    </section>
  );
}
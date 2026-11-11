import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

export default function Slide01({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  return (
    <section className="flex h-full min-h-0 w-full flex-col justify-center gap-10 text-[var(--ink)]">
      <div className="flex items-center gap-4">
        <span className="h-3 w-3 shrink-0 bg-[var(--accent)]" />
        <p className="font-[var(--font-mono)] text-[18px] font-medium leading-6 tracking-[0.15em]">
          BATCH 1 · ARTIFICIAL INTELLIGENCE
        </p>
      </div>

      <h1 className="font-[var(--font-headline)] text-[102px] font-semibold leading-[0.98] tracking-[-0.065em]">
        <span className="block">Open weights.</span>
        <span className="block text-[var(--accent)]">
          Counted compute.
        </span>
      </h1>

      <div className="relative h-[350px] shrink-0 border-y border-[var(--border)] bg-[var(--surface)]">
        <svg
          viewBox="0 0 952 350"
          fill="none"
          aria-hidden="true"
          focusable="false"
          className="h-full w-full"
        >
          {/* A measured field: open architecture becomes accounted units. */}
          <g
            stroke="var(--border)"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
          >
            {[48, 96, 144, 192, 240, 288].map((y) => (
              <path key={`horizontal-${y}`} d={`M0 ${y}H952`} opacity=".4" />
            ))}
            {[48, 144, 240, 336, 432, 528, 624, 720, 816, 912].map(
              (x) => (
                <path
                  key={`vertical-${x}`}
                  d={`M${x} 0V350`}
                  opacity=".3"
                />
              )
            )}
          </g>

          {/* Exposed, offset plates: no enclosing black box. */}
          <g strokeLinejoin="round">
            <path
              d="M71 203 218 127 415 203 267 280Z"
              fill="var(--surface)"
              stroke="var(--border)"
              strokeWidth="2"
            />
            <path
              d="M71 164 218 88 415 164 267 241Z"
              fill="var(--surface)"
              stroke="var(--ink)"
              strokeOpacity=".35"
              strokeWidth="2"
            />
            <path
              d="M71 125 218 49 415 125 267 202Z"
              fill="var(--surface)"
              stroke="var(--accent)"
              strokeWidth="2"
            />

            <g stroke="var(--accent)" strokeOpacity=".3">
              <path d="M108 106 304 183M145 87 341 164M181 68 378 145" />
              <path d="M120 144 267 68M169 163 316 87M218 183 366 106" />
            </g>

            <g stroke="var(--ink)" strokeOpacity=".3" strokeDasharray="3 6">
              <path d="M71 125V203M218 49V127M415 125V203M267 202V280" />
            </g>

            <g fill="var(--accent)">
              <circle cx="218" cy="49" r="4" />
              <circle cx="415" cy="125" r="4" />
              <circle cx="267" cy="202" r="4" />
              <circle cx="71" cy="125" r="4" />
            </g>
          </g>

          {/* A single trace bridges architecture and a finite count. */}
          <path
            d="M415 164H460V175H537"
            stroke="var(--accent)"
            strokeWidth="2"
          />
          <path
            d="m529 167 8 8-8 8"
            stroke="var(--accent)"
            strokeWidth="2"
          />
          <circle
            cx="460"
            cy="164"
            r="5"
            fill="var(--surface)"
            stroke="var(--accent)"
            strokeWidth="2"
          />

          {/* Equal cells make the denominator visible. */}
          <g>
            {Array.from({ length: 24 }, (_, index) => {
              const column = index % 6;
              const row = Math.floor(index / 6);
              const active = index < 15;
              const x = 579 + column * 47;
              const y = 72 + row * 47;

              return (
                <g key={`compute-cell-${index}`}>
                  <rect
                    x={x}
                    y={y}
                    width="35"
                    height="35"
                    fill={active ? 'var(--accent)' : 'var(--surface)'}
                    fillOpacity={active ? (row === 2 ? 0.55 : 0.9) : 1}
                    stroke={active ? 'var(--accent)' : 'var(--border)'}
                    strokeWidth="1"
                  />
                  {!active && (
                    <path
                      d={`M${x + 14} ${y + 17.5}h7M${x + 17.5} ${y + 14}v7`}
                      stroke="var(--border)"
                    />
                  )}
                </g>
              );
            })}
          </g>

          <g stroke="var(--ink)" strokeOpacity=".55">
            <path d="M568 62h-10v196h10M859 62h10v196h-10" />
            <path d="M579 280v8h270v-8" />
            {[579, 626, 673, 720, 767, 814, 849].map((x) => (
              <path key={`tick-${x}`} d={`M${x} 288v7`} />
            ))}
          </g>

          <path
            d="M48 318h27M48 318v-12M904 32h-27M904 32v12"
            stroke="var(--accent)"
            strokeWidth="2"
          />
        </svg>
      </div>

      <div className="grid grid-cols-[8px_1fr] items-stretch gap-6">
        <div className="bg-[var(--accent)]" />
        <p className="max-w-[790px] font-[var(--font-body)] text-[32px] font-normal leading-[1.35] tracking-[-0.025em]">
          Read the license. Inspect the architecture.
          <br />
          Audit the denominator.
        </p>
      </div>
    </section>
  );
}
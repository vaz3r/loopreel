import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

export default function Slide01({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  const telemetry = (slide.telemetry ?? []).slice(0, 2);
  const words = (slide.headline ?? '').trim().split(/\s+/);
  const headlineLines = [
    words.slice(0, 2).join(' '),
    words.slice(2, 4).join(' '),
    words.slice(4).join(' '),
  ];

  const palette = {
    '--paper': '#0D0E12',
    '--ink': '#F1F3F9',
    '--accent': '#FF4D00',
    '--surface': '#161820',
    '--border': '#F1F3F925',
  } as React.CSSProperties;

  return (
    <section
      className="flex flex-col h-full min-h-0 w-full text-[var(--ink)]"
      style={palette}
      aria-label={slide.headline}
    >
      <div className="flex h-full min-h-0 flex-col gap-8 bg-[var(--paper)]">
        <div className="flex shrink-0 items-center justify-between gap-6 border-b border-[var(--accent)] pb-6">
          <p className="font-[var(--font-headline)] text-[32px] font-semibold leading-tight tracking-[-0.035em]">
            {slide.publication}
          </p>

          <p className="shrink-0 border border-[var(--border)] bg-[var(--surface)] px-5 py-3 font-[var(--font-mono)] text-[20px] leading-none tracking-[0.08em]">
            {slide.issueBadge}
          </p>
        </div>

        <div className="flex shrink-0 flex-col gap-7">
          <p className="font-[var(--font-mono)] text-[20px] uppercase leading-snug tracking-[0.16em] text-[var(--accent)]">
            {slide.kicker}
          </p>

          <h1 className="font-[var(--font-headline)] text-[68px] font-bold leading-[1.02] tracking-[-0.04em]">
            {headlineLines.map((line, index) => (
              <React.Fragment key={index}>
                <span className="block">{line}</span>
                {index < headlineLines.length - 1 ? ' ' : null}
              </React.Fragment>
            ))}
          </h1>

          <p className="max-w-[850px] font-[var(--font-body)] text-[28px] leading-snug">
            {slide.subheadline}
          </p>
        </div>

        <div className="relative min-h-[440px] flex-1">
          <svg
            className="absolute inset-0 h-full w-full"
            viewBox="0 0 952 700"
            preserveAspectRatio="xMidYMid meet"
            fill="none"
            aria-hidden="true"
            focusable="false"
          >
            {/* A single architectural threshold, not a technical schematic. */}
            <path
              d="M 478 654 V 46 H 820 V 654"
              fill="var(--surface)"
              stroke="var(--ink)"
              strokeWidth="2"
              strokeOpacity="0.6"
            />
            <path
              d="M 500 654 V 68 H 798 V 654"
              stroke="var(--border)"
              strokeWidth="1.5"
            />
            <path
              d="M 478 46 H 820"
              stroke="var(--accent)"
              strokeWidth="4"
            />
            <path
              d="M 754 354 V 394"
              stroke="var(--ink)"
              strokeWidth="5"
              strokeLinecap="round"
            />

            {/* Oversized aperture crosses and obscures the doorway edge. */}
            <g transform="translate(407 355)">
              <circle
                r="278"
                fill="var(--paper)"
                stroke="var(--border)"
                strokeWidth="2"
              />
              <circle
                r="254"
                fill="var(--surface)"
                stroke="var(--accent)"
                strokeWidth="3"
              />
              <circle
                r="224"
                fill="var(--paper)"
                stroke="var(--ink)"
                strokeWidth="3"
              />

              <path
                d="M 0 -112 L 96.995 -56 L 96.995 56 L 0 112 L -96.995 56 L -96.995 -56 Z"
                fill="var(--accent)"
                stroke="var(--accent)"
                strokeWidth="3"
                strokeLinejoin="round"
              />

              {[0, 60, 120, 180, 240, 300].map((rotation) => (
                <path
                  key={rotation}
                  d="M 0 -112 H 193.99"
                  transform={`rotate(${rotation})`}
                  stroke="var(--ink)"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              ))}

              <circle
                r="267"
                stroke="var(--accent)"
                strokeWidth="2"
                strokeDasharray="145 1533"
                transform="rotate(-110)"
              />
            </g>

            <path
              d="M 100 654 H 872"
              stroke="var(--border)"
              strokeWidth="2"
            />
          </svg>
        </div>

        <div className="grid shrink-0 grid-cols-2 gap-8 border-t border-[var(--accent)] pt-7 pb-3">
          {telemetry.map((item, index) => (
            <div
              key={`${item.label}-${index}`}
              className={`flex min-w-0 flex-col gap-3 ${
                index === 1
                  ? 'border-l border-[var(--border)] pl-8'
                  : 'pr-2'
              }`}
            >
              <p className="font-[var(--font-mono)] text-[56px] font-bold leading-none tracking-[-0.055em] text-[var(--accent)]">
                {item.badge}
              </p>

              <h2 className="font-[var(--font-headline)] text-[32px] font-semibold leading-tight tracking-[-0.025em]">
                {item.label}
              </h2>

              <p className="max-w-[400px] font-[var(--font-body)] text-[24px] leading-snug">
                {item.qualification}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}